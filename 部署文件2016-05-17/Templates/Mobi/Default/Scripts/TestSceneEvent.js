$(function() {
    _quesAnswerEvent();
    _btnEvent();
});

/*
 界面各按钮的事件
 */
function _btnEvent(){
    //交卷
    $("#SubmitExam").click(function(){
        //完成数与试题总数
        var count=Number($("#CompleteNumber").html());
        var sum=Number($("#QuesCount").html());
        if(count<1){
            new MsgBox("提示","你还没有做任何试题。",90,40,"msg").Open();
            return;
        }else{
            var show="";
            show+="当前考试共 "+sum +" 道试题。<br/>";
            show+="您已经完成 "+count +" 道试题。<br/>";
            if(count<sum)show+="还有 <b>"+(sum-count) +"</b> 道试题没有做。<br/>";
            show+="<br/>您是否确认交卷？";
            var msg=new MsgBox("确认交卷",show,90,40,"confirm");
            msg.EnterEvent=submitResult;
            msg.Open();
        }
        return;
    });
    //收藏
    $(".btnFav").click(function(){
        var ques=$(this).parents(".quesItem");
        var qid=ques.attr("qid");
        var isCollect=ques.attr("IsCollect")=="True" ? true : false;
        $.get("AddCollect.ashx",{"qid":qid,"isCollect":isCollect},function(){
            var ques=$(".quesItem[qid="+qid+"]");
            ques.attr("IsCollect",isCollect ? "False" : "True");
            $(".btnFav").toggleClass("IsCollect");
            $(".btnFav").html(!isCollect ? "&#xe662;" : "&#xe661;");
        });
    });
    //报错
    $(".btnError").click(function(){
        var qid=$(this).parents(".quesItem").attr("qid");
        new PageBox("错误试题提交","SubmitError.ashx?id="+qid,90,80,null).Open();
    });
    //答题卡
    $("#btnCard").click(function(){
        var off=$(this).offset();
        var little=$("#cardLittle");
        little.height(12);
        little.css({left:off.left,top:off.top-10,width:$(this).width()});
        var box=$("#cardBox");
        box.width($(window).width()-20).height($(window).height()-$(this).height()-30);
        box.css({left:off.left,top:10});
        $("#cardBoxInner").width(box.width()-20).height(box.height()-60);
        $("#cardPanel").toggle();
    });
    //答题卡关闭按钮
    $("#cardBoxColse").click(function(){
        $("#cardPanel").hide();
    });
}

/*
//答题时的事件

*/
function _quesAnswerEvent(){
    $(".quesItem").each(function(){
        var type=Number($(this).attr("type"));
        try {
            var func = eval("quesEventType" + type);
            if (func != null)func($(this));
        }catch(e){}
    });
}
//操作答题卡
function setCardStyle(qid,answer){
    var box = $("#cardBox dd[qid=" + qid + "]");
    if(answer!=null && answer!=""){
        box.attr("ans", answer);
        box.addClass("answer");
    }else {
        box.removeAttr("ans");
        box.removeClass("answer");
    }
    //计算完成的题数
    $("#CompleteNumber").text($("#cardBox dd[ans]").size());
}
//单选题的选择
function quesEventType1(ansItem){
    ansItem.find(".answer").click(function(){
        var isSel=$(this).attr("isSel")=="true" ? true : false;
        if(isSel){
            $(this).attr("isSel",false);
            $(this).removeClass("answerSel");
            $(this).find("span.type").html("&#xf00c6;");
        }else{
            //如要没有选中
            $(this).parent().find(".answer").attr("isSel",false);
            $(this).parent().find(".answer").removeClass("answerSel");
            $(this).parent().find("span.type").html("&#xf00c6;");
            $(this).attr("isSel",true);
            $(this).addClass("answerSel");
            $(this).find("span.type").html("&#xe667;");
        }
        var sel=$(this).parent().find(".answer[isSel=true]");
        if(sel.size()<1)setCardStyle(ansItem.attr("qid"),null);
        if(sel.size()>0)setCardStyle(ansItem.attr("qid"),sel.attr("ansid"));
    });
}
//多选题的选择
function quesEventType2(ansItem){
    ansItem.find(".answer").click(function(){
        var isSel=$(this).attr("isSel")=="true" ? true : false;
        if(isSel){
            $(this).attr("isSel",false);
            $(this).removeClass("answerSel");
            $(this).find("span.type").html("&#xe603;");
        }else{
            $(this).attr("isSel",true);
            $(this).addClass("answerSel");
            $(this).find("span.type").html("&#xe62a;");
        }
        var sel=$(this).parent().find(".answer[isSel=true]");
        if(sel.size()<2)setCardStyle(ansItem.attr("qid"),null);
        if(sel.size()>=2) {
            var answer="";
            sel.each(function(){
                answer+= $(this).attr("ansid")+",";
            });
            setCardStyle(ansItem.attr("qid"), answer);
        }
    });
}
//判断题的选择
function quesEventType3(ansItem){
    ansItem.find(".answer").click(function(){
        var isSel=$(this).attr("isSel")=="true" ? true : false;
        if(isSel){
            $(this).attr("isSel",false);
            $(this).removeClass("answerSel");
            $(this).find("span.type").html("&#xe621;");
        }else{
            //如果没有选中
            $(this).parent().find(".answer").attr("isSel",false);
            $(this).parent().find(".answer").removeClass("answerSel");
            $(this).parent().find("span.type").html("&#xe621;");
            $(this).attr("isSel",true);
            $(this).addClass("answerSel");
            $(this).find("span.type").html("&#xe63b;");
        }
        var sel=$(this).parent().find(".answer[isSel=true]");
        if(sel.size()<1)setCardStyle(ansItem.attr("qid"),null);
        if(sel.size()>0)setCardStyle(ansItem.attr("qid"),sel.attr("ansid"));
    });
}
//简答题的作答
function quesEventType4(ansItem){
    ansItem.find("textarea").focusout(function(){
        var answer= $.trim($(this).val());
        setCardStyle(ansItem.attr("qid"),answer);
    });
}
//填空题的作答
function quesEventType5(ansItem){
    ansItem.find("input[type=text]").focusout(function(){
        var answer = "";
        ansItem.find("input.textbox5[value!='']").each(function () {
            answer += $.trim($(this).val()) + ",";
        });
        setCardStyle(ansItem.attr("qid"),answer);
    });
}

//提交答题信息
//patter:提交方式，1为自动提交，2为交卷
function submitResult(patter) {
    if(window.isSubmit)return;
    if(window.isSubmited)return;
    patter= !isNaN(Number(patter)) ? Number(patter) : 2;
    //提交
    var xml = encodeURIComponent(getResultXml(patter));
    var urlPath = "/ajax/InTestResult.ashx?timestamp=" + new Date().getTime();
    $.ajax({
        type: "POST", url: urlPath, dataType: "text", data: { result: xml },
        //开始，进行预载
        beforeSend: function (XMLHttpRequest, textStatus) {
            window.isSubmit=true;
            if (patter == 1) Mask.Submit();
            if (patter == 2) {
                var msg=new MsgBox("交卷中","正在交卷，请稍等……",90,40,"loading");
                msg.ShowCloseBtn=false;
                msg.Open();
            }
        },
        //加载出错
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        //加载成功！
        success: function (data) {
            try {
                var trid = Number(data);
                var msg=new MsgBox("交卷成功","您的得分： "+trid,90,40,"msg");
                MsgBox.OverEvent=submitSuccess;
                msg.Open();
                window.isSubmit=false;
                window.isSubmited=true;
            } catch (e) {
                alert(data);
            }
        }
    });
}
//提交成功
function submitSuccess(){
    window.location.href="TestPaper.ashx";

}
//获取答题信息
//patter:提交方式，1为自动提交，2为交卷
function getResultXml(patter) {
    patter= !isNaN(Number(patter)) ? Number(patter) : 2;
    var res = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
    res += "<results uid=\"" + uid + "\" examid=\"" + 0 + "\" stid=\"" + stID + "\"  stname=\"" + stName
        + "\" sbjid=\"" + sbjid + "\" sbjname=\"" + subjectName + "\" patter=\"" + patter + "\" tpid=\"" + testPagerID + "\">";
    $("#cardBox dl").each(function () {
        res += "<ques type='" + $(this).attr("type") + "' count='" + $(this).attr("count") + "' number='" + $(this).attr("number") + "'>";
        $(this).find("dd").each(function () {
            var type = Number($(this).parent().attr("type"));
            var ans = $(this).attr("ans") ? $(this).attr("ans") : "";
            if (type == 1 || type == 2 || type == 3) {
                res += "<q id=\"" + $(this).attr("qid") + "\" class=\"" + $(this).attr("class") + "\" num=\"" + $(this).attr("num") + "\" ans=\"" + ans + "\"/>";
            }
            if (type == 4 || type == 5) {
                res += "<q id=\"" + $(this).attr("qid") + "\" class=\"" + $(this).attr("class") + "\" num=\"" + $(this).attr("num") + "\">";
                res += "<![CDATA[" + ans + "]]>"
                res += "</q>";
            }
        });
        res += "</ques>";
    });
    res += "</results>";
    return res;
}