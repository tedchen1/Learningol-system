<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    Codebehind="OrganLevel_Edit.aspx.cs" Inherits="Song.Site.Manage.Sys.OrganLevel_Edit"
    Title="�ޱ���ҳ" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <table width="100%" border="0" cellspacing="2" cellpadding="0" class="tableContext">
        <tr>
            <td width="80" class="right">
                ���ƣ�</td>
            <td>
                <asp:TextBox nullable="false" ID="tbName" runat="server"  MaxLength="200" Width="80%"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                ��ʶ��</td>
            <td>
                <asp:TextBox nullable="false" ID="tbTag" runat="server"  MaxLength="50" Width="100"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                ״̬��</td>
            <td>
                <asp:CheckBox ID="cbIsUse" runat="server" Checked="True" Text="�Ƿ�����" />
            </td>
        </tr>
        <tr>
            <td class="right">
                �ȼ���</td>
            <td>
                <asp:TextBox nullable="false" ID="tbLevel" runat="server" MaxLength="2" datatype="uint"
                    Width="30"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right" valign="top">
                ˵����
            </td>
            <td>
                <asp:TextBox ID="tbIntro" runat="server" Height="120px" MaxLength="255" TextMode="MultiLine"
                    Width="99%"></asp:TextBox></td>
        </tr>
    </table>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
    <cc1:EnterButton verify="true" ID="btnEnter" runat="server" Text="ȷ��" OnClick="btnEnter_Click"
        ValidationGroup="enter" />
    <%--<Song:DeleteButton ID="DeleteButton1" runat="server" OnClick="btnDelete_Click" />--%>
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>
