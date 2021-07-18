function showDataSourceDetail()
{
	//alert("showDataSourceDetail====");
	var databaseVendor=document.getElementById("databaseVendor").value;
	var databaseURL=document.getElementById("databaseURL").value;
   var databaseName=document.getElementById("databaseName").value;
   var databaseUserName=document.getElementById("databaseUserName").value;
  var dataBasePassword=document.getElementById("dataBasePassword").value;
  var databaseQuery=document.getElementById("databaseQuery").value;
 
  var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
  
  
 /* alert("databaseVendor====="+databaseVendor);
  alert("databaseURL====="+databaseURL);
  alert("databaseName====="+databaseName);
  alert("databaseUserName====="+databaseUserName);
  alert("dataBasePassword====="+dataBasePassword);
  alert("databaseQuery====="+databaseQuery);*/
  
  //var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	
  if(databaseVendor=="select")
  {
	  alert("Please select database vendor");
	  return;
  }
  else if(databaseURL=="")
  {
	  alert("Please enter database URL!");
	  return;
  }

  var parts=[];
  var parts = databaseURL.split(":");
  var ip=parts[0];

  var port=parts[1];


//  if(!ip.match(ipformat))  
//  {  
//	  alert("You have entered an invalid IP address!");  
//	  return;
//  }  
   if(port==""|| port==undefined)
  {
	  alert("Please enter Port number!");
	 return;
  }
  else if(isNaN(port))
  {
	  alert("You have entered an invalid Port number!");
	  return;
  }
  else if(databaseName=="")
  {
	  alert("Please enter Database Name");
	  return;
  }
  else if(databaseUserName=="")
  {
	  alert("Please enter User Name");
	  return;
  }

  else if(dataBasePassword=="")
  {

	  alert("Please enter Password");
	  return;
  }

  else if(dataBasePassword.length>20)
  {
	  alert("Password length should not be more than 20 character");
	  return;
  }
  else if(databaseQuery=="")
  {
	  alert("Please enter database query");
	  return;
  }
  
  else{
	  showAjaxLoader();
	$.ajax({
			type: "POST",
			url: "admin_showDataSourceDetail.action?databaseVendor="+databaseVendor+"&databaseName="+encodeURIComponent(databaseName)+"&databaseURL="+encodeURIComponent(databaseURL)+"&databaseUserName="+encodeURIComponent(databaseUserName)+"&dataBasePassword="+encodeURIComponent(dataBasePassword)+"&databaseQuery="+encodeURIComponent(databaseQuery)+"&csrfPreventionSalt="+strutsToken,
			async: true,
			dataType: "text",
			success: function(data) {
				
				if($.trim(data)=="sessionout"){
					alert(data);
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				else if(data.match(/Error/))
					{
					alert(data);
					hideAjaxLoader();
					return;
					}
				else{
					hideAjaxLoader();
				 try{
					 var object=JSON.parse(data);
					
				       var obj1=JSON.parse(object.columnList);
				    //  alert("object.columnList===="+object.columnList);
				       var userId = document.getElementById('userId');
				       var firstName = document.getElementById('firstName');
				       var middleName = document.getElementById('middleName');
				       var lastName = document.getElementById('lastName');
				       var email = document.getElementById('email');
				       var mobile = document.getElementById('mobile');
				       
				       var userIdOpt = userId.options;
			    		userIdOpt.length=1;
			    		var fNameOpt = firstName.options;
			    		fNameOpt.length=1;
			    		var mNameOpt = middleName.options;
			    		mNameOpt.length=1;
			    		var lNameOpt = lastName.options;
			    		lNameOpt.length=1;
			    		var emailOpt = email.options;
			    		emailOpt.length=1;
			    		var mobileOpt = mobile.options;
			    		mobileOpt.length=1;
				       jQuery.each(obj1, function(i, v) {
				    	
				    		
				    		
				    		userIdOpt[userIdOpt.length] = new Option(v,v)
				    		fNameOpt[fNameOpt.length] = new Option(v,v)
				    		mNameOpt[mNameOpt.length] = new Option(v,v)
				    		lNameOpt[lNameOpt.length] = new Option(v,v)
				    		emailOpt[emailOpt.length] = new Option(v,v)
				    		mobileOpt[mobileOpt.length] = new Option(v,v)
				    	   });
				       }
				 
				       catch (e) {
				      //	alert(e)
				      	// TODO: handle exception
				      }
				      
				     
				       
				       document.getElementById("tab2_coll2_form").reset();
				       var set='#block_active_database';
				       open_tab2_coll_2(set,'tab_2_coll_2');
				       
				    
				       
				      
				}
			}
		});

  }
  
			
}


				function importFromDataBase()
				{

					var userId = document.getElementById('userId').value;
				       var firstName = document.getElementById('firstName').value;
				       var middleName = document.getElementById('middleName').value;
				       var lastName = document.getElementById('lastName').value;
				       var email = document.getElementById('email').value;
				       var mobile = document.getElementById('mobile').value;
				       var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
				  
				      
				 /* alert("userId==="+userId);
				  alert("firstName==="+firstName);
				  alert("middleName==="+middleName);
				  alert("lastName==="+lastName);
				  alert("mail==="+email);
				  alert("mobile==="+mobile);*/
				  if(userId=="select")
					  {
					  	alert("Please select UserLogonId");
					  }
				  else if(firstName=="select")
				  {
				  	alert("Please select first name");
				  }
				  else if(lastName=="select")
				  {
				  	alert("Please select last name");
				  }
				  else if(email=="select")
				  {
				  	alert("Please select email");
				  }
				  else if(mobile=="select")
				  {
				  	alert("Please select mobile");
				  }
				  else{
					var dataString='userId='+userId+'&firstName='+firstName+'&middleName='+middleName+'&lastName='+lastName+'&mail='+email+'&mobile='+mobile+'&csrfPreventionSalt='+strutsToken;
					showAjaxLoader();
					$.ajax({
							type: "POST",
							url: "admin_importFromDataBase.action",
							data: dataString,
							dataType: "text",
							success: function(response){
								//alert(response);
								if($.trim(response)=="sessionout"){
									alert(response);
									testVal= document.getElementById('loginPage').value				
									window.location.replace(testVal);
								}
								else if(response.match(/duplicate entries/))
									{
									alert(response);
									location.reload();
									document.getElementById("tab2_coll1_form").reset();
										var set='#block_active_database';
										open_tab2_coll_1(set,'tab_2_coll_1');
										hideAjaxLoader();
									}
								else if($.trim(response) == "success"){
									alert(response);
									//$('#sidebar').load("menu.jsp");
									location.reload();
									document.getElementById("tab2_coll1_form").reset();
									 var set='#block_active_database';
									open_tab2_coll_1(set,'tab_2_coll_1');
									hideAjaxLoader();
								}
							}
						});
					
						
								}
				  return response;
				}




