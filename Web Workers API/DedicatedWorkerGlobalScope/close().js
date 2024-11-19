"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Mapper_js_1 = require("../../libs/Mapper.js");
var MessageHandler = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _onMessage_decorators;
    var _onMessage1_decorators;
    return _a = /** @class */ (function () {
            function MessageHandler() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            MessageHandler.prototype.onMessage = function (ev) {
                console.log(self.name + '收到消息：', ev.key);
                // 发送消息回主文档
                self.postMessage(self.name + '收到：' + ev.key);
            };
            MessageHandler.prototype.onMessage1 = function () {
                console.log(self.name + '准备关闭');
                self.close();
            };
            return MessageHandler;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _onMessage_decorators = [(0, Mapper_js_1.Mapping)(0)];
            _onMessage1_decorators = [(0, Mapper_js_1.Mapping)(0, "close")];
            __esDecorate(_a, null, _onMessage_decorators, { kind: "method", name: "onMessage", static: false, private: false, access: { has: function (obj) { return "onMessage" in obj; }, get: function (obj) { return obj.onMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _onMessage1_decorators, { kind: "method", name: "onMessage1", static: false, private: false, access: { has: function (obj) { return "onMessage1" in obj; }, get: function (obj) { return obj.onMessage1; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
// worker.ts 中的代码
self.onmessage = function (e) {
    (0, Mapper_js_1.RequestMapping)(0, e.data);
};
