import Ably from "ably";

export const revalidate = 0;

export async function GET() {
  const client = new Ably.Rest({
    key: process.env.ABLY_API_KEY,
    autoConnect: typeof window !== "undefined",
  });
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: process.env.ABLY_CLIENT_ID,
  });

  return Response.json(tokenRequestData);
}
