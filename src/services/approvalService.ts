import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { ApprovalRequest, HierarchyScope, ActionType } from '@/types/enterprise';
import { hasHierarchyAccess } from '@/lib/permissions';

export class ApprovalService {
  /**
   * Creates a new approval request
   */
  static async createRequest(params: {
    userId: string;
    entityType: string;
    entityId: string;
    actionType: ActionType;
    payload: any;
    targetHierarchyLevel: 'STATE' | 'DISTRICT' | 'DIVISION' | 'UNIT';
    targetScope: HierarchyScope;
  }): Promise<{ data?: ApprovalRequest; error?: string }> {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('approval_requests')
      .insert({
        requester_id: params.userId,
        entity_type: params.entityType,
        entity_id: params.entityId,
        action_type: params.actionType,
        payload: params.payload,
        status: 'PENDING',
        target_hierarchy_level: params.targetHierarchyLevel,
        target_state_id: params.targetScope.state_id,
        target_district_id: params.targetScope.district_id,
        target_division_id: params.targetScope.division_id,
        target_unit_id: params.targetScope.unit_id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating approval request', error);
      return { error: error.message };
    }
    
    return { data: data as ApprovalRequest };
  }

  /**
   * Approves a pending request and logs the action
   */
  static async approveRequest(requestId: string, reviewerId: string, comments?: string): Promise<{ success: boolean; error?: string; request?: ApprovalRequest }> {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Fetch request to validate target scope
    const { data: request, error: fetchError } = await supabase
      .from('approval_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError || !request) return { success: false, error: 'Request not found' };
    if (request.status !== 'PENDING') return { success: false, error: 'Request is not pending' };

    // Validate access
    const hasAccess = await hasHierarchyAccess(reviewerId, {
      state_id: request.target_state_id,
      district_id: request.target_district_id,
      division_id: request.target_division_id,
      unit_id: request.target_unit_id
    });

    if (!hasAccess) return { success: false, error: 'Unauthorized to approve this request' };

    // Update status to APPROVED
    const { error: updateError } = await supabase
      .from('approval_requests')
      .update({ status: 'APPROVED', updated_at: new Date().toISOString() })
      .eq('id', requestId);

    if (updateError) return { success: false, error: updateError.message };

    // Log approval
    await supabase.from('approval_logs').insert({
      approval_request_id: requestId,
      reviewer_id: reviewerId,
      action: 'APPROVED',
      comments: comments || 'Approved by authorized user'
    });

    return { success: true, request: { ...request, status: 'APPROVED' } };
  }

  /**
   * Rejects a pending request and logs the action
   */
  static async rejectRequest(requestId: string, reviewerId: string, comments: string): Promise<{ success: boolean; error?: string }> {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: request, error: fetchError } = await supabase
      .from('approval_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError || !request) return { success: false, error: 'Request not found' };
    
    const hasAccess = await hasHierarchyAccess(reviewerId, {
      state_id: request.target_state_id,
      district_id: request.target_district_id,
      division_id: request.target_division_id,
      unit_id: request.target_unit_id
    });

    if (!hasAccess) return { success: false, error: 'Unauthorized to reject this request' };

    const { error: updateError } = await supabase
      .from('approval_requests')
      .update({ status: 'REJECTED', updated_at: new Date().toISOString() })
      .eq('id', requestId);

    if (updateError) return { success: false, error: updateError.message };

    await supabase.from('approval_logs').insert({
      approval_request_id: requestId,
      reviewer_id: reviewerId,
      action: 'REJECTED',
      comments
    });

    return { success: true };
  }
}
