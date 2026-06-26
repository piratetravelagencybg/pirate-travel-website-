"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Moon, Bus, Plane, Heart } from "lucide-react";
import type { Offer } from "@/lib/types";

const TRANSPORT_ICON: Record<string, React.ReactNode> = {
  bus:    <Bus    className="w-3.5 h-3.5" />,
  flight: <Plane  className="w-3.5 h-3.5" />,
  mixed:  <Plane  className="w-3.5 h-3.5" />,
};

const TRANSPORT_LABEL: Record<string, string> = {
  bus:    "Автобус",
  flight: "Самолет",
  mixed:  "All Inclusive",
};

export default function OfferCard({ offer }: { offer: Offer }) {
  const priceBgn    = offer.price_bgn ?? Math.round(offer.price_eur * 1.96);
  const transport   = TRANSPORT_LABEL[offer.transport]  ?? offer.transport;
  const tIcon       = TRANSPORT_ICON[offer.transport]   ?? null;
  const rating      = offer.rating        ?? 4.8;
  const reviewsCnt  = offer.reviews_count ?? 120;
  const discount    = offer.discount;
  const nights      = offer.duration_days ?? 0;

  return (
    <Link
      href={`/destinacii/${offer.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden w-full transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 4px 24px rgba(7,26,46,0.09)" }}
    >
      {/* ── IMAGE ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <Image
          src={offer.image_url ?? "/images/hero.png"}
          alt={offer.destination}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 80vw, 25vw"
          loading="lazy"
        />

        {/* Heart button */}
        <button
          onClick={e => e.preventDefault()}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:scale-110"
          style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)" }}
          aria-label="Добави в любими"
        >
          <Heart className="w-4 h-4" style={{ color: "#9CA3AF" }} />
        </button>

        {/* Country pill — bottom left */}
        <div
          className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(7,26,46,0.72)", backdropFilter: "blur(6px)" }}
        >
          <MapPin className="w-3 h-3 text-white opacity-80" />
          <span className="text-white text-[11px] font-bold uppercase tracking-wider">
            {offer.country}
          </span>
        </div>
      </div>

      {/* ── CONTENT ────────────────────────────────────────── */}
      <div className="p-3 md:p-4">
        {/* City name */}
        <h3 className="font-black text-lg md:text-xl mb-1 leading-tight truncate" style={{ color: "#111827" }}>
          {offer.destination}
        </h3>

        {/* Nights • Transport — single line, truncate-safe */}
        {nights > 0 && (
          <div className="flex items-center gap-1 mb-2 min-w-0" style={{ color: "#6B7280" }}>
            <Moon className="w-3 h-3 shrink-0" />
            <span className="text-xs shrink-0 whitespace-nowrap">{nights} нощувки</span>
            <span className="opacity-40 shrink-0">·</span>
            <span className="shrink-0 flex items-center">{tIcon}</span>
            <span className="text-xs truncate">{transport}</span>
          </div>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1 mb-2">
          <span style={{ color: "#F59E0B", fontSize: 13 }}>★</span>
          <span className="text-xs font-bold" style={{ color: "#111827" }}>
            {rating.toFixed(1)}
          </span>
          <span className="text-xs" style={{ color: "#9CA3AF" }}>({reviewsCnt})</span>
        </div>

        {/* Divider */}
        <div className="mb-2" style={{ height: 1, background: "#F3F4F6" }} />

        {/* Price + discount */}
        <div className="flex items-center justify-between gap-1">
          <div className="min-w-0">
            <span className="text-xs" style={{ color: "#6B7280" }}>от </span>
            <span className="font-black text-lg md:text-xl" style={{ color: "#111827" }}>{priceBgn}</span>
            <span className="text-xs font-bold" style={{ color: "#111827" }}> лв.</span>
          </div>
          {discount && (
            <span
              className="font-black text-xs px-2.5 py-1 rounded-xl shrink-0"
              style={{ background: "linear-gradient(135deg,#C07810,#F5C842)", color: "#071A2E" }}
            >
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
