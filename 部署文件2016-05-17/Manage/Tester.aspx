﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Tester.aspx.cs" Inherits="Song.Site.Manage.Tester" %>

<%@ Register Src="Utility/ExcelInput.ascx" TagName="ExcelInput" TagPrefix="uc1" %>

<%@ Register src="Utility/Uploader.ascx" tagname="Uploader" tagprefix="uc2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<script type="text/javascript" src="CoreScripts/jquery.js"></script>

<head runat="server">
    <title>无标题页</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Image ID="Image1" ImageUrl runat="server" />
        </div>
  
   
  <hr />
    <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
    </form>
</body>
</html>
