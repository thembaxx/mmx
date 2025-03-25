import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { isOnboardingComplete } from "./actions";

type Session = typeof auth.$Infer.Session;

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data, error } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      //get the cookie from the request
      cookie: request.headers.get("cookie") || "",
    },
  });

  const session = data?.session;
  const user = data?.user;

  if (!session || !!error || !user) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (user) {
    // const email = user.email;
    // const onboardingComplete = await isOnboardingComplete(email);

    if (
      pathname === "/" ||
      pathname === "/sign-in" ||
      pathname === "/sign-up"
    ) {
      return NextResponse.redirect(new URL("/channels", request.url));
    }
  }

  return NextResponse.next();
}

// Protect sub-routes
export const config = {
  matcher: [
    "/channels/:path*",
    "/channel/:path*",
    "/chat/:path*",
    "/sign-up/:path*",
    "/profile/:path*",
  ],
};
