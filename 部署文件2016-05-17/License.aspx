<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="License.aspx.cs" Inherits="Song.Site.License" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>授权管理与版本信息</title>
    <style type="text/css">
<!--
body {
	margin: 0px;
	padding: 0px;
}
*{
	font-size:14px;
}
.header{
	font-size: 14px;
	line-height: 30px;
	background-color: #CCC;
	height: 30px;
	text-indent: 10px;
}
.title, .title span{
	font-family: "Microsoft Yahei", "微软雅黑", Tahoma, Arial, Helvetica, STHeiti;
	font-size: 28px;
	line-height: 50px;
	font-weight: bold;
	color: #333333;
	height: 50px;
	margin-left:10px;
}
.licInfo {
	margin-left:10px;
}
.licInfo span {
	margin-right:10px;
}
.context 
{
    margin-bottom:10px;
    margin-left:10px;
}
.spanVersion
{
    font-size:14px !important;
}
.explain {
	line-height: 20px;
	text-align: left;
}

.licTable td{
	padding: 10px;	
}
.infoBox {
	margin-top: 20px;
	margin-bottom: 20px;
}
.limitBox{
	display:table;
}
.limitBox .context{
	width:750px;
}

.limitItem{
	line-height: 25px;
	float: left;
	height: 25px;
	width: 200px;
	margin-left: 10px;
}
.blue {
	color: #0066FF;
	font-weight: bold;
	font-size: 15px;
}
.footer {
	margin-top: 20px;
}
a {
	color: #0066FF;
	text-decoration: underline;
	margin-right: 20px;
	margin-left: 20px;
}
.right {
	text-align: right;
}
.gv{
	width:800px;
	margin:10px;
}
.gv th{
	background-color:#eee;
}
.gv td, .gv th{
	text-align:center;
	line-height:25px;
}
.copyright
{
    font-family:arial;
    margin-left:10px;
}
-->
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="header">
        系统于
        <asp:Label ID="lbInitDate" runat="server" ForeColor="red" Text=""></asp:Label>
        开始运行，已经正常运行
        <asp:Label ID="lbRunTime" runat="server" ForeColor="red" Text=""></asp:Label>
    </div>
    <div class="title">
        当前系统副本为<asp:Label ID="lbVersion" runat="server" ForeColor="red" Text=""></asp:Label>
        <span class="spanVersion">(Version 
            <asp:Literal ID="ltVersion" runat="server"></asp:Literal>)</span></div>
    <asp:Panel ID="plYesLic" runat="server" Visible="false">
        <div class="licInfo">
            <span>授权类型：<asp:Literal ID="ltLicType" runat="server" Text=""></asp:Literal></span>
            <span>授权对象：<asp:Literal ID="ltLicTarget" runat="server" Text=""></asp:Literal></span>
            <span>授权时效：<asp:Literal ID="ltStartTime" runat="server" Text=""></asp:Literal>
                至
                <asp:Literal ID="ltEndTime" runat="server" Text=""></asp:Literal></span>
        </div>
        <div class="infoBox" style="display: none">
            <asp:Literal ID="ltLicInfo" runat="server"></asp:Literal></div>
    </asp:Panel>
    <hr />
    <div class="limitBox">
        <div class="tit">
            （以下为当前版本所能承载的最大数据量）</div>
        <div class="context">
            <asp:Repeater ID="rptLimit" runat="server">
                <ItemTemplate>
                    <div class="limitItem">
                        <%# Eval("Key") %>
                        :
                        <%# Convert.ToInt32(Eval("Value")) == 0 ? "不限" : Eval("Value")%>
                    </div>
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </div>
    <hr />
    <div class="explain">
        <ol>
            说明：<br />
            <li>如果上述版本的功能无法满足您的需求，升级请联系<a class="blue" href="http://shop35387540.taobao.com/"
                target="_blank">在线销售（淘宝店）</a> </li>
            <li>升级方法：将下述激活码发给客服人员，客服将反馈给您授权文件，将其放置在系统根目录即可。</li>
        </ol>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td width="120" class="right">
                    激活码类型：
                </td>
                <td>
                    <asp:RadioButtonList ID="rblActivType" runat="server" RepeatDirection="Horizontal"
                        RepeatLayout="Flow" AutoPostBack="True" OnSelectedIndexChanged="rblActivType_SelectedIndexChanged">
                        <asp:ListItem Value="1">CPU串号</asp:ListItem>
                        <asp:ListItem Value="2">硬盘串号</asp:ListItem>
                        <asp:ListItem Value="3">IP</asp:ListItem>
                        <asp:ListItem Selected="True" Value="4">域名</asp:ListItem>
                    </asp:RadioButtonList>
                </td>
            </tr>
            <tr>
                <td class="right">
                    激活码：
                </td>
                <td>
                    <asp:Label ID="lbActivCode" runat="server" Text=""></asp:Label>
                </td>
            </tr>
        </table>
    </div>
    <hr />
    <div class="context">
        <div class="tit">
            （以下为各版本功能对比，表格中数字为各版本最大承载数量）</div>
        <div class="verbox">
            <asp:GridView ID="gvLimit" runat="server" CssClass="gv">
                <Columns>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <%# Container.DataItemIndex   + 1 %></ItemTemplate>
                        <ItemStyle Width="40" />
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>
    </div>
    <div class="context">
        <hr />
        <div class="footer">
            <a href="http://www.weishakeji.net/" target="_blank">微厦科技</a> <a href="http://shop35387540.taobao.com/"
                target="_blank">在线销售（淘宝店）</a>
        </div>
    </div>
    <div class="copyright">
        Copyright &copy; 2016 Weishakeji All rights reserved
    </div>
    </form>
</body>
</html>
