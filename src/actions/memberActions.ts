'use server'

import { MemberWorkflowService } from '@/services/memberWorkflowService';
import { HierarchyScope, Member } from '@/types/enterprise';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

async function requireAuth() {
  const supabase = createClient(await cookies());
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Unauthorized');
  return user.id;
}

export async function createMemberRequest(memberData: Partial<Member>, targetScope: HierarchyScope) {
  const userId = await requireAuth();
  return MemberWorkflowService.initiateMemberCreation(userId, memberData, targetScope);
}

export async function editMemberRequest(memberId: string, changes: Partial<Member>) {
  const userId = await requireAuth();
  return MemberWorkflowService.initiateMemberEdit(userId, memberId, changes);
}

export async function transferMemberRequest(memberId: string, newScope: HierarchyScope) {
  const userId = await requireAuth();
  return MemberWorkflowService.initiateTransfer(userId, memberId, newScope);
}

export async function promoteMemberRequest(memberId: string, newPosition: string, promotionLevel: 'STATE' | 'DISTRICT' | 'DIVISION' | 'UNIT') {
  const userId = await requireAuth();
  return MemberWorkflowService.initiatePromotion(userId, memberId, newPosition, promotionLevel);
}

export async function suspendMemberRequest(memberId: string) {
  const userId = await requireAuth();
  return MemberWorkflowService.initiateMemberEdit(userId, memberId, { member_status: 'SUSPENDED' });
}

export async function retireMemberRequest(memberId: string) {
  const userId = await requireAuth();
  return MemberWorkflowService.initiateMemberEdit(userId, memberId, { member_status: 'RETIRED' });
}

export async function approveWorkflowRequest(formData: FormData) {
  const requestId = formData.get('requestId') as string;
  const userId = await requireAuth();
  return MemberWorkflowService.applyApprovedRequest(requestId, userId);
}

export async function rejectWorkflowRequest(formData: FormData) {
  const requestId = formData.get('requestId') as string;
  const comments = formData.get('comments') as string || 'Rejected via dashboard';
  const userId = await requireAuth();
  const { ApprovalService } = await import('@/services/approvalService');
  return ApprovalService.rejectRequest(requestId, userId, comments);
}
