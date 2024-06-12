// import { writeTextFile, prompt } from "https://deno.land/std/io/mod.ts";

async function generateHTMLFile(filename:string) {
  // const filename = await prompt("请输入文件名（不带后缀）：");
  if (filename.toLowerCase() === "exit") {
    return;
  }
  /*
    let htmlContent = "";
    console.log("请输入HTML内容：（输入exit结束输入）：");
    while (true) {
        const line = await prompt("");
        if (line.toLowerCase() === "exit") {
            break;
        }
        htmlContent += line + "\n";
    }

    let jsContent = "";
    console.log("请输入JS内容：（输入exit结束输入）：");
    while (true) {
        const line = await prompt("");
        if (line.toLowerCase() === "exit") {
            break;
        }
        jsContent += line + "\n";
    }*/
  /*const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${filename}</title>
    <style></style>
</head>
<body>

<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function () {

    })
</script>
</body>
</html>`;*/
  const content = ``;


  try {
    // @ts-ignore
    await Deno.writeTextFile(`creation/${filename}.ts`, content);
    console.log(`已成功生成文件：${filename}.html`);
    // await generateHTMLFile();
  } catch (error) {
    console.error("生成HTML文件时发生错误：", error);
  }
}

const filenames = [
  "caches",
  "console",
  "crossOriginIsolated",
  "crypto",
  "fonts",
  "indexedDB",
  "isSecureContext",
  "location",
  "navigator",
  "origin",
  "performance",
  "scheduler",
  "trustedTypes",
  "self",
  "atob()",
  "btoa()",
  "clearInterval()",
  "clearTimeout()",
  "createImageBitmap()",
  "dump()",
  "fetch()",
  "importScripts()",
  "queueMicrotask()",
  "setInterval()",
  "setTimeout()",
  "structuredClone()",
  "reportError()",
  "onerror",
  "onlanguagechange",
  "onoffline",
  "ononline",
  "onrejectionhandled",
  "onsecuritypolicyviolation",
  "onunhandledrejection",
];

try {
  const stats = await Deno.stat("creation");
  if (stats.isDirectory) {
    console.log("Directory exists:", "creation");
  } else {
    console.log("Not a directory:", "creation");
  }
} catch (error) {
  if (error instanceof Deno.errors.NotFound) {
    console.log("Directory does not exist:", "creation");
  } else {
    console.error("Error checking directory:", error);
  }
}
filenames.forEach((filename) => {
  generateHTMLFile(filename);
})
// generateHTMLFile();
//deno run --allow-write --allow-read 自动生成html.ts
