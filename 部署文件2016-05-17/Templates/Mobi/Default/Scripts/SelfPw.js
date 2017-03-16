$(function () {
    //性别的初始设定
    var sex=$("input[name=tbSex]").val();
    $("span.btnSex[type="+sex+"]").addClass("btnSexSel");
    //性别按钮事件
    $("span.btnSex").click(function(){
        var sex=$(this).attr("type");
        $("input[name=tbSex]").val(sex);
        $("span.btnSex").removeClass("btnSexSel");
        $("span.btnSex[type="+sex+"]").addClass("btnSexSel");
    });
});


