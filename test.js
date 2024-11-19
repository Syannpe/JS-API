/*用于指定元素与元素之间的链接方式*/
var LinkType;
(function (LinkType) {
    LinkType[LinkType["default"] = 0] = "default";
    //...
})(LinkType || (LinkType = {}));
class MyElement {
    /*向用户隐藏的属性，用于储存周围所有节点*/
    neighbor = new Set();
    /*临时状态变量，用于表示在遍历绘制的时候显示此节点是否已经被绘画*/
    #drawed = false;
    link(element) {
        /*
        *  1 添加元素到队列
        * */
        this.neighbor.add(element);
        return null;
    }
    with(info, type = LinkType.default) {
        /*添加连线信息*/
    }
    draw() {
        /*以当前元素为中心绘制图像*/
        /*遍历所有周围元素以完成绘制*/
        this.neighbor.forEach((ele) => {
            ele.draw();
        });
    }
}
const f = new MyElement();
const a = new MyElement();
const b = new MyElement();
const c = new MyElement();
f.link(a).with("info");
f.link(b).with("info");
f.link(c).with("info");
a.link(b).with("info");
f.draw();
