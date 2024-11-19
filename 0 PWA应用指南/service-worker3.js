// service-worker.ts

self.addEventListener("backgroundfetchsuccess", async (event) => {
    console.log("Download complete!");
    event.updateUI({ title: "下载完成" });
});

self.addEventListener("backgroundfetchfail", (event) => {

    console.log("Download failed!")
    event.updateUI({ title: "无法完成下载" });
});

self.addEventListener("install", (event) => {
    console.log("Install event triggered", event);

});