var cacheName = 'cache-v1';
var urlsToCache = ['./'];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    return self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(cacheName).then(function (cache) {
            return cache.match(event.request)
                .then(function (response) {
                    if (response) {
                        console.log('Served from cache');
                        return response;
                    }
                    return fetch(event.request).then(function (response) {
                        console.log('Response from network is:', response);
                        return response;
                    });
                }
                )
        })
    );
});