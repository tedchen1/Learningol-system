//窗体滚动时，需要固定的内容
$(document).ready(function () {
    $().FloatBox("#pagerTitle", "center", -490, 2, 370);
    $().FloatBox("#pagerCard", "center", 230, { target: "#pagerTitle", top: 50 }, 420);
});
//
$(function () {
    //计算剩余时间
    setExamCurrDateTime();
    setInterval("setExamCurrDateTime()", 1000);

});
//设置当前时间与剩余时间
function setExamCurrDateTime() {
    //当前时间，来自服务端
    var curr = new Date(ServerTime.getTime() + (new Date().getTime() - ClientTime.getTime()));
    $("#currTime").text(curr.Format("yyyy-MM-dd hh:mm:ss"));
    //计算离考试开始时间，还有多久
    var starTime = new Date($("#startTime").text().replace(new RegExp("-", "g"), "/"));
    var dist = Math.floor((starTime.getTime() - curr.getTime()) / 1000);
    //如果还没有开始
    if (dist >= 0) {
        var notTime = $("#distanceTime");
        notTime.show();
        notTime.find(".mm").text(parseInt(dist / 60));
        notTime.find(".ss").text(dist % 60);
        //显示固定的剩余时间
        var resTime = $("#residueTime");
        resTime.find(".mm").text(examSpan);
        resTime.find(".ss").text("00");
        //交卷与关闭按钮的显示
        $("#pagerSubmitBox").attr("isStart","no").addClass("noStart");
        return;
    }
    //计算剩余的时间，还剩多久
    var endTime = new Date(starTime.getTime() + examSpan * 60 * 1000);
    var span = Math.floor((endTime.getTime() - curr.getTime()) / 1000);
    if (span >= 0) {
        $("#distanceTime").hide();
        var resTime = $("#residueTime");
        resTime.show();
        resTime.find(".mm").text(parseInt(span / 60));
        resTime.find(".ss").text(span % 60);
        getExamQues();
        //交卷与关闭按钮的显示
        $("#pagerSubmitBox").attr("isStart", "yes").removeClass("noStart");
    } else {
        if(window.submit != true){
            Mask.Submit();
            window.submit=true;
            submitResult(2);
        }
    }
}
//获取试题
function getExamQues() {
    if (window.loading == true) return;
    if ($("#pagerArea dl dd").size() > 0) return;
    var urlPath = "/ajax/ExamPager.ashx?timestamp=" + new Date().getTime();
    $.ajax({
        type: "POST", url: urlPath, dataType: "text",
        data: { examid: examID, tpid: testPagerID, stid: stid },
        //开始，进行预载
        beforeSend: function (XMLHttpRequest, textStatus) {
            window.loading = true;
            Mask.Loading();
        },
        //加载出错
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        //加载成功！
        success: function (data) {
            if (data == "2") {
                alert("您已经交过卷了！");
            } else {
                var ques = eval("(" + data + ")");
                //输出试题
                var quesBox = $("#pagerArea");
                var hanzi = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
                for (var i = 0; i < ques.length; i++) {
                    var q = ques[i].ques[0];
                    if (q != null && q != undefined && q != '') {
                        q.Qus_Title = q.Qus_Title.replace(/&quot;/ig, "\"");
                    }
                    var func = eval("setQuestionLoyout" + ques[i].type);
                    if ("undefined" != typeof (func)) quesBox.append(func(ques[i], i, hanzi[i]));
                }
                //给试题加上序号
                quesBox.find(".order").each(function (index) {
                    $(this).html(index + 1);
                });
                //设置头部条
                setQuestionTitleBar(ques);
                //设置答题卡
                setCardQues();
                //答题时的事件
                quesEvent();
                //获取已经做好的试题
                getResult();
                //交卷事件
                $("#pagerSubmitBox").click(function () {
                    var n = $("#cardBox dd[ans]").size();
                    var sum = $("#cardBox dd").size();
                    if (n < sum) {
                        if (confirm("您还有" + (sum - n) + "道题没有做，确定交卷吗？"))
                            submitResult(2);
                    } else {
                        submitResult(2);
                    }
                });
                Mask.LoadingClose();
            }
        }
    });
}
//设置试卷顶部的条，供选择大题
function setQuestionTitleBar(ques) {
    var tit = $("#pagerTitle");
    tit.html("");
    $("#pagerArea dl").each(function () {
        var name = $(this).find("dt b").text();
        tit.append("<div class=\"type\" type='" + $(this).attr("type") + "'>" + name + "</div>");
    });
    tit.find("div.type:first").addClass("typeCurrent");
    tit.find("div.type").click(function () {
        var type = $(this).attr("type");
        var dl = $("#pagerArea dl[type=" + type + "]");
        var off = dl.offset();
        $(window).scrollTop(off.top - tit.height() - 15);
    });
    $(window).scroll(function () {
        var top = $(window).scrollTop() + $("#pagerTitle").height();
        var winhg = $(window).height() * 0.7;
        var currType = $("#pagerTitle div.typeCurrent").attr("type");
        $("#pagerArea dl").each(function () {
            var off = $(this).offset();
            if (off.top > top && (off.top - $(window).scrollTop()) < winhg) {
                currType = $(this).attr("type");
                return false;
            }
        });
        $("#pagerTitle div.type").removeClass("typeCurrent");
        $("#pagerTitle div[type=" + currType + "]").addClass("typeCurrent");
    });
}
//设置答题卡
function setCardQues() {
    var tit = $("#cardBox");
    $("#pagerArea dl").each(function () {
        var name = $(this).find("dt b").text();
        var num = $(this).find("dt span").text();
        tit.append("<div class=\"quesType\" type='" + $(this).attr("type") + "'>"
        + "<div class='tit'>" + name + "</div><div class='num'>" + num + "</div></div>");
        var tm = "<dl type='" + $(this).attr("type") + "' count='" + $(this).attr("count") + "' number='" + $(this).attr("number") + "'>";
        $(this).find("dd").each(function () {
            var order = $(this).find(".order").text();
            tm += "<dd qid='" + $(this).attr("qid") + "' num='" + $(this).attr("number") + "'>" + order + "</dd>";
        });
        tit.append(tm + "</dl>");
    });
    //当点击试题分类时，定位试卷到指定位置
    tit.find("div.quesType").click(function () {
        var type = $(this).attr("type");
        var dl = $("#pagerArea dl[type=" + type + "]");
        var off = dl.offset();
        $(window).scrollTop(off.top - $("#pagerTitle").height() - 15);
    });
    //当点击试题时，定位试卷到指定位置
    tit.find("dd").click(function () {
        var qid = $(this).attr("qid");
        var dd = $("#pagerArea dd[qid=" + qid + "]");
        var off = dd.offset();
        $(window).scrollTop(off.top - $("#pagerTitle").height() - 12);
    });
    $(".quesCard").show();
}

/*
试题展示
*/
//设置对试题的把握程序
function setQuesBtn(qusid) {
    //按钮
    var html = "<div class='btnBox' qid=\"" + qusid + "\">";
    html += "<div class='tit'>您是否对该题有把握：</div>";
    html += "<div class='btn sure1' level='1'>非常有把握</div>";
    html += "<div class='btn sure2' level='2'>没有把握</div>";
    html += "<div class='btn sure3' level='3'>完全靠瞎蒙</div>";
    html += "</div>";
    return html;
}
//单选题
function setQuestionLoyout1(qitem, typeIndex, indexHanzi) {
    var html = "<dl type='" + qitem.type + "' count='" + qitem.count + "' number='" + qitem.number + "'><dt>" 
    + indexHanzi + "、<b>单选题</b>（本大题共" + qitem.count + "道小题，<span>每小题"
    + (Math.floor(qitem.number / qitem.count * 10) / 10) + "分，共" + qitem.number + "分</span>）</dt>";
    for (var i = 0; i < qitem.ques.length; i++) {
        var q = qitem.ques[i];
        html += "<dd qid='" + q.Qus_ID + "' number='" + q.Qus_Number + "'>";
        html += "<div class='titleBox'><div class='order'></div><div class='title'>" + q.Qus_Title + "（" + q.Qus_Number + "分）</div></div>";
        //选项
        html += "<div class='itemBox'>";
        var answer = q.Answer;
        for (var j = 0; j < answer.length; j++) {
            html += "<div class=\"ansItem\" ansid=\"" + answer[j].Ans_ID + "\">";
            html += "<div class='char' >" + String.fromCharCode(65 + j) + "、</div>"
            html += "<div class=\"ansItemContext\">" + answer[j].Ans_Context + "</div></div>";
        }
        html += "</div>";
        html += setQuesBtn(q.Qus_ID);
        html += "</dd>";
    }
    html + "</dl>";
    return html;
}
function setQuestionLoyout2(qitem, typeIndex, indexHanzi) {
    var html = "<dl type='" + qitem.type + "' count='" + qitem.count + "' number='" + qitem.number + "'><dt>" 
    + indexHanzi + "、<b>多选题</b>（本大题共"
    + qitem.count + "道小题，<span>每小题" + (Math.floor(qitem.number / qitem.count * 10) / 10) + "分，共" + qitem.number + "分</span>）</dt>";
    for (var i = 0; i < qitem.ques.length; i++) {
        var q = qitem.ques[i];
        html += "<dd qid='" + q.Qus_ID + "' number='" + q.Qus_Number + "'>";
        html += "<div class='titleBox'><div class='order'></div><div class='title'>" + q.Qus_Title + "（" + q.Qus_Number + "分）</div></div>";
        //选项
        html += "<div class='itemBox'>";
        var answer = q.Answer;
        for (var j = 0; j < answer.length; j++) {
            html += "<div class=\"ansItem\" ansid=\"" + answer[j].Ans_ID + "\">";
            html += "<div class='char'>" + String.fromCharCode(65 + j) + "、</div>"
            html += "<div class=\"ansItemContext\">" + answer[j].Ans_Context + "</div></div>";
        }
        html += "</div>";
        html += setQuesBtn(q.Qus_ID);
        html += "</dd>";
    }
    return html;
}
function setQuestionLoyout3(qitem, typeIndex, indexHanzi) {
    var html = "<dl type='" + qitem.type + "' count='" + qitem.count + "' number='" + qitem.number + "'><dt>" 
    + indexHanzi + "、<b>判断题</b>（本大题共"
    + qitem.count + "道小题，<span>每小题" + (Math.floor(qitem.number / qitem.count * 10) / 10) + "分，共" + qitem.number + "分</span>）</dt>";
    for (var i = 0; i < qitem.ques.length; i++) {
        var q = qitem.ques[i];
        html += "<dd qid='" + q.Qus_ID + "' number='" + q.Qus_Number + "'>";
        html += "<div class='titleBox'><div class='order'></div><div class='title'>" + q.Qus_Title + "（" + q.Qus_Number + "分）</div></div>";
        //按钮
        html += "<div class='itemBox'>";
        html += "<div class='ansbtn' ansid=\"0\">正确</div>";
        html += "<div class='ansbtn' ansid=\"1\">错误</div>";
        html += "</div>";
        html += setQuesBtn(q.Qus_ID);
        html += "</dd>";
    }
    return html;
}
function setQuestionLoyout4(qitem, typeIndex, indexHanzi) {
    var html = "<dl type='" + qitem.type + "' count='" + qitem.count + "' number='" + qitem.number + "'><dt>" 
    + indexHanzi + "、<b>简答题</b>（本大题共"
    + qitem.count + "道小题，<span>每小题" + (Math.floor(qitem.number / qitem.count * 10) / 10) + "分，共" + qitem.number + "分</span>）</dt>";
    for (var i = 0; i < qitem.ques.length; i++) {
        var q = qitem.ques[i];
        html += "<dd qid='" + q.Qus_ID + "' number='" + q.Qus_Number + "'>";
        html += "<div class='titleBox'><div class='order'></div><div class='title'>" + q.Qus_Title + "（" + q.Qus_Number + "分）</div></div>";
        //选项
        html += "<div class='itemBox'>";
        html += "<textarea name=''></textarea>";
        html += "</div>";
        html += setQuesBtn(q.Qus_ID);
        html += "</dd>";
    }
    return html;
}
function setQuestionLoyout5(qitem, typeIndex, indexHanzi) {
    var html = "<dl type='" + qitem.type + "' count='" + qitem.count + "' number='" + qitem.number + "'><dt>" 
    + indexHanzi + "、<b>填空题</b>（本大题共"
    + qitem.count + "道小题，<span>每小题" + (Math.floor(qitem.number / qitem.count * 10) / 10) + "分，共" + qitem.number + "分</span>）</dt>";
    for (var i = 0; i < qitem.ques.length; i++) {
        var q = qitem.ques[i];
        html += "<dd qid='" + q.Qus_ID + "' number='" + q.Qus_Number + "'>";
        html += "<div class='titleBox'><div class='order'></div><div class='title'>" + q.Qus_Title + "（" + q.Qus_Number + "分）</div></div>";
        //选项
        html += "<div class='itemBox'>";
        var answer = q.Answer;
        for (var j = 0; j < answer.length; j++) {
            html += "<div class=\"ansItem5\" ansid=\"" + answer[j].Ans_ID + "\"><div class=\"ansItemContext\">";
            html += "（" + (j + 1) + "）&nbsp;"
            html += "<input name='' type='text' class='textbox' />";
            html += "</div></div>";
        }
        html += "</div>";
        html += setQuesBtn(q.Qus_ID);
        html += "</dd>";
    }
    return html;
}

/*答题时的事件处理*/
function quesEvent() {
    //单选题的事件
    $("#pagerArea dl[type=1] dd .itemBox .ansItem").click(function () {
        $(this).parent().find(".ansItem").removeClass("type1Over");
        $(this).addClass("type1Over");
        //试题id
        var dd = $(this).parents("dd[qid]");
        var qid = dd.attr("qid");
        //操作答题卡 
        var box = $("#cardBox dd[qid=" + qid + "]");
        box.attr("ans", $(this).attr("ansid"));
        dd.find(".btnBox .sure2").click();
        //计算完成的题数
        $("#CompleteNumber").text($("#cardBox dd[ans]").size());
        submitResult(1);
    });
    //多选题的事件
    $("#pagerArea dl[type=2] dd .itemBox .ansItem").click(function () {
        $(this).toggleClass("type1Over");
        var qid = $(this).parent().parent().attr("qid");
        //确定的答题
        var ansid = "";
        $(this).parent().find(".type1Over").each(function () {
            ansid += $(this).attr("ansid") + ",";
        });
        //操作答题卡 
        var box = $("#cardBox dd[qid=" + qid + "]");
        if (ansid.indexOf(",") > -1 && ansid.split(",").length > 2) {
            box.attr("ans", ansid);
            $(this).parent().parent().find(".btnBox .sure2").click();
        } else {
            box.removeAttr("ans").removeAttr("class");
        }
        //计算完成的题数
        $("#CompleteNumber").text($("#cardBox dd[ans]").size());
        submitResult(1);
    });
    //判断
    $("#pagerArea dl[type=3] dd .itemBox .ansbtn").click(function () {
        $(this).parent().find(".seleted[ansid!=" + $(this).attr("ansid") + "]").removeClass("seleted");
        $(this).toggleClass("seleted");
        var dd = $(this).parents("dd[qid]");
        var qid = dd.attr("qid");
        //操作答题卡 
        var box = $("#cardBox dd[qid=" + qid + "]");
        if ($(this).parent().find(".seleted").size() > 0) {
            box.attr("ans", $(this).attr("ansid"));
            dd.find(".btnBox .sure2").click();
        } else {
            box.removeAttr("ans").removeAttr("class");
        }
        //计算完成的题数
        $("#CompleteNumber").text($("#cardBox dd[ans]").size());
        submitResult(1);
    });
    //简答
    $("#pagerArea dl[type=4] dd .itemBox textarea").focusout(function () {
        var dd = $(this).parents("dd[qid]");
        var qid = dd.attr("qid");
        var ansid = $.trim($(this).val());
        //操作答题卡 
        var box = $("#cardBox dd[qid=" + qid + "]");
        if (ansid.length > 0) {
            box.attr("ans", ansid);
            dd.find(".btnBox .sure2").click();
        } else {
            box.removeAttr("ans").removeAttr("class");
        }
        //计算完成的题数
        $("#CompleteNumber").text($("#cardBox dd[ans]").size());
        submitResult(1);
    });
    //填空
    $("#pagerArea dl[type=5] dd .itemBox .textbox").focusout(function () {
        var dd = $(this).parents("dd[qid]");
        var qid = dd.attr("qid");
        var ansid = "";
        dd.find(".textbox[value!='']").each(function () {
            ansid += $(this).val() + ",";
        });
        //操作答题卡 
        var box = $("#cardBox dd[qid=" + qid + "]");
        if (ansid.indexOf(",") > -1) {
            box.attr("ans", ansid);
            dd.find(".btnBox .sure2").click();
        } else {
            box.removeAttr("ans").removeAttr("class");
        }
        //计算完成的题数
        $("#CompleteNumber").text($("#cardBox dd[ans]").size());
        submitResult(1);
    });
    //把握度的按钮
    $("#pagerArea .btnBox .btn").click(function () {
        //试题id
        var qid = $(this).parent().attr("qid");
        var level = $(this).attr("level");
        //操作答题卡
        var dd = $("#cardBox dd[qid=" + qid + "]");
        if (dd.attr("ans") != null) {
            dd.attr("class", "level" + level);
            if (level == 1) dd.attr("title", "该题非常有把握");
            if (level == 2) dd.attr("title", "对该题没有把握，请回顾");
            if (level == 3) dd.attr("title", "该题完全靠蒙，祝你好运！");
        } else {
            alert("该题还没有做！");
        }
    });
}

/*
 试卷的提交
*/
//提交答题信息
function submitResult(patter) {
    //提交
    var xml = encodeURIComponent(getResultXml(patter));
    var urlPath = "/ajax/InResult.ashx?timestamp=" + new Date().getTime();
    $.ajax({
        type: "POST", url: urlPath, dataType: "text", data: { result: xml },
        //开始，进行预载
        beforeSend: function (XMLHttpRequest, textStatus) {
            if (patter == 1) Mask.InResult();
            if (patter == 2) Mask.Submit();
        },
        //加载出错
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);
        },
        //加载成功！
        success: function (data) {
            if (Number(data) == 0) alert("考试已经结束，不能提交试卷！");
            if (patter == 1) Mask.InResultClose();
            if (patter == 2) location.replace(location.href);
        }
    });
}
//获取答题信息
//patter:提交方式，1为自动提交，2为交卷
function getResultXml(patter) {
    var res = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
    res += "<results examid=\"" + examID + "\" tpid=\"" + testPagerID
    + "\" stid=\"" + stid + "\"  stname=\"" + stname
    + "\" stsex=\"" + stsex + "\"  stsid=\"" + stsid + "\"  stcardid=\"" + stcardid
    + "\" uid=\"" + uid + "\"  theme=\"" + theme
    + "\" sbjid=\"" + subjectID + "\" sbjname=\"" + subjectName + "\" patter=\"" + patter + "\">";
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


/*
    加载已经做好的答题信息，用于考试中断电异常；
    实现断电不丢答题信息
*/

function getResult() {
    var urlPath = "/ajax/GetResult.ashx?timestamp=" + new Date().getTime();
    $.ajax({
        type: "GET", url: urlPath, dataType: "text",
        data: { examid: examID, tpid: testPagerID, stid: stid },
        //开始，进行预载
        beforeSend: function (XMLHttpRequest, textStatus) {
            Mask.Loading();
        },
        //加载出错
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("错误："+textStatus);
        },
        //加载成功！
        success: function (data) {
            if (data != "0") {               
                var ques = eval("(" + data + ")");  
                setResultState(ques);              
                Mask.LoadingClose();
            }
            submitResult(1);
        }
    });
}
//设置答题的状态
function setResultState(ques) {
    for(var tm in ques){
        var q=ques[tm];
        var dd = $("#cardBox dd[qid=" + q.id + "]");
        dd.addClass(q.cls);
        if (q.ans != "") dd.attr("ans", q.ans);
        if (q.type == 1) $("#pagerArea dl dd[qid=" + q.id + "] .ansItem[ansid=" + q.ans + "]").addClass("type1Over");
        if(q.type==2){
            var arr=q.ans.split(",");
            for(var tm in arr)
                $("#pagerArea dl dd[qid=" + q.id + "] .ansItem[ansid=" + arr[tm] + "]").addClass("type1Over");
        }
        if(q.type==3){
            $("#pagerArea dl dd[qid=" + q.id + "] .ansbtn[ansid=" + q.ans + "]").addClass("seleted");
        }
        if(q.type==4){
            $("#pagerArea dl dd[qid=" + q.id + "] textarea").val(q.ans);
        }
        if(q.type==5){
            var arr=q.ans.split(",");
            $("#pagerArea dl dd[qid=" + q.id + "] .textbox").each(function (index) {
                $(this).val(arr[index]);
            });
        }
    }
}