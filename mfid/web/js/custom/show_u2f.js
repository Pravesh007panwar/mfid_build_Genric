var obj1 = '';
function getU2FUserDetails() {
	
	try {
		var myUrl = "admin_getU2FDetailList.action";
		
		$('#block_u2f_div_registered_user').html("Loading...");
			$.ajax({
					type : "POST",
					url : myUrl,
					dataType : "text",
					success : function(data) {

						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						} else {
							if(data!='' && data != undefined && data != null){
								var object = JSON.parse(data);
									obj1 = JSON.parse(object.u2FVOList);
							}
						
							try {
							var content = '';
								content += '<table class="table table-striped table-bordered" id="sample_1_1">';
								content += '<thead>';
								content += '<tr>';
								content += '<th>Device Type</th>';
								content += '<th>Name</th>';
								content += '<th>U2F ID</th>';
								content += '<th style="width:2%;">Delete</th>';
								content += '</tr>';
								content += '</thead>';

								if (obj1 != null && obj1 != '' && obj1 != undefined) {
									var counterSr = 0;
									jQuery.each(obj1,
													function(i, v) {
														content += "<tr>"
															    + "<td>Security Key</td>"
															    + "<td>Security Key (U2F)</td>" 
																+ "<td>" +v.u2fId+ "</td>"														
																+ "<td style='text-align:center;'><a href='#' class='icon-trash' onclick='deleteU2fDetails(\""+v.u2fId+"\");'></a></td>"
																+ "</tr>";
													});
								} else {
									content += "<tr><td style='text-align: center;' colspan='4' id='noRecordData'>No Record Found</td></tr>";
								}

								content += "</table>";
								$('#block_u2f_div_registered_user').html(content);
						
							} catch (e) {

							}

						}

					}

				});

	} catch (e) {
	}
}
function registerU2f() {
	var text = $('#noRecordData').text();
	if (obj1 != null && obj1 != '' || text == "") {
		alert("Please delete existing security key if you wish to add another.");
	} else {
		secureU2fUser();
		$('#u2f_enroll_failed').hide();
		
	}
	return;
}

/*$('#u2fModal').on('show.bs.modal', function (e) {
	$('#u2f_enroll_pending').show();
    
});*/

function callSecsecureU2fUser(){
	$('#enrol_para').replaceWith('Enroll a Security Key (U2F) by inserting and touching it.');
	$('#u2f_enroll_pending').show();
	$('#u2f_enroll_failed').hide();
	secureU2fUser();
}

function secureU2fUser() {
	$.ajax({
		type : "GET",
		url : "admin_secureU2fRegistration.action",
		dataType : "text",
		success : function(response) {
			if(response.trim()==limitU2fToken.trim()){
				alert(response);
			}else{
			$('#u2fModal').modal('show');
			registerSecureU2fUser(response);
			}
		},
		error : function(response) {
			alert(response);
		}
	});
}

function registerSecureU2fUser(u2fData) {

	var request = JSON.parse(u2fData);
		request = JSON.parse(request.u2fReqestData);

	setTimeout(function() {
		u2f.register(request.registerRequests, request.authenticateRequests,
				function(data) {
					var form = document.getElementById('secureForm');
					var reg = document.getElementById('tokenResponse');
					if (data.errorCode) {
						$('#enrol_para').replaceWith('<p id="enrol_para"><a href="#" onclick="callSecsecureU2fUser();">Try Again</a></p>');
						$('#u2f_enroll_failed').show();
						$('#u2f_enroll_pending').hide();
						//alert("U2F failed with error: " + data.errorCode);
						return;
					}
					reg.value = JSON.stringify(data);
					form.submit();
				});
	}, 1000);
}

function deleteU2fDetails(u2fId){
	
	var strutsToken = $('[name=csrfPreventionSalt]').val();
		
	var dataString="u2fId="+encodeURIComponent($.trim(u2fId))+"&csrfPreventionSalt="+strutsToken;
	
	try {
		$.confirm({
					text : "Warning! Do you want to continue?",
					confirm : function(button) {
							$.ajax({
									type : "POST",
									url : "admin_deleteU2fDetail.action",
									dataType : "text",
									data: dataString,
									success : function(response) {
										if ($.trim(response) == "sessionout") {
											alert("sessionout");
											testVal = document
													.getElementById('loginPage').value
											window.location.replace(testVal);
										} else if ($.trim(response) == "success") {
											getU2FUserDetails();
											alert(response);
										} 
									},
									error : function(response){
										alert(response);
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
}


/* ====================================================Below code is for Admin panel =========================================================================================================================================================*/

function searchUserDetails()
{
	
	var userAppId = $.trim($("#userAppId").val());
	var userLoginID = $.trim($("#userLoginID").val());
	var firstNameID = $.trim($("#firstNameID").val());
	var lastNameID = $.trim($("#lastNameID").val());
	var emailID = $.trim($("#emailID").val());
	var mobileNumberID = $.trim($("#mobileNumberID").val());
	var chechNoRecordFound=false;
 
if(userAppId == '-1' || userAppId == '')
{
alert('Please select application name.');
$("#userAppId").focus();
return true;
}
else if(userLoginID == '' && firstNameID == '' && lastNameID == '' && emailID == '' && mobileNumberID == '')
{
alert('please enter at least one user column for Search. ');
$("#userLoginID").focus();
$('#block_show_User_Search_Data').html('');
$('#block_u2f_div_registered_user').html('');

return true;
}
else
	{
	   try
	   {
		   
		   var myUrl="admin_getUserSearchDetails.action";

		   var dataString = "userLogonId="+encodeURIComponent(userLoginID)+"&appName="+encodeURIComponent(userAppId)+"&firstName="+encodeURIComponent(firstNameID)+"&lastName="+encodeURIComponent(lastNameID)+"&emailId="+encodeURIComponent(emailID)+"&mobileNumber="+encodeURIComponent(mobileNumberID);
		   
		   $('#user_resync_data').html("Loading...");
				$.ajax({
					type:"POST",
					url:myUrl,
					async:true,
					data: dataString,
					dataType:"text",
					success:function(data)
					{
						//  alert("data    "+data);
						
						 if($.trim(data)=="sessionout"){
								alert(data);
								testVal= document.getElementById('loginPage').value				
								window.location.replace(testVal);
							}
						 else {
							 var object = JSON.parse(data);
							 var obj1=JSON.parse(object.userDetailList);
							 
								try{
									var content = "";
									  content += '<table class="table table-striped table-bordered" id="sample_1_1">';
									  content += '<thead>';
										content += '<tr>';
									    content += '<th style="width: 20px;"></th>'; 	
									             content += '<th>User LogonId</th>'; 
									             content += '<th>First Name</th>'; 
												 content += '<th>Last Name</th>';
												 content += '<th>Email Id</th>';
												 content += '<th>Mobile Number</th>';
											     content += '</tr>';
											     content += '</thead>';
									  
									 if(obj1!=null && obj1!=''){
										 var counterSr=0;
									jQuery.each(obj1, function(i, v) {
										 content += "<tr><td style='width: 20px;' > <input type='radio' name='selectUserSearchId' class='shadow_radio' value='"+v.userLoginId+"' ></td><td>"+v.userLoginId+"</td><td>"+v.firstName+"</td><td>"+v.lastName+"</td><td>"+v.emailId+"</td><td>"+v.mobileNumber+"</td></tr>";
								 });
									}
									else  
										{ content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";	
										  chechNoRecordFound = true;
										}
								
										content += "</table>";
										content += '<div class="clearfix"></div>';
										 if(!chechNoRecordFound)
											 {
											 
											 content += '<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button type="button" class="btn btn-primary"  onclick="getU2FUserDetailsByUser()">Submit</button>';
											// content += '  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button style="display:none" type="button" class="btn btn-primary"  id="u2fButtonId" onclick="revalidateToken()">Register Security Key (U2F)</button> ';
											 }
									  $('#block_show_User_Search_Data').html(content);
									    $("#userLoginID").val('');
										 $("#firstNameID").val('');
										 $("#lastNameID").val('');
										 $("#emailID").val('');
									     $("#mobileNumberID").val('');
									     $('#block_u2f_div_registered_user').html('');
									    
								
								}
								catch(e){
									//alert(e);
								}
							 
							}
						    
					 
					}
				
				});
				
			}
			catch(e)
			{ }
	
	
	
	}
 
}



function getU2FUserDetailsByUser() {
	
	try {
		var myUrl = "admin_getU2FDetailByUser.action";
		
		var selectUserSearchId=$('input:radio[name=selectUserSearchId]:checked').val();
		
		var dataString = "userLogonId="+encodeURIComponent(selectUserSearchId);
		
		$('#block_u2f_div_registered_user').html("Loading...");
			$.ajax({
					type : "POST",
					url : myUrl,
					dataType : "text",
					data: dataString,
					success : function(data) {

						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						} else {
							if(data!='' && data != undefined && data != null){
								var object = JSON.parse(data);
									obj1 = JSON.parse(object.u2FVOList);
							}
						
							try {
								
								
								
								
								var content = '<br/><div class="container" style="width:100% !important;" >';
								content += '<div class="widget widget-tabs" id="showUserDeviceDetailsButton1">';
								content += '<div class="widget-title">';
								content += '<h4><i class="icon-retweet"></i>U2f Device Registration</h4>';
								content += '<span class="tools"> ';
								content += '<a href="javascript:;" class="icon-chevron-up" id="downid1" onclick="customDown(1)" ></a> ';
								content += '<a href="javascript:;" class="icon-remove icon-remove1" onclick="customRemove(1)" ></a>';
								content += '</span>';
								content += '</div>';
								content += '</br><div style="height:30px;"><button type="button" id="btnU2f" style="float:right;" class="btn btn-primary" onclick="registerU2f_admin();">Register Security Key (U2F)</button></div>'
							 	    content += '<div class="widget-body"> <div class="tab-content "> <table  class="table table-bordered " id="sample_editable_1" style="width:100% !important;">';
								    content += '<thead>';
									content += '<tr style="background:#fff;">';									
										content += '<th>Device Type</th>';
										content += '<th>Name</th>';
										content += '<th>U2F ID</th>';
										content += '<th style="width:2%;">Delete</th>';
										content += '</tr>';
										content += '</thead>';
									   
										if (obj1 != null && obj1 != '' && obj1 != undefined) {
											var counterSr = 0;
											jQuery.each(obj1,
															function(i, v) {
																content += "<tr>"
																	    + "<td>Security Key</td>"
																	    + "<td>Security Key (U2F)</td>" 
																		+ "<td>" +v.u2fId+ "</td>"														
																		+ "<td style='text-align:center;'><a href='#' class='icon-trash' onclick='deleteU2fDetails_admin(\""+v.u2fId+"\");'></a></td>"
																		+ "</tr>";
															});
										} else {
											
											content += "<tr><td style='text-align: center;' colspan='4' id='noRecordData'>No Record Found</td></tr>";
										}

							
								content += "</table>";
								 content += '<div class="clearfix"/>';
							 	content += '<div class="form-actions form-actions2">';
							 	content += '<div class="pull-left">';
							 	content += '<div class="pull-left">';
									content += '<div class="btn-group">';
					
									content += '</div>'; 
								content += '</div></div></div></div></div></div>';
						
								$('#block_u2f_div_registered_user').html(content);
						
							} catch (e) {

							}

						}

					}

				});

	} catch (e) {
	}
}




function registerU2f_admin() {
	var text = $('#noRecordData').text();
	if (obj1 != null && obj1 != '' || text == "") {
		alert("Please delete existing security key if you wish to add another.");
	} else {
		u2fUser();
		$('#u2f_enroll_failed').hide();
		
	}
	return;
}

/*$('#u2fModal_admin').on('show.bs.modal', function (e) {
	$('#u2f_enroll_pending').show();
    u2fUser();
});*/

function u2fUser() {
	//alert(11);
	var selectUserSearchId=$('input:radio[name=selectUserSearchId]:checked').val();
	
	var dataString = "userLogonId="+encodeURIComponent(selectUserSearchId);
	
	
	$.ajax({
		type : "GET",
		url : "admin_u2fRegistration.action",
		data: dataString,
		dataType : "text",
		success : function(response) {
	
			
			if(response.trim()==limitU2fToken.trim()){
			alert(response);
			}else{
				$('#u2fModal_admin').modal('show');
				registerU2fUser(response);	
			}
		},
		error : function(response) {
			alert(response);
		}
	});
}

function registerU2fUser(u2fData) {
	
	var selectUserSearchId=$('input:radio[name=selectUserSearchId]:checked').val();
	
	 $("#userLogonId_id").val(selectUserSearchId);
	var request = JSON.parse(u2fData);
		request = JSON.parse(request.u2fReqestData);

	setTimeout(function() {
		u2f.register(request.registerRequests, request.authenticateRequests,
				function(data) {
					var form = document.getElementById('u2f_form');
					var reg = document.getElementById('tokenResponse');
					if (data.errorCode) {
						$('#enrol_para').replaceWith('<p id="enrol_para"><a href="#" onclick="callSecsecureU2fUser();">Try Again</a></p>');
						$('#u2f_enroll_failed').show();
						$('#u2f_enroll_pending').hide();
						return;
					}
					reg.value = JSON.stringify(data);
					//form.submit();
					ajaxCall();
					//$("#u2f_form").ajaxForm({url: 'admin_register.action', type: 'post'})
					
				});
	}, 1000);
	
	
	//ajaxCall();
}


function ajaxCall(){
	
	
	var selectUserSearchId=$('input:radio[name=selectUserSearchId]:checked').val();
	var strutsToken = $('[name=csrfPreventionSalt]').val();
	var tokenResponse= $('#tokenResponse').val();
	var dataString="userLogonId="+encodeURIComponent($.trim(selectUserSearchId))+"&csrfPreventionSalt="+strutsToken+"&tokenResponse="+tokenResponse;
	
	try {
		
							$.ajax({
									type : "POST",
									url : "admin_register.action",
									dataType : "text",
									data: dataString,
									success : function(response) {
										if ($.trim(response) == "sessionout") {
											alert("sessionout");
											testVal = document
													.getElementById('loginPage').value
											window.location.replace(testVal);
										} else if ($.trim(response) == "success") {
											$('#u2fModal_admin').modal('hide');
											alert(response);
											getU2FUserDetailsByUser();
											
										}else{
											$('#u2fModal_admin').modal('hide');
											getU2FUserDetailsByUser();
										} 
									},
									error : function(response){
										alert(response);
									}
								});
					
				
	} catch (e) {
		alert(e);
	}
	
}


function deleteU2fDetails_admin(u2fId){
	
	
	var strutsToken = $('[name=csrfPreventionSalt]').val();
	var selectUserSearchId=$('input:radio[name=selectUserSearchId]:checked').val();
	var dataString="userLogonId="+encodeURIComponent($.trim(selectUserSearchId))+"&u2fId="+encodeURIComponent($.trim(u2fId))+"&csrfPreventionSalt="+strutsToken;
	
	
	try {
		$.confirm({
					text : "Warning! Do you want to continue?",
					confirm : function(button) {
							$.ajax({
									type : "POST",
									url : "admin_deleteU2fDetailAdmin.action",
									dataType : "text",
									data: dataString,
									success : function(response) {
										if ($.trim(response) == "sessionout") {
											alert("sessionout");
											testVal = document
													.getElementById('loginPage').value
											window.location.replace(testVal);
										} else if ($.trim(response) == "success") {
											alert(response);
											getU2FUserDetailsByUser();
										} 
									},
									error : function(response){
										alert(response);
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
}
