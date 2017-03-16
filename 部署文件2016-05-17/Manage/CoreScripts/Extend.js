//两端去空格函数
String.prototype.trim = function() {    return this.replace(/(^\s*)|(\s*$)/g,""); }
// 记录cookie
jQuery.fn.cookie = function(name, value, options) { 
    if (typeof value != 'undefined') { // name and value given, set cookie 
        options = options || {}; 
        if (value === null) { 
            value = ''; 
            options.expires = -1; 
        } 
        var expires = ''; 
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) { 
            var date; 
            if (typeof options.expires == 'number') { 
                date = new Date(); 
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000)); 
            } else { 
                date = options.expires; 
            } 
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE 
        } 
        var path = options.path ? '; path=' + options.path : ''; 
        var domain = options.domain ? '; domain=' + options.domain : ''; 
        var secure = options.secure ? '; secure' : ''; 
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join(''); 
    } else { // only name given, get cookie 
        var cookieValue = null; 
        if (document.cookie && document.cookie != '') { 
            var cookies = document.cookie.split(';'); 
            for (var i = 0; i < cookies.length; i++) { 
                var cookie = jQuery.trim(cookies[i]); 
                // Does this cookie string begin with the name we want? 
                if (cookie.substring(0, name.length + 1) == (name + '=')) { 
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1)); 
                    break; 
                } 
            } 
        } 
        return cookieValue; 
    } 
};
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
		$().cookie(name,value, options);
	}else
	{
		return $().cookie(name);
	}
}
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
	return "-1";
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