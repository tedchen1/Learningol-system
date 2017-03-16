$(function(){
	_initLoyoutAdmin();
	//setOpenEvent();
});
//当窗口大小变化时
$(window).resize(function(){
	var frame=$("#frameAdmin");
	frame.width(frame.parent().width()-20);
	frame.height(frame.parent().height()-20);
});
//初始化界面
function _initLoyoutAdmin()
{
	var url=decodeURIComponent($().getPara("url"));
	var title=decodeURIComponent($().getPara("txt"));
	//标题
	$(".adminTitle").text(title);
	//管理页
	var frame=$("#frameAdmin");
	frame.attr("src",url);
	frame.width(frame.parent().width()-20);
	frame.height(frame.parent().height()-20);
    //按钮事件
    $(".btnRefesh").click(function(){
        var src=$("#frameAdmin").attr("src");
        $("#frameAdmin").attr("src",src);
    });
    $(".btnPrint").click(function(){
        //打印预览的标题
        var title=$(".adminTitle").text();
        //打印内容
        var frame=document.getElementById("frameAdmin").contentWindow;
        var htm=$(frame.document.body).html();
        htm="<div style=\"text-align:center;\">"+title+"</div>"+htm;
        htm="<style>#header,.noprint{display: none;}table{border:1px solid #000;width:100%;}" +
            "table {border-collapse: collapse; border-style: double;border-width:3px;border-color: black;}"+
            "td,th{border-width: 1px;border-style: solid;} .center{text-align: center;} </style>"+htm;
        //打印
        var print=PagePanel.getPrintObject();
        if(print==null)return false;
        print.PRINT_INIT(title);
        print.ADD_PRINT_HTM(20,40,700,900,htm);
        //print.ADD_PRINT_URL(30,20,746,"100%",src);
        print.SET_PRINT_STYLEA(0,"HOrient",3);
        print.SET_PRINT_STYLEA(0,"VOrient",3);
        print.PREVIEW();
    });
}
//获取管理标题
function getAdminTitle()
{
	return $(".adminTitle").text();
}

function PagePanel() {}
//判断是否安装打印控件
PagePanel.isInstallPrint=function(){
    try{
        var LODOP=PagePanel.getPrintObject(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
        if ((LODOP!=null)&&(typeof(LODOP.VERSION)!="undefined"))return true;
    }catch(err){
        return false;
    }
}
//获取打印控件的对象
PagePanel.getPrintObject=function(oOBJECT,oEMBED){
    oOBJECT=oOBJECT==null ? document.getElementById('LODOP_OB') :oOBJECT;
    oEMBED=oEMBED==null ? document.getElementById('LODOP_EM') :oEMBED;
    var LODOP=oEMBED;
    var wd=400;
    var hg=300;
    var path="/manage/panel/PrintAlert.htm?para=";
    try{
        if (navigator.appVersion.indexOf("MSIE")>=0) LODOP=oOBJECT;
        if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
            if (navigator.userAgent.indexOf('Firefox')>=0)
                new top.PageBox("打印控件未安装",path+"strHtmFireFox",wd,hg).Open();
            if (navigator.userAgent.indexOf('WOW64')>=0)
                new top.PageBox("打印控件未安装",path+"strHtm64_Install",wd,hg).Open();
            else
                new top.PageBox("打印控件未安装",path+"strHtmInstall",wd,hg).Open();
            return LODOP;
        } else if (LODOP.VERSION<"6.1.4.5") {
            if (navigator.userAgent.indexOf('WOW64')>=0)
                new top.PageBox("打印控件需要升级",path+"strHtm64_Update",wd,hg).Open();
            else
                new top.PageBox("打印控件需要升级",path+"strHtmUpdate",wd,hg).Open();
            return LODOP;
        }
        return LODOP;
    }catch(err){
        if (navigator.userAgent.indexOf('WOW64')>=0)
            new top.PageBox("打印控件未安装",path+"strHtm64_Install",wd,hg).Open();
        else
            new top.PageBox("打印控件未安装",path+"strHtmInstall",wd,hg).Open();
        return LODOP;
    }
}