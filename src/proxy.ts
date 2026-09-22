import { NextResponse, type NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  const isValid =
    !!session && session === process.env.ADMIN_SESSION_SECRET;

  if (!isValid) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!login).*)"],
};
