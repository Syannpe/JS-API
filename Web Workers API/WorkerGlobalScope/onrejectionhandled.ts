/// <reference lib="WebWorker" />

// 监听语言更改事件
// 当打开服务器的时候需要在浏览器内完成首选语言设置重启后在service worker上触发事件
self.addEventListener("languagechange", function (event) {
    console.log("languagechange");

    // 发送 fetch 请求，通知服务器语言更改事件
    fetch("http://localhost:8083/info?name=languagechange");

    // 显示通知
    (event as ExtendableEvent).waitUntil(
        (self as unknown as ServiceWorkerGlobalScope).registration.showNotification(
            "languagechange",
            {
                body: "languagechange",
            },
        ),
    );
});

// 监听在线事件
self.addEventListener("online", function (event) {
    console.log("online");

    // 发送 fetch 请求，通知服务器在线事件
    fetch("http://localhost:8083/info?name=online");

    // 显示通知
    (event as ExtendableEvent).waitUntil(
        (self as unknown as ServiceWorkerGlobalScope).registration.showNotification(
            "online",
            {
                body: "online",
            },
        ),
    );
});

// 监听离线事件
self.addEventListener("offline", function (event) {
    console.log("offline");

    // 发送 fetch 请求，通知服务器离线事件
    fetch("http://localhost:8083/info?name=offline");

    // 显示通知
    (event as ExtendableEvent).waitUntil(
        (self as unknown as ServiceWorkerGlobalScope).registration.showNotification(
            "offline",
            {
                body: "offline",
            },
        ),
    );
});

// 监听 promise 拒绝处理完成事件
// 即为全局有一个Promise拒绝处理完成就触发
self.addEventListener("rejectionhandled", function () {
    console.log("rejectionhandled");

    // 发送 fetch 请求，通知服务器 promise 拒绝处理完成事件
    fetch("http://localhost:8083/info?name=rejectionhandled");
});

// 监听安全策略违规事件
self.addEventListener("securitypolicyviolation", function () {
    console.log("securitypolicyviolation");

    // 发送 fetch 请求，通知服务器安全策略违规事件
    fetch("http://localhost:8083/info?name=securitypolicyviolation");
});

// 监听未处理的 promise 拒绝事件
self.addEventListener("unhandledrejection", function () {
    console.log("unhandledrejection");

    // 发送 fetch 请求，通知服务器未处理的 promise 拒绝事件
    fetch("http://localhost:8083/info?name=unhandledrejection");
});

// 监听激活事件
self.addEventListener("activate", function (event) {
    console.log("activate");

    // 发送 fetch 请求，通知服务器服务工作者已激活
    fetch("http://localhost:8083/info?name=installed");

    // 显示通知
    (self as unknown as ServiceWorkerGlobalScope).registration.showNotification(
        "activate",
        {
            body: "activate",
        },
    );
});

// 监听消息事件
self.addEventListener("message", function (event) {
    console.log("message");

    // 发送 fetch 请求，通知服务器收到消息
    fetch("http://localhost:8083/info?name=message");

    if (event.data === "rejection") {
        // 处理 rejection 消息
        new Promise(function (resolve, reject) {
            reject("rejection");
        }).catch(function (error) {
            console.log(error);
        });
    } else if (event.data === "unhandled rejection") {
        // 处理 unhandled rejection 消息
        new Promise(function (resolve, reject) {
            reject("unhandled rejection");
        });
    }
});
