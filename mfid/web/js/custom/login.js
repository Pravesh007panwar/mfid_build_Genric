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
   				//alert("forgetform");
   			}
   			
   		}
   		
    	console.log( "Handler for .keypress() called." );
    });
    
    
    function applicationAction(e){
    	$app=$('#id3').val();
      	if($app==-1)
      	{
      		alert("Please select the Application");
      		e.preventDefault();
      		
      		
      	}
      	else
      	{
      		//$('#id3').attr('action','login_checkApplication.action');
      		document.f2.action="login_checkApplication.action";
      		document.f2.submit();
      		
      	}
    }
    
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


//var handleLoginAction=function(){
    function submitLoginForm(){
	var organisation=document.getElementById('id1').value;
	var domain=document.getElementById('id2').value;
	var username=document.getElementById('input-username').value;
	var password=document.getElementById('input-password').value;
	var application=$('#id3').val();
	 //password=SHA512(password);
	//alert("password==="+password)
	
	var strutsToken = $('[name=csrfPreventionSalt]').val();
	
	if(organisation==-1)
		{
		alert("Please select the Organisation");
		return;
		}
	
	if(domain==-1 || domain=='' || domain == '-- Select Domain --')
		{
		
		alert("Please select the Domain");
		return;
		}
	if(application==-1)
	{
	
	alert("Please select the Application");
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
	
	
	var counter=0;
	var a=0;
	 var listData=new Array();
	 var dataString ='organisationName='+$('#id1').val()+'&domain='+$('#id2').val()+'&userName='+$('#input-username').val()+'&password='+encodeURIComponent($('#input-password').val())+'&application='+application+'&csrfPreventionSalt='+strutsToken;
	//for SHA-512 without taking salt var dataString ='organisationName='+$('#id1').val()+'&domain='+$('#id2').val()+'&userName='+$('#input-username').val()+'&password='+encodeURIComponent(password);
	$.ajax
	({
	url: 'userLogin.action',  
	cache: false,
	type: "POST",
	data: dataString,
	dataType:"json",
	success: function(data)
	{    

			if ($.trim(data.GetMessages) == "Get Request Not Allowed") {
				alert("Invalid Request");
				return;
			}
			if ($.trim(data.Messages) == "success") {
				location.reload();

			} else if ($.trim(data.Messages) == "Invalid Request") {

				alert($.trim(data.Messages));
				setTimeout(function() {
					location.reload();
				}, 1000);
			} else {
				alert("The username or password you entered is incorrect or you are not associated with the application");
			}
		
		/* $.each(data.Messages, function(i,data)
				{
		 	a=String([data]).localeCompare("false");
			if(a!=0){
			    listData.push([data]);}
			    //alert(listData);
			    test(a);
				});*/
/*	var sel = document.getElementById('id3');
	for(var i = 0; i < listData.length; i++) {
		var opt = sel.options;
		opt[opt.length] = new Option(listData[i],listData[i])
		}*/
		
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

/*$('#login-btn').click(function(e){
		applicationAction(e);
});*/

$('#next-login-btn').click(function () {

    handleLoginAction();

});
