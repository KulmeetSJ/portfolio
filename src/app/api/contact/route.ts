import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, subject, message } = body as {
            email?: string;
            subject?: string;
            message?: string;
        };

        if (!email || !subject || !message) {
            return NextResponse.json(
                { error: "Email, subject, and message are required." },
                { status: 400 },
            );
        }

        const trimmedEmail = email.trim();
        const trimmedSubject = subject.trim();
        const trimmedMessage = message.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return NextResponse.json(
                { error: "Invalid email format." },
                { status: 400 },
            );
        }

        if (trimmedSubject.length < 3) {
            return NextResponse.json(
                { error: "Subject is too short." },
                { status: 400 },
            );
        }

        if (trimmedMessage.length < 5) {
            return NextResponse.json(
                { error: "Message is too short." },
                { status: 400 },
            );
        }

        const to = process.env.CONTACT_TO_EMAIL;
        if (!to) {
            return NextResponse.json(
                { error: "Server misconfiguration: missing recipient email." },
                { status: 500 },
            );
        }

        const { error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to,
            replyTo: trimmedEmail,
            subject: `Portfolio Contact: ${trimmedSubject}`,
            text: `
You received a new message from your portfolio contact form.

From: ${trimmedEmail}
Subject: ${trimmedSubject}

Message:
${trimmedMessage}
      `.trim(),
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Failed to send email." },
                { status: 500 },
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("API route error:", error);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 },
        );
    }
}