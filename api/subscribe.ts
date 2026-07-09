import { Resend } from 'resend';

const SHUBHAM_EMAIL = 'kshubham04907@gmail.com';
const FROM = 'hireme@shubham.cv';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).end();

  res.setHeader('Access-Control-Allow-Origin', '*');

  const email = String(req.body?.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, error: 'invalid email' });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  await resend.emails.send({
    from: FROM,
    to: SHUBHAM_EMAIL,
    subject: `[newsletter] new subscriber — ${email}`,
    text: `${email}\n\nsubscribed ${dateStr} via shubham.cv footer.`,
  });

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `you're on the list`,
    text: `hey,\n\nyou're subscribed to occasional updates from Shubham — new projects, writeups, and things worth sharing. no spam, unsubscribe any time by just replying.\n\n— Shubham`,
  });

  return res.json({ ok: true });
}
