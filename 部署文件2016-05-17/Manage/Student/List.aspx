<%@ Page Language="C#" MasterPageFile="~/Manage/ManagePage.Master" AutoEventWireup="true"
    CodeBehind="List.aspx.cs" Inherits="Song.Site.Manage.Student.List" Title="学生列表" %>

<%@ Register Src="../Utility/toolsBar.ascx" TagName="toolsBar" TagPrefix="uc1" %>
<%@ Register Src="../Utility/Pager.ascx" TagName="Pager" TagPrefix="uc2" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <div id="header">
        <uc1:toolsBar ID="ToolsBar1" runat="server" WinPath="List_Edit.aspx" GvName="GridView1"
            WinWidth="850" WinHeight="600" OnDelete="DeleteEvent" InputButtonVisible="true"
            OutputButtonVisible="false" />
        <div class="searchBox">
            <asp:DropDownList ID="ddlSort" runat="server"  Width="100" DataTextField="Sts_Name" DataValueField="Sts_ID">
            </asp:DropDownList>
            &nbsp;姓名：<asp:TextBox ID="tbName" runat="server" Width="80" MaxLength="10"></asp:TextBox>&nbsp;
            手机号：<asp:TextBox
                ID="tbPhone" runat="server" Width="100" MaxLength="10"></asp:TextBox>&nbsp;<asp:Button
                    ID="btnSear" runat="server" Width="60" Text="查询" OnClick="btnsear_Click" />
        </div>
    </div>
    <cc1:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" SelectBoxKeyName="SelectBox"
        ShowSelectBox="True">
        <EmptyDataTemplate>
            没有满足条件的学生信息！
        </EmptyDataTemplate>
        <Columns>
            <asp:TemplateField HeaderText="序号">
                <ItemStyle CssClass="center" Width="40" />
                <ItemTemplate>
                    <%# Container.DataItemIndex   + Pager1.Size*(Pager1.Index-1) + 1 %>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="操作">
                <ItemTemplate>
                    <cc1:RowDelete ID="btnDel" OnClick="btnDel_Click" runat="server"></cc1:RowDelete>
                    <cc1:RowEdit ID="btnEdit" runat="server"></cc1:RowEdit>
                </ItemTemplate>
                <ItemStyle CssClass="center" Width="46px" />
            </asp:TemplateField>
            <%-- <asp:TemplateField HeaderText="ID">
                <ItemStyle CssClass="center" Width="60px" />
                <ItemTemplate>
                    <%# Eval("st_id","{0}")%>
                </ItemTemplate>
            </asp:TemplateField>--%>
            <asp:TemplateField HeaderText="手机号">
                <ItemStyle CssClass="center" Width="100px" />
                <ItemTemplate>
                    <%# string.IsNullOrWhiteSpace(Eval("st_PhoneMobi", "{0}")) ? Eval("st_accname", "{0}") : Eval("st_PhoneMobi", "{0}")%>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="姓名">
                <ItemStyle CssClass="left" />
                <ItemTemplate>
                    <%# Eval("st_Name")%>
                    
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="学生组">
                <ItemStyle CssClass="center" />
                <ItemTemplate>
                    <%# Eval("sts_name", "{0}")%>
                </ItemTemplate>
            </asp:TemplateField>
             <asp:TemplateField HeaderText="最后登录">
                <ItemStyle CssClass="center" Width="160" />
                <ItemTemplate>
                    <%# Convert.ToDateTime(Eval("St_LastTime"))>DateTime.Now.AddYears(-100) ? Eval("St_LastTime") : "" %>
                    
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="启用">
                <ItemStyle CssClass="center" Width="60px" />
                <ItemTemplate>
                    <cc1:StateButton ID="sbUse" OnClick="sbUse_Click" runat="server" TrueText="启用" FalseText="禁用"
                        State='<%# Eval("St_IsUse","{0}")=="True"%>'></cc1:StateButton>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="审核">
                <ItemStyle CssClass="center" Width="60px" />
                <ItemTemplate>
                    <cc1:StateButton ID="sbPass" OnClick="sbPass_Click" runat="server" TrueText="通过" FalseText="未审"
                        State='<%# Eval("St_IsPass","{0}")=="True"%>'></cc1:StateButton>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="密码置">
                <ItemStyle CssClass="center" Width="60px" />
                <ItemTemplate>
                    <a href="#" onclick="OpenWin('Student_Password.aspx?id=<%# Eval("st_id") %>','重置密码',400,300);return false;">
                        修改</a>
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </cc1:GridView>
    <br />
    <uc2:Pager ID="Pager1" runat="server" Size="15" OnPageChanged="BindData" />
</asp:Content>
