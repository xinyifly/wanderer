function stateChange(xmlhttp, param) {
    var paramSub = param;
    if (param.indexOf("&") != -1)
        paramSub = param.substring(0, param.indexOf("&"));
    switch (paramSub)
    {
    case "headnav":
        document.getElementById(param).innerHTML = 
            xmlhttp.responseText;
        break;
    case "index_main":
        indexLoadModuleMain(xmlhttp);
        break;
    case "comment_lister":
        commentListComment(xmlhttp, param);
        break;
    case "comment_submit":
        loadXMLDoc("/upload/xml/comment.xml?rand=" 
                + new Date().getTime(), 
                "comment_lister");
        break;
    case "blog_main":
        blogListBlog
    }
}

function indexLoadModuleMain(xmlhttp) {
    var txt = "";
    var x = xmlhttp.responseXML.getElementsByTagName("say");
    var xx;
    for (var i = x.length - 1; i >= 0; i--)
    {
        xx = x[i].getElementsByTagName("value");
        txt = txt + "<p class='mainp'>" 
            + xx[0].childNodes[0].nodeValue + "</p>";
        xx = x[i].getElementsByTagName("date");
        txt = txt + "<p class='mainpDate'>" 
            + xx[0].childNodes[0].nodeValue + "</p>";
    }
    document.getElementById("main").innerHTML = txt;
}

function commentSubmit() {
    var name = document.getElementsByName("name")[0].value;
    var value = document.getElementsByName("value")[0].value;
    if (name != "" && value != "")
    {
        var xmlphp = "http://file.armlfs.org/services/xml.php";
        var postParam = "url=/upload/xml/comment.xml" + "&op=add" 
            + "&elems=comment_value_name" + "&value=" + value 
            + "&name=" + name;
        loadXMLDoc(xmlphp, "comment_submit", postParam);
    }
}

function commentListComment(xmlhttp, param) {
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
        txt = txt + "<p class='mainp'><span>"
            + xx[0].childNodes[0].nodeValue + ": </span>";
        xx = x[i].getElementsByTagName("value");
        txt = txt + xx[0].childNodes[0].nodeValue + "</p>";
        xx = x[i].getElementsByTagName("date");
        txt = txt + "<p class='mainpDate'>"
            + xx[0].childNodes[0].nodeValue + "</p>";
    }
    var pages = x.length/pageLen + (x.length%pageLen == 0 ? 0 : 1);
    for (var i = 1; i <= pages; i++)
    {
        if (i != page)
        txt = txt + "<a href=\"javascript:loadXMLDoc(" 
            + "'/upload/xml/comment.xml', 'comment_lister&" 
            + i + "')\" class=\"submitButton\">" + i + "</a>";
        else
            txt = txt + "<a href=\"javascript:void(0)\"" 
                + "class=\"submitButton\" style=\"color:black\">" 
                + i + "</a>";
    }
    document.getElementById("commentLister").innerHTML = txt;
}

function blogListBlog(xmlhttp,param) {
}

loadXMLDoc("module/headnav.html", "headnav");
