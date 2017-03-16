//生成遮罩层
function Mask() { };
Mask.Open = function () {
    $("body").css("overflow", "hidden");
    $("body").append("<div id=\"screenMask\"/>");
    var mask = $("#screenMask");
    //屏幕的宽高
    var hg = document.documentElement.clientHeight*100;
    var wd = document.documentElement.clientWidth * 100;
    mask.css({ "position": "absolute", "z-index": "1000",
        "width": wd, "height": hg, top: $(window).scrollTop(), left: 0
    });
    var alpha = 60;
    mask.css({ "background-color": "#999", "filter": "Alpha(Opacity=" + alpha + ")",
        "display": "block", "-moz-opacity": alpha / 100, "opacity": alpha / 100
    });
    mask.fadeIn("slow");

}
Mask.Loading = function () {
    Mask.Open();
    var loading = $("#loading");
    var hg = document.documentElement.clientHeight * 100;
    var wd = document.documentElement.clientWidth * 100;
    loading.css("top", (hg - loading.height()) / 2 + $(window).scrollTop());
    loading.css("left", (wd - loading.width()) / 2);
    loading.show();
}
Mask.LoadingClose = function () {
    $("#screenMask").remove();
    $("#loading").hide();
    $("body").css("overflow", "auto");
}
Mask.Submit = function () {
    Mask.Open();
    var loading = $("#submitBox");
    $("body").css("overflow", "hidden");
    var hg = document.documentElement.clientHeight * 100;
    var wd = document.documentElement.clientWidth * 100;
    loading.css("top", (hg - loading.height()) / 2 + $(window).scrollTop());
    loading.css("left", (wd - loading.width()) / 2);
    loading.css({ "position": "absolute", "z-index": "1000",
        "width": wd, "height": hg, top: $(window).scrollTop(), left: 0
    });
    loading.show();
}
Mask.SubmitClose = function () {
    $("body").css("overflow", "auto");
    $("#submitBox").hide();
    alert("答题信息已经提交！");
    $("#screenMask").fadeOut();
    //new parent.PageBox().Close();
}
Mask.InResult = function () {
    $("#inResultLoading").show();
}
Mask.InResultClose = function () {
    $("#inResultLoading").hide();
}