$(function () {
    $(".titItem:first").click();
    _initEvent();
    _contentsLoyout();
    playVideo();
});
//当窗口大变化时
$(window).resize(
	function () {

	}
);
//界面始初化布局
function _contentsLoyout() {
    //弹出窗口
    $("a[btnType=openwin]").click(function () {
        var href = $(this).attr("href");
        var title = $(this).attr("title");
        new top.PageBox(title, href, 640, 480).Open();
        return false;
    });
    $("input[btnType=openwin]").click(function () {
        var a = $(this).parent().parent().find("a[btnType=openwin]");
        var href = a.attr("href");
        var title = a.attr("title");
        new top.PageBox(title, href, 640, 480).Open();
        return false;
    });

}
function _initEvent() {
    //章节切换的事件
    var ol = $(".outlineName");
    ol.click(function () {
        var rightbox = $(".rightBox");
        if (rightbox.size() > 0) {
            if (!confirm("切换章节之前，请保存当前章节的内容编辑。\n是否继续切换？")) {
                return false;
            }
        }
    });
    //章节编辑提交的事件
    $("input[name$=btnEnter]").hover(function () {
        $(".titItem:first").click();
    });
    //新增章节的按钮
    $("input.btnAdd").click(function () {
        var href = "Courses_Outline.aspx?id=";
        var id = $().getPara("id");
        window.location.href = href + id;
        return false;
    });
}
function playVideo() {
    $("a.video").click(function () {
        var href = $(this).attr("href");
        player(href);
        return false;
    });
}
function player(file) {
    var width = 500;
    var height = 400;
    var str = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-4445535411111'  codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0'";
    str += "  width=" + width + " height=" + height + " >";
    str += "<param name='movie' value='" + uploadPath + "flvplayer.swf?vcastr_file=" + file + "' />";
    str += "<param name='quality' value='high' />";
    str += "<param name='allowFullScreen' value='true' />";
    str += "<param name='FlashVars' value='vcastr_file=" + file + "&IsAutoPlay=1&IsContinue=1' />";
    str += "<embed src='" + uploadPath + "flvplayer.swf?vcastr_file=" + file + "' allowfullscreen='true'";
    str += " flashvars='vcastr_file=" + file + "&IsAutoPlay=1&IsContinue=1' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' ";
    str += " type='application/x-shockwave-flash'  width=" + width + " height=" + height + " />";
    str += "</object>";
    $("#divPlayer").html(str);
}