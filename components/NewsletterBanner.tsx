"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterBanner() {
  const [email,  setEmail]  = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !agreed) { setStatus("error"); return; }
    setStatus("success");
    setEmail("");
    setAgreed(false);
  }

  return (
    <section className="px-5 my-16">
      <div
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A2340 0%, #071A2E 60%, #0D2A1A 100%)",
          boxShadow: "0 20px 60px rgba(7,26,46,0.35)",
        }}
      >
        <div className="px-8 py-12 md:px-14 md:py-14">
          {/* ── CONTENT ── */}
          <div className="max-w-xl mx-auto text-center">

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg,#C07810,#F5C842)" }}
            >
              <Send className="w-6 h-6" style={{ color: "#071A2E" }} />
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
              Ексклузивни оферти{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg,#C07810,#F5C842)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                директно при теб
              </span>
            </h2>
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Абонирай се и получавай специални намаления и нови оферти преди всички останали.
            </p>

            {/* ── FORM ── */}
            {status === "success" ? (
              <div
                className="rounded-2xl px-6 py-8 text-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p className="text-3xl mb-2">✅</p>
                <p className="font-black text-white text-base">Успешно се абонирахте!</p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Очаквайте нашите оферти скоро.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Email input */}
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="Твоят имейл адрес"
                  className="w-full rounded-2xl px-5 py-4 text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: status === "error" && !email
                      ? "1.5px solid rgba(239,68,68,0.7)"
                      : "1.5px solid rgba(255,255,255,0.12)",
                    color: "#FFFFFF",
                  }}
                />

                {/* Submit button — full width */}
                <button
                  type="submit"
                  className="w-full font-black py-4 rounded-2xl text-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg,#C07810,#F5C842)", color: "#071A2E" }}
                >
                  <Send className="w-4 h-4" />
                  Абонирай се
                </button>

                {/* Checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer text-left mt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className="mt-0.5 shrink-0 w-4 h-4 accent-yellow-400"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Съгласявам се с{" "}
                    <span className="underline" style={{ color: "rgba(255,255,255,0.7)" }}>
                      общите условия
                    </span>{" "}
                    и политиката за поверителност.
                  </span>
                </label>

                {/* Error message */}
                {status === "error" && (
                  <p className="text-xs text-center" style={{ color: "rgba(239,68,68,0.9)" }}>
                    {!email ? "Моля въведи имейл адрес." : "Приеми условията, за да продължиш."}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
