import { NextResponse } from 'next/server';
import connectMongoDB from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }

    // Save to DB
    await Newsletter.create({ email });

    // Send email to admin
    if (process.env.ADMIN_EMAIL) {
      await sgMail.send({
        to: process.env.ADMIN_EMAIL,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
        subject: "New Newsletter Subscription",
        text: `New subscriber: ${email}`,
      });
    }

    // Send email to user
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourdomain.com',
      subject: "Welcome to Our Newsletter! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8A2BE2;">Welcome to Our Newsletter! 🎉</h2>
          <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
          <ul>
            <li>Latest crypto market insights</li>
            <li>New wallet features and security updates</li>
            <li>Trading tips and best practices</li>
            <li>Community highlights and events</li>
          </ul>
          <p>Stay tuned for valuable content delivered straight to your inbox!</p>
          <p style="color: #666; font-size: 12px;">You can unsubscribe at any time by clicking the unsubscribe link in our emails.</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
} 