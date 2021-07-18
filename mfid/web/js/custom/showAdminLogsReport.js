function removeFilter(){
	$('#getadminLogonId').val("");
	$('#getapplicationId').val("");
	$('#getactivityTimeId').val("");
	$('#getactivityTypeId').val("");
	$('#getactivityId').val("");
	$('#getroleId').val("");
}

var allAdminLogData;
var globalShowPopupWindow = true;
var globalArrayUserSummaryColumn = '';
var globalReportType = '';
var domainNameAdminLog = '';
var genAdminLogFilter = '';

var globalPersistDenyByCountryReportDomainValue="";

var globalAdminLogsReportPreviouspageSize = "";
var globalAdminLogsReportPreviousPageNum = "";
var adminLogonId = "";
var applicationId = "";
var activityId = "";
var activityTypeId = "";
var activityTimeId = "";
var roleId = "";
var global_from_date = '';
var global_to_date = '';
var from_date = getAddDaysToCurrentDate();
var to_date = getCurrentDate();

function changeDateFormat(dateformat) {
	var d = new Date(dateformat);
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = (('' + day).length < 2 ? '0' : '') + day + '/'
			+ (('' + month).length < 2 ? '0' : '') + month + '/'
			+ d.getFullYear();
	return output;

}
function getCurrentDate() {
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = (('' + day).length < 2 ? '0' : '') + day + '/'
			+ (('' + month).length < 2 ? '0' : '') + month + '/'
			+ d.getFullYear();
	return output;
}

function getAddDaysToCurrentDate() {
	var d = new Date();
	d.setDate(d.getDate() - 7);
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = (('' + day).length < 2 ? '0' : '') + day + '/'
			+ (('' + month).length < 2 ? '0' : '') + month + '/'
			+ d.getFullYear();
	return output;

}

/*function showAdminLogsReportFirstTime() {
	
	content = '<div class="row-fluid">';

	content += '<div class="span3 offset0">';
	content += '<label>Domain : </label>';
	content += '<select id="adminLogReportDomain" name="switchDomain"><option value="">-select domain-</option></select>';
	content += '</div>';

	content += '<div class="span3 offset0">';
	content += '<label>From : </label>'; // start code for bug id #202 , added by abhimanyu
	content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>';
	content += '</div>';

	content += '<div class="span3 offset0">';
	content += '<label>To : </label>';
	content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>';
	content += '</div>'; // end code for bug id #202 , added by abhimanyu

	content += '<div class="span3 offset0">';
	content += '<button type="button" onClick="showAdminLogsReport(false,false)"  id="submit_date" class="btn btn-primary" style="margin-top: 25px;">Submit</button>';
	content += '</div>';
	content += '<div class="clear"></div>';
	content += '</div>';

	$('#block_show_admin_log_report_data').html(content);
	$("#from_date").datepicker({
		dateFormat : "dd/mm/yy"
	}).val();
	$("#to_date").datepicker({
		dateFormat : "dd/mm/yy"
	}).val();

	$("#from_date").val(getAddDaysToCurrentDate());

	$("#to_date").val(getCurrentDate());
	showAdminLogsReport(false, false);
}*/

function getDenyByCountryRportDatewise(){
	var domain = document.getElementById("adminLogReportDomain").value;
	if($.trim(domain) == ""){
		alert("Please select domain");
		return;
	} else{
		globalPersistDenyByCountryReportDomainValue = domain;
		from_date=$("#from_date").val();
		to_date=$("#to_date").val();
		if(from_date==""||from_date==undefined||from_date==null){
			 alert("Please select start time stamp");
			 return;
		 }
		if(to_date==""||to_date==undefined||to_date==null){
			 alert("Please select end time stamp");
			 return;
		 }
		 if(process(from_date) > process(to_date)){
			 alert("To timestamp can not be same or less than the from timestamp");
			 return;
		 }
		 
		 global_from_date=$("#from_date").val();
		 global_to_date=$("#to_date").val();
		 $("#pageId").val('');
		 $("#pageNum").val('');
		 showAdminLogsReport(false, false);
	}
}

var countAdminLogsReportPage;
var searchCount;
var searchAdminLogsReportWithpageSize = false;

function getPageData() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var pageNumber = document.getElementById('pageNum').value;
	var totalPages =  $('#pageN').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showAdminLogsReport(true, false);
	else
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize() {
	
	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
		var maxSize = countAdminLogsReportPage;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(countAdminLogsReportPage==0){
			$('#pageNum').val(0);
		} else{
			$('#pageNum').val(1);
			$('#pageNum').attr("disabled",false);
		} 				
		$('#pageN').html(parseInt(maxPgaeNumber));
		
	} 
	

}

function process(date) {
	var parts = date.split("/");
	return new Date(parts[2], parts[1] - 1, parts[0]);
}

function showAdminLogsReport(pageCall, isSearch) {
	if (typeof (pageCall) == 'undefined' && typeof (isSearch) == 'undefined') {
		try {
			$("#pageId").val('');
			$("#pageNum").val('');
		} catch (err) {
		}
	}
	try {
		
		if ($("#pageId").length) {
			globalAdminLogsReportPreviouspageSize = $("#pageId").val();
			globalAdminLogsReportPreviousPageNum = $("#pageNum").val();
		}
		
		if (from_date.indexOf('/') != -1) {
			from_date = from_date.split("/")[2] + "-" + from_date.split("/")[1]
			       + "-" + from_date.split("/")[0] + " 00:00:00";
			to_date = to_date.split("/")[2] + "-" + to_date.split("/")[1] + "-"
			       + to_date.split("/")[0] + " 23:59:59";
		}
		
		var domainId = '';
		try {
			domainId = document.getElementById('adminLogReportDomain').value;
		} catch (err) {
		}
		var myUrl = "report_adminLogsReport.action?fromDate=" + from_date
				+ "&toDate=" + to_date;
		var dataString = "";

		if (pageCall == true) {
			//alert("in true")
			var size = document.getElementById('pageId').value;
			var pageNumber = document.getElementById('pageNum').value;
			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber;
		}
		if(adminLogonId!="" || applicationId!="" || activityTypeId != "" || activityId!="" || activityTimeId!="" || roleId!=""){
			isSearch=true;
		} 
		
		if (isSearch) {
			adminLogonId = document.getElementById('getadminLogonId').value;
			adminLogonId = adminLogonId.replace(/\s/g, "");
			applicationId = document.getElementById('getapplicationId').value;
			applicationId = applicationId.replace(/\s/g, "");
			activityId = document.getElementById('getactivityId').value;
			activityTypeId = document.getElementById('getactivityTypeId').value;
			activityTimeId = document.getElementById('getactivityTimeId').value;
			roleId = document.getElementById('getroleId').value;
			roleId = roleId.replace(/\s/g, "");

			//myUrl+="&userLogonId="+adminLogonId+"&appName="+applicationId+"&activity="+activityId+"&activityType="+activityTypeId+"&requestTime="+activityTimeId+"&role="+roleId;
			dataString += "&userLogonId=" + adminLogonId + "&appName="
					+ applicationId + "&activity=" + activityId
					+ "&activityType=" + activityTypeId + "&requestTime="
					+ activityTimeId + "&role=" + roleId;
		}
		genAdminLogFilter = "&" + myUrl.split("?")[1];
		if (searchAdminLogsReportWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalAdminLogsReportPreviouspageSize) != '')
					myUrl += "&fetchSize="
							+ globalAdminLogsReportPreviouspageSize;
			}
		}
		myUrl += "&domain=" + domainId;
		domainNameAdminLog = domainId;

		//alert("myUrl = "+myUrl );
		$('#tab_bottom_box').html('<span>Loading...</span>');
		$
				.ajax({
					type : "POST",
					url : myUrl,
					data : dataString,
					async : true,
					dataType : "text",
					success : function(data) {
						if ($.trim(data) == "sessionout") {
							alert("Session TimeOut...");
							var testVal = document.getElementById('loginPage').value;
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						var obj1 = JSON.parse(object.adminlogList);
						var obj2 = JSON.parse(object.count);
						var obj3 = JSON.parse(object.domainList);
						allAdminLogData = obj1;
						if (searchAdminLogsReportWithpageSize) {
							searchCount = obj2;
							countAdminLogsReportPage = obj2;
							//obj2 = countAdminLogsReportPage;
						} else {
							countAdminLogsReportPage = obj2;
							searchCount = obj2;
						}

						var domainContent = '<option value="" >-select domain-</option>';
						jQuery.each(obj3, function(i, v) {
							domainContent += '<option value="' + obj3[i]
									+ '" >' + obj3[i] + '</option>';
						});

						var content = '<h4></h4><div class="space15"></div>';
		 				content += '<div class="row-fluid">';
		 				content += '<div class="span3">';
		 				content += '<label>Domain : </label>';
		 				content += '<select id="adminLogReportDomain" name="adminLogReportDomain">';
		 				content += '<option value="">Select Domain</option>';
		 				jQuery.each(obj3, function(i, v) {
		 				var tempDomainList=obj3[i];
		 				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
		 				});
		 				content += '</select>';
		 				content += '</div>';
		 				content += '<div class="row-fluid">';
		 				content += '<div class="span3 offset0">';
		 				content += '<label>From : </label>';
		 				content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>'; 
		 				content += '</div>';

		 				content += '<div class="span3 offset0">';
		 				content += '<label>To : </label>';
		 				content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>'; 
		 				content += '</div>';
		 				
		 				content += '<div class="span3 offset0">';
		 				content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="getDenyByCountryRportDatewise()" />';
		 				content += '</div>';
		 				content += '<div class="clear"></div>';
		 				content += '</div>';
		 				content += '<div class="space15"></div>';

						content += '<div class="row-fluid ">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId" onChange="fetchSize(),getPageData();" style="width:100%;" name="deassociationReasonListName">';
						content += '<option value="">Select Size</option>';
						content += '<option value="10">10</option>';
						content += '<option value="20">20</option>';
						content += '<option value="50">50</option>';
						content += '<option value="100">100</option>';
						content += '<option value="200">200</option>';
						content += '<option value="500">500</option>';
						content += '<option value="1000">1000</option>';
						content += '<option value="2000">2000</option>';
						content += '<option value="5000">5000</option>';
						//content += '<option value="10000">10000</option>';
						content += '</select>';
						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData()" id="pageNum"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_1_1">';
						content += '<thead>';
						content += '<tr>';
						content += '<th></th>';
						content += '<th>Admin LogonId</th>';
						/*content += '<th>Domain</th>'; */
						content += '<th>Application</th>';
						content += '<th>Activity Time</th>';
						content += '<th>Activity</th>';
						content += '<th>Activity Type</th>';
						content += '<th>Role</th>';
						content += '</tr>';
						content += '<tr>';
						content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="adminLogReportSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp; &nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchAdminLogsReport(event)" id="getadminLogonId" /></th>';
						/*	content += '<th><input type="text" onkeydown="searchAdminLogsReport(event)" id="getdomainId" /></th>';*/
						content += '<th><input type="text" onkeydown="searchAdminLogsReport(event)" id="getapplicationId" /></th>';
						content += '<th><input type="text" onkeydown="searchAdminLogsReport(event)" id="getactivityTimeId" /></th>';
						content += '<th><input type="text" onkeydown="searchAdminLogsReport(event)" id="getactivityId" /></th>';
						content += '<th><select id="getactivityTypeId"  >';
						content += '<option value="">select</option>';
						content += '<option value="user_login">user_login</option>';
						content += '<option value="user_deassociate">user_deassociate</option>';
						content += '<option value="user_associate">user_associate</option>';
						content += '<option value="user_import">user_import</option>';
						content += '<option value="user_delete">user_delete</option>';
						content += '<option value="user_assign">user_assign</option>';
						content += '<option value="user_deassign">user_deassign</option>';
						content += '<option value="user_locked">user_locked</option>';
						content += '<option value="user_unlocked">user_unlocked</option>';
						content += '<option value="user_shadow">user_shadow</option>';
						content += '<option value="change_password">change_password</option>';
						content += '<option value="modify_connection">modify_connection</option>';
						content += '<option value="add_domain">add_domain</option>';
						content += '<option value="update_domain">update_domain</option>';
						content += '<option value="delete_domain">delete_domain</option>';
						content += '<option value="add_application">add_application</option>';
						content += '<option value="update_application">update_application</option>';
						content += '<option value="delete_application">delete_application</option>';
						content += '<option value="manage_role">manage_role</option>';
						content += '<option value="delete_super_admin">delete_super_admin</option>';
						content += '<option value="user_sync_schedular">user_sync_schedular</option>';
						content += '<option value="sync_user">sync_user</option>';
						content += '<option value="manage_radius">manage_radius</option>';
						content += '<option value="start_radius">start_radius</option>';
						content += '<option value="stop_radius">stop_radius</option>';
						content += '<option value="manage_properties">manage_properties</option>';
						content += '<option value="deassign_token">deassign_token</option>';
						content += '<option value="assign_token">assign_token</option>';
						content += '<option value="activate_hard_token">activate_hard_token</option>';
						content += '<option value="resync_hard_token">resync_hard_token</option>';
						content += '<option value="lock_token">lock_token</option>';
						content += '<option value="unlock_token">unlock_token</option>';
						content += '<option value="insert_token">insert_token</option>';
						content += '<option value="common_policy">common_policy</option>';
						content += '<option value="hard_offline_policy">hard_offline_policy</option>';
						content += '<option value="emergency_policy">emergency_policy</option>';
						content += '<option value="token_activation_policy">token_activation_policy</option>';
						content += '<option value="lockout_attempt_policy">lockout_attempt_policy</option>';
						content += '<option value="network_time_policy">network_time_policy</option>';
						content += '<option value="assign_policy">assign_policy</option>';
						content += '<option value="user_change_authentication">user_change_authentication</option>';
						content += '<option value="emergency_authentication">emergency_authentication</option>';
						content += '<option value="mail_template">mail_template</option>';

						content += '<option value="create_user_country_policy">create_user_country_policy</option>';
						content += '<option value="delete_user_country_policy">delete_user_country_policy</option>';
						content += '<option value="delete_wifi_device">delete_wifi_device</option>';
						content += '<option value="delete_device_decision">delete_device_decision</option>';
						content += '<option value="delete_activated_device">delete_activated_device</option>';
						content += '<option value="seed_reprovisioning">seed_reprovisioning</option>';
						content += '<option value="tiles_management">tiles_management</option>';
						content += '<option value="tiles_management">manage_custom_auth_properties</option>';
						content += '<option value="u2f_assigned">u2f_assigned</option>';
						content += '<option value="u2f_deleted">u2f_deleted</option>';
						content += '<option value="whitelisted_device_created">whitelisted_device_created</option>';
						content += '<option value="failed_to_insert_whitelisted_device">failed_to_insert_whitelisted_device</option>';
						content += '<option value="reset_password_mail">reset_password_mail</option>';
						
						content += '</select></th>';
						content += '<th><input type="text" onkeydown="searchAdminLogsReport(event)" id="getroleId" /></th>';
						content += '</tr>';
						content += '</thead>';

						try {
							if (obj1 != null && obj1 != '') {
								var counterSr = 0;
								jQuery.each(obj1, function(i, v) {
									counterSr++;
									content += "<tr><td>" + counterSr
											+ "</td><td>" + v.adminLogonId
											+ "</td><td>" + v.appName
											+ "</td><td>" + v.activityTime
											+ "</td><td>" + v.activity
											+ "</td><td>" + v.activityType
											+ "</td><td>" + v.role
											+ "</td></tr>";
								});
							} else
								content += "<tr><td style='text-align: center;' colspan='10' > No Record Found!</td></tr>";

						} catch (e) {
							//alert(e);
						}
						content += "</table>";
						content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="pull-left">';
						$('#block_show_admin_log_report').html(content);

						if (allAdminLogData != null && allAdminLogData != '') {
							content1 = "<div class='span4'><h4>Export options:</h4></div>";
							content1 += "<div class='span8' >";
							content1 += "<form method='post' id='reportForm'> ";
							content1 += "<input type='hidden' name='userLogonId' id='user_logon_id'/>";
							content1 += "<input type='hidden' name='appName' id='app_name'/>";
							content1 += "<input type='hidden' name='activity' id='user_activity'/>";
							content1 += "<input type='hidden' name='activityType' id='activity_type'/>";
							content1 += "<input type='hidden' name='requestTime' id='request_time'/>";
							content1 += "<input type='hidden' name='role' id='user_role'/>";
							content1 += "<ul>";
							content1 += "<li><a href='#' onClick='callCsvReport()' class='btn btn-primary'>CSV</a></li>";
							content1 += "<li><a href='#' onClick='callExcelReport()' class='btn btn-primary'>Excel</a></li>";
							content1 += "<li><a href='#' id='xml' data='xml' onClick='callXmlReport()' class='btn btn-primary'>XML</a></li>";
							content1 += "<li><a href='#' id='pdf' data='pdf' onClick='callPdfReport()' class='btn btn-primary'>PDF</a></li>";
							content1 += "</ul>";
							content1 += "</form>";
							content1 += "</div>";

							$('#expo_opt').html(content1);
						} else {
							$('#expo_opt').html('');
						}

						// Searching Purpose
						$('#getadminLogonId').val(adminLogonId);
						$('#getapplicationId').val(applicationId);
						$('#getactivityTimeId').val(activityTimeId);
						$('#getactivityTypeId').val(activityTypeId);
						$('#getactivityId').val(activityId);
						$('#getroleId').val(roleId);
						
						if ($.trim(globalAdminLogsReportPreviouspageSize) != '') {
							$("#pageId").val(
									globalAdminLogsReportPreviouspageSize);
							fetchSize();
							if (!searchAdminLogsReportWithpageSize){
								$("#pageNum").val(
										globalAdminLogsReportPreviousPageNum);
							} else {
								if(globalAdminLogsReportPreviousPageNum==0 && parseInt($('#pageN').text()) > 0)
									globalAdminLogsReportPreviousPageNum="1";
								$("#pageNum").val(
										globalAdminLogsReportPreviousPageNum);
							}
								
								
						}
						/*if (!searchAdminLogsReportWithpageSize) {
							$('#adminLogReportDomain').html(domainContent);
							$('#adminLogReportDomain').val(domainId);
						}*/
						//searchAdminLogsReportWithpageSize = false;
						$("#getactivityTimeId").datepicker({
							dateFormat : "yy-mm-dd"
						}).val();
						

						  if($.trim(globalPersistDenyByCountryReportDomainValue) != ''){ 
								 $("#adminLogReportDomain").val(globalPersistDenyByCountryReportDomainValue);
						     }
						 
						 $("#from_date" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
					     	$("#to_date").datepicker({ dateFormat: "dd/mm/yy" }).val();
					     	if(global_from_date != '' && global_to_date != '') {
						     		$("#from_date" ).val(global_from_date);
							     	$("#to_date" ).val(global_to_date);
					     	} else {
						     		$("#from_date" ).val(getAddDaysToCurrentDate());
							     	$("#to_date" ).val(getCurrentDate());
					     	}
						
						if(pageCall==false){
							var size = 10;
							if (globalAdminLogsReportPreviouspageSize != '') {
								size = parseInt(globalAdminLogsReportPreviouspageSize);
								countAdminLogsReportPage = searchCount;
							}
							
							if(adminLogonId!="" || applicationId!="" || activityTypeId != "" || activityId!="" || activityTimeId!="" || roleId!=""){
								countAdminLogsReportPage = searchCount;
							} 
							if(countAdminLogsReportPage == 0){
								countAdminLogsReportPage = searchCount;
							}
							var maxPgaeNumber = countAdminLogsReportPage / size;
							var rem = countAdminLogsReportPage % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN').html(parseInt(maxPgaeNumber));
							if(countAdminLogsReportPage == 0)
								$('#pageNum').val(0);
							else 
								$('#pageNum').val(1);
						}
						if(adminLogonId == "" && applicationId == "" && activityTypeId == "" && activityId=="" && activityTimeId=="" && roleId==""){
							searchAdminLogsReportWithpageSize = false;
						} 

					}
				});
	} catch (e) {
		alert(e);
	}

}

function adminLogReportSearch() {
	if (validateAdminLogSearch()) {
		searchAdminLogsReportWithpageSize = true;
		showAdminLogsReport(false, true);
	} else {
		validateAdminLogSearch();
	}

}

function callPdfReport() {
	if (validatePDFCount()) {

		globalReportType = "pdf";
		var domainName = "";
		if (globalShowPopupWindow)
			$('#myModal1').modal('show')
		else {
			$('#myModal1').modal('hide')
			var reportType = "pdf";
			var url = "reportgen_adminLogsReport?reportType=" + reportType
					+ "&fileName=admin_log_report.pdf&reportColumns="
					+ globalArrayUserSummaryColumn + "&domainName="
					+ domainNameAdminLog + genAdminLogFilter;
			$('#user_logon_id').val(adminLogonId);
			$('#app_name').val(applicationId);
			$('#user_activity').val(activityId);
			$('#activity_type').val(activityTypeId);
			$('#request_time').val(activityTimeId);
			$('#user_role').val(roleId);
			$('#reportForm').attr("action", url);
			$('#reportForm').submit();
			globalShowPopupWindow = true;
			resetAllCheckbox();
		}
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
}

function callXmlReport() {
	if (validateXMLCount()) {

		globalReportType = "xml";
		if (globalShowPopupWindow)
			$('#myModal1').modal('show')
		else {
			$('#myModal1').modal('hide')
			var reportType = "xml";
			var url = "reportgen_adminLogsReport?reportType=" + reportType
					+ "&fileName=admin_log_report.xml&reportColumns="
					+ globalArrayUserSummaryColumn + "&domainName="
					+ domainNameAdminLog + genAdminLogFilter;
			$('#user_logon_id').val(adminLogonId);
			$('#app_name').val(applicationId);
			$('#user_activity').val(activityId);
			$('#activity_type').val(activityTypeId);
			$('#request_time').val(activityTimeId);
			$('#user_role').val(roleId);
			$('#reportForm').attr("action", url);
			$('#reportForm').submit();
			globalShowPopupWindow = true;
			resetAllCheckbox();
		}
	} else {
		alert('Your data is more than 100000. Please download the report in CSV Format!');
	}
}

function callExcelReport() {
	if (validateExcelCount()) {

		globalReportType = "excel";
		if (globalShowPopupWindow)
			$('#myModal1').modal('show')
		else {
			$('#myModal1').modal('hide')
			var reportType = "excel";
			var url = "reportgen_adminLogsReport?reportType=" + reportType
					+ "&fileName=admin_log_report.xlsx&reportColumns="
					+ globalArrayUserSummaryColumn + "&domainName="
					+ domainNameAdminLog + genAdminLogFilter;
			$('#user_logon_id').val(adminLogonId);
			$('#app_name').val(applicationId);
			$('#user_activity').val(activityId);
			$('#activity_type').val(activityTypeId);
			$('#request_time').val(activityTimeId);
			$('#user_role').val(roleId);
			$('#reportForm').attr("action", url);
			$('#reportForm').submit();
			globalShowPopupWindow = true;
			resetAllCheckbox();
		}
	} else {
		alert('Your data is more than 500000. Please download the report in CSV Format!');
	}
}

function callCsvReport() {
	globalReportType = "csv";
	if (globalShowPopupWindow)
		$('#myModal1').modal('show')
	else {
		$('#myModal1').modal('hide')
		var reportType = "csv";
		var url = "reportgen_adminLogsReport?reportType=" + reportType
				+ "&fileName=admin_log_report.csv&reportColumns="
				+ globalArrayUserSummaryColumn + "&domainName="
				+ domainNameAdminLog + genAdminLogFilter;
		$('#user_logon_id').val(adminLogonId);
		$('#app_name').val(applicationId);
		$('#user_activity').val(activityId);
		$('#activity_type').val(activityTypeId);
		$('#request_time').val(activityTimeId);
		$('#user_role').val(roleId);
		$('#reportForm').attr("action", url);
		$('#reportForm').submit();
		globalShowPopupWindow = true;
		resetAllCheckbox();
	}
}

function exportAdminLogsReport() {
	//alert("exportNeverUseAuthenticationReport");	
	var arrayUserSummaryColumn = $.map(
			$('input[name="usersummaryreportcolumn"]:checked'), function(c) {
				return c.value;
			})
	if (arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "") {
		alert("please select at least one column for Export. ");
	} else {
		globalArrayUserSummaryColumn = arrayUserSummaryColumn;
		globalShowPopupWindow = false;

		if (globalReportType == "pdf")
			callPdfReport();
		else if (globalReportType == "xml")
			callXmlReport();
		else if (globalReportType == "excel")
			callExcelReport();
		else if (globalReportType == "csv")
			callCsvReport();

	}

}

function searchAdminLogsReport(e) {
	if (e.keyCode === 13)
		adminLogReportSearch();
}

function validateAdminLogSearch() {
	var users = $('#getadminLogonId').val();
	if (users != undefined && users != "") {
		users = users.replace(/\s/g, " ");
		var user = users.split(',');
		var len = user.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#getadminLogonId').val("");
			return false;
		}
	}
	return true;
}

function validateExcelCount() {
	if (searchCount > 500000) {
		return false;
	}
	return true;
}
function validatePDFCount() {
	if (searchCount > 200000) {
		return false;
	}
	return true;
}
function validateXMLCount() {
	if (searchCount > 100000) {
		return false;
	}
	return true;
}
