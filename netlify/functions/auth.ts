import jwt from 'jsonwebtoken';
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
  const [keyName, keySecret] = process.env.ABLY_API_KEY.split(':');

  const now = Math.floor(Date.now() / 1000);
  const claims = {
    'x-ably-capability': JSON.stringify({ 'chat-demo:*': ['*'] }),
    'x-ably-clientId': clientId,
    iat: now,
    exp: now + 3600,
  };

  const token = jwt.sign(claims, keySecret, { algorithm: 'HS256', keyid: keyName });

  return {
    statusCode: 200,
    headers: { 'content-type': 'application/jwt' },
    body: token,
  }
}
