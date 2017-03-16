<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Info.aspx.cs" Inherits="Song.Site.Check.Info" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Label ID="lbOrgName" runat="server" Text=""></asp:Label>
    </div>
    <hr />
    <div class="infoBox">
            <div class="infoItem">专业<%=sbjcount%>个</div>
            <div class="infoItem">科目<%=couCount%>个</div>
            <div class="infoItem">试题<%=quesCount%>道</div>
            <div class="infoItem">考试<%=testCount%>场</div>
            <div class="infoItem">学员<%=stCount%>个</div>
            <div class="infoItem">资讯<%=newsCount%>条</div>
            </div>
    </form>
</body>
</html>
