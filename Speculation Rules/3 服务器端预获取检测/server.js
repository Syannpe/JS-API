"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference lib="dom" />
// deno-lint-ignore-file no-unused-vars
var server_ts_1 = require("https://deno.land/std@0.193.0/http/server.ts");
var getMimeTypeWithDir = function (dir) {
    // deno-lint-ignore prefer-const
    var prefix = dir.substring(dir.lastIndexOf(".") + 1);
    var mimeType = "";
    switch (prefix) {
        case "html":
            mimeType = "text/html";
            break;
        case "css":
            mimeType = "text/css";
            break;
        case "js":
            mimeType = "text/javascript";
            break;
        case "json":
            mimeType = "text/json";
            break;
        case "png":
            mimeType = "image/png";
            break;
        case "jpg":
            mimeType = "image/jpeg";
            break;
        case "gif":
            mimeType = "image/gif";
            break;
        case "ico":
            mimeType = "image/x-icon";
            break;
        case "svg":
            mimeType = "image/svg+xml";
            break;
        case "mp4":
            mimeType = "video/mp4";
            break;
        case "mp3":
            mimeType = "audio/mpeg";
            break;
        case "wav":
            mimeType = "audio/wav";
            break;
        default:
            mimeType = "text/html";
            break;
    }
    return mimeType;
};
var staticHandler = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var urlPattern, paths, path, file, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlPattern = new URLPattern(req.url);
                paths = decodeURIComponent(urlPattern.pathname);
                path = "".concat(Deno.cwd()).concat(paths);
                console.log(path);
                if (req.headers.get("Sec-Purpose")) {
                    console.log("已经检测到本链接是通过prefetch获取的了，因为他设置了Sec-Purpose，值为" + req.headers.get("Sec-Purpose"), paths);
                }
                file = null;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Deno.readFile(path)];
            case 2:
                file = _a.sent();
                return [2 /*return*/, new Response(file, {
                        status: 200,
                        headers: new Headers({
                            "Content-Type": getMimeTypeWithDir(path),
                        }),
                    })];
            case 3:
                error_1 = _a.sent();
                file = null;
                return [2 /*return*/, new Response(file, {
                        status: 404,
                        headers: new Headers({
                            "Content-Type": "text/html",
                        }),
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var handler = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var urlPattern, paths;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlPattern = new URLPattern(req.url);
                paths = decodeURIComponent(urlPattern.pathname);
                if (paths === "/test") {
                    console.log("test链接获取已触发");
                    return [2 /*return*/, new Response(null, { status: 200 })];
                }
                return [4 /*yield*/, staticHandler(req)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
(0, server_ts_1.serve)(handler, { port: 8083 });
console.log("你可以通过http://localhost:8083/访问");
/*
 * deno run --allow-net --allow-run --allow-read "static server.ts"
 */
