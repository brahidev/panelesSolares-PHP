function Xajax(){this.DebugMessage=function(a){a.length>1e3&&(a=a.substr(0,1e3)+"...\n[long response]\n...");try{void 0!=this.debugWindow&&1!=this.debugWindow.closed||(this.debugWindow=window.open("about:blank","xajax-debug","width=800,height=600,scrollbars=1,resizable,status"),this.debugWindow.document.write('<html><head><title>Xajax debug output</title></head><body><h2>Xajax debug output</h2><div id="debugTag"></div></body></html>')),a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),debugTag=this.debugWindow.document.getElementById("debugTag"),debugTag.innerHTML="<b>"+(new Date).toString()+"</b>: "+a+"<hr/>"+debugTag.innerHTML}catch(b){alert("Xajax Debug:\n "+a)}},this.workId="xajaxWork"+(new Date).getTime(),this.depth=0,this.responseErrorsForAlert=["400","401","402","403","404","500","501","502","503"],this.getRequestObject=function(){xajaxDebug&&this.DebugMessage("Initializing Request Object..");var a=null;if("undefined"!=typeof XMLHttpRequest&&(a=new XMLHttpRequest),!a&&"undefined"!=typeof ActiveXObject)try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(b){try{a=new ActiveXObject("Msxml2.XMLHTTP.4.0")}catch(b){a=null}}}return!a&&window.createRequest&&(a=window.createRequest()),a||this.DebugMessage("Request Object Instantiation failed."),a},this.$=function(a){if(!a)return null;var b=document.getElementById(a);return!b&&document.all&&(b=document.all[a]),xajaxDebug&&!b&&a!=this.workId&&this.DebugMessage('Element with the id "'+a+'" not found.'),b},this.include=function(a){var b=document.getElementsByTagName("head"),c=document.createElement("script");c.type="text/javascript",c.src=a,b[0].appendChild(c)},this.stripOnPrefix=function(a){return a=a.toLowerCase(),0==a.indexOf("on")&&(a=a.replace(/on/,"")),a},this.addOnPrefix=function(a){return a=a.toLowerCase(),0!=a.indexOf("on")&&(a="on"+a),a},this.addHandler=function(sElementId,sEvent,sFunctionName){window.addEventListener?(sEvent=this.stripOnPrefix(sEvent),eval("this.$('"+sElementId+"').addEventListener('"+sEvent+"',"+sFunctionName+",false);")):(sAltEvent=this.addOnPrefix(sEvent),eval("this.$('"+sElementId+"').attachEvent('"+sAltEvent+"',"+sFunctionName+",false);"))},this.removeHandler=function(sElementId,sEvent,sFunctionName){window.addEventListener?(sEvent=this.stripOnPrefix(sEvent),eval("this.$('"+sElementId+"').removeEventListener('"+sEvent+"',"+sFunctionName+",false);")):(sAltEvent=this.addOnPrefix(sEvent),eval("this.$('"+sElementId+"').detachEvent('"+sAltEvent+"',"+sFunctionName+",false);"))},this.create=function(a,b,c){var d=this.$(a);objElement=document.createElement(b),objElement.setAttribute("id",c),d&&d.appendChild(objElement)},this.insert=function(a,b,c){var d=this.$(a);objElement=document.createElement(b),objElement.setAttribute("id",c),d.parentNode.insertBefore(objElement,d)},this.insertAfter=function(a,b,c){var d=this.$(a);objElement=document.createElement(b),objElement.setAttribute("id",c),d.parentNode.insertBefore(objElement,d.nextSibling)},this.getInput=function(a,b,c){var d;return window.addEventListener?(d=document.createElement("input"),d.setAttribute("type",a),d.setAttribute("name",b),d.setAttribute("id",c)):d=document.createElement('<input type="'+a+'" id="'+c+'" name="'+b+'">'),d},this.createInput=function(a,b,c,d){var e=this.$(a),f=this.getInput(b,c,d);e&&f&&e.appendChild(f)},this.insertInput=function(a,b,c,d){var e=this.$(a),f=this.getInput(b,c,d);f&&e&&e.parentNode&&e.parentNode.insertBefore(f,e)},this.insertInputAfter=function(a,b,c,d){var e=this.$(a),f=this.getInput(b,c,d);f&&e&&e.parentNode&&e.parentNode.insertBefore(f,e.nextSibling)},this.remove=function(a){objElement=this.$(a),objElement&&objElement.parentNode&&objElement.parentNode.removeChild&&objElement.parentNode.removeChild(objElement)},this.replace=function(sId,sAttribute,sSearch,sReplace){var bFunction=!1;if("innerHTML"==sAttribute&&(sSearch=this.getBrowserHTML(sSearch)),eval("var txt=this.$('"+sId+"')."+sAttribute),"function"==typeof txt&&(txt=txt.toString(),bFunction=!0),txt.indexOf(sSearch)>-1){for(var newTxt="";txt.indexOf(sSearch)>-1;)x=txt.indexOf(sSearch)+sSearch.length+1,newTxt+=txt.substr(0,x).replace(sSearch,sReplace),txt=txt.substr(x,txt.length-x);newTxt+=txt,bFunction?eval('this.$("'+sId+'").'+sAttribute+"=newTxt;"):this.willChange(sId,sAttribute,newTxt)&&eval('this.$("'+sId+'").'+sAttribute+"=newTxt;")}},this.getFormValues=function(a){var b,c=!1;arguments.length>1&&1==arguments[1]&&(c=!0);var d="";arguments.length>2&&(d=arguments[2]),b="string"==typeof a?this.$(a):a;var e="<xjxquery><q>";if(b&&"FORM"==b.tagName)for(var f=b.elements,g=0;g<f.length;g++)if(f[g].name&&f[g].name.substring(0,d.length)==d&&!(f[g].type&&("radio"==f[g].type||"checkbox"==f[g].type)&&0==f[g].checked||f[g].disabled&&1==f[g].disabled&&0==c)){var h=f[g].name;if(h)if("<xjxquery><q>"!=e&&(e+="&"),"select-multiple"==f[g].type)for(var i=0;i<f[g].length;i++)1==f[g].options[i].selected&&(e+=h+"="+encodeURIComponent(f[g].options[i].value)+"&");else e+=h+"="+encodeURIComponent(f[g].value)}return e+="</q></xjxquery>"},this.objectToXML=function(a){var b="<xjxobj>";for(i in a)try{if("constructor"==i)continue;if(a[i]&&"function"==typeof a[i])continue;var c=i,d=a[i];d&&"object"==typeof d&&this.depth<=50&&(this.depth++,d=this.objectToXML(d),this.depth--),b+="<e><k>"+c+"</k><v>"+d+"</v></e>"}catch(a){xajaxDebug&&this.DebugMessage(a.name+": "+a.message)}return b+="</xjxobj>"},this._nodeToObject=function(a){if("#cdata-section"==a.nodeName){for(var b="",c=0;c<a.parentNode.childNodes.length;c++)b+=a.parentNode.childNodes[c].data;return b}if("xjxobj"==a.nodeName){for(var b=new Array,c=0;c<a.childNodes.length;c++){var e,f,d=a.childNodes[c];if("e"==d.nodeName){for(var g=0;g<d.childNodes.length;g++)"k"==d.childNodes[g].nodeName?e=d.childNodes[g].firstChild.data:"v"==d.childNodes[g].nodeName&&(f=this._nodeToObject(d.childNodes[g].firstChild));null!=e&&null!=f&&(b[e]=f,e=f=null)}}return b}},this.loadingFunction=function(){},this.doneLoadingFunction=function(){};var loadingTimeout;this.call=function(a,b,c){var d,e,f;if(document.body&&xajaxWaitCursor&&(document.body.style.cursor="wait"),1==xajaxStatusMessages&&(window.status="Sending Request..."),clearTimeout(loadingTimeout),loadingTimeout=setTimeout("xajax.loadingFunction();",400),xajaxDebug&&this.DebugMessage("Starting xajax..."),null==c)var g=xajaxDefinedPost;else var g=c;var i,h=xajaxRequestUri;switch(g){case xajaxDefinedGet:var j=h.indexOf("?")==-1?"?xajax="+encodeURIComponent(a):"&xajax="+encodeURIComponent(a);if(b)for(d=0;d<b.length;d++)i=b[d],"object"==typeof i&&(i=this.objectToXML(i)),j+="&xajaxargs[]="+encodeURIComponent(i);j+="&xajaxr="+(new Date).getTime(),h+=j,f=null;break;case xajaxDefinedPost:if(f="xajax="+encodeURIComponent(a),f+="&xajaxr="+(new Date).getTime(),b)for(d=0;d<b.length;d++)i=b[d],"object"==typeof i&&(i=this.objectToXML(i)),f=f+"&xajaxargs[]="+encodeURIComponent(i);break;default:return alert("Illegal request type: "+g),!1}if(e=this.getRequestObject(),!e)return!1;if(e.open(g==xajaxDefinedGet?"GET":"POST",h,!0),g==xajaxDefinedPost)try{e.setRequestHeader("Method","POST "+h+" HTTP/1.1"),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded")}catch(a){return alert("Your browser does not appear to  support asynchronous requests using POST."),!1}return e.onreadystatechange=function(){if(4==e.readyState){if(200==e.status)if(xajaxDebug&&xajax.DebugMessage("Received:\n"+e.responseText),e.responseXML&&e.responseXML.documentElement)xajax.processResponse(e.responseXML);else{var a="Error: the XML response that was returned from the server is invalid.";a+="\nReceived:\n"+e.responseText,trimmedResponseText=e.responseText.replace(/^\s+/g,""),trimmedResponseText=trimmedResponseText.replace(/\s+$/g,""),trimmedResponseText!=e.responseText&&(a+="\nYou have whitespace in your response."),alert(a),document.body.style.cursor="default",1==xajaxStatusMessages&&(window.status="Invalid XML response error")}else{if(xajax.responseErrorsForAlert.containsValue(e.status)){var a="Error: the server returned the following HTTP status: "+e.status;a+="\nReceived:\n"+e.responseText,alert(a)}document.body.style.cursor="default",1==xajaxStatusMessages&&(window.status="Invalid XML response error")}delete e,e=null}},xajaxDebug&&this.DebugMessage("Calling "+a+" uri="+h+" (post:"+f+")"),e.send(f),1==xajaxStatusMessages&&(window.status="Waiting for data..."),delete e,!0},this.getBrowserHTML=function(a){tmpXajax=this.$(this.workId),tmpXajax||(tmpXajax=document.createElement("div"),tmpXajax.setAttribute("id",this.workId),tmpXajax.style.display="none",tmpXajax.style.visibility="hidden",document.body.appendChild(tmpXajax)),tmpXajax.innerHTML=a;var b=tmpXajax.innerHTML;return tmpXajax.innerHTML="",b},this.willChange=function(element,attribute,newData){if(!document.body)return!0;if("innerHTML"==attribute&&(newData=this.getBrowserHTML(newData)),elementObject=this.$(element),elementObject){var oldData;if(eval("oldData=this.$('"+element+"')."+attribute),newData!==oldData)return!0}return!1},this.viewSource=function(){return"<html>"+document.getElementsByTagName("HTML")[0].innerHTML+"</html>"},this.processResponse=function(xml){clearTimeout(loadingTimeout),this.doneLoadingFunction(),1==xajaxStatusMessages&&(window.status="Processing...");var tmpXajax=null;if(xml=xml.documentElement,null!=xml){for(var skipCommands=0,i=0;i<xml.childNodes.length;i++)if(skipCommands>0)skipCommands--;else if("cmd"==xml.childNodes[i].nodeName){for(var cmd,id,property,data,search,type,before,objElement=null,j=0;j<xml.childNodes[i].attributes.length;j++)"n"==xml.childNodes[i].attributes[j].name?cmd=xml.childNodes[i].attributes[j].value:"t"==xml.childNodes[i].attributes[j].name?id=xml.childNodes[i].attributes[j].value:"p"==xml.childNodes[i].attributes[j].name?property=xml.childNodes[i].attributes[j].value:"c"==xml.childNodes[i].attributes[j].name&&(type=xml.childNodes[i].attributes[j].value);if(xml.childNodes[i].childNodes.length>1&&"#cdata-section"==xml.childNodes[i].firstChild.nodeName){data="";for(var j=0;j<xml.childNodes[i].childNodes.length;j++)data+=xml.childNodes[i].childNodes[j].data}else if(xml.childNodes[i].firstChild&&"xjxobj"==xml.childNodes[i].firstChild.nodeName)data=this._nodeToObject(xml.childNodes[i].firstChild),objElement="XJX_SKIP";else if(xml.childNodes[i].childNodes.length>1)for(var j=0;j<xml.childNodes[i].childNodes.length;j++){if(xml.childNodes[i].childNodes[j].childNodes.length>1&&"#cdata-section"==xml.childNodes[i].childNodes[j].firstChild.nodeName)for(var internalData="",k=0;k<xml.childNodes[i].childNodes[j].childNodes.length;k++)internalData+=xml.childNodes[i].childNodes[j].childNodes[k].nodeValue;else var internalData=xml.childNodes[i].childNodes[j].firstChild.nodeValue;"s"==xml.childNodes[i].childNodes[j].nodeName&&(search=internalData),"r"==xml.childNodes[i].childNodes[j].nodeName&&(data=internalData)}else data=xml.childNodes[i].firstChild?xml.childNodes[i].firstChild.nodeValue:"";"XJX_SKIP"!=objElement&&(objElement=this.$(id));var cmdFullname;try{if("cc"==cmd){cmdFullname="addConfirmCommands";var confirmResult=confirm(data);confirmResult||(skipCommands=id)}if("al"==cmd)cmdFullname="addAlert",alert(data);else if("js"==cmd)cmdFullname="addScript/addRedirect",eval(data);else if("jc"==cmd){cmdFullname="addScriptCall";var scr=id+"(";if(null!=data[0]){scr+="data[0]";for(var l=1;l<data.length;l++)scr+=",data["+l+"]"}scr+=");",eval(scr)}else"in"==cmd?(cmdFullname="addIncludeScript",this.include(data)):"as"==cmd?(cmdFullname="addAssign/addClear",this.willChange(id,property,data)&&eval("objElement."+property+"=data;")):"ap"==cmd?(cmdFullname="addAppend",eval("objElement."+property+"+=data;")):"pp"==cmd?(cmdFullname="addPrepend",eval("objElement."+property+"=data+objElement."+property)):"rp"==cmd?(cmdFullname="addReplace",this.replace(id,property,search,data)):"rm"==cmd?(cmdFullname="addRemove",this.remove(id)):"ce"==cmd?(cmdFullname="addCreate",this.create(id,data,property)):"ie"==cmd?(cmdFullname="addInsert",this.insert(id,data,property)):"ia"==cmd?(cmdFullname="addInsertAfter",this.insertAfter(id,data,property)):"ci"==cmd?(cmdFullname="addCreateInput",this.createInput(id,type,data,property)):"ii"==cmd?(cmdFullname="addInsertInput",this.insertInput(id,type,data,property)):"iia"==cmd?(cmdFullname="addInsertInputAfter",this.insertInputAfter(id,type,data,property)):"ev"==cmd?(cmdFullname="addEvent",property=this.addOnPrefix(property),eval("this.$('"+id+"')."+property+"= function(){"+data+";}")):"ah"==cmd?(cmdFullname="addHandler",this.addHandler(id,property,data)):"rh"==cmd&&(cmdFullname="addRemoveHandler",this.removeHandler(id,property,data))}catch(a){xajaxDebug&&alert("While trying to '"+cmdFullname+"' (command number "+i+"), the following error occured:\n"+a.name+": "+a.message+"\n"+(id&&!objElement?"Object with id='"+id+"' wasn't found.\n":""))}delete objElement,delete cmd,delete cmdFullname,delete id,delete property,delete search,delete data,delete type,delete before,delete internalData,delete j,delete k}delete xml,delete i,document.body.style.cursor="default",1==xajaxStatusMessages&&(window.status="Done")}}}Array.prototype.containsValue=function(a){for(var b=0;b<this.length;b++)if(this[b]==a)return!0;return!1};var xajax=new Xajax;xajaxLoaded=!0;