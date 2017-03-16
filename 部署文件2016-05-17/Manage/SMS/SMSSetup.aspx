<%@ Page Language="C#" MasterPageFile="~/Manage/ManagePage.Master" AutoEventWireup="true"
    Codebehind="SMSSetup.aspx.cs" Inherits="Song.Site.Manage.SMS.SMSSetup" Title="无标题页" %>

<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <legend>选择短信平台</legend>
    <cc1:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" ShowFooter="False"
        SelectBoxKeyName="SelectBox" ShowSelectBox="True">
        <EmptyDataTemplate>
            没有满足条件的信息！
        </EmptyDataTemplate>
        <Columns>
            <asp:TemplateField HeaderText="序号">
                <itemstyle cssclass="center" width="40" />
                <itemtemplate>
<%# Container.DataItemIndex + 1 %>
</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="短信平台">
                <itemstyle cssclass="center" width="180" />
                <itemtemplate>
<%# Eval("Remarks")%>
</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="帐号">
                <itemstyle cssclass="center" />
                <itemtemplate>
<%# Eval("User")%>
</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="余额（条）">
                <itemstyle cssclass="center" />
                <itemtemplate>
<%# GetNumber(Eval("Remarks","{0}"))%>
</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="操作">
                <itemstyle cssclass="center" />
                <itemtemplate>
                <asp:Label ID="Label1" runat="server" Visible='<%# Eval("IsCurrent")%>' ForeColor="Red" Text="当前采用"></asp:Label>
          <asp:LinkButton id="linkBtn" CommandArgument='<%# Eval("Remarks")%>' OnClick="linkBtn_Click" runat="server"><%# Eval("IsCurrent","{0}")=="True" ? "" : "设置为当前"%></asp:LinkButton>          

</itemtemplate>
            </asp:TemplateField>
        </Columns>
    </cc1:GridView>
</asp:Content>
