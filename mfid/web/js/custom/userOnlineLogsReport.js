
var count;
var searchCount;
var onlineLogList;
var searchUserOnlineLogsReportWithpageSize=false;
var globalShowPopupWindowOnline = true;
var globalArrayUserSummaryColumnOnline = '';
var globalReportTypeOnline='';
var globalPersistOnlineReportDomainValue='';
var from_date_online = getAddDaysToCurrentDate();
var to_date_online = getCurrentDate();
var global_from_date_online = '';
var global_to_date_online = '';
var genOnlineReportFilter = '';

function getPageData_onlinelogreport() {

	var size = document.getElementById('pageId_logreport').value;
	if ($.trim(size) != '') {
	var domain = document.getElementById("onlineDomain").value;
	var totalPages =  $('#pageN_logreport').text();
	var pageNumber = document.getElementById('pageNum_logreport').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_logreport').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		openUserOnlineLogsReport(true, false, domain);
	else
		alert('Page should be less than or equal to page number.');
	}
}


function fetchSize_onlinelogreport() {
	
	var size = document.getElementById('pageId_logreport').value;

	if ($.trim(size) != '') {

		var maxSize = count;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(count==0){
			$('#pageNum_logreport').val(0);
		} else{
			$('#pageNum_logreport').val(1);
			$('#pageNum_logreport').attr("disabled",false);
		} 				
		$('#pageN_logreport').html(parseInt(maxPgaeNumber));
	
	}
		
}

var globalUserOnlineLogsReportPreviouspageSize="";
var globalUserOnlineLogsReportPreviousPageNum="";

var userLogonId="";
var appId="";
var response="";
var requestTime="";
var ip="";
var token="";
var userTokenType="";
function openUserOnlineLogsReport(pageCall, pageSearch, domain) {
	try {
		if ($("#pageId_logreport").length) {
			globalUserOnlineLogsReportPreviouspageSize = $("#pageId_logreport")
					.val();
			globalUserOnlineLogsReportPreviousPageNum = $("#pageNum_logreport")
					.val();
		}

		if (from_date_online.indexOf('/') != -1) {
			from_date_online = from_date_online.split("/")[2] + "-"
					+ from_date_online.split("/")[1] + "-"
					+ from_date_online.split("/")[0] + " 00:00:00";
			to_date_online = to_date_online.split("/")[2] + "-"
					+ to_date_online.split("/")[1] + "-"
					+ to_date_online.split("/")[0] + " 23:59:59";
		}

		$("#user_offlinelogs_report_data").empty();
		$("#user_pushlogs_report_data").empty();
		var myUrl = "report_userLogsReport.action?logs_type=match&fromDate="
				+ from_date_online + "&toDate=" + to_date_online + "&domain="
				+ domain;
		var dataString = "";
		if (pageCall) {
			var pageNumber = document.getElementById("pageNum_logreport").value;
			var fetchSize = document.getElementById("pageId_logreport").value;
			myUrl += "&fetchSize=" + fetchSize + "&pageNumber=" + pageNumber;

		}

		if(userLogonId!="" || appId!="" || response!="" || requestTime!="" || ip!="" || token!=""
			|| userTokenType!="") {
			pageSearch = true;
		}
		
		if (pageSearch) {

			userLogonId = $('#userLogonId').val();
			userLogonId = userLogonId.replace(/\s/g, "");
			appId = $('#applId').val();
			appId = appId.replace(/\s/g, "");
			response = $('#response').val();
			response = response.replace(/\s/g, "");
			requestTime = $('#requestTime').val();
			requestTime = requestTime.replace(/\s/g, "");
			ip = $('#ip').val();
			ip = ip.replace(/\s/g, "");
			token = $('#token').val();
			token = token.replace(/\s/g, "");
			userTokenType = $('#userTokenType').val();
			
			dataString += "&userName=" + userLogonId + "&appName=" + appId
					+ "&result=" + response + "&requestTime=" + requestTime
					+ "&ip=" + ip + "&tokenSerial=" + token + "&authtype="
					+ userTokenType;

		}

		if (searchUserOnlineLogsReportWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalUserOnlineLogsReportPreviouspageSize) != '')
					myUrl += "&fetchSize="
							+ globalUserOnlineLogsReportPreviouspageSize;
			}
		}

		genOnlineReportFilter = "&" + myUrl.split("?")[1];

			$.ajax({
					type : "POST",
					url : myUrl,
					data : dataString,
					dataType : "text",
					success : function(data) {

						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var obj = JSON.parse(data);
						var obj1 = JSON.parse(obj.logList);
						var obj2 = JSON.parse(obj.count);
						var obj3 = JSON.parse(obj.domainList);
						onlineLogList = JSON.parse(obj.logList);

						if (searchUserOnlineLogsReportWithpageSize) {
							searchCount = obj2;
							count = obj2;
							//obj2 = count;
						} else {
							count = obj2;
							searchCount = obj2;
						}

						var content = '<h4></h4><div class="space15"></div>';

						content += '<div class="row-fluid">';
						content += '<div class="span3">';
						content += '<label>Domain : </label>';
						content += '<select id="onlineDomain" name="swiDomain">';
						content += '<option value="">-select domain-</option>';
						jQuery.each(obj3, function(i, v) {
							var tempDomainList = obj3[i];
							content += '<option value="' + tempDomainList
									+ '" >' + tempDomainList + '</option>';
						});
						content += '</select>';
						content += '</div>';

						content += '<div class="row-fluid">';
						content += '<div class="span3 offset0">';
						content += '<label>From : </label>';
						content += '<input type="text" name="from_date_online" id="from_date_online" readonly style="cursor:pointer;"/>'; // add
																																		// abhimanyu
						content += '</div>';

						content += '<div class="span3 offset0">';
						content += '<label>To : </label>';
						content += '<input type="text" name="to_date_online" id="to_date_online" readonly style="cursor:pointer;"/>'; // add
						content += '</div>';

						content += '<div class="span3 offset0">';
						content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="getUserLogOnlineReportDatewise()" />';
						content += '</div>';
						content += '<div class="clear"></div>';
						content += '</div>';

						content += '<div class="space15"></div>';

						content += '<div class="row-fluid">';
						content += '<div  class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_logreport" onChange="fetchSize_onlinelogreport(),getPageData_onlinelogreport();" style="width:100%;" name="deassociationReasonListName">';
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
						// content += '<option value="10000">10000</option>';
						content += '</select>';

						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_onlinelogreport()" id="pageNum_logreport"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_logreport" style="width:20%;background-color:white;" onChange="getPageData_onlinelogreport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_logreport"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_4">';
						content += '<thead>';
						content += '<tr>';
						content += '<th>Sr.No.</th>';
						content += '<th>UserLogonId</th>';
						content += '<th>App Id</th>';
						content += '<th>System Name</th>';
						content += '<th>Token Type</th>';
						content += '<th>Response</th>';
						content += '<th>RequestTime</th>';

						content += '<th>IP</th>';
						content += '</tr>';

						content += '</thead>';
						content += '<tr>';
						content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="search_onlineData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchOnlineDataReport(event)"  name="userLogonId" id="userLogonId" ></th>';
						content += '<th><input type="text" onkeydown="searchOnlineDataReport(event)" name="appId" id="applId" ></th>';
						content += '<th><input type="text" onkeydown="searchOnlineDataReport(event)" name="token" id="token" ></th>';
						content += '<th><select id="userTokenType"><option value="">Select Token Type</option><option value="hardToken">Hard Token</option><option value="mobileToken">Mobile Token</option><option value="smsToken">SMS Token</option><option value="bioToken">Bio Token</option><option value="pushtoken">Push Token</option><option value="emergencyToken">Emergency Token</option><option value="noToken">noToken</option></select></th>';
						content += '<th><input type="text" onkeydown="searchOnlineDataReport(event)" name="response" id="response" ></th>';
						content += '<th><input type="text" onkeydown="searchOnlineDataReport(event)" name="requestTime" id="requestTime" ></th>';
						content += '<th><input type="text" onkeydown="searchOnlineDataReport(event)" name="ip" id="ip" ></th>';
						content += '</tr>';

						if (obj1 != null && obj1 != '') {

							jQuery.each(obj1, function(ind, val) {

								i = ind + 1;
								content += "<tr>";
								content += "<td>" + i + "</td>";

								content += "<td>" + val.userLogonId + "</td>";
								content += "<td>" + val.appId + "</td>";
								if (val.token == undefined || val.token == '') {
									var tokenConten = 'N/A';
								} else {
									var tokenConten = val.token;
								}
								content += "<td>" + tokenConten + "</td>";
								content += "<td>" + val.authType + "</td>";
								content += "<td>" + val.response + "</td>";
								content += "<td>" + val.requestTime + "</td>";

								content += "<td>" + val.ip + "</td>";
								content += "</tr>";

							});

						} else {
							content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";
						}
						content += "</table>";
						$('#user_onlinelogs_report_data').html(content);
						if (onlineLogList != null && onlineLogList != '') {
							content1 = "<div class='span4'><h4>Export options:</h4></div>";
							content1 += "<div class='span8' >";
							content1 += "<form method='post' id='reportForm'> ";
							content1 += "<input type='hidden' name='userName' id='user_name'/>";
							content1 += "<input type='hidden' name='appName' id='app_name'/>";
							content1 += "<input type='hidden' name='result' id='response_result'/>";
							content1 += "<input type='hidden' name='requestTime' id='request_time'/>";
							content1 += "<input type='hidden' name='ip' id='ip_address'/>";
							content1 += "<input type='hidden' name='tokenSerial' id='token_serial'/>";
							content1 += "<input type='hidden' name='authtype' id='auth_type'/>";
							content1 += "<ul>";
							content1 += "<li><a href='#' onClick='callOnlineLogCsvReport()' class='btn btn-primary'>CSV</a></li>";
							content1 += "<li><a href='#' onClick='callOnlineLogExcelReport()' class='btn btn-primary'>Excel</a></li>";
							content1 += "<li><a href='#' id='xml' data='xml' onClick='callOnlineLogXmlReport()' class='btn btn-primary'>XML</a></li>";
							content1 += "<li><a href='#' id='pdf' data='pdf' onClick='callOnlineLogPdfReport()' class='btn btn-primary'>PDF</a></li>";
							content1 += "</ul>";
							content1 += "</form>";
							content1 += "</div>";
							$('#expo_opt').html(content1);
						} else {
							$('#expo_opt').html('');
						}
						$("#sample_4").css("width", "100%");

						$('#userLogonId').val(userLogonId);
						$('#applId').val(appId);
						$('#token').val(token);
						$('#userTokenType').val(userTokenType);
						$('#response').val(response);
						$('#requestTime').val(requestTime);
						$('#ip').val(ip);
												
						if ($.trim(globalUserOnlineLogsReportPreviouspageSize) != '') {
							$("#pageId_logreport").val(
									globalUserOnlineLogsReportPreviouspageSize);
							fetchSize_onlinelogreport();
							if (!searchUserOnlineLogsReportWithpageSize)
								$("#pageNum_logreport")
										.val(globalUserOnlineLogsReportPreviousPageNum);
							else{
								if(globalUserOnlineLogsReportPreviousPageNum==0 && parseInt($('#pageN_logreport').text()) > 0)
									globalUserOnlineLogsReportPreviousPageNum="1";
								$("#pageNum_logreport")
								.val(globalUserOnlineLogsReportPreviousPageNum);
							}
						}
						if ($.trim(globalPersistOnlineReportDomainValue) != '') {
							$("#onlineDomain").val(
									globalPersistOnlineReportDomainValue);

						}
						//searchUserOnlineLogsReportWithpageSize = false;

						$("#from_date_online").datepicker({
							dateFormat : "dd/mm/yy"
						}).val();
						$("#to_date_online").datepicker({
							dateFormat : "dd/mm/yy"
						}).val();
						if (global_from_date_online != ''
								&& global_to_date_online != '') {
							$("#from_date_online").val(global_from_date_online);
							$("#to_date_online").val(global_to_date_online);
						} else {
							$("#from_date_online").val(
									getAddDaysToCurrentDate());
							$("#to_date_online").val(getCurrentDate());
						}
						
						if(pageCall==false){
							var size = 10;
							if (globalUserOnlineLogsReportPreviouspageSize != '') {
								size = parseInt(globalUserOnlineLogsReportPreviouspageSize);
								count = searchCount;
							}
							
							if(userLogonId!="" || appId!="" || response!="" || requestTime!="" || ip!="" || token!=""
									|| userTokenType!="") {
								count = searchCount;
							} 
							if(count == 0){
								count = searchCount;
							}
							var maxPgaeNumber = count / 10;
							var rem = count % 10;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN_logreport').html(parseInt(maxPgaeNumber));
							if(count == 0)
								$('#pageNum_logreport').val(0);
							else 
								$('#pageNum_logreport').val(1);
						}
						if(userLogonId=="" && appId=="" && response=="" && requestTime=="" && ip=="" && token==""
							&& userTokenType=="") {
							  searchUserOnlineLogsReportWithpageSize = false;
						} 
					}
				});

	} catch (e) {
		alert(e);
	}
}

function search_onlineData() {
	if (validateOnlineSearch()) {
		var domain = document.getElementById("onlineDomain").value;
		searchUserOnlineLogsReportWithpageSize = true;
		openUserOnlineLogsReport(false, true, domain);
	} else {
		validateOnlineSearch();
	}

}

function callOnlineLogPdfReport() {
	if (validatePDFCount()) {

		try {
			globalReportTypeOnline = "pdf";
			if (globalShowPopupWindowOnline)
				$('#myModalonline').modal('show')
			else {
				$('#myModalonline').modal('hide')
				var reportType = "pdf";
				var url = "reportgen_onlineLogReport?reportType=" + reportType
						+ "&fileName=user_onlineLog_report.pdf&reportColumns="
						+ globalArrayUserSummaryColumnOnline
						+ genOnlineReportFilter;
				$('#user_name').val(userLogonId);
				$('#app_name').val(appName);
				$('#response_result').val(response);
				$('#request_time').val(requestTime);
				$('#ip_address').val(ip);
				$('#token_serial').val(token);
				$('#auth_type').val(userTokenType);
				$('#reportForm').attr("action", url);
				$('#reportForm').submit();
				globalShowPopupWindowOnline = true;
				resetAllCheckboxOnline();
			}

		} catch (e) {
			alert(e);
		}

	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
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


function getCurrentDate() {
	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = (('' + day).length < 2 ? '0' : '') + day + '/'
			+ (('' + month).length < 2 ? '0' : '') + month + '/'
			+ d.getFullYear();
	return output;
}

function callOnlineLogXmlReport() {
	if (validateXMLCount()) {
		globalReportTypeOnline = "xml";
		if (globalShowPopupWindowOnline)
			$('#myModalonline').modal('show')
		else {
			$('#myModalonline').modal('hide')
			var reportType = "xml";
			var url = "reportgen_onlineLogReport?reportType=" + reportType
					+ "&fileName=user_onlineLog_report.xml&reportColumns="
					+ globalArrayUserSummaryColumnOnline
					+ genOnlineReportFilter;
			$('#user_name').val(userLogonId);
			$('#app_name').val(appName);
			$('#response_result').val(response);
			$('#request_time').val(requestTime);
			$('#ip_address').val(ip);
			$('#token_serial').val(token);
			$('#auth_type').val(userTokenType);
			$('#reportForm').attr("action", url);
			$('#reportForm').submit();
			globalShowPopupWindowOnline = true;
			resetAllCheckboxOnline();
		}
	} else {
		alert('Your data is more than 100000. Please download the report in CSV Format!');
	}
}

function callOnlineLogExcelReport() {
	if (validateExcelCount()) {
		globalReportTypeOnline = "excel";
		if (globalShowPopupWindowOnline)
			$('#myModalonline').modal('show')
		else {
			$('#myModalonline').modal('hide')
			var reportType = "excel";
			var url = "reportgen_onlineLogReport?reportType=" + reportType
					+ "&fileName=user_onlineLog_report.xlsx&reportColumns="
					+ globalArrayUserSummaryColumnOnline
					+ genOnlineReportFilter;
			$('#user_name').val(userLogonId);
			$('#app_name').val(appName);
			$('#response_result').val(response);
			$('#request_time').val(requestTime);
			$('#ip_address').val(ip);
			$('#token_serial').val(token);
			$('#auth_type').val(userTokenType);
			$('#reportForm').attr("action", url);
			$('#reportForm').submit();
			globalShowPopupWindowOnline = true;
			resetAllCheckboxOnline();
		}
	} else {
		alert('Your data is more than 500000. Please download the report in CSV Format!');
	}
}

function callOnlineLogCsvReport() {
	globalReportTypeOnline = "csv";
	if (globalShowPopupWindowOnline)
		$('#myModalonline').modal('show')
	else {
		$('#myModalonline').modal('hide')
		var reportType = "csv";
		var url = "reportgen_onlineLogReport?reportType=" + reportType
				+ "&fileName=user_onlineLog_report.csv&reportColumns="
				+ globalArrayUserSummaryColumnOnline + genOnlineReportFilter;
		$('#user_name').val(userLogonId);
		$('#app_name').val(appName);
		$('#response_result').val(response);
		$('#request_time').val(requestTime);
		$('#ip_address').val(ip);
		$('#token_serial').val(token);
		$('#auth_type').val(userTokenType);
		$('#reportForm').attr("action", url);
		$('#reportForm').submit();
		globalShowPopupWindowOnline = true;
		resetAllCheckboxOnline();
	}
}




function exportUserLogReportOnline() {

	var arrayUserSummaryColumn = $.map(
			$('input[name="onlineuserlogreportcolumn"]:checked'), function(c) {
				return c.value;
			})
	if (arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "") {
		alert("please select at least one column for Export. ");
	} else {
		globalArrayUserSummaryColumnOnline = arrayUserSummaryColumn;
		globalShowPopupWindowOnline = false;

		if (globalReportTypeOnline == "pdf")
			callOnlineLogPdfReport();
		else if (globalReportTypeOnline == "xml")
			callOnlineLogXmlReport();
		else if (globalReportTypeOnline == "excel")
			callOnlineLogExcelReport();
		else if (globalReportTypeOnline == "csv")
			callOnlineLogCsvReport();

	}

}


function process(date) {
	var parts = date.split("/");
	return new Date(parts[2], parts[1] - 1, parts[0]);
}

function getUserLogOnlineReportDatewise() {
	var domain = document.getElementById("onlineDomain").value;

	if ($.trim(domain) == "") {
		alert("Please select domain");
		return;
	} else {
		globalPersistOnlineReportDomainValue = domain;
		from_date_online = $("#from_date_online").val();
		to_date_online = $("#to_date_online").val();
		if (from_date_online == "" || from_date_online == undefined
				|| from_date_online == null) {
			alert("Please select start time stamp");
			return;
		}

		if (to_date_online == "" || to_date_online == undefined
				|| to_date_online == null) {
			alert("Please select end time stamp");
			return;
		}

		if (process(from_date_online) > process(to_date_online)) {
			alert("To timestamp can not be same or less than the from timestamp");
			return;
		}

		global_from_date_online = $("#from_date_online").val();
		global_to_date_online = $("#to_date_online").val();
		$("#pageId_logreport").val('');
		$("#pageNum_logreport").val('');
		openUserOnlineLogsReport(false, false, domain);
	}

}


/*function getUserLogReportDatewise(reportId)
{
  if(reportId == 1)
   {    
	    from_date_online=$("#from_date_online").val();
	    to_date_online=$("#to_date_online").val();
	    openUserOnlineLogsReport(false,false);
  }
else if(reportId == 2)
	{   
	    from_date_offline=$("#from_date_offline").val();
	    to_date_offline=$("#to_date_offline").val();
	    openUserOfflineLogsReport(false,false);
	  }
else if(reportId == 3)
    {   
        from_date_push=$("#from_date_push").val();
        to_date_push=$("#to_date_push").val();
        openUserPushLogsReport(false,false);
    }
     
}*/

function searchOnlineDataReport(e) {
	if (e.keyCode === 13)
		search_onlineData();
}

function validateOnlineSearch() {
	var userLogonId = $('#userLogonId').val();
	if (userLogonId != undefined && userLogonId != "") {
		userLogonId = userLogonId.replace(/\s/g, " ");
		var user = userLogonId.split(',');
		var len = user.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#userLogonId').val("");
			return false;
		}
	}
	var systemName = $('#token').val();
	if (systemName != undefined && systemName != "") {
		systemName = systemName.replace(/\s/g, " ");
		var system = systemName.split(',');
		var len = system.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#token').val("");
			return false;
		}
	}

	var res = $('#response').val();
	if (res != undefined && res != "") {
		res = res.replace(/\s/g, " ");
		var result = res.split(',');
		var len = result.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#response').val("");
			return false;
		}
	}
	var requestTime = $('#requestTime').val();
	if (requestTime != undefined && requestTime != "") {
		requestTime = requestTime.replace(/\s/g, " ");
		var reqTime = requestTime.split(',');
		var len = reqTime.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#requestTime').val("");
			return false;
		}
	}
	var ipAdd = $('#ip').val();
	if (ipAdd != undefined && ipAdd != "") {
		ipAdd = ipAdd.replace(/\s/g, " ");
		var ip = ipAdd.split(',');
		var len = ip.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#ip').val("");
			return false;
		}
	}
	return true;
}
