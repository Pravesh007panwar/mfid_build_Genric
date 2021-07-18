function customRemove()
{ $("#showPropertiesId").hide();  
}

function customDown()
{ $("#showPropertiesId").slideToggle("slow",function(){ $("#downid").toggleClass('icon-chevron-down icon-chevron-up');});
 }



function getEncryptedText(){
	try{
		$('#encryptedTextId').val("");
		$('#textId').val("");
		$("#dialog" ).dialog();		
		
	}catch(e){
		alert(e)
	}
}



function copyText() {
	  /* Get the text field */
	  var copyText = document.getElementById("encryptedTextId");

	  /* Select the text field */
	  copyText.select();

	  /* Copy the text inside the text field */
	  document.execCommand("copy");

	  /* Alert the copied text */
	  alert("Text copied: " + copyText.value);
	}


function encryptText(){
	
	var inputText=document.getElementById("textId").value.trim();
	
	if(inputText==""){
	alert("Please enter text to encrypt.");	
	return false;
	}
	
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	
	var dataString='textToEncrypt='+encodeURIComponent(inputText)+'&csrfPreventionSalt='+encodeURIComponent(strutsToken);
	
	try{
		$.ajax({
				type: "POST",  
				url:"admin_encryptData.action",
				data: dataString,
				dataType:"text",
				async: false,
				success: function(data) {
					
					document.getElementById("encryptedTextId").value=data;
				}
});
		
	}
	catch(e)
	{
		alert(e);
	}
	
}

function showProperties()
{

	try{
	$.ajax({
			type: "POST",  
			url:"admin_showManageProperties.action",
			data: "{}",
			dataType: "text",
			success: function(data) {
				
				var object = JSON.parse(data);
				//alert("JSON.parse(object.getXmppServerIp)===="+JSON.parse(object.getXmppServerIp))
				jQuery('input[id$="qr_host"]').val(JSON.parse(object.getQrHost));
				jQuery('input[id$="qr_host_port"]').val(JSON.parse(object.getQrHostPort));
				jQuery('input[id$="openfire_localhost_ip"]').val(JSON.parse(object.getOpenfireLocalhostIp));
				jQuery('input[id$="xmpp_server_port"]').val(JSON.parse(object.getXmppServerPort));
				
				jQuery('input[id$="xmpp_server_qr_ip"]').val(JSON.parse(object.getXmppServerQrIp));
				jQuery('input[id$="xmpp_server_qr_port"]').val(JSON.parse(object.getXmppServerQrPort));
				jQuery('input[id$="xmpp_server_user"]').val(JSON.parse(object.getXmppServerUser));
				jQuery('input[id$="xmpp_server_password"]').val(JSON.parse(object.getXmppServerPassword));
				
				jQuery('input[id$="secure_flag"]').val(JSON.parse(object.getSecureFlag));
				
				jQuery('input[id$="smsUtil_sourceAddr"]').val(JSON.parse(object.getSmsutilSourceaddr));
				jQuery('input[id$="bindParameter_systemId"]').val(JSON.parse(object.getBindparameterSystemid));
				jQuery('input[id$="bindParameter_password"]').val(JSON.parse(object.getBindparameterPassword));
				jQuery('input[id$="bindParameter_systemType"]').val(JSON.parse(object.getBindparameterSystemtype));
				jQuery('input[id$="mail_transport_protocol"]').val(JSON.parse(object.getMailTransportProtocol));
				jQuery('input[id$="mail_smtp_host"]').val(JSON.parse(object.getMailSmtpHost));
				jQuery('input[id$="email_server_type"]').val(JSON.parse(object.getEmailServerType));
				jQuery('input[id$="mail_smtp_port"]').val(JSON.parse(object.getMailSmtpPort));
				jQuery('input[id$="mail_smtp_auth"]').val(JSON.parse(object.getMailSmtpAuth));
				jQuery('input[id$="server_ip"]').val(JSON.parse(object.getServerIp));
				jQuery('input[id$="xmpp_server_ip"]').val(JSON.parse(object.getXmppServerIp));
				jQuery('input[id$="user_login"]').val(JSON.parse(object.getUserLogin));
				jQuery('input[id$="sender_email"]').val(JSON.parse(object.getSenderEmail));
				jQuery('input[id$="sender_password"]').val(JSON.parse(object.getSenderPassword));
				jQuery('input[id$="connection_host"]').val(JSON.parse(object.getConnectionHost));
				jQuery('input[id$="mail_smtp_socketFactory_port"]').val(JSON.parse(object.getMailSmtpSocketfactoryPort));
				jQuery('input[id$="protocal_type"]').val(JSON.parse(object.getProtocalType));
				
				// added new properties by puneet
				
				jQuery('input[id$="public_server_ip"]').val(JSON.parse(object.getPublicServerIp));
				jQuery('input[id$="superadmin_admin_mails"]').val(JSON.parse(object.getSuperadminAdminMails));
				jQuery('input[id$="mail_user_name"]').val(JSON.parse(object.getMailUserName));
				jQuery('input[id$="mime_type"]').val(JSON.parse(object.getMimeType));
				jQuery('input[id$="mobile_ios_path"]').val(JSON.parse(object.getMobileIosPath));
				jQuery('input[id$="mobile_blackberry_path"]').val(JSON.parse(object.getMobileBlackberryPath));
				jQuery('input[id$="mobile_android_path"]').val(JSON.parse(object.getMobileAndroidPath));
				jQuery('input[id$="mobile_windows_path"]').val(JSON.parse(object.getMobileWindowsPath));
				jQuery('input[id$="country_policy_notification_schedular_user"]').val(JSON.parse(object.getCountryPolicyNotificationSchedularUser));
				jQuery('input[id$="reprovisioning_seed_schedular_notification_days"]').val(JSON.parse(object.getReprovisioningSeedSchedularNotificationDay));
				jQuery('input[id$="reprovisioning_seed_schedular_notification"]').val(JSON.parse(object.getReprovisioningSeedSchedularNotification));
				jQuery('input[id$="update_employeeid_schedular"]').val(JSON.parse(object.getUpdateEmployeeidSchedular));
				jQuery('input[id$="verify_ldap_password"]').val(JSON.parse(object.getVerifyLdapPassword));
				jQuery('input[id$="country_policy_expired_alert_interval"]').val(JSON.parse(object.getCountryPolicyExpiredAlertInterval));
				jQuery('input[id$="push_server_check_counter"]').val(JSON.parse(object.getPushServerCheckCounter));
				jQuery('input[id$="mysql_server_check_counter"]').val(JSON.parse(object.getMysqlServerCheckCounter));
				jQuery('input[id$="ntp_server_check_counter"]').val(JSON.parse(object.getNtpServerCheckCounter));
				jQuery('input[id$="log_report_schedular"]').val(JSON.parse(object.getLogReportSchedular));
				jQuery('input[id$="server_schedular"]').val(JSON.parse(object.getServerSchedular));
				jQuery('input[id$="database_schedular"]').val(JSON.parse(object.getDatabaseSchedular));
				jQuery('input[id$="redis_schedular"]').val(JSON.parse(object.getRedisSchedular));
				jQuery('input[id$="reprovisioning_seed_schedular"]').val(JSON.parse(object.getReprovisioningSeedSchedular));
				jQuery('input[id$="country_policy_expired_schedular"]').val(JSON.parse(object.getCountryPolicyExpiredSchedular));
				jQuery('input[id$="country_policy_expired_schedular_interval"]').val(JSON.parse(object.getCountryPolicyExpiredSchedularInterval));
				jQuery('input[id$="country_policy_notification_schedular"]').val(JSON.parse(object.getCountryPolicyNotificationSchedular));
				jQuery('input[id$="country_superadmin_admin_mails"]').val(JSON.parse(object.getCountrySuperadminAdminMails));
				jQuery('input[id$="country_policy_time_interval"]').val(JSON.parse(object.getCountryPolicyTimeInterval));
				jQuery('input[id$="maximum_countries_allowed"]').val(JSON.parse(object.getMaximumCountriesAllowed));
				jQuery('input[id$="user_country_policy_schedular"]').val(JSON.parse(object.getUserCountryPolicySchedular));
				jQuery('input[id$="radius_server_check_counter"]').val(JSON.parse(object.getRadiusServerCheckCounter));
				jQuery('input[id$="redis_server_check_counter"]').val(JSON.parse(object.getRedisServerCheckCounter));
				jQuery('input[id$="log_report_days"]').val(JSON.parse(object.getLogReportDays));
				jQuery('input[id$="dashboard_schedular"]').val(JSON.parse(object.getDashboardSchedular));
				jQuery('input[id$="fileRead_schedular"]').val(JSON.parse(object.getFilereadSchedular));
				jQuery('input[id$="default_user_country_policy"]').val(JSON.parse(object.getDefaultUserCountryPolicy));
				jQuery('input[id$="default_from_timestamp"]').val(JSON.parse(object.getDefaultFromTimestamp));
				jQuery('input[id$="default_to_timestamp"]').val(JSON.parse(object.getDefaultToTimestamp));
				jQuery('input[id$="sms_key_expire_time"]').val(JSON.parse(object.getSmsKeyExpireTime));
				jQuery('input[id$="employeeid_attribute"]').val(JSON.parse(object.getEmployeeidAttribute));
				jQuery('input[id$="deny_notification_time_interval"]').val(JSON.parse(object.getDenyNotificationTimeInterval));
				jQuery('input[id$="qrcode_activation_key_expire_time"]').val(JSON.parse(object.getQrcodeActivationKeyExpireTime));
				jQuery('input[id$="allow_device_no"]').val(JSON.parse(object.getAllowDeviceNo));
				
				//
				jQuery('input[id$="login_auth"]').val(JSON.parse(object.getLoginAuth));
				jQuery('input[id$="user_secure_organisation"]').val(JSON.parse(object.getUserSecureOrganisation));
				jQuery('input[id$="user_secure_application"]').val(JSON.parse(object.getUserSecureApplication));
				jQuery('input[id$="user_domain"]').val(JSON.parse(object.getUserDomain));
				jQuery('input[id$="user_secure_domain"]').val(JSON.parse(object.getUserSecureDomain));
				jQuery('input[id$="ad_server"]').val(JSON.parse(object.getAdServer));
				jQuery('input[id$="ad_base_dn"]').val(JSON.parse(object.getAdBaseDn));
				jQuery('input[id$="ldap_filter"]').val(JSON.parse(object.getLdapFilter));
				jQuery('input[id$="ldap_default_domain"]').val(JSON.parse(object.getLdapDefaultDomain));
				jQuery('input[id$="usersearch_admin_name"]').val(JSON.parse(object.getUsersearchAdminName));
				jQuery('input[id$="usersearch_domain"]').val(JSON.parse(object.getUsersearchDomain));
				jQuery('input[id$="ldap_server"]').val(JSON.parse(object.getLdapServer));
				jQuery('input[id$="ldap_multidomain_flag"]').val(JSON.parse(object.getLdapMultidomainFlag));
				jQuery('input[id$="usersearch_admin_password"]').val(JSON.parse(object.getUsersearchAdminPassword));
				jQuery('input[id$="secure_login_ssl_flag"]').val(JSON.parse(object.getSecureLoginSslFlag));
				jQuery('input[id$="ldap_multi_server_ip"]').val(JSON.parse(object.getLdapMultiServerIp));
				
				
				
				}
		});
		
	}
	catch(e)
	{
		alert(e);
	}
	}





function updateProperties()
{
	try{
	
	var qr_host=document.getElementById("qr_host").value;
	//alert("qr_host==="+qr_host)
	var qr_host_port=document.getElementById("qr_host_port").value;
	//alert("qr_host_port==="+qr_host_port)
   var openfire_localhost_ip=document.getElementById("openfire_localhost_ip").value;
	//alert("openfire_localhost_ip==="+openfire_localhost_ip)
   var xmpp_server_ip=document.getElementById("xmpp_server_ip").value;
	//alert("xmpp_server_ip==="+xmpp_server_ip)
  var xmpp_server_port=document.getElementById("xmpp_server_port").value;
	//alert("openfire_localhost_ip==="+xmpp_server_port)
  var xmpp_server_qr_ip=document.getElementById("xmpp_server_qr_ip").value;
	//alert("openfire_localhost_ip==="+xmpp_server_qr_ip)
  var xmpp_server_qr_port=document.getElementById("xmpp_server_qr_port").value;
	//alert("openfire_localhost_ip==="+xmpp_server_qr_port)
  var xmpp_server_user=document.getElementById("xmpp_server_user").value;
	//alert("openfire_localhost_ip==="+xmpp_server_user)
 var xmpp_server_password=document.getElementById("xmpp_server_password").value;
	//alert("openfire_localhost_ip==="+xmpp_server_password)
 var secure_flag=document.getElementById("secure_flag").value;
 var smsUtil_sourceAddr=document.getElementById("smsUtil_sourceAddr").value;
 var bindParameter_systemId=document.getElementById("bindParameter_systemId").value;
 var bindParameter_password=document.getElementById("bindParameter_password").value;
 var bindParameter_systemType=document.getElementById("bindParameter_systemType").value;
 var mail_transport_protocol=document.getElementById("mail_transport_protocol").value;
 var mail_smtp_host=document.getElementById("mail_smtp_host").value;
 var email_server_type=document.getElementById("email_server_type").value;
 var mail_smtp_port=document.getElementById("mail_smtp_port").value;
 var mail_smtp_auth=document.getElementById("mail_smtp_auth").value;
 var server_ip=document.getElementById("server_ip").value;
 var user_login=document.getElementById("user_login").value;
 var sender_email=document.getElementById("sender_email").value;
 var sender_password=document.getElementById("sender_password").value;
 var connection_host=document.getElementById("connection_host").value;
 var mail_smtp_socketFactory_port=document.getElementById("mail_smtp_socketFactory_port").value;
 var protocal_type=document.getElementById("protocal_type").value;
 var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
 
 
//new properties added by Puneet vats
 var public_server_ip=document.getElementById("public_server_ip").value;
 var superadmin_admin_mails=document.getElementById("superadmin_admin_mails").value;
 var mail_user_name=document.getElementById("mail_user_name").value;
 var mime_type=document.getElementById("mime_type").value;
 var mobile_ios_path=document.getElementById("mobile_ios_path").value;
 var mobile_blackberry_path=document.getElementById("mobile_blackberry_path").value;
 var mobile_android_path=document.getElementById("mobile_android_path").value;
 var mobile_windows_path=document.getElementById("mobile_windows_path").value;
 var country_policy_notification_schedular_user=document.getElementById("country_policy_notification_schedular_user").value;
 var reprovisioning_seed_schedular_notification_day=document.getElementById("reprovisioning_seed_schedular_notification_days").value;
 var reprovisioning_seed_schedular_notification=document.getElementById("reprovisioning_seed_schedular_notification").value;
 var update_employeeid_schedular=document.getElementById("update_employeeid_schedular").value;
 var verify_ldap_password=document.getElementById("verify_ldap_password").value;
 var country_policy_expired_alert_interval=document.getElementById("country_policy_expired_alert_interval").value;
 var push_server_check_counter=document.getElementById("push_server_check_counter").value;
 var mysql_server_check_counter=document.getElementById("mysql_server_check_counter").value;
 var ntp_server_check_counter=document.getElementById("ntp_server_check_counter").value;
 var log_report_schedular=document.getElementById("log_report_schedular").value;
 var server_schedular=document.getElementById("server_schedular").value;
 var database_schedular=document.getElementById("database_schedular").value;
 var redis_schedular=document.getElementById("redis_schedular").value;
 var reprovisioning_seed_schedular=document.getElementById("reprovisioning_seed_schedular").value;
 var country_policy_expired_schedular=document.getElementById("country_policy_expired_schedular").value;
 var country_policy_expired_schedular_interval=document.getElementById("country_policy_expired_schedular_interval").value;
 var country_policy_notification_schedular=document.getElementById("country_policy_notification_schedular").value;
 var country_superadmin_admin_mails=document.getElementById("country_superadmin_admin_mails").value;
 var country_policy_time_interval=document.getElementById("country_policy_time_interval").value;
 var maximum_countries_allowed=document.getElementById("maximum_countries_allowed").value;
 var user_country_policy_schedular=document.getElementById("user_country_policy_schedular").value;
 var radius_server_check_counter=document.getElementById("radius_server_check_counter").value;
 var redis_server_check_counter=document.getElementById("redis_server_check_counter").value;
 var log_report_days=document.getElementById("log_report_days").value;
 var dashboard_schedular=document.getElementById("dashboard_schedular").value;
 var fileRead_schedular=document.getElementById("fileRead_schedular").value;
 var default_user_country_policy=document.getElementById("default_user_country_policy").value;
 var default_from_timestamp=document.getElementById("default_from_timestamp").value;
 var default_to_timestamp=document.getElementById("default_to_timestamp").value;
 var sms_key_expire_time=document.getElementById("sms_key_expire_time").value;
 var employeeid_attribute=document.getElementById("employeeid_attribute").value;
 var deny_notification_time_interval=document.getElementById("deny_notification_time_interval").value;
 var qrcode_activation_key_expire_time=document.getElementById("qrcode_activation_key_expire_time").value;
 var allow_device_no=document.getElementById("allow_device_no").value;
 
 
 // new added by puneet vats AD/LDAP/LOGIN
 
 var login_auth=document.getElementById("login_auth").value;
 var user_secure_organisation=document.getElementById("user_secure_organisation").value;
 var user_secure_application=document.getElementById("user_secure_application").value;
 var user_domain=document.getElementById("user_domain").value;
 var user_secure_domain=document.getElementById("user_secure_domain").value;
 var ad_server=document.getElementById("ad_server").value;
 var ad_base_dn=document.getElementById("ad_base_dn").value;
 var ldap_filter=document.getElementById("ldap_filter").value;
 var ldap_default_domain=document.getElementById("ldap_default_domain").value;
 var usersearch_admin_name=document.getElementById("usersearch_admin_name").value;
 var usersearch_domain=document.getElementById("usersearch_domain").value;
 var ldap_server=document.getElementById("ldap_server").value;
 var ldap_multidomain_flag=document.getElementById("ldap_multidomain_flag").value;
 var usersearch_admin_password=document.getElementById("usersearch_admin_password").value;
 var secure_login_ssl_flag=document.getElementById("secure_login_ssl_flag").value;
 var ldap_multi_server_ip=document.getElementById("ldap_multi_server_ip").value;
 
 
 	
			 if(qr_host.trim()=="")
			 {
				 alert("Please enter qr.host");
				 return;
			
			 }
			 else if(secure_flag.trim()=="")
			 {
				 alert("Please enter secure.flag");
				 return false;
			 }
			 else if(secure_flag.trim()!=0 && secure_flag.trim()!=1)
			 {
				 alert("secure.flag should be 0 or 1.");
				 return;
			 }
			else if(qr_host_port.trim()=="")
			 {
				 alert("Please enter qr.host.port");
				 return;
			 }
			
			 
			
			else if(xmpp_server_ip.trim()=="")
			 {
				 alert("Please enter xmpp.server.ip ");
				 return;
			 }
			 if(xmpp_server_port.trim()=="")
			 {
				 alert("Please enter xmpp.server.port .");
				 return;
			
			 }
			else if(xmpp_server_qr_ip.trim()=="")
			 {
				 alert("Please enter xmpp.server.qr.ip");
				 return;
			 }
			
			 else if(xmpp_server_qr_port.trim()=="")
			 {
				 alert("Please enter xmpp.server.qr.port");
				 return;
			 }
			
			else if(xmpp_server_user.trim()=="")
			 {
				 alert("Please enter xmpp.server.user");
				 return;
			 }
			else if(xmpp_server_password.trim()=="")
			 {
				 alert("Please enter xmpp.server.password");
				 return;
			 }
			
			
			else if(mail_transport_protocol.trim()=="")
			 {
				 alert("Please enter mail.transport.protocol");
				 return;
			 }
			else if(mail_smtp_host.trim()=="")
			 {
				 alert("Please enter mail.smtp.host");
				 return;
			 }
			else if(email_server_type.trim()=="")
			 {
				 alert("Please enter email.server.type");
				 return;
			 }
			else if(mail_smtp_port.trim()=="")
			 {
				 alert("Please enter mail.smtp.port");
				 return;
			 }
			else if(mail_smtp_auth.trim()=="")
			 {
				 alert("Please enter mail.smtp.auth");
				 return;
			 }
			else if(server_ip.trim()=="")
			 {
				 alert("Please enter server.ip");
				 return;
			 }
			else if(user_login.trim()=="")
			 {
				 alert("Please enter user.login");
				 return;
			 }
			else if(sender_email.trim()=="")
			 {
				 alert("Please enter sender.email");
				 return;
			 }
		 
			
			else if(mail_smtp_socketFactory_port.trim()=="")
			 {
				 alert("Please enter mail.smtp.socketFactory.port");
				 return;
			 }
			
			 
			 
			 
			 // added by puneet vats 
			 
			 
			else if(public_server_ip.trim()=="")
			 {
				 alert("Please enter public.server.ip");
				 return;
			 }
			else if(superadmin_admin_mails.trim()=="")
			 {
				 alert("Please enter superadmin.admin.mails");
				 return;
			 }
			else if(mail_user_name.trim()=="")
			 {
				 alert("Please enter mail.user.name");
				 return;
			 }
			else if(mime_type.trim()=="")
			 {
				 alert("Please enter mime.type");
				 return;
			 }
			else if(mobile_ios_path.trim()=="")
			 {
				 alert("Please enter mobile.ios.path");
				 return;
			 }
			else if(mobile_blackberry_path.trim()=="")
			 {
				 alert("Please enter mobile.blackberry.path");
				 return;
			 }
			else if(mobile_android_path.trim()=="")
			 {
				 alert("Please enter mobile.android.path");
				 return;
			 }
			else if(mobile_windows_path.trim()=="")
			 {
				 alert("Please enter mobile.windows.path");
				 return;
			 }
			else if(country_policy_notification_schedular_user.trim()=="")
			 {
				 alert("Please enter country.policy.notification.schedular.user");
				 return;
			 }
			else if(reprovisioning_seed_schedular.trim()=="")
			 {
				 alert("Please enter reprovisioning.seed.schedular");
				 return;
			 }
			 
			else if(reprovisioning_seed_schedular_notification_day.trim()=="")
			 {
				 alert("Please enter reprovisioning.seed.schedular.notification.days");
				 return;
			 }
			else if(country_policy_expired_schedular.trim()=="")
			 {
				 alert("Please enter country.policy.expired.schedular");
				 $("#country_policy_expired_schedular").focus();
				 return;
			 }
			else if(reprovisioning_seed_schedular_notification.trim()=="")
			 {
				 alert("Please enter reprovisioning.seed.schedular.notification");
				 $("#reprovisioning_seed_schedular_notification").focus();
				 return;
			 }
			else if(country_policy_expired_schedular_interval.trim()=="")
			 {
				 alert("Please enter country.policy.expired.schedular.interval");
				 $("#country_policy_expired_schedular_interval").focus();
				 return;
			 }
			else if(update_employeeid_schedular.trim()=="")
			 {
				 alert("Please enter update.employeeid.schedular");
				 $("#update_employeeid_schedular").focus();
				 return;
			 }
			else if(country_policy_notification_schedular.trim()=="")
			 {
				 alert("Please enter country.policy.notification.schedular");
				 $("#country_policy_notification_schedular").focus();
				 return;
			 }
			else if(verify_ldap_password.trim()=="")
			 {
				 alert("Please enter verify.ldap.password");
				 $("#verify_ldap_password").focus();
				 return;
			 }
			else if(country_superadmin_admin_mails.trim()=="")
			 {
				 alert("Please enter country.superadmin.admin.mails");
				 $("#country_superadmin_admin_mails").focus();
				 return;
			 }
			else if(country_policy_expired_alert_interval.trim()=="")
			 {
				 alert("Please enter country.policy.expired.alert.interval");
				 $("#country_policy_expired_alert_interval").focus();
				 return;
			 }
			else if(country_policy_time_interval.trim()=="")
			 {
				 alert("Please enter country.policy.time.interval");
				 $("#country_policy_time_interval").focus();
				 return;
			 }
			else if(push_server_check_counter.trim()=="")
			 {
				 alert("Please enter push.server.check.counter");
				 $("#push_server_check_counter").focus();
				 return;
			 }
			else if(maximum_countries_allowed.trim()=="")
			 {
				 alert("Please enter maximum.countries.allowed");
				 $("#maximum_countries_allowed").focus();
				 return;
			 }
			else if(maximum_countries_allowed.trim()==0)
			 {
				 alert("maximum.countries.allowed should be greater then 0.");
				 $("#maximum_countries_allowed").focus();
				 return;
			 }
			else if(mysql_server_check_counter.trim()=="")
			 {
				 alert("Please enter mysql.server.check.counter");
				 $("#mysql_server_check_counter").focus();
				 return;
			 }
			else if(user_country_policy_schedular.trim()=="")
			 {
				 alert("Please enter user.country.policy.schedular");
				 $("#user_country_policy_schedular").focus();
				 return;
			 }
			else if(ntp_server_check_counter.trim()=="")
			 {
				 alert("Please enter ntp.server.check.counter");
				 $("#ntp_server_check_counter").focus();
				 return;
			 }
			else if(radius_server_check_counter.trim()=="")
			 {
				 alert("Please enter radius.server.check.counter");
				 $("#radius_server_check_counter").focus();
				 return;
			 }
			else if(log_report_schedular.trim()=="")
			 {
				 alert("Please enter log.report.schedular");
				 $("#log_report_schedular").focus();
				 return;
			 }
			else if(redis_server_check_counter.trim()=="")
			 {
				 alert("Please enter redis.server.check.counter");
				 $("#redis_server_check_counter").focus();
				 return;
			 }
			else if(server_schedular.trim()=="")
			 {
				 alert("Please enter server.schedular");
				 $("#server_schedular").focus();
				 return;
			 }
			else if(log_report_days.trim()=="")
			 {
				 alert("Please enter log.report.days");
				 $("#log_report_days").focus();
				 return;
			 }
			
			else if(database_schedular.trim()=="")
			 {
				 alert("Please enter database.schedular");
				 $("#database_schedular").focus();
				 return;
			 }
			else if(dashboard_schedular.trim()=="")
			 {
				 alert("Please enter dashboard.schedular");
				 $("#dashboard_schedular").focus();
				 return;
			 }
			else if(redis_schedular.trim()=="")
			 {
				 alert("Please enter redis.schedular");
				 $("#redis_schedular").focus();
				 return;
			 }
			
			else if(fileRead_schedular.trim()=="")
			 {
				 alert("Please enter fileRead.schedular");
				 $("#redis_schedular").focus();
				 return;
			 }
			
			
			
			
			else if(smsUtil_sourceAddr.trim()=="")
			 {
				 alert("Please enter smsUtil.sourceAddr");
				 $("#smsUtil_sourceAddr").focus();
				 return;
			 }
			else if(bindParameter_password.trim()=="")
			 {
				 alert("Please enter bindParameter.password");
				 $("#bindParameter_password").focus();
				 return;
			 }
			else if(bindParameter_systemId.trim()=="")
			 {
				 alert("Please enter bindParameter.systemId");
				 $("#bindParameter_systemId").focus();
				 return;
			 }
			
			else if(bindParameter_systemType.trim()=="")
			 {
				 alert("Please enter bindParameter.systemType");
				 $("#bindParameter_systemType").focus();
				 return;
			 }
			
			
			
			
			
			
			else if(default_user_country_policy.trim()=="")
			 {
				 alert("Please enter default.user.country.policy");
				 $("#default_user_country_policy").focus();
				 return;
			 }
			else if(default_from_timestamp.trim()=="")
			 {
				 alert("Please enter default.from.timestamp");
				 $("#default_from_timestamp").focus();
				 return;
			 }
			else if(default_to_timestamp.trim()=="")
			 {
				 alert("Please enter default.to.timestamp");
				 return;
			 }
			 
			 //===================================
			else if(login_auth.trim()=="")
			 {
				 alert("Please enter login.auth");
				 window.setTimeout(function () { 
					    document.getElementById('login_auth').focus(); 
					}, 0);
				 
				 return;
			 }
			else if(user_secure_organisation.trim()=="")
			 {
				 alert("Please enter user.secure.organisation");
				 window.setTimeout(function () { 
					    document.getElementById('user_secure_organisation').focus(); 
					}, 0);
				 return;
			 }
			else if(user_secure_application.trim()=="")
			 {
				 alert("Please enter user.secure.application");
				 window.setTimeout(function () { 
					    document.getElementById('user_secure_application').focus(); 
					}, 0);
				 return;
			 }
			else if(user_domain.trim()=="")
			 {
				 alert("Please enter user.domain");
				 window.setTimeout(function () { 
					    document.getElementById('user_domain').focus(); 
					}, 0);
				 return;
			 }
			else if(user_secure_domain.trim()=="")
			 {
				 alert("Please enter user.secure.domain");
				 window.setTimeout(function () { 
					    document.getElementById('user_secure_domain').focus(); 
					}, 0);
				 return;
			 }
			else if(ad_server.trim()=="")
			 {
				 alert("Please enter ad.server");
				 window.setTimeout(function () { 
					    document.getElementById('ad_server').focus(); 
					}, 0);
				 return;
			 }
			else if(ad_base_dn.trim()=="")
			 {
				 alert("Please enter ad_base_dn");
				 window.setTimeout(function () { 
					    document.getElementById('ad_base_dn').focus(); 
					}, 0);
				 return;
			 }
			else if(ldap_filter.trim()=="")
			 {
				 alert("Please enter ldap.filter");
				 window.setTimeout(function () { 
					    document.getElementById('ldap_filter').focus(); 
					}, 0);
				 return;
			 }
			else if(ldap_default_domain.trim()=="")
			 {
				 alert("Please enter ldap.default.domain");
				 window.setTimeout(function () { 
					    document.getElementById('ldap_default_domain').focus(); 
					}, 0);
				 return;
			 }
			else if(usersearch_admin_name.trim()=="")
			 {
				 alert("Please enter usersearch.admin.name");
				 window.setTimeout(function () { 
					    document.getElementById('usersearch_admin_name').focus(); 
					}, 0);
				 return;
			 }
			else if(ldap_multi_server_ip.trim()=="")
			 {
				 alert("Please enter ldap.multi.server.ip");
				 window.setTimeout(function () { 
					    document.getElementById('ldap_multi_server_ip').focus(); 
					}, 0);
				 return;
			 }
			 
			/*else if(usersearch_domain.trim()=="")
			 {
				 alert("Please enter usersearch.domain");
				 window.setTimeout(function () { 
					    document.getElementById('usersearch_domain').focus(); 
					}, 0);
				 return;
			 }*/
			else if(ldap_server.trim()=="")
			 {
				 alert("Please enter ldap.server");
				 window.setTimeout(function () { 
					    document.getElementById('ldap_server').focus(); 
					}, 0);
				 return;
			 }
			else if(ldap_multidomain_flag.trim()=="")
			 {
				 alert("Please enter ldap.multidomain.flag");
				 window.setTimeout(function () { 
					    document.getElementById('ldap_multidomain_flag').focus(); 
					}, 0);
				 return;
			 }
			else if(usersearch_admin_password.trim()=="")
			 {
				 alert("Please enter usersearch.admin.password");
				 window.setTimeout(function () { 
					    document.getElementById('usersearch_admin_password').focus(); 
					}, 0);
				 return;
			 }
			else if(secure_login_ssl_flag.trim()=="")
			 {
				 alert("Please enter secure.login.ssl.flag");
				 window.setTimeout(function () { 
					    document.getElementById('secure_login_ssl_flag').focus(); 
					}, 0);
				 return;
			 }
			 
			 
			 
		//============================================	 
			else if(protocal_type.trim()=="")
			 {
				 alert("Please enter protocol.type");
				 return;
			 }
			 
			 
			else if(connection_host.trim()=="")
			 {
				 alert("Please enter connection.host");
				 return;
			 }
			 
			else if(openfire_localhost_ip.trim()=="")
			 {
				 alert("Please enter openfire.localhost.ip");
				 return;
			 }
			 
			else if(qrcode_activation_key_expire_time.trim()=="")
			 {
				 alert("Please enter qrcode.activation.key.expire.time");
				 return;
			 }
			 
			else if(sms_key_expire_time.trim()=="")
			 {
				 alert("Please enter sms.key.expire.time");
				 return;
			 }
			else if(allow_device_no.trim()=="")
			 {
				 alert("Please enter allow.device.no");
				 return;
			 }
			else if(allow_device_no.trim()==0)
			 {
				 alert("allow.device.no should be greater than 0");
				 return;
			 }
			else if(employeeid_attribute.trim()=="")
			 {
				 alert("Please enter employeeid.attribute");
				 return;
			 }
			else if(deny_notification_time_interval.trim()=="")
			 {
				 alert("Please enter deny.notification.time.interval");
				 return;
			 }
			
			
			 
	
 
 
 
	else{
  
	var dataString='qrHost='+encodeURIComponent(qr_host.trim())+'&qrHostPort='+encodeURIComponent(qr_host_port.trim())+'&openfireLocalhostIP='+encodeURIComponent(openfire_localhost_ip.trim())+'&xmppServerIP='+encodeURIComponent(xmpp_server_ip.trim())+'&xmppServerPort='+encodeURIComponent(xmpp_server_port.trim())+'&xmppServerQrIp='+encodeURIComponent(xmpp_server_qr_ip.trim())+'&xmppServerQrPort='+encodeURIComponent(xmpp_server_qr_port.trim())+'&xmppServerUser='+encodeURIComponent(xmpp_server_user.trim())+'&xmppServerPassword='+encodeURIComponent(xmpp_server_password.trim())
	+'&secureFlag='+encodeURIComponent(secure_flag.trim())
	+'&smsUtilSourceAddr='+encodeURIComponent(smsUtil_sourceAddr.trim())
	+'&bindParameterSystemId='+encodeURIComponent(bindParameter_systemId.trim())
	+'&bindParameterPassword='+encodeURIComponent(bindParameter_password.trim())
	+'&bindParameterSystemType='+encodeURIComponent(bindParameter_systemType.trim())
	+'&mailTransportProtocol='+encodeURIComponent(mail_transport_protocol.trim())
	+'&mailSmtpHost='+encodeURIComponent(mail_smtp_host.trim())
	+'&emailServerType='+encodeURIComponent(email_server_type.trim())
	+'&mailSmtpPort='+encodeURIComponent(mail_smtp_port.trim())
	+'&mailSmtpAuth='+encodeURIComponent(mail_smtp_auth.trim())
	+'&serverIp='+encodeURIComponent(server_ip.trim())
	+'&userLogin='+encodeURIComponent(user_login.trim())
	+'&senderEmail='+encodeURIComponent(sender_email.trim())
	+'&senderPassword='+encodeURIComponent(sender_password.trim())
	+'&connectionHost='+encodeURIComponent(connection_host.trim())
	+'&mailSmtpSocketFactoryPort='+encodeURIComponent(mail_smtp_socketFactory_port.trim())
	+'&protocalType='+encodeURIComponent(protocal_type.trim())+'&csrfPreventionSalt='+encodeURIComponent(strutsToken)
	
	
	//Added by puneet
	
	+'&publicServerIp='+encodeURIComponent(public_server_ip.trim())
	+'&superadminAdminMails='+encodeURIComponent(superadmin_admin_mails.trim())
	+'&mailUserName='+encodeURIComponent(mail_user_name.trim())
	+'&mimeType='+encodeURIComponent(mime_type.trim())
	+'&mobileIosPath='+encodeURIComponent(mobile_ios_path.trim())
	+'&mobileBlackberryPath='+encodeURIComponent(mobile_blackberry_path.trim())
	+'&mobileAndroidPath='+encodeURIComponent(mobile_android_path.trim())
	+'&mobileWindowsPath='+encodeURIComponent(mobile_windows_path.trim())
	+'&countryPolicyNotificationSchedularUser='+encodeURIComponent(country_policy_notification_schedular_user.trim())
	+'&reprovisioningSeedSchedularNotificationDay='+encodeURIComponent(reprovisioning_seed_schedular_notification_day.trim())
	+'&reprovisioningSeedSchedularNotification='+encodeURIComponent(reprovisioning_seed_schedular_notification.trim())
	+'&updateEmployeeIdSchedular='+encodeURIComponent(update_employeeid_schedular.trim())
	+'&verifyLdapPassword='+encodeURIComponent(verify_ldap_password.trim())
	+'&countryPolicyExpiredAlertInterval='+encodeURIComponent(country_policy_expired_alert_interval.trim())
	+'&pushServerCheckCounter='+encodeURIComponent(push_server_check_counter.trim())
	+'&mysqlServerCheckCounter='+encodeURIComponent(mysql_server_check_counter.trim())
	+'&ntpServerCheckCounter='+encodeURIComponent(ntp_server_check_counter.trim())
	+'&logReportSchedular='+encodeURIComponent(log_report_schedular.trim())
	+'&serverSchedular='+encodeURIComponent(server_schedular.trim())
	+'&databaseSchedular='+encodeURIComponent(database_schedular.trim())
	+'&redisSchedular='+encodeURIComponent(redis_schedular.trim())
	+'&reprovisioningSeedSchedular='+encodeURIComponent(reprovisioning_seed_schedular.trim())
	+'&countryPolicyExpiredSchedular='+encodeURIComponent(country_policy_expired_schedular.trim())
	+'&countryPolicyEexpiredSchedularInterval='+encodeURIComponent(country_policy_expired_schedular_interval.trim())
	+'&countryPolicyNotificationSchedular='+encodeURIComponent(country_policy_notification_schedular.trim())
	+'&countrySuperadminAdminMails='+encodeURIComponent(country_superadmin_admin_mails.trim())
	+'&countryPolicyTimeInterval='+encodeURIComponent(country_policy_time_interval.trim())
	+'&maximumCountriesAllowed='+encodeURIComponent(maximum_countries_allowed.trim())
	+'&userCountryPolicySchedular='+encodeURIComponent(user_country_policy_schedular.trim())
	+'&radiusServerCheckCounter='+encodeURIComponent(radius_server_check_counter.trim())
	+'&redisServerCheckCounter='+encodeURIComponent(redis_server_check_counter.trim())
	+'&logReportDays='+encodeURIComponent(log_report_days.trim())
	+'&dashboardSchedular='+encodeURIComponent(dashboard_schedular.trim())
	+'&fileReadSchedular='+encodeURIComponent(fileRead_schedular.trim())
	+'&defaultUserCountryPolicy='+encodeURIComponent(default_user_country_policy.trim())
	+'&defaultFromTimestamp='+encodeURIComponent(default_from_timestamp.trim())
	+'&defaultToTimeStamp='+encodeURIComponent(default_to_timestamp.trim())
	+'&smsKeyExpireTime='+encodeURIComponent(sms_key_expire_time.trim())
	+'&employeeidAttribute='+encodeURIComponent(employeeid_attribute.trim())
	+'&denyNotificationTimeInterval='+encodeURIComponent(deny_notification_time_interval.trim())
	+'&qrcodeActivationKeyExpireTime='+encodeURIComponent(qrcode_activation_key_expire_time.trim())
	+'&allowDeviceNo='+encodeURIComponent(allow_device_no.trim())
	
	
	// new added param by puneet vats
	
	+'&loginAuth='+encodeURIComponent(login_auth.trim())
	+'&userSecureOrganisation='+encodeURIComponent(user_secure_organisation.trim())
	+'&userSecureApplication='+encodeURIComponent(user_secure_application.trim())
	+'&userDomain='+encodeURIComponent(user_domain.trim())
	+'&userSecureDomain='+encodeURIComponent(user_secure_domain.trim())
	+'&adServer='+encodeURIComponent(ad_server.trim())
	+'&adBaseDn='+encodeURIComponent(ad_base_dn.trim())
	+'&ldapFilter='+encodeURIComponent(ldap_filter.trim())
	+'&ldapDefaultDomain='+encodeURIComponent(ldap_default_domain.trim())
	+'&usersearchAdminName='+encodeURIComponent(usersearch_admin_name.trim())
	+'&usersearchDomain='+encodeURIComponent(usersearch_domain.trim())
	+'&ldapServer='+encodeURIComponent(ldap_server.trim())
	+'&ldapMultidomainFlag='+encodeURIComponent(ldap_multidomain_flag.trim())
	+'&usersearchAdminPassword='+encodeURIComponent(usersearch_admin_password.trim())
	+'&secureLoginSslFlag='+encodeURIComponent(secure_login_ssl_flag.trim())
	+'&ldapMultiServerIp='+encodeURIComponent(ldap_multi_server_ip.trim());

	

	
	//alert(dataString=="+dataString")
	$.ajax({
			type: "POST",
			url: "admin_updateProperties.action",
			data: dataString,
			dataType:"text",
			async: false,
			success: function(response){
				
				if($.trim(response) == "success"){
					alert(response);
					showProperties();
				}
				else
					alert(response);
			}
		});
	
		
				}
	}
	catch(e)
	{
		//alert(e)
	}
}



function blockFormSubmitRequest()  {  return false;   }