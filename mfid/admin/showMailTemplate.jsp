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
<%-- <link rel="stylesheet" type="text/css"
	href="<%= request.getContextPath() %>/web/assets/uniform/css/uniform.default.css" /> --%>
<link
	href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css"
	rel="stylesheet" />
<link
	href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css"
	media="screen" rel="stylesheet" type="text/css" />
<link
	href="<%= request.getContextPath() %>/web/css/bootstrap-ui-design.css"
	rel="stylesheet" />
<style>
.copyData {
	cursor: copy;
}
</style>
<!-- BEGIN PAGE LEVEL STYLES -->
<link
	href="<%= request.getContextPath() %>/web/assets/dropzone/css/dropzone.css"
	rel="stylesheet" />
<!-- END PAGE LEVEL STYLES -->

<!--for DataTable-->
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
						<h3 class="page-title">Mail Template</h3>
						<ul class="breadcrumb">
							<li><a
								href="<%= request.getContextPath() %>/login_showDashboardAgain"><i
									class="icon-home"></i></a><span class="divider">&nbsp;</span></li>
							<li><a href="#">Admin</a> <span class="divider">&nbsp;</span>
							</li>
							<li><a
								href="<%= request.getContextPath() %>/admin_showMailTemplate">
									Mail Template </a><span class="divider-last">&nbsp;</span></li>
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
									<i class="icon-share-alt"></i>Mail&nbsp;Template
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

										<div id="insert_geo_form">
											
											<b>Mail Template Type &nbsp;&nbsp; </b>
											<s:select id="mailTemplateTypeId"
												label="Select Mail Template" headerKey="-1"
												headerValue="-- Select Mail Template --"
												list="mailTemplateTypeList" name="mailTemplateType"
												cssClass="input-large m-wrap" theme="simple"
												onchange="fetchMailTemplate()" />

											&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
											&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
											&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
											&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
											&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
											&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
											&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
											&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; <b>Mail
												Tags &nbsp;&nbsp; </b>
												<select
												class="input-large m-wrap copyData"
												onchange="selectMailTags()" id="mailTagsId">
												<option value="">-- Select Mail Tags --</option>
												<option value="{FIRSTNAME}">{FIRSTNAME}</option>
												<option value="{LASTNAME}">{LASTNAME}</option>
												<option value="{USERLOGONID}">{USERLOGONID}</option>
												<option value="{MOBILENUMBER}">{MOBILENUMBER}</option>
												<option value="{EMAILID}">{EMAILID}</option>
												<option value="{PASSWORD}">{PASSWORD}</option>
												<option value="{DOMAINID}">{DOMAINID}</option>
												<option value="{DOMAINNAME}">{DOMAINNAME}</option>
												<option value="{APPLICATIONID}">{APPLICATIONID}</option>
												<option value="{APPLICATIONNAME}">{APPLICATIONNAME}</option>
												<option value="{MFIDURL}">{MFIDURL}</option>
												<option value="{USERURL}">{USERURL}</option>
												<option value="{QRCODE}">{QRCODE}</option>
												<%  int counterAttachedFile = Integer.parseInt(new PropertyFileUtility().fetchPropertyFileAttribute("mail.attachment.file.allowed.count"));  
        										for(int i = 1 ; i <= counterAttachedFile ; i++){  %>
													<option value="{MAILATTACHMENTFILE<%=i%>}">{MAILATTACHMENTFILE<%=i%>}
													</option>
												<%  }  %>
												<option value="{MOBILEAPIPATH}">{MOBILEAPIPATH}</option>
												<option value="{IOSAPIPATH}">{IOSAPIPATH}</option>
												<option value="{WINDOWSAPIPATH}">{WINDOWSAPIPATH}</option>
												<option value="{BLACKBERRYAPIPATH}">{BLACKBERRYAPIPATH}</option>
												<option value="{LICENSEKEY}">{LICENSEKEY}</option>
												<option value="{DESKTOPWIN86APIPATH}">{DESKTOPWIN86APIPATH}</option>
												<option value="{DESKTOPWIN64APIPATH}">{DESKTOPWIN64APIPATH}</option>
												<option value="{DESKTOPMACAPIPATH}">{DESKTOPMACAPIPATH}</option>
												<option value="{DESKTOPLINAPIPATH}">{DESKTOPLINAPIPATH}</option>
												<option value="{QRHOST}">{QRHOST}</option>
												<option value="{QRPORT}">{QRPORT}</option>
												<option value="{EMERGENCYOTP}">{EMERGENCYOTP}</option>
												<option value="{PASSWORDRESETLINK}">{PASSWORDRESETLINK}</option>
												<option value="{DEVICEID}">{DEVICEID}</option>
												<option value="{MOBILETYPE}">{MOBILETYPE}</option>
												<option value="{OTP}">{OTP}</option>

											</select>
										</div>
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


	<div id="myModalTestMail" class="modal hide fade" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">

			<h3 id="myModalLabel">Send Test Mail</h3>
		</div>
		<div id="mBody" class="modal-body">

			<div class="controls">
				<b>Mail ID:</b> <input id="senderMailID" type="text" class="span4 "
					value="">
			</div>
			<br />



		</div>
		<div class="modal-footer">
			<button class="btn btn-primary" onclick="finalSendTestMail()">Submit</button>
			<button class="btn btn-success" data-dismiss="modal"
				aria-hidden="true">Close</button>

		</div>
	</div>

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
	
<%-- 	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/in/jquery.uniform.min.js"></script> --%>
	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script
		src="<%= request.getContextPath() %>/web/assets/dropzone/dropzone.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->


	<!-- For Datatable (searching)-->
	<script
		src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js"
		type="text/javascript"></script>
	<!-- End For Datatable (searching)-->

	<script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
	<script
		src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom.js"></script>

	<script
		src="<%= request.getContextPath() %>/web/js/custom/showMailTemplate.js"
		type="text/javascript"></script>
	<script
		src="<%= request.getContextPath() %>/web/js/bootstrap-ui-design.js"
		type="text/javascript"></script>
	<script>
   jQuery(document).ready(function() { 
          // initiate layout and plugins
         App.init();
		TableEditable.init();
    });

	/* 
	$(document).ready(function(){  // Saurabh
     try{
     	
     	//insertGeoFileDetail(false,false);
     	}
     	catch(e)
     	{
     		alert(e);
     	}
     }); */
      
   
	/* $('#insert_geo_file').click(function(){  // Saurabh
	  insertGeoFile();
	}); */

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
   
 function fetchMailTemplate(){
	  $('#mailTagsId').prop('selected', false).find('option:first').prop('selected', true);
	var mailTemplateType = $("#mailTemplateTypeId").val();
	if(mailTemplateType == '-1') {
		alert("Please Select Mail Template Type.");
		$('#user_resync_data').html("");
		return true;
	}
	showMailTemplate(mailTemplateType);
 }
</script>
	<script src="<%= request.getContextPath() %>/web/js/highcharts.js"></script>
	<script src="<%= request.getContextPath() %>/web/js/exporting.js"></script>

	<input type="hidden" name="csrfPreventionSalt"
		id="csrfPreventionSaltId"
		value="<%=request.getAttribute("csrfPreventionSalt") %>" />
	<!--</s:form>-->
</body>

<!-- END BODY -->
</html>