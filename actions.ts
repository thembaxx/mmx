"use server";

import { db } from "@vercel/postgres";

export async function checkEmailExists(email: string) {
  try {
    const client = await db.connect();
    const res =
      await client.sql`SELECT * FROM "user" WHERE "email" = ${email} LIMIT 1`;

    client.release();

    return res && res.rowCount && res.rowCount > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function isOnboardingComplete(email: string) {
  try {
    const client = await db.connect();
    await client.connect();
    const res =
      await client.sql`SELECT * FROM "user" WHERE "email" = ${email} LIMIT 1`;
    const row = res?.rows?.[0];
    client.release();
    return !!row?.onboardingComplete;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function completedOnboarding(email: string) {
  try {
    const client = await db.connect();
    await client.connect();
    await client.sql`UPDATE "user"
          SET "onboardingComplete" = 'true'
          WHERE "email" = ${email};`;

    client.release();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
