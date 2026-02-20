import React, { useEffect, useRef, useState } from "react";
import { postCopilotAsk } from "../api/insights";

type Msg = { role: "user" | "assistant"; content: string };

 

export default function CopilotDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! Ask me about savings trends, top issues, or what to investigate next.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const suggested = [
    "Why did savings drop last month?",
    "What are the top 3 sources of unsuccessful outcomes?",
    "Which month had the best savings and why?",
    "Give me 3 actions to increase savings next month.",
  ];

  useEffect(() => {
    if (open) setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, [open, messages.length]);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;

    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);

    try {
      const data = await postCopilotAsk(q);
      setMessages((m) => [...m, { role: "assistant", content: data.answer }]);
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "You reach the backend. But I don't have an answer for that question because I am not connected to an LLM yet. " +
            (err?.message ?? String(err)),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cpBackdrop ${open ? "open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <aside className={`cpDrawer ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="cpHeader">
          <div className="cpTitle">
            <span className="cpDot" />
            Copilot
          </div>
          <button className="cpClose" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="cpBody">
          <div className="cpSuggestions">
            {suggested.map((s) => (
              <button
                key={s}
                className="cpChip"
                onClick={() => ask(s)}
                disabled={loading}
                type="button"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="cpChat">
            {messages.map((m, i) => (
              <div key={i} className={`cpMsg ${m.role}`}>
                <div className="cpBubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="cpMsg assistant">
                <div className="cpBubble">Thinking…</div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form className="cpComposer" onSubmit={onSubmit}>
            <textarea
              className="cpInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Ask: "Why did savings drop in April?"'
              rows={2}
              disabled={loading}
            />
            <button className="cpSend" type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}