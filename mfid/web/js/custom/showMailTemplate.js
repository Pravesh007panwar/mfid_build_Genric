function showMailTemplate(mailTemplateType) {
   try{
	   var myUrl="admin_getMailTemplateByName.action?mailTemplateType="+encodeURIComponent(mailTemplateType);
		$('#user_resync_data').html("Loading...");
		$.ajax({
			type:"POST",
			url:myUrl,
			async:true,
			dataType:"text",
			success:function(data) {
			if($.trim(data)=="sessionout"){
					alert(data);
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
			     var obj=JSON.parse(data);
				 var mailstatus=obj.mailstatus;
				 var mailBody=UTF8.decode(obj.mailBody);
				 var mailSubject=UTF8.decode(obj.mailSubject);
			     var content = '<div class="space15"></div>';
				     content += '<div class="row-fluid">';
					 content += '</div>';
	  				 content += '<div class="form-group">';
					 if(mailstatus == "1" || mailstatus == 1)
						   content += '<div>Mail Allowed Status :<input type="checkbox" id="mailAllowedStatus" onchange="checkMailAllowedStatus(this)" checked ></div>';
						else
							content += '<div>Mail Allowed Status :<input type="checkbox" id="mailAllowedStatus"  onchange="checkMailAllowedStatus(this)" ></div>';
					content += '</div><br/>';
					if(mailstatus == "1" || mailstatus == 1)
					     content += '<div class="controls"> <label for="comment">Mail Subject:</label> <input id="mailTemplateSubjectId" type="text" class="span6 " value="'+mailSubject+'"></div><br/>';
					else
						content += '<div class="controls"> <label for="comment">Mail Subject:</label> <input id="mailTemplateSubjectId" type="text" class="span6 " value="'+mailSubject+'" readonly></div><br/>';
					content += '<div class="form-group">';
					content += ' <label for="comment">Mail Body:</label>';
					if(mailstatus == "1" || mailstatus == 1)
					   content += '  <textarea class="form-control jquerytextqtte-test" rows="15" id="mailTemplateBodyId">'+mailBody+'</textarea>';
					else
					   content += '  <textarea class="form-control jquerytextqtte-test" rows="15" id="mailTemplateBodyId" readonly>'+mailBody+'</textarea>';
					content += '</div><br/>';
					content += '<div class="form-actions">';
					content += '<button type="button" id="updateTemplateButtonId" class="btn btn-primary" onclick="updateMailTemplate()">Update Template</button>&nbsp;&nbsp;&nbsp;&nbsp;';
					 
					if(mailstatus == "1" || mailstatus == 1)
					   { content += '<button type="reset" class="btn btn-primary" id="resetMailButtonId" onclick="resetMailTemplate()">Reset</button>&nbsp;&nbsp;&nbsp;&nbsp;';
					     content += '<button type="button" class="btn btn-success" id="resetTestMailButtonId" onclick="sendTestMail()" >Mail Test It Now</button>&nbsp;&nbsp;&nbsp;&nbsp;';
					   }
					else
						{
						  content += '<button type="reset" class="btn btn-primary" id="resetMailButtonId" onclick="resetMailTemplate()" disabled>Reset</button>&nbsp;&nbsp;&nbsp;&nbsp;';
					      content += '<button type="button" class="btn btn-success" id="resetTestMailButtonId" onclick="sendTestMail()" disabled>Mail Test It Now</button>&nbsp;&nbsp;&nbsp;&nbsp;';
						}
					content += '</div>';
					content += '</div><br/>';
					 
					 
					$('#user_resync_data').html(content);
					 $('.jquerytextqtte-test').jquerytextqtte();
					var jquerytextqtteStatus = true;
					$(".status").click(function()
					{ 
						jquerytextqtteStatus = jquerytextqtteStatus ? false : true;
						$('.jquerytextqtte-test').jquerytextqtte({"status" : jquerytextqtteStatus})
					}); 
					if(mailstatus == "1" || mailstatus == 1)
					{ $('.jquerytextqtte_editor').attr('contenteditable', true);  $('#mailTagsId').removeAttr('disabled'); }
					else
					{ $('.jquerytextqtte_editor').attr('contenteditable', false);  $('#mailTagsId').attr('disabled','true');}
					$("#sample_4").css("width", "100%");
					try{
						 var select = document.getElementById("mailTagsId");
						  for (var i = 0; i < select.length; i++) 
						  $("#mailTagsId option[value='"+select.options[i].value+"']").show();
						 if(mailTemplateType == 'ASSIGN_APPLICATION_MAIL')
							{
							 $("#mailTagsId option[value='{QRCODE}']").hide();
							 $("#mailTagsId option[value='{EMERGENCYOTP}']").hide();
							 $("#mailTagsId option[value='{PASSWORDRESETLINK}']").hide();
							 $("#mailTagsId option[value='{OTP}']").hide();
							 $("#mailTagsId option[value='{LICENSEKEY}']").hide();
							 $("#mailTagsId option[value='{DEVICEID}']").hide();
							 $("#mailTagsId option[value='{MOBILETYPE}']").hide();
						    }
						else if(mailTemplateType == 'SMS_MAIL')
							{
							$("#mailTagsId option[value='{FIRSTNAME}']").hide();
							$("#mailTagsId option[value='{LASTNAME}']").hide();
							$("#mailTagsId option[value='{PASSWORD}']").hide();
							$("#mailTagsId option[value='{QRCODE}']").hide();
							 $("#mailTagsId option[value='{EMERGENCYOTP}']").hide();
							 $("#mailTagsId option[value='{PASSWORDRESETLINK}']").hide();
							 $("#mailTagsId option[value='{OTP}']").hide();
							 $("#mailTagsId option[value='{DEVICEID}']").hide();
							 $("#mailTagsId option[value='{MOBILETYPE}']").hide();
						 }
						else if(mailTemplateType == 'BIO_TOKEN_ONLINE_MAIL' || mailTemplateType == 'BIO_TOKEN_OFFLINE_MAIL' || mailTemplateType == 'PUSH_TOKEN_ONLINE_MAIL' || mailTemplateType == 'PUSH_TOKEN_OFFLINE_MAIL' || mailTemplateType == 'MOBILE_TOKEN_ONLINE_MAIL'  || mailTemplateType == 'MOBILE_TOKEN_OFFLINE_MAIL' )
							{  
							 $("#mailTagsId option[value='{FIRSTNAME}']").hide();
							 $("#mailTagsId option[value='{LASTNAME}']").hide();
							 $("#mailTagsId option[value='{MOBILENUMBER}']").hide();
							 $("#mailTagsId option[value='{EMERGENCYOTP}']").hide();
							 $("#mailTagsId option[value='{PASSWORDRESETLINK}']").hide();
							 $("#mailTagsId option[value='{OTP}']").hide();
							 $("#mailTagsId option[value='{DEVICEID}']").hide();
							 $("#mailTagsId option[value='{MOBILETYPE}']").hide();
							 $("#mailTagsId option[value='{PASSWORD}']").hide();
							
							}
						else if(mailTemplateType == 'HARDTOKEN_MAIL' )
						{
						 $("#mailTagsId option[value='{FIRSTNAME}']").hide();
						 $("#mailTagsId option[value='{LASTNAME}']").hide();
						 $("#mailTagsId option[value='{MOBILENUMBER}']").hide();
						 $("#mailTagsId option[value='{EMERGENCYOTP}']").hide();
						 $("#mailTagsId option[value='{PASSWORDRESETLINK}']").hide();
						 $("#mailTagsId option[value='{QRCODE}']").hide();
						 $("#mailTagsId option[value='{OTP}']").hide();
						 $("#mailTagsId option[value='{DEVICEID}']").hide();
						 $("#mailTagsId option[value='{MOBILETYPE}']").hide();
						
						}
						else if(mailTemplateType == 'EMERGENCY_MAIL' )
						{
						 for (var i = 0; i < select.length; i++) 
						 $("#mailTagsId option[value='"+select.options[i].value+"']").hide();
						 $("#mailTagsId option[value='{FIRSTNAME}']").show();
						 $("#mailTagsId option[value='{EMERGENCYOTP}']").show();
					     }
						else if(mailTemplateType == 'RESET_PASSWORD_MAIL' )
						{
						 for (var i = 0; i < select.length; i++) 
						 $("#mailTagsId option[value='"+select.options[i].value+"']").hide();
						 $("#mailTagsId option[value='{FIRSTNAME}']").show();
						 $("#mailTagsId option[value='{LASTNAME}']").show();
						 $("#mailTagsId option[value='{PASSWORDRESETLINK}']").show();
						 $("#mailTagsId option[value='{USERLOGONID}']").show();
						 
					     }
						else if(mailTemplateType == 'NEW_PASSWORD_MAIL' )
						{
						 for (var i = 0; i < select.length; i++) 
						 $("#mailTagsId option[value='"+select.options[i].value+"']").hide();
						 $("#mailTagsId option[value='{FIRSTNAME}']").show();
						 $("#mailTagsId option[value='{LASTNAME}']").show();
						 $("#mailTagsId option[value='{PASSWORD}']").show();
						 $("#mailTagsId option[value='{USERLOGONID}']").show();
						 $("#mailTagsId option[value='{MOBILENUMBER}']").show();
						 
					     }
						else if(mailTemplateType == 'DEVICE_ACTIVATION_MAIL' )
						{
						 for (var i = 0; i < select.length; i++) 
						 $("#mailTagsId option[value='"+select.options[i].value+"']").hide();
						 $("#mailTagsId option[value='{FIRSTNAME}']").show();
						 $("#mailTagsId option[value='{LASTNAME}']").show();
						 $("#mailTagsId option[value='{USERLOGONID}']").show();
						 $("#mailTagsId option[value='{MOBILENUMBER}']").show();
						 $("#mailTagsId option[value='{EMAILID}']").show();
						 $("#mailTagsId option[value='{DEVICEID}']").show();
						 $("#mailTagsId option[value='{MOBILETYPE}']").show();
						 $("#mailTagsId option[value='{LICENSEKEY}']").show();
						 $("#mailTagsId option[value='{MFIDURL}']").show();
						 $("#mailTagsId option[value='{USERURL}']").show();
						 $("#mailTagsId option[value='{DOMAINID}']").show();
						 $("#mailTagsId option[value='{DOMAINNAME}']").show();
						 $("#mailTagsId option[value='{APPLICATIONID}']").show();
						 $("#mailTagsId option[value='{APPLICATIONNAME}']").show();
					 }
					 else if(mailTemplateType == 'SMS_OTP_MAIL' )
						{
						 for (var i = 0; i < select.length; i++) 
						 $("#mailTagsId option[value='"+select.options[i].value+"']").hide();
						 $("#mailTagsId option[value='{FIRSTNAME}']").show();
						 $("#mailTagsId option[value='{LASTNAME}']").show();
						 $("#mailTagsId option[value='{USERLOGONID}']").show();
						 $("#mailTagsId option[value='{MOBILENUMBER}']").show();
						 $("#mailTagsId option[value='{EMAILID}']").show();
						 $("#mailTagsId option[value='{OTP}']").show();
						 
					     }
					 else if(mailTemplateType == 'USER_LOCKED_MAIL' )
						{
						 for (var i = 0; i < select.length; i++) 
						 $("#mailTagsId option[value='"+select.options[i].value+"']").hide();
						 $("#mailTagsId option[value='{FIRSTNAME}']").show();
						 $("#mailTagsId option[value='{LASTNAME}']").show();
						 $("#mailTagsId option[value='{USERLOGONID}']").show();
						 $("#mailTagsId option[value='{MOBILENUMBER}']").show();
						 $("#mailTagsId option[value='{EMAILID}']").show();
					  } 
					}
					catch(err){}
			}
		});
		
	}
	catch(e)
	{
		alert(e);
	}

}


function updateMailTemplate()
{
   try{
	   var mailTemplateType = $("#mailTemplateTypeId").val();
	   var mailTemplateBody = $("#mailTemplateBodyId").val();
	   var mailAllowedStatus =  $("#mailAllowedStatus").is(':checked');
	   var mailTemplateSubject = $("#mailTemplateSubjectId").val();
	   var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet
	   var myUrl="admin_updateMailTemplate.action";
	   var dataString = "mailTemplateType="+encodeURIComponent(mailTemplateType)+"&mailTemplateBody="+encodeURIComponent(mailTemplateBody)+"&mailAllowedStatus="+encodeURIComponent(mailAllowedStatus)+"&mailTemplateSubject="+encodeURIComponent(mailTemplateSubject)+"&csrfPreventionSalt="+strutsToken;	
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
			 else if($.trim(data)=="true"){
					alert("success");
					showMailTemplate(mailTemplateType);
			   }
			}
		
		});
		
	}
	catch(e)
	{
		alert(e);
	}
}

function resetMailTemplate()
{	 
	  var mailTemplateType = $("#mailTemplateTypeId").val();
	  showMailTemplate(mailTemplateType)
	  
}


 function checkMailAllowedStatus(e)
   {
	 if($(e).is(":checked")) 
	     {  $('#mailTemplateBodyId').attr('readonly', false);  
	        $('#mailTemplateSubjectId').attr('readonly', false);  
	        $('#resetMailButtonId').attr('disabled', false);  
	        $('#resetTestMailButtonId').attr('disabled', false); 
	        $('.jquerytextqtte_editor').attr('contenteditable', true);
	        $('#mailTagsId').removeAttr('disabled');
	        
	        
	     }  
	  else
	  {  $('#mailTemplateBodyId').attr('readonly', true); 
	     $('#mailTemplateSubjectId').attr('readonly', true); 
	     $('#resetMailButtonId').attr('disabled', true); 
	     $('#resetTestMailButtonId').attr('disabled', true); 
	     $('.jquerytextqtte_editor').attr('contenteditable', false);
	     $('#mailTagsId').attr('disabled','true');
	     
	     
	  }
	    
  }
 
 
 function sendTestMail()
 {
	 $("#senderMailID").val('');
	 $('#myModalTestMail').modal('show')  
	 
 }
	 
 function finalSendTestMail()
 {
	  var senderMailID = $.trim($("#senderMailID").val());
	  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  if(senderMailID == '')
		  {
		  alert('Please enter email id.');
          return true;
		  }
	  if( !emailReg.test( senderMailID ) ) 
	       {
              alert('Please enter valid email.');
              return true;
            } 
	  else {
             
             try{
           	   var mailTemplateType = $("#mailTemplateTypeId").val();
           	   var mailTemplateBody = $("#mailTemplateBodyId").val();
           	   var mailAllowedStatus =  $("#mailAllowedStatus").is(':checked');
           	   var mailTemplateSubject = $("#mailTemplateSubjectId").val();
           	  var strutsToken=$('[name=csrfPreventionSalt]').val();// added by
																	// puneet
																	// vats
           	  
           	   var myUrl="admin_sendTestMailTemplate.action";
           	    var dataString = "mailTemplateType="+encodeURIComponent(mailTemplateType)+"&mailTemplateBody="+encodeURIComponent(mailTemplateBody)+"&mail="+encodeURIComponent(senderMailID)+"&mailTemplateSubject="+encodeURIComponent(mailTemplateSubject)+"&csrfPreventionSalt="+strutsToken;	
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
       				 else if($.trim(data)=="true"){
       						alert("success");
       						$("#senderMailID").val('');
       					    $('#myModalTestMail').modal('hide')  
       					    showMailTemplate(mailTemplateType);
       					    return true;
       				   }
           			}
           		
           		});
           		
           	}
           	catch(e) {
           		alert(e);
           	}
        }
  }
 
 function selectMailTags() {
       try{
       	   if(($("#mailAllowedStatus").is(':checked')) == true || ($("#mailAllowedStatus").is(':checked')) == 'true'){
    		   $(".jquerytextqtte_editor").html($("#mailTemplateBodyId").val()+$("#mailTagsId").val())
	       }
      }catch(err){
    	  
      }
  	    
 }
 
 UTF8 = {
			encode: function(s){
				for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
					s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
				);
				return s.join("");
			},
			decode: function(s){
				for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
					((a = s[i][c](0)) & 0x80) &&
					(s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
					o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
				);
				return s.join("");
			}
		};
