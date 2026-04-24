/* MedLens service worker
 * Minimal stale-while-revalidate for same-origin GETs so the app is
 * installable as a PWA and opens instantly on repeat visits. No PHI is
 * cached here — only same-origin app shell + static assets.
 */
const CACHE_NAME = "medlens-v1";
const OFFLINE_URL = "/offline";
const APP_SHELL = ["/", "/offline", "/manifest.webmanifest", "/icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Never cache Next.js data/api routes — we want fresh label data.
  if (url.pathname.startsWith("/_next/data") || url.pathname.startsWith("/api/")) return;

  // Navigation requests: network-first, fall back to cache, then offline page.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() =>
          caches
            .match(req)
            .then((cached) => cached || caches.match(OFFLINE_URL)),
        ),
    );
    return;
  }

  // Static assets: stale-while-revalidate.
  if (/\.(?:js|css|svg|png|jpg|jpeg|webp|ico|woff2?)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
            return res;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      }),
    );
  }
});
