import { format } from "date-fns";
import { Resend } from "resend";
import ReservationEmail from "@/emails/email";
import { getDb } from "@/db";
import { reservations } from "@/db/schema";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Fujiyama Reservations <onboarding@resend.dev>";
const NOTIFY_EMAIL = process.env.RESERVATION_NOTIFY_EMAIL;

type ReservationRequest = {
  date: string;
  time: string;
  partySize: string;
  email: string;
  phone: string;
  notes?: string;
};

export async function POST(request: Request) {
  if (!NOTIFY_EMAIL) {
    console.error("RESERVATION_NOTIFY_EMAIL is not set");
    return Response.json(
      { error: "Reservation notifications are not configured." },
      { status: 500 },
    );
  }

  let body: Partial<ReservationRequest>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { date, time, partySize, email, phone, notes } = body;

  if (!date || !time || !partySize || !email || !phone) {
    return Response.json(
      { error: "Missing required reservation details." },
      { status: 400 },
    );
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return Response.json({ error: "Invalid date." }, { status: 400 });
  }

  const timeMatch = time.match(/(\d{2}):(\d{2}) (AM|PM)/);
  if (!timeMatch) {
    return Response.json({ error: "Invalid time." }, { status: 400 });
  }
  let hours = parseInt(timeMatch[1], 10);
  const minutes = parseInt(timeMatch[2], 10);
  if (timeMatch[3] === "PM" && hours !== 12) hours += 12;
  if (timeMatch[3] === "AM" && hours === 12) hours = 0;
  const requestedAt = new Date(parsedDate);
  requestedAt.setHours(hours, minutes, 0, 0);

  if (requestedAt.getTime() < Date.now() + 30 * 60 * 1000) {
    return Response.json(
      { error: "Please select a time at least 30 minutes from now." },
      { status: 400 },
    );
  }

  const formattedDate = format(parsedDate, "EEEE, MMMM d, yyyy");

  try {
    await getDb().insert(reservations).values({
      date: formattedDate,
      time,
      partySize,
      email,
      phone,
      notes,
    });
  } catch (error) {
    console.error("Failed to save reservation", error);
    return Response.json(
      { error: "Failed to save reservation." },
      { status: 502 },
    );
  }

  try {
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New Reservation — ${formattedDate} at ${time}`,
      react: ReservationEmail({
        date: formattedDate,
        time,
        partySize,
        email,
        phone,
        notes,
      }),
    });

    if (error) {
      console.error("Resend error", error);
      return Response.json(
        { error: "Failed to send reservation email." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Failed to send reservation email", error);
    return Response.json(
      { error: "Failed to send reservation email." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
