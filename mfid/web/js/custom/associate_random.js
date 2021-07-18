function removeAssociateFilter(){
	$('#userLogonId_ass_r').val("");
	$('#firstName').val("");
	$('#lastName').val("");
	$('#mail').val("");
	$('#mobile').val("");
}

var count;
var searchAssociateWithpageSize = false;

function getPageData_assRandom() {

	var size = document.getElementById('pageId_assRandom').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_assRandom').text();
	var pageNumber = document.getElementById('pageNum_assRandom').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_assRandom').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showAssociateRandom(true, false);
	else
		alert('Page should be less than or equal to page number.');
	}

}

function fetchSize_assRandom() {
	
	var size = document.getElementById('pageId_assRandom').value;
	if ($.trim(size) != '') {
		var maxSize = count;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (count == 0) {
			$('#pageNum_assRandom').val(0);
		} else {
			$('#pageNum_assRandom').attr("disabled", false);
			$('#pageNum_assRandom').val(1);
		}
		$('#pageN_assRandom').html(parseInt(maxPgaeNumber));

	} 
		
}

var userLogonIdAss = "";
var firstNameAss = "";
var lastNameAss = "";
var mobileAss = "";
var mailAss = "";


var globalAssociatePreviouspageSize = "";
var globalAssociatePreviousPageNum = "";
function showAssociateRandom(pageCall, isSearch) {

	$("#loading").show();
	$('body').css("opacity", "0.8");
	// start code for Bug #122 , Added by Abhimanyu
	if ($("#pageId_assRandom").length) {
		globalAssociatePreviouspageSize = $("#pageId_assRandom").val();
		globalAssociatePreviousPageNum = $("#pageNum_assRandom").val();
	}
	
	var value = $('.ass_deass_radio:checked').val();
	
	var myUrl = "admin_showAssociateToken.action?authType=" + value;
	var dataString = "";

	if (pageCall) {

		var size = document.getElementById('pageId_assRandom').value;
		var pageNumber = document.getElementById('pageNum_assRandom').value;

		myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber + "";
		// dataString+="&fetchSize="+size+"&pageNumber="+pageNumber+"";

	}
	if(userLogonIdAss!= "" || firstNameAss!="" || lastNameAss!="" || mobileAss!="" || mailAss!=""){
		isSearch=true;
	}
	
	if (isSearch) {
		 userLogonIdAss = document.getElementById('userLogonId_ass_r').value;
		 	userLogonIdAss = userLogonIdAss.replace(/\s/g, "");
		firstNameAss = document.getElementById('firstName').value;
			firstNameAss = firstNameAss.replace(/\s/g, "");
		lastNameAss = document.getElementById('lastName').value;
			lastNameAss = lastNameAss.replace(/\s/g, "");
		mobileAss = document.getElementById('mobile').value;
			mobileAss = mobileAss.replace(/\s/g, "");
		mailAss = document.getElementById('mail').value;
			mailAss = mailAss.replace(/\s/g, "");

		// myUrl+="&userLogonId="+userLogonId+"&firstName="+firstName+"&lastName="+lastName+"&mobile="+mobile+"&mail="+mail;
		dataString += "&userLogonId=" + userLogonIdAss + "&firstName=" + firstNameAss
				+ "&lastName=" + lastNameAss + "&mobile=" + mobileAss + "&mail="
				+ mailAss;
	}
	// alert("myUrl=== "+myUrl)
	// start code for Bug #122 , Added by Abhimanyu
	if (searchAssociateWithpageSize) {
		if (myUrl.indexOf('fetchSize') == -1) {
			if ($.trim(globalAssociatePreviouspageSize) != '')
				myUrl += "&fetchSize=" + globalAssociatePreviouspageSize;
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
					count = obj1;
				
					var content = '<div class="row-fluid new_filter">';
					content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_assRandom" onChange="fetchSize_assRandom(),getPageData_assRandom();" name="deassociationReasonListName" style="width:100%;">';
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
					content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
					content += '<label>Page Number</label>';
					/*content += '<select onChange="getPageData_assRandom()" id="pageNum_assRandom"  >';
					content += '<option value="">-select Page-</option>';
					content += '</select>';*/
					content += ' <input type="text" id="pageNum_assRandom" style="width:20%;background-color:white;" onChange="getPageData_assRandom()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_assRandom"></span>   ' ;
					content += '</div>';
					content += '</div>';
					content += '</div>';
					// /////////////////////////////////////////////////////////////////

					content += '<div class="row-fluid">'
					content += '<div class="span6">';
					content += '<h4>Associate</h4>';
					content += '</div>';
					content += '</div>';

					content += '</div><table class="table table-striped table-bordered" id="sample_4">';
					content += '<thead>';
					content += '<tr>';
					content += '<th width="5%"><input type="checkbox" id="idcheckboxSelectAssociateRandom" class="group-checkable" data-set="#sample_4 .checkboxes" /></th>';
					content += '<th>User LogonId</th>';
					content += '<th>First Name</th>';
					content += '<th>Last Name</th>';
					content += '<th>Email</th>';
					content += '<th>Mobile</th>';
					content += '</tr>';

					content += '<tr>';
					content += '<th style="padding-bottom: 15px;" width="5%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="userAssociateRandomSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeAssociateFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					// content += '<th><input type="button"
					// onClick="userAssociateRandomSearch()" /></th>';
					content += '<th><input type="text" onkeydown="searchAssocaiteRandom(event)" id="userLogonId_ass_r" /></th>';
					content += '<th><input type="text" onkeydown="searchAssocaiteRandom(event)" id="firstName" /></th>';
					content += '<th><input type="text" onkeydown="searchAssocaiteRandom(event)" id="lastName" /></th>';

					content += '<th><input onkeydown="searchAssocaiteRandom(event)" type="text" id="mail" /></th>';
					content += '<th><input onkeydown="searchAssocaiteRandom(event)" type="text" id="mobile" /></th>';
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
							content += "<tr><td colspan='6' style='text-align:center;'>No Record Found</td></tr>";

						}
					} catch (e) {

					}

					content += "</table>";
					content += '<div class="clearfix"></div>';
					content += '<div class="row-fluid"><div class="span6">';
					content += '<div class="pull-right" id="switch_app">';
					content += '<select name="deassoc_select_reason" id="lStatusId" style="margin-top:20px;">';
					content += '<option value="offline">Offline</option>';
					content += '<option value="online">Online</option>';
					content += '</select>';
					content += '</div></div>';
					if (value == "3") {
						content += '<div class="span2">';
						content += '<div class="btn_selt"  id="switch_app">';
						content += '<select name="oneDayFlag" id="oneDayFlag" >';
						content += '<option value="select">select</option>';
						content += '<option value="0">normal</option>';
						content += '<option value="1">onetime</option>';
						content += '</select>';
						content += '</div>';
						content += '</div>';
					}
					content += '</div>';

					content += '<div class="form-actions form-actions2">';
					content += '<button class="btn btn-primary" id="idSubmitButtonAssociateRandom"  onclick="assignRandomToken()"  type="button">Submit</button>';
					content += '</div></div>';
					$('#block_active_associate_deassociate_data').html(content);
					$("#oneDayFlag").val("0");
					
					
					$('#userLogonId_ass_r').val(userLogonIdAss);
					$('#firstName').val(firstNameAss);
					$('#lastName').val(lastNameAss);
					$('#mail').val(mailAss);
					$('#mobile').val(mobileAss);
										
					if ($.trim(globalAssociatePreviouspageSize) != '') {
						$("#pageId_assRandom").val(
								globalAssociatePreviouspageSize);
						fetchSize_assRandom();
						if (!searchAssociateWithpageSize)
							$("#pageNum_assRandom").val(
									globalAssociatePreviousPageNum);
						else {
							if(globalAssociatePreviousPageNum==0 && parseInt($('#pageN_assRandom').text()) > 0)
								globalAssociatePreviousPageNum="1";
							$("#pageNum_assRandom").val(globalAssociatePreviousPageNum);
						}
					}
							
					if(pageCall==false){
						var size = 10;
						if(globalAssociatePreviouspageSize!=""){
							size = globalAssociatePreviouspageSize;
						}
						var maxPgaeNumber = count / size;
						var rem = count % size;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						$('#pageN_assRandom').html(parseInt(maxPgaeNumber));
						if (count == 0) {
							$('#pageNum_assRandom').val(0);
						} else {
							$('#pageNum_assRandom').val(1);
						}
					}
					
					if(userLogonIdAss== "" && firstNameAss=="" && lastNameAss=="" && mobileAss=="" && mailAss==""){
						searchAssociateWithpageSize = false;
					}
				}
			});

}

function assignRandomToken() {

	$("#loading").show();
	$('body').css("opacity", "0.8");

	var chks = document.getElementsByName('chkAssignToken');

	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet
															// vats

	// alert(chks.value);
	var authValue = $('.ass_deass_radio:checked').val();

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

	var status = document.getElementById('lStatusId').value;

	if (authValue == "3") {
		var oneDayFlag = document.getElementById('oneDayFlag').value;
		if (oneDayFlag == 'select') {
			alert("please select type normal / onetime token.");
			$("#oneDayFlag").focus();
			$("#loading").hide();
			$('body').css("opacity", "1");
			return true;
		}
	} else
		oneDayFlag = 0;

	id = id.substring(0, id.length - 1);
	dataString = 'userIds=' + id + "&authType=" + authValue + "&licenseStatus="
			+ status + "&oneDayFlag=" + oneDayFlag + '&csrfPreventionSalt='
			+ strutsToken;

	try {
			$.ajax({
					type : "POST",
					url : "admin_associateRandom.action",
					dataType : "text",
					data : dataString,
					success : function(response) {

						// alert("response: "+response);
						// resVal=response;
						if ($.trim(response) == "sessionout") {
							alert(response);
							var testVal = document.getElementById('loginPage').value;
							window.location.replace(testVal);
						} else if ($.trim(response) == "No token avilable.Please contact administrator") {
							alert(response);
							showAssociateRandom(true, false);
							showManageUser(false);
						} else if ($.trim(response) == "Insufficient amount of tokens.Contact administrator.") {
							alert(response);
							showAssociateRandom(true, false);
							showManageUser(false);
						} else if ($.trim(response) == "success") {
							alert(response);
							showAssociateRandom(false, false);
							showManageUser(false);
						} else if ($.trim(response) == "Please select user") { // bug
																				// id
																				// 517
																				// ,
																				// added
																				// by
																				// abhimanyu
							alert(response);
							showAssociateRandom(true, false);
							showManageUser(false);
						}
					}
				});
	} catch (e) {
		alert(e);
	}
}

function userAssociateRandomSearch() {
	if (validateAssocaiteRandom()) {
		searchAssociateWithpageSize = true;
		showAssociateRandom(false, true);
	} else {
		validateAssocaiteRandom();
	}

}

// start code for bug id #338 , added by Abhimanyu
function resetglobalAssociateRandomVariable() {
	globalAssociatePreviouspageSize = "";
	globalAssociatePreviousPageNum = "";
}
// end code for bug id #338 , added by Abhimanyu

function searchAssocaiteRandom(e) {
	if (e.keyCode === 13)
		userAssociateRandomSearch();
}

function validateAssocaiteRandom() {

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
