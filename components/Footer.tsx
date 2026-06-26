import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";

const NAV_LINKS = [
  { href: "/",                  label: "Начало"             },
  { href: "/destinacii",        label: "Дестинации"         },
  { href: "/personalni-oferti", label: "Персонална оферта"  },
  { href: "/za-nas",            label: "За нас"             },
  { href: "/kontakti",          label: "Контакти"           },
];

const CONTACT_ITEMS = [
  { Icon: Phone,   text: "0877 121 209",                   href: "tel:+359877121209" },
  { Icon: Mail,    text: "piratetravelagencybg@gmail.com", href: "mailto:piratetravelagencybg@gmail.com" },
  { Icon: MapPin,  text: 'бул. „Свети Димитър Солунски" 17, Благоевград', href: null },
  { Icon: Clock,   text: "Пон–Пет: 09:00–18:00",          href: null },
];

const SOCIAL = [
  { href: "https://www.facebook.com/piratetravelagency",  Icon: Facebook,  label: "Facebook"  },
  { href: "https://www.instagram.com/piratetravelagency", Icon: Instagram, label: "Instagram" },
];

const goldGrad: React.CSSProperties = {
  background: "linear-gradient(135deg,#C07810,#F5C842)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function Footer() {
  return (
    <footer style={{ background: "#1C1208" }}>
      <div className="max-w-6xl mx-auto px-5 pt-12 pb-24 md:pb-8">

        {/* ── 3 COLUMNS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10 text-center md:text-left">

          {/* LEFT — Logo + description + social */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="leading-none mb-5 text-center md:text-left">
              <span className="block font-black text-[17px] tracking-[0.22em] uppercase" style={goldGrad}>
                PIRATE
              </span>
              <span
                className="block font-bold text-[10px] tracking-[0.38em] uppercase mt-[1px]"
                style={{ color: "rgba(253,246,232,0.45)" }}
              >
                TRAVEL
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-[260px]" style={{ color: "rgba(253,246,232,0.55)" }}>
              Туристическа агенция от Благоевград, специализирана в организирането на незабравими групови екскурзии.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/20 hover:border-[#D4A017] text-white/50 hover:text-[#D4A017]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* MIDDLE — Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h3
              className="text-[10px] font-black uppercase tracking-[0.2em] mb-5"
              style={{ color: "#D4A017" }}
            >
              Навигация
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200 hover:text-[#D4A017]"
                    style={{ color: "rgba(253,246,232,0.6)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3
              className="text-[10px] font-black uppercase tracking-[0.2em] mb-5"
              style={{ color: "#D4A017" }}
            >
              Контакти
            </h3>
            <ul className="flex flex-col gap-3">
              {CONTACT_ITEMS.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-2.5 text-left">
                  <Icon
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "#D4A017", opacity: 0.75 }}
                  />
                  {href ? (
                    <a
                      href={href}
                      className="text-sm leading-snug transition-colors duration-200 hover:text-[#D4A017]"
                      style={{ color: "rgba(253,246,232,0.6)" }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm leading-snug" style={{ color: "rgba(253,246,232,0.6)" }}>
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(253,246,232,0.3)" }}
        >
          <p>© 2025 Pirate Travel Agency. Всички права запазени.</p>
          <div className="flex items-center gap-2">
            <Link
              href="/obshti-uslovia"
              className="transition-colors duration-200 hover:text-[#D4A017]"
            >
              Общи условия
            </Link>
            <span style={{ opacity: 0.4 }}>|</span>
            <Link
              href="/poveritelnost"
              className="transition-colors duration-200 hover:text-[#D4A017]"
            >
              Политика за поверителност
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
