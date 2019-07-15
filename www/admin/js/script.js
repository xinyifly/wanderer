function stateChange(xmlhttp, param) {
    var paramSub = param;
    if (param.indexOf("&") != -1)
        paramSub = param.substring(0, param.indexOf("&"));
    switch (paramSub)
    {
    case "comment_list":
        adminCommentList(xmlhttp, param);
        break;
    case "comment_del":
        loadXMLDoc("/upload/xml/comment.xml?rand="
                + new Date().getTime(), "comment_list");
        break;
    }
}

function adminCommentList(xmlhttp, param) {
    var pageLen = 20;
    param = param.split("&");
    var page = 1;
    if (param[1] != null)
        page = parseInt(param[1]);
    var txt = "";
    var x = xmlhttp.responseXML.getElementsByTagName("comment");
    var xx;
    var start = x.length - 1 - (page - 1)*pageLen;
    for (var i = start; i >= 0 && i > start - pageLen; i--)
    {
        xx = x[i].getElementsByTagName("name");
        txt = txt + "<p>" 
            + "<a href='javascript:lineDelete("
            + i + ")'>删除</a>"
            + xx[0].childNodes[0].nodeValue + ": ";
        xx = x[i].getElementsByTagName("value");
        txt = txt + xx[0].childNodes[0].nodeValue + "----";
        xx = x[i].getElementsByTagName("date");
        txt = txt + xx[0].childNodes[0].nodeValue + "</p>";
        txt = txt + "<br>"
    }
    var pages = x.length/pageLen + (x.length%pageLen == 0 ? 0 : 1);
    for (var i = 1; i <= pages; i++)
    {
        if (i != page)
            txt = txt + "<a href=\"javascript:loadXMLDoc(" 
                + "'/upload/xml/comment.xml', 'comment_list&" 
                + i + "')\">" + i + "</a> &nbsp;";
        else
            txt = txt + i + " &nbsp";
    }
    document.getElementById("commentDelete").innerHTML = txt;
}

function lineDelete(id) {
    var xmlphp = "//file.armlfs.org/services/xml.php";
    var postParam = "url=/upload/xml/comment.xml" + "&op=del" 
        + "&elems=comment_" + id;
    loadXMLDoc(xmlphp, "comment_del" , postParam);
}

loadXMLDoc("/upload/xml/comment.xml", "comment_list");
