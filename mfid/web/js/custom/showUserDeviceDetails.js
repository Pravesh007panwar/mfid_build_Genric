var globalUserLogonId= '';
var globalAppName= '';


function customRemove(id)
{ $("#showUserDeviceDetailsButton"+id).hide();  
}

function customDown(id)
{ $("#showUserDeviceDetailsBodyButton"+id).slideToggle("slow",function(){ $("#downid"+id).toggleClass('icon-chevron-down icon-chevron-up');});
 }

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
$('#block_show_User_Device_Info_Data').html('');
$('#block_show_User_Policy_Data').hide();
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
										 content += "<tr><td style='width: 20px;' > <input type='radio' name='selectUserSearchId' class='shadow_radio' value="+encodeURIComponent(v.userLoginId)+" ></td><td>"+v.userLoginId+"</td><td>"+v.firstName+"</td><td>"+v.lastName+"</td><td>"+v.emailId+"</td><td>"+v.mobileNumber+"</td></tr>";
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
											 
											 content += '<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button type="button" class="btn btn-primary"  onclick="submitUserDetails()">Submit</button>';
											 content += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button type="button" class="btn btn-primary"  onclick="revalidateToken()">Revalidate Token</button> ';
											 }
									  $('#block_show_User_Search_Data').html(content);
									    $("#userLoginID").val('');
										 $("#firstNameID").val('');
										 $("#lastNameID").val('');
										 $("#emailID").val('');
									     $("#mobileNumberID").val('');
									     $('#block_show_User_Device_Info_Data').html('');
									     $('#block_show_User_Policy_Data').hide();
								
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



function submitUserDetails()
{ 
	$('#policyFormdiv').hide();
	var selectUserSearchId=$('input:radio[name=selectUserSearchId]:checked').val();
	var userAppName = $.trim($("#userAppId").val());
	       if (!$('input[name=selectUserSearchId]:checked').val() )    
				alert("Please select user.");
			 else
				 {
					 
					 try
					   {
						   globalUserLogonId= decodeURIComponent(selectUserSearchId);
						   globalAppName= userAppName; 
						   var myUrl="admin_getUserDeviceDecision.action";

						   var dataString = "userLogonId="+selectUserSearchId+"&appName="+encodeURIComponent(userAppName);
						   
						   $('#user_resync_data').html("Loading...");
								$.ajax({
									type:"POST",
									url:myUrl,
									async:true,
									data: dataString,
									dataType:"text",
									success:function(data)
									{
										   
										
										 if($.trim(data)=="sessionout"){
												alert(data);
												testVal= document.getElementById('loginPage').value				
												window.location.replace(testVal);
											}
										 else {
											 var object = JSON.parse(data);
											 var deviceDetails=JSON.parse(object.userDeviceDetailList);
											 var bssidDetails=JSON.parse(object.bssidDetailVOList);
											 var userDeviceDecision=JSON.parse(object.userDeviceDecisionVOList);
											 var whiteListedDeviceList = JSON.parse(object.whiteListedDeviceVOList);
											 var obj1=JSON.parse(object.userCountryPolicyList);
											try{ 	
											
										   var content = ' <table class="table table-striped table-bordered" id="sample_country_1">';
												content += '<thead>';
												content += '<tr>';
												content += '<th><input type="checkbox" class="group-checkable" data-set="#sample_editable_1 .checkboxes" style="width:auto;" /></th>';
												content += '<th>User LogonId</th>';
												content += '<th>Allowed Country</th>';
												content += '<th>From Timestamp</th>';
												content += '<th>To Timestamp</th>';
												content += '<th>Action</th>';
												
												//content += '<th style="display: none;"></th>';
												content += '<th style="display: none;"></th>';
												//content += '<th style="display: none;"></th>';

												content += '</tr>';
												content += '</thead>';

												if(obj1!=null && obj1!='')
													{
												jQuery.each(obj1, function(i, v) {
													//i = (i+1);
													content += "<tr>";
													content += "<td><input type='checkbox' id='activeCountry' class='checkboxes4' value='"+v.userId+"' style='width:auto;' /></td>";
													content += "<td>"+globalUserLogonId+"</td>";
													content += "<td>"+v.countryName+"</td>";
													 content += "<td>"+v.date1+"</td>";
													content += "<td>"+v.date2+"</td>";
													content += "<td><a class='_country_edit' href='javascript:;'>Edit</a></td>";
													//content += "<td><a href='javascript:void(0);' class='delete'>Delete</a></td>";
													content += "<td style='display: none;' >"+v.userId+"</td>";
													content += "</tr>";
												});
													}
												 /*else
												  {
												  content +='<td valign="top" colspan="4" class="dataTables_empty"><center>No Record Found!</center> </td>';
												  }*/
											    content += "</table>";
												 var contents = '<div class="row-fluid"><div class="span6"><div><label>Search: <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search country names.." ></label></div></div></div>';
												  content += '<div class="form-actions form-actions2"><div class="pull-left"><div class="btn-group"><button id="sample_1_addNew" class="btn green">Add New <i class="icon-plus"></i></button></div><div class="btn-group"><button id="sample_editable_1_multi_delete" type="button" class="btn green">Delete <i class="icon-remove"></i></button></div></div></div>';
												  content = contents+content;
												$('#block_show_User_Policy_Data').show();
												$('#block_policy_data').html(content);
												$("#sample_country_1").css("width","100%");
												//oTable = $('#sample_1').dataTable({"bSort":false});
												oTable_assign_policy = $('#sample_country_1').dataTable({
													"bPaginate" : false,
													"bFilter" : false,
													"bSort" : false
												});
											     content = "";
											} catch(err){}
											 
											 try{
												 
												var content = '<br/><br/><br/><div class="container" style="width:100% !important;" >';
													content += '<div class="widget widget-tabs" id="showUserDeviceDetailsButton1">';
													content += '<div class="widget-title">';
													content += '<h4><i class="icon-retweet"></i>Manage Activated Devices</h4>';
													content += '<span class="tools"> ';
													content += '<a href="javascript:;" class="icon-chevron-up" id="downid1" onclick="customDown(1)" ></a> ';
													content += '<a href="javascript:;" class="icon-remove icon-remove1" onclick="customRemove(1)" ></a>';
													content += '</span>';
													content += '</div>';
												 	    content += '<div class="widget-body scroll-div" id="showUserDeviceDetailsBodyButton1"> <div class="tab-content "> <table  class="table table-bordered " id="sample_editable_1" style="width:100% !important;">';
													    content += '<thead>';
														content += '<tr style="background:#fff;">';
															content += '<td ><input type="checkbox" class="group-checkable1" data-set="#sample_editable_1 .checkboxes1" style="width:auto;" /></td> ';
															content += '<td><b>Sr No</b></td>'; 
															content += '<td ><b> Device Name</b></td>'; 
															content += '<td ><b> Device Id</b></td>'; 
															content += '<td ><b> Activation Time</b></td>'; 
															content += '<td ><b> IP</b></td>'; 
															content += '<td ><b> Network Type</b></td>';
														    content += '</tr>';
												  var counter = 1;	 
												  if(deviceDetails != null && deviceDetails !='')
													  {
													jQuery.each(deviceDetails, function(i, v) {
														
													    if(v.mobileType == 'iphone')
															v.mobileType = 'Iphone';
														else if(v.mobileType == 'androidGCM')
															v.mobileType = 'Android';
														 if(v.ipType == '0')
																	v.ipType = 'Unsecure';
														 else if(v.ipType == '1')
																	v.ipType = 'Secure'	;
														 else 
															  v.ipType = '';
																		
														content += "<tr>" +
																"<td><input type='checkbox' id='activedevice' class='checkboxes1' value='"+v.deviceId+"' style='width:auto;' /></td>" +
																		"<td>"+counter+"</td>" +
																				"<td>"+v.mobileType+"</td>" +
																				"<td style='word-break: break-all;'>"+v.deviceId+"</td>" +
																				"<td>"+(v.activationTime).replace(".0", "")+"</td>" +
																				"<td>"+(v.ip)+"</td>" +
																				"<td>"+(v.ipType)+"</td>"+ 
																						"</tr>";
														counter++;
													});
													
													  }
												  else
													  {
													  content +='<td valign="top" colspan="7" class="dataTables_empty"><center>No Record Found!</center> </td>';
													  }
												
													content += "</table>";
													//content += '</div>';
													 content += '<div class="clearfix"/>';
												 	content += '<div class="form-actions form-actions2">';
												 	content += '<div class="pull-left">';
												 	content += '<div class="pull-left">';
														content += '<div class="btn-group">';
															content += '<button id="sample_editable_1_multi_delete1" type="button" class="btn btn-primary" >De-Register <i class="icon-remove"></i></button>';
														content += '</div>'; 
													content += '</div></div></div></div></div></div>';
													
													
													content += '<br/>';
													
													
													
													   	content += '<div class="container" style="width:100% !important;" >';
													   	content += '<div class="widget widget-tabs" id="showUserDeviceDetailsButton2">';
														content += '<div class="widget-title">';
														content += '<h4><i class="icon-retweet"></i>Manage Wifi Devices </h4>';
														content += '<span class="tools"> ';
														content += '<a href="javascript:;" class="icon-chevron-up" id="downid2" onclick="customDown(2)"></a> ';
														content += '<a href="javascript:;" class="icon-remove" onclick="customRemove(2)"></a>';
														content += '</span>';
														content += '</div>';
													 	content += ' <div class="widget-body" id="showUserDeviceDetailsBodyButton2"> <div class="tab-content" > <table  class="table table-bordered " id="sample_editable_1" style="width:100% !important;">';
														content += '<thead>';
															content += '<tr style="background:#fff;">';
																content += '<td ><input type="checkbox" class="group-checkable2" data-set="#sample_editable_1 .checkboxes2" style="width:auto;" /></td> ';
																content += '<td><b>Sr No</b></td>'; 
																content += '<td ><b> BSSID</b></td>'; 
																content += '<td ><b> SSID</b></td>'; 
																content += '<td ><b> Activation Time</b></td>'; 
															    content += '</tr>';
													  var counter = 1;	 
													  if(bssidDetails != null && bssidDetails !='')
														  {
														jQuery.each(bssidDetails, function(i, v) {
															
														     		
															content += "<tr>" +
																	"<td><input type='checkbox' id='wifidevice' class='checkboxes2' value='"+v.bssid+"' style='width:auto;' /></td>" +
																			"<td>"+counter+"</td>" +
																					"<td>"+v.bssid+"</td>" +
																					"<td style='word-break: break-all;'>"+v.ssid+"</td>" +
																					"<td>"+(v.activationTime).replace(".0", "")+"</td>" 
																							"</tr>";
															counter++;
														});
														
														  }
													  else
														  {
														  content +='<td valign="top" colspan="5" class="dataTables_empty"><center>No Record Found! </center> </td>';
														  }
													
														content += "</table>";
														//content += '</div>';
														 content += '<div class="clearfix"/>';
													 	content += '<div class="form-actions form-actions2">';
													 	content += '<div class="pull-left">';
													 	content += '<div class="pull-left">';
															content += '<div class="btn-group">';
																content += '<button id="sample_editable_1_multi_delete2" type="button" class="btn btn-primary" >De-Register <i class="icon-remove"></i></button>';
															content += '</div>'; 
														content += '</div></div></div></div></div></div>';
														
														
														content += '<br/>';
														
														
														
													   	content += '<div class="container" style="width:100% !important;" >';
													   	content += '<div class="widget widget-tabs" id="showUserDeviceDetailsButton3">';
														content += '<div class="widget-title">';
														content += '<h4><i class="icon-retweet"></i>Manage Devices Decision</h4>';
														content += '<span class="tools"> ';
														content += '<a href="javascript:;" class="icon-chevron-up" id="downid3" onclick="customDown(3)" ></a> ';
														content += '<a href="javascript:;" class="icon-remove" onclick="customRemove(3)"></a>';
														content += '</span>';
														content += '</div>';
													 	content += '<div class="widget-body" id="showUserDeviceDetailsBodyButton3"> <div class="tab-content "><table  class="table table-bordered " id="sample_editable_1" style="width:100% !important;">';
														content += '<thead>';
															content += '<tr style="background:#fff;">';
																content += '<td ><input type="checkbox" class="group-checkable3" data-set="#sample_editable_1 .checkboxes3" style="width:auto;" /></td> ';
																content += '<td><b>Sr No</b></td>'; 
																content += '<td ><b> IP</b></td>'; 
																content += '<td ><b> Device Id</b></td>'; 
																content += '<td ><b>Decision</b></td>'; 
																content += '<td ><b> Decision Time</b></td>'; 
																content += '<td ><b> Current Status ( Time Left )</b></td>'; 
															    content += '</tr>';
													  var counter = 1;	 
													  if(userDeviceDecision != null && userDeviceDecision !='')
														  {
														jQuery.each(userDeviceDecision, function(i, v) {
															var tempTime = (v.expiryTime).split(',');
															  if(v.status == 'true')
																	v.status = 'Active ('+tempTime[1]+')';
																else if(v.status == 'false')
																	v.status = 'Expired';
																 		
														     		
															content += "<tr>" +
																	"<td><input type='checkbox' id='devicedecision' class='checkboxes3' value='"+v.ip+"' style='width:auto;' /></td>" +
																			"<td>"+counter+"</td>" +
																					"<td>"+v.ip+"</td>" +
																					"<td style='word-break: break-all;'>"+v.deviceId+"</td>" +
																					"<td>"+(v.decision)+"</td>" +
																					"<td>"+(tempTime[0])+"</td>" +
																					"<td>"+(v.status)+"</td>" +
																							"</tr>";
															counter++;
														});
														
														  }
													  else
														  {
														  content +='<td valign="top" colspan="7" class="dataTables_empty"><center>No Record Found! </center> </td>';
														  }
													
														content += "</table>";
														//content += '</div>';
														 content += '<div class="clearfix"/>';
													 	content += '<div class="form-actions form-actions2">';
													 	content += '<div class="pull-left">';
													 	content += '<div class="pull-left">';
															content += '<div class="btn-group">';
														    content += '<button id="sample_editable_1_multi_delete3" type="button" class="btn btn-primary" >Remove Device Decision <i class="icon-remove"></i></button>';
															content += '</div>'; 
														content += '</div></div></div></div></div></div>';
														
														
														
														content += '<br/>';
														
														
														
													   	content += '<div class="container" style="width:100% !important;" >';
													   	content += '<div class="widget widget-tabs" id="showUserDeviceDetailsButton5">';
														content += '<div class="widget-title">';
														content += '<h4><i class="icon-retweet"></i>Manage White Listed Devices</h4>';
														content += '<span class="tools"> ';
														content += '<a href="javascript:;" class="icon-chevron-up" id="downid5" onclick="customDown(5)" ></a> ';
														content += '<a href="javascript:;" class="icon-remove" onclick="customRemove(5)"></a>';
														content += '</span>';
														content += '</div>';
													 	content += '<div class="widget-body" id="showUserDeviceDetailsButton5"> <div class="tab-content "><table  class="table table-bordered " id="sample_editable_1" style="width:100% !important;">';
														content += '<thead>';
															content += '<tr style="background:#fff;">';
																content += '<td ><input type="checkbox" class="group-checkable5" data-set="#sample_editable_1 .checkboxes5" style="width:auto;" /></td> ';
																content += '<td><b>Sr No</b></td>'; 
																content += '<td ><b> User LogonId</b></td>'; 
																content += '<td ><b> Device</b></td>'; 
																
															    content += '</tr>';
													  var counter = 1;	 
													  if(whiteListedDeviceList != null && whiteListedDeviceList !='')
														  {
														jQuery.each(whiteListedDeviceList, function(i, v) {
																									 		
														     		
															content += "<tr>" +
																	"<td><input type='checkbox' id='whiteListedId' class='checkboxes5' value='"+v.whiteListedId+"' style='width:auto;' /></td>" +
																			"<td>"+counter+"</td>" +
																																						
																			"<td>"+(v.userLogonId)+"</td>" +
																			"<td id='deviceListedId"+i+"'>"+(v.device)+"</td>" +
																	"</tr>";
															counter++;
														});
														
														  }
													  else
														  {
														  content +='<td valign="top" colspan="4" class="dataTables_empty"><center>No Record Found! </center> </td>';
														  }
													
														content += "</table>";
														//content += '</div>';
														 content += '<div class="clearfix"/>';
													 	content += '<div class="form-actions form-actions2">';
													 	content += '<div class="pull-left">';
													 	content += '<div class="pull-left">';
															content += '<div class="btn-group">';
														    content += '<button id="sample_editable_1_multi_delete5" type="button" class="btn btn-primary" >Remove White Listed Device <i class="icon-remove"></i></button>';
															content += '</div>'; 
														content += '</div></div></div></div></div></div>';
														
														
														
														
														
													    $('#block_show_User_Device_Info_Data').html(content);
													    $('#showUserDeviceDetailsBodyButton1').slideUp();
													    $('#showUserDeviceDetailsBodyButton2').slideUp();
													    $('#showUserDeviceDetailsBodyButton3').slideUp();
													    $('#showUserDeviceDetailsBodyButton5').slideUp();
													    
													    
											 }
											 catch(err){}
											 
											 
									 
											}
										    
									 
									}
								
								});
								
							}
							catch(e)
							{ }
					
			      }
		
	 
}



function deRegisterUserDeviceDetail(id,type)
{
 
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
     var textMessage = "";
       if(type == 'activateddevices')
    	   textMessage = "Warning!! Are you sure that you wish to De-Register the Devices. Please note that If you De-Register the Devices then users will not be able to get notification on their devices. Please be absolutely sure before proceeding. Do you want to continue.";
       else if(type == 'wifidevices')
    	   textMessage = "Warning!! Are you sure that you wish to De-Register the Wifi Devices. Please note that If you De-Register the Wifi Devices then users will get extra security notification on their devices. Please be absolutely sure before proceeding. Do you want to continue.";
    	else
    	  textMessage = "Warning!! Are you sure that you wish to Remove the Devices Decision. Please note that If you Remove the Devices Decision then users will get Extra Security notification on their devices. Please be absolutely sure before proceeding. Do you want to continue.";  
       var dataString = "deviceName="+encodeURIComponent(id)+"&userLogonId="+encodeURIComponent(globalUserLogonId)+"&appName="+encodeURIComponent(globalAppName)+'&type='+type+'&csrfPreventionSalt='+strutsToken;
	  try{
			$.confirm({
				  text: textMessage,
		          confirm: function(button) {
		        	$.ajax({
				type: "POST",
				url: "admin_deRegisterUserDeviceDetail.action",
				data: dataString,
				dataType: "text",
				success: function(data){
					data = $.trim(data.toString());
					// alert("data = "+data);
					 if(data.toString() == 'true')
						 {
						 alert("success");
						 submitUserDetails();
						 
						 }
					 
					
					 
					 
				}
			});
		        },
		        cancel: function(button) {
		            return;
		        }
		    });
		}catch(e){alert(e);}
		 


}




function myFunction() {
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("myInput");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("sample_country_1");
	  tr = table.getElementsByTagName("tr");
	  try{  $("#sub_sample_table1").remove(); }catch(err){} 
	  var check = 1;
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[2];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	        check++;
	      }
	    
	    }       
	  }
	   if(check >= tr.length)
	  $("#sample_country_1").append('<td valign="top" colspan="6" id="sub_sample_table1"  class="dataTables_empty"><center>No Record Found!</center> </td>');
	 }


function revalidateToken()
{
	var selectUserSearchId=$('input:radio[name=selectUserSearchId]:checked').val();
	var userAppName = $.trim($("#userAppId").val());
	       if (!$('input[name=selectUserSearchId]:checked').val() )    
				alert("Please select user.");
			 else
				 {
					  var textMessage = "";
						       textMessage = "Warning!! Are you sure that you wish to Revalidate Token. Please note that If you revalidate token then user will rescan QR Code on their devices otherwise otp will not work. Please be absolutely sure before proceeding. Do you want to continue.";  
						     //  var dataString = "deviceName="+encodeURIComponent(id)+"&userLogonId="+encodeURIComponent(globalUserLogonId)+"&appName="+encodeURIComponent(globalAppName)+'&type='+type;
						       var myUrl="admin_revalidateToken.action";
		                       var dataString = "userLogonId="+selectUserSearchId+"&appName="+encodeURIComponent(userAppName);
								  
						       try{
									$.confirm({
										  text: textMessage,
								          confirm: function(button) { 
								        	  
								          $('#user_resync_data').html("Loading...");
											$.ajax({
												type:"POST",
												url:myUrl,
												async:true,
												data: dataString,
												dataType:"text",
												success:function(data)
												{
													   
													
													 if($.trim(data)=="sessionout"){
															alert(data);
															testVal= document.getElementById('loginPage').value				
															window.location.replace(testVal);
														}
													 else {
														 
														 alert(data);
													 }
													    
												 
												}
											
											});  
								        	  
								        	  
								        	  
								        	  
								          },
								        cancel: function(button) {
								            return;
								        }
								    });
								}catch(e){alert(e);}
					
			      }
	
}


function deleteWhiteListedDevices(deleteId,devices)
{
	var res;
	
	pid = deleteId;
	var deviceName = devices;

	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	try{
		$.confirm({
	        text: "Warning! Are you sure that you wish to Delete WhiteListed Devices? Please be absolutely sure before proceeding. Do you want to continue?",
	        confirm: function(button) {
		$.ajax({
			type: "POST",
			url: "admin_deleteWhiteListedDevices.action?pid="+$.trim(pid)+"&deviceName="+$.trim(deviceName)+"&userLogonId="+encodeURIComponent(globalUserLogonId)+"&csrfPreventionSalt="+strutsToken,
			dataType: "text",
			success: function(response){
			
			if($.trim(response)=="sessionout"){
				alert(response);
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
				}
				else if($.trim(response)=="success"){
					alert(response);			
					submitUserDetails();
				}	
				res=response;
			}
		});
	        },
	        cancel: function(button) {
	            return;
	        }
	    });
		}catch(e){alert(e);}
		return res;
}
