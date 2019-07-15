<?php
header("Access-Control-Allow-Origin: *");
if ($_SERVER["REQUEST_METHOD"] != "POST")
    exit();
date_default_timezone_set("Asia/Shanghai");
$XML = new DOMDocument("1.0", "UTF-8");
$XML -> load("../upload/xml/say.xml");
$root = $XML -> getElementsByTagName("root") -> item(0);
$say = $XML -> createElement("say");
$value = $XML -> createElement("value", $_POST["say"]);
$date = $XML -> createElement("date", date("Y-m-d H:i:s"));
$say -> appendChild($value);
$say -> appendChild($date);
$root -> appendChild($say);
$XML -> save("../upload/xml/say.xml");
echo "Submit Success!";
