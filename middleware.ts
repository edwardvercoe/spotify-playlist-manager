import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  // Allow the requests if the following is true:
  // 1. its a request for next-auth session & provider fetching
  // 2. the token exists

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // If user is logged in, redirect to home page
  if (token && pathname == "/login") {
    return NextResponse.rewrite(new URL("/", req.url));
  }

  // Otherwise, redirect to login page
  if (!token && pathname !== "/login") {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
}

export const config = { matcher: ["/"] };
