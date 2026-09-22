import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminReservationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (!session || session !== process.env.ADMIN_SESSION_SECRET) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
