/// <reference lib="webworker" />
self.addEventListener("message", function (event) {
    /*
    * NotificationEvent.notification 只读
    * 返回一个 Notification 对象，表示单击以触发事件的通知。
    *
    * NotificationEvent.action 只读
    * 返回用户单击的通知按钮的字符串 ID。如果用户单击操作按钮以外的通知，或者通知没有按钮，则此值返回空字符串。*/
    console.log(event);
    console.log("event.data", event.data);
    console.log("event.origin", event.origin);
    console.log("event.lastEventId", event.lastEventId);
    console.log("event.source", event.source);
    console.log("event.ports", event.ports);
});
