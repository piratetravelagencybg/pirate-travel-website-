"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { saveInquiry } from "@/lib/supabase";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const ok = await saveInquiry({
      name: form.name,
      phone: form.contact.includes("@") ? "N/A" : form.contact,
      email: form.contact.includes("@") ? form.contact : undefined,
      message: form.message,
    });
    setStatus(ok ? "success" : "error");
  }

  const inputStyle: React.CSSProperties = {
    background: "#FAFAF8",
    border: "1px solid #BDD5EE",
    color: "#0D2240",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-16" style={{ minHeight: "100vh" }}>
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1A6EBD" }}>
          Свържи се с нас
        </span>
        <h1 className="text-3xl font-black mt-2 mb-3" style={{ color: "#0D2240" }}>Контакти</h1>
        <p style={{ color: "#5A8AB0" }}>
          Имаш въпроси? Пиши ни или се обади — ще отговорим в рамките на деня.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="space-y-4">
          {[
            { icon: Phone, label: "Телефон", value: "0877 121 209", href: "tel:+359877121209" },
            { icon: Mail, label: "Имейл", value: "piratetravelagencybg@gmail.com", href: "mailto:piratetravelagencybg@gmail.com" },
            { icon: MapPin, label: "Адрес", value: "Благоевград, България", href: null },
            { icon: Clock, label: "Работно време", value: "Пон–Пет: 09:00–18:00\nСъб: 10:00–14:00", href: null },
          ].map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="flex items-start gap-4 rounded-2xl p-4"
              style={{ background: "#FFFFFF", border: "1px solid #BDD5EE", boxShadow: "0 2px 8px rgba(26,110,189,0.07)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(26,110,189,0.1)" }}
              >
                <Icon className="w-5 h-5" style={{ color: "#1A6EBD" }} />
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "#5A8AB0" }}>{label}</p>
                {href ? (
                  <a href={href} className="font-medium transition-colors hover:text-[#1A6EBD]" style={{ color: "#0D2240" }}>
                    {value}
                  </a>
                ) : (
                  <p className="font-medium whitespace-pre-line" style={{ color: "#0D2240" }}>{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Social */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "#FFFFFF", border: "1px solid #BDD5EE" }}
          >
            <p className="text-xs mb-3" style={{ color: "#5A8AB0" }}>Социални мрежи</p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/piratetravelagency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:border-[#1A6EBD]"
                style={{ background: "#FAFAF8", border: "1px solid #BDD5EE", color: "#1E4A7A" }}
              >
                <Facebook className="w-4 h-4 text-blue-500" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/piratetravelagency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:border-[#1A6EBD]"
                style={{ background: "#FAFAF8", border: "1px solid #BDD5EE", color: "#1E4A7A" }}
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "#FFFFFF", border: "1px solid #BDD5EE", boxShadow: "0 4px 20px rgba(26,110,189,0.08)" }}
        >
          <h2 className="font-bold mb-4" style={{ color: "#0D2240" }}>Изпрати съобщение</h2>
          {status === "success" ? (
            <div className="text-center py-8">
              <p className="text-2xl mb-2">✅</p>
              <p className="font-bold" style={{ color: "#0D2240" }}>Съобщението е изпратено!</p>
              <p className="text-sm mt-1" style={{ color: "#5A8AB0" }}>Ще отговорим скоро.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                type="text"
                placeholder="Твоето име *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full text-sm px-4 py-3 rounded-xl outline-none placeholder:text-[#5A8AB0]"
                style={inputStyle}
              />
              <input
                required
                type="text"
                placeholder="Телефон или имейл *"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full text-sm px-4 py-3 rounded-xl outline-none placeholder:text-[#5A8AB0]"
                style={inputStyle}
              />
              <textarea
                required
                placeholder="Съобщение *"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full text-sm px-4 py-3 rounded-xl outline-none placeholder:text-[#5A8AB0] resize-none"
                style={inputStyle}
              />
              {status === "error" && (
                <p className="text-red-500 text-xs">Грешка. Обади се на 0877 121 209.</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full font-bold py-3.5 rounded-xl transition-all disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)", color: "#071A2E" }}
              >
                {status === "sending" ? "Изпращане..." : "Изпрати →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
