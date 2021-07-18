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
	<script src="<%= request.getContextPath() %>/web/js/custom/tokenRevalidationPolicy.js" type="text/javascript"></script>
		<script src="<%= request.getContextPath() %>/web/js/custom/resync_Clock.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/activate-resync.js" type="text/javascript"></script>
	
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
<!--<s:form validate="true" theme="simple" >-->
	

    
	<!-- BEGIN CONTAINER -->
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		 <div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
	<!-- 		<div class="navbar-inverse">
				<form class="navbar-search visible-phone">
					<input type="text" class="search-query" placeholder="Search" />
				</form>
			</div>     -->
			
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
						Policy
					  </h3>
					   <ul class="breadcrumb">
						   <li>
							  <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">Policy</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li> <a href="<%= request.getContextPath() %>/policy_showTokenRevalidationPolicy">Token Revalidation Policy</a><span class="divider-last">&nbsp;</span></li>
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
									   <h4><i class="icon-retweet"></i> Manage&nbsp;&nbsp;Policy</h4>
									   <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
									</div>
									<div class="widget-body">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid">
												<a class="icon-btn span2 active" id ="tab_1" href="#block_policy" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Manage</div>
													</span>
												</a>
												<a class="icon-btn span2 " id ="tab_2" href="#block_policy_addTo" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Add To</div>
													</span>
												</a>
											</div> 
											
											<div class="tab-content ">
												<div class="tab-pane active " id="block_policy">
													
													<div class="row" style="height:20px;"></div>
													<div id="policyFormdiv" style="display:none;">
														<form class="form-horizontal" action="#" id="policyAddForm">
															<div class="control-group">
																<label class="control-label">Policy Name</label>
																<div class="controls">
																	<input type="text" id="policyDesc" class="input-large" />
																</div>
															</div>
															
															<!--<div class="control-group">
																<label class="control-label">Reuse Flag</label>
																<div class="controls">
																	<select class="input-large m-wrap" onchange="callReuseFlag()"  name="reuseFlag" id="reuseFlag">
																		<option value="1">Yes</option>
																		<option value="0">No</option>
																	</select>
																</div>
															</div>
															
															--><div class="control-group">
																<label class="control-label">Number of Days</label>
																<div class="controls">
																	<input type="text" id="numberOfDays" class="input-large" />
																</div>
															</div>
															<!--<div class="control-group">
																<label class="control-label">Policy Type</label>
																<div class="controls ">
																	<select class="input-large m-wrap"  name="policyType" id="policyType">
																		<option value="0">All</option><option value="1">HardPolicy</option><option value="2">SMSPolicy</option><option value="3">MobilePolicy</option><option value="6">SoftPolicy</option><option value="7">PushPolicy</option>
																	</select>
																</div>
															</div>
															
															--><div class="control-group">
																<label class="control-label">Add To</label>
																<div class="controls ">
																	<select class="input-large m-wrap"  name="addTo"  id="addTo">
																		<option value="">-select-</option>
																		<option value="domain">Domain</option>
																		<option value="App">Application</option>
																	</select>
																</div>
															</div>
															
															<div class="control-group" id="domainDiv" style="display:none;">
																<label class="control-label">Domain</label>
																<div class="controls ">
																	<select class="input-large m-wrap"  name="domain" id="domain">
																		<option value="">-select Domain-</option>
																	</select>
																</div>
															</div>
															
															<div class="control-group" id="appDiv" style="display:none;">
																<label class="control-label">Application</label>
																<div class="controls ">
																	<select class="input-large m-wrap" multiple name="application" id="application">
																		
																	</select>
																</div>
															</div>
															<div class="form-actions">
																<button class="btn blue" id="saveBtn" type="button"><i class="icon-ok"></i> Save</button>
																<button class="btn" id="cancelBtn" type="button"><i class=" icon-remove"></i> Cancel</button>
															</div>
															<input type="hidden" id="policyDecBeforeEdit" />
															
															<input type="hidden" id="numberOfDaysBeforeEdit" />
															
															<input type="hidden" id="domainName" />
															<input type="hidden" id="appName" />
															<input type="hidden" id="pId" />
														</form>
													</div>
													
														
													<div id="block_policy_data"></div>
													
												</div>
												<div class="tab-pane pl_cont "id="block_policy_addTo">
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
														<form id="addtoselectForm">
															<div class="row-fluid">
															<%if(SessionUtil.getUserMapping().getRole().getId()!=4){%>
																<div class="span3">
																	<label class="">Domain</label>
																	<div class="offset1">
																		<input class="addtoType" value="domain"  name="addTo" type="radio" id="addto_domain" />
																	</div>
																</div>
																<div class="span3"> 
																	<label class="">Application</label>
																	<div class=" offset2">
																		<input class="addtoType" value="application"  name="addTo" type="radio" id="addto_application"/>
																	</div>
																</div>
																	<% }else {%>
																	<div class="span3"> 
																	<label class="">Application</label>
																	<div class=" offset2">
																		<input class="addtoType" value="application"  name="addTo" type="radio" id="addto_application"/>
																	</div>
																</div>
																	<%} %>
																<div class="clear"></div>
															</div>
															<div class="space15"></div>
															<div class="row-fluid" id="addto_appDom" style="display:none;">
																<div class="span3 " id="addTo_domainDiv">
																	<select id="addto_domain_select" name="addto_domain_select" class="ass-dss-select span6">
																		<option value="">-Domain-</option>
																		<option value="1">Domain1</option>
																		<option value="2">Domain2</option>
																	</select>
																</div>
																<div class="span3" id="addToAppDiv">
																	<select id="addto_app_select" name="addto_app_select" style="width:180px;" class="ass-dss-select span6">
																		<option value="">-select application-</option>
																		
																	</select>
																</div>
																<div class=" span2"><button type="button" class="btn btn-primary" id="addTo_search_btn">Submit</button></div>
																<div class="clear"></div>

															</div>
														</form>
													</div>
													<div id="block_policy_addTo_data"></div>
												</div>
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

   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/in/bootstrap-multiselect.js"></script>
   <%-- <script src="<%= request.getContextPath() %>/web/js/table-editable.js"></script> --%>
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/in/token-revalidation-policy-editable.js"></script>
	<% int appId=SessionUtil.getApplication().getId(); 
	String orgName=SessionUtil.getOrganization().getOrganisationName();
	%>
  <script type="text/javascript">
	
		jQuery(document).ready(function() {       
			// initiate layout and plugins
			App.init();
			TableEditable.init();
			openPolicy();
			
			$('#application').multiselect({
				includeSelectAllOption: true
			});
			
		});
		
	
			$(document).ajaxStart(function() {

				$("#loading").css("display", "block");
				//$('body').css("opacity", "0.8");
				$(".log").text("Triggered ajaxStart handler.");
			});

			$(document).ajaxComplete(function() {

				$("#loading").css("display", "none");
				//$('body').css("opacity", "1");
				$(".log").text("Triggerd ajaxComplete handler.");

			});

			var oTable = '';
			$(document).on('click', '#tab_1', function() {

				openPolicy();
			});

			$('#cancelBtn').on('click', function() {
				var selVal = $('#domain').attr('multiple');
				if (selVal) {
					$('#domain').multiselect('destroy');
					$('#domain').attr('multiple', false);
				}
				$('#domainDiv').hide();
				$('#appDiv').hide();
				this.form.reset();
				$('#policyFormdiv').hide();

			});

			$('#addTo').on('change', function() {

				try {
					var addLevel = document.getElementById('addTo').value;

					if (addLevel == "domain" || addLevel == "App")
						$('#domain').attr('multiple', false);
					//showDomainList('false');

					var val = addLevel.trim();

					if (val == 'domain') {
						showDomainList('true', 'domain');
						$('#domain').attr('multiple', true);
						//start changes for bug id #277 , added by abhimanyu 
						$('#domain').multiselect('destroy');
						//end changes for bug id #277 , added by abhimanyu	
						$('#domain').multiselect({
							includeSelectAllOption : true
						});
						$('#domainDiv').show();
						$('#appDiv').hide();
					} else if (val == 'App') {
						showDomainList('false', 'domain');
						$('#domain').multiselect('destroy');
						$('#domain').attr('multiple', false);
						$("#domain").change(function() {
							getApplicationList('application', 'domain');
						});
						$('#domainDiv').show();
						$('#appDiv').show();
					}
				} catch (e) {
					alert(e)
					// TODO: handle exception
				}
			});

			$('.addtoType').on(
					'change',
					function() {
						try {
							var val = $(this).val();
							document.getElementById("level").value = val;
							if (val == 'domain') {

								showDomainList('true', 'addto_domain_select');
								$('#addto_appDom').show();
								//	$('#addto_domain_select').attr('multiple',true);

								$('#addTo_domainDiv').show();
								$('#addToAppDiv').hide();
							} else if (val == 'application') {
								showDomainList('false', 'addto_domain_select');

								$("#addto_domain_select").change(
										function() {
											getApplicationList(
													'addto_app_select',
													'addto_domain_select');
										});

								$('#addto_appDom').show();
								//	$('#addto_domain_select').multiselect('destroy');
								//	$('#addto_domain_select').attr('multiple',false);
								$('#addTo_domainDiv').show();
								$('#addToAppDiv').show();
								//$('#addto_app_select').attr('multiple',true);
							}
						} catch (e) {
							alert(e)
						}
					});
			$('#addTo_search_btn').on('click', function() {
				addtoTable('block_policy_addTo')
			});

			$(document).on('click', '.group-checkable', function() {
				var set = jQuery(this).attr("data-set");
				var checked = jQuery(this).is(":checked");
				$(set).each(function() {
					$(this).prop('checked', checked);
				});

				jQuery.uniform.update(set);
			});

			$('#myModal').on('shown.bs.modal', function(e) {

				resyncClock();

			});
		</script>
  <%--  <script src="js/highcharts.js"></script>
   <script src="js/exporting.js"></script>
   <script type="text/javascript">
  
   </script> --%>
    <input type="hidden" id="level"/>
  <!--   </s:form>-->
  <input type="hidden" name="csrfPreventionSalt" id="csrfPreventionSaltId" value="<%=request.getAttribute("csrfPreventionSalt") %>"/>
</body>
<!-- END BODY -->
</html>
