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
	
	<script src="<%= request.getContextPath() %>/web/js/custom/properties.js" type="text/javascript"></script>
	
	
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
<body class="fixed-top popupbox-style">
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
						Administrative
					  </h3>
					   <ul class="breadcrumb">
						   <li>
							 <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
						   </li>
						   <li>
							 <a href="#">Admin</a> <span class="divider">&nbsp;</span>
						   </li>
						   <li><a href="<%= request.getContextPath() %>/admin_showProperties.action?a=administration">Manage Properties</a><span class="divider-last">&nbsp;</span></li>
					  <button class="btn btn-primary pull-right marl10" id="update" onclick="getEncryptedText()"> <span id="updateProperty" class="icon-large"></span> &nbsp;&nbsp; Encrypt Text </button>&nbsp;&nbsp;
					  <button class="btn btn-primary pull-right" id="updatePropertiesFileBtn" onclick="updatePropertiesFile()"> <span id="updatePropertyFileLoading" style="display: none;"class="icon-spinner icon-spin icon-large"></span> &nbsp;&nbsp; Update Application.properties file </button>
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
									   <h4><i class="icon-retweet"></i> Manage Properties</h4>
									     <span class="tools">
                            <a href="javascript:;" class="icon-chevron-up" id="downid" onclick="customDown()" ></a>
                           <a href="javascript:;" class="icon-remove" onclick="customRemove()"></a> 
                        </span>
									</div>
									<div  id="showPropertiesId">
									</br>
						<div class="widget-title">
							<h4> Qr Code</h4>
									     <span class="tools">
                          
                        </span>
					</div>
					<form action="#" onsubmit="return blockFormSubmitRequest()" id="redius_form" class="form-horizontal">
									<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Qr Host Ip"></img>
															qr.host
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
																<input id="qr_host" type="text"  />
																
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Qr host port"></img>
															qr.host.port
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
																<input id="qr_host_port" type="text"  />
																
															</div>
														</div>
														
								
												</div>		
												
												<div class="span6">
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="SSL/http"></img>
															secure.flag
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="secure_flag" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="To fetch Public Server ip"></img>
															public.server.ip
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="public_server_ip" type="text"  />
															
															</div>
														</div>
														
												</div>				
														
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>
								</br>	
								<div class="widget-title">
							<h4> Mail Properties</h4>
									     <span class="tools">
                           
                        </span>
					</div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															mail.transport.protocol
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mail_transport_protocol" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															mail.smtp.host
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mail_smtp_host" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															email.server.type
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="email_server_type" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Sender password"></img>
															sender.password
																<span class="help-inline red_color"></span>
															</label>
															<div class="span5">
															<input id="sender_password" type="password"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Sender Mail"></img>
															sender.email
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="sender_email" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="All admins mail ids to receive server status logs"></img>
															superadmin.admin.mails
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="superadmin_admin_mails" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="For sending sms/mail or both to sms token and secure login panel"></img>
															mime.type
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mime_type" type="text"  />
															
															</div>
														</div>
														
														
								
												</div>		
												
												<div class="span6">
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															mail.smtp.socketFactory.port
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mail_smtp_socketFactory_port" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															mail.smtp.port
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mail_smtp_port" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															mail.smtp.auth
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mail_smtp_auth" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															server.ip
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="server_ip" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															user.login
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="user_login" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Username for mail"></img>
															mail.user.name
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mail_user_name" type="text"  />
															
															</div>
														</div>
														
														
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>	
									
									
										</br>	
								<div class="widget-title">
							<h4></i> Mail Template URL's</h4>
									     <span class="tools">
                           
                        </span>
					</div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
													
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Itunes apk's url for mail template"></img>
															mobile.ios.path
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mobile_ios_path" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Android Play store apk's url for mail template"></img>
															mobile.android.path
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mobile_android_path" type="text"  />
															
															</div>
														</div>
											
														
														
								
												</div>		
												
												<div class="span6">
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Blackberry store apk's url for mail template"></img>
															mobile.blackberry.path
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mobile_blackberry_path" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Windows store apk's url for mail template"></img>
															mobile.windows.path
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mobile_windows_path" type="text"  />
															
															</div>
														</div>
														
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>
									
									
									</br>	
								<div class="widget-title">
							<h4></i> XMPP Server Properties</h4>
									     <span class="tools">
                           
                        </span>
					</div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
													
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															xmpp.server.ip
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="xmpp_server_ip" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															xmpp.server.port
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="xmpp_server_port" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															xmpp.server.qr.ip
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="xmpp_server_qr_ip" type="text"  />
															
															</div>
														</div>
														
														
								
												</div>		
												
												<div class="span6">
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															xmpp.server.qr.port
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="xmpp_server_qr_port" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															xmpp.server.user
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="xmpp_server_user" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															xmpp.server.password
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="xmpp_server_password" type="password"  />
															
															</div>
														</div>
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>	
					
								
								
									</br>	
								<div class="widget-title">
							<h4></i> Scheduler Properties</h4>
									     <span class="tools"></span>
					         </div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
													
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Country policy scheduler to send mails"></img>
															country.policy.notification.schedular.user
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="country_policy_notification_schedular_user" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Seed re-provisioning notification to user based on the days 3,2,1"></img>
															reprovisioning.seed.schedular.notification.days
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="reprovisioning_seed_schedular_notification_days" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Scheduler to send push notification on seed re-provisioning "></img>
															reprovisioning.seed.schedular.notification
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="reprovisioning_seed_schedular_notification" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Scheduler to update employee Id on user_detail table"></img>
															update.employeeid.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="update_employeeid_schedular" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Scheduler to verify LDAP password"></img>
															verify.ldap.password
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="verify_ldap_password" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Country policy expiration time interval in chronical order in minutes"></img>
															country.policy.expired.alert.interval
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="country_policy_expired_alert_interval" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Schedular counter to check server"></img>
															push.server.check.counter
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="push_server_check_counter" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Schedular counter to check server"></img>
															mysql.server.check.counter
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="mysql_server_check_counter" type="text"  />
															
															</div>
														</div>
														
																<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Schedular counter to check server"></img>
															ntp.server.check.counter
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="ntp_server_check_counter" type="text"  />
															
															</div>
														</div>
														
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Delete data from log_detail table according to no of days"></img>
															log.report.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="log_report_schedular" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Server Status scheduler"></img>
															server.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="server_schedular" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="It will take the backup of MFID database at below scheduler time"></img>
															database.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="database_schedular" type="text"  />
															
															</div>
														</div>
														
															<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Delete Redis Key and value from the server at which Redis is configured"></img>
															redis.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="redis_schedular" type="text"  />
															
															</div>
														</div>
														
														
														
								
												</div>		
												
												<div class="span6">
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Scheduler to update seed based on expiration on token revalidation policy"></img>
															reprovisioning.seed.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="reprovisioning_seed_schedular" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Mail to inform that Country policy is going to be expired"></img>
															country.policy.expired.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="country_policy_expired_schedular" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Time interval to delete country policy entry from country_policy_mapping based on the time"></img>
															country.policy.expired.schedular.interval
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="country_policy_expired_schedular_interval" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Country policy scheduler to send mails"></img>
															country.policy.notification.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="country_policy_notification_schedular" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Mail ids in which country policy violation detail will be send"></img>
															country.superadmin.admin.mails
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="country_superadmin_admin_mails" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Country Policy time interval to send mail"></img>
															country.policy.time.interval
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="country_policy_time_interval" type="text"  />
															
															</div>
														</div>
														
														
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Scheduler to delete country policy entry from country_policy_mapping based on the time"></img>
															user.country.policy.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="user_country_policy_schedular" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Schedular counter to check server"></img>
															radius.server.check.counter
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="radius_server_check_counter" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Schedular counter to check server"></img>
															redis.server.check.counter
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="redis_server_check_counter" type="text"  />
															
															</div>
														</div>
														
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Delete data from log_detail table according to no of days"></img>
															log.report.days
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="log_report_days" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Dashboard will show the data of last 7 days"></img>
															dashboard.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="dashboard_schedular" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Read the file from the location mfid_logs folder at below scheduler time"></img>
															fileRead.schedular
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="fileRead_schedular" type="text"  />
															
															</div>
														</div>
														
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>	
									
									
									
									
									
									
									
								
									
					
									
								
									
									
									</br>	
								<div class="widget-title">
							<h4> SMS Properties</h4>
									     <span class="tools">
                          
                        </span>
					</div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
													
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															smsUtil.sourceAddr
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="smsUtil_sourceAddr" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															bindParameter.systemId
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="bindParameter_systemId" type="text"  />
															
															</div>
														</div>
														
														
														
														
														
								
												</div>		
												
												<div class="span6">
													<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															bindParameter.password
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="bindParameter_password" type="password"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="write your comment here"></img>
															bindParameter.systemType
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="bindParameter_systemType" type="text"  />
															
															</div>
														</div>	
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>	
									
									
									
									</br>
									
									
											<div class="widget-title">
							<h4> Default Country Policy Properties</h4>
									     <span class="tools">
                          
                        </span>
					</div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
													
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Default country policy using at the time of assignment"></img>
															default.user.country.policy
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="default_user_country_policy" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Default country policy using at the time of assignment"></img>
															default.from.timestamp
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="default_from_timestamp" type="text"  />
															
															</div>
														</div>
												
												</div>		
												
												<div class="span6">
													<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Default country policy using at the time of assignment"></img>
															default.to.timestamp
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="default_to_timestamp" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Maximum number of allowed country for Country policy"></img>
															maximum.countries.allowed
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="maximum_countries_allowed" type="text"  />
															
															</div>
														</div>
														
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>	
									
									
									
									</br>
									
									
									
									<div class="widget-title">
							<h4> Login Properties</h4>
									     <span class="tools">
                          
                        </span>
					</div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
													
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="login source for Admin/User panel"></img>
															login.auth
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="login_auth" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="For login into user panel"></img>
															user.secure.organisation
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="user_secure_organisation" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="For login into user panel"></img>
															user.secure.application
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="user_secure_application" type="text"  />
															
															</div>
														</div>
												
												</div>		
												
												<div class="span6">
													<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Default ad domain at the time of import"></img>
															user.domain
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="user_domain" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="For login into user panel"></img>
															user.secure.domain
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="user_secure_domain" type="text"  />
															
															</div>
														</div>
														
														
														
														
														
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>	
									
									
									
									</br>
									
									
									<div class="widget-title">
							<h4> AD Properties</h4>
									     <span class="tools">
                          
                        </span>
					</div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
													
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Ad server ip with port"></img>
															ad.server
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="ad_server" type="text"  />
															
															</div>
														</div>
														
												
												</div>		
												
												<div class="span6">
													<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="AD base dn"></img>
															ad.base.dn
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="ad_base_dn" type="text"  />
															
															</div>
														</div>
														
														
													
														
														
														
														
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>	
									
									
									
									</br>
									
									
									<div class="widget-title">
							<h4> LDAP Properties</h4>
									     <span class="tools">
                          
                        </span>
					</div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
													
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Ldap filter"></img>
															ldap.filter
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="ldap_filter" type="text"  />
															
															</div>
														</div>
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Ldap defaut domain (for exp abc.com)"></img>
															ldap.default.domain
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="ldap_default_domain" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Admin name for LDAP"></img>
															usersearch.admin.name
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="usersearch_admin_name" type="text"  />
															
															</div>
														</div>
														
														
														<div class="control-group ">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="User search domain"></img>
															usersearch.domain
																<%-- <span class="help-inline red_color">*</span> --%>
															</label>
															<div class="span5">
															<input  id="usersearch_domain" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group mb10">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Configuration for mutli ldap server and use comma ',' for multiple ldap server ip and if you want disable then set ldap.multi.server.ip=no"></img>
															ldap.multi.server.ip
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input  id="ldap_multi_server_ip" type="text"  />
															
															</div>
														</div>
														
														
												
												</div>		
												
												<div class="span6">
													<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Ldap server ip with port"></img>
															ldap.server
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="ldap_server" type="text"  />
															
															</div>
														</div>
														
														
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Multi domain flag if ldap has multiple domain then flag will be true else false"></img>
															ldap.multidomain.flag
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input  id="ldap_multidomain_flag" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group mb0">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Ldap password"></img>
															usersearch.admin.password
																<span class="help-inline red_color">*</span>
																</label>
															<div class="span5">
															<input type="password" id="usersearch_admin_password" type="text"  />
															
															</div>
															
															
														</div>
														
														<p class="notecss col-sm-12"> <i>(Please enter the encrypted value using above encrypt text button.)</i></p>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="SSL flag for LDAP/AD"></img>
															secure.login.ssl.flag
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input  id="secure_login_ssl_flag" type="text"  />
															
															</div>
														</div>
														
														
														
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
											</div>
										</div>
									</div>	
									
									
									
									</br>
									
									
										
								<div class="widget-title">
							<h4> Miscellaneous Properties</h4>
									     <span class="tools">
                          
                        </span>
					</div>	
								<div class="widget-body">
										<div class="tab-content">
											<div class="span12 ">				
												<div style="border:1px solid #ddd; padding:20px;">
													
													
													<div class="span6">
													
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Protocol type"></img>
															protocol.type
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="protocal_type" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Open fire local host IP"></img>
															openfire.localhost.ip 
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
																<input id="openfire_localhost_ip" type="text"  />
																
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="SMS expiration time to activate push token"></img>
															sms.key.expire.time 
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
																<input id="sms_key_expire_time" type="text"  />
																
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="employeeID attribute to get employeeId"></img>
															employeeid.attribute 
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
																<input id="employeeid_attribute" type="text"  />
																
															</div>
														</div>
														
											           <div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Deny notification time interval using in NIC"></img>															
															deny.notification.time.interval 
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
																<input id="deny_notification_time_interval" type="text" />
																
															</div>
														</div>
														
														
														
														
														
														
												</div>		
												
												<div class="span6">
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Connection Host"></img>
															connection.host
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="connection_host" type="text"  />
															
															</div>
														</div>
														
														<div class="control-group">
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Activation key expiration time on user login panel"></img>
															qrcode.activation.key.expire.time
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="qrcode_activation_key_expire_time" type="text"  />
															
															</div>
														</div>
														
														
													
															<div class="control-group">
															
															<label class="span7">
															<img src="<%=request.getContextPath() %>/web/img/idea.png" title="Number of allowed devices to activate push token"></img>
															allow.device.no
																<span class="help-inline red_color">*</span>
															</label>
															<div class="span5">
															<input id="allow_device_no" type="text"  />
															
															</div>
														</div>	
														
														
												</div>				
														<div class="clearfix"></div>
													
												</div>
												</br>
												<button  class="btn btn-primary pull-right" onclick="return updateProperties()">Submit </button>
											</div>
											
											
										</div>
										
									</div>	
									
										
									
									</form>
									
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
				
				
				 
				   
				            
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
	
	<div id="dialog" title="Encrypt Text">
  <div class="control-group" style="margin: 0; overflow: hidden;">
		<label class="span7 dialog-label-style">
		<span class="fl-l">Enter Text</span>
		<span class="help-inline red_color fl-widt5">*</span>
					</label>
						<div class="span5 dialog-input-style">
									<input placeholder="Enter text" id="textId" type="text"  />
						</div>
						</div>
						<button  class="btn btn-primary btn-enrypt" onclick="encryptText()">Enrypt </button>
          <div class="control-group" style="overflow: hidden;">
		<label class="span7 dialog-label-style">
		<span class="fl-l">Encrypted Text</span>
		
					</label>
						<div class="span5 dialog-input-style">
									<input readonly id="encryptedTextId" type="text" placeholder="Encrypted Text" />
									<img  class="center" onclick="copyText()" src="<%=request.getContextPath() %>/web/img/copyFile.png" title="Copy encrypted text"></img>
						</div>
						</div>	
						
										
</div>



<div id="dialogSyncFile" title="Sync Application.properties file" >
<%
String[] multiMfidServerIpsArray=null;
int multiMfidServerIpsCounts=0;
try{
	 String multiMfidServerIps=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.MULTI_MFID_SERVER_IP);
	 System.out.println("multiMfidServerIps======="+multiMfidServerIps);
	 multiMfidServerIpsArray=multiMfidServerIps.split(",");
	 multiMfidServerIpsCounts=multiMfidServerIpsArray.length;
   System.out.println("multiMfidServerIpsCounts ======="+multiMfidServerIpsCounts);
   multiMfidServerIpsCounts=multiMfidServerIpsCounts+1;
}
catch(Exception e)
{
	e.printStackTrace();	
}

%>
 <div style="height: <%=multiMfidServerIpsCounts<=4?multiMfidServerIpsCounts*100:400%>px; overflow: auto;">
 <center>
 <table> 
  
  <tr >
   <td rowspan="<%=multiMfidServerIpsCounts%>" width="25%"> <img src="<%=request.getContextPath() %>/web/img/server_logo.png" alt="" height="150" width="150"> 
   <br/> <b>Current properties <br/> file changes.</b>
 
   </td>
     <td rowspan="<%=multiMfidServerIpsCounts%>" width="35%"><center><div id="serverSyncLoaderStatus"> <img src="<%=request.getContextPath() %>/web/img/server_sync_loading.gif" alt=""></div></center></td>
     <td width="50%"></td>
   </tr>
   
   
   <%
  try{ 
   if(multiMfidServerIpsArray !=null){
   for(String mfidIp : multiMfidServerIpsArray){
   %>
    <tr>
    <td width="50%" ><img src="<%=request.getContextPath() %>/web/img/server_logo_default.png" alt="" id="serverImg<%=mfidIp.replace(".", "_")%>" height="70" width="100">
    </br><b> Server Ip : <%=mfidIp%> </b><br/></td>
   </tr>
   <%}}}
   catch(Exception e){}%>
  
   
</table>
</center>
  <br/><br/>
</div>						
										
</div>
	    	<div id="myModal1" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Sync Parameter Name</h3>
	</div>
	<div id="mBodyDataSync" class="modal-body"> 
	 
 
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="syncPropertiesFilesData()">Submit</button>
		 <button class="btn" data-dismiss="modal" onclick="closePropertiesForm()" aria-hidden="true">Close</button> 
		
	</div>
</div>
 <style>
 table#sample_editable_4 tbody tr td input[type="checkbox"] {
    float: left;
    margin: 3px 5px;
}

table#sample_editable_4 tbody tr td b {
    float: left;
}
 </style>
<!-- BEGIN JAVASCRIPTS -->
	<!-- Load javascripts at bottom, this will reduce page load time -->
  <!-- <script src="js/jquery-1.8.3.min.js"></script>-->
   <%-- <script src="<%= request.getContextPath() %>/web/js/jquery-1.7.1.min.js"></script> --%>
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
   
   <!-- BEGIN PAGE LEVEL PLUGINS -->
   <script src="<%= request.getContextPath() %>/web/assets/dropzone/dropzone.js"></script>
   <!-- END PAGE LEVEL PLUGINS -->
   
   
<!-- For Datatable (searching)-->   
<%-- <script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js" type="text/javascript"></script> --%>
<script src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js" type="text/javascript"></script>
<!-- End For Datatable (searching)--> 

   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
   
  
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/jquery-confirm.js"></script> 
   <script src="<%= request.getContextPath() %>/web/js/jquery-confirm.min.js"></script>
    <script>
   jQuery(document).ready(function() { 
      
   
         // initiate layout and plugins
         App.init();
		TableEditable.init();
		$("#dialog").hide();
		$("#dialogSyncFile").hide();
		
		
		 
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
   
      
       jQuery(document).ready(function() { 
      
   
		showProperties();
		
		 
      });
      
      $('#myModal').on('shown.bs.modal', function (e){


resyncClock();


	
});  
     	
      
 
      function updatePropertiesFile()
      {
    	 
    	  $("#updatePropertyFileLoading").show();
    	  $("#updatePropertiesFileBtn").prop("disabled",true);
    	  $.post( "<%= request.getContextPath() %>/requestSession_updateApplicationPropertyFile.action", function( data ) {
    		 if(data == '')
    		  alert("Property fields already updated.");
    		 else{
    		 
    			  var multiServerIp='<%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.MULTI_MFID_SERVER_IP)%>';
    			 if(multiServerIp.toLowerCase() == 'no')
    				 alert("Property fields has been updated.  ("+data+")"); 
    			 else
    				 {
    				   if(data.indexOf("multi.mfid.server.ip") != -1)
    				   $('#dialogSyncFile').load(document.URL +  ' #dialogSyncFile');
    			       $("#dialogSyncFile").
    				    dialog().
      					dialog('option','width','600px').
      					dialog('option','height','auto');	
    			     
    			       var dataArray = data.split(',');
    			       var arrayLength = dataArray.length;
    			       var showDialogDataOption = '	 <table  id="sample_editable_4">'
    			    	   showDialogDataOption +='  <tr><td style=" font-size: 15px;"><input type="checkbox" class="group-checkable" data-set="#sample_editable_4 .checkboxes" /> <b>Select All</b> '
    			    		
    			    		   for (var i = 0; i < arrayLength; i++)
    			    		   { showDialogDataOption  +=' <tr><td style="font-size: 15px;" > <input type="checkbox" name="syncDatacolumn" class="checkboxes" value="'+dataArray[i]+'" />  '+dataArray[i]+' </td></tr> '
    			    		   }  
    			    	   
    			    	   showDialogDataOption +=' </table>';
    			    	   
    			    	    $("#mBodyDataSync").html(showDialogDataOption);
    			    		$('#myModal1').modal('show');             
    			    		//$("#serverSyncLoaderStatus").html('<img src="<%=request.getContextPath() %>/web/img/server_sync_loading.gif" alt="">');
    				 }
    			 
    			 
    		 }
    		 $("#updatePropertyFileLoading").hide();
    		 $("#updatePropertiesFileBtn").prop("disabled",false);
    		});
    	  
      }
      
  
      function syncPropertiesFilesData()
      {
    	 
    	 
    		var syncDatacolumn = $.map(
    				$('input[name="syncDatacolumn"]:checked'), function(c) {
    					return c.value;
    				})
    		if (syncDatacolumn == "" || $.trim(syncDatacolumn) == "") {
    			alert("please select at least one column for sync. ");
    			return true;
    		}
    		else
    			{
    		 $("#serverSyncLoaderStatus").html('<img src="<%=request.getContextPath() %>/web/img/server_sync_loading.gif" alt="">');
    		   $('#myModal1').modal('hide');   
      		    $.post( "<%= request.getContextPath() %>/otp_updatePropertiesFileInfo.action?updateParameter="+syncDatacolumn, function( data ) {
      	     		 data =data.replace("[", "").replace("]","");
      	     	  var dataArray = data.split(',');
      	     	  var arrayLength = dataArray.length;
      	     	  for (var i = 0; i < arrayLength; i++)
	    		  	$("#serverImg"+$.trim(dataArray[i]).split('_')[0].replace(/\./g,"_")).attr("src", dataArray[i].split('_')[1]=='success'?'<%=request.getContextPath()%>/web/img/server_logo_sucess.png':'<%=request.getContextPath() %>/web/img/server_logo_failed.png');
      	     	   if(data.includes("error"))
        			 $("#serverSyncLoaderStatus").html('<button class="btn btn-primary" onclick="syncPropertiesFilesData()">Re Sync</button>');
        		   else
        			 $("#serverSyncLoaderStatus").html('<b>Successfully <br/> Server Sync</b>');
      	     	 }); 
      		    
      		    
    			}
    		
 
    	  
      }
      

 
      
 
    	$(document).on('click', '.group-checkable', function() {
    	//alert("group checkable");
    		var set = jQuery(this).attr("data-set");
    		//alert(set);
    		var checked = jQuery(this).is(":checked");
    		//alert(checked);
    		$(set).each(function(){
    			$(this).prop('checked', checked);
    		});
    		 
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
    
    function closePropertiesForm()
    {
    	$("#dialogSyncFile").dialog('close'); 
    }
    
  </script>
    <script src="<%= request.getContextPath() %>/web/js/highcharts.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/exporting.js"></script>
  

<!--</s:form>-->
<input type="hidden" name="csrfPreventionSalt" id="csrfPreventionSaltId" value="<%=request.getAttribute("csrfPreventionSalt") %>"/>
</body>




<!-- END BODY -->
</html>