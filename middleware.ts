import { ROLE } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "./lib/server_utils";

const LOGIN_ROUTES = ["/sign-in", "/sign-up"];
const PROTECTED_ROUTES = ["/profile", "/dashboard"];
const ADMIN_ROUTES = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const token = await getCookie("auth_token");
  const urlPath = req.nextUrl.pathname;
  

  // Redirect unauthenticated users from protected routes
  if (!token && PROTECTED_ROUTES.includes(urlPath)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Redirect authenticated users from login routes

  if(token && LOGIN_ROUTES.includes(urlPath)) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  

  if (token) {
    const role = token.split(":")[1];


    // Redirect non-admins from admin routes
    if (ADMIN_ROUTES.includes(urlPath) && role !== ROLE.ADMIN) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    // Pass user data via headers
    return NextResponse.next();
  }

  return NextResponse.next();
}
// Middleware configuration
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};



