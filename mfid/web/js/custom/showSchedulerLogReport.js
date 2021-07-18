function removeFilter(){
	$('#getSchedulerName').val("");
	$('#getactivityTimeId').val("");
	$('#getStatus').val("");
	$('#getReason').val("");
}

var searchCount;
var count;
var searchSchedulerLogsReportWithpageSize=false;

function getPageData() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN').text();
	var pageNumber = document.getElementById('pageNum').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))		
		showSchedulerLogsReport(true, false);
	else
		alert('Page should be less than or equal to page number.');
	}
}


function fetchSize() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
		var maxSize = count;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (count == 0) {
			$('#pageNum').val(0);
		} else {
			$('#pageNum').val(1);
			$('#pageNum').attr("disabled", false);
		}
		$('#pageN').html(parseInt(maxPgaeNumber));
	} 

}


var globalSchedulerLogsReportPreviouspageSize="";
var globalSchedulerLogsReportPreviousPageNum="";

var schedulerName="";
var activityTimeId="";
var status="";
var reason="";
 function showSchedulerLogsReport(pageCall, isSearch) {
	
	if (typeof (pageCall) == 'undefined' && typeof (isSearch) == 'undefined') {
		try {
			$("#pageId").val('');
			$("#pageNum").val('');
		} catch (err) {
		}
	}
	try {
		
		if ($("#pageId").length) {
			globalSchedulerLogsReportPreviouspageSize = $("#pageId").val();
			globalSchedulerLogsReportPreviousPageNum = $("#pageNum").val();
		}
		
		var myUrl = "report_schedulerLogReport.action";
		var dataString = "";

		if (pageCall == true) {
			var size = document.getElementById('pageId').value;
			var pageNumber = document.getElementById('pageNum').value;
			myUrl += "?fetchSize=" + size + "&pageNumber=" + pageNumber;
		}

		if(schedulerName!="" || activityTimeId!="" || status!="" || reason!=""){
			isSearch=true;
		} 
		
		if (isSearch) {
			schedulerName = document.getElementById('getSchedulerName').value;
			schedulerName = schedulerName.replace(/\s/g, "");
			activityTimeId = document.getElementById('getactivityTimeId').value;
			status = document.getElementById('getStatus').value;
			status = status.replace(/\s/g, "");
			reason = document.getElementById('getReason').value;
			reason = reason.replace(/\s/g, "");
			
			dataString += "&logsType=" + schedulerName + "&activityTime="+ activityTimeId + "&responseResult="+ status + "&reason="+reason;
		}
		
		if (searchSchedulerLogsReportWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalSchedulerLogsReportPreviouspageSize) != '')
					myUrl += "?fetchSize="
							+ globalSchedulerLogsReportPreviouspageSize;
			}
		}
				
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
						var obj1 = JSON.parse(object.schedulerLogReportList);
						var obj2 = JSON.parse(object.count);
						if (searchSchedulerLogsReportWithpageSize){
							searchCount = obj2;
							count = obj2;
							//obj2 = count;
						} else {
							count = obj2;
							searchCount = obj2;
						}
					
						
						var content = '<h4>User</h4><div class="space15"></div>';

						var content = '<div class="row-fluid ">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId" onChange="fetchSize(),getPageData();" style="width:100%">';
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
						content += '<th>Schedular Name</th>';
						content += '<th>Activity Time</th>';
						content += '<th>Status</th>';
						content += '<th>Reason</th>';
						content += '</tr>';
						content += '<tr>';
						content += '<th style="padding-bottom: 15px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="schedulerLogReportSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp; &nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchSchedulerLogsReport(event)" id="getSchedulerName" /></th>';
						content += '<th><input type="text" onkeydown="searchSchedulerLogsReport(event)" id="getactivityTimeId" /></th>';
						content += '<th><input type="text" onkeydown="searchSchedulerLogsReport(event)" id="getStatus" /></th>';
						content += '<th><input type="text" onkeydown="searchSchedulerLogsReport(event)" id="getReason" /></th>';
						content += '</tr>';
						content += '</thead>';

						try {
							if (obj1 != null && obj1 != '') {
								var counterSr = 0;
								jQuery.each(obj1, function(i, v) {
									counterSr++;
									
									content+="<tr>";
									content+="<td>"+counterSr+"</td>";
									content+="<td>"+v.logsType+"</td>";
									content+="<td>"+v.activityTime+"</td>";
									content+="<td>"+v.response+"</td>";
									if(v.reason!=undefined)
										content+="<td>"+v.reason+"</td>";
									else 
										content+="<td></td>";
									content+="</tr>";
								});
							} else
								content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";

						} catch (e) {
							// alert(e);
						}
						content += "</table>";
						content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="pull-left">';
						$('#block_show_admin_log_report').html(content);
                      
						// Searching Purpose
						$('#getSchedulerName').val(schedulerName);
						$('#getactivityTimeId').val(activityTimeId);
						$('#getStatus').val(status);
						$('#getReason').val(reason);
						
						if ($.trim(globalSchedulerLogsReportPreviouspageSize) != '') {
							$("#pageId")
									.val(globalSchedulerLogsReportPreviouspageSize);
							fetchSize();
							if (!searchSchedulerLogsReportWithpageSize)
								$("#pageNum")
										.val(globalSchedulerLogsReportPreviousPageNum);
							else {
								if(globalSchedulerLogsReportPreviousPageNum==0 &&  parseInt($('#pageN').text()) > 0)
									globalSchedulerLogsReportPreviousPageNum="1";
								$("#pageNum")
								.val(globalSchedulerLogsReportPreviousPageNum);
							}
								
						}
										
						$("#getactivityTimeId").datepicker({
							dateFormat : "yy-mm-dd"
						}).val();
						
						if(pageCall==false){
							var size = 10;
							if (globalSchedulerLogsReportPreviouspageSize != '') {
								size = parseInt(globalSchedulerLogsReportPreviouspageSize);
								count = searchCount;
							}
							if(schedulerName!="" || activityTimeId!="" || status!="" || reason!=""){
								count = searchCount;
							}
							if(count == 0){
								count = searchCount;
							}
									
							var maxPgaeNumber = count / size;
							var rem = count % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN').html(parseInt(maxPgaeNumber));
							if(count == 0)
								$('#pageNum').val(0);
							else 
								$('#pageNum').val(1);
						}
												
						if(schedulerName=="" && activityTimeId=="" && status=="" && reason==""){
							searchSchedulerLogsReportWithpageSize = false;
						} 
					}
				});
	} catch (e) {
		alert(e);
	}

}
  

function schedulerLogReportSearch() {
	if (validateSchedulerLogSearch()) {
		searchSchedulerLogsReportWithpageSize = true;
		showSchedulerLogsReport(false, true);
	} else {
		validateSchedulerLogSearch();
	}

}

function validateSchedulerLogSearch() {
	var users = $('#getSchedulerName').val();
	if (users != undefined && users != "") {
		users = users.replace(/\s/g, " ");
		var user = users.split(',');
		var len = user.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#getSchedulerName').val("");
			return false;
		}
	}
	return true;
}


function searchSchedulerLogsReport(e) {
	if (e.keyCode === 13)
		schedulerLogReportSearch();
}
