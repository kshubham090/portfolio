import crypto from 'node:crypto';
import { createClient, type RedisClientType } from 'redis';

const COOKIE_NAME = 'prep_session';
const ALLOWED_TRACKS = new Set(['dsa', 'ai']);

function sign(expiry: number): string {
  return crypto.createHmac('sha256', process.env.PREP_PASSWORD || '').update(String(expiry)).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function isAuthed(cookieHeader?: string): boolean {
  if (!cookieHeader) return false;
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return false;
  const [expiryStr, sig] = match[1].split('.');
  const expiry = Number(expiryStr);
  if (!expiry || !sig || Date.now() / 1000 > expiry) return false;
  return safeEqual(sig, sign(expiry));
}

// Reused across warm invocations of the same serverless container --
// avoids reconnecting on every request.
let client: RedisClientType | null = null;
let connecting: Promise<RedisClientType> | null = null;

async function getClient(): Promise<RedisClientType> {
  if (client?.isOpen) return client;
  if (!connecting) {
    const c: RedisClientType = createClient({ url: process.env.REDIS_URL });
    c.on('error', (err) => console.error('Redis client error', err));
    connecting = c.connect().then(() => {
      client = c;
      connecting = null;
      return c;
    });
  }
  return connecting;
}

export default async function handler(req: any, res: any) {
  if (!process.env.PREP_PASSWORD) return res.status(500).json({ error: 'PREP_PASSWORD not set' });
  if (!process.env.REDIS_URL) return res.status(500).json({ error: 'REDIS_URL not set' });
  if (!isAuthed(req.headers.cookie)) return res.status(401).json({ error: 'unauthorized' });

  const redis = await getClient();

  if (req.method === 'GET') {
    const track = String(req.query?.track || '');
    if (!ALLOWED_TRACKS.has(track)) return res.status(400).json({ error: 'bad track' });
    const value = await redis.get(`prep:${track}`);
    return res.status(200).json({ value: value ?? null });
  }

  if (req.method === 'POST') {
    const { track, value } = req.body || {};
    if (!ALLOWED_TRACKS.has(track) || typeof value !== 'string') {
      return res.status(400).json({ error: 'bad body' });
    }
    await redis.set(`prep:${track}`, value);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
