import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const NAV_LINKS = [
  { href: "/",                  label: "Начало"            },
  { href: "/destinacii",        label: "Дестинации"        },
  { href: "/personalni-oferti", label: "Персонална оферта" },
  { href: "/za-nas",            label: "За нас"            },
  { href: "/kontakti",          label: "Контакти"          },
];

const CONTACTS = [
  { Icon: Phone,  text: "0877 121 209",                          href: "tel:+359877121209"                     },
  { Icon: Mail,   text: "piratetravelagencybg@gmail.com",        href: "mailto:piratetravelagencybg@gmail.com" },
  { Icon: MapPin, text: "бул. Свети Димитър Солунски 17, Благоевград", href: null                             },
  { Icon: Clock,  text: "Пон–Пет: 09:00–18:00",                 href: null                                    },
];

const colTitle = {
  display: "block",
  fontSize: "0.65rem",
  fontWeight: 800,
  textTransform: "uppercase" as const,
  letterSpacing: "0.18em",
  color: "#D4A017",
  marginBottom: "1.1rem",
};

export default function Footer() {
  return (
    <footer style={{ background: "#0F0F0F", borderTop: "3px solid #D4A017" }}>

      {/* ── MAIN GRID ── */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center md:text-left">

          {/* LEFT — Logo + tagline + social */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="leading-none mb-3">
              <span
                className="block"
                style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "0.05em" }}
              >
                PIRATE
              </span>
              <span
                className="block mt-[1px] text-center md:text-left"
                style={{ color: "#D4A017", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.2em" }}
              >
                TRAVEL
              </span>
            </Link>

            <p
              className="mb-6 italic"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: 8, maxWidth: 240 }}
            >
              Превръщаме пътуването в приключение
            </p>

            {/* Social icons — inline SVG so currentColor works for hover */}
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/piratetravelagency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-[#D4A017] text-white/60 hover:text-[#D4A017]"
                style={{ background: "transparent" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/piratetravelagency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-[#D4A017] text-white/60 hover:text-[#D4A017]"
                style={{ background: "transparent" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* MIDDLE — Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <span style={colTitle}>Навигация</span>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors duration-200 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Contacts */}
          <div className="flex flex-col items-center md:items-start">
            <span style={colTitle}>Контакти</span>
            <ul className="flex flex-col gap-3">
              {CONTACTS.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-2.5 text-left">
                  <Icon
                    style={{ width: 14, height: 14, color: "#D4A017", flexShrink: 0, marginTop: 2 }}
                  />
                  {href ? (
                    <a
                      href={href}
                      className="transition-colors duration-200 hover:text-white leading-snug"
                      style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="leading-snug" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── SEPARATOR ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="py-4 pb-24 md:pb-4 text-center"
        style={{ background: "rgba(0,0,0,0.3)" }}
      >
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>
          © 2025 Pirate Travel Agency — Благоевград, България
        </p>
      </div>
    </footer>
  );
}
