/*!
 * 主  题：《页面弹出窗口手机版》
 * 说  明：用于子页面弹出时的窗口。
 * 功能描述：
 * 1、生成弹出窗口，窗口内包括iframe控件，用于加载实际控制页面；
 * 2、窗口弹出时，生成背景遮罩；
 * 3、窗口最小为宽高100，小于等于100时，宽高值默认为浏览器窗口的百分比；
 *
 *
 * 作  者：宋雷鸣
 * 开发时间: 2015年9月11日
 */
//窗体Jquery对象
PageBox.prototype.WinBox=null;
//是否允许拖动
PageBox.prototype.IsDrag=true;
//弹出窗口的主类
//title:窗口标题
//info:要展示的信息，如果type为内嵌页页
//width:窗口宽度
//height:窗口高度
//type:窗口类型，url为Iframe窗口（内嵌页面）,text为文本,obj为元素对象，默认为url
function PageBox(title,info,width,height,type)
{
    this.Init(title,info,width,height,type);
}
//初始化参数
PageBox.prototype.Init=function(title,info,width,height,type)
{
    this.Title= title!=null && title!="" ? title : "";
    this.Info= info;
    //如果为空，则为浏览器窗口一半宽高
    this.Width= !isNaN(Number(width)) ? Number(width) : $(window).width();
    this.Height= !isNaN(Number(height)) ? Number(height) : $(window).height();
    //如果宽高小于100，则默认为浏览器窗口的百分比
    this.Width= this.Width>100 ? this.Width : $(window).width()* this.Width/100;
    this.Height= this.Height>100 ? this.Height : $(window).height() * this.Height/100;
    this.WinId=new Date().getTime()+"_"+Math.floor(Math.random()*1000+1) ;
    this.Type=type==null ? "url" : type;
}
//创建窗口，并打开
PageBox.prototype.Open=function()
{
    //判断是否已经存在窗口
    var WinBox=$("#PageBox[winId='"+this.WinId+"']");
    if(WinBox.size()>0)return;
    PageBox.Close();
    //生成窗口
    this.Mask();
    this.BuildFrame();
    this.BuildIFrame();
}
//生成窗体外框,包括标题
PageBox.prototype.BuildFrame=function()
{
    //屏幕的宽高
    var hg=document.documentElement.clientHeight;
    var wd =document.documentElement.clientWidth;
    $("body").append("<div id=\"PageBox\" type=\"PageBox\" winId=\""+this.WinId+"\"></div>");
    var PageBox=$("#PageBox");
    this.WinBox=PageBox;
    //设置窗口的位置
    PageBox.css("top",(hg-this.Height)/2+ $(window).scrollTop());
    PageBox.css("left",(wd-this.Width)/2);
    PageBox.css("position","absolute").css("z-index","10001");
    PageBox.css("width",this.Width-20);
    PageBox.css("height",this.Height-20);
    this.BuildTitle();
}
//生成标题栏
PageBox.prototype.BuildTitle=function(){
    var box=this.WinBox;
    box.append("<div id=\"PageBoxTitle\">" + this.Title + "<div id=\"btnPageBoxClose\">&#xe63d;</div></div>");
    $("#btnPageBoxClose").click(function () {
       PageBox.Close();
   });
    box.append("<div id=\"PageBoxContext\"></div>");
    var box=this.WinBox.find("#PageBoxContext");
    box.width(this.WinBox.width());
    box.height(this.WinBox.height()-$("#PageBoxTitle").height());
}
//生成页面frame区域
PageBox.prototype.BuildIFrame=function()
{
    var box=this.WinBox.find("#PageBoxContext");
    var width=this.WinBox.width();
    //标题栏的高度
    var titHg=$("#PageBoxTitle").height();
    var height=this.WinBox.height()-titHg;
    if(this.Type=="url") {
        var frame = "";
        frame += "<iframe src=\"" + this.Info + "\" name=\"PageBoxIframe\" id=\"PageBoxIframe\" ";
        frame += "width=\"" + width + "\"";
        frame += "height=\"" + height + "\"";
        frame += "marginwidth=\"0\"  marginheight=\"0\" align=\"top\" scrolling=\"auto\"";
        //frame+="frameborder=\"0\" allowtransparency=\"false\">";
        frame += "frameborder=\"0\" >";
        frame += "</iframe>";
        box.append(frame);
    }
    if(this.Type=="text") {
        box.append(this.Info);
    }
    if(this.Type=="obj") {
        if(this.Info.size()>0)
            box.html(this.Info.html());
    }
}
//关闭窗口
PageBox.Close=function()
{
    $("#screenMask").hide();
    $("#PageBox").remove();
}
//生成遮罩层
PageBox.prototype.Mask=function()
{
    var mask=$("#screenMask");
    if(mask.size()<1) {
        $("body").append("<div id='screenMask'/>");
        mask=$("#screenMask");
    }
    var hg=$("body").height();
    var wd =document.documentElement.clientWidth;
    mask.width(wd).height(hg);
    mask.css({"position":"absolute","z-index":"10000"});
    mask.css({left:0,top:0});
    var alpha=60;
    mask.css("background-color","#ffffff");
    mask.css("filter","Alpha(Opacity="+alpha+")");
    mask.css("display","block");
    mask.css("-moz-opacity",alpha/100);
    mask.css("opacity",alpha/100);
    mask.show();
}

