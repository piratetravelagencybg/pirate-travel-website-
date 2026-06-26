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
  { Icon: Phone,  text: "0877 121 209",                   href: "tel:+359877121209"                      },
  { Icon: Mail,   text: "piratetravelagencybg@gmail.com", href: "mailto:piratetravelagencybg@gmail.com" },
  { Icon: MapPin, text: "Благоевград",                    href: null                                     },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* ── OCEAN BACKGROUND IMAGE + OVERLAY ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/footer-ocean.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient overlay: white top → waves visible → dark bottom for text */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.15) 32%, rgba(10,20,40,0.72) 62%, rgba(10,20,40,0.97) 100%)",
        }}
      />

      {/* ── CONTENT (sits above overlays) ── */}
      <div className="relative z-10 pt-52 md:pt-60 pb-0">
        <div className="max-w-3xl mx-auto px-5 text-center">

          {/* Logo */}
          <div className="mb-3">
            <Image
              src="/images/logo-full.png"
              alt="Pirate Travel Agency"
              width={110}
              height={110}
              className="mx-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Tagline */}
          <p
            className="mb-6 italic"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.9rem",
            }}
          >
            Превръщаме пътуването в приключение
          </p>

          {/* Social icons */}
          <div className="flex justify-center gap-3 mb-7">
            {SOCIAL.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:border-[#D4A017] hover:text-[#D4A017] text-white"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center items-center gap-0 mb-6">
            {NAV_LINKS.map(({ href, label }, i) => (
              <Fragment key={href}>
                <Link
                  href={href}
                  className="transition-colors duration-200 hover:text-white px-3 py-1"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 500,
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

          {/* Contact strip */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-0 mb-8">
            {CONTACTS.map(({ Icon, text, href }, i) => (
              <Fragment key={text}>
                {i > 0 && (
                  <span className="hidden md:block mx-3" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                )}
                <div className="flex items-center gap-1.5">
                  <Icon style={{ width: 12, height: 12, color: "#D4A017", flexShrink: 0 }} />
                  {href ? (
                    <a
                      href={href}
                      className="transition-colors duration-200 hover:text-white"
                      style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{text}</span>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="py-4 pb-24 md:pb-4 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem" }}>
            © 2025 Pirate Travel Agency — Благоевград, България
          </p>
        </div>
      </div>
    </footer>
  );
}
