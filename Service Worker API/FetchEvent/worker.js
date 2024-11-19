/// <reference lib="webworker" />
self.addEventListener('fetch', (event) => {
    /*
    * FetchEvent.clientId 只读
    * 发起 fetch 的同源客户端的 id。
    *
    * FetchEvent.preloadResponse 只读
    * 一个兑现为 Response 的 Promise，如果该 fetch 没有导航或者 navigation preload 未启用，则是 undefined。
    *
    * FetchEvent.replacesClientId 只读
    * 页面导航期间正被替换的客户端的 id。
    *
    * FetchEvent.resultingClientId 只读
    * 页面导航期间用于替换的客户端的 id。
    *
    * FetchEvent.request 只读
    * 浏览器想要发送的 Request。
    *
    * 方法
    * 从它的父元素 ExtendableEvent 继承方法。
    *
    * FetchEvent.respondWith()
    * 阻止浏览器的默认 fetch 操作，并且由你自己提供一个响应（可以是一个 promise）。
    *
    * ExtendableEvent.waitUntil()
    * 延长事件的生命周期。用于通知浏览器延长超出响应回复时间的任务，例如流和缓存。*/
    console.log(event.request.url);
    if (event.request.url.includes("fetch1.txt")) {
        console.log("FetchEvent.clientId", event.clientId);
        console.log("FetchEvent.preloadResponse", event.preloadResponse);
        // @ts-ignore
        console.log("FetchEvent.replacesClientId", event.replacesClientId);
        console.log("FetchEvent.resultingClientId", event.resultingClientId);
        console.log("FetchEvent.request", event.request);
        event.respondWith(new Response("我截取了fetch1的请求，我是代替他的请求", {
            headers: { 'Content-Type': 'text/plain' }
        }));
    }
    // console.log("FetchEvent.clientId", event.respondWith());
    // console.log("FetchEvent.clientId", event.waitUntil());
});
