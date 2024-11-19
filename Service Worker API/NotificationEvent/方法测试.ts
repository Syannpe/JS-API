/// <reference lib="webworker" />

self.addEventListener("notificationclick", function (event: NotificationEvent): void {
    /*
    * NotificationEvent.notification 只读
    * 返回一个 Notification 对象，表示单击以触发事件的通知。
    * 
    * NotificationEvent.action 只读
    * 返回用户单击的通知按钮的字符串 ID。如果用户单击操作按钮以外的通知，或者通知没有按钮，则此值返回空字符串。*/
    console.log(event);
    console.log("event.notification", event.notification);
    console.log("event.action", event.action);
});