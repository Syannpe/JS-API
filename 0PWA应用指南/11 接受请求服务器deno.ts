// deno-lint-ignore-file no-unused-vars
import { serve } from "https://deno.land/std@0.193.0/http/server.ts";

const getMimeTypeWithDir = function (dir: string): string {
  // deno-lint-ignore prefer-const
  let prefix: string = dir.substring(dir.lastIndexOf(".") + 1);
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

const staticServer = async (req: Request): Promise<Response> => {
  const urlPattern: URLPattern = new URLPattern(req.url);
  const paths: string = decodeURIComponent(urlPattern.pathname);
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
  } catch (error) {
    file = null;
    return new Response(file, {
      status: 404,
      headers: new Headers({
        "Content-Type": "text/html",
      }),
    });
  }
};

const handler = async (req: Request): Promise<Response> => {
  const urlPattern: URLPattern = new URLPattern(req.url);

  console.log(urlPattern.pathname);
  // 检查请求的路径是否匹配 '/share-file-handler' 并且请求方法为 POST
  if (urlPattern.pathname === "/share-file-handler" && req.method === "POST") {
    // 等待解析请求体为FormData
    const formData = await req.formData();

    // 从FormData中获取名为 "file" 的文件
    const file = formData.get("file");

    // 验证获取的文件是否是浏览器提供的File对象
    if (file instanceof File) {
      // 获取文件名
      const fileName = file.name;

      console.log(`已接受文件，文件名: ${fileName}`);

      // 返回一个响应，通知客户端文件已被接收
      return new Response(fileName + "已接收", {
        status: 200, // HTTP状态码200表示成功
        headers: new Headers({
          "Content-Type": "text/html", // 设置响应内容类型为HTML
        }),
      });
    }
  }else if (urlPattern.pathname === "/share-file-handler" && req.method === "GET") {
    console.log("GET");
    return new Response("Hello World", {
      status: 200,
      headers: new Headers({
        "Content-Type": "text/html",
      }),
    });
  }

  return await staticServer(req);
};

serve(handler, { port: 3000 });

console.log("你可以通过http://localhost:3000/访问");
/*
 * deno run --allow-net --allow-run --allow-read "11 接受请求服务器deno.ts"
 */
