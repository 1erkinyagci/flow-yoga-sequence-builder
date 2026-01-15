import { Resend } from 'resend';

const getResend = () => new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'FLOW Yoga <noreply@yoga-sequencing.com>';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const resend = getResend();

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

// Email Templates

export function getWelcomeEmailHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #7c3aed; margin: 0;">Welcome to FLOW</h1>
  </div>

  <p>Hi ${name || 'there'},</p>

  <p>Welcome to FLOW Yoga Sequence Builder! We're excited to have you join our community of yoga teachers.</p>

  <p>With FLOW, you can:</p>
  <ul>
    <li>Create beautiful yoga sequences in minutes</li>
    <li>Access our library of 100+ poses</li>
    <li>Save and organize your class flows</li>
    <li>Export and share your sequences</li>
  </ul>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://www.yoga-sequencing.com/builder" style="background-color: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">Start Building</a>
  </div>

  <p>If you have any questions, just reply to this email. We're here to help!</p>

  <p>Namaste,<br>The FLOW Team</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="font-size: 12px; color: #666; text-align: center;">
    FLOW Yoga Sequence Builder<br>
    <a href="https://www.yoga-sequencing.com" style="color: #7c3aed;">www.yoga-sequencing.com</a>
  </p>
</body>
</html>
`;
}

export function getProWelcomeEmailHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #7c3aed; margin: 0;">Welcome to FLOW Pro!</h1>
  </div>

  <p>Hi ${name || 'there'},</p>

  <p>Thank you for upgrading to FLOW Pro! Your 7-day free trial has started.</p>

  <p>You now have access to:</p>
  <ul>
    <li><strong>Unlimited flows</strong> - Create as many sequences as you need</li>
    <li><strong>Unlimited poses per flow</strong> - No restrictions on sequence length</li>
    <li><strong>PDF export</strong> - Download your sequences for class</li>
    <li><strong>Shareable links</strong> - Share flows with students</li>
    <li><strong>Priority support</strong> - We're here to help</li>
  </ul>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://www.yoga-sequencing.com/dashboard" style="background-color: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">Go to Dashboard</a>
  </div>

  <p style="background-color: #f3f4f6; padding: 15px; border-radius: 8px;">
    <strong>Remember:</strong> You can cancel anytime during your trial and won't be charged. Your trial ends in 7 days.
  </p>

  <p>If you have any questions, just reply to this email!</p>

  <p>Namaste,<br>The FLOW Team</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="font-size: 12px; color: #666; text-align: center;">
    FLOW Yoga Sequence Builder<br>
    <a href="https://www.yoga-sequencing.com" style="color: #7c3aed;">www.yoga-sequencing.com</a>
  </p>
</body>
</html>
`;
}

export function getPaymentFailedEmailHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #dc2626; margin: 0;">Payment Failed</h1>
  </div>

  <p>Hi ${name || 'there'},</p>

  <p>We were unable to process your payment for FLOW Pro. This could be due to:</p>
  <ul>
    <li>Insufficient funds</li>
    <li>Expired card</li>
    <li>Card declined by your bank</li>
  </ul>

  <p>Please update your payment method to keep your Pro subscription active.</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://www.yoga-sequencing.com/dashboard/subscription" style="background-color: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">Update Payment Method</a>
  </div>

  <p style="background-color: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
    <strong>Important:</strong> If we can't process your payment within the next few days, your account will be downgraded to the Free plan.
  </p>

  <p>If you have any questions, please reply to this email.</p>

  <p>Namaste,<br>The FLOW Team</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="font-size: 12px; color: #666; text-align: center;">
    FLOW Yoga Sequence Builder<br>
    <a href="https://www.yoga-sequencing.com" style="color: #7c3aed;">www.yoga-sequencing.com</a>
  </p>
</body>
</html>
`;
}

export function getSubscriptionCancelledEmailHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #7c3aed; margin: 0;">Subscription Cancelled</h1>
  </div>

  <p>Hi ${name || 'there'},</p>

  <p>Your FLOW Pro subscription has been cancelled. We're sorry to see you go!</p>

  <p>Your account has been switched to the Free plan. You can still:</p>
  <ul>
    <li>Create up to 3 flows</li>
    <li>Use up to 8 poses per flow</li>
    <li>Access our full pose library</li>
  </ul>

  <p>Your existing flows won't be deleted, but some features may be limited.</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://www.yoga-sequencing.com/pricing" style="background-color: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">Resubscribe Anytime</a>
  </div>

  <p>If you have any feedback or questions, we'd love to hear from you. Just reply to this email.</p>

  <p>Namaste,<br>The FLOW Team</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="font-size: 12px; color: #666; text-align: center;">
    FLOW Yoga Sequence Builder<br>
    <a href="https://www.yoga-sequencing.com" style="color: #7c3aed;">www.yoga-sequencing.com</a>
  </p>
</body>
</html>
`;
}
