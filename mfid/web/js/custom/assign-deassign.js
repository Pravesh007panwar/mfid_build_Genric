var user="";
var firstName = "";
var lastName = "";
var mobile = "";
var mail = "";
function removeAssignDeassignSearch(){
	$('#userLogonId').val("");
	$('#firstName').val("");
	$('#lastName').val("");
	$('#mail').val("");
	$('#mobile').val("");
	 user="";
	 firstName = "";
	 lastName = "";
	 mobile = "";
	 mail = "";
}

var count;
var searchCount;
var searchAssignDeassignWithpageSize = false;
var assignDeassignUser = false;


function selectDefaultApp() {
	document.getElementById("application").selectedIndex = "0";
	$("#pageId_assign").val("");
}

function getPageData_assignDeasign() {

	var size = document.getElementById('pageId_assign').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_assign').text();
	var pageNumber = document.getElementById('pageNum_assign').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_assign').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showAssignDeassign(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_assignDeasign() {
	try {
		var size = document.getElementById('pageId_assign').value;
		if ($.trim(size) != '') {
			var maxSize = count;
			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(count==0){
				$('#pageNum_assign').val(0);
			} else {
				$('#pageNum_assign').attr("disabled",false);
				$('#pageNum_assign').val(1);
			}
			$('#pageN_assign').html(parseInt(maxPgaeNumber));
		} 
			
	} catch (e) {
		//alert(e)
	}
}

var role;
var globalAssignDeassignPreviouspageSize = "";
var globalAssignDeassignPreviousPageNum = "";


function showAssignDeassign(pagecall, pageSearch, roleId) {
	try {
		if ($("#pageId_assign").length) {
			globalAssignDeassignPreviouspageSize = $("#pageId_assign").val();
			globalAssignDeassignPreviousPageNum = $("#pageNum_assign").val();
		}
		role = roleId;
		if ($(this).attr('id') == 'assign_deassign') {
			var associate = document.getElementById('assign_deassign').value;
			var application = document.getElementById('application').value;
		} else {
			var associate = document.getElementById('assign_deassign').value;
			var application = document.getElementById('application').value;
		}

		var myUrl = "admin_showAssignDeassignApplication.action?operation="
				+ associate + "&appName=" + application;
		var dataString = "";

		if (pagecall) {
			var size = document.getElementById('pageId_assign').value;
			var pageNumber = document.getElementById('pageNum_assign').value;
			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber;
			//dataString += "&fetchSize=" + size + "&pageNumber=" + pageNumber;
		}

		if(user!= "" || firstName != "" || lastName!="" || mobile!="" || mail!="" ){
			pageSearch=true;
		}
		
		if (pageSearch) {
			 user = document.getElementById('userLogonId').value;
				user = user.replace(/\s/g, "");
			 firstName = document.getElementById('firstName').value;
				firstName = firstName.replace(/\s/g, "");
			 lastName = document.getElementById('lastName').value;
				lastName = lastName.replace(/\s/g, "");
			 mail = document.getElementById('mail').value;
				mail = mail.replace(/\s/g, "");
			 mobile = document.getElementById('mobile').value;
				mobile = mobile.replace(/\s/g, "");
			
			dataString += "&userLogonId=" + user + "&lastName=" + lastName
			+ "&mail=" + mail + "&mobile=" + mobile + "&firstName="
			+ firstName;
		}
		if (searchAssignDeassignWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalAssignDeassignPreviouspageSize) != '')
					myUrl += "&fetchSize="
							+ globalAssignDeassignPreviouspageSize;
			}
		}
		if ($.trim(associate) != '' && $.trim(application) != '') {
			$('#block_active_assign_deassign_data').html(
					'<span>Loading...</span>');

			  $.ajax({
						type : "POST",
						data : dataString,
						dataType : "text",
						//async : true,
						url : myUrl,
						success : function(data) {
							if ($.trim(data) == "sessionout") {
								var testVal = document
										.getElementById("loginPage").value;
								window.location.replace(testVal);
							}
							var obj = JSON.parse(data);
							var obj1 = JSON.parse(obj.count);
							var obj2 = JSON.parse(obj.Messages);
							/*if (searchAssignDeassignWithpageSize
									&& !assignDeassignUser)
								obj1 = count;*/
							count = obj1;
							searchCount = obj1;
							var content = '<div class="row-fluid new_filter">';
							content += '<div class="span6">';
							content += '<div class="pull-left" id="switch_app">';
							content += '<label>Size</label>';
							content += '<select id="pageId_assign" onChange="fetchSize_assignDeasign(),getPageData_assignDeasign();" name="deassociationReasonListName" style="width:100%;">';
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
							content += '<div class="pull-right" id="switch_app"  style="margin-right:-100px;">';
							content += '<label>Page Number</label>';
							/*content += '<select onChange="getPageData_assignDeasign()" id="pageNum_assign"  >';
							content += '<option value="">-select Page-</option>';
							content += '</select>';*/
							content += ' <input type="text" id="pageNum_assign" style="width:20%;background-color:white;" onChange="getPageData_assignDeasign()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_assign"></span>   ' ;
							content += '</div>';
							content += '</div>';
							content += '</div>';
							content += '<table class="table table-striped table-bordered" id="sample_1">';
							content += '<thead>';
							content += '<tr>';
							content += '<th style="width:20px;"><input type="checkbox" id="idcheckboxSelectAssignDeassign" class="group-checkable" data-set="#sample_1 .checkboxes" /></th> ';
							content += '<th>User</th>';
							content += '<th>First Name</th>';
							content += '<th>Last Name</th>';
							content += '<th>Email</th>';
							content += '<th>Mobile</th>';
							content += '</tr>';
							content += '<tr>';
							content += '<th style="padding-bottom: 20px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="search_data()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeAssignDeassignSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text" onkeydown="searchAssignDeassignUser(event)" id="userLogonId" /></th>';
							content += '<th><input type="text" onkeydown="searchAssignDeassignUser(event)" id="firstName" /></th>';
							content += '<th><input type="text" onkeydown="searchAssignDeassignUser(event)"  id="lastName" /></th>';
							content += '<th><input type="text" onkeydown="searchAssignDeassignUser(event)" id="mail" /></th>';
							content += '<th><input type="text" onkeydown="searchAssignDeassignUser(event)" id="mobile" /></th>';

							content += '</tr>';
							content += '</thead>';
							try {
								if (obj2 != null && obj2 != '') {
									jQuery.each(obj2,
													function(i, v) {

													var temp = v.userId;

													content += "<tr><td><input type='checkbox' name='chkAssignDeassign' class='checkboxes' value='"
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
									content += "<tr><td style='text-align:center;' colspan='6'>No Record Found</td></tr>";
								}
								content += "</table>";
								content += '<div class="form-actions form-actions2">  <button class="btn btn-primary" type="button" id="submitbtn" onclick="submitUsername()" >Submit</button>  </div>';
							} catch (e) {
								//"error===" + alert(e);
							}

							$('#block_active_assign_deassign_data').html(
									content);

							$("#sample_1").css("width", "100%");
							
							$('#userLogonId').val(user);
							$('#firstName').val(firstName);
							$('#lastName').val(lastName);
							$('#mail').val(mail);
							$('#mobile').val(mobile);
											
							if ($.trim(globalAssignDeassignPreviouspageSize) != '') {
								$("#pageId_assign").val(globalAssignDeassignPreviouspageSize);
								fetchSize_assignDeasign();
								if (!searchAssignDeassignWithpageSize)
									$("#pageNum_assign").val(globalAssignDeassignPreviousPageNum);
								else {
									if(globalAssignDeassignPreviousPageNum==0 && parseInt() > 0)
										globalAssignDeassignPreviousPageNum="1";
									$("#pageNum_assign").val(globalAssignDeassignPreviousPageNum);
								}
							}
							
							
							if(pagecall==false){
							  var size = 10;
								if(globalAssignDeassignPreviouspageSize!=''){
									size = parseInt(globalAssignDeassignPreviouspageSize);
								}
								
								var maxPgaeNumber = count / size;
								var rem = count % size;
								if (rem > 0) {
									maxPgaeNumber = maxPgaeNumber + 1;
								}
								$('#pageN_assign').html(parseInt(maxPgaeNumber));
								if(count==0){
									$('#pageNum_assign').val(0);
								} else {
									$('#pageNum_assign').val(1);
								}
							}
							
							if(user== "" && firstName == "" && lastName=="" && mobile=="" && mail=="" ){
								searchAssignDeassignWithpageSize = false;
							}
						}

					});

		}
	} catch (e) {
		//alert(e);
	}
}

function submitUsername() {

	var chks = document.getElementsByName('chkAssignDeassign');
	var strutsToken = $('[name=csrfPreventionSalt]').val(); // added by puneet vats
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

	if (isChecked == false) {
		alert("Please select the user");
		return;
	}
	var associate = document.getElementById('assign_deassign').value;
	var application = document.getElementById('application').value;

	id = id.substring(0, id.length - 1);
	dataString = 'userIds=' + id + "&operation=" + associate + "&appName="
			+ application + "&csrfPreventionSalt=" + strutsToken;

	$.ajax({
		type : "POST",
		dataType : "text",
		url : "admin_assignDeassignApp.action",
		data : dataString,
		success : function(response) {

			if ($.trim(response) == "sessionout") {
				alert("sessionout");
				var testVal = document.getElementById('loginPage').value;
				window.location.replace(testVal);
			} else if ($.trim(response) == "success") {
				alert(response);
				searchAssignDeassignWithpageSize = true;
				assignDeassignUser = true;
				showAssignDeassign(false, false, role);
				showManageUser(false, false, role);
				assignDeassignUser = false;
			}
		}
	});
}

function search_data() {
	if(validateAssignDeassignUser()){
		searchAssignDeassignWithpageSize = true;
		showAssignDeassign(false, true);
	} else{
		validateAssignDeassignUser();
	}
	
}
function resetglobalAssignDeassignVariable() {
	globalAssignDeassignPreviouspageSize = "";
	globalAssignDeassignPreviousPageNum = "";
}

function searchAssignDeassignUser(e) {
	
	if (e.keyCode === 13)
		search_data();
}


function validateAssignDeassignUser(){
	
	 var users = $('#userLogonId').val();
	
	 if(users != undefined && users!= ""){
		 users = users.replace(/\s/g, " ");
			var user = users.split(',');
			var len  = user.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#userLogonId').val("");
				return false;
			}
	 }
	 
	 var firstName = $('#firstName').val();
		
	 if(firstName != undefined && firstName!= ""){
		 firstName = firstName.replace(/\s/g, " ");
			var fName = firstName.split(',');
			var len  = fName.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#firstName').val("");
				return false;
			}
	 }
	 var lastName = $('#lastName').val();
	 if(lastName != undefined && lastName!= ""){
		 lastName = lastName.replace(/\s/g, " ");
			var lName = lastName.split(',');
			var len  = lName.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#lastName').val("");
				return false;
			}
	 }
	 var email = $('#mail').val();
	 
	 if(email != undefined && email!= ""){
		 email = email.replace(/\s/g, " ");
			var mail = email.split(',');
			var len  = mail.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#mail').val("");
				return false;
			}
	 }
	 var mobile = $('#mobile').val();
	 
	 if(mobile != undefined && mobile!= ""){
		 mobile = mobile.replace(/\s/g, " ");
			var mob = mobile.split(',');
			var len  = mob.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#mobile').val("");
				return false;
			}
	 }
	
	 return true;
}