function changePassword()
{
	var oldPassword=document.getElementById("oldPassword").value;
	var newPassword=document.getElementById("newPassword").value;
    var confirmPassword=document.getElementById("confirmPassword").value;
	    oldPassword = $.trim(oldPassword);
	    newPassword = $.trim(newPassword);
	    confirmPassword = $.trim(confirmPassword);
   
   var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
   

		   if(oldPassword=="")
			{
			alert("Please enter old password");
			}
		else if(oldPassword.length>20)
			{
			alert("Old password length should not be more than 20 character");
			} 		
		else if(newPassword=="")
			{
			alert("Please enter new password");
			}
		else if(newPassword.length>20)
			{
			alert("New password length should not be more than 20 character");
			} 		
		else if(confirmPassword=="")
			{
			alert("Please enter confirm password");
			}
		else if(confirmPassword.length>20)
			{
			alert("Confirm password length should not be more than 20 character");
			} 
		else if(newPassword!=confirmPassword)	
		{
			alert("New password and Confirm password should be same.");
		}
		
		else if((oldPassword.indexOf('\'') >=0)||(oldPassword.indexOf('=') >=0))
		{
			alert("Format of old password is incorect");
		}
		
		else if((newPassword.indexOf('\'') >=0)||(newPassword.indexOf('=') >=0))
		{
			alert("Format of new password is incorect");
		}
		
		else if((confirmPassword.indexOf('\'') >=0)||(confirmPassword.indexOf('=') >=0))
		{
			alert("Format of Confirm password is incorect");
		}
		else if(checkSpecialCharacter(newPassword)) 
			{
		      alert ("Your string has special characters. \nThese are not allowed.");
			}
		else{
			
	var dataString='oldPassword='+encodeURIComponent(oldPassword)+'&newPassword='+encodeURIComponent(newPassword)+'&confirmPassword='+encodeURIComponent(confirmPassword)+'&csrfPreventionSalt='+strutsToken;
	$.ajax({
			type: "POST",
			url: "admin_changePassword.action",
			data: dataString,
			async: false,
			 dataType: "text",
			success: function(response){
				//alert(response);
				if($.trim(response)=="sessionout")
					{
					alert(response);
					var testVal=document.getElementById('loginPage').value;
					window.location.replace(testVal);
					}
				else if($.trim(response) == "success"){
					alert(response);
					jQuery('input[id$="oldPassword"]').val("");
					jQuery('input[id$="newPassword"]').val("");
					jQuery('input[id$="confirmPassword"]').val("");
				}
				else{
					alert(response);
				}
			}
		});
		//return reponse; // Commented By Saurabh
		
				}
}



function checkSpecialCharacter(data)
{
	 //var iChars = "&%^()=[]\\\';,/{}|\":<>?~"; // add for bug id #445 , added by Abhimanyu 
	 var iChars = "&%"; // add for bug id #642 , added by Abhimanyu 
     for (var i = 0; i < data.length; i++)
        {      
        	if (iChars.indexOf(data.charAt(i)) != -1)
             return true;
         } 
     
     return false;

}


