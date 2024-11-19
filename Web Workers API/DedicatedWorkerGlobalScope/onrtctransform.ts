/// <reference lib="webworker" />

// 在DedicatedWorkerGlobalScope中监听rtctransform事件

self.addEventListener('message', function (event) {
    console.log(event.data);
});

self.addEventListener('rtctransform', (event: RTCTransformEvent) => {
    console.log(123)
    // 获取RTCTransformEvent中的信息
    const {transformer} = event;

    // 获取RTCRtpScriptTransformer实例
    const {readable, writable} = transformer;

    // 通过管道进行数据处理
    const transformStream = new TransformStream({
        start() {
            console.log('Transformation started');
        },
        async transform(chunk: Uint8Array, controller: TransformStreamDefaultController) {
            // 对每个数据块进行处理
            // 在这里可以对传输的数据进行加密、压缩等操作
            console.log('Transforming chunk:', chunk);

            // 假设我们进行简单的操作：将数据传递给下一个阶段
            controller.enqueue(chunk);
        },
        flush() {
            console.log('Transformation complete');
        }
    });

    // 将输入流和输出流连接到transformStream进行数据传输
    readable.pipeThrough(transformStream).pipeTo(writable).catch(console.error);
});