<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Pager2.ascx.cs" Inherits="Song.Site.Manage.Utility.Pager2" %>
<div class="pager">
    <span class="noprint"><a href="<%= First %>">��ҳ</a> <a href="<%= Prev %>">��һҳ</a>
        <%= NumberNav(this.Index,4,"span")%>
        <a href="<%= Next %>">��һҳ</a> <a href="<%= Last %>">ĩҳ</a> ��ҳ<%= Size >= RecordAmount ? RecordAmount : Size%>��/��<span><%= RecordAmount %></span>��
</div>
