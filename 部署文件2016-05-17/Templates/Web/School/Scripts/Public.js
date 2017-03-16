$(function () {
    mobileEvent();
    MenuEvent();
});
//手机版二维码
function mobileEvent() {
    $("*[type=phone]").hover(function () {
        var btn=$(".phone");
        var off = $(".phone").offset();
        var qr = $("#qrcode");
        qr.css({left:off.left+btn.width()-qr.outerWidth(),top:off.top+btn.height()});
        qr.show();
        window.phoneHover=true;
    },function () {
        window.phoneHover=false;
        window.setTimeout(function(){
            if(!window.phoneHover)
                $("#qrcode").hide();
        },100)
    });
}
//主菜单的事件
function MenuEvent() {
    //当鼠标滑过主菜单
    $(".menubBar dl dd").hover(function(){
        var style=$(this).parent().attr("overClass");
        $(this).parent().children().removeClass(style);
        $(this).addClass(style);
    },function(){
        var style=$(this).parent().attr("overClass");
        $(this).removeClass(style);
    });
    //加入收藏
    $(".fav a").click(function(){
        var url=window.location.href;
        var title=$("title").text();
        if (document.all){
            window.external.addFavorite(url,title);
        }else if (window.sidebar){
            window.sidebar.addPanel(title,url, "");
        }else{
            alert("当前浏览器不支持该操作，请手工添加收藏。");
        }
        return false;
    });
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