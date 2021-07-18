<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags"%> --%>
<%@page import="com.mfid.common.util.DataBaseUtility"%>
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
 <% String maximumCountriesAllowed=DataBaseUtility.getPropertiesValues().getMaximumCountriesAllowed(); %>
	<script> var maximumCountriesAllowed =  <%=maximumCountriesAllowed%>; </script>
	
	<style type="text/css">
    .multiselect-container {
        width: 100% !important;
    }
</style>
	
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

<link href="<%= request.getContextPath() %>/web/css/jquery.datetimepicker.css" media="screen" rel="stylesheet" type="text/css" />


<!-- BEGIN PAGE LEVEL STYLES -->
<link
	href="<%= request.getContextPath() %>/web/assets/dropzone/css/dropzone.css"
rel="stylesheet" />
<!-- END PAGE LEVEL STYLES -->

<!--for DataTable-->
<%-- <link
	href="<%= request.getContextPath() %>/web/css/jquery-ui-1.7.2.custom.css"
rel="stylesheet" id="style_color" /> --%>
<link
	href="<%=request.getContextPath()%>/web/css/jquery-ui.1.12.1.min.css"
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
						<h3 class="page-title">Assign Country Policy</h3>
						<ul class="breadcrumb">
							<li><a
								href="<%=request.getContextPath()%>/login_showDashboardAgain"><i
									class="icon-home"></i></a><span class="divider">&nbsp;</span></li>
							<li><a href="#">User</a> <span class="divider">&nbsp;</span>
							</li>
							<li><a
								href="<%=request.getContextPath()%>/policy_showAssignCountryPolicy.action">Assign
									Country Policy</a><span class="divider-last">&nbsp;</span></li>
						</ul>
					</div>
				</div>
				<!-- END PAGE HEADER-->
				
				
				<!-- BEGIN PAGE CONTENT-->
			 <div id="page" class="dashboard">                  
					
					<div class="square-state">
				
				<div class="row-fluid">
					<div class="span12">
						<!-- BEGIN SAMPLE FORM widget-->
						<div class="widget widget-tabs">
							<div class="widget-title">
								<h4>
									<i class="icon-share-alt"></i>Assign&nbsp;Country&nbsp;Policy
								</h4>
								<span class="tools"> <a href="javascript:;"
									class="icon-chevron-down"></a> <a href="javascript:;"
									class="icon-remove"></a>
								</span>
							</div>
						 <div class="widget-body">
							<div class="widget-body form">
							  <div class="tab_bottom_box">
								<div id="assign_policy_div">
									<form class="form-horizontal" action="#"
										id="assignPolicyAddForm">
										<div class="control-group">
											<label class="control-label">List of Allowed Country</label>
											<div class="controls">
												<select class="input-large m-wrap" name="countrycode"
													id="countrycode">

												</select>
											</div>
										</div>

										<div class="control-group" id="date-time-div">
											<label class="control-label">Enter Time Stamp</label>
											<div class="controls">
												<input type="text" name="from_date" id="from_date" readonly
													style="cursor: pointer;" /> - <input type="text"
													name="to_date" id="to_date" readonly
													style="cursor: pointer;" />
											</div>
										</div>

										<input type="hidden" id="allCountryCode" />
									</form>
								</div>

								<!-- <div class="tab_bottom_box"> -->
									<div class="row-fluid">
										<div class="tableManageUser" id="block_assign_country_policy"></div>
									</div>
								<!-- </div> -->
								
								</div>
								
							 </div>
						    </div>
						</div>
						<!-- END SAMPLE FORM widget-->
						<!-- BEGING SAMPLE FORM widget-->
						<div class="widget" id="_second_widget" style="display:none;">
							<div class="widget-title">
								<h4>
									<i class="icon-share-alt"></i>Allowed&nbsp;Country(s)
								</h4>
								<span class="tools"> <a href="javascript:;"
									class="icon-chevron-down"></a> <a href="javascript:;"
									class="icon-remove"></a>
								</span>
							</div>
							<div class="widget-body form">
							  <div class="tabbable table_tab_box tabbable-custom">
										 <div id="_assign_country_policy"></div> 
								</div>
							</div>
						</div>
					<!-- END SAMPLE FORM widget-->
					
					</div>
					<!-- END ROW FLUID -->
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

	<!--  -->


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
<script
	src="<%= request.getContextPath() %>/web/js/in/bootstrap-multiselect.js"></script>

<script type="text/javascript"
	src="<%= request.getContextPath() %>/web/js/in/jquery.uniform.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/web/js/jquery.confirm.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/web/js/jquery.confirm.js"></script>
	<script type="text/javascript"
	src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
<script type="text/javascript"
	src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>

<!-- BEGIN PAGE LEVEL PLUGINS -->
<script
	src="<%= request.getContextPath() %>/web/assets/dropzone/dropzone.js"></script>
<!-- END PAGE LEVEL PLUGINS -->


<!-- For Datatable (searching)-->
<script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js"
type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js"
type="text/javascript"></script>
 <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/jquery.datetimepicker.js"></script>
 <script src="<%= request.getContextPath() %>/web/js/date_firefox.js"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/assign_country_policy.js"
type="text/javascript"></script>

<script
	src="<%= request.getContextPath() %>/web/js/custom/country_policy.js"
type="text/javascript"></script>

<script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>

 <script
	src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script> 
<script
	src="<%= request.getContextPath() %>/web/js/in/_country_policy_editable.js"></script>
<script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
<script>
  
var oTable_assign_policy ="";

	 jQuery(document).ready(function() {
		try {
			App.init();
			TableEditableAssignCountryPolicy.init();
		} catch (e) {
			alert(e);
		}
	});
	$(document).ready(function() {
		try {
			$("#_second_widget").css("display", "none");
			showCountryPolicyData(false, false);
		} catch (e) {
			alert(e);
		}
	});

	$(document).on('click', '.group-checkable', function() {
		var set = jQuery(this).attr("data-set");
		var checked = jQuery(this).is(":checked");
		$(set).each(function() {
			$(this).prop('checked', checked);
		});
		jQuery.uniform.update(set);
		if(checked){
			$('#sample_1_addNew').focus();
		}
		$("html, body").animate({ scrollTop: $(document).height()}, "fast");
	});

	
	$(document).ajaxStart(function() {

		$("#loading").css("display", "block");
		//$('body').css("opacity", "0.8");
	});

	$(document).ajaxComplete(function() {
		//$('select option:contains("Select Size")').attr('disabled', true);
		$("#loading").css("display", "none");
		//$('body').css("opacity", "1");
	});
	jQuery(document).on('click','.countryClick',function(){  
		$("html, body").animate({ scrollTop: $(document).height()-50}, "slow");
		$('#_second_widget').css("display","block");
		var data="";
		data=$(this).attr('data');
		data = data.split(',');
		showAllowedCountries(data[0],data[1]);
	});
	
	$(document).ready(function(e) {

		$('#to_date').datetimepicker({
			dayOfWeekStart : 1
		});
		$('#from_date').datetimepicker({
			dayOfWeekStart : 1
		});
			
		$("#from_date").val(getCurrentDate());
		$("#to_date").val(getAddDaysToCurrentDate());
		
		showCountryList('true', 'countrycode');
		$('#countrycode').attr('multiple', true);
		$('#countrycode').multiselect({
			nonSelectedText: 'Select Country',
			buttonWidth: '200px',
			includeSelectAllOption : true,
			maxHeight :140,
			enableFiltering : true,
			enableCaseInsensitiveFiltering : true
		});

		$(".multiselect-item").addClass('active');

		var allCountryCode = document.getElementById('allCountryCode').value;
		var valArr = allCountryCode.split(",");
		var i = 0, size = valArr.length;
		for (i; i < size; i++) {
			$('#countrycode').multiselect('deselect', valArr[i]);
		} 
	});
	
	
	jQuery(document).on('click', '#deAssignBtn', function() {
		var ids = [];
		var countryNames = [];
		var startTime = [];
		var endTime = [];
		$.each($("input[name='activeCountry']:checked"), function() {
			var data = $(this).val();
			data = data.split(',');
			ids.push(data[0]);
			countryNames.push(data[1]);
			startTime.push(data[2])
			endTime.push(data[3]);
		
		});
		deAssignUserCountryMapping(ids,countryNames,startTime,endTime);
	});
</script>
<script src="<%= request.getContextPath() %>/web/js/highcharts.js"></script>
<script src="<%= request.getContextPath() %>/web/js/exporting.js"></script>

<input type="hidden" name="csrfPreventionSalt"
	id="csrfPreventionSaltId"
	value="<%=request.getAttribute("csrfPreventionSalt") %>" />

</body>
<!-- END BODY -->
</html>