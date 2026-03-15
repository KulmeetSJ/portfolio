import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, message } = body as {
            email?: string;
            message?: string;
        };

        if (!email || !message) {
            return NextResponse.json(
                { error: "Email and message are required." },
                { status: 400 },
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format." },
                { status: 400 },
            );
        }

        if (message.trim().length < 5) {
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
            from: "Portfolio Contact <onboarding@kulmeet.dev>",
            to,
            replyTo: email,
            subject: `New portfolio message from ${email}`,
            text: `
You received a new message from your portfolio contact form.

From: ${email}

Message:
${message}
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