import {MapperEvent, Mapping, RequestMapping} from "../../libs/Mapper.js";

class MessageHandler {
    @Mapping(0)
    public onMessage(ev: MapperEvent) {
        console.log(self.name + '收到消息：', ev.key);
        // 发送消息回主文档
        self.postMessage(self.name + '收到：' + ev.key);
    }

    @Mapping(0, "close")
    public onMessage1() {
        console.log(self.name + '准备关闭');
        self.close();
    }

}

// worker.ts 中的代码
self.onmessage = function (e) {
    RequestMapping(0, e.data);
};