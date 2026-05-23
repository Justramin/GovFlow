import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { HierarchyScope, UserAccessScope } from '@/types/enterprise';

/**
 * Gets the current user's scopes based on their user_access_scope and role
 */
export async function getUserScopes(userId: string): Promise<UserAccessScope[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('user_access_scope')
    .select(`
      id,
      user_id,
      role_id,
      state_id,
      district_id,
      division_id,
      unit_id,
      roles:role_id ( name )
    `)
    .eq('user_id', userId);

  if (error || !data) return [];
  
  return data.map((d: any) => ({
    id: d.id,
    user_id: d.user_id,
    role_id: d.role_id,
    state_id: d.state_id,
    district_id: d.district_id,
    division_id: d.division_id,
    unit_id: d.unit_id,
    role_name: d.roles?.name
  })) as (UserAccessScope & { role_name: string })[];
}

/**
 * Middleware utility to validate if a user can act on a specific hierarchy scope
 */
export async function hasHierarchyAccess(userId: string, targetScope: HierarchyScope): Promise<boolean> {
  const scopes = await getUserScopes(userId);
  
  for (const scope of scopes) {
    const roleName = (scope as any).role_name;
    
    if (roleName === 'STATE_ADMIN') {
      if (!scope.state_id || scope.state_id === targetScope.state_id) return true;
    } else if (roleName === 'DISTRICT_ADMIN') {
      if (scope.district_id === targetScope.district_id) return true;
    } else if (roleName === 'DIVISION_ADMIN') {
      if (scope.division_id === targetScope.division_id) return true;
    } else if (roleName === 'UNIT_ADMIN') {
      if (scope.unit_id === targetScope.unit_id) return true;
    }
  }
  
  return false;
}

/**
 * Checks if a user has a specific permission via RBAC
 */
export async function hasPermission(userId: string, permissionName: string): Promise<boolean> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Instead of complex join, we query the DB which can be optimized with views
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      role_id,
      roles (
        role_permissions (
          permissions ( name )
        )
      )
    `)
    .eq('user_id', userId);

  if (error || !data) return false;

  for (const ur of data) {
    const permissions = (ur.roles as any)?.role_permissions?.map((rp: any) => rp.permissions?.name) || [];
    if (permissions.includes(permissionName)) {
      return true;
    }
  }

  return false;
}
