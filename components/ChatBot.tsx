"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Здравей! Аз съм Пиратският помощник 🏴‍☠️ Питай ме за оферти, дестинации, цени или как да резервираш!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Съжалявам, опитай пак." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Съжалявам, имам технически проблем. Обади се на +359 888 123 456.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed right-4 z-[60] w-[min(calc(100vw-2rem),360px)] rounded-3xl flex flex-col overflow-hidden"
          style={{
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 92px)",
            height: "min(480px, calc(100dvh - 160px))",
            background: "#FFFFFF",
            border: "1px solid #E8D9B0",
            boxShadow: "0 20px 60px rgba(180,140,20,0.2), 0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 shrink-0"
            style={{ background: "linear-gradient(135deg, #B8860B 0%, #D4A017 60%, #FFD700 100%)" }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🏴‍☠️</span>
              <div>
                <p className="font-black text-[#1C1208] text-sm leading-tight">Пиратски помощник</p>
                <p className="text-[#1C1208]/60 text-[10px]">AI · Отговаря на български</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-[#1C1208]/60 hover:text-[#1C1208] transition-opacity p-1"
              aria-label="Затвори чата"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide" style={{ background: "#FDF6E8" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center mr-2 mt-1 shrink-0"
                    style={{ background: "#D4A017" }}
                  >
                    <Bot className="w-4 h-4" style={{ color: "#1C1208" }} />
                  </div>
                )}
                <div
                  className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { background: "#D4A017", color: "#1C1208", fontWeight: 600, borderBottomRightRadius: 4 }
                      : { background: "#FFFFFF", color: "#1C1208", border: "1px solid #E8D9B0", borderBottomLeftRadius: 4 }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center mr-2 shrink-0"
                  style={{ background: "#D4A017" }}
                >
                  <Bot className="w-4 h-4" style={{ color: "#1C1208" }} />
                </div>
                <div className="px-4 py-3.5 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E8D9B0" }}>
                  <div className="flex gap-1.5">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: "#D4A017", animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 p-3 shrink-0"
            style={{ background: "#FFFFFF", borderTop: "1px solid #E8D9B0" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напиши съобщение..."
              className="flex-1 text-sm px-4 py-2.5 rounded-2xl outline-none"
              style={{
                background: "#FDF6E8",
                color: "#1C1208",
                border: "1px solid #E8D9B0",
              }}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-40 transition-colors shrink-0"
              style={{ background: "#D4A017" }}
              aria-label="Изпрати"
            >
              <Send className="w-4 h-4" style={{ color: "#1C1208" }} />
            </button>
          </form>
        </div>
      )}

      {/* Floating AI button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-4 z-[60] flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 92px)",
          width: 58,
          height: 58,
          background: "linear-gradient(135deg, #B8860B 0%, #D4A017 60%, #FFD700 100%)",
          borderRadius: "50%",
          boxShadow: "0 8px 24px rgba(212,160,23,0.5), 0 0 0 2px rgba(212,160,23,0.2)",
          display: open ? "none" : "flex",
        }}
        aria-label="Отвори AI помощник"
      >
        <MessageCircle className="w-6 h-6" style={{ color: "#1C1208" }} />
        <span className="text-[8px] font-black leading-none mt-0.5 tracking-wide" style={{ color: "#1C1208" }}>
          AI
        </span>
      </button>
    </>
  );
}
