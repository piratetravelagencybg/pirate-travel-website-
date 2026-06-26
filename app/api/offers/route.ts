import { NextRequest, NextResponse } from "next/server";
import { getOffers } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get("featured") === "true";
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!)
    : undefined;
  const country = searchParams.get("country") || undefined;

  const offers = await getOffers({ featured, limit, country });
  return NextResponse.json(offers);
}
