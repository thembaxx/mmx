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
      "updatedAt" DATE DEFAULT NOW(),
      FOREIGN KEY("createdBy")
        REFERENCES "user" (id)
    );
  `;
}

export async function POST(req: Request) {
  const data = await req.json();
  await seedChannel();

  console.log(data);

  return new Response("Success", {
    status: 200,
  });
}
