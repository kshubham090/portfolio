import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const NOTIFY_EMAIL = 'kshubham04907@gmail.com';

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' },
    });
  }
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { transcript, visitorType, messageCount, durationMs } = await req.json() as {
    transcript: string;
    visitorType: string | null;
    messageCount: number;
    durationMs: number;
  };

  if (!transcript || messageCount < 2) {
    return Response.json({ ok: true, skipped: true });
  }

  const durationMin = Math.round(durationMs / 60000);
  const durationStr = durationMin < 1 ? '<1 min' : `${durationMin} min`;
  const visitorLabel = visitorType ?? 'unknown';

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const summary = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [{
      role: 'user',
      content: `Summarize this portfolio visitor chat in 3 bullet points (what they asked, their interest level, any signals like hiring intent or contact request).
Then give 2 short, specific suggestions for Shubham to improve his portfolio or follow up with this visitor.
Be concise — each bullet max 1 sentence.

Visitor type: ${visitorLabel}
Transcript:
${transcript}

Format:
**Summary**
• ...
• ...
• ...

**Suggestions for Shubham**
1. ...
2. ...`,
    }],
  });

  const summaryText = summary.content[0].type === 'text' ? summary.content[0].text : '';

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'skg-agent <onboarding@resend.dev>',
    to: NOTIFY_EMAIL,
    subject: `[skg-agent] ${visitorLabel} visitor · ${messageCount} msgs · ${durationStr} · ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
    text: `New portfolio visitor session\n\nVisitor type: ${visitorLabel}\nMessages: ${messageCount}\nDuration: ${durationStr}\n\n${summaryText}\n\n---\nFull transcript:\n\n${transcript}`,
  });

  return Response.json({ ok: true }, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
}
