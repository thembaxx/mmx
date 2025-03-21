import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isOnboardingComplete } from "./actions";

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

  let url: undefined | string;

  if (!session && pathname !== "/") {
    url = "/";
  } else if (session && !error) {
    if (pathname === "/") {
      if (data.user) {
        const email = data.user.email;
        const onboardingComplete = await isOnboardingComplete(email);
        if (onboardingComplete) {
          url = "/channels";
        } else {
          url = "/channels";
        }
      } else {
        url = "/";
      }
    }
  }

  if (url) return NextResponse.redirect(new URL(url, request.url));

  return NextResponse.next();
}

// Protect sub-routes
export const config = {
  matcher: [
    "/",
    "/login/:path",
    "/channels/:path",
    "/chat/:path",
    "/sign-up/:path",
  ],
};
