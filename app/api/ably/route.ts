import { authClient } from "@/lib/auth-client";
import Ably from "ably";

export async function GET() {
  const { data } = await authClient.getSession();

  const user = data?.user;

  const client = new Ably.Rest({
    clientId: user?.name ?? "",
    key: process.env.ABLY_API_KEY,
    autoConnect: typeof window !== "undefined",
  });

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: process.env.ABLY_CLIENT_ID,
  });

  return Response.json(tokenRequestData);
}
