import Ably from "ably";
import { HandlerEvent } from '@netlify/functions';


export async function handler(event: HandlerEvent) {
  if (!process.env.ABLY_API_KEY) {
    console.error('Missing ABLY_API_KEY environment variable.')
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Missing ABLY_API_KEY environment variable.' })
    }
  }

  const clientId = event.queryStringParameters?.['clientId'] || 'NO_CLIENT_ID_PROVIDED';
  const client = new Ably.Rest(process.env.ABLY_API_KEY);
  const tokenRequest = await client.auth.createTokenRequest({
    capability: {
      '[chat]*': ['*'],
    },
    clientId: clientId,
  });
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(tokenRequest)
  }
}
