const CACHE_NAME = 'fahrtenbuch-pwa-v1';
const FILES_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Installation: Lade die Kern-Dateien in den Cache
self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Fetch: Wenn offline, versuche die Dateien aus dem Cache zu laden
self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request).then((res) => {
            return res || fetch(evt.request);
        })
    );
});