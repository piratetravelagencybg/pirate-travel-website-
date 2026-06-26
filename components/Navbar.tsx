"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Home, Compass, Sparkles, Anchor, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/destinacii",       label: "Дестинации" },
  { href: "/destinacii",       label: "Оферти"     },
  { href: "/za-nas",           label: "За нас"     },
  { href: "/kontakti",         label: "Контакти"   },
];

const MOBILE_LINKS = [
  { href: "/",                  label: "Начало",            Icon: Home     },
  { href: "/destinacii",        label: "Оферти",            Icon: Compass  },
  { href: "/personalni-oferti", label: "Персонална оферта", Icon: Sparkles },
  { href: "/za-nas",            label: "За нас",            Icon: Anchor   },
  { href: "/kontakti",          label: "Контакти",          Icon: Phone    },
];

const goldGrad: React.CSSProperties = {
  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
};

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();
  const dropRef                 = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";
  const solid  = scrolled || !isHome;

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const linkColor = solid ? "#374151" : "rgba(255,255,255,0.92)";
  const logoColor = solid
    ? { background: "linear-gradient(135deg,#C07810,#F5C842)", WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text" as const }
    : { color: "#FFFFFF" };

  return (
    <header
      className="fixed z-50"
      style={{
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(calc(100% - 24px), 1100px)",
      }}
    >
      <div
        className="flex items-center h-14 px-4 gap-3 transition-all duration-300"
        style={solid ? {
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: 9999,
          boxShadow: "0 4px 32px rgba(7,26,46,0.13), 0 1px 4px rgba(7,26,46,0.06)",
          border: "1px solid rgba(189,213,238,0.55)",
        } : {
          background: "rgba(0,0,0,0.08)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: 9999,
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0 leading-none mr-2 text-center">
          <span className="block font-black text-[14px] tracking-[0.22em] uppercase" style={logoColor}>
            PIRATE
          </span>
          <span
            className="block font-bold text-[8px] tracking-[0.38em] uppercase mt-[1px]"
            style={solid
              ? { background: "linear-gradient(135deg,#C07810,#F5C842)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
              : { color: "rgba(255,255,255,0.75)" }
            }
          >
            TRAVEL
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {NAV_LINKS.map(link => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  color:      active ? (solid ? "#1A6EBD" : "#F5C842") : linkColor,
                  background: active ? (solid ? "rgba(26,110,189,0.08)" : "rgba(255,255,255,0.12)") : "transparent",
                  fontWeight: active ? 700 : 500,
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.background =
                    solid ? "rgba(26,110,189,0.06)" : "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Spacer on mobile */}
        <div className="flex-1 lg:hidden" />

        {/* Phone — desktop */}
        <a
          href="tel:+359877121209"
          className="hidden lg:flex items-center gap-1.5 text-sm font-semibold shrink-0 mr-1"
          style={{ color: linkColor }}
        >
          <Phone className="w-3.5 h-3.5" style={{ color: "#D4A017" }} />
          0877 121 209
        </a>

        {/* CTA button — desktop */}
        <Link
          href="/personalni-oferti"
          className="hidden lg:block shrink-0 font-black text-[13px] px-5 py-2 rounded-full transition-opacity hover:opacity-90"
          style={{ ...goldGrad, color: "#071A2E" }}
        >
          Запитване →
        </Link>

        {/* Hamburger */}
        <div className="lg:hidden relative" ref={dropRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-opacity hover:opacity-90"
            style={goldGrad}
            aria-label="Меню"
          >
            {open
              ? <X    className="w-4 h-4" style={{ color: "#071A2E" }} />
              : <Menu className="w-4 h-4" style={{ color: "#071A2E" }} />
            }
          </button>

          {/* Floating dropdown */}
          <div
            className="absolute right-0 mt-3 w-60 overflow-hidden"
            style={{
              background: "#ffffff",
              borderRadius: 24,
              boxShadow: "0 20px 60px rgba(7,26,46,0.2), 0 4px 12px rgba(7,26,46,0.08)",
              border: "1px solid rgba(189,213,238,0.4)",
              transformOrigin: "top right",
              transform: open ? "scale(1) translateY(0)" : "scale(0.9) translateY(-10px)",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "all" : "none",
              transition: "transform 0.24s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease",
            }}
          >
            {/* Links */}
            <div className="p-2 pt-2.5">
              {MOBILE_LINKS.map(({ href, label, Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href + label}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-all"
                    style={{
                      color:      active ? "#071A2E" : "#4B5563",
                      background: active ? "rgba(7,26,46,0.07)" : "transparent",
                      fontWeight: active ? 700 : 500,
                    }}
                  >
                    {/* Icon box — navy always, white icon when active */}
                    <span
                      className="shrink-0 flex items-center justify-center rounded-xl"
                      style={{
                        width: 32,
                        height: 32,
                        background: active ? "#071A2E" : "rgba(7,26,46,0.08)",
                      }}
                    >
                      <Icon
                        style={{
                          width: 15,
                          height: 15,
                          color: active ? "#FFFFFF" : "#071A2E",
                        }}
                      />
                    </span>
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="mx-4 mb-2" style={{ height: 1, background: "rgba(7,26,46,0.07)" }} />

            {/* CTA */}
            <div className="px-3 pb-3">
              <Link
                href="/personalni-oferti"
                className="flex items-center justify-center gap-2 font-black text-sm py-3 rounded-2xl transition-opacity hover:opacity-90"
                style={{ ...goldGrad, color: "#071A2E" }}
              >
                Запитване за оферта
                <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
