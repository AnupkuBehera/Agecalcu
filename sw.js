/**
 * Dobcal Service Worker (PWA Offline Engine)
 * Stale-While-Revalidate caching for lightning-fast loads and offline capability.
 */

const CACHE_NAME = 'dobcal-v2.2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/calculator.js',
  '/js/i18n.js',
  '/js/app.js',
  '/favicon.svg',
  '/assets/logo-mark.svg',
  '/assets/og-image.png',
  '/manifest.webmanifest',
  '/about.html',
  '/privacy.html',
  '/terms.html',
  '/404.html',
  '/retirement-and-pension-calculator.html',
  '/pregnancy-due-date-calculator.html',
  '/child-vaccination-schedule-calculator.html',
  '/planet-age-calculator.html',
  '/numerology-life-path-calculator.html',
  '/family-birthday-manager.html',
  '/warranty-and-product-age-calculator.html',
  '/developer-api.html',
  '/calculate-age-in-excel.html',
  '/age-calculator-for-government-exams.html',
  '/school-admission-age-calculator.html',
  '/voting-and-driving-eligibility-calculator.html',
  '/pet-age-calculator.html',
  '/bulk-age-calculator.html',
  '/embed-widget.html',
  '/how-old-will-i-be-in-2040.html',
  '/age-difference-calculator.html',
  '/age-in-months-and-days.html',
  '/calculadora-de-edad.html',
  '/calculadora-de-idade.html',
  '/kalkulator-umur.html',
  '/hasibat-al-umr.html',
  '/calculateur-age.html',
  '/altersrechner.html',
  '/aayu-calculator-hindi.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

