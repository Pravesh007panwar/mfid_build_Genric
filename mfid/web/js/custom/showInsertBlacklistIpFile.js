function removeFilter(){
	$('#userLogonId').val("");
	$('#lastSyncTime').val("");
	$('#role').val("");
	$('#userLogonId1').val("");
	$('#lastSyncTime1').val("");
	$('#role1').val("");
	$('#activity').val("");
}

var count;
var count1;
var count2;
var searchCount;
var validFilesTypes;
var searchShowGeoFileWithpageSize = false;
var searchShowGeoFileWithpageSize1 = false;
var client = new XMLHttpRequest();

function getPageData_logreport() {
	var size = document.getElementById('pageId_logreport').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_logreport').text();
	var pageNumber = document.getElementById('pageNum_logreport').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_logreport').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		insertGeoFileDetail(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function getPageData_ipRanges() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN').text();
	var pageNumber = document.getElementById('pageNum').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		searchIpRanges(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_ipRanges() {

	var size = document.getElementById('pageId').value;

	if ($.trim(size) != '') {
		var maxSize = count1;
		//alert("maxSize:    "+maxSize);
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(count1 == 0){
			$('#pageNum').val(0);
		} else {
			$('#pageNum').attr("disabled",false);
			$('#pageNum').val(1);
		}
		$('#pageN').html(parseInt(maxPgaeNumber));
				
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

var userLogonId = "";
var requestTime = "";
var role = "";

var globalShowGeoFilePreviouspageSize = "";
var globalShowGeoFilePreviousPageNum = "";
function insertGeoFileDetail(pageCall, pageSearch) {//	alert("123");
	try {

		// start code for Bug #122  and #172	 , added by Abhimanyu
		if ($("#pageId_logreport").length) {
			globalShowGeoFilePreviouspageSize = $("#pageId_logreport").val();
			globalShowGeoFilePreviousPageNum = $("#pageNum_logreport").val();
		}
		// end code for Bug #122 and #172		
		var myUrl = "admin_showLogsData.action?logsType=blacklistIpFile";

		if (pageCall) {

			var pageNumber = document.getElementById("pageNum_logreport").value;

			var fetchSize = document.getElementById("pageId_logreport").value;

			myUrl += "&fetchSize=" + fetchSize + "&pageNumber=" + pageNumber;

		}
		if (pageSearch) {
			 userLogonId = $('#userLogonId').val();

			 requestTime = $('#lastSyncTime').val();
			 role = $('#role').val();

			myUrl += "&userName=" + userLogonId + "&requestTime=" + requestTime
					+ "&role=" + role;
		}

		// start code for Bug #122 and #172	 ,added by Abhimanyu
		if (searchShowGeoFileWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalShowGeoFilePreviouspageSize) != '')
					myUrl += "&fetchSize=" + globalShowGeoFilePreviouspageSize;
			}
		}
		// end code for Bug #122 and #172			

		$('#user_resync_data').html("Loading...");
			$.ajax({
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
						if (searchShowGeoFileWithpageSize){
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
						// start code for bug id no #320 , added by abhimanyu
						content += '<option value="1000">1000</option>';
						content += '<option value="2000">2000</option>';
						// end code for bug id no #320 , added by abhimanyu
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
						content += '<th>File Insert Time</th>';

						content += '<th>Role</th>';
						content += '</tr>';

						content += '</thead>';
						content += '<tr>';
						content += '<th style="padding-bottom: 20px;" width="6%"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="search_data()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" name="userLogonId" onkeydown="searchRedis(event)" id="userLogonId" ></th>';

						content += '<th><input type="text" name="lastSyncTime" onkeydown="searchRedis(event)" id="lastSyncTime" ></th>';
						content += '<th><input type="text" name="role" onkeydown="searchRedis(event)" id="role" ></th>';
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
						// start code for Bug #122 and #172	 , Added by Abhimanyu
						
						$('#userLogonId').val(userLogonId);
						$('#lastSyncTime').val(requestTime);
						$('#role').val(role);
						
						if ($.trim(globalShowGeoFilePreviouspageSize) != '') {
							$("#pageId_logreport").val(
									globalShowGeoFilePreviouspageSize);
							fetchSize_logreport();
							if (!searchShowGeoFileWithpageSize)
								$("#pageNum_logreport").val(
										globalShowGeoFilePreviousPageNum);
							else {
								if(globalShowGeoFilePreviousPageNum==0 && parseInt($('#pageN_logreport').text()) > 0 )
									globalShowGeoFilePreviousPageNum="1";
								$("#pageNum_logreport").val(
										globalShowGeoFilePreviousPageNum);
							}
						}
						//searchShowGeoFileWithpageSize = false;
						//end code for Bug #122 and #172	
						
						if(pageCall==false){
							var size=10;
							if(globalShowGeoFilePreviouspageSize!=''){
								size = globalShowGeoFilePreviouspageSize;
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
							if(count == 0){
								$('#pageNum_logreport').val(0);
							} else {
								$('#pageNum_logreport').val(1);
							}
							
						}
						if(userLogonId=="" && requestTime=="" && role==""){
							searchShowGeoFileWithpageSize = false;
						}
					}

				});

	} catch (e) {
		alert(e);
	}

}
//Added by Abhimanyu for new Function
function searchIpRangesWithValidation(pageCall, pageSearch) {
	
	var expression = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
	var ipRangeVal = document.getElementById("ipRangeId").value;
	if (!pageCall && !pageSearch && !expression.test(ipRangeVal))
	{
	   alert("Invalid IP address.");
	   return false;
	}
	else
	 searchIpRanges(pageCall, pageSearch) ;
}



//Added by puneet for maxmind update/add/delete

var globalPreviouspageSize="";
var globalPreviousPageNum="";
function searchIpRanges(pageCall, pageSearch) {
	// alert("123");
	document.getElementById("countryListId").value = "";
	var obj1 = "";
	newRow = false;
	nEditing = null;
	try {

		var optionDiv = '';

		if ($("#pageId").length) {
			globalPreviouspageSize = $("#pageId").val();
			globalPreviousPageNum = $("#pageNum").val();
		}
		var ipRangeVal = document.getElementById("ipRangeId").value;
		var myUrl = "admin_showBlacklistIpRangeData.action?ipRangeVal=" + ipRangeVal;

		if (pageCall) {

			var pageNumber = document.getElementById("pageNum").value;

			var fetchSize = document.getElementById("pageId").value;
			myUrl += "&fetchSize=" + fetchSize + "&pageNumber=" + pageNumber;

		}

		// start code for Bug #122 and #172 ,added by Abhimanyu
		if (searchShowGeoFileWithpageSize1) {
			if (myUrl.indexOf('fetchSize1') == -1) {
				if ($.trim(globalShowGeoFilePreviouspageSize1) != '')
					myUrl += "&fetchSize=" + globalShowGeoFilePreviouspageSize1;
			}
		}

		$('#user_search_data_country_ipdata').html("Loading...");
			$.ajax({
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
						if ($.trim(data) == "Invalid IP Address.") {
							alert(data);
							return;
						}
						var obj = JSON.parse(data);

						var obj1 = JSON.parse(obj.blacklistIplocationList);
						var obj2 = JSON.parse(obj.count);

						if (searchShowGeoFileWithpageSize1)
							obj2 = count1;

						count1 = obj2;

						var content = '<div class="space15"></div>';
						content += '<div class="row-fluid">';
						content += '<div  class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId" onChange="fetchSize_ipRanges(),getPageData_ipRanges();" name="deassociationReasonListName" style="width:100%;">';
						content += '<option value="">-select size-</option>';
						content += '<option value="10">10</option>';
						content += '<option value="20">20</option>';
						content += '<option value="50">50</option>';
						content += '<option value="100">100</option>';
						content += '<option value="200">200</option>';
						content += '<option value="500">500</option>';
						// start code for bug id no #320 , added by abhimanyu
						content += '<option value="1000">1000</option>';
						content += '<option value="2000">2000</option>';
						// end code for bug id no #320 , added by abhimanyu
						content += '<option value="5000">5000</option>';
						//content += '<option value="10000">10000</option>';
						content += '</select>';
						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_ipRanges()" id="pageNum"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData_ipRanges()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_ip_search">';
						content += '<thead>';

						content += '<tr>';
						content += '<th><input type="checkbox" class="group-checkable" data-set="#sample_ip_search .checkboxes" /></th>';
						//content += '<th>Country</th>';
						content += '<th>Start Ip range</th>';
						content += '<th>End Ip Range</th>';
						content += '<th>Action</th>';
						content += '</tr>';

						content += '</thead>';

						if (obj1 != null && obj1 != '') {

							jQuery
									.each(
											obj1,
											function(ind, val) {

												content += "<tr><td><input type='checkbox' class='checkboxes' value='"
														+ val.blackListIpListId+'|'+ val.startIpRange+'|'+ val.endIpRange
														+ "' /></td>";

											//	content += "<td>"
											//			+ val.countryName
											//			+ "</td>";
												content += "<td>"
														+ val.startIpRange
														+ "</td>";
												content += "<td>"
														+ val.endIpRange
														+ "</td>";
												content += "</td><td><a class='edit' href='javascript:;'>Edit</a> </td></tr>"

											});

						}

						content += "</table>";

						content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';

						content += '<div class="btn-group pull-right" >';
						content += '<button id="ip_search_multi_delete" type="button" class="btn green">Delete <i class="icon-remove"></i></button>';
						content += '</div>';
						content += '<div class="btn-group pull-right">';
						content += '<button id="search_ip_add_new" class="btn green">Add New <i class="icon-plus"></i></button>';
						content += '</div>';

						$('#user_search_data_country_ipdata').html(content);
						$("#sample_ip_search").css("width", "100%");

						oTable_ipSearch = $('#sample_ip_search').dataTable({
							"bPaginate" : false,
							"bFilter" : false,
							"bSort" : false
						});
						
						if ($.trim(globalPreviouspageSize) != '') {
							$("#pageId").val(
									globalPreviouspageSize);
							fetchSize_ipRanges();
								$("#pageNum").val(
										globalPreviousPageNum);
 						}
						
						if(pageCall==false){
							var maxPgaeNumber = count1 / 10;
							var rem = count1 % 10;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN').html(parseInt(maxPgaeNumber));
							if(count1==0){
								$('#pageNum').val(0);
							}
							else {
								$('#pageNum').val(1);
							}
						}
					}

				});

	} catch (e) {
		alert(e);
	}

}

function deleteIpRange(ids) {

	if (ids == "") {
		alert("Please select the blacklist IP range.");
		newRow = true;
	} else {
		
		  var requestData = ids.split(",");
		  var geoIpListId = new Array();
		  var geoStartIpList= new Array();
		  var geoEndIpList= new Array();
		  requestData.forEach(function (item, index) {
		   var tempList = item.split("|");
		      geoIpListId.push(tempList[0]);
		      geoStartIpList.push(tempList[1]);
		      geoEndIpList.push(tempList[2]);
		  });
		
		var strutsToken = $('[name=csrfPreventionSalt]').val();
		var dataString = 'geoIpListId='+geoIpListId.toString().replace(/'/g, '')+'&geoStartIpList='+geoStartIpList.toString().replace(/'/g, '')+'&geoEndIpList='+geoEndIpList.toString().replace(/'/g, '')+'&csrfPreventionSalt='
				+ strutsToken;
		$.ajax({
			type : "POST",
			url : "admin_deleteBlacklistIpRanges.action",
			data : dataString,
			dataType : "text",
			success : function(response) {
				//alert(response);
				if ($.trim(response) == "sessionout") {
					alert("Session Timeout...");
					var testVal = document.getElementById("loginPage").value;
					window.location.replace(testVal);
				} else if ($.trim(response) == "success") {

					alert("success");

					searchIpRanges(false, false);
					showCountryIpAddress(false, false);
				} else {
					alert(response);
				}
			}
		});
		//	return response;
	}

}

function search_data() {
	searchShowGeoFileWithpageSize = true;
	insertGeoFileDetail(false, true);
}

function searchRedis(e) {
	if (e.keyCode === 13)
		search_data();
}

function search_data1() {
	searchShowGeoFileWithpageSize1 = true;
	showCountryIpAddress(false, true);

}

function searchCountryIp(e) {
	if (e.keyCode === 13)
		search_data1();
}

function insertGeoFile() {
	var res = ValidateFile();
	if (res == false) {
		alert("Invalid File. Please upload a File with extension:\n\n"
				+ validFilesTypes);
		return false;
	}
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats
	var file = document.getElementById("geoFile");
	var formData = new FormData();
	formData.append("fileUpload", file.files[0]);
	formData.append("csrfPreventionSalt", strutsToken);
	client.open("post", "admin_insertBlacklistIpFile.action", true);
	client.send(formData); /* Send to server */
	$('#insert_geo_file').hide();
	$('#upload_loader').html('Loading...');
	//runProgressBbarAction('start');
	$("#loading").css("display", "block");
	$('body').css("opacity", "0.8");

	client.onreadystatechange = function() {
		//runProgressBbarAction('start');
		if (client.readyState == 4 && client.status == 200) {

			//$('#insert_geo_form').show();
			//$('#upload_loader').hide();
			//$('#upload_status').hide();

			var inputFile = $('#insert_file');
			inputFile.wrap('<div />');
			inputFile.parent().html(inputFile.parent().html());
			try {
				var data = client.responseText;
				alert(data);
				$("#loading").css("display", "none");
				$('body').css("opacity", "1");
				//  runProgressBbarAction('stop');
				//$('#upload_loader').show();
				//$('#upload_loader').html('');
				document.getElementById("geoFile").value = "";
				$('#insert_geo_file').show();
				insertGeoFileDetail(false, false);
				showAllCountryList();
				//$('#insert_geo_form_button').show();
			} catch (e) {
				alert(e);

			}

		}
	}

}

function ValidateFile() {
	var file = document.getElementById("geoFile");
	var path = file.value;
	var ext = path.substring(path.lastIndexOf(".") + 1, path.length)
			.toLowerCase();
	var isValidFile = true;
	validFilesTypes = "csv";
	if (ext != 'csv')
		isValidFile = false;
	return isValidFile;
}

function addIpAddress(modifyIPaddressId) {
	
	try { modifyIPaddressId=(modifyIPaddressId.split('value="')[1]).split("|")[0]; }catch(err){}
	 
	var res = "";
	 
	 
	var ipRange1 = document.getElementById("ipRange1").value;
	var ipRange2 = document.getElementById("ipRange2").value;
	//var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	//var ipformat = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats

	//if (country == "" && countryListId == "") {
	//	alert("Please select country");
	//	return;
	//}

	if (ipRange1 == "") {
		alert("Please enter start IP");
		return;
	}

	/*if (!ipRange1.match(ipformat)) {
		alert("You have entered an invalid start IP address");
		return;
	}*/

	if (ipRange2 == "") {
		alert("Please enter end IP");
		return;
	}
	/*if (!ipRange2.match(ipformat)) {
		alert("You have entered an invalid end IP address");
		return;
	}*/

//	var result = CompareIP(ipRange1, ipRange2);
//
//	if (result == false) {
//		alert("From IP exceeds to IP");
//		return;
//	}

	try {
		//countryListId= countryListId.split("|")[0];
		var myUrl = "admin_addBlacklistIPRange.action?"
				+ "startIpRange=" + ipRange1 + "&endIpRange=" + ipRange2
				+ "&csrfPreventionSalt=" + strutsToken + "&blacklistIpListId="
				+ modifyIPaddressId;
		
		$.ajax({
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
				if ($.trim(data) == "success") {
					alert(data);
					res = data;

					showCountryIpAddress(false, false);
					searchIpRanges(false, false);
					document.getElementById("ipRange1").value = "";
					document.getElementById("ipRange2").value = "";
					//document.getElementById("country").value = "";
				} else {
					alert(data);

				}

			}

		});
		return res;
	} catch (e) {
		alert(e);
	}

}

function CompareIP(ipRange1, ipRange2) {

//	if(ipRange1==ipRange2)
//	{
//	return false;
//	}
	  var from = ipRange1;
	  var to = ipRange2;
	 
	  if(from.includes(":") && to.includes(":")){
	  
	  var fromArr = from.split(":");
	  var toArr = to.split(":");
	  for(i=0;i<8;i++)
	  {
	    if(parseInt($.trim(fromArr[i]),16) > parseInt($.trim(toArr[i]),16))
	       return false;
	  } 
	  
	  } else {
	  var fromArr = from.split(".");
	  var toArr = to.split(".");
	  for(i=0;i<4;i++)
	  {
	    if(parseInt($.trim(fromArr[i])) > parseInt($.trim(toArr[i])))
	       return false;
	  } 
	  }
	  
	  
return true;
}


var globalShowGeoFilePreviouspageSize1 = "";
var globalShowGeoFilePreviousPageNum1 = "";

var activity="";

function showCountryIpAddress(pageCall, pageSearch) {
	
	try {

		// start code for Bug #122  and #172	 , added by Abhimanyu
		if ($("#pageId_logreport1").length) {
			globalShowGeoFilePreviouspageSize1 = $("#pageId_logreport1")
					.val();
			globalShowGeoFilePreviousPageNum1 = $("#pageNum_logreport1").val();
		}
		// end code for Bug #122 and #172		
		var myUrl = "admin_showCountryIpLogs.action";

		if (pageCall) {

			var pageNumber = document.getElementById("pageNum_logreport1").value;

			var fetchSize = document.getElementById("pageId_logreport1").value;

			myUrl += "?fetchSize=" + fetchSize + "&pageNumber=" + pageNumber;

		}
		if(userLogonId!="" || activity!="" || requestTime!="" || role!=""){
			pageSearch = true;
		}
		
		if (pageSearch) {
			 userLogonId = $('#userLogonId1').val();
			 activity = $('#activity').val();
			 requestTime = $('#lastSyncTime1').val();
			 role = $('#role1').val();
			if (myUrl.indexOf('?') == -1) {
				myUrl += "?userName=" + userLogonId + "&requestTime="
						+ requestTime + "&role=" + role + "&result=" + activity;
			} else {
				myUrl += "&userName=" + userLogonId + "&requestTime="
						+ requestTime + "&role=" + role + "&result=" + activity;
			}
			
		}
		// start code for Bug #122 and #172	 ,added by Abhimanyu
		if (searchShowGeoFileWithpageSize1) {
			if (myUrl.indexOf('fetchSize1') == -1) {
				if ($.trim(globalShowGeoFilePreviouspageSize1) != '')
					myUrl += "&fetchSize1=" + globalShowGeoFilePreviouspageSize1;
			}
		}
		// end code for Bug #122 and #172			

		//$('#user_resync_data').html("Loading...");
			$.ajax({
					type : "POST",
					url : myUrl,
					async : true,
					dataType : "text",
					success : function(data) {
						//	alert("data    "+data);

						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var obj = JSON.parse(data);
						var obj1 = JSON.parse(obj.logList);
						var obj2 = JSON.parse(obj.count);
						//alert("obj.count:    "+obj.count);
						//start code for Bug #122 and #172	 , added by Abhimanyu
						if (searchShowGeoFileWithpageSize1) {
							count2 = obj2;
							searchCount = obj2;
						} else {
							count2 = obj2;
							searchCount = obj2;
						}
							//obj2 = count2;
						// end code for Bug #122 and #172	 					
						

						//alert("in count:   "+count);
						var content = '<div class="space15"></div>';
						content += '<div class="row-fluid">';
						content += '<div  class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_logreport1" onChange="fetchSize_logreport1(),getPageData_logreport1();" name="deassociationReasonListName" style="width:100%;">';
						content += '<option value="">Select Size</option>';
						content += '<option value="10">10</option>';
						content += '<option value="20">20</option>';
						content += '<option value="50">50</option>';
						content += '<option value="100">100</option>';
						content += '<option value="200">200</option>';
						content += '<option value="500">500</option>';
						// start code for bug id no #320 , added by abhimanyu
						content += '<option value="1000">1000</option>';
						content += '<option value="2000">2000</option>';
						// end code for bug id no #320 , added by abhimanyu
						content += '<option value="5000">5000</option>';
						//content += '<option value="10000">10000</option>';
						content += '</select>';

						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_logreport1()" id="pageNum_logreport1"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_logreport1" style="width:20%;background-color:white;" onChange="getPageData_logreport1()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_logreport1"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_4">';
						content += '<thead>';
						content += '<tr>';
						content += '<th>Sr.No.</th>';
						content += '<th>UserLogonId</th>';
						content += '<th style="word-wrap: break-word">Activity</th>';
						content += '<th>Creation time</th>';

						content += '<th>Role</th>';
						content += '</tr>';

						content += '</thead>';
						content += '<tr>';
						//add New
						content += '<th style="padding-bottom: 20px;" width="6%"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="search_data1()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" name="userLogonId" onkeydown="searchCountryIp(event)" id="userLogonId1" ></th>';
						content += '<th><input type="text" name="lastSyncTime" onkeydown="searchCountryIp(event)" id="activity" ></th>';
						content += '<th><input type="text" name="lastSyncTime" onkeydown="searchCountryIp(event)" id="lastSyncTime1" ></th>';
						content += '<th><input type="text" name="role" onkeydown="searchCountryIp(event)" id="role1" ></th>';
						content += '</tr>';
						if (obj1 != null && obj1 != '') {

							jQuery.each(obj1, function(ind, val) {

								content += "<tr>";
								content += "<td>" + (ind + 1) + "</td>";

								content += "<td>" + val.userLogonId + "</td>";
								content += "<td>" + val.response + "</td>";
								content += "<td>" + val.requestTime + "</td>";

								content += "<td>" + val.role + "</td>";
								content += "</tr>";

							});

						} else {
							content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
						}
						content += "</table>";

						$('#user_resync_data_ipdata').html(content);
						$("#lastSyncTime1").datepicker({
							dateFormat : "yy-mm-dd"
						}).val();
						//$("#sample_4").css("width", "100%");
						// start code for Bug #122 and #172	 , Added by Abhimanyu
						
						
						$('#userLogonId1').val(userLogonId);
						$('#lastSyncTime1').val(requestTime);
						$('#role1').val(role);
						$('#activity').val(activity);
						
						
						if ($.trim(globalShowGeoFilePreviouspageSize1) != '') {
							$("#pageId_logreport1").val(
									globalShowGeoFilePreviouspageSize1);
							fetchSize_logreport1();
							if (!searchShowGeoFileWithpageSize1)
								$("#pageNum_logreport1").val(
										globalShowGeoFilePreviousPageNum1);
							else {
								if(globalShowGeoFilePreviousPageNum1==0 && parseInt($('#pageN_logreport1').text()) > 0)
									globalShowGeoFilePreviousPageNum1="1";
								$("#pageNum_logreport1").val(
										globalShowGeoFilePreviousPageNum1);
								
							}
						}
						

						if(pageCall==false){
							var size = 10;
							if(globalShowGeoFilePreviouspageSize1!=''){
								size = globalShowGeoFilePreviouspageSize1;
								count2 = searchCount;
							}
							
							if(userLogonId!="" || activity!="" || requestTime!="" || role!=""){
								count2 = searchCount;
							}
							var maxPgaeNumber = count2 / size;
							var rem = count2 % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN_logreport1').html(parseInt(maxPgaeNumber));
							if(count2 == 0){
								$('#pageNum_logreport1').val(0);
							} else {
								$('#pageNum_logreport1').val(1);
							}
							
						}
						
						if(userLogonId=="" && activity=="" && requestTime=="" && role==""){
							searchShowGeoFileWithpageSize1 = false;
						}
											
					}

				});

	} catch (e) {
		alert(e);
	}

}

function getPageData_logreport1() {
	
	var size = document.getElementById('pageId_logreport1').value;
	if ($.trim(size) != '') {
	var pageNumber = document.getElementById('pageNum_logreport1').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_logreport1').val(1);}
	var totalPages =  $('#pageN_logreport1').text();
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showCountryIpAddress(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_logreport1() {
	
	var size = document.getElementById('pageId_logreport1').value;
	if ($.trim(size) != '') {
		var maxSize = count2;
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(count2 == 0){
			$('#pageNum_logreport1').val(0);
		} else {
			$('#pageNum_logreport1').attr("disabled",false);
			$('#pageNum_logreport1').val(1);
		}
		
		$('#pageN_logreport1').html(parseInt(maxPgaeNumber));
				
	} 
}

function showAllCountryList() {
	// alert("showCountryList ...............")
	try {

		var listData = new Array();
		var listId = new Array();

		$.ajax({

			url : 'admin_showCountryList',
			cache : false,
			dataType : "text",
			async : false,
			success : function(data) {
				if ($.trim(data) == "sessionout") {

					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				}

				var obj = JSON.parse(data);
				var obj1 = JSON.parse(obj.countryList);

				var allCountryCode = String(obj1);
				var arr = allCountryCode.split(",");
				countryList = arr;

				/*document.getElementById("country").options.length = 0;
				var sel = document.getElementById("country");
				//	alert(listData.length);
				var option = '';
				for(var i = 0; i < arr.length; i++) {
					var opt = sel.options;
					if(i == 0){
						opt[opt.length] = new Option('select country','');
					}
					opt[opt.length] = new Option(arr[i],arr[i]);
				
					//$('#domain').append('<option value="'+listId[i]+'">'+listData[i]+'</option>').multiselect('rebuild');
					//option +='<option></option>';
				}*/

			}

		});

	} catch (e) {
		alert(e);
	}
}
