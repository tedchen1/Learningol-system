﻿/*!
 * 主  题：《页面弹出窗口》
 * 说  明：用于子页面弹出时的窗口。
 * 功能描述：
 * 1、生成弹出窗口，窗口内包括iframe控件，用于加载实际控制页面；
 * 2、窗口弹出时，生成背景遮罩；
 * 3、窗口最小为宽高100，小于等于100时，宽高值默认为浏览器窗口的百分比；
 *
 *
 * 作  者：宋雷鸣 
 * 开发时间: 2012年12月28日
 */
//窗体Jquery对象
PageBox.prototype.WinBox=null;
//是否允许拖动
PageBox.prototype.IsDrag=true;
//弹出窗口的主类
//title:窗口标题
//page:打开的页面
//width:窗口宽度
//height:窗口高度
//widId:窗口id
function PageBox(title,page,width,height,winId)
{
	this.Init(title,page,width,height,winId);
}
//初始化参数
PageBox.prototype.Init=function(title,page,width,height,winId)
{
	//屏幕的宽高
	var hg=document.documentElement.clientHeight;
	var wd =document.documentElement.clientWidth;	
	title= title!=null && title!="" ? title : "newWinBox";		
	//如果为空，则为浏览器窗口一半宽高
	width= width!=null && width!=0 && width!="" ? Number(width) : wd/2;	
	height= height!=null &&height!=0 && height!="" ? Number(height) : hg/2;
	//如果宽高小于100，则默认为浏览器窗口的百分比	
	width= width>100 ? Number(width) : $("body").width()* Number(width)/100;	
	height= height>100 ? Number(height) : hg * Number(height)/100;	
	//alert(winId);
	if(winId==null)
	{
		winId=new Date().ToString()+"_"+Math.floor(Math.random()*1000+1); 　		
	}
	//
	this.Title=title;
	this.Width=width;
	this.Height=height;
	this.Page=page;	
	this.WinId=winId;
}
//创建窗口，并打开
PageBox.prototype.Open=function(title,page,width,height,winId)
{
	//判断是否已经存在窗口
	var WinBox=$("#PageBox[winId='"+this.WinId+"']");
	if(WinBox.size()>0)return;
	this.Close();
	//生成窗口
	this.Mask();	
	this.BuildFrame();
	this.BuildTitle();
	this.BuildIFrame();
		
	//设置拖动
	if(this.IsDrag){
		$("#PageBox").easydrag();
		$("#PageBox").setHandler("PageBoxTitle");
	}
	//开始拖动
	$("#PageBox").ondrag(function()
	  {
		  $("#PageBoxIframeMask").show();		  
		  var frame=$("#PageBoxIframeTemp");
		  if(frame.size()>0)
		  {
			  frame.hide();
		  }
	  });
	//停止拖动
	$("#PageBox").ondrop(function()
	  {
		  $("#PageBoxIframeMask").hide();
		  var frame=$("#PageBoxIframeTemp");
		  if(frame.size()>0)
		  {
			  var PageBox=$("#PageBox");
			  var offset = PageBox.offset();
			  frame.css("top",offset.top);
			  frame.css("left",offset.left);
			  frame.show();
		  }
	  });
	//完成后触发事件
	this.OnComplete();
}
//生成窗体外框
PageBox.prototype.BuildFrame=function()
{
	//屏幕的宽高
	var hg=document.documentElement.clientHeight;
	var wd =document.documentElement.clientWidth;	
	//判断浏览器
	var bro=$.browser; 
	if(bro.msie) {
		if(bro.version=="6.0")
		{
			//为了解决ie6的bug(下拉框会出现在最上层的问题）
			var iframe="<iframe id=\"PageBoxIframeTemp\" src=\"/manage/panel/loading.htm\" ></iframe> ";
			$("body").append(iframe);
			var frame=$("#PageBoxIframeTemp");
			//设置窗口的位置
			frame.css("top",(hg-this.Height)/2);
			frame.css("left",(wd-this.Width)/2);	
			frame.css("position","absolute");
			frame.css("z-index","20000");
			frame.css("width",this.Width);
			frame.css("height",this.Height);
		}
	} 
	
	//
	$("body").append("<div id=\"PageBox\" type=\"PageBox\" winId=\""+this.WinId+"\"></div>");
	var PageBox=$("#PageBox");
	this.WinBox=PageBox;			
	//设置窗口的位置
	PageBox.css("top",(hg-this.Height)/2);
	PageBox.css("left",(wd-this.Width)/2);	
	PageBox.css("position","absolute");
	PageBox.css("z-index","10001");
	PageBox.css("width",this.Width-8);
	PageBox.css("height",this.Height-8);
}
//生成标题栏
PageBox.prototype.BuildTitle=function()
{
	var box=this.WinBox;
	box.append("<div id=\"PageBoxTitle\"></div>");
	var titbox=$("#PageBoxTitle");
	var tm="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    tm+="<tr>";
	//tm+="<td width=\"25\" >&nbsp;</td>"
	tm+="<td ><div id=\"PageBoxTitleTxt\">"+this.Title+"</div></td>";
	tm+="<td width=\"15\" align=\"center\">";
	tm+="<a id=\"PageBoxTitleClose\" href=\"#\"> </a></td>";
	tm+="</tr></table>"
	titbox.append(tm);
	//关闭按钮
	$("#PageBoxTitleClose").click(
			function()
			{
				var t=new PageBox();
				t.Close();
				return false;
			}
	)	
}
//生成页面frame区域
PageBox.prototype.BuildIFrame=function()
{
	var box=this.WinBox;
	var width=box.width();
	//标题栏的高度
	var titHg=$("#PageBoxTitle").height();
	var height=box.height()-titHg;
	var frame="";
	frame+="<iframe src=\""+this.Page+"\" name=\"PageBoxIframe\" id=\"PageBoxIframe\" ";
	frame+="width=\""+width+"\"";
	frame+="height=\""+height+"\"";
	frame+="marginwidth=\"0\"  marginheight=\"0\" align=\"top\" scrolling=\"auto\"";
	//frame+="frameborder=\"0\" allowtransparency=\"false\">";
	frame+="frameborder=\"0\" >";
	frame+="</iframe>";	
	box.append(frame);
	//生成iframe上面的覆盖	
	box.append("<div id=\"PageBoxIframeMask\"></div>");
	var mask=$("#PageBoxIframeMask");
	mask.width(box.width());
	mask.height(height);
	mask.css({
		position: "absolute",		
		left: "0px",
		top: $("#PageBoxTitle").height()
	});
	var alpha=60;
	mask.css("background-color","#ffffff");
	mask.css("filter","Alpha(Opacity="+alpha+")");
	mask.css("display","block");
	mask.css("-moz-opacity",alpha/100);
	mask.css("opacity",alpha/100);
	mask.fadeIn("slow");
	mask.hide();
}
//关闭窗口
PageBox.prototype.Close=function(winId)
{	//清除窗口
	if(winId==null){
		$("#PageBox").remove();
		$("#screenMask").fadeOut(200); 
		//判断浏览器
		var bro=$.browser; 
		if(bro.msie) {
			if(bro.version=="6.0")
			{
				$("#PageBoxIframeTemp").remove();
			}
		}
	}else
	{
		var WinBox=$("#PageBox[winId='"+winId+"']");
		if(WinBox.size()>0)
		{
			WinBox.remove();
			$("#screenMask").fadeOut("slow"); 
		}
	}
}
//隐藏关闭按钮
PageBox.prototype.HideClose=function()
{
	$("#PageBoxTitleClose").hide();
}
//关闭窗口并刷新当前打开的页面
PageBox.prototype.CloseAndRefresh=function()
{	//清除窗口
	this.Close();
	//管理页
	var frame=$("#adminPage");
	var url=document.getElementById("adminPage").contentWindow.location.href;
	frame.attr("src",url);	
}
//生成遮罩层
PageBox.prototype.Mask=function()
{	
	var mask=$("#screenMask");
	mask.remove();
	mask=null
	delete mask;
	var html="<div id=\"screenMask\"/>";
	$("body").append(html);
	mask=$("#screenMask");
	mask.css("position","absolute");
	mask.css("z-index","10000");
	//屏幕的宽高
	var hg=document.documentElement.clientHeight;
	var wd =document.documentElement.clientWidth;	
	//设置遮罩的宽高
	mask.css("width",wd);
	mask.css("height",hg);	
	mask.css("top",0);
	mask.css("left",0);
	var alpha=60;
	mask.css("background-color","#999999");
	mask.css("filter","Alpha(Opacity="+alpha+")");
	mask.css("display","block");
	mask.css("-moz-opacity",alpha/100);
	mask.css("opacity",alpha/100);
	mask.fadeIn("slow");
}
//当浏览器窗口变化时
PageBox.prototype.OnReSize=function()
{	
	var box=$("#PageBox");
	if(box.size()<1)return;	
	//重新设置遮罩
	this.Mask();
	//屏幕的宽高
	var hg=document.documentElement.clientHeight;
	var wd =document.documentElement.clientWidth;		
	//设置窗口的位置
	box.css("top",(hg-box.height())/2);
	box.css("left",(wd-box.width())/2);	
	//判断浏览器
	var bro=$.browser; 
	if(bro.msie) {
		if(bro.version=="6.0")
		{
			//为了解决ie6的bug(下拉框会出现在最上层的问题）
			var frame=$("#PageBoxIframeTemp");
			//设置窗口的位置
			frame.css("top",(hg-box.height())/2);
			frame.css("left",(wd-box.width())/2);	
			frame.css("width",box.width());
			frame.css("height",box.height());
		}
	} 
}
//当完成后，触发事件
PageBox.prototype.OnComplete=function()
{
	var num=50;
	var p=$("#PageBox");
	//谈入效果
	p.hide();
	p.fadeIn();
}