<?php
header("Access-Control-Allow-Origin: *");
if ($_SERVER["REQUEST_METHOD"] != "POST")
    exit();

$url = ".." . $_POST["url"];
$op = $_POST["op"];
$elems = explode("_", $_POST["elems"]);

$XML = new DOMDocument("1.0", "UTF-8");
$XML -> load($url);
$parent = $XML -> getElementsByTagName($_POST["parent"] ? 
    $_POST["parent"] : "root") -> item($_POST["ptid"] ? 
    $_POST["ptid"] : 0);
$nodes = array();

switch ($op)
{
case "add":
    addComment();
    break;
case "del":
    delComment();
    break;
}

$XML -> save($url);

// 必需写注释了
// POST参数格式
// "url=??&op=??&parent=??&ptid=??&elems=??_??_??&elem=value&.."
// 用"_"分割elems参数，获取要添加的标签名，$elems[0]是父元素
// 数组中剩下的元素全部appendChild到这个父元素中
// 对应的节点数组是$nodes
// 利用elem获取的标签名作为参数名称遍历$elems数组获取所有参数的值
// 在删除操作里，用$elems[1]表示待删除的id

function addComment() {
    global $elems, $XML, $parent, $nodes;
    date_default_timezone_set("Asia/Shanghai");
    $nodes[0] = $XML -> createElement($elems[0]);
    for ($i = 1; $i < count($elems); $i++)
    {
        $nodes[$i] = $XML -> createElement($elems[$i], 
            $_POST[$elems[$i]]);
        $nodes[0] -> appendChild($nodes[$i]);
    }
    $date = $XML -> createElement("date", date("Y-m-d H:i:s"));
    $nodes[0] -> appendChild($date);
    $parent -> appendChild($nodes[0]);
}

function delComment() {
    global $elems, $XML, $parent, $nodes;
    $nodes[0] = $XML -> getElementsByTagName($elems[0]);
    $nodes[1] = $nodes[0] -> item($elems[1]);
    $parent -> removeChild($nodes[1]);
}
