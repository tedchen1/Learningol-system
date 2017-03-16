﻿<%@ Page Language="C#" MasterPageFile="~/Manage/ManagePage.Master" AutoEventWireup="true"
    CodeBehind="Contents.aspx.cs" Inherits="Song.Site.Manage.Content.Contents" Title="无标题页" %>

<%@ Register Src="../Utility/Pager.ascx" TagName="Pager" TagPrefix="uc2" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
<asp:Panel ID="plNoContent" runat="server">
<div class="noContext">
请先添加“新闻栏目”！
</div>
</asp:Panel>
    <asp:Panel ID="plEditor" runat="server">
        <div id="leftBox">
            <cc1:ListBoxTree ID="ddlColumns" runat="server" Width="180" Height="500" IdKeyName="Col_ID"
                ParentIdKeyName="Col_PID" TaxKeyName="Col_Tax" TypeKeyName="Col_Type" state="true">
            </cc1:ListBoxTree>
        </div>
        <div id="rightBox">
            <iframe id="frame" src="" width="380" height="500" marginwidth="0" marginheight="0"
                scrolling="auto" frameborder="0"></iframe>
        </div>
    </asp:Panel>
</asp:Content>
