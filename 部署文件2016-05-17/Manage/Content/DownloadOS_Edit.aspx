﻿<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    Codebehind="DownloadOS_Edit.aspx.cs" Inherits="Song.Site.Manage.Content.DownloadOS_Edit"
    Title="无标题页" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="Kind" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td width="40px" class="right">
                名称：</td>
            <td>
                <asp:TextBox nullable="false" ID="tbName" runat="server" MaxLength="255" Width="55%"></asp:TextBox>&nbsp;</td>
        </tr>
        <tr>
            <td class="right" valign="top">
                简介：</td>
            <td>
                <asp:TextBox ID="tbIntro" runat="server" MaxLength="255" TextMode="MultiLine" lenlimit="250"
                    Width="98%" Height="100px"></asp:TextBox></td>
        </tr>
        <tr>
            <td class="right" valign="top">
            </td>
            <td>
                <asp:CheckBox ID="cbIsUse" runat="server" Text="是否使用" Checked="true" /></td>
        </tr>
    </table>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
    <cc1:EnterButton verify="true" ID="btnEnter" runat="server" Text="确定" group="ent"
        OnClick="btnEnter_Click" ValidationGroup="enter" />
    <%--<Song:DeleteButton ID="DeleteButton1" runat="server" OnClick="btnDelete_Click" />--%>
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>
