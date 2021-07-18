     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>
<%@page import="com.mfid.common.util.DataBaseUtility"%>

<%@ page import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.PropertyFileUtility" %>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>	
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />  
	<meta content="" name="description" />
	<meta content="" name="author" />
	
		
	
	
	 <% String maximumCountriesAllowed=DataBaseUtility.getPropertiesValues().getMaximumCountriesAllowed(); %>
	<script> var maximumCountriesAllowed =  <%=maximumCountriesAllowed%>; </script>
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_responsive.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_default.css" rel="stylesheet" id="style_color" />

	<link href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
	
	<link href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />
	 <link href="<%= request.getContextPath() %>/web/css/jquery.datetimepicker.css" media="screen" rel="stylesheet" type="text/css" />
	
	
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="<%= request.getContextPath() %>/web/assets/dropzone/css/dropzone.css" rel="stylesheet"/>
    <!-- END PAGE LEVEL STYLES -->
	
	<!--for DataTable--> 
	<%-- <link href="<%= request.getContextPath() %>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
	<link href="<%= request.getContextPath() %>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" /> 
	
	<!--End for DataTable--> 
	<style>
body { font-family:'Open Sans' Arial, Helvetica, sans-serif}
ul,li { margin:0; padding:0; list-style:none;}
.label { color:#000; font-size:16px;}
.dropdown-menu{max-height: 180px;
    overflow: hidden;
    overflow-y: scroll;}
    
    .dropdown-menu{max-height: 128px;
    overflow: hidden;
    overflow-y: scroll;}
.dropdown-menu>li>a {
    display: block;
    padding: 3px 29px;
    clear: both;
    font-weight: normal;
    line-height: 20px;
    color: #333;
    white-space: nowrap;
}

.dropdown-menu .multiselect-search{width:96% !important;}

.table input, textarea, select{width:auto !important;}
.table .dropdown-menu>li>a {
    display: block;
    padding: 3px 15px;
    clear: both;
    font-weight: normal;
    line-height: 20px;
    color: #333;
    white-space: nowrap;
}

.table .dropdown-menu  ul, li  
{margin: 0px 1px 0px;
padding: 0;
list-style: none;
}
</style>

<script> 
<%String clientNameFlagX = new PropertyFileUtility().fetchPropertyFileAttribute("client.name"); 
%>

var clientNameFlagP =  '<%=clientNameFlagX%>'; 
</script>
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
						User Device Details 
					  </h3>
					   <ul class="breadcrumb">
						   <li>
							 <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">Admin</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li><a href="<%= request.getContextPath() %>/admin_showUserDeviceDetails">User Device Details </a><span class="divider-last">&nbsp;</span></li>
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
									   <h4><i class="icon-retweet"></i>User&nbsp;Device&nbsp;Details </h4>
									   <span class="tools"> 
									   <a href="javascript:;" class="icon-chevron-down"></a> 
									   <a href="javascript:;" class="icon-remove"></a>
										</span>
									</div> 
									
									<div class="widget-body">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid">
											 
												
											<!-- 	
												<a class="icon-btn span2 active" id ="tab_3" href="#block_Push" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Push</div>
													</span>
												</a>
												 -->
												
												
												
											
											
											
												
												
												
												
												
												
											</div> 
											
											<div class="tab-content">
										 
												
												 
												 
											  
 App Name : <s:select id="userAppId" label="Select Application Name" headerKey="-1" headerValue="-- Select Application Name --" 
						list="appList" name="mailTemplateType" cssClass="input-large m-wrap" theme="simple" onchange="updateUserDetailForm()"/>
												
												<br/><br/>
			 								
		 User Name :	<input type="text" id="userLoginID" placeholder="User LogonId"  onkeydown="searchUserDetailRecord(event)" class="date start"/>
			<input type="text" id="firstNameID" placeholder="First Name" onkeydown="searchUserDetailRecord(event)" class="date start"/>
			<input type="text" id="lastNameID" placeholder="Last Name" onkeydown="searchUserDetailRecord(event)" class="date start"/>
				<input type="text" id="emailID" placeholder="Email Id" onkeydown="searchUserDetailRecord(event)" class="date start"/>
					<input type="text" id="mobileNumberID" placeholder="Mobile number" onkeydown="searchUserDetailRecord(event)" class="date start"/> <br/>
			 					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<button type="button" id="updateTemplateButtonId" class="btn btn-primary" onclick="searchUserDetails()">Search</button>
											 
											
								 
												<br/>
												<br/>
											 <div id="block_show_User_Search_Data"></div>
											<br/>
								</div>			
 <!--Start User User Policy Block  -->
 	
<!--End User User Policy Block  -->		
											
							
												
											    					
												
										</div>
										</div>
									</div>
									
									
									<!-- 2ndtab -->
									
									<div class="widget widget-tabs" id="block_show_User_Policy_Data" style="display: none">
									 <div class="widget-title" id="showUserDeviceDetailsButton4">
									   <h4><i class="icon-retweet"></i>User Country Policy</h4>
									   <span class="tools"> 
									   <a href="javascript:;" class="icon-chevron-down2 icon-chevron-up" id="downid4"></a> 
									   <a href="javascript:;" class="icon-remove2 icon-remove" onclick="customRemove(4)"></a>
										</span>
									</div> 
											
										<div class="widget-body" id="showUserDeviceDetailsBodyButton4">
										<div class="tab-content "  >
													<!--<div class="tab-pane active " id="block_policy">-->
													
													<div class="row" style="height:20px;"></div>
													<div id="policyFormdiv" style="display:none;">
														<form class="form-horizontal" action="#" id="policyAddForm">
															<div class="control-group">
																<label class="control-label">List of Allowed Country</label>
																<div class="controls">
																	<select  class="input-large m-wrap" name="countrycode"  id="countrycode"  >
																		
																		<!-- <option value="">-select Country Codes-</option> -->
																		
																	</select>
																</div>
															</div>
															
															<div class="control-group" id="date-time-div" >
																	<label class="control-label">Enter Time Stamp</label>
																	<div class="controls">
																		<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>
																		-
																		<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>
																	</div>
																</div>
															<div class="form-actions">
																<button class="btn blue" id="saveBtn" type="button"><i class="icon-ok"></i> Save</button>
																<button class="btn" id="cancelBtn" type="button"><i class=" icon-remove"></i> Cancel</button>
															</div>
															<input type="hidden" id="policyDecBeforeEdit" />
															<input type="hidden" id="allCountryCode" />
															<input type="hidden" id="countryResponse" />
															
															<input type="hidden" id="countryCode" />
															
															<input type="hidden" id="domainName" />
															<input type="hidden" id="appName" />
															<input type="hidden" id="pId" />
														</form>
													</div>
													
														
													<div id="block_policy_data"></div>
													
											<!--</div>  -->	
												
													</div>
										</div>	

</div>
									<!-- end -->
		
		<div id="block_show_User_Device_Info_Data"></div>						
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
	<tr><td>  <input type='checkbox' name="onlineuserlogreportcolumn" class='checkboxes'  value='Token Serial' checked/>  Token Serial  </td></tr>
	 <tr><td>  <input type='checkbox' name="onlineuserlogreportcolumn" class='checkboxes'  value='Token Type' checked/>  	Token Type  </td></tr>
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
    <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/jquery.confirm.min.js"></script>
    <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/jquery.confirm.js"></script> 
   
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>
   
   <!-- BEGIN PAGE LEVEL PLUGINS -->
   <script src="<%= request.getContextPath() %>/web/assets/dropzone/dropzone.js"></script>
   <!-- END PAGE LEVEL PLUGINS -->
   
   
<!-- For Datatable (searching)-->   
<%-- <script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js" type="text/javascript"></script> --%>
<script src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js" type="text/javascript"></script>
<!-- End For Datatable (searching)--> 
 <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/jquery.datetimepicker.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/in/bootstrap-multiselect.js"></script>
    
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
  
   <script src="<%= request.getContextPath() %>/web/js/custom/showUserCountryPolicy.js" type="text/javascript"></script>  
   <script src="<%= request.getContextPath() %>/web/js/in/user-country-policy-editable.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/custom/showUserDeviceDetails.js" type="text/javascript"></script>
     <script src="<%= request.getContextPath() %>/web/js/date_firefox.js"></script>
	
  
	<%int appId=SessionUtil.getApplication().getId(); 
	String orgName=SessionUtil.getOrganization().getOrganisationName();
	String domain1=SessionUtil.getDomain().getDomainName();
	%>
   <script>
 var oTable_assign_policy="";
      jQuery(document).ready(function() {       
         // initiate layout and plugins
         showAllCountryList();
         App.init();
		 TableEditable.init();
		// TableEditable_App.init(); // Giving Error on Console, that TableEditable_App.init() isn't defined  Hence Commented
		
		 TableEditableUserCountryPolicy.init();
		
      });
	  
		$(document).ajaxStart(function(){
  
    $("#loading").css("display","block");
    $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
     // alert("start");
  });
  
  $(document).ajaxComplete(function(){
  
    $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
     // alert("complete");
  });  
   
	  var domain="<%=domain1 %>";
	
	 $('#tab_1').on('click',function(){ // Saurabh
	
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
		openUserOnlineLogsReport(false,false,domain);
		});
		
		$('#tab_3').on('click',function(){ // Saurabh
		openUserPushLogsReport(false,false,domain);
		});
		
		
		
		$('#tab_2').on('click',function(){ // Saurabh
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
		
		});
		  
	 
		
		
		$('#cancelBtn').on('click',function(){
			var selVal = $('#domain').attr('multiple');
			if(selVal){
				$('#domain').multiselect('destroy');
				$('#domain').attr('multiple',false);
			}
			$('#domainDiv').hide();
			$('#appDiv').hide();
			this.form.reset();
			$('#policyFormdiv').hide();
			
		});
		
	
	

	/*for select all checkbox*/
	
	//jQuery('.group-checkable').live('change',function(){ // Saurabh 
		$(document).on('click', '.group-checkable', function() {
		var set = jQuery(this).attr("data-set");
		var checked = jQuery(this).is(":checked");
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
		
		/* jQuery(set).each(function () {
			if (checked) {
				$(this).attr("checked", true);
			} else {
				$(this).attr("checked", false);
			}
		}); */
		jQuery.uniform.update(set);
	});
	
	
	
/**** Duplicate jquery ***/	// Saurabh
	
/* jQuery('.group-checkable').live('change',function(){
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
    
/**** Duplicate jquery ***/	
 
//jQuery('.group-checkable1').live('change',function(){
	$(document).on('click', '.group-checkable1', function() { // Saurabh
	//alert("group checkable");
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
		//alert(checked);
	/* 	if(checked)
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
		} */
		jQuery.uniform.update(set);
	});    
    
 
 
 
//jQuery('.group-checkable2').live('change',function(){
	$(document).on('click', '.group-checkable2', function() { // Saurabh
	//alert("group checkable");
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		//alert(checked);
		
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
		
		/* if(checked)
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
		} */
		jQuery.uniform.update(set);
	});    
    
 
 //jQuery('.group-checkable3').live('change',function(){
	 $(document).on('click', '.group-checkable3', function() { // Saurabh
	//alert("group checkable");
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked"); // It will return either true or false basis on checkbox check.
		//alert(checked);
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
		/* if(checked)
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
		} */
		jQuery.uniform.update(set);
	}); 
 
      
	 
	 
	 
	 $(document).on('click', '.group-checkable5', function() { // Saurabh
			
				var set = jQuery(this).attr("data-set");
			
				var checked = jQuery(this).is(":checked");
				
				
				$(set).each(function(){
					$(this).prop('checked', checked);
				});
				
			
				jQuery.uniform.update(set);
			});

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


 
function searchUserDetailRecord(e)
{  
	 if (e.keyCode === 13)   
		searchUserDetails();
}
function updateUserDetailForm()
{    $("#userLoginID").val('');
	 $("#firstNameID").val('');
	 $("#lastNameID").val('');
	 $("#emailID").val('');
     $("#mobileNumberID").val('');
	 $('#block_show_User_Search_Data').html('');
	 $('#block_show_User_Device_Info_Data').html('');
	 $('#block_show_User_Policy_Data').hide();
	 
}


		//$('#sample_editable_1_multi_delete1').live('click', function(){
	$(document).on('click', '#sample_editable_1_multi_delete1', function() { // Saurabh
		 
		 var type = 'activateddevices';
		 var id="";
           $('.checkboxes1').each(function(){
						if($(this).is(':checked')){
						id += "'"+ $(this).val() + "',";
							 }
					});
					   
					if(id == '')
					{
					alert("Please select device Name to delete");
					return true;
					}
					id=id.substring(0,id.length-1);
					deRegisterUserDeviceDetail(id,type);
					nEditing = null;
          });
	
	//$('#sample_editable_1_multi_delete2').live('click', function(){
	$(document).on('click', '#sample_editable_1_multi_delete2', function() { // Saurabh
		 var type = 'wifidevices';
		 var id="";
           $('.checkboxes2').each(function(){
						if($(this).is(':checked')){
						id += "'"+ $(this).val() + "',";
						}
			});
					   
					if(id == '')
					{
					alert("Please select Wifi device to delete");
					return true;
					}
					id=id.substring(0,id.length-1);
					deRegisterUserDeviceDetail(id,type);
					nEditing = null;
          });
          
      //$('#sample_editable_1_multi_delete3').live('click', function(){
    	$(document).on('click', '#sample_editable_1_multi_delete3', function() { // Saurabh
		 
		 var type = 'devicedecision';
		 var id="";
           $('.checkboxes3').each(function(){
						if($(this).is(':checked')){
						id += "'"+ $(this).val() + "',";
							 }
					});
					   
					if(id == '')
					{
					alert("Please select Device decision to delete");
					return true;
					}
					id=id.substring(0,id.length-1);
					deRegisterUserDeviceDetail(id,type);
					nEditing = null;
          });
	
    	
    	$(document).on('click', '#sample_editable_1_multi_delete5', function() { // Saurabh
   	   	
   		 var id="";
    	 var devices="";
              $('.checkboxes5').each(function(i,v){
   						
            	  if($(this).is(':checked')){
   						id += "'"+ $(this).val() + "',";
   						devices +=" '"+ $('#deviceListedId'+i).text() + "',";
   						
   						}
   						
   					});
   					   
   					if(id == '')
   					{
   					alert("Please select White Listed Devices to delete");
   					return true;
   					}
   					id=id.substring(0,id.length-1);
   					devices=devices.substring(0,devices.length-1);
   					deleteWhiteListedDevices(id,devices);
   					nEditing = null;
             });
    	

   </script>
   <script>

 $("#from_date").datetimepicker({
  onChangeDateTime:exampleFunction
});
function exampleFunction(){
 var fromdate=$("#from_date" ).val();
  var d = new Date(fromdate);
    d.setDate(d.getDate() + 7);
    var month = d.getMonth()+1;
    var day = d.getDate();
    var time=d.getTime();
    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+' 23:59';
    $("#to_date" ).val(output);
}
    
function getCurrentDate()
{
 var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var minutes = d.getMinutes();
    var hours=d.getHours();
    
     // var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+' 00:00';
     //var output =((''+day).length<2 ? '0' : '') + day+'-'+ ((''+month).length<2 ? '0' : '') + month + '-' + d.getFullYear(); //'+((''+minutes).length<2 ? '0' : '')+minutes
    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+ ' '+((''+hours).length<2 ? '0' : '') +hours+':00';
    return output;
  }

function getAddDaysToCurrentDate()
{
    var d = new Date();
    d.setDate(d.getDate() + 7);
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+' 23:59';
    return output;
    
}
    
  
 

  //jQuery('.group-checkable').live('change',function(){
	  $(document).on('click', '.group-checkable', function() { // Saurabh 
	// alert("saurabh user details group checkable");
	 if(typeof($(this).attr('id')) === 'undefined')
	// $(".checkboxes").prop('checked', true);
	//  $("#sample_editable_1_multi_delete").focus();
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		//alert(checked);
		if(checked)
		{
		// alert("in if");
		 $(".checkboxes4").prop('checked', true);
		 $("#sample_editable_1_multi_delete").focus();
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
			// alert("in else");
			 $(".checkboxes4").prop('checked', false);
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
	
   
   		//$('#sample_editable_1_multi_delete').live('click', function(){
   		 $(document).on('click', '#sample_editable_1_multi_delete', function() { // Saurabh
		 
		 
		var id="";
		//alert("======= "+$('input[type="checkbox"]:checked').length);
		
		
		  if($('input[type="checkbox"]:checked').length==0){
			alert("Please select Country Name to delete");
		} 
		else if($('input[type="checkbox"]:checked').length>0){ 
			/*if (jConfirm("Are you sure to delete selected row ?") == false) {
				return;*/
			/* $.confirm({
		        text: "Are you sure to delete selected row? License May be associated to the selected users.Do you want to continue ??",
		        confirm: function(button) { */ 
		        $('.checkboxes4').each(function(){
						if($(this).is(':checked')){
						id += "'"+ $(this).val() + "',";
							 }
					});
					    //alert("id = "+id);
					if(id == '')
					{
					alert("Please select Country Name to delete");
					return true;
					}
					id=id.substring(0,id.length-1);
					delete_row(id);
					nEditing = null;
		     /*   },
		        cancel: function(button) {
		            return;
		        }
		    }); */ 
			//}
			
			
			
		}
	});
      
    
</script>
   <%-- <script src="js/highcharts.js"></script>
   <script src="js/exporting.js"></script>
   <script type="text/javascript">
  
   </script> --%>
   <input type="hidden" id="org"/>
  <input type="hidden" name="csrfPreventionSalt" id="csrfPreventionSaltId" value="<%=request.getAttribute("csrfPreventionSalt") %>"/> 
</body>
<!-- END BODY -->
</html>
