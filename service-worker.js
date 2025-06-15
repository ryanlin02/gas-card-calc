const CACHE_NAME = 'gas-calc-v1';
const urlsToCache = [
  '/gas-card-calc/',
  '/gas-card-calc/index.html',
  '/gas-card-calc/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
