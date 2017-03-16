﻿<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    Codebehind="ProductFactory_Edit.aspx.cs" Inherits="Song.Site.Manage.Content.ProductFactory_Edit"
    Title="无标题页" %>
<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="cc2" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    名称：<asp:TextBox nullable="false" ID="tbName" runat="server" MaxLength="200" Width="300px"></asp:TextBox><asp:CheckBox ID="cbIsUse" runat="server" Checked="True" Text="是否启用" />
    <br />
    产地：<asp:TextBox ID="tbAddr" runat="server" MaxLength="255" Width="300px"></asp:TextBox><br />
    电话：<asp:TextBox ID="tbTel" runat="server" MaxLength="50" Width="300px"></asp:TextBox><br />
    邮编：<asp:TextBox ID="tbZip" runat="server" MaxLength="6" Width="100px"></asp:TextBox><br />
    网址：<asp:TextBox ID="tbWebsite" runat="server" MaxLength="255" Width="300px"></asp:TextBox><br />
    介绍：<br />
    <cc2:Editor ID="tbIntro" runat="server" Height="350px" Width="98%"></cc2:Editor>
 
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
  <cc1:EnterButton verify="true" ID="btnEnter" runat="server" Text="确定" OnClick="btnEnter_Click"
        ValidationGroup="enter" />
    <%--<Song:DeleteButton ID="DeleteButton1" runat="server" OnClick="btnDelete_Click" />--%>
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>
