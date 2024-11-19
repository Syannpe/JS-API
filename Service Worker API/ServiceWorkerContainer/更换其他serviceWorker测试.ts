/// <reference lib="WebWorker" />

declare class InstallEvent extends ExtendableEvent {
    public new(): InstallEvent;

    public activeWorker: ServiceWorker;//好像没有
}

self.addEventListener('install', (event: InstallEvent) => {
    event.waitUntil(
        // @ts-ignore
        self.skipWaiting()
    );
});

