import { betterAuth } from "better-auth";
import { VercelPool } from "@vercel/postgres";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: new VercelPool({
    connectionString: process.env.POSTGRES_URL as string,
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_KEY as string,
    },
  },
  plugins: [nextCookies()],
});
