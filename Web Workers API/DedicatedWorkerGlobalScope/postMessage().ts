// worker.ts 中的代码
self.onmessage = function (e) {
    console.log(self.name + '收到消息：', e.data);
    // 发送消息回主文档
    self.postMessage(self.name + '收到：' + e.data);
};