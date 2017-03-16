$(function(){
    _inputVerifyEvent();
    _setEvent();
});
//输入验证
function _inputVerifyEvent(){
    //提交按钮
    $("input[id$=btnEnter]").click(function(){
        //验证题目是否录入
        if(Number($(".count").text())<1){
            alert("题目不得为空！");
            return false;
        }else {
            return _verifyParentheses();
        }
        //是否设置了正确答案
        var isNull=true;
        $("input[name$=itemTxt]").each(function(){
            if($.trim($(this).val())!="")isNull=false;

        });
        if(isNull){
            alert("请填写答案！");
            $("input[name$=itemTxt]:first").focus();
            return false;
        }
        return false;
    });
}
//验证是否有成对的括号
function _verifyParentheses(){
    var str = tbTitle.text();
    str=str.replace(/\(/ig,"（");
    str=str.replace(/\)/ig,"）");
    tbTitle.text(str)
    if(str.indexOf("（")<0 || str.indexOf("）")<0) {
        alert("题目中缺少填空项，填空用括号表示。例如：（   ）\n注：括号应成对出现，且不得嵌套。");
        return false;
    }
    var count=0;
    while(str.indexOf("（")>-1 && str.indexOf("）")>-1) {
        var tm= str.substring(str.indexOf("（") + 1);
        if(tm.indexOf("）")<0) {
            alert("题目的括号需要成对出现。");
            return false;
        }
        var zj = tm.substring(0, tm.indexOf("）"));
        if (zj.indexOf("（") > -1 || zj.indexOf("）") > -1) {
            alert("题目的填空项（即括号）不允许嵌套。");
            return false;
        }
        count++;
        if(str.indexOf("）")<0)break;
        str= str.substring(str.indexOf("）")+1);
    }
    //是否设置了正确答案
    var ansCount=0;
    $("input[name$=itemTxt]").each(function(){
        if($.trim($(this).val())!="")ansCount++;

    });
    if(ansCount==0){
        alert("请填写答案！");
        $("input[name$=itemTxt]:first").focus();
        return false;
    }
    if(count!==ansCount){
        var msg="填空项的个数与答案项的个数，数目不匹配！";
        msg+="\n注：当前有 "+ count +" 个填空项，"+ansCount+" 个答案。";
        alert(msg);
        $("input[name$=itemTxt]:first").focus();
        return false;
    }
    return true;
}

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
