var count;
 

function showTransaction()
{ //alert("showSapTransaction -------");
 
			var content='';
			content += '<div class="span3 offset0" id="switch_app">';
			content += '<label>Application Type </label>';
			content += '<select id="appType">';
			content += ' <option>Select Type</option>';
			content += '<option>SAP</option>';
			content += '<option>MYSQL</option>';
			content += '</select>';
			content += '</div>';
			
			content += '<div class="span3 offset0">';
			content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="addTransaction()" />';
			content += '</div>';
			content += '<div class="clear"></div>';
			content += '</div>';
 $('#showAppType').html(content);							
	 
	
	
 showTransactionMappingList();
	
	
	
}




function showTransactionMappingList()
{ 
	// alert("showTransactionMappingList");
	$.ajax({
		type:"POST",
		url:"admin_getTransactionMapping.action",
		async:true,
		dataType:"text",
		success:function(data)
		{
			//	alert("data    "+data);
			
			 if($.trim(data)=="sessionout"){
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
			    var obj=JSON.parse(data);
				var obj1=JSON.parse(obj.transactionList);
				 
				
				 var content = '';
				content += '<table class="table table-striped table-bordered" id="sample_4">';
				content += '<thead>';
				content += '<tr>';
				content += '<th>Sr.No.</th>';
				content += '<th>App Name</th>';
				content += '<th>App Type</th>';
				content += '<th>Action</th>';
				content += '</tr>';
			   content += '</thead>';
				 
				 if (obj1 != null && obj1 != '') {
				var counter=0;
					jQuery
							.each(
									obj1,
									function(ind, val) {
										counter++;
										content += "<tr>";
									    content += "<td>"+counter+"</td>";
										content += "<td>" + val.appName+"</td>";
									    content += "<td>" + val.appType+"</td>";
									    content += "<td>  <button type='button' class='btn btn-danger buttonTrn'  onclick='deleteTransaction("+val.transactionId+")' >Delete</button></td>";
										content += "</tr>";
									
									});

					content += "</table>";
					$('#user_sap_transaction').html(content);
				 
				 } else {
					//content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
					$('#user_sap_transaction').html('');
				}
				 
				 
				 	
		}
	
	});
	
	
	
}












function addTransaction()
{
	var appName = $("#sapAppId").val();
	var appType = $("#appType").val();
	
	//alert("appName = "+appName);
	
	if($.trim(appName)== 'Select Application' || $.trim(appName)== 'select')
		alert("Please select Application");
	else if($.trim(appType)== 'Select Type')
		alert("Please select Application Type");
	else
		{
		var dataString='appName='+appName+'&appType='+appType;
		$.ajax({
				type: "POST",
				async:true,
				url: "admin_addTransaction.action",
				data: dataString,
				 dataType: "text",
				success: function(response){
					//alert(response);
					if($.trim(response)=="sessionout")
	 				{
	 				alert("Session Timeout...");
	 				var testVal=document.getElementById("loginPage").value;
	 				window.location.replace(testVal);
	 				}
					else if($.trim(response) == "success"){
						
						alert("success");
						showTransactionMappingList();
						 $("#sapAppId").val('');
						$("#appType").val('');
					}
					else
					{
						alert(response);
					}
				} 
			 
		 
			});
		
		
		
		
		}
}
 

 

function deleteTransaction(transactionId)
{
	  var dataString='transactionId='+transactionId;
		$.ajax({
				type: "POST",
				async:true,
				url: "admin_deleteTransaction.action",
				data: dataString,
				 dataType: "text",
				success: function(response){
					//alert(response);
					if($.trim(response)=="sessionout")
	 				{
	 				alert("Session Timeout...");
	 				var testVal=document.getElementById("loginPage").value;
	 				window.location.replace(testVal);
	 				}
					else if($.trim(response) == "success"){
						
						alert("success");
						showTransactionMappingList();
					}
					else
					{
						alert(response);
					}
				} 
			 
		 
			});
		
		
		
		
		}
 
 


 

