
import { Router } from 'express';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const router = Router();

// Create AWS SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Email sending endpoint
router.post('/send', async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    const emailParams = {
      Source: process.env.AWS_SMTP_USERNAME || 'noreply@kemisdigital.com',
      Destination: {
        ToAddresses: ['frontdesk@kemisdigital.com'],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission - ${service}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
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
