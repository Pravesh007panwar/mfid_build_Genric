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
	
	<script src="<%= request.getContextPath() %>/web/js/custom/modifydatabaseconnection.js" type="text/javascript"></script>
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
<!--<s:form name="f1"  validate="true" theme="simple" >-->
	
    
	<!-- BEGIN CONTAINER -->
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		 <div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
			<div class="navbar-inverse">
				<form class="navbar-search visible-phone">
					
				</form>
			</div>
			
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
                     Modify  Connection
                  </h3>
                   <ul class="breadcrumb">
                       <li>
                         <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
                       </li>
                       <li>
                         <a href="#">User</a> <span class="divider">&nbsp;</span>
                       </li>
                       <li><a href="<%= request.getContextPath() %>/admin_showModifyDatabaseConnection">Modify  Connection</a><span class="divider-last">&nbsp;</span></li>
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
                        <h4><i class="icon-share-alt"></i>Modify&nbsp;&nbsp;Connection</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                     <div id="mysql" class="widget-body form">
                        <!-- BEGIN FORM-->
                   
					 	<form  class="form-horizontal">
                        	<div class="control-group">
                              <label class="control-label">Database Vendor</label>
                              <div class="controls">
                                 <input type="text" name="databaseVendor" id="databaseVendor" readonly="true" class="span6" placeholder="Sql" />
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">Database URL</label>
                              <div class="controls">
                                 <input type="text" name="databaseURL" id="databaseURL" class="span6" placeholder="192.168.1.141:3306" />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">Database Name</label>
                              <div class="controls">
                                 <input type="text" name="databaseName" id="databaseName" class="span6" placeholder="mfid_seed" />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">Database UserName</label>
                              <div class="controls">
                                 <input type="text" name="databaseUserName" id="databaseUserName" class="span6 " placeholder="root" />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">Password</label>
                              <div class="controls">
                                 <input type="password" name="dataBasePassword" id="dataBasePassword" class="span6 " />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">Customize Query</label>
                              <div class="controls">
                                 <input type="text" name="databaseQuery" id="databaseQuery" class="span6" placeholder="select * from user_detail" />
                                 <span class="help-inline">(select * from user) <span class="red_color">*</span></span>
                              </div>
                           </div>
                           
                           <div class="form-actions">
                              <button type="button" onclick="modifyDatabaseConnection()" class="btn btn-primary">Submit</button>
                              <button type="button" id="databaseReset" class="btn">Reset</button>
                         </div>
                         </form>
                        <!-- END FORM-->   
                        
                     </div>
                     
                     <!-- AD Form -->
                     <div id="ad" class="widget-body form">
                        <!-- BEGIN FORM-->
                   
					 	<form  class="form-horizontal">
                        	<div class="control-group">
                              <label class="control-label">Data Source</label>
                              <div class="controls">
                                 <input type="text" name="databaseV" id="databaseV" readonly="true" class="span6" placeholder="AD/Ldap" />
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">IP Address</label>
                              <div class="controls">
                                 <input type="text" name="ip" id="ip" class="span6" placeholder="192.168.1.141:3306" />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">Principle</label>
                              <div class="controls">
                                 <input type="text" name="databaseQ" id="databaseQ" class="span6" placeholder="administrator@innefu.local" />
                                 <span class="help-inline"> <span class="red_color">*</span></span>
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">Base DN</label>
                              <div class="controls">
                                 <input type="text" name="baseDn" id="baseDn" class="span6" placeholder="dc=innefu,dc=local" />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                           
                           <div class="control-group">
                              <label class="control-label">Password</label>
                              <div class="controls">
                                 <input type="password" name="databasePassword" id="databasePassword" class="span6 " />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                          <div class="control-group">
                              <label class="control-label">Organization Unit</label>
                              <div class="controls">
                                 <input type="text" name="organizationId" id="organizationId" class="span6 " />
                                 <span class="help-inline red_color"></span>
                              </div>
                           </div>
                          <div class="control-group">
                              <label class="control-label">Filter</label>
                              <div class="controls">
                                 <input type="text" name="filterId" id="filterId" class="span6 " />
                                 <span class="help-inline red_color"></span>
                              </div>
                           </div>
                         <div class="control-group">
                              <label class="control-label">Attributes</label>
                              <div class="controls">
                                 <input type="text" name="attributesId" id="attributesId" class="span6 " />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                          <!--  <div class="control-group">
                              <label class="control-label">Filter </label>
                              <div class="controls">
                                 <s:textfield name="ldapFilter" id="ldapFilter" class="span6 " placeholder="ou=users" />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div> -->
                           
                           <div class="form-actions">
                              <button type="button" onclick="modifyConnectionDataADLdap()" class="btn btn-primary">Submit</button>
                              <button type="button" id="ldapreset" class="btn">Reset</button>
                         </div>
                         </form>
                        <!-- END FORM-->   
                        
                     </div>
                     
                     <input type="hidden" id="vendor" />
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

   <script src="<%= request.getContextPath() %>/web/js/in/scripts.js"></script>


	<script
		src="<%=request.getContextPath()%>/web/js/in/table-editable.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/custom.js"></script>
	<script>
		jQuery(document).ready(function() {
			// initiate layout and plugins
			App.init();
			TableEditable.init();
		});

		$(document).ajaxStart(function() {

			$("#loading").css("display", "block");
			//$('body').css("opacity", "0.8");
			$(".log").text("Triggered ajaxStart handler.");
			// alert("start");
		});

		$(document).ajaxComplete(function() {

			$("#loading").css("display", "none");
			//$('body').css("opacity", "1");
			$(".log").text("Triggerd ajaxComplete handler.");
			// alert("complete");
		});

		jQuery(document).ready(function() {
			showModifyDatabaseConnection();
		});

		$(document).on('click', '#ldapreset', function() {
			showModifyDatabaseConnection();
		});

		$(document).on('click', '#databaseReset', function() {
			showModifyDatabaseConnection();
		});
	</script>
	<script src="<%=request.getContextPath()%>/web/js/highcharts.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/exporting.js"></script>


	<!--</s:form>-->
<input type="hidden" name="csrfPreventionSalt" id="csrfPreventionSaltId" value="<%=request.getAttribute("csrfPreventionSalt") %>"/>
</body>




<!-- END BODY -->
</html>