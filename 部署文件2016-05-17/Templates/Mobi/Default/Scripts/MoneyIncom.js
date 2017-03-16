$(function () {
    setInit();
    setPayInteFaceStyle();
    submitPay();
    showError();
});
//初始化
function setInit(){
    var money=$().getPara("money");
    $("input[name=money]").val(money);
    //
    var paiid=$().getPara("paiid");
    var pi = $(".payInterface .pi[paiid=" + paiid + "]");
    if(pi.size()<1)pi=$(".payInterface .pi:first");
    pi.addClass("piSelect").attr("select","true");
    $("input[name=paiid]").val(pi.attr("paiid"));

}
//设置接口的样式
function setPayInteFaceStyle(){
    var pi=$(".payInterface .pi");
    pi.click(function(){
        $(".payInterface .pi").removeClass("piSelect").attr("select","false");
        $(this).addClass("piSelect").attr("select","true");
        $("input[name=paiid]").val($(this).attr("paiid"));
    });
}
//提交
function submitPay(){
    $(".btnInMoney").click(function(){
        var btnInMoney=$("input[name=btnInMoney]");
        btnInMoney.click();
        //form.submit();
    });
}
//错误提示
function showError(){
    var err=$().getPara("err");
    if(err=="1"){
        var show="学员未登录，或登录已经失效。";
        var msg=new MsgBox("错误",show,90,40,"alert");
        msg.Open();
    }
    if(err=="2"){
        var show="支付接口存在故障，请与管理员联系。";
        var msg=new MsgBox("错误",show,90,40,"alert");
        msg.Open();
    }
    if(err=="3"){
        var show="验证码填写错误。";
        var msg=new MsgBox("错误",show,90,40,"alert");
        msg.Open();
    }
    var sccess=$().getPara("sccess").toLocaleLowerCase();
    if(sccess=="false"){
        var show="充值失败，请重试。";
        var msg=new MsgBox("失败",show,90,40,"alert");
        msg.Open();
    }
    if(sccess=="true"){
        var money=$().getPara("money");
        var show="成功充值："+money+"元。";
        var msg=new MsgBox("成功",show,90,40,"confirm");
        msg.EnterEvent=function(){
            window.location.href="SelfInfo.ashx";
        };
        msg.Open();
    }
}


