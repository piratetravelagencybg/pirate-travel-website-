"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    avatar:   "/images/testimonials/client1.png",
    destImg:  "/images/santorini.png",
    name:     "Мартин",
    quote:    "Всичко беше перфектно! Плажът, хотелът, компанията. Ще се върна определено с Pirate Travel!",
    trip:     "Гърция 2024",
    stars:    5,
  },
  {
    avatar:   "/images/testimonials/client2.png",
    destImg:  "/images/istanbul-hagia-sophia.png",
    name:     "Стефан",
    quote:    "Пътувах до Турция и беше едно от най-добрите ми пътувания. Организацията е на топ ниво!",
    trip:     "Турция 2024",
    stars:    5,
  },
  {
    avatar:   "/images/testimonials/client3.png",
    destImg:  "/images/greece1.jpg",
    name:     "Виктория",
    quote:    "Страхотни хора в групата и перфектна организация. Незабравимо изживяване — препоръчвам!",
    trip:     "Гърция 2025",
    stars:    5,
  },
  {
    avatar:   "/images/testimonials/client4.jpg",
    destImg:  "/images/korfu.png",
    name:     "Мария",
    quote:    "С Pirate Travel се чувстваш като VIP! Луксозен автобус, страхотна програма и цени.",
    trip:     "Корфу 2024",
    stars:    5,
  },
  {
    avatar:   "/images/testimonials/client5.jpg",
    destImg:  "/images/zakynthos.jpg",
    name:     "Ивана",
    quote:    "Най-доброто лято досега! Всичко е уредено — просто се качваш и се наслаждаваш.",
    trip:     "Гърция 2024",
    stars:    5,
  },
  {
    avatar:   "/images/testimonials/client6.jpg",
    destImg:  "/images/greece-dome.png",
    name:     "Никол & Теа",
    quote:    "Пътувахме двете и се върнахме с куп нови приятели. Вече сме записани за следващото!",
    trip:     "Гърция 2024",
    stars:    5,
  },
  {
    avatar:   "/images/testimonials/client7.jpg",
    destImg:  "/images/budva-exterior.jpg",
    name:     "Симона",
    quote:    "Невероятна атмосфера! Чувстваш се като на почивка от момента, в който качиш автобуса.",
    trip:     "Черна Гора 2025",
    stars:    5,
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2, behavior: "smooth" });
    setCurrent(index);
  }, []);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      scrollTo((current + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, scrollTo]);

  // Sync dots to scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function onScroll() {
      if (!track) return;
      const cards = Array.from(track.children) as HTMLElement[];
      const center = track.scrollLeft + track.offsetWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setCurrent(closest);
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="py-14 overflow-hidden" style={{ background: "#FAFAF8" }}>

      {/* ── HEADER ── */}
      <div className="text-center px-5 mb-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: "#D4A017" }}>
          ✦ Нашите клиенти
        </p>
        <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#111827" }}>
          Те вече пътуваха с нас
        </h2>
        {/* Gold underline */}
        <div
          className="mx-auto mb-4"
          style={{ width: 48, height: 3, background: "linear-gradient(135deg,#C07810,#F5C842)", borderRadius: 99 }}
        />
        <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#9CA3AF" }}>
          Истински преживявания от истински хора.<br />
          Виж какво споделят нашите пътешественици.
        </p>
      </div>

      {/* ── CARDS TRACK ── */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-[10vw] snap-x snap-mandatory pb-4"
        style={{ scrollPaddingInline: "10vw" }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="shrink-0 snap-center w-[78vw] max-w-sm"
            onClick={() => scrollTo(i)}
          >
            <div
              className="rounded-3xl overflow-visible bg-white"
              style={{ boxShadow: "0 8px 40px rgba(7,26,46,0.12)", position: "relative" }}
            >
              {/* Destination photo */}
              <div className="relative rounded-t-3xl overflow-hidden" style={{ height: 190 }}>
                <Image
                  src={t.destImg}
                  alt={t.trip}
                  fill
                  className="object-cover"
                  sizes="320px"
                  loading="lazy"
                />
                {/* Gradient fade to white at bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-12"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))" }}
                />
              </div>

              {/* Avatar — overlapping */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full overflow-hidden border-4 border-white"
                style={{ width: 64, height: 64, top: 190 - 32, zIndex: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
              >
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover object-top"
                  sizes="64px"
                />
              </div>

              {/* Content */}
              <div className="px-6 pb-6" style={{ paddingTop: 44 }}>
                {/* Stars + quotation mark */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <span key={s} style={{ color: "#F59E0B", fontSize: 18 }}>★</span>
                    ))}
                  </div>
                  <span
                    className="font-black leading-none select-none"
                    style={{ fontSize: 36, color: "#D4A017", lineHeight: 1, marginTop: -4 }}
                  >
                    ❝
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#374151" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Name */}
                <p className="font-black text-sm mb-3" style={{ color: "#111827" }}>{t.name}</p>

                {/* Trip badge */}
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "#F3F4F6", color: "#6B7280", border: "1px solid #E5E7EB" }}
                >
                  💬 {t.trip}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DOTS ── */}
      <div className="flex justify-center gap-2 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Отзив ${i + 1}`}
            style={{
              width:        i === current ? 22 : 8,
              height:       8,
              borderRadius: 999,
              background:   i === current ? "#071A2E" : "#D1D5DB",
              border:       "none",
              cursor:       "pointer",
              padding:      0,
              transition:   "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}
