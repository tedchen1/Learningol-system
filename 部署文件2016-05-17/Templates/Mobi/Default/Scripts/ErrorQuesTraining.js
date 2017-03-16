$(function() {
    _initTraning();
    var fixLeft=0;
    //试题的手势滑动切换
    $(".context").swipe({
        swipeStatus:function(event, phase, direction, distance, duration,fingerCount) {
            var speed=Math.round((600/duration<1 ? 1 :600/duration)*distance);
            //$(".ctlBtn").html("你用"+fingerCount+"个手指以"+duration+"秒的速度向" + direction + "滑动了" +distance+ "像素 " +"你在"+phase+"中");
            if(phase=="move"){
                var area=$("#quesArea");
                if(direction=="left")$("#quesArea").css({left:fixLeft-speed});
                if(direction=="right") $("#quesArea").css({left: fixLeft + speed});
            }
            if((phase=="end" || phase=="cancel")) {
                fixLeft =Number($("#quesArea").css("left").replace("px", ""));
                fixLeft = isNaN(fixLeft) ? 0 : fixLeft;
                if (fixLeft >= 0) fixLeft = 0;
                var maxWd = -$(window).width() * ($(".quesItem").size() - 1);
                if (fixLeft < maxWd) fixLeft = maxWd;
                if (fixLeft < 0 && fixLeft > maxWd) {
                    var index = Math.round(Math.abs(fixLeft) / $(".quesItem").width());
                    fixLeft = -index * $(".quesItem").width();
                }
                $("#quesArea").animate({left: fixLeft}, function () {
                    var index = Math.round(Math.abs(fixLeft) / $(".quesItem").width());
                    $("#indexNum").text(index + 1);
                    var qitem = $(".quesItem[index=" + (index + 1) + "]");
                    //试题类型的显示切换
                    $("#quesType span[type=" + qitem.attr("type") + "]").show();
                    $("#quesType span[type!=" + qitem.attr("type") + "]").hide();
                    //试题是否收藏的显示切换
                    var isCollect=qitem.attr("IsCollect")=="True" ? true : false;
                    if(isCollect){
                        $("#btnFav").addClass("IsCollect");
                    }else{
                        $("#btnFav").removeClass("IsCollect");
                    }
                });
            }
        }
    });

});
//初始化界面
function _initTraning() {
    //设置试题宽度
    var wd =$(window).width();
    var hg=$(".context").height();
    var qitem=$(".quesItem");
    qitem.width(wd).height(hg);
    $("#quesArea").width(qitem.width()*qitem.size());
    //设置初始的题型
    var qid=$().getPara("qid");
    var firstQitem=$(".quesItem[qid="+qid+"]");
    if(firstQitem.size()<1)firstQitem=$(".quesItem:first");
    $("#quesType span[type="+firstQitem.attr("type")+"]").show();
    $("#quesType span[type!="+firstQitem.attr("type")+"]").hide();
    //当前初始是哪道题，哪道题首先显示，以及其序号
    var index=Number(firstQitem.attr("index"));
    var fixLeft=(index-1)*qitem.width();
    $("#quesArea").css({left: -fixLeft});
    $("#indexNum").text(index);
    //试题是否收藏的显示切换
    var isCollect=firstQitem.attr("IsCollect")=="True" ? true : false;
    if(isCollect){
        $("#btnFav").addClass("IsCollect");
    }else{
        $("#btnFav").removeClass("IsCollect");
    }
}