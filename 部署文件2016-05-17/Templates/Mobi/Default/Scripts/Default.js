
$(function(){
    _initMainMenuevent();
});

//初始化
function _initMainMenuevent() {
   $(".listBox dl").click(function(){
       var link=$(this).find("a");
       window.location.href=link.attr("href");
   });
}