<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Pager2.ascx.cs" Inherits="Song.Site.Manage.Utility.Pager2" %>
<div class="pager">
    <span class="noprint"><a href="<%= First %>">首页</a> <a href="<%= Prev %>">上一页</a>
        <%= NumberNav(this.Index,4,"span")%>
        <a href="<%= Next %>">下一页</a> <a href="<%= Last %>">末页</a> 当页<%= Size >= RecordAmount ? RecordAmount : Size%>条/共<span><%= RecordAmount %></span>条
</div>
