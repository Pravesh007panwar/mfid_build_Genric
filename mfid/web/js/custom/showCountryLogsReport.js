function removeFilter(){
	$('#getadminLogonId').val("");
	$('#getapplicationName').val("");
	$('#getactivityTimeId').val("");
	$('#getactivityId').val("");
	$('#getroleId').val("");
}
var countryPolicyLogData;
 var globalShowPopupWindow = true;
 var globalArrayUserSummaryColumn = '';
 var globalReportType='';
 var domainNameCountryPolicyLog='';
 var genCountryPolicyLogFilter ='';
 var globalPersistDenyByCountryReportDomainValue="";
 var global_from_date = '';
 var global_to_date = '';
 var from_date = getAddDaysToCurrentDate();
 var to_date = getCurrentDate();
 var searchCount;

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



 

/*function showCountryPolicyLogsReportFirstTime() {

	content = '<div class="row-fluid">';

	content += '<div class="span3 offset0">';
	content += '<label>Domain : </label>';
	content += '<select id="adminLogReportDomain" name="switchDomain"><option value="">-select domain-</option></select>';
	content += '</div>';

	content += '<div class="span3 offset0">';
	content += '<label>From : </label>';
	content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>';
	content += '</div>';

	content += '<div class="span3 offset0">';
	content += '<label>To : </label>';
	content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>';
	content += '</div>';

	content += '<div class="span3 offset0">';
	content += '<button type="button" onClick="showCountryPolicyLogsReport(false,false)"  id="submit_date" class="btn btn-primary" style="margin-top: 25px;">Submit</button>';
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
	showCountryPolicyLogsReport(false, false);
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
		 showCountryPolicyLogsReport(false,false);
	}
}

var countCountryPolicyLogsReportPage;
var searchCountryPolicyLogsReportWithpageSize=false;


function getPageData() {

	var size = document.getElementById('pageId').value;
	var totalPages =  $('#pageN').text();
	var pageNumber = document.getElementById('pageNum').value;
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))		
		showCountryPolicyLogsReport(true, false);
	else
		alert('Page should be less than or equal to page number.');
}


function fetchSize() {
	
	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
		var maxSize = countCountryPolicyLogsReportPage;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (countCountryPolicyLogsReportPage == 0) {
			$('#pageNum').val(0);
		} else {
			$('#pageNum').val(1);
			$('#pageNum').attr("disabled", false);
		}
		$('#pageN').html(parseInt(maxPgaeNumber));
	} else
		$('#pageNum').val(1);

}


function process(date) {
	var parts = date.split("/");
	return new Date(parts[2], parts[1] - 1, parts[0]);
}
var globalCountryPolicyLogsReportPreviouspageSize="";
var globalCountryPolicyLogsReportPreviousPageNum="";
var adminLogonId="";
var applicationName="";
var activityId="";
var activityTimeId="";
var roleId="";
 function showCountryPolicyLogsReport(pageCall, isSearch) {
	 $('#_country_second_widget').hide();
	if (typeof (pageCall) == 'undefined' && typeof (isSearch) == 'undefined') {
		try {
			$("#pageId").val('');
			$("#pageNum").val('');
		} catch (err) {
		}
	}
	try {
		/*var from_date = $("#from_date").val();
		var to_date = $("#to_date").val();
		if (from_date == "" || from_date == undefined || from_date == null) {
			alert("Please select start time stamp");
			return;
		}

		if (to_date == "" || to_date == undefined || to_date == null) {
			alert("Please select end time stamp");
			return;
		}

		if (process(from_date) > process(to_date)) {
			alert("To timestamp can not be same or less than the from timestamp");
			return;
		}*/
		if ($("#pageId").length) {
			globalCountryPolicyLogsReportPreviouspageSize = $("#pageId").val();
			globalCountryPolicyLogsReportPreviousPageNum = $("#pageNum").val();
		}
		 if(from_date.indexOf('/')!=-1){
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
		var myUrl = "report_countryPolicyLogsReport.action?fromDate=" + from_date
				+ "&toDate=" + to_date;
		var dataString = "";

		if (pageCall == true) {
			var size = document.getElementById('pageId').value;
			var pageNumber = document.getElementById('pageNum').value;
			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber;
		}

		if(adminLogonId!="" || applicationName!="" || activityId!="" || activityTimeId!="" || roleId!=""){
			isSearch=true;
		} 
		
		if (isSearch) {
			adminLogonId = document.getElementById('getadminLogonId').value;
			adminLogonId = adminLogonId.replace(/\s/g, "");
			applicationName = document.getElementById('getapplicationName').value;
			applicationName = applicationName.replace(/\s/g, "");
			activityId = document.getElementById('getactivityId').value;
			activityTimeId = document.getElementById('getactivityTimeId').value;
			roleId = document.getElementById('getroleId').value;
			roleId = roleId.replace(/\s/g, "");
			
			dataString += "&userLogonId=" + adminLogonId + "&appName="
					+ applicationName + "&activity=" + activityId
					+ "&requestTime="+ activityTimeId + "&role=" + roleId;
		}
		genCountryPolicyLogFilter = "&" + myUrl.split("?")[1];
		if (searchCountryPolicyLogsReportWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalCountryPolicyLogsReportPreviouspageSize) != '')
					myUrl += "&fetchSize="
							+ globalCountryPolicyLogsReportPreviouspageSize;
			}
		}
		myUrl += "&domainName=" + domainId;
		domainNameCountryPolicyLog = domainId;
		
		$('#tab_bottom_box').html('<span>Loading...</span>');
			$.ajax({
					type : "POST",
					url : myUrl,
					data : dataString,
					async : true,
					dataType : "text",
					success : function(data) {
						if ($.trim(data) == "sessionout") {
							alert("sessionout");
							var testVal = document.getElementById('loginPage').value;
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						var obj1 = JSON.parse(object.countryPolicyLogList);
						var obj2 = JSON.parse(object.count);
						var obj3 = JSON.parse(object.domainList);
						countryPolicyLogData = obj1;
						if (searchCountryPolicyLogsReportWithpageSize){
							searchCount = obj2;
							countCountryPolicyLogsReportPage = obj2;
							//obj2 = countCountryPolicyLogsReportPage; // 
						} else {
							countCountryPolicyLogsReportPage = obj2;
							searchCount = obj2;
						}
					
					/*	var domainContent = '<option value="" >-select domain-</option>';
						jQuery.each(obj3, function(i, v) {
							domainContent += '<option value="' + obj3[i]
									+ '" >' + obj3[i] + '</option>';
						});*/

						var content = '<h4>User</h4><div class="space15"></div>';
						content = '<div class="row-fluid">';
						content += '<div class="span3 offset0">';
						content += '<label>Domain : </label>';
						content += '<select id="adminLogReportDomain" name="adminLogReportDomain">';
		 				content += '<option value="">Select Domain</option>';
		 				jQuery.each(obj3, function(i, v) {
		 				var tempDomainList=obj3[i];
		 				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
		 				});
		 				content += '</select>';
						content += '</div>';

						content += '<div class="span3 offset0">';
						content += '<label>From : </label>';
						content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>';
						content += '</div>';

						content += '<div class="span3 offset0">';
						content += '<label>To : </label>';
						content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>';
						content += '</div>';

						content += '<div class="span3 offset0">';
						content += '<button type="button" onClick="getDenyByCountryRportDatewise()"  id="submit_date" class="btn btn-primary" style="margin-top: 25px;">Submit</button>';
						content += '</div>';
						content += '<div class="clear"></div>';
						content += '</div>';
						content += '<div class="row-fluid ">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId" onChange="fetchSize(),getPageData();" name="deassociationReasonListName" style="width:100%;">';
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
						content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;" >';
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
						content += '<th>Application</th>';
						content += '<th>Activity Time</th>';
						content += '<th>No of Allowed Country(s)</th>';
						content += '<th>Activity</th>';
						content += '<th>Activity Type</th>';
						content += '<th>Role</th>';
						content += '</tr>';
						content += '<tr>';
						content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="countryPolicyLogReportSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp; &nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchCountryPolicyLogsReport(event)" id="getadminLogonId" /></th>';
						content += '<th><input type="text" onkeydown="searchCountryPolicyLogsReport(event)" id="getapplicationName" /></th>';
						content += '<th><input type="text" onkeydown="searchCountryPolicyLogsReport(event)" id="getactivityTimeId" /></th>';
						content += '<th></th>';
						content += '<th><input type="text" onkeydown="searchCountryPolicyLogsReport(event)" id="getactivityId" /></th>';
						content += '<th></th>';
						content += '<th><input type="text" onkeydown="searchCountryPolicyLogsReport(event)" id="getroleId" /></th>';
						content += '</tr>';
						content += '</thead>';

						try {
							if (obj1 != null && obj1 != '') {
								var counterSr = 0;
								jQuery.each(obj1, function(i, v) {
									counterSr++;
									
									if(v.activityType=="Add"){
										var msg = "Country(s) Allowed";
										var activity = v.activity;
									} else if(v.activityType=="Update"){
										var msg = "Country(s) Updated";
										var activity = v.activity;
									} else {
										var msg = "Country(s) Deleted";
										var activity = v.activity;
										activity = activity.substring(0,activity.indexOf(', Policy Time Stamp :-'));
									}
									var count = "<a href='javascript:void(0);' data =\" "+v.allowedCountry+" \"  class='country_Click'>"+v.countryCount+"</a>"
								    content += "<tr><td>" + counterSr
											+ "</td><td>" + v.adminLogonId
											+ "</td><td>" + v.appName
											+ "</td><td>" + v.activityTime
											+ "</td><td><center>" + count
											+ "</center></td><td>" +v.countryCount+ " "+msg+" , " +activity+ "</td><td>" + v.activityType
											+ "</td><td>" + v.role
											+ "</td></tr>";
								});
							} else
								content += "<tr><td style='text-align: center;' colspan='10' > No Record Found!</td></tr>";

						} catch (e) {
							// alert(e);
						}
						content += "</table>";
						content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="pull-left">';
						$('#block_show_admin_log_report').html(content);
					
						if (countryPolicyLogData != null
								&& countryPolicyLogData != '') {
							content1 = "<div class='span4'><h4>Export options:</h4></div>";
							content1 += "<div class='span8' >";
							content1 += "<form method='post' id='reportForm'> ";
							content1 += "<input type='hidden' name='userLogonId' id='user_logon_id'/>";
							content1 += "<input type='hidden' name='appName' id='app_name'/>";
							content1 += "<input type='hidden' name='activity' id='user_activity'/>";
							content1 += "<input type='hidden' name='activityType' id='activity_type'/>";
							content1 += "<input type='hidden' name='requestTime' id='request_time/>";
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
						$('#getapplicationName').val(applicationName);
						$('#getactivityTimeId').val(activityTimeId);
						$('#getactivityId').val(activityId);
						$('#getroleId').val(roleId);
						
						if ($.trim(globalCountryPolicyLogsReportPreviouspageSize) != '') {
							$("#pageId")
									.val(globalCountryPolicyLogsReportPreviouspageSize);
							fetchSize();
							if (!searchCountryPolicyLogsReportWithpageSize)
								$("#pageNum")
										.val(globalCountryPolicyLogsReportPreviousPageNum);
							else {
								if(globalCountryPolicyLogsReportPreviousPageNum==0 && parseInt($('#pageN').text()) > 0)
									globalCountryPolicyLogsReportPreviousPageNum="1";
								$("#pageNum")
								.val(globalCountryPolicyLogsReportPreviousPageNum);
							}
								
						}
						/*if (!searchCountryPolicyLogsReportWithpageSize) {
							$('#adminLogReportDomain').html(domainContent);
							$('#adminLogReportDomain').val(domainId);
						}*/
						
						//searchCountryPolicyLogsReportWithpageSize = false;
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
							if (globalCountryPolicyLogsReportPreviouspageSize != '') {
								size = parseInt(globalCountryPolicyLogsReportPreviouspageSize);
								countCountryPolicyLogsReportPage = searchCount;
							}
							
							if(adminLogonId!="" || applicationName!="" || activityId!="" || activityTimeId!="" || roleId!=""){
								countCountryPolicyLogsReportPage = searchCount;
							} 
							if(countCountryPolicyLogsReportPage == 0){
								countCountryPolicyLogsReportPage = searchCount;
							}
							var maxPgaeNumber = countCountryPolicyLogsReportPage / size;
							var rem = countCountryPolicyLogsReportPage % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN').html(parseInt(maxPgaeNumber));
							if(countCountryPolicyLogsReportPage == 0)
								$('#pageNum').val(0);
							else 
								$('#pageNum').val(1);
						} 
						if(adminLogonId == "" && applicationName == "" && activityId=="" && activityTimeId=="" && roleId==""){
							searchCountryPolicyLogsReportWithpageSize = false;
						} 

					}
				});
	} catch (e) {
		alert(e);
	}

}
  

function countryPolicyLogReportSearch() {
	
	if (validateCountryPolicyLogSearch()) {
			searchCountryPolicyLogsReportWithpageSize = true;
			showCountryPolicyLogsReport(false, true);
		} else {
			validateCountryPolicyLogSearch();
		}
}
 
function callPdfReport() {
	
	if(validatePDFCount()){
	globalReportType = "pdf";
	var domainName = "";
	if (globalShowPopupWindow)
		$('#myModal1').modal('show')
	else {
		$('#myModal1').modal('hide')
		var reportType = "pdf";
		var url = "reportgen_countryPolicyLogsReport?reportType=" + reportType
				+ "&fileName=country_policy_log_report.pdf&reportColumns="
				+ globalArrayUserSummaryColumn + "&domainName="
				+ domainNameCountryPolicyLog + genCountryPolicyLogFilter;
			
		$('#user_logon_id').val(adminLogonId);
		$('#app_name').val(applicationName);
		$('#user_activity').val(activityId);
		$('#request_time').val(activityTimeId);
		$('#user_role').val(roleId);
		$('#reportForm').attr("action", url);
		$('#reportForm').submit();
		globalShowPopupWindow = true;
		//resetAllCheckbox();
	}
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
}

function callXmlReport() {
	
	if(validateXMLCount()) {
	globalReportType = "xml";
	if (globalShowPopupWindow)
		$('#myModal1').modal('show')
	else {
		$('#myModal1').modal('hide')
		var reportType = "xml";
		var url = "reportgen_countryPolicyLogsReport?reportType=" + reportType
				+ "&fileName=country_policy_log_report.xml&reportColumns="
				+ globalArrayUserSummaryColumn + "&domainName="
				+ domainNameCountryPolicyLog + genCountryPolicyLogFilter;
		$('#user_logon_id').val(adminLogonId);
		$('#app_name').val(applicationName);
		$('#user_activity').val(activityId);
		$('#request_time').val(activityTimeId);
		$('#user_role').val(roleId);
		$('#reportForm').attr("action", url);
		$('#reportForm').submit();
		globalShowPopupWindow = true;
		//resetAllCheckbox();
	}
	} else {
		 alert('Your data is more than 100000. Please download the report in CSV Format!');
	}
}

function callExcelReport() {
	
	if(validateExcelCount()){
	globalReportType = "excel";
	if (globalShowPopupWindow)
		$('#myModal1').modal('show')
	else {
		$('#myModal1').modal('hide')
		var reportType = "excel";
		var url = "reportgen_countryPolicyLogsReport?reportType=" + reportType
				+ "&fileName=country_policy_log_report.xlsx&reportColumns="
				+ globalArrayUserSummaryColumn + "&domainName="
				+ domainNameCountryPolicyLog + genCountryPolicyLogFilter;
		$('#user_logon_id').val(adminLogonId);
		$('#app_name').val(applicationName);
		$('#user_activity').val(activityId);
		$('#request_time').val(activityTimeId);
		$('#user_role').val(roleId);
		$('#reportForm').attr("action", url);
		$('#reportForm').submit();
		globalShowPopupWindow = true;
		//resetAllCheckbox();
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
		var url = "reportgen_countryPolicyLogsReport?reportType=" + reportType
				+ "&fileName=country_policy_log_report.csv&reportColumns="
				+ globalArrayUserSummaryColumn + "&domainName="
				+ domainNameCountryPolicyLog + genCountryPolicyLogFilter;
		$('#user_logon_id').val(adminLogonId);
		$('#app_name').val(applicationName);
		$('#user_activity').val(activityId);
		$('#request_time').val(activityTimeId);
		$('#user_role').val(roleId);
		$('#reportForm').attr("action", url);
		$('#reportForm').submit();
		globalShowPopupWindow = true;
		//resetAllCheckbox();
	}
}


function exportCountryPolicyLogsReport() {
	
	var arrayUserSummaryColumn = $.map(
			$('input[name="country_policy_report_column"]:checked'), function(c) {
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


function searchCountryPolicyLogsReport(e) {
	if (e.keyCode === 13)
		countryPolicyLogReportSearch();
}

function validateCountryPolicyLogSearch() {
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


function slideDownOnCountryClick(_countries) {
	
	var _countries = _countries.split(',');

	var content = ' <table class="table table-striped table-bordered" id="sample_1_slideDown">';
	content += '<thead>';
	content += '<tr>';
	content += '<th style="width:5%;">Sr.</th>';
	content += '<th>Country(s)</th>';
	content += '</thead>';
	
	if (_countries != null && _countries != '') {
		jQuery.each(_countries, function(i, v) {
			content += "<tr>";
			content += "<td>" + (i + 1) + "</td>";
			content += "<td>" + _countries[i] + "</td>";
			content += "</tr>";
		});
	} 
	content += "</table>";
	$('#_block_show_country_log_report_data').html(content);
	$('#sample_1_slideDown').dataTable();
	$("#sample_1_slideDown").css("width", "100%");
	
}

function validateExcelCount(){
	if(searchCount > 500000){
		return false;
	}
	return true;
}
function validatePDFCount(){
	if(searchCount > 200000){
		return false;
	}
	return true;
}

function validateXMLCount(){
	if(searchCount > 100000){
		return false;
	}
	return true;
}
