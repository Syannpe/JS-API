/// <reference lib="webworker" />

let isInvoked = false;
const main = async function () {
    if (isInvoked) return;
    isInvoked = true;

    console.log("main函数已经运行");

    console.log("开始添加一个测试页面1")
    // @ts-ignore
    const newClient: Client = await clients.openWindow('./测试页面1.html').catch(err => console.log("窗口未能弹出", err.message));
    console.log("开始添加一个测试页面2")
    // @ts-ignore
    const newClient2: Client = await clients.openWindow('./测试页面2.html').catch(err => console.log("窗口未能弹出", err.message));

    // @ts-ignore
    console.log("获取所有客户端", await clients.matchAll());
};

self.addEventListener('install', (event) => {
    console.log("service worker已经安装")
});

self.addEventListener('activate', (event) => {
    console.log("service worker已经开始发挥作用")
});

/*
* Clients.openWindow() 只能在特定的 Service Worker 生命周期事件
* （如 notificationclick、push 事件的回调）中调用，
* 不能随时随地使用。如果你在其他事件中使用，
* 例如 fetch 事件或 install 事件，它将抛出 InvalidAccessError。
* */
self.addEventListener("notificationclick", function () {
    console.log("通知被点击了");
    main();
});