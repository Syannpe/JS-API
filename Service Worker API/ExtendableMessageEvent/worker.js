/// <reference lib="webworker" />
self.addEventListener("message", function (ev) {
    /*
    * ExtendableMessageEvent.data Read only
    * Returns the event's data. It can be any data type. If dispatched in messageerror event, the property will be null.
    *
    * ExtendableMessageEvent.origin Read only
    * Returns the origin of the Client that sent the message.
    *
    * ExtendableMessageEvent.lastEventId Read only
    * Represents, in server-sent events, the last event ID of the event source.
    *
    * ExtendableMessageEvent.source Read only
    * Returns a reference to the Client object that sent the message.
    *
    * ExtendableMessageEvent.ports Read only
    * Returns the array containing the MessagePort objects representing the ports of the associated message channel.
    * */
    console.log(ev);
    console.log("ExtendableMessageEvent.data", ev.data);
    console.log("ExtendableMessageEvent.origin", ev.origin);
    console.log("ExtendableMessageEvent.lastEventId", ev.lastEventId);
    console.log("ExtendableMessageEvent.source", ev.source);
    console.log("ExtendableMessageEvent.ports", ev.ports);
});
