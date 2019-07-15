<?php
header("Access-Control-Allow-Origin: *");
if ($_SERVER["REQUEST_METHOD"] != "POST")
    exit();
if ($_POST["delid"])
{
    delComment($_POST["delid"]);
}
else
{
    addComment();
}

function addComment() {
    date_default_timezone_set("Asia/Shanghai");
    $XML = new DOMDocument("1.0", "UTF-8");
    $XML -> load("../upload/xml/comment.xml");
    $root = $XML -> getElementsByTagName("root") -> item(0);
    $comment = $XML -> createElement("comment");
    $value = $XML -> createElement("value", $_POST["value"]);
    $name = $XML -> createElement("name", $_POST["name"]);
    $date = $XML -> createElement("date", date("Y-m-d H:i:s"));
    $comment -> appendChild($value);
    $comment -> appendChild($name);
    $comment -> appendChild($date);
    $root -> appendChild($comment);
    $XML -> save("../upload/xml/comment.xml");
    echo "Submit Success!";
}

function delComment($id) {
    $XML = new DOMDocument("1.0", "UTF-8");
    $XML -> load("../upload/xml/comment.xml");
    $root = $XML -> getElementsByTagName("root") -> item(0);
    $comment = $XML -> getElementsByTagName("comment");
    $commentDel = $comment -> item($id);
    $root -> removeChild($commentDel);
    $XML -> save("../upload/xml/comment.xml");
    echo "Delete Success!";
}
