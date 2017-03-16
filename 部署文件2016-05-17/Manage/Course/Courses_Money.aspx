<%@ Page Title="" Language="C#" MasterPageFile="~/Manage/Course/CourseEdit.Master"
    AutoEventWireup="true" CodeBehind="Courses_Money.aspx.cs" Inherits="Song.Site.Manage.Course.Courses_Money" %>

<%@ MasterType VirtualPath="~/Manage/Course/CourseEdit.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="Kind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphMain" runat="server">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="right">
            课程名称：
            </td>
            <td>
                <asp:Label ID="lbName" runat="server" Text=""></asp:Label>
            </td>
        </tr>
        <tr>
            <td class="right" valign="top">
                学习费用：
            </td>
            <td>
                <div>
                    <asp:GridView ID="gvPrice" runat="server" EnableTheming="false" Width="400" AutoGenerateColumns="False"
                        ShowFooter="false" ShowHeader="false">
                        <EditRowStyle CssClass="editRow" />
                        <Columns>
                            <asp:TemplateField HeaderText="名称">
                                <ItemTemplate>
                                    <asp:LinkButton ID="lbUp" OnClick="lbUp_Click" ToolTip="上移" runat="server">&#8593; </asp:LinkButton>
                                    <asp:LinkButton ID="lbDown" OnClick="lbDown_Click" ToolTip="下移" runat="server">&#8595;</asp:LinkButton>&nbsp;
                                    &nbsp;<span><%# Eval("CP_span", "{0}")%>
                                        <%# Eval("CP_Unit")%>
                                        <%# Eval("CP_Price")%>
                                        元</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <cc1:StateButton ID="sbUse" OnClick="sbUse_Click" runat="server" TrueText="[使用]"
                                        FalseText="[禁用]" State='<%# Eval("Cp_IsUse","{0}")=="True"%>'></cc1:StateButton>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:TextBox ID="tbSpan" runat="server" nullable="false" Text='<%# Eval("CP_span", "{0}")%>'
                                        group="edit" Width="60"></asp:TextBox><asp:DropDownList ID="ddlUnit" runat="server">
                                            <asp:ListItem>日</asp:ListItem>
                                            <asp:ListItem>周</asp:ListItem>
                                            <asp:ListItem>月</asp:ListItem>
                                            <asp:ListItem>年</asp:ListItem>
                                        </asp:DropDownList>
                                    <asp:TextBox ID="tbPrice" runat="server" Text=' <%# Eval("CP_Price")%>' nullable="false"
                                        group="edit" Width="60"></asp:TextBox>元&nbsp;&nbsp;
                                    <asp:CheckBox ID="cbIsUse" runat="server" Text="启用" Checked='<%# Eval("CP_IsUse")%>' />
                                </EditItemTemplate>
                                <FooterTemplate>
                                </FooterTemplate>
                                <FooterStyle CssClass="center" />
                                <ItemStyle CssClass="left" />
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="操作">
                                <ItemTemplate>
                                    <cc1:RowDelete ID="btnDel" OnClick="btnDel_Click" runat="server"></cc1:RowDelete>
                                    <cc1:RowEdit ID="btnEdit" OnClick="btnEdit_Click" CommandArgument='<%# Eval("CP_Unit")%>'
                                        IsJsEvent="false" runat="server"></cc1:RowEdit>
                                </ItemTemplate>
                                <EditItemTemplate>
                                    <asp:Button ID="btnEditEnter" runat="server" CssClass="editBtn" group="edit" verify="true"
                                        OnClick="btnEditEnter_Click" Text="确定" />
                                    &nbsp;
                                    <asp:Button ID="btnEditBack" runat="server" CssClass="backBtn" OnClick="btnEditBack_Click"
                                        Text="返回" />
                                </EditItemTemplate>
                                <HeaderStyle CssClass="center noprint" />
                                <ItemStyle CssClass="center noprint" Width="80px" />
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                </div>
                <asp:Panel ID="plAddPrice" runat="server">
                    <asp:TextBox ID="tbSpan" runat="server" nullable="false" group="add" Width="40"></asp:TextBox><asp:DropDownList
                        ID="ddlUnit" runat="server">
                        <asp:ListItem>日</asp:ListItem>
                        <asp:ListItem>周</asp:ListItem>
                        <asp:ListItem Selected="True">月</asp:ListItem>
                        <asp:ListItem>年</asp:ListItem>
                    </asp:DropDownList>
                    <asp:TextBox ID="tbPrice" runat="server" nullable="false" group="add" Width="60"></asp:TextBox>元
                    &nbsp;
                    <asp:Button ID="btnAAEnter" runat="server" CssClass="editBtn" group="add" verify="true"
                        Text="添加" OnClick="btnAAEnter_Click" />
                </asp:Panel>
            </td>
        </tr>
        <tr>
            <td class="right">
                是否免费：
            </td>
            <td>
                <asp:CheckBox ID="cbIsFree" runat="server" Text="该课程完全免费" AutoPostBack="True" OnCheckedChanged="Cou_IsFree_CheckedChanged" />
            </td>
        </tr>
        <tr>
            <td class="right">
                试用：
            </td>
            <td>
                <asp:CheckBox ID="cbIsTry" runat="server" Text="允许免费试用" Checked="true" AutoPostBack="True"
                    OnCheckedChanged="Cou_IsTry_CheckedChanged" />
                <span id="spanTryNum" runat="server" visible="false">（当前课程下，每章节允许试用的试题数：<asp:TextBox
                    ID="tbTryNum" runat="server" Width="100px" datatype="uint" group="enter" nullable="false"></asp:TextBox>道）
                </span>
            </td>
        </tr>
    </table>
</asp:Content>
