"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { href: "/",                  label: "Начало"                   },
  { href: "/destinacii",        label: "Всички оферти"            },
  { href: "/destinacii",        label: "Дестинации"               },
  { href: "/za-nas",            label: "За нас"                   },
  { href: "/destinacii",        label: "Пътуване с автобус"       },
  { href: "/#faq",              label: "Често задавани въпроси"   },
  { href: "/kontakti",          label: "Контакти"                 },
];

const USEFUL_LINKS = [
  { href: "/kontakti",          label: "Условия за пътуване"         },
  { href: "/kontakti",          label: "Плащане и резервации"         },
  { href: "/poveritelnost",     label: "Политика за поверителност"    },
  { href: "/obshti-uslovia",    label: "Общи условия"                 },
  { href: "/",                  label: "Блог"                         },
  { href: "/kontakti",          label: "Отзиви"                       },
];

function ColTitle({ children }: { children: string }) {
  return (
    <span
      className="inline-block mb-4"
      style={{
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        color: "#D4A017",
        textTransform: "uppercase",
        borderBottom: "2px solid #D4A017",
        paddingBottom: 7,
      }}
    >
      {children}
    </span>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-1 text-[#374151] text-[0.85rem] transition-all duration-200 hover:text-[#D4A017] hover:pl-1"
      >
        <span className="text-[#D4A017] leading-none">›</span>
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) { setStatus("error"); return; }
    setStatus("success");
    setEmail("");
  }

  return (
    <footer>

      {/* ══════════════════════════════════
          PART 1 — MAIN FOOTER (white)
      ══════════════════════════════════ */}
      <div style={{ background: "#FFFFFF", borderTop: "1px solid #F3F4F6" }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">

            {/* ── COL 1: Brand ── */}
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-4">
                {/* Pirate ship SVG */}
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20h20"/>
                  <path d="M5 20V10l7-7 7 7v10"/>
                  <path d="M12 3v17"/>
                  <path d="M9 10h6"/>
                </svg>
                <div className="leading-none">
                  <span className="block font-black tracking-[0.05em]" style={{ fontSize: "1.1rem", color: "#1C1208" }}>PIRATE</span>
                  <span className="block font-semibold tracking-[0.2em]" style={{ fontSize: "0.62rem", color: "#D4A017" }}>TRAVEL</span>
                </div>
              </div>

              <p className="mb-5 leading-relaxed" style={{ color: "#6B7280", fontSize: "0.85rem", maxWidth: 200 }}>
                Твоят компас към незабравими приключения. Открий света с комфорт, сигурност и пиратски дух.
              </p>

              {/* CTA */}
              <a
                href="tel:+359877121209"
                className="inline-flex items-center gap-2 font-semibold mb-3 transition-all duration-200 border border-[#D4A017] text-[#D4A017] hover:bg-[#D4A017] hover:text-white"
                style={{ borderRadius: 8, padding: "10px 18px", fontSize: "0.85rem" }}
              >
                <Phone className="w-4 h-4" /> Обади се сега
              </a>

              <p style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
                Работно време: 09:00 – 20:00 ч.
              </p>
            </div>

            {/* ── COL 2: Quick Links ── */}
            <div>
              <ColTitle>Бързи Връзки</ColTitle>
              <ul className="flex flex-col gap-2.5">
                {QUICK_LINKS.map(({ href, label }) => (
                  <NavLink key={label} href={href} label={label} />
                ))}
              </ul>
            </div>

            {/* ── COL 3: Useful ── */}
            <div>
              <ColTitle>Полезно</ColTitle>
              <ul className="flex flex-col gap-2.5">
                {USEFUL_LINKS.map(({ href, label }) => (
                  <NavLink key={label} href={href} label={label} />
                ))}
              </ul>
            </div>

            {/* ── COL 4: Contacts ── */}
            <div>
              <ColTitle>Контакти</ColTitle>
              <ul className="flex flex-col gap-3.5 mb-5">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#D4A017" }} />
                  <a href="tel:+359877121209" className="text-[#374151] text-[0.85rem] hover:text-[#D4A017] transition-colors">
                    0877 121 209
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#D4A017" }} />
                  <a href="mailto:piratetravelagencybg@gmail.com" className="text-[#374151] text-[0.82rem] hover:text-[#D4A017] transition-colors break-all">
                    piratetravelagencybg@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#D4A017" }} />
                  <span className="text-[#374151] text-[0.82rem] leading-snug">
                    гр. Благоевград,<br />
                    ул. Свети Димитър Солунски 17
                  </span>
                </li>
              </ul>

              {/* Social icons */}
              <div className="flex gap-2">
                {/* Facebook */}
                <a href="https://www.facebook.com/piratetravelagency" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border border-[#E5E7EB] text-[#6B7280] hover:border-[#D4A017] hover:text-[#D4A017] hover:bg-[#FFF9EE]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/piratetravelagency" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border border-[#E5E7EB] text-[#6B7280] hover:border-[#D4A017] hover:text-[#D4A017] hover:bg-[#FFF9EE]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border border-[#E5E7EB] text-[#6B7280] hover:border-[#D4A017] hover:text-[#D4A017] hover:bg-[#FFF9EE]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bottom bar */}
        <div style={{ borderTop: "1px solid #F3F4F6" }}>
          <div className="max-w-6xl mx-auto px-6 py-4 text-center">
            <p style={{ color: "#9CA3AF", fontSize: "0.72rem" }}>
              © 2025 Pirate Travel Agency — Благоевград, България
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          PART 2 — NEWSLETTER STRIP
      ══════════════════════════════════ */}
      <div style={{ background: "#FDF6E8", borderTop: "1px solid #E8D9B0" }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

            {/* Left */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
                <span style={{ fontWeight: 700, color: "#1C1208", fontSize: "1rem" }}>
                  Абонирай се за оферти
                </span>
              </div>
              <p style={{ color: "#6B7280", fontSize: "0.82rem" }}>
                Получавай най-добрите предложения първи в твоята пощенска кутия.
              </p>
            </div>

            {/* Right — form */}
            {status === "success" ? (
              <p style={{ color: "#D4A017", fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                ✓ Успешно се абонирахте!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="Вашият имейл"
                  className="flex-1 md:w-60 text-sm outline-none"
                  style={{
                    background: "#FFFFFF",
                    border: status === "error" ? "1.5px solid #EF4444" : "1.5px solid #E8D9B0",
                    borderRadius: 8,
                    padding: "10px 14px",
                    color: "#1C1208",
                  }}
                />
                <button
                  type="submit"
                  className="font-semibold transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{
                    background: "#D4A017",
                    color: "#FFFFFF",
                    borderRadius: 8,
                    padding: "10px 18px",
                    fontSize: "0.85rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  → Абонирай се
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          PART 3 — BEACH PHOTO STRIP
          (taller on mobile to cover bottom nav)
      ══════════════════════════════════ */}
      <div className="relative h-[190px] md:h-[180px]">
        <Image
          src="/images/footer-ocean.webp"
          alt="Ocean waves"
          fill
          className="object-cover object-center"
          sizes="100vw"
          loading="lazy"
        />
      </div>
    </footer>
  );
}
