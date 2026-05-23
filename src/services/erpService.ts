import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export class ERPService {
  /**
   * Creates a notification for a user (Alerts, Expiries, Workflows)
   */
  static async sendNotification(userId: string, title: string, message: string, type: 'APPROVAL_ALERT' | 'WORKFLOW_ALERT' | 'SUBSCRIPTION_EXPIRY' | 'PROGRAM_ALERT', url?: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    const { error } = await supabase.from('notifications').insert({
      user_id: userId,
      title,
      message,
      type,
      target_url: url
    });

    if (error) console.error('Failed to send notification', error);
  }

  /**
   * Tracks a new subscription or renewal
   */
  static async addSubscription(memberId: string, type: 'MAGAZINE' | 'MEMBERSHIP_RENEWAL', amount: number, startDate: Date, endDate: Date) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.from('subscriptions').insert({
      member_id: memberId,
      type,
      amount,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      status: 'ACTIVE'
    });

    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Assigns a unit or member to a program
   */
  static async assignToProgram(programId: string, targetId: string, targetType: 'UNIT' | 'MEMBER') {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const payload = targetType === 'UNIT' 
      ? { program_id: programId, unit_id: targetId }
      : { program_id: programId, member_id: targetId };

    const { data, error } = await supabase.from('program_participations').insert(payload);
    
    if (error) throw new Error(error.message);
    return data;
  }
}
