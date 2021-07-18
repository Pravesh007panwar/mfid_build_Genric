function removeSearchData(){
	$('#userLogonId').val("");
	$('#role').val("");
	$('#firstName').val("");
	$('#lastName').val("");
	$('#mail').val("");
	$('#mobile ').val("");
}


var count;
var searchCount;
var searchManageRoleWithpageSize = false;

function getPageData_manageRole() {

	var size = document.getElementById('pageId_manageRole').value;
	if ($.trim(size) != '') {
	var pageNumber = document.getElementById('pageNum_manageRole').value;
	var totalPages =  $('#pageN_manageRole').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_manageRole').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showUsers(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_manageRole() {
	try {
		var size = document.getElementById('pageId_manageRole').value;
		if ($.trim(size) != '') {
			var maxSize = count;
			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(count == 0){
				$('#pageNum_manageRole').val(0);
			} else {
				$('#pageNum_manageRole').attr("disabled",false);
				$('#pageNum_manageRole').val(1);
			}
			$('#pageN_manageRole').html(parseInt(maxPgaeNumber));
		} 
	} catch (e) {
		// alert(e)
	}
}

/*function showDomainListForManageRole(org) {

 try {
 $.ajax({
 url : 'GetDomainAction.action?organisationName=' + org,
 //url	: 'admin_getDomainByUser',
 cache : false,
 dataType : "json",
 success : function(data) {

 if ($.trim(data) == "sessionout") {
 alert(data);
 testVal = document.getElementById('loginPage').value
 window.location.replace(testVal);
 }
 var listData = new Array();
 if(data.Messages!=null)
 {
 $.each(data.Messages, function(i, data) {

 listData.push([ data ]);
 });
 }
 var sel = document.getElementById('m_r_domain');
 for ( var i = 0; i < listData.length; i++) {
 // alert("data to be put"+listData[i]);

 var opt = sel.options;
 opt[opt.length] = new Option(listData[i], listData[i])
 }
 }
 });
 } catch (e) {
 // alert(e);
 // TODO: handle exception
 }
 }*/

function showDomainListForManageRole(org) {

	try {
		$.ajax({

			url : 'admin_getDomainByUser',
			cache : false,
			dataType : "text",
			success : function(data) {
				//alert(data);
				if ($.trim(data) == "sessionout") {
					alert(data);
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				}
				var object = JSON.parse(data);
				var obj = JSON.parse(object.domainList);
				var listData = new Array();
				if (obj != null) {
					$.each(obj, function(i, data) {

						listData.push([ data ]);
					});
				}
				var sel = document.getElementById('m_r_domain');
				for (var i = 0; i < listData.length; i++) {
					// alert("data to be put"+listData[i]);

					var opt = sel.options;
					opt[opt.length] = new Option(listData[i], listData[i])
				}
			}
		});
	} catch (e) {
		// alert(e);
		// TODO: handle exception
	}
}

function showAppList() {

	var value = document.getElementById("m_r_domain").value;

	if (value == "") {
		document.getElementById('appList_id').options.length = 1;
		$('#block_manage_role_data').html('<span></span>');
	} else {

		document.getElementById('appList_id').options.length = 0;
		var listData = new Array();
		$.ajax({

			url : 'ApplicationMFIDAction.action?switchDomainName='
					+ $('#m_r_domain').val(),
			cache : false,
			dataType : "text",

			success : function(data) {
				if ($.trim(data) == "sessionout") {
					alert(data);
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				}
				var object = JSON.parse(data);
				var obj = JSON.parse(object.reportList);
				if (obj != null && obj != '') {
					$.each(obj, function(i, data) {

						listData[0] = "Select Application";

						listData.push([ data ]);

					});
				}
				var sel = document.getElementById('appList_id');

				for (var i = 0; i < listData.length; i++) {

					var opt = sel.options;
					opt[opt.length] = new Option(listData[i], listData[i])

				}
			}

		});

	}

}


var userLogonId = "";
var firstName = "";
var lastName = "";
var mobile = "";
var mail = "";
var role = "";
var globalManageRolePreviouspageSize = "";
var globalManageRolePreviousPageNum = "";
function showUsers(pageCall, isSearch) {
	if (typeof (pageCall) == 'undefined' && typeof (isSearch) == 'undefined') {
		try {
			$("#pageId_manageRole").val('');
			$("#pageNum_manageRole").val('');
		} catch (err) {
		}
	}
	// start code for Bug #122 , Added by Abhimanyu
	if ($("#pageId_manageRole").length) {
		globalManageRolePreviouspageSize = $("#pageId_manageRole").val();
		globalManageRolePreviousPageNum = $("#pageNum_manageRole").val();
	}
	// end code for Bug #122 

	var domain = document.getElementById("m_r_domain").value;
	var application = document.getElementById("appList_id").value;
	var myUrl = "admin_showUserToAssignRole.action?domainName=" + domain
			+ "&appName=" + application;

	if (pageCall == true) {
		// alert("in true")
		var size = document.getElementById('pageId_manageRole').value;
		var pageNumber = document.getElementById('pageNum_manageRole').value;
		myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber;
	}

	if(userLogonId!="" || firstName!="" || lastName!="" || mobile!="" || mail!="" || role!=""){
		isSearch=true;
	}
	
	if (isSearch) {
		 userLogonId = document.getElementById('userLogonId').value;
		 firstName = document.getElementById('firstName').value;
		 lastName = document.getElementById('lastName').value;
		 mobile = document.getElementById('mobile').value;
		 mail = document.getElementById('mail').value;
		 role = document.getElementById('role').value;
		 myUrl += "&userLogonId=" + userLogonId + "&firstName=" + firstName
				+ "&lastName=" + lastName + "&mobile=" + mobile + "&mail="
				+ mail + "&role=" + role;
	}
	if (searchManageRoleWithpageSize) {
		if (myUrl.indexOf('fetchSize') == -1) {
			if ($.trim(globalManageRolePreviouspageSize) != '')
				myUrl += "&fetchSize=" + globalManageRolePreviouspageSize;
		}
	}
	
	if ($.trim(domain) != '' && $.trim(application) != '' && $.trim(application) !='Select Application') {
		$('#block_manage_role_data').html('<span>Loading...</span>');
			$.ajax({
					type : "POST",
					url : myUrl,
					data : "{}",
					async : true,
					dataType : "text",
					success : function(data) {
						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);

						var obj1 = JSON.parse(object.userList);
						var obj2 = JSON.parse(object.roleList);
						var obj3 = JSON.parse(object.count);
						//start code for Bug #122 , Added by Abhimanyu
						if (searchManageRoleWithpageSize) {
							count = obj3;
							searchCount=obj3;
						} else {
							count = obj3;
							searchCount=obj3;
						}
							//obj3 = count;
						// end code for Bug #122 						

						
						var content = '<div class="space15"></div>';
						content += '<div class="row-fluid new_filter">';
						content += '<div class="span3">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Assign Role</label>';
						content += '<select id="role_id" >';
						content += '<option value="">-select Role-</option>';
						try {
							if (obj2 != null && obj2 != '') {
								jQuery.each(obj2, function(i, v) {
									var temp = obj2[i];

									content += '<option value="' + temp + '" >'
											+ temp + '</option>';
								});
							}
						} catch (e) {
							// alert(e);
						}
						content += '</select>';
						content += '</div>';

						content += '</div>';
						content += '</div>';

						content += '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_manageRole" onChange="fetchSize_manageRole(),getPageData_manageRole();" name="deassociationReasonListName" style="width:100%;">';
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
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_manageRole()" id="pageNum_manageRole"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_manageRole" style="width:20%;background-color:white;" onChange="getPageData_manageRole()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_manageRole"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';

						content += '<table class="table table-striped table-bordered" id="manage_role_tbl">';
						content += '<thead>';
						content += '<tr>';
						content += '<th style="width:20px;"><input type="checkbox" onclick="selectAllcheckBoxRole()" class="group-checkable" data-set="#manage_role_tbl .checkboxes" /></th>';
						content += '<th>User LogonId</th>';
						content += '<th>Role Name</th>';
						content += '<th>First Name</th>';
						content += '<th>Last Name</th>';
						content += '<th>Email</th>';
						content += '<th>Mobile</th>';
						content += '</tr>';
						content += '<tr>';

						// content += '<th><input type="button"
						// onClick="manageRoleSearch()" /></th>';
						content += '<th style="padding-bottom: 20px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="manageRoleSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeSearchData();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchManageRole(event)" id="userLogonId" /></th>';
						content += '<th><input type="text" onkeydown="searchManageRole(event)" id="role" /></th>';
						content += '<th><input type="text" onkeydown="searchManageRole(event)" id="firstName" /></th>';
						content += '<th><input type="text" onkeydown="searchManageRole(event)" id="lastName" /></th>';
						content += '<th><input type="text" onkeydown="searchManageRole(event)" id="mail" /></th>';
						content += '<th><input type="text" onkeydown="searchManageRole(event)" id="mobile" /></th>';

						content += '</tr>';

						content += '</tr>';

						content += '</thead>';
						if (obj1 != null && obj1 != '') {
							jQuery
									.each(
											obj1,
											function(i, v) {
												var temp = v.userId + ","
														+ v.role;
												// content += "<tr><td><input
												// type='checkbox'
												// class='checkboxes' value='1'
												// /></td><td>"+v.userId+"</td><td>"+v.role
												// +"</td><td>"+v.firstName
												// +"</td><td>"+v.lastName
												// +"</td><td>"+v.email
												// +"</td><td>"+v.mobile
												// +"</td></tr>";
												content += "<tr><td><input type='checkbox' name ='chkUsersForRole' class='checkboxes' value='"
														+ temp
														+ "' /></td><td>"
														+ v.userLogonId
														+ "</td><td>"
														+ v.role
														+ "</td><td>"
														+ v.firstName
														+ "</td><td>"
														+ v.lastName
														+ "</td><td>"
														+ v.email
														+ "</td><td>"
														+ v.mobile
														+ "</td></tr>";
											});
						} else {
							content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";

						}

						content += "</table><div class='form-actions form-actions2'>";
						content += "<button class='btn btn-primary' id='assignRoleId' onclick='assignRole()' type='button'>Submit</button></div>";

						$('#block_manage_role_data').html(content);
						$("#manage_role_tbl").css("width", "100%");
						/*
						 * $('#manage_role_tbl').dataTable() .columnFilter({
						 * sPlaceHolder: "head:after", aoColumns: [ null, {
						 * type: "text" }, { type: "text" }, { type: "text" }, {
						 * type: "text" }, { type: "text" }, { type: "text" } ]
						 * });
						 */
						// start code for Bug #122 , Added by Abhimanyu
						
						$('#userLogonId').val(userLogonId);
						$('#role').val(role);
						$('#firstName').val(firstName);
						$('#lastName').val(lastName);
						$('#mail').val(mail);
						$('#mobile ').val(mobile);
						
						if ($.trim(globalManageRolePreviouspageSize) != '') {
							$("#pageId_manageRole").val(
									globalManageRolePreviouspageSize);
							fetchSize_manageRole();
							if (!searchManageRoleWithpageSize)
								$("#pageNum_manageRole").val(
										globalManageRolePreviousPageNum);
							else{
								if(globalManageRolePreviousPageNum==0 && parseInt($('#pageN_manageRole').text()) > 0)
									globalManageRolePreviousPageNum="1";
								$("#pageNum_manageRole").val(
										globalManageRolePreviousPageNum);
							}
						}
						
						// end code for Bug #122	
						
						if(pageCall==false){
							var size=10;
							if(globalManageRolePreviouspageSize!=''){
								size=globalManageRolePreviouspageSize;
								count = searchCount;
							}
							if(userLogonId!="" || firstName!="" || lastName!="" || mobile!="" || mail!="" || role!=""){
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
							$('#pageN_manageRole').html(parseInt(maxPgaeNumber));
							if(count == 0){
								$('#pageNum_manageRole').val(0);
							} else {
								$('#pageNum_manageRole').val(1);
							}
						}
						
						if(userLogonId=="" && firstName=="" && lastName=="" && mobile=="" && mail=="" && role==""){
							searchManageRoleWithpageSize = false;
						}
					}

				});

	}

}
function assignRole() {
	var chks = document.getElementsByName('chkUsersForRole');
	var role = document.getElementById('role_id').value;
	var domain = document.getElementById("m_r_domain").value;
	var application = document.getElementById("appList_id").value;

	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats

	// var authValue = $('.deass_radio:checked').val();

	var isChecked = false;
	var id = "";
	if (chks.length != null) {

		for (var i = 0; i < chks.length; i++) {
			if (chks[i].checked) {

				id += chks[i].value + ",";
				isChecked = true;

			}
		}
	}

	id = id.substring(0, id.length - 1);
	if (id == "") {
		alert("Please select Users");
		return;
	}
	if (role == "") {
		alert("Please select Role to assign");
		return;
	}
	dataString = 'userIds=' + id + "&roleToAssign=" + role + "&domainName="
			+ domain + "&appName=" + application + "&csrfPreventionSalt="
			+ strutsToken;

	$.ajax({
		type : "POST",
		url : "admin_asignRole.action",
		data : dataString,
		dataType : "text",
		success : function(response) {

			//	
			if ($.trim(response) == "sessionout") {
				alert(response);
				testVal = document.getElementById('loginPage').value
				window.location.replace(testVal);
			} else if ($.trim(response) == "success") {
				alert(response);
				showUsers(false, false);
			}
		}
	});

}

function manageRoleSearch() {
	searchManageRoleWithpageSize = true;
	showUsers(false, true);
}

function searchManageRole(e) {
	if (e.keyCode === 13)
		manageRoleSearch();
}

function selectAllcheckBoxRole() {
	$("#assignRoleId").focus();
}
