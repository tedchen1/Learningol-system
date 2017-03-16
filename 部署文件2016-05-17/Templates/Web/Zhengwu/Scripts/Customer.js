/*
	**故障告警
	**
*/
$(
	function()
	{
		_SetCustomerInterval();
		setInterval("_SetCustomerInterval()",6000);
	}
);

function _SetCustomerInterval()
{
	var box=$("#Customer");
	box.height(box.parent().height()-10);
	getCustomerItem(0,box);
}
//获取信息
function getCustomerItem(count,element)
{
	var urlPath="json/Customer.aspx?&count="+count+"&timestamp=" + new Date().getTime();
	$.ajax({
			type: "Get",
			url: urlPath,
			dataType: "text",
			data:{},
			//加载出错
			error: function(XMLHttpRequest, textStatus, errorThrown){			 		
			},
			//加载成功！
			success: function(data) {	
			  	element.html(BuildCustomerList(eval(data)));	
				setDataItemEvent(element);
			}
	}); 	
}
//生成
function BuildCustomerList(data)
{
	var html="";
	for(var i=0; i<data.length; i++)
	{
		html+="<dd class=\"s"+(data[i].state+1)+"\"><a href=\"#\" itemid=\""+data[i].id+"\" title=\""+data[i].title+"\">";
		html+= (i+1) +". ";		
		html+=data[i].title;
		html+="</a></dd>";
	}
	//alert(html);
	return html;
}