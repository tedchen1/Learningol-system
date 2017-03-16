<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    EnableEventValidation="false" CodeBehind="Examination_Edit.aspx.cs" Inherits="Song.Site.Manage.Exam.Examination_Edit"
    Title="无标题页" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="Kind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <script language="javascript" src="../Utility/datepicker/WdatePicker.js" type="text/javascript"></script>
    <div class="quesLeft">
        <table cellspacing="0" cellpadding="0" width="100%" border="0">
            <tr>
                <td width="80px" class="right">
                    考试主题：
                </td>
                <td>
                    <asp:TextBox ID="tbName" runat="server" nullable="false" MaxLength="200" Width="400px"></asp:TextBox>
                    &nbsp;
                    <asp:CheckBox ID="cbIsUse" runat="server" Text="启用" state="true" Checked="true" />
                </td>
            </tr>
            <tr>
                <td class="right" valign="top">
                    简介：
                </td>
                <td>
                    <Kind:Editor ID="tbIntro" runat="server" Height="100px" ThemeType="simple" Width="99%">
                    </Kind:Editor>
                </td>
            </tr>
            <tr>
                <td class="right" valign="top">
                    &nbsp;<br />
                    参考人员：
                </td>
                <td>
                    <asp:RadioButtonList ID="rblGroup" runat="server" CssClass="rblGroup">
                        <asp:ListItem Selected="True" Value="1">全体学生</asp:ListItem>
                        <asp:ListItem Value="2">限定分类</asp:ListItem>
                    </asp:RadioButtonList>
                    <%--按分类选择参考范围--%>
                    <div id="selStudentSort" class="selGroup" style="display: none">
                        <asp:ListBox ID="lbSort" CssClass="lbSort" runat="server" Height="150" Width="150">
                        </asp:ListBox>
                        <div class="btnBox">
                            <input class="btnGo" id="btnAddSort" type="button" value=">>" title="添加" />
                            <input type="button" class="btnGo" id="btnSortRemove" value="<<" title="去除" />
                            <input type="button" class="btnGo" id="btnSortRemoveAll" value="<<<" title="去除所有" /></div>
                        <asp:ListBox ID="lbSelected" CssClass="lbSelected" runat="server" Height="150" Width="150">
                        </asp:ListBox>
                        <span style="display: none">
                            <asp:TextBox ID="tbSortSelected" runat="server"></asp:TextBox></span>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="right">
                    场次：
                </td>
                <td>
                    <asp:Label ID="lbMaxnum" runat="server" Text="8" Visible="false"></asp:Label>
                </td>
            </tr>
        </table>
        <asp:GridView ID="GvItem" CssClass="GridView" runat="server" AutoGenerateColumns="False"
            OnRowDataBound="GvItem_RowDataBound">
            <EmptyDataTemplate>
                没有任何满足条件的考试！
            </EmptyDataTemplate>
            <Columns>
                <asp:TemplateField HeaderText="序号">
                    <ItemStyle CssClass="center" Width="40px" />
                    <ItemTemplate>
                        <%# Container.DataItemIndex   +   1 %>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="考试课程">
                    <ItemStyle Width="120px" />
                    <ItemTemplate>
                        <asp:DropDownList ID="ddlSubject" runat="server" Width="120px">
                        </asp:DropDownList>
                        <span style="display: none">
                            <asp:Label ID="lbID" runat="server" Text='<%# Eval("Exam_ID","{0}")%>'></asp:Label></span>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="采用试卷">
                    <ItemStyle Width="150px" />
                    <ItemTemplate>
                        <asp:DropDownList ID="ddlTestPager" runat="server" Width="150px">
                        </asp:DropDownList>
                        <span style="display: none">
                            <asp:TextBox ID="tbTestPager" runat="server" Text='<%# Eval("Tp_ID","{0}")%>'></asp:TextBox></span>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="标题">
                    <ItemStyle Width="200px" />
                    <ItemTemplate>
                        <asp:TextBox ID="tbName" runat="server" Width="200px" Text='<%# Eval("Exam_Name","{0}")%>'></asp:TextBox>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="总分">
                    <ItemStyle CssClass="center" />
                    <ItemTemplate>
                        <asp:Label ID="lbTotal" CssClass="lbTotal" runat="server" Text='<%# Eval("Exam_Total","{0}")%>'></asp:Label>
                        <span style="display: none">
                            <asp:TextBox ID="tbTotal" runat="server" Text='<%# Eval("Exam_Total","{0}")%>'></asp:TextBox></span>
                        
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="及格分">
                    <ItemStyle CssClass="center" />
                    <ItemTemplate>
                        <asp:Label ID="lbPassScore" CssClass="lbPassScore" runat="server" Text='<%# Eval("Exam_PassScore","{0}")%>'></asp:Label>
                        <span style="display: none">
                            <asp:TextBox ID="tbPassScore" runat="server" Text='<%# Eval("Exam_PassScore","{0}")%>'></asp:TextBox></span>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="考试时间">
                    <ItemStyle CssClass="center" Width="120px" />
                    <ItemTemplate>
                        <asp:TextBox runat="server" ID="tbDate" Text='<%# Eval("Exam_Date","{0:yyyy-MM-dd HH:mm}")%>'
                            onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})" Width="120px"></asp:TextBox>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="时长">
                    <ItemStyle CssClass="center" Width="50px" />
                    <ItemTemplate>
                        <asp:TextBox runat="server" ID="tbSpan" Text='<%# Eval("Exam_Span","{0}")%>' datatype="uint"
                            Width="50px" ToolTip="单位：分钟"></asp:TextBox>
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
            <HeaderStyle CssClass="header" />
        </asp:GridView>
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
    <cc1:EnterButton verify="true" ID="btnEnter" runat="server" Text="确定" OnClick="btnEnter_Click"
        ValidationGroup="enter" />
    <%--<Song:DeleteButton ID="DeleteButton1" runat="server" OnClick="btnDelete_Click" />--%>
    <cc1:CloseButton ID="btnClose" runat="server" />
</asp:Content>
