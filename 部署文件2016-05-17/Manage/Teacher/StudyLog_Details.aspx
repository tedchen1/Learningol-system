﻿<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    CodeBehind="StudyLog_Details.aspx.cs" Inherits="Song.Site.Manage.Teacher.StudyLog_Details"
    Title="无标题页" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
<div>
当前课程：《<asp:Literal ID="ltCourName" runat="server"></asp:Literal>》
</div>
    <cc1:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" SelectBoxKeyName="SelectBox"
        ShowSelectBox="false">
        <EmptyDataTemplate>
            没有满足条件的信息！
        </EmptyDataTemplate>
        <Columns>
            <asp:TemplateField HeaderText="序号">
                <ItemStyle CssClass="center" Width="40" />
                <ItemTemplate>
                    <%# Container.DataItemIndex   +  1 %>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="章节">
                <ItemStyle CssClass="left" />
                <ItemTemplate>
                    <%# Eval("Tree")%></span><%# Eval("Ol_Name")%>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="学习时间">
                <ItemStyle CssClass="center" Width="150px" />
                <ItemTemplate>
                    <%# Eval("LastTime", "{0:yyyy-MM-dd HH:mm:ss}")%>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="观看进度">
                <ItemStyle CssClass="center" Width="100px" />
                <ItemTemplate>
                    <%# CaleTotalTime(Eval("playTime", "{0}"))%>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="视频时长">
                <ItemStyle CssClass="center" Width="100px" />
                <ItemTemplate>
                    <%# CaleTotalTime(Eval("totalTime", "{0}"))%>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="累计学习">
                <ItemStyle CssClass="center" Width="100px" />
                <ItemTemplate>
                    <%# CaleStudyTime(Eval("studyTime", "{0}"))%>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="完成度">
                <ItemStyle CssClass="center" Width="100px" />
                <ItemTemplate>
                    <%# CaleComplete(Eval("studyTime", "{0}"), Eval("totalTime", "{0}"))%>
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </cc1:GridView>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>
