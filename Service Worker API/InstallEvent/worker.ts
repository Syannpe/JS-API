/// <reference lib="webworker" />

declare class InstallEvent extends ExtendableEvent {
    public new(): InstallEvent;

    public activeWorker: ServiceWorker;//好像没有
}

self.addEventListener('install', (event: InstallEvent): void => {
    console.log(event,event.activeWorker)
})
