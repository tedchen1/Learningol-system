<%@ Page Language="C#" MasterPageFile="~/Manage/PageWin.Master" AutoEventWireup="true"
    Codebehind="Organization_Admin.aspx.cs" Inherits="Song.Site.Manage.Sys.Organization_Admin"
    Title="�ޱ���ҳ" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <cc1:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" SelectBoxKeyName="SelectBox"
        ShowSelectBox="false">
        <EmptyDataTemplate>
            û������������Ա����Ϣ��
        </EmptyDataTemplate>
        <Columns>
            <asp:TemplateField HeaderText="���">
                <itemstyle cssclass="center" width="40" />
                <itemtemplate>
<%# Container.DataItemIndex   + 1 %>
</itemtemplate>
            </asp:TemplateField>
        
            <asp:TemplateField HeaderText="����/�绰">
                <itemstyle cssclass="left" width="160px" />
                <itemtemplate>
                <%# Eval("acc_Name")%><%# Eval("Posi_Id","{0}") == superid ? "<span style=\"color:Red\" title=\"����Ա\">*</span>" : ""%>
                 <span class="mobileTel" title="Ա���ƶ��绰"><%# Eval("acc_MobileTel")%></span>

</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="����">
                <itemstyle cssclass="center" width="80px" />
                <itemtemplate>
               
<%# Eval("acc_EmpCode", "{0}")%>
</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="��λ">
                <itemstyle cssclass="center" />
                <itemtemplate>
               
<%# Eval("Posi_Name", "{0}")%>
</itemtemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="�ֳ�����Ա">
                <itemstyle cssclass="center" width="100px" />
                <itemtemplate>
               
<cc1:StateButton id="sbAdmin" onclick="sbAdmin_Click" runat="server" TrueText="����Ա" FalseText="����" State='<%# GetAminState(Eval("Acc_ID","{0}"))%>'></cc1:StateButton> 
</itemtemplate>
            </asp:TemplateField>
         
          
        </Columns>
    </cc1:GridView>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBtn" runat="server">
  
    <cc1:CloseButton ID="CloseButton1" runat="server" />
</asp:Content>
