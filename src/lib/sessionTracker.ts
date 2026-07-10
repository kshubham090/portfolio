interface SessionData {
  transcript: string;
  visitorType: string | null;
  messageCount: number;
  startedAt: number;
}

let session: SessionData | null = null;
let firedRef = false;
let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

const INACTIVITY_MS = 5 * 60 * 1000;

export function sessionStart(visitorType: string | null) {
  session = { transcript: '', visitorType, messageCount: 0, startedAt: Date.now() };
  firedRef = false;
  resetInactivityTimer();
}

export function sessionAddMessage(role: 'user' | 'agent', text: string) {
  if (!session) return;
  session.transcript += `[${role}] ${text}\n\n`;
  session.messageCount++;
  resetInactivityTimer();
}

export function sessionEnd() {
  if (firedRef || !session || session.messageCount < 2) return;
  firedRef = true;
  fireNotify();
}

function extractEmail(transcript: string): string | null {
  const match = transcript.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  return match ? match[0] : null;
}

function extractName(transcript: string, email: string | null): string | null {
  // Look for "[user] I'm Sarah" / "[user] name is John" / name before email on same line
  const namePatterns = [
    /\[user\][^\n]*(?:i'm|i am|my name is|name's|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /\[user\]\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)[,\s]+([A-Za-z0-9._%+-]+@)/,
  ];
  for (const re of namePatterns) {
    const m = transcript.match(re);
    if (m) return m[1].trim();
  }
  // Fall back to local part of email, capitalised
  if (email) {
    const local = email.split('@')[0].replace(/[._-]/g, ' ');
    return local.charAt(0).toUpperCase() + local.slice(1);
  }
  return null;
}

function fireNotify() {
  if (!session) return;
  const visitorEmail = extractEmail(session.transcript);
  const visitorName = extractName(session.transcript, visitorEmail);
  const payload = JSON.stringify({
    transcript: session.transcript,
    visitorType: session.visitorType,
    messageCount: session.messageCount,
    durationMs: Date.now() - session.startedAt,
    visitorEmail,
    visitorName,
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/notify', new Blob([payload], { type: 'application/json' }));
  } else {
    fetch('/api/notify', { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' }, keepalive: true });
  }
  session = null;
}

function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(sessionEnd, INACTIVITY_MS);
}

// Fires via: inactivity timer (5 min), explicit drawer close, or the tab
// actually closing/navigating away (pagehide).
//
// pagehide only fires on real unload (tab close, address-bar navigation,
// bfcache eviction) — never on a simple tab switch. visibilitychange and
// beforeunload were tried here before and removed: visibilitychange fires
// on every tab switch mid-conversation (not just closing), which caused
// 2-3 duplicate emails per visitor. pagehide doesn't have that problem,
// and sendBeacon (used in fireNotify) is built to survive it reliably.
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', sessionEnd);
}
