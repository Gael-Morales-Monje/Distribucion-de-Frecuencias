const CACHE_NAME = 'mi-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js'
];

self.addEventListener('install', function(event) {
  // Instalación del Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Gestión de las solicitudes fetch
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Si se encuentra en caché, se devuelve la respuesta almacenada en caché
        if (response) {
          return response;
        }

        // Si no está en caché, se recupera del servidor
        return fetch(event.request)
          .then(function(response) {
            // Si la solicitud es válida, se clona para almacenarla en caché
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

self.addEventListener('activate', function(event) {
  // Gestión de la activación del Service Worker
  const cacheWhitelist = ['mi-cache'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});