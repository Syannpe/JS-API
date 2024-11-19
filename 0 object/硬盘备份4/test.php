<?php
// 原始 URL
$url = "https://pan.baidu.com/api/list?clienttype=0&app_id=250528&web=1&dp-logid=41902700202618240079&order=time&desc=1&dir=%2F郑瑞蓬%27s+误删";

// 解析 URL
$parsedUrl = parse_url($url);

// 提取查询字符串并解析为数组
$queryParams = [];
if (isset($parsedUrl['query'])) {
    parse_str($parsedUrl['query'], $queryParams);
}

// 修改或添加 GET 参数
$queryParams['dir'] = '%2F郑瑞蓬%27s+误删%2F玛丽罗斯合集'; // 修改 param1 的值

// 重新构建查询字符串
$newQuery = http_build_query($queryParams);

// 重新构建完整的 URL
$parsedUrl['query'] = $newQuery;
$modifiedUrl = $parsedUrl['scheme'] . '://' . $parsedUrl['host'] . $parsedUrl['path'] . '?' . $parsedUrl['query'];

// 输出修改后的 URL
echo urldecode($modifiedUrl);
?>