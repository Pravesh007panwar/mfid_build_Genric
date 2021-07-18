var userUserLogsCount;
var searchCount;
var userUserLogsList;
var searchUserLogsReportWithpageSize = false;
var globalShowPopupWindowUser = true;
var globalArrayUserSummaryColumnUser = '';
var globalReportTypeUser = '';
var globalPersistUserReportDomainValue = '';
var from_date_user = getAddDaysToCurrentDate();
var to_date_user = getCurrentDate();
var global_from_date_user = '';
var global_to_date_user = '';
var generateUserLogsReportFilter = '';

var globalUserLogsReportPreviouspageSize = "";
var globalUserLogsReportPreviousPageNum = "";
var userLogonId = "";
var systemName = "";
var bioCount = "";
var pushCount = "";
var otpCount = "";
function openUserLogsReport(pageCall, pageSearch, domain) {

	try {

		if ($("#pageIdUserLogsReport").length) {
			globalUserLogsReportPreviouspageSize = $("#pageIdUserLogsReport")
					.val();
			globalUserLogsReportPreviousPageNum = $("#pageNumUserLogsReport")
					.val();
		}

		if (from_date_user.indexOf('/') != -1) {
			from_date_user = from_date_user.split("/")[2] + "-"
					+ from_date_user.split("/")[1] + "-"
					+ from_date_user.split("/")[0] + " 00:00:00";
			to_date_user = to_date_user.split("/")[2] + "-"
					+ to_date_user.split("/")[1] + "-"
					+ to_date_user.split("/")[0] + " 23:59:59";
		}

		var myUserUrl = "report_userSubUserLogsReport.action?fromDate="
				+ from_date_user + "&toDate=" + to_date_user + "&domain="
				+ domain;
		var dataString = "";
		if (pageCall) {
			var pageUserNumber = document
					.getElementById("pageNumUserLogsReport").value;
			var fetchUserSize = document.getElementById("pageIdUserLogsReport").value;
			myUserUrl += "&fetchSize=" + fetchUserSize + "&pageNumber="
					+ pageUserNumber;
		}

		if(userLogonId != "" || systemName!="" || bioCount!="" || pushCount != "" || otpCount!=""){
			 pageSearch=true;
		 } 
		
		if (pageSearch) {
			$('#user_sub_logs_tiles_type').empty();
			userLogonId = $("#userLogonId").val();
			userLogonId = userLogonId.replace(/\s/g, "");
			systemName = $('#systemName').val();
			systemName = systemName.replace(/\s/g, "");
			bioCount = $('#bioCount').val();
			pushCount = $('#pushCount').val();
			otpCount = $('#otpCount').val();
			
			dataString += "&userLogonId=" + userLogonId + "&systemName="
					+ systemName + "&bioCount=" + bioCount + "&pushCount="
					+ pushCount + "&otpCount=" + otpCount;
		}

		if (searchUserLogsReportWithpageSize) {
			if (myUserUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalUserLogsReportPreviouspageSize) != '')
					myUserUrl += "&fetchSize="
							+ globalUserLogsReportPreviouspageSize;
			}
		}

		generateUserLogsReportFilter = "&" + myUserUrl.split("?")[1];
		$('#user_userlogs_report_data').html('<span>Loading...</span>');
		   $.ajax({
					type : 'POST',
					url : myUserUrl,
					data : dataString,
					dataType : 'text',
					success : function(data) {
						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var obj = JSON.parse(data);
						var obj1 = JSON.parse(obj.userUserLogsReport);
						var obj2 = JSON.parse(obj.userUserLogsCount);
						var obj3 = JSON.parse(obj.domainList);
						userUserLogsList = JSON.parse(obj.userUserLogsReport);
						if (searchUserLogsReportWithpageSize) {
							searchCount = obj2;
							userUserLogsCount = obj2;
							//obj2 = userUserLogsCount;
						} else {
							userUserLogsCount = obj2;
							searchCount = obj2;
						}

						var content = '<h4></h4><div class="space15"></div>';
						content += '<div class="row-fluid">';
						content += '<div class="span3">';
						content += '<label>Domain : </label>';
						content += '<select id="userDomain" name="userDomain">';
						content += '<option value="">Select Domain</option>';
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
						content += '<input type="text" name="from_date_user" id="from_date_user" readonly style="cursor:pointer;"/>';
						content += '</div>';

						content += '<div class="span3 offset0">';
						content += '<label>To : </label>';
						content += '<input type="text" name="to_date_user" id="to_date_user" readonly style="cursor:pointer;"/>';
						content += '</div>';

						content += '<div class="span3 offset0">';
						content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date_user" onClick="getUserLogsReportDatewise()" />';
						content += '</div>';
						content += '<div class="clear"></div>';
						content += '</div>';
						content += '<div class="space15"></div>';

						content += '<div class="row-fluid">';
						content += '<div  class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageIdUserLogsReport" onChange="fetchSizeUserLogsReport(),getPageDataUserLogsReport();" style="width:100%;" name="pageIdUserLogsReport">';
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
						/*content += '<select onChange="getPageDataUserLogsReport()" id="pageNumUserLogsReport"  >';
						content += '<option value="">Select Page</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNumUserLogsReport" style="width:20%;background-color:white;" onChange="getPageDataUserLogsReport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageNUserLogsReport"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_user_report">';
						content += '<thead>';
						content += '<tr>';
						content += '<th>Sr.No.</th>';
						content += '<th>User LogonId</th>';
						content += '<th>System Id</th>';
						content += '<th>Bio</th>';
						content += '<th>Push</th>';
						content += '<th>OTP</th>';
						content += '</tr>';
						content += '</thead>';
						content += '<tr>';
						content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="searchUserData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchUserDataReport(event)"  name="userLogonId" id="userLogonId" ></th>'
						content += '<th><input type="text" onkeydown="searchUserDataReport(event)"  name="systemName" id="systemName" ></th>';
						content += '<th><input type="text" onkeydown="searchUserDataReport(event)" name="bioCount" id="bioCount" ></th>';
						content += '<th><input type="text" onkeydown="searchUserDataReport(event)" name="pushCount" id="pushCount" ></th>';
						content += '<th><input type="text" onkeydown="searchUserDataReport(event)" name="otpCount" id="otpCount" ></th>';
						content += '</tr>';
						if (obj1 != null && obj1 != '') {
							jQuery
									.each(
											obj1,
											function(ind, val) {

												i = ind + 1;
												content += "<tr>";
												content += "<td>" + i + "</td>";

												content += "<td>"
														+ val.userLogonId
														+ "</td>";
												content += "<td>"
														+ val.systemName
														+ "</td>";
												content += "<td><a href='javascript:void(0);' data='"
														+ val.systemName
														+ ","
														+ val.userLogonId
														+ "' class='userBioClick' >"
														+ val.bioCount
														+ "</a></td>";
												content += "<td><a href='javascript:void(0);' data='"
														+ val.systemName
														+ ","
														+ val.userLogonId
														+ "' class='userPushClick' >"
														+ val.pushCount
														+ "</a></td>";
												content += "<td><a href='javascript:void(0);' data='"
														+ val.systemName
														+ ","
														+ val.userLogonId
														+ "' class='userOtpClick' >"
														+ val.otpCount
														+ "</a></td>";
												content += "</tr>";

											});

						} else {
							content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";
						}

						content += "</table>";
						$('#user_userlogs_report_data').html(content);
						if (userUserLogsList != null && userUserLogsList != '') {
							exportContent = "<div class=\"span4\"><h4>Export options:</h4></div>";
							exportContent += "<div class=\"span8\" >";
							exportContent += "<form method=\"POST\" id=\"userReportForm\" >";
							exportContent += "<input type='hidden' name='userLogonId' id='user_name'/>";
							exportContent += "<input type='hidden' name='systemName' id='system_name'/>";
							exportContent += "<input type='hidden' name='bioCount' id='bio_count'/>";
							exportContent += "<input type='hidden' name='pushCount' id='push_count'/>";
							exportContent += "<input type='hidden' name='otpCount' id='otp_count'/>";
							exportContent += "<ul>";

							exportContent += "<li><a href=\"#\" onClick=\"callUserLogsCsvReport()\" class=\"btn btn-primary\">CSV</a></li>";
							exportContent += "<li><a href=\"#\" onClick=\"callUserLogsExcelReport()\" class=\"btn btn-primary\">Excel</a></li>";
							exportContent += "<li><a href=\"#\" id=\"xml\"  onClick=\"callUserLogsXmlReport()\" class=\"btn btn-primary\">XML</a></li>";
							exportContent += "<li><a href=\"#\" id=\"pdf\"  onClick=\"callUserLogsPdfReport()\" class=\"btn btn-primary\">PDF</a></li>";
							exportContent += "</ul>";
							exportContent += "</form>";
							exportContent += "</div>";
							$("#expo_opt").html(exportContent);
						} else {
							$("#expo_opt").html("");
						}
						$("#sample_user_report").css("width", "100%");
						
						$('#userLogonId').val(userLogonId);
						$('#systemName').val(systemName);
						$('#bioCount').val(bioCount);
						$('#pushCount').val(pushCount);
						$('#otpCount').val(otpCount);

						if ($.trim(globalUserLogsReportPreviouspageSize) != '') {
							$('#pageIdUserLogsReport').val(
									globalUserLogsReportPreviouspageSize);
							fetchSizeUserLogsReport();
							if (!searchUserLogsReportWithpageSize) {
								$('#pageNumUserLogsReport').val(
										globalUserLogsReportPreviousPageNum);
							} else {
								if(globalUserLogsReportPreviousPageNum==0 && parseInt($('#pageNUserLogsReport').text())> 0 )
									globalUserLogsReportPreviousPageNum="1";
								$('#pageNumUserLogsReport').val(
										globalUserLogsReportPreviousPageNum);
							}
						}

						if ($.trim(globalPersistUserReportDomainValue) != '') {
							$('#userDomain').val(
									globalPersistUserReportDomainValue);
						}
						

						$("#from_date_user").datepicker({
							dateFormat : "dd/mm/yy"
						}).val();
						$("#to_date_user").datepicker({
							dateFormat : "dd/mm/yy"
						}).val();

						if (global_from_date_user != ''
								&& global_to_date_user != '') {
							$("#from_date_user").val(global_from_date_user);
							$("#to_date_user").val(global_to_date_user);
						} else {
							$("#from_date_user").val(getAddDaysToCurrentDate());
							$("#to_date_user").val(getCurrentDate());
						}
						
						if(pageCall==false){
							var size = 10;
							if (globalUserLogsReportPreviouspageSize != '') {
								size = parseInt(globalUserLogsReportPreviouspageSize);
								userUserLogsCount = searchCount;
							}
							
							if(userLogonId != "" || systemName!="" || bioCount!="" || pushCount != "" || otpCount!=""){
								userUserLogsCount = searchCount;
							 } 
							if(userUserLogsCount == 0){
								userUserLogsCount = searchCount;
							}
							var maxPgaeNumber = userUserLogsCount / size;
							var rem = userUserLogsCount % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageNUserLogsReport').html(parseInt(maxPgaeNumber));
							if(userUserLogsCount == 0)
								$('#pageNumUserLogsReport').val(0);
							else 
								$('#pageNumUserLogsReport').val(1);
						}
						
						if(userLogonId == "" && systemName=="" && bioCount=="" && pushCount == "" && otpCount==""){
							searchUserLogsReportWithpageSize = false;
						 } 

					}
				});
	} catch (e) {
		alert(e);
	}
}

function fetchSizeUserLogsReport() {
	
	var userLogsSize = $('#pageIdUserLogsReport').val();
	if ($.trim(userLogsSize) != '') {
		var userLogsMaxSize = userUserLogsCount;
		var userLogsMaxPageNumber = userLogsMaxSize / userLogsSize;
		var remainderSize = userLogsMaxSize % userLogsSize;
		if (remainderSize > 0) {
			userLogsMaxPageNumber = userLogsMaxPageNumber + 1;
		}
		
		if(userUserLogsCount==0){
			$('#pageNumUserLogsReport').val(0);
		} else{
			$('#pageNumUserLogsReport').val(1);
			$('#pageNumUserLogsReport').attr("disabled",false);
		} 				
		$('#pageNUserLogsReport').html(parseInt(userLogsMaxPageNumber));
	
	} 
}

function getPageDataUserLogsReport() {
	
	var userLogsSize = $('#pageIdUserLogsReport').val();
	if ($.trim(userLogsSize) != '') {
	var pageNumberUserLogs = document.getElementById('pageNumUserLogsReport').value;
	var userDomain = document.getElementById("userDomain").value;
	var totalPages =  $('#pageNUserLogsReport').text();
	if(pageNumberUserLogs=="" || (pageNumberUserLogs=="0" && parseInt(totalPages) > 0 )){ $('#pageNumUserLogsReport').val(1);}
	if ($.trim(pageNumberUserLogs) != "" && parseInt(pageNumberUserLogs) <= parseInt(totalPages)) {
		$('#user_sub_logs_tiles_type').empty();
		openUserLogsReport(true, false, userDomain);
	} else 
		alert('Page should be less than or equal to page number.');
	}

}

function getUserLogsReportDatewise() {
	var userDomain = document.getElementById("userDomain").value;
	if ($.trim(userDomain) == "") {
		alert("Please select domain");
		return;
	} else {
		globalPersistUserReportDomainValue = userDomain;
		from_date_user = $("#from_date_user").val();
		to_date_user = $("#to_date_user").val();
		if (from_date_user == "" || from_date_user == undefined
				|| from_date_user == null) {
			alert("Please select start time stamp");
			return;
		}
		if (to_date_user == "" || to_date_user == undefined
				|| to_date_user == null) {
			alert("Please select end time stamp");
			return;
		}
		if (process(from_date_user) > process(to_date_user)) {
			alert("To timestamp can not be same or less than the from timestamp");
			return;
		}

		global_from_date_user = $("#from_date_user").val();
		global_to_date_user = $("#to_date_user").val();
		$("#pageIdUserLogsReport").val('');
		$("#pageNumUserLogsReport").val('');
		$('#user_sub_logs_tiles_type').empty();
		openUserLogsReport(false, false, userDomain);
	}
}

function process(date) {
	var parts = date.split("/");
	return new Date(parts[2], parts[1] - 1, parts[0]);
}

function searchUserData() {
	if (validateSearchUserData()) {
		var userDomain = document.getElementById("userDomain").value;
		searchUserLogsReportWithpageSize = true;
		openUserLogsReport(false, true, userDomain);
	} else {
		validateSearchUserData();
	}

}
function searchUserDataReport(e) {
	if (e.keyCode === 13)
		searchUserData();
}

function callUserLogsCsvReport() {
	globalReportTypeUser = "csv";
	if (globalShowPopupWindowUser) {
		$('#myModalUser').modal('show');
	} else {
		$('#myModalUser').modal('hide');

		var reportType = "csv";
		var url = "reportgen_userSubUserLogsReport?reportType=" + reportType
				+ "&fileName=UserLogReport.csv&reportColumns="
				+ globalArrayUserSummaryColumnUser
				+ generateUserLogsReportFilter;
		$('#user_name').val(userLogonId);
		$('#system_name').val(systemName);
		$('#bio_count').val(bioCount);
		$('#push_count').val(pushCount);
		$('#otp_count').val(otpCount);
		$('#userReportForm').attr("action", url);
		$('#userReportForm').submit();
		globalShowPopupWindowUser = true;
		// resetAllCheckboxUser();
	}

}

function callUserLogsExcelReport() {
	if (validateExcelCount()) {
		globalReportTypeUser = "excel";
		if (globalShowPopupWindowUser) {
			$('#myModalUser').modal('show');
		} else {
			$('#myModalUser').modal('hide');

			var reportType = "excel";
			var url = "reportgen_userSubUserLogsReport?reportType="
					+ reportType
					+ "&fileName=UserLogReport.xlsx&reportColumns="
					+ globalArrayUserSummaryColumnUser
					+ generateUserLogsReportFilter;
			$('#user_name').val(userLogonId);
			$('#system_name').val(systemName);
			$('#bio_count').val(bioCount);
			$('#push_count').val(pushCount);
			$('#otp_count').val(otpCount);
			$('#userReportForm').attr("action", url);
			$('#userReportForm').submit();
			globalShowPopupWindowUser = true;
			// resetAllCheckboxUser();
		}
	} else {
		alert('Your data is more than 500000. Please download the report in CSV Format!');
	}
}

function callUserLogsXmlReport() {
	if (validateXMLCount()) {

		globalReportTypeUser = "xml";
		if (globalShowPopupWindowUser) {
			$('#myModalUser').modal('show');
		} else {
			$('#myModalUser').modal('hide');

			var reportType = "xml";
			var url = "reportgen_userSubUserLogsReport?reportType="
					+ reportType + "&fileName=UserLogReport.xml&reportColumns="
					+ globalArrayUserSummaryColumnUser
					+ generateUserLogsReportFilter;
			$('#user_name').val(userLogonId);
			$('#system_name').val(systemName);
			$('#bio_count').val(bioCount);
			$('#push_count').val(pushCount);
			$('#otp_count').val(otpCount);
			$('#userReportForm').attr("action", url);
			$('#userReportForm').submit();
			globalShowPopupWindowUser = true;
			// resetAllCheckboxUser();
		}
	} else {
		alert('Your data is more than 100000. Please download the report in CSV Format!');
	}
}

function callUserLogsPdfReport() {
	if (validatePDFCount()) {

		globalReportTypeUser = "pdf";
		if (globalShowPopupWindowUser) {
			$('#myModalUser').modal('show');
		} else {
			$('#myModalUser').modal('hide');

			var reportType = "pdf";
			var url = "reportgen_userSubUserLogsReport?reportType="
					+ reportType + "&fileName=UserLogReport.pdf&reportColumns="
					+ globalArrayUserSummaryColumnUser
					+ generateUserLogsReportFilter;
			$('#user_name').val(userLogonId);
			$('#system_name').val(systemName);
			$('#bio_count').val(bioCount);
			$('#push_count').val(pushCount);
			$('#otp_count').val(otpCount);
			$('#userReportForm').attr("action", url);
			$('#userReportForm').submit();
			globalShowPopupWindowUser = true;
			// resetAllCheckboxUser();
		}
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
}

function exportUserLogReportUser() {
	var arrayUserSummaryColumn = $.map(
			$('input[name="usersubuserlogreportcolumn"]:checked'), function(c) {
				return c.value;
			})
	if (arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "") {
		alert("Please Select at least one column for Export. ");
	} else {
		globalArrayUserSummaryColumnUser = arrayUserSummaryColumn;
		globalShowPopupWindowUser = false;

		if (globalReportTypeUser == "csv")
			callUserLogsCsvReport();
		else if (globalReportTypeUser == "excel")
			callUserLogsExcelReport();
		else if (globalReportTypeUser == "xml")
			callUserLogsXmlReport();
		else if (globalReportTypeUser == "pdf")
			callUserLogsPdfReport();
	}
}

function validateSearchUserData() {
	var users = $('#userLogonId').val();
	if (users != undefined && users != "") {
		users = users.replace(/\s/g, " ");
		var user = users.split(',');
		var len = user.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#userLogonId').val("");
			return false;
		}
	}
	var systemName = $('#systemName').val();
	if (systemName != undefined && systemName != "") {
		systemName = systemName.replace(/\s/g, " ");
		var system = systemName.split(',');
		var len = system.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#systemName').val("");
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