/// <reference lib="webworker" />

/**
 * 在Web Worker中添加事件监听器，以处理来自主线程的消息。
 * 当接收到消息时，会将相同的数据回传给主线程。
 */
const globalScope: SharedWorkerGlobalScope = self as any;

const portSet: Set<MessagePort> = new Set();

/*
 * 在Web Worker中添加事件监听器，以处理来自主线程的消息。
 */
globalScope.onconnect = (e) => {
    const ports = e.ports;
    ports[ports.length - 1].start();
    portSet.add(ports[ports.length - 1]);

    /*
     * 在Web Worker中添加事件监听器，以处理来自主线程的消息。
     * 当接收到消息时，会将相同的数据回传给主线程。
     */
    ports[ports.length - 1].addEventListener(
        "message",
        function (e: MessageEvent) {
            if(e.data === "close"){
                self.close();
            }

            console.log("Message received from main script", e.data);
            ports[ports.length - 1].postMessage(e.data);
        },
    );

    /**
     * 遍历所有端口并发送连接消息
     *
     * 通过遍历一个端口数组，对每个端口发送一条消息，指示该端口已连接。
     * 消息内容包含端口的编号，以便接收方知道是哪个端口发来的消息。
     * 这里的关键是使用闭包来保存端口的索引，并在消息中递增该索引，以提供唯一的端口号。
     */
    ports.forEach((port, index) => {
        // 发送连接消息，消息中包含端口编号
        port.postMessage(`port ${index} has been connected`);
        port.postMessage("Connected to main script,name is " + self.name);
    });

    console.log("Connected to main script,name is" + self.name);
};
