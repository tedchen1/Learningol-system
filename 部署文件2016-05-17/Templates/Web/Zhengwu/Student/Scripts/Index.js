$(function () {
    //验证码
    $("img.verifyCode").click(function () {
        var src = $(this).attr("src");
        $(this).attr("src", src + "&timestamp=" + new Date().getTime());
    });
});
