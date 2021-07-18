
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags"%> --%>

<%@ page
	import="java.util.*,java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.PropertyFileUtility"%>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
<%
	String domain = SessionUtil.getDomain().getDomainName();
%>
<meta charset="utf-8" />

<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="" name="description" />
<meta content="" name="author" />


<link
	href="<%=request.getContextPath()%>/web/assets/bootstrap/css/bootstrap.min.css"
	rel="stylesheet" />
<link
	href="<%=request.getContextPath()%>/web/assets/bootstrap/css/bootstrap-responsive.min.css"
	rel="stylesheet" />
<link
	href="<%=request.getContextPath()%>/web/assets/font-awesome/css/font-awesome.css"
	rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/css/style.css"
	rel="stylesheet" />
<link
	href="<%=request.getContextPath()%>/web/css/style_responsive.css"
	rel="stylesheet" />
<link href="<%=request.getContextPath()%>/web/css/style_default.css"
	rel="stylesheet" id="style_color" />

<link
	href="<%=request.getContextPath()%>/web/assets/fancybox/source/jquery.fancybox.css"
	rel="stylesheet" />

<link
	href="<%=request.getContextPath()%>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css"
	rel="stylesheet" />
<link
	href="<%=request.getContextPath()%>/web/assets/jqvmap/jqvmap/jqvmap.css"
	media="screen" rel="stylesheet" type="text/css" />


<!-- BEGIN PAGE LEVEL STYLES -->
<link
	href="<%=request.getContextPath()%>/web/assets/dropzone/css/dropzone.css"
	rel="stylesheet" />
<!-- END PAGE LEVEL STYLES -->

<!--for DataTable-->
<%-- <link
	href="<%=request.getContextPath()%>/web/css/jquery-ui-1.7.2.custom.css"
	rel="stylesheet" id="style_color" /> --%>
	<link href="<%= request.getContextPath() %>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" /> 
<!--End for DataTable-->
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
<!-- BEGIN HEADER -->
	<%@ include file="/common/header.jsp"%>
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
				<form class="navbar-search visible-phone"></form>
			</div>

			<!-- BEGIN SIDEBAR MENU -->

			<jsp:include page="/common/menu.jsp" />
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
						<h3 class="page-title">Token Stock Report</h3>
						<ul class="breadcrumb">
							<li><a
								href="<%=request.getContextPath()%>/login_showDashboardAgain"><i
									class="icon-home"></i></a><span class="divider">&nbsp;</span></li>
							<li><a href="#">Report</a> <span class="divider">&nbsp;</span>
							</li>
							<li><a
								href="<%=request.getContextPath()%>/report_showTokenStockReport">Token
									Stock Report</a><span class="divider-last">&nbsp;</span></li>
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
									<i class="icon-share-alt"></i>Token&nbsp;Stock&nbsp;Report
								</h4>
								<span class="tools"> <a href="javascript:;"
									class="icon-chevron-down"></a> <a href="javascript:;"
									class="icon-remove"></a>
								</span>
							</div>
							<div class="widget-body form">
								<div class="widget-body">
									<div id="container_domain"></div><div style="clear:both;"></div>
									<div id="container_grap"></div>
									<div id="success_attempt_data"></div>
									
								</div>
							</div>
							
									<!--<div class="span4">
										<h4>Export options:</h4>
									</div>
									<div class="span8">
									--><!--<s:url action="/reportgen_tokenStockReport" includeParams="get" var="playerX" >
    									<s:param name="winnerNo" value="'player2'"/>
									</s:url>
										<form method="post" id="reportForm">
											<input type='hidden' name='jsonText' id='jsonText' />
											<ul>
												<li><a href='#' onClick="" class='btn btn-primary'>CSV</a></li>
												<li><a href='#' class='btn btn-primary'>Excel</a></li>
												<li><a href='#' class='btn btn-primary'>XML</a></li>
												<li><a href='#' onClick="callPdfReport()" class='btn btn-primary'>PDF</a></li>
											</ul>
										</form>
									</div>-->
								

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
		    	<div id="myModal1" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="usersummaryreportcolumn" class="checkboxes" value="Token Serial" checked/>  Token Serial </td></tr>
	   <tr><td><input type="checkbox" name="usersummaryreportcolumn" class="checkboxes"  value="Assign To" checked/>  Assign To  </td></tr>
	<tr><td>  <input type='checkbox' name="usersummaryreportcolumn" class='checkboxes'  value='Lock / Unlock' checked/>  Lock / Unlock  </td></tr>
	<tr><td>  <input type='checkbox' name="usersummaryreportcolumn" class='checkboxes'  value='Active Date' checked/>  Active Date </td></tr>
	 <tr><td>  <input type='checkbox' name="usersummaryreportcolumn" class='checkboxes'  value='Days Left' checked/>  	Days Left  </td></tr>
 </table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportTokenStockReport()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>
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
	
	<script
		src="<%=request.getContextPath()%>/web/js/custom/resync_Clock.js"
		type="text/javascript"></script>
	<script
		src="<%=request.getContextPath()%>/web/assets/bootstrap/js/bootstrap.min.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/jquery.blockui.js"></script>
	<script
		src="<%=request.getContextPath()%>/web/js/jquery.fileDownload.js"></script>
	<!-- ie8 fixes -->
	<!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->
	
	<script type="text/javascript" src="<%=request.getContextPath()%>/web/js/in/jquery.dataTables.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/web/js/in/DT_bootstrap.js"></script>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script src="<%=request.getContextPath()%>/web/assets/dropzone/dropzone.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->


	<!-- For Datatable (searching)-->
	<%-- <script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.js" type="text/javascript"></script> --%>
	<script src="<%=request.getContextPath()%>/web/js/in/jquery.dataTables.columnFilter.js" type="text/javascript"></script>

	<!-- End For Datatable (searching)-->

	<script src="<%=request.getContextPath()%>/web/js/scripts.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/custom/tokenstockreport.js" type="text/javascript"></script>

	<script src="<%=request.getContextPath()%>/web/js/in/table-editable.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/custom.js"></script>
	<script>
  jQuery(document).ready(function() {       
			// initiate layout and plugins
			App.init();
			var domain= "<%=domain%>";
			//alert("1245e6");
			showTokenStock(domain);
			//alert(domain);
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
   
		
		$('#myModal').on('shown.bs.modal', function (e){


resyncClock();


	
});
		
		
		
		
//jQuery('.group-checkable').live('change',function(){
	$(document).on('click', '.group-checkable', function() {
	//alert("group checkable");
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
		//alert(checked);
		/* if(checked)
		{
			//alert("in if");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
		}
		else
		{
			//alert("in else");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
			//showChangeAuth(false,false);
		} */
		jQuery.uniform.update(set);
	});    
    
  
function resetAllCheckbox(){
          var set = jQuery(".group-checkable").attr("data-set");
	       var checked = jQuery(".group-checkable").is(":checked");
	       if(!checked){
	       $('.group-checkable').attr("checked", true);
	        jQuery('.group-checkable').uniform();
	       checked = jQuery(".group-checkable").is(":checked");
	      
	       }
	       
	     if(checked)
		      {
			 jQuery(set).each(function () {
			
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
		   		}
		   else
				{
			 
			jQuery(set).each(function () {
			
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
				
		}
		
		jQuery.uniform.update(set);
}  
      
  </script>
	<script src="<%=request.getContextPath()%>/web/js/highcharts.js"></script>
	<script src="<%=request.getContextPath()%>/web/js/exporting.js"></script>


	<!--</s:form>-->
</body>




<!-- END BODY -->
</html>