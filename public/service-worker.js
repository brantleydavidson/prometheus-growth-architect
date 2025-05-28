const CACHE_NAME = 'prometheus-v1';
const urlsToCache = [
  '/',
  '/index.css',
  '/manifest.json',
  '/favicon.ico'
];

// Install event - cache initial resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
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
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    // For Supabase images, use network-first strategy
    if (url.hostname.includes('supabase.co')) {
      event.respondWith(
        fetch(request)
          .then(response => {
            if (response.status === 200) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(request, responseToCache));
            }
            return response;
          })
          .catch(() => caches.match(request))
      );
    }
    return;
  }

  // For navigation requests, use network-first
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/'))
    );
    return;
  }

  // For JS/CSS assets, use cache-first
  if (request.url.includes('/assets/')) {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        }))
    );
    return;
  }

  // Default: network-first strategy
  event.respondWith(
    fetch(request)
      .then(response => {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => cache.put(request, responseToCache));
        return response;
      })
      .catch(() => caches.match(request))
  );
}); 