function removeFilter(){
	$('#machine_name_mu').val("");
	$('#tile_type_mu').val("");
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
		showTilesDetails(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

var role;
var globalPreviouspageSize = "";
var globalPreviousPageNum = "";
var machineName="";
var tileTypeVal="";
function showTilesDetails(pageCall, pageSearch) {// alert("123");

	var obj1 = "";
	try {

		var optionDiv = '';

		if ($("#pageId").length) {
			globalPreviouspageSize = $("#pageId").val();
			globalPreviousPageNum = $("#pageNum").val();
		}
		var myUrl = "admin_showTilesDetails.action";

		if (pageCall) {

			var pageNumber = document.getElementById("pageNum").value;

			var fetchSize = document.getElementById("pageId").value;
			
			if ($.trim(fetchSize) == "")
				fetchSize = "10";
			if ($.trim(pageNumber) == "")
				pageNumber = "1";
			myUrl += "?fetchSize=" + fetchSize + "&pageNumber=" + pageNumber;

		}
		if(machineName!="" || tileTypeVal!=""){
			pageSearch=true;
		}
		
		if (pageSearch) {
			 machineName = $('#machine_name_mu').val();

			//var specials=/[*|\":<>[\]{}_`~.,?\\()'₹;+=!@%#&$^]/;
			var specials = /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi;

			if (specials.test(machineName)) {
				alert("Special characters are not allowed in machine name.");
				return;
			}

			 tileTypeVal = $('#tile_type_mu').val();
			//var role = $('#role').val();

			myUrl += "?systemName=" + machineName + "&tilesId=" + tileTypeVal;

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

							obj1 = JSON.parse(obj.systemTilesList);

							var obj2 = JSON.parse(obj.count);
							var obj3 = JSON.parse(obj.tilesData);
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
						content += '<table class="table table-striped table-bordered" id="sample_tiles">';
						content += '<thead>';
						content += '<tr style="background:#fff;">';
						content += '<th><input type="checkbox" class="group-checkable" data-set="#sample_tiles .checkboxes" /></td> ';
						content += '<th>Machine Name</td>';
						content += '<th>Tiles Type</td>';
						// content += '<td style="width:8%;display:none;">Tiles
						// Type ID</td>';
						content += '<th>Action</td>';
						//	content +='<th style="display: none;"></td>';
						content += '</tr>';
						content += '<tr>';
						content += '<td style="padding-bottom: 15px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="manageTileSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></td>';
						content += '<td><input type="text" onkeydown="searchTiles(event)"  id="machine_name_mu" /></td>';
						content += '<td><select id="tile_type_mu"><option value="">Select Tile Type</option><option>Password</option><option>Bio</option><option>Push</option><option>OTP</option></select></td>';

						content += '<td></td>';
						//	content +='<td style="display: none;"></td>';
						content += '</tr>';
						content += '</thead>';
						var t = 1;
						if (obj1 != null && obj1 != '' && data!='') {
							jQuery
									.each(
											obj1,
											function(i, v) {

												var tileTypeVal = '';

												jQuery
														.each(
																obj3,
																function(i, s) {

																	if (v.tilesTypeIdList
																			.toString()
																			.includes(
																					s.tilesTypeId
																							.toString())) {
																		tileTypeVal += s.tilesType
																				+ ',';
																	}

																});

												var tileid = 'tilesId' + t;
												var tileTid = 'tilesTId' + t;

												content += "<tr>"
														+ "<td><input type='checkbox' class='checkboxes' value='"
														+ v.systemId
														+ "'/></td>"
														+ "<td>"
														+ v.systemName
														+ "</td>"
														+ "<td>"
														+ tileTypeVal
																.substring(
																		0,
																		tileTypeVal.length - 1)
														+ "</td>"
														+ "<td><a href='javascript:void(0);' class='edit'>Edit</a></td></tr>"
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
							content += '<button id="tiles_id_add_new" class="btn green">Add New <i class="icon-plus"></i></button>';
							content += '</div>';
							content += '<div class="btn-group">';
							content += '<button id="sample_tiles_multi_delete" type="button" class="btn green">Delete <i class="icon-remove"></i></button>';
							content += '</div>';
						}
						content += '</div>';

						$('#user_tiles_data').html(content);
						$("#sample_tiles").css("width", "100%");
						oTable_tiles = $('#sample_tiles').dataTable({
							"bPaginate" : false,
							"bFilter" : false,
							"bSort" : false
						});
						$('#machine_name_mu').val(machineName);
						$('#tile_type_mu').val(tileTypeVal);
										
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
							if(machineName!="" || tileTypeVal!=""){
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
						
						if(machineName=="" && tileTypeVal==""){
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
	showTilesDetails(false, true);
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
	var tilesDesc = document.getElementById("editMachineName").value.trim();
	var specials = /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi;

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
		var specials = /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi;
		var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats
		var res = "";
		var systemId = document.getElementById("systemId").value
		if (systemId == "" || systemId == null) {
			systemId = 0;
		}
		var tilesDesc = document.getElementById("editMachineName").value.trim();
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

			/*var resExist = "";
			if (tileDescBeforeEdit != tilesDesc) {
				resExist = checkExistEdit(tilesDesc);
			} else {
				resExist = "not";
			}

			if (resExist.match(/exist/)) {
				alert("Machine name already Exist")
				return;
			}

			else {*/

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
									showTilesDetails(true,false);
								} else 
									alert(response);
								res = response;

							}
						});

			//}

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

					showTilesDetails(false, false);
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
			showTilesDetails(false, false);
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
