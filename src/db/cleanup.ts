import { parse } from "date-fns";
import { inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { reservations, type Reservation } from "@/db/schema";

const GRACE_PERIOD_MS = 30 * 60 * 1000;

/**
 * Fetches all reservations, deletes any whose date/time is more than
 * 30 minutes in the past, and returns the remaining (active) ones.
 */
export async function getActiveReservations(): Promise<Reservation[]> {
  const db = getDb();
  const all = await db.select().from(reservations);

  const staleIds: number[] = [];
  const active: Reservation[] = [];

  for (const reservation of all) {
    const dateTime = parse(
      `${reservation.date} ${reservation.time}`,
      "EEEE, MMMM d, yyyy hh:mm a",
      new Date(),
    );
    const isStale =
      !Number.isNaN(dateTime.getTime()) &&
      dateTime.getTime() + GRACE_PERIOD_MS < Date.now();

    if (isStale) {
      staleIds.push(reservation.id);
    } else {
      active.push(reservation);
    }
  }

  if (staleIds.length > 0) {
    await db.delete(reservations).where(inArray(reservations.id, staleIds));
  }

  return active;
}
