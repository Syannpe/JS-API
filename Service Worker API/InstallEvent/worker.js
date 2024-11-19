/// <reference lib="webworker" />
self.addEventListener('install', (event) => {
    console.log(event, event.activeWorker);
});
