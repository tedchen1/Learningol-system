<%@ Page Language="C#" MasterPageFile="~/Manage/ManagePage.Master" AutoEventWireup="true"
    Codebehind="Test_Review.aspx.cs" Inherits="Song.Site.Manage.Exam.Test_Review"
    Title="�ޱ���ҳ" %>

<%@ MasterType VirtualPath="~/Manage/PageWin.Master" %>
<%@ Register Assembly="WeiSha.WebControl" Namespace="WeiSha.WebControl" TagPrefix="cc1" %>
<%@ Register Assembly="WeiSha.WebEditor" Namespace="WeiSha.WebEditor" TagPrefix="Kind" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphMain" runat="server">
  <script language="javascript" type="text/javascript">
//��ǰ��������ʱ��
var ServerTime=new Date("<%= new WeiSha.Common.Param.Method.ConvertToAnyValue(DateTime.Now.ToString()).JavascriptTime %>");
//��ǰ�ͻ���ʱ��
var ClientTime=new Date();
//�Ծ�ID
var testPagerID=<%= pager.Tp_Id %>;
//����ID
var examID=0;
//ΨһID
var uid="<%= uid %>";
//����ID
var stID=<%= st.St_ID %>;
    </script>
    <script type="text/javascript" src="Scripts/Mask.js"></script>
    <script type="text/javascript" src="Scripts/QuesLoad.js"></script>
 
<div id="examHeader">
    <fieldset id="emplyee">
    <legend>������Ϣ</legend>
    <img width="100" height="133" id="empBoxPhoto" src="<%= acc.Acc_Photo%>" />
    <div class="empName">
      <table cellspacing="0" cellpadding="0" width="100%" border="0">
        <tr>
          <td width="40" class="right"> ������</td>
          <td><%= acc.Acc_Name%> </td>
        </tr>
        <tr>
          <td class="right"> ���ţ� </td>
          <td><%= acc.Acc_EmpCode%> </td>
        </tr>
        <tr>
          <td class="right"> ���ţ� </td>
          <td><%= acc.Dep_CnName%> </td>
        </tr>
        <tr>
          <td class="right"> ���飺 </td>
          <td><%= acc.Team_Name%> </td>
        </tr>
      </table>
    </div>
    </fieldset>
    <fieldset id="examInfo">
    <legend>���Իع�</legend>
    
        <table cellspacing="0" cellpadding="0" width="100%" border="0">
        <tr>
            <td width="80" class="right"> �������⣺</td>
            <td> ��<%= exr.Exam_Title%> �� </td>
          </tr>
          <tr>
            <td width="80" class="right"> �Ծ����ƣ�</td>
            <td> ��<%= pager.Tp_Name%> �� </td>
          </tr>
          <tr>
            <td class="right"> ѧ��/רҵ�� </td>
            <td><%= pager.Sbj_Name%><span id="sbjid" style="display: none"> <%= pager.Sbj_ID%></span>  </td>
          </tr>
               <tr>
            <td class="right"> ʱ���� </td>
            <td><span id="timeSpan"> <%=pager.Tp_Span%>  </span>���� / <%=pager.Tp_Count%>  </span>���� </td>
          </tr>
          <tr>
            <td class="right"> ����÷֣� </td>
            <td><span id="Span1"> <%=exr.Exr_Score%> �� </span> </td>
          </tr>
        </table>
     
    </fieldset>

    <fieldset id="quesState">
    <legend>����״̬ </legend>
    <div id="stateBox">
      <dl>
      </dl>
    </div>
    <div id="runState">
      <div id="runShow"> 
        </div>
      <div id="btnBox">
       
        <div id="btnClose" onclick="new parent.PageBox().Close();"><%--�ر�--%>&nbsp;</div>
        
      </div>
    </div>
    </fieldset>
  </div>
    <%--����չʾ��--%>
  <div id="quesArea">
    <dl>
    </dl>
  </div>
  <%--������--%>
  <div id="controlBox">
  
    <div id="btnNext" class="btn"> <%--��һ��--%> &nbsp;</div>
    <div id="btnPrev" class="btn"> <%--��һ��--%> &nbsp;</div>
  </div>
</asp:Content>

