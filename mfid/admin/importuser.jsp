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
	<script src="<%= request.getContextPath() %>/web/js/custom/importfromdatabase.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/resync_Clock.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/import_from_csv.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/show_ou.js" type="text/javascript"></script>
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
	<!--End for DataTable--> 
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">

<div id="loading" style="display: none;width:100%;height:550px;position:fixed;top:50%;left:50%;z-index: 25;" >
	<img src='<%=request.getContextPath() %>/web/img/ajax_loader_gray_64.gif' width="64" height="64" /><br>Loading..
</div>
<%@ include file="/common/header.jsp" %>
<% 
String samplePath=null;
  samplePath=new PropertyFileUtility().fetchPropertyFileAttribute("sample.import.file.path");
  if(samplePath == null)
	  samplePath="#";


%>
<!--<s:form  name="f1" validate="true" theme="simple" >-->

<input type="hidden" name="csrfPreventionSalt" value="<%=request.getAttribute("csrfPreventionSalt") %>"/>

	<!-- BEGIN HEADER -->
	
    <!-- END HEADER -->
    
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
			</div>   -->
			
	<!-- BEGIN SIDEBAR MENU -->
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
						 Import Data
					  </h3>
					   <ul class="breadcrumb">
						   <li>
							  <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">User</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li> <a href="<%= request.getContextPath() %>/admin_showImportUser">Import Data</a><span class="divider-last">&nbsp;</span></li>
					   </ul>
				   </div>
				</div>
				<!-- END PAGE HEADER-->
				<!-- BEGIN PAGE CONTENT-->
				<div class="row-fluid ">
					<div class="span12">
						 <!-- BEGIN TAB PORTLET-->   
						<div class="widget widget-tabs">
							<div class="widget-title">
							   <h4><i class="icon-retweet"></i>Import&nbsp;Data</h4>
							   <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
							</div>
							<div class="widget-body">
								<div class="tabbable table_tab_box tabbable-custom">
									<div class="row-fluid">
										<a id="tab_1"  class="icon-btn span2 active" data-toggle="tab">
											<span>
												<i class="icon-group"></i>
												<div>Import From Active Directory</div>
											</span>	 
										</a>
										
										
										<a id="tab_2" class="icon-btn span2"  data-toggle="tab">
											<span>
												<i class="icon-group"></i>
												<div>Import From Database</div>
											</span>	
										</a>
										
										
										<a id="tab_3" class="icon-btn span2" href="#block_active_cvs" data-toggle="tab">
											<span>
												<i class="icon-group"></i>
												<div>Import From CSV/Excel File</div>
											</span>	
										</a>
										
										
										
									</div>
									<div class="tab-content">
											   
										<div class="tab-pane " id="block_active_directory">
											<div class="accordion" id="accordion1">
												<div class="accordion-group" id="active_directory_data_tab">
													<div class="accordion-heading">
														<a class="accordion-toggle collapsed"  href="javascript:void(0);">
														<i class=" icon-share-alt"></i>
															Active Directory Credentials
														</a>
													</div>
													<div id="collapse_1" class="accordion-body collapse in">
														<div class="accordion-inner">
															<div class="widget-body form">
																<!-- BEGIN FORM-->
																<form class="form-horizontal">
																
																	<div class="control-group">
																	  <label class="control-label">Data Source</label>
																	  <div class="controls">
																		 <select id="importSource" class="span6 " data-placeholder="Choose a Category" tabindex="1">
																			<option value="select">--Select Source--</option>
																			<option value="0">LDAP Data Source</option>
																			<option value="1">Active Directory</option>
																		 </select>
																		 <span class="help-inline red_color">*</span>
																	  </div>
																   </div>
																   <div class="control-group">
																	  <label class="control-label">IP Address</label>
																	  <div class="controls">
																		 <input id="domain" type="text" class="span6" placeholder="IP_Address:port" /> 
																		 <span class="help-inline red_color">*</span> SSL <input type="checkbox" id="ssl_id" class="span6" />
																	  </div>
																   </div>
																   
															 
																   
																   
																   <div class="control-group" id="principlediv">
																	  <label class="control-label">Priniciple</label>
																	  <div class="controls">
																		 <input id="principle" type="text" class="span6" placeholder="Priniciple" />
																		 <span class="help-inline red_color">*</span>
																	  </div>
																   </div>
																   <div class="control-group">
																	  <label class="control-label">Base DN</label>
																	  <div class="controls">
																		 <input id="basedn" type="text" class="span6" placeholder="dc=server1,dc=example,dc=com" />
																		 <span class="help-inline red_color">*</span>
																	  </div>
																   </div>
																   <div class="control-group">
																	  <label class="control-label">Password</label>
																	  <div class="controls">
																		 <input id="password" type="password" class="span6 " />
																		 <span class="help-inline red_color">*</span>
																	  </div>
																   </div>
																   
																   <div class="control-group">
																	  <label class="control-label">Organization Unit</label>
																	  <div class="controls">
																		 <input id="ou" type="text" class="span6 "  placeholder="ou=people" />
																		  Example : ou=people|ou=myou
																	  </div>
																	  
																   </div>
																   <div class="control-group">
																	  <label class="control-label">Filter</label>
																	  <div class="controls">
																	    <span  class="span6 ">
																		 <input id="filter" type="text" class="span12" placeholder="(|(uid=*))" />
																		</span><span style="word-break: break-all; margin-left:5px; float:left;">
																		<span id="filtermsg"> Example : (|(uid=*)(mail=test1*)(mail=test2*))</span></span>
																	  </div>
																   </div>
																   <div class="control-group">
																	  <label class="control-label">Attributes</label>
																	  <div class="controls">
																	  <span  class="span6 ">
																		 <input id="attributes" type="text" class="span12 "/>
																		</span>
																		<span style="word-break: break-all; margin-left:5px; float:left;">
																		<span class="help-inline red_color">*</span> <span id="attributesmsg">Default Attributes : UserLogonId:uid,FirstName:givenName,<br>LastName:sn,Mobile:mobile,Mail:mail</br></span>
																		</span>
																		 
																	  </div>
																   </div>
																   
																   <div class="form-actions">
																	  <button type="button" id="tad_btn_1"  class="btn btn-primary">Submit</button>
																	  <button type="reset" class="btn btn-primary">Reset</button>
																   </div>
																</form>
																<!-- END FORM-->           
															</div>
														</div>
													</div>
												</div>
												<!--<div class="accordion-group" id="org_unit" style="display:none;">
							
												</div>
												-->
												<div class="accordion-group" id="org_unit" style="display:none;" >
													<div class="accordion-heading">
														<a class="accordion-toggle collapsed"  href="javascript:void(0);">
														<i class=" icon-share-alt"></i>
														Organization Units
														</a>
													</div>
													<div id="collapse_2" >
														<div class="accordion-inner">
															 <div class="widget-body form">
																<!-- BEGIN FORM-->
																<form action="#" class="form-horizontal">
																
																	<div id="org_unit_data"></div>
																</form>
																<!-- END FORM-->           
															 </div>
														</div>
													</div>
												</div>
												<div class="accordion-group" id="import_user_tab" style="display:none;">
													<div class="accordion-heading">
														<a class="importdatauser collapsed"  href="javascript:void(0);">
														<i class=" icon-share-alt"></i>
														Import User Data
														
														
														<button type="button" class="btn btn-primary pull-right" onclick="importAllUserFromADLDAP()"> <img src="<%=request.getContextPath() %>/web/img/ImportUsers.png" alt=" Import All User " height="25" width="25"> <b>  Import All User </b></button>
														</a>
													</div>
													<div id="collapse_3" >
														<div class="accordion-inner">

															<div id="block_import_user_data"></div>
															
														</div>
													</div>
												</div>
												   
											</div>
										</div>
											
											   
									 <div class="tab-pane" id="block_active_database">
											<div class="accordion" id="accordion2">
												<div class="accordion-group" id="tab_2_coll_1">
													<div class="accordion-heading">
														<a class="accordion-toggle collapsed"  href="javascript:void(0)">
														<i class=" icon-share-alt"></i>
															Import From Database
														</a>
													</div>
													<div id="collapse_2" class="accordion-body collapse in">
														<div class="accordion-inner">
															 <div class="widget-body form">
																<!-- BEGIN FORM-->
																<form action="#" id="tab2_coll1_form" class="form-horizontal">
																	<div class="control-group">
																		<label class="control-label">Database Vendor<span class="help-inline red_color">*</span></label>
																		<div class="controls">
																			 <select id="databaseVendor" class="span6 " data-placeholder="Choose a Category" tabindex="1">
																				<option value="select">--Select Vendor--</option>
																				<option value="0">Mysql</option>
																				<option value="1">Oracle</option>
																				<option value="2">SqlServer</option>
																			 </select>
																			 
																		</div>
																	</div>
																   <div class="control-group">
																	  <label class="control-label">Database Url<span class="help-inline red_color">*</span></label>
																	  <div class="controls">
																		 <input type="text" id="databaseURL" class="span6" placeholder="IP_Address:port" />
																		 
																	  </div>
																   </div>
																   <div class="control-group">
																	  <label class="control-label">Database Name<span class="help-inline red_color">*</span></label>
																	  <div class="controls">
																		 <input type="text" id="databaseName" class="span6"  />
																		 
																	  </div>
																   </div>
																   <div class="control-group">
																	  <label class="control-label">User Name<span class="help-inline red_color">*</span></label>
																	  <div class="controls">
																		 <input type="text" id="databaseUserName" class="span6"  />
																		 
																	  </div>
																   </div>
																   <div class="control-group">
																	  <label class="control-label">Password<span class="help-inline red_color">*</span></label>
																	  <div class="controls">
																		 <input type="password" id="dataBasePassword" class="span6 " />
																		 
																	  </div>
																   </div>
																   <div class="control-group">
																	  <label class="control-label">Customize Query<span class="help-inline red_color">*</span></label>
																	  
																	  <div class="controls">
																		 <input type="text" id="databaseQuery" class="span6 " />
																		  <span class="help-inline ">(select * from user)</span>
																	  </div>
																	  
																   </div>
																   
																   <div class="form-actions">
																	  <button type="button" id="tab_2_btn_1" data-set="#block_active_database" class="btn btn-primary">Submit</button>
																	  <button type="reset" class="btn btn-primary">Reset</button>
																   </div>
																</form>
																<!-- END FORM-->           
															 </div>
														</div>
													</div>
												</div>
												<div class="accordion-group" id="tab_2_coll_2" style="display:none;">
													<div class="accordion-heading">
														<a class="accordion-toggle collapsed"  href="javascript:void(0);">
														<i class=" icon-share-alt"></i>
														Data Source Detail
														</a>
													</div>
													<div id="collapse_8" class="accordion-body collapse">
														<div class="accordion-inner">

															<div class="widget-body form">
																<!-- BEGIN FORM-->
																<form action="#" id="tab2_coll2_form" class="form-horizontal">
																
																	<div id="tab_2_coll_2_data">
																		<div class="control-group">
																			<label class="control-label">User LogonId<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1" id="userId" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select">--Select UserlogonId --</option>
																					
																				</select>
																			</div>
																		</div>
																		<div class="control-group">
																			<label class="control-label">First Name<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1" id="firstName" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select">--Select First Name --</option>
																					
																					
																				</select>
																			</div>
																		</div>
																		
																		<div class="control-group">
																			<label class="control-label">Middle Name</label>
																			<div class="controls">
																				<select tabindex="1" id="middleName" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select" >--Select Middle Name --</option>
																					
																					
																				</select>
																			</div>
																		</div>
																		<div class="control-group">
																			<label class="control-label">Last Name<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1" id="lastName" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select">--Select Last Name --</option>
																					
																				</select>
																			</div>
																		</div>
																		<div class="control-group">
																			<label class="control-label">Email<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1" id="email" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select">--Select Email --</option>
																				</select>
																			</div>
																		</div>
																		<div class="control-group">
																			<label class="control-label">Mobile<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1" id="mobile" class="span6 ">
																					<option value="select">--Select Mobile --</option>
																					
																				</select>
																			</div>
																		</div>
																		<div class="form-actions">
																			<button data-set="#block_active_database" id="tab_2_btn_2" type="button" class="btn btn-primary">Submit</button>
																			<button class="btn btn-primary" type="reset">Reset</button>
																		</div>
																	</div>
																</form>
																<!-- END FORM-->           
															
															</div>
														</div>
													</div>
												</div>
												
											</div>
										</div>  
										
										
										<div class="tab-pane" id="block_active_cvs">
											<div class="accordion" id="accordion13">
												<div class="accordion-group" id="tab_3_coll_1">
													 <div class="accordion-heading">
														<a class="accordion-toggle collapsed" href="javascript:void(0);">
														<i class=" icon-share-alt"></i>
															Import From CSV/Excel File
														</a>
													 </div>
													 <div id="collapse_13" class="accordion-body collapse in">
														<div class="accordion-inner">
															<div class="widget-body form">
																<!-- BEGIN FORM-->
																<form  action="admin_readExcelData.action" name="f2" method="post" enctype="multipart/form-data" class="form-horizontal">
																
																	<div class="control-group">
																		<label class="control-label">Import CSV/Excel
																		
																		<span class="help-inline red_color">*</span></label>
																		<div class="controls">
																			 <input id="tab_3_imp_csv" data-set="#block_active_cvs" type="file" style="float:left;" name="fileUpload"/>
																			 <label id="fileLbl"></label>
																			 &nbsp; &nbsp;
																			 <a href="<%=samplePath%>"  id="download-sample-import-file" ><img src="web/img/icon-help.png" height="20" width="20"  style="float: center; margin-left:-80px; margin-top: px;" title="sample import file" alt="" ></a>
																		 &nbsp; &nbsp; 
																			
																		</div>
																		<div class="form-actions">
																			<button data-set="#block_active_cvs" type="button" id="tab_3_btn1"class="btn btn-primary">Submit</button>
																		</div>
																	</div>
																</form>
																<!-- END FORM-->           
															</div>
														</div>
													 </div>
												</div>
												<div class="accordion-group" id="tab_3_coll_2" style="display:none;">
													<div class="accordion-heading">
														<a class="accordion-toggle collapsed"  href="javascript:vide(0);">
															<i class=" icon-share-alt"></i>
															Import From Excel/CSV
														</a>
													</div>
													<div id="collapse_14" style="display:none;" >
														<div class="accordion-inner">
															<div class="widget-body form">
															<!-- BEGIN FORM-->
																<form action="#" class="form-horizontal">
																	<div id="tab_3_coll_2_data">
																		<div class="control-group">
																			<label class="control-label">User Id<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1"  id="csv_userId" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select">--Select User Id --</option>
																					
																				</select>
																			</div>
																		</div>
																		<div class="control-group">
																			<label class="control-label">First Name<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1" id="csv_firstName" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select">--Select First Name --</option>
																					
																				</select>
																			</div>
																		</div>
																		<div class="control-group">
																			<label class="control-label">Middle Name<span class="help-inline red_color"></span></label>
																			<div class="controls">
																				<select tabindex="1" id="csv_middleName" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select">--Select Middle Name --</option>
																					
																				</select>
																			</div>
																		</div>
																		<div class="control-group">
																			<label class="control-label">Last Name<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1" id="csv_lastName" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select">--Select Last Name --</option>
																				
																				</select>
																			</div>
																		</div>
																		<div class="control-group">
																			<label class="control-label">Email<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1" id="csv_email" data-placeholder="Choose a Category" class="span6 ">
																					<option value="select">--Select Email --</option>
																					
																				</select>
																			</div>
																		</div>
																		<div class="control-group">
																			<label class="control-label">Mobile<span class="help-inline red_color">*</span></label>
																			<div class="controls">
																				<select tabindex="1" id="csv_mobile"  class="span6 ">
																					<option value="select">--Select Mobile --</option>
																					
																				</select>
																			</div>
																		</div>
																		<div class="form-actions">
																			<button class="btn btn-primary" id="tab_3_btn_2" onclick="importFileUser()" type="button" data-set="#block_active_cvs">Submit</button>
																			<button class="btn btn-primary" type="reset">Reset</button>
																		</div>
																	</div>
																</form>
																<!-- END FORM-->           
															</div>
														</div>
													</div>
													</div>
												</div>
											</div>
										</div>
											   
													   
									</div>
								</div>
							</div>
						</div>
					 <!-- END TAB PORTLET-->
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
	
	

   
      
   <script src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>   
   <script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
   
   <script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.1.12.1.min.js" type="text/javascript"></script>
   
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


   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
   
  <%--  <script src="<%= request.getContextPath() %>/web/js/table-editable.js"></script> --%>
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
   <script>
      jQuery(document).ready(function() {  
           
         // initiate layout and plugins
         App.init();
		 TableEditable.init();
      });
   </script>
  <%--  <script src="js/highcharts.js"></script>
   <script src="js/exporting.js"></script>
   <script src="js/custom.js"></script> --%>
   <script>
   var flag = false;
    $('#tab_2').on('click',function(){
    try{
   
    
     	$('#block_active_directory').hide();
    	$('#block_active_database').show();
        $('#block_active_cvs').hide();
     //    var set = $(this).attr('href');
      //   alert("set====="+set);
       document.getElementById("tab2_coll1_form").reset();
	   var set='#block_active_database';
		open_tab2_coll_1(set,'tab_2_coll_1');
		try{preFillImportDataSource("MYSQL")}catch(err){}
		}
		catch(e)
		{
			alert(e);
		}
    
  });
  
 	/* $(document).ajaxStart(function(){
  
    $("#loading").css("display","block");
    $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
    
  }); */
  
 /*  $(document).ajaxComplete(function(){
  
    $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
     
  }); */   
   
  
   $('#tab_3').on('click',function(){
    $('#block_active_directory').hide();
    $('#block_active_database').hide();
     $('#block_active_cvs').show();
     $("#tab_3_coll_1").show();
	$("#tab_3_coll_2").hide();
    
    
  });
    $('#tab_1').on('click',function(){
        document.getElementById('domain').value='';
    	document.getElementById('principle').value='';
    	document.getElementById('basedn').value='';
    	document.getElementById('password').value='';
    	//document.getElementById('attributes').value='UserLogonId:uid,FirstName:givenName,LastName:sn,Mobile:mobile,Mail:mail';
    	try{ preFillImportDataSource("AD") } catch(err){}
         $('#block_active_cvs').hide();
     $('#block_active_database').hide();
	$('#block_active_directory').show();
	$('#active_directory_data_tab').show();
	open_tab('collapse_1');
	//$('#collapse_1').show();
	
	$('#import_user_tab').hide();
		$('#org_unit').hide();
		});
   
   
	$('#tad_btn_1').on('click',function(){
		open_org_unit();
	});
	
	$('#tad_btn_2').on('click',function(){
		open_import_user();
	});
/*	$('#tab_3_btn1').live('click',function(){
		//var set = $(this).attr('data-set');
		//open_tab3_coll_2(set,'tab_3_coll_2');
		//class="accordion-body collapse"
			
			user_import_exl_csv();
	}); */
	
	  $('#tab_3_btn1').on('click',function(){
		var set = $(this).attr('data-set');
		
		$("#loading").css("display","block");
        $('body').css("opacity","0.8");
		open_tab3_coll_2(set,'tab_3_coll_2');
	}); 
	
	
	$('#imp_user_submit_btn').on('click',function(){
	document.getElementById('domain').value='';
    	document.getElementById('principle').value='';
    	document.getElementById('basedn').value='';
    	document.getElementById('password').value='';
		open_active_directory();
	});
	
	$('#imp_user_back_btn').on('click',function(){
		open_org_unit();
	});
	
	function open_active_directory(){
		close_tab();
		$('#import_user_tab').hide();
		$('#org_unit').hide();
		$('#active_directory_data_tab').show();
		open_tab('active_directory_data_tab');
	}
	
	function open_org_unit(){
		
	//	close_tab();
	try{
	var src=document.getElementById('importSource').value;
	var res;
		//if(src==0)
		 res=showUser(false,false);
		
		//else
		 // res=showOU();
		}
		catch(e){alert(e);}
		if(res!=false&&res!=null){
		
		$('#active_directory_data_tab').hide();
		$('#import_user_tab').hide();
		$('#org_unit').show();
		open_tab('org_unit');
		}
		
	//	open_tab('org_unit');
		
	
	}
	
	function open_import_user(){
		
		//close_tab();
		$('#org_unit').hide();
		$('#active_directory_data_tab').hide();
		$('#import_user_tab').show();
		
		open_tab('import_user_tab');
		
		act_directory_user_data();
	}
	
	
	function close_tab (){
		$(".accordion-toggle").addClass("collapsed");
		$(".accordion-body").removeClass("in collapsed");
		$(".accordion-body").addClass("collapsed");
	}
	
	function open_tab(id){
		$("#"+id+" .accordion-toggle").removeClass("collapsed");
		$("#"+id+" .accordion-body").removeClass("collapsed");
		$("#"+id+" .accordion-body").addClass("in collapsed");
	}
	
	
	
	
	function open_tab3_coll_2(set,id){
		
		//close_tab(set);
	//	$("#tab_3_coll_1").hide();
	//	$("#tab_3_coll_2").show();
		user_import_exl_csv();
	//	open_tab(set,id);
	}
   
 
	/*for select all checkbox*/
	
	//jQuery('.group-checkable').live('change',function(){
		$(document).on('click', '.group-checkable', function() {
		var set = jQuery(this).attr("data-set");
		var checked = jQuery(this).is(":checked");
		jQuery(set).each(function () {
			$(this).prop('checked', checked);
			/* if (checked) {
				$(this).attr("checked", true);
			} else {
				$(this).attr("checked", false);
			} */
		});
		jQuery.uniform.update(set);
	});
	
	
	/*for select all checkbox*/
	$('#myModal').on('shown.bs.modal', function (e){


resyncClock();


	
});


function open_tab2_coll_1(set,id){
	try{

		close_tab(set);
		$("#tab_2_coll_2").hide();
		$("#tab_2_coll_1").show();		
		open_tab(set,id);
	
		}
		catch(e)
		{
			alert(e);
		}
	}


   $('#tab_2_btn_1').on('click',function(){
  
  		showDataSourceDetail();
  	//	 var set = $(this).attr('data-set');
	//open_tab2_coll_2(set,'tab_2_coll_2');
	});


function open_tab2_coll_2(set,id){
		close_tab(set);
		$("#tab_2_coll_1").hide();
		$("#tab_2_coll_2").show();
		//user_data_source_detail();
			open_tab(set,id);
	}
	 function close_tab (set){
	 	try{
	 
		$(set+" .accordion-toggle").addClass("collapsed");
		$(set+" .accordion-body").removeClass("in collapsed");
		$(set+" .accordion-body").addClass("collapsed");
	   }
		catch(e)
		{
			alert(e);
		}
	}
	
	function open_tab(set,id){
		try{
		$(set+" #"+id+" .accordion-toggle").removeClass("collapsed");
		$(set+" #"+id+" .accordion-body").removeClass("collapsed");
		$(set+" #"+id+" .accordion-body").addClass("in collapsed");
		}
		catch(e)
		{
			alert(e);
		}
	}
	$('#tab_2_btn_2').on('click',function(){
     		importFromDataBase();
	});

	$(document).on('change','#importSource',function(){
		var source=$(this).val();
		if(source==0)
		{
			document.getElementById('attributes').value='UserLogonId:uid,FirstName:givenName,LastName:sn,Mobile:mobile,Mail:mail';
			document.getElementById("attributesmsg").innerHTML = "Default Attributes : UserLogonId:uid,FirstName:givenName,<br>LastName:sn,Mobile:mobile,Mail:mail</br>";
		    document.getElementById("filtermsg").innerHTML = "Example : (|(uid=*)(mail=test1*)(mail=test2*))";
		     $("#filter").attr("placeholder", "(|(uid=*))").blur();
		}
		else
		{
			document.getElementById('attributes').value='UserLogonId:sAMAccountName,FirstName:givenName,LastName:sn,Mobile:mobile,Mail:mail';
			document.getElementById("attributesmsg").innerHTML = "Default Attributes : UserLogonId:sAMAccountName,FirstName:<br>givenName,LastName:sn,Mobile:mobile,Mail:mail</br>";
			document.getElementById("filtermsg").innerHTML = "Example : (&(objectClass=user)<br>(memberof=cn=group1,ou=T2,dc=innefu,dc=com))</br>";
			 $("#filter").attr("placeholder", "(&(objectClass=user)(memberof=cn=group1,ou=T2,dc=innefu,dc=com))").blur();
		}
		
		/*if(source==0)
		{
			$('#principlediv').hide();
		}
		else
		{
			$('#principlediv').show();
		}*/
	});
	
// start code for bug id 259 , added by abhimanyu
		$(document).ready(function(){
		$("#tab_3").click(function(){
	     $("#tab_3_imp_csv").val('');
	     }); });
// end code for bug id 259 , added by abhimanyu	
	
	 $(document).on('click','#idcheckboxSelectAdUser',function(){  
	      if($(this).prop('checked')) 
	    	  $("#idSubmitButtonAdUser").focus();});
	$(document).ready(function(){
	var filePath ='<%=samplePath%>';
	//alert("filePath = "+filePath);
	filePath = filePath.substring(filePath.lastIndexOf("/")+1, filePath.length);
	//alert("filePath = "+filePath);
    $("#download-sample-import-file").attr('download', filePath);
    });




function preFillImportDataSource(type)
{
 var databaseVendor = "";
try{
	 
	$.ajax({
			type: "POST",  
			url:"admin_showModifyDatabaseCon.action",
			data: "{}",
			dataType: "text",
			//async: true,
			success: function(data) {
			
				var object = JSON.parse(data);
				databaseVendor = JSON.parse(object.databaseVendor)
			   if("AD"==type && ("AD"==databaseVendor || "LDAP"==databaseVendor))  
				{
				     if("AD"==databaseVendor)
				       jQuery('select[id$="importSource"]').val(1);
				     else
				    jQuery('select[id$="importSource"]').val(0);
					jQuery('input[id$="domain"]').val(JSON.parse(object.databaseURL));
					jQuery('input[id$="principle"]').val(JSON.parse(object.databaseQuery));
					jQuery('input[id$="basedn"]').val(JSON.parse(object.baseDn));
					jQuery('input[id$="ou"]').val(JSON.parse(object.ldapFilter));
					jQuery('input[id$="filter"]').val(JSON.parse(object.searchFilter));
					jQuery('input[id$="attributes"]').val(JSON.parse(object.attributes));
					if((JSON.parse(object.sslFlag)) == '1')
					 flag = true;
					else
					  flag = false;
					 setCheckBoxValue(flag);
					jQuery('input[id$="databasePassword"]').val("");
					 
				}
			else if("MYSQL"==type && "Mysql"==databaseVendor)
			   {
			     if("Mysql"==databaseVendor)
				       jQuery('select[id$="databaseVendor"]').val(0);
				    jQuery('input[id$="databaseURL"]').val(JSON.parse(object.databaseURL));
					jQuery('input[id$="databaseName"]').val(JSON.parse(object.databaseName));
					jQuery('input[id$="databaseUserName"]').val(JSON.parse(object.databaseUserName));
					jQuery('input[id$="dataBasePassword"]').val("");
					jQuery('input[id$="databaseQuery"]').val(JSON.parse(object.databaseQuery));
			   }
			 
				
			}
		});

}
catch(err){}

}
 
 
 function setCheckBoxValue(flag)
 { 
 if(flag)
 {
 $("#ssl_id").parents('span').addClass("checked");
 $("#ssl_id").attr('checked', 'checked');
  document.getElementById("ssl_id").checked = true;
 }
 else
  {
  $("#ssl_id").parents('span').addClass("unchecked");
 $("#ssl_id").attr('checked', 'unchecked');
 document.getElementById("ssl_id").checked = false;
 }
 }

 
 
 jQuery(document).ready(function($) {
		$('.table_tab_box a').click(function(){
			$('.table_tab_box a').removeClass('tb_active');
			$(this).addClass('tb_active');
		});
		
		$(document).on('click','.close',function(){
				$('.tab-pane').removeClass('active');
				$('.table_tab_box a').removeClass('tb_active');
			});
		
	});
 
 
 
</script>
<input type="hidden" id="selectedOu" />
<!--</s:form>-->
</body>
<!-- END BODY -->
</html>