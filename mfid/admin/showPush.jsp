<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags"%> --%>

<%@ page
	import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.PropertyFileUtility"%>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8" />

<link rel="shortcut icon"
	href="<%= request.getContextPath() %>/web/img/favicon.ico"
	type="image/ico" />
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="" name="description" />
<meta content="" name="author" />

<script src="<%= request.getContextPath() %>/web/js/custom/showPush.js"
	type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/restart_Push.js"
	type="text/javascript"></script>

<link
	href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.css"
	rel="stylesheet" />
<link
	href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap-responsive.min.css"
	rel="stylesheet" />
<link
	href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css"
	rel="stylesheet" />
<link href="<%= request.getContextPath() %>/web/css/style.css"
	rel="stylesheet" />
<link
	href="<%= request.getContextPath() %>/web/css/style_responsive.css"
	rel="stylesheet" />
<link href="<%= request.getContextPath() %>/web/css/style_default.css"
	rel="stylesheet" id="style_color" />

<link
	href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css"
	rel="stylesheet" />
<link rel="stylesheet" type="text/css"
	href="<%= request.getContextPath() %>/web/assets/uniform/css/uniform.default.css" />
<link
	href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css"
	rel="stylesheet" />
<link
	href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css"
	media="screen" rel="stylesheet" type="text/css" />


<!-- BEGIN PAGE LEVEL STYLES -->
<link
	href="<%= request.getContextPath() %>/web/assets/dropzone/css/dropzone.css"
	rel="stylesheet" />
<!-- END PAGE LEVEL STYLES -->

<!--for DataTable-->
<%-- <link href="<%= request.getContextPath() %>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
<link
	href="<%= request.getContextPath() %>/web/css/jquery-ui.1.12.1.min.css"
	rel="stylesheet" id="style_color" />
<!--End for DataTable-->
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
			src='<%=request.getContextPath() %>/web/img/ajax_loader_gray_64.gif'
			width="64" height="64" /><br>Loading.. 
	</div>

	<!-- BEGIN CONTAINER -->
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		<div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
			<div class="navbar-inverse">
				<form class="navbar-search visible-phone"></form>
			</div>

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
						<h3 class="page-title">Restart Push Server</h3>
						<ul class="breadcrumb">
							<li><a
								href="<%= request.getContextPath() %>/login_showDashboardAgain"><i
									class="icon-home"></i></a><span class="divider">&nbsp;</span></li>
							<li><a href="#">Admin</a> <span class="divider">&nbsp;</span>
							</li>
							<li><a href="<%= request.getContextPath() %>/admin_showPush">
									Push Server</a><span class="divider-last">&nbsp;</span></li>
						</ul>
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<!-- BEGIN PAGE CONTENT-->
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN SAMPLE FORM widget-->
						<div class="widget">
							<div class="widget-title">
								<h4>
									<i class="icon-share-alt"></i>Restart&nbsp;Server
								</h4>
								<span class="tools"> <a href="javascript:;"
									class="icon-chevron-down"></a> <a href="javascript:;"
									class="icon-remove"></a>
								</span>
							</div>

							<div
								style="padding: 10px; background: #f4f4f4; border: solid 1px #ddd; display: block; margin: 10px 10px;">
								<div class="row-fluid">
									<div class="controls">
										<button class="btn btn-primary" type="button" data-target=""
											data-toggle="modal" id='resync_model1'>Restart Push
											Server</button>
									</div>
									<div class="clear"></div>
								</div>
							</div>
							<div class="widget-body form" id="user_resync_data">
								<!-- BEGIN FORM-->

								<!-- END FORM-->
							</div>
						</div>
						<!-- END SAMPLE FORM widget-->
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
	<script
		src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>
	<script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
	
	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/in/jquery.uniform.min.js"></script>
	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script
		src="<%= request.getContextPath() %>/web/assets/dropzone/dropzone.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->


	<!-- For Datatable (searching)-->
	<%-- <script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js" type="text/javascript"></script> --%>
	<script
		src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js"
		type="text/javascript"></script>
	<!-- End For Datatable (searching)-->

	<script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
	<script
		src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
	<script>
   
		jQuery(document).ready(function() {
			// initiate layout and plugins
			App.init();
			TableEditable.init();
		});
		$(document).ready(function() {
			try {
				openPushServerDetail(false, false);
			} catch (e) {
				alert(e);
			}
		});

		$('#resync_model1')
				.click(function() {
				if (confirm('Do you want to restart Push Server? If you continue then it will affected for all users') == true) {
						$('#resync_model1').attr("data-target",
							"#myModal");
				} else {
					$('#resync_model1').attr("data-target", "");
					return;
				}
		});

		$(document).ajaxStart(function() {
			$("#loading").css("display", "block");
			//$('body').css("opacity", "0.8");
			$(".log").text("Triggered ajaxStart handler.");
		});

		$(document).ajaxComplete(function() {
			//$('select option:contains("Select Size")').attr('disabled', true);
			$("#loading").css("display", "none");
			//$('body').css("opacity", "1");
			$(".log").text("Triggerd ajaxComplete handler.");
		});

		$('#myModal').on('shown.bs.modal', function(e) {
			restartPushServer();
		});
	</script>
	<script src="<%= request.getContextPath() %>/web/js/highcharts.js"></script>
	<script src="<%= request.getContextPath() %>/web/js/exporting.js"></script>
	
</body>

<!-- END BODY -->
</html>