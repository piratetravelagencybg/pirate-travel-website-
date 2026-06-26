import Image from "next/image";
import Link from "next/link";

const AVATARS = ["#1A6EBD", "#2E7D32", "#C07810", "#7B1FA2"];

export default function Hero() {
  return (
    <section className="relative min-h-screen -mt-16 flex flex-col justify-end pb-28 md:pb-36">
      {/* Background */}
      <Image
        src="/images/hero.png"
        alt="Групова екскурзия с Pirate Travel Agency — яхта на залез в Санторини"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(7,26,46,0.15) 0%, rgba(7,26,46,0.45) 50%, rgba(7,26,46,0.90) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(7,26,46,0.75) 0%, rgba(7,26,46,0.2) 55%, transparent 100%)" }} />
      <div className="absolute inset-x-0 top-0 h-36" style={{ background: "linear-gradient(to bottom, rgba(7,26,46,0.55) 0%, transparent 100%)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full">
        <div className="flex items-end justify-between gap-8">

          {/* ── LEFT: Headline + CTAs ────────────────── */}
          <div className="max-w-xl">
            {/* Small label */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 flex items-center gap-2" style={{ color: "#F5C842" }}>
              <span>★</span> Пътувай повече. Изживей повече.
            </p>

            {/* Headline */}
            <h1 className="font-black leading-[1.05] mb-5">
              <span className="text-white block text-4xl md:text-6xl">Превърни</span>
              <span className="text-white block text-4xl md:text-6xl">пътуването в</span>
              <span className="block text-5xl md:text-7xl italic" style={{ color: "#F5C842" }}>
                приключение
              </span>
            </h1>

            <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed max-w-sm opacity-90">
              Подбрани оферти за Гърция, Турция,<br className="hidden md:block" /> Сърбия и още.
            </p>

            {/* CTAs */}
            <div className="flex items-center flex-wrap gap-3">
              <Link
                href="/destinacii"
                className="inline-flex items-center gap-2 font-black px-8 py-4 rounded-full text-base transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)",
                  color: "#071A2E",
                  boxShadow: "0 8px 30px rgba(232,160,32,0.45)",
                }}
              >
                Виж офертите →
              </Link>
              <Link
                href="/kontakti"
                className="inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-full text-base transition-all hover:bg-white/15"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.45)",
                  color: "#FFFFFF",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                💬 Консултация с експерт
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Social proof card (desktop) ───── */}
          <div
            className="hidden md:block shrink-0 rounded-2xl p-5 mb-2"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(7,26,46,0.25)",
              minWidth: 210,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-black" style={{ color: "#1C1208" }}>⭐ 4.9</span>
              <span className="text-sm font-bold" style={{ color: "#1C1208" }}>/5</span>
            </div>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: "#5A8AB0" }}>
              Над 2300 доволни<br />пътешественици
            </p>
            {/* Avatars */}
            <div className="flex items-center">
              {AVATARS.map((color, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-black"
                  style={{
                    background: i === 3
                      ? "linear-gradient(135deg, #C07810 0%, #F5C842 100%)"
                      : color,
                    color: i === 3 ? "#071A2E" : "#FFFFFF",
                    marginLeft: i === 0 ? 0 : "-10px",
                    zIndex: 4 - i,
                    position: "relative",
                  }}
                >
                  {i === 3 ? "+3" : ""}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
