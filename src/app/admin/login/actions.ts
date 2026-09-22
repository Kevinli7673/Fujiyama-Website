"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(_prevState: { error: string } | null, formData: FormData) {
  const password = formData.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminPassword || !sessionSecret) {
    console.error("ADMIN_PASSWORD or ADMIN_SESSION_SECRET is not set");
    return { error: "Admin login is not configured." };
  }

  if (typeof password !== "string" || password !== adminPassword) {
    return { error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", sessionSecret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin/reservations");
}
