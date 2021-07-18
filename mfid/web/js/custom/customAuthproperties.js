var customAuthListData;
function showProperties()
{
	
	
	

	try{
	$.ajax({
			type: "POST",  
			url:"admin_showCustomAuthDetails.action",
			data: "{}",
			dataType: "text",
			success: function(data) {
				
				var object = JSON.parse(data);
				//alert("JSON.parse(object.getXmppServerIp)===="+JSON.parse(object.getXmppServerIp))
				  customAuthListData =JSON.parse(object.customAuthList);
				 
				 
				 //document.getElementById("custom_auth_id").value=customAuthListData;
				 
				  $('#cust_info_data').html('');
					jQuery.each(customAuthListData,function(i, s) {
						var content="";
						if(s.paramKey.includes("domain") && s.paramKey!="ldapdomain"){
						content+='<div class="control-group">';
						content+='<label class="span6">'+s.paramKey;
						content+='<span class="help-inline red_color"></span>'
						content+='</label><div class="span6">';
						}else{
							content+='<div class="control-group">';
							content+='<label class="span6">'+s.paramKey;
							content+='<span class="help-inline red_color">*</span>'
							content+='</label><div class="span6">';
							
						}
						if(s.paramKey.includes("password")){
						content+='<input name="'+s.paramKey+'" type="password"  class="span12" value="'+s.paramValue+'"/></div></div>';
						}else{
							content+='<input name="'+s.paramKey+'" type="text"  class="span12" value="'+s.paramValue+'"/></div></div>';
						}
						 $('#cust_info_data').append(content);
						//alert(1);
							});
							
				
				
				}
		});
		
	}
	catch(e)
	{
		alert(e);
	}
	}



function closePopUp(){
	   $(".ui-dialog").hide();
}

function updateProperties()
{
	try{
	var checkVal="";
	//var customAuthDataList=document.getElementById("custom_auth_id").value;
	
	jQuery.each(customAuthListData,function(i, s) {
		var tempVal=document.getElementsByName(s.paramKey)[0].value;
		if(tempVal=="" && s.paramKey!="domain"){
			alert("Please enter "+s.paramKey+".");
	        checkVal="error";
		}
		
	});
	
 if(checkVal!="error"){
 var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
 var myForm = document.getElementById('custominfo_form');
 var formData = new FormData(myForm)
 var object = {};
 formData.forEach(function(value, key){
     object[key] = value.trim();
 });
 var jsonFormData = JSON.stringify(object);
 var dataString='customAuthData='+encodeURIComponent(jsonFormData)+'&csrfPreventionSalt='+ strutsToken;
	
	
	$.ajax({
			type: "POST",
			url: "admin_updateCustomAuthInfo.action",
			data: dataString,
			dataType:"text",
			async: false,
			success: function(response){
				
				if($.trim(response) == "success"){
					alert(response);
					showProperties();
				}
				else
					alert(response);
			}
		});
	
	}	else{
		//alert(5765);
		return;
	}
				//}
	}
	catch(e)
	{
		alert(e)
	}
}



function addNewKey(){
	try{
		$('#encryptedTextId').val("");
		$('#textId').val("");
		$("#dialog" ).dialog();
		$(".ui-dialog").show();
		
		
	}catch(e){
		alert(e)
	}
}


function checkExistingCustomAuthKey(customAuthKey){
	var retVal="";;
	try{
		
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	
	var dataString='cutomAuthKey='+encodeURIComponent(customAuthKey)+'&csrfPreventionSalt='+encodeURIComponent(strutsToken);
	
	$.ajax({
		type: "POST",  
		url:"admin_checkExistingKeyCustomAuth.action",
		data: dataString,
		dataType:"text",
		async: false,
		success: function(response) {
			retVal=response;
		}
			
});

	return retVal;
	}catch(e){
		alert(e);
	}
}

function saveKeyValue(){
	
		var customAuthKey=document.getElementById("customAuthKeyId").value.trim();
		var customAuthValue=document.getElementById("customAuthValueId").value.trim();
		
		if(customAuthKey==""){
		alert("Please enter key.");	
		return false;
		}else if(customAuthValue==""){
			alert("Please enter value.");
			return false;
		}
		
		var retVal=checkExistingCustomAuthKey(customAuthKey);
		
		if(retVal.trim()=="success"){			
			alert("Key already exists.");
			window.location.reload();
			
		}else{		
		
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
		
		var dataString='cutomAuthKey='+encodeURIComponent(customAuthKey.trim())+'&csrfPreventionSalt='+encodeURIComponent(strutsToken)+'&cutomAuthvalue='+encodeURIComponent(customAuthValue.trim());
	
		try{
			$.ajax({
					type: "POST",  
					url:"admin_addCustomAuthInfo.action",
					data: dataString,
					dataType:"text",
					async: false,
					success: function(response) {
						if($.trim(response) == "success"){
							alert(response);
							window.location.reload();
						}
						else
							alert(response);
					
						
					}
	});
			
		}
		
		catch(e)
		{
			alert(e);
		}
	
		}
	}




 
function blockFormSubmitRequest()  {  return false;   }
