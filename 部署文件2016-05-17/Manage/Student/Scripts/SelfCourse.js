$(function(){
	
	//取消课程学习的按钮事件
	$(".item a.selected").click(function(){
		
		if(confirm("是否确定中止该课程的学习？")){
			return true;
		}
		return false;
	});
});