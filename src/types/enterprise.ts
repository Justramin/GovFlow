export type HierarchyLevel = 'STATE' | 'DISTRICT' | 'DIVISION' | 'UNIT';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'TRANSFER' | 'PROMOTION';
export type MemberStatus = 'ACTIVE' | 'INACTIVE' | 'RETIRED' | 'SUSPENDED' | 'PENDING_APPROVAL';
export type MembershipType = 'REGULAR' | 'HONORARY' | 'LIFE';

export interface HierarchyScope {
  state_id?: string;
  district_id?: string;
  division_id?: string;
  unit_id?: string;
}

export interface ApprovalRequest {
  id: string;
  requester_id: string;
  entity_type: string;
  entity_id: string;
  action_type: ActionType;
  payload: any;
  status: ApprovalStatus;
  target_hierarchy_level: HierarchyLevel;
  target_state_id?: string;
  target_district_id?: string;
  target_division_id?: string;
  target_unit_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ApprovalLog {
  id: string;
  approval_request_id: string;
  reviewer_id: string;
  action: 'APPROVED' | 'REJECTED' | 'COMMENTED';
  comments?: string;
  created_at: string;
}

export interface Member {
  id: string;
  name?: string;
  state_id?: string;
  district_id?: string;
  division_id?: string;
  unit_id?: string;
  member_status: MemberStatus;
  organizational_position?: string;
  membership_type: MembershipType;
  created_at: string;
  updated_at: string;
}

export interface UserAccessScope extends HierarchyScope {
  id: string;
  user_id: string;
  role_id: string;
}
