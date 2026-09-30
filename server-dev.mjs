import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables - .env.local takes priority over .env
dotenv.config({ path: '.env.local' }); // Load .env.local first
dotenv.config(); // Then load .env (won't override .env.local values)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 3; // Max 3 submissions per 15 minutes per IP

function getClientIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0] ||
           req.headers['x-real-ip'] ||
           req.connection?.remoteAddress ||
           req.ip ||
           'unknown';
}

function checkRateLimit(ip) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return false;
    }

    record.count++;
    return true;
}

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// API route handler (same logic as serverless function)
app.post('/api/send-email', async (req, res) => {
    // Rate limiting
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
        console.warn(`Rate limit exceeded for IP: ${clientIP}`);
        return res.status(429).json({ 
            error: 'Too many requests. Please try again later.',
            details: 'Rate limit exceeded. Maximum 3 submissions per 15 minutes.'
        });
    }

    const { name, email, subject, message, website, turnstileToken } = req.body;

    // Honeypot check - if this field is filled, it's a bot
    if (website) {
        console.warn(`Bot detected via honeypot from IP: ${clientIP}`);
        return res.status(400).json({ error: 'Invalid submission' });
    }

    // Verify Turnstile token
    if (!turnstileToken) {
        console.warn(`Missing Turnstile token from IP: ${clientIP}`);
        return res.status(400).json({ error: 'Verification required' });
    }

    // Verify token with Cloudflare
    try {
        const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secret: process.env.TURNSTILE_SECRET_KEY,
                response: turnstileToken,
                remoteip: clientIP
            })
        });

        const verifyResult = await verifyResponse.json();
        
        if (!verifyResult.success) {
            console.warn(`Turnstile verification failed for IP: ${clientIP}`, verifyResult);
            return res.status(400).json({ 
                error: 'Verification failed',
                details: 'Please complete the verification challenge again.'
            });
        }
    } catch (verifyError) {
        console.error('Turnstile verification error:', verifyError);
        return res.status(500).json({ 
            error: 'Verification service error',
            details: 'Unable to verify submission. Please try again.'
        });
    }

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Message length validation
    if (message.length < 10) {
        return res.status(400).json({ error: 'Message is too short' });
    }

    if (message.length > 5000) {
        return res.status(400).json({ error: 'Message is too long' });
    }

    // Name validation
    if (name.length > 100) {
        return res.status(400).json({ error: 'Name is too long' });
    }

    // Validate that RESEND_API_KEY is set
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return res.status(500).json({ error: 'Email service not configured. Please set RESEND_API_KEY in your .env file' });
    }

    try {
        // Sanitize inputs to prevent XSS
        const sanitizeHtml = (str) => {
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        };

        const sanitizedName = sanitizeHtml(String(name));
        const sanitizedEmail = sanitizeHtml(String(email));
        const sanitizedSubject = sanitizeHtml(String(subject || 'No Subject'));
        const sanitizedMessage = sanitizeHtml(String(message));

        // Use verified domain email if available, otherwise fall back to onboarding@resend.dev
        // NOTE: onboarding@resend.dev can only send to your account email
        // To send to other addresses, verify a domain at https://resend.com/domains
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'PriceM8 Contact Form <onboarding@resend.dev>';
        const toEmail = process.env.RESEND_TO_EMAIL || 'support@pricem8.uk';

        console.log('Environment check:', {
            hasResendKey: !!process.env.RESEND_API_KEY,
            hasFromEmail: !!process.env.RESEND_FROM_EMAIL,
            hasToEmail: !!process.env.RESEND_TO_EMAIL,
            fromEmail: fromEmail,
            toEmail: toEmail
        });

        console.log('Attempting to send email:', {
            to: toEmail,
            from: fromEmail,
            subject: sanitizedSubject,
            replyTo: email
        });

        const data = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            subject: `New Contact Form Submission: ${sanitizedSubject}`,
            replyTo: email,
            text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
        });

        console.log('Resend API Response:', JSON.stringify(data, null, 2));

        // Check if Resend returned an error in the response
        if (data.error) {
            console.error('Resend returned an error:', data.error);
            return res.status(500).json({ 
                error: 'Failed to send email',
                details: data.error.message || 'Resend API returned an error',
                resendError: data.error
            });
        }

        // Check if we got an ID (successful send)
        // Resend response structure: { data: { id: string }, error: null, headers: {...} }
        const messageId = data.data?.id;
        if (!messageId) {
            console.warn('Resend response missing ID:', data);
            return res.status(500).json({ 
                error: 'Email send status unclear',
                details: 'Resend API did not return a message ID',
                response: data
            });
        }

        console.log('Email sent successfully. Message ID:', messageId);
        return res.status(200).json({ 
            success: true, 
            messageId: messageId,
            data 
        });
    } catch (error) {
        console.error('Resend Error (catch block):', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            error: error
        });
        return res.status(500).json({ 
            error: 'Failed to send email',
            details: error instanceof Error ? error.message : 'Unknown error',
            errorType: error instanceof Error ? error.constructor.name : typeof error
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Development API server running on http://localhost:${PORT}`);
    console.log(`\n📋 Environment variables loaded:`);
    console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing'}`);
    console.log(`   RESEND_FROM_EMAIL: ${process.env.RESEND_FROM_EMAIL || '⚠️  Using default (onboarding@resend.dev)'}`);
    console.log(`   RESEND_TO_EMAIL: ${process.env.RESEND_TO_EMAIL || '⚠️  Using default (support@pricem8.uk)'}`);
    console.log(`\n`);
});

