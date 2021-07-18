
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>
<%@page import="com.mfid.common.util.DataBaseUtility"%>

<%@ page
	import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.PropertyFileUtility"%>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8" />

<link rel="shortcut icon"
	href="<%=request.getContextPath()%>/web/img/favicon.ico"
	type="image/ico" />
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="" name="description" />
<meta content="" name="author" />

<%
	String maximumCountriesAllowed = DataBaseUtility.getPropertiesValues().getMaximumCountriesAllowed();
%>
<script> var maximumCountriesAllowed =  <%=maximumCountriesAllowed%>; </script>
<link
	href="<%=request.getContextPath()%>/web/assets/bootstrap/css/bootstrap.min.css"
	rel="stylesheet" />
<link
	href="<%=request.getContextPath()%>/web/assets/bootstrap/css/bootstrap-responsive.min.css"
	rel="stylesheet" />
<link
	href="<%=request.getContextPath()%>/web/assets/font-awesome/css/font-awesome.css"
	rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/css/style.css"
	rel="stylesheet" />
<link
	href="<%=request.getContextPath()%>/web/css/style_responsive.css"
	rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/css/style_default.css"
	rel="stylesheet" id="style_color" />

<link
	href="<%=request.getContextPath()%>/web/assets/fancybox/source/jquery.fancybox.css"
	rel="stylesheet" />

<link
	href="<%=request.getContextPath()%>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css"
	rel="stylesheet" />
<link
	href="<%=request.getContextPath()%>/web/assets/jqvmap/jqvmap/jqvmap.css"
	media="screen" rel="stylesheet" type="text/css" />
<link
	href="<%=request.getContextPath()%>/web/css/jquery.datetimepicker.css"
	media="screen" rel="stylesheet" type="text/css" />


<!-- BEGIN PAGE LEVEL STYLES -->
<link
	href="<%=request.getContextPath()%>/web/assets/dropzone/css/dropzone.css"
	rel="stylesheet" />
<!-- END PAGE LEVEL STYLES -->

<!--for DataTable-->
<%-- <link href="<%= request.getContextPath() %>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
<link
	href="<%=request.getContextPath()%>/web/css/jquery-ui.1.12.1.min.css"
	rel="stylesheet" id="style_color" />

<!--End for DataTable-->
<style>
body {
	font-family: 'Open Sans' Arial, Helvetica, sans-serif
}

ul, li {
	margin: 0;
	padding: 0;
	list-style: none;
}

.label {
	color: #000;
	font-size: 16px;
}

.dropdown-menu {
	max-height: 180px;
	overflow: hidden;
	overflow-y: scroll;
}

.dropdown-menu {
	max-height: 128px;
	overflow: hidden;
	overflow-y: scroll;
}

.dropdown-menu>li>a {
	display: block;
	padding: 3px 29px;
	clear: both;
	font-weight: normal;
	line-height: 20px;
	color: #333;
	white-space: nowrap;
}

.dropdown-menu .multiselect-search {
	width: 96% !important;
}

.table input, textarea, select {
	width: auto !important;
}

.table .dropdown-menu>li>a {
	display: block;
	padding: 3px 15px;
	clear: both;
	font-weight: normal;
	line-height: 20px;
	color: #333;
	white-space: nowrap;
}

.table .dropdown-menu  ul, li {
	margin: 0px 1px 0px;
	padding: 0;
	list-style: none;
}
</style>

<script> 
<%String clientNameFlagX = new PropertyFileUtility().fetchPropertyFileAttribute("client.name");%>

var clientNameFlagP =  '<%=clientNameFlagX%>';

var limitU2fToken='<%=ApplicationConstants.LIMIT_EXCEEDED_U2F_TOKEN%>';
</script>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
	<!-- BEGIN HEADER -->
	<%@ include file="/common/header.jsp"%>
	<!-- END HEADER -->
	<div id="loading"
		style="display: none; width: 100%; height: 550px; position: fixed; top: 50%; left: 50%; z-index: 25;">
		<img
			src='<%=request.getContextPath()%>/web/img/ajax_loader_gray_64.gif'
			width="64" height="64" /><br>Loading.. 
	</div>

	<!-- BEGIN CONTAINER -->
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		<div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<!-- BEGIN SIDEBAR MENU -->
			<%@ include file="/common/menu.jsp"%>
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
						<h3 class="page-title">U2f Registration</h3>
						<ul class="breadcrumb">
							<li><a
								href="<%=request.getContextPath()%>/login_showDashboardAgain"><i
									class="icon-home"></i></a><span class="divider">&nbsp;</span></li>
							<li><a href="#">Admin</a> <span class="divider">&nbsp;</span>
							</li>
							<li><a
								href="<%=request.getContextPath()%>/admin_showU2fRegistrationForm">U2f
									Registration </a><span class="divider-last">&nbsp;</span></li>
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
										<h4>
											<i class="icon-retweet"></i>U2f&nbsp;Registration
										</h4>
										<span class="tools"> <a href="javascript:;"
											class="icon-chevron-down"></a> <a href="javascript:;"
											class="icon-remove"></a>
										</span>
									</div>

									<div class="widget-body">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid"></div>

											<div class="tab-content">
												App Name :
												<s:select id="userAppId" label="Select Application Name"
													headerKey="-1" headerValue="-- Select Application Name --"
													list="appList" name="mailTemplateType"
													cssClass="input-large m-wrap" theme="simple"
													onchange="updateU2fRegistrationForm()" />
												<br />
												<br /> User Name : <input type="text" id="userLoginID"
													placeholder="User LogonId"
													onkeydown="searchUserDetailRecord(event)"
													class="date start" /> <input type="text" id="firstNameID"
													placeholder="First Name"
													onkeydown="searchUserDetailRecord(event)"
													class="date start" /> <input type="text" id="lastNameID"
													placeholder="Last Name"
													onkeydown="searchUserDetailRecord(event)"
													class="date start" /> <input type="text" id="emailID"
													placeholder="Email Id"
													onkeydown="searchUserDetailRecord(event)"
													class="date start" /> <input type="text"
													id="mobileNumberID" placeholder="Mobile number"
													onkeydown="searchUserDetailRecord(event)"
													class="date start" /> <br />
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												&nbsp;&nbsp;&nbsp;&nbsp;
												<button type="button" id="updateTemplateButtonId"
													class="btn btn-primary" onclick="searchUserDetails()">Search</button>
												<br /> <br />
												<div id="block_show_User_Search_Data"></div>
												<br />

												<!-- <div style="height:30px;"><button type="button" id="btnU2f" style="float:right;" class="btn btn-primary" onclick="registerU2f();">Register Security Key (U2F)</button></div> -->
												<br />
												<div id="block_u2f_div_registered_user" class="tab-content"></div>
											</div>
											<form method="post"  id="u2f_form"
												onsubmit="return false;">
												<input type="hidden" name="tokenResponse" id="tokenResponse" />
												
												<input type="hidden" name="userLogonId" id="userLogonId_id" />

											</form>
										</div>
									</div>
								</div>
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



	<div id="u2fModal_admin" class="modal hide fade" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">x</button>
			<h4 id="u2fModalLabel">Register Security Key (U2F)</h4>
		</div>
		<div id="mBody" class="modal-body">

			
			<p id="enrol_para">Enroll a Security Key (U2F) by inserting and touching it.</p>	
				
				<div class="u2f-image-container">
					<!-- <div class="u2f-animation-one"></div>
					<div class="u2f-animation-two"></div> -->
					<div id="u2f_enroll_pending"><img src="<%=request.getContextPath()%>/web/img/u2f_enrollment_pending_2x.png"/></div>
					<div id="u2f_enroll_failed"><img src="<%=request.getContextPath()%>/web/img/u2f_enrollment_error_2x.png"/></div>
				
				</div>
				
			


		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>

		</div>
	</div>


	<!-- BEGIN FOOTER -->

	<div id="footer">
		<%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.MFID_FOOTER_MESSAGE)%>
		<div class="span pull-right">
			<span class="go-top"><i class="icon-arrow-up"></i></span>
		</div>
	</div>
	<!-- END FOOTER -->

	<!-- BEGIN JAVASCRIPTS -->

	<script
		src="<%=request.getContextPath()%>/web/assets/bootstrap/js/bootstrap.min.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/jquery.blockui.js"></script>
<script src="<%= request.getContextPath() %>/web/js/u2f/u2f-api.js" type="text/javascript"></script>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/web/js/jquery.confirm.min.js"></script>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/web/js/jquery.confirm.js"></script>

	<script type="text/javascript"
		src="<%=request.getContextPath()%>/web/js/in/jquery.dataTables.js"></script>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/web/js/in/DT_bootstrap.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/custom/show_u2f.js"
		type="text/javascript"></script>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script
		src="<%=request.getContextPath()%>/web/assets/dropzone/dropzone.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->


	<!-- For Datatable (searching)-->
	<%-- <script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js" type="text/javascript"></script> --%>
	<script
		src="<%=request.getContextPath()%>/web/js/in/jquery.dataTables.columnFilter.js"
		type="text/javascript"></script>
	<!-- End For Datatable (searching)-->
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/web/js/jquery.datetimepicker.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/scripts.js"></script>
	<script
		src="<%=request.getContextPath()%>/web/js/in/bootstrap-multiselect.js"></script>

	<script src="<%=request.getContextPath()%>/web/js/custom.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/date_firefox.js"></script>


	<%
		int appId = SessionUtil.getApplication().getId();
		String orgName = SessionUtil.getOrganization().getOrganisationName();
		String domain1 = SessionUtil.getDomain().getDomainName();
	%>
	<script>
 var oTable_assign_policy="";
      jQuery(document).ready(function() {       
         // initiate layout and plugins
     
         App.init();
		 //TableEditable.init();
		// TableEditable_App.init(); // Giving Error on Console, that TableEditable_App.init() isn't defined  Hence Commented
		
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
  });  
   
	  var domain="<%=domain1%>";

		function searchUserDetailRecord(e) {
			if (e.keyCode === 13)
				searchUserDetails();
		}
		function updateU2fRegistrationForm() {
			$("#userLoginID").val('');
			$("#firstNameID").val('');
			$("#lastNameID").val('');
			$("#emailID").val('');
			$("#mobileNumberID").val('');

		}
	</script>
	<input type="hidden" id="org" />
	<input type="hidden" name="csrfPreventionSalt"
		id="csrfPreventionSaltId"
		value="<%=request.getAttribute("csrfPreventionSalt")%>" />
</body>
<!-- END BODY -->
</html>
