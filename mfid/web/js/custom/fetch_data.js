
function fetchApplication()
{
	
	var domainId = $('#id2').val();
	 
	 if(domainId =="-1" || domainId =="-- Select Domain --")
	 {alert("Please select the Domain")
	 return true;
	 }
	document.getElementById('id3').options.length = 0;
	 var listData=new Array();	 
$.ajax
({
url: 'DisplayAppList.action?domain='+$('#id2').val()+'&organisationName='+$('#id1').val(),  
cache: false,
dataType:"json",
async: false,
success: function(data)
{
$.each(data.Messages, function(i,data)
{
listData.push([data]);
});
var sel = document.getElementById('id3');
var opt = sel.options;
opt[opt.length] = new Option("-- Select Application --", "-1");
for(var i = 0; i < listData.length; i++) {
   opt = sel.options;
opt[opt.length] = new Option(listData[i],listData[i])
}
        }
         });   
}



function fetchDomain(){
	
	 var organisation=document.getElementById('id1').value;
	 if(organisation=="-1")
	 {
		document.getElementById("input-username").readOnly=true;
		document.getElementById("input-password").readOnly=true;
		$('#id2').prop('disabled', true);
		return false;
	 }
	 else{
		  document.getElementById("input-username").readOnly=false;
		  document.getElementById("input-password").readOnly=false;
		  $('#id2').prop('disabled', false);
	 	 }
	 
	  document.getElementById('id2').options.length = 0;
	 var value = document.getElementById("id1").value;
     var listData=new Array();
     if(value=="select"){  var sel = document.getElementById('id2');
     var opt = document.createElement('option');
     opt.innerHTML = "Please select";
     sel.options.add(opt);
     }
                $.ajax
	({
	url: 'GetDomainAction.action?organisationName='+$('#id1').val(),  
	cache: false,
	dataType:"json",
	success: function(data)
	{
	listData.splice(0, 0, "-- Select Domain --");
	$.each(data.Messages, function(i,data)
	{
    listData.push([data]);
	});
	var sel = document.getElementById('id2');
	for(var i = 0; i < listData.length; i++) {
	//alert("data to be put"+listData[i]);

	var opt = sel.options;
	opt[opt.length] = new Option(listData[i],listData[i])
}
            }
             });   
                }


function fetchSecureDomain(){
	
	 var organisation=document.getElementById('id1').value;
	// alert("organisation = "+organisation);
	 if(organisation =="-1" || organisation =="-- Select Organization --")
		 {alert("Please select the Organisation")
		 return true;
		 }
	 if(organisation=="-1")
	 {
		document.getElementById("input-username").readOnly=true;
		document.getElementById("input-password").readOnly=true;
	 }
	 else{
		  document.getElementById("input-username").readOnly=false;
		  document.getElementById("input-password").readOnly=false;
	 	 }
	 
	// document.getElementById('id2').options.length = 0;
	 var value = document.getElementById("id1").value;
     var listData=new Array();
     if(value=="select"){  var sel = document.getElementById('id2');
     var opt = document.createElement('option');
     opt.innerHTML = "Please select";
     sel.options.add(opt);
     }
                $.ajax
	({
	url: 'GetDomainAction.action?organisationName='+$('#id1').val(),  
	cache: false,
	dataType:"json",
	 async: false,
	success: function(data)
	{
	$.each(data.Messages, function(i,data)
	{
    listData.push([data]);
	});
	var sel = document.getElementById('id2');
	for(var i = 0; i < listData.length; i++) {
	//alert("data to be put"+listData[i]);

	var opt = sel.options;
	opt[opt.length] = new Option(listData[i],listData[i])
}
            }
             });   
                }

function fetchDomainForForgotPassword(){
	
	 var organisation=document.getElementById('id1a').value;
	 document.getElementById('id2a').options.length = 0;
	 var value = document.getElementById("id1a").value;
     var listData=new Array();
     if(value=="select"){  var sel = document.getElementById('id2a');
     var opt = document.createElement('option');
     opt.innerHTML = "Please select";
     sel.options.add(opt);
     } if(organisation!='-1'){
	  $.ajax({
			url: 'GetDomainAction.action?organisationName='+$('#id1a').val(),  
			cache: false,
			dataType:"json",
			success: function(data)	{
			$.each(data.Messages, function(i,data){
				listData.push([data]);
			});
			var sel = document.getElementById('id2a');
			for(var i = 0; i < listData.length; i++) {
				//alert("data to be put"+listData[i]);
				var opt = sel.options;
				opt[opt.length] = new Option(listData[i],listData[i])
		    }
	      }
	   }); 
     }
}


function resetPassword()
{


	
	try{
		/*alert("radiusIP==="+radiusIP);
		alert("applId==="+applId);*/
		var userName=document.getElementById("userName_resPass").value;
	    var application = $("#id1a").val();
	    var domain = $("#id2a").val();
	    
	    var numRegex=(/^[-+]?[0-9]+$/);
	    
	    $("#domainResPassId").val(domain);
	        if($.trim(userName)== '')
			{ alert("Please Enter Username");
			 return false;
			}
	      else if($.trim(application)== '-- Select Organization --' || application == -1 || application == '-1')
			{ alert("Please select the Organization");
			  return false;
			}
	    
		//alert("email==="+email);
		$.ajax({
			type: "POST",
			url: "admin_passwordResetNew.action?userLogonId="+userName+"&domainName="+domain,
			data: "{}",
			dataType: "text",
			success: function(response){
				
				console.log(response);
				console.log(response.includes("otp"));
				
				//alert(response);
				//alert(response.includes("otp"));
				if($.trim(response) == "success"){
					console.log("success");
					alert("Password has been sent to your registered Email Id"); // add for bug id 425
					document.getElementById("userName_resPass").value="";
					setTimeout(function() {
						location.reload();
					}, 2000);
					}else if(response.includes("otp")){
						console.log("otp");
						var tempData=response.split(",");
						
						
					     if($.trim(tempData[1]).match(numRegex)){
					    	 mobileMessage = "Please enter verification code (OTP) sent to: *******"+tempData[1]; 
					    	 $('#reSendOTPID').show(200);
							 
						  }else{
							  
							  mobileMessage=mobileNumAlert; 
							  $('#reSendOTPID').hide();
						   
						  }
						  
						  
						  $("#show_mobile_no_text").html(mobileMessage);
						
						
						jQuery('#forgotform').hide();
						jQuery('#reset_otp_form').show(200);
						//alert(11);
						
					}
				else{
					//console.log("else else");
					alert(response);
					
					
					
				}
					
			}
		});
	
	}catch(e){alert(e);}
	
	
	
	}





function validateOtpResPass(){
		
		try{
			var userName=document.getElementById("userName_resPass").value;
		    var domain = $("#id2a").val();
		    
		   
		        if($.trim($("#userOtpId").val())== '')
				{ alert("Please Enter Otp");
				 return false;
				}		    
			//alert("email==="+email);
			$.ajax({
				type: "POST",
				url: "admin_validateOTPResetPass.action?otp="+$("#userOtpId").val()+"&domainName="+domain+"&userLogonId="+userName,
				data: "{}",
				dataType: "text",
				success: function(response){
					if($.trim(response) == "success"){
						alert("Password has been sent to your registered Email Id"); // add for bug id 425
						
						setTimeout(function() {
							location.reload();
						}, 2000);
						}
					else{
						alert(response);
					
					}
				}
			});
		
		}catch(e){alert(e);}
		
			
}



function reSendOTPResPass(){
	
	try{
		var userName=document.getElementById("userName_resPass").value;
	    var domain = $("#id2a").val();
	    		    
		//alert("email==="+email);
		$.ajax({
			type: "POST",
			url: "admin_reSendOTPResetPass.action?domainName="+domain+"&userLogonId="+userName,
			data: "{}",
			dataType: "text",
			success: function(response){
				if($.trim(response) != "success"){
					alert(response);
					}
				
					
					
				// jQuery('#loginform').slideDown(200);
			     //jQuery('#forgotform').slideUp(200);
			}
		});
	
	}catch(e){alert(e);}
	
}