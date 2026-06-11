interface SessionData {
  transcript: string;
  visitorType: string | null;
  messageCount: number;
  startedAt: number;
}

let session: SessionData | null = null;
let firedRef = false;
let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

const INACTIVITY_MS = 5 * 60 * 1000; // 5 minutes idle

export function sessionStart(visitorType: string | null) {
  session = { transcript: '', visitorType, messageCount: 0, startedAt: Date.now() };
  firedRef = false;
  resetInactivityTimer();
}

export function sessionAddMessage(role: 'user' | 'agent', text: string) {
  if (!session) return;
  session.transcript += `[${role}] ${text}\n`;
  session.messageCount++;
  resetInactivityTimer();
}

export function sessionEnd() {
  if (firedRef || !session || session.messageCount < 2) return;
  firedRef = true;
  fireNotify();
}

function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(sessionEnd, INACTIVITY_MS);
}

function fireNotify() {
  if (!session) return;
  const payload = JSON.stringify({
    transcript: session.transcript,
    visitorType: session.visitorType,
    messageCount: session.messageCount,
    durationMs: Date.now() - session.startedAt,
  });
  // sendBeacon works even during tab close / navigation
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/notify', new Blob([payload], { type: 'application/json' }));
  } else {
    fetch('/api/notify', { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' }, keepalive: true });
  }
  session = null;
}

// Fire on tab close / navigation
if (typeof window !== 'undefined') {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') sessionEnd();
  });
  window.addEventListener('beforeunload', sessionEnd);
}
