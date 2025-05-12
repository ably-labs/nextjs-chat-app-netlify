import Ably from "ably";

export async function handler() {
  const client = new Ably.Rest(process.env.ABLY_API_KEY);
  const tokenRequest = await client.auth.createTokenRequest({
    clientId: "ably-chat-demo",
  });
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(tokenRequest)    
}
}