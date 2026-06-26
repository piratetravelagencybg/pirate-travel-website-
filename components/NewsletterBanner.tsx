"use client";

import { useState } from "react";
import Image from "next/image";

export default function NewsletterBanner() {
  const [email,   setEmail]   = useState("");
  const [agreed,  setAgreed]  = useState(false);
  const [status,  setStatus]  = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !agreed) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="max-w-6xl mx-auto px-5 my-16">
      <div
        className="relative rounded-2xl overflow-hidden px-8 py-12 md:py-14"
        style={{ background: "#071A2E" }}
      >
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="1200px"
            aria-hidden
          />
        </div>
        {/* Left tint */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(7,26,46,0.85) 0%, rgba(7,26,46,0.4) 100%)" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-10">

          {/* Left text */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
              Готов за следващото{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                приключение?
              </span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Абонирай се за нашия бюлетин и получавай ексклузивни оферти и вдъхновение за пътешествия.
            </p>
          </div>

          {/* Right form */}
          <div className="w-full md:w-auto md:min-w-[340px] shrink-0">
            {status === "success" ? (
              <div className="text-center py-4">
                <p className="text-xl mb-1">✅</p>
                <p className="font-bold text-white text-sm">Успешно се абонирахте!</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Ще получавате нашите оферти.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2 mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                    placeholder="Имейл адрес"
                    className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: status === "error" && !email
                        ? "1px solid rgba(239,68,68,0.6)"
                        : "1px solid rgba(255,255,255,0.15)",
                      color: "#FFFFFF",
                    }}
                  />
                  <button
                    type="submit"
                    className="font-black px-5 py-3 rounded-xl text-sm shrink-0 transition-opacity hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
                      color: "#071A2E",
                    }}
                  >
                    Абонирай се →
                  </button>
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    className="mt-0.5 shrink-0 accent-yellow-400"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Съгласявам се с{" "}
                    <span className="underline cursor-pointer" style={{ color: "rgba(255,255,255,0.75)" }}>
                      общите условия
                    </span>{" "}
                    и политиката за поверителност.
                  </span>
                </label>
                {status === "error" && (
                  <p className="text-xs mt-2" style={{ color: "rgba(239,68,68,0.9)" }}>
                    Моля попълнете имейл и приемете условията.
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
