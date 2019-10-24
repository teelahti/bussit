var cacheName = "cache-v3";
var urlsToCache = ["./"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(urlsToCache))
  );
  return self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          console.log("Served from cache");
          return response;
        }
        return fetch(event.request).then(response => {
          console.log("Response from network is:", response);
          return response;
        });
      });
    })
  );
});
