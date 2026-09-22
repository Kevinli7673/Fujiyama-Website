"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { getDb } from "@/db";
import { reservations } from "@/db/schema";
import ReservationStatusEmail from "@/emails/reservation-status";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Fujiyama Reservations <onboarding@resend.dev>";

export async function updateReservationStatus(
  id: number,
  status: "approved" | "declined",
) {
  const db = getDb();
  const [reservation] = await db
    .update(reservations)
    .set({ status })
    .where(eq(reservations.id, id))
    .returning();

  if (reservation) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: reservation.email,
        subject:
          status === "approved"
            ? `Reservation Confirmed — ${reservation.date} at ${reservation.time}`
            : `Reservation Update — ${reservation.date} at ${reservation.time}`,
        react: ReservationStatusEmail({
          status,
          date: reservation.date,
          time: reservation.time,
          partySize: reservation.partySize,
        }),
      });
    } catch (error) {
      console.error("Failed to send reservation status email", error);
    }
  }

  revalidatePath("/admin/reservations");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}
