import { useState, useRef, useEffect, useCallback } from 'react';
import { classifyVisitor, getPitch, type VisitorType } from '../lib/pitchTemplates';
import { streamChat, type ChatMessage } from '../lib/claude';
import { sessionStart, sessionAddMessage, sessionEnd } from '../lib/sessionTracker';

interface Message { role: 'bot' | 'user'; text: string; }

const CHIPS = [
  { label: 'hiring', q: "i'm hiring / looking for an AI engineer" },
  { label: 'building something', q: "i'm building a startup, maybe looking to collab" },
  { label: 'open source', q: "want to collaborate on open source" },
  { label: 'investor', q: "i'm an investor" },
  { label: 'just exploring', q: "just exploring, curious about Shubham" },
];

const OPENING = "hey — hiring, building, or just exploring?";

export default function AgentDrawer() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([
    { role: 'bot', text: OPENING },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(400);
  const [visitorType, setVisitorType] = useState<VisitorType | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const msgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef(false);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || typing) return;
    setChipsVisible(false);

    const userMsg: Message = { role: 'user', text };
    setMsgs((prev) => [...prev, userMsg]);

    /* first message → classify, pitch, start session */
    if (visitorType === null) {
      const type = classifyVisitor(text);
      setVisitorType(type);
      const pitch = getPitch(type);
      setMsgs((prev) => [...prev, { role: 'bot', text: pitch }]);
      setHistory([
        { role: 'user', content: text },
        { role: 'assistant', content: pitch },
      ]);
      sessionStart(type);
      sessionAddMessage('user', text);
      sessionAddMessage('agent', pitch);
      return;
    }

    /* subsequent messages → stream from Claude */
    sessionAddMessage('user', text);
    const nextHistory: ChatMessage[] = [
      ...history,
      { role: 'user', content: text },
    ];
    setHistory(nextHistory);
    setTyping(true);

    /* add placeholder for streaming */
    setMsgs((prev) => [...prev, { role: 'bot', text: '' }]);

    streamChat(
      nextHistory,
      visitorType,
      (chunk) => {
        setMsgs((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'bot',
            text: updated[updated.length - 1].text + chunk,
          };
          return updated;
        });
      },
      () => {
        setTyping(false);
        setMsgs((prev) => {
          const last = prev[prev.length - 1];
          setHistory((h) => [...h, { role: 'assistant', content: last.text }]);
          sessionAddMessage('agent', last.text);
          return prev;
        });
      },
      (err) => {
        setTyping(false);
        setMsgs((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'bot',
            text: `error: ${err} — reach shubham at kshubham04907@gmail.com`,
          };
          return updated;
        });
      },
    );
  }, [visitorType, typing, history]);

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  /* drag-to-resize */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const newW = window.innerWidth - e.clientX;
      if (newW >= 300 && newW <= window.innerWidth * 0.85) setDrawerWidth(newW);
    };
    const onUp = () => { resizingRef.current = false; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
  }, []);

  return (
    <>
      <button id="tour-agent" className={`agent-tab${open ? ' hidden' : ''}`} onClick={() => setOpen(true)}>
        <span className="agent-tab-dot" />
        <span className="agent-tab-prompt">&gt;_</span>
        <span className="agent-tab-label">skg-agent</span>
      </button>

      <div
        ref={drawerRef}
        className={`agent-drawer${open ? ' open' : ''}`}
        style={{ width: drawerWidth }}
      >
        <div
          className="drawer-handle"
          onMouseDown={(e) => { resizingRef.current = true; e.preventDefault(); }}
        />
        <div className="agent-head">
          <div className="agent-head-bar">
            <span className="agent-head-path">shubham@agent:~$</span>
            <button className="agent-head-close" onClick={() => { setOpen(false); sessionEnd(); }}>✕ close</button>
          </div>
          <div className="agent-head-meta">
            <span className="agent-online-dot" />
            <span className="agent-head-sub">skg-agent v2 · claude api · online</span>
          </div>
        </div>

        <div className="term-msgs" ref={msgsRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`term-line ${m.role}`}>
              <span className="term-prefix">{m.role === 'bot' ? '>' : '$'}</span>
              <span className="term-text">{m.text}</span>
            </div>
          ))}
          {typing && msgs[msgs.length - 1]?.text === '' && (
            <div className="typing-bubble">
              <span /><span /><span />
            </div>
          )}
        </div>

        {chipsVisible && (
          <div className="chip-wrap">
            {CHIPS.map((c) => (
              <button key={c.label} className="chip" onClick={() => sendMessage(c.q)}>
                {c.label}
              </button>
            ))}
          </div>
        )}

        <div className="term-input-area">
          <div className="term-input-row">
            <span className="term-input-prefix">$</span>
            <input
              ref={inputRef}
              className="chat-input"
              placeholder="type your query…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { handleSend(); } }}
            />
            <button className="chat-send" onClick={handleSend} disabled={typing}>run</button>
          </div>
          <div className="term-powered">powered by claude api</div>
        </div>
      </div>
    </>
  );
}
