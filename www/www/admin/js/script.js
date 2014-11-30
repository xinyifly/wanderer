function stateChange(xmlhttp, param) {
    if (param == "comment_list")
        adminCommentList(xmlhttp);
    else if (param == "comment_del")
        loadXMLDoc("/upload/xml/comment.xml?rand="
                + new Date().getTime(),
                "comment_list");
}

function adminCommentList(xmlhttp) {
    var txt = "";
    var x = xmlhttp.responseXML.getElementsByTagName("comment");
    var xx;
    for (var i = x.length - 1; i >= 0; i--)
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
    }
    document.getElementById("commentDelete").innerHTML = txt;
}

function lineDelete(id) {
    loadXMLDoc("http://file.armlfs.org/services/comment.php", 
            "comment_del" , "delid=" + id);
}

loadXMLDoc("/upload/xml/comment.xml", "comment_list");
