

function checkSpecialChar(paramArr){
	
	var flag=false;
	
	var specials = /[`~!$%^&()_|+\=?;:'",<>\{\}\[\]\\\/]/gi;
	jQuery.each(paramArr,function(i, s) {
		if(specials.test(s)){
			
			flag=true;
		}
		
	});
	
	return flag;
}


function ldapUserSearch()
{
	var userLoginID = $.trim($("#userLoginID").val());
	var firstNameID = $.trim($("#firstNameID").val());
	var lastNameID = $.trim($("#lastNameID").val());
	var emailID = $.trim($("#emailID").val());
	var mobileNumberID = $.trim($("#mobileNumberID").val());
	var zimotpId = $.trim($("#zimotpId").val());
	
	 var arr=[userLoginID,firstNameID,lastNameID,emailID,mobileNumberID,zimotpId];
	 
	
 
if(userLoginID == '' && firstNameID == '' && lastNameID == '' && emailID == '' && mobileNumberID == '' && zimotpId =='')
{
alert('please enter at least one user column for Search. ');
$("#userLoginID").focus();
$('#block_show_User_Search_Data').html('');
}else if(checkSpecialChar(arr)){
	
	alert("Special characters not allowed.");
	
}
else
	{
	   try
	   {
		   
		   var myUrl="admin_getLDAPUserSearchDetails.action";

		   var dataString = "userLogonId="+encodeURIComponent(userLoginID)+"&firstName="+encodeURIComponent(firstNameID)+"&lastName="+encodeURIComponent(lastNameID)+"&emailId="+encodeURIComponent(emailID)+"&mobileNumber="+encodeURIComponent(mobileNumberID)+"&zimotp="+encodeURIComponent(zimotpId);
		   
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
							}else if($.trim(data)=="special char"){
					         alert("Special characters not allowed.");
								
							}
						 else {
							 var object = JSON.parse(data);
							 var obj1=JSON.parse(object.userDetailList);
							
								try{
									var content = "";
									  content += '<table class="table table-striped table-bordered" id="sample_1_1">';
									  content += '<thead>';
										content += '<tr>';
									    content += '<th>User LogonId</th>'; 
									             content += '<th>First Name</th>'; 
												 content += '<th>Last Name</th>';
												 content += '<th>Email Id</th>';
												 content += '<th>Mobile Number</th>';
												 content += '<th>Zimotp</th>';
											     content += '</tr>';
											     content += '</thead>';
									  
									 if(obj1!=null && obj1!=''){
										 var counterSr=0;
									jQuery.each(obj1, function(i, v) {
										 content += "<tr><td>"+v.userLoginId+"</td><td>"+v.firstName+"</td><td>"+v.lastName+"</td><td>"+v.emailId+"</td><td>"+v.mobileNumber+"</td><td>"+v.zimotp+"</td></tr>";
								 });
									}
									/*else  
										{ content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";	
										  chechNoRecordFound = true;
										}*/
								
										content += "</table>";
										content += '<div class="clearfix"></div>';
										 
									  $('#block_show_User_Search_Data').html(content);
									  $("#sample_1_1").css("width","100%");
										oTable = $('#sample_1_1').dataTable({"bSort":false});
									    $("#userLoginID").val('');
										 $("#firstNameID").val('');
										 $("#lastNameID").val('');
										 $("#emailID").val('');
									     $("#mobileNumberID").val('');
									     $("#zimotpId").val('');
									   
									    
								
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
