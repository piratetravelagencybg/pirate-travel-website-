"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone, X, Menu } from "lucide-react";

const DESKTOP_LINKS = [
  { href: "/destinacii",        label: "Дестинации", dropdown: true  },
  { href: "/destinacii",        label: "Оферти",     dropdown: false },
  { href: "/destinacii",        label: "Почивки",    dropdown: false },
  { href: "/za-nas",            label: "За нас",     dropdown: false },
  { href: "/za-nas",            label: "Блог",       dropdown: false },
  { href: "/kontakti",          label: "Контакти",   dropdown: false },
];

const DRAWER_LINKS = [
  { href: "/",                   label: "Начало",             emoji: "🏠" },
  { href: "/destinacii",         label: "Оферти",             emoji: "🌍" },
  { href: "/personalni-oferti",  label: "Персонална оферта",  emoji: "✨" },
  { href: "/za-nas",             label: "За нас",             emoji: "🏴‍☠️" },
  { href: "/kontakti",           label: "Контакти",           emoji: "📞" },
];

const goldGrad: React.CSSProperties = {
  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
};

const goldText: React.CSSProperties = {
  ...goldGrad,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const solid  = scrolled || !isHome;

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = solid ? "#1E4A7A" : "rgba(255,255,255,0.9)";

  return (
    <>
      {/* ── HEADER BAR ──────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={solid ? {
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(189,213,238,0.6)",
          boxShadow: "0 4px 20px rgba(7,26,46,0.08)",
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="shrink-0 leading-none">
            <span
              className="block font-black text-[15px] tracking-[0.2em] uppercase"
              style={solid ? goldText : { color: "#FFFFFF" }}
            >
              PIRATE
            </span>
            <span
              className="block font-bold text-[9px] tracking-[0.5em] uppercase -mt-0.5"
              style={solid ? goldText : { color: "rgba(255,255,255,0.8)" }}
            >
              TRAVEL
            </span>
          </Link>

          {/* Desktop center links */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {DESKTOP_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-0.5 text-sm font-medium transition-colors duration-200"
                style={{ color: linkColor }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1A6EBD")}
                onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: phone + hamburger */}
          <div className="ml-auto flex items-center gap-3 shrink-0">
            {/* Phone — desktop only */}
            <div className="hidden lg:block text-right">
              <div className="flex items-center justify-end gap-1.5">
                <Phone
                  className="w-3.5 h-3.5"
                  style={{ color: solid ? "#1A6EBD" : "#F5C842" }}
                />
                <span
                  className="text-sm font-bold"
                  style={{ color: solid ? "#0D2240" : "#FFFFFF" }}
                >
                  0877 121 209
                </span>
              </div>
              <p
                className="text-xs"
                style={{ color: solid ? "#5A8AB0" : "rgba(255,255,255,0.6)" }}
              >
                Пон - Пет: 9:00 - 18:00
              </p>
            </div>

            {/* Gold hamburger button */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Отвори меню"
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-opacity hover:opacity-90"
              style={goldGrad}
            >
              <Menu className="w-5 h-5" style={{ color: "#071A2E" }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── BACKDROP ────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[59]"
        aria-hidden="true"
        style={{
          background: "rgba(7,26,46,0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── SLIDE-IN DRAWER ─────────────────────────── */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[60] w-[300px] flex flex-col"
        style={{
          background: "#FFFFFF",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: menuOpen ? "-20px 0 60px rgba(7,26,46,0.18)" : "none",
          willChange: "transform",
        }}
        aria-hidden={!menuOpen}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 pt-7 pb-5">
          <div className="leading-none">
            <span className="block font-black text-[15px] tracking-[0.2em] uppercase" style={goldText}>
              PIRATE
            </span>
            <span className="block font-bold text-[9px] tracking-[0.5em] uppercase -mt-0.5" style={goldText}>
              TRAVEL
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Затвори меню"
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(26,110,189,0.08)" }}
          >
            <X className="w-5 h-5" style={{ color: "#0D2240" }} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-5 mb-3" style={{ height: 1, background: "#BDD5EE" }} />

        {/* Nav links with stagger animation */}
        <nav className="flex-1 flex flex-col px-3 gap-0.5 py-2">
          {DRAWER_LINKS.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="flex items-center gap-3 px-3 py-3.5 rounded-xl font-semibold text-[15px]"
                style={{
                  color: active ? "#1A6EBD" : "#0D2240",
                  background: active ? "rgba(26,110,189,0.07)" : "transparent",
                  fontWeight: active ? 800 : 600,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(16px)",
                  transition: `opacity 0.28s ease ${i * 45 + 80}ms, transform 0.28s ease ${i * 45 + 80}ms`,
                }}
              >
                <span className="text-xl leading-none w-7 text-center">{link.emoji}</span>
                <span className="flex-1">{link.label}</span>
                {active && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#1A6EBD" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-5 mt-2 mb-4" style={{ height: 1, background: "#BDD5EE" }} />

        {/* Bottom CTAs */}
        <div
          className="px-4 pb-10 flex flex-col gap-3"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.28s ease ${DRAWER_LINKS.length * 45 + 100}ms, transform 0.28s ease ${DRAWER_LINKS.length * 45 + 100}ms`,
          }}
        >
          <Link
            href="/personalni-oferti"
            className="font-black text-center py-4 rounded-2xl text-sm"
            style={{ ...goldGrad, color: "#071A2E", boxShadow: "0 4px 16px rgba(232,160,32,0.3)" }}
          >
            Запитване за оферта →
          </Link>
          <a
            href="tel:+359877121209"
            className="font-semibold text-center py-3.5 rounded-2xl text-sm border"
            style={{ borderColor: "#BDD5EE", color: "#1E4A7A" }}
          >
            📞 0877 121 209
          </a>
        </div>
      </div>
    </>
  );
}
