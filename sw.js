const CACHE_NAME = 'calc-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  'index.html',
  'manifest.json'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('正在快取靜態資源');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 啟動 Service Worker 並清除舊快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('清除舊快取:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 攔截請求並從快取中讀取（離線支持）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});