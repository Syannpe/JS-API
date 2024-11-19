/// <reference lib="webworker" />
/// <reference lib="dom" />
self.addEventListener('install', function (event) {
    console.log("service worker已经安装");
});
self.addEventListener('activate', function (event) {
    console.log("service worker已经开始发挥作用");
});
/*
* Clients.openWindow() 只能在特定的 Service Worker 生命周期事件
* （如 notificationclick、push 事件的回调）中调用，
* 不能随时随地使用。如果你在其他事件中使用，
* 例如 fetch 事件或 install 事件，它将抛出 InvalidAccessError。
* */
self.addEventListener("notificationclick", function () {
    // @ts-ignore
    clients.matchAll().then(function (clientsList) {
        clientsList.forEach(function (client) {
            client.postMessage("从service worker发过来的信息");
        });
    });
});
self.addEventListener("fetch", function (ev) {
    // @ts-ignore
    clients.matchAll().then(function (clientsList) {
        var arr = [];
        clientsList.forEach(function (client) {
            console.log(client); // Logs 'window', 'worker', or 'sharedworker'
            // @ts-ignore
            var urlParttern = new URLPattern(client.url);
            var pathname = decodeURI(urlParttern.pathname);
            arr.push({ pathname: pathname, type: client.type });
        });
        console.table(arr);
    });
    // main();
});
