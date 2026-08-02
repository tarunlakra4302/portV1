import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const targetEmail = process.env.CONTACT_EMAIL_TO || 'lakra.tarun4302@gmail.com';

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          error:
            'SMTP credentials are missing. Please add SMTP_USER and SMTP_PASS (e.g. Gmail App Password) to your .env file.',
        },
        { status: 500 }
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: targetEmail,
      subject: `Portfolio Contact: ${name}`,
      text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #09090b; color: #f4f4f5; border-radius: 12px; border: 1px solid #27272a;">
          <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin-bottom: 20px; border-bottom: 1px solid #27272a; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #38bdf8; font-size: 14px;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${phone || 'N/A'}</td>
            </tr>
          </table>

          <div style="background-color: #18181b; border-radius: 8px; padding: 16px; border: 1px solid #27272a;">
            <p style="color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0; margin-bottom: 8px; font-weight: 600;">Message Content</p>
            <p style="color: #f4f4f5; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>

          <footer style="margin-top: 24px; font-size: 12px; color: #71717a; text-align: center;">
            Sent from your portfolio contact form
          </footer>
        </div>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Error sending email:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
