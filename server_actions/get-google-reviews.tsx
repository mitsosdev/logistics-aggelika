"use server";

import { unstable_cache } from "next/cache";

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface PlaceReviewsResponse {
  reviews: GoogleReview[];
  rating?: number;
  user_ratings_total?: number;
  url?: string;
}

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const isChIJ = (id: string) => id.startsWith("ChIJ");

const resolveChIJFromQuery = async (query: string): Promise<string | null> => {
  if (!GOOGLE_MAPS_API_KEY) return null;
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
  );
  url.searchParams.append("input", query);
  url.searchParams.append("inputtype", "textquery");
  url.searchParams.append("fields", "place_id");
  url.searchParams.append("key", GOOGLE_MAPS_API_KEY);
  const res = await fetch(url.toString());
  const data = await res.json();
  const candidate = data?.candidates?.[0];
  return candidate?.place_id ?? null;
};

const fetchDetails = async (
  chijId: string
): Promise<PlaceReviewsResponse | null> => {
  if (!GOOGLE_MAPS_API_KEY) return null;
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.append("place_id", chijId);
  url.searchParams.append(
    "fields",
    "reviews,rating,user_ratings_total,url"
  );
  url.searchParams.append("language", "el");
  url.searchParams.append("key", GOOGLE_MAPS_API_KEY);
  const res = await fetch(url.toString());
  const data = await res.json();
  if (data.status !== "OK") {
    console.error("Google Places API error:", data.status, data.error_message);
    return null;
  }
  return {
    reviews: data.result?.reviews ?? [],
    rating: data.result?.rating,
    user_ratings_total: data.result?.user_ratings_total,
    url: data.result?.url,
  };
};

const fetchGoogleReviewsFromAPI = async (
  placeOrCid: string
): Promise<PlaceReviewsResponse | null> => {
  try {
    if (!placeOrCid) return null;
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API key is not configured");
      return null;
    }

    let chij = isChIJ(placeOrCid) ? placeOrCid : null;

    if (!chij) {
      const candidates = [
        "Βιλιώτης Ηλίας Ανδ. Παπανδρέου 2Α Μελίσσια",
        "Viliotis Ilias Accounting Melissia",
        `https://www.google.com/maps?cid=${placeOrCid}`,
      ];
      for (const q of candidates) {
        chij = await resolveChIJFromQuery(q);
        if (chij) break;
      }
    }

    if (!chij) return null;
    return await fetchDetails(chij);
  } catch (error) {
    console.error("fetchGoogleReviewsFromAPI error:", error);
    return null;
  }
};

export const getGoogleReviews = unstable_cache(
  fetchGoogleReviewsFromAPI,
  ["google-reviews"],
  {
    revalidate: 300,
    tags: ["google-reviews"],
  }
);
