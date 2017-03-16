﻿<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    Codebehind="Student_Input.aspx.cs" Inherits="Song.Site.Manage.Student.Student_Input"
    Title="无标题页" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<%@ Register Src="~/Manage/Utility/ExcelInput.ascx" TagName="ExcelInput" TagPrefix="uc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <%--上传区域--%>
    <uc1:ExcelInput ID="ExcelInput1" runat="server" TemplatePath="~/manage/DataTemplate/学生信息.xls"
        TemplateName="学生信息" Config="学生信息.xml" OnInput="ExcelInput1_OnInput"></uc1:ExcelInput>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>