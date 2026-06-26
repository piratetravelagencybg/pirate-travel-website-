"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Offer } from "@/lib/types";

export default function DestinationCard({ offer }: { offer: Offer }) {
  const imageUrl = offer.image_url || "/images/hero.png";

  return (
    <Link
      href={`/destinacii/${offer.slug}`}
      className="relative flex-shrink-0 w-40 md:w-48 rounded-3xl overflow-hidden group cursor-pointer block"
      style={{
        border: "1px solid #BDD5EE",
        boxShadow: "0 2px 12px rgba(26,110,189,0.1)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "#1A6EBD";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(26,110,189,0.25)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "#BDD5EE";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(26,110,189,0.1)";
      }}
    >
      <div className="relative h-56 md:h-64 w-full">
        <Image
          src={imageUrl}
          alt={`Екскурзия до ${offer.destination} с Pirate Travel Agency`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 160px, 192px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

        {/* Heart */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-colors hover:bg-white"
          style={{ border: "1px solid #BDD5EE" }}
          aria-label="Добави в любими"
        >
          <Heart className="w-3.5 h-3.5" style={{ color: "#1A6EBD" }} />
        </button>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <p className="text-white font-bold text-sm mb-2">{offer.destination}</p>
          <span
            className="inline-flex items-center text-xs font-black px-2.5 py-1 rounded-full"
            style={{ background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)", color: "#071A2E" }}
          >
            от {offer.price_eur}€
          </span>
        </div>
      </div>
    </Link>
  );
}
