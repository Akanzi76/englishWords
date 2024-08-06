const CACHE_NAME = "my_cache_01";
const urlsToCache = ["/", "/index.html", "/style.css", "/script.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWidth(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
