self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response("Hello, World!");
    })
  );
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log(
          "Service worker registered: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service worker registration failed: ", error);
      });
  });
}

// Set the files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icon.png'
];

// Install event to cache the files
self.addEventListener('install', (event) => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open('static-assets')
    .then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// activate the service worker 
self.addEventListener('activate', (event) => {
  console.log('Activating new service worker...');

  const cacheWhitelist = ['static-assets'];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// intercept the network request
self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event
