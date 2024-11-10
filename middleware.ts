import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/action";
export default async function middleware(req: NextRequest) {
  const isOnDashbaord = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnLogin = req.nextUrl.pathname === "/";
  const isOnSignup = req.nextUrl.pathname === "/sign-up";
  const user = await getLoggedInUser();
  if (!user) {
    if (isOnDashbaord) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next();
  } else if (user) {
    if (isOnSignup) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    if (isOnLogin) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    return NextResponse.next();
  }
}

export const matcher = [
  // Skip Next.js internals and all static files, unless found in search params
  "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  // Always run for API routes
  "/(api|trpc)(.*)",
];
