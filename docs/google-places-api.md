# Google Places API — Live Rating Integration

Plan for pulling the live Google rating (4.4 ★, ~900 reviews) into the site
instead of hardcoding it.

## How it works

```
Browser ──▶ Next.js server ──(API key)──▶ Google Places API
        ◀── HTML with "4.4 ★" ◀───(JSON)──
```

The API key lives only on the server. The browser never sees it — it only
receives the finished numbers. Any key shipped to the browser can be stolen
from DevTools.

## One-time setup (Google Cloud Console)

1. Create a project at console.cloud.google.com (e.g. `fujiyama-website`).
2. Enable billing (usage stays $0 — ~30 calls/month vs thousands free).
3. APIs & Services → Library → enable **Places API (New)**.
4. Credentials → Create API key → restrict it to Places API (New) only.
5. Find the restaurant's Place ID with Google's "Place ID Finder"
   (search: Fujiyama Japanese Steakhouse Bushnell).

## Test the raw request first

```powershell
curl.exe -H "X-Goog-Api-Key: YOUR_KEY" `
  -H "X-Goog-FieldMask: rating,userRatingCount,displayName" `
  "https://places.googleapis.com/v1/places/YOUR_PLACE_ID"
```

Expected response:

```json
{ "displayName": { "text": "Fujiyama Japanese Steakhouse" }, "rating": 4.4, "userRatingCount": 911 }
```

The `X-Goog-FieldMask` header limits which fields Google returns — and
determines billing tier, so ask for only what you need.

## Secrets

Create `.env.local` in the project root (gitignored, loaded automatically):

```
GOOGLE_PLACES_API_KEY=your-key-here
GOOGLE_PLACE_ID=ChIJxxxxxxxxxxxx
```

No `NEXT_PUBLIC_` prefix — that prefix exposes a variable to the browser.

## The fetch (`src/lib/rating.ts`)

```ts
const FALLBACK = { rating: 4.4, count: 900 };

export async function getGoogleRating() {
  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${process.env.GOOGLE_PLACE_ID}`,
      {
        headers: {
          "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY!,
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
        next: { revalidate: 86400 }, // cache 24h → ~30 API calls/month
      }
    );
    if (!res.ok) return FALLBACK;
    const data = await res.json();
    return { rating: data.rating, count: data.userRatingCount };
  } catch {
    return FALLBACK; // API down / key expired → site still shows numbers
  }
}
```

Key ideas: `revalidate` caches the response so traffic doesn't multiply API
calls, and the fallback keeps the site working when the API fails.

## Wiring it in

`page.tsx` is a server component (can use secrets + `await`); `Hero.tsx` is
`"use client"` (cannot). Fetch on the server, pass down as a prop:

```tsx
export default async function Home() {
  const googleRating = await getGoogleRating();
  return <main><Hero rating={googleRating} /> ... </main>;
}
```

## Deployment

`.env.local` exists only locally. Add the same two variables in the host's
dashboard (Vercel/Netlify → Environment Variables), or production silently
falls back to the hardcoded numbers.

## Don't do

- No `AggregateRating` JSON-LD built from Google's own reviews — Google
  treats self-serving local-business rating markup as spam and ignores it.
- No scraping Google/Yelp (ToS violation, breaks constantly).
- No third-party review widgets (fees, branding, slower page).
