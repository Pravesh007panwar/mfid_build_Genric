function removeDeassociateFilter(){
	$('#userLogonId_dessociate').val("");
	$('#token_dessociate').val("");
	$('#firstName_dessociate').val("");
	$('#lastName_dessociate').val("");
	$('#mobile_dessociate').val("");
	$('#mail_dessociate').val("");
}

var count;
var searchDeassociateWithpageSize = false;

function getPageData_deassociate() {

	var size = document.getElementById('pageId_deassociate').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_deassociate').text();
	var pageNumber = document.getElementById('pageNum_deassociate').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_deassociate').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showDeassociateToken(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_deassociate() {

	var size = document.getElementById('pageId_deassociate').value;
	if ($.trim(size) != '') {
		var maxSize = count;
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(count == 0){
			$('#pageNum_deassociate').val(0);
		} else {
			$('#pageNum_deassociate').attr("disabled",false);
			$('#pageNum_deassociate').val(1);
		}
		$('#pageN_deassociate').html(parseInt(maxPgaeNumber));
	} 
}

var globalDeassociatePreviouspageSize = "";
var globalDeassociatePreviousPageNum = "";

var userLogonId = "";
var token = "";
var firstName = "";
var lastName = "";
var mobile = "";
var mail = "";


function showDeassociateToken(pageCall, isSearch) {

	$("#loading").show();
	$('body').css("opacity", "0.8");
	// start code for Bug #122 , Added by Abhimanyu
	if ($("#pageId_deassociate").length) {
		globalDeassociatePreviouspageSize = $("#pageId_deassociate").val();
		globalDeassociatePreviousPageNum = $("#pageNum_deassociate").val();
	}
	// end code for Bug #122

	var value = $('.deass_radio:checked').val();

	var myUrl = "admin_showDessociateToken.action?authType=" + value;
	var dataString = "";
	// alert(myUrl);
	if (pageCall) {
		var size = document.getElementById('pageId_deassociate').value;
		var pageNumber = document.getElementById('pageNum_deassociate').value;

		/*
		 * myUrl+=
		 * "&fetchSize="+size+"&pageNumber="+pageNumber+"&tokenAssigned=02fec381a229ed6bb27&firstName=user886";
		 */
		myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber;
		
	}
	if(userLogonId!="" || token!="" || firstName!="" || lastName!="" || mobile!="" || mail!=""){
		isSearch=true;
	}
	
	if (isSearch) {
		try{
			userLogonId = document.getElementById('userLogonId_dessociate').value;
				userLogonId = userLogonId.replace(/\s/g, "");
			token = document.getElementById('token_dessociate').value;
				token = token.replace(/\s/g, "");
			firstName = document.getElementById('firstName_dessociate').value;
				firstName = firstName.replace(/\s/g, "");
			lastName = document.getElementById('lastName_dessociate').value;
				lastName = lastName.replace(/\s/g, "");
			mobile = document.getElementById('mobile_dessociate').value;
				mobile = mobile.replace(/\s/g, "");
			mail = document.getElementById('mail_dessociate').value;
				mail = mail.replace(/\s/g, "");
		} catch(e){
			
		}
		
		// myUrl+="&userLogonId="+userLogonId+"&firstName="+firstName+"&lastName="+lastName+"&mobile="+mobile+"&mail="+mail+"&tokenAssigned="+token;
		dataString += "&userLogonId=" + userLogonId + "&firstName=" + firstName
				+ "&lastName=" + lastName + "&mobile=" + mobile + "&mail="
				+ mail + "&tokenAssigned=" + token;
	}

	// start code for Bug #122 , Added by Abhimanyu
	if (searchDeassociateWithpageSize) {
		if (myUrl.indexOf('fetchSize') == -1) {
			if ($.trim(globalDeassociatePreviouspageSize) != '')
				myUrl += "&fetchSize=" + globalDeassociatePreviouspageSize;
		}
	}
	// end code for Bug #122

	$('#block_active_deassociate_data').html('<span>Loading...</span>');
		$.ajax({
				type : "POST",
				url : myUrl,
				data : dataString,
				dataType : "text",
				async : true,

				success : function(data) {
					if ($.trim(data) == "sessionout") {
						alert(data);
						testVal = document.getElementById('loginPage').value
						window.location.replace(testVal);

					}
					var object = JSON.parse(data);
					var obj1 = JSON.parse(object.reasonList);
					var obj3 = JSON.parse(object.count);
					var obj2 = JSON.parse(object.userList);
				
					/*if (searchDeassociateWithpageSize)
						obj3 = count;*/
					
					count = obj3;
					
					var content = '<div class="row-fluid new_filter">';
					content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_deassociate" onChange="fetchSize_deassociate(),getPageData_deassociate();" name="deassociationReasonListName" style="width:100%;">';
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
					content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
					content += '<label>Page Number</label>';
					/*content += '<select onChange="getPageData_deassociate()" id="pageNum_deassociate"  >';
					content += '<option value="">-select Page-</option>';
					content += '</select>';*/
					content += ' <input type="text" id="pageNum_deassociate" style="width:20%;background-color:white;" onChange="getPageData_deassociate()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_deassociate"></span>';
					content += '</div>';
					content += '</div>';
					content += '</div>';
					
					content += '<div class="row-fluid">'
					content += '<div class="span6">';
					content += '<h4>Deassociate</h4>';
					content += '</div>';
					content += '<div class="span6">';
					content += '<div class="pull-right" id="switch_app">';
					content += '<label>Reason For Deassociate</label>';
					content += '<select id="reasonId" name="deassociationReasonListName">';
					content += '<option value="">-select reason-</option>';
					try {
						if (obj1 != null && obj1 != '') {
							jQuery.each(obj1, function(i, v) {
								var temp = obj1[i];

								content += '<option value="' + temp + '" >'
										+ temp + '</option>';
							});
						} else {

						}
					} catch (e) {
						// alert(e);
					}
					content += '</select>';

					content += '</div>';

					content += '</div><table class="table table-striped table-bordered" id="sample_5">';
					content += '<thead>';
					content += '<tr>';
					content += '<th  style="width:20px;"><input type="checkbox" id="idcheckboxSelectDeassociateToken" class="group-checkable" data-set="#sample_5 .checkboxes" /></th>';
					content += '<th>User LogonId</th>';
					content += '<th>Token</th>';
					content += '<th>First Name</th>';
					content += '<th>Last Name</th>';
					content += '<th>Mobile</th>';
					content += '<th>Email</th>';
					content += '</tr>';

					content += '<tr>';
					content += '<th style="padding-bottom: 15px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="userDeassociateSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeDeassociateFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					// content += '<th><input type="button"
					// onClick="userDeassociateSearch()" /></th>';
					content += '<th><input type="text" onkeydown="searchDeassocaite(event)" id="userLogonId_dessociate" /></th>';
					content += '<th><input type="text" onkeydown="searchDeassocaite(event)" id="token_dessociate" /></th>';
					content += '<th><input type="text" onkeydown="searchDeassocaite(event)" id="firstName_dessociate" /></th>';
					content += '<th><input type="text" onkeydown="searchDeassocaite(event)" id="lastName_dessociate" /></th>';
					content += '<th><input type="text" onkeydown="searchDeassocaite(event)" id="mobile_dessociate" /></th>';
					content += '<th><input type="text" onkeydown="searchDeassocaite(event)" id="mail_dessociate" /></th>';
					content += '</tr>';
					content += '</thead>';
					try {
						if (obj2 != null && obj2 != '') {
							jQuery
									.each(
											obj2,
											function(i, v) {
												var temp1 = obj2[i].userId;

												content += "<tr><td><input type='checkbox' name='chkDeassociate' class='checkboxes'  value='"
														+ temp1
														+ "' /></td><td>"
														+ v.userLoginId
														+ "</td><td>"
														+ v.token
														+ "</td><td>"
														+ v.firstName
														+ "</td><td>"
														+ v.lastName
														+ "</td><td>"
														+ v.mobile
														+ "</td><td>"
														+ v.email
														+ "</td></tr>";
											});
						} else {
							content += "<tr><td colspan='7' style='text-align:center;'>No Record Found</td></tr>";
						}
					} catch (e) {
						// alert(e);
					}
					content += "</table>";
					content += '<div class="form-actions form-actions2">';
					content += '<button class="btn btn-primary" type="button" id="idSubmitButtonDeassociateToken" onclick="deassociateToken()">Submit</button>';
					content += '</div></div>';
					$('#block_active_deassociate_data').html(content);
					
					
					$('#userLogonId_dessociate').val(userLogonId);
					$('#token_dessociate').val(token);
					$('#lastName_dessociate').val(lastName);
					$('#mobile_dessociate').val(mobile);
					$('#mail_dessociate').val(mail);
					
					
					if ($.trim(globalDeassociatePreviouspageSize) != '') {
						$("#pageId_deassociate").val(
								globalDeassociatePreviouspageSize);
						fetchSize_deassociate();
						if (!searchDeassociateWithpageSize)
							$("#pageNum_deassociate").val(
									globalDeassociatePreviousPageNum);
						else {
							if(globalDeassociatePreviousPageNum==0 && parseInt() > 0)
								globalDeassociatePreviousPageNum="1";
							$("#pageNum_deassociate").val(
									globalDeassociatePreviousPageNum);
						}
					}
					
					
					if(pageCall==false){
						var size = 10;
						if(globalDeassociatePreviouspageSize!=""){
							size = globalDeassociatePreviouspageSize;
						}
						var maxPgaeNumber = count / size;
						var rem = count % size;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						$('#pageN_deassociate').html(parseInt(maxPgaeNumber));
						if(count == 0){
							$('#pageNum_deassociate').val(0);
						} else {
							$('#pageNum_deassociate').val(1);
						}
					}
					
					if(userLogonId=="" && token=="" && firstName=="" && lastName=="" && mobile=="" && mail==""){
						searchDeassociateWithpageSize = false;
					}
				}
			});

}

function deassociateToken() {

	$("#loading").show();
	$('body').css("opacity", "0.8");
	var chks = document.getElementsByName('chkDeassociate');
	var reason = document.getElementById('reasonId').value;

	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet
															// vats

	if (reason == "") {
		alert("Please select reason to deassociate");
		$("#loading").hide();
		$('body').css("opacity", "1");
		return true;
	}

	if ($('input[type="checkbox"]:checked').length == 0) {
		alert("Please select user to deassociate");
		$("#loading").hide();
		$('body').css("opacity", "1");
		return true;
	}

	var authValue = $('.deass_radio:checked').val();

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
	dataString = 'userIds=' + id + "&authType=" + authValue
			+ "&deassociationReasonListName=" + reason + '&csrfPreventionSalt='
			+ strutsToken

	try {

			$.confirm({
					text : "License will be deassociated for selected users. Do you want to continue ?",
					confirm : function(button) {

						$.ajax({
							type : "POST",
							url : "admin_deassociate.action",
							data : dataString,
							dataType : "text",
							success : function(response) {

								// alert(response);
								resVal = response;
								if ($.trim(response) == "sessionout") {
									alert(response);
									var testVal = document
											.getElementById('loginPage').value;
									window.location.replace(testVal);
								} else if ($.trim(response) == "success") {
									alert(response);
									searchDeassociateWithpageSize = true;
									showDeassociateToken(false, false);
									showManageUser(false);
								} else {
									alert(response);
									showDeassociateToken(false, false);
									showManageUser(false);
								}
							}
						});
						return false;
					},
					cancel : function(button) {
						afterCancel();
						return;
					}
				});
	} catch (e) {
		alert(e);
	}
}

function afterCancel() {
	$("#loading").hide();
	$('body').css("opacity", "1");
}

function userDeassociateSearch() {

	if (validateUserDeassociateSearch()) {
		searchDeassociateWithpageSize = true;
		showDeassociateToken(false, true);
	} else {
		validateUserDeassociateSearch();
	}

}

// start code for bug id #338 , added by Abhimanyu
function resetglobalDeassociateTokenVariable() {
	globalDeassociatePreviouspageSize = "";
	globalDeassociatePreviousPageNum = "";
}
// end code for bug id #338 , added by Abhimanyu

function searchDeassocaite(e) {
	if (e.keyCode === 13)
		userDeassociateSearch();
}

function validateUserDeassociateSearch() {

	var users = $('#userLogonId_dessociate').val();

	if (users != undefined && users != "") {
		users = users.replace(/\s/g, " ");
		var user = users.split(',');
		var len = user.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#userLogonId_dessociate').val("");
			return false;
		}
	}

	var firstName = $('#firstName_dessociate').val();

	if (firstName != undefined && firstName != "") {
		firstName = firstName.replace(/\s/g, " ");
		var fName = firstName.split(',');
		var len = fName.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#firstName_dessociate').val("");
			return false;
		}
	}
	var lastName = $('#lastName_dessociate').val();
	if (lastName != undefined && lastName != "") {
		lastName = lastName.replace(/\s/g, " ");
		var lName = lastName.split(',');
		var len = lName.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#lastName_dessociate').val("");
			return false;
		}
	}
	var email = $('#mail_dessociate').val();

	if (email != undefined && email != "") {
		email = email.replace(/\s/g, " ");
		var mail = email.split(',');
		var len = mail.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#mail_dessociate').val("");
			return false;
		}
	}
	var mobile = $('#mobile_dessociate').val();

	if (mobile != undefined && mobile != "") {
		mobile = mobile.replace(/\s/g, " ");
		var mob = mobile.split(',');
		var len = mob.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#mobile_dessociate').val("");
			return false;
		}
	}

	var token = $('#token_dessociate').val();

	if (token != undefined && token != "") {
		token = token.replace(/\s/g, " ");
		var seed = token.split(',');
		var len = seed.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#token_dessociate').val("");
			return false;
		}
	}

	return true;
}