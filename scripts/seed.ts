import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

// Use the Service Role Key to bypass RLS during seeding
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Seed State
    console.log('Seeding States...');
    const { data: stateData, error: stateError } = await supabase
      .from('states')
      .upsert({ name: 'Kerala', code: 'KL' }, { onConflict: 'name' })
      .select('id, code')
      .single();

    if (stateError) throw stateError;

    // 2. Seed Districts
    console.log('Seeding Districts...');
    const districtsToSeed = [
      { state_id: stateData.id, name: 'Thiruvananthapuram', code: 'TVM' },
      { state_id: stateData.id, name: 'Ernakulam', code: 'EKM' },
    ];
    
    const { data: districtsData, error: districtsError } = await supabase
      .from('districts')
      .upsert(districtsToSeed, { onConflict: 'state_id,name' })
      .select('id, code');

    if (districtsError) throw districtsError;

    const tvmDistrict = districtsData.find(d => d.code === 'TVM');

    // 3. Seed Division
    console.log('Seeding Divisions...');
    let divisionData;
    if (tvmDistrict) {
      const { data, error: divisionError } = await supabase
        .from('divisions')
        .upsert({ district_id: tvmDistrict.id, name: 'City Division', code: 'CD' }, { onConflict: 'district_id,name' })
        .select('id')
        .single();
        
      if (divisionError) throw divisionError;
      divisionData = data;
    }

    // 4. Seed Unit
    console.log('Seeding Units...');
    if (divisionData) {
      const { error: unitError } = await supabase
        .from('units')
        .upsert({ division_id: divisionData.id, name: 'Central Unit', code: 'CU' }, { onConflict: 'division_id,name' });
        
      if (unitError) throw unitError;
    }

    // 5. Seed Roles
    console.log('Seeding Roles...');
    const rolesToSeed = [
      { name: 'STATE_ADMIN', description: 'Global governance control across all districts and divisions' },
      { name: 'DISTRICT_ADMIN', description: 'Administrative control bounded to a single target district' },
      { name: 'DIVISION_ADMIN', description: 'Operational control bounded to a single division' },
      { name: 'UNIT_ADMIN', description: 'On-ground operational management of members in a specific unit' }
    ];
    
    const { data: rolesData, error: rolesError } = await supabase
      .from('roles')
      .upsert(rolesToSeed, { onConflict: 'name' })
      .select('id, name');

    if (rolesError) throw rolesError;

    // 6. Seed Permissions
    console.log('Seeding Permissions...');
    const permissionsToSeed = [
      { name: 'members.create', description: 'Ability to initiate member creation requests' },
      { name: 'members.edit', description: 'Ability to request member profile edits' },
      { name: 'members.transfer', description: 'Ability to request member transfers' },
      { name: 'members.promote', description: 'Ability to request promotions' },
      { name: 'approvals.approve', description: 'Ability to review, approve, or reject pending requests' },
      { name: 'config.manage', description: 'Ability to customize system-wide parameters and routing rules' }
    ];

    const { data: permsData, error: permsError } = await supabase
      .from('permissions')
      .upsert(permissionsToSeed, { onConflict: 'name' })
      .select('id, name');

    if (permsError) throw permsError;

    // 7. Map Permissions to STATE_ADMIN
    console.log('Mapping Permissions...');
    const stateAdmin = rolesData.find(r => r.name === 'STATE_ADMIN');
    if (stateAdmin && permsData) {
      const rolePermissions = permsData.map(p => ({
        role_id: stateAdmin.id,
        permission_id: p.id
      }));

      const { error: rpError } = await supabase
        .from('role_permissions')
        .upsert(rolePermissions, { onConflict: 'role_id,permission_id' });

      if (rpError) throw rpError;
    }

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

seed();
