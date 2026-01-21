import { Router } from 'express';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { rateLimit, sanitizeInput, isValidEmail, requireJson, limitPayloadSize } from '../middleware/security';

const router = Router();

// Check if AWS SES is configured
const isAWSConfigured = !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);

// Create AWS SES client only if configured
let sesClient: SESClient | null = null;
if (isAWSConfigured) {
  sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
} else {
  console.warn('⚠️  AWS SES not configured - email sending will be disabled');
}

// Email sending endpoint with security protections
router.post('/send', 
  requireJson,                                    // Validate Content-Type
  limitPayloadSize(50),                           // Max 50KB payload
  rateLimit({ windowMs: 60000, maxRequests: 5 }), // 5 requests per minute per IP
  async (req, res) => {
  try {
    // Check if SES is configured
    if (!sesClient) {
      return res.status(503).json({ 
        error: 'Email service not configured',
        details: 'AWS SES credentials not provided'
      });
    }

    // Sanitize and validate inputs
    const name = sanitizeInput(req.body.name, 100);
    const email = sanitizeInput(req.body.email, 254);
    const service = sanitizeInput(req.body.service, 100);
    const message = sanitizeInput(req.body.message, 1000);

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Escape HTML to prevent XSS in emails
    const escapeHtml = (str: string) => str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message);

    const emailParams = {
      Source: process.env.AWS_SMTP_USERNAME || 'noreply@kemisdigital.com',
      Destination: {
        ToAddresses: ['frontdesk@kemisdigital.com'],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission - ${safeService}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Service:</strong> ${safeService}</p>
              <p><strong>Message:</strong></p>
              <p>${safeMessage}</p>
            `,
            Charset: 'UTF-8',
          },
          Text: {
            Data: `
              New Contact Form Submission
              
              Name: ${name}
              Email: ${email}
              Service: ${service}
              
              Message:
              ${message}
            `,
            Charset: 'UTF-8',
          },
        },
      },
    };

    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error details:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
    
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
