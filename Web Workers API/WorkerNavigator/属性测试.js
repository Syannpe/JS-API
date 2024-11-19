var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Mapping, RequestMapping } from "../../libs/Mapper.js";
class MsgProcess {
    getProperties(ev) {
        const res = {};
        for (const navigatorKey in navigator) {
            if (navigator[navigatorKey] instanceof Object) {
                res[navigatorKey] = navigator[navigatorKey].constructor.name + '对象';
                continue;
            }
            res[navigatorKey] = navigator[navigatorKey];
        }
        console.log(res);
        self.postMessage(res);
    }
    setHandler(ev) {
        console.log(navigator);
        navigator.setAppBadge(setParam);
    }
    getHandler(ev) {
        navigator.clearAppBadge();
    }
}
__decorate([
    Mapping(0, "properties")
], MsgProcess.prototype, "getProperties", null);
__decorate([
    Mapping(0, "set")
], MsgProcess.prototype, "setHandler", null);
__decorate([
    Mapping(0, "get")
], MsgProcess.prototype, "getHandler", null);
let setParam = 0;
self.addEventListener("message", function (e) {
    let data = e.data;
    if (data.startsWith("set")) {
        setParam = Number.parseFloat(data.match(/(\d+)/)[1]);
        RequestMapping(0, "set");
        return;
    }
    RequestMapping(0, data);
});
