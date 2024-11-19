/// <reference lib="webworker" />
// 在工作线程中使用 dump() 函数
self.onmessage = function (event) {
    // 接收主线程发送的数据
    let data = event.data;
    // 处理数据
    // ...
    // 将处理结果输出到标准输出设备
    self.dump('处理结果: ' + data);
};
