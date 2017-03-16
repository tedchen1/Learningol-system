<%@ Page Language="C#" AutoEventWireup="true" Codebehind="Welcome.aspx.cs" Inherits="Song.Site.Manage.Welcome" %>

<%@ Register Src="Utility/QrBuilder.ascx" TagName="QrBuilder" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>无标题页</title>
</head>
<body>
    <form id="form1" runat="server">
      

        <div class="box" id="serverInfo">
            <div class="boxBar">
                服务器信息</div>
            <div class="boxContent">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="70" class="right">
                            主机地址：</td>
                        <td>
                            <asp:Literal ID="ltIp" runat="server"></asp:Literal>
                            :
                            <asp:Literal ID="ltPort" runat="server"></asp:Literal></td>
                    </tr>
                    <tr>
                        <td class="right">
                            域名：</td>
                        <td>
                            <asp:Literal ID="ltDomain" runat="server"></asp:Literal>
                        </td>
                    </tr>
                    <tr>
                        <td class="right">
                            软件环境：</td>
                        <td>
                            <asp:Literal ID="ltOs" runat="server"></asp:Literal>
                            IIS
                            <asp:Literal ID="ltIISver" runat="server"></asp:Literal>
                            .Net
                            <asp:Literal ID="ltDotNetver" runat="server"></asp:Literal>
                        </td>
                    </tr>
                    <tr>
                        <td class="right">
                            硬件环境：</td>
                        <td>
                            CPU:<asp:Literal ID="ltHz" runat="server"></asp:Literal>GHz×<asp:Literal ID="ltCpucount" runat="server"></asp:Literal>
                            内存<asp:Literal ID="ltRamSize" runat="server"></asp:Literal>Gb
                        </td>
                    </tr>
                    <tr>
                        <td class="right">
                            数据库：</td>
                        <td>
                            <asp:Literal ID="ltDatabaseType" runat="server"></asp:Literal></td>
                    </tr>
                    <tr>
                        <td class="right">
                            物理路径：</td>
                        <td>
                            <asp:Literal ID="ltPath" runat="server"></asp:Literal></td>
                    </tr>
                </table>
            </div>
        </div>
    </form>
</body>
</html>
