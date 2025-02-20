import { NextResponse } from "next/server";
import { auth } from "./src/lib/auth";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/gyms",
    "/dashboard",
    // Add other protected routes that require authentication
    // You can use patterns like "/protected/:path*"
  ],
};