function showMyAccountDetail()
{

	try{
	$.ajax({
			type: "POST",  
			url:"admin_showMyAccountDetail.action",
			data: "{}",
			dataType: "text",
			success: function(data) {
				
				var object = JSON.parse(data);
			
				jQuery('input[id$="userLogonId"]').val(JSON.parse(object.userLogonId));
				jQuery('input[id$="firstName"]').val(JSON.parse(object.userFirstName));
				jQuery('input[id$="lastName"]').val(JSON.parse(object.userLastName));
				jQuery('input[id$="mobile"]').val(JSON.parse(object.mobileNumber));
				jQuery('input[id$="email"]').val(JSON.parse(object.userEmail));
				
			
				
				
			}
		});
		
	}
	catch(e)
	{
		//alert(e);
	}
	}





function updateMyAccountDetail()
{
	
	var userLogonId=document.getElementById("userLogonId").value;
	var firstName=document.getElementById("firstName").value;
   var lastName=document.getElementById("lastName").value;
   var mobile=document.getElementById("mobile").value;
  var email=document.getElementById("email").value;
  
  var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
  

 
 
 var namePattern = /^[A-Za-z]{3,25}$/;
	var namePattern1 = /^[A-Za-z]{0,25}$/;
	
	if(firstName=="")
 	{
		 alert("Please enter first name.");
	
		}
	else if(!namePattern.test(firstName))
		{
		 alert("Entered First name is not valid or First name length is not between 3 and 25 characters !");
		
		}
		
	
	else if(!namePattern1.test(lastName))
	{
		 alert("Entered Last name is not valid or Last name length is more than 25 characters !");
		 
	}
	
	else if(lastName=="")
 	{
		 alert("Please enter last name.");
		}
	else if(!namePattern.test(lastName))
		{
		alert("Entered Last name is not valid or Last name length is not between 3 and 25 characters !");
		
		}
		
		else if(mobile=="")
		{
			 alert("Please enter mobile number.");
		}
	else if(!mobile.match(/^[0-9]{10,15}$/))
			{
				alert("Entered mobile number is not valid or lenght is not between 10 and 15 digit");
				
			}
			
			
 else if(email=="")
	{
		 alert("Please enter email id.");
	}
	/*else if(!email.match(/^[a-zA-Z0-9_.-]+@[a-z0-9][a-z0-9\-]{1,64}(\.[a-z]{2,4}|[a-z]{2,3}\.[a-z]{2})$/i))
			{
				 alert("Email Id is not Valid");
			}*/
	
 
 
 
	else{
  
	var dataString='userLogonId='+userLogonId+'&firstName='+firstName+'&lastName='+lastName+'&mobile='+mobile+'&mail='+email+'&csrfPreventionSalt='+strutsToken;
	$.ajax({
			type: "POST",
			url: "admin_updateMyAccountDetail.action",
			data: dataString,
			dataType:"text",
			//async: false,
			success: function(response){
				
				if($.trim(response) == "success"){
					alert(response);
					showMyAccountDetail();
				}
				else
					alert(response);
			}
		});
	//return reponse;
		
	}
}



