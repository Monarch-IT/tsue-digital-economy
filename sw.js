const CACHE_NAME = 'tsue-v4';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/leadership.html',
  '/departments.html',
  '/directions.html',
  '/history.html',
  '/schedule.html',
  '/tutors.html',
  '/forum.html',
  '/cabinet.html',
  '/system.html',
  '/starosta.html',
  '/student-reg.html',
  '/widget.html',
  '/manifest.json',
  '/style.css',
  '/css/common.css',
  '/js/data.js',
  '/js/edupage_data.js',
  '/js/schedule.js',
  '/js/widget.js',
  '/assets/images/faculty_logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
