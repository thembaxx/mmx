import { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { db } from "@vercel/postgres";
import { NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function GET(req: NextRequest) {
  try {
    await betterFetch<Session>("/api/auth/get-session", {
      baseURL: req.nextUrl.origin,
      headers: {
        //get the cookie from the req
        cookie: req.headers.get("cookie") || "",
      },
    });

    try {
      await db.connect();
    } catch (error) {
      console.log(error);
    }

    const result = await db.sql`SELECT * FROM "channel"`;

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      statusText: "Success",
    });
  } catch (error) {
    console.log(error);
    await db.sql`ROLLBACK`;

    return new Response("Error", { status: 400 });
  }
}
