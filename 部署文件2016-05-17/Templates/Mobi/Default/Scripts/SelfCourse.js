
$(function () {
    _initLoyout();
});

function _initLoyout() {
    var row = $(".row");
    //设置行的事件与样式
    row.click(function () {
        var href = $(this).attr("href");
        window.location.href = href;
    });
    row.each(function () {
        var width = $(this).width();
        width = width - $(this).find(".sbjLogo").width() - $(this).find(".rightbox").width()-12;
        $(this).find(".rowtxt").width(width);
    });
}
function setLoyout(json) {
   
}