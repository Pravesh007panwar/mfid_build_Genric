/**
 * 
 */
var searchAssShadowWithpageSize = false;
var globalAssignShadowUserPreviouspageSize = "";
var globalAssignShadowUserPreviousPageNum = "";
var count;
var userLogonId = "";
var token = "";
var appName_search = "";


function showShadowApp(selectVal){
	
	
}

function removeAssignShadowFilter(){
	$('#userLogonId_ass_r').val("");
	$('#token').val("");
	$('#appName_search').val("");
	
}

function getPageData_assignShadowUser() {

	var size = document.getElementById('pageId_asignShadowUser').value;
	var totalPages =  $('#pageN_assignShadowUser').text();
	var pageNumber = document.getElementById('pageNum_asignShadowUser').value;
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showUserByAppAndToken(true, false);
	else
		alert('Page should be less than or equal to page number.');

}

function fetchSize_assignShadowUser() {
	
	var size = document.getElementById('pageId_asignShadowUser').value;
	if ($.trim(size) != '') {
		var maxSize = count;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (count == 0) {
			$('#pageNum_asignShadowUser').val(0);
		} else {
			$('#pageNum_asignShadowUser').attr("disabled", false);
			$('#pageNum_asignShadowUser').val(1);
		}
		$('#pageN_assignShadowUser').html(parseInt(maxPgaeNumber));

	} else
		$('#pageNum_asignShadowUser').val(1);
}

function showUserByAppAndToken(pageCall, isSearch){
	
	
	$("#loading").show();
	$('body').css("opacity", "0.8");
	// start code for Bug #122 , Added by Abhimanyu
	if ($("#pageId_asignShadowUser").length) {
		globalAssignShadowUserPreviouspageSize = $("#pageId_asignShadowUser").val();
		globalAssignShadowUserPreviousPageNum = $("#pageNum_asignShadowUser").val();
	}
	
	var value = $('.asshadow_radio:checked').val();
	var application = document.getElementById('application-id').value;
	
	
	
	var myUrl = "admin_showUserByAppAndToken.action?authType=" + value+ "&appName=" + application;
	var dataString = "";
	
	if (pageCall) {

		var size = document.getElementById('pageId_asignShadowUser').value;
		var pageNumber = document.getElementById('pageNum_asignShadowUser').value;

		myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber + "";
		// dataString+="&fetchSize="+size+"&pageNumber="+pageNumber+"";

	}
	if(userLogonId!= "" || firstName!="" || lastName!="" || mobile!="" || mail!=""){
		isSearch=true;
	}
	
	if (isSearch) {
		 userLogonId = document.getElementById('userLogonId_ass_r').value;
		 	userLogonId = userLogonId.replace(/\s/g, "");
		
		token = document.getElementById('token').value;
		  token = token.replace(/\s/g, "");
		  appName_search = document.getElementById('appName_search').value;
		  appName_search = appName_search.replace(/\s/g, "");

		// myUrl+="&userLogonId="+userLogonId+"&firstName="+firstName+"&lastName="+lastName+"&mobile="+mobile+"&mail="+mail;
		dataString += "&userLogonId=" + userLogonId + "&token=" + token
				      + "&appNameSearch=" + appName_search;
	}
	
	// start code for Bug #122 , Added by Abhimanyu
	if (searchAssShadowWithpageSize) {
		if (myUrl.indexOf('fetchSize') == -1) {
			if ($.trim(globalAssignShadowUserPreviouspageSize) != '')
				myUrl += "&fetchSize=" + globalAssignShadowUserPreviouspageSize;
		}
	}
	// end code for Bug #122
		$.ajax({
				type : "POST",
				url : myUrl,
				data : dataString,
				dataType : "text",
				async : true,

				success : function(data) {
					// alert("data--- "+data)
					if ($.trim(data) == "sessionout") {
						var testVal = document.getElementById('loginPage').value;
						window.location.replace(testVal);
					}
					var obj = JSON.parse(data);

					var obj1 = JSON.parse(obj.count);
					var obj2 = JSON.parse(obj.Messages);
					var obj3 = JSON.parse(obj.appList);
					count = obj1;
				
					var content = '<div class="row-fluid new_filter">';
					content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_asignShadowUser" onChange="fetchSize_assignShadowUser(),getPageData_assignShadowUser();" name="assignToAppUser" style="width:100%;">';
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
					content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
					content += '<label>Page Number</label>';
					content += ' <input type="text" id="pageNum_asignShadowUser" style="width:20%;background-color:white;" onChange="getPageData_assignShadowUser()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_assignShadowUser"></span>   ' ;
					content += '</div>';
					content += '</div>';
					content += '</div>';

					content += '<div class="row-fluid">'
						content += '<div class="span6">';
						content += '<h4>Assign Shadow</h4>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app">';
						content += '<label>Select Shadow Application</label>';
						content += '<select id="shadow_application" name="shadow_application">';
						content += '<option value="">-Select Application-</option>';
						try {
							if (obj3 != null && obj3 != '') {
								jQuery.each(obj3, function(i, v) {
									var temp = obj3[i];

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

						content += '</div><table class="table table-striped table-bordered" id="sample_4">';
					content += '<thead>';
					content += '<tr>';
					content += '<th width="5%"><input type="checkbox" id="idcheckboxSelectAssignShadow" class="group-checkable" data-set="#sample_4 .checkboxes" /></th>';
					content += '<th>User LogonId</th>';
					content += '<th>Token</th>';
					content += '<th>Associated App Name</th>';
					content += '</tr>';

					content += '<tr>';
					content += '<th style="padding-bottom: 15px;" width="5%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="userAssignShadowSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeAssignShadowFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					// content += '<th><input type="button"
					// onClick="userAssociateRandomSearch()" /></th>';
					content += '<th><input type="text" onkeydown="searchAssignShadow(event)" id="userLogonId_ass_r" /></th>';
					content += '<th><input type="text" onkeydown="searchAssignShadow(event)" id="token" /></th>';
					content += '<th><input type="text" onkeydown="searchAssignShadow(event)" id="appName_search" /></th>';
					content += '</tr>';
					content += '</thead>';
					try {
						if (obj2 != null && obj2 != '') {
								jQuery.each(
											obj2,
											function(i, v) {
												var temp = v.userId;

												content += "<tr><td><input type='checkbox' name='chkAssignToken' class='checkboxes' value='"
														+ temp
														+ "' /></td><td>"
														+ v.userLoginId
														+ "</td><td>"
														+ v.tokenSerial_licenseKey
														+ "</td><td>"
														+ v.appName
														+ "</td></tr>";
											});
						} else {
							content += "<tr><td colspan='6' style='text-align:center;'>No Record Found</td></tr>";

						}
					} catch (e) {

					}

					content += "</table>";
					content += '<div class="clearfix"></div>';
					
					
					content += '</div>';

					content += '<div class="form-actions form-actions2">';
					content += '<button class="btn btn-primary" id="idSubmitButtonAssignShadow"  onclick="assignShadowToken()"  type="button">Submit</button>';
					content += '</div></div>';
					$('#block_assign_to_app_data').html(content);
					
					
					
					$('#userLogonId_ass_r').val(userLogonId);
					$('#firstName').val(firstName);
					$('#lastName').val(lastName);
					$('#mail').val(mail);
					$('#mobile').val(mobile);
										
					if ($.trim(globalAssignShadowUserPreviouspageSize) != '') {
						$("#pageId_asignShadowUser").val(
								globalAssignShadowUserPreviouspageSize);
						fetchSize_assignShadowUser();
						if (!searchAssShadowWithpageSize)
							$("#pageNum_asignShadowUser").val(
									globalAssignShadowUserPreviousPageNum);
						else {
							if(globalAssignShadowUserPreviousPageNum==0 && parseInt($('#pageN_assignShadowUser').text()) > 0)
								globalAssignShadowUserPreviousPageNum="1";
							$("#pageNum_asignShadowUser").val(
									globalAssignShadowUserPreviousPageNum);
						}
					}
							
					if(pageCall==false){
						var size = 10;
						if(globalAssignShadowUserPreviouspageSize!=""){
							size = globalAssignShadowUserPreviouspageSize;
						}
						
						var maxPgaeNumber = count / size;
						
						var rem = count % size;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						
						$('#pageN_assignShadowUser').html(parseInt(maxPgaeNumber));
						if (count == 0) {
							$('#pageNum_asignShadowUser').val(0);
						} else {
							$('#pageNum_asignShadowUser').val(1);
						}
					}
					
					if(userLogonId== "" && firstName=="" && lastName=="" && mobile=="" && mail==""){
						searchAssShadowWithpageSize = false;
					}
				}
			});


}

function assignShadowToken() {

	$("#loading").show();
	$('body').css("opacity", "0.8");

	var chks = document.getElementsByName('chkAssignToken');

	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet
															// vats
	var authValue = $('.asshadow_radio:checked').val();
	
	var application = document.getElementById('application-id').value;
	
	var shadowApp = document.getElementById('shadow_application').value;

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
	dataString = 'userIds=' + id + "&authType=" + authValue + "&appName="
			+ application + "&shadowApp=" + shadowApp + '&csrfPreventionSalt='
			+ strutsToken;

	try {
			$.ajax({
					type : "POST",
					url : "admin_assignShadowTokenToUser.action",
					dataType : "text",
					data : dataString,
					success : function(response) {
						if ($.trim(response) == "sessionout") {
							alert(response);
							var testVal = document.getElementById('loginPage').value;
							window.location.replace(testVal);
						} 
						
						var obj = JSON.parse(response);
						var result=JSON.parse(obj.result);
						var message=JSON.parse(obj.message);
						
						if(result == "success") {
							alert(message);
							showUserByAppAndToken(true, false);
							showManageUser(false);
							
						}else if(result == "fail") {
							alert(message);
							
							
						} 
					}
				});
	} catch (e) {
		alert(e);
	}
}



function userAssignShadowSearch() {
	if (validateAssignShadow()) {
		searchAssShadowWithpageSize = true;
		showUserByAppAndToken(false, true);
	} else {
		validateAssignShadow();
	}

}


function validateAssignShadow() {

	var users = $('#userLogonId_ass_r').val();

	if (users != undefined && users != "") {
		users = users.replace(/\s/g, " ");
		var user = users.split(',');
		var len = user.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#userLogonId_ass_r').val("");
			return false;
		}
	}

	var firstName = $('#firstName').val();

	if (firstName != undefined && firstName != "") {
		firstName = firstName.replace(/\s/g, " ");
		var fName = firstName.split(',');
		var len = fName.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#firstName').val("");
			return false;
		}
	}
	var lastName = $('#lastName').val();
	if (lastName != undefined && lastName != "") {
		lastName = lastName.replace(/\s/g, " ");
		var lName = lastName.split(',');
		var len = lName.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#lastName').val("");
			return false;
		}
	}
	var email = $('#mail').val();

	if (email != undefined && email != "") {
		email = email.replace(/\s/g, " ");
		var mail = email.split(',');
		var len = mail.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#mail').val("");
			return false;
		}
	}
	var mobile = $('#mobile').val();

	if (mobile != undefined && mobile != "") {
		mobile = mobile.replace(/\s/g, " ");
		var mob = mobile.split(',');
		var len = mob.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#mobile').val("");
			return false;
		}
	}

	return true;
}


function searchAssignShadow(e) {
	if (e.keyCode === 13)
		userAssignShadowSearch();
}