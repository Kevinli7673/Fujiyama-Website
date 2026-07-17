export type GoogleRating = { rating: number; count: number };

const FALLBACK: GoogleRating = { rating: 4.4, count: 850 };

export async function getGoogleRating(): Promise<GoogleRating> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return FALLBACK;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return FALLBACK;
    const data = await res.json();
    if (typeof data.rating !== "number") return FALLBACK;
    return { rating: data.rating, count: data.userRatingCount ?? FALLBACK.count };
  } catch {
    return FALLBACK;
  }
}
