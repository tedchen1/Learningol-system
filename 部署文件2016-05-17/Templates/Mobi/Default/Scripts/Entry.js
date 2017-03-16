$(function () {
    //试用按钮
    $(".aTryout").click(function(){
        var txt="说明：在试用状态只能做“章节练习”和查阅一些资料。<br/><br/>";
        txt+="步骤：选择专业->选择课程->自动回到首页，进行“章节练习”。";
        var msg=new MsgBox("暂时试用",txt,90,40,"confirm");
        msg.EnterEvent=function(){
            var href=$(".aTryout").attr("href");
            window.location.href=href;
        };
        msg.Open();
        return false;
    });
});


