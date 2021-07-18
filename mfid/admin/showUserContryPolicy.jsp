     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>
<%@page import="com.mfid.common.util.DataBaseUtility"%>

<%@ page import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.PropertyFileUtility" %>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	<title><%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.TITLE_NAME) %></title>
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />  
	<meta content="" name="description" />
	<meta content="" name="author" />
		<% String maximumCountriesAllowed=DataBaseUtility.getPropertiesValues().getMaximumCountriesAllowed(); %>
	<script> var maximumCountriesAllowed =  <%=maximumCountriesAllowed%>; </script>
		<script src="<%= request.getContextPath() %>/web/js/custom/resync_Clock.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/activate-resync.js" type="text/javascript"></script>
	
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_responsive.css" rel="stylesheet" />
	
	<link href="<%= request.getContextPath() %>/web/css/style_default.css" rel="stylesheet" id="style_color" />

	<link href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/custom.css" rel="stylesheet" />
	
	<link href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />
	 <link href="<%= request.getContextPath() %>/web/css/jquery.datetimepicker.css" media="screen" rel="stylesheet" type="text/css" />
	
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="<%= request.getContextPath() %>/web/assets/dropzone/css/dropzone.css" rel="stylesheet"/>
    <!-- END PAGE LEVEL STYLES -->
	
	<!--for DataTable--> 
	<%-- <link href="<%= request.getContextPath() %>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
	<link href="<%=request.getContextPath()%>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" />
	<!--End for DataTable--> 
	<style>
body { font-family:'Open Sans' Arial, Helvetica, sans-serif}
ul,li { margin:0; padding:0; list-style:none;}
.label { color:#000; font-size:16px;}
.dropdown-menu{max-height: 150px;
    overflow: hidden;
    overflow-y: scroll;}
    
/*     .dropdown-menu{max-height: 128px; */
    overflow: hidden;
    overflow-y: scroll;}
.dropdown-menu>li>a {
    display: block;
    padding: 3px 29px;
    clear: both;
    font-weight: normal;
    line-height: 20px;
    color: #333;
    white-space: nowrap;
}

.dropdown-menu .multiselect-search{width:96% !important;}

.table input, textarea, select{width:auto !important;}
.table .dropdown-menu>li>a {
    display: block;
    padding: 3px 15px;
    clear: both;
    font-weight: normal;
    line-height: 20px;
    color: #333;
    white-space: nowrap;
}

.table .dropdown-menu  ul, li  
{margin: 0px 1px 0px;
padding: 0;
list-style: none;
}
</style>
<%String clientNameFlagX = new PropertyFileUtility().fetchPropertyFileAttribute("client.name"); 
%>
<script> 
var clientNameFlagP =  '<%=clientNameFlagX%>'; 

</script>

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
<!-- BEGIN HEADER -->
<%@ include file="/common/secureHeader.jsp" %>
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
	<!-- 	<div class="navbar-inverse">
				<form class="navbar-search visible-phone">
					<input type="text" class="search-query" placeholder="Search" />
				</form>
			</div>       -->	
			
			<!-- BEGIN SIDEBAR MENU -->
		<%@ include file="/common/secureMenu.jsp" %>
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
							 <a href="<%= request.getContextPath() %>/secureLogin_showDashboard.action"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">User</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li> <a href="<%= request.getContextPath() %>/admin_showUserContryPolicy">Country Policy</a><span class="divider-last">&nbsp;</span></li>
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
									   <h4><i class="icon-retweet"></i>Manage&nbsp;&nbsp;Policy</h4>
									   <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
									</div>
									<div class="widget-body scroll-div">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid">
											</div> 
											
											<!--Start User Search Block  -->
											<div class="tab-content">
										 
												
												 
												 
											  

											
											
											
											
									<!--Start User User Policy Block  -->		
											<div class="tab-content">
													<!--<div class="tab-pane active " id="block_policy">-->
													
													<div class="row" style="height:20px;"></div>
													<div id="policyFormdiv" style="display:none;">
														<form class="form-horizontal" action="#" id="policyAddForm">
															<div class="control-group">
																<label class="control-label">List of Allowed Country</label>
																<div class="controls">
																	<select  class="input-large m-wrap" name="countrycode"  id="countrycode"  >
																		
																		<!-- <option value="">-select Country Codes-</option> -->
																		
																	</select>
																</div>
															</div>
															
															<div class="control-group" id="date-time-div" >
																	<label class="control-label">Enter Time Stamp</label>
																	<div class="controls">
																		<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>
																		-
																		<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>
																	</div>
																</div>
															<div class="form-actions">
																<button class="btn blue" id="saveBtn1" type="button"><i class="icon-ok"></i> Save</button>
																<button class="btn" id="cancelBtn" type="button"><i class=" icon-remove"></i> Cancel</button>
															</div>
															<input type="hidden" id="policyDecBeforeEdit" />
															<input type="hidden" id="allCountryCode" />
															<input type="hidden" id="countryResponse" />
															
															<input type="hidden" id="countryCode" />
															
															<input type="hidden" id="domainName" />
															<input type="hidden" id="appName" />
															<input type="hidden" id="pId" />
														</form>
													</div>
													
														
													<div id="block_policy_data"></div>
													
											<!--</div>  -->	
												
													</div>
													
												</div>
											</div>
												<!--End User User Policy Block  -->	
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
<script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js" type="text/javascript"></script>
<!-- End For Datatable (searching)--> 
 <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/jquery.datetimepicker.js"></script>
  <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/in/bootstrap-multiselect.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom/showSecureUserCountryPolicy.js" type="text/javascript"></script>
  
    
      <script src="<%= request.getContextPath() %>/web/js/in/user-country-policy-editable.js"></script>
       <script src="<%= request.getContextPath() %>/web/js/date_firefox.js"></script>
	<%int appId=SessionUtil.getApplication().getId(); 
	String orgName=SessionUtil.getOrganization().getOrganisationName();
    %>
	
	
  <script type="text/javascript">
	
		jQuery(document).ready(function() {       
			// initiate layout and plugins
			App.init();
			TableEditable.init();
			showAllCountryList();
			
			var userId= '<%=SessionUtil.getSecureUser().getId()%>';
		    showSecureUserCountryPolicy(userId);
		
						
			$('#application').multiselect({
				includeSelectAllOption: true
			});
			
		});
		
			$(document).ajaxStart(function(){
  
    $("#loading").css("display","block");
    $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
     // alert("start");
  });
  
  $(document).ajaxComplete(function(){
  
    $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
     // alert("complete");
  });  
   
		
		 var oTable ='';
		$(document).on('click','#tab_1',function(){
			
			openPolicy();
		});	
		
		$('#cancelBtn').on('click',function(){
			var selVal = $('#domain').attr('multiple');
			if(selVal){
				$('#domain').multiselect('destroy');
				$('#domain').attr('multiple',false);
			}
			$('#domainDiv').hide();
			$('#appDiv').hide();
			this.form.reset();
			$('#policyFormdiv').hide();
			
		});
		
	$('#addTo').on('change',function(){
		
		try{
		var addLevel=document.getElementById('addTo').value;
		
		if(addLevel=="domain"||addLevel=="App")
			$('#domain').attr('multiple',false);
			//showDomainList('false');
		
		var val = addLevel.trim();
		
		if(val == 'domain'){
			showDomainList('true','domain');
			$('#domain').attr('multiple',true);
	 //start changes for bug id #277 , added by abhimanyu 
			$('#domain').multiselect('destroy');
	 //end changes for bug id #277 , added by abhimanyu
			$('#domain').multiselect({
				includeSelectAllOption: true
			});
			$('#domainDiv').show();
			$('#appDiv').hide();
		}else if(val == 'App'){
		showDomainList('false','domain');
			$('#domain').multiselect('destroy');
			$('#domain').attr('multiple',false);
			$("#domain").change(function(){
   			getApplicationList('application','domain');
			});
			$('#domainDiv').show();
			$('#appDiv').show();
		}
		}catch (e) {
			alert(e)
			// TODO: handle exception
		}
		});
		
		
function searchUserDetailRecord(e)
{  
	 if (e.keyCode === 13)   
		searchUserDetails();
}
function updateUserDetailForm()
{    $("#userLoginID").val('');
	 $("#firstNameID").val('');
	 $("#lastNameID").val('');
	 $("#emailID").val('');
     $("#mobileNumberID").val('');
	 $('#block_show_User_Search_Data').html('');
	
	 
}
		
		
		$('.addtoType').on('change',function(){
			try{
			var val = $(this).val();
			document.getElementById("level").value=val;
			if(val == 'domain'){
			 
			showDomainList('true','addto_domain_select');
				$('#addto_appDom').show();
			//	$('#addto_domain_select').attr('multiple',true);
				
				$('#addTo_domainDiv').show();
				$('#addToAppDiv').hide();
			}else if(val == 'application'){
				showDomainList('false','addto_domain_select');
				
				$("#addto_domain_select").change(function(){
   				getApplicationList('addto_app_select','addto_domain_select');
			});
				
			
				$('#addto_appDom').show();
			//	$('#addto_domain_select').multiselect('destroy');
			//	$('#addto_domain_select').attr('multiple',false);
				$('#addTo_domainDiv').show();
				$('#addToAppDiv').show();
				//$('#addto_app_select').attr('multiple',true);
			}
			}
			catch(e){alert(e)}
		});  		
			$('#addTo_search_btn').on('click',function(){

			addtoTable('block_policy_addTo')
		});
		
		
	//jQuery('.group-checkable').live('change',function(){
	$(document).on('click', '.group-checkable', function() {
		var set = jQuery(this).attr("data-set");
		var checked = jQuery(this).is(":checked");
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
	/* 	jQuery(set).each(function () {
			if (checked) {
				$(this).attr("checked", true);
			} else {
				$(this).attr("checked", false);
			}
		}); */
		jQuery.uniform.update(set);
	});
		
		$('#myModal').on('shown.bs.modal', function (e){


resyncClock();


	
});
		
	</script>
	<script>
    
  
    
function getCurrentDate()
{

    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var minutes = d.getMinutes();
    var hours=d.getHours();
    //var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+' 00:00';
 
    //  var output =((''+day).length<2 ? '0' : '') + day+'-'+ ((''+month).length<2 ? '0' : '') + month + '-' + d.getFullYear();
  var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+ ' '+((''+hours).length<2 ? '0' : '') +hours+':00';
    return output;
  }
  

function getAddDaysToCurrentDate()
{
    var d = new Date();
    d.setDate(d.getDate() + 7);
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+' 23:59';
    return output;
    
}
    
    
   //jQuery('.group-checkable').live('change',function(){
	$(document).on('click', '.group-checkable', function() {
	// alert("group checkable");
	 if(typeof($(this).attr('id')) === 'undefined')
	// $(".checkboxes").prop('checked', true);
	//  $("#sample_editable_1_multi_delete").focus();
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		//alert(checked);
		if(checked)
		{
		// alert("in if");
		 $(".checkboxes").prop('checked', true);
		 $("#sample_editable_1_multi_delete").focus();
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
			 $(".checkboxes").prop('checked', false);
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
			//showChangeAuth(false,false);
		}
		jQuery.uniform.update(set);
	});
	
   
   function deleteCountryPolicyList()
   {
	   
	   var id="";
		//alert("======= "+$('input[type="checkbox"]:checked').length);
		if($('input[type="checkbox"]:checked').length==0){
			alert("Please select Country Name to delete");
		}
		else if($('input[type="checkbox"]:checked').length>0){
			/*if (jConfirm("Are you sure to delete selected row ?") == false) {
				return;*/
			/* $.confirm({
		        text: "Are you sure to delete selected row? License May be associated to the selected users.Do you want to continue ??",
		        confirm: function(button) { */ 
		        	$('.checkboxes').each(function(){
						if($(this).is(':checked')){
						id += "'"+ $(this).val() + "',";
							 }
					});
					 //  alert("id = "+id);
					if(id == '')
					{
					alert("Please select Country Name to delete");
					return true;
					}
					id=id.substring(0,id.length-1);
					delete_row(id);
					nEditing = null;
		     /*   },
		        cancel: function(button) {
		            return;
		        }
		    }); */ 
			//}
			
			
			
		}
   
   }
   
   
   
   		$('#sample_editable_1_multi_delete').on('click', function(){
		 
		 
		var id="";
		//alert("======= "+$('input[type="checkbox"]:checked').length);
		if($('input[type="checkbox"]:checked').length==0){
			alert("Please select Country Name to delete");
		}
		else if($('input[type="checkbox"]:checked').length>0){
			/*if (jConfirm("Are you sure to delete selected row ?") == false) {
				return;*/
			/* $.confirm({
		        text: "Are you sure to delete selected row? License May be associated to the selected users.Do you want to continue ??",
		        confirm: function(button) { */ 
		        	$('.checkboxes').each(function(){
						if($(this).is(':checked')){
						id += "'"+ $(this).val() + "',";
							 }
					});
					 //  alert("id = "+id);
					if(id == '')
					{
					alert("Please select Country Name to delete");
					return true;
					}
					id=id.substring(0,id.length-1);
					delete_row(id);
					nEditing = null;
		     /*   },
		        cancel: function(button) {
		            return;
		        }
		    }); */ 
			//}
			
			
			
		}
	});
      

</script>
<style>.modal.fade.in {
    top: 35%;
}</style>
  <%--  <script src="js/highcharts.js"></script>
   <script src="js/exporting.js"></script>
   <script type="text/javascript">
  
   </script> --%>
    <input type="hidden" id="level"/>
   <!--</s:form>-->
</body>
<!-- END BODY -->
</html>
