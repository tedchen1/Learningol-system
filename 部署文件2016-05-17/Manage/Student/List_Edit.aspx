<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    CodeBehind="List_Edit.aspx.cs" Inherits="Song.Site.Manage.Student.List_Edit"
    Title="无标题页" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="Kind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <script language="javascript" src="../Utility/datepicker/WdatePicker.js" type="text/javascript"></script>
    <script type="text/javascript" src="../CoreScripts/hanzi2pinyin.js"></script>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="right" width="80px">
                姓名：
            </td>
            <td>
                <asp:TextBox ID="St_Name" nullable="false" pinyin="St_Pinyin" Width="100" MaxLength="6"
                    runat="server"></asp:TextBox> 所在组：<asp:DropDownList ID="Sts_ID" runat="server" DataTextField="Sts_Name" DataValueField="Sts_ID">
                
            </asp:DropDownList>
            </td>
            <td width="200" rowspan="8" class=right valign="top">
                <img src="../Images/nophoto.jpg" name="imgShow" width="150" height="200" id="imgShow"
                    runat="server" /><br />
                <cc1:FileUpload ID="fuLoad" runat="server" fileallow="jpg|bmp|gif|png" Width="150" />
            </td>
        </tr>
        <tr>
            <td class="right">
                拼音：
            </td>
            <td>
                <asp:TextBox ID="St_Pinyin" runat="server" Width="100" MaxLength="5"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                
            </td>
            <td>
               &nbsp;<asp:CheckBox ID="St_IsUse" Checked="true" runat="server"
                        Text="启用" />&nbsp;<asp:CheckBox ID="St_IsPass" Checked="true" runat="server"
                        Text="审核通过" />
            </td>
        </tr>
         <tr>
            <td class="right">
                手机号：
            </td>
            <td>
                <asp:TextBox ID="St_PhoneMobi" runat="server" Width="200" nullable="false" datatype="mobile"></asp:TextBox>&nbsp;<asp:CheckBox
                    ID="St_IsOpenMobi" runat="server" Text="是否公开" />
            </td>
        </tr>
        <tr>
            <td class="right">
                账号：
            </td>
            <td>
                <asp:TextBox ID="St_AccName" runat="server" Width="200" nullable="false" MaxLength="20"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                签名：
            </td>
            <td>
                <asp:TextBox ID="St_Signature" runat="server" lenlimit="200" TextMode="MultiLine"
                    Width="90%" Height="60" EnableTheming="false"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                性别：
            </td>
            <td>
                <asp:RadioButtonList ID="St_Sex" runat="server" RepeatDirection="Horizontal">
                    <asp:ListItem Value="0">未知</asp:ListItem>
                    <asp:ListItem Value="1">男</asp:ListItem>
                    <asp:ListItem Value="2">女</asp:ListItem>
                </asp:RadioButtonList>
            </td>
        </tr>
  
        <tr>
            <td class="right">
                出生年月：
            </td>
            <td>
                <asp:TextBox ID="St_Birthday" runat="server" onfocus="WdatePicker()" EnableTheming="false" CssClass="Wdate"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                身份证：
            </td>
            <td>
                <asp:TextBox ID="St_IDCardNumber" runat="server"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                最高学历：
            </td>
            <td colspan="2">
                <asp:DropDownList ID="St_Education" runat="server">
                    <asp:ListItem Value="81">小学</asp:ListItem>
                    <asp:ListItem Value="71">初中</asp:ListItem>
                    <asp:ListItem Value="61">高中</asp:ListItem>
                    <asp:ListItem Value="41">中等职业教育</asp:ListItem>
                    <asp:ListItem Value="31">大学（专科）</asp:ListItem>
                    <asp:ListItem Value="21">大学（本科）</asp:ListItem>
                    <asp:ListItem Value="14">硕士</asp:ListItem>
                    <asp:ListItem Value="11">博士</asp:ListItem>
                    <asp:ListItem Value="90">其它</asp:ListItem>
                </asp:DropDownList>
            </td>
        </tr>
        <tr>
            <td class="right">
                专业：
            </td>
            <td colspan="2">
                <asp:TextBox ID="St_Major" Width="300" runat="server"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                籍贯：
            </td>
            <td colspan="2">
                <asp:TextBox ID="St_Native" runat="server"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                民族：
            </td>
            <td colspan="2">
                <asp:TextBox ID="St_Nation" runat="server"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right" width="80px" valign="top">
                <br />
                个人介绍：
            </td>
            <td colspan="2">
                <Kind:Editor ID="St_Intro" runat="server" Height="250px" Width="99%"> </Kind:Editor>
            </td>
        </tr>
       
    </table>
     <table width="100%" border="0" cellspacing="0" cellpadding="0">
       
       
        <tr>
            <td class="right" width="80">
                电话：
            </td>
            <td>
                <asp:TextBox ID="St_Phone" runat="server" datatype="tel"></asp:TextBox>&nbsp;<asp:CheckBox
                    ID="St_IsOpenPhone" runat="server" Text="是否公开" />
            </td>
        </tr>
       
        <tr>
            <td class="right">
                电子邮箱：
            </td>
            <td>
                <asp:TextBox ID="St_Email" runat="server" datatype="email"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                QQ：
            </td>
            <td>
                <asp:TextBox ID="St_QQ" runat="server"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                微信：
            </td>
            <td>
                <asp:TextBox ID="St_Weixin" runat="server"></asp:TextBox>
            </td>
        </tr>
         <tr>
            <td class="right">
                住址：
            </td>
            <td>
                <asp:TextBox ID="St_Address" runat="server" Width="300"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                通讯地址：
            </td>
            <td>
                <asp:TextBox ID="St_AddrContact" runat="server" Width="300"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="right">
                邮编：
            </td>
            <td>
                <asp:TextBox ID="St_Zip" runat="server" datatype="zip" Width="80"></asp:TextBox>
            </td>
        </tr>
         <tr>
            <td class="right">
                紧急联系人：
            </td>
            <td>
                <asp:TextBox ID="St_LinkMan" runat="server" Width="160"></asp:TextBox>
            </td>
        </tr>
         <tr>
            <td class="right">
                紧急电话：
            </td>
            <td>
                <asp:TextBox ID="St_LinkManPhone" runat="server"  Width="160"></asp:TextBox>
            </td>
        </tr>
    
    </table>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
    <cc1:EnterButton verify="true" ID="btnEnter" runat="server" Text="确定" OnClick="btnEnter_Click"
        ValidationGroup="enter" />
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>
