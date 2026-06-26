import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

const goldText: React.CSSProperties = {
  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function Footer() {
  return (
    <footer
      className="pt-12 pb-6 hidden md:block"
      style={{ background: "#071A2E", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Logo + about */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.png" alt="Pirate Travel logo" width={40} height={40} className="object-contain" />
              <span className="font-bold text-xl" style={goldText}>Pirate Travel Agency</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4 max-w-xs" style={{ color: "#5A8AB0" }}>
              Туристическа агенция за организирани групови екскурзии от
              Благоевград. Над 10 години опит, стотици доволни клиенти.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/piratetravelagency"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[#1A6EBD] hover:text-white"
                style={{ background: "rgba(255,255,255,0.06)", color: "#5A8AB0" }}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/piratetravelagency"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[#1A6EBD] hover:text-white"
                style={{ background: "rgba(255,255,255,0.06)", color: "#5A8AB0" }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: "#F8FBFD" }}>Навигация</h3>
            <ul className="space-y-2 text-sm" style={{ color: "#5A8AB0" }}>
              {[
                { href: "/destinacii", label: "Всички оферти" },
                { href: "/personalni-oferti", label: "Персонална оферта" },
                { href: "/za-nas", label: "За нас" },
                { href: "/kontakti", label: "Контакти" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#1A6EBD]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color: "#F8FBFD" }}>Контакти</h3>
            <ul className="space-y-3 text-sm" style={{ color: "#5A8AB0" }}>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#1A6EBD" }} />
                <span>Благоевград, България</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "#1A6EBD" }} />
                <a href="tel:+359877121209" className="hover:text-[#1A6EBD] transition-colors">
                  0877 121 209
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" style={{ color: "#1A6EBD" }} />
                <a href="mailto:piratetravelagencybg@gmail.com" className="hover:text-[#1A6EBD] transition-colors text-xs">
                  piratetravelagencybg@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between text-sm"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "#1E4A7A" }}
        >
          <p>© 2025 Pirate Travel Agency. Всички права запазени.</p>
          <p className="mt-2 md:mt-0">Благоевград, България</p>
        </div>
      </div>
    </footer>
  );
}
