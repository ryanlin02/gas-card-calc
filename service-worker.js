const CACHE_NAME = 'gas-calc-v2';
const urlsToCache = [
  '/gas-card-calc/',
  '/gas-card-calc/index.html',
  '/gas-card-calc/manifest.json',
  '/gas-card-calc/icon-192.png',
  '/gas-card-calc/icon-512.png'
];

// 安裝 Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('快取已開啟');
        return cache.addAll(urlsToCache);
      })
  );
});

// 啟動 Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 處理請求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果找到快取，就回傳快取內容
        if (response) {
          return response;
        }
        // 否則就從網路獲取
        return fetch(event.request);
      })
  );
});
