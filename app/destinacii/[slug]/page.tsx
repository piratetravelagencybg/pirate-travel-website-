import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getOfferBySlug, getMockOffers } from "@/lib/supabase";
import OfferTabs from "@/components/OfferTabs";
import BookingForm from "@/components/BookingForm";
import { Clock, Bus, Plane, Car, ArrowLeft, Phone } from "lucide-react";

export const revalidate = 3600;

const transportIcons = { bus: Bus, flight: Plane, mixed: Car };
const transportLabels = { bus: "Автобус", flight: "Самолет", mixed: "Комбиниран" };

export async function generateStaticParams() {
  const offers = getMockOffers();
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);
  if (!offer) return { title: "Оферта не е намерена" };

  return {
    title: `${offer.title} | Pirate Travel Agency`,
    description: `${offer.destination} — ${offer.duration_days} дни от ${offer.price_eur}€. ${offer.description || "Групова екскурзия с Pirate Travel Agency от Благоевград."}`,
    openGraph: {
      title: `${offer.title} | Pirate Travel Agency`,
      description: `${offer.destination} — ${offer.duration_days} дни от ${offer.price_eur}€`,
      images: [{ url: offer.image_url || "/images/hero.png" }],
    },
  };
}

export default async function OfferDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);
  if (!offer) notFound();

  const TransportIcon = transportIcons[offer.transport] || Bus;
  const imageUrl = offer.image_url || "/images/hero.png";

  const schemaOffer = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: offer.title,
    description: offer.description || `Групова екскурзия до ${offer.destination}`,
    touristType: "Group",
    offers: {
      "@type": "Offer",
      price: offer.price_eur.toString(),
      priceCurrency: "EUR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOffer) }}
      />

      {/* Hero image */}
      <div className="relative h-72 md:h-96 mt-20">
        <Image
          src={imageUrl}
          alt={`${offer.title} — групова екскурзия с Pirate Travel Agency`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(7,26,46,0.85) 0%, rgba(7,26,46,0.2) 60%, transparent 100%)" }}
        />
        <Link
          href="/destinacii"
          className="absolute top-4 left-4 flex items-center gap-1.5 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-full transition-colors"
          style={{ background: "rgba(7,26,46,0.5)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Назад
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24" style={{ background: "#F8FBFD" }}>
        <div className="md:grid md:grid-cols-3 md:gap-8">
          {/* Main content */}
          <div className="md:col-span-2">
            <div className="mt-[-2rem] relative z-10 mb-6">
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{
                  background: "rgba(26,110,189,0.1)",
                  color: "#1A6EBD",
                  border: "1px solid rgba(26,110,189,0.25)",
                }}
              >
                {offer.country}
              </span>
              <h1 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#0D2240" }}>
                {offer.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm mb-4" style={{ color: "#5A8AB0" }}>
                {offer.duration_days && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {offer.duration_days} дни
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <TransportIcon className="w-4 h-4" />
                  {transportLabels[offer.transport]}
                </span>
                {offer.dates && (
                  <span>{offer.dates}</span>
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black" style={{ color: "#1A6EBD" }}>
                  от {offer.price_eur}€
                </span>
                <span className="text-sm" style={{ color: "#5A8AB0" }}>/ човек</span>
                {offer.price_bgn && (
                  <span className="text-sm" style={{ color: "#5A8AB0" }}>
                    (~{offer.price_bgn} лв)
                  </span>
                )}
              </div>
              {offer.description && (
                <p className="leading-relaxed" style={{ color: "#1E4A7A" }}>{offer.description}</p>
              )}
            </div>

            <OfferTabs
              program={offer.program}
              includes={offer.includes}
              excludes={offer.excludes}
            />
          </div>

          {/* Booking sidebar */}
          <div className="md:col-span-1 mt-6 md:mt-0">
            <div
              className="sticky top-20 rounded-2xl p-5"
              style={{
                background: "#FFFFFF",
                border: "1px solid #BDD5EE",
                boxShadow: "0 4px 20px rgba(26,110,189,0.1)",
              }}
            >
              <h3 className="font-bold mb-4" style={{ color: "#0D2240" }}>
                Запитване / Резервация
              </h3>
              <BookingForm
                destination={offer.destination}
                price_eur={offer.price_eur}
                slug={offer.slug}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div
        className="fixed bottom-16 left-0 right-0 z-30 md:hidden backdrop-blur-md px-4 py-3"
        style={{ background: "rgba(239,247,255,0.97)", borderTop: "1px solid #BDD5EE" }}
      >
        <div className="flex items-center gap-3">
          <div>
            <p className="font-black text-lg" style={{ color: "#1A6EBD" }}>от {offer.price_eur}€</p>
            <p className="text-xs" style={{ color: "#5A8AB0" }}>на човек</p>
          </div>
          <a
            href="tel:+359877121209"
            className="flex-1 flex items-center justify-center gap-2 font-bold text-center py-3 rounded-xl text-sm"
            style={{ background: "linear-gradient(135deg, #C07810 0%, #F5C842 100%)", color: "#071A2E" }}
          >
            <Phone className="w-4 h-4" />
            Обади се
          </a>
        </div>
      </div>
    </>
  );
}
