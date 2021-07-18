<%@page import="com.mfid.common.util.DataBaseUtility"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="com.mfid.common.util.StringUtil"%>
<%@page import="com.mfid.common.util.SessionUtil"%>
<%@ page import="java.util.*, java.lang.*,java.util.*,com.mfid.common.*,com.mfid.common.util.PropertyFileUtility ,com.innefu.mfid.dataaccess.om.*,com.opensymphony.xwork2.ActionContext" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% 

String titleVal_a=new PropertyFileUtility().fetchPropertyFileAttribute("title.value");
String whiteListDeviceFlag=new PropertyFileUtility().fetchPropertyFileAttribute("whitelisted.device.flag");
 %>

<title><%=titleVal_a%></title>
</head>

<%-- <script src="<%= request.getContextPath() %>/web/js/jquery-3.2.1.min.js"></script> --%>



<script type="text/javascript">
 jQuery(document).ready(function() { 
//	alert("ready");
       var testVal='<%= request.getContextPath() %>'+"/login_showLogin.action";
   document.getElementById('loginPage').value= testVal;  

		 
      });

</script>
<%
 
int admin = 0;
Map session1 = (Map) ActionContext.getContext().get("session");
Domain domain=SessionUtil.getDomain();
DataSource ds=domain.getDataSource();
String dsType=ds.getDataSourceDesc();
int dsId=ds.getId();
UserMapping um=(UserMapping) session1.get("loginUserMapping");
admin = um.getRole().getId();
	HashMap<String, ArrayList<String>> roleMap=new HashMap<String, ArrayList<String>>();
	
	try{
		roleMap=(HashMap<String, ArrayList<String>>)session1.get(ApplicationConstants.PERMISSION); 
		
	
	
	
	}
	catch(NullPointerException e)
	{
		
	e.printStackTrace();
	response.sendRedirect("../admin/login.jsp"); 
	}
	%>
<% 
	String clientNameFlag = null;
	clientNameFlag = new PropertyFileUtility().fetchPropertyFileAttribute("client.name");
	int role = SessionUtil.getUserMapping().getRole().getId();
%>
<body>
	<ul class="sidebar-menu">
				<li class="has-sub active">
				<a data="dashboard" href="<%= request.getContextPath() %>/login_showDashboardAgain.action?a=dashboard">
					    <span class="icon-box"> <i class="icon-dashboard"></i></span> Dashboard                     
					   
                    </a>
				</li>
				<% if((clientNameFlag.contains("Reliance") && role==6 )) { %>
				<li class="has-sub">
					
				</li>
				<% } else { %>
				
				
				<li class="has-sub">
					<a href="javascript:;" data="user" class="">
					    <span class="icon-box"> <i class="icon-user"></i></span> User
					    <span class="arrow"></span>
					</a>
					<ul class="sub">
					
					
					<%
                           
                            	//try block if database doesn't contain 'importuser'                            	
                                                	try{
                            if(roleMap.get("importuser").contains(Integer.toString(admin))){%>
					
                        <li class="sub-li"><a href="<%= request.getContextPath() %>/admin_showImportUser.action?a=user">Import Data</a></li>
                          <% }
                        if(roleMap.get("manageuser").contains(Integer.toString(admin))){%>
                         <li class="sub-li"><a href="<%= request.getContextPath() %>/admin_showManageUser.action?a=user">Manage User </a></li>
                        <% }
                               }catch(Exception exception)
                                {
                                	exception.printStackTrace();
                                }%>
                              
                     
                     	<% 	                       
                       		if(roleMap.get("whitelisteddevice").contains(Integer.toString(admin)) && whiteListDeviceFlag.equalsIgnoreCase("true")){
                        %>
                       	<li class="sub-li"><a href="<%= request.getContextPath() %>/admin_showUserWhiteListedDevice.action?a=user">Whitelisted Device </a></li>
                     
                       <% 
                       	}
					   /**
					   * @author Abhimanyu
					   * Option show on bases of AD / lDAP / local cases.
					   */
                    String secureLoginAuth=DataBaseUtility.getPropertiesValues().getLoginAuth();
					
                     
					  if(secureLoginAuth != null && !secureLoginAuth.equalsIgnoreCase("AD") && !secureLoginAuth.equalsIgnoreCase("LDAP"))
					{ %>
                      <li class="sub-li"><a href="<%= request.getContextPath() %>/admin_showChangePassword.action?a=user">Change Password</a></li><%}%>
                      <%
                      try{  
                    //  if(um.getSeed().getId()!=0 && um.getSeed().getSeedActiveStatus()==0 && um.getAuthenticationType().getId()==3){  
                       if(um.getLicenseDetail().getId()!=0 && (um.getAuthenticationType().getId()==3 ||  um.getAuthenticationType().getId()==7)){ %>
                        <li class="sub-li"><a href="<%= request.getContextPath() %>/admin_showActivateMobileToken.action?a=user">Activate &nbsp;Token </a></li>
                        <% 
                        }
                       else if(um.getLicenseDetail().getId()!=0 && um.getAuthenticationType().getId()==6 && new PropertyFileUtility().fetchPropertyFileAttribute("show.bio.qr.code").trim().equalsIgnoreCase("true")){ %>
                       <li class="sub-li"><a href="<%= request.getContextPath() %>/admin_showActivateMobileToken.action?a=user">Activate &nbsp;Token </a></li>
                       <% 
                    	   
                       }
                       
                    }
                      catch(Exception e)
                      {
                    	  e.printStackTrace();
                      }
                      %>
                        <% try{
                         if(roleMap.get(ApplicationConstants.MODIFY_DB_COONECTION_PERMISSION).contains(Integer.toString(admin))){
                         if(!dsType.equalsIgnoreCase("xls")&&(!dsType.equalsIgnoreCase("xlsx")&&(!dsType.equalsIgnoreCase("csv")&&(dsId!=0)))){
                         %>
                        <li class="sub-li"><a href="<%= request.getContextPath() %>/admin_showModifyDatabaseConnection.action?a=user">Modify Connection</a></li>
                        <% }
                         }
								 }
                                catch(Exception exception)
                                {
                                	exception.printStackTrace();
                                }%> 
					</ul>
				</li>
				
				
				<% } %>
				<%
				try{
                            if(roleMap.get("administration").contains(Integer.toString(admin))){%>
				<li class="has-sub">
					<a href="javascript:;" data="administration" class="">
					<span class="icon-box"><i class="icon-group"></i></span> Administration
					<span class="arrow"></span>
					</a>
					<ul class="sub">
					<li class="sub-li"><a href="admin_showManageAdministration?a=administration">Manage Admin</a></li>
					<% if(SessionUtil.getRole().getId()==1||SessionUtil.getRole().getId()==2||SessionUtil.getRole().getId()==3){ %>
						
						<li class="sub-li"><a href="admin_showManageRadius?a=administration">Manage Radius</a></li>
						<% } %>
						
						<% 
						/**
				    	 * @author Abhimanyu
				    	 * Below functionality added by Reliance
				    	 * 
				    	 */
						if(SessionUtil.getRole().getId()==3){ %>
						
						<li class="sub-li"><a href="admin_showTilesData.action?a=administration">Tiles Management</a></li>
						<% } %>
						
					<% if(SessionUtil.getRole().getId()==1||SessionUtil.getRole().getId()==2 || SessionUtil.getRole().getId()==3 || SessionUtil.getRole().getId()==4 ){ %>
						
					<% if(SessionUtil.getRole().getId()==1||SessionUtil.getRole().getId()==2){ %>
						 <li class="sub-li">
                     <a  href="admin_showResync.action?a=administration" >
                        Resync Server
                       
                    </a>
                   </li>
                   <li class="sub-li">
                     <a  href="admin_showPush.action?a=administration">
                        Push Server
                        
                    </a>
                   </li>
                   
                   <li class="sub-li">
                     <a  href="admin_showRedis.action?a=administration">
                        Redis Server
                        
                    </a>
                   </li>
                   
                  <li class="sub-li">
                     <a  href="admin_showInsertGeoFile.action?a=administration">
                       Insert Geo File
                        
                    </a>
                   </li>
                   
                   <li class="sub-li">
                     <a  href="admin_showInsertBlacklistIpFile.action?a=administration">
                       Insert Blacklist IP
                        
                    </a>
                   </li>
                   
                   
                    <li class="sub-li">
                     <a  href="admin_showUserDeviceDetails.action?a=administration">
                       User Device Details
                        
                     </a>
                   </li>
                   
                    <li class="sub-li">
                     <a  href="admin_showLDAPUserSearch.action?a=administration">
                       LDAP / AD User Search
                        
                     </a>
                   </li>
                   
                   <li class="sub-li">
                     <a  href="admin_showMailTemplate.action?a=administration">
                        Mail Template
                        
                    </a>
                   </li>
                   
                   <li class="sub-li">
                     <a  href="admin_showProperties.action?a=administration">
                        Manage Properties
                        
                    </a>
                   </li>
                   <%if(whiteListDeviceFlag.equalsIgnoreCase("true")){ %>
                   <li class="sub-li">
                     <a  href="admin_showManageWhiteListed.action?a=administration">
                        Manage Device Whitelisting
                        
                    </a>
                   </li>
                   <%} %>
                 <!--   <li class="sub-li">
                     <a  href="admin_showCustomAuthInfo.action?a=administration">
                        Manage Custom Auth Properties
                        
                    </a>
                   </li> -->
                   
                       <li class="sub-li">
                     <a  href="admin_showU2fRegistrationForm.action?a=administration">
                        U2f Registration
                        
                    </a>
                   </li>
                   
                  <!--  <li class="sub-li">
                     <a  href="admin_u2fRegistration.action?a=administration">
                        Register U2f Device
                        
                    </a>
                   </li>
                   
                   <li class="sub-li">
                     <a  href="admin_u2fAuthenticate.action?a=administration">
                        Authenticate U2f Device
                        
                    </a>
                   </li> -->
                   
                   <li class="sub-li">
                     <a  href="admin_showTilesData.action?a=administration">
                        Tiles Management
                        
                    </a>
                   </li>
                   
                    <li class="sub-li">
                     <a  href="admin_showResetPassword.action?a=administration">
                        Reset Password
                        
                    </a>
                   </li>
                   
					<% } else if(SessionUtil.getRole().getId()==3||SessionUtil.getRole().getId()==4) {%>
                   		    <li class="sub-li"><a  href="admin_showUserDeviceDetails.action?a=administration">User Device Details</a>
                   </li>
					<% } %>		
                   			
					<% } %>		
					</ul>
				</li>
				
				 <% }
                               }catch(Exception exception)
                                {
                                	exception.printStackTrace();
                                }%>
                                
                                <%
				try{
                            if(roleMap.get("tokens").contains(Integer.toString(admin))){%>
				<li class="has-sub">
	               <a href="javascript:;" data="tokens" class="">
	               <span class="icon-box"><i class="icon-folder-open"></i></span> Tokens
	               <span class="arrow"></span>
	               </a>
	               <ul class="sub">
	               <li class="sub-li"><a href="<%= request.getContextPath() %>/token_showTokenManager.action?a=tokens">Manage Tokens</a></li>
	                
							
	               </ul>
	            </li>
	             <% }
                               }catch(Exception exception)
                                {
                                	exception.printStackTrace();
                                }%>
                                
                                  <%
				try{
                            if(roleMap.get("policy").contains(Integer.toString(admin))){%>
				<li class="has-sub">
					<a href="javascript:;" data="policy" class="">
					<span class="icon-box"><i class="icon-th-list"></i></span> Policy
					<span class="arrow"></span>
					</a>
                    <ul class="sub">
                    <% if(role!= 7) { %>
                        <li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showCommonPolicy.action?a=policy">Common Policy</a></li>
                         <li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showHardOfflinePolicy.action?a=policy">Offline Policy</a></li>
                           <li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showEmergencyPolicy.action?a=policy">Emergency Policy</a></li>
                           <li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showTokenActivationPolicy.action?a=policy">Token Activation Policy</a></li>
						<li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showLockOutAttemptPolicy.action?a=policy">LockoutAttempt Policy</a></li>
						<!-- <li><a href="<%= request.getContextPath() %>/policy_showCountryPolicy.action?a=policy">Country Policy</a></li>  -->	
						<li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showNTPolicy.action?a=policy">Network Time Policy</a></li>	
						<li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showTokenRevalidationPolicy.action?a=policy">Token Revalidation Policy</a></li>												
						<li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showAssignPolicy.action?a=policy">Assign Policy</a></li>
						<li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showAssignCountryPolicy.action?a=policy">Assign Country Policy</a></li>
						<li><a href="<%= request.getContextPath() %>/policy_showCountryViolationPolicy.action?a=policy">Country Violation Policy</a></li>
								<% } else { %>	
							<li class="sub-li"><a href="<%= request.getContextPath() %>/policy_showAssignCountryPolicy.action?a=policy">Assign Country Policy</a></li>	
                   		<% } %>
                    </ul>
				</li>
				 <% }
                               }catch(Exception exception)
                                {
                                	exception.printStackTrace();
                                }%>
                                
                                
                                
				
                               
                                <%
				try{
                            if(roleMap.get("reports").contains(Integer.toString(admin))){%>
								<li class="has-sub">
                    <a href="javascript:;" data="reports" class="">
                        <span class="icon-box"><i class="icon-book"></i></span> Reports
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub">
                    <!--  <li><a href="<%-- request.getContextPath() --%>/report_showManageReport.action">Manage Report </a></li> -->
                       <li class="sub-li"><a href="<%= request.getContextPath() %>/report_showTurnAroundTimeReport.action?a=reports">Turn Around Time</a></li>
							<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showUserAttemptReportInitial?a=reports">User Attempts </a></li>													
							
							 <li class="sub-li"><a href="<%= request.getContextPath() %>/report_showNeverUserAuthenticationReport.action?a=reports">NotLoggedIn</a></li>
							<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showAllDomainTokenDetailReport.action?a=reports">Token Detail</a></li>
						<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showUserSummaryReport.action?a=reports">User Summary Report </a></li>
                        <li class="sub-li"><a href="<%= request.getContextPath() %>/report_showTokenStockReport.action?a=reports">Token Stock </a></li>
                         <li class="sub-li"><a href="<%= request.getContextPath() %>/report_showAuthenticationReport.action?a=reports">Application vs Authentication Type </a></li>
							<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showLockedUnlockedUsersRreport.action?a=reports">Locked/Unlocked User</a></li>
							<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showDenyByCountryReport.action?a=reports">Deny By Country</a></li>
							<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showDenyByUserReport.action?a=reports">Deny By User</a></li>
							<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showUserEnrollmentReport.action?a=reports">User Enrollment Report</a></li>
							<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showBioEnrollmentReport.action?a=reports">Bio Enrollment Report</a></li>
					 	<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showTokenExpiryReport.action?a=reports">Token Expiry Report</a></li>	
                   	<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showUsersLogsReport.action?a=reports">User Logs Report</a></li>
                   	<li><a href="<%= request.getContextPath() %>/report_showCountryViolationReport.action?a=reports">Country Violation</a></li>
                   		<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showCountryLogsReport.action?a=reports">Country Policy Logs Report</a></li>
                   		<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showDeviceDetailsReport.action?a=reports">Device Details Report</a></li>
                   		<li class="sub-li"><a href="<%= request.getContextPath() %>/report_showSchedulerLogReport.action?a=reports">Scheduler Logs Report</a></li>
                   		  <li class="sub-li"><a href="<%= request.getContextPath() %>/report_showDaAdminLogReport.action?a=reports">DA Logs Report</a></li> 
                    <li class="sub-li"><a href="<%= request.getContextPath() %>/report_showAdminLogsReport.action?a=reports">Admin Logs Report</a></li>
                    
                    </ul>
                </li>
                
                
                
                
                
                
                <%
					  String transactionFlag=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.TRANSACTION_FLAG);
					  if(transactionFlag.equalsIgnoreCase("1"))
					 { %>
                
                	<li class="has-sub">
                    <a href="javascript:;" data="transaction" class="">
                        <span class="icon-box"><i class="icon-book"></i></span> Transaction
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub">
                       <li class="sub-li"><a href="<%= request.getContextPath() %>/admin_showTransaction.action?a=transaction">Transaction Mapping</a></li>
                        <li class="sub-li"><a href="<%= request.getContextPath() %>/admin_showTransactionMapping.action?a=transaction">Add Transaction</a></li>
						 </ul>
                </li>
                
                  <%} %>
                
                 <% }
                               }catch(Exception exception)
                                {
                                	exception.printStackTrace();
                                }%>
              
					 <%-- //try block if database doesn't contain 'helpdesk'
                                 try{
                                	
                                 if(roleMap.get(ApplicationConstants.RESYNCSERVERCLOCK_PERMISSION).contains(Integer.toString(admin))){--%><!--
                                
                    <li class="has-sub">
                     <a data="resyncServer" href="<%--= request.getContextPath() --%>/admin_showResync.action?a=resyncServer" class="">
                        <span class="icon-box"><i class="icon-move"></i></span> Resync Server
                        <span class="arrow"></span>
                    </a>
                   </li>
                   <li class="has-sub">
                     <a data="pushServer" href="<%--= request.getContextPath() --%>/admin_showPush.action?a=pushServer" class="">
                        <span class="icon-box"><i class="icon-move"></i></span> Push Server
                        <span class="arrow"></span>
                    </a>
                   </li>
                    --><%-- }
                               }
                          catch(Exception exception)
                          {
                          	exception.printStackTrace();
                          }
                          --%>
			</ul>
			<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Modal header</h3>
	</div>
	<div id="mBody" class="modal-body">
		wait..
	</div>
	<div class="modal-footer">
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>
<input type="hidden" id="loginPage" /> 

</body>

<script type="text/javascript">
	 $(document).ready(function()
	{	
	
 	var param = getParameterByName("a");
 	 
	if(param!=undefined && param!="")
	{
		if(param!='dashboard' && param!='')
		{	
			
			$('#sidebar > ul.sidebar-menu > li').removeClass("active");
		}
		
		$(".arrow","#sidebar .has-sub > a[data="+param+"]").addClass("open");
		$("#sidebar .has-sub > a[data="+param+"]").parent().addClass("open").addClass("active");
		$("#sidebar .has-sub > a[data="+param+"]").next().slideDown();
		
	} 
	
		
		});
		
function getParameterByName( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
</script>
</html>