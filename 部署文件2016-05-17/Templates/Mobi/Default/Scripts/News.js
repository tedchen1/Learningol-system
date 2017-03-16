
$(function () {
    _initAjax();
    var value=0;
    $(".contextbox").width($(".context").width()-20);
    $(".contextbox").height($(".context").height()-30);
    //手势滑动加载新的资讯
    $(".contextbox").swipe({
        swipeStatus:function(event, phase, direction, distance, duration,fingerCount) {
            //$(".morebox").html("你用"+fingerCount+"个手指以"+duration+"秒的速度向" + direction + "滑动了" +distance+ "像素 " +"你在"+phase+"中");
            var speed=Math.round((600/duration<1 ? 1 :600/duration)*distance);
            if(phase=="start"){
                value =Number($(".newsBox").css("top").replace("px", ""));
                value = isNaN(value) ? 0 : value;
            }
            if(phase=="move"){
                if(direction=="down") {
                    if(distance<$(window).height()/4)
                        $(".newsBox").css({top: value + speed});
                }
                if(direction=="up") {
                    var top =Number($(".newsBox").css("top").replace("px", ""));
                    top = isNaN(top) ? 0 : top;
                    if(($(".newsBox").height()+top)>($(".contextbox").height())/3*2) {
                        $(".newsBox").css({top: value - speed});
                    }else{
                        if($(".moreShow:visible").size()<1)return;
                        var more=$(".morebox");
                        var isClick =  more.attr("isClick") != "true" ? false : true;
                        if (!isClick) {
                            more.attr("isClick", true);
                            more.show();
                            _initAjax();
                        }
                    }
                }
            }
            if((phase=="end" || phase=="cancel")) {
                value =Number($(".newsBox").css("top").replace("px", ""));
                value = isNaN(value) ? 0 : value;
                if (value >= 0){ value = 0;}else {
                    if ($(".newsBox").height() + value < $(".contextbox").height())
                        value = $(".contextbox").height()-$(".newsBox").height();
                }
                $(".newsBox").animate({top: value}, function () {

                });
            }
        }
    });
});

function _initAjax() {
    var urlPath = "/ajax/News.ashx?timestamp=" + new Date().getTime();
    var size = ($(".context").height() - 60) / 35;
    var index = Number($(".contextbox").attr("index"))+1;
    if (isNaN(index))index=1;
    $.ajax({
        type: "GET", url: urlPath, dataType: "text",
        data: { size: Math.floor(size), index: index },
        //开始，进行预载
        beforeSend: function (XMLHttpRequest, textStatus) {
            //Mask.Loading();
            $(".moreShow").hide();
        },
        //加载出错
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("错误：" + textStatus);
        },
        //加载成功！
        success: function (data) {
            var json = eval("(" + data + ")");
            fillNews(json);
        }
    });
}
function fillNews(json) {
    var box = $(".newslist");
    //记录总数
    box.attr("sum", json.sum).attr("index",json.index);
    var maxOrder=Number(box.find("dd:last").find("span[type=order]").html());
    maxOrder = isNaN(maxOrder) ? 0 : maxOrder;
    //对象数组
    var arr = json.object;
    var tm = "";
    for (var i = 0; i < arr.length; i++) {
        tm += "<dd>";
        var order=numberToString(i+1+maxOrder,2);
        tm += "<div href='article.ashx?id=" + arr[i].Art_Id+"'><span type='order' class='b04b09'>"+order+"</span> " + arr[i].Art_Title + "</div>";
        tm += "</dd>";
    }
    box.append(tm);
    box.find("dd div").click(function(){
        var href=$(this).attr("href");
        window.location.href=href;
    });
    var show=$(".moreShow");
    box.find("dd").size() >= json.sum ? show.hide() : show.show();
    var more = $(".morebox");
    more.attr("isClick", false);
    more.hide();
}
//数字转字符
function numberToString(number,leng){
    var tm=number.toString();
    while(tm.length<leng){
        tm="0"+tm;
    }
    return tm;
}