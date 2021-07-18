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
<%
String radiusStatus1=null;
try{

//Map application2 = (Map) ActionContext.getContext().get("application");
//radiusStatus1=(String) application2.get(ApplicationConstants.RADIUS_STATUS);
radiusStatus1=ApplicationConstants.RADIUS_STATUS_CONSTANT;
}
catch(Exception e)
{
	e.printStackTrace();
}
%>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
<!-- BEGIN HEADER -->
	<%@ include file="/common/header.jsp"%>
  <!-- END HEADER -->
<div id="loading" style="display: none;width:100%;height:550px;position:fixed;top:50%;left:50%;z-index: 25;" >
	<img src='<%=request.getContextPath() %>/web/img/ajax_loader_gray_64.gif' width="64" height="64" /><br>Loading..
</div>
<!--<s:form name="f1" validate="true" theme="simple" >-->
	
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
			</div> -->
			
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
						Radius
					  </h3>
					   <ul class="breadcrumb">
						   <li>
							 <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">Admin</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li><a href="<%= request.getContextPath() %>/admin_showManageRadius">Manage Radius</a><span class="divider-last">&nbsp;</span></li>
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
									   <h4><i class="icon-retweet"></i> Manage Radius</h4>
									   <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
									</div>
									<div class="widget-body">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid">
												<a class="icon-btn span2 active" id ="tab_1" href="#block_manage_radius" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Manage Radius IP</div>
													</span>
												</a>
												
												<a class="icon-btn span2 " id ="tab_2" href="#block_start_radius" data-toggle="tab">
													<span>
													<i class="icon-group"></i>
													<div>Start / Stop Radius</div>
													</span>
												</a>
											</div> 
											<div class="tab-content">
												<div class="tab-pane active" id="block_manage_radius">
													<div id="manage_radius_data"></div>
													
													
													<div class="row" id="redius_ip_form" style="display:none;" >
														
													</div>
												</div>
												
												<div class="tab-pane " id="block_start_radius">
												
													<div id="block_start_radius_data">
														<h4>Radius</h4><div class="space15"></div>
														<label>Radius Server</label> 
														<div>
															<p id="_start" style="display: none">Radius server started</p>
															<p id="_stop" style="display: none">Radius server stopped</p>
														</div>
														<div class="form-actions form-actions2">
														
															<button data-toggle="" type="button"  class="btn btn-primary" id="startRadius"></button>
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
   
   <%-- <script src="<%= request.getContextPath() %>/web/js/table-editable.js"></script> --%>
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/in/radius_ip_table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom/manageradius.js" type="text/javascript"></script>
	
   <script>
   var radius;
   var temp;
      jQuery(document).ready(function() { 
      try{      
         
         App.init();
		 TableEditable.init();
		//   radius=document.getElementById("radius_status").value;
		//radius=$('#radiusId').text();
	
		//radius=checkRadius();
		 radius='<%=radiusStatus1%>';
        //   alert("radius1==="+status);
		
		}
		catch(e)
		{
			alert(e);
		}
      });
	
	$(document).ajaxStart(function(){
	    $("#loading").css("display","block");
	    $('body').css("opacity","0.8");
	    $( ".log" ).text( "Triggered ajaxStart handler." );
	});
  
  $(document).ajaxComplete(function(){
     $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
  });  
     
	
	 $('#tab_1').on('click',function(){
		  manageRadiusIp();
	  });
		
	$('#tab_2').on('click',function(){
		 try{
		
		 	radius=checkRadius();
			if(radius=="Radius server started"){
					 $('#startRadius').attr('data-toggle','#_stop');
					 $('#startRadius').html('Stop');
					
			} else if(radius=="Radius server stopped"){
					 $('#startRadius').attr('data-toggle','#_start');
					 $('#startRadius').html('Start');
					
		    }
					 
		   } catch(e) {
				alert(e);
		   }
   });
	 
	/*for select all checkbox*/
		
	$(document).on('click', '.group-checkable', function() { // Saurabh 
		var set = jQuery(this).attr("data-set");
		var checked = jQuery(this).is(":checked");
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
		jQuery.uniform.update(set);
	});
	
	
/*$( "#startRadius" ).click(function() {
	try{
	var attr = $(this).attr('data-toggle');
	if(attr == '#_start'){
	startRadius(attr);
	}
	if(attr == '#_stop'){
		stopRadius(attr);
	}
	}
	catch(e)
	{
		alert(e);
	}
});	*/
	
   </script>
  <%--  <script src="js/highcharts.js"></script>
   <script src="js/exporting.js"></script>
   <script type="text/javascript">
 
   </script> --%>
<input type="hidden" name="csrfPreventionSalt" id="csrfPreventionSaltId" value="<%=request.getAttribute("csrfPreventionSalt") %>"/> 
	  
 <!--    </s:form> -->
</body>
<!-- END BODY -->
</html>
