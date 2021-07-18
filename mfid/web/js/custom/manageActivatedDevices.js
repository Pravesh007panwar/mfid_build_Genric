 	 function showManageActivatedData()
	 {
				// alert("Inside showManageActivatedData");
			try{
		
			
			//dataString='userIds='+userId;
			
		
			try{
			$.ajax({
				type: "POST",
				url: "admin_getManageActiveDeviceData.action",
				//data: dataString,
				dataType: "text",
				success: function(data){
					//alert("data = "+data);
					if($.trim(data)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}					 
					 
					var object1 = JSON.parse(data);
					//alert("2");
					var deviceDetails  = JSON.parse(object1.deviceDetails);;
				//	alert("3");
					 
					 
					 // alert("object1 = "+deviceDetails);
					  
					 
					  var	content = '<div class="container" style="width:100% !important;" >';
					 	content += '<table  class="table table-bordered " id="sample_editable_1" style="width:100% !important;">';
						content += '<thead>';
							content += '<tr style="background:#fff;">';
								content += '<td ><input type="checkbox" class="group-checkable" data-set="#sample_editable_1 .checkboxes" style="width:auto;" /></td> ';
								content += '<td><b>Sr No</b></td>'; 
								content += '<td ><b> Device Name</b></td>'; 
								content += '<td ><b> Device Id</b></td>'; 
								content += '<td ><b> Activation Time</b></td>'; 
							    content += '</tr>';
					  var counter = 1;	 
					  if(deviceDetails != null && deviceDetails !='')
						  {
						jQuery.each(deviceDetails, function(i, v) {
							
						    if(v.mobileType == 'iphone')
								v.mobileType = 'Iphone'
							else if(v.mobileType == 'androidGCM')
								v.mobileType = 'Android'		
							content += "<tr>" +
									"<td><input type='checkbox' id='activedevice' class='checkboxes' value='"+v.deviceId+"' style='width:auto;' /></td>" +
											"<td>"+counter+"</td>" +
													"<td>"+v.mobileType+"</td>" +
													"<td>"+v.deviceId+"</td>" +
													"<td>"+(v.activationTime).replace(".0", "")+"</td>" 
															"</tr>";
							counter++;
						});
						
						  }
					  else
						  {
						  content +='<td valign="top" colspan="5" class="dataTables_empty"><center>No Device Activate </center> </td>';
						  }
					
						content += "</table>";
						//content += '</div>';
						 content += '<div class="clearfix"/>';
					 	content += '<div class="form-actions form-actions2">';
					 	content += '<div class="pull-left">';
					 	content += '<div class="pull-left">';
							content += '<div class="btn-group">';
								content += '<button id="sample_editable_1_multi_delete" type="button" onclick="deviceDeleteTest()" class="btn btn-primary" >De-Register <i class="icon-remove"></i></button>';
							content += '</div>'; 
						content += '</div></div></div>';
				/*		content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="pull-left">';
					 
							content += '<div class="btn-group">';
								content += '<button id="sample_editable_1_new" class="btn green">Add New <i class="icon-plus"></i></button>';
							content += '</div>';
							content += '<div class="btn-group">';
								content += '<button id="sample_editable_1_multi_delete" type="button" class="btn green">Delete <i class="icon-remove"></i></button>';
							content += '</div>'; 
						content += '</div>';
						*/
					
					
					
					
					
					
					
					
				
					 
					//alert(contents);
					$('#showManageActivatedDeviceData').html(content);
					 
				}
			});
			}catch(e){alert(e);}
		}catch (e) {
			alert(e);
			// TODO: handle exception
		}
		}
 	 
 	 
 function deRegisterDevice(id)
 {
	 //alert("globalSecureToken = "+globalSecureToken);
	  //alert("deRegisterDevice .........."+id);
	  var dataString = "deviceName="+id+'&token='+globalSecureToken;
	  try{
			$.confirm({
		        text: "Warning!! Are you sure that you wish to De-Register the Devices. Please note that If you De-Register the Devices then users will not be able to get notification on their devices. Please be absolutely sure before proceeding. Do you want to continue.",
		        confirm: function(button) {
		        	$.ajax({
				type: "POST",
				url: "admin_deRegisterDevice.action",
				data: dataString,
				dataType: "text",
				success: function(data){
					data = $.trim(data.toString());
					// alert("data = "+data);
					 if(data.toString() == 'true' || data.toString() == 'Your request is not processed , duplicate request detected.')
						 {
						 alert("success");
						 //showManageActivatedData();
					
						 }
					 location.reload();
					
					 
					 
				}
			});
		        },
		        cancel: function(button) {
		            return;
		        }
		    });
		}catch(e){alert(e);}
		 
 }
 
 


 	 
 	 