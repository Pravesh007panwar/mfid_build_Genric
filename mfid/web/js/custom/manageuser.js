function removeManageUserFilter(){
	$('#userLogonId_mu').val("");
	$('#firstName_mu').val("");
	$('#lastName_mu').val("");
	$('#mail_mu').val("");
	$('#mobile_mu').val("");
	$('#token_mu').val("");
	$('#authType_mu').val("");
	$('#appName_mu').val("");
	$('#addomain_mu').val("");
	$('#empId_mu').val("");
}

var searchCount;
var countManageUser;
var searchManageUserWithpageSize = false;

function getPageData() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN').text();
	var pageNumber = document.getElementById('pageNum').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showManageUser(true, false, role);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize() {
	try {
				
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
		
			var maxSize = countManageUser;
			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(countManageUser==0){
				$('#pageNum').val(0);
			} else{
				$('#pageNum').val(1);
				$('#pageNum').attr("disabled",false);
			} 				
			$('#pageN').html(parseInt(maxPgaeNumber));
				
		} 
		
		
	} catch (e) {
		// alert(e)
	}
}

var role;
var globalPreviouspageSize = "";
var globalPreviousPageNum = "";

var userLogonId="";
var empId = "";
var firstName = "";
var lastName = "";
var mobile = "";
var mail = "";
var appName = "";
var authType = "";
var userStatus = "";
var token = "";
var adDomain = "";

function showManageUser(pageCall, isSearch, roleId) {
	try {
		if ($("#pageId").length) {
			globalPreviouspageSize = $("#pageId").val();
			globalPreviousPageNum = $("#pageNum").val();
		}
		
		role = roleId;
		$.datepicker.regional[""].dateFormat = 'dd/mm/yy';
		$.datepicker.setDefaults($.datepicker.regional['']);
	
		var myUrl = "admin_showManageUserData.action";
		var dataString = "";
		if (pageCall == true) {
			
			var size = document.getElementById('pageId').value;
			var pageNumber = document.getElementById('pageNum').value;
			
			if ($.trim(size) == "")
				size = "10";
			if ($.trim(pageNumber) == "")
				pageNumber = "1";
					
			
			myUrl="admin_showManageUserData.action?fetchSize="+size+"&pageNumber="+pageNumber;
			
			//dataString = "?fetchSize=" + size + "&pageNumber=" + pageNumber;

		} 	
		 
		if(userLogonId != "" || empId != "" || firstName != "" || lastName!="" || mobile!="" || mail!="" 
			|| appName!="" || authType!="" || token!="" || userStatus!= ""  || adDomain!=""){
			isSearch=true;
		}
		
		if (isSearch) {
			 userLogonId = document.getElementById('userLogonId_mu').value;
			    userLogonId = userLogonId.replace(/\s/g, "");
			if (empAccessFlag != 'no') {
				  empId = document.getElementById('empId_mu').value;
				    empId = empId.replace(/\s/g, "");
			}
			 firstName = document.getElementById('firstName_mu').value;
			    firstName = firstName.replace(/\s/g, "");
			 lastName = document.getElementById('lastName_mu').value;
			    lastName = lastName.replace(/\s/g, "");
			 mobile = document.getElementById('mobile_mu').value;
			mobile = mobile.replace(/\s/g, "");
			 mail = document.getElementById('mail_mu').value;
			 appName = document.getElementById('appName_mu').value;
			 authType = document.getElementById('authType_mu').value;
			 userStatus = document.getElementById('userStatus_mu').value;
			 token = document.getElementById('token_mu').value;
			 adDomain = document.getElementById('addomain_mu').value;

			if (empAccessFlag != 'no') {
				// myUrl+="?empId="+empId+"&userLogonId="+userLogonId+"&firstName="+firstName+"&lastName="+lastName+"&mobile="+mobile+"&mail="+mail+"&appName="+appName+"&authType="+authType+"&userStatus="+userStatus+"&token="+token+"&adDomain="+adDomain;
				dataString += "&empId=" + empId + "&userLogonId=" + userLogonId
						+ "&firstName=" + firstName + "&lastName=" + lastName
						+ "&mobile=" + mobile + "&mail=" + mail + "&appName="
						+ appName + "&authType=" + authType + "&userStatus="
						+ userStatus + "&token=" + token + "&adDomain="
						+ adDomain;
			} else {
				// myUrl+="?userLogonId="+userLogonId+"&firstName="+firstName+"&lastName="+lastName+"&mobile="+mobile+"&mail="+mail+"&appName="+appName+"&authType="+authType+"&userStatus="+userStatus+"&token="+token+"&adDomain="+adDomain;
				dataString += "&userLogonId=" + userLogonId + "&firstName="
						+ firstName + "&lastName=" + lastName + "&mobile="
						+ mobile + "&mail=" + mail + "&appName=" + appName
						+ "&authType=" + authType + "&userStatus=" + userStatus
						+ "&token=" + token + "&adDomain=" + adDomain;
			}

		}

		// start code for Bug #122 , added by Abhimanyu
		if (searchManageUserWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalPreviouspageSize) != '') {
					if (myUrl.indexOf('?') == -1)
						myUrl += "?fetchSize=" + globalPreviouspageSize;
					else
						myUrl += "&fetchSize=" + globalPreviouspageSize;
				}
			}
			
		}
		// start code for Bug #122 , added by Abhimanyu

		// alert("myUrl== "+myUrl)

		// $('#user_manage_data').html('<span>Loading...</span>');
		$.ajax({
					type : "POST",
					url : myUrl,
					// url:"192.168.1.157:8081/mfid_REST/mfid/dash/1/10",
					data : dataString,
					async : true,
					dataType : "text",
					success : function(data) {
						// alert(data)
						// alert('empAccessFlag == ' + empAccessFlag );
						if ($.trim(data) == "sessionout") {
							alert("sessionout");
							var testVal = document.getElementById('loginPage').value;
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						var obj1 = JSON.parse(object.userList);
						var obj2 = JSON.parse(object.manageUserCount);
						var obj3 = JSON.parse(object.adDomainList);

						document.getElementById("adDomainId").value = obj3;
						if (searchManageUserWithpageSize) {
							countManageUser = obj2;
							searchCount = obj2;
						} else {
							countManageUser = obj2;
							searchCount = obj2;
						}
							//obj2 = countManageUser;
						
						var content = '<h4>User</h4><div class="space15"></div>';
						var content = '<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; ">';
						content += '<div class="row-fluid new_filter">';
						content += '<div class="span3">';

						content += '<div class="pull-left" id="switch_app">';
						// content += '<label>Lock UnLock</label>';
						content += '<select id="lockId"  name="lockStatus">';
						content += '<option value="">-select Lock Unlock-</option>';
						content += '<option value="Locked">Locked</option>';
						content += '<option value="Unlocked">Unlocked</option>';

						content += '</select>';

						content += '</div>';
						content += '</div>';

						content += '<div class="span3">';
						content += '<div class="pull-left"  id="switch_app">';
						// content += '<label>Description</label>';
						content += '<input type="text" id="lockDesc" name="lockDesc" placeholder="Description"/>';
						content += '</div>';
						content += '</div>';
						content += '<div class="span3">';
						content += '<div class="pull-left" id="switch_app" >';
						// content += '<label></label>';
						content += '<input type="button" id="lockSubmit" value="Submit" onClick="lockUnlockUser()" class="btn btn-primary"/>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<div class="clear"></div>';

						content += '</div>';

						content += '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId" onChange="fetchSize(),getPageData();" name="deassociationReasonListName" style="width:100%;">';
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
						content += '<div class="pull-right" id="pageDisplay" style="margin-right:-100px;" >';
						content += '<label style="margin-right:-30px;">Page Number</label>';
						/*content += '<select onChange="getPageData()"  id="pageNum"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData()" onkeypress="return isNumber(event)" disabled /> of <span id="pageN"></span>   ' ;
						content += '</div>';
						content += '</div>';
						content += '</div>';
						
						content += '<table  id="sample_editable_1">';
						content += '<thead>';
						content += '<tr style="background:#fff;">';
						content += '<td style="width:5%;"><input type="checkbox" class="group-checkable" data-set="#sample_editable_1 .checkboxes" /></td> ';
						content += '<td style="width: 6% !important;">User LogonId</td>';
						if (empAccessFlag != 'no') {
							content += '<td style="width:10%;">EmpId</td>';
						}
						content += '<td style="width:8%;"> First Name</td>';
						content += '<td style="width:8%;">Last Name</td>';
						content += '<td style="width:12%;">Email</td>';
						content += '<td style="width:6%;">Mobile</th>';
						content += '<td style="width:9%;">Ad Domain</th>';
						content += '<td style="width:8%;">Application</td>';
						content += '<td style="width:8%;">Token Type</td>';
						content += '<td style="width:8%;">Status</td>';
						// content += '<th>Token Expiry</th>';
						content += '<td style="width:8%;">Token Serial</td>';
						content += '<td style="width:8%;">Action</td>';
						content += '</tr>';

						content += '<tr>';
						// content += '<th></th>';
						// content += '<th><input type="button"
						// onClick="manageUserSearch()" /></th>';
						content += '<td style="padding-bottom: 15px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="manageUserSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeManageUserFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></td>';
						content += '<td><input type="text" onkeydown="searchManageUser(event)"  id="userLogonId_mu" /></td>';
						if (empAccessFlag != 'no') {
							content += '<td><input type="text" onkeydown="searchManageUser(event)"  id="empId_mu" /></td>';
						}
						content += '<td><input type="text" onkeydown="searchManageUser(event)"  id="firstName_mu" /></td>';
						content += '<td><input type="text" onkeydown="searchManageUser(event)"  id="lastName_mu" /></td>';
						content += '<td><input type="text" onkeydown="searchManageUser(event)"  id="mail_mu" /></td>';
						content += '<td><input type="text" onkeydown="searchManageUser(event)"  id="mobile_mu" /></td>';
						content += '<td><select id="addomain_mu"  >';
						content += '<option value="">Select AD Domain</option>';

						jQuery.each(obj3, function(i, v) {
							content += '<option value='+v+'> '+v+'</option>';
						});
						content += '</select></td>';

						content += '<td><input type="text" onkeydown="searchManageUser(event)"  id="appName_mu" /></td>';

						content += '<td><select id="authType_mu">';
						content += '<option value="">Select Token Type</option>';
						content += '<option value="hardToken">Hard Token</option>';
						content += '<option value="mobileToken">Mobile Token</option>';
						content += '<option value="smsToken">SMS Token</option>';
						content += '<option value="bioToken">Bio Token</option>';
						content += '<option value="pushtoken">Push Token</option>';
						content += '<option value="emergencyToken">Emergency Token</option>';
						content += '<option value="noToken">No Token</option>';
						content += '</select></td>';

						content += '<td><select  id="userStatus_mu"  >';
						content += '<option value="">Select User Status</option>';
						content += '<option value="Locked">Locked</option>';
						content += '<option value="Unlocked">Unlocked</option>';

						content += '</select></td>';
						content += '<td><input type="text" onkeydown="searchManageUser(event)"  id="token_mu" /></td>';
						/*
						 * content += '<th>User LogonId</th>'; content += '<th>
						 * First Name</th>'; content += '<th>Last Name</th>';
						 * content += '<th>Mail</th>'; content += '<th>Mobile</th>';
						 * content += '<th>Application</th>'; content += '<th>Token
						 * Type</th>'; content += '<th>Status</th>'; //
						 * content += '<th>Token Expiry</th>'; content += '<th>Token
						 * Serial</th>'; content += '<th>Action</th>';
						 */
						content += '<td></td>';
						content += '</tr>';
						content += '</thead>';
						try {
							if (obj1 != null && obj1 != '') {

								jQuery
										.each(
												obj1,
												function(i, v) {
													if (role == 4) {

														content += "<tr><td><input type='checkbox' class='checkboxes' value='"
																+ v.userLoginId
																+ "' /></td><td>"
																+ v.userLoginId
																+ "</td>";
														if (empAccessFlag != 'no') {
															content += "<td>"
																	+ v.empId
																	+ "</td>";
														}
														content += "<td>"
																+ v.firstName
																+ "</td><td>"
																+ v.lastName
																+ "</td><td>"
																+ v.email
																+ "</td><td>"
																+ v.mobile
																+ "</td><td>"
																+ v.adDomain
																+ "</td><td>"
																+ v.appName
																+ "</td><td>"
																+ v.authenticationType
																+ "</td><td>"
																+ v.userStatus
																+ "</td><td>"
																+ v.tokenSerial_licenseKey
																+ "</td><td></td></tr>";
														// alert("obj.Messages[i].userLoginId==="+obj.Messages[i].userLoginId);
													} else {
														content += "<tr><td><input type='checkbox' class='checkboxes' value='"
																+ v.userLoginId
																+ "' /></td><td>"
																+ v.userLoginId
																+ "</td>";
														if (empAccessFlag != 'no') {
															content += "<td>"
																	+ v.empId
																	+ "</td>";
														}
														content += "<td>"
																+ v.firstName
																+ "</td><td>"
																+ v.lastName
																+ "</td><td>"
																+ v.email
																+ "</td><td>"
																+ v.mobile
																+ "</td><td>"
																+ v.adDomain
																+ "</td><td>"
																+ v.appName
																+ "</td><td>"
																+ v.authenticationType
																+ "</td><td>"
																+ v.userStatus
																+ "</td><td>"
																+ v.tokenSerial_licenseKey
																+ "</td><td><a class='edit' href='javascript:;'>Edit</a> </td></tr>";
													}

													// content +=
													// "<tr><td><input
													// type='checkbox'
													// class='checkboxes'
													// value='"+obj.Messages[i].loginName+"'
													// /></td><td>"+obj.Messages[i].userLoginId+"</td><td>"+obj.Messages[i].firstName
													// +"</td><td>"+obj.Messages[i].lastName+"</td><td>"+obj.Messages[i].email
													// +"</td><td>"+obj.Messages[i].mobile
													// +"</td><td>"+obj.Messages[i].appName
													// +"</td><td>"+obj.Messages[i].authenticationType
													// +"</td><td>"+obj.Messages[i].userStatus+"</td><td>"+obj.Messages[i].licenseKey+"</td><td><a
													// class='edit'href='javascript:;'>Edit</a>
													// </td></tr>";
												});
							}
							/*
							 * else { content += "<tr><td style='text-align: center;' colspan='11' >
							 * No Record Found!</td></tr>"; }
							 */
						} catch (e) {
							alert(e);
						}
						content += "</table>";
						content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="pull-left">';
						if (role != 4) {
							content += '<div class="btn-group">';
							content += '<button id="sample_editable_1_new" class="btn green">Add New <i class="icon-plus"></i></button>';
							content += '</div>';
							content += '<div class="btn-group">';
							content += '<button id="sample_editable_1_multi_delete" type="button" class="btn green">Delete <i class="icon-remove"></i></button>';
							content += '</div>';
						}
						content += '</div>';
						/*
						 * content += '<div class="pull-right">'; content += '<button
						 * id="user_submit_btn"class="btn btn-primary"
						 * type="submit">Submit</button>';
						 */
						content += '</div>';
						$('#user_manage_data').html(content);
						$("#sample_editable_1").css("width", "100%");
						oTable_m_u = $('#sample_editable_1').dataTable({
							"bPaginate" : false,
							"bFilter" : false,
							"bSort" : false
						});
					
						$('#userLogonId_mu').val(userLogonId);
						$('#firstName_mu').val(firstName);
						$('#lastName_mu').val(lastName);
						$('#mail_mu').val(mail);
						$('#mobile_mu').val(mobile);
						$('#token_mu').val(token);
						$('#authType_mu').val(authType);
						$('#appName_mu').val(appName);
						$('#addomain_mu').val(adDomain);
						if(empAccessFlag!= 'no')
							$('#empId_mu').val(empId);
						
						
						if ($.trim(globalPreviouspageSize) != '') {
							$("#pageId").val(globalPreviouspageSize);
							fetchSize();
							if (!searchManageUserWithpageSize)
								$("#pageNum").val(globalPreviousPageNum);
							else {
								if(globalPreviousPageNum==0 && parseInt() > 0)
									globalPreviousPageNum="1";
								$("#pageNum").val(globalPreviousPageNum);
								
							}
						}
						
						// start code for Bug #122 , added by Abhimanyu
						if(pageCall==false){
							var size=10;
							if(globalPreviouspageSize!=''){
								size = globalPreviouspageSize;
								countManageUser = searchCount;
							}
							if(userLogonId!="" || empId!="" || firstName!="" || lastName!="" || mobile!="" || mail!="" 
								|| appName!="" || authType!="" || userStatus!= "" || token!= ""  || adDomain!=""){
								countManageUser = searchCount;
							}
							if(countManageUser==0){
								countManageUser = searchCount;
							}
							var maxPgaeNumber = countManageUser / size;
							var rem = countManageUser % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN').html(parseInt(maxPgaeNumber));
							if(countManageUser == 0)
								$('#pageNum').val(0);
							else 
								$('#pageNum').val(1);
						}
						if(empAccessFlag!= 'no'){
							if(userLogonId=="" && empId=="" && firstName=="" && lastName=="" && mobile=="" && mail=="" 
								&& appName=="" && authType=="" && userStatus== "" && token=="" && adDomain==""){
								searchManageUserWithpageSize = false;
							}
						} else {
							if(userLogonId=="" && firstName=="" && lastName=="" && mobile=="" && mail=="" 
								&& appName=="" && authType=="" && userStatus== "" && token=="" && adDomain==""){
								searchManageUserWithpageSize = false;
							}
						}
						
				    }
				});

		/*
		 * $("#loading").bind("ajaxStart", function(){ $(this).show();
		 * }).bind("ajaxStop", function(){ $(this).hide(); });
		 */

	} catch (e) {
		alert(e);
	}

}

function addUser(userLogonId, empId, firstName, lastName, mail, mobile,
		adDomain) {
	// alert("add user function");
	/*
	 * alert("userLogonId"+userLogonId); alert("firstName"+firstName);
	 * 
	 * alert("lastName"+lastName); alert("mail"+mail); alert("mobile"+mobile);
	 */
	mail = $.trim(mail);
	var namePattern = /^[A-Za-z]{2,25}$/;

	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet
															// vats
	// alert("strutsToken : ---- "+strutsToken);
	// var iChars = "!`#$%^&*()+=[]\\\';,/{}|\":<>?~";
	var iChars = "!`%^&*()=[]\\\';,/{}|\":<>?~"; // add for bug id #267 ,
													// added by Abhimanyu
	for (var i = 0; i < userLogonId.length; i++) {
		if (iChars.indexOf(userLogonId.charAt(i)) != -1) {
			alert("Your string has special characters. \nThese are not allowed.");
			return;
		}
	}
	if (userLogonId == "") {
		alert("Please enter UserLogonId");
		return;
	} else if (userLogonId.length == 1) {
		alert("UserLogonId shoud have at least 2 characters");
		return;
	} else if (userLogonId.length > 250) {
		alert("UserLogonId length should not be more than 250 character");
		return;
	}
	/*
	 * else if(!isNaN(userLogonId)) { alert("UserLogonId should not be
	 * numeric"); return; } else if(userLogonId.charAt(0).match(/[0-9]/)) {
	 * alert("UserLogonId should not be start from numeric character"); return; }
	 */
	else if (empAccessFlag != 'no' && empId == "") {
		alert("Please Enter empId");
		return;
	} else if (firstName == "") {
		alert("Please enter first name");
		return;
	} else if (!namePattern.test(firstName)) {
		alert("Enter valid first name");
		return;
	}

	else if (lastName == "") {
		alert("Please enter last name");
		return;
	} else if (!namePattern.test(lastName)) {
		alert("Enter valid last name");
		return;
	} else if (mail == "") {
		alert("Please enter mail id");
		return;
	} else if (mail.lastIndexOf(" ") != -1) {
		alert("Please enter valid mail id");
		return;
	}
	/*
	 * else if(mobile=="") { alert("Please enter mobile number"); return; }
	 */// start code for Bug id 195 , added by abhimanyu
	else if (mobile == "" || $.trim(mobile) == "") {
		alert("Please enter mobile number");
		return;
	} else if (isNaN(mobile)) {
		alert("Mobile number should be numeric");
		return;
	} else if(mobile.length > 15 ){
		alert("Mobile number should be less than 15 digits");
		return;
	}
	// end code for Bug id 195 , added by abhimanyu
	else if (adDomain == '') {
		alert("Please select Ad Domain");
		return;
	} else {

		if (empAccessFlag != 'no' && empId != "") {
			var dataString = 'empId=' + empId + '&userLogonId=' + userLogonId
					+ '&firstName=' + firstName + '&lastName=' + lastName
					+ '&mail=' + mail + '&mobile=' + mobile
					+ '&csrfPreventionSalt=' + strutsToken + '&adDomain='
					+ adDomain;
		} else {
			var dataString = 'userLogonId=' + userLogonId + '&firstName='
					+ firstName + '&lastName=' + lastName + '&mail=' + mail
					+ '&mobile=' + mobile + '&csrfPreventionSalt='
					+ strutsToken + '&adDomain=' + adDomain;
		}
		$.ajax({
			type : "POST",
			url : "admin_addUser.action",
			data : dataString,
			dataType : "text",
			success : function(response) {
				// alert("response");
				// alert(response);
				// resVal=response;
				if ($.trim(response) == "sessionout") {
					alert("Session Timeout...");
					var testVal = document.getElementById("loginPage").value;
					window.location.replace(testVal);
				}

				else if ($.trim(response) == "success") {
					document.getElementById("sample_editable_1_new").disabled = false;
					newRow = false;
					alert("success");
					searchManageUserWithpageSize = true; // add line for bug
															// id #330 , added
															// by Abhimanyu
					showManageUser(false, false, role);
				} else
					alert(response);
				// showManageUser(false,false);

			}
		});
		return response;
	}
}

function updateUser(userLogonId, empId, firstName, lastName, mail, mobile,
		adDomain) {
	// alert("update user");
	mail = $.trim(mail);
	var namePattern = /^[A-Za-z]{2,25}$/;
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet
															// vats
	if (empAccessFlag != 'no' && empId == "") {
		alert("Please Enter empId");
		return;
	} else if (firstName == "") {
		alert("Please enter first name");
		return;
	} else if (!namePattern.test(firstName)) {
		alert("Enter valid first name");
		return;
	}

	else if (lastName == "") {
		alert("Please enter last name");
		return;
	} else if (!namePattern.test(lastName)) {
		alert("Enter valid last name");
		return;
	} else if (mail == "") {
		alert("Please enter mail id");
		return;
	} else if (mail.lastIndexOf(" ") != -1) {
		alert("Please enter valid mail id");
		return;
	}// start code for Bug id 195 , added by abhimanyu
	else if (mobile == "" || $.trim(mobile) == "") {
		alert("Please enter mobile number");
		return;
	} else if (isNaN(mobile)) {
		alert("Mobile number should be numeric");
		return;
	} else if(mobile.length > 15 ){
		alert("Mobile number should be less than 15 digits");
		return;
	} // end code for Bug id 195 , added by abhimanyu
	else if (adDomain == "") {
		alert("Please enter Ad Domain");
		return;
	} else {

		if (empAccessFlag != 'no' && empId != "") {
			var dataString = 'userLogonIdToBeModify=' + userLogonId + '&empId='
					+ empId + '&firstName=' + firstName + '&lastName='
					+ lastName + '&mail=' + mail + '&mobile=' + mobile
					+ '&csrfPreventionSalt=' + strutsToken + '&adDomain='
					+ adDomain;
		} else {
			var dataString = 'userLogonIdToBeModify=' + userLogonId
					+ '&firstName=' + firstName + '&lastName=' + lastName
					+ '&mail=' + mail + '&mobile=' + mobile
					+ '&csrfPreventionSalt=' + strutsToken + '&adDomain='
					+ adDomain;
		}
		$.ajax({
			type : "POST",
			url : "admin_updateUser.action",
			data : dataString,
			dataType : "text",
			success : function(response) {
				// alert(response);
				// resVal=response;
				if ($.trim(response) == "sessionout") {
					alert("sessionout");
					var testVal = document.getElementById("loginPage").value;
					window.location.replace(testVal);
				} else if ($.trim(response) == "success") {
					alert("success");
					// add code for Bug id 244 , added by Abhimanyu
					showManageUser(true, false, role);
				} else
					alert(response);
			}
		});
		return response;

	}

}

function deleteUser(userLogonIds) {
	// alert("deleteDomain=====");
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet
															// vats
	var dataString = 'userIds=' + userLogonIds + '&csrfPreventionSalt='
			+ strutsToken;
	$.ajax({
		type : "POST",
		url : "admin_deleteUser.action",
		data : dataString,
		dataType : "text",
		success : function(response) {
			// alert(response);
			if ($.trim(response) == "sessionout") {
				alert("sessionout");
				var testVal = document.getElementById("loginPage").value;
				window.location.replace(testVal);
			} else if ($.trim(response) == "success") {

				alert("success");
				// add code for Bug id 244 , added by Abhimanyu
				showManageUser(false, false, role);
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
	// return response;

}

function manageUserSearch() {
	newRow=false;
	if(validateManageUser()){
		searchManageUserWithpageSize = true;
		showManageUser(false, true, role);
	} else{
		validateManageUser();
	}
	nEditing = null;
	 newRow=false;
}

function lockUnlockUser() {
	// alert("lockUnlockUser");
	var userLogonIds = "";
	var status = "";
	var desc = "";
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet
															// vats
	var myurl = "admin_lockUnlockUsers.action";
	var dataString = "";

	if ($('input[type="checkbox"]:checked').length == 0) {
		alert("Please select user to lock/unlock");
	} else if ($('input[type="checkbox"]:checked').length > 0) {
		status = $('#lockId').val();
		desc = $('#lockDesc').val();

		// alert("status:==="+status);
		// alert("description:==="+desc);

		$('.checkboxes').each(function() {
			if ($(this).is(':checked')) {
				userLogonIds += "'" + $(this).val() + "',";
				// alert(id);
			}
		});
		userLogonIds = userLogonIds.substring(0, userLogonIds.length - 1);

		// alert("userLogonIds===="+userLogonIds);
		var desc_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z ]+)$/;// add
																							// line
																							// for
																							// bug
																							// id
																							// 352
																							// ,
																							// added
																							// by
																							// abhimanyu
		if (status == "") {
			alert("Please select lock/unlock ");
			return;
		} else if (desc == "") {
			alert("Please enter the description");
			return;
		} else if (!$.trim(desc).match(desc_regex))// add code for bug id 352 ,
													// added by abhimanyu
		{
			alert("Please enter valid description");
			return;
		}

		dataString = 'userIds=' + userLogonIds + '&userStatus=' + status
				+ '&description=' + desc + '&csrfPreventionSalt=' + strutsToken;

		$.ajax({
			type : "POST",
			url : myurl,
			data : dataString,
			dataType : "text",
			success : function(response) {
				//alert(response);
				if ($.trim(response) == "sessionout") {
					alert("sessionout");
					var testVal = document.getElementById("loginPage").value;
					window.location.replace(testVal);
				} else if ($.trim(response) == "success") {

					alert("success");
					searchManageUserWithpageSize = true;
					showManageUser(false, false, role);
				} else {
					alert(response);
				}

			},
			error : function(xhr, ajaxOptions, thrownError) {
			//	alert(xhr.status);
			//	alert(xhr.statusText);
			//	alert(thrownError);
			}
		});

	}
}

function searchManageUser(e) {
	if (e.keyCode === 13)
		manageUserSearch();
}

function validateManageUser(){
	
	 var users = $('#userLogonId_mu').val();
	
	 if(users != undefined && users!= ""){
		 users = users.replace(/\s/g, " ");
			var user = users.split(',');
			var len  = user.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#userLogonId_mu').val("");
				return false;
			}
	 }
	 
	 var empIds = $('#empId_mu').val();
		
	 if(empIds != undefined && empIds!= ""){
		 empIds = empIds.replace(/\s/g, " ");
			var empId = empIds.split(',');
			var len  = empId.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#empId_mu').val("");
				return false;
			}
	 }
	 
	 var firstName = $('#firstName_mu').val();
		
	 if(firstName != undefined && firstName!= ""){
		 firstName = firstName.replace(/\s/g, " ");
			var fName = firstName.split(',');
			var len  = fName.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#firstName_mu').val("");
				return false;
			}
	 }
	 var lastName = $('#lastName_mu').val();
	 if(lastName != undefined && lastName!= ""){
		 lastName = lastName.replace(/\s/g, " ");
			var lName = lastName.split(',');
			var len  = lName.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#lastName_mu').val("");
				return false;
			}
	 }
	 var email = $('#mail_mu').val();
	 
	 if(email != undefined && email!= ""){
		 email = email.replace(/\s/g, " ");
			var mail = email.split(',');
			var len  = mail.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#mail_mu').val("");
				return false;
			}
	 }
	 var mobile = $('#mobile_mu').val();
	 
	 if(mobile != undefined && mobile!= ""){
		 mobile = mobile.replace(/\s/g, " ");
			var mob = mobile.split(',');
			var len  = mob.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#mobile_mu').val("");
				return false;
			}
	 }
	 var appName = $('#appName_mu').val();
	 
	 if(appName != undefined && appName!= ""){
		 appName = appName.replace(/\s/g, " ");
			var app = appName.split(',');
			var len  = app.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#appName_mu').val("");
				return false;
			}
	 }
	 var token = $('#token_mu').val();
	 if(token != undefined && token!= ""){
		 token = token.replace(/\s/g, " ");
			var seed = token.split(',');
			var len  = seed.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#token_mu').val("");
				return false;
			}
	 }
	 return true;
}
