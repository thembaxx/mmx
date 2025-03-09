import Ably from "ably";

export async function GET() {
  const client = new Ably.Rest({
    key: process.env.ABLY_API_KEY,
  });

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: process.env.ABLY_CLIENT_ID,
  });

  return Response.json(tokenRequestData);
}
