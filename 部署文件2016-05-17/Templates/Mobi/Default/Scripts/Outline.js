
$(function () {
    _initLoyout();
});

function _initLoyout() {
    var row = $(".row");
    //设置行的事件与样式
    row.click(function () {
        var count=Number($(this).attr("count"));
        var child=Number($(this).attr("child"));
        if(child!=0 && count<1){
            new MsgBox("提示","该章节没有任何试题。",90,40,"alert").Open();
        }else {
            var href = $(this).attr("href");
            window.location.href = href;
        }
    });
    row.each(function () {
        var width = $(this).width();
        width = width - $(this).find(".sbjLogo").width() - $(this).find(".rightbox").width()-12;
        $(this).find(".rowtxt").width(width);
    });
    //设置搜索事件
    var search = $("#search");
    if ($.trim(search.val()) == "") search.val(search.attr("default"));
    search.focusin(function () {
        if ($.trim($(this).val()) == $(this).attr("default")) {
            $(this).val("");
        }
    });
    search.focusout(function () {
        if ($.trim($(this).val()) == "") {
            var def=$(this).attr("default");
            $(this).val(def);
        }
    });
    $("#searctBtn").click(function () {
        var search = $("#search");
        if ($.trim(search.val()) == search.attr("default")) {
            search.val("");
        }
        $(this).parents("form").submit();
    });
}
function setLoyout(json) {
   
}