import type { Reservation } from "@/db/schema";
import { getActiveReservations } from "@/db/cleanup";
import { Button } from "@/components/ui/button";
import { updateReservationStatus, logout } from "./actions";
import { AutoRefresh } from "./auto-refresh";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<Reservation["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

function guestsLabel(partySize: string) {
  return partySize === "1" ? "1 guest" : `${partySize} guests`;
}

function ReservationRow({ reservation }: { reservation: Reservation }) {
  const approve = updateReservationStatus.bind(null, reservation.id, "approved");
  const decline = updateReservationStatus.bind(null, reservation.id, "declined");

  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-ink">
            {reservation.date} at {reservation.time}
          </p>
          <p className="text-sm text-body">{guestsLabel(reservation.partySize)}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[reservation.status]}`}
        >
          {reservation.status}
        </span>
      </div>

      <div className="mt-4 grid gap-1 text-sm text-body">
        <p>
          <span className="font-medium text-ink">Email:</span> {reservation.email}
        </p>
        <p>
          <span className="font-medium text-ink">Phone:</span> {reservation.phone}
        </p>
        {reservation.notes && (
          <p>
            <span className="font-medium text-ink">Notes:</span> {reservation.notes}
          </p>
        )}
      </div>

      <div className="mt-5 flex gap-3">
        <form action={approve}>
          <Button
            type="submit"
            size="sm"
            disabled={reservation.status === "approved"}
          >
            Approve
          </Button>
        </form>
        <form action={decline}>
          <Button
            type="submit"
            size="sm"
            variant="destructive"
            disabled={reservation.status === "declined"}
          >
            Decline
          </Button>
        </form>
      </div>
    </div>
  );
}

export default async function AdminReservationsPage() {
  const allReservations = (await getActiveReservations()).sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const pending = allReservations.filter((r) => r.status === "pending");
  const actioned = allReservations.filter((r) => r.status !== "pending");

  return (
    <section className="bg-paper px-6 py-12 md:px-8">
      <AutoRefresh />
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-ink">Reservations</h1>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm">
              Log out
            </Button>
          </form>
        </div>

        {allReservations.length === 0 ? (
          <p className="mt-8 text-body">No reservations yet.</p>
        ) : (
          <div className="mt-8 grid gap-4">
            {pending.map((reservation) => (
              <ReservationRow key={reservation.id} reservation={reservation} />
            ))}
            {actioned.map((reservation) => (
              <ReservationRow key={reservation.id} reservation={reservation} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
