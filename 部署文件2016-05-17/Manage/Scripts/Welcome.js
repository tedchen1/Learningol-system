$(function(){
		titleOpen();
		workItemOpen();		
		messageOpen();
});

//常用工作项，最近工作项的点击事件，打开新窗口
function workItemOpen()
{
	var workItem=$(".workItem a");
	workItem.click(
		function()
			{				
				var name=$(this).text();
				var id=$(this).attr("menuId");
				//下述方法来自于父窗口，panel/Scripts/loyout.js
				window.parent.OpenPagePanel(name,id);
				return false;
			}
	);
}
//短消息的点击事件，打开新窗口
function messageOpen()
{
	var message=$("#messageBox .boxContent a");
	message.click(
		function()
			{				
				var title=$(this).text();
				if(title.length>20)
				{
					title=title.substring(0,20)+"...";
				}
				var id=$(this).attr("messageid");
				var link="/Manage/Common/Message_edit.aspx?id="+id;
				//下述方法来自于父窗口，panel/Scripts/loyout.js
				new window.parent.PageBox("短消息："+title,link,50,66).Open();
				return false;
			}
	);
}
//点击标题时，打开pagePanel
function titleOpen()
{
	var tile=$(".boxBar a");
	tile.click(
		function()
			{				
				var name=$(this).text();
				//下述方法来自于父窗口，panel/Scripts/loyout.js
				window.parent.OpenPagePanel(name);
				return false;
			}
	);
}