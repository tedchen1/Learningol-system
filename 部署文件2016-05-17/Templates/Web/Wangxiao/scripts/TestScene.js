//全局变量
//是否已经交卷
window.isSubmited=false;
//是否正在卷
window.isSubmit=false;


$(function () {
    setExamingInitLoyout();
    setExamCurrDateTime();
    _quesAnswerEvent();
    setInterval("setExamCurrDateTime()", 1000);
    buildCard();
});

//设置初始化的布局与事件
function setExamingInitLoyout() {
    //显示第一个
    $(".quesItem:first").show();
    //上一题
    $("#btnPrev").click(function(){
        var index = Number($("#quesArea .quesItem:visible").attr("index"));
        ShowQues(index, -1);
    });
    //下一题
    $("#btnNext").click(function(){
        var index = Number($("#quesArea .quesItem:visible").attr("index"));
        ShowQues(index, 1);
    });
    //确定，并进入下一题
    $("#btnEnterNext").click(function(){

    });
    //交卷
    $("#btnSubmint").click(function(){
        //完成数与试题总数
        var count=Number($("#CompleteNumber").html());
        var sum=Number($("#QuesCount").html());
        if(count<1){
            new MsgBox("提示","你还没有做任何试题。",400,300,"msg").Open();
            return;
        }else{
            var show="";
            show+="当前考试共 "+sum +" 道试题。<br/>";
            show+="您已经完成 "+count +" 道试题。<br/>";
            if(count<sum)show+="还有 <b>"+(sum-count) +"</b> 道试题没有做。<br/>";
            show+="<br/>您是否确认交卷？";
            var msg=new MsgBox("确认交卷",show,400,300,"confirm");
            msg.EnterEvent=submitResult;
            msg.Open();
        }
        return;
    });
}
//显示某道题
//index:当前试题的索引号
//action:向前，还是向后；正数向后，负数向前
function ShowQues(index, action) {
    //所有的试题隐藏
    var ques = $("#quesArea .quesItem");
    ques.hide();
    //新索引
    var newIndex = index + action;
    if (newIndex < 1) newIndex = ques.size();
    if (newIndex > ques.size()) newIndex = 1;
    var dd = $("#quesArea .quesItem[index=" + newIndex + "]");
    if (dd.size() > 0) {
        dd.show();
        $("#indexNum").html(newIndex);
    }
}
//设置当前时间与剩余时间
function setExamCurrDateTime() {
    //计算客户端实时时间
    var tm = new Date();
    var span = tm.getTime() - ClientTime.getTime();
    var curr = new Date(ServerTime.getTime() + span);
    $("#currTime").text(curr.Format("hh:mm:ss"));
    //计算剩余的时间，还剩多久
    //考试结束时间
    var overSpan = Number($("#timeSpan").text());
    span = overSpan * 60 - parseInt(span / 1000);
    var resTime = $("#timeBox");
    //剩余时间的分抄计算
    var mm = parseInt(span / 60);
    var ss = span % 60;
    if (mm > 0 && ss > 0) {
        resTime.find(".mm").text(mm);
        resTime.find(".ss").text(ss);
    }
    if (mm <= 0 && ss <= 0) {
        //考试时间结束，在这里触发交卷
        //submitResult(2);
    }
}
//生成答题卡
function buildCard(){
    //试题类型
    var types=getQuesType();
    var box=$("#cardBoxInner");
    for(var i=0;i<types.length;i++){
        box.append("<div class='typeName'>"+types[i].name+"</div>");
        var ques=$(".quesItem[type="+types[i].type+"]");
        var html="<dl type='" + types[i].type + "' count='" + ques.size() + "' number='" +0 + "'>"
        ques.each(function(){
            var num=$(this).find("span.num").html();
            html+="<dd qid='"+$(this).attr("qid")+"' num='"+num+"'>"+$(this).attr("index")+"</dd>";
        });
        html+="</dl>";
        box.append(html);
    }
    box.find("dl dd").click(function(){
        var index=Number($(this).html());
        ShowQues(index,0);
    })
}
//获取试题类型
function getQuesType(){
    var types=new Array();
    var qus=$(".quesItem");
    qus.each(function(){
        var type=$(this).attr("type");
        var name= $.trim($(this).find("span.type").html());
        var isExist=false;
        for(var i=0;i<types.length;i++){
            if(types[i].type==type) {
                isExist=true;
                break;
            }
        }
        if(!isExist){
            types.push({type:type,name:name});
        }
    });
    return types;
}
/*答题时的事件处理*/
function _quesAnswerEvent(){
    $(".quesItem").each(function(){
        var type=Number($(this).attr("type"));
        try {
            var func = eval("quesEventType" + type);
            if (func != null)func($(this));
        }catch(e){}
    });
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
        type: "POST", url: urlPath, dataType: "json", data: { result: xml },
        //开始，进行预载
        beforeSend: function (XMLHttpRequest, textStatus) {
            window.isSubmit=true;
            if (patter == 1) Mask.Submit();
            if (patter == 2) {
                var msg=new MsgBox("交卷中","正在交卷，请稍等……",400,300,"loading");
                msg.ShowCloseBtn=false;
                msg.Open();
            }
        },
        //加载出错
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },
        //加载成功！
        success: function (data) {
            try {
                var msg=new MsgBox("交卷成功","您的得分： "+data.score,400,300,"msg");
                MsgBox.OverEvent=function(){
                    var url = "TestView.ashx?trid=" + data.trid;
                    new top.PageBox("测试成绩回顾",url,980,80).Open();

                };
                msg.Open();
                window.isSubmit=false;
                window.isSubmited=true;
            } catch (e) {
                alert(data);
            }
        }
    });
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