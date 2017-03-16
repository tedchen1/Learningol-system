<%@ Page Language="C#" MasterPageFile="~/Manage/ManagePage.Master" AutoEventWireup="true"
    CodeBehind="SelfCourse.aspx.cs" Inherits="Song.Site.Manage.Student.SelfCourse" Title="课程列表" %>

<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
    <div class="itemBox">
        <asp:Repeater ID="rptCourse" runat="server">
            <ItemTemplate>
                <div class="item" couid="<%# Eval("Cou_ID") %>" wd="900" hg="95">
                    <a href="/course.ashx?id=<%# Eval("Cou_ID") %>"><img src="<%# Eval("Cou_LogoSmall") %>"  alt="<%# Eval("Cou_Name","{0}") %>" subject="<%# Eval("sbj_Name","[{0}]") %>"/></a>
                    <div class="itemName"><%# Eval("Cou_Name") %></div>
                    <div class="itemName"><%# Eval("sbj_Name","[{0}]") %></div>
                        <div class="itemBtn"><asp:LinkButton ID="lbSelected" CssClass='<%# Convert.ToBoolean(Eval("Cou_IsStudy")) ? "selected" : "noselect"%>'
                            runat="server" CommandArgument='<%# Eval("Cou_ID") %>' OnClick="lbSelected_Click">
                            
                            <%# Convert.ToBoolean(Eval("Cou_IsStudy")) ? "放弃学习" : "我要学习"%>
                        </asp:LinkButton></div>
                </div>
            </ItemTemplate>
        </asp:Repeater>
    </div>
   
</asp:Content>
