var otpFlag=false;

$(document).bind("keypress",function(e){
   		
   		var keycode=e.keyCode?e.keyCode:e.which;
   		if(keycode==13)
    	{
    		//alert(keycode);
   			//alert(e.target.nodeName);
   			var id=$('form').filter(':visible:first').attr("id");
   			
   			
   			if(id=='loginform')
   			{
   				//alert("loginform");
   				 handleLoginAction();
   			}
   			else if(id=='choose_applicationform')
   			{
   				//alert("applicationform");
   				applicationAction();
   			}
   			else if(id=='forgotform')
   			{
   				alert("forgetform");
   			}
   			
   		}
   		
    	console.log( "Handler for .keypress() called." );
    });
    
    
 
    
    var handleLoginForm = function () {
	//alert("handle login form");
    jQuery('#forget-password').click(function () {
        jQuery('#loginform').hide();
        jQuery('#forgotform').show(200);
        $('#forgotform')[0].reset();
    });

    jQuery('#forget-btn').click(function () {
        var email = $("#email").val();
    	var application = $("#id1a").val();
        if($.trim(email)== '' || $.trim(application)== '-- Select Organization --' || application == -1 || application == '-1' )
		{ 
		 return false;
		}
       else
    	  {
    	  jQuery('#loginform').slideDown(200);
          jQuery('#forgotform').slideUp(200);
    	  }
  	
       
    });
	
	
	
	jQuery('#login-btn-back').click(function () {
        jQuery('#forgotform').slideUp(200);
        jQuery('#loginform').slideDown(200);
    });
	
	jQuery('#login-btn-back2').click(function () {
		jQuery('#reset_otp_form').slideUp(200);
        
        jQuery('#loginform').slideDown(200);
    });
	
	
	
	
}


var handleLoginAction=function(){
 
	var organisation=document.getElementById('id1').value;
	var domain=document.getElementById('id2').value;
	var application=document.getElementById('id3').value;
	var username=document.getElementById('input-username').value;
	var password=document.getElementById('input-password').value;
	 var captchaToken="";
	 
	if(globalCaptchaFlag)
	   captchaToken=document.getElementById('input-captcha').value;
	
	 
	var myUrl="";
	var dataString = "";
	 
	//myUrl = 'secureLogin_secureLogin.action';
	
	 if(organisation==-1)
		{
		alert("Please select the Organisation");
		return;
		}
	
	if(domain==-1)
		{
		
		alert("Please select the Domain");
		return;
		}
	
	if(application==-1)
	{
	
	alert("Please select the Protocol");
	return;
	} 
	
	if(username==null ||username=='')
		{
		alert("Please Enter the UserName");
		return;
		}

	
	if(password==null ||password=='')
		{
		alert("Please Enter the Password");
		return;
		}
	
	if(globalCaptchaFlag)
	{
	  if(captchaToken==null ||captchaToken=='')
		{
		 alert("Please Enter the Captcha");
		return;
		}
	}
//	myUrl = 'secureLogin_secureLogin.action?organisation='+$('#id1').val()+'&domain='+$('#id2').val()+'&username='+$('#input-username').val()+'&password='+$('#input-password').val()+'&application='+$('#id3').val();
	myUrl = 'secureLogin_secureLogin.action';
	dataString = 'organisation='+$('#id1').val()+'&domain='+$('#id2').val()+'&username='+$('#input-username').val()+'&password='+encodeURIComponent($('#input-password').val())+'&token='+globalSecureToken+'&application='+$('#id3').val()+'&captchaToken='+encodeURIComponent(captchaToken);
	if(otpFlag)
		{
		var otp=document.getElementById('userOtpId').value;
		if($.trim(otp) == '')
		{	alert("please enter otp.");
		    return;
		}
	//	myUrl='secureLogin_validateOTP.action?organisation='+$('#id1').val()+'&domain='+$('#id2').val()+'&username='+$('#input-username').val()+'&password='+$('#input-password').val()+'&application='+$('#id3').val()+'&otp='+otp;
		myUrl = 'secureLogin_validateOTP.action';
		dataString = 'organisation='+$('#id1').val()+'&domain='+$('#id2').val()+'&username='+$('#input-username').val()+'&password='+$('#input-password').val()+'&otp='+otp+'&token='+globalSecureTokenOTP+'&application='+$('#id3').val();
		}
	 $("#next-login-btn").attr("disabled", true); 
 
	  $.ajax
	({
	url: myUrl,  
	cache: false,
	type: "POST",
	data: dataString,
	dataType: "text",
	success: function(data)
	{   
		var temData = data.split(",");
		var mobileMessage="";
		if($.trim(temData[0]) == "success")
		{$("#secure_login_id").hide();
		$("#secure_otp_login_id").show()
		 otpFlag=true;
		  $("#next-login-btn").attr("disabled", false); 
		  
		  
             if(temData[1].trim()=="Not Registered"){
			  
			  mobileMessage=mobileNumAlert; 
			  $('#reSendOTPID').hide();
		  }else{
			  
		   mobileMessage = "Please enter verification code (OTP) sent to:"+temData[1];
		   
		  }
		  
		  
		  $("#show_mobile_no_text").html(mobileMessage);
		 return;
		}
	 else if($.trim(data) == "Your OTP has expired. Please login again.")
			{ alert($.trim(data));
			  window.location=contextPath+"/user"; 
			 return;
	   }
	  else if($.trim(data) == "success otp")
		{ //
		  window.location=contextPath+"/secureLogin_showDashboard.action";
		  $("#next-login-btn").attr("disabled", false);  
		  return;
		}
	  else if($.trim(data) == "Your request is not processed , duplicate request detected." || $.trim(data) == "Please enter valid captcha.")
		{ alert($.trim(data));
		  window.location=contextPath+"/user"; 
		 return;
		}
	  else if($.trim(data) != "success otp" || $.trim(data) == "captcha required")
		{ //
		  if($.trim(data) != "captcha required")
		   {alert($.trim(data));}
		  $("#next-login-btn").attr("disabled", false);  
		  if($.trim(data) != "incorrect OTP" && $.trim(data) != "please enter 6 digit otp")
			  refreshCaptcha(false);
		 return;
		}
		
	 
		
    }
          });	
	
    

}

function test(  a)
{
   	if(a!=0){
	jQuery('#loginform').slideUp(200);
    jQuery('#choose_applicationform').slideDown(200);
  	}
   	else
   		{
   		alert("The username or password you entered is incorrect or you are not associated with the application");
   		}
	return;
}

$('#login-btn').click(function(e){
		applicationAction(e);
});

$('#next-login-btn').click(function () {

    handleLoginAction();

});




function refreshCaptcha(refreshFlag)
{
var strutsToken = $('[name=csrfPreventionSalt]').val();

	try {
		var myUrl ="";
		if(refreshFlag == true)
	       myUrl = 'secureLogin_refreshCaptcha.action?captchaToken=regenerate&csrfPreventionSalt=' + strutsToken;
		else
		   myUrl = 'secureLogin_refreshCaptcha.action?csrfPreventionSalt=' + strutsToken;
	  $.ajax
		({
		url: myUrl,  
		cache: false,
		type: "POST",
		dataType: "text",
		success: function(data)
		{ 
			try { 
			var object = JSON.parse(data);
			var secureCaptchaFlag = object.secureCaptchaFlag;
			var secureCaptchaToken = object.secureCaptchaToken;
			globalCaptchaFlag=secureCaptchaFlag;
			if(secureCaptchaFlag == 'true' || secureCaptchaFlag == true)
			{ // $("#divGenerateRandomValues").html(secureCaptchaToken); 
			   $('#divGenerateRandomValues').css("background-image", "url('data:image/png;base64,"+secureCaptchaToken+"')"); 
			  $("#captchaFlagBlockDiv1").css("display", "block");
			  document.getElementById('input-captcha').value='';
			 }
			else
			  $("#captchaFlagBlockDiv1").css("display", "none");
			} catch (e) {
			console.log("Inside refreshCaptcha , Exception Message = " + e);
			}
		}
	          });	
	
	
	} catch (e) {
		console.log("Inside refreshCaptcha , Exception Message = " + e);
	}
}

