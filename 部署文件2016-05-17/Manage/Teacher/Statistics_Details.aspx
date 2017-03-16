﻿<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    CodeBehind="Statistics_Details.aspx.cs" Inherits="Song.Site.Manage.Teacher.Statistics_Details"
    Title="无标题页" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="Kind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    当前考试的平均分：<span class="examAvg"></span>
    <div class="rptExamItem">
        <asp:Repeater ID="rptExamItem" runat="server">
            <ItemTemplate>
                <div class="examItem">
                    <%# Container.ItemIndex + 1%>、 《<%# Eval("Exam_Name", "{0}")%><%# Eval("Sbj_Name", "（{0}）")%>》：平均<span><%# GetAvg(Eval("Exam_ID", "{0}"))%></span>分</div>
            </ItemTemplate>
        </asp:Repeater>
    </div>
    <div class="selectBox">
    学生组：<asp:DropDownList ID="Sts_ID" runat="server" DataTextField="Sts_Name" 
            DataValueField="Sts_ID" AutoPostBack="True" 
            onselectedindexchanged="Sts_ID_SelectedIndexChanged"></asp:DropDownList> 
        <asp:Button ID="btnOutput" runat="server" Text="导出成绩列表" 
            onclick="btnOutput_Click" />
    </div>
    <asp:GridView ID="gvList" runat="server" CssClass="GridView">
     <EmptyDataTemplate>
            当前学生分组下的学生没有参加该考试！
        </EmptyDataTemplate>
        <Columns>
            <asp:TemplateField HeaderText="序号">
                <ItemStyle CssClass="center" Width="40" />
                <ItemTemplate>
                    <%# Container.DataItemIndex   + 1 %>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="姓名">
                <ItemStyle CssClass="center" Width="80" />
                <ItemTemplate>
                    <%# Eval("姓名", "{0}")%>
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </asp:GridView>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>
