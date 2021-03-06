function addLoadEvent(func){
    var oldOnload=window.onload;
    if (typeof window.onload != "function"){
        window.onload=func;
    }else{
        window.onload=function(){
            oldOnload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value){
    if(!element.className){
        element.className=value;
    }else{
        newClassName=element.className;
        newClassName+=" ";
        newClassName+=value;
        element.className=newClassName;
    }
}

function highlightPage(){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;

    var headers=document.getElementsByTagName("header");
    if (headers.length==0) return false;
    var navs=headers[0].getElementsByTagName("nav");
    if(navs.length==0) return false;

    var links=navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i=0;i<links.length;i++){
        linkurl=links[i].getAttribute("href");

        if(window.location.href.indexOf(linkurl) != -1){
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase;
            document.body.setAttribute("id", linktext);
        }
    }
}


function moveElement(elementID, final_x, final_y, interval){
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem=document.getElementById(elementID);
    if (elem.movement){
        clearTimeout(elem.movement);
    }

    //检查元素有无left、top的样式熟悉
    if(!elem.style.left){
        elem.style.left="0px";
    }
    if(!elem.style.top){
        elem.style.top="0px";
    }

    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    var dist;

    if(xpos==final_x && ypos==final_y){
        return true;
    }

    if(xpos<final_x){
        dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+dist;
    }

    if(xpos>final_x){
        dist=Math.ceil((xpos-final_x)/10);
        xpos=xpos-dist;
    }

    if(ypos<final_y){
        dist=Math.ceil((final_y-ypos)/10);
        ypos=ypos+dist;
    }

    if(ypos>final_y){
        dist=Math.ceil((ypos-final_y)/10);
        ypos=ypos-dist;
    }

    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";

    repeat="moveElement('"+elementID+"',"+ final_x+","+final_y+","+ interval+")";

    elem.movement=setTimeout(repeat,interval);

}


function prepareSlideshow(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("intro")) return false;
    //获取article中的intro段落
    var intro=document.getElementById("intro");

    // 创建放preview图片的div容器
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id", "slideshow");

    //创建frame
    var frame=document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);
    
    // 创建preview 的img
    var preview=document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");

    // 将preview添加进slideshow容器；将slideshow放到intro后面
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    //遍历intro中的链接
    var links=document.getElementsByTagName("a");
    var destination;
    for (var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            destination=this.getAttribute("href");
            if (destination.indexOf("index.html")!=-1){
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html")!=-1){
                moveElement("preview",-300,0,5);
            }
            if (destination.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,5);
            }
            if (destination.indexOf("contact.html")!=-1){
                moveElement("preview", -600, 0, 5);
            }
        }
    }


}

function showSection(id){
    var sections=document.getElementsByTagName("section");
    for (var i=0; i<sections.length; i++){
        if (sections[i].getAttribute("id") != id){
            sections[i].style.display="none";
        }else{
            sections[i].style.display="block";
        }
    }
}

function prepareInternalnav(){
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles=document.getElementsByTagName("article");
    if (articles.length ==0) return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;

    var nav=navs[0];
    var links=nav.getElementsByTagName("a");
    for (var i=0; i<links.length;i++){
        var sectionId=links[i].href.split("#")[1];
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination=sectionId;
        links[i].onclick=function(){
            showSection(this.destination);
            return false;
        }
    }
}


function showPic(whichpic){
    if (!document.getElementById("placeholder")) return false;
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src", source);

    if (document.getElementById("description")){
        var text=whichpic.getAttribute("title") ? whichpic.getAttribute("title"):"";
        var description=document.getElementById("description");
        if (description.firstChild.nodeType == 3){
            description.firstChild.nodeValue=text;
        }
    }
    return true;
}

function prepareGallery(){
    if (!document.getElementsByTagName || !document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for (var i=0;i<links.length;i++){
        links[i].onclick=function(){
            return !showPic(this);
        };
    }
}

function preparePlaceholder(){
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;

    var placeholder=document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");

    var description=document.createElement("p");
    description.setAttribute("id", "description");

    var desctext=document.createTextNode("Choose an image");
    description.appendChild(desctext);

    var gallery=document.getElementById("imagegallery");

    insertAfter(description, gallery);
    insertAfter(placeholder, description);
}


function highlightRows(){
    if(!document.getElementsByTagName) return false;
    var rows=document.getElementsByTagName("tr");
    for (var i=0;i<rows.length;i++){
        rows[i].oldClassName=rows[i].className;
        rows[i].onmouseover=function(){
            addClass(this, "highlight");
        }
        rows[i].onmouseout=function(){
            this.className=this.oldClassName;
        }
    }
}

function stripTables(){
    if(!document.getElementsByTagName) return false;
    var tables=document.getElementsByTagName("table");
    var odd, rows;
    for(var i=0;i<tables.length;i++){
        odd=false;
        rows=tables[i].getElementsByTagName("tr");
        for (var j=0;j<rows.length;j++){
            if(odd==true){
                addClass(rows[j],"odd")
                odd=false;
            }else{
                odd=true;
            }
        }
    }
}

function displayAbbreviations(){
    //取得所有缩略词
    var abbreviations=document.getElementsByTagName("abbr");
    if(abbreviations.length<1) return false;
    var defs = new Array();

    //遍历这些缩略词
    for (var i=0; i<abbreviations.length;i++){
        current_abbr=abbreviations[i];
        if(current_abbr.childNodes.length<1) continue;
        var definition=current_abbr.getAttribute("title");
        var key=current_abbr.lastChild.nodeValue;
        defs[key]=definition;
    }

    //创建定义列表
    var dlist=document.createElement("dl");

    //遍历定义
    for (key in defs){
        var definition=defs[key];
        // 创建定义标题
        var dtitle=document.createElement("dt");
        var dtitle_text=document.createTextNode(key);
        dtitle.appendChild(dtitle_text);

        // 创建定义描述
        var ddesc=document.createElement("dd");
        var ddesc_text=document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);

        // 把它们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if(dlist.childNodes.length<1) return false; //为了兼容IE7之前的浏览器，它们不承认<abbr>元素

    // 创建标题
    var header=document.createElement("h2");
    var header_text=document.createTextNode("Abbreviations");
    header.appendChild(header_text);

    var articles=document.getElementsByTagName("article");
    if (articles.length==0) return false;

    var container=articles[0];

    // 把标题添加到页面主体
    container.appendChild(header);
    // 把定义列表添加到页面主体
    container.appendChild(dlist);
}


function focusLabels(){
    if (!document.getElementsByTagName) return false;
    var labes=document.getElementsByTagName("label")
    for (var i=0; i<labes.length;i++){
        if (!labes[i].getAttribute("for")) continue;
        labes[i].onclick=function(){
            var id=this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            var element=document.getElementById(id);
            element.focus();
        }
    }
}

function resetFields(whichform){
    // if (Modernizer.input.placeholder) return;
    for (var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.type=="submit") continue;

        var check=element.placeholder||element.getAttribute("placeholder"); //鉴于不用的浏览器对未知属性的实现方式有所不同，同时使用两种属性读取方式
        if (!check) continue;
        element.onfocus=function(){
            this.className="";
            this.value="";
        }
        element.onblur=function(){
            if (this.value==""){
                this.className="placeholder";
                this.value=this.placeholder ||this.getAttribute("placeholder");
            }
        }

        element.onblur();//在onblur事件定义之后，立即调用了它，以便在必要时应用占位符值。
    }
}

function prepareForms(){
    for (var i=0;i<document.forms.length;i++){
        var thisform=document.forms[i];
        resetFields(thisform);
        thisform.onsubmit=function(){
            if (!validateForm(this)) return false;
            var article=document.getElementsByTagName("article")[0];
            if (submitFormWithAjax(this, article)) return false;//ajax发送成功，就不用在跳转到默认的submit.html了
            return true;
        }
    }
}

function isFilled(field){
    if (field.value.replace(" ","").length==0) return false;
    var placeholder=field.placeholder || field.getAttribute("placeholder");
    return (field.value != placeholder);
}

function isEmail(field){
    return (field.value.indexOf("@")!=-1)&&(field.value.indexOf(".")!=-1);
}

function validateForm(whichform){
    for (var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if (element.required=="required"){
            if (!isFilled(element)){
                alert("Please fill in the "+element.name+" field.");
                return false;
            }
        }
        if (element.type=="email"){
            if(!isEmail(element)){
                alert("The "+element.name+" field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}


function getHTTPObject(){
    if (typeof XMLHttpRequest=="undefined"){
        try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
        catch(e){}
        try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
        catch(e){}
        try{return new ActiveXObject("Msxml2.XMLHTTP");}
        catch(e){}
        return false;
    }
    return new XMLHttpRequest();
}

function displayAjaxLoading(element){
    while (element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }

    var content=document.createElement("img");
    content.setAttribute("src", "images/loading.gif");
    content.setAttribute("alt", "loading...");
    element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget){
    var request=getHTTPObject();
    if (!request) return false;
    displayAjaxLoading(thetarget);

    var dataParts=[];
    var element;
    for (var i=0;i<whichform.elements.length;i++){
        element=whichform.elements[i];
        dataParts[i]=element.name+"="+encodeURIComponent(element.value);
    }
    var data=dataParts.join("&");

    request.open("POST", whichform.getAttribute("action"),true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange=function(){
        if (request.readyState==4){
            if(request.status==200 || request.status==0){
                var matchs=request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matchs.length>0){
                    thetarget.innerHTML=matchs[1];
                }else{
                    thetarget.innerHTML='<p>Oops, there was an error. Sorry.</p>';
                }
            }else{
                thetarget.innerHTML="<p>"+request.statusText+"</p>"
            }
        }
    };

    request.send(data);
    return true;
}



addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);