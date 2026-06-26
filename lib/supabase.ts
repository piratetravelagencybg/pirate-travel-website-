import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Offer, Inquiry } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function isSupabaseConfigured() {
  return (
    supabaseUrl &&
    supabaseUrl !== "your_supabase_url_here" &&
    supabaseUrl.startsWith("http")
  );
}

let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}


export async function getOffers(options?: {
  featured?: boolean;
  limit?: number;
  country?: string;
}): Promise<Offer[]> {
  const client = getSupabase();
  if (!client) return getMockOffers(options);

  try {
    let query = client
      .from("offers")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (options?.featured) query = query.eq("featured", true);
    if (options?.country) query = query.eq("country", options.country);
    if (options?.limit) query = query.limit(options.limit);

    const { data, error } = await query;
    if (error) {
      console.error("Supabase error:", error);
      return getMockOffers(options);
    }
    return data || [];
  } catch {
    return getMockOffers(options);
  }
}

export async function getOfferBySlug(slug: string): Promise<Offer | null> {
  const client = getSupabase();
  if (!client) return getMockOffers().find((o) => o.slug === slug) || null;

  try {
    const { data, error } = await client
      .from("offers")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .single();

    if (error) return getMockOffers().find((o) => o.slug === slug) || null;
    return data;
  } catch {
    return getMockOffers().find((o) => o.slug === slug) || null;
  }
}

export async function saveInquiry(inquiry: Inquiry): Promise<boolean> {
  const client = getSupabase();
  if (!client) {
    console.log("Mock inquiry saved:", inquiry);
    return true;
  }

  try {
    const { error } = await client.from("inquiries").insert(inquiry);
    if (error) {
      console.error("Error saving inquiry:", error);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Mock data for development without Supabase
export function getMockOffers(options?: {
  featured?: boolean;
  limit?: number;
  country?: string;
}): Offer[] {
  const allOffers: Offer[] = [
    {
      id: "1",
      slug: "gartsia-korfu",
      title: "Гърция — Корфу",
      destination: "Корфу",
      country: "Гърция",
      type: "group",
      price_eur: 199,
      price_bgn: 390,
      dates: "Юни - Септември 2025",
      duration_days: 5,
      transport: "bus",
      description:
        "Открийте красотата на Корфу — остров с кристално чисти води, живописни градчета и богата история. Пътуване с комфортен автобус от Благоевград.",
      program: [
        { day: 1, title: "Благоевград → Корфу", description: "Тръгване от Благоевград, нощно пътуване през Гърция до ферибота." },
        { day: 2, title: "Пристигане в Корфу", description: "Сутринта пристигане, настаняване в хотел. Разходка по стария град на Корфу — ЮНЕСКО." },
        { day: 3, title: "Свободен ден на плажа", description: "Свободен ден за почивка, плаж и разходки." },
        { day: 4, title: "Обиколка на острова", description: "Организирана обиколка — Palaiokastritsa, Achilleion, Glyfada Beach." },
        { day: 5, title: "Завръщане", description: "Тръгване за Благоевград. Пристигане вечерта." },
      ],
      includes: ["Транспорт с луксозен автобус", "4 нощувки в хотел 3*", "Закуски", "Фериботни такси", "Водач"],
      excludes: ["Обяди и вечери", "Входни такси", "Лична застраховка"],
      image_url: "/images/korfu.png",
      gallery_urls: null,
      active: true,
      featured: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      slug: "turtsia-istanbul",
      title: "Турция — Истанбул",
      destination: "Истанбул",
      country: "Турция",
      type: "group",
      price_eur: 129,
      price_bgn: 252,
      dates: "Целогодишно",
      duration_days: 3,
      transport: "bus",
      description:
        "Истанбул — градът на два континента. Посетете Света София, Синята джамия, Гранд Базар и усетете духа на Ориента.",
      program: [
        { day: 1, title: "Благоевград → Истанбул", description: "Тръгване вечерта, нощен преход." },
        { day: 2, title: "Истанбул", description: "Света София, Синята джамия, Гранд Базар, Босфора." },
        { day: 3, title: "Завръщане", description: "Сутринта тръгване за България. Пристигане вечерта." },
      ],
      includes: ["Транспорт с автобус", "2 нощувки в хотел", "Закуски", "Водач"],
      excludes: ["Входни такси", "Обяди и вечери", "Лична застраховка"],
      image_url: "/images/istanbul.png",
      gallery_urls: null,
      active: true,
      featured: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      slug: "sarbia-belgrad",
      title: "Сърбия — Белград",
      destination: "Белград",
      country: "Сърбия",
      type: "group",
      price_eur: 89,
      price_bgn: 174,
      dates: "Целогодишно",
      duration_days: 2,
      transport: "bus",
      description:
        "Белград — живата столица на Балканите. Калемегдан, пешеходната улица Кнез Михайлова, Skadarlija и незабравимия нощен живот.",
      program: [
        { day: 1, title: "Благоевград → Белград", description: "Ранно тръгване, пристигане в Белград обяд. Разходка из центъра." },
        { day: 2, title: "Белград → Благоевград", description: "Сутринна разходка, тръгване следобед." },
      ],
      includes: ["Транспорт с автобус", "1 нощувка в хотел", "Закуска", "Водач"],
      excludes: ["Обяди и вечери", "Лична застраховка"],
      image_url: "/images/belgrad.png",
      gallery_urls: null,
      active: true,
      featured: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      slug: "mania-brashov-drakula",
      title: "Румъния — Брашов & Замъкът на Дракула",
      destination: "Брашов",
      country: "Румъния",
      type: "group",
      price_eur: 149,
      price_bgn: 291,
      dates: "Пролет - Есен 2025",
      duration_days: 3,
      transport: "bus",
      description:
        "Средновековен Брашов, мистичният Замък Бран (Дракула) и красивата природа на Карпатите — незабравимо пътуване!",
      program: [
        { day: 1, title: "Благоевград → Брашов", description: "Тръгване сутринта, пристигане в Брашов вечерта." },
        { day: 2, title: "Замък Бран & Брашов", description: "Посещение на Замъка на Дракула, разходка из Брашов." },
        { day: 3, title: "Завръщане", description: "Тръгване за Благоевград." },
      ],
      includes: ["Транспорт с автобус", "2 нощувки", "Закуски", "Водач"],
      excludes: ["Вход за замъка", "Обяди и вечери"],
      image_url: "/images/romania-brashov.png",
      gallery_urls: null,
      active: true,
      featured: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      slug: "gartsia-lefkada",
      title: "Гърция — Лефкада",
      destination: "Лефкада",
      country: "Гърция",
      type: "group",
      price_eur: 249,
      price_bgn: 487,
      dates: "Юли - Август 2025",
      duration_days: 6,
      transport: "bus",
      description:
        "Лефкада — остров с едни от най-красивите плажове в Европа. Порто Кацики, Егремни, Никяна — рай на земята!",
      program: [
        { day: 1, title: "Тръгване", description: "Нощно пътуване от Благоевград." },
        { day: 2, title: "Пристигане в Лефкада", description: "Настаняване, разходка." },
        { day: 3, title: "Плаж Порто Кацики", description: "Ден на легендарния плаж." },
        { day: 4, title: "Свободен ден", description: "По избор — плаж или разходки." },
        { day: 5, title: "Обиколка на острова", description: "Никяна, Нидри, Лефкада град." },
        { day: 6, title: "Завръщане", description: "Тръгване сутринта, пристигане вечерта." },
      ],
      includes: ["Транспорт", "5 нощувки", "Закуски", "Водач", "Фериботни такси"],
      excludes: ["Обяди и вечери", "Лична застраховка"],
      image_url: "/images/lefkada.png",
      gallery_urls: null,
      active: true,
      featured: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      slug: "turtsia-kapadokia",
      title: "Турция — Кападокия",
      destination: "Кападокия",
      country: "Турция",
      type: "group",
      price_eur: 199,
      price_bgn: 390,
      dates: "Пролет - Есен 2025",
      duration_days: 4,
      transport: "mixed",
      description:
        "Кападокия — магичен свят от скални формации, подземни градове и балони над облаците. Незабравимо изживяване!",
      program: [
        { day: 1, title: "Благоевград → Истанбул", description: "Полет или нощен автобус." },
        { day: 2, title: "Кападокия", description: "Долината на Göreme, скалните църкви." },
        { day: 3, title: "Балон и обиколка", description: "Сутрешен полет с балон (по желание), подземен град Деринкую." },
        { day: 4, title: "Завръщане", description: "Полет обратно към България." },
      ],
      includes: ["Транспорт", "3 нощувки", "Закуски", "Водач"],
      excludes: ["Полет с балон", "Вечери", "Лична застраховка"],
      image_url: "/images/kapadokia.png",
      gallery_urls: null,
      active: true,
      featured: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "7",
      slug: "sarbia-ceca-leskovac",
      title: "Сърбия — Концерт с Цеца в Лесковац",
      destination: "Лесковац",
      country: "Сърбия",
      type: "event",
      price_eur: 140,
      price_bgn: 274,
      dates: "По програма",
      duration_days: 2,
      transport: "bus",
      description:
        "Специално събитие! Концерт на легендарната Светлана Ражнатович — Цеца в Лесковац. Включва транспорт, нощувка и билет за концерта.",
      program: [
        { day: 1, title: "Благоевград → Лесковац", description: "Пристигане, настаняване, вечер — КОНЦЕРТ НА ЦЕЦА!" },
        { day: 2, title: "Завръщане", description: "Тръгване сутринта." },
      ],
      includes: ["Транспорт", "1 нощувка", "Билет за концерта", "Водач"],
      excludes: ["Храна и напитки", "Лична застраховка"],
      image_url: "/images/ceca-concert.png",
      gallery_urls: null,
      active: true,
      featured: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "8",
      slug: "italia-sardinia",
      title: "Италия — Сардиния",
      destination: "Сардиния",
      country: "Италия",
      type: "group",
      price_eur: 399,
      price_bgn: 780,
      dates: "Юни - Септември 2025",
      duration_days: 7,
      transport: "mixed",
      description:
        "Сардиния — перлата на Средиземно море. Кристални води, бели плажове, автентична италианска кухня и незабравими залези.",
      program: [
        { day: 1, title: "Полет към Сардиния", description: "Отпътуване и пристигане." },
        { day: 2, title: "Каляри", description: "Разходка из столицата." },
        { day: 3, title: "Коста Смералда", description: "Луксозния северен бряг." },
        { day: 4, title: "Свободен ден", description: "Плаж и релакс." },
        { day: 5, title: "Алгеро", description: "Каталонски град на Сардиния." },
        { day: 6, title: "Свободен ден", description: "Пазаруване и последен плаж." },
        { day: 7, title: "Завръщане", description: "Полет обратно към България." },
      ],
      includes: ["Полет", "6 нощувки в хотел 4*", "Закуски", "Трансфери", "Водач"],
      excludes: ["Обяди и вечери", "Лична застраховка", "Туристически данък"],
      image_url: "/images/sardinia.png",
      gallery_urls: null,
      active: true,
      featured: false,
      created_at: new Date().toISOString(),
    },
  ];

  const ratingMeta = [
    { rating: 4.8, reviews_count: 320, discount: 15 },
    { rating: 4.7, reviews_count: 450, discount: 10 },
    { rating: 4.6, reviews_count: 180, discount: 20 },
    { rating: 4.9, reviews_count: 210, discount: 12 },
    { rating: 4.8, reviews_count: 155, discount: 8  },
    { rating: 4.5, reviews_count: 280, discount: null },
    { rating: 4.7, reviews_count: 95,  discount: null },
    { rating: 4.9, reviews_count: 420, discount: 18 },
  ];

  let filtered = [...allOffers];
  if (options?.featured) filtered = filtered.filter((o) => o.featured);
  if (options?.country) filtered = filtered.filter((o) => o.country === options.country);
  if (options?.limit) filtered = filtered.slice(0, options.limit);

  return filtered.map((offer, i) => ({ ...offer, ...(ratingMeta[i] ?? {}) }));
}
