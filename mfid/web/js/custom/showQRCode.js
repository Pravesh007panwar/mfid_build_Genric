		function showQRCode(){
							//alert("shyam")
							var object;
							$.ajax({
								type: "POST",  
								url:"admin_showQRCode.action",
							    async: false,
								dataType: "text",
								success: function(data) {
									
									//alert("data==="+data)
									if($.trim(data)=="sessionout")
									{
									alert("Session TimeOut...");
									var testVal=document.getElementById('loginPage').value;
									window.location.replace(testVal);
									}
									
									object = JSON.parse(data);
									//alert("object==="+object)
									var obj1=JSON.parse(object.Base64EncodedImage);
									var obj2=JSON.parse(object.RandomKeyVal);
									
								//	alert("obj1====="+obj1)
									var content='';
									 content ='<div>';
									//content += '<div class="row-fluid new_filter">';
									content +='';
									content +='<img class="imagem_artigo" src="data:image/png;base64,'+obj1+'" alt="IMG DESC"> ';
									content +='';
									//content += '</div>';
									content += '</div>';
									$('#qr_code').html(content);
									$('#randomKeyId').html("Activation Key : "+obj2);
									
									
								 }
							});
							
							 
		}			
						
function deassociateTokenPolicy()
{
//alert("Inside deassociateTokenPolicy .......");	
/*$.ajax({
	type: "POST",  
	url:"admin_deassociateTokenActivationPolicy.action",
    async: false,
	dataType: "text",
	success: function(data) {
		
		//alert("data==="+data)
		if($.trim(data)=="sessionout")
		{
		alert("Session TimeOut...");
		var testVal=document.getElementById('loginPage').value;
		window.location.replace(testVal);
		}
		
		if(data === 'success');
		{
			$('#showDeassociatePolicyButton').html('');
		}
		 
		
		
		
	 }
});*/
	
	  try{
			$.confirm({
		        text: "I have successfully activated my token and ready to the Authshield to login into '"+userAppName+"'",
		        confirm: function(button) {
		        	$.ajax({
				type: "POST",
				url: "admin_deassociateTokenActivationPolicy.action",
				//data: dataString,
				dataType: "text",
				success: function(data){
					data = $.trim(data.toString());
					// alert("data = "+data);
					if($.trim(data)=="sessionout")
					  {
						alert("Session TimeOut...");
						var testVal=document.getElementById('loginPage').value;
						window.location.replace(testVal);
					  }
					 if(data.toString() == 'success')
						 {
						 alert("success");
						 $('#showDeassociatePolicyButton').html('');
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
						