/// <reference lib="webworker"/>

self.onmessage = (e) => {
  console.log("Worker got message:", e.data);
};
