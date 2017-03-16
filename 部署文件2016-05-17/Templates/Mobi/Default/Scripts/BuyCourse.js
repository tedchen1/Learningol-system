$(function () {
    _btnEvent();
    _selectPrice();
});
//按钮事件
function _btnEvent(){
    //免费课程的学习按钮
    $("#btnStudy").click(function(){
        var moneySpan=$(".money");
        if(moneySpan.size()<1) {
            var txt="您还没有登录，请登录后学习。";
            var msg=new MsgBox("未登录",txt,90,40,"confirm");
            msg.EnterEvent=function(){
                window.location.href="Entry.ashx";
            };
            msg.Open();
            return false
        }
    });
    //试用按钮
    $(".aTryout").click(function(){
        var isTry=$(this).attr("IsTry")=="True" ? true : false;
        if(isTry) {
            var txt = "您选择了试用《" + $(this).attr("course") + "》。<br/><br/>";
            txt += "说明：在试用状态只能做“章节练习”和查阅一些资料。";
            var msg = new MsgBox("暂时试用", txt, 90, 60, "confirm");
            msg.EnterEvent = function () {
                var href = $(".aTryout").attr("href");
                window.location.href = href;
            };
            msg.Open();
        }else{
            new MsgBox("提示", "该课程不允许试用，请登录购买。", 90, 60, "alert").Open();
        }
        return false;
    });
    //确定按钮
    $("#btnBuyStudy").click(function(){
        var moneySpan=$(".money");
        if(moneySpan.size()<1) {
            var txt="您还没有登录，请登录后购买。";
            var msg=new MsgBox("未登录",txt,90,60,"confirm");
            msg.EnterEvent=function(){
                window.location.href="Entry.ashx";
            };
            msg.Open();
            return false
        }
        //是否选项费用项
        var selected=$(".priceSelected");
        if(selected.size()<1){
            new MsgBox("提示","请选择学习费用的选项。",90,60,"alert").Open();
            return false;
        }
        //判断产品价格不得低于余额
        var money=Number(moneySpan.html());
        var price=Number(selected.find(".price").html());
        if(money<price){
            var msg=new MsgBox("提示","你的余额不足，是否充值？",90,60,"confirm");
            msg.EnterEvent=function(){
                window.location.href="MoneyIncom.ashx";
            };
            msg.Open();
            return false
        }
        //验证码
        if($.trim($(".verify").val())==""){
            new MsgBox("提示","请输入验证码！",80,40,"alert").Open();
            return false;
        }
        BuySubmit();
    });
}
//选择价格
function _selectPrice(){
    //价格选项的点击事件
    $(".priceItem").click(function(){
        $(this).parent().find(".priceItem").removeClass("priceSelected");
        $(this).parent().find(".priceItem span.ico").html("&#xf00c6;");
        //选中事件
        $(this).addClass("priceSelected");
        $(this).find("span.ico").html("&#xe667;");
        //如果登录，则显示验证码
        var moneySpan=$(".money");
        if(moneySpan.size()>0) {
            $(".verifyInfo").show();
        }
    });
}

//提交购买操作
function BuySubmit(patter) {
    var urlPath = "BuySubmit.ashx?timestamp=" + new Date().getTime();
    var code=$.trim($(".verify").val());
    var cpid=$(".priceSelected").attr("cpid");
    var couid=$(".priceSelected").attr("couid");
    $.ajax({
        type: "POST", url: urlPath, dataType: "text",
        data: { veriCode: code,cpid:cpid,couid:couid },
        //开始，进行预载
        beforeSend: function (XMLHttpRequest, textStatus) {
            window.isSubmit=true;
            var msg=new MsgBox("提交","正在处理交易，请稍等……",90,60,"loading");
            msg.ShowCloseBtn=false;
            msg.Open();
        },
        //加载出错
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        //加载成功！
        success: function (data) {
            try {
                var result = Number(data);
                if(result==0) {
                    var msg = new MsgBox("操作成功", "操作成功，点击确定开始学习", 90, 60, "confirm");
                    msg.EnterEvent = function () {
                        window.location.href = "default.ashx";
                    };
                    msg.Open();
                }
                var error="";
                if(result==1)error="您还未登录！";
                if(result==2)error="验证码不正确！";
                if(result==3)error="价格数据不存在，请刷新界面再提交！";
                if(result==4)error="当前课程不存在，请刷新界面再提交！";
                if(result==5)error="余额不足，请充值！";
                if(result==6)error="余额不足，请充值！";
                if(result!=0)new MsgBox("错误", error, 90, 60, "alert").Open();
                window.isSubmit=false;
            } catch (e) {
                alert(data);
            }
        }
    });
}