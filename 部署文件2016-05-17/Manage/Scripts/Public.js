
/*
用于记录学员在线时间
*/
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
    /*
    var box = $("#stOnlineNumBox");
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