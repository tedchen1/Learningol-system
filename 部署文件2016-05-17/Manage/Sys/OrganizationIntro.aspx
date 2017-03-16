<%@ Page Language="C#" MasterPageFile="~/Manage/ManagePage.Master" AutoEventWireup="true" CodeBehind="OrganizationIntro.aspx.cs" Inherits="Song.Site.Manage.Sys.OrganizationIntro" Title="无标题页" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="Kind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
  <p>
    <Kind:Editor ID="tbIntro" runat="server" Height="400px">
    </Kind:Editor>
  </p>
  <p> 　　　　　
    <asp:Button ID="BtnEnter" runat="server" Text="确  定" verify="true" OnClick="BtnEnter_Click"  />
  </p>
</asp:Content>
