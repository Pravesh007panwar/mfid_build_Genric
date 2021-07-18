     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>

<%@ page import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.PropertyFileUtility" %>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>	
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />  
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	<script src="<%= request.getContextPath() %>/web/js/custom/activate-resync.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/assign-policy.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/resync_Clock.js" type="text/javascript"></script>
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
<s:form validate="true" theme="simple" >
	

    
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
			</div>    -->
			
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
						   <li> <a href="<%= request.getContextPath() %>/policy_showAssignPolicy">Assign Policy</a><span class="divider-last">&nbsp;</span></li>
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
									   <h4><i class="icon-retweet"></i> Assign&nbsp;&nbsp;Policy</h4>
									   <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
									</div>
									<div class="widget-body">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid">
												<a class="icon-btn span2 active tb_active" id ="tab_1" href="#block_policy_app" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Assign Policy to Application</div>
													</span>
												</a>
												
												<a class="icon-btn span2 " id ="tab_2" href="#block_policy_user" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Assign Policy to User</div>
													</span>
												</a>
												<a class="icon-btn span2 " id ="tab_3" href="#block_device_policy_user" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Assign Device Policy to User</div>
													</span>
												</a>
												
											  <a class="icon-btn span2 " id ="tab_4" href="#block_device_os_policy_user" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Assign Device OS Policy to User</div>
													</span>
											  </a>
												<!--
												<a class="icon-btn span2 " id ="tab_3" href="#block_policy_remote_user" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Assign Policy to Remote User</div>
													</span>
												</a>
												
												
											--></div> 
											
											<div class="tab-content pl_cont ">
												<div class="tab-pane active " id="block_policy_app">
													<h4>Assign Policy to Application</h4>
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
														<div class="row-fluid" id="app_pol_domain" >
															<div class="span6 offset0" id="addTo_domainDiv">
																<select id="app_pol_domain_select" name="app_pol_domain_select" class="ass-dss-select span6">
																	
																</select>
															</div>
														</div>
													</div>
													<div id="block_policy_app_data"></div>
												</div>
												
												<div class="tab-pane pl_cont "id="block_policy_user">
													<h4>Assign Policy to User</h4>
													<div class="space15"></div>
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
														<form id="addtoselectForm">
															
															<div class="space15"></div>
															<div class="row-fluid" id="usr_appDom" >
																<div class="span3 offset1" id="addTo_domainDiv">
																	<select id="usr_domain_select" name="usr_pol_domain_select"cals="span3 offeset1">
																	
																	</select>
																</div>
																<div class="span3 offset1" id="usr_pol_app_select">
																	<select id="usr_app_select" name="usr_app_select" >
																		<option value="">-select App-</option>
																	</select>
																</div>
																
																<div class="span3 offset1" id="usr_pol_type_select">
																	<select id="usr_type_select" name="usr_type_select">
																		<option value="">-select Auth Type-</option>
																		<option value="Hard">Hard Token</option>
																		<option value="Bio">Bio Token</option>
																		<option value="Emergency">Emergency Token</option>
																		<option value="Mobile">Mobile Token</option>
																		<option value="Push">Push Token</option>
																		<option value="Sms">Sms Token</option>
																		<option value="No">No Token</option>
																		
																		
																	</select>
																</div>
																
																<div class="space15"></div>
																<div class="span5 offset5"><button type="button" class="btn btn-primary" id="usr_search_btn">Submit</button></div>
																<div class="clear"></div>

															</div>
														</form>
													</div>
													<div id="block_policy_user_data"></div>
												</div>
												
												
												
												<div class="tab-pane pl_cont "id="block_device_policy_user">
													<h4>Assign Device Policy to User</h4>
													<div class="space15"></div>
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
														<form id="addtoselectForm">
															
															<div class="space15"></div>
															<div class="row-fluid" id="usr_appDom" >
																<div class="span3 offset1" id="addTo_domainDiv">
																	<select id="usr_domain_select_dev" name="usr_pol_domain_select"cals="span3 offeset1">
																	
																	</select>
																</div>
																<div class="span3 offset1" id="usr_pol_app_select">
																	<select id="usr_app_select_dev" name="usr_app_select" >
																		<option value="">-select App-</option>
																	</select>
																</div>
																
																<div class="span3 offset1" id="usr_pol_type_select_dev">
																	<select id="usr_type_select" name="usr_type_select">
																		<option value="">-select Auth Type-</option>
																		<option value="Bio">Bio Token</option>
																		<!-- <option value="Mobile">Mobile Token</option> -->
																		<option value="Push">Push Token</option>
																		
																		
																			
																	</select>
																</div>
																
																<div class="space15"></div>
																<div class="span5 offset5"><button type="button" class="btn btn-primary" id="usr_search_btn_dev">Submit</button></div>
																<div class="clear"></div>

															</div>
														</form>
													</div>
													<div id="block_device_policy_user_data"></div>
												</div>
												
												
													<div class="tab-pane pl_cont "id="block_device_os_policy_user">
													<h4>Assign Device OS Policy to User</h4>
													<div class="space15"></div>
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
														<form id="addtoselectForm">
															
															<div class="space15"></div>
															<div class="row-fluid" id="usr_appDom" >
																<div class="span3 offset1" id="addTo_domainDiv">
																	<select id="usr_domain_select_dev_os" name="usr_pol_domain_select"cals="span3 offeset1">
																	
																	</select>
																</div>
																<div class="span3 offset1" id="usr_pol_app_select">
																	<select id="usr_app_select_dev_os" name="usr_app_select" >
																		<option value="">-select App-</option>
																	</select>
																</div>
																
																<div class="span3 offset1" id="usr_pol_type_select_dev">
																	<select id="usr_type_select_os" name="usr_type_select">
																		<option value="">-select Auth Type-</option>
																		<option value="Bio">Bio Token</option>
																		<!-- <option value="Mobile">Mobile Token</option> -->
																		<option value="Push">Push Token</option>
																		
																		
																			
																	</select>
																</div>
																
																<div class="space15"></div>
																<div class="span5 offset5"><button type="button" class="btn btn-primary" id="usr_search_btn_dev_os">Submit</button></div>
																<div class="clear"></div>

															</div>
														</form>
													</div>
													<div id="block_device_policy_os_user_data"></div>
												</div>
												
												
														<div class="tab-pane pl_cont "id="block_policy_remote_user">
													<h4>Assign Policy to Remote User</h4>
													<div class="space15"></div>
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
														<form id="addtoselectForm">
															
															<div class="space15"></div>
															<div class="row-fluid" id="usr_appDom" >
																<div class="span3 " id="addTo_domainDiv">
																	<select id="remote_usr_domain_select" name="remote_usr_pol_domain_select"cals="span3 offeset1">
																	
																	</select>
																</div>
																<div class="span3 " id="remote_usr_pol_app_select">
																	<select id="remote_usr_app_select" name="remote_usr_app_select" >
																		<option value="">-select App-</option>
																	</select>
																</div>
																
																<div class="span3 " id="remote_usr_pol_type_select">
																	<select id="remote_usr_type_select" name="remote_usr_type_select">
																		<option value="">-select Auth Type-</option>
																		<option value="1">Hard Token</option>
																		<option value="6">Soft Token</option>
																		<option value="3">Mobile Token</option>
																		<option value="7">Push Token</option>
																		<option value="8">IP Token</option>
																		</select>
																</div>
																<div class="span3 " id="remote_usr_pol_type_select">
																	<select id="assign_deassign_select" name="assign_deassign_select">
																		<option value="">-select Assign/ Deassign-</option>
																		<option value="assign">Assign</option>
																		<option value="deassign">Deassign</option>
																		
																		</select>
																</div>
																<div class="space15"></div>
																<div class="span5 offset5"><button type="button" class="btn btn-primary" id="remote_usr_search_btn">Submit</button></div>
																<div class="clear"></div>

															</div>
														</form>
													</div>
													<div id="block_policy_remote_user_data"></div>
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
  
	<%int appId=SessionUtil.getApplication().getId(); 
	String orgName=SessionUtil.getOrganization().getOrganisationName();
	%>
   <script>
     jQuery(document).ready(function() {       
			// initiate layout and plugins
			App.init();
			document.getElementById('org').value='<%=orgName%>';
			fetchDomain('app_pol_domain_select');
		});
		
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
   
		
		$(document).on('change','#app_pol_domain_select',function(){
			var val = $(this).val();
			
			app_policy();
		});
		
		
		//$(document).on('change','#app_pol_domain_select',function(){
		//	var val = $(this).val();
			
		//	user_policy('block_policy_app');
	//	});
		
		//$('#usr_domain_select').live('change',function(){
	$(document).on('change','#usr_domain_select',function(){
			var val = $(this).val();
			fetchApp(val,'usr_app_select');
			/*var content = '';
			//alert('hello');
			if(val){													
				content +='<option value="App1">App1</option>';
				content +='<option value="App2">App2</option>';
				content +='<option value="App3">App3</option>';
				content +='<option value="App4">App4</option>';
				content +='<option value="App5">App5</option>';
			}
			$('#usr_app_select').html(content); */
		});
	
	
	$(document).on('change','#usr_domain_select_dev',function(){
		var val = $(this).val();
		fetchApp(val,'usr_app_select_dev');
		/*var content = '';
		//alert('hello');
		if(val){													
			content +='<option value="App1">App1</option>';
			content +='<option value="App2">App2</option>';
			content +='<option value="App3">App3</option>';
			content +='<option value="App4">App4</option>';
			content +='<option value="App5">App5</option>';
		}
		$('#usr_app_select').html(content); */
	});
		
		
		
		
		//$('#remote_usr_domain_select').live('change',function(){
		$(document).on('change','#remote_usr_domain_select',function(){
			var val = $(this).val();
			//alert("val=="+val)
			fetchApp(val,'remote_usr_app_select');
			
		});
		
		
		
		$('#usr_search_btn').on('click',function(){
			var domain = $('#usr_domain_select :selected').val();
			if(domain==""){
			alert("Please select Domain");
			return;
			}
			var app = $('#usr_app_select :selected').val();
			if(app==""){
			alert("Please select Application");
			return;
			}
			var authType = $('#usr_pol_type_select :selected').val();
			if(authType==""){
			alert("Please select Authentication Type");
			return;
			}
			
			user_policy(authType);
		
		});
		
		
		$('#usr_search_btn_dev').on('click',function(){
			var domain = $('#usr_domain_select_dev :selected').val();
			if(domain==""){
			alert("Please select Domain");
			return;
			}
			var app = $('#usr_app_select_dev :selected').val();
			if(app==""){
			alert("Please select Application");
			return;
			}
			var authType = $('#usr_pol_type_select_dev :selected').val();
			if(authType==""){
			alert("Please select Authentication Type");
			return;
			}
			
			user_policy_device(false,false);
		
		});
		
		
		$('#remote_usr_search_btn').on('click',function(){
			var domain = $('#remote_usr_domain_select :selected').val();
			if(domain==""){
			alert("Please select Domain");
			return;
			}
			var app = $('#remote_usr_app_select :selected').val();
			if(app==""){
			alert("Please select Application");
			return;
			}
			
			var authType = $('#remote_usr_pol_type_select :selected').val();
			if(authType==""){
			alert("Please select Authentication Type");
			return;
			}
			var assDeassFlag = $('#assign_deassign_select :selected').val();
			if(assDeassFlag==""){
			alert("Please select Assign/Deassign Type");
			return;
			}
		
			if(assDeassFlag=="assign")
			showAssignRemoteUserPolicy(authType);
			else if(assDeassFlag=="deassign")
			showDeassignRemoteUserPolicy(authType);
		
		});
		
		
		
		 $('#tab_2').on('click',function(){
		try{	 
			 $('#tab_1').removeClass('tb_active');
			 $('#tab_3').removeClass('tb_active');
			 $('#tab_2').addClass('tb_active');
			 $('#tab_4').removeClass('tb_active');
			fetchDomain('usr_domain_select');
			$('#block_device_policy_user_data').html('');
			
			document.getElementById('usr_app_select_dev').options.length = 1;
			document.getElementById('usr_domain_select_dev').options.length = 0;
			document.getElementById('usr_pol_type_select_dev').options.length = 0;
		} catch(e){ }
			
		});
		 
		 $('#tab_3').on('click',function(){
		 try{
			 $('#tab_1').removeClass('tb_active');
			 $('#tab_2').removeClass('tb_active');
			 $('#tab_3').addClass('tb_active');
			 $('#tab_4').removeClass('tb_active');
				
			fetchDomain('usr_domain_select_dev');
			$('#block_policy_user_data').html('');
			document.getElementById('usr_app_select').options.length = 1;
			document.getElementById('usr_domain_select').options.length = 0;
			document.getElementById('usr_pol_type_select').options.length = 0;
		 } catch(e) { }
		}); 
		
		 /* $('#tab_3').on('click',function(){
	
		fetchDomain('remote_usr_domain_select');
		}); */
		 $('#tab_1').on('click',function(){
			try{	 
			 
				 $('#tab_3').removeClass('tb_active');
				 $('#tab_2').removeClass('tb_active');
				 $('#tab_1').addClass('tb_active');
				 $('#tab_4').removeClass('tb_active');
		
				$('#block_policy_user_data').html('');
				$('#block_device_policy_user_data').html('');
				document.getElementById('usr_app_select').options.length = 1;
				document.getElementById('usr_domain_select').options.length = 0;
				document.getElementById('usr_pol_type_select').options.length = 0;
				document.getElementById('usr_app_select_dev').options.length = 1;
				document.getElementById('usr_domain_select_dev').options.length = 1;
				document.getElementById('usr_pol_type_select_dev').options.length = 1;
			} catch(e){ }
		});
		
	/*for select all checkbox*/
	
	//jQuery('.group-checkable').live('change',function(){
	/* $(document).on('click', '.group-checkable', function() {
		alert(123);
	
		var set = jQuery(this).attr("data-set");
		alert(set);
		var checked = jQuery(this).is(":checked");
		alert(checked);
		$(set).each(function(){
			alert(11);
		
			$(this).prop('checked', checked);
		}); */
		/* jQuery(set).each(function () {
			if (checked) {
				$(this).attr("checked", true);
			} else {
				$(this).attr("checked", false);
			}
		}); */
		/* jQuery.uniform.update(set);
		$("html, body").animate({ scrollTop: $(document).height()}, "fast");
	}); */
	
	
	
	$(document).on('click','#checkall', function() {
		   // Check or Uncheck All checkboxes
		     var checked = $(this).is(':checked');
		     if(checked){
		       $(".checkboxes1").each(function(){
		         $(this).prop("checked",true);
		       });
		     }else{
		       $(".checkboxes1").each(function(){
		         $(this).prop("checked",false);
		       });
		     }		 
		  // Changing state of CheckAll checkbox 
		  /* $(".checkbox").click(function(){
		 
		    if($(".checkbox").length == $(".checkbox:checked").length) {
		      $("#checkall").prop("checked", true);
		    } else {
		      $("#checkall").removeAttr("checked");
		    }

		  }); */
		     var elmnt = document.getElementById("checkbox03");
		     elmnt.scrollIntoView();
		});
	
	
	$(document).on('click','#checkall1', function() {
		   // Check or Uncheck All checkboxes
		     var checked = $(this).is(':checked');
		     if(checked){
		       $(".checkboxes2").each(function(){
		         $(this).prop("checked",true);
		       });
		     }else{
		       $(".checkboxes2").each(function(){
		         $(this).prop("checked",false);
		       });
		     }		 
		  // Changing state of CheckAll checkbox 
		  /* $(".checkbox").click(function(){
		 
		    if($(".checkbox").length == $(".checkbox:checked").length) {
		      $("#checkall").prop("checked", true);
		    } else {
		      $("#checkall").removeAttr("checked");
		    }

		  }); */
		  
		     var elmnt = document.getElementById("checkbox01");
		     elmnt.scrollIntoView();
		});
	
	
	$(document).on('click','#checkall4', function() {
		   // Check or Uncheck All checkboxes
		     var checked = $(this).is(':checked');
		     if(checked){
		       $(".checkboxes4").each(function(){
		         $(this).prop("checked",true);
		       });
		     }else{
		       $(".checkboxes4").each(function(){
		         $(this).prop("checked",false);
		       });
		     }		 
		  // Changing state of CheckAll checkbox 
		  /* $(".checkbox").click(function(){
		 
		    if($(".checkbox").length == $(".checkbox:checked").length) {
		      $("#checkall").prop("checked", true);
		    } else {
		      $("#checkall").removeAttr("checked");
		    }

		  }); */
		});
	
	$(document).on('click','#checkAll5', function() {
		   // Check or Uncheck All checkboxes
		     var checked = $(this).is(':checked');
		     if(checked){
		       $(".checkboxes5").each(function(){
		         $(this).prop("checked",true);
		       });
		       $("html, body").animate({ scrollTop: $(document).height()}, "fast");
		     }else{
		       $(".checkboxes5").each(function(){
		         $(this).prop("checked",false);
		       });
		     }		 
		  // Changing state of CheckAll checkbox 
		  /* $(".checkbox").click(function(){
		 
		    if($(".checkbox").length == $(".checkbox:checked").length) {
		      $("#checkall").prop("checked", true);
		    } else {
		      $("#checkall").removeAttr("checked");
		    }

		  }); */
		});
	
	

	
	/*for select all checkbox*/
$('#myModal').on('shown.bs.modal', function (e){


resyncClock();


	
});
	
	$(function() { $("form").submit(function() { return false; }); });
	
	
	$(document).on('click', '.group-checkable3', function() {
		var set = jQuery(this).attr("data-set");
		var checked = jQuery(this).is(":checked");
		$(set).each(function(){
			//alert(11);
		
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
	
	
	
	 $(document).on('click', '.group-checkable', function() {
		
		$("html, body").animate({ scrollTop: $(document).height()}, "fast");
	}); 
	

	$('#usr_search_btn_dev_os').on('click',function(){
		 
		var domain = $('#usr_domain_select_dev_os :selected').val();
				if(domain==""){
				alert("Please select Domain");
				return;
				}
				var app = $('#usr_app_select_dev_os :selected').val();
				if(app==""){
				alert("Please select Application");
				return;
				}
				
				var authType = $('#usr_type_select_os :selected').val();
				if(authType==""){
				alert("Please select Authentication Type");
				return;
				}
				
				user_policy_device_os(false,false);
			
			});


	 $('#tab_4').on('click',function(){
	  try {
		 $('#tab_4').addClass('tb_active');
		 $('#tab_1').removeClass('tb_active');
		 $('#tab_2').removeClass('tb_active');
		 $('#tab_3').removeClass('tb_active');
					fetchDomain('usr_domain_select_dev_os');
					$('#block_policy_user_data').html('');
					document.getElementById('usr_app_select').options.length = 1;
					document.getElementById('usr_domain_select').options.length = 0;
					document.getElementById('usr_pol_type_select').options.length = 0;
	  } catch(e) { }
	 }); 
	
	 
		$(document).on('click','#checkall12', function() {
			   // Check or Uncheck All checkboxes
			     var checked = $(this).is(':checked');
			     if(checked){
			       $(".checkboxes3").each(function(){
			         $(this).prop("checked",true);
			       });
			     }else{
			       $(".checkboxes3").each(function(){
			         $(this).prop("checked",false);
			       });
			     }
			     
			     var elmnt = document.getElementById("checkbox02");
			     elmnt.scrollIntoView();
			     
			    
		 	});
		
		
		$(document).on('change','#usr_domain_select_dev_os',function(){
			var val = $(this).val();
			fetchApp(val,'usr_app_select_dev_os');
			/*var content = '';
			//alert('hello');
			if(val){													
				content +='<option value="App1">App1</option>';
				content +='<option value="App2">App2</option>';
				content +='<option value="App3">App3</option>';
				content +='<option value="App4">App4</option>';
				content +='<option value="App5">App5</option>';
			}
			$('#usr_app_select').html(content); */
		});
		
		
		
		$(document).on('click','#checkall444', function() {
			   // Check or Uncheck All checkboxes
			     var checked = $(this).is(':checked');
			     if(checked){
			       $(".checkboxes444").each(function(){
			         $(this).prop("checked",true);
			       });
			     }else{
			       $(".checkboxes444").each(function(){
			         $(this).prop("checked",false);
			       });
			     }		 
      });
		
   </script>
 <%--   <script src="js/highcharts.js"></script>
   <script src="js/exporting.js"></script>
   <script type="text/javascript">
  
   </script> --%>
   <input type="hidden" id="org"/>
   </s:form>
   <input type="hidden" name="csrfPreventionSalt" id="csrfPreventionSaltId" value="<%=request.getAttribute("csrfPreventionSalt") %>"/>
</body>
<!-- END BODY -->
</html>
