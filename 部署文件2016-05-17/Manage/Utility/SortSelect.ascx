<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SortSelect.ascx.cs"
    Inherits="Song.Site.Manage.Utility.SortSelect" %>
    <%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<cc1:dropdowntree id="ddlSubject" runat="server" idkeyname="Sbj_ID" parentidkeyname="Sbj_PID"
    taxkeyname="Sbj_Tax" width="150" autopostback="True" onselectedindexchanged="ddlSubject_SelectedIndexChanged">
                    </cc1:dropdowntree>
<cc1:dropdowntree id="ddlCourse" runat="server" idkeyname="Cou_ID" parentidkeyname="Cou_PID"
    taxkeyname="Cou_Tax" width="150" autopostback="True" onselectedindexchanged="ddlCourse_SelectedIndexChanged">
                    </cc1:dropdowntree>
<cc1:dropdowntree id="ddlOutline" runat="server" idkeyname="Ol_ID" parentidkeyname="Ol_PID"
    taxkeyname="Ol_Tax" width="150">
                    </cc1:dropdowntree>
