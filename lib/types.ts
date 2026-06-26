export interface Offer {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string;
  type: "group" | "personal" | "event";
  price_eur: number;
  price_bgn: number | null;
  dates: string | null;
  duration_days: number | null;
  transport: "bus" | "flight" | "mixed";
  description: string | null;
  program: ProgramDay[] | null;
  includes: string[] | null;
  excludes: string[] | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  rating?: number;
  reviews_count?: number;
  discount?: number | null;
  active: boolean;
  featured: boolean;
  created_at: string;
}

export interface ProgramDay {
  day: number;
  title: string;
  description: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  travel_date?: string;
  travelers?: number;
  message?: string;
  status?: string;
  created_at?: string;
}
