﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Manage/Course/CourseEdit.Master"
    AutoEventWireup="true" CodeBehind="Courses_Edit.aspx.cs" Inherits="Song.Site.Manage.Course.Courses_Edit" %>

<%@ MasterType VirtualPath="~/Manage/Course/CourseEdit.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="Kind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphMain" runat="server">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="right" width="80px">
                课程名称：
            </td>
            <td>
                <asp:TextBox ID="Cou_Name" nullable="false" group="enter" Width="95%" MaxLength="200"
                    runat="server"></asp:TextBox>
            </td>
            <td width="200" rowspan="6" class="right" valign="top">
                <img src="../Images/nophoto.jpg" name="imgShow" width="200" height="123" id="imgShow"
                    runat="server" /><br />
                <cc1:FileUpload ID="fuLoad" runat="server" fileallow="jpg|bmp|gif|png" Width="200" />
            </td>
        </tr>
        <tr>
            <td class="right">
                所属专业：
            </td>
            <td>
                <cc1:DropDownTree ID="ddlSubject" runat="server" Width="300px" IdKeyName="Sbj_ID" ParentIdKeyName="Sbj_PID"
                    TaxKeyName="Sbj_Tax" AutoPostBack="True" OnSelectedIndexChanged="ddlSubject_SelectedIndexChanged">
                </cc1:DropDownTree>
            </td>
        </tr>
        <tr>
            <td class="right">
                上级课程：
            </td>
            <td>
                <cc1:DropDownTree ID="ddlTree" runat="server"  Width="300px" IdKeyName="Cou_ID" ParentIdKeyName="Cou_PID"
                    TaxKeyName="Cou_Tax">
                </cc1:DropDownTree>
            </td>
        </tr>
         <tr>
            <td class="right">

            </td>
            <td>
                <asp:CheckBox ID="cbIsUse" runat="server" Text="是否启用（只有启用后，学员才能看到该课程）" Checked="true" />
            </td>
        </tr>
         <tr>
            <td class="right">
            访问人数：
            </td>
            <td>
                <asp:Label ID="lbViewNum" runat="server" Text="0"></asp:Label>人
            </td>
        </tr>
          <tr>
            <td class="right">
            学习人数：
            </td>
            <td>
                当前有<asp:Label ID="lbStudentSum" runat="server" Text="0"></asp:Label>人正在学习（共<asp:Literal
                    ID="ltStudentSum" runat="server"></asp:Literal>人）
            </td>
        </tr>
        <tr>
            <td class="right">
                简介：
            </td>
            <td colspan="2">
                <Kind:Editor ID="tbIntro" runat="server" Width="99%" ThemeType="simple" Height="150">
                </Kind:Editor>
                <br />
            </td>
        </tr>
        <tr>
            <td class="right">
                学习目标：
            </td>
            <td colspan="2">
                <Kind:Editor ID="tbTarget" runat="server" Width="99%" ThemeType="simple" Height="180">
                </Kind:Editor>
            </td>
        </tr>
    </table>
</asp:Content>
