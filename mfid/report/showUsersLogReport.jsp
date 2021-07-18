     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>

<%@ page import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.PropertyFileUtility" %>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>	
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />  
	<meta content="" name="description" />
	<meta content="" name="author" />
	
		
	<script src="<%= request.getContextPath() %>/web/js/custom/userOnlineLogsReport.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/userSystemLogsReport.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/userSystemLogsClickEvent.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/userSubUserLogsReport.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/userSubUserLogsClickEvent.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/userSelfEnrollmentLogsReport.js" type="text/javascript"></script>
	
	
	<%-- <script src="<%= request.getContextPath() %>/web/js/custom/userOfflineLogsReport.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/userPushLogsReport.js" type="text/javascript"></script> --%>
	
	
	
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_responsive.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_default.css" rel="stylesheet" id="style_color" />

	<link href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
	
	<link href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />
	
	
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="<%= request.getContextPath() %>/web/assets/dropzone/css/dropzone.css" rel="stylesheet"/>
    <!-- END PAGE LEVEL STYLES -->
	
	<!--for DataTable--> 
	<%-- <link href="<%= request.getContextPath() %>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
	<link href="<%= request.getContextPath() %>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" /> 
	<!--End for DataTable--> 
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
<!-- BEGIN HEADER -->
	<%@ include file="/common/header.jsp" %>
    <!-- END HEADER -->
<div id="loading" style="display: none;width:100%;height:550px;position:fixed;top:50%;left:50%;z-index: 25;" >
	<img src='<%=request.getContextPath() %>/web/img/ajax_loader_gray_64.gif' width="64" height="64" /><br>Loading..
</div>

	<!-- BEGIN CONTAINER -->
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		 <div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
		<!-- 	<div class="navbar-inverse">
				<form class="navbar-search visible-phone">
					<input type="text" class="search-query" placeholder="Search" />
				</form>
			</div>      -->
			
			<!-- BEGIN SIDEBAR MENU -->
		<%@ include file="/common/menu.jsp" %>
			<!-- END SIDEBAR MENU -->
            
		</div>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
		<div id="main-content">
         <!-- BEGIN PAGE CONTAINER-->
			<div class="container-fluid">
				<!-- BEGIN PAGE HEADER-->   
				<div class="row-fluid">
				   <div class="span12">
					  <h3 class="page-title">
						Users Log Report
					  </h3>
					   <ul class="breadcrumb">
						   <li>
							 <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">Report</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li><a href="<%= request.getContextPath() %>/report_showUsersLogsReport">Users Log Report</a><span class="divider-last">&nbsp;</span></li>
					   </ul>
				   </div>
				</div>
				<!-- END PAGE HEADER-->
				<!-- BEGIN PAGE CONTENT-->
				<div id="page" class="dashboard">                  
								
					<div class="square-state">
						<div class="row-fluid ">
							<div class="span12">
								 <!-- BEGIN TAB PORTLET--> 
								<div class="widget widget-tabs">
									 <div class="widget-title">
									   <h4><i class="icon-retweet"></i>Users&nbsp;Log&nbsp;Report </h4>
									   <span class="tools"> 
									   <a href="javascript:;" class="icon-chevron-down"></a> 
									   <a href="javascript:;" class="icon-remove"></a>
										</span>
									</div> 
									
									<div class="widget-body">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid">
												<a class="icon-btn span2 active" id ="tab_1" href="#block_Online" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Online & Offline</div>
													</span>
												</a>
												
											  	
												<%-- <a class="icon-btn span2 " id ="tab_2" href="#block_System" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>System Report</div>
													</span>
												</a>
												
												
												<a class="icon-btn span2 active" id ="tab_3" href="#block_User" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>User Report</div>
													</span>
												</a> --%>
												 
												
												<a class="icon-btn span2 " id ="tab_2_system_report" href="#block_System" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>System Tiles Report</div>
													</span>
												</a>
												
												
												<a class="icon-btn span2 active" id ="tab_3_user_report" href="#block_User" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>User Tiles Report</div>
													</span>
												</a>
												
													<a class="icon-btn span2 active" id ="tab_4_user_report" href="#block_Self_Enrollment" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Self Enrollment Report</div>
													</span>
												</a>
										
											</div> 
											
											<div class="tab-content">
												<div class="tab-pane active" id="block_Online">
													<div id="user_onlinelogs_report_data"></div>
												</div>
												<div class="tab-pane" id="block_System">
													<div id="user_systemlogs_report_data"></div>
												</div>
												
												<div class="tab-pane" id="block_User">
													<div id="user_userlogs_report_data"></div>
												</div>
												
												<div class="tab-pane" id="block_Self_Enrollment">
													<div id="user_self_enrollment_logs_report_data"></div>
												</div>
												
												<!-- <div class="tab-pane" id="block_Push">
													<div id="user_pushlogs_report_data"></div>
												</div> -->
												
											
												<div class="expo_option">
													<div class="row-fluid" id="expo_opt">
													</div>
												</div>
												
										    	<div id="user_systemlogs_tiles_type"></div>
										    	<div id="user_sub_logs_tiles_type"></div>
										    	
										    	
										  
										</div>
										</div>
									</div>
								</div>
								 <!-- END TAB PORTLET-->
							</div>
						</div>
					</div>
				</div>

				<!-- END PAGE CONTENT-->         
			</div>
			<!-- END PAGE CONTAINER-->
		</div>
		<!-- END PAGE -->
        
        
	</div>
	<!-- END CONTAINER -->
    
	<!-- BEGIN FOOTER -->
<div id="myModalonline" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="onlineuserlogreportcolumn" class="checkboxes" value="UserLogonId" checked/>  	UserLogonId </td></tr>
	   <tr><td><input type="checkbox" name="onlineuserlogreportcolumn" class="checkboxes"  value="App Id" checked/>  App Id  </td></tr>
	<tr><td>  <input type='checkbox' name="onlineuserlogreportcolumn" class='checkboxes'  value='System Name' checked/>  System Name  </td></tr>
	 <tr><td>  <input type='checkbox' name="onlineuserlogreportcolumn" class='checkboxes'  value='Token Type' checked/>  Token Type  </td></tr>
	<tr><td>  <input type='checkbox' name="onlineuserlogreportcolumn" class='checkboxes'  value='Response' checked/>  Response </td></tr>
	<tr><td>  <input type='checkbox' name="onlineuserlogreportcolumn" class='checkboxes'  value='Request Time' checked/>  Request Time </td></tr>
	 <tr><td>  <input type='checkbox' name="onlineuserlogreportcolumn" class='checkboxes'  value='IP' checked/>  	IP  </td></tr>
 </table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserLogReportOnline()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>


<div id="myModalSystem" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="systemuserlogreportcolumn" class="checkboxes" value="System Id" checked/>System Id </td></tr>
	   <tr><td><input type="checkbox" name="systemuserlogreportcolumn" class="checkboxes"  value="Bio" checked/>  Bio  </td></tr>
	<tr><td>  <input type='checkbox' name="systemuserlogreportcolumn" class='checkboxes'  value='Push' checked/>  Push  </td></tr>
	 <tr><td>  <input type='checkbox' name="systemuserlogreportcolumn" class='checkboxes'  value='OTP' checked/>  OTP  </td></tr>
	
 </table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserLogReportSystem()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>


<div id="myModalSystemTiles" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="systemuserlogtilesreportcolumn" class="checkboxes" value="User LogonId" checked/>User LogonId </td></tr>
	   <tr><td><input type="checkbox" name="systemuserlogtilesreportcolumn" class="checkboxes"  value="App Name" checked/>  App Name  </td></tr>
	<tr><td>  <input type='checkbox' name="systemuserlogtilesreportcolumn" class='checkboxes'  value='Auth Type' checked/>  Auth Type  </td></tr>
	 <tr><td>  <input type='checkbox' name="systemuserlogtilesreportcolumn" class='checkboxes'  value='Response' checked/>  Response  </td></tr>
	
 </table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserTilesLogReportSystem()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>





<div id="myModalUser" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="usersubuserlogreportcolumn" class="checkboxes" value="User LogonId" checked/>User LogonId </td></tr>
	 <tr><td> <input type="checkbox" name="usersubuserlogreportcolumn" class="checkboxes" value="System Id" checked/>System Id </td></tr>
	   <tr><td><input type="checkbox" name="usersubuserlogreportcolumn" class="checkboxes"  value="Bio" checked/>  Bio  </td></tr>
	<tr><td>  <input type='checkbox' name="usersubuserlogreportcolumn" class='checkboxes'  value='Push' checked/>  Push  </td></tr>
	 <tr><td>  <input type='checkbox' name="usersubuserlogreportcolumn" class='checkboxes'  value='OTP' checked/>  OTP  </td></tr>
	
 </table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserLogReportUser()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>


<div id="myModalUserTiles" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="userlogtilesreportcolumn" class="checkboxes" value="User LogonId" checked/>User LogonId </td></tr>
	   <tr><td><input type="checkbox" name="userlogtilesreportcolumn" class="checkboxes"  value="App Name" checked/>  App Name  </td></tr>
	<tr><td>  <input type='checkbox' name="userlogtilesreportcolumn" class='checkboxes'  value='Auth Type' checked/>  Auth Type  </td></tr>
	 <tr><td>  <input type='checkbox' name="userlogtilesreportcolumn" class='checkboxes'  value='Response' checked/>  Response  </td></tr>
	
 </table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserTilesLogReport()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>



<div id="myModalSelfEnrollment" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="selfenrollmentreportcolumn" class="checkboxes" value="userLogonId" checked/>User LogonId </td></tr>
	   <tr><td><input type="checkbox" name="selfenrollmentreportcolumn" class="checkboxes"  value="appName" checked/>  App Name  </td></tr>
	<tr><td>  <input type='checkbox' name="selfenrollmentreportcolumn" class='checkboxes'  value='activity' checked/>  Activity  </td></tr>
	 <tr><td>  <input type='checkbox' name="selfenrollmentreportcolumn" class='checkboxes'  value='activityTime' checked/> Activity Time </td></tr>
	  <tr><td>  <input type='checkbox' name="selfenrollmentreportcolumn" class='checkboxes'  value='manager' checked/> Manager </td></tr>
	
 </table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserLogReportSelfEnrollment()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>




    	<div id="myModaloffline" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable1" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="offlineuserlogreportcolumn" class="checkboxes" value="UserLogonId" checked/>  	UserLogonId </td></tr>
	   <tr><td><input type="checkbox" name="offlineuserlogreportcolumn" class="checkboxes"  value="App Id" checked/>  App Id  </td></tr>
	<tr><td>  <input type='checkbox' name="offlineuserlogreportcolumn" class='checkboxes'  value='Token Serial' checked/>  Token Serial  </td></tr>
	<tr><td>  <input type='checkbox' name="offlineuserlogreportcolumn" class='checkboxes'  value='Request Time' checked/>  Request Time </td></tr>
 </table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserLogReportOffline()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>



	<div id="myModalpush" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable2" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="pushuserlogreportcolumn" class="checkboxes" value="UserLogonId" checked/>  	UserLogonId </td></tr>
	   <tr><td><input type="checkbox" name="pushuserlogreportcolumn" class="checkboxes"  value="App Id" checked/>  App Id  </td></tr>
	<tr><td>  <input type='checkbox' name="pushuserlogreportcolumn" class='checkboxes'  value='Token Serial' checked/>  Token Serial  </td></tr>
		<tr><td>  <input type='checkbox' name="pushuserlogreportcolumn" class='checkboxes'  value='Response' checked/>  Response </td></tr>
	<tr><td>  <input type='checkbox' name="pushuserlogreportcolumn" class='checkboxes'  value='Request Time' checked/>  Request Time </td></tr>
	 <tr><td>  <input type='checkbox' name="pushuserlogreportcolumn" class='checkboxes'  value='IP' checked/>  	IP  </td></tr>
 </table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserLogReportPush()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>



	<div id="footer">
		<%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.MFID_FOOTER_MESSAGE) %>
		<div class="span pull-right">
			<span class="go-top"><i class="icon-arrow-up"></i></span>
		</div>
	</div>
	<!-- END FOOTER -->
    
<!-- BEGIN JAVASCRIPTS -->
	<!-- Load javascripts at bottom, this will reduce page load time -->
  <!-- <script src="js/jquery-1.8.3.min.js"></script>-->
   <%-- <script src="<%= request.getContextPath() %>/web/js/jquery-1.7.1.min.js"></script> --%>
   <script src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>   
   <script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
   <!-- ie8 fixes -->
   <!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->   
   
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>
   
   <!-- BEGIN PAGE LEVEL PLUGINS -->
   <script src="<%= request.getContextPath() %>/web/assets/dropzone/dropzone.js"></script>
   <!-- END PAGE LEVEL PLUGINS -->
   
   
<!-- For Datatable (searching)-->   
<%-- <script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js" type="text/javascript"></script> --%>
<script src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js" type="text/javascript"></script>
<!-- End For Datatable (searching)--> 

   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
   
  <%--  <script src="<%= request.getContextPath() %>/web/js/table-editable.js"></script> --%>
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/in/administration-editable.js"></script>
	<%int appId=SessionUtil.getApplication().getId(); 
	String orgName=SessionUtil.getOrganization().getOrganisationName();
	String domain1=SessionUtil.getDomain().getDomainName();
	%>
   <script>
      jQuery(document).ready(function() {       
         // initiate layout and plugins
         App.init();
		 TableEditable.init();
		 TableEditable_App.init();
      });
	  
		$(document).ajaxStart(function(){
  
    $("#loading").css("display","block");
    $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
     // alert("start");
  });
  
  $(document).ajaxComplete(function(){
	// $('select option:contains("Select Size")').attr('disabled', true);
    $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
     // alert("complete");
  });  
   
	  var domain="<%=domain1 %>";
	
	 $('#tab_1').on('click',function(){
	
		   if($("#pageId_logreport").length)
	       {
		   $("#pageId_logreport").val('');
		   $("#pageNum_logreport").val('');
	        }
	        else
	        {
	          globalUserOnlineLogsReportPreviouspageSize="";
 			  globalUserOnlineLogsReportPreviousPageNum="";
	        }
		   	$("#user_systemlogs_report_data").empty();
			$("#user_systemlogs_tiles_type").empty();
			$('#user_sub_logs_tiles_type').empty();
			$("#sample_user_tiles_type").empty();
			$("#user_self_enrollment_logs_report_data").empty();
		openUserOnlineLogsReport(false,false,domain);
		});
		
	/* 	$('#tab_3').live('click',function(){
		openUserPushLogsReport(false,false,domain);
		});
		 */
		
		
		/* $('#tab_2').live('click',function(){
		//alert("openUserOfflineLogsReport");
		  if($("#pageId_logreportOffline").length)
			  {
				  $("#pageId_logreportOffline").val('');
				  $("#pageNum_logreportOffline").val('');
			  }
			else
			{
			  globalUserOfflineLogsReportPreviouspageSize="";
 		      globalUserOfflineLogsReportPreviousPageNum="";
			}  
		openUserOfflineLogsReport(false,false,domain);
		
		}); */
		
	
		//$('#tab_2_system_report').live('click', function(){
		jQuery(document).on('click','#tab_2_system_report',function(){  
		//alert(';::: HI Saurabh System Report::::;');
		   if($("#pageIdUserSystemLogsReport").length){
		   $("#pageIdUserSystemLogsReport").val('');
		   $("#pageNumUserSystemLogsReport").val('');
	       } else {
	    	   globalUserSystemLogsReportPreviouspageSize="";
	    	   globalUserSystemLogsReportPreviousPageNum="";
	       }
		$("#user_onlinelogs_report_data").empty();
		$('#user_sub_logs_tiles_type').empty();
		$("#sample_user_tiles_type").empty();
		$("#user_self_enrollment_logs_report_data").empty();
		openUserSystemLogsReport(false,false,domain);
	});
	
	
		//$('#tab_3_user_report').live('click', function(){
		jQuery(document).on('click','#tab_3_user_report',function(){ 
			//alert(';::: HI Saurabh User Report::::;');
			   if($("#pageIdUserLogsReport").length){
				   $("#pageIdUserLogsReport").val('');
				   $("#pageNumUserLogsReport").val('');
			    } else {
			    	globalUserLogsReportPreviouspageSize="";
			    	globalUserLogsReportPreviousPageNum="";
			    }
			$("#user_onlinelogs_report_data").empty();
			$("#user_systemlogs_report_data").empty();
			$("#user_systemlogs_tiles_type").empty();
			$("#user_self_enrollment_logs_report_data").empty();
			openUserLogsReport(false,false,domain);
		});
		
		//$('#tab_4_user_report').live('click', function(){
		jQuery(document).on('click','#tab_4_user_report',function(){ 
			   if($("#pageIdUserSelfEnrollmentLogsReport").length){
				   $("#pageIdUserSelfEnrollmentLogsReport").val('');
				   $("#pageNumUserSelfEnrollmentLogsReport").val('');
			    } else {
			    	globalUserSelfEnrollmentLogsReportPreviouspageSize="";
			    	globalUserSelfEnrollmentLogsReportPreviousPageNum="";
			    } 
			 $("#user_onlinelogs_report_data").empty();
			$("#user_systemlogs_report_data").empty();
			$('#user_sub_logs_tiles_type').empty();
			$("#sample_user_tiles_type").empty();
			$("#user_self_enrollment_logs_report_data").empty();
			openUserSelfEnrollmentLogsReport(false,false,domain);
		});	
	
	

	/*for select all checkbox*/
	
//jQuery('.group-checkable').live('change',function(){ //Saurabh
	
	jQuery(document).on('click','.group-checkable',function(){ //Saurabh 
	//alert('Saurabh');
		var set = jQuery(this).attr("data-set");
		var checked = jQuery(this).is(":checked");
		//alert(checked);
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
	/* 	var checked = jQuery(this).is(":checked");
		jQuery(set).each(function () {
			if (checked) {
				$(this).attr("checked", true);
			} else {
				$(this).attr("checked", false);
			}
		}); */
		jQuery.uniform.update(set);
    }); 
	
	
	
	
	
/* jQuery('.group-checkable').live('change',function(){ // Saurabh
	//alert("group checkable");
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		//alert(checked);
		if(checked)
		{
			//alert("in if");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
		}
		else
		{
			//alert("in else");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
			//showChangeAuth(false,false);
		}
		jQuery.uniform.update(set);
	});    */ 
 
 //Saurabh
/*
jQuery('.group-checkable1').live('change',function(){
	//alert("group checkable");
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		//alert(checked);
		if(checked)
		{
			//alert("in if");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
		}
		else
		{
			//alert("in else");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
			//showChangeAuth(false,false);
		}
		jQuery.uniform.update(set);
	});    
    
 */
 /*
 
jQuery('.group-checkable2').live('change',function(){
	//alert("group checkable");
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		//alert(checked);
		if(checked)
		{
			//alert("in if");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
		}
		else
		{
			//alert("in else");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
			//showChangeAuth(false,false);
		}
		jQuery.uniform.update(set);
	});    
    
 
 */
 
 
      

function resetAllCheckboxOnline(){
          var set = jQuery(".group-checkable").attr("data-set");
	       var checked = jQuery(".group-checkable").is(":checked");
	       if(!checked){
	       $('.group-checkable').attr("checked", true);
	        jQuery('.group-checkable').uniform();
	       checked = jQuery(".group-checkable").is(":checked");
	      
	       }
	       
	     if(checked)
		      {
			 jQuery(set).each(function () {
			
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
		   		}
		   else
				{
			 
			jQuery(set).each(function () {
			
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
				
		}
		
		jQuery.uniform.update(set);
}
	
	
/* 
function resetAllCheckboxOffline(){
          var set = jQuery(".group-checkable1").attr("data-set");
	       var checked = jQuery(".group-checkable1").is(":checked");
	       if(!checked){
	       $('.group-checkable1').attr("checked", true);
	        jQuery('.group-checkable1').uniform();
	       checked = jQuery(".group-checkable1").is(":checked");
	      
	       }
	       
	     if(checked)
		      {
			 jQuery(set).each(function () {
			
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
		   		}
		   else
				{
			 
			jQuery(set).each(function () {
			
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
				
		}
		
		jQuery.uniform.update(set);
}	


function resetAllCheckboxPush(){
          var set = jQuery(".group-checkable2").attr("data-set");
	       var checked = jQuery(".group-checkable2").is(":checked");
	       if(!checked){
	       $('.group-checkable2').attr("checked", true);
	        jQuery('.group-checkable2').uniform();
	       checked = jQuery(".group-checkable2").is(":checked");
	      
	       }
	       
	     if(checked)
		      {
			 jQuery(set).each(function () {
			
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
		   		}
		   else
				{
			 
			jQuery(set).each(function () {
			
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
				
		}
		
		jQuery.uniform.update(set);
}
*/
jQuery(document).on('click','.bio_Click',function(){  
	var data='';
	tilesType = '&tilesType=Bio';
	data=$(this).attr('data');
	 try{ $("#pageIdUserSystemBioLogsReport").val(''); $("#pageNumUserSystemBioLogsReport").val(''); }catch(err){}
	 bioClick(data,false,false);

});

jQuery(document).on('click','.push_Click',function(){  
	var data='';
	tilesType = '&tilesType=Push';
	data=$(this).attr('data');
	try{ $("#pageIdUserSystemPushLogsReport").val(''); $("#pageNumUserSystemPushLogsReport").val(''); }catch(err){}
     pushClick(data,false,false);
    
});

jQuery(document).on('click','.otp_Click',function(){  
	var data='';
	tilesType = '&tilesType=OTP';
	data=$(this).attr('data');
	 try{ $("#pageIdUserSystemOtpLogsReport").val(''); $("#pageNumUserSystemOtpLogsReport").val(''); }catch(err){}
     otpClick(data,false,false);
    
});


jQuery(document).on('click','.userBioClick',function(){  
	var data='';
	tilesType = '&tilesType=Bio';
	data=$(this).attr('data');
	 try{ $("#pageIdUserTilesBioLogsReport").val(''); $("#pageNumUserTilesBioLogsReport").val(''); }catch(err){}
	 userBioClick(data,false,false);
    
});

jQuery(document).on('click','.userPushClick',function(){  
	var data='';
	tilesType = '&tilesType=Push';
	data=$(this).attr('data');
	try{ $("#pageIdUserTilesPushLogsReport").val(''); $("#pageNumUserTilesPushLogsReport").val(''); }catch(err){}
     userPushClick(data,false,false);
    
});

jQuery(document).on('click','.userOtpClick',function(){  
	var data='';
	tilesType = '&tilesType=OTP';
	data=$(this).attr('data');
	 try{ $("#pageIdUserTilesOtpLogsReport").val(''); $("#pageNumUserTilesOtpLogsReport").val(''); }catch(err){}
     userOtpClick(data,false,false);

});


function removeFilter(){
	$('#userLogonId').val("");
	$('#applId').val("");
	$('#token').val("");
	$('#userTokenType').val("");
	$('#response').val("");
	$('#requestTime').val("");
	$('#ip').val("");
	$('#systemName').val("");
	$('#bioCount').val("");
	$('#pushCount').val("");
	$('#otpCount').val("");
	$('#appName').val("");
	$('#authType').val("");
	$('#response').val("");
	$('#systemName').val("");
	$('#searchUserLogonId').val("");
	$('#selfUserLogonId').val("");
	$('#activity').val("");
	$('#activityTime').val("");
	$('#manager').val("");
		
}
	
</script>
  <%--  <script src="js/highcharts.js"></script>
   <script src="js/exporting.js"></script>
   <script type="text/javascript">
  
   </script> --%>
   <input type="hidden" id="org"/>
   
</body>
<!-- END BODY -->
</html>
