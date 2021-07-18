function removeAssociateManuallySearch(){
	$('#userLogonId_ass_m').val("");
	$('#firstName_ass_m').val("");
	$('#lastName_ass_m').val("");
	$('#token').val("");
}
var count1;
var count2;
// start code for Bug #122 , Added by Abhimanyu
var searchAssociateManuallyLeftWithpageSize = false;
var searchAssociateManuallyRightWithpageSize = false;
// end code for Bug #122

var globalAssociateManuallyLeftPreviouspageSize = "";
var globalAssociateManuallyLeftPreviousPageNum = "";

var userLogonId = "";
var firstName = "";
var lastName = "";

function refresh_ldiv(isSearchUser,pageCall) {

	try {
		
		if ($("#pageId_left").length) {
			globalAssociateManuallyLeftPreviouspageSize = $("#pageId_left")
					.val();
			globalAssociateManuallyLeftPreviousPageNum = $("#pageNum_left")
					.val();
		}		
		var value = $('.ass_deass_radio:checked').val();

		var myUrl = "admin_showAssociateManually.action?authType=" + value + "";
		var dataString = "";
		
		if(userLogonId!="" || firstName!="" || lastName!=""){
			isSearchUser=true;
		}
		
		if (isSearchUser) {
			userLogonId = document.getElementById('userLogonId_ass_m').value;
				userLogonId = userLogonId.replace(/\s/g, "");
			firstName = document.getElementById('firstName_ass_m').value;
				firstName = firstName.replace(/\s/g, "");
			lastName = document.getElementById('lastName_ass_m').value;
				lastName = lastName.replace(/\s/g, "");
			
			dataString += "&userLogonId=" + userLogonId + "&firstName="
					+ firstName + "&lastName=" + lastName;
		} if(pageCall) {
			var size = document.getElementById('pageId_left').value;
			var pageNumber = document.getElementById('pageNum_left').value;

			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber + "";
		}
		
		if (searchAssociateManuallyLeftWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalAssociateManuallyLeftPreviouspageSize) != '')
					myUrl += "&fetchSize="
							+ globalAssociateManuallyLeftPreviouspageSize;
			}
		}
		
			$.ajax({
					type : "POST",
					url : myUrl,
					data : dataString,
					dataType : "text",
					async : true,
					success : function(data) {
						if ($.trim(data) == "sessionout") {
							var testVal = document.getElementById('loginPage').value;
							window.location.replace(testVal);
						}
					var object = JSON.parse(data);
						try {
							var obj1 = JSON.parse(object.userList);
							var obj2 = JSON.parse(object.tokenList);
							var obj3 = JSON.parse(object.count1);
							var obj4 = JSON.parse(object.count2);
						
							/*if (searchAssociateManuallyLeftWithpageSize)
								obj3 = count1;*/
							
							count1 = obj3;
							count2 = obj4;
						} catch (e) {
							// alert(e);
							// TODO: handle exception
						}

					var content = '<table id="sample_3" class="table table-striped table-bordered">';
						content += '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_left" onChange="fetchSize_left(),getPageData_left();" name="deassociationReasonListName" style="width:100%;">';
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
						
						content += ' <input type="text" id="pageNum_left" style="width:20%;background-color:white;" onChange="getPageData_left()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_left"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<thead>';
						content += '<tr>';
						content += '<th style="width:20px;"></th>';
						content += '<th>User LogonId</th>';
						content += '<th>First Name</th>';
						content += '<th>Last Name</th>';

						content += '</tr>';

						content += '<tr>';
						content += '<th style="padding-bottom: 15px;" width="7%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="userSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeAssociateManuallySearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchAssocaiteManuallyL(event)" id="userLogonId_ass_m" /></th>';
						content += '<th><input type="text" onkeydown="searchAssocaiteManuallyL(event)" id="firstName_ass_m" /></th>';
						content += '<th><input type="text" onkeydown="searchAssocaiteManuallyL(event)" id="lastName_ass_m" /></th>';

						content += '</tr>';

						content += '</tr>';
						content += '</thead>';
						content += '<tbody>';
						if (obj1 != null && obj1 != '') {
							 jQuery.each(obj1,
											function(i, v) {

												content += "<tr><td><input type='radio' name='chkAssociateManually' class='assm_radio_user'   value='"
														+ v.userLoginId
														+ "' /></td><td>"
														+ v.userLoginId
														+ "</td><td>"
														+ v.firstName
														+ "</td><td>"
														+ v.lastName
														+ "</td></tr>";
												});
						} else {
							content += "<tr><td style='text-align:center;' colspan='4'>No Record Found</td></tr>";
						}
						content += '</table>';

						$('#ldiv').html(content);
						
						$('#userLogonId_ass_m').val(userLogonId);
						$('#firstName_ass_m').val(firstName);
						$('#lastName_ass_m').val(lastName);
					
						if ($.trim(globalAssociateManuallyLeftPreviouspageSize) != '') {
							$("#pageId_left")
									.val(
											globalAssociateManuallyLeftPreviouspageSize);
							fetchSize_left();
							if (!searchAssociateManuallyLeftWithpageSize)
								$("#pageNum_left")
										.val(globalAssociateManuallyLeftPreviousPageNum);
							else {
								if(globalAssociateManuallyLeftPreviousPageNum==0 && parseInt($('#pageN_left').text()) > 0)
									globalAssociateManuallyLeftPreviousPageNum="1";
								$("#pageNum_left")
										.val(globalAssociateManuallyLeftPreviousPageNum);
							} 
								
						}
						
												
						if(pageCall==false){
							var size =10;
							if(globalAssociateManuallyLeftPreviouspageSize!=''){
								size = globalAssociateManuallyLeftPreviouspageSize;
							}
							var maxPgaeNumber = count1 / size;
							var rem = count1 % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN_left').html(parseInt(maxPgaeNumber));
							if(count1 == 0){
								$('#pageNum_left').val(0);
							} else {
								$('#pageNum_left').val(1);
							}
							
						}
						
						if(userLogonId=="" && firstName=="" && lastName==""){
							searchAssociateManuallyLeftWithpageSize = false;
						}
					}

				});

	} catch (e) {
		// TODO: handle exception
		// alert(e);
	}

}

var globalAssociateManuallyRightPreviouspageSize = "";
var globalAssociateManuallyRightPreviousPageNum = "";
var token="";

function refresh_rdiv(isTokenSearch,pageCall) {

	try {
		// start code for Bug #122 , Added by Abhimanyu
		if ($("#pageId_right").length) {
			globalAssociateManuallyRightPreviouspageSize = $("#pageId_right")
					.val();
			globalAssociateManuallyRightPreviousPageNum = $("#pageNum_right")
					.val();
		}
		// end code for Bug #122

		var value = $('.ass_deass_radio:checked').val();

		var myUrl = "admin_showAssociateManually.action?authType=" + value + "";
		var dataString = "";
		if(token!=""){
			isTokenSearch=true;	
		}
		
		if (isTokenSearch) {
			token = document.getElementById('token').value;
				token = token.replace(/\s/g, "");
			// myUrl += "&token="+token;
			dataString += "&token=" + token;
		} if(pageCall) {
			var size = document.getElementById('pageId_right').value;
			var pageNumber = document.getElementById('pageNum_right').value;

			myUrl += "&fetchSize2=" + size + "&pageNumber2=" + pageNumber;

		}
		
		if (searchAssociateManuallyRightWithpageSize) {
			if (myUrl.indexOf('fetchSize2') == -1) {
				if ($.trim(globalAssociateManuallyRightPreviouspageSize) != '')
					myUrl += "&fetchSize2="
							+ globalAssociateManuallyRightPreviouspageSize;
			}
		}
		
			$.ajax({
					type : "POST",
					url : myUrl,
					data : dataString,
					dataType : "text",
					async : true,

					success : function(data) {

						if ($.trim(data) == "sessionout") {
							var testVal = document.getElementById('loginPage').value;
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						try {
							var obj1 = JSON.parse(object.userList);
							var obj2 = JSON.parse(object.tokenList);
							var obj3 = JSON.parse(object.count1);
							var obj4 = JSON.parse(object.count2);
							
							/*if (searchAssociateManuallyRightWithpageSize)
								obj4 = count2;*/
							count1 = obj3;
							count2 = obj4;
						} catch (e) {
							// alert(e);
							// TODO: handle exception
						}

						content = '<div class="tab-content_in">';
						content += '<table id="sample_9"  class="table table-striped table-bordered">';
						
						content += '<div class="row-fluid new_filter">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_right" onChange="fetchSize_right(),getPageData_right();" name="deassociationReasonListName" style="width:100%;">';
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
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_right()" id="pageNum_right"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_right" style="width:20%;background-color:white;" onChange="getPageData_right()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_right"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						

						content += '<thead>';

						content += '<tr>';
						content += '<th></th>';
						content += '<th>Token Serial</th>';
						content += '<th>Days Left</th>';
						content += '</tr>';
						content += '<tr>';
						content += '<th style="padding-bottom: 15px;" width="7%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="tokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeAssociateManuallySearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						// content += '<th><input type="button"
						// onClick="tokenSearch()" /></th>';
						content += '<th><input type="text"  onkeydown="searchAssocaiteManuallyR(event)" id="token" /></th>';
						content += '<th>Days Left</th>';
						content += '</tr>';
						content += '</thead>';
						content += '<tbody>';
						if (obj2 != null && obj2 != '') {
								jQuery.each(
											obj2,
											function(i, v) {
												v.timeRemaining = 'N/A';
												content += "<tr><td><input type='radio' name='assm_token' class='assm_radio_token'  value='"
														+ v.id
														+ "' /></td><td>"
														+ v.tokenSerial
														+ "</td><td>"
														+ v.timeRemaining
														+ "</td></tr>";
												// content += "<tr><td><input
												// type='checkbox'
												// class='checkboxes' value='1'
												// /></td><td>"+v.TokenSireal
												// +"</td><td>"+v.DaysLeft
												// +"</td></tr>";
											});
						} else {
							content += "<tr><td style='text-align:center;' colspan='3'>No Record Found</td></tr>";
						}
						content += '</table>';
						content += '</div>';

						$('#rdiv').html(content);
						
						$('#token').val(token);
						
						// start code for Bug #122 ,Added by Abhimanyu
						if ($.trim(globalAssociateManuallyRightPreviouspageSize) != '') {
							$("#pageId_right")
									.val(globalAssociateManuallyRightPreviouspageSize);
							fetchSize_right();
							if (!searchAssociateManuallyRightWithpageSize)
								$("#pageNum_right").val(
										globalAssociateManuallyRightPreviousPageNum);
							else {
								if(globalAssociateManuallyRightPreviousPageNum==0 && parseInt($('#pageN_right').text()) > 0)
									globalAssociateManuallyRightPreviousPageNum="1";
								$("#pageNum_right").val(
										globalAssociateManuallyRightPreviousPageNum);
							}
							
						}
						
						if(pageCall==false){
							var size = 10;
							if(globalAssociateManuallyRightPreviouspageSize!=''){
								size = globalAssociateManuallyRightPreviouspageSize;
							}
							var maxPgaeNumber = count2 / size;
							var rem = count2 % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN_right').html(parseInt(maxPgaeNumber));
							if(count2==0){
								$('#pageNum_right').val(0);
							} else {
								$('#pageNum_right').val(1);
							}
							
						}
						if(token==""){
							searchAssociateManuallyRightWithpageSize = false;
						}
						
					}

				});

		
		// end code for Bug #122

	} catch (e) {
		// TODO: handle exception
		// alert(e);
	}

}

function getPageData_left() {
	var size = document.getElementById('pageId_left').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_left').text();
	var pageNumber = document.getElementById('pageNum_left').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_left').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		refresh_ldiv(false,true);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize_left() {
	
	var size = document.getElementById('pageId_left').value;
	
	if ($.trim(size) != '') {
		var maxSize = count1;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (count1 == 0) {
			$('#pageNum_left').val(0);
		} else {
			$('#pageNum_left').attr("disabled", false);
			$('#pageNum_left').val(1);
		}
		$('#pageN_left').html(parseInt(maxPgaeNumber));
	} 
		
}

function getPageData_right() {
	var size = document.getElementById('pageId_right').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_right').text();
	var pageNumber = document.getElementById('pageNum_right').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_right').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		refresh_rdiv(false,true);
	else
		alert('Page should be less than or equal to page number.');
	}
		
}

function fetchSize_right() {
	var size = document.getElementById('pageId_right').value;
	if ($.trim(size) != '') {
		var maxSize = count2;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (count2 == 0) {
			$('#pageNum_right').val(0);
		} else {
			$('#pageNum_right').attr("disabled", false);
			$('#pageNum_right').val(1);
		}
		$('#pageN_right').html(parseInt(maxPgaeNumber));
		
	} 
}

function showAssociateManually(pageCall, pageCall2) {
	try {
		var value = $('.ass_deass_radio:checked').val();
		// alert("show associate manually: "+value);
		var myUrl = "admin_showAssociateManually.action?authType=" + value + "";

		if (pageCall) {
			var size = document.getElementById('pageId_left').value;
			var pageNumber = document.getElementById('pageNum_left').value;

			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber + "";
		}

		if (pageCall2) {
			var size = document.getElementById('pageId_right').value;
			var pageNumber = document.getElementById('pageNum_right').value;

			myUrl += "&fetchSize2=" + size + "&pageNumber2=" + pageNumber + "";

		}

		// alert("myUrl::::::"+myUrl);

		$('#block_active_associate_deassociate_data').html(
				'<span>Loading...</span>');
			$.ajax({
					type : "POST",
					url : myUrl,
					data : "{}",
					dataType : "text",
					async : true,

					success : function(data) {

						// alert("data:::::"+data);
						if ($.trim(data) == "sessionout") {
							var testVal = document.getElementById('loginPage').value;
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						try {
							var obj1 = JSON.parse(object.userList);
							var obj2 = JSON.parse(object.tokenList);
							var obj3 = JSON.parse(object.count1);
							var obj4 = JSON.parse(object.count2);

							count1 = obj3;
							count2 = obj4;
						} catch (e) {
							// alert(e);
							// TODO: handle exception
						}

						// alert("count1:::::::"+count1);

						var content = '<h4>Associate Manually</h4>';
						content += '<div class="row-fluid">';

						var it = 0;
						// jQuery.each(data, function(index, value) {
						jQuery
								.each(
										object,
										function(index, value) { // Saurabh
																	// Changes
											var tid = '';

											if (it == 0) {
												content += '<div class="span6" id="ldiv">';
												content += '<table id="sample_3" class="table table-striped table-bordered">';
												// //////////////////////////////////////////////////////////////////
												content += '<div class="row-fluid new_filter">';
												content += '<div class="span6">';
												content += '<div class="pull-left" id="switch_app">';
												content += '<label>Size</label>';
												content += '<select id="pageId_left" onChange="fetchSize_left(),getPageData_left();" name="deassociationReasonListName" style="width:100%;">';
												content += '<option value="">Select Size</option>';
												content += '<option value="10">10</option>';
												content += '<option value="20">20</option>';
												content += '<option value="50">50</option>';
												content += '<option value="100">100</option>';
												content += '<option value="200">200</option>';
												content += '<option value="500">500</option>';
												// start code for bug id no #320
												// , added by abhimanyu
												content += '<option value="1000">1000</option>';
												content += '<option value="2000">2000</option>';
												// end code for bug id no #320 ,
												// added by abhimanyu
												content += '<option value="5000">5000</option>';
												// content += '<option
												// value="10000">10000</option>';
												content += '</select>';

												content += '</div>';
												content += '</div>';
												content += '<div class="span6">';
												content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
												content += '<label>Page Number</label>';
												/*content += '<select onChange="getPageData_left()" id="pageNum_left"  >';
												content += '<option value="">-select Page-</option>';
												content += '</select>';*/
												content += ' <input type="text" id="pageNum_left" style="width:20%;background-color:white;" onChange="getPageData_left()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_left"></span>';
												content += '</div>';
												content += '</div>';
												content += '</div>';
												// /////////////////////////////////////////////////////////////////

												content += '<thead>';
												content += '<tr>';
												content += '<th style="width:20px;"></th>';
												content += '<th>User LogonId</th>';
												content += '<th>First Name</th>';
												content += '<th>Last Name</th>';

												content += '</tr>';

												content += '<tr>';
												// content += '<th><input
												// type="button"
												// onClick="userSearch()"
												// /></th>';
												content += '<th style="padding-bottom: 15px;" width="7%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="userSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeAssociateManuallySearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
												content += '<th><input type="text" onkeydown="searchAssocaiteManuallyL(event)" id="userLogonId_ass_m" /></th>';
												content += '<th><input type="text" onkeydown="searchAssocaiteManuallyL(event)" id="firstName_ass_m" /></th>';
												content += '<th><input type="text" onkeydown="searchAssocaiteManuallyL(event)" id="lastName_ass_m" /></th>';

												content += '</tr>';
												content += '</thead>';
												content += '<tbody>';
												if (obj1 != null && obj1 != '') {
													jQuery
															.each(
																	obj1,
																	function(i,
																			v) {

																		content += "<tr><td><input type='radio' name='chkAssociateManually' class='assm_radio_user'   value='"
																				+ v.userLoginId
																				+ "' /></td><td>"
																				+ v.userLoginId
																				+ "</td><td>"
																				+ v.firstName
																				+ "</td><td>"
																				+ v.lastName
																				+ "</td></tr>";
																		// content
																		// +=
																		// "<tr><td><input
																		// type='checkbox'
																		// class='checkboxes'
																		// value='1'
																		// /></td><td>"+v.UserID
																		// +"</td><td>"+v.FirstName
																		// +"</td><td>"+v.Lastname
																		// +"</td></tr>";
																	});
												} else {
													content += "<tr><td style='text-align:center;' colspan='4'>No Record Found</td></tr>";
												}
												content += '</table>';
												content += '</div>';
											}
											// if(object.tokenList!="null"){
											if (it == 1) {
												content += '<div class="span6" id="rdiv">';
												content += '<div class="tab-content_in"><table id="sample_9"  class="table table-striped table-bordered">';

												// //////////////////////////////////////////////////////////////////
												content += '<div class="row-fluid new_filter">';
												content += '<div class="span6">';
												content += '<div class="pull-left" id="switch_app">';
												content += '<label>Size</label>';
												content += '<select id="pageId_right" onChange="fetchSize_right(),getPageData_right();" name="deassociationReasonListName" style="width:100%;">';
												content += '<option value="">Select Size</option>';
												content += '<option value="10">10</option>';
												content += '<option value="20">20</option>';
												content += '<option value="50">50</option>';
												content += '<option value="100">100</option>';
												content += '<option value="200">200</option>';
												content += '<option value="500">500</option>';
												// start code for bug id no #320
												// , added by abhimanyu
												content += '<option value="1000">1000</option>';
												content += '<option value="2000">2000</option>';
												// end code for bug id no #320 ,
												// added by abhimanyu
												content += '<option value="5000">5000</option>';
												// content += '<option
												// value="10000">10000</option>';
												content += '</select>';

												content += '</div>';
												content += '</div>';
												content += '<div class="span6">';
												content += '<div class="pull-right" id="switch_app"  style="margin-right:-100px;">';
												content += '<label>Page Number</label>';
												/*content += '<select onChange="getPageData_right()" id="pageNum_right"  >';
												content += '<option value="">-select Page-</option>';
												content += '</select>';*/
												content += ' <input type="text" id="pageNum_right" style="width:20%;background-color:white;" onChange="getPageData_right()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_right"></span>';
												content += '</div>';
												content += '</div>';
												content += '</div>';
												// /////////////////////////////////////////////////////////////////

												content += '<thead>';
												content += '<tr>';
												content += '<th style="width:20px;"></th>';
												content += '<th>Token Serial</th>';
												content += '<th>Days Left</th>';
												content += '</tr>';

												content += '<tr>';
												// content += '<th><input
												// type="button"
												// onClick="tokenSearch()"
												// /></th>';
												content += '<th style="padding-bottom: 15px;" width="7%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="tokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeAssociateManuallySearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
												content += '<th><input type="text" onkeydown="searchAssocaiteManuallyR(event)" id="token" /></th>';
												content += '<th>Days Left</th>';
												content += '</tr>';
												content += '</thead>';
												content += '<tbody>';
												if (obj2 != null && obj2 != '') {
													jQuery
															.each(
																	obj2,
																	function(i,
																			v) {
																		v.timeRemaining = 'N/A';
																		content += "<tr><td><input type='radio' name='assm_token' class='assm_radio_token'  value='"
																				+ v.id
																				+ "' /></td><td>"
																				+ v.tokenSerial
																				+ "</td><td>"
																				+ v.timeRemaining
																				+ "</td></tr>";
																		// content
																		// +=
																		// "<tr><td><input
																		// type='checkbox'
																		// class='checkboxes'
																		// value='1'
																		// /></td><td>"+v.TokenSireal
																		// +"</td><td>"+v.DaysLeft
																		// +"</td></tr>";
																	});
												} else {
													content += "<tr><td style='text-align:center;' colspan='3'>No Record Found</td></tr>";
												}
												content += '</table>';
												content += '</div></div>';
												// }
											}
											it++;
										});
						content += '</div>';
						content += '<div class="row">';
						content += '<div class="span6">';
						content += '<div class="btn_selt" id="switch_app">';
						content += '<select name="deassoc_select_reason" id="lStatusId" >';
						content += '<option value="offline">Offline</option>';
						content += '<option value="online">Online</option>';
						content += '</select>';
						content += '</div>';

						content += '</div>';
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
						content += '<div class="span4">';
						content += '<div class="form-actions2">';

						content += '<button class="btn btn-primary" type="button" onclick="associateManually()">Submit</button>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						$('#block_active_associate_deassociate_data').html(
								content);
						$("#oneDayFlag").val("0");
						/*
						 * $('#sample_3').dataTable() .columnFilter({
						 * sPlaceHolder: "head:after", aoColumns: [ null, {
						 * type: "text" }, { type: "text" },
						 * 
						 *  { type: "text" } ] }); $('#sample_9').dataTable()
						 * .columnFilter({ sPlaceHolder: "head:after",
						 * aoColumns: [ null, { type: "text" }, { type: "text" } ]
						 * });
						 */
						
						if(pageCall==false){
							var maxPageCall = count1 / 10;
							var rem = count1 % 10;
							if (rem > 0) {
								maxPageCall = maxPageCall + 1;
							}
							$('#pageN_left').html(parseInt(maxPageCall));
							if(count1 == 0) {
								$('#pageNum_left').val(0);
							} else {
								$('#pageNum_left').val(1);
							}
						}
						
						if(pageCall2==false){
							var maxPageCall2 = count2 / 10;
							var rem = count2 % 10;
							if (rem > 0) {
								maxPageCall2 = maxPageCall2 + 1;
							}
							$('#pageN_right').html(parseInt(maxPageCall2));
							if(count2 == 0){
								$('#pageNum_right').val(0);
							} else{
								$('#pageNum_right').val(1);
							}
							
						}
					
					}

				});
	} catch (e) {
		alert(e);
	}
}

function associateManually() {
	try {
		var authValue = $('.ass_deass_radio:checked').val();
		var tvalue = $('.assm_radio_token:checked').val();
		var uvalue = $('.assm_radio_user:checked').val();

		var strutsToken = $('[name=csrfPreventionSalt]').val();// added by
																// puneet vats

		if (uvalue == undefined || uvalue == null) {
			alert("Please select User.");
			return;
		}
		if (tvalue == undefined || tvalue == null) {
			alert("Please select Token.");
			return;
		}

		var status = document.getElementById('lStatusId').value;
		if (authValue == "3") {
			var oneDayFlag = document.getElementById('oneDayFlag').value; // bug
																			// id
																			// #524
																			// ,
																			// added
																			// by
																			// abhimanyu
			if (oneDayFlag == 'select') {
				alert("please select type normal / onetime token.");
				$("#oneDayFlag").focus();
				return true;
			}
		} else
			oneDayFlag = 0;

		dataString = 'associateUserName=' + uvalue + "&associateTokenId="
				+ tvalue + "&licenseStatus=" + status + "&authType="
				+ authValue + "&oneDayFlag=" + oneDayFlag
				+ '&csrfPreventionSalt=' + strutsToken;
		// alert("dataString: "+dataString);

		$.ajax({
			type : "POST",
			url : "admin_associateManually.action",
			data : dataString,
			dataType : "text",
			success : function(response) {
				resVal = response;
				//	
				// alert(response);
				if ($.trim(response) == "sessionout") {
					alert(response);
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				}

				else if ($.trim(response) == "success") {
					alert(response);
					showAssociateManually(false, false);
					showManageUser(false);
				} else {
					alert(response);
					showAssociateManually(false, false);
					showManageUser(false);
				}
			}
		});
	} catch (e) {
		alert(e);
	}

}

function tokenSearch() {
	if (validateTokenSearch()) {
		searchAssociateManuallyRightWithpageSize = true;
		refresh_rdiv(true,false);
	} else {
		validateTokenSearch();
	}

}

function userSearch() {
	if (validateUserSearch()) {
		searchAssociateManuallyLeftWithpageSize = true;
		refresh_ldiv(true,false);
	} else {
		validateUserSearch();
	}

}

//start code for bug id #338 , added by Abhimanyu
function resetglobalAssociateManuallyVariable() {
	globalAssociateManuallyLeftPreviouspageSize = "";
	globalAssociateManuallyLeftPreviousPageNum = "";
	globalAssociateManuallyRightPreviouspageSize = "";
	globalAssociateManuallyRightPreviousPageNum = "";
}
//end code for bug id #338 , added by Abhimanyu

function searchAssocaiteManuallyL(e) {
	if (e.keyCode === 13)
		userSearch();
}

function searchAssocaiteManuallyR(e) {
	if (e.keyCode === 13)
		tokenSearch();
}

function validateUserSearch() {

	var users = $('#userLogonId_ass_m').val();

	if (users != undefined && users != "") {
		users = users.replace(/\s/g, " ");
		var user = users.split(',');
		var len = user.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#userLogonId_ass_m').val("");
			return false;
		}
	}

	var firstName = $('#firstName_ass_m').val();

	if (firstName != undefined && firstName != "") {
		firstName = firstName.replace(/\s/g, " ");
		var fName = firstName.split(',');
		var len = fName.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#firstName_ass_m').val("");
			return false;
		}
	}
	var lastName = $('#lastName_ass_m').val();
	if (lastName != undefined && lastName != "") {
		lastName = lastName.replace(/\s/g, " ");
		var lName = lastName.split(',');
		var len = lName.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#lastName_ass_m').val("");
			return false;
		}
	}

	return true;
}

function validateTokenSearch() {

	var token = $('#token').val();
	if (token != undefined && token != "") {
		token = token.replace(/\s/g, " ");
		var seed = token.split(',');
		var len = seed.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#token').val("");
			return false;
		}
	}
	return true;
}
