     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>
<%@page import="com.mfid.common.util.StringUtil"%>
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
	
	<% String maximumCountriesAllowed=new PropertyFileUtility().fetchPropertyFileAttribute("maximum.countries.allowed");  %>
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
	<script
	src="<%= request.getContextPath() %>/web/js/custom/showResetPassword.js"
	type="text/javascript"></script>
	<% 
String empAccessFlag = null;

/**
 * @author puneet
 * Commented by puneet vats for as properties moved to database
 */
//empAccessFlag = new PropertyFileUtility().fetchPropertyFileAttribute("update.employeeid.schedular");
 com.innefu.mfid.dataaccess.om.Properties properties=DataBaseUtility.getPropertiesValues();
	
 empAccessFlag = properties.getUpdateEmployeeidSchedular();
		 
%>
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

.input-width-fixed input[type="text"] {width: 14%;}


.input-width-fixed span {
    float: left;
    line-height: 27px;
    margin-right: 7px;
}										
</style>
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
<input type="hidden" id="adDomainId" />
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
						Reset Password
					  </h3>
					   <ul class="breadcrumb">
						   <li>
							 <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">Admin</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li><a href="<%= request.getContextPath() %>/admin_showResetPassword">Reset Password </a><span class="divider-last">&nbsp;</span></li>
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
									   <h4><i class="icon-retweet"></i>Reset &nbsp;Password </h4>
									   <span class="tools"> 
									   <a href="javascript:;" class="icon-chevron-down"></a> 
									   <a href="javascript:;" class="icon-remove"></a>
										</span>
									</div> 
									
			 							<div class="widget-body">
									<div class="tab_bottom_box">
										<div class="row-fluid">

											<div class="tableResetPassword" id="user_manage_data"></div>
										</div>
									</div>
								</div>
								
								
       </div>
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
  
   <script src="<%= request.getContextPath() %>/web/js/custom/ldapUserSearch.js" type="text/javascript"></script>  
  
     <script src="<%= request.getContextPath() %>/web/js/date_firefox.js"></script>
	
  
   <script>
   var empAccessFlag ='<%=empAccessFlag%>';
   var oTable_m_u ='';
    var role=<%=SessionUtil.getUserMapping().getRole().getId()%>
      jQuery(document).ready(function() {       
         // initiate layout and plugins
       	 App.init();
		/// TableEditable.init(); // Commented By Saurabh Giving Console Error
		 //TableEditable_App.init();
 	 	showManageUser(false,false,role);
	 	removeManageUserFilter();
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
   
	






 
function searchUserDetailRecord(e)
{  
	 if (e.keyCode === 13)   
		ldapUserSearch();
}
function updateUserDetailForm()
{    $("#userLoginID").val('');
	 $("#firstNameID").val('');
	 $("#lastNameID").val('');
	 $("#emailID").val('');
     $("#mobileNumberID").val('');
     $("#zimotpId").val('');
	 $('#block_show_User_Search_Data').html('');
	 
	 
}
/*for select all checkbox*/

//jQuery('.group-checkable').live('change',function(){
$(document).on('click', '.group-checkable', function() {
	//jQuery('.group-checkable').live('change',function(){
	if (typeof ($(this).attr('id')) === 'undefined')
		$("#sample_editable_1_multi_delete").focus();
	var set = jQuery(this).attr("data-set");
	//alert(set);
	var checked = jQuery(this).is(":checked");
	//alert(checked);
	$(set).each(function() {
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

$(document).on(
		'click',
		'.radio-group-checkable',
		function() {
			//jQuery('.radio-group-checkable').live('click',function(){

			var set = jQuery(this).attr("data-set");

			var checked = jQuery(this).is(":checked");
			jQuery('.group-checkable').attr("checked", true);
			var i = 0;
			jQuery(set).each(
					function() {
						//	alert(++i);
						if (checked) {
							$(this).prop("checked", true);

							// start of checkBox check

							try {

								//var elTableCells = $(this).parent().parent().get(0).tagName;
								var elTableCells = $(this).parent()
										.parent().get(0);

								//var inputtag=$($(elTableCells).children().get(0)).children().get(0).tagName;
								var inputtag = $(
										$(elTableCells).children().get(
												0)).children().get(0);

								var temp = $(inputtag).val();
								//alert("temp====="+temp);

								var parts = temp.split(",");
								var t = parts[1];
								//alert(t);
								/*	if(t==type){
								
										elTableCells[0].firstChild.checked = false;
									}
									else {  */

								$(inputtag).attr("checked", true);
								//	}  
							} catch (e) {
								alert(e);
							}

							//end of checkBox check

						} else {
							$(this).attr("checked", false);
						}
					});
			jQuery.uniform.update(set);
		});

// start code for bug id #322 , added by abhimanyu
$(function() {
	$(document).on('click', '#idcheckboxSelectAssignDeassign',
			function() {
				if ($(this).prop('checked'))
					$("#submitbtn").focus();
			});
	$(document).on('click', '.radio-group-checkable', function() {
		if ($(this).prop('checked'))
			$("#idSubmitButtonChangeAuth").focus();
	});
	$(document).on('click', '#idcheckboxSelectAssociateRandom',
			function() {
				if ($(this).prop('checked'))
					$("#idSubmitButtonAssociateRandom").focus();
			});
	$(document).on('click', '#idcheckboxSelectReassociate', function() {
		if ($(this).prop('checked'))
			$("#idSubmitButtonReassociate").focus();
	});
	$(document).on('click', '#idcheckboxSelectDeassociateToken',
			function() {
				if ($(this).prop('checked'))
					$("#idSubmitButtonDeassociateToken").focus();
			});
	$(document).on('click', '#idcheckboxSelectEmergencyAuth',
			function() {
				if ($(this).prop('checked'))
					$("#idSubmitButtonEmergencyAuth").focus();
			});
	$(document).on('click', '#idcheckboxSelectChangeAuth', function() {
		if ($(this).prop('checked'))
			$("#idSubmitButtonChangeAuth").focus();
	});
});
// end code for bug id #322 , added by abhimanyu


    $(document).on('click','#send_email_for_reset_password_button_id',function (e) {
			 
				var id="";
				if($('input[type="checkbox"]:checked').length==0){
					alert("Please select user to reset password.");
				}
				else if($('input[type="checkbox"]:checked').length>0){
				   $.confirm({
				        text: "Are you sure to send a reset password mail for the selected user. Do you want to continue ?",
				        confirm: function(button) {
				        	$('.checkboxes').each(function(){
								if($(this).is(':checked')){
								id += ""+ $(this).val() + ",";
									 }
							});
							id=id.substring(0,id.length-1);
							 sendResetPasswordMail(id);
							 
				        },
				        cancel: function(button) {
				            return;
				        }
				    });
				
					
					
					
				}
			});
			
			
   </script>
    
   
    

   <%-- <script src="js/highcharts.js"></script>
   <script src="js/exporting.js"></script>
   <script type="text/javascript">
  
   </script> --%>
   <input type="hidden" id="org"/>
   <input type="hidden" name="csrfPreventionSalt"
		id="csrfPreventionSaltId"
		value="<%=request.getAttribute("csrfPreventionSalt") %>" />
</body>
<!-- END BODY -->
</html>
