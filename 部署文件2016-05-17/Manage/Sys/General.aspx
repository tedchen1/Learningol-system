<%@ Page Language="C#" MasterPageFile="~/Manage/ManagePage.Master" AutoEventWireup="true"
    Codebehind="General.aspx.cs" Inherits="Song.Site.Manage.Sys.General" Title="无标题页" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
<script type="text/javascript" src="../CoreScripts/iColorPicker.js"></script>

    系统名称：<asp:TextBox ID="tbSysName" runat="server" Width="50%" MaxLength="100"></asp:TextBox><br />
    <br />
    <asp:CheckBox ID="cbLogin" runat="server" Text="是否记录登录信息" />
    记录<asp:TextBox ID="tbLoginTimeSpan" runat="server" MaxLength="2" Width="30px"></asp:TextBox>天之内的登录信息<br />
    <asp:CheckBox ID="cbWork" runat="server" Text="是否记录操作信息" />
    记录<asp:TextBox ID="tbWorkTimeSpan" runat="server" MaxLength="2" Width="30px"></asp:TextBox>天之内的操作信息<br />
    <br />
    <fieldset id="fieldMobile" runat="server">
        <legend>
            <asp:CheckBox ID="cbIsMobileUse" runat="server" Text="允许使用手机客户端" AutoPostBack="True"
                OnCheckedChanged="cbIsMobileUse_CheckedChanged" />
        </legend>
        <asp:Panel ID="plMobileBox" runat="server">
            <div class="mobileBox">
                <asp:CheckBox ID="cbIsMobileVerify" runat="server" Text="采用验证码" AutoPostBack="True"
                    OnCheckedChanged="cbIsMobileVerify_CheckedChanged" />
                <asp:TextBox ID="tbMobileCode" runat="server" MaxLength="4" Width="60px"></asp:TextBox>
                <asp:LinkButton ID="lbBuildCode" runat="server" OnClick="lbBuildCode_Click">随机生成验证码</asp:LinkButton></div>
        </asp:Panel>
  </fieldset>
    <fieldset id="Fieldset1" runat="server">
        <legend>二维码系统设置 </legend>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="200" valign="top"><strong>颜色</strong><br />
      前景色：<asp:TextBox ID="tbQrColor" runat="server" MaxLength="10" Width="60px" CssClass="iColorPicker" SkinID="不存在皮肤主题"></asp:TextBox></td>
    <td valign="top"><asp:CheckBox ID="cbQrCodeImg" runat="server" Text="在二维码中心显示Logo" />
        <br />
        <img src="../Images/nophoto.gif" name="imgShow" width="60" id="imgShow" runat="server" /><br />
        <cc1:FileUpload ID="fuLoad" runat="server" fileallow="png" /></td>
  </tr>
</table>

        
  </fieldset>
     <br />
    <asp:Button ID="btnEnter" runat="server" verify="true" Text="确 定" OnClick="btnEnter_Click" />
</asp:Content>
