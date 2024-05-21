const CACHE_NAME = 'my-site-cache-v1';

const manifest = self.__WB_MANIFEST

const cacheEntries = []

manifest?.forEach(
  (entry) => {
    const url = new URL(entry.url, self.location)
    cacheEntries.push(new Request(url.href))
    return url.href
  }
)

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache");
        return cache.addAll(cacheEntries);
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
          );
      }));
});

self.addEventListener("activate", event => {
  console.log("activate");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  );
});
