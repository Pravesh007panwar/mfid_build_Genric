var globalAuthPreviouspageSize = "";
var globalAuthPreviousPageNum = "";
var userLogonIdAuth="";

function removeSearch(){
	$('#userLogonId_auth').val("");
	userLogonIdAuth="";
}

var count;
var searchAuthWithpageSize = false;

function getPageData_changeauth() {

	var size = document.getElementById('pageId_changeauth').value;
	if ($.trim(size) != '') {
	var totalPages = $('#pageN_changeauth').text();
	var pageNumber = document.getElementById('pageNum_changeauth').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_changeauth').val(1);}
	if ($.trim(pageNumber) != ""
			&& parseInt(pageNumber) <= parseInt(totalPages))
		showChangeAuth(true, false);
	else
		alert('Page should be less than or equal to page number.');
	}

}

function fetchSize_changeauth() {

	var size = document.getElementById('pageId_changeauth').value;

	if ($.trim(size) != '') {
		var maxSize = count;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (count == 0) {
			$('#pageNum_changeauth').val(0);
		} else {
			$('#pageNum_changeauth').attr("disabled", false);
			$('#pageNum_changeauth').val(1);
		}
		$('#pageN_changeauth').html(parseInt(maxPgaeNumber));

	} 
		
}

function submitAuth(e) {
	
//	$("#loading").show();
	//$('body').css("opacity", "0.8");

	var counter = 0;
	var chks = document.getElementsByName('chkAuth');
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet
															// vats
	// alert(chks);
	var hasChecked = false;
	for (var i = 0; i < chks.length; i++) {
		if (chks[i].checked) {
			hasChecked = true;
			break;
		}
	}
	if (hasChecked == false) {
		alert("Please select user.");
		return false;
	}

	else {

		var chk = document.getElementsByName('chkAuth');
		var id = "";
		
		if (chk.length != null) {
		
			{

				$.confirm({
							text : "License will be deassociated for selected users if license(s) are assigned.Do you want to continue ?",
							confirm : function(button) {
								afterConfirm(function() {
									submitChangeAuthNew(counter, chks, chk,
											strutsToken, id);
								}, null);
								return;
							},
							cancel : function(button) {
								afterCancel();
								return;
							}
						});

				// var answer = confirm ("License will be deassociated for
				// selected users if license(s) are assigned.Do you want to
				// continue ?")

			}
			/*
			 * else{ return false; }
			 */

		}
	}

}

function afterConfirm(your_function, callback) {
	$("#loading").show();
	$('body').css("opacity", "0.8");
	setTimeout(function() {
		your_function();
		if (callback) {
			callback();
		}
	}, 0);
}

function afterCancel() {
	$("#loading").hide();
	$('body').css("opacity", "1");
}

function submitChangeAuthNew(counter, chks, chk, strutsToken, id) {

	// $("#loading").css("display","block");
	$("#loading").show();
	$('body').css("opacity", "0.8");
	for (var i = 0; i < chk.length; i++) {

		if (chk[i].checked) {
			counter = counter + 1;

			var authTemp = chk[i].value;
			// alert("authTemp "+authTemp);
			var arr = authTemp.split(",");
			// alert("Arr "+arr);
			var radios = document.getElementsByName(arr[0]);
			// alert("Radios "+radios);
			for (var j = 0; j < radios.length; j++) {
				if (radios[j].checked) {
					rValue = radios[j].value;

				}
			}

			id = id + authTemp + "," + rValue + ",";
		}
	}
	id = id.substring(0, id.length - 1);

	dataString = 'userIdAuth=' + id + '&csrfPreventionSalt=' + strutsToken;

	$.ajax({
		type : "POST",
		url : "admin_changeAuth.action",
		data : dataString,
		dataType : "text",
		success : function(response) {
			// e.preventDefault();
			resVal = response;
			// alert("response=== "+response);
			if ($.trim(response) == "sessionout") {
				var testVal = document.getElementById('loginPage').value;
				window.location.replace(testVal);
			} else if ($.trim(response) == "success") {
				alert(response);
				searchAuthWithpageSize = true;
				showChangeAuth(false, false);
				showManageUser(false);
			} else {
				alert(response);
				showChangeAuth(false, false);
			}

		}
	});

}

function showChangeAuth(pageCall, isSearch) {

	var set = jQuery('.group-checkable').attr("data-set");
	var checked = jQuery('.group-checkable').is(":checked");
	$(set).each(function() {
		$('.group-checkable').prop('checked', false);
		$(this).prop('checked', false);
	});

	if ($("#pageId_changeauth").length) {
		globalAuthPreviouspageSize = $("#pageId_changeauth").val();
		globalAuthPreviousPageNum = $("#pageNum_changeauth").val();
	}

	var myUrl = "admin_showChangeAuth.action";
	var dataString = "";

	if (pageCall) {
		var size = document.getElementById('pageId_changeauth').value;
		var pageNumber = document.getElementById('pageNum_changeauth').value;

		// myUrl+="?fetchSize="+size+"&pageNumber="+pageNumber+"&userLogonId=amit";
		myUrl += "?fetchSize=" + size + "&pageNumber=" + pageNumber;
		// dataString="?fetchSize="+size+"&pageNumber="+pageNumber;
	}
	if(userLogonIdAuth!=""){
		isSearch=true;
	}
	if (isSearch) {
		 userLogonIdAuth = document.getElementById('userLogonId_auth').value
		 	//userLogonIdAuth = userLogonIdAuth.replace(/\s/g, "");
		if (pageCall) {
			// myUrl+="&userLogonId="+userLogonId;
			dataString += "&userLogonId=" + userLogonIdAuth;
		} else
			// myUrl+="?userLogonId="+userLogonId;
			dataString += "&userLogonId=" + userLogonIdAuth;
	}

	// start code for Bug #122 , Added by Abhimanyu
	if (searchAuthWithpageSize) {
		if (myUrl.indexOf('fetchSize') == -1) {
			if ($.trim(globalAuthPreviouspageSize) != '') {
				if (myUrl.indexOf('?') == -1)
					myUrl += "?fetchSize=" + globalAuthPreviouspageSize + "&pageNumber=" +globalAuthPreviousPageNum;
				else
					myUrl += "&fetchSize=" + globalAuthPreviouspageSize + "&pageNumber=" +globalAuthPreviousPageNum;
			}
		}
	}
	
	
			$.ajax({
				type : "POST",
				dataType : "text",
				url : myUrl,
				data : dataString,
				async : true,
				success : function(data) {
					if ($.trim(data) == "sessionout") {
						alert(data);
						testVal = document.getElementById('loginPage').value
						window.location.replace(testVal);
					}
					var obj = JSON.parse(data);

					var obj1 = JSON.parse(obj.count);
					var obj2 = JSON.parse(obj.Messages);
					// if(searchAuthWithpageSize)
					// obj1=count;

					count = obj1;

					var content = '<div class="row-fluid new_filter">';
					content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_changeauth" onChange="fetchSize_changeauth(),getPageData_changeauth();" name="deassociationReasonListName" style="width:100%;">';
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
					// content += '<option value="10000">10000</option>';

					content += '</select>';

					content += '</div>';
					content += '</div>';
					content += '<div class="span6">';
					content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
					content += '<label>Page Number</label>';
					/*
					 * content += '<select onChange="getPageData_changeauth()"
					 * id="pageNum_changeauth" >'; content += '<option
					 * value="">-select Page-</option>'; content += '</select>';
					 */
					content += ' <input type="text" id="pageNum_changeauth" style="width:20%;background-color:white;" onChange="getPageData_changeauth();"  onkeypress="return isNumber(event)" disabled /> of <span id="pageN_changeauth"></span>   ';
					content += '</div>';
					content += '</div>';
					content += '</div>';

					// ////////////////////////////////////////////////////////////////////////
					content += '<span class="close"><a href="#"><i class="icon-remove-sign"></i></a></span>';
					content += '<h4>Change Authentication</h4>';
					content += '<table class="table table-striped table-bordered" id="sample_2">';
					content += '<thead>';
					content += '<tr>';
					content += '<th style="width:20px;" ><input type="checkbox" class="group-checkable" id="idcheckboxSelectChangeAuth" data-set="#sample_2 .checkboxes" /></th>';
					content += '<th>User LogonID</th>';
					content += '<th>Hard Token</th>';
					content += '<th>SMS Token</th>';
					content += '<th>No Token</th>';
					content += '<th>Mobile Token</th>';
					content += '<th>Bio Token</th>';
					content += '<th>Push Token</th>';
					// content += '<th>IP Token</th>';
					// content += '<th>First Name</th>';
					// content += '<th>Last name</th>';
					content += '</tr>';

					content += '<tr>';

					// content += '<th><input type="button"
					// onClick="changeAuthSearch()" /></th>';
					content += '<th style="padding-bottom: 15px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="changeAuthSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					content += '<th><input type="text"  onkeydown="searchChangeAuth(event)" id="userLogonId_auth" /></th>';
					/*
					 * content += '<th><textarea
					 * onkeydown="searchChangeAuth(event)" id="userLogonId_auth"
					 * rows="1" cols="1" style="resize: none;overflow:hidden;"></textarea></th>';
					 */

					content += '<th><input type="radio" name="auth_group" class="radio-group-checkable" data-set="#sample_2 .hardTokenboxes" /></th>';
					content += '<th><input type="radio" name="auth_group" class="radio-group-checkable " data-set="#sample_2 .smsTokenboxes" /></th>';
					content += '<th><input type="radio" name="auth_group" class="radio-group-checkable" data-set="#sample_2 .noTokenboxes" /></th>';
					content += '<th><input type="radio" name="auth_group" class="radio-group-checkable" data-set="#sample_2 .mobileTokenboxes" /></th>';
					content += '<th><input type="radio" name="auth_group" class="radio-group-checkable" data-set="#sample_2 .bioTokenboxes" /></th>';
					content += '<th><input type="radio" name="auth_group" class="radio-group-checkable" data-set="#sample_2 .pushTokenboxes" /></th>';
					// content += '<th><input type="radio" name="auth_group"
					// class="radio-group-checkable" data-set="#sample_2
					// .ipTokenboxes" /></th>';
					// content += '<th>First Name</th>';
					// content += '<th>Last name</th>';
					content += '</tr>';
					content += '</thead>';
					try {

						var chkArr = [];
						if (obj2 != null && obj2 != '') {
							jQuery
									.each(
											obj2,
											function(i, v) {
												var temp = v.userId + ","
														+ v.authenticationType;
												var authVal = v.authenticationType;
												// alert("authVal==="+authVal)
												// 0-5
												chkArr[v.userId] = v.userId;
												content += "<tr>";
												content += "<td><input type='checkbox' class='checkboxes' value='"
														+ temp
														+ "' name='chkAuth' /></td>";
												content += "<td>"
														+ v.userLoginId
														+ "</td>";

												if (authVal == "1") {
													content += "<td><input checked type='radio' title='"
															+ v.userLoginId
															+ "- HardToken' class='hardTokenboxes' onclick='selectCheckBox(this,1)' value='1' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- SMSToken' class='smsTokenboxes' onclick='selectCheckBox(this,2)' value='2' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- NoToken' class='noTokenboxes' onclick='selectCheckBox(this,5)' value='5' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- MobileToken' class='mobileTokenboxes' onclick='selectCheckBox(this,3)' value='3' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- BioToken' class='bioTokenboxes' onclick='selectCheckBox(this,6)' value='6' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- PushToken' class='pushTokenboxes' onclick='selectCheckBox(this,7)' value='7' name='"
															+ v.userId
															+ "' /></td>";
													// content += "<td><input
													// type='radio'
													// title='"+v.userLoginId+"-
													// IPToken'
													// class='ipTokenboxes'
													// onclick='selectCheckBox(this,08)'
													// value='8'
													// name='"+v.userId+"'
													// /></td>";
												}
												if (authVal == "2") {
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- HardToken' class='hardTokenboxes'  onclick='selectCheckBox(this,1)' value='1' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input checked type='radio' title='"
															+ v.userLoginId
															+ "- SMSToken' class='smsTokenboxes' onclick='selectCheckBox(this,2)' value='2' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- NoToken' class='noTokenboxes' onclick='selectCheckBox(this,5)' value='5' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- MobileToken' class='mobileTokenboxes' onclick='selectCheckBox(this,3)' value='3' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- BioToken' class='bioTokenboxes' onclick='selectCheckBox(this,6)' value='6' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- PushToken' class='pushTokenboxes' onclick='selectCheckBox(this,7)' value='7' name='"
															+ v.userId
															+ "' /></td>";
													// content += "<td><input
													// type='radio'
													// title='"+v.userLoginId+"-
													// IPToken'
													// class='ipTokenboxes'
													// onclick='selectCheckBox(this,08)'
													// value='8'
													// name='"+v.userId+"'
													// /></td>";
												}
												if (authVal == "5") {
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- HardToken' class='hardTokenboxes' class='hardTokenboxes'  onclick='selectCheckBox(this,1)' value='1' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- SMSToken' class='smsTokenboxes' onclick='selectCheckBox(this,2)' value='2' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input checked type='radio' title='"
															+ v.userLoginId
															+ "- NoToken' class='noTokenboxes' onclick='selectCheckBox(this,5)' value='5' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- MobileToken' class='mobileTokenboxes' onclick='selectCheckBox(this,3)' value='3' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- BioToken' class='bioTokenboxes' onclick='selectCheckBox(this,6)' value='6' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- PushToken' class='pushTokenboxes' onclick='selectCheckBox(this,7)' value='7' name='"
															+ v.userId
															+ "' /></td>";
													// content += "<td><input
													// type='radio'
													// title='"+v.userLoginId+"-
													// IPToken'
													// class='ipTokenboxes'
													// onclick='selectCheckBox(this,08)'
													// value='8'
													// name='"+v.userId+"'
													// /></td>";
												}
												if (authVal == "3") {
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- HardToken' class='hardTokenboxes'  onclick='selectCheckBox(this,1)' value='1' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- SMSToken' class='smsTokenboxes' onclick='selectCheckBox(this,2)' value='2' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- NoToken' class='noTokenboxes' onclick='selectCheckBox(this,5)' value='5' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input checked type='radio' title='"
															+ v.userLoginId
															+ "- MobileToken' class='mobileTokenboxes' onclick='selectCheckBox(this,3)' value='3' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- BioToken' class='bioTokenboxes' onclick='selectCheckBox(this,6)' value='6' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- PushToken' class='pushTokenboxes' onclick='selectCheckBox(this,7)' value='7' name='"
															+ v.userId
															+ "' /></td>";
													// content += "<td><input
													// type='radio'
													// title='"+v.userLoginId+"-
													// IPToken'
													// class='ipTokenboxes'
													// onclick='selectCheckBox(this,08)'
													// value='8'
													// name='"+v.userId+"'
													// /></td>";
												}
												if (authVal == "6") {
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- HardToken'  class='hardTokenboxes' onclick='selectCheckBox(this,1)' value='1' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- SMSToken' class='smsTokenboxes' onclick='selectCheckBox(this,2)' value='2' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- NoToken' class='noTokenboxes' onclick='selectCheckBox(this,5)' value='5' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- MobileToken' class='mobileTokenboxes' onclick='selectCheckBox(this,3)' value='3' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input checked type='radio' title='"
															+ v.userLoginId
															+ "- BioToken' class='bioTokenboxes' onclick='selectCheckBox(this,6)' value='6' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- PushToken' class='pushTokenboxes' onclick='selectCheckBox(this,7)' value='7' name='"
															+ v.userId
															+ "' /></td>";
													// content += "<td><input
													// type='radio'
													// title='"+v.userLoginId+"-
													// IPToken'
													// class='ipTokenboxes'
													// onclick='selectCheckBox(this,08)'
													// value='8'
													// name='"+v.userId+"'
													// /></td>";
												}
												if (authVal == "7") {
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- HardToken'  class='hardTokenboxes' onclick='selectCheckBox(this,1)' value='1' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- SMSToken' class='smsTokenboxes' onclick='selectCheckBox(this,2)' value='2' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- NoToken' class='noTokenboxes' onclick='selectCheckBox(this,5)' value='5' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- MobileToken' class='mobileTokenboxes' onclick='selectCheckBox(this,3)' value='3' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input  type='radio' title='"
															+ v.userLoginId
															+ "- BioToken' class='bioTokenboxes' onclick='selectCheckBox(this,6)' value='6' name='"
															+ v.userId
															+ "' /></td>";
													content += "<td><input checked  type='radio' title='"
															+ v.userLoginId
															+ "- PushToken' class='pushTokenboxes' onclick='selectCheckBox(this,7)' value='7' name='"
															+ v.userId
															+ "' /></td>";
													// content += "<td><input
													// type='radio'
													// title='"+v.userLoginId+"-
													// IPToken'
													// class='ipTokenboxes'
													// onclick='selectCheckBox(this,08)'
													// value='8'
													// name='"+v.userId+"'
													// /></td>";
												}
												/*
												 * if(authVal=="08"){ content += "<td><input
												 * type='radio'
												 * title='"+v.userLoginId+"-
												 * HardToken'
												 * class='hardTokenboxes'
												 * onclick='selectCheckBox(this,01)'
												 * value='1' name='"+v.userId+"' /></td>";
												 * content += "<td><input
												 * type='radio'
												 * title='"+v.userLoginId+"-
												 * SMSToken'
												 * class='smsTokenboxes'
												 * onclick='selectCheckBox(this,02)'
												 * value='2' name='"+v.userId+"' /></td>";
												 * content += "<td><input
												 * type='radio'
												 * title='"+v.userLoginId+"-
												 * NoToken' class='noTokenboxes'
												 * onclick='selectCheckBox(this,05)'
												 * value='5' name='"+v.userId+"' /></td>";
												 * content += "<td><input
												 * type='radio'
												 * title='"+v.userLoginId+"-
												 * MobileToken'
												 * class='mobileTokenboxes'
												 * onclick='selectCheckBox(this,03)'
												 * value='3' name='"+v.userId+"' /></td>";
												 * content += "<td><input
												 * type='radio'
												 * title='"+v.userLoginId+"-
												 * SoftToken'
												 * class='softTokenboxes'
												 * onclick='selectCheckBox(this,06)'
												 * value='6' name='"+v.userId+"' /></td>";
												 * content += "<td><input
												 * type='radio'
												 * title='"+v.userLoginId+"-
												 * PushToken'
												 * class='pushTokenboxes'
												 * onclick='selectCheckBox(this,07)'
												 * value='7' name='"+v.userId+"' /></td>";
												 * content += "<td><input
												 * checked type='radio'
												 * title='"+v.userLoginId+"-
												 * IPToken' class='ipTokenboxes'
												 * onclick='selectCheckBox(this,08)'
												 * value='8' name='"+v.userId+"' /></td>"; }
												 */
												content += "</tr>";
											});
						} else {

							content += "<tr><td colspan='8' style='text-align:center;'>No Record Found</td></tr>";
						}

					} catch (e) {
						// alert(e);
					}
					content += "</table><div class='form-actions form-actions2'>";
					content += '<div>';
					content += "<button style='float:left;' class='btn btn-primary' type='button' onclick='resetAuth()'>Reset</button></div>";
					content += "<button class='btn btn-primary' type='button' id='idSubmitButtonChangeAuth' onclick='submitAuth(this)'>Submit</button></div>";
					content += '</div>';

					$('#block_active_authentication_data').html(content);
					$("#sample_2").css("width", "100%");
					/*
					 * $('#sample_2').dataTable() .columnFilter({ sPlaceHolder:
					 * "head:after", aoColumns: [ null, // { type: "text" },
					 * null, null, null, null, null, null // { type: "text" }, // {
					 * type: "text" } ] });
					 */
					// $('#sample_2 tr').each(function(i,v){
					/*
					 * jQuery.each(obj2, function(i, v) { // jQuery.each(obj2,
					 * function(j, u) { // alert("i----- "+i) //if(i>1){
					 * 
					 * var authVal=v.authenticationType; try{ //var
					 * authVal=obj2.Messages[i].authenticationType; } catch (e) {
					 * alert(e); // TODO: handle exception } //var
					 * authVal=v.authenticationType; //
					 * alert("identifier:::::"+authVal);
					 * //alert("this:::::"+this); var
					 * tName=document.getElementById('sample_2'); //
					 * alert("tName.length----"+tName.rows.length) var
					 * trs=tName.getElementsByTagName("tr")[i+2]; //
					 * alert("trs:::::"+trs); var
					 * name=$(trs).find('input[type="radio"]').attr('name');
					 * //var
					 * name=$(this).find('input[type="radio"]').attr('name');
					 * 
					 * 
					 * //alert("name== "+name); //alert("chkArr[name]==
					 * "+chkArr[name]); if(authVal=="01"){ alert(+name+"-----
					 * "+i) $('[name='+name+'][value=1]').prop('checked',true); }
					 * if(authVal=="02"){ alert(+name+"----- "+i)
					 * $('[name='+name+'][value=2]').prop('checked',true); }
					 * if(authVal=="03"){ alert(+name+"----- "+i)
					 * $('[name='+name+'][value=3]').prop('checked',true); }
					 * if(authVal=="05"){ alert(+name+"----- "+i)
					 * $('[name='+name+'][value=5]').prop('checked',true); }
					 * if(authVal=="06"){ alert(+name+"----- "+i)
					 * $('[name='+name+'][value=6]').prop('checked',true); }
					 * if(authVal=="07"){ alert(+name+"----- "+i)
					 * $('[name='+name+'][value=7]').prop('checked',true); }
					 * 
					 * //} });
					 */
					// start code for Bug #122 , Added by Abhimanyu
					
					$('#userLogonId_auth').val(userLogonIdAuth);
					
					if ($.trim(globalAuthPreviouspageSize) != '') {
						$("#pageId_changeauth").val(globalAuthPreviouspageSize);
						fetchSize_changeauth();
						if (!searchAuthWithpageSize)
							$("#pageNum_changeauth").val(
									globalAuthPreviousPageNum);
						else {
							if(globalAuthPreviousPageNum==0 && parseInt($('#pageN_changeauth').text()) > 0)
								globalAuthPreviousPageNum="1";
							$("#pageNum_changeauth").val(
									globalAuthPreviousPageNum);
						}
					}
					
					// end code for Bug #122 	
					if (pageCall == false) {
						var size = 10;
						if (globalAuthPreviouspageSize != '') {
							size = parseInt(globalAuthPreviouspageSize);
						}
										
						var maxPgaeNumber = count / size;
						var rem = count % size;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						$('#pageN_changeauth').html(parseInt(maxPgaeNumber));
						 if (count == 0) {
								$('#pageNum_changeauth').val(0);
						 }
						 else {
								$('#pageNum_changeauth').val(1);
						  }
						 if(globalAuthPreviousPageNum!="" && parseInt($('#pageN_changeauth').text()) > 0) {
							$('#pageNum_changeauth').val(globalAuthPreviousPageNum);
						 }
						
					}
					
					if(userLogonIdAuth== ""){
						searchAuthWithpageSize = false;
					}

				}

			});

}

function selectCheckBox(e, type) {

	var checked = jQuery('.radio-group-checkable').is(":checked");
	if (checked) {

	} else {

		var elTableCells = e.parentNode.parentNode.getElementsByTagName("td");
		try {
			var temp = elTableCells[0].firstChild.value;
			//alert("temppp==="+temp);
			var parts = temp.split(",");
			var t = parts[1];

			if (t == type) {

				elTableCells[0].firstChild.checked = false;
			} else {

				elTableCells[0].firstChild.checked = true;
			}

		} catch (e) {
			alert(e);
		}
	}
}

function changeAuthSearch() {
	if (validateUser()) {
		searchAuthWithpageSize = true;
		showChangeAuth(false, true);
	} else {
		validateUser();
	}

}

function resetAuth() {
	showChangeAuth(false, false);

}

//start code for bug id #338 , added by Abhimanyu
function resetglobalChangeAuthVariable() {
	globalAuthPreviouspageSize = "";
	globalAuthPreviousPageNum = "";
}
//end code for bug id #338 , added by Abhimanyu

function searchChangeAuth(e) {
	if (e.keyCode === 13)
		changeAuthSearch();

}
function validateUser() {

	var users = $('#userLogonId_auth').val();

	if (users != undefined && users != "") {
		users = users.replace(/\s/g, " ");
		var user = users.split(',');
		var len = user.length;
		if (len > 5000) {
			alert('Maximum limit for search is 5000. Please reduce limit & try again.');
			$('#userLogonId_auth').val("");
			return false;
		}
	}

	return true;
}