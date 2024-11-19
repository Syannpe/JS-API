const microtask = function () {
    console.log('microtask');
};
self.queueMicrotask(microtask);
console.log('main');
