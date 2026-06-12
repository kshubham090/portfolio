import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const SHUBHAM_EMAIL = 'kshubham04907@gmail.com';
const FROM = 'hireme@shubham.cv';
const RESUME_URL = 'https://www.shubham.cv/resume';

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).end();

  const { transcript, visitorType, messageCount, durationMs, visitorEmail, visitorName } = req.body;

  if (!transcript || messageCount < 2) return res.json({ ok: true, skipped: true });

  const durationMin = Math.round(durationMs / 60000);
  const durationStr = durationMin < 1 ? '<1 min' : `${durationMin} min`;
  const visitorLabel = visitorType ?? 'unknown';

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const resend = new Resend(process.env.RESEND_API_KEY);

  const summaryRes = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{
      role: 'user',
      content: `Summarize this portfolio visitor chat in 3 bullets (what they asked, intent level, any hot signals like hiring urgency, JD shared, contact given).
Then 2 specific suggestions for Shubham — follow-up actions or portfolio improvements.
One sentence per bullet. No headers, no markdown, just plain lines.

Visitor: ${visitorLabel}${visitorEmail ? ` | ${visitorEmail}` : ''}
Transcript:
${transcript}

Format exactly:
• [bullet 1]
• [bullet 2]
• [bullet 3]

1. [suggestion]
2. [suggestion]`,
    }],
  });

  const summary = summaryRes.content[0].type === 'text' ? summaryRes.content[0].text : '';
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  // ── Email to Shubham ──
  const shubhamBody =
`${visitorLabel} visitor — ${messageCount} messages — ${durationStr} — ${dateStr}
${visitorEmail ? `visitor: ${visitorName ? visitorName + ' <' + visitorEmail + '>' : visitorEmail}` : 'visitor: anonymous'}

${summary}

---

full transcript:

${transcript}`;

  await resend.emails.send({
    from: FROM,
    to: SHUBHAM_EMAIL,
    subject: `[skg-agent] ${visitorLabel}${visitorEmail ? ' · ' + (visitorName ?? visitorEmail) : ''} · ${messageCount} msgs · ${durationStr}`,
    text: shubhamBody,
  });

  // ── Email to visitor (if they shared their email) ──
  if (visitorEmail) {
    const greeting = visitorName ? `hey ${visitorName.split(' ')[0]},` : 'hey,';

    const visitorBody =
`${greeting}

you chatted with Shubham's agent. here's what was mentioned, in case it's useful.

resume: ${RESUME_URL}
linkedin: linkedin.com/in/shubhamgupta04907
github: github.com/kshubham090

if the timing's right, Shubham will reach out within 24 hours. you can also just reply to this email directly — it goes to him.

— skg-agent, on behalf of Shubham Kumar Gupta`;

    await resend.emails.send({
      from: FROM,
      to: visitorEmail,
      cc: SHUBHAM_EMAIL,
      subject: `Shubham Kumar Gupta — resume + links`,
      text: visitorBody,
    });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.json({ ok: true });
}
