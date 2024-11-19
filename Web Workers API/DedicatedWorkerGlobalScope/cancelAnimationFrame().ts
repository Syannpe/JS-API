import {MapperEvent, Mapping, RequestMapping} from "../../libs/Mapper.js";

class MessageHandler {
    public animationFrame: number;
    public time: number = 0;

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

    @Mapping(0, "start")
    public onMessage2() {
        const that = this;
        console.log(self.name + '开始计时');

        const render = (deltaTime:number) => {
            that.time = deltaTime;
            that.animationFrame = requestAnimationFrame(render);
        }

        render(0);
    }

    @Mapping(0, "end")
    public onMessage3() {
        console.log(this);
        console.log(self.name + '结束计时，时间：' + this.time + 'ms')
        cancelAnimationFrame(this.animationFrame);
    }
}

// worker.ts 中的代码
self.onmessage = function (e) {
    RequestMapping(0, e.data);
};