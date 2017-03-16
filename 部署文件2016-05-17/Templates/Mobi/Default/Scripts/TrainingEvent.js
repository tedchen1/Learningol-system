$(function () {
    _quesSelectEvent();
    _btnEvent();
});

//试题的选择事件
function _quesSelectEvent() {
    $(".quesItem").each(function () {
        var type = Number($(this).attr("type"));
        //单选题
        if (type == 1) quesEventType1($(this));
        if (type == 2) quesEventType2($(this));
        if (type == 3) quesEventType3($(this));
    });
}
//单选题的选择
function quesEventType1(ansItem) {
    ansItem.find(".answer").click(function () {
        var isSel = $(this).attr("isSel") == "true" ? true : false;
        if (isSel) {
            $(this).attr("isSel", false);
            $(this).removeClass("answerSel");
            $(this).find("span.type").html("&#xf00c6;");
        } else {
            //如要没有选中
            $(this).parent().find(".answer").attr("isSel", false);
            $(this).parent().find(".answer").removeClass("answerSel");
            $(this).parent().find("span.type").html("&#xf00c6;");
            $(this).attr("isSel", true);
            $(this).addClass("answerSel");
            $(this).find("span.type").html("&#xe667;");
        }
        //是否答对
    });
}
//多选题的选择
function quesEventType2(ansItem) {
    ansItem.find(".answer").click(function () {
        var isSel = $(this).attr("isSel") == "true" ? true : false;
        if (isSel) {
            $(this).attr("isSel", false);
            $(this).removeClass("answerSel");
            $(this).find("span.type").html("&#xe603;");
        } else {
            $(this).attr("isSel", true);
            $(this).addClass("answerSel");
            $(this).find("span.type").html("&#xe62a;");
        }
        //是否答对

    });
}
//判断题的选择
function quesEventType3(ansItem) {
    ansItem.find(".answer").click(function () {
        var isSel = $(this).attr("isSel") == "true" ? true : false;
        if (isSel) {
            $(this).attr("isSel", false);
            $(this).removeClass("answerSel");
            $(this).find("span.type").html("&#xe621;");
        } else {
            //如要没有选中
            $(this).parent().find(".answer").attr("isSel", false);
            $(this).parent().find(".answer").removeClass("answerSel");
            $(this).parent().find("span.type").html("&#xe621;");
            $(this).attr("isSel", true);
            $(this).addClass("answerSel");
            $(this).find("span.type").html("&#xe63b;");
        }
        //是否答对
    });
}

/*
界面各各按钮的事件

*/
function _btnEvent() {
    //试题提交
    $("#btnSubmit").click(function () {
        var ques = $(".quesItem[index=" + $("#indexNum").text() + "]");
        var type = ques.attr("type");
        var func = eval("_decide" + type);
        if (func != null) func(ques);
    });
    //查看答案
    $("#btnAnswer").click(function () {
        var qid = $(".quesItem[index=" + $("#indexNum").text() + "]").attr("qid");
        new PageBox("参考答案", "QuesAnswer.ashx?id=" + qid, 80, 60, null).Open();
    });
    //试题解析
    $("#btnExplain").click(function () {
        var qid = $(".quesItem[index=" + $("#indexNum").text() + "]").attr("qid");
        new PageBox("试题解析", "Explain.ashx?id=" + qid, 90, 90, null).Open();
    });
    //收藏
    $("#btnFav").click(function () {
        if (!isLogin) {
            //如果没有登录
            new MsgBox("提示", "未登录状态，不可以收藏试题。", 90, 40, "alert").Open();
        } else {
            var ques = $(".quesItem[index=" + $("#indexNum").text() + "]");
            var qid = ques.attr("qid");
            var isCollect = ques.attr("IsCollect") == "True" ? true : false;
            $.get("AddCollect.ashx", { "qid": qid, "isCollect": isCollect }, function () {
                var ques = $(".quesItem[index=" + $("#indexNum").text() + "]");
                ques.attr("IsCollect", isCollect ? "False" : "True");
                $("#btnFav").toggleClass("IsCollect");
            });
        }
    });
    //笔记
    $("#btnNote").click(function () {
        if (!isLogin) {
            //如果没有登录
            new MsgBox("提示", "未登录状态，不可以编写笔记。", 90, 40, "alert").Open();
        } else {
            var qid = $(".quesItem[index=" + $("#indexNum").text() + "]").attr("qid");
            new PageBox("添加笔记", "AddNote.ashx?id=" + qid, 90, 50, null).Open();
        }
    });
    //报错
    $("#btnError").click(function () {
        var qid = $(".quesItem[index=" + $("#indexNum").text() + "]").attr("qid");
        new PageBox("错误试题提交", "SubmitError.ashx?id=" + qid, 90, 80, null).Open();
    });
    //答题卡
    $("#btnCard").click(function () {
        var box = $("#cardBox");
        box.width($(window).width() - 10).height($(window).height() - 10);
        box.css({ left: 5, top: 5 });
        $("#cardBoxInner").width(box.width() - 20).height(box.height() - 60);
        $("#cardPanel").toggle();
    });
    //答题卡关闭按钮
    $("#cardBoxColse").click(function () {
        $("#cardPanel").hide();
    });
}
//显示答题的正确与否状态
function showResult(ques, isCorrect) {
    if (isCorrect == null) {
        ques.find(".quesAnswerBox").removeClass("error");
        ques.find(".quesAnswerBox").removeClass("correct");
        return;
    }
    //如果正确
    if (isCorrect) {
        ques.find(".quesAnswerBox").addClass("correct");
        ques.find(".quesAnswerBox").removeClass("error");
        //设置答题卡状态
        setCardState("succ", ques.attr("qid"))
    } else {
        //如果错误
        ques.find(".quesAnswerBox").removeClass("correct");
        ques.find(".quesAnswerBox").addClass("error");
        //增加错题
        $.get("AddQues.ashx", { "qid": ques.attr("qid") }, function () {

        });
        //设置答题卡状态
        setCardState("error", ques.attr("qid"))
    }
}
//单选题判断
function _decide1(ques) {
    var selitem = ques.find(".quesAnswerBox .answer[issel=true]");
    if (selitem.size() < 1) {
        //alert("您还没有答题！");
        var msg = new MsgBox("提示", "您还没有答题！", 90, 40, "msg");
        msg.Open();
        showResult(ques, null);
        return;
    }
    showResult(ques, selitem.attr("correct").toLowerCase() == "true");
}
//多选题判断
function _decide2(ques) {
    var selitem = ques.find(".quesAnswerBox .answer[issel=true]");
    if (selitem.size() < 1) {
        var msg = new MsgBox("提示", "您还没有答题！", 90, 40, "msg");
        msg.Open();
        showResult(ques, null);
        return;
    }
    var isCorrect = true;
    var corrItem = ques.find(".quesAnswerBox .answer[correct=True]");
    corrItem.each(function () {
        if ($(this).attr("issel") != "true") isCorrect = false;
    });
    showResult(ques, isCorrect && corrItem.size() == selitem.size());
}
//判断题判断
function _decide3(ques) {
    var selitem = ques.find(".quesAnswerBox .answer[issel=true]");
    if (selitem.size() < 1) {
        var msg = new MsgBox("提示", "您还没有答题！", 90, 40, "msg");
        msg.Open();
        showResult(ques, null);
        return;
    }
    showResult(ques, selitem.attr("correct").toLowerCase() == "true");
}
//简答题判断
function _decide4(ques) {
    new MsgBox("提示", "简答题不自动判题！无须提交。", 90, 40, "msg").Open();
}
//填空题判断
function _decide5(ques) {
    var selitem = ques.find(".quesAnswerBox .answer");
    //是否答题
    var iswrite = true;
    selitem.each(function () {
        if ($.trim($(this).find("input[type=text]").val()) != "") iswrite = false;
    });
    if (iswrite) {
        new MsgBox("提示", "您还没有答题！", 90, 40, "msg").Open();
        showResult(ques, null);
        return;
    }
    //是否正确
    var isCorrect = true;
    selitem.each(function () {
        var correct = $(this).attr("correct").toLowerCase();
        var answer = $.trim($(this).find("input[type=text]").val()).toLowerCase();
        if (correct != answer) iswrite = false;
    });
    showResult(ques, isCorrect);
}