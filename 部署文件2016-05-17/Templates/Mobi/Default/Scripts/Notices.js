
$(function () {
    _initAjax();
    $(".morebox").click(function () {
        var isClick = $(this).attr("isClick") != "true" ? false : true;
        if (!isClick) {
            $(this).attr("isClick", true);
            _initAjax();            
        }
    });
});

function _initAjax(index) {
    var urlPath = "/ajax/Notices.ashx?timestamp=" + new Date().getTime();
    var size = ($(".context").height() - 30) / 30;
    var index = Number($(".contextbox").attr("index")) + 1;
    $.ajax({
        type: "GET", url: urlPath, dataType: "text",
        data: { size: Math.floor(size), index: index },
        //开始，进行预载
        beforeSend: function (XMLHttpRequest, textStatus) {
            //Mask.Loading();
        },
        //加载出错
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("错误：" + textStatus);
        },
        //加载成功！
        success: function (data) {
            if (data != "0") {
                var json = eval("(" + data + ")");
                setLoyout(json);
            }
        }
    });
}
function setLoyout(json) {
    var box = $(".contextbox");
    //记录总数
    box.attr("sum", json.sum).attr("index", json.index);
    //对象数组
    var arr = json.object;
    var tm = "";
    for (var i = 0; i < arr.length; i++) {
        tm += "<dd>";
        tm += "<a href='notice" + arr[i].No_Id + ".htm'><span class='iconfont'>&#xe6c6;</span> " + arr[i].No_Ttl + "</a>";
        tm += "</dd>";
    }
    box.append(tm);
    var more = $(".morebox");
    box.find("dd").size() >= json.sum ? more.hide() : more.show();
    more.attr("isClick", false);
}