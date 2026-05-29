import type { NextRequest } from 'next/server';
import { Resend } from 'resend';

const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ?? 'haider.nadeem7870@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (
      !name?.trim() ||
      !email?.trim() ||
      !message?.trim() ||
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return Response.json(
        { success: false, error: 'Invalid payload' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `New contact message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json(
      { success: false, error: 'Unexpected error' },
      { status: 500 }
    );
  }
}
