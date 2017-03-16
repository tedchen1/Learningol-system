//弹出提示类消息
window.Prompt=function(msg,width,height){
    var show=new Message(msg,"prompt",width,height);
    show.Title="信息提示";
    show.Show();
}
//弹出提示类消息
window.Alert=function(msg,width,height){
    var show=new Message(msg,"alert",width,height);
    show.Title="警告！";
    show.Show();
};
//弹出警告类消息
window.Warning=function(msg,width,height){
    var show=new Message(msg,"warning",width,height);
    show.Title="应用程序错误！";
    show.Show();
}
//弹出授权相关信息
window.License=function(msg,width,height){
    var show=new Message(msg,"license",width,height);
    show.Title="软件授权";
    show.Show();
}

//说明：用于弹出消息提示
//msg:要显示的消息
//type:消息类型
//width:弹出消息窗体的宽度
//height:弹出消息窗体的高度
function Message(msg,type,width,height){
    this.Msg=msg;
    this.Width= (width && typeof(width)!="undefined" && width!=0) ? width:this.Width ;
    this.Height=(height && typeof(height)!="undefined" && height!=0) ? height:this.Height;
    this.Type=(type && typeof(type)!="undefined") ? type:this.Type;
}
//要发布的消息内容
Message.prototype.Msg="";
//宽高
Message.prototype.Width=400;
Message.prototype.Height=200;
//弹出消息的类型
Message.prototype.Type="alert";
//消息主题
Message.prototype.Title="";
//以下是Message对象的方法
//弹出消息
Message.prototype.Show=function(){
    var box=$("#MessageBox");
    if(box.size()>0)box.remove();
    $("body").append("<div id=\"MessageBox\"/>");
    box=$("#MessageBox");
    //屏幕的宽高
    var hg=document.documentElement.clientHeight;
    var wd =document.documentElement.clientWidth;
    //设置窗口的位置
    box.css({"position":"absolute","z-index":"40001","border":"1px solid #999999",
        "background-color":"#fff","width":this.Width,"height":this.Height,
        top:(hg-this.Height)/2,left:(wd-this.Width)/2,"cursor":"default"});
    //生成窗口
    this.Mask();
    //生成标题
    box.append("<div id=\"MessageBoxTitle\"></div>");
    var titbox=$("#MessageBoxTitle");
    titbox.append("<div id=\"MessageBoxTitleTxt\">"+this.Title+"</div>");
    titbox.append("<div id=\"MessageBoxTitleClose\" class='MessageClose'><img src=\"images/winClose.gif\"/></div>");
    titbox.css({"border-bottom-width": "1px","border-top-style": "none","border-right-style": "none",
        "border-bottom-style": "solid","border-left-style": "none","border-bottom-color": "#999999",
        "line-height": "25px","height": "25px"});
    if(this.Type=="prompt")titbox.css({"background-color":"#3399FF"});
    if(this.Type=="alert")titbox.css({"background-color":"#FF9900"});
    if(this.Type=="warning")titbox.css({"background-color":"#FF0000"});
    if(this.Type=="license")titbox.css({"background-color":"#666666"});
    $("#MessageBoxTitleTxt").css({"width":this.Width-22,"float":"left","text-indent":"10px"});
    $("#MessageBoxTitleClose").css({"height":"16px","width":"16px","margin-top":"4px","margin-right":"4px","float":"right","cursor":"pointer"});
    //生成内容区
    box.append("<div id=\"MessageBoxContext\"></div>");
    var context=$("#MessageBoxContext");
    context.css({"height":this.Height-titbox.height()-30-20,"margin":"10px","margin-down":"0px","color":"#333","cursor":"default"});
    context.html(this.Msg);
    //生成按钮区
    box.append("<div id=\"MessageBoxFoot\"></div>");
    var foot=$("#MessageBoxFoot");
    foot.css({"height":30,"cursor":"default"});
    foot.append("<div id=\"MessageBoxFootBtn\" class='MessageClose'>关闭</div>");
    $("#MessageBoxFootBtn").css({"border":"1px solid #999999","background-color":"#eee","width":80,"height":24,
        "margin-right":"4px","float":"right","line-height":"25px","text-align":"center","cursor":"pointer","color":"#333"});
    //设置拖动
    $("#MessageBox").easydrag();
    $("#MessageBox").setHandler("MessageBoxTitle");
    this.CreateEvent();
}
//创建消息中的事件，主要是关闭按钮
Message.prototype.CreateEvent=function(){
    $(".MessageClose").click(function(){
        $("div[id^=Message]").remove();
    });
}
//生成遮罩层
Message.prototype.Mask=function(){
    var mask=$("#MessageMask");
    if(mask.size()>0)mask.remove();
    $("body").append("<div id=\"MessageMask\"/>");
    mask=$("#MessageMask");
    //屏幕的宽高
    var hg=document.documentElement.clientHeight;
    var wd =document.documentElement.clientWidth;
    mask.css({"position":"absolute","z-index":"40000",
        "width":wd,"height":hg,top:0,left:0});
    var alpha=60;
    mask.css({"background-color":"#fff","filter":"Alpha(Opacity="+alpha+")",
        "display":"block","-moz-opacity":alpha/100,"opacity":alpha/100});
    mask.fadeIn("slow");
}

