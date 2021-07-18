<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>

<%@ page import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.web.actions.admin.TokenAction,com.mfid.common.util.PropertyFileUtility" %>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>	
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />  
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	<script src="<%= request.getContextPath() %>/web/js/custom/managetoken.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/lockunlock.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/insert_token.js" type="text/javascript"></script>
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
<s:form  name="f1" validate="true" theme="simple" >
	
    
	<!-- BEGIN CONTAINER -->
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		 <div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM --><!--
			<div class="navbar-inverse">
				<form class="navbar-search visible-phone">
					<input type="text" class="search-query" placeholder="Search" />
				</form>
			</div>
			
			--><!-- BEGIN SIDEBAR MENU -->
		<jsp:include page="/common/menu.jsp"/>
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
						Tokens
					  </h3>
					   <ul class="breadcrumb">
						   <li>
							 <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">Tokens</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li><a href="<%= request.getContextPath() %>/token_showTokenManager">Manage Tokens</a><span class="divider-last">&nbsp;</span></li>
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
									   <h4><i class="icon-retweet"></i>Manage&nbsp;Tokens </h4>
									   <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
									</div> 
									
									<div class="widget-body">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid">
											<% if(SessionUtil.getRole().getId()==1||SessionUtil.getRole().getId()==2){ %>	
												<a class="icon-btn span2 active" id ="tab_1" href="#block_assign_token" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Assign/Deassign Token</div>
													</span>
												</a>
												<%} %>
												<!--
												
												<a id ="tab_2" class="icon-btn span2" href="#block_remove_token" data-toggle="tab">
													<span>
													<i class="icon-key"></i>
													<div>Remmove Token</div>
													</span>
												</a>
												
												
												<a id ="tab_3" class="icon-btn span2" href="#block_assign_emergency_authentication" data-toggle="tab">
													<span>
														<i class="icon-group"></i>
														<div>Assign Emergency Authentication</div>
													</span>
												</a>-->
												
												<a id ="tab_4" class="icon-btn span2" href="#active_resync_hard_token" data-toggle="tab">
													<span>
														<i class="icon-user"></i>
														<div>Activate / Resync Hard Token</div>
													</span>
												</a>
												
												<a id ="tab_5" class="icon-btn span2" href="#block_lock_unlock" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Lock / Unlock Token</div>
													</span>
												</a>
											<% if(SessionUtil.getRole().getId()==1||SessionUtil.getRole().getId()==2){ %>
												<a id ="tab_6" class="icon-btn span2" href="#block_insert_token" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Insert Token</div>
													</span>
												</a>
												
												<%} %>
											
												
												
												
												
												
												
											</div> 
											
											<div class="tab-content">
												<div class="tab-pane " id="block_assign_token">
													<span class="close"><a href="#"><i class="icon-remove-sign"></i></a></span>
													<div class="row" style="height:20px;"></div>
													
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
														<div class="row-fluid">
															<div class="controls">
															
																<label class="checkbox">
																<input name ="assign_token" class="shadow_radio"  type="radio" value="ht" checked='checked'/> Hard Token
																</label>
																<label class="checkbox">
																<input class="shadow_radio" type="radio" name ="assign_token" value="mt"/> Mobile Token
																</label>
																
																<label class="checkbox">
																<input class="shadow_radio" type="radio" name ="assign_token" value="bt"/> Bio Token
																</label>
																<label class="checkbox">
																<input class="shadow_radio" type="radio" name ="assign_token" value="pt"/>Push Token
																</label>
																<s:select id="domain_id"  headerKey="" headerValue="--Select Domain--" list="#session.domainForTokenAssig" name="domain" style="width:150px;" />
																<!--<select style="width:100px"><option value="1">Domain</option><option>Domain1</option value="2"></select>-->
																<select onchange="selectDefaultApp()" style="width:157px;" name="operation" id="assign_deassign">
																<option value=''>-Assign/Deassign-</option>
																<option value='assign'>Assign</option>
																<option value='deassign'>Deassign</option>
															</select>
																
																<input type="button" id="assignToken_btn" value="Submit" class="btn btn-primary"/>
															</div>
															
															<div class="clear"></div>

														</div>
													</div>
													
													
													<div id="block_assign_token_data"></div>
													
												</div>
										   
												<div class="tab-pane" id="block_remove_token">
													<span class="close"><a href="#"><i class="icon-remove-sign"></i></a></span>
													<div class="row" style="height:20px;"></div>
													
													<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
														<div class="row-fluid">
															<div class="controls">
															
																<label class="checkbox">
																<input name ="remone_token" class="shadow_radio" type="radio" value="" checked='checked'/> Hard Token
																</label>
																<label class="checkbox">
																<input class="shadow_radio" type="radio" name ="remone_token" value=""/> Mobile Token
																</label>
																
																<label class="checkbox">
																<input class="shadow_radio" type="radio" name ="remone_token" value=""/> Bio Token
																</label>
																<label class="checkbox">
																<input class="shadow_radio" type="radio" name ="remone_token" value=""/> Push Token
																</label>
																
																<select style="width:100px"><option value="1">Domain</option></select>
																
																
																<input type="button" id="remoneToken_btn" value="Submit" class="btn btn-primary"/>
															</div>
															
															<div class="clear"></div>

														</div>
													</div>
													
													
													<div id="block_remove_token_data"></div>
													
												</div>
												
												<div class="tab-pane" id="block_assign_emergency_authentication">
													<span class="close"><a href="#"><i class="icon-remove-sign"></i></a></span>
													<div class="row" style="height:20px;"></div>
													
													<div id="block_assign_emergency_authentication_data"></div>
												</div>
										   
												<div class="tab-pane" id="active_resync_hard_token">
													<span class="close"><a href="#"><i class="icon-remove-sign"></i></a></span>
													<div class="row" style="height:20px;"></div>
													
														<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
														<div class="row-fluid">
															<div class="controls">
															
														<select  style="width:180px;" name="operation" id="activate_resync">
																<option value=''>-Activate/Resync-</option>
																<option value='activate'>Activate </option>
																<option value='resync'>Resync</option>
															</select>
																
																<input type="button" id="resyncActivate_btn" value="Submit" class="btn btn-primary"/>
															</div>
															
															<div class="clear"></div>

														</div>
													</div>
													
													
													<div id="active_resync_hard_token_data"></div>
													
												</div>
										   
												<div class="tab-pane" id="block_lock_unlock">
												<span class="close"><a href="#"><i class="icon-remove-sign"></i></a></span>
												<div class="row" style="height:20px;"></div>
												<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
													<div class="row-fluid">
													<div class="span4">
													<!--  onchange="showAuth()" -->
															<select   name="lock_unlock"  id="lock_unlock">
																<option value=''>-Select Lock/Unlock-</option>
																<option value='lock'>Lock</option>
																<option value='unlock'>Unlock</option>
															</select>
														</div>
														
														 <div class="controls">
															<label  class="checkbox" >
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio" type="radio" checked='' name ="ass" value="1"/></span></div> Hard Token
															</label>
															
															<label class="checkbox">
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio" type="radio"  name="ass" value="3"/></span></div> Mobile Token
															</label>
															<label class="checkbox">
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio"type="radio" name ="ass" value="6"/></span></div> Bio Token
															</label>
															<label class="checkbox">
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio"type="radio" name ="ass" value="7"/></span></div> Push Token
															</label>
															<label class="checkbox">
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio"type="radio" name ="ass" value="2"/></span></div> SMS Token
															</label>
															
															<input type="button" id="lock_unlock_btn" value="Submit" class="btn btn-primary"/>
														</div>
														<div class="clear"></div>

													</div>
												
												</div>
												<form name="tab_5_frm" id="tab_5_frm" method="post" action="">
													<input type="hidden" id="tab_5_input" name="tab"/>
													<div id="block_active_lock_unlock_data"></div>
												</form>
											</div>
									   
												
												<div class="tab-pane" id="block_insert_token">
												<span class="close"><a href="#"><i class="icon-remove-sign"></i></a></span>
												<div class="row" style="height:20px;"></div>
												<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
													<div class="row-fluid">
													
														
														 <div class="controls">
															<label  class="checkbox" >
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio  inserTokenType" type="radio"   name ="inserTokenType"  value="ht"/></span></div> Hard Token
															</label>
															
															<label class="checkbox">
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio inserTokenType" type="radio"  name="inserTokenType" value="mt"/></span></div> Mobile Token
															</label>
															<label class="checkbox">
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio inserTokenType" type="radio"  name ="inserTokenType" value="bt"/></span></div> Bio Token
															</label>
															<label class="checkbox">
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio inserTokenType" type="radio"  name ="inserTokenType" value="pt"/></span></div> Push Token
															</label>
															<!--<label class="checkbox">
															<div class="radio" id="uniform-undefined"><span><input  class="ass_radio"type="radio" name ="inserTokenType" value="2"/></span></div> SMS Token
															</label>
															
															--><input type="button" id="insert_token_type_btn" value="Submit" class="btn btn-primary"/>
														</div>
														<div class="clear"></div>

													</div>
												
												</div>
												
											<!--  	<form name="tab_5_frm" id="tab_5_frm" method="post" action=""> -->
												<!-- <input type="hidden" id="tab_5_input" name="tab"/>-->
												
												
													<div class="tab_bottom_box" id="insert_token_data" style="display:none;">
														<div class="row-fluid">
															<div id="insert_token_form">
																<div class="space15"></div>
																<form  action="admin_readExcelData.action" name="f2" method="post" enctype="multipart/form-data" class="form-horizontal">
																	
																	<div class="control-group">
																		<label class="control-label">Import Token<span class="help-inline red_color">*</span></label>
																		<div class="controls">
																			 <input id="insert_file"  type="file" name="fileUpload"/><label id="fileLbl"></label>
																		</div>
																		<div class="form-actions">
																			<button  type="button" id="insert_file_btn" class="btn btn-primary">Submit</button>
																		</div>
																	</div>
																</form>
																
																<!-- <div class="progress">
    																	<div class="bar"></div >
    																	<div class="percent">0%</div >
																</div>  -->

																<div id="status"></div>
																
															</div>
															<div id="upload_loader"></div>
															<div id="upload_status" style="display:none;" >
														
																<div class="row">
																	<div class="span6" style="padding-left:20px;">
																		<label>Success</label>
																	 	<div style=" border: 1px solid #ddd; padding:5px; height: 200px;overflow: scroll;" id="success_msg"></div>
																	
																	</div>
																	<div class="span6">
																		<label>Fail</label>
																		<div style=" border: 1px solid #ddd; padding:5px; height: 200px;overflow: scroll;" id="fail_msg"></div>
																	
																	</div>
																</div>
															<span class="span10 offset2" id="fontId">Print</span>
														   </div>
															
														</div>
													</div>
												<!-- </form>-->
											</div>
												
										
												
												
												
												
										   
												   
											</div>
										</div>
									   <div id="manage_token_data" class="tab_bottom_box">
										
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
  <%--  <script src="<%= request.getContextPath() %>/web/js/jquery-1.7.1.min.js"></script> --%>
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
    <script src="<%= request.getContextPath() %>/web/js/jquery.form.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/dropzone.js"></script>
   <%-- <script src="<%= request.getContextPath() %>/web/js/table-editable.js"></script> --%>
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
	<%
	String showUpload;
	if(TokenAction.isLoading){
		showUpload="true";
	}
	else {
		showUpload="false";
	}
	%>
   <script>
      jQuery(document).ready(function() {       
         App.init();
		 TableEditable.init();
      });
	  
$(document).ajaxStart(function(){
  
     $("#loading").css("display","block");
     $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
 });
  
  $(document).ajaxComplete(function(){
	//$('select option:contains("Select Size")').attr('disabled', true);
    $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
     // alert("complete");
  });  
   
	  
	$(document).ready(function(){
		showManageToken(false,false);
		    $.datepicker.regional[""].dateFormat = 'dd/mm/yy';
	        $.datepicker.setDefaults($.datepicker.regional['']); 
	});
		
		$(document).on('click','#assignToken_btn',function(){
			showAssignDeassignDomainToken();
		});
		
		$(document).on('click','#resyncActivate_btn',function(){
	      try{document.getElementById('pageId_activateResync').value = '';
			 document.getElementById('pageNum_activateResync').value = '';}catch(ex){}
			showActivateResyncToken(false,false);
		});
		 $('#tab_4').on('click',function(){
			document.getElementById('activate_resync').options[0].selected = 'selected';
			$('#active_resync_hard_token_data').html('<span></span>');
		});
		
		 $('#tab_5').on('click',function(){
				document.getElementById('lock_unlock').options[0].selected = 'selected';
				$('#block_active_lock_unlock_data').html('<span></span>');
	    });
		 $('#tab_1').on('click',function(){
				document.getElementById('assign_deassign').options[0].selected = 'selected';
				document.getElementById('domain_id').options[0].selected = 'selected';
				$('#block_assign_token_data').html('<span></span>');
		});
		
		$(document).on('click','#remoneToken_btn',function(){
			$('#block_remove_token_data').html('<span>Loading...</span>');      
			$.ajax({
				type: "POST",  
				url:"token_json.json",
				data: "{}",
				async: true,
				dataType: "json",
				success: function(data) {
					var content = '<h4>Remove Token</h4><div class="space15"></div>';
					content += '<table class="table table-striped table-bordered" id="sample_2">';
					content += '<thead>';
						content += '<tr>';
							content += '<th  style="width:20px;"><input type="checkbox" class="group-checkable" data-set="#sample_2 .checkboxes" /></th>';
							content += '<th>Toke / licenseKey</th>';
							content += '<th>Status</th>';
							content += '<th>User Nmae</th>';
						content += '</tr>';
					
						content += '<tr>';
							content += '<th></th>';
							content += '<th>Toke / LicenseKey</th>';
							content += '<th>Status</th>';
							content += '<th>User Nmae</th>';
						content += '</tr>';
						content += '</thead>';
					jQuery.each(data['removeToken'], function(i, v) {
					  content += "<tr><td><input type='checkbox' class='checkboxes' value='1' /></td><td>"+v.licenseKey+"</td><td>"+v.status +"</td><td>"+v.userName +"</td></tr>";
					});
					content += '</table>';
					content += '<div class="form-actions form-actions2">';
						content += '<button class="btn btn-primary" type="submit">Submit</button>';
					content += '</div>';
					$('#block_remove_token_data').html(content);
					$("#sample_2").css("width","100%");
					$('#sample_2').dataTable()
					.columnFilter({ sPlaceHolder: "head:after",
					aoColumns: [ null, 
									{ type: "text" },
									{ type: "select",values:['Associated','Deassociated']},
									{ type: "text" }
								]
					});
				}
			
			});
			
		});
		
		
		
	
		
	$('#insert_file_btn').on('click',function(){	
		token_import();
	});
	  
	
	  
	$('#lock_unlock_btn').on('click',function(){
  			var temp=document.getElementById('lock_unlock').value;
  			var value = $('.ass_radio:checked').val();
  				 if(temp=="")
   					{
   					alert("Please Select lock/unlock ");
   					}
   				else if(temp=="lock"){
   				
             try{document.getElementById('pageId_lockToken').value = '10';
			 document.getElementById('pageNum_lockToken').value = '1';}catch(ex){}
   						if(value=="2")
   						{
   							showLockSMSToken(false,false);
   						}
   						else{
   							showLock(false,false);
   						}
					}
				else if(temp=="unlock"){
			 try{document.getElementById('pageId_unlockToken').value = '10';
			 document.getElementById('pageNum_unlockToken').value = '1';}catch(ex){}
						if(value=="2")
   						{
   							showUnlockSMSToken(false,false);
   						}
   						else{
   							showUnlock(false,false);
						}
					}
					
		
	});
	
	
	/*for select all checkbox*/
	
	
				$(document).on('click', '.group-checkable', function() { // Saurabh 
					var set = jQuery(this).attr("data-set");
					var checked = jQuery(this).is(":checked"); // It will return either true or false
					$(set).each(function() {
						$(this).prop('checked', checked);
					});
					jQuery.uniform.update(set);
				});

				/*for select all checkbox*/

				$('#myModal').on('shown.bs.modal', function(e) {
					resyncClock();
				});

				$('#tab_6').on('click', function() {
					$('#insert_token_data').hide();
					getDone();
					showUpload1 = document.getElementById("showUpload").value;
					if ($.trim(showUpload1) == "false") {
						$('#upload_status').hide();
					} else {
						$('#upload_loader').html('loading...');
						$('#upload_loader').show();
						$('#insert_token_data').show();
						$('#insert_token_form').hide();
						$('#upload_status').hide();
					}
				});

				$('#insert_token_type_btn').on('click', function() {
					getDone();
					showUpload1 = document.getElementById("showUpload").value;
					$tokentype = $(".inserTokenType:checked").val();
					if ($tokentype == undefined) {
						alert("Please select auth type...");
						return;
					}
					if ($.trim(showUpload1) == "false") {
						$('#insert_token_data').show();
					} else {
						$('#upload_loader').html('loading...');
						$('#upload_loader').show();
						$('#insert_token_data').show();
						$('#insert_token_form').hide();
					}
				});

				// start code for Bug id 214 , added by abhimanyu

				jQuery(document).ready(
						function() {
							$('input:radio[name="inserTokenType"]').change(
									function() {
										var strInserTokenType = $(this).val();
										if (strInserTokenType == 'ht'
												|| strInserTokenType == 'mt'
												|| strInserTokenType == 'bt'
												|| strInserTokenType == 'pt') {
											$("#insert_token_data").hide();
											$("#insert_file").val('');
										}
									});
						});
				// end code for Bug id 214 , added by abhimanyu 

				$(document).on('click', '#checkBoxAssignAndDeassignToken',
						function() {
							if ($(this).prop('checked'))
								$("#submitForAssignToken").focus();
						});
				$(document).on('click', '#checkBoxAssignAndDeassignToken2',
						function() {
							if ($(this).prop('checked'))
								$("#submitForDeassignToken").focus();
						});
				$(function() {
					$("form").submit(function() {
						return false;
					});
				});
			</script>
   <input type="hidden" id="showUpload"/>
   </s:form>
   <input type="hidden" name="csrfPreventionSalt" id="csrfPreventionSaltId" value="<%=request.getAttribute("csrfPreventionSalt") %>"/>
</body>
<!-- END BODY -->
</html>
