import email from "@/emails/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'kevin.lizz7673@gmail.com',
    subject: 'hello world',
    react: email(),
  });
  return Response.json({ ok: true });
}