﻿<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    CodeBehind="Sort_Edit.aspx.cs" Inherits="Song.Site.Manage.Teacher.Sort_Edit"
    Title="无标题页" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="Kind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <script language="javascript" src="../Utility/datepicker/WdatePicker.js" type="text/javascript"></script>
    <script type="text/javascript" src="../CoreScripts/hanzi2pinyin.js"></script>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="right" width="80px">
                名称：
            </td>
            <td>
                <asp:TextBox ID="Ths_Name" nullable="false" Width="95%" MaxLength="255"
                    runat="server"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                简介：
            </td>
            <td>
                <asp:TextBox ID="Ths_Intro" runat="server" lenlimit="2000" TextMode="MultiLine" Width="95%"
                    Height="100"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                状态：
            </td>
            <td>
                <asp:CheckBox ID="Ths_IsUse" runat="server" Text="是否启用" Checked="true" />
            </td>
        </tr>
        <tr>
            <td class="right">
            </td>
            <td>
                <asp:CheckBox ID="Ths_IsDefault" runat="server" Text="是否为默认组" />
            </td>
        </tr>
    </table>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
    <cc1:EnterButton verify="true" ID="btnEnter" runat="server" Text="确定" OnClick="btnEnter_Click"
        ValidationGroup="enter" />
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>
