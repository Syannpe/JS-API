// deno-lint-ignore-file no-unused-vars
import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
const getMimeTypeWithDir = function (dir) {
    // deno-lint-ignore prefer-const
    let prefix = dir.substring(dir.lastIndexOf(".") + 1);
    let mimeType = "";
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
const staticFile = async (req) => {
    const urlPattern = new URLPattern(req.url);
    const paths = decodeURIComponent(urlPattern.pathname);
    const path = `${Deno.cwd()}${paths}`; // 获取请求的文件路径
    console.log(path);
    let file = null;
    try {
        file = await Deno.readFile(path);
        return new Response(file, {
            status: 200,
            headers: new Headers({
                "Content-Type": getMimeTypeWithDir(path),
            }),
        });
    }
    catch (error) {
        file = null;
        return new Response(file, {
            status: 404,
            headers: new Headers({
                "Content-Type": "text/html",
            }),
        });
    }
};
const handler = async function (req) {
    const urlPattern = new URLPattern(req.url);
    const paths = decodeURIComponent(urlPattern.pathname);
    const searchParams = new URLSearchParams(urlPattern.search);
    if (paths.endsWith("info")) {
        console.log(searchParams.get("name"));
        return new Response("OK", {
            status: 200,
            headers: new Headers({
                "Content-Type": "text/plain",
            }),
        });
    }
    return staticFile(req);
};
serve(handler, { port: 8083 });
console.log("你可以通过http://localhost:8083/访问");
/*
* deno run --allow-net --allow-run --allow-read "static server.ts"
* */ 
