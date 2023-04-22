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
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    new Promise(function (resolve, reject) {
      fetch(event.request)
        .then(function (res) {
          caches
            .open(cacheName)
            .then(function (cache) {
              cache
                .put(event.request.url, res.clone())
                .then(function () {
                  resolve(res);
                })
                .catch(function (error) {
                  reject(error);
                });
            })
            .catch(function (error) {
              reject(error);
            });
        })
        .catch(function () {
          caches
            .match(event.request)
            .then(function (cachedResponse) {
              if (cachedResponse) {
                resolve(cachedResponse);
              } else {
                reject();
              }
            })
            .catch(function (error) {
              reject(error);
            });
        });
    })
  );
});
