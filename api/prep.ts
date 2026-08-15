import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const COOKIE_NAME = 'prep_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function sign(expiry: number): string {
  return crypto.createHmac('sha256', process.env.PREP_PASSWORD || '').update(String(expiry)).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function makeCookie(): string {
  const expiry = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const value = `${expiry}.${sign(expiry)}`;
  return `${COOKIE_NAME}=${value}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly; Secure; SameSite=Lax`;
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

function loginPage(error: boolean): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>Prep — Shubham Kumar Gupta</title>
<style>
  :root { --bg:#0a0a0a; --fg:#ededeb; --muted:#888; --border:#2a2a2a; }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:var(--bg); color:var(--fg); font-family: Georgia, 'Cambria', 'Times New Roman', serif; }
  form { width:100%; max-width:320px; padding:32px; border:1px solid var(--border); border-radius:6px; margin: 0 20px; }
  h1 { font-size:18px; font-weight:400; margin:0 0 6px; }
  p { font-size:13px; color:var(--muted); margin:0 0 20px; }
  input { width:100%; background:#111; border:1px solid var(--border); border-radius:4px; padding:10px 12px; color:var(--fg); font-size:14px; font-family:inherit; margin-bottom:14px; }
  input:focus { outline:none; border-color:#555; }
  button { width:100%; background:var(--fg); color:var(--bg); border:none; border-radius:4px; padding:10px; font-size:13px; cursor:pointer; font-family:inherit; }
  .err { color:#e05050; font-size:12px; margin:-8px 0 14px; }
</style>
</head>
<body>
  <form method="POST" action="/prep">
    <h1>Private</h1>
    <p>Enter the password to continue.</p>
    ${error ? '<div class="err">Wrong password.</div>' : ''}
    <input type="password" name="password" placeholder="Password" autofocus required />
    <button type="submit">Enter →</button>
  </form>
</body>
</html>`;
}

export default async function handler(req: any, res: any) {
  if (!process.env.PREP_PASSWORD) {
    res.status(500).setHeader('Content-Type', 'text/plain');
    return res.end('PREP_PASSWORD is not set in the environment.');
  }

  if (req.method === 'POST') {
    const password = String(req.body?.password || '');
    if (safeEqual(password, process.env.PREP_PASSWORD)) {
      res.setHeader('Set-Cookie', makeCookie());
      return res.redirect(303, '/prep');
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(loginPage(true));
  }

  if (isAuthed(req.headers.cookie)) {
    const html = readFileSync(join(__dirname, '_prep-content.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.status(200).send(html);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  return res.status(200).send(loginPage(false));
}
