import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { ApprovalService } from './approvalService';
import { Member, HierarchyScope } from '@/types/enterprise';

export class MemberWorkflowService {
  /**
   * 1. Member Creation Workflow
   * Creates a member with PENDING_APPROVAL status and initiates an approval request.
   */
  static async initiateMemberCreation(
    userId: string,
    memberData: Partial<Member>,
    targetScope: HierarchyScope
  ) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Insert pending member
    const { data: member, error: memberError } = await supabase
      .from('members')
      .insert({
        ...memberData,
        member_status: 'PENDING_APPROVAL',
        state_id: targetScope.state_id,
        district_id: targetScope.district_id,
        division_id: targetScope.division_id,
        unit_id: targetScope.unit_id
      })
      .select()
      .single();

    if (memberError || !member) return { error: memberError?.message || 'Failed to insert member' };

    // Create Approval Request at DIVISION level by default, or specific depending on business logic
    const { data: request, error: reqError } = await ApprovalService.createRequest({
      userId,
      entityType: 'MEMBER',
      entityId: member.id,
      actionType: 'CREATE',
      payload: { new_data: memberData },
      targetHierarchyLevel: 'DIVISION',
      targetScope
    });

    if (reqError) return { error: reqError };

    return { success: true, member, request };
  }

  /**
   * 2. Member Edit Workflow
   * Creates an approval request to edit a member, storing before/after snapshots.
   */
  static async initiateMemberEdit(
    userId: string,
    memberId: string,
    changes: Partial<Member>
  ) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Fetch original member
    const { data: original, error: fetchError } = await supabase
      .from('members')
      .select('*')
      .eq('id', memberId)
      .single();

    if (fetchError || !original) return { error: 'Member not found' };

    // Determine target scope based on current member hierarchy
    const targetScope: HierarchyScope = {
      state_id: original.state_id,
      district_id: original.district_id,
      division_id: original.division_id,
      unit_id: original.unit_id
    };

    // Create Approval Request
    const { data: request, error: reqError } = await ApprovalService.createRequest({
      userId,
      entityType: 'MEMBER',
      entityId: memberId,
      actionType: 'UPDATE',
      payload: { 
        old_data: original, 
        new_data: { ...original, ...changes },
        changes
      },
      targetHierarchyLevel: 'DIVISION',
      targetScope
    });

    if (reqError) return { error: reqError };

    return { success: true, request };
  }

  /**
   * 3. Transfer Workflow Engine
   * Detects transfer type and requires approval from appropriate authorities.
   */
  static async initiateTransfer(
    userId: string,
    memberId: string,
    newScope: HierarchyScope
  ) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: original } = await supabase.from('members').select('*').eq('id', memberId).single();
    if (!original) return { error: 'Member not found' };

    // Automatically detect required approval authority
    let targetHierarchyLevel: 'STATE' | 'DISTRICT' | 'DIVISION' | 'UNIT' = 'UNIT';
    if (original.state_id !== newScope.state_id) targetHierarchyLevel = 'STATE';
    else if (original.district_id !== newScope.district_id) targetHierarchyLevel = 'STATE'; // Inter-district needs state approval
    else if (original.division_id !== newScope.division_id) targetHierarchyLevel = 'DISTRICT'; // Inter-division needs district approval
    else if (original.unit_id !== newScope.unit_id) targetHierarchyLevel = 'DIVISION'; // Inter-unit needs division approval

    const { data: request, error: reqError } = await ApprovalService.createRequest({
      userId,
      entityType: 'MEMBER_TRANSFER',
      entityId: memberId,
      actionType: 'TRANSFER',
      payload: { 
        old_scope: {
          state_id: original.state_id,
          district_id: original.district_id,
          division_id: original.division_id,
          unit_id: original.unit_id
        }, 
        new_scope: newScope 
      },
      targetHierarchyLevel,
      targetScope: newScope // Request goes to the new hierarchy destination (or old depending on rules, but let's assume destination for now)
    });

    return reqError ? { error: reqError } : { success: true, request };
  }

  /**
   * 4. Promotion Workflow Engine
   */
  static async initiatePromotion(
    userId: string,
    memberId: string,
    newPosition: string,
    promotionLevel: 'STATE' | 'DISTRICT' | 'DIVISION' | 'UNIT'
  ) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: original } = await supabase.from('members').select('*').eq('id', memberId).single();
    if (!original) return { error: 'Member not found' };

    const targetScope: HierarchyScope = {
      state_id: original.state_id,
      district_id: original.district_id,
      division_id: original.division_id,
      unit_id: original.unit_id
    };

    const { data: request, error: reqError } = await ApprovalService.createRequest({
      userId,
      entityType: 'MEMBER_PROMOTION',
      entityId: memberId,
      actionType: 'PROMOTION',
      payload: { 
        old_position: original.organizational_position,
        new_position: newPosition,
        promotion_level: promotionLevel
      },
      targetHierarchyLevel: promotionLevel, // A state-level promotion requires state-level approval
      targetScope
    });

    return reqError ? { error: reqError } : { success: true, request };
  }

  /**
   * Process Approved Workflows
   * Takes an approved request and applies the changes to the live database
   */
  static async applyApprovedRequest(requestId: string, reviewerId: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { success, error, request } = await ApprovalService.approveRequest(requestId, reviewerId);
    if (!success || !request) return { error };

    const { action_type, entity_id, payload } = request;

    if (action_type === 'CREATE') {
      await supabase.from('members').update({ member_status: 'ACTIVE' }).eq('id', entity_id);
    } 
    else if (action_type === 'UPDATE') {
      await supabase.from('members').update(payload.changes).eq('id', entity_id);
    }
    else if (action_type === 'TRANSFER') {
      await supabase.from('members').update({
        state_id: payload.new_scope.state_id,
        district_id: payload.new_scope.district_id,
        division_id: payload.new_scope.division_id,
        unit_id: payload.new_scope.unit_id
      }).eq('id', entity_id);
    }
    else if (action_type === 'PROMOTION') {
      await supabase.from('members').update({
        organizational_position: payload.new_position
      }).eq('id', entity_id);
    }

    return { success: true };
  }
}
