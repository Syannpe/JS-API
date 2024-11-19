import {Mapping, RequestMapping} from "../../libs/Mapper.js";

class MsgProcess {
    @Mapping(0, "properties")
    getProperties(ev) {
        const res = {};
        for (const navigatorKey in navigator) {
            if (navigator[navigatorKey] instanceof Object) {
                res[navigatorKey] = navigator[navigatorKey].constructor.name + '对象';
                continue;
            }
            res[navigatorKey] = navigator[navigatorKey];
        }

        console.log(res)
        self.postMessage(res);
    }

    @Mapping(0, "set")
    setHandler(ev) {
        console.log(navigator)
        navigator.setAppBadge(setParam)
    }

    @Mapping(0, "get")
    getHandler(ev) {
        navigator.clearAppBadge();
    }
}

let setParam = 0;
self.addEventListener("message", function (e) {
    let data: string = e.data;
    if (data.startsWith("set")) {
        setParam = Number.parseFloat(data.match(/(\d+)/)[1]);

        RequestMapping(0, "set");
        return;
    }
    RequestMapping(0, data);
})