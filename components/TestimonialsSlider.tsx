"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const testimonials = [
  {
    image: "/images/testimonials/client1.png",
    name: "Мартин",
    location: "Благоевград",
    quote: "Всичко беше перфектно! Плажът, хотелът, компанията. Ще се върна определено с Pirate Travel!",
    trip: "Гърция 2024",
  },
  {
    image: "/images/testimonials/client2.png",
    name: "Стефан",
    location: "Благоевград",
    quote: "Пътувах до Турция и беше едно от най-добрите ми пътувания. Организацията е на топ ниво!",
    trip: "Турция 2024",
  },
  {
    image: "/images/testimonials/client3.png",
    name: "Виктория",
    location: "Благоевград",
    quote: "Страхотни хора в групата и перфектна организация. Незабравимо изживяване — препоръчвам!",
    trip: "Гърция 2025",
  },
  {
    image: "/images/testimonials/client4.jpg",
    name: "Мария",
    location: "Благоевград",
    quote: "С Pirate Travel се чувстваш като VIP! Луксозен автобус, страхотна програма и цени.",
    trip: "Корфу 2024",
  },
  {
    image: "/images/testimonials/client5.jpg",
    name: "Ивана",
    location: "Благоевград",
    quote: "Най-доброто лято досега! Всичко е уредено — просто се качваш и се наслаждаваш.",
    trip: "Гърция 2024",
  },
  {
    image: "/images/testimonials/client6.jpg",
    name: "Никол & Теа",
    location: "Благоевград",
    quote: "Пътувахме двете и се върнахме с куп нови приятели. Вече сме записани за следващото!",
    trip: "Гърция 2024",
  },
  {
    image: "/images/testimonials/client7.jpg",
    name: "Симона",
    location: "Благоевград",
    quote: "Невероятна атмосфера! Чувстваш се като на почивка от момента, в който качиш автобуса.",
    trip: "Гърция 2025",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((index: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 220);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      goTo((current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, [current, goTo]);

  const t = testimonials[current];

  return (
    <section className="py-10 px-4" style={{ background: "#FAFAF8" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-1" style={{ color: "#1A6EBD" }}>
            ✦ Нашите клиенти
          </p>
          <h2 className="text-xl md:text-2xl font-black" style={{ color: "#0D2240" }}>
            Те вече пътуваха с нас
          </h2>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden flex items-stretch"
          style={{
            background: "#FFFFFF",
            border: "1px solid #BDD5EE",
            boxShadow: "0 6px 28px rgba(26,110,189,0.1)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.22s ease",
          }}
        >
          {/* Photo */}
          <div className="relative w-28 md:w-36 shrink-0">
            <Image
              key={t.image}
              src={t.image}
              alt={t.name}
              fill
              className="object-cover object-top"
              sizes="144px"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center px-5 py-5 gap-2.5">
            {/* Stars */}
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <span key={s} style={{ color: "#E8A020", fontSize: 13 }}>★</span>
              ))}
            </div>

            {/* Quote */}
            <p className="text-sm leading-relaxed" style={{ color: "#1E4A7A" }}>
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Name + trip */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-sm" style={{ color: "#0D2240" }}>{t.name}</span>
              <span style={{ color: "#BDD5EE" }}>·</span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(26,110,189,0.1)",
                  color: "#1A6EBD",
                  border: "1px solid rgba(26,110,189,0.2)",
                }}
              >
                {t.trip}
              </span>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Отзив ${i + 1}`}
              style={{
                width: i === current ? 18 : 6,
                height: 6,
                borderRadius: 999,
                background:
                  i === current
                    ? "linear-gradient(135deg, #0D2240 0%, #1A6EBD 100%)"
                    : "#BDD5EE",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
