
$(function(){
    _initInfo();
    _btnMoreEvent();
});

//更多按钮的事件
function _btnMoreEvent() {
    $("#moreBox").height($("#moreBox>div").size()*35+15);
    $("#moreBox>div:odd").addClass("row1");
    $("#moreBox>div:even").addClass("row2");
    //分享
    $("#btnShare").click(function(){
        //屏幕的宽高
        var hg=$("body").height();
        var wd =document.documentElement.clientWidth;
        var mask=$("#shareBoxMask");
        mask.width(wd).height(hg);
        mask.css({left:0,top:0});
        mask.show();
        //
        var box=$("#shareBox");
        box.css("z-index",30);
        box.css({left:(wd-box.width())/2,top:(hg-box.height())/2});
        box.fadeIn();
        //
        $("#moreBox:visible").hide();
    });
    //设置右上方菜单高度
    var menuBoxItem=$("#menuBox .menuBoxItem");
    $("#menuBox").height(menuBoxItem.height()*menuBoxItem.size()+menuBoxItem.size());
    $("#shareBoxMask").click(function(){
        $("#shareBox").fadeOut();
        $("#shareBoxMask").fadeOut();
    });
    //刷新
    $("#btnRrefesh").click(function(){
        var href=window.location.href;
        window.location.href=href;
    });
    //关于
    $("#btnMsg").click(function(){
        new PageBox("意见反馈","Message.ashx",80,60,null).Open();
    });
    //意见反馈
    $("#btnAbout").click(function(){
        new PageBox("关于我们","about.ashx",80,60,null).Open();
    });
    //关闭窗口
    $("#btnClose").click(function(){
        api.closeWin();
        window.closeWin();
        try {
            api.closeWin();
        }catch(e){
            var show="确定退出系统吗？";
            var msg=new MsgBox("退出",show,90,40,"confirm");
            msg.EnterEvent=function(){
                closeWindows();
            };
            msg.Open();
        }
    });
}

//初始化
function _initInfo() {
    //标题
    $("#header .text").text($("title").text());
    $("#header .btnBack").click(function(){
        var backurl=$("body").attr("backurl");
        if(backurl && backurl!=null && backurl!="")
        {
            window.location.href=backurl;
        }else {
            history.go(-1);
        }
    });
    $("#btnMenu").click(function(){
        $("#moreBox:visible").fadeOut();
        var tm=$("#menuBox:visible");
        if(tm.size()>0) {
            tm.fadeOut();
            return false;
        }
        var box=$("#menuBox");
        var offset=$(this).offset();
        var top=offset.top+$(this).height();
        var left=offset.left+$(this).width()-box.width()-2;
        box.css({left:left,top:top});
        box.fadeIn();
    });
    //底部更多菜单
    $("#btnMore").click(function(){
        $("#menuBox:visible").fadeOut();
        var tm=$("#moreBox:visible");
        if(tm.size()>0) {
            tm.fadeOut();
            return false;
        }
        var box=$("#moreBox");
        var offset=$(this).offset();
        var top=offset.top-box.height();
        var left=offset.left+$(this).width()-box.width()-2;
        box.css({left:left,top:top});
        box.fadeIn();
    });
    $(".context").click(function(){
       $("#moreBox:visible").fadeOut();
        $("#menuBox:visible").fadeOut();
    });
}

function closeWindows() {
    var browserName = navigator.appName;
    var browserVer = parseInt(navigator.appVersion);
    //alert(browserName + " : "+browserVer);

    //document.getElementById("flashContent").innerHTML = "<br>&nbsp;<font face=‘Arial‘ color=‘blue‘ size=‘2‘><b> You have been logged out of the Game. Please Close Your Browser Window.</b></font>";

    if(browserName == "Microsoft Internet Explorer"){
        var ie7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;
        if (ie7)
        {
            //This method is required to close a window without any prompt for IE7 & greater versions.
            window.open('','_parent','');
            window.close();
        }
        else
        {
            //This method is required to close a window without any prompt for IE6
            this.focus();
            self.opener = this;
            self.close();
        }
    }else {
        //For NON-IE Browsers except Firefox which doesnt support Auto Close
        try {
            this.focus();
            self.opener = this;
            self.close();
        }
        catch (e) {
            alert(e);
        }
        try {
            window.open('', '_self', '');
            window.close();
        }
        catch (e) {
            alert(e);
        }
    }
}

/* 用于记录学员在线时间 */
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
        var num = $.cookie('stOnlineNumx');
        if (num == null || num == 'null') num = 1;
        num = Number(num) + 1;
        $.cookie('stOnlineNumx', num, { expires: 7, path: '/' });
        //box.html(num);
        //ajax提交在线时间
        var interval = 60;
        if (Number(num) % interval == 0) {
            $.get("/Ajax/StudentOnline.ashx?interval=" + interval);
        }
    }
}