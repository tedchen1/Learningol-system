$(function() {

    _btnEvent();
});
function _btnEvent() {
    //查看详情
    $(".row").click(function () {
        var href = $(this).attr("href");
        new PageBox("账单详情", href, 80, 80, null).Open();
    });
}