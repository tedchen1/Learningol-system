<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    CodeBehind="Subject_Edit.aspx.cs" Inherits="Song.Site.Manage.Sys.Subject_Edit"
    Title="无标题页" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <table width="100%" border="0" cellspacing="2" cellpadding="0" class="tableContext">
        <tr>
            <td width="80" class="right">
                名称：
            </td>
            <td>
                <asp:TextBox nullable="false" ID="Sbj_Name" runat="server" Width="80%" MaxLength="200"></asp:TextBox>
            </td>
            <td width="110" rowspan="4" class="right" valign="top">
                <img src="../Images/nophoto.jpg" name="imgShow" width="100" height="100" id="imgShow"
                    runat="server" /><br />
                <cc1:FileUpload ID="fuLoad" runat="server" fileallow="jpg|bmp|gif|png" Width="100" />
            </td>
        </tr>
        <tr>
            <td class="right">
                别名：
            </td>
            <td>
                <asp:TextBox ID="Sbj_ByName" runat="server" Width="80%" MaxLength="200"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                所属院系：
            </td>
            <td>
                <cc1:DropDownTree ID="ddlDepart" runat="server" Width="80%" IdKeyName="dep_id" ParentIdKeyName="dep_PatId"
                    TaxKeyName="dep_Tax" novalue="-1" 
                    onselectedindexchanged="ddlDepart_SelectedIndexChanged">
                </cc1:DropDownTree>
            </td>
        </tr>
         <tr>
            <td class="right">
                上级专业：
            </td>
            <td>
                <cc1:DropDownTree ID="ddlTree" runat="server" IdKeyName="Sbj_ID" ParentIdKeyName="Sbj_PID"
                    TaxKeyName="Sbj_Tax" Width="80%">
                </cc1:DropDownTree>
            </td>
        </tr>
        <tr>
            <td class="right">
                状态：
            </td>
            <td>
                <asp:CheckBox ID="Sbj_IsUse" runat="server" Checked="True" Text="是否启用" />
            </td>
        </tr>
        <tr>
            <td class="right" valign="top">
                说明：
            </td>
            <td  colspan=2>
                <asp:TextBox ID="Sbj_Intro" runat="server" Height="100px" MaxLength="255" TextMode="MultiLine"
                    Width="99%"></asp:TextBox>
            </td>
        </tr>
    </table>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
    <cc1:EnterButton verify="true" ID="btnEnter" runat="server" Text="确定" OnClick="btnEnter_Click"
        ValidationGroup="enter" />
    <%--<Song:DeleteButton ID="DeleteButton1" runat="server" OnClick="btnDelete_Click" />--%>
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>
