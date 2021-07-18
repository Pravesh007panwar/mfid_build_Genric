<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
 <%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>
<%@ taglib uri="http://displaytag.sf.net" prefix="display" %>
<%@ page import="java.util.*, java.lang.*,java.util.*,com.innefu.mfid.dataaccess.om.*,com.opensymphony.xwork2.ActionContext" %>



<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<!--
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script> -->


    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Dashboard</title>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/web/displaytag/displaytagex.css">
		
    <link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_responsive.css" rel="stylesheet" />
	

	<link href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
	
	<link href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />

    <!--[if lt IE 9]>
    <!-- END: load jqplot -->
    <script src="<%= request.getContextPath() %>/web/displaytag/RowHandlers.js" language="javascript" type="text/javascript" /></script>
    <script src="<%= request.getContextPath() %>/web/js/setup.js" type="text/javascript"></script>
    <link href="<%= request.getContextPath() %>/web/chart/jqx.base.css" rel="stylesheet" type="text/css" />
   
	
	<link href="<%= request.getContextPath() %>/web/sitemapstyler/sitemapstyler.css" rel="stylesheet" type="text/css" media="screen" />
	 
<%

	Map session3 = (Map) ActionContext.getContext().get("session");
	
	String category = (String) session3.get("categorySelectedForTokenStockReport");
	

%>
   <style>
   .displayTable {
    border: 1px solid #666;
    width: 100%;
    margin: 20px 0 20px 0 !important;

}

.colId{
text-align:center;border:1px solid black;
width: 2%;
}
</style>
</head>
<body>

<div class="container_12">

<div class="grid_displayTag"  style="width: 100%;">
            <div class="box round first" style="width: 90%;">
         		
        <center style="font-size:100%;">Token Detail Type</center>
  <center>	 
   
  
   <%if(!category.equalsIgnoreCase("Total")){ %>
    <display:table class="dataTable" name="${session.tokenStockReportDetail}" uid="vo" pagesize="10" htmlId="rounded-corner"  cellspacing="0px" cellpadding="2px"  export="true" >				  
				  <display:setProperty name="export.pdf" value="true" />
	 <display:setProperty name="export.excel.filename" value="user_token_association.xls" />
	  <display:setProperty name="export.csv.filename" value="user_token_association.csv" />
	   <display:setProperty name="export.xml.filename" value="user_token_association.xml" />
					   <display:setProperty name="export.pdf.filename" value="dashboard.pdf" />
						  <display:setProperty name="export.pdf.include_header" value="true" />			
					<display:column  class="colId" title="S.No." ><s:property value="#attr.vo_rowNum" /></display:column>	
						
						<display:column class="colId" title="Token Serial" property="tokenSerial" />
						<display:column class="colId" title="Assigned to" property="userName" />
						
						<display:column class="colId" title="Lock/Unlock" property="tokenStatus" />
						
						<display:column class="colId" title="Activate date" property="startTime" />
						<display:column class="colId" title="Days left" property="daysLeft" />
					
						
				
				
					
</display:table><%} %>
 <%if(category.equalsIgnoreCase("Total")){ %>
    <display:table class="table table-striped table-bordered" name="${session.tokenStockReportDetail}" uid="vo" pagesize="10" htmlId="sample_1"  cellspacing="0px" cellpadding="2px"  export="true" >				  
				  <display:setProperty name="export.pdf" value="true" />
	 <display:setProperty name="export.excel.filename" value="user_token_association.xls" />
	  <display:setProperty name="export.csv.filename" value="user_token_association.csv" />
	   <display:setProperty name="export.xml.filename" value="user_token_association.xml" />
					   <display:setProperty name="export.pdf.filename" value="dashboard.pdf" />
						  <display:setProperty name="export.pdf.include_header" value="true" />			
					<display:column  class="hidden-phone" title="S.No." style="width:8px;"><s:property value="#attr.vo_rowNum" /></display:column>	
						
						<display:column class="hidden-phone" title="Token Serial" property="tokenSerial" />
						<display:column class="hidden-phone" title="Token Type" property="tokenType" />
						<display:column class="hidden-phone" title="Assigned to" property="userName" />
						
						<display:column class="hidden-phone" title="Lock/Unlock" property="tokenStatus" />
						
						<display:column class="hidden-phone" title="Activate date" property="startTime" />
						<display:column class="hidden-phone" title="Days left" property="daysLeft" />
					
						
				
				
					
</display:table><%} %>
	</center>


        </div></div> 
	
  <!-- BEGIN JAVASCRIPTS -->
	<!-- Load javascripts at bottom, this will reduce page load time -->
   
   <script src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>   
   <script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
   <!-- ie8 fixes -->
   <!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->   
   
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>     
</body>
</html>
