function removeFilter(){
	$("#authtype").val("");
	$("#userName").val("");
	$("#application").val("");
	$('#domain').val("");
}
var org;
var count;
var searchCount;
var searchNeverUseAuthenticationReportWithpageSize = false;
var globalShowPopupWindow = true;
var globalArrayUserSummaryColumn = '';
var globalReportType = '';
var genReportFilter = '';

var userName = '';
var application = '';
var domain = ''
var authtype = ''

var neverloglist;
function getPageData_assignDeasign() {
	var size = document.getElementById('pageId_assign').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_assign').text();
	var pageNumber = document.getElementById('pageNum_assign').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_assign').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		openNeveruseAthentication(org, true, false);
	else
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_assignDeasign() {
	try {
		var size = document.getElementById('pageId_assign').value;
		if ($.trim(size) != '') {
			var maxSize = count;
			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(count==0){
				$('#pageNum_assign').val(0);
			} else{
				$('#pageNum_assign').val(1);
				$('#pageNum_assign').attr("disabled",false);
			} 				
			$('#pageN_assign').html(parseInt(maxPgaeNumber));
			
		} 			
	} catch (e) {
		alert(e)
	}
}

var globalNeverUseAuthenticationReportPreviouspageSize = "";
var globalNeverUseAuthenticationReportPreviousPageNum = "";
function openNeveruseAthentication(organisation, pageCall, pageSearch) {
	org = organisation;
	try {

		if ($("#pageId_assign").length) {
			globalNeverUseAuthenticationReportPreviouspageSize = $(
					"#pageId_assign").val();
			globalNeverUseAuthenticationReportPreviousPageNum = $(
					"#pageNum_assign").val();
		}
		
		$('#user_detail_athentication_data').hide();
		var myUrl = "report_runUerNaeverLoggedInReport";
		var dataString="";
		
		if (!$("#from_date").length) {
			var from_date = getAddDaysToCurrentDate();
			var to_date = getCurrentDate();
		} else {

			from_date = document.getElementById("from_date").value;
			to_date = document.getElementById("to_date").value;
		}

		myUrl += "?fromDate=" + from_date + "&toDate=" + to_date;
		if (pageCall) {
			var size = document.getElementById('pageId_assign').value;
			var pageNumber = document.getElementById('pageNum_assign').value;
			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber;
		}
		 if(userName!="" || application!="" || domain!="" || authtype!=""){
			 pageSearch=true;
		 }
		
		if (pageSearch) {

			 userName = document.getElementById("userName").value;
				userName = userName.replace(/\s/g, "");
			 application = document.getElementById("application").value;
				application = application.replace(/\s/g, "");
			 domain = document.getElementById("domain").value;
				domain = domain.replace(/\s/g, "");
			 authtype = document.getElementById("authtype").value;
			
			dataString+= "&userName=" + userName + "&application=" + application
			+ "&domain=" + domain + "&authtype=" + authtype;
		}

		if (searchNeverUseAuthenticationReportWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalNeverUseAuthenticationReportPreviouspageSize) != '')
					myUrl += "&fetchSize="
							+ globalNeverUseAuthenticationReportPreviouspageSize;
			}
		}
	
		genReportFilter ="&"+myUrl.split("?")[1];
		$.ajax({
					type : "POST",
					url : myUrl,
					data : dataString,
					dataType : "text",
					async : true,
					success : function(data) {
					
						if ($.trim(data) == "sessionout") {

							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var obj = JSON.parse(data);

						var obj1 = JSON.parse(obj.reportList);
						neverloglist = JSON.parse(obj.reportList);
						var obj2 = JSON.parse(obj.count);
						var obj3 = JSON.parse(obj.domainList);
						if (searchNeverUseAuthenticationReportWithpageSize){
							searchCount = obj2;
							count = obj2;
							//obj2 = count;
						} else {
							count = obj2;
							searchCount = obj2;
						}
						var content = '';
						content += '<div class="row-fluid">';
						content += '<div class="span3">';
						content += '<label>Domain : </label>';
						content += '<select onChange="showAppList()" class="ass-dss-select span12" name="ass_deass" id="never_logged_report_domain">';
						content += '<option value="">-Domain-</option>';
						jQuery.each(obj3, function(i, v) {
							var tempDomainList = obj3[i];

							content += '<option value="' + tempDomainList
									+ '" >' + tempDomainList + '</option>';
						});
						content += '</select>';
						content += '</div>';
						content += '<div class="span3 offset6">';
						content += '<label>Application : </label>';
						content += '<select onChange="refresh_data()" class="ass-dss-select span12" name="application" id="never_logged_report_appList">';
						content += '<option value="All">-Application-</option>';

						content += '</select>';
						content += '</div>';
						content += '<div class="clear"></div>';
						content += '</div>';
						content += '<div class="row-fluid">';

						content += '<div class="span3">';
						content += '<label>From : </label>';
						content += '<input type="text" name"from_date" id="from_date" readonly style="cursor:pointer;"/>';
						content += '</div>';

						content += '<div class="span3">';
						content += '<label>To : </label>';
						content += '<input type="text" name"to_date" id="to_date" readonly style="cursor:pointer;"/>'; 
						content += '</div>';
						content += '<div class="span1">';
						content += '<button type="button" onClick="refresh_data()" id="never_u_ath_search" class="btn btn-primary" style="margin-top: 25px;">Search</button>';
						content += '</div>';
						content += '<div class="clear"></div>';
						content += '</div>';

						content += '<div class="row-fluid">';
						content += '<div  class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_assign" onChange="fetchSize_assignDeasign(),getPageData_assignDeasign();" name="deassociationReasonListName" style="width:100%;">';
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
						/*content += '<select onChange="getPageData_assignDeasign()" id="pageNum_assign"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_assign" style="width:20%;background-color:white;" onChange="getPageData_assignDeasign()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_assign"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';

						content += '<div id="myDiv">';
						content += '<table class="table table-striped table-bordered" id="sample_3">';
						content += '<thead>';
						content += '<tr>';
						content += '<th>Sr No.<input type="hidden" id="dynamicFilterValue" name="dynamicFilterValue" value="" /></th>';
						content += '<th>User LogonId</th>';
						content += '<th>Application</th>';
						content += '<th>Domain</th>';
						content += '<th>Token Type</th>';
						content += '</tr>';
						content += '<tr>';
						content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="search_data()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text"  onkeydown="searchNeverUseAuthenticationReport(event)" id="userName" name="userName"/></th>';
						content += '<th><input type="text"  onkeydown="searchNeverUseAuthenticationReport(event)" id="application" name="application"/></th>';
						content += '<th><input type="text"  onkeydown="searchNeverUseAuthenticationReport(event)" id="domain" name="domain"/></th>';
						content += '<th>';
						content += '<select class="ass-dss-select span12" name="authtype" id="authtype" >';
						content += '<option value="all">All</option>';
						content += '<option value="hardToken">Hard Token</option>';
						content += '<option value="bioToken">Bio Token</option>';
						content += '<option value="mobileToken">Mobile Token</option>';
						content += '<option value="pushToken">Push Token</option>';
						content += '<option value="smsToken">SMS Token</option>';
						content += '<option value="emergencyToken">Emergency Token</option>';
						content += '</select>';
						content += '</th>';
						content += '</tr>';

						content += '</thead>';
						if (count != 0 && obj1 != null) {
							jQuery.each(obj1, function(i, v) {

								i = (i + 1);
								content += "<tr>";
								content += "<td>" + i + "</td>";
								content += "<td>" + v.userName + "</td>";
								content += "<td>" + v.appName + "</td>";
								content += "<td>" + v.domainName + "</td>";

								content += "<td>" + v.authenticationType 
										+ "</td>";
								
								content += "</tr>";
							});
						} else {
							content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
						}

						content += "</table>";
						content += '</div>';
						$('#block_never_use_athentication_data').html(content);
						if (neverloglist != null && neverloglist != '') {
							content1 = "<div class='span4'><h4>Export options:</h4></div>";
							content1 += "<div class='span8' >";
							content1 += "<form method='post' id='reportForm'> ";
							content1 += "<input type='hidden' name='userName' id='user_name'/>";
							content1 += "<input type='hidden' name='application' id='app_name'/>";
							content1 += "<input type='hidden' name='domain' id='domain_name'/>";
							content1 += "<input type='hidden' name='authtype' id='auth_type'/>";
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
						
						$('#userName').val(userName);
						$('#application').val(application);
						$('#domain').val(domain);
						$('#authtype').val(authtype);
						
						
						$('#to_date').datetimepicker({
							dayOfWeekStart : 1
						});
						
						$('#from_date').datetimepicker({
							dayOfWeekStart : 1
						});

						$("#from_date").val(getAddDaysToCurrentDate());

						$("#to_date").val(getCurrentDate());
						if ($.trim(globalNeverUseAuthenticationReportPreviouspageSize) != '') {
							$("#pageId_assign")
									.val(globalNeverUseAuthenticationReportPreviouspageSize);
							fetchSize_assignDeasign();
							if (!searchNeverUseAuthenticationReportWithpageSize)
								$("#pageNum_assign")
										.val(globalNeverUseAuthenticationReportPreviousPageNum);
							else{
								if(globalNeverUseAuthenticationReportPreviousPageNum==0 && parseInt($('#pageN_assign').text())>0)
									globalNeverUseAuthenticationReportPreviousPageNum="1";
								$("#pageNum_assign")
										.val(globalNeverUseAuthenticationReportPreviousPageNum);
								
							}
						}
												
						if(pageCall==false){
							var size=10;
							if(globalNeverUseAuthenticationReportPreviouspageSize!=''){
								size=globalNeverUseAuthenticationReportPreviouspageSize;
								count = searchCount;
							}
							if(userName!="" || application!="" || domain!="" || authtype!=""){
								count = searchCount;
							 }
							if(count==0){
								count = searchCount;
							}
							var maxPgaeNumber = count / size;
							var rem = count % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN_assign').html(parseInt(maxPgaeNumber));
							if(count == 0)
								$('#pageNum_assign').val(0);
							else 
								$('#pageNum_assign').val(1);
						}
						
						if(userName=="" && application=="" && domain=="" && authtype==""){
							searchNeverUseAuthenticationReportWithpageSize = false;
						 }
					}

				});
		
	} catch (e) {
		alert(e);
	}
}

function showDomainListForManageRole() {

	try {
			$.ajax({
					url : 'GetDomainAction.action?organisationName=' + org,
					cache : false,
					async : false,
					dataType : "json",
					success : function(data) {
						if ($.trim(data) == "sessionout") {

							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var listData = new Array();

						$.each(data.Messages, function(i, data) {

							listData.push([ data ]);
						});
						var sel = document
								.getElementById('never_logged_report_domain');
						for (var i = 0; i < listData.length; i++) {
							var opt = sel.options;
							opt[opt.length] = new Option(listData[i],
									listData[i])
						}
					}
				});
	} catch (e) {
		alert("in " + e);
	}
}

function showAppList() {

	var value = document.getElementById("never_logged_report_domain").value;

	if (value == "") {
		document.getElementById('never_logged_report_appList').options.length = 1;
	} else {

		document.getElementById('never_logged_report_appList').options.length = 0;
		var listData = new Array();
		$.ajax({

			url : 'ApplicationMFIDAction.action?switchDomainName='
					+ $('#never_logged_report_domain').val(),
			cache : false,
			dataType : "text",

			success : function(data) {
				if ($.trim(data) == "sessionout") {
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				}

				var obj = JSON.parse(data);

				var obj1 = JSON.parse(obj.reportList);

				if (obj1 != null) {
					$.each(obj1, function(i, data) {
						listData.push([ data ]);
					});
				}

				var sel = document
						.getElementById('never_logged_report_appList');
				var opt1 = sel.options;
				opt1[opt1.length] = new Option("All", "All");
				for (var i = 0; i < listData.length; i++) {
					var opt = sel.options;
					opt[opt.length] = new Option(listData[i], listData[i])

				}
			}

		});
		refresh_data();
	}

}

function refresh_data() {

	try {
		var app = document.getElementById('never_logged_report_appList').value;
		var domain = document.getElementById("never_logged_report_domain").value;
		var from = document.getElementById("from_date").value;
		var to = document.getElementById("to_date").value;
		if($.trim(domain) == ""){
			alert("Please select domain");
			return;
		}
		
		if (from == "" || from == undefined || from == null) {
			alert("Please select start time stamp");
			return;
		}

		if (to == "" || to == undefined || to == null) {
			alert("Please select end time stamp");
			return;
		}

		if (new Date(from) > new Date(to)) {
			alert("To timestamp can not be same or less than the from timestamp");
			return;
		}

		var myUrl = "report_runUerNaeverLoggedInReport.action?appName=" + app
				+ "&domain=" + domain + "&fromDate=" + from + "&toDate=" + to;

			$.ajax({
					type : "POST",
					url : myUrl,
					dataType : "text",
					async : true,

					success : function(data) {
						if ($.trim(data) == "sessionout") {

							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						
						var obj = JSON.parse(data);

						var obj1 = JSON.parse(obj.reportList);
						neverloglist = JSON.parse(obj.reportList);
						var obj2 = JSON.parse(obj.count);
						count = obj2;

						var content = '<table class="table table-striped table-bordered" id="sample_3">';
						content += '<thead>';
						content += '<tr>';
						content += '<th>Sr No.</th>';
						content += '<th>User LogonId</th>';
						content += '<th>Application</th>';
						content += '<th>Domain</th>';
						content += '<th>Token Type</th>';
						content += '</tr>';

						content += '<tr>';
						content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="search_data()" ><i style="font-size:20px;" class="icon-search"></i></a></th>';
						content += '<th><input type="text" id="userName" name="userName"/></th>';
						content += '<th><input type="text" id="application" name="application"/></th>';
						content += '<th><input type="text" id="domain" name="domain"/></th>';
						content += '<th>';
						content += '<select class="ass-dss-select span12" name="authtype" id="authtype" >';
						content += '<option value="all">All</option>';
						content += '<option value="hardToken">Hard Token</option>';
						content += '<option value="bioToken">Bio Token</option>';
						content += '<option value="mobileToken">Mobile Token</option>';
						content += '<option value="pushToken">Push Token</option>';
						content += '<option value="smsToken">SMS Token</option>';
						content += '<option value="emergencyToken">Emergency Token</option>';
						content += '</select>';
						content += '</th>';
						content += '</tr>';
						content += '</thead>';
						if (obj1 != null && count != 0) {
							jQuery.each(obj1, function(i, v) {

								i = (i + 1);
								content += "<tr>";
								content += "<td>" + i + "</td>";
								content += "<td>" + v.userName + "</td>";
								content += "<td>" + v.appName + "</td>";
								content += "<td>" + v.domainName + "</td>";

								content += "<td>" + v.authenticationType
										+ "</td>";
								
								content += "</tr>";
							});
						} else {

							content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
						}
						content += "</table>";

						$('#myDiv').html(content);
						if (neverloglist != null && neverloglist != '') {
							content1 = "<div class='span4'><h4>Export options:</h4></div>";
							content1 += "<div class='span8' >";
							content1 += "<form method='post' id='reportForm'> ";
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
						$("#sample_3").css("width", "100%");
						$('#pageNum_assign').val(1);
						
						/*$('#pageId_assign').val('');
						$('#pageNum_assign').val('');
						$("#pageNum_assign").empty().append(
								'<option value="">-select Page-</option>');*/
					}

				});

	} catch (e) {
		
	}

}

function getCurrentDate() {
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = d.getFullYear() + '-' + (('' + month).length < 2 ? '0' : '')
			+ month + '-' + (('' + day).length < 2 ? '0' : '') + day + ' 23:59';
	return output;
}

function getAddDaysToCurrentDate() {
	var d = new Date();
	d.setDate(d.getDate() - 7);
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = d.getFullYear() + '-' + (('' + month).length < 2 ? '0' : '')
			+ month + '-' + (('' + day).length < 2 ? '0' : '') + day + ' 00:00';
	return output;

}

function search_data() {
	searchNeverUseAuthenticationReportWithpageSize = true;
	openNeveruseAthentication(org, false, true);
}

function callPdfReport() {
	
	if(validatePDFCount()){
	var result = "";
	globalReportType = "pdf";
	if (globalShowPopupWindow)
		$('#myModal1').modal('show')
	else {
		$('#myModal1').modal('hide')
		var reportType = "pdf";
	
		var url = "reportgen_neverUseAuthenticationReport?reportType="
				+ reportType 
				+ "&fileName=noAuthenticationAttempt_report.pdf&reportColumns="
				+ globalArrayUserSummaryColumn+genReportFilter;
		
		$('#user_name').val(userName);
		$('#app_name').val(application);
		$('#domain_name').val(domain);
		$('#auth_type').val(authtype);
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
	
	if(validateXMLCount()) {
	globalReportType = "xml";
	if (globalShowPopupWindow)
		$('#myModal1').modal('show')
	else {
		$('#myModal1').modal('hide')
		var reportType = "xml";
		var url = "reportgen_neverUseAuthenticationReport?reportType="
				+ reportType
				+ "&fileName=noAuthenticationAttempt_report.xml&reportColumns="
				+ globalArrayUserSummaryColumn+genReportFilter;
		$('#user_name').val(userName);
		$('#app_name').val(application);
		$('#domain_name').val(domain);
		$('#auth_type').val(authtype);
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
	
	if(validateExcelCount()){
	globalReportType = "excel";
	if (globalShowPopupWindow)
		$('#myModal1').modal('show')
	else {
		$('#myModal1').modal('hide')
		var reportType = "excel";
		var url = "reportgen_neverUseAuthenticationReport?reportType="
				+ reportType
				+ "&fileName=noAuthenticationAttempt_report.xlsx&reportColumns="
				+ globalArrayUserSummaryColumn+genReportFilter;
		$('#user_name').val(userName);
		$('#app_name').val(application);
		$('#domain_name').val(domain);
		$('#auth_type').val(authtype);
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
		var url = "reportgen_neverUseAuthenticationReport?reportType="
				+ reportType
				+ "&fileName=noAuthenticationAttempt_report.csv&reportColumns="
				+ globalArrayUserSummaryColumn+genReportFilter;
		$('#user_name').val(userName);
		$('#app_name').val(application);
		$('#domain_name').val(domain);
		$('#auth_type').val(authtype);
		$('#reportForm').attr("action", url);
		$('#reportForm').submit();
		globalShowPopupWindow = true;
		resetAllCheckbox();
	}
}

function exportNeverUseAuthenticationReport() {
	
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

function searchNeverUseAuthenticationReport(e) {
	if (e.keyCode === 13)
		search_data();
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
