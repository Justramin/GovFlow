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

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function verify() {
  console.log('🔍 Verifying seeded data...\n');

  try {
    const { data: states } = await supabase.from('states').select('*');
    console.log('States:', states);

    const { data: districts } = await supabase.from('districts').select('*');
    console.log('\nDistricts:', districts);

    const { data: divisions } = await supabase.from('divisions').select('*');
    console.log('\nDivisions:', divisions);

    const { data: units } = await supabase.from('units').select('*');
    console.log('\nUnits:', units);

    const { data: roles } = await supabase.from('roles').select('*');
    console.log('\nRoles:', roles);

    console.log('\n✅ Data verification completed!');
  } catch (error) {
    console.error('❌ Error during verification:', error);
  }
}

verify();
