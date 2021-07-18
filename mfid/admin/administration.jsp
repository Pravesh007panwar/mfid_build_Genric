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
	<script src="<%= request.getContextPath() %>/web/js/custom/schedular.js" type="text/javascript"></script>
		<script src="<%= request.getContextPath() %>/web/js/custom/sync_user.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/domain.js" type="text/javascript"></script>
	
	<script src="<%= request.getContextPath() %>/web/js/custom/superadmin.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/manage_role.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/manage_application.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/lockunlock.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/resync_Clock.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/emergency_auth.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/assign_deassign_token_domain.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/shadow.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/change-auth.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/associate_manually.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/associate_random.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/deassociate_token.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/assign-deassign.js" type="text/javascript"></script>
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
<!--<s:form name="f1" validate="true" theme="simple" >-->
	
<input type="hidden" name="csrfPreventionSalt" value="<%=request.getAttribute("csrfPreventionSalt") %>"/>
    
	<!-- BEGIN CONTAINER -->
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		 <div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
		<!-- <div class="navbar-inverse">
				<form class="navbar-search visible-phone">
					<input type="text" class="search-query" placeholder="Search" />
				</form>
			</div>   -->	
			
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
						Administration
					  </h3>
					   <ul class="breadcrumb">
						   <li>
							 <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">Admin</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li><a href="<%= request.getContextPath() %>/admin_showManageAdministration">Manage Administration</a><span class="divider-last">&nbsp;</span></li>
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
									   <h4><i class="icon-retweet"></i>Manage&nbsp;Administration </h4>
									   <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
									</div> 
									
									<div class="widget-body">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid">
											<% if(SessionUtil.getRole().getId()==1||SessionUtil.getRole().getId()==2){ %>
												<a class="icon-btn span2 active" id ="tab_1" href="#block_domain" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Domain</div>
													</span>
												</a>
											<% } %>	
												<a class="icon-btn span2 " id ="tab_2" href="#block_application" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Application</div>
													</span>
												</a>
												
												<a class="icon-btn span2 " id ="tab_3" href="#block_manage_role" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Manage Role</div>
													</span>
												</a>
												<% if(SessionUtil.getRole().getId()==1||SessionUtil.getRole().getId()==2){ %>
												<a class="icon-btn span2 " id ="tab_4" href="#block_super_admin" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Delete Super Admin</div>
													</span>
												</a>
												<% } %>	
												<% if(SessionUtil.getRole().getId()==1||SessionUtil.getRole().getId()==2||SessionUtil.getRole().getId()==3){ %>
											<!-- Comment by Abhimanyu and this functionality move to application.property files	<a class="icon-btn span2 " id ="tab_5" href="#block_schedular" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>User Sync Schedular</div>
													</span>
												</a>  -->
												<a class="icon-btn span2 " id ="tab_6" href="#block_syncUser" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div> Sync User</div>
													</span>
												</a>
											<% } %>	
												
												
												
												
												
												
											</div> 
											
											<div class="tab-content">
												<div class="tab-pane active" id="block_domain">
												
													<div id="block_domain_data"></div>
													
												
												</div>
												
												<div class="tab-pane " id="block_application">
												
													<div id="block_application_data"></div>
													
												
												</div>
												
												<div class="tab-pane "  id="block_manage_role">
												
												
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
													<h4>Manage Role</h4>
												
													<div class="row-fluid">
														<div class="span4">
															<label>Domain</label>
															<!--<s:select onchange="showAppList()" cssClass="manage_role_select" theme="simple" id="m_r_domain" name="m_r_domain" headerKey="" headerValue="Domain"   list="#session.domainList"/>-->
										<select id="m_r_domain" onchange="showAppList()" class="manage_role_select" name="m_r_domain">
																	<option value="">-select domain-</option>
																	
																</select>					
														</div>
														<div class="span4 offset4">
															<label>Application</label>
																<select id="appList_id" onchange="showUsers(false,false);" class="manage_role_select" name="m_r_application" id="m_r_application">
																	<option value="">-select application-</option>
																	
																</select>												
														</div>
														<div class="clear"></div>
														<div id="block_active_assign_deassign_data"></div>
													<!--  	<div class="form-actions form-actions2">
														  <button class="btn btn-primary" type="button"  onclick="submitUsername()" >Submit</button>
														
														 </div> -->
													</div>
												</div><div class="space15"></div>
													<div id="block_manage_role_data"></div>
													
												
												</div>
												
												<div class="tab-pane " id="block_super_admin">
												
													<div id="block_super_admin_data"></div>
													
												
												</div>
												
												<div class="tab-pane " id="block_schedular">
												
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
															<div class="row-fluid">
																<div class="controls">
																	<label class="checkbox">
																	<span><input name ="shadow_token" class="schedular_radio" checked='' type="radio" value="Day"></span> Day
																	</label>
																	<label class="checkbox">
																	<span><input class="schedular_radio" type="radio" name ="shadow_token" value="Weekly"></span>Weekly
																	</label>
																	
																	<label class="checkbox">
																	<span><input class="schedular_radio" type="radio" name ="shadow_token" value="Monthly"></span> Monthly
																	</label>
																	
																	<input type="button" id="scedular_btn" value="Submit" class="btn btn-primary">
																</div>
																<div class="clear"></div>
															</div>
													</div>	
													<div id="schedular_data">
													
													</div>
														
												</div>
												
												<div class="tab-pane " id="block_syncUser">
												
													
													<div id="userSync_data"></div>
														
												</div>
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

<%-- <script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.1.12.1.min.js" type="text/javascript"></script> --%>


<script src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js" type="text/javascript"></script>
<!-- End For Datatable (searching)--> 

   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
   
   <%-- <script src="<%= request.getContextPath() %>/web/js/table-editable.js"></script> --%>
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/in/administration-editable.js"></script>
	<%int appId=SessionUtil.getApplication().getId(); 
	String orgName=SessionUtil.getOrganization().getOrganisationName();
	%>
   <script>
      jQuery(document).ready(function() {       
         // initiate layout and plugins
         App.init();
		 TableEditable.init();
		 TableEditable_App.init();
      });
      var oTable ="";
	 	$(document).ajaxStart(function(){
  
    $("#loading").css("display","block");
    $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
     // alert("start");
  });
  
  $(document).ajaxComplete(function(){
	//$('select option:contains("Select Size")').attr('disabled', true);
    $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
     // alert("complete");
  });  
    
	
	 $('#tab_1').on('click',function(){
	
		showDomain();
		});
		 $('#tab_6').on('click',function(){
		try{ 
		    $("#pageId_syncUser").val(''); 
		    $("#pageNum_syncUser").val(''); 
		   }catch(err){}
		showSyncUser(false);
		});
		
		 $('#tab_3').on('click',function(){
		 
	org='<%=orgName%>';
	document.getElementById('m_r_domain').options.length = 1;
	showDomainListForManageRole(org);
	
	document.getElementById('appList_id').options.length = 1;
	
		document.getElementById('m_r_domain').options[0].selected = 'selected';
		document.getElementById('appList_id').options[0].selected = 'selected';
 	$('#block_manage_role_data').html('<span></span>');
		});
	
		
		$('#tab_2').on('click',function(){
		app=<%=appId%>;
		var role=<%=SessionUtil.getUserMapping().getRole().getId()%>;
		showDomainList(app,role);
		
		});
		  
	 
		
		
		
		
		$('#tab_4').on('click',function(){
			showSuperAdmin();
		});
	
	

	/*for select all checkbox*/
	
	//jQuery('.group-checkable').live('change',function(){
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
		$("html, body").animate({ scrollTop: $(document).height()}, "fast");
	});
	
	$('#scedular_btn').on('click',function(){
			var selectedVal = $(".schedular_radio:checked").val();
			
			if(!selectedVal){
			
				return false;
			}else if(selectedVal == 'Day'){
			showLables();
				openDayTab();
			}else if(selectedVal == 'Weekly'){
			showLables();
				openWeekTab();
			}else if(selectedVal == 'Monthly'){
			showLables();
				openMonthTab();
			}
		});
		$('#myModal').on('shown.bs.modal', function (e){


resyncClock();


	
});
	
   </script>
 <%--   <script src="js/highcharts.js"></script>
   <script src="js/exporting.js"></script>
   <script type="text/javascript">
  
   </script> --%>
   <input type="hidden" id="org"/>
  <!--   </s:form> -->
</body>
<!-- END BODY -->
</html>
