// Service Worker v10 - force cache bust
const CACHE_NAME = 'ci-safety-v10';
self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        return caches.delete(key);
      }));
    }).then(function() {
      return clients.claim();
    })
  );
});
self.addEventListener('fetch', function(e) {
  // Network first - always get fresh content
  e.respondWith(fetch(e.request).catch(function() {
    return caches.match(e.request);
  }));
});
