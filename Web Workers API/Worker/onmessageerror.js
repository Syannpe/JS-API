/// <reference lib="webworker"/>
self.onmessage = (e) => {
    console.log("Worker got message:", e.data);
};
self.onmessageerror = (e) => {
    console.log("Worker got message error:", e.data);
};
