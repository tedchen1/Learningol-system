$(function () {
    _initTraning();
    var fixLeft = 0;
    //试题的手势滑动切换
    $(".context").swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingerCount) {
            //$(this).text("你用"+fingerCount+"个手指以"+duration+"秒的速度向" + direction + "滑动了" +distance+ "像素 " +"你在"+phase+"中");
            //试题区域的上下滑动，主要用于当于试题太长时
            quesItemUpDown(event, phase, direction, distance, duration, fingerCount);
            //左右滑动
            var speed = Math.round((400 / duration < 1 ? 1 : 400 / duration) * distance);
            speed = speed > $(".quesItem").width() ? $(".quesItem").width() : speed;
            if (phase == "start") {
                fixLeft = Number($("#quesArea").css("left").replace("px", ""));
                fixLeft = isNaN(fixLeft) ? 0 : fixLeft;
            }
            if (phase == "move") {
                var area = $("#quesArea");
                if (direction == "left") $("#quesArea").css({ left: fixLeft - speed });
                if (direction == "right") $("#quesArea").css({ left: fixLeft + speed });
            }
            if ((phase == "end" || phase == "cancel")) {
                fixLeft = Number($("#quesArea").css("left").replace("px", ""));
                fixLeft = isNaN(fixLeft) ? 0 : fixLeft;
                if (fixLeft >= 0) fixLeft = 0;
                var maxWd = -$(window).width() * ($(".quesItem").size() - 1);
                if (fixLeft < maxWd) fixLeft = maxWd;
                if (fixLeft < 0 && fixLeft > maxWd) {
                    var index = Math.round(Math.abs(fixLeft) / $(".quesItem").width());
                    fixLeft = -index * $(".quesItem").width();
                }
                $("#quesArea").animate({ left: fixLeft }, function () {
                    var index = Math.round(Math.abs(fixLeft) / $(".quesItem").width());
                    $("#indexNum").text(index + 1);
                    var qitem = $(".quesItem[index=" + (index + 1) + "]");
                    //试题类型的显示切换
                    $("#quesType span[type=" + qitem.attr("type") + "]").show();
                    $("#quesType span[type!=" + qitem.attr("type") + "]").hide();
                    //试题是否收藏的显示切换
                    var isCollect = qitem.attr("IsCollect") == "True" ? true : false;
                    if (isCollect) {
                        $("#btnFav").addClass("IsCollect");
                    } else {
                        $("#btnFav").removeClass("IsCollect");
                    }
                    //当前试题的答题卡选块
                    setCardState("curr")
                });
            }
        }
    });
});

//试题区域的上下滑动，主要用于当于试题太长时
function quesItemUpDown(event, phase, direction, distance, duration, fingerCount) {
    if (phase == "move") {
        //当前显示的试题
        var qus = $(".quesItem[index=" + $("#indexNum").text() + "]");
        var box = qus.find(".quesBox");
        var topnum = Number(box.css("top").replace("px", ""));
        topnum = isNaN(topnum) ? 0 : topnum;
        if (direction == "down") {
            if (topnum < 0) qus.find(".quesBox").css({ top: topnum + distance });
        }
        if (direction == "up") {
            if ((box.height() + topnum + 30) > qus.height())
                qus.find(".quesBox").css({ top: topnum - distance });
        }
        //$(".showTxt").text(topnum+"  "+qus.height());
    }
    if ((phase == "end" || phase == "cancel")) {
        //当前显示的试题
        var qus = $(".quesItem[index=" + $("#indexNum").text() + "]");
        var box = qus.find(".quesBox");
        var topnum = Number(box.css("top").replace("px", ""));
        topnum = isNaN(topnum) ? 0 : topnum;
        if (direction == "down") {
            if (topnum >= 0) qus.find(".quesBox").css({ top: 0 });
            //if((box.height()+topnum+30)<qus.height())
            //qus.find(".quesBox").css({top:topnum});
        }
        if (direction == "up") {
            //if((box.height()+topnum+30)>qus.height())
            //qus.find(".quesBox").css({top:box.height()+30});
            //if (topnum < 0)qus.find(".quesBox").css({top: topnum});

        }
        // $(".showTxt").text(topnum+"  "+qus.height());
    }
}
//初始化界面
function _initTraning() {
    //设置试题宽度
    var wd = $(window).width();
    var hg = $(".context").height();
    var qitem = $(".quesItem");
    qitem.width(wd).height(hg);
    $("#quesArea").width(qitem.width() * qitem.size());
    //设置初始的题型
    var firstQitem = $(".quesItem:first");
    $("#quesType span[type=" + firstQitem.attr("type") + "]").show();
    $("#quesType span[type!=" + firstQitem.attr("type") + "]").hide();
    //试题是否收藏的显示切换
    var isCollect = qitem.attr("IsCollect") == "True" ? true : false;
    if (isCollect) {
        $("#btnFav").addClass("IsCollect");
    } else {
        $("#btnFav").removeClass("IsCollect");
    }
    buildCard();
    setCardState("curr");
}
//生成答题卡
function buildCard() {
    //试题类型
    var types = getQuesType();
    var box = $("#cardBoxInner");
    for (var i = 0; i < types.length; i++) {
        box.append("<div class='typeName'>" + types[i].name + "</div>");
        var ques = $(".quesItem[type=" + types[i].type + "]");
        var html = "<dl type='" + types[i].type + "' count='" + ques.size() + "' number='" + 0 + "'>"
        ques.each(function () {
            var num = $(this).find("span.num").html();
            html += "<dd qid='" + $(this).attr("qid") + "' num='" + num + "'>" + $(this).attr("index") + "</dd>";
        });
        html += "</dl>";
        box.append(html);
    }
    box.find("dl dd").click(function () {
        var index = $(this).html();
        var fixLeft = (index - 1) * $(".quesItem").width();
        $("#quesArea").css({ left: -fixLeft });
        //
        var index = Math.round(Math.abs(fixLeft) / $(".quesItem").width());
        $("#indexNum").text(index + 1);
        var qitem = $(".quesItem[index=" + (index + 1) + "]");
        //试题类型的显示切换
        $("#quesType span[type=" + qitem.attr("type") + "]").show();
        $("#quesType span[type!=" + qitem.attr("type") + "]").hide();
        //试题是否收藏的显示切换
        var isCollect = qitem.attr("IsCollect") == "True" ? true : false;
        if (isCollect) {
            $("#btnFav").addClass("IsCollect");
        } else {
            $("#btnFav").removeClass("IsCollect");
        }
        $("#cardPanel").hide();
        setCardState("curr");
    })
}
//设置答题卡状态
//state:curr当前试题，succ正确，error错误,null默认状态
//qid:试题的id
function setCardState(state, qid) {
    //如果没有指明试题id，则取当前显示的试题
    if (qid == null) {
        var index = $("#indexNum").text();
        var qitem = $(".quesItem[index=" + index + "]");
        qid = qitem.attr("qid");
    }
    //获取当前试题的答题卡选块
    var box = $("#cardBoxInner dd[qid=" + qid + "]");
    if (box == null || box.size() < 1) return;
    //设置当前试题的答题卡选块状态
    if (state == "curr") {
        $("#cardBoxInner dd").removeClass("curr");
        box.addClass("curr");
    }
    if (state == "succ") {
        box.addClass("succ");
    }
    if (state == "error") {
        box.addClass("error");
    }
}
//获取试题类型
function getQuesType() {
    var types = new Array();
    var qus = $(".quesItem");
    qus.each(function () {
        var type = $(this).attr("type");
        var name = $.trim($("#quesType").find("span[type=" + type + "]").html());
        var isExist = false;
        for (var i = 0; i < types.length; i++) {
            if (types[i].type == type) {
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            types.push({ type: type, name: name });
        }
    });
    return types;
}