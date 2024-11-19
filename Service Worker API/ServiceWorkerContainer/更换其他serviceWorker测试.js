/// <reference lib="WebWorker" />
self.addEventListener('install', (event) => {
    event.waitUntil(
    // @ts-ignore
    self.skipWaiting());
});
