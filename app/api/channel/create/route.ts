interface DataProps {
  iconSrc: string;
  name: string;
  isPrivate: boolean;
}

import { auth } from "@/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { db, QueryResult, QueryResultRow } from "@vercel/postgres";
import { NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

async function seedChannel() {
  await db.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await db.sql`
    CREATE TABLE IF NOT EXISTS "channel" (
      id VARCHAR(100) DEFAULT uuid_generate_v4() PRIMARY KEY,
      "createdBy" TEXT,
      "name" TEXT,
      "isPrivate" BOOLEAN,
      "iconSrc" TEXT,
      "createdAt" DATE DEFAULT NOW(),
      "createdAt" DATE DEFAULT NOW(),
      FOREIGN KEY("createdBy")
        REFERENCES "user" (id)
    );
  `;
}

export async function AddChannel(data: DataProps, userId: string) {
  if (!data) return;

  const { iconSrc, name, isPrivate } = data;

  const resp = await db.sql`
  INSERT INTO "channel" (
            "createdBy",
            name,
            "isPrivate",
            "iconSrc",
            "createdAt",
            "updatedAt"
            )
            VALUES(
            ${userId},
            ${name},
            ${isPrivate},
            ${iconSrc},
            ${new Date().toISOString()},
            ${new Date().toISOString()}
            )
  `;

  return resp;
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const { data } = await betterFetch<Session>("/api/auth/get-session", {
      baseURL: req.nextUrl.origin,
      headers: {
        //get the cookie from the req
        cookie: req.headers.get("cookie") || "",
      },
    });

    const session = data?.session;
    const userId = session?.userId;

    let result: QueryResult<QueryResultRow> | undefined;
    if (json && json.data && userId) {
      try {
        await db.connect();
      } catch (error) {
        console.log(error);
      }

      await seedChannel();
      result = await AddChannel(json.data, userId);

      return new Response(JSON.stringify(result), {
        status: 200,
      });
    }

    return new Response("Something went wrong", {
      status: 500,
    });
  } catch (error) {
    console.log(error);
    await db.sql`ROLLBACK`;

    return new Response("Error", { status: 400 });
  }
}
