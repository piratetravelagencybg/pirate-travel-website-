import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

const NAV_LINKS = [
  { href: "/destinacii",        label: "Оферти"            },
  { href: "/za-nas",            label: "За нас"            },
  { href: "/personalni-oferti", label: "Персонална оферта" },
  { href: "/kontakti",          label: "Контакти"          },
];

const SOCIAL = [
  { href: "https://www.facebook.com/piratetravelagency",  Icon: Facebook,  label: "Facebook"  },
  { href: "https://www.instagram.com/piratetravelagency", Icon: Instagram, label: "Instagram" },
];

const CONTACTS = [
  { Icon: Phone,  text: "0877 121 209",                   href: "tel:+359877121209"                       },
  { Icon: Mail,   text: "piratetravelagencybg@gmail.com", href: "mailto:piratetravelagencybg@gmail.com"  },
  { Icon: MapPin, text: "Благоевград",                    href: null                                      },
];

/* Anchor watermark SVG */
function AnchorMark({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1C1208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <line x1="12" y1="22" x2="12" y2="8" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ borderTop: "3px solid #D4A017" }}>

      {/* ── WAVE SVG — top separator ── */}
      <div style={{ lineHeight: 0, background: "#FAFAF8" }}>
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          className="w-full"
          style={{ display: "block", height: 56 }}
        >
          <path
            d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z"
            fill="#F5EDD6"
          />
        </svg>
      </div>

      {/* ── MAIN BODY ── */}
      <div
        className="relative px-5 pt-8 pb-6"
        style={{ background: "linear-gradient(180deg, #F5EDD6 0%, #E8D5A3 60%, #D4B87A 100%)" }}
      >
        {/* Corner anchor watermarks */}
        <div className="absolute top-6 left-4 pointer-events-none select-none" style={{ opacity: 0.08 }}>
          <AnchorMark size={72} />
        </div>
        <div className="absolute top-6 right-4 pointer-events-none select-none" style={{ opacity: 0.08 }}>
          <AnchorMark size={72} />
        </div>

        <div className="max-w-4xl mx-auto text-center">

          {/* Logo */}
          <div className="mb-3">
            <Image
              src="/images/logo-full.png"
              alt="Pirate Travel Agency"
              width={120}
              height={120}
              className="mx-auto object-contain"
            />
          </div>

          {/* Tagline */}
          <p
            className="mb-6 italic"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "#5C4A1E",
              fontSize: "0.95rem",
            }}
          >
            Вашето пътешествие. Нашата мисия.
          </p>

          {/* Social icons */}
          <div className="flex justify-center gap-3 mb-8">
            {SOCIAL.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#D4A017] hover:text-white"
                style={{
                  background: "rgba(212,160,23,0.15)",
                  border: "1px solid #D4A017",
                  color: "#D4A017",
                }}
              >
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center items-center mb-7">
            {NAV_LINKS.map(({ href, label }, i) => (
              <Fragment key={href}>
                <Link
                  href={href}
                  className="transition-colors duration-200 hover:text-[#D4A017] px-3 py-1"
                  style={{
                    color: "#1C1208",
                    fontSize: "0.82rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                  }}
                >
                  {label}
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span style={{ color: "#D4A017", fontWeight: 300 }}>|</span>
                )}
              </Fragment>
            ))}
          </nav>

          {/* Contact row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-0">
            {CONTACTS.map(({ Icon, text, href }, i) => (
              <Fragment key={text}>
                {i > 0 && (
                  <span className="hidden md:block mx-4" style={{ color: "#D4A017" }}>|</span>
                )}
                <div className="flex items-center gap-1.5">
                  <Icon style={{ width: 13, height: 13, color: "#D4A017", flexShrink: 0 }} />
                  {href ? (
                    <a
                      href={href}
                      className="transition-colors duration-200 hover:text-[#D4A017]"
                      style={{ color: "#5C4A1E", fontSize: "0.8rem" }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ color: "#5C4A1E", fontSize: "0.8rem" }}>{text}</span>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="py-3 pb-24 md:pb-3 text-center"
        style={{ background: "#C9A85C" }}
      >
        <p style={{ color: "#5C4A1E", fontSize: "0.75rem" }}>
          © 2025 Pirate Travel Agency — Благоевград, България
        </p>
      </div>
    </footer>
  );
}
