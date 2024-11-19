// service-worker.ts


self.addEventListener("periodicsync", (event) => {
    if (event.tag === "update-news") {
        console.log("Periodic sync for update-news tag received.")
        // event.waitUntil(updateNews());
    }
});

self.addEventListener("install", (event) => {
    console.log("Install event triggered", event);

});