import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateSessionToken } from "./lib/session";
import { redirect } from "next/navigation";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === "GET") {
    const response = NextResponse.next();
    const token = request.cookies.get("session")?.value ?? null;

    if (!token && !request.nextUrl.pathname.includes("login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { session, user } = await validateSessionToken(token!);

    if (!session && !request.nextUrl.pathname.includes("login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session && user && request.nextUrl.pathname.includes("login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
