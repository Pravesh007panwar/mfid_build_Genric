var count;
 
function fetchTransactionDetails()
{
 //alert("fetchTransactionDetails")	;
	var content='';
	var mappingAppTypeName = '';
	mappingAppTypeName = getMappingAppTypeName();
	//alert("mappingAppTypeName "+mappingAppTypeName);
	if($.trim(mappingAppTypeName) == 'No Transaction Found' || $.trim(mappingAppTypeName) == '')
		content += '<br /><b> No Transaction Found </b>';
	else
	{	
	content += '<br />';
	//content +='<button class="btn btn-primary" style="margin-top:5px !important;" type="button" data-target="" data-toggle="modal" onclick="openPopupforAdd()" id="show_new_add">'+mappingAppTypeName+' +</button>';
	content +='<div class="btn-group"><button class="btn btn-primary" style="margin-top:5px !important;" type="button" data-target="" data-toggle="modal" onclick="openPopupforAdd()" id="show_new_add">'+mappingAppTypeName+'   <i class="icon-plus"></i></button></div>';
	content += '<br />';
	}
	
	 $('#showNewAppAdd').html(content);		 
	
showTransactionMappingList()
}



function getMappingAppTypeName()
{ // alert("getMappingAppTypeName");
    var result='';
	var appName = $("#sapAppId").val();	
	var dataString='appName='+appName;
	$.ajax({
			type: "POST",
			async:false,
			url: "admin_getMappingAppType.action",
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
				//alert("response ="+response);
				result =   response;
			} 
		 
	 
		});
	return result
}



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
{ 	var appName = $("#sapAppId").val();
	// alert("showTransactionMappingList");
	$.ajax({
		type:"POST",
		url:"admin_getAppTransactionMapping.action?appName="+appName,
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
				content += '<th>Transaction</th>';
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
									    content += "<td>" + val.transaction+"</td>";
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



function openPopupforAdd()
{
	//alert("new Add");
	$("#transactionData").val('');
	$('#show_new_add').attr("data-target","#myModal1");

}








function addAppTransaction()
{
	var appName = $("#sapAppId").val();
	var transactionName = $("#transactionData").val();
	
	//alert("appName = "+appName);
	
	if(transactionData == '' || $.trim(transactionData) == '')
		alert("Please enter transaction");
	else
		{
		var dataString='appName='+appName+'&transactionName='+transactionName;
		$.ajax({
				type: "POST",
				async:true,
				url: "admin_addAppTransaction.action",
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
						 $('#myModal1').modal('hide')
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
				url: "admin_deleteAppTransaction.action",
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
 
 


 

