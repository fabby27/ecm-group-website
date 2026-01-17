import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length || 0);
console.log('API Key starts with re_:', apiKey?.startsWith('re_'));

if (!apiKey) {
  console.error('RESEND_API_KEY not found in environment');
  process.exit(1);
}

const resend = new Resend(apiKey);

try {
  const result = await resend.emails.send({
    from: 'ECM Group Bookings <bookings@ecm-group.org>',
    to: ['elitecountermeasuresgroup@gmail.com'],
    subject: 'Test Email - Resend Integration Check',
    html: '<h1>Test Email</h1><p>This is a test email to verify Resend integration works correctly.</p>'
  });
  
  console.log('✅ Email sent successfully!');
  console.log('Result:', result);
} catch (error) {
  console.error('❌ Email send failed:');
  console.error(error);
}
