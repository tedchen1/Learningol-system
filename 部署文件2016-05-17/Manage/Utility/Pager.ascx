<%@ Control Language="C#" AutoEventWireup="true" Codebehind="Pager.ascx.cs" Inherits="Song.Site.Manage.Utility.Pager" %>
<div class="pager">
    ��<span><%= RecordAmount %></span>�� &nbsp; ��<%= Index %>ҳ/��<%= PageAmount %>ҳ &nbsp;
    ÿҳ<asp:TextBox ID="tbSize" runat="server" MaxLength="2" Width="20px"></asp:TextBox>��
    &nbsp;<span class="noprint">
    <asp:LinkButton ID="lbnFirst" runat="server" Text="�� ҳ" OnClick="lbnFirst_Click"></asp:LinkButton>
    <asp:LinkButton ID="lbnPrevious" runat="server" Text="��һҳ" OnClick="lbnPrevious_Click"></asp:LinkButton>
    <asp:LinkButton ID="lbnNext" runat="server" Text="��һҳ" OnClick="lbnNext_Click"></asp:LinkButton>
    <asp:LinkButton ID="lbnLast" runat="server" Text="ĩ ҳ" OnClick="lbnLast_Click"></asp:LinkButton>
    <asp:DropDownList ID="ddlGoPage" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlGoPage_SelectedIndexChanged">
    </asp:DropDownList></span></div>
