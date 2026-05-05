import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const LAST_VISIT_COOKIE = "minify_last_visit";
const IDLE_MS = 14 * 24 * 60 * 60 * 1000; // 2 weeks without a visit → sign out

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    /\.(?:ico|png|jpg|jpeg|svg|gif|webp)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const secret = process.env.NEXTAUTH_SECRET;
  const token =
    secret != null && secret !== ""
      ? await getToken({ req: request, secret })
      : null;

  if (!token) {
    const res = NextResponse.next();
    res.cookies.delete(LAST_VISIT_COOKIE);
    return res;
  }

  const now = Date.now();
  const raw = request.cookies.get(LAST_VISIT_COOKIE)?.value;
  const last = raw !== undefined ? parseInt(raw, 10) : NaN;

  if (Number.isFinite(last) && now - last > IDLE_MS) {
    const signOutUrl = new URL("/api/auth/signout", request.url);
    signOutUrl.searchParams.set("callbackUrl", "/");
    const redirect = NextResponse.redirect(signOutUrl);
    redirect.cookies.delete(LAST_VISIT_COOKIE);
    return redirect;
  }

  const res = NextResponse.next();
  res.cookies.set(LAST_VISIT_COOKIE, String(now), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
