// service-worker.ts

const sendMessage = async () => {
    const message = {
        title: "Hello from Service Worker",
        body: "This is a notification from Service Worker",
        icon: "../0 resource/icon512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    };
    const options = {
        type: "basic",
        ...message,
    };

    console.log("Sending notification", options);
};
self.addEventListener("sync", (event) => {
    console.log("Sync event triggered", event)
    if (event.tag == "send-message") {
        event.waitUntil(sendMessage());
    }
});

self.addEventListener("install", (event) => {
    console.log("Install event triggered", event);

});