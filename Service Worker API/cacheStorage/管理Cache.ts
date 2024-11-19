let isInvoked = false;

const testCacheStorage = async function () {
    if (isInvoked) return;
    isInvoked = true;

    console.log("testCache已经运行");

    const testCache1: Cache = await caches.open("testCache1");
    const testCache2: Cache = await caches.open("testCache2");
    const testCache3: Cache = await caches.open("testCache3");
    const testCache4: Cache = await caches.open("testCache4");

    let arr = await caches.keys();
    console.log("目前已有cache有", arr);

    console.log("caches.has(\"testCache1\")", await caches.has("testCache1"));
    console.log("caches.has(\"testCache3\")", await caches.has("testCache3"));

    console.log("删除testCache2");
    await caches.delete("testCache2");

    arr = await caches.keys();
    console.log("目前已有cache有", arr);

    console.log("向testCache4添加了百度链接");
    await testCache4.put("http://www.baidu.com", new Response("hello world"))

    console.log("caches.match(\"http://www.baidu.com\")", await caches.match("http://www.baidu.com"));
}

self.addEventListener("install", function () {
    console.log("install");
    testCacheStorage();
})

self.addEventListener("activate", function () {
    console.log("activate");
    testCacheStorage();

})

