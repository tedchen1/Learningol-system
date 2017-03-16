
$(function () {
    _btnEvent();
});

function _btnEvent(){
    //删除笔记
    $(".delete").click(function(){
        return confirm("是否确定删除？");
    });
    //编辑笔记
    $(".btnEdit").click(function(){
        var stnid=$(this).attr("stnid");
        new PageBox("编辑笔记","AddNote.ashx?stnid="+stnid,90,50,null).Open();
    });
    //查看试题
    $("div[btn=view]").click(function(){
        var qid=$(this).attr("qid");
        new PageBox("查看试题","Questions.ashx?qid="+qid,90,90,null).Open();
    });
}