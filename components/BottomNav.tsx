"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tag, MessageCircle, Phone } from "lucide-react";

const navItems = [
  { href: "/destinacii", label: "Оферти", icon: Tag },
  { href: "/personalni-oferti", label: "Запитване", icon: MessageCircle },
  { href: "/kontakti", label: "Контакт", icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Hide on offer detail pages — they have their own sticky price bar
  const isOfferDetail = /^\/destinacii\/.+/.test(pathname);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isOfferDetail) return null;

  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 md:hidden transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? "0" : "20px"})`,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ul
        className="flex items-center gap-1 px-2 h-[62px]"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "999px",
          border: "1px solid rgba(189,213,238,0.8)",
          boxShadow: "0 8px 32px rgba(7,26,46,0.14), 0 2px 8px rgba(26,110,189,0.12)",
        }}
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className="flex flex-col items-center gap-1 px-5 py-2 transition-all"
                style={{
                  borderRadius: "999px",
                  background: isActive
                    ? "linear-gradient(135deg, #0D2240 0%, #1A6EBD 100%)"
                    : "transparent",
                  color: isActive ? "#FFFFFF" : "#5A8AB0",
                  minWidth: 72,
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] font-bold leading-none">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
