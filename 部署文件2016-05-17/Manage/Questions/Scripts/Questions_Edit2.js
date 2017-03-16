﻿$(function(){
	//提交按钮
	$("input[id$=btnEnter]").click(function(){
		//验证题目是否录入
		if(Number($(".count").text())<1)
		{
			alert("题目不得为空！");
			return false;
		}
		//验证选项是否为空
		var itemNoNumm=0;
		$("input[name$=itemTxt]").each(function(){
			itemNoNumm+=$.trim($(this).val())!="" ? 1 :0;
		});
		if(itemNoNumm<1)
		{
			alert("请填写试题的选择项！");
			return false;
		}
		//是否设置了正确答案
		if($("input[name$=cbAns]:checked").size()<2)
		{
			alert("多选题至少要有两个答案！");
			return false;
		}
		return true;
	});
	_setEvent();
});
//设置一些事件
function _setEvent(){
	$(".wrongInfo").hover(function(){
		var box=$("#wrongInfoBox");
		var off=$(this).offset();
		box.css("position","absolute").css("z-index","20001");
		box.css({width:150,height:200});
		box.css({left:off.left,top:off.top+$(this).height()});
		box.css("background-color","#FFFFCC");
		box.css("padding","5px");
		box.show();
	},function(){
		$("#wrongInfoBox").hide();
	});
}
