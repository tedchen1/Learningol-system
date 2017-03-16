// 记录cookie
/*!
* jQuery Cookie Plugin v1.4.1
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2013 Klaus Hartl
* Released under the MIT license
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
} (function ($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function (key, value, options) {
        // Write
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
        }
        // Read
        var result = key ? undefined : {};
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }
            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };
}));

//记录页面级cookie
jQuery.fn.pagecookie = function(name, value, options) {
	//标页面的名称，不含后缀名
	var url=String(window.document.location.href);
	var pos = url.lastIndexOf("/");
	if(pos == -1){
	 pos = url.lastIndexOf("\\")
	}
	var filename = url.substr(pos +1);
	filename = filename.substr(0,filename.indexOf("."))
	//页面级cookie名称
	name="("+filename+")"+name;	
	if (typeof value != 'undefined')
	{
		$.cookie(name,value, options);
	}else
	{
		return $.cookie(name);
	}
}
//两端去空格函数
String.prototype.trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); }
//打开模式窗口
jQuery.fn.ModalWindow=function(page,width,height)
{
    //屏幕宽高
    var winWidth=window.screen.width;
    var winHeight=window.screen.height;
	//如果为空，则为浏览器窗口一半宽高
	width= width!=null && width!=0 && width!="" ? Number(width) : winWidth/2;	
	height= height!=null &&height!=0 && height!="" ? Number(height) : winHeight/2;
	//如果宽高小于100，则默认为浏览器窗口的百分比
	width= width>100 ? Number(width) : winWidth* Number(width)/100;	
	height= height>100 ? Number(height) : winHeight * Number(height)/100;
    //窗口位置，使其显示在屏幕中央
    var left=(winWidth-width)/2;
    var top=(winHeight-height)/2;
	var arr = showModalDialog(page, "", "dialogWidth:"+width+"px; dialogHeight:"+height+"px; dialogTop="+top+"; dialogLeft="+left+";status:0;scroll:0;help:0");
  	var url=window.location.href; 	
	if(arr=="refresh")window.location.href=url;
}
//获取当前鼠标坐标
jQuery.fn.Mouse=function(e){
        var x = 0, y = 0;
        var e = e || window.event;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else if (e.clientX || e.clientY) {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
        }
        return { 'x': x, 'y': y };
};
//判断鼠标是否处于某元素之个
//element:页面元素，jquery对象
//return:返回bool值，如果处在元素之前返回true,否则返回false;
jQuery.fn.isMouseArea=function(element,e){
	if(element.length<1)return false;	
    var mouse=$().Mouse(e);
	var tmp=false;
	element.each(
		function()
		{
			var offset = $(this).offset();
			var pxx= mouse.x>offset.left && mouse.x<(offset.left+$(this).width());
			var pyy= mouse.y>offset.top && mouse.y<(offset.top+$(this).height());
			tmp=pxx && pyy;
			if(tmp)return false;
		}
	);	
	return tmp;
};
//获取文件大小，带单位，如kb,mb；
//参数：size文件字节数
jQuery.fn.getSizeUnit=function(fileSize)
{
	var size=Number(fileSize);
	if(size==null)return;
	var name=new Array("B","Kb","Mb");
	var tm=0;
	while(size>=1024)
	{
		size/=1024;
		tm++;
	}
	size=Math.round(size*100)/100;
	return size+" "+name[tm];
}
//加入收藏
jQuery.fn.addFav=function(title)
{
	var url=window.location.href;
   if (document.all)
   {
	  window.external.addFavorite(url,title);
	  return true;
   }
   else if (window.sidebar)
   {
	  window.sidebar.addPanel(title,url, "");
	  return true;
   }
   //未成功
   return false;
}
//获取QueryString参数
jQuery.fn.getPara=function(para)
{
	var LocString=String(window.document.location.href);
	var rs=new RegExp("(^|)"+para+"=([^\&]*)(\&|$)","gi").exec(LocString),tmp;
	if(tmp=rs)return tmp[2];
	return "";
}
//获取文件名
jQuery.fn.getFileName=function()
{
	var url=String(window.document.location.href);
	var pos = url.lastIndexOf("/");
	if(pos == -1){
	 pos = url.lastIndexOf("\\")
	}
	var filename = url.substr(pos +1);
	filename = filename.substr(0,filename.indexOf("."))
	return filename;
}
//格式化日期
Date.prototype.ToString=function()
{
	var year=this.getFullYear();
	var month=this.getMonth()+1;
	var date=this.getDate();
	//
	var hour=this.getHours();
	var minu=this.getMinutes();
	var sec=this.getSeconds();
	//
	var str=year+"/"+month+"/"+date +" "+hour+":"+minu+":"+sec;
	return str;
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 对Date的扩展，将 Date 转化为指定格式的String    
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，    
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)    
// 例子：    
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423    
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18    
Date.prototype.Format = function(fmt)   
{ //author: meizz    
  var o = {   
    "M+" : this.getMonth()+1,                 //月份    
    "d+" : this.getDate(),                    //日    
    "h+" : this.getHours(),                   //小时    
    "m+" : this.getMinutes(),                 //分    
    "s+" : this.getSeconds(),                 //秒    
    "q+" : Math.floor((this.getMonth()+3)/3), //季度    
    "S"  : this.getMilliseconds()             //毫秒    
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 
//获取信息
//service:webservice请求页
//sfunc:webservice服务中的方法
//para:参数
//successFunc:调取成功后的方法
jQuery.fn.SoapAjax=function(service,sfunc,para,successFunc,loadfunc,unloadfunc,errfunc)
{	
	var urlPath="/manage/soap/"+service+".asmx/"+sfunc;
	$.ajax({
			  type: "POST",
			  url: urlPath,
			  dataType: "xml",
			  data:para,
			  //开始，进行预载
			  beforeSend: function(XMLHttpRequest, textStatus){	
			  		if(loadfunc!=null)loadfunc(XMLHttpRequest, textStatus);
				},
				//加载出错
			 error: function(XMLHttpRequest, textStatus, errorThrown){
			        if(errfunc!=null)errfunc(XMLHttpRequest, textStatus, errorThrown);
			 		if(unloadfunc!=null)unloadfunc();
				},
				//加载成功！
			  success: function(data) {				  	
				if(successFunc!=null)successFunc($(data)); 
				if(unloadfunc!=null)unloadfunc();
			  }
		  }); 	
}