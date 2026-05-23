export class CommunicationService {
  /**
   * Mocks sending an email notification
   */
  static async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    console.log(`[COMMUNICATION - EMAIL] Scoped to: ${to} | Subject: ${subject}`);
    console.log(`[BODY]: ${body}`);
    // In production, integrate with nodemailer, SendGrid, or Resend
    return true;
  }

  /**
   * Mocks sending a WhatsApp workflow alert
   */
  static async sendWhatsAppAlert(phone: string, templateMessage: string): Promise<boolean> {
    console.log(`[COMMUNICATION - WHATSAPP] Scoped to: ${phone}`);
    console.log(`[TEMPLATE]: ${templateMessage}`);
    // In production, integrate with Twilio or Meta WhatsApp Business API
    return true;
  }

  /**
   * Triggers an OTP verification challenge for sensitive actions (e.g. promoting)
   */
  static async sendActionOTP(phone: string): Promise<string> {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[COMMUNICATION - OTP] Scoped to: ${phone} | Challenge: ${generatedOtp}`);
    await this.sendWhatsAppAlert(phone, `Your security verification OTP for KSEB WA ERP is ${generatedOtp}.`);
    return generatedOtp;
  }
}
