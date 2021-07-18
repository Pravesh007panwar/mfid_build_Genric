function removeFilter(){
	$('#userLogonId').val("");
	$('#lastSyncTime').val("");
	$('#role').val("");
}

var count;
var searchCount;
var searchShowPushWithpageSize = false;
function getPageData_logreport() {
	var size = document.getElementById('pageId_logreport').value;
	if ($.trim(size) != '') {
	var pageNumber = document.getElementById('pageNum_logreport').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_logreport').val(1);}
	var totalPages =  $('#pageN_logreport').text();
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		openPushServerDetail(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_logreport() {
	var size = document.getElementById('pageId_logreport').value;
	if ($.trim(size) != '') {
		var maxSize = count;
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(count == 0){
			$('#pageNum_logreport').val(0);
		} else {
			$('#pageNum_logreport').attr("disabled",false);
			$('#pageNum_logreport').val(1);
		}
		$('#pageN_logreport').html(parseInt(maxPgaeNumber));
	} 
}

var globalShowPushPreviouspageSize = "";
var globalShowPushPreviousPageNum = "";

var userLogonId = "";
var requestTime = "";
var role = "";

function openPushServerDetail(pageCall, pageSearch) {
	try {

		if ($("#pageId_logreport").length) {
			globalShowPushPreviouspageSize = $("#pageId_logreport").val();
			globalShowPushPreviousPageNum = $("#pageNum_logreport").val();
		}
		var myUrl = "admin_showLogsData.action?logsType=pushRestart";
		if (pageCall) {
			var pageNumber = document.getElementById("pageNum_logreport").value;
			var fetchSize = document.getElementById("pageId_logreport").value;
			myUrl += "&fetchSize=" + fetchSize + "&pageNumber=" + pageNumber;
		}
		
		if(userLogonId!="" || requestTime!="" || role!=""){
			pageSearch=true;
		}
		if (pageSearch) {
			 userLogonId = $('#userLogonId').val();
			 requestTime = $('#lastSyncTime').val();
			 role = $('#role').val();
			myUrl += "&userName=" + userLogonId + "&requestTime=" + requestTime
					+ "&role=" + role;
		}

		if (searchShowPushWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalShowPushPreviouspageSize) != '')
					myUrl += "&fetchSize=" + globalShowPushPreviouspageSize;
			}
		}
		$('#user_resync_data').html("Loading...");
		$
				.ajax({
					type : "POST",
					url : myUrl,
					async : true,
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
						if (searchShowPushWithpageSize) {
							count = obj2;
							searchCount = obj2;
						} else {
							count = obj2;
							searchCount = obj2;
						}
							//obj2 = count;
						
						var content = '<div class="space15"></div>';
						content += '<div class="row-fluid">';
						content += '<div  class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_logreport" onChange="fetchSize_logreport(),getPageData_logreport();" name="deassociationReasonListName" style="width:100%;">';
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
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_logreport()" id="pageNum_logreport"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_logreport" style="width:20%;background-color:white;" onChange="getPageData_logreport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_logreport"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_4">';
						content += '<thead>';
						content += '<tr>';
						content += '<th>Sr.No.</th>';
						content += '<th>UserLogonId</th>';
						content += '<th>Last Restart Time</th>';
						content += '<th>Role</th>';
						content += '</tr>';
						content += '</thead>';
						content += '<tr>';
						content += '<th style="padding-bottom: 20px;" width="6%"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="search_data()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" name="userLogonId" onkeydown="searchPush(event)"  id="userLogonId" ></th>';
						content += '<th><input type="text" name="lastSyncTime" onkeydown="searchPush(event)" id="lastSyncTime" ></th>';
						content += '<th><input type="text" name="role" onkeydown="searchPush(event)" id="role" ></th>';
						content += '</tr>';
						if (obj1 != null && obj1 != '') {
							jQuery.each(obj1, function(ind, val) {

								content += "<tr>";
								content += "<td>" + (ind + 1) + "</td>";
								content += "<td>" + val.userLogonId + "</td>";
								content += "<td>" + val.requestTime + "</td>";
								content += "<td>" + val.role + "</td>";
								content += "</tr>";
							});

						} else {
							content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
						}
						content += "</table>";
						$('#user_resync_data').html(content);
						$("#sample_4").css("width", "100%");
									
						$('#userLogonId').val(userLogonId);
						$('#lastSyncTime').val(requestTime);
						$('#role').val(role);
							
						if ($.trim(globalShowPushPreviouspageSize) != '') {
							$("#pageId_logreport").val(
									globalShowPushPreviouspageSize);
							fetchSize_logreport();
							if (!searchShowPushWithpageSize)
								$("#pageNum_logreport").val(
										globalShowPushPreviousPageNum);
							else {
								if(globalShowPushPreviousPageNum==0 && parseInt($('#pageN_logreport').text()) > 0)
									globalShowPushPreviousPageNum="1";
								$("#pageNum_logreport").val(
										globalShowPushPreviousPageNum);
							}
						}
						//searchShowPushWithpageSize = false;
						if(pageCall==false){
							var size=10;
							if(globalShowPushPreviouspageSize!=''){
								size = globalShowPushPreviouspageSize;
								count = searchCount;
							}
							if(userLogonId!="" || requestTime!="" || role!=""){
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
							$('#pageN_logreport').html(parseInt(maxPgaeNumber));
							if(count==0)
								$('#pageNum_logreport').val(0);
							else
								$('#pageNum_logreport').val(1);
						}
						if(userLogonId=="" && requestTime=="" && role==""){
							searchShowPushWithpageSize = false;
						}
					}
				});

	} catch (e) {
		alert(e);
	}
}

function search_data() {
	searchShowPushWithpageSize = true;
	openPushServerDetail(false, true);
}
function searchPush(e) {
	if (e.keyCode === 13)
		search_data();
}
