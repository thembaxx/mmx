interface DataProps {
  iconSrc: string;
  name: string;
  isPrivate: boolean;
}

import { authClient } from "@/lib/auth-client";
import { db } from "@vercel/postgres";

const client = await db.connect();

async function seedChannel() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
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

  await client.sql`INSERT INTO "channel" (
          createdBy,
          name,
          isPrivate,
          iconSrc,
          createdAt,
          createdAt,
          )
      VALUES(
          ${userId},
          ${name},
          ${isPrivate},
          ${iconSrc},
          ${new Date().toString()},
          ${new Date().toString()},
      );
  `;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const session = await authClient.getSession();
    const userId = session.data?.user.id;

    if (json && json.data && userId) {
      await client.sql`BEGIN`;
      await seedChannel();
      await AddChannel(json.data, userId);
      await client.sql`COMMIT`;

      client.release();
    }

    return new Response("Success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    await client.sql`ROLLBACK`;
    client.release();
    return new Response("Error", { status: 400 });
  }
}
