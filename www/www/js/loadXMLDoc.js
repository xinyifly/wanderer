function loadXMLDoc(url, param, postparam) {
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null)
    {
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 
                    && xmlhttp.status == 200)
                stateChange(xmlhttp, param);
        };
        if (postparam)
        {
            xmlhttp.open("POST", url, true);
            xmlhttp.setRequestHeader("Content-type", 
                    "application/x-www-form-urlencoded");
            xmlhttp.send(postparam);
        }
        else
        {
            xmlhttp.open("GET", url, true);
            xmlhttp.send(null);
        }
    }
    else
    {
        alert("Your browser does not support XMLHTTP");
    }
}
