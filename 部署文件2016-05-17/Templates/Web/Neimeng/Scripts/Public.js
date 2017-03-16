$(function () {
    mobileEvent();
    MenuEvent();
    verifyCode();
});
//手机版二维码
function mobileEvent() {
    $("#header .phone").hover(function () {
        var off = $(this).offset();
        var qr = $(this).parent().find("#qrcode");
        qr.css({ left: off.left, top: off.top + $(this).height() });
        qr.show();
    },
    function () {
        $(this).parent().find("#qrcode").hide();
    });
}
//主菜单的事件
function MenuEvent() {
    //当鼠标滑过主菜单
    $(".menubBar dl dd").hover(function () {
        var style = $(this).parent().attr("overClass");
        $(this).parent().children().removeClass(style);
        $(this).addClass(style);
    }, function () {
        var style = $(this).parent().attr("overClass");
        $(this).removeClass(style);
    });
    //加入收藏
    $(".fav a").click(function () {
        var url = window.location.href;
        var title = $("title").text();
        if (document.all) {
            window.external.addFavorite(url, title);
        } else if (window.sidebar) {
            window.sidebar.addPanel(title, url, "");
        } else {
            alert("当前浏览器不支持该操作，请手工添加收藏。");
        }
        return false;
    });
}

//当点击验证码时，刷新验证码
function verifyCode() {
    $(".verifyCode").click(function () {
        var src = $(this).attr("src");
        if (src.indexOf("&") < 0) {
            src += "&timestamp=" + new Date().getTime();
        } else {
            src = src.substring(0, src.lastIndexOf("&"));
            src += "&timestamp=" + new Date().getTime();
        }
        $(this).attr("src", src);
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
        var num = $.cookie('stOnlineNumx');
        if (num == null || num == 'null') num = 1;
        num = Number(num) + 1;
        num = num >= Number.MAX_VALUE ? 0 : num;
        $.cookie('stOnlineNumx', num,{ expires: 7, path: '/' });
        //box.html(num);
        //ajax提交在线时间
        var interval = 60;
        if (Number(num) % interval == 0) {
            $.get("/Ajax/StudentOnline.ashx?interval=" + interval);
        }
    }
}
