let isInvoked = false;

const testCacheStorage = async function () {
    if (isInvoked) return;
    isInvoked = true;

    console.log("testCache已经运行");

    const testCache1: Cache = await caches.open("testCache1");

    console.log("开始用三个方法获取两个页面")
    await testCache1.add("./测试页面1.html");
    await testCache1.addAll(["./测试页面1.html", "./测试页面2.html"]);

    const request = new Request("./测试页面3.html");
    const request2 = new Request("./测试页面3.html");
    await testCache1.put(request, new Response("测试页面3"));
    await testCache1.put(request2, new Response("测试页面3"));

    console.log("目前cache里面有", await testCache1.keys());

    console.log("删除一个测试页面3的request")
    await testCache1.delete(request);
    console.log("目前cache里面有", await testCache1.keys());

    /*
    * 具体的匹配流程
    * 假设你有一个缓存对象 myCache，并调用 myCache.match(request)，其基本匹配流程如下：
    *
    * 查找是否存在与 request.url 完全匹配的缓存条目。
    * 确保请求方法是 GET。
    * 检查缓存响应的 Vary 头是否匹配请求头，除非设置了 ignoreVary: true。
    * 如果找不到完全匹配的条目并且 ignoreSearch 为 true，则忽略查询字符串进行匹配。
    * */
    console.log("检索测试页面2", encodeURIComponent("测试页面2"),
        await testCache1.match("./%E6%B5%8B%E8%AF%95%E9%A1%B5%E9%9D%A22.html", {
            ignoreSearch: true,
            ignoreMethod: true,
            ignoreVary: true
        }));
    console.log("检索测试页面3", encodeURIComponent("测试页面3"), await testCache1.match("./" + encodeURIComponent("测试页面3") + ".html"));

    console.log("检索测试页面1", await testCache1.matchAll("./" + encodeURIComponent("测试页面1") + ".html"));
}

self.addEventListener("install", function () {
    console.log("install");
    testCacheStorage();
})

self.addEventListener("activate", function () {
    console.log("activate");
    testCacheStorage();

})

