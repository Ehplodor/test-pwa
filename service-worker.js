self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
    .catch(err => {
        if(err instanceof TypeError && err.message === "NotAllowedError") {
            return new Response("Camera access denied");
        } else {
            return new Response("Hello, World!");
        }
    }));
});


// Set the files to cache
const filesToCache = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './icon256.png'
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
      } else {
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
        .then(fetchResponse => {
            return caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            });
        })
        .catch(error => {
            console.log('Error during fetching : ', error);
            throw error;
        });
      }
    })
  );
});

//In this example, the service worker is using the fetch event to intercept all network requests made by the web page. The caches.match() method is used to check if a copy of the requested resource is stored in the cache. If a cached version of the resource is found, the service worker returns it to the browser.
//If the resource is not found in the cache, the service worker falls back to the network and attempts to retrieve the resource using the fetch() method. If fetching is successful, it opens the cache and store the new response, then it returns the fetched version of the resource to the browser.
//The catch statement is there to handle any errors that might occur during the fetching process and log them.
//It's important to keep in mind that this is a very simple example, and you should take into account many other things that may occur on a production service worker, like handling the update of the resources, handling the deletion of old resources, handling network error and many more.
  