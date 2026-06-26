"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Heart } from "lucide-react";
import type { Offer } from "@/lib/types";

const COUNTRY_FLAGS: Record<string, string> = {
  "Гърция":     "🇬🇷",
  "Турция":     "🇹🇷",
  "Сърбия":     "🇷🇸",
  "Румъния":    "🇷🇴",
  "Черна Гора": "🇲🇪",
  "Австрия":    "🇦🇹",
  "Франция":    "🇫🇷",
  "Италия":     "🇮🇹",
  "Испания":    "🇪🇸",
  "Хърватия":   "🇭🇷",
  "Египет":     "🇪🇬",
  "ОАЕ":        "🇦🇪",
};

const TRANSPORT_LABELS: Record<string, string> = {
  bus:    "Автобус",
  flight: "Самолет",
  mixed:  "All Inclusive",
};

export default function OfferCard({ offer }: { offer: Offer }) {
  const priceBgn    = offer.price_bgn ?? Math.round(offer.price_eur * 1.96);
  const flag        = COUNTRY_FLAGS[offer.country] ?? "🌍";
  const transport   = TRANSPORT_LABELS[offer.transport] ?? offer.transport;
  const rating      = offer.rating ?? 4.8;
  const reviewsCnt  = offer.reviews_count ?? 120;
  const discount    = offer.discount;
  const nights      = offer.duration_days ?? 0;
  const nightsLabel = nights > 0 ? `${nights} ночувки` : "";

  return (
    <Link
      href={`/destinacii/${offer.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-200 hover:-translate-y-1"
      style={{
        boxShadow: "0 2px 16px rgba(7,26,46,0.07)",
        border: "1px solid rgba(189,213,238,0.5)",
        width: "100%",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 36px rgba(7,26,46,0.15)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(7,26,46,0.07)"}
    >
      {/* Photo */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={offer.image_url ?? "/images/hero.png"}
          alt={`${offer.destination} — ${offer.title}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 70vw, 25vw"
          loading="lazy"
        />
        <button
          onClick={e => e.preventDefault()}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(4px)" }}
          aria-label="Добави в любими"
        >
          <Heart className="w-4 h-4" style={{ color: "#9CA3AF" }} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Country + flag */}
        <div className="flex items-center gap-1 mb-1 text-xs" style={{ color: "#9CA3AF" }}>
          <MapPin className="w-3 h-3 shrink-0" />
          <span>{flag} {offer.country}</span>
        </div>

        {/* Destination */}
        <h3 className="font-bold text-[15px] mb-1 leading-snug" style={{ color: "#111827" }}>
          {offer.destination}
        </h3>

        {/* Duration • Transport */}
        {nightsLabel && (
          <p className="text-xs mb-2.5" style={{ color: "#9CA3AF" }}>
            {nightsLabel} • {transport}
          </p>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400 text-xs">⭐</span>
          <span className="text-xs font-semibold" style={{ color: "#374151" }}>
            {rating.toFixed(1)}
          </span>
          <span className="text-xs" style={{ color: "#9CA3AF" }}>({reviewsCnt})</span>
        </div>

        {/* Price + discount badge */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-black text-sm" style={{ color: "#111827" }}>
              от {priceBgn} лв.
            </span>
          </div>
          {discount && (
            <span
              className="text-xs font-black px-2 py-0.5"
              style={{
                background: "#D4A017",
                color: "#1C1208",
                borderRadius: "6px",
              }}
            >
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
