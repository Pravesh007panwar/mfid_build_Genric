
var count;
var searchCount;
var searchLockUnlockWithpageSize = false;
var searchLockUnlock2WithpageSize = false;
var searchLockUnlock3WithpageSize = false;
var searchLockUnlock4WithpageSize = false;

var userLogonId = "";
var token = "";
var firstName = "";
var lastName = "";
var mobile = "";
var mail = "";

function getPageData_unlockToken() {

	var size = document.getElementById('pageId_unlockToken').value;
	if ($.trim(size) != '') {
	var pageNumber = document.getElementById('pageNum_unlockToken').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_unlockToken').val(1);}
	var totalPages =  $('#pageN_unlockToken').text();
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showUnlock(true, false);
	else
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_unlockToken() {
	var size = document.getElementById('pageId_unlockToken').value;
	// start code for Bug #122 , added by Abhimanyu
	if ($.trim(size) != '') {
		
		var maxSize = count;
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		
		if(count==0){
			$('#pageNum_unlockToken').val(0);
		} else{
			$('#pageNum_unlockToken').val(1);
			$('#pageNum_unlockToken').attr("disabled",false);
		} 				
		$('#pageN_unlockToken').html(parseInt(maxPgaeNumber));
	
	} else
		$('#pageNum_unlockToken').val(1);
}

function getPageData_lockToken() {

	var size = document.getElementById('pageId_lockToken').value;
	var pageNumber = document.getElementById('pageNum_lockToken').value;
	var totalPages =  $('#pageN_lockToken').text();
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showLock(true, false);
	else
		alert('Page should be less than or equal to page number.');

}

function fetchSize_lockToken() {
	var size = document.getElementById('pageId_lockToken').value;
	if ($.trim(size) != '') {
		
		var maxSize = count;
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(count==0){
			$('#pageNum_lockToken').val(0);
		} else{
			$('#pageNum_lockToken').val(1);
			$('#pageNum_lockToken').attr("disabled",false);
		} 				
		$('#pageN_lockToken').html(parseInt(maxPgaeNumber));
		
	} else
		$('#pageNum_lockToken').val(1);
		
}



function getPageData_lockSMSToken() {

	var size = document.getElementById('pageId_lockSMSToken').value;
	var pageNumber = document.getElementById('pageNum_lockSMSToken').value;
	var totalPages =  $('#pageN_lockSMSToken').text();
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showLockSMSToken(true, false);
	else
		alert('Page should be less than or equal to page number.');
}

function fetchSize_lockSMSToken() {
	var size = document.getElementById('pageId_lockSMSToken').value;
	
	var maxSize = count;

	var maxPgaeNumber = maxSize / size;
	var rem = maxSize % size;
	if (rem > 0) {
		maxPgaeNumber = maxPgaeNumber + 1;
	}
	if(count==0){
		$('#pageNum_lockSMSToken').val(0);
	} else{
		$('#pageNum_lockSMSToken').val(1);
		$('#pageNum_lockSMSToken').attr("disabled",false);
	} 				
	$('#pageN_lockSMSToken').html(parseInt(maxPgaeNumber));
	
}



function getPageData_unlockSMSToken() {

	var size = document.getElementById('pageId_unlockSMSToken').value;
	var pageNumber = document.getElementById('pageNum_unlockSMSToken').value;
	var totalPages =  $('#pageN_unlockSMSToken').text();
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showUnlockSMSToken(true, false);
	else
		alert('Page should be less than or equal to page number.');

}

function fetchSize_unlockSMSToken() {
	var size = document.getElementById('pageId_unlockSMSToken').value;

	if ($.trim(size) != '') {
	
		var maxSize = count;
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		
		if(count==0){
			$('#pageNum_unlockSMSToken').val(0);
		} else{
			$('#pageNum_unlockSMSToken').val(1);
			$('#pageNum_unlockSMSToken').attr("disabled",false);
		} 				
		$('#pageN_unlockSMSToken').html(parseInt(maxPgaeNumber));
		
	} else
		$('#pageNum_unlockSMSToken').val(1);
	
}


var globalLockUnlock3PreviouspageSize = "";
var globalLockUnlock3PreviousPageNum = "";
function showUnlock(isPageCall, isSearch) {
	try {

		// start code for Bug #122 , added by Abhimanyu
		if ($("#pageId_unlockToken").length) {
			globalLockUnlock3PreviouspageSize = $("#pageId_unlockToken").val();
			globalLockUnlock3PreviousPageNum = $("#pageNum_unlockToken").val();
		}
		// end code for Bug #122

		var unlock = document.getElementById('lock_unlock').value;
		var value = $('.ass_radio:checked').val();
		var strutsToken = $('[name=csrfPreventionSalt]').val(); // Saurabh
		
		var myUrl = "token_showLockUnlockToken.action?operation=" + unlock
				+ "&authType=" + value+ '&csrfPreventionSalt='
				+ strutsToken;

		if (isPageCall) {
			var size = document.getElementById('pageId_unlockToken').value;
			var pageNumber = document.getElementById('pageNum_unlockToken').value;
			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber + "";
		}
		
		if(userLogonId!= "" || token!="" || firstName!="" || lastName!="" || mobile!="" ||
				mail!=""){
			isSearch=true;
		}
		if (isSearch) {
			userLogonId = document.getElementById('userLogonIdUnlock').value;
			token = document.getElementById('tokenUnlock').value;
			firstName = document.getElementById('firstNameUnlock').value;
			lastName = document.getElementById('lastNameUnlock').value;
			mobile = document.getElementById('mobileUnlock').value;
			mail = document.getElementById('mailUnlock').value;
			myUrl += "&userlogonId=" + userLogonId + "&firstname=" + firstName
					+ "&lastname=" + lastName + "&mobile=" + mobile + "&email="
					+ mail + "&tokenSerial=" + token;
		}
		
		if (searchLockUnlock3WithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalLockUnlock3PreviouspageSize) != '')
					myUrl += "&fetchSize=" + globalLockUnlock3PreviouspageSize;
			}
		}
		
		$.ajax({
					type : "POST",
					// url:
					// "token_showLockUnlockToken.action?operation="+unlock+"&authType="+value,
					url : myUrl,
					data : "{}",
					async : true,
					dataType : "text",
					success : function(data) {
						if ($.trim(data) == "sessionout") {

							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						var obj2 = JSON.parse(object.unlockTokenList);
						var obj1 = JSON.parse(object.count);
						// start code for Bug #122 and #171 , added by Abhimanyu
						if (searchLockUnlock3WithpageSize){
							count = obj1;
							searchCount = obj1;
						} else {
							count = obj1;
							searchCount = obj1;
						}
						//	obj1 = count;
						// end code for Bug #122 and #171
						//count = obj1;
						var content = '<h4>Unlock</h4><div class="space15"></div>';
					
						var content = '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_unlockToken" onChange="fetchSize_unlockToken(),getPageData_unlockToken();" name="deassociationReasonListName" style="width:100%;">';
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
						content += '<div class="pull-right" id="switch_app"  style="margin-right:-100px;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_unlockToken()" id="pageNum_unlockToken"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_unlockToken" style="width:20%;background-color:white;" onChange="getPageData_unlockToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_unlockToken"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_5">';
						content += '<thead>';
						content += '<tr>';
						content += '<th  style="width:20px;"><input type="checkbox" class="group-checkable" data-set="#sample_5 .checkboxes" /></th>';
						content += '<th>Token</th>';
						content += '<th>User Logon Id</th>';
						content += '<th>First Name</th>';
						content += '<th>Last Name</th>';
						content += '<th>Email</th>';
						content += '<th>Mobile</th>';
						content += '</tr>';
						content += '<tr>';
						content += '<th style="padding-bottom: 20px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="tokenUnlockSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchTokenUnLock(event)"  id="tokenUnlock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenUnLock(event)"  id="userLogonIdUnlock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenUnLock(event)"  id="firstNameUnlock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenUnLock(event)"  id="lastNameUnlock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenUnLock(event)"  id="mailUnlock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenUnLock(event)"  id="mobileUnlock" /></th>';

						content += '</tr>';
						content += '</thead>';
						try {

							if (obj2 != null && obj2 != '') {
								jQuery.each(obj2,
												function(i, v) {
													content += "<tr><td><input type='checkbox' class='checkboxes' name='lockunlock' value='"
															+ v.tokenSerial
															+ "' /></td><td>"
															+ v.tokenSerial
															+ "</td><td>"
															+ v.userName
															+ "</td><td>"
															+ v.firstname
															+ "</td><td>"
															+ v.lastname
															+ "</td><td>"
															+ v.email
															+ "</td><td>"
															+ v.mobile
															+ "</td></tr>";
							});
							} else
								content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";

						} catch (e) {
							// alert(e);
						}
						content += '</table>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="span3">';
						content += 'Descrption: ';
						content += '<input type="text" class="m-wrap small" id="lock_desc" />';
						content += '</div>';
						content += '<button class="btn btn-primary" onclick="lockUnlockToken()" type="button">Submit</button>';
						content += '</div>';
						$('#block_active_lock_unlock_data').html(content);
						$("#sample_5").css("width", "100%");
						
						$('#tokenUnlock').val(token);
						$('#userLogonIdUnlock').val(userLogonId);
						$('#firstNameUnlock').val(firstName);
						$('#lastNameUnlock').val(lastName);
						$('#mailUnlock').val(mail);
						$('#mobileUnlock').val(mobile);
					
						
						if ($.trim(globalLockUnlock3PreviouspageSize) != '') {
							$("#pageId_unlockToken").val(
									globalLockUnlock3PreviouspageSize);
							fetchSize_unlockToken();
							if (!searchLockUnlock3WithpageSize)
								$("#pageNum_unlockToken").val(
										globalLockUnlock3PreviousPageNum);
							else {
								if(globalLockUnlock3PreviousPageNum==0 && parseInt($('#pageN_unlockToken').text()) > 0)
									globalLockUnlock3PreviousPageNum="1";
								$("#pageNum_unlockToken").val(
										globalLockUnlock3PreviousPageNum);
							}
						}
						//searchLockUnlock3WithpageSize = false;
						// end code for Bug #122
						if(isPageCall==false){
							var size=10;
							if(globalLockUnlock3PreviouspageSize!=''){
								size=globalLockUnlock3PreviouspageSize;
								count = searchCount;
							}
							
							if(userLogonId!= "" || token!="" || firstName!="" || lastName!="" || mobile!="" ||
									mail!=""){
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
							$('#pageN_unlockToken').html(parseInt(maxPgaeNumber));
							if(count == 0)
								$('#pageNum_unlockToken').val(0);
							else 
								$('#pageNum_unlockToken').val(1);
						}
						
						if(userLogonId== "" && token=="" && firstName=="" && lastName=="" && mobile=="" &&
								mail==""){
							searchLockUnlock3WithpageSize = false;
						}

					}

				});
	} catch (e) {
		// alert(e);
	}
}

var globalLockUnlockPreviouspageSize = "";
var globalLockUnlockPreviousPageNum = "";



function showLock(isPageCall, isSearch) {
	try {

		if ($("#pageId_lockToken").length) {
			globalLockUnlockPreviouspageSize = $("#pageId_lockToken").val();
			globalLockUnlockPreviousPageNum = $("#pageNum_lockToken").val();
		}
		var strutsToken = $('[name=csrfPreventionSalt]').val();
		var lock = document.getElementById('lock_unlock').value;
		var value = $('.ass_radio:checked').val();
		var myUrl = "token_showLockUnlockToken.action?operation=" + lock
				+ "&authType=" + value+ '&csrfPreventionSalt='
				+ strutsToken;
		if (isPageCall) {
			var size = document.getElementById('pageId_lockToken').value;
			var pageNumber = document.getElementById('pageNum_lockToken').value;
			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber + "";
		}
		if(userLogonId!= "" || token!="" || firstName!="" || lastName!="" || mobile!="" ||
				mail!=""){
			isSearch=true;
		}
		
		if (isSearch) {
			 userLogonId = document.getElementById('userLogonIdLock').value;
			 token = document.getElementById('tokenLock').value;
			 firstName = document.getElementById('firstNameLock').value;
			 lastName = document.getElementById('lastNameLock').value;
			 mobile = document.getElementById('mobileLock').value;
			 mail = document.getElementById('mailLock').value;
			myUrl += "&userlogonId=" + userLogonId + "&firstname=" + firstName
					+ "&lastname=" + lastName + "&mobile=" + mobile + "&email="
					+ mail + "&tokenSerial=" + token;
		}

		// start code for Bug #122 , added by Abhimanyu
		if (searchLockUnlockWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalLockUnlockPreviouspageSize) != '')
					myUrl += "&fetchSize=" + globalLockUnlockPreviouspageSize;
			}
		}
		// end code for Bug #122
		$.ajax({
					type : "POST",
					url : myUrl,
					data : "{}",
					async : true,
					dataType : "text",
					success : function(data) {
						// alert(data);
						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						var obj2 = JSON.parse(object.lockTokenList);
						var obj1 = JSON.parse(object.count);
						
						if (searchLockUnlockWithpageSize){
							count = obj1;
							searchCount = obj1;
						} else {
							count = obj1;
							searchCount = obj1;
						}
							//obj1 = count;
						
						//
						var content = '<h4>Lock</h4><div class="space15"></div>';
						var content = '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_lockToken" onChange="fetchSize_lockToken(),getPageData_lockToken();" style="width:100%;">';
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
						/*content += '<select onChange="getPageData_lockToken()" id="pageNum_lockToken"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_lockToken" style="width:20%;background-color:white;" onChange="getPageData_lockToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_lockToken"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_5">';
						content += '<thead>';
						content += '<tr>';
						content += '<th  style="width:20px;"><input type="checkbox" class="group-checkable" data-set="#sample_5 .checkboxes" /></th>';
						content += '<th>Token</th>';
						content += '<th>User Logon Id</th>';
						content += '<th>First Name</th>';
						content += '<th>Last Name</th>';
						content += '<th>Email</th>';
						content += '<th>Mobile</th>';
						content += '</tr>';
						content += '<tr>';
						content += '<th style="padding-bottom: 20px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="tokenLockSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchTokenLock(event)"  id="tokenLock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenLock(event)"  id="userLogonIdLock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenLock(event)"  id="firstNameLock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenLock(event)"  id="lastNameLock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenLock(event)"  id="mailLock" /></th>';
						content += '<th><input type="text" onkeydown="searchTokenLock(event)"  id="mobileLock" /></th>';
						content += '</tr>';
						content += '</thead>';
						try {
							if (obj2 != null && obj2 != '') {
								jQuery.each(obj2,
												function(i, v) {
													content += "<tr><td><input type='checkbox' class='checkboxes' name='lockunlock' value='"
															+ v.tokenSerial
															+ "' /></td><td>"
															+ v.tokenSerial
															+ "</td><td>"
															+ v.userName
															+ "</td><td>"
															+ v.firstname
															+ "</td><td>"
															+ v.lastname
															+ "</td><td>"
															+ v.email
															+ "</td><td>"
															+ v.mobile
															+ "</td></tr>";
							  });
							} else
								content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";

						} catch (e) {
							// alert(e);
						}
						content += '</table>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="span3">';
						content += 'Descrption: ';
						content += '<input type="text" class="m-wrap small" id="lock_desc" />';
						content += '</div>';
						content += '<button class="btn btn-primary" onclick="lockUnlockToken()" type="button">Submit</button>';

						content += '</div>';
						$('#block_active_lock_unlock_data').html(content);
						$("#sample_5").css("width", "100%");
						// start code for Bug #122 , added by Abhimanyu
						
						$('#tokenLock').val(token);
						$('#userLogonIdLock').val(userLogonId);
						$('#firstNameLock').val(firstName);
						$('#lastNameLock').val(lastName);
						$('#mailLock').val(mail);
						$('#mobileLock').val(mobile);
					
						if ($.trim(globalLockUnlockPreviouspageSize) != '') {
							$("#pageId_lockToken").val(
									globalLockUnlockPreviouspageSize);
							fetchSize_lockToken();
							if (!searchLockUnlockWithpageSize)
								$("#pageNum_lockToken").val(
										globalLockUnlockPreviousPageNum);
							else {
								if(globalLockUnlockPreviousPageNum==0 && parseInt($('#pageN_lockToken').text())>0)
									globalLockUnlockPreviousPageNum="1";
								$("#pageNum_lockToken").val(
										globalLockUnlockPreviousPageNum);
							}
						}
												
						if(isPageCall==false){
							var size=10;
							if(globalLockUnlockPreviouspageSize!=''){
								size=globalLockUnlockPreviouspageSize;
								count= searchCount;
							}
							if(userLogonId!= "" || token!="" || firstName!="" || lastName!="" || mobile!="" ||
									mail!=""){
								count= searchCount;
							}
							if(count==0){
								count= searchCount;
							}
							var maxPgaeNumber = count/size;
							var rem = count % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN_lockToken').html(parseInt(maxPgaeNumber));
							if(count == 0)
								$('#pageNum_lockToken').val(0);
							else 
								$('#pageNum_lockToken').val(1);
						}
			    		if(userLogonId== "" && token=="" && firstName=="" && lastName=="" && mobile=="" &&
								mail==""){
							searchLockUnlockWithpageSize = false;
						}

					}

				});
	} catch (e) {
		alert(e);
	}
}

function lockUnlockToken() {

	var lock_unlock = document.getElementById('lock_unlock').value;
	var chks = document.getElementsByName('lockunlock');
	var desc = document.getElementById('lock_desc').value;
	var value = $('.ass_radio:checked').val();
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet
															// vats
	desc = $.trim(desc);
	var isChecked = false;
	var id = "";
	if (chks.length != null) {

		for (var i = 0; i < chks.length; i++) {
			if (chks[i].checked) {
				id += "'" + chks[i].value + "',";
				isChecked = true;

			}
		}
	}
	if (isChecked == false) {
		alert("Please select user to lock/unlock");
		return;
	}
	var desc_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z ]+)$/; 
	var iChars = "!`@#$%^&*()+=-[]\\\';/{}|\":<>?~_";
	for (var i = 0; i < desc.length; i++) {
		if (iChars.indexOf(desc.charAt(i)) != -1) {
			alert("Please enter valid description");
			exit;
		}
	}
	if (desc == "") {
		alert("Please enter description");
	} else if (!$.trim(desc).match(desc_regex))// add code for bug id 351 ,
												// added by abhimanyu
	{
		alert("Please enter valid description");
	} else if (desc.length < 2) {
		alert("Description length should be more than 1 character");
	} else if (desc.length > 100) {
		alert("Description length should not be more than 100 character");
	}

	else {
		id = id.substring(0, id.length - 1);
		dataString = 'tokenIds=' + id + "&description=" + desc + "&authType="
				+ value + "&operation=" + lock_unlock + '&csrfPreventionSalt='
				+ strutsToken;

		$.ajax({
			type : "POST",
			url : "token_lockUnlockToken.action",
			data : dataString,
			dataType : "text",
			success : function(response) {
				// alert(response);
				if ($.trim(response) == "sessionout") {
					alert(response);
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				} else if (lock_unlock == "lock") {
					if ($.trim(response) == "Token is locked") {
						alert(response);
						showLock(false, false);
						showManageToken(false, false);
					}
				} else if (lock_unlock == "unlock") {
					if ($.trim(response) == "Token is unlocked") {
						alert(response);
						showUnlock(false, false);
						showManageToken(false, false);
					}
				}
			}
		});
	}

}

var globalLockUnlock4PreviouspageSize = "";
var globalLockUnlock4PreviousPageNum = "";
function showLockSMSToken(isPageCall, isSearch) {

	try {

		// start code for Bug #122 , added by Abhimanyu
		if ($("#pageId_lockSMSToken").length) {
			globalLockUnlock4PreviouspageSize = $("#pageId_lockSMSToken").val();
			globalLockUnlock4PreviousPageNum = $("#pageNum_lockSMSToken").val();
		}
		// end code for Bug #122

		var lock = document.getElementById('lock_unlock').value;
		var strutsToken = $('[name=csrfPreventionSalt]').val();
		var myUrl = "token_showLockUnlockSMSToken.action?operation="+lock+'&csrfPreventionSalt='
					+ strutsToken;
		if (isPageCall) {
			var size = document.getElementById('pageId_lockSMSToken').value;
			var pageNumber = document.getElementById('pageNum_lockSMSToken').value;
			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber + "";
		}
		if(userLogonId!= "" || firstName!="" || lastName!="" || mobile!="" ||
				mail!="" || mobile!=""){
			isSearch=true;
		}
		if (isSearch) {
			 userLogonId = document.getElementById('userLogonId').value;

			 firstName = document.getElementById('firstName').value;
			 lastName = document.getElementById('lastName').value;
			 mobile = document.getElementById('mobile').value;
			 mail = document.getElementById('mail').value;
			myUrl += "&userlogonId=" + userLogonId + "&firstname=" + firstName
					+ "&lastname=" + lastName + "&mobile=" + mobile + "&email="
					+ mail;
		}

		// start code for Bug #122 , added by Abhimanyu
		if (searchLockUnlock4WithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalLockUnlock4PreviouspageSize) != '')
					myUrl += "&fetchSize=" + globalLockUnlock4PreviouspageSize;
			}
		}
		// end code for Bug #122
		$('#block_active_lock_unlock_data').html('<span>Loading...</span>');
			$.ajax({
					type : "POST",
					url : myUrl,
					data : "{}",
					async : true,
					dataType : "text",
					success : function(data) {
						if ($.trim(data) == "sessionout") {

							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						var obj2 = JSON.parse(object.lockSMSTokenList);
						var obj1 = JSON.parse(object.count);
						// start code for Bug #122 , added by Abhimanyu
						if (searchLockUnlock4WithpageSize){
							count = obj1;
							searchCount = obj1;
						} else {
							count = obj1;
							searchCount = obj1;
						}
							//obj1 = count;
						// end code for Bug #122
						
						var content = '<h4>Lock</h4><div class="space15"></div>';
						var content = '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_lockSMSToken" onChange="fetchSize_lockSMSToken(),getPageData_lockSMSToken();" name="deassociationReasonListName" style="width:100%;">';
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
						// end code for bug id no #320 , added by abhimanyu
						content += '</select>';
						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_lockSMSToken()" id="pageNum_lockSMSToken"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_lockSMSToken" style="width:20%;background-color:white;" onChange="getPageData_lockSMSToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_lockSMSToken"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_5">';
						content += '<thead>';
						content += '<tr>';
						content += '<th  style="width:20px;"><input type="checkbox" class="group-checkable" data-set="#sample_5 .checkboxes" /></th>';
						content += '<th>Assign To</th>';
						content += '<th>First Name</th>';
						content += '<th>Last Name</th>';
						content += '<th>Email</th>';
						content += '<th>Mobile</th>';
						content += '</tr>';

						content += '<tr>';
						content += '<th style="padding-bottom: 20px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="smsTokenLockSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" id="userLogonId" /></th>';
						content += '<th><input type="text" id="firstName" /></th>';
						content += '<th><input type="text" id="lastName" /></th>';
						content += '<th><input type="text" id="mail" /></th>';
						content += '<th><input type="text" id="mobile" /></th>';
						content += '</tr>';
						content += '</thead>';
						try {

							if (obj2 != null && obj2 != '') {
								jQuery.each(obj2,
												function(i, v) {

													content += "<tr><td><input type='checkbox' class='checkboxes' name='lockunlock' value='"
															+ v.tokenname
															+ "-"
															+ v.username
															+ "' /></td><td>"
															+ v.username
															+ "</td><td>"
															+ v.firstname
															+ "</td><td>"
															+ v.lastname
															+ "</td><td>"
															+ v.emailid
															+ "</td><td>"
															+ v.mobileno
															+ "</td></tr>";
							  });
							} else
								content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";

						} catch (e) {
							// alert(e);
						}
						content += '</table>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="span3">';
						content += 'Descrption: ';
						content += '<input type="text" class="m-wrap small" id="lock_desc" />';
						content += '</div>';
						content += '<button class="btn btn-primary" onclick="lockUnlockSMSToken()" type="button">Submit</button>';
						content += '</div>';
						$('#block_active_lock_unlock_data').html(content);
						$("#sample_5").css("width", "100%");
						// start code for Bug #122 and #171 , added by Abhimanyu
						
						
						$('#userLogonId').val(userLogonId);
						$('#firstName').val(firstName);
						$('#lastName').val(lastName);
						$('#mail').val(mail);
						$('#mobile').val(mobile);
											
						if ($.trim(globalLockUnlock4PreviouspageSize) != '') {
							$("#pageId_lockSMSToken").val(
									globalLockUnlock4PreviouspageSize);
							fetchSize_lockSMSToken();
							if (!searchLockUnlock4WithpageSize)
								$("#pageNum_lockSMSToken").val(
										globalLockUnlock4PreviousPageNum);
							else {
								if(globalLockUnlock4PreviousPageNum==0 && parseInt($('#pageN_lockSMSToken').text()) > 0)
									globalLockUnlock4PreviousPageNum="1";
								$("#pageNum_lockSMSToken").val(
										globalLockUnlock4PreviousPageNum);
							}
						}
						
						// end code for Bug #122 and #171
						
						if(isPageCall==false){
							var size=10;
							if(globalLockUnlock4PreviouspageSize!=''){
								size = globalLockUnlock4PreviouspageSize;
								count = searchCount;
							}
							
							if(userLogonId!= "" || firstName!="" || lastName!="" || mobile!="" ||
									mail!="" || mobile!=""){
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
							$('#pageN_lockSMSToken').html(parseInt(maxPgaeNumber));
							if(count == 0)
								$('#pageNum_lockSMSToken').val(0);
							else 
								$('#pageNum_lockSMSToken').val(1);
						}
						if(userLogonId== "" && firstName=="" && lastName=="" && mobile=="" &&
								mail=="" && mobile==""){
							searchLockUnlock4WithpageSize = false;
						}

					}

				});
	} catch (e) {
		// alert(e);
	}

}

var globalLockUnlock2PreviouspageSize = "";
var globalLockUnlock2PreviousPageNum = "";
function showUnlockSMSToken(isPageCall, isSearch) {

	try {
		// start code for Bug #1221 , added by Abhimanyu
		if ($("#pageId_unlockSMSToken").length) {
			globalLockUnlock2PreviouspageSize = $("#pageId_unlockSMSToken")
					.val();
			globalLockUnlock2PreviousPageNum = $("#pageNum_unlockSMSToken")
					.val();
		}
		// end code for Bug #122

		var unlock = document.getElementById('lock_unlock').value;
		var strutsToken = $('[name=csrfPreventionSalt]').val(); // Saurabh

		var myUrl = "token_showLockUnlockSMSToken.action?operation="+unlock+
		'&csrfPreventionSalt='+strutsToken;
		if (isPageCall) {
			var size = document.getElementById('pageId_unlockSMSToken').value;
			var pageNumber = document.getElementById('pageNum_unlockSMSToken').value;
			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber + "";
		}
		if(userLogonId!= "" || firstName!="" || lastName!="" || mobile!="" ||
				mail!="" || mobile!=""){
			isSearch=true;
		}
		if (isSearch) {
			 userLogonId = document.getElementById('userLogonId').value;
			 firstName = document.getElementById('firstName').value;
			 lastName = document.getElementById('lastName').value;
			 mobile = document.getElementById('mobile').value;
			 mail = document.getElementById('mail').value;
			myUrl += "&userlogonId=" + userLogonId + "&firstname=" + firstName
					+ "&lastname=" + lastName + "&mobile=" + mobile + "&mail="
					+ mail;
		}

		// start code for Bug #122 , added by Abhimanyu
		if (searchLockUnlock2WithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalLockUnlock2PreviouspageSize) != '')
					myUrl += "&fetchSize=" + globalLockUnlock2PreviouspageSize;
			}
		}
		// end code for Bug #122
		$('#block_active_lock_unlock_data').html('<span>Loading...</span>');
		$.ajax({
					type : "POST",
					url : myUrl,
					data : "{}",
					async : true,
					dataType : "text",
					success : function(data) {
						if ($.trim(data) == "sessionout") {

							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						var obj2 = JSON.parse(object.unlockSMSTokenList);
						var obj1 = JSON.parse(object.count);
						// start code for Bug #122 , added by Abhimanyu
						if (searchLockUnlock2WithpageSize) {
							count = obj1;
							searchCount = obj1;
						} else {
							count = obj1;
							searchCount = obj1;
						}
							//obj1 = count;
						// end code for Bug #122
						
						var content = '<h4>Unlock</h4><div class="space15"></div>';
						var content = '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_unlockSMSToken" onChange="fetchSize_unlockSMSToken(),getPageData_unlockSMSToken();" name="deassociationReasonListName" style="width:100%;">';
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
						// end code for bug id no #320 , added by abhimanyu
						content += '</select>';
						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_unlockSMSToken()" id="pageNum_unlockSMSToken"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_unlockSMSToken" style="width:20%;background-color:white;" onChange="getPageData_unlockSMSToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_unlockSMSToken"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_5">';
						content += '<thead>';
						content += '<tr>';
						content += '<th  style="width:20px;"><input type="checkbox" class="group-checkable" data-set="#sample_5 .checkboxes" /></th>';
						content += '<th>Assign To</th>';
						content += '<th>First Name</th>';
						content += '<th>Last Name</th>';
						content += '<th>Email</th>';
						content += '<th>Mobile</th>';
						content += '</tr>';

						content += '<tr>';
						content += '<th style="padding-bottom: 15px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="smsTokenUnLockSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" id="userLogonId" /></th>';
						content += '<th><input type="text" id="firstName" /></th>';
						content += '<th><input type="text" id="lastName" /></th>';
						content += '<th><input type="text" id="mail" /></th>';
						content += '<th><input type="text" id="mobile" /></th>';
						content += '</tr>';
						content += '</thead>';
						try {

							if (obj2 != null && obj2 != '') {
								jQuery.each(obj2,
												function(i, v) {
													content += "<tr><td><input type='checkbox' class='checkboxes' name='lockunlock' value='"
															+ v.tokenname
															+ "-"
															+ v.username
															+ "' /></td><td>"
															+ v.username
															+ "</td><td>"
															+ v.firstname
															+ "</td><td>"
															+ v.lastname
															+ "</td><td>"
															+ v.emailid
															+ "</td><td>"
															+ v.mobileno
															+ "</td></tr>";
								});

							} else
								content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";
						} catch (e) {
							// alert(e);
						}
						content += '</table>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="span3">';
						content += 'Descrption: ';
						content += '<input type="text" class="m-wrap small" id="lock_desc" />';
						content += '</div>';
						content += '<button class="btn btn-primary" onclick="lockUnlockSMSToken()" type="button">Submit</button>';
						content += '</div>';
						$('#block_active_lock_unlock_data').html(content);
						$("#sample_5").css("width", "100%");
						// start code for Bug #122 , added by Abhimanyu
						
						$('#userLogonId').val(userLogonId);
						$('#firstName').val(firstName);
						$('#lastName').val(lastName);
						$('#mail').val(mail);
						$('#mobile').val(mobile);
						
						
						if ($.trim(globalLockUnlock2PreviouspageSize) != '') {
							$("#pageId_unlockSMSToken").val(
									globalLockUnlock2PreviouspageSize);
							fetchSize_unlockSMSToken();
							if (!searchLockUnlock2WithpageSize)
								$("#pageNum_unlockSMSToken").val(
										globalLockUnlock2PreviousPageNum);
							else {
								if(globalLockUnlock2PreviousPageNum==0 && parseInt($('#pageN_unlockSMSToken').text()) > 0)
									globalLockUnlock2PreviousPageNum="1";
								$("#pageNum_unlockSMSToken").val(
										globalLockUnlock2PreviousPageNum);
							}
						}
						
						// end code for Bug #122
						
						if(isPageCall==false){
							var size=10;
							if(globalLockUnlock2PreviouspageSize!=''){
								size = globalLockUnlock2PreviouspageSize;
								count = searchCount;								
							}
							if(userLogonId!= "" || firstName!="" || lastName!="" || mobile!="" ||
									mail!="" || mobile!=""){
								count = searchCount;
							}
							if(count==0) {
								count = searchCount;
							}
							var maxPgaeNumber = count / size;
							var rem = count % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN_unlockSMSToken').html(parseInt(maxPgaeNumber));
							if(count == 0)
								$('#pageNum_unlockSMSToken').val(0);
							else 
								$('#pageNum_unlockSMSToken').val(1);
						}
						
						if(userLogonId=="" && firstName=="" && lastName=="" && mobile=="" &&
								mail=="" && mobile==""){
							searchLockUnlock2WithpageSize = false;
						}

					}

				});
	} catch (e) {
		// alert(e);
	}

}

function lockUnlockSMSToken() {
	
	var lock_unlock = document.getElementById('lock_unlock').value;
	var chks = document.getElementsByName('lockunlock');
	var desc = document.getElementById('lock_desc').value;
	var strutsToken = $('[name=csrfPreventionSalt]').val();
	var isChecked = false;
	var id = "";
	if (chks.length != null) {

		for (var i = 0; i < chks.length; i++) {
			if (chks[i].checked) {
				id += "'" + chks[i].value + "',";
				isChecked = true;

			}
		}
	}
	if (isChecked == false) {
		alert("Please select user to lock/unlock");
		return;
	}
	var desc_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z ]+)$/;// add
																						// line
																						// for
																						// bug
																						// id
																						// 351
																						// ,
																						// added
																						// by
																						// abhimanyu
	var iChars = "!`@#$%^&*()+=-[]\\\';/{}|\":<>?~_";
	for (var i = 0; i < desc.length; i++) {
		if (iChars.indexOf(desc.charAt(i)) != -1) {
			alert("Please enter valid description");
			exit;
		}
	}
	if (desc == "") {
		alert("Please enter description");
	} else if (!$.trim(desc).match(desc_regex))// add code for bug id 351 ,
												// added by abhimanyu
	{
		alert("Please enter valid description");
	} else if (desc.length < 2) {
		alert("Description length should be more than 1 character");
	} else if (desc.length > 100) {
		alert("Description length should not be more than 100 character");
	}

	else {
		id = id.substring(0, id.length - 1);
		dataString = 'otpIds=' + id + "&description=" + desc + "&operation="
				+ lock_unlock+'&csrfPreventionSalt='
				+ strutsToken;

		$.ajax({
			type : "POST",
			url : "token_lockUnlockSMSToken.action",
			data : dataString,
			dataType : "text",
			success : function(response) {
				// alert(response);
				if ($.trim(response) == "sessionout") {
					alert("Session TimeOut...");
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				} else if (lock_unlock == "lock") {
					if ($.trim(response) == "Token is locked") {
						alert($.trim(response));
						showLockSMSToken();
					}
				} else if (lock_unlock == "unlock") {
					if ($.trim(response) == "Token is unlocked") {
						alert($.trim(response));
						showUnlockSMSToken();
					}
				}
			}
		});
	}

}

function tokenUnlockSearch() {
	searchLockUnlock3WithpageSize = true;
	showUnlock(false, true);
}

function tokenLockSearch() {
	searchLockUnlockWithpageSize = true;
	showLock(false, true);
}
function smsTokenUnLockSearch() {
	searchLockUnlock2WithpageSize = true;
	showUnlockSMSToken(false, true);
}
function smsTokenLockSearch() {
	searchLockUnlock4WithpageSize = true;
	showLockSMSToken(false, true);
}

function searchTokenLock(e) {
	if (e.keyCode === 13)
		tokenLockSearch();
}

function searchTokenUnLock(e) {
	if (e.keyCode === 13)
		tokenUnlockSearch();
}


function removeSearch(){
	
	$('#tokenLock').val("");
	$('#userLogonIdLock').val("");
	$('#firstNameLock').val("");
	$('#lastNameLock').val("");
	$('#mailLock').val("");
	$('#mobileLock').val("");
	
	$('#tokenUnlock').val("");
	$('#userLogonIdUnlock').val("");
	$('#firstNameUnlock').val();
	$('#lastNameUnlock').val("");
	$('#mailUnlock').val("");
	$('#mobileUnlock').val("");
}