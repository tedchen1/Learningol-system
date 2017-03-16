<%@ Page Language="C#" MasterPageFile="~/Manage/ManagePage.Master" AutoEventWireup="true"
    Codebehind="OrganLevel.aspx.cs" Inherits="Song.Site.Manage.Sys.OrganLevel" Title="�ޱ���ҳ" %>

<%@ Register Src="../Utility/toolsBar.ascx" TagName="toolsBar" TagPrefix="uc1" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
   <div id="header"> <uc1:toolsBar ID="ToolsBar1" runat="server" WinPath="OrganLevel_Edit.aspx" AddButtonOpen="true"
         WinWidth="600" WinHeight="400" GvName="GridView1" OnDelete="DeleteEvent"/>
         </div>
    <cc1:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" 
        SelectBoxKeyName="SelectBox" ShowSelectBox="True">
        <EmptyDataTemplate>
            ��û�д����ȼ���
        </EmptyDataTemplate>
        <Columns>
            <asp:TemplateField HeaderText="���">
                <itemstyle cssclass="center" width="40" />
                <itemtemplate>
<%# Container.DataItemIndex   + 1 %>
</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="����">
                <itemtemplate>
<cc1:RowDelete id="btnDel" onclick="btnDel_Click" runat="server"></cc1:RowDelete> 
<cc1:RowEdit id="btnEdit" runat="server" ></cc1:RowEdit> 
</itemtemplate>
                <itemstyle cssclass="center" width="44px" />
            </asp:TemplateField>
  
            <asp:TemplateField HeaderText="����">
                <itemstyle cssclass="center" width="150px"  />
                <itemtemplate>
<%# Eval("Olv_Name")%>
</itemtemplate>
            </asp:TemplateField>
             <asp:TemplateField HeaderText="�ȼ�">
                <itemstyle cssclass="center"  width="44px" />
                <itemtemplate>
<%# Eval("Olv_Level")%>
</itemtemplate>
            </asp:TemplateField>
              <asp:TemplateField HeaderText="���">
                <itemstyle cssclass="center" />
                <itemtemplate>
<%# Eval("Olv_Intro")%>
</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="Ĭ��">
                <itemstyle cssclass="center" width="100px" />
                <itemtemplate>
<cc1:StateButton id="sbDef" onclick="sbDef_Click" runat="server" Enabled='<%# Eval("Olv_IsDefault","{0}")=="False"%>' TrueText="Ĭ��" FalseText="����Ĭ��" State='<%# Eval("Olv_IsDefault","{0}")=="True"%>'></cc1:StateButton> 
</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="ʹ��">
                <itemstyle cssclass="center" width="60px" />
                <itemtemplate>
<cc1:StateButton id="sbUse" onclick="sbShow_Click" runat="server" TrueText="ʹ��" FalseText="����" State='<%# Eval("Olv_IsUse","{0}")=="True"%>'></cc1:StateButton> 
</itemtemplate>
            </asp:TemplateField>
             <asp:TemplateField HeaderText="����">
                <itemstyle cssclass="center"  width="60px" />
                <itemtemplate>
<a href="#" onclick="OpenWin('purview.aspx?id=<%# Eval("Olv_ID")%>&type=orglevel','����Ȩ��',800,600);return false;">Ȩ��</a>
</itemtemplate>
            </asp:TemplateField>
              
        </Columns>
    </cc1:GridView>
</asp:Content>
