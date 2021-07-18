function removeFilter(){
	$('#userLogonId_wd').val("");
	$('#deviceId_wd').val("");
}

var count;
var searchCount;
var searchTilesWithpageSize = false;

var searchManageUserWithpageSize = false;


function fetchSizeTile() {
	try {
				
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
			var maxSize = count;

			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(count==0){
				$('#pageNum').val(0);
			} else {
				$('#pageNum').attr("disabled",false);
				$('#pageNum').val(1);
			}
				
			$('#pageN').html(parseInt(maxPgaeNumber));
			
		} 
	} catch (e) {
		// alert(e)
		}
}

function getPageData() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN').text();
	var pageNumber = document.getElementById('pageNum').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showManageWhitelistingDevices(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

var role;
var globalPreviouspageSize = "";
var globalPreviousPageNum = "";
var userLogonId="";
var deviceId="";
function showManageWhitelistingDevices(pageCall, pageSearch) {// alert("123");

	var obj1 = "";
	try {

		var optionDiv = '';

		if ($("#pageId").length) {
			globalPreviouspageSize = $("#pageId").val();
			globalPreviousPageNum = $("#pageNum").val();
		}
		var myUrl = "admin_showWhitelistingDevices.action";

		if (pageCall) {

			var pageNumber = document.getElementById("pageNum").value;

			var fetchSize = document.getElementById("pageId").value;
			
			if ($.trim(fetchSize) == "")
				fetchSize = "10";
			if ($.trim(pageNumber) == "")
				pageNumber = "1";
			myUrl += "?fetchSize=" + fetchSize + "&pageNumber=" + pageNumber;

		}
		if(userLogonId!="" || deviceId!=""){
			pageSearch=true;
		}
		
		if (pageSearch) {
			 userLogonId = $('#userLogonId_wd').val();

			//var specials=/[*|\":<>[\]{}_`~.,?\\()'?;+=!@%#&$^]/;
			var specials = /[`~!$%^&*()|+\=?'",<>\{\}\[\]\\\/]/gi;

			if (specials.test(userLogonId)) {
				alert("Special characters are not allowed in userLogonId.");
				return;
			}
			
			  specials = /[`~!@#$%^&*()|+\=?'",<>\{\}\[\]\\\/]/gi;

			if (specials.test(deviceId)) {
				alert("Special characters are not allowed in device Id.");
				return;
			}

			 deviceId = $('#deviceId_wd').val();
			//var role = $('#role').val();

			myUrl += "?userLogonId=" + userLogonId + "&deviceId=" + deviceId;

		}

		// start code for Bug #122 and #172 ,added by Abhimanyu
		if (searchTilesWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalPreviouspageSize) != '')
					if (myUrl.indexOf('?') == -1)
						myUrl += "?fetchSize=" + globalPreviouspageSize;
					else
						myUrl += "&fetchSize=" + globalPreviouspageSize;

			}
		}
		// end code for Bug #122 and #172

		$('#user_tiles_data').html("Loading...");
			$.ajax({
					type : "POST",
					url : myUrl,
					async : true,
					dataType : "text",
					success : function(data) {
						// alert("data "+data);

						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						if(data!="" && data!=null) {
							var obj = JSON.parse(data);

							obj1 = JSON.parse(obj.whitelistingDeviceList);

							var obj2 = JSON.parse(obj.count);
							 
						}
					
						
						if (searchTilesWithpageSize){
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
						content += '<select id="pageId" onChange="fetchSizeTile(),getPageData();" name="deassociationReasonListName" style="width:100%;">';
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
						/*content += '<select onChange="getPageData()" id="pageNum"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';

						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered tableCustomeModify" id="sample_tiles">';
						content += '<thead>';
						content += '<tr style="background:#fff;">';
						content += '<th><input type="checkbox" class="group-checkable" data-set="#sample_tiles .checkboxes" /></td> ';
						content += '<th>UserLogonId</td>';
						content += '<th>DeviceId</td>';
						// content += '<td style="width:8%;display:none;">Tiles
						// Type ID</td>';
						//content += '<th>Action</td>';
						//	content +='<th style="display: none;"></td>';
						content += '</tr>';
						content += '<tr>';
						content += '<td style="padding-bottom: 15px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="manageTileSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></td>';
						content += '<td><input type="text" onkeydown="searchTiles(event)"  id="userLogonId_wd" /></td>';
						content += '<td><input type="text" onkeydown="searchTiles(event)" id="deviceId_wd" /></td>';

						//content += '<td></td>';
						//	content +='<td style="display: none;"></td>';
						content += '</tr>';
						content += '</thead>';
						var t = 1;
						if (obj1 != null && obj1 != '' && data!='') {
							jQuery
									.each(
											obj1,
											function(i, v) {

												var deviceId = '';
                                                var tileid = 'tilesId' + t;
												var tileTid = 'tilesTId' + t;

												content += "<tr>"
														+ "<td><input type='checkbox' class='checkboxes' value='"
														+ v.whitelistingDeviceId
														+ "'/></td>"
														+ "<td id='userLogonIds"+v.whitelistingDeviceId+"'>"
														+ v.userLogonId
														+ "</td>"
														+ "<td id='deviceListedId"+v.whitelistingDeviceId+"'>"
														+ v.deviceId
													    + "</td>"
														+ "</tr>"
												//	"<td style='display: none;' >"+v.systemId+"</td></tr>";
												t++;
											});
						}

						content += "</table>";

						content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="pull-right">';
						if (role != 4) {
							content += '<div class="btn-group">';
							content += '<button onclick="showAddDevice()" class="btn green">Add New <i class="icon-plus"></i></button>';
							content += '</div>';
							content += '<div class="btn-group">';
							content += '<button id="sample_tiles_multi_delete" onclick="deleteWhitelistingDevice()" type="button" class="btn green">Delete <i class="icon-remove"></i></button>';
							content += '</div>';
						}
						content += '</div>';

						$('#manage_whitelisting_devices_data').html(content);
						$("#sample_tiles").css("width", "100%");
						oTable_tiles = $('#sample_tiles').dataTable({
							"bPaginate" : false,
							"bFilter" : false,
							"bSort" : false
						});
						$('#userLogonId_wd').val(userLogonId);
						$('#deviceId_wd').val(deviceId);
										
						if ($.trim(globalPreviouspageSize) != '') {
							$("#pageId").val(globalPreviouspageSize);
							fetchSizeTile();
							if (!searchTilesWithpageSize)
								$("#pageNum").val(globalPreviousPageNum);
							else {
								if(globalPreviousPageNum==0 && parseInt($('#pageN').text()) > 0)
									globalPreviousPageNum="1";
								$("#pageNum").val(globalPreviousPageNum);								
							}
						}
						

					
						
						if(pageCall==false){
							var size = 10; 
							if(globalPreviouspageSize!=''){
								size = globalPreviouspageSize;
								count = searchCount;
							}
							if(userLogonId!="" || deviceId!=""){
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
							$('#pageN').html(parseInt(maxPgaeNumber));
							if(count == 0)
								$('#pageNum').val(0);
							else 
								$('#pageNum').val(1);
						}
						
						if(userLogonId=="" && deviceId==""){
							searchTilesWithpageSize = false;
						}
					}

				});

	} catch (e) {
		alert(e);
	}

}

function manageTileSearch() {
	searchTilesWithpageSize = true;
	newRow = false;
	showManageWhitelistingDevices(false, true);
}

function searchRedis(e) {
	if (e.keyCode === 13)
		search_data();
}

function showAllTilesList() {

	try {

		var listData = new Array();
		var listId = new Array();
		var tilesDataTmp = '';
		var tilesIdTmp = '';

		$
				.ajax({

					url : 'admin_getAllTilesDetails',
					cache : false,
					dataType : "text",
					async : false,
					success : function(data) {
						if ($.trim(data) == "sessionout") {

							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}

						var obj = JSON.parse(data);
						var obj1 = JSON.parse(obj.tilesData);

						jsonObj1 = JSON.parse(obj.tilesData);

						document.getElementById('allTilesObj').value = obj1;

						if (obj1 != null && obj1 != '') {
							jQuery.each(obj1, function(i, v) {

								tilesDataTmp += v.tilesType + ',';
								tilesDataTmp = tilesDataTmp.trim();

								tilesIdTmp += v.tilesTypeId + ',';

							});
						}
						document.getElementById('allTiles').value = tilesDataTmp
								.substring(0, tilesDataTmp.length - 1);
						document.getElementById('allTilesId').value = tilesIdTmp
								.substring(0, tilesIdTmp.length - 1);

						var allTilesDetails = document
								.getElementById('allTiles').value;

						var arr = allTilesDetails.split(',');

						document.getElementById("seleTilesId").options.length = 0;
						var sel1 = document.getElementById("seleTilesId");

						var option = '';
						var temp = '';
						for (var i = 0; i < arr.length; i++) {
							if (i == 0) {
								temp = arr[i];
							}
							var opt = sel1.options;
							opt[opt.length] = new Option(arr[i], arr[i]);

						}
						$('#seleTilesId').attr('multiple', true);
						$('#seleTilesId').multiselect('destroy');

						$('#seleTilesId').multiselect({
							includeSelectAllOption : true,
							enableFiltering : true,
							enableCaseInsensitiveFiltering : true
						});
						$('#seleTilesId').multiselect('deselect', temp);

					}

				});

	} catch (e) {

	}
}

function showTilesList(multi, id) {

	try {

		var listData = new Array();
		var listId = new Array();

		$.ajax({

			url : 'admin_getAllTilesDetails',
			cache : false,
			dataType : "text",
			async : false,
			success : function(data) {
				if ($.trim(data) == "sessionout") {

					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				}

				var obj = JSON.parse(data);

				var obj1 = JSON.parse(obj.tilesData);

				document.getElementById('allTiles').value = obj1;
				if (obj1 != null && obj1 != '') {
					$.each(obj1, function(i, data) {

						listData.push([ data.tilesType ]);
						listId.push([ data.tilesTypeId ]);

					});
				}

				var sel = document.getElementById(id);

				var option = '';
				for (var i = 0; i < listData.length; i++) {
					var opt = sel.options;

					opt[opt.length] = new Option(listData[i], listId[i]);
				}
			}

		});

	} catch (e) {

	}
}

function checkExistEdit(tileDesc) {
	var tileDescBeforeEdit = document.getElementById("tilesDescBefEdit").value;
	var tilesDesc = document.getElementById("edituserLogonId").value.trim();
	var specials = /[`~!@#$%^&*()|+\=?'",<>\{\}\[\]\\\/]/gi;

	if (specials.test(tilesDesc)) {
		alert("Special characters are not allowed in machine name.");
		return;
	}

	var res;
	try {
		$
				.ajax({
					type : "POST",
					url : "admin_checkExistingTilesDesc.action?systemName="
							+ tilesDesc,
					dataType : "text",

					async : false,
					success : function(response) {
						if ($.trim(response) == "sessionout") {

							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						res = response;

					}
				});
	} catch (e) {
		alert(e);
	}
	return res;
}

function update() {
	try {
		var specials = /[`~!@#$%^&*()|+\=?'",<>\{\}\[\]\\\/]/gi;
		var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats
		var res = "";
		var systemId = document.getElementById("systemId").value
		if (systemId == "" || systemId == null) {
			systemId = 0;
		}
		var tilesDesc = document.getElementById("edituserLogonId").value.trim();
		var editTilesType = $("#editTilesType").val();
		var tileDescBeforeEdit = $('#tilesDescBefEdit').val().trim();

		if (tilesDesc == "") {
			alert("Please enter machine name.");
			return;
		} else if (specials.test(tilesDesc)) {
			alert("Special characters are not allowed in machine name.");
			return;
		} else if (tilesDesc.length > 30) {
			alert("Machine name length should not be more than 30 character");
			return;
		} else if (editTilesType == null || editTilesType == "") {
			alert("Select Tiles type");
			return;
		} else {

			var allTiles = document.getElementById('allTiles').value;

			var tileArr = editTilesType.toString().split(",");
			var tileId = "";

			jQuery.each(jsonObj1, function(i, v) {
				for (var y = 0; y < tileArr.length; y++) {
					if (tileArr[y] == v.tilesType) {
						tileId += v.tilesTypeId + ",";
					}
				}
			});
			//var valArr = allTiles.split(",");
			//if ((editTilesType.length) == (valArr.length)) {
			//	editTilesType = "all";
			//}

			dataString = 'systemId=' + systemId + '&systemName=' + tilesDesc
					+ "&tilesId=" + tileId.substring(0, tileId.length - 1)
					+ "&tileDescBeforeEdit=" + tileDescBeforeEdit
					+ "&csrfPreventionSalt=" + strutsToken;

			var resExist = "";
			if (tileDescBeforeEdit != tilesDesc) {
				resExist = checkExistEdit(tilesDesc);
			} else {
				resExist = "not";
			}

			if (resExist.match(/exist/)) {
				alert("Machine name already Exist")
				return;
			}

			else {

				$
						.ajax({
							type : "POST",
							url : "admin_updateMachineTiles.action",
							dataType : "text",
							data : dataString,
							async : false,
							success : function(response) {

								// alert(response);
								if ($.trim(response) == "sessionout") {

									var testVal = document
											.getElementById('loginPage').value
									window.location.replace(testVal);
								} else if ($.trim(response) == "success") {
									alert("success");
									showManageWhitelistingDevices(true,false);
								} else 
									alert(response);
								res = response;

							}
						});

			}

		}
		return res;
	} catch (e) {
		alert(e);
	}
}

function deleteTiles(systemIds) {

	if (systemIds == "") {
		alert("Please select the machine name.");
		newRow = true;
	} else {
		var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats
		var dataString = 'systemIds=' + systemIds + '&csrfPreventionSalt='
				+ strutsToken;
		$.ajax({
			type : "POST",
			url : "admin_deleteTiles.action",
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

					showManageWhitelistingDevices(false, false);
				} else {
					alert(response);
				}
			},
			error : function(xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(xhr.statusText);
				alert(thrownError);
			}
		});
		//	return response;
	}

}

function multipleTilesUpdate(systemIds, tilesTypeIds) {

	newRow = false;
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats

	var editTilesType = $("#editTilesType").val();

	var tileArr = tilesTypeIds.toString().split(",");
	var tileId = '';

	if (systemIds == "") {
		alert("Please select the machine name.");
		return;
	}
	jQuery.each(jsonObj1, function(i, v) {
		for (var y = 0; y < tileArr.length; y++) {
			if (tileArr[y] == v.tilesType) {
				tileId += v.tilesTypeId + ",";
			}
		}
	});

	var dataString = 'systemIds=' + systemIds + '&csrfPreventionSalt='
			+ strutsToken + "&tilesId="
			+ decodeURIComponent(tileId.substring(0, tileId.length - 1));

	$.ajax({
		type : "POST",
		url : "admin_updateTilesDetails.action",
		dataType : "text",
		data : dataString,
		async : false,
		success : function(response) {

			// alert(response);
			if ($.trim(response) == "sessionout") {

				var testVal = document.getElementById('loginPage').value
				window.location.replace(testVal);
			}

			alert(response);
			showManageWhitelistingDevices(false, false);
			showAllTilesList();

		}
	});

}

function searchTiles(e) {
	
	if (e.keyCode === 13){
		manageTileSearch();
		newRow = false;	
	}
}


function showAddDevice(){
	$('#manage_whitelisting_devices_form').show(500);
	$('#cancel_id').css('display','');
	$('#manage_whitelisting_devices_form').html('Loading...');
	addWhitelistingDevicesForm();
}

function addWhitelistingDevicesForm() {
	var content = '<div class="span6 offset3">';
	content += '<div id="addWhitelistingDevicesForm_div" style="border:1px solid #ddd; padding:20px;">';
	content += '<form action="#" id="whitelisting_device_form" class="form-horizontal">';
	content += '<div class="control-group">';
	content += '<label class="span6">UserLogonId </label>';
	content += '<div class="span6">';
	content += '<input id="addUserLogonId" type="text" class="span12" />';
	content += '</div>';
	content += '</div>';

	content += '<div class="control-group">';
	content += '<label class="span6">DeviceId </label>';
	content += '<div class="span6">';
	content += '<input id="addDeviceId" type="text" class="span12" />';
	content += '</div>';
	content += '</div>';
 
	content += '<button type="button" onclick="addWhitelistingDevice()" class="btn btn-primary" style="margin-left: 23em;" id="radiud_ip_table_add">Submit</button>';
	content += '<button type="button"  onclick="hideWhitelistingDevices()" class="btn btn-primary pull-right" id="cancel_id">Cancel</button>';
	
	content += '<div class="clearfix"></div>';
	content += '</form>';
	content += '</div>';
	content += '</div>';
	$('#manage_whitelisting_devices_form').html(content);

}



function addWhitelistingDevice() {

	var userLogonId = document.getElementById("addUserLogonId").value;
	var deviceId = document.getElementById("addDeviceId").value;
	var specials = /[`~!$%^&*()|+\=?'",<>\{\}\[\]\\\/]/gi;
  
    if (userLogonId == "") {
		alert("Please enter userLogonId");
		return;
	}
    else if (specials.test(userLogonId)) {
		alert("Special characters are not allowed in userLogonId.");
		return;
	}
    else if (deviceId == "") {
		alert("Please enter deviceId");
		return;
	}
    else if (specials.test(deviceId)) {
		alert("Special characters are not allowed in deviceId.");
		return;
	}
    else {
		callAddDeviceId(userLogonId, deviceId);
	}

}
 

function hideWhitelistingDevices(){
	$('#manage_whitelisting_devices_form').hide(500);
	document.getElementById("whitelisting_device_form").reset();
}
 
function callAddDeviceId(userLogonId,deviceId) {

	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats
	var dataString = "userLogonId=" + encodeURIComponent($.trim(userLogonId)) + "&deviceId=" + encodeURIComponent($.trim(deviceId))+'&csrfPreventionSalt='
	+ strutsToken;
	try {
		$.ajax({
			type : "POST",
			url : "admin_addWhitelistingDevices.action",
			data : dataString,
			dataType : "text",
			success : function(response) {
				alert(response);
				resVal = response;
				if ($.trim(response) == "sessionout") {
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				} else if ($.trim(response) == "success") {
					 showManageWhitelistingDevices(false,false);
					$('#manage_whitelisting_devices_form').hide(500);
					document.getElementById("whitelisting_device_form").reset();
				}
			}
		});
	} catch (e) {
		alert(e);
	}
}


function deleteWhitelistingDevice()
{
	var id="";
	var devices="";
	var userLogonIds="";
	if($('input[type="checkbox"]:checked').length==0){
		alert("Please select White Listed Devices to delete");

	}
	else if($('input[type="checkbox"]:checked').length>0){
		var i=0;
		$('.checkboxes').each(function(){
			if($(this).is(':checked')){
				id += "'"+ $(this).val() + "',";
				devices +=" '"+ $('#deviceListedId'+ $(this).val()).text() + "',";
				userLogonIds +=" '"+ $('#userLogonIds'+ $(this).val()).text() + "',";
				i++;
			}
		});	
		id=id.substring(0,id.length-1);
		devices=devices.substring(0,devices.length-1);
		userLogonIds=userLogonIds.substring(0,userLogonIds.length-1);
		deleteWhiteListedDevices(id,devices,userLogonIds);		
	}

}



function deleteWhiteListedDevices(deleteId,devices,userLogonIds)
{
	var res;
	pid = deleteId;
	var deviceName = devices;

	var strutsToken=$('[name=csrfPreventionSalt]').val(); 
	try{
		$.confirm({
			text: "Warning! Are you sure that you wish to Delete WhiteListed Devices? Please be absolutely sure before proceeding. Do you want to continue?",
			confirm: function(button) {
				$.ajax({
					type: "POST",
					url: "admin_deleteWhiteListedDevices.action?pid="+$.trim(pid)+"&deviceName="+$.trim(deviceName)+"&userLogonId="+encodeURIComponent(userLogonIds)+"&csrfPreventionSalt="+strutsToken,
					dataType: "text",
					success: function(response){

						if($.trim(response)=="sessionout"){
							alert(response);
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
						else if($.trim(response)=="success"){
							alert(response);			
							 showManageWhitelistingDevices(false,false);
						}	
						res=response;
					}
				});
			},
			cancel: function(button) {
				return;
			}
		});
	}catch(e){alert(e);}
	return res;
}


function fileValidationEvent(){
	
	
	var fileName=$('#whiteListFile').val();
	
	var extension=fileName.split('.').pop();
	if(extension=="csv"){
		
		return true;
	}else{
		alert("Invalid File. Please upload a File with extension csv");
	return false;
	}

	
	
}
