<%@ Control Language="C#" AutoEventWireup="true" Codebehind="QrBuilder.ascx.cs" Inherits="Song.Site.Manage.Utility.QrBuilder" %>

<script type="text/javascript" src="/manage/CoreScripts/iColorPicker.js"></script>

<table width="100" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td valign="top">
            ��ά�����ݣ�<asp:RequiredFieldValidator ID="rfv1" runat="server" ErrorMessage="����Ϊ��"
                ValidationGroup="qrcode" ControlToValidate="tbContent" SetFocusOnError="True"></asp:RequiredFieldValidator><br />
            <asp:TextBox ID="tbContent" runat="server" TextMode="MultiLine" Width="200px" Height="150px" ></asp:TextBox><br />           </td>
        <td valign="top">
            <div style="margin-left:10px">��ά�룺<br />
            <asp:Image ID="imgQr" Height="150px" runat="server" /></div></td>
    </tr>
    <tr>
        <td colspan="2">
             ǰ����<asp:TextBox ID="tbColor" runat="server" Width="60px" CssClass="iColorPicker"
                SkinID="������Ƥ������"></asp:TextBox> &nbsp;
            ������<asp:TextBox ID="tbBgcolor" runat="server" Width="60px"
                    CssClass="iColorPicker" SkinID="������Ƥ������"></asp:TextBox><br />
            ��ߣ�<asp:TextBox ID="tbWh" runat="server" Width="60px" Text="150"></asp:TextBox>����  &nbsp;
            <asp:CheckBox ID="cbIsLogo" runat="server" Text="�Ƿ������ҵLogo" Checked="True" />            </td>
    </tr>
</table>
<asp:Button ID="btnBuilerQr" runat="server" Text="���ɶ�ά��" ValidationGroup="qrcode" OnClick="btnBuilerQr_Click" /> <span id="qrcodeEnterShow" style="display:none">��������...</span>
<script type="text/javascript">
$(function(){
	$("input[id$='btnBuilerQr']").click(function(){
		//$(this).attr({"disabled":"disabled"});
		var context=$("textarea[id$='tbContent']").val();
		if($.trim(context)!="")
		{
		    $("#qrcodeEnterShow").show();
		}
	});
})
</script>

