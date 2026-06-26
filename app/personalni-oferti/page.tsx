import type { Metadata } from "next";
import PersonalOfferWizard from "@/components/PersonalOfferWizard";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Персонална Оферта | Pirate Travel Agency — Пътуване по твоите условия",
  description:
    "Създайте персонална оферта за пътуване изцяло по вашите условия. Изберете дестинация, дати, брой пътници и бюджет — ще изготвим оферта специално за вас.",
};

const goldText: React.CSSProperties = {
  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function PersonalOffersPage() {
  return (
    <div style={{ background: "#FAFAF8" }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        className="relative py-16 px-5 text-center"
        style={{
          background: "linear-gradient(135deg, #071A2E 0%, #0D2240 60%, #1A3A60 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(26,110,189,0.2) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{
              background: "rgba(26,110,189,0.15)",
              border: "1px solid rgba(26,110,189,0.3)",
            }}
          >
            <Compass className="w-8 h-8" style={{ color: "#1A6EBD" }} />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: "#1A6EBD" }}>
            ✦ Специално за теб
          </p>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Персонална <span style={goldText}>Оферта</span>
          </h1>

          <p className="text-sm md:text-base leading-relaxed mb-7 max-w-lg mx-auto" style={{ color: "#5A8AB0" }}>
            Отговори на няколко въпроса и ние ще изготвим пътуване,
            създадено изцяло по твоите условия — дестинация, дати, бюджет.
          </p>

          <div className="flex items-center justify-center gap-5 flex-wrap">
            {[
              { icon: "⚡", text: "Отговор до 24 ч." },
              { icon: "🔒", text: "Без ангажимент" },
              { icon: "💯", text: "100% персонализирано" },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5">
                <span className="text-base leading-none">{b.icon}</span>
                <span className="text-xs font-semibold" style={{ color: "#5A8AB0" }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WIZARD ───────────────────────────────────── */}
      <section className="pt-8 pb-10">
        <PersonalOfferWizard />
      </section>

      {/* ── CONTACT STRIP ────────────────────────────── */}
      <section className="pb-20 px-5">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs font-semibold mb-2" style={{ color: "#5A8AB0" }}>
            Предпочиташ да се обадиш директно?
          </p>
          <a
            href="tel:+359877121209"
            className="inline-flex items-center gap-2 font-black text-lg"
            style={{ color: "#1A6EBD" }}
          >
            📞 0877 121 209
          </a>
          <p className="text-xs mt-1" style={{ color: "#5A8AB0" }}>Работно време: Пон–Пет 09:00–18:00</p>
        </div>
      </section>

    </div>
  );
}
