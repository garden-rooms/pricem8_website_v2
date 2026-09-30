// Test script to debug email sending
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local first (higher priority), then .env
if (existsSync(join(__dirname, '.env.local'))) {
    dotenv.config({ path: '.env.local' });
    console.log('✅ Loaded .env.local');
}
if (existsSync(join(__dirname, '.env'))) {
    dotenv.config({ path: '.env' });
    console.log('✅ Loaded .env');
}

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not set in .env file');
    process.exit(1);
}

console.log('✅ RESEND_API_KEY is set');
console.log('Testing email send...\n');

const testEmail = {
    from: 'PriceM8 Contact Form <onboarding@resend.dev>',
    to: ['support@pricem8.uk'],
    subject: 'Test Email from Contact Form',
    replyTo: 'test@example.com',
    text: 'This is a test email from the contact form API.',
    html: '<h2>Test Email</h2><p>This is a test email from the contact form API.</p>',
};

try {
    console.log('Sending email with config:', {
        from: testEmail.from,
        to: testEmail.to,
        subject: testEmail.subject,
    });

    const result = await resend.emails.send(testEmail);

    console.log('\n📧 Resend API Response:');
    console.log(JSON.stringify(result, null, 2));

    if (result.error) {
        console.error('\n❌ Resend returned an error:');
        console.error(result.error);
    } else if (result.id || result.data?.id) {
        console.log('\n✅ Email sent successfully!');
        console.log('Message ID:', result.id || result.data?.id);
        console.log('\n⚠️  Note: If you don\'t receive the email, check:');
        console.log('   1. Spam/junk folder');
        console.log('   2. Resend dashboard for delivery status');
        console.log('   3. The "from" domain (onboarding@resend.dev has limitations)');
    } else {
        console.warn('\n⚠️  Unexpected response format - no error or ID');
    }
} catch (error) {
    console.error('\n❌ Error sending email:');
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    if (error.response) {
        console.error('Response:', error.response);
    }
}

