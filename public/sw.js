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
