<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DB.aspx.cs" Inherits="Song.Site.Check.DB" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Button ID="btnDblink" runat="server" Text="测试数据库链接" OnClick="btnDblink_Click" />
        &nbsp;
        <asp:Button ID="btnDbTable" runat="server" Text="测试数据结构是否完整" 
            onclick="btnDbTable_Click" />
    </div>
    <hr />
    <div>
        <asp:Label ID="lbShowText" runat="server" Text=""></asp:Label>
        <asp:Panel ID="plCorrectShow" runat="server" Visible="false">
            数据库链接不正确！<br />
            请查看web.config中数据库配置项（大约在12行）。
            <br />
            <hr />
        </asp:Panel>
        <asp:Panel ID="lbComplate" runat="server" Visible="false">
            数据库链接不正确！<br />
            请查看web.config中数据库配置项（大约在第17行）。
            <br />
            <hr />
        </asp:Panel>
    </div>
    </form>
</body>
</html>
