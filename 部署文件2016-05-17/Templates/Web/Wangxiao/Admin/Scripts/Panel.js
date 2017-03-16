$(function () {
    setMenuAccordion();
    setMenuStyle();
    setMenuEvent();
    //主管理区加载完成事件
    $("#adminPage").load(function () {
        $("#IframLoadMask").remove();
        var ifm = document.getElementById("adminPage");
        var subWeb = document.frames ? document.frames["adminPage"].document : ifm.contentDocument;
        if (ifm != null && subWeb != null) {
            ifm.height = subWeb.body.scrollHeight;
        }
    });
    setInit();
});
//设置菜单展开与折叠
function setMenuAccordion(){
   var first= $(".mmtop:first");
    first.addClass("currTop");
    first.next().slideDown();
    $(".mmtop").click(function(){
        $(".mmtop").removeClass("currTop");
        $(this).addClass("currTop");
        $(".twoBox:visible").slideUp();
        $(this).next().slideDown();
    });
}
//设置菜单样式
function setMenuStyle() {
    $("div.mmtwo a").each(function () {
        if ($(this).attr("isBold") == "True") {
            $(this).css("font-weight", "bold");
        }
        if ($(this).attr("href") == "") {
            $(this).css("color", "#000000");
        }
    });
}
//设置菜单事件
function setMenuEvent() {
    //左侧菜单的点击事件
    $("div.mmtwo a").click(function () {
        var ifm = document.getElementById("adminPage");
        var subWeb = document.frames ? document.frames["adminPage"].document : ifm.contentDocument;
        if (ifm != null && subWeb != null) {
            ifm.height = 0;
        }
        var p = $(this).parent();
        $(".mmtwo").removeClass("currTwo");
        p.addClass("currTwo");
        if (p.attr("mmtype") == "item") {
            //右侧内容区的页面
            var href = $(this).attr("href");
            $("#adminPage").attr("src", href);
            OpenLoadMask();
            //上方导航显示
            var title = $.trim($(this).text());
            var ptit = $.trim($(this).parent().parent().prev().text());
            $("#menuPath").text(ptit + " >> " + title);
            $("#menuPath").attr("href", href);
        }
        if (p.attr("mmtype") == "link") {
            $(this).attr("target", "_blank");
            return true;
        }
        return false;
    });
    //上方的“当前操作”点击事件
    $("#menuPath").click(function () {
        //右侧内容区的页面
        var href = $(this).attr("href");
        $("#adminPage").attr("src", href);
        OpenLoadMask();
        return false;
    });
}

//iframe加载完成的事件
function OpenLoadMask() {
    $("body").append("<div id=\"IframLoadMask\"/>");
    var mask = $("#IframLoadMask");
    var iframe = $("#adminPage");
    //屏幕的宽高
    var off = iframe.offset();
    mask.css({ "position": "absolute", "z-index": "10000",
        "width": iframe.width(), "height": iframe.height(), top: off.top, left: off.left
    });
    var alpha = 50;
    mask.css({ "background-color": "#ffffff", "filter": "Alpha(Opacity=" + alpha + ")",
        "display": "block", "-moz-opacity": alpha / 100, "opacity": alpha / 100
    });
    mask.fadeIn("slow");
}
//获取管理标题
function getAdminTitle() {
    return $("#menuPath").text();
}

//设置初始界面
function setInit() {
    var mmid = $().getPara("mmid");
    var a = $("a[mmid=" + mmid + "]");
    a.click();
}
//设置学生照片
function setPhoto(path) {
    var img = $(".stPhoto img");
    img.attr("src",path);
}