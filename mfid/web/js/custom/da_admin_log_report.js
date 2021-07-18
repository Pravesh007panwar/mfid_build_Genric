var allAdminLogData;
var searchCount=0;
var countDaAdminLogsReportPage=0;

var globalAdminLogsReportPreviouspageSize = "";
var globalAdminLogsReportPreviousPageNum = "";
var searchDaAdminLogReportWithpageSize = false;

var global_from_date = '';
var global_to_date = '';
var from_date = getAddDaysToCurrentDate();
var to_date = getCurrentDate();
var globalArrayDaAdminLogColumn='';
var genAdminLogFilter ='';
var globalShowPopupWindow = true;

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


function removeFilter(){
	 $('#getAdminLogonId').val("");
	 $('#getUserLogonId').val("");
	 $('#getActivity').val("");
	 $('#getActivityType').val("");
	 $('#getActivityTime').val("");
	 $('#getReason').val("");
}

function getDaAdminLogReportDatewise(){
	
		
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
		 showDaAdminLogReport(false,false);
}

function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
	}

function getPageData() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
		var totalPages = $('#pageN').text();
		var pageNumber = document.getElementById('pageNum').value;
		if (pageNumber == "" || (pageNumber == "0" && parseInt(totalPages) > 0)) {
			$('#pageNum').val(1);
		}
		if ($.trim(pageNumber) != ""
				&& parseInt(pageNumber) <= parseInt(totalPages))
			showDaAdminLogReport(true, false);
		else
			alert('Page should be less than or equal to page number.');
	}
}

function fetchSize() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
		var maxSize = countDaAdminLogsReportPage;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (countDaAdminLogsReportPage == 0) {
			$('#pageNum').val(0);
		} else {
			$('#pageNum').val(1);
			$('#pageNum').attr("disabled", false);
		}
		$('#pageN').html(parseInt(maxPgaeNumber));

	}

}

var getAdminLogonId="";
var getUserLogonId="";
var getActivity="";
var getActivityType="";
var getActivityTime="";
var getReason="";

function showDaAdminLogReport(pageCall, isSearch) {
	 if(typeof(pageCall) == 'undefined' && typeof(isSearch) == 'undefined' ) {
		 try{ $("#pageId").val(''); $("#pageNum").val(''); }catch(err){}
	  }
	 try{
	if ($("#pageId").length) {
			globalAdminLogsReportPreviouspageSize = $("#pageId").val();
			globalAdminLogsReportPreviousPageNum = $("#pageNum").val();
	 }
	
	 if(from_date.indexOf('/')!=-1){
  	       from_date=from_date.split("/")[2]+"-"+from_date.split("/")[1]+"-"+from_date.split("/")[0]+" 00:00:00";
		   to_date=to_date.split("/")[2]+"-"+to_date.split("/")[1]+"-"+to_date.split("/")[0]+" 23:59:59";
      }
	var myUrl="report_daAdminLogReport.action?fromDate="+from_date+"&toDate="+to_date;
	var dataString="";
	if(pageCall==true){
		var size=document.getElementById('pageId').value;
		var pageNumber=document.getElementById('pageNum').value;
		myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
	}
	
	if(getAdminLogonId!="" ||  getUserLogonId!="" || getActivity!="" || getActivityType!="" || getActivityTime!="" || getReason!=""){
		isSearch=true;
	}
	
	if(isSearch){
		getAdminLogonId=document.getElementById('getAdminLogonId').value;
		getAdminLogonId = getAdminLogonId.replace(/\s/g, "");
		
		getUserLogonId=document.getElementById('getUserLogonId').value;
		getUserLogonId = getUserLogonId.replace(/\s/g, "");
		
		getActivity=document.getElementById('getActivity').value;
		getActivity = getActivity.replace(/\s/g, "");
		
		getActivityType=document.getElementById('getActivityType').value;
		getActivityType = getActivityType.replace(/\s/g, "");
		
		getActivityTime=document.getElementById('getActivityTime').value;
		getActivityTime = getActivityTime.replace(/\s/g, "");
		
		getReason=document.getElementById('getReason').value;
		getReason = getReason.replace(/\s/g, "");
		
		dataString+="&adminLogonId="+getAdminLogonId+"&userLogonId="+getUserLogonId+"&activity="+getActivity+"&activityType="+getActivityType+"&reason="+getReason+"&activityTime="+getActivityTime;
		
	}
	genAdminLogFilter = "&"+myUrl.split("?")[1];

	if(searchDaAdminLogReportWithpageSize) {  
	  if(myUrl.indexOf('fetchSize')==-1) { 
		  if($.trim(globalAdminLogsReportPreviouspageSize)!='')
			  myUrl+="&fetchSize="+globalAdminLogsReportPreviouspageSize; 
		  }
	}

	    $.ajax({
		 	
				type : "POST",
				url : myUrl,
				data : dataString,
				dataType : "text",
				success : function(data) {
					if ($.trim(data) == "sessionout") {
						alert("sessionout");
						var testVal = document.getElementById('loginPage').value;
						window.location.replace(testVal);
					}
				if(data!="" && data!=null){
					var object = JSON.parse(data);
					var obj1 = JSON.parse(object.daAdminLogReportList);
					var obj2 = JSON.parse(object.count);
					
					allAdminLogData = obj1;
					if (searchDaAdminLogReportWithpageSize) {
						searchCount = obj2;
						countDaAdminLogsReportPage = obj2;
					} else {
						countDaAdminLogsReportPage = obj2;
						searchCount = obj2;
					}
				 }
					var content = '<h4></h4><div class="space15"></div>';
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
					content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="getDaAdminLogReportDatewise()" />';
					content += '</div>';
					content += '<div class="clear"></div>';
					content += '</div>';
					content += '<div class="space15"></div>';

					content += '<div class="row-fluid ">';
					content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId" onChange="fetchSize(),getPageData();" style="width:100%;">';
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

					content += '</select>';
					content += '</div>';
					content += '</div>';
					content += '<div class="span6">';
					content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;" >';
					content += '<label>Page Number</label>';

					content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
					content += '</div>';
					content += '</div>';
					content += '</div>';
					content += '<table class="table table-striped table-bordered" id="sample_1_1">';
					content += '<thead>';
					content += '<tr>';
					content += '<th></th>';
					content += '<th>DA LogonId</th>';
					content += '<th>User LogonId</th>';
					content += '<th>Activity</th>';
					content += '<th>Activity Type</th>';
					content += '<th>Reason</th>';
					content += '<th>Activity Time</th>';
					content += '</tr>';
					content += '<tr>';
					content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="daAdminLogReportSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					content += '<th><input type="text" onkeydown="searchDaAdminLogReport(event)" id="getAdminLogonId" /></th>';
					content += '<th><input type="text" onkeydown="searchDaAdminLogReport(event)" id="getUserLogonId" /></th>';
					content += '<th><input type="text" onkeydown="searchDaAdminLogReport(event)" id="getActivity" /></th>';
					content += '<th><select id="getActivityType">';
					content += '<option value="">select</option>';
					content += '<option value="create_country_policy">create_country_policy</option>';
					content += '<option value="edit_country_policy">edit_country_policy</option>';
					content += '<option value="delete_country_policy">delete_country_policy</option>';
					content += '<option value="delete_device_decision">delete_device_decision</option>';
					content += '<option value="delete_activated_device">delete_activated_device</option>';
					content += '</select></th>';
					content += '<th><input type="text" onkeydown="searchDaAdminLogReport(event)" id="getReason" /></th>';					
					content += '<th><input type="text" onkeydown="searchDaAdminLogReport(event)" id="getActivityTime" /></th>';

					content += '</tr>';
					content += '</thead>';

					try {
						if (obj1 != null && obj1 != '') {
							var counterSr = 0;
							jQuery
									.each(
											obj1,
											function(i, v) {
												counterSr++;
												content+="<tr>";
												content+="<td>"+counterSr+"</td>";
												content+="<td>"+v.adminLogonId+"</td>";
												content+="<td>"+v.userLogonId+"</td>";
												content+="<td>"+v.activity+"</td>";
												content+="<td>"+v.activityType+"</td>";
												content+="<td>"+v.reason+"</td>";
												content+="<td>"+v.activityTime+"</td>";
										
												content+="</tr>";
											});
						} else
							content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";

					} catch (e) {
						// alert(e);
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
						content1 += "<input type='hidden' name='daAdminLogonId' id='daAdminLogonId'/>";
						content1 += "<input type='hidden' name='userLogonId' id='userLogonId'/>";
						content1 += "<input type='hidden' name='activity' id='activity'/>";
						content1 += "<input type='hidden' name='activityType' id='activityType'/>";
						content1 += "<input type='hidden' name='reason' id='reason'/>";
						content1 += "<input type='hidden' name='activityTime' id='activityTime'/>";
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

					$('#getAdminLogonId').val(getAdminLogonId);
					$('#getUserLogonId').val(getUserLogonId);
					$('#getActivity').val(getActivity);
					$('#getActivityType').val(getActivityType);
					$('#getActivityTime').val(getActivityTime);
					$('#getReason').val(getReason);
					
					

					if ($.trim(globalAdminLogsReportPreviouspageSize) != '') {
						$("#pageId").val(globalAdminLogsReportPreviouspageSize);
						fetchSize();
						if (!searchDaAdminLogReportWithpageSize)
							$("#pageNum").val(
									globalAdminLogsReportPreviousPageNum);
						else {
							if (globalAdminLogsReportPreviousPageNum == 0
									&& parseInt($('#pageN_failure').text()) > 0)
								globalAdminLogsReportPreviousPageNum = "1";
							$("#pageNum").val(
									globalAdminLogsReportPreviousPageNum);
						}
					}

					$("#getactivityTimeId").datepicker({
						dateFormat : "yy-mm-dd"
					}).val();

					$("#from_date").datepicker({
						dateFormat : "dd/mm/yy"
					}).val();
					$("#to_date").datepicker({
						dateFormat : "dd/mm/yy"
					}).val();
					if (global_from_date != '' && global_to_date != '') {
						$("#from_date").val(global_from_date);
						$("#to_date").val(global_to_date);
					} else {
						$("#from_date").val(getAddDaysToCurrentDate());
						$("#to_date").val(getCurrentDate());
					}

					if (pageCall == false) {
						var size = 10;
						if (globalAdminLogsReportPreviouspageSize != '') {
							size = parseInt(globalAdminLogsReportPreviouspageSize);
							countDaAdminLogsReportPage = searchCount;
						}
						if (getAdminLogonId != "" || getUserLogonId != "" || getActivity != ""
								|| getActivityType != ""
								|| getActivityTime != "" || getReason != "") {
							countDaAdminLogsReportPage = searchCount;
						}
						if (countDaAdminLogsReportPage == 0) {
							countDaAdminLogsReportPage = searchCount;
						}
						var maxPgaeNumber = countDaAdminLogsReportPage / size;
						var rem = countDaAdminLogsReportPage % size;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						$('#pageN').html(parseInt(maxPgaeNumber));
						if (countDaAdminLogsReportPage == 0)
							$('#pageNum').val(0);
						else
							$('#pageNum').val(1);
					}

					if (getAdminLogonId == "" || getUserLogonId == "" || getActivity == ""
							|| getActivityType == "" || getActivityTime == "" || getReason == "") {
						searchDaAdminLogReportWithpageSize = false;
					}

				}
			});
	 } catch(e){
		 
	 }
}

function searchDaAdminLogReport(e) {  
	 if (e.keyCode === 13)   
		daAdminLogReportSearch();
}


function daAdminLogReportSearch() {
	searchDaAdminLogReportWithpageSize=true;
	showDaAdminLogReport(false,true);
}


function callCsvReport()
{	 globalReportType = "csv";
	if(globalShowPopupWindow)
	$('#daAdminLogModal').modal('show')  
	else{
	$('#daAdminLogModal').modal('hide')
	var reportType="csv";
	var url="reportgen_getDaAdminLogReport?reportType="+reportType+"&fileName=da_admin_log_report.csv&reportColumns="+globalArrayDaAdminLogColumn+genAdminLogFilter;
	$('#daAdminLogonId').val(getAdminLogonId);
	$('#userLogonId').val(getUserLogonId);
	$('#activity').val(getActivity);
	$('#activityType').val(getActivityType);
	$('#reason').val(getReason);
	$('#activityTime').val(getActivityTime);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	
	}
}

function callExcelReport()
{	
	if(validateExcelCount()){
	globalReportType = "excel";
	if(globalShowPopupWindow)
		$('#daAdminLogModal').modal('show')  
	else{
		$('#daAdminLogModal').modal('hide')	
	var reportType="excel";
		var url="reportgen_getDaAdminLogReport?reportType="+reportType+"&fileName=da_admin_log_report.xlsx&reportColumns="+globalArrayDaAdminLogColumn+genAdminLogFilter;
		$('#daAdminLogonId').val(getAdminLogonId);
		$('#userLogonId').val(getUserLogonId);
		$('#activity').val(getActivity);
		$('#activityType').val(getActivityType);
		$('#reason').val(getReason);
		$('#activityTime').val(getActivityTime);
		$('#reportForm').attr("action",url);
		$('#reportForm').submit();
	globalShowPopupWindow=true;
	}
	} else {
		alert('Your data is more than 500000. Please download the report in CSV Format!');
	}
}


function callXmlReport()
{	
	if(validateXMLCount()) {
	globalReportType = "xml";
	if(globalShowPopupWindow)
	  $('#daAdminLogModal').modal('show')  
	else{
	 $('#daAdminLogModal').modal('hide')	
	var reportType="xml";
	 var url="reportgen_getDaAdminLogReport?reportType="+reportType+"&fileName=da_admin_log_report.xml&reportColumns="+globalArrayDaAdminLogColumn+genAdminLogFilter;
	
	$('#daAdminLogonId').val(getAdminLogonId);
	$('#userLogonId').val(getUserLogonId);
	$('#activity').val(getActivity);
	$('#activityType').val(getActivityType);
	$('#reason').val(getReason);
	$('#activityTime').val(getActivityTime);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	}
	} else {
		alert('Your data is more than 100000. Please download the report in CSV Format!');
	}
}


function callPdfReport()
{	
	if(validatePDFCount()){
	globalReportType = "pdf";
    if(globalShowPopupWindow)
	  $('#daAdminLogModal').modal('show')  
	else{
	 $('#daAdminLogModal').modal('hide')	
	var reportType="pdf";
	var url="reportgen_getDaAdminLogReport?reportType="+reportType+"&fileName=da_admin_log_report.pdf&reportColumns="+globalArrayDaAdminLogColumn+genAdminLogFilter;
	$('#daAdminLogonId').val(getAdminLogonId);
	$('#userLogonId').val(getUserLogonId);
	$('#activity').val(getActivity);
	$('#activityType').val(getActivityType);
	$('#reason').val(getReason);
	$('#activityTime').val(getActivityTime);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
    }
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
 }

function exportDaAdminLogsReport() {
		var arrayUserSummaryColumn = $.map(
			$('input[name="daadminlogreportcolumn"]:checked'), function(c) {
				return c.value;
			})
	if (arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "") {
		alert("please select at least one column for Export. ");
	} else {
		globalArrayDaAdminLogColumn = arrayUserSummaryColumn;
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