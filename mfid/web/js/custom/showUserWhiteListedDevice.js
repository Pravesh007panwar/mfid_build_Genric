function getUserWhiteListedDevice(){
	$.ajax({
		type : "POST",
		url : "admin_getUserWhiteListedDevice.action",
		async : true,
		dataType : "text",
		success : function(data) {
			 if($.trim(data)=="sessionout"){
					alert(data);
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
			} else {
			try{
				var object = JSON.parse(data);
				var whiteListedDeviceList = JSON.parse(object.whiteListedDeviceVOList);
			
			var content = '<div class="tab-content "><table  class="table table-bordered " id="sample_editable_1" style="width:100% !important;">'
			content += '<thead>';
			content += '<tr style="background:#fff;">';
			content += '<td><b>Sr No</b></td>'; 
			content += '<td ><b> User LogonId</b></td>'; 
			content += '<td ><b> Device</b></td>'; 

			content += '</tr>';
			var counter = 1;	 
			if(whiteListedDeviceList != null && whiteListedDeviceList !='')
			{
			jQuery.each(whiteListedDeviceList, function(i, v) {


			content += "<tr>" +
			
			"<td>"+counter+"</td>" +
						
			"<td>"+(v.userLogonId)+"</td>" +
			"<td>"+(v.device)+"</td>" +
			"</tr>";
			counter++;
			});

			}
			else
			{
			content +='<td valign="top" colspan="4" class="dataTables_empty"><center>No Record Found! </center> </td>';
			}

			content += "</table>";
			//content += '</div>';
			 
			content += '</div></div>';
			
			 $('#whiteListedBlock').html(content);
			} catch(e) {
				
			}
			
		   }
		}
	});
}