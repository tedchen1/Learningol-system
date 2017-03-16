<%@ Control Language="C#" AutoEventWireup="true" Codebehind="ExcelInput.ascx.cs"
    Inherits="Song.Site.Manage.Utility.ExcelInput" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
.
<fieldset id="fdPanel1" runat="server">
    <legend>��һ�����ϴ�Excel����</legend>
    <table width="100%" border="0" cellspacing="2" cellpadding="0" class="tableContext">
        <tr>
            <td width="80" class="right">
                ģ�壺</td>
            <td>
                <asp:HyperLink ID="linkDataTmp" Target="_blank" runat="server">�������{0}ģ��</asp:HyperLink>
                <span style="color: Red">�����ݸ�ʽ�밴��ģ������</span></td>
        </tr>
        <tr>
            <td class="right">
                �ϴ����ݣ�</td>
            <td>
                <cc1:FileUpload ID="fuLoad" runat="server" Width="350px" group="upload" fileallow="xls|xlsx"
                    nullable="false"></cc1:FileUpload>
                <asp:Button ID="btnUp" OnClick="btnUp_Click" runat="server" Text="�ϴ�����" verify="true"
                    group="upload" /></td>
        </tr>
        <tr>
            <td class="right">
                ״̬��</td>
            <td>
                <asp:Label ID="lbState" runat="server" Text="�ȴ��ϴ�����"></asp:Label>
            </td>
        </tr>
        <tr>
            <td class="right">
            </td>
            <td>
                <asp:Label ID="lbError1" runat="server" ForeColor="Red"></asp:Label>
            </td>
        </tr>
        <tr>
            <td class="right">
                ����˵����
            </td>
            <td>
                1����Ҫ�����Excel�����밴��ģ���ʽ����<br />
                2��Excel�ĵ�֧��Excel97��2003��2007��2010���ְ汾��
            </td>
        </tr>
        <tr>
            <td class="right">
                &nbsp;
            </td>
            <td>
                <asp:Button ID="btnNext1" runat="server" Text="��һ��" Visible="false" OnClick="btnNext1_Click" />
            </td>
        </tr>
    </table>
</fieldset>
<fieldset id="fdPanel2" runat="server" visible="false">
    <legend>�ڶ�����ѡ��Ҫ����Ĺ�����</legend>
    <table width="100%" border="0" cellspacing="2" cellpadding="0" class="tableContext">
        <tr>
            <td class="right">
                ��������</td>
            <td>
                ���ڲ����ĵ� ��<asp:Label ID="lbFile2" runat="server" Text=""></asp:Label>��
            </td>
        </tr>
        <tr>
            <td width="80" class="right">
                ��������</td>
            <td>
                <asp:DataList ID="dlWorkBook" runat="server" RepeatDirection="Horizontal">
                    <ItemTemplate>
                        <asp:Button ID="btnWorkBook" runat="server" CssClass="workbook" Text='<%# Eval("Name","{0}")+"��"+Eval("Count","{0}������")%>'
                            CommandArgument='<%# Container.ItemIndex  %>' OnClick="btnSheet_Click"></asp:Button>
                    </ItemTemplate>
                </asp:DataList>
            </td>
        </tr>
        <tr>
            <td class="right">
                ״̬��</td>
            <td>
                ��ѡ��Ҫ�����ġ���������
            </td>
        </tr>
        <tr>
            <td class="right">
            </td>
            <td>
                <asp:Label ID="lbError2" runat="server" ForeColor="Red"></asp:Label>
            </td>
        </tr>
        <tr>
            <td class="right">
                ����˵����
            </td>
            <td>
                1����ǰExcel�ĵ�������<asp:Literal ID="ltSheetCount" runat="server"></asp:Literal>����������<br />
                2����ѡ��Ҫ����Ĺ�����������Ϸ���������ť������һ����������
            </td>
        </tr>
        <tr>
            <td class="right">
                &nbsp;
            </td>
            <td>
                <asp:Button ID="btnBack2" runat="server" Text="��һ��" OnClick="btnBack2_Click" />
            </td>
        </tr>
    </table>
</fieldset>
<fieldset id="fdPanel3" runat="server" visible="false">
    <legend>��������ƥ��Excel�е����������ݿ��ֶεĶ�Ӧ��ϵ</legend>
    <table width="100%" border="0" cellspacing="2" cellpadding="0" class="tableContext">
        <tr>
            <td class="right" width="80px">
                ��������</td>
            <td>
                ���ڲ����ĵ� ��<asp:Label ID="lbFile3" runat="server" Text=""></asp:Label>���Ĺ�����<asp:Label
                    ID="lbSheet3" runat="server" Text=""></asp:Label>
            </td>
        </tr>
    </table>
    <asp:DataList ID="dlColumn" runat="server" RepeatColumns="3" RepeatDirection="Horizontal">
        <ItemTemplate>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="40%" align="right" class="right">
                        <asp:Label ID="lbColumn" Text='<%# Eval("name") %>' runat="server" Font-Bold="True"></asp:Label>
                        &nbsp;��&nbsp;</td>
                    <td width="10%">
                        >></td>
                    <td width="50%">
                        <asp:DropDownList ID="ddlColumnForField" runat="server">
                        </asp:DropDownList></td>
                </tr>
            </table>
        </ItemTemplate>
        <ItemStyle Width="300px" />
    </asp:DataList>
    <table width="100%" border="0" cellspacing="2" cellpadding="0" class="tableContext">
   
            <tr>
                <td class="right">
                </td>
                <td>
                    <asp:Label ID="lbError3" runat="server" ForeColor="Red"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="right" width="80">
                    ����˵����
                </td>
                <td>
                    1�������Excel���е������ֶΣ�excel�����У����Ҳ������ݿ��е��ֶΣ�<br />
                    2��ϵͳ�������Զ�ƥ�䣬������֤��ȫ��ȷ�����ֹ����ö�Ӧ��ϵ��
                </td>
            </tr>
        <tr>
            <td class="right">
                &nbsp;
            </td>
            <td>
                <asp:Button ID="btnBack3" runat="server" Text="��һ��" OnClick="btnBack_Click" />
                &nbsp;
                <asp:Button ID="btnInput" runat="server" Text="��������" OnClick="btnInput_Click" ForeColor="Red" />
            </td>
        </tr>
    </table>
</fieldset>
<fieldset id="fdPanel4" runat="server" visible="false">
    <legend>���ݵ�����ɣ�</legend>
    <table width="100%" border="0" cellspacing="2" cellpadding="0" class="tableContext">
        <tr>
            <td class="right" width="80px">
                ��������</td>
            <td>
                ���ڲ����ĵ� ��<asp:Label ID="lbFile4" runat="server" Text=""></asp:Label>���Ĺ�����<asp:Label
                    ID="lbSheet4" runat="server" Text=""></asp:Label>
            </td>
        </tr>
        <tr>
            <td class="right">
                ״̬��
            </td>
            <td>
                �ɹ�����
                <asp:Label ID="lbSuccCount" runat="server" ForeColor="Green" Font-Bold="True"></asp:Label>
                �����ݣ�ʧ��
                <asp:Label ID="lbErrorCount" runat="server" ForeColor="#C00000" Font-Bold="True"></asp:Label>
                �����ݣ�<br />
            </td>
        </tr>
        <tr>
            <td class="right">
                &nbsp;
            </td>
            <td>
                <asp:Button ID="btnBack4" runat="server" Text="������������������" OnClick="btnBack4_Click" />
                <asp:Button ID="btnBack5" runat="server" Text="������������Excel����" OnClick="btnBack5_Click" />
                <asp:Button ID="btnOutpt" runat="server" Text="������������" Visible="false" OnClick="btnOutpt_Click" />
            </td>
        </tr>
    </table>
</fieldset>
<fieldset id="fdPanel5" runat="server" visible="false">
    <legend>ʧ�ܵ���Ľ�����£�</legend>
    <asp:GridView ID="gvError" runat="server" AutoGenerateColumns="True">
    </asp:GridView>
</fieldset>
