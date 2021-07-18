<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@page import="com.mfid.common.util.DataBaseUtility"%>

<%@ page
	import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.PropertyFileUtility"%>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8" />
<title><%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.TITLE_NAME)%></title>
<link rel="shortcut icon"
	href="<%=request.getContextPath()%>/web/img/favicon.ico"
	type="image/ico" />
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="" name="description" />
<meta content="" name="author" />
<style>
.u2f-image-container {
    border-radius: 46px;
    position: relative;
    margin: 25px auto 0;
    text-align: center;
}
.u2f-animation-one{
	/* background-color: #fff;
    position: absolute;
    z-index: 9;
    width: 120px;
    height: 120px;
    top: -50px;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius: 100%;
    -webkit-animation: sk-scaleout 2s infinite ease-out;
    animation: sk-scaleout 2s infinite ease-out; */
}
.u2f-animation-two{
	/* background-color: #fff;
    position: absolute;
    z-index: 99;
    width: 100px;
    height: 100px;
    top: -52px;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius: 100%;
    -webkit-animation: sk-scaleout 2s infinite ease-out;
    animation: sk-scaleout 2s infinite ease-out; */
}

.u2f-image {
    display: inline-block;
    width: 440px;
    height: auto;
}

.modal.fade.in {
	top: 15%;
}


#btnU2f{
cursor: pointer;
}

</style>
<script src="<%=request.getContextPath()%>/web/js/custom/resync_Clock.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/web/js/custom/activate-resync.js" type="text/javascript"></script>
	
<script src="<%= request.getContextPath() %>/web/js/u2f/u2f-api.js" type="text/javascript"></script>

<link href="<%=request.getContextPath()%>/web/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/css/style.css" rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/css/style_responsive.css" rel="stylesheet" />

<link href="<%=request.getContextPath()%>/web/css/style_default.css" rel="stylesheet" id="style_color" />

<link href="<%=request.getContextPath()%>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
<link href="<%= request.getContextPath() %>/web/css/custom.css" rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/web/css/jquery.datetimepicker.css" media="screen" rel="stylesheet" type="text/css" />

<!-- BEGIN PAGE LEVEL STYLES -->
<link href="<%=request.getContextPath()%>/web/assets/dropzone/css/dropzone.css" rel="stylesheet" />
<!-- END PAGE LEVEL STYLES -->

<link href="<%=request.getContextPath()%>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" />
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

/* .dropdown-menu {
	max-height: 180px;
	overflow: hidden;
/* 	overflow-y: scroll; */
}

.dropdown-menu {
	max-height: 128px;
	overflow: hidden;
	overflow-y: scroll;
} */

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
var limitU2fToken='<%=ApplicationConstants.LIMIT_EXCEEDED_U2F_TOKEN%>';
</script>
</head>


<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
	<!-- BEGIN HEADER -->
	<%@ include file="/common/secureHeader.jsp"%>
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


			<!-- BEGIN SIDEBAR MENU -->
			<%@ include file="/common/secureMenu.jsp"%>
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
						<h3 class="page-title">U2F</h3>
						<ul class="breadcrumb">
							<li><a
								href="<%=request.getContextPath()%>/secureLogin_showDashboard.action"><i
									class="icon-home"></i></a><span class="divider">&nbsp;</span></li>
							<li><a href="#">User</a> <span class="divider">&nbsp;</span>
							</li>
							<li><a
								href="<%=request.getContextPath()%>/admin_showU2FRegistration">U2F
									Registration</a><span class="divider-last">&nbsp;</span></li>
						</ul>
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<!-- BEGIN PAGE CONTENT-->
				<div id="page" class="dashboard">

					<div class="square-state">
						<div class="row-fluid ">
							<div class="span12">
								<div class="widget widget-tabs">
									<div class="widget-title">
										<h4>
											<i class="icon-retweet"></i>U2F&nbsp;Registration
										</h4>
										<span class="tools"> <a href="javascript:;"
											class="icon-chevron-down"></a> <a href="javascript:;"
											class="icon-remove"></a>
										</span>
									</div>
									<div class="widget-body scroll-div">
										<div class="tabbable table_tab_box tabbable-custom">
												
												<div style="height:30px;"><button type="button" id="btnU2f" style="float:right;" class="btn btn-primary" onclick="registerU2f();">Register Security Key (U2F)</button></div>
												<br/>
												<div id="block_u2f_div_registered_user" class="tab-content">
											
												</div>
																							
												 <form method="post" action="admin_secureRegister" id="secureForm" onsubmit="return false;">
            										<input type="hidden" name="tokenResponse" id="tokenResponse"/>      
        										</form>
        										
        										
											
										</div>
										<!--End User User Policy Block  -->
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


	<!-- END CONTAINER -->




	<div id="u2fModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
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
	<!-- ie8 fixes -->
	<!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/web/js/jquery.confirm.min.js"></script>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/web/js/jquery.confirm.js"></script>

	<script type="text/javascript"
		src="<%=request.getContextPath()%>/web/js/in/jquery.dataTables.js"></script>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/web/js/in/DT_bootstrap.js"></script>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script
		src="<%=request.getContextPath()%>/web/assets/dropzone/dropzone.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->


	<!-- For Datatable (searching)-->
	<script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.js"
		type="text/javascript"></script>
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
	<script
		src="<%=request.getContextPath()%>/web/js/custom/show_u2f.js"
		type="text/javascript"></script>


	<script
		src="<%=request.getContextPath()%>/web/js/in/user-country-policy-editable.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/date_firefox.js"></script>
	<%
		int appId = SessionUtil.getApplication().getId();
		String orgName = SessionUtil.getOrganization().getOrganisationName();
	%>


	<script type="text/javascript">
	
		jQuery(document).ready(function() {       
			// initiate layout and plugins
			App.init();
			TableEditable.init();
			getU2FUserDetails();
			
		});

		$(document).ajaxStart(function() {

			$("#loading").css("display", "block");
// 			$('body').css("opacity", "0.8");
			$(".log").text("Triggered ajaxStart handler.");

		});

		$(document).ajaxComplete(function() {

			$("#loading").css("display", "none");
// 			$('body').css("opacity", "1");
			$(".log").text("Triggerd ajaxComplete handler.");
		});

		
</script>
	<input type="hidden" id="level" />
		<input type="hidden" name="csrfPreventionSalt" id="csrfPreventionSaltId" value="<%=request.getAttribute("csrfPreventionSalt") %>" />
	
</body>
<!-- END BODY -->
</html>
