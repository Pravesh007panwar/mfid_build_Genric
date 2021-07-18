<!DOCTYPE html>
<%@page import="com.innefu.mfid.dataaccess.om.UserDetail"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="display" uri="http://displaytag.sf.net" %>
<%@ page import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.PropertyFileUtility,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext" %>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<!-- BEGIN HEAD -->
<head>

<% 
String domain1=null;

String imagePath = request.getContextPath();
String str=null;

try{
	 str=new PropertyFileUtility().fetchPropertyFileAttribute("protocol.decoding.engine.flag");
	 System.out.println("str======="+str);
	 
 domain1=SessionUtil.getDomain().getDomainName(); 
 
	System.out.println("domain======="+domain1);
}
catch(Exception e)
{
	e.printStackTrace();	
}
%>
	<meta charset="utf-8" />
	<title><%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.TITLE_NAME) %></title>
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>	
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style.css" rel="stylesheet" />
		<link href="<%= request.getContextPath() %>/web/css/flags32.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_responsive.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_default.css" rel="stylesheet" id="style_color" />

    <script src="<%= request.getContextPath() %>/web/js/custom/dashboard_secure_users_details.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/switch_app_domain.js"> </script>
	<link href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
	
	<link href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />
	<link href="<%= request.getContextPath() %>/web/css/custom.css" rel="stylesheet" />
	<%-- <link href="<%=request.getContextPath()%>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
	<link href="<%=request.getContextPath()%>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" />
	<style> 
		

.highcharts-tooltip>span {
    padding: 10px;
    white-space: normal !important;
    width: 200px;
}



.f32 .flag {
    vertical-align: middle !important;
}
	.highcharts-input-group{display:none;}
	.pad { background-color: #FFFFFF; padding: 0px; overflow:hidden; border: #ddd /**rgb(47, 126, 216)**/ 1px solid;
    border-radius: 5px; } .fif {  display: inline-block;  margin: 0;   padding: 0;}</style>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
	<!-- BEGIN HEADER -->
<%@ include file="/common/secureHeader.jsp" %>
<!-- END HEADER -->
<!--<s:form name="f1" validate="true" theme="simple" >  -->


	<!-- END HEADER -->
    
	<!-- BEGIN CONTAINER -->
<div id="loading" style="display: none;width:100%;height:550px;position:fixed;top:50%;left:50%;z-index: 25;" >
	<img src='<%=request.getContextPath() %>/web/img/ajax_loader_gray_64.gif' width="64" height="64" /><br>Loading..
</div>
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
			</div>    -->	
			
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
                    <div class="span6">                       
                        <h3 class="page-title">
                            Dashboard
                        </h3>
                        <ul class="breadcrumb">
                            <li>
                             <a href="<%= request.getContextPath() %>/secureLogin_showDashboard.action"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
                            </li>
                            
                             <li><a href="<%= request.getContextPath() %>/secureLogin_showDashboard.action">Dashboard</a><span class="divider-last">&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
             
                        </ul>
                        <!-- END PAGE TITLE & BREADCRUMB-->
                    </div>
                   
                  
                  
						
                   
                </div>
                <!-- END PAGE HEADER-->
                <!-- BEGIN PAGE CONTENT-->
                <div id="page" class="dashboard">                  
                   	      
				      
		<div class="row-fluid">
                            <div class="span12">
                                <!-- BEGIN EXAMPLE TABLE widget-->
                                <div class="widget">
                                    <div class="widget-title">
                                        <h4><i class="icon-share-alt"></i>User Details</h4>
                                        <span class="tools">
                                           <a href="javascript:;" class="icon-chevron-down"></a>
                                           <a href="javascript:;" class="icon-remove"></a>
                                         </span>                                       
                                     </div>
                                   
                                    <div class="widget-body scroll-div">
                                         <div class="row-fluid">
                                            <!--<h4>Users Details</h4> -->
                                            <!-- Add div for show users details data , added by abhimanyu -->
                                            <div id="dashboard_users_details_data"></div>
                                          </div>
                                          
                      
                      
                    <!-- start comment For NIC , 01-02-2017 -->  
                       <!--                   
                                        <div class="expo_option">
                                <div class="row-fluid">
                                    <div class="span4"><h4>Export options:</h4></div>
                                    <div class="span8">
                                        <ul>
                                              
                                                              
                                        </ul>
                                    </div>
                                </div>
                            </div>
                          -->  
                    <!-- end comment For NIC , 01-02-2017 -->            
                            
                            
                                   </div>
                                </div>
                                <!-- END EXAMPLE TABLE widget-->
                            </div>		      
				      
				      
				      
				      
				     
				
				      
				         
				         
            <!-- END PAGE CONTAINER-->
		</div>
		<!-- END PAGE -->
        
        
	</div>
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
	 <tr><td><input type="checkbox" class="group-checkable" id="selectAllId" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="userdetailsreportcolumn" class="checkboxes" value="User LogonId" checked/> User LogonId </td></tr>
	   <tr><td><input type="checkbox" name="userdetailsreportcolumn" class="checkboxes"  value="Authentication type" checked/> Authentication type  </td></tr>
	<tr><td>  <input type='checkbox' name="userdetailsreportcolumn" class='checkboxes'  value='Token serial/License Key' checked/> 	Token serial/License Key  </td></tr>
	<tr><td>  <input type='checkbox' name="userdetailsreportcolumn" class='checkboxes'  value='Token Expiry' checked/>  Token Expiry </td></tr>
	 <tr><td>  <input type='checkbox' name="userdetailsreportcolumn" class='checkboxes'  value='User Status' checked/>  User Status </td></tr>
</table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserDetailReport()">Export</button>
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
 <%--  <script src="<%=request.getContextPath()%>/web/js/jquery-1.7.1.min.js"></script> --%>
   <script src="<%= request.getContextPath() %>/web/js/custom/resync_Clock.js" type="text/javascript"></script>
   <script src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>   
   <script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
   
   <!-- ie8 fixes -->
   <!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->   
   
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>
   
   <script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.js" type="text/javascript"></script>
  
   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
  
    <script src="<%= request.getContextPath() %>/web/js/custom/tokenstockreportdashboard.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/custom/authenticationReportDashboard.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/custom/tokenDetailsDashboard.js"></script>
     <script src="<%= request.getContextPath() %>/web/js/custom/loginTimeReportDashboard.js"></script>
       <script src="<%=request.getContextPath() %>/web/js/highcharts_dashboard.js"></script>
     <script src="<%= request.getContextPath() %>/web/js/custom/system_stats.js"></script>
        <script src="<%= request.getContextPath() %>/web/js/custom/protocol_system_stats.js"></script>
       <script src="<%= request.getContextPath() %>/web/js/custom/user_attempts.js"></script>
          <script src="<%= request.getContextPath() %>/web/js/custom/ip_details_dashboard.js"></script>
           <script src="<%= request.getContextPath() %>/web/js/custom/top_user_Unsuccessful.js"></script>
             <script src="<%= request.getContextPath() %>/web/js/custom/serverStatus.js"></script>
               <script src="<%= request.getContextPath() %>/web/js/custom/denyByCountryDashboard.js"></script>
         
          
          <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
    <script src="<%=request.getContextPath() %>/web/js/highcharts-more.js"></script>
     <script src="<%=request.getContextPath() %>/web/js/solid-gauge.js"></script>
         <script src="<%=request.getContextPath() %>/web/js/highcharts-3d.js"></script>
      <script src="<%= request.getContextPath() %>/web/js/custom/neverLoggedInDashboard.js"></script>
      
         <script src="<%= request.getContextPath() %>/web/js/highmaps.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/data.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/world.js"></script>
   
    <script src="<%= request.getContextPath() %>/web/js/jspdf.min.js"></script>
  
  
  
  <input type="hidden" id="id_image_Path"/>
  
  
  
<!-- Modal -->
<div id="myModal2" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Update Password</h4>
      </div>
      <div class="modal-body">
        

   <div class="widget-body form">
                        <!-- BEGIN FORM-->
                        <form action="#" id="cPasswordForm" class="form-horizontal">
                        	<div class="control-group">
                              <label class="control-label">Old Password</label>
                              <div class="controls">
                                 <input style="display:none"/>
                                 <input type="password" id="oldPassword" class="span6 " />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">New Password</label>
                              <div class="controls">
                                 <input type="password" id="newPassword" class="span6 " />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                           <div class="control-group">
                              <label class="control-label">Confirm Password</label>
                              <div class="controls">
                                 <input type="password" id="confirmPassword" class="span6 " />
                                 <span class="help-inline red_color">*</span>
                              </div>
                           </div>
                           
                         
                        </form>
                        <!-- END FORM-->           
                     </div>
                  




      </div>
      <div class="modal-footer">
       <button type="submit" onclick="changePassword()" class="btn btn-primary">Submit</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
   
  
   
   <script>
   
   var role;
      jQuery(document).ready(function() {       
         // initiate layout and plugins
         App.init();
      
		 TableEditable.init();
		   var domain="<%=domain1 %>";
		//alert(domain);
		 role=<%=SessionUtil.getUserMapping().getRole().getId()%>
		 var filePath="<%=imagePath%>";
		 var tranFlag="<%=str%>"
		 //alert("tranFlag==="+tranFlag)
		 $("#id_image_Path").val(filePath);
		 if(role!=5)
			{
		        try { showTokenStock(domain); }catch(err) {}
				try { showAuthenticationReport(domain); }catch(err) {}
				try { tokenDetailsDashBord(domain); }catch(err) {}
				try { loginTimeDashBord(domain); }catch(err) {}
				try { showSystemStats(); }catch(err) {}
				
			    try {if(tranFlag==1) showProtocolSystemStats(); }catch(err) {}
				try { showUserAttempts(domain); }catch(err) {}
				try { showIpDetailsDashboard(domain); }catch(err) {}
				try { neverLoggedInReport(domain); }catch(err) {}
				try { showTopUserUnsuccessfulAttempts(domain); }catch(err) {}
				
			    try { getServerStatus(); }catch(err) {}
			    try { showDenyByCountryDashboardReport(domain); }catch(err) {}
		
			}
			
			
      });
 
   $(document).ready(function()
	 {
	    role=<%=SessionUtil.getUserMapping().getRole().getId()%>
	    showDashBoardUsersDetails(false,false,role);
	});
	
	
		$(document).ajaxStart(function(){
  
    $("#loading").css("display","block");
     $( "#submitbtn").hide();
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
   
	
      
   </script>
  
   <!--<script src="<%= request.getContextPath() %>/web/js/highcharts.js"></script>
   
   --><!--
   <script src="<%=request.getContextPath() %>/web/js/exporting.js"></script>
   -->
   
   
   
   <script>
   



loadPopup();

$('#myModal').on('shown.bs.modal', function (e){


resyncClock();


	
});  

 
 
 

//jQuery('.group-checkable').live('change',function(){
	$(document).on('click', '.group-checkable', function() {
	//alert("group checkable");
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		//alert(checked);
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
		
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


function changePassword()
{
	 //alert("changePassword");
	var oldPassword=document.getElementById("oldPassword").value;
	var newPassword=document.getElementById("newPassword").value;
   var confirmPassword=document.getElementById("confirmPassword").value;
   oldPassword = $.trim(oldPassword);
   newPassword = $.trim(newPassword);
   confirmPassword = $.trim(confirmPassword);
 /*alert("oldPassword==="+oldPassword);
 alert("newPassword==="+newPassword);
 alert("confirmPassword==="+confirmPassword);*/
		   if(oldPassword=="")
			{
			alert("Please enter old password");
			$('#oldPassword').focus();
			}
		else if(oldPassword.length>20)
			{
			alert("Old password length should not be more than 20 character");
			$('#oldPassword').focus();
			} 		
		else if(newPassword=="")
			{
			alert("Please enter new password");
			$('#newPassword').focus();
			}
		else if(newPassword.length>20)
			{
			alert("New password length should not be more than 20 character");
			$('#newPassword').focus();
			} 		
		else if(confirmPassword=="")
			{
			alert("Please enter confirm password");
			$('#confirmPassword').focus();
			}
		else if(confirmPassword.length>20)
			{
			alert("Confirm password length should not be more than 20 character");
			$('#confirmPassword').focus();
			} 
		else if(newPassword!=confirmPassword)	
		{
			alert("New password and Confirm password should be same.");
		}
		
		else if((oldPassword.indexOf('\'') >=0)||(oldPassword.indexOf('=') >=0))
		{
			alert("Format of old password is incorect");
		}
		
		else if((newPassword.indexOf('\'') >=0)||(newPassword.indexOf('=') >=0))
		{
			alert("Format of new password is incorect");
		}
		
		else if((confirmPassword.indexOf('\'') >=0)||(confirmPassword.indexOf('=') >=0))
		{
			alert("Format of Confirm password is incorect");
		}
		else if(checkSpecialCharacter(newPassword)) 
			{
		      alert ("Your string has special characters. \nThese are not allowed.");
			}
		else{
			
	var dataString='oldPassword='+encodeURIComponent(oldPassword)+'&newPassword='+encodeURIComponent(newPassword)+'&confirmPassword='+encodeURIComponent(confirmPassword);
	$.ajax({
			type: "POST",
			url: "admin_changeSecurePassword.action",
			data: dataString,
			async: false,
			 dataType: "text",
			success: function(response){
				//alert(response);
				if($.trim(response)=="sessionout")
					{
					alert(response);
					var testVal=document.getElementById('loginPage').value;
					window.location.replace(testVal);
					}
				else if($.trim(response) == "success"){
				   $('#myModal2').modal('hide');
					alert(response);
					jQuery('input[id$="oldPassword"]').val("");
					jQuery('input[id$="newPassword"]').val("");
					jQuery('input[id$="confirmPassword"]').val("");
				}
				else{
					alert(response);
				}
			}
		});
	return reponse;
		
				}
}



function checkSpecialCharacter(data)
{
	// var iChars = "!`&%^()=[]\\\';,/{}|\":<>?~"; // add for bug id #445 , added by Abhimanyu 
     var iChars = "&%"; // add for bug id #642 , added by Abhimanyu 
     for (var i = 0; i < data.length; i++)
        {      
        	if (iChars.indexOf(data.charAt(i)) != -1)
             return true;
         } 
     
     return false;

}


</script>
 
<!--</s:form>  -->
</body>
<!-- END BODY -->
</html>