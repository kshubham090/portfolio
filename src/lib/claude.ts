export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function streamChat(
  messages: ChatMessage[],
  visitorType: string | null,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (err: string) => void,
) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, visitorType }),
    });

    if (!res.ok) {
      onError(`api error ${res.status}`);
      return;
    }

    const reader = res.body?.getReader();
    if (!reader) { onError('no stream'); return; }

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      onChunk(decoder.decode(value, { stream: true }));
    }
    onDone();
  } catch (e) {
    onError(e instanceof Error ? e.message : 'unknown error');
  }
}
