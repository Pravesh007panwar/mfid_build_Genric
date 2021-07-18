function removeEmergencyFilter(){
	$('#userlogonId').val("");
	$('#userType').val("");
	$('#emergencystatus').val("");
	$('#firstname').val("");
	$('#lastname').val("");
}

var count;
var searchEmergencyAuthWithpageSize = false;

function getPageData_emergencyauth() {

	var size = document.getElementById('pageId_emergencyauth').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_emergencyauth').text();
	var pageNumber = document.getElementById('pageNum_emergencyauth').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_emergencyauth').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showEmergencyAuth(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_emergencyauth() {
	
	var size = document.getElementById('pageId_emergencyauth').value;
	if ($.trim(size) != '') {
		var maxSize = count;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(count == 0){
			$('#pageNum_emergencyauth').val(0);
		} else {
			$('#pageNum_emergencyauth').attr("disabled",false);
			$('#pageNum_emergencyauth').val(1);
		}
		
		$('#pageN_emergencyauth').html(parseInt(maxPgaeNumber));
	} 
}

var globalEmergencyAuthPreviouspageSize = "";
var globalEmergencyAuthPreviousPageNum = "";

var userlogonId = "";
var userType = "";
var firstname = "";
var emergencystatus = "";
var lastname = "";


function showEmergencyAuth(pageCall, isSearch) {
	try {
		// start code for Bug #122 , Added by Abhimanyu
		if ($("#pageId_emergencyauth").length) {
			globalEmergencyAuthPreviouspageSize = $("#pageId_emergencyauth")
					.val();
			globalEmergencyAuthPreviousPageNum = $("#pageNum_emergencyauth")
					.val();
		}
		// end code for Bug #122
		var authType = jQuery("input[name='emergency_radio']:checked").val()

		var myUrl = "token_showAssignEmergencyToken?authType=" + authType;
		var dataString = "";

		if (pageCall) {
			var size = document.getElementById('pageId_emergencyauth').value;
			var pageNumber = document.getElementById('pageNum_emergencyauth').value;

			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber;
			
		}
		
		if(userlogonId!="" || userType!="" || firstname!="" || emergencystatus!="" || lastname!=""){
			isSearch=true;
		}
		
		if (isSearch) {

			userlogonId = document.getElementById('userlogonId').value;
				userlogonId = userlogonId.replace(/\s/g, "");
			userType = document.getElementById('userType').value;
		    firstname = document.getElementById('firstname').value;
				firstname = firstname.replace(/\s/g, "");
			emergencystatus = document.getElementById('emergencystatus').value;
			lastname = document.getElementById('lastname').value;
				lastname = lastname.replace(/\s/g, "");
			// myUrl+=
			// "&userlogonId="+userlogonId+"&firstname="+firstname+"&lastname="+lastname+"&emergencystatus="+emergencystatus+"&userType="+userType;

			dataString += "&userlogonId=" + userlogonId + "&firstname="
					+ firstname + "&lastname=" + lastname + "&emergencystatus="
					+ emergencystatus + "&userType=" + userType;

		}
		if (searchEmergencyAuthWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalEmergencyAuthPreviouspageSize) != '')
					myUrl += "&fetchSize="
							+ globalEmergencyAuthPreviouspageSize;
			}
		}
		
		$('#emergency_btn_data').html('<span>Loading...</span>');
			$.ajax({
					type : "POST",
					url : myUrl,
					data : dataString,
					async : true,
					dataType : "text",
					success : function(data) {
						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						try {
							var object = JSON.parse(data);
							var obj1 = JSON.parse(object.policyList);
							var obj2 = JSON.parse(object.userList);
							var obj3 = JSON.parse(object.count);
						} catch (e) {
							// alert(e);
							// TODO: handle exception
						}
					
						/*if (searchEmergencyAuthWithpageSize)
							obj3 = count;*/
						count = obj3;
					var content = '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_emergencyauth" onChange="fetchSize_emergencyauth(),getPageData_emergencyauth();" name="deassociationReasonListName" style="width:100%;">';
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
						content += '<option value="5000">5000</option>';
						// content += '<option value="10000">10000</option>';
						// end code for bug id no #320 , added by abhimanyu
						content += '</select>';

						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_emergencyauth()" id="pageNum_emergencyauth" style="width:100%;" >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_emergencyauth" style="width:20%;background-color:white;" onChange="getPageData_emergencyauth()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_emergencyauth"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						
						content += '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Mail/SMS Type</label>';
						content += '<select id="id1" style="width:100%;">';
						content += '<option value="">Select</option>';
						content += '<option value="email">Email</option>';
						content += '<option value="sms">SMS</option>';
						content += '<option value="both">Both</option>';
						content += '</select>';
						content += '</div>';
						content += '</div>';

						/*
						 * content += '<div class="span6">'; content += '<div
						 * class="pull-right" id="switch_app" >'; content += '<label>Policy</label>';
						 * content += '<select id="id2" >'; content += '<option
						 * value="">--Select--</option>';
						 * if(obj1!=null&&obj1!=''){ jQuery.each(obj1,
						 * function(i, v) { var temp=obj1[i];
						 * 
						 * content += '<option value="'+temp+'" >'+temp+'</option>';
						 * }); } else {
						 *  } content += '</select>'; content += '</div>';
						 * content += '</div>';
						 */

						content += '</div>';
						// var content = '<h4>Emergency Authontication</h4><div
						// class="space15"></div>';
						content += '<table class="table table-striped table-bordered" id="sample_3">';
						content += '<thead>';
						content += '<tr>';
						content += '<th  style="width:20px;"><input type="checkbox" id="idcheckboxSelectEmergencyAuth" class="group-checkable" data-set="#sample_3 .checkboxes" /></th>';
						content += '<th>User LogonId</th>';
						content += '<th>User Type</th>';
						content += '<th>Emergency Token</th>';
						content += '<th>OTP</th>';
						content += '<th>First Name</th>';
						content += '<th>Last Name</th>';
						content += '</tr>';

						content += '<tr>';

						// content += '<th><input type="button"
						// onClick="userEmergencySearch()" /></th>';
						content += '<th style="padding-bottom: 15px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="userEmergencySearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeEmergencyFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input onkeydown="searchEmergencyAuth(event)" type="text" id="userlogonId" /></th>';
						content += '<th><select name="userType" id="userType"><option value="">--Select --</option>';
						content += '<option value="shadow">shadow</option>';
						content += '<option value="normal">normal</option></select></th>';

						content += '<th><select name="commonPolicyName" id="emergencystatus"><option value="">--Select --</option>';
						content += '<option value="assigned">assigned</option>';
						content += '<option value="not assigned">not assigned</option></select></th>';
						content += '<th></th>';
						content += '<th><input  type="text" onkeydown="searchEmergencyAuth(event)" id="firstname" /></th>';
						content += '<th><input type="text" onkeydown="searchEmergencyAuth(event)" id="lastname" /></th>';
						content += '</tr>';
						content += '</thead>';
						if (obj2 != null && obj2 != '') {
								jQuery.each(
											obj2,
											function(i, v) {
												// alert("v.currentAuth==
												// "+v.currentAuth);
												// alert("v.v.v.shadow==
												// "+v.shadow);
												var val = v.userId + ","
														+ v.currentAuth;
												if (v.shadow == "shadow")
													content += "<tr><td><input type='checkbox' class='checkboxes' name='emergencyCheckbox' value='"
															+ val
															+ "' /></td><td>"
															+ v.userLoginId
															+ "</td><td><a href='javascript:void(0);' onClick='userType("
															+ v.userId
															+ ")'>"
															+ v.shadow
															+ "</a></td><td>"
															+ v.emergencyStatus
															+ "</td><td>"
															+ v.otp
															+ "</td><td>"
															+ v.firstName
															+ "</td><td>"
															+ v.lastName
															+ "</td></tr>";
												else
													content += "<tr><td><input type='checkbox' class='checkboxes' name='emergencyCheckbox' value='"
															+ val
															+ "' /></td><td>"
															+ v.userLoginId
															+ "</td><td>"
															+ v.shadow
															+ "</td><td>"
															+ v.emergencyStatus
															+ "</td><td>"
															+ v.otp
															+ "</td><td>"
															+ v.firstName
															+ "</td><td>"
															+ v.lastName
															+ "</td></tr>";
											});
						} else {
							content += "<tr><td colspan='7' style='text-align:center;'>No Record Found</td></tr>";
						}
						content += "</table><div class='form-actions form-actions2'>";
						content += "<button class='btn btn-primary' type='button' id='idSubmitButtonEmergencyAuth' onClick='assignEmergencyToken()' >Submit</button></div>";

						$('#emergency_btn_data').html(content);
						$("#sample_3").css("width", "100%");
						/*
						 * $('#sample_3').dataTable() .columnFilter({
						 * sPlaceHolder: "head:after", aoColumns: [ null, {
						 * type: "text" }, { type: "select",
						 * values:['Email','SMS'] }, { type: "text" }, { type:
						 * "text" }, { type: "text" }, { type: "text" } ] });
						 */
						// start code for Bug #122 , Added by Abhimanyu
						
						
						$('#userlogonId').val(userlogonId);
						$('#userType').val(userType);
						$('#emergencystatus').val(emergencystatus);
						$('#firstname').val(firstname);
						$('#lastname').val(lastname);
												
						if ($.trim(globalEmergencyAuthPreviouspageSize) != '') {
							$("#pageId_emergencyauth").val(
									globalEmergencyAuthPreviouspageSize);
							fetchSize_emergencyauth();
							if (!searchEmergencyAuthWithpageSize)
								$("#pageNum_emergencyauth").val(
										globalEmergencyAuthPreviousPageNum);
							else {
								if(globalEmergencyAuthPreviousPageNum==0 && parseInt() > 0)
									globalEmergencyAuthPreviousPageNum="1";
								$("#pageNum_emergencyauth").val(
										globalEmergencyAuthPreviousPageNum);
							}
						}
												
						if(pageCall==false){
							var size = 10;
							if(globalEmergencyAuthPreviouspageSize!=''){
								size = globalEmergencyAuthPreviouspageSize;
							}
							var maxPgaeNumber = count / size;
							var rem = count % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN_emergencyauth').html(parseInt(maxPgaeNumber));
							if(count == 0){
								$('#pageNum_emergencyauth').val(0);
							} else {
								$('#pageNum_emergencyauth').val(1);
							}
							
						}
						
						if(userlogonId=="" && userType=="" && firstname=="" && emergencystatus=="" && lastname==""){
							searchEmergencyAuthWithpageSize = false;
						}
						
					}

				});

	} catch (e) {
		alert(e)
		// TODO: handle exception
	}
}

function assignEmergencyToken() {
	// alert("assignEmergencyToken");
	try {
		var type = document.getElementById('id1').value;
		// var policy=document.getElementById('id2').value;
		/*
		 * if(type==""){ alert("Please select Mail/SMS") return; }
		 * if(policy==""){ alert("Please select Policy") return; }
		 */
		var chks = document.getElementsByName('emergencyCheckbox');
		/*
		 * alert(chks); if(chks=="") { alert("Please select User LoginId"); }
		 */
		var authValue = jQuery("input[name='emergency_radio']:checked").val()

		var strutsToken = $('[name=csrfPreventionSalt]').val();// added by
																// puneet vats

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
		id = $.trim(id);

		dataString = 'userIds=' + id + "&authType=" + authValue
				+ "&emergencyType=" + type + '&csrfPreventionSalt='
				+ strutsToken;

		try {
				$.confirm({
						text : "Warning!! Are you sure that you wish to assign emergency token. Please note that If you assign emergency token then shadow users will automatically get the same otp or If you deassign then all the shadow users will get the old authentication automatically. Please be absolutely sure before proceeding. Do you want to continue.",
						confirm : function(button) {
								$.ajax({
										type : "POST",
										url : "token_assignEmergencyAuthentication",
										data : dataString,
										dataType : "text",
										success : function(response) {

											// alert(response);
											// resVal=response;
											if ($.trim(response) == "sessionout") {
												var testVal = document
														.getElementById('loginPage').value;
												window.location
														.replace(testVal);
											}

											else if ($.trim(response) == "success") {
												alert(response);
												searchEmergencyAuthWithpageSize = true;
												showEmergencyAuth(false, false);
												showManageUser(false);
											} else {
												alert(response);
											}

										}
									});
						},
						cancel : function(button) {
							return;
						}
					});
		} catch (e) {
			alert(e);
		}
	} catch (e) {
		alert(e);
		// TODO: handle exception
	}
}

function userEmergencySearch() {
	if (validateUserEmergencySearch()) {
		searchEmergencyAuthWithpageSize = true;
		showEmergencyAuth(false, true);
	} else {
		validateUserEmergencySearch();
	}

}

// start code for bug id #338 , added by Abhimanyu
function resetglobalEmergencyAuthVariable() {
	globalEmergencyAuthPreviouspageSize = "";
	globalEmergencyAuthPreviousPageNum = "";
}
// end code for bug id #338 , added by Abhimanyu

function searchEmergencyAuth(e) {
	if (e.keyCode === 13)
		userEmergencySearch();
}

function validateUserEmergencySearch() {

	var users = $('#userlogonId').val();

	if (users != undefined && users != "") {
		users = users.replace(/\s/g, " ");
		var user = users.split(',');
		var len = user.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#userlogonId').val("");
			return false;
		}
	}

	var firstName = $('#firstname').val();

	if (firstName != undefined && firstName != "") {
		firstName = firstName.replace(/\s/g, " ");
		var fName = firstName.split(',');
		var len = fName.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#firstname').val("");
			return false;
		}
	}
	var lastName = $('#lastname').val();
	if (lastName != undefined && lastName != "") {
		lastName = lastName.replace(/\s/g, " ");
		var lName = lastName.split(',');
		var len = lName.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#lastname').val("");
			return false;
		}
	}

	return true;
}

function userType(userId) {
	// alert("userId==="+userId);
	try {

		dataString = 'userIds=' + userId;

		try {
				$.ajax({
						type : "POST",
						url : "token_showEmergencyShadowUser",
						data : dataString,
						dataType : "text",
						success : function(data) {

							var object = JSON.parse(data);
							var obj1 = JSON
									.parse(object.emergencyShadowUserList);
							var list = new Array();
							//alert(data)
							var counter = 1;
							var contents = ' <table class="table table-bordered table-striped"> <thead>   <tr class="active"> <th>Sr No</th> <th>UserName</th> <th>Applicaion</th> <th>License</th>  </tr>  </thead> <tbody>';
							if (obj1 != null && obj1 != '') {
								jQuery.each(obj1, function(i, v) {

									//list.push("User : "+v.username+","+" App : "+v.application+","+" License : "+v.license);
									contents += ' <tr> <td>' + counter
											+ '</td> <td>' + v.username
											+ '</td>     <td>' + v.application
											+ '</td>    <td>' + v.license
											+ '</td> </tr> ';
									counter++;
								});
							}
							//alert(list);
							contents += '  </tbody>  </table>';
							//alert(contents);
							$('#showShadowUserListModalData').html(contents);
							$('#showShadowUserList').modal('show');
						}
					});
		} catch (e) {
			alert(e);
		}
	} catch (e) {
		alert(e);
		// TODO: handle exception
	}
}
