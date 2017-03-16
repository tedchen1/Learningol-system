$(function(){
    _initInfo();
    //设置时间
    getDateTime();
});

//当窗口大小变化时
$(window).resize(function(){
		window.winWidth=typeof(window.winWidth)=="undefined"  ?  $(window).width() : window.winWidth;
		window.winHeight=typeof(window.winHeight)=="undefined"  ?  $(window).height() : window.winHeight;
		//登录窗口的层
		var loyout=$("#loginLoyout");
		//屏幕的宽高
		var hg=document.documentElement.clientHeight;
		var wd =document.documentElement.clientWidth;	
		//设置遮罩的宽高
		loyout.css("width",wd);
		loyout.css("height",hg);
		//中间的区域
		var area=$("#loginArea");
		area.css("margin-top",(window.winHeight-area.height())/2);
});
//初始化信息
function _initInfo(){
    $("a.studentLogin").click(function () {
        //OpenLoginBox();
        //return false;
    });
	$("#loginClose").click(function(){
	    CloseLoginBox();

	});
}
//设置时间，该时间来自于服务端
function getDateTime(){
    var urlPath="/json/now.aspx?timestamp=" + new Date().getTime();
    $.ajax({type: "Get", url: urlPath, dataType: "text",
        error: function(XMLHttpRequest, textStatus, errorThrown){
            window.ServerTime=new Date();
        },success: function(obj){
            window.ClientTime=new Date();
            window.ServerTime=new Date(obj);
            setDateTime();
        }
    });
}
window.ClientTime=new Date();
window.ServerTime=new Date();
//设置时间时间
function setDateTime() {
    //计算客户端实时时间
    var tm=new Date();
    var span=tm.getTime()-window.ClientTime.getTime();
    var t=new Date(window.ServerTime.getTime()+span);
    $("#week").html("星期"+"日一二三四五六".charAt(t.getDay()));
    //日期
    $("#yeerday").html(t.getFullYear()+"年"+(t.getMonth()+1)+"月"+t.getDate()+"日");
    //时间
    var mit=t.getMinutes();
    if(mit<10)mit="0"+mit;
    $("#time").html(t.getHours()+":"+ mit);
}


//关闭登录窗口
function CloseLoginBox(){
	$("#loginLoyout").fadeOut(500);
}
//打开登录窗口
function OpenLoginBox(){
	//登录窗口的层
	var loyout=$("#loginLoyout");
    var src=loyout.find("iframe").attr("path");
    if (src.indexOf("?") > -1) {
        src += "&timestamp=" + new Date().getTime();
    } else {
        src += "?timestamp=" + new Date().getTime();
    }
    loyout.find("iframe").attr("src",src);
	//屏幕的宽高
	var hg=document.documentElement.clientHeight;
	var wd =document.documentElement.clientWidth;	
	//设置遮罩的宽高
	loyout.css("width",wd).css("height",hg).css("top",0).css("left",0);
	//中间的区域
	var area=$("#loginArea");
	area.css("margin-top",(hg-area.height())/3);
	var alpha=95;
	//loyout.css("background-color","#999999");
	loyout.css("filter","Alpha(opacity=100,finishopacity=80,style=2)");
	loyout.css({"display":"block","-moz-opacity":alpha/100});
	loyout.css("opacity",alpha/100);
	loyout.fadeIn("slow");
}


//当窗体失去焦点
$(window).blur(function () {
    window.cookieInterval = false;
});
$(window).focus(function () {
    window.cookieInterval = true;
});
$(window).load(function () {
    window.cookieInterval = true;
    setInterval("_loadOrfocusEvent()", 1000);
    _loadOrfocusEvent();
});
function _loadOrfocusEvent() {
    /*var box = $("#stOnlineNumBox");
    if (box.size() < 1) {
        $("body").children(":first").before("<div id='stOnlineNumBox'/>");
        box = $("#stOnlineNumBox");
    }*/
    //计数
    if (window.cookieInterval) {
        var num = $().cookie('stOnlineNumx');
        if (num == null || num == 'null') num = 1;
        num = Number(num) + 1;
        num = num >= Number.MAX_VALUE ? 0 : num;
        $().cookie('stOnlineNumx', num, { expires: 7, path: '/' });
        //box.html(num);
        //ajax提交在线时间
        var interval = 60;
        if (Number(num) % interval == 0) {
            $.get("/Ajax/StudentOnline.ashx?interval=" + interval);
        }
    }
}