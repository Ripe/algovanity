var cacheName = 'algovanity::2023-04-22';

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function (cache) {
        return cache.addAll([
          '/index.html',
          '/favicon.png',
          '/build/bundle.css',
          '/build/bundle.js',
          '/build/algo.worker.js',
        ]);
      })
      .then(function () {
        self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) {
            return name !== cacheName;
          })
          .map(function (name) {
            return caches.delete(name);
          })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    (async function () {
      try {
        let res = await fetch(event.request);
        let cache = await caches.open(cacheName);

        await cache.put(event.request.url, res.clone());

        return res;
      } catch (error) {
        return caches.match(event.request);
      }
    })()
  );
});
