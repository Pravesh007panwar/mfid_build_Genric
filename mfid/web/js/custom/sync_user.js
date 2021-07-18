
var count;

function getPageData_syncUser() {

	var size = document.getElementById('pageId_syncUser').value;
	var totalPages =  $('#pageN_syncUser').text();
	var pageNumber = document.getElementById('pageNum_syncUser').value;
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showSyncUser(true);
	else
		alert('Page should be less than or equal to page number.');

}

	
	function fetchSize_syncUser() {
	var size = document.getElementById('pageId_syncUser').value;
	
	if ($.trim(size) != '') {
		var maxSize = count;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(count==0){
			$('#pageNum_syncUser').val(0);
		} else{
			$('#pageNum_syncUser').val(1);
			$('#pageNum_syncUser').attr("disabled",false);
		} 				
		$('#pageN_syncUser').html(parseInt(maxPgaeNumber));

		/*document.getElementById('pageNum_syncUser').options.length = 1;
		var page = document.getElementById('pageNum_syncUser');

		var pageOpt = page.options;

		for (var i = 1; i < maxPgaeNumber; i++) {

			pageOpt[pageOpt.length] = new Option(i, i);
		}*/
	} else
		$('#pageNum_syncUser').val(1);
}

var globalSyncUserPreviouspageSize="";
var globalSyncUserPreviousPageNum="";
function showSyncUser(pageCall){
	
    if($("#pageId_syncUser").length)
       {
    	globalSyncUserPreviouspageSize=$("#pageId_syncUser").val();
    	globalSyncUserPreviousPageNum=$("#pageNum_syncUser").val();
       }
	
	var myUrl = "admin_showSyncUserPage.action";
		
	if(pageCall)
		{
		
		try{
		var size=document.getElementById('pageId_syncUser').value;
		var pageNumber=document.getElementById('pageNum_syncUser').value;
		}
		catch (e) {
			//alert(e)
			// TODO: handle exception
		}
							
		myUrl+="?fetchSize="+size+"&pagination=true&pageNumber="+pageNumber+"";	
		
	//	myUrl+="&userLogonId=testuser3&firstName=user&lastName=user&mobile=995376505&mail="
		
		}
	
	$('#userSync_data').html('<span>Loading...</span>');
	$.ajax({
		type: "POST",  
		url: myUrl,
		data: "{}",
		dataType: "text",
		async: true,
		
		success: function(data) { 
		//alert("data--- "+data)
			if($.trim(data)=="sessionout")
			{
			alert("sessionout");
			var testVal=document.getElementById('loginPage').value;
			window.location.replace(testVal);
			}
			else if($.trim(data)=="Server is busy.Try again later!"||$.trim(data)=="No users to synchronise." || $.trim(data)=="Connection timeout / Wrong credentials. Try again later!" || $.trim(data)=="Data source not valid for sync." || $.trim(data)=="Unable to sync users"){
				alert($.trim(data));
				$('#userSync_data').html('');
				return;
			}
			
		var obj = JSON.parse(data);
		var obj1 = JSON.parse(obj.count);
		var obj2 = JSON.parse(obj.syncDetail);
		//alert("obj2-->"+obj1);
		count = obj1;
				
		var content = '<div class="row-fluid new_filter">';
		content += '<div class="span6">';
			content += '<div class="pull-left" id="switch_app">';
			content += '<label>Size</label>';
			content += '<select id="pageId_syncUser" onChange="fetchSize_syncUser(),getPageData_syncUser();" name="deassociationReasonListName" style="width:100%;">';
			content += '<option value="">Select Size</option>';
			content += '<option value="10">10</option>';
			content += '<option value="20">20</option>';
			content += '<option value="50">50</option>';
			content += '<option value="100">100</option>';
			content += '<option value="200">200</option>';
			content += '<option value="500">500</option>';
			// start code for bug id no #320 , added by abhimanyu
			content += '<option value="1000">1000</option>';
			content += '<option value="2000">2000</option>';
			content += '<option value="5000">5000</option>';
			// end code for bug id no #320 , added by abhimanyu
			
			content += '</select>';

			content += '</div>';
			content += '</div>';
			content += '<div class="span6">';
			content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
			content += '<label>Page Number</label>';
			content += '<input type="text" id="pageNum_syncUser" style="width:20%;background-color:white;" onChange="getPageData_syncUser()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_syncUser"></span>';
			/*content += '<select onChange="getPageData_syncUser()" id="pageNum_syncUser"  >';
			content += '<option value="">-select Page-</option>';
			content += '</select>';*/
			content += '</div>';
		content += '</div>';
		content += '</div>';
				
			 content += '<div class="row-fluid">'
				content += '<div class="span6">';
				content += '<h4>Sync User</h4>';
				content += '</div>';
				content += '</div>';
				
					
				content += '</div><table class="table table-striped table-bordered" id="sample_4">';
				content += '<thead>';
					content += '<tr>';
						//content += '<th  style="width:20px;"><input type="checkbox" class="group-checkable" data-set="#sample_4 .checkboxes" /></th>';
						content += '<th>User LogonId</th>';
						content += '<th>Insert</th>';
						content += '<th>Update</th>';
						content += '<th>Delete</th>';
						content += '<th>First Name</th>';
						content += '<th>Last Name</th>';
						content += '<th>Email</th>';
						content += '<th>Mobile</th>';
					content += '</tr>';
				
					/*content += '<tr>';
						//content += '<th></th>';
						content += '<th>User LoginId</th>';
						content += '<th>Insert</th>';
						content += '<th>Update</th>';
						content += '<th>Delete</th>';
						
						content += '<th>First Name</th>'; 
						content += '<th>Last Name</th>';
						content += '<th>Email</th>';
						content += '<th>Mobile</th>';
					content += '</tr>';*/
				content += '</thead>';
				try{
					if(obj2!=null&&obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
				//var temp=v.userId;
					var ins_img='<img src="../mfid/web/img/close.png" alt="" style="max-width:25px"/>';
					if(v.insert=='true'){
						ins_img='<img src="../mfid/web/img/check_list.png" alt="" style="max-width:25px"/>';
					}
					
					var upd_img='<img src="../mfid/web/img/close.png" alt="" style="max-width:25px"/>';
					if(v.update=='true'){
						upd_img='<img src="../mfid/web/img/check_list.png" alt="" style="max-width:25px"/>';
					}
					
					var del_img='<img src="../mfid/web/img/close.png" alt="" style="max-width:25px"/>';
					if(v.isdelete=='true'){
						del_img='<img src="../mfid/web/img/check_list.png" alt="" style="max-width:25px"/>';
					}
					
				content += "<tr><td>"+v.userName+"</td><td>"+ins_img+"</td><td>"+upd_img+"</td><td>"+del_img +"</td><td>"+v.firstName+"</td><td>"+v.lastName +"</td><td>"+v.email +"</td><td>"+v.mobile +"</td></tr>";
				});
				}
					
				else {
					content += "<tr><td style='text-align: center;' colspan='11' > No Record Found!</td></tr>";
				}
				}
				catch(e){
			
				}
				
				content += "</table>";
				content += '<div class="row-fluid"><div class="span6">';
				content += '<div class="pull-right" id="switch_app">';
				
				content += '</div></div>';
			content += '</div>';
				content += '<div class="form-actions form-actions2">';
				content += '<button class="btn btn-primary" onclick="syncUsers()"  type="button">Submit</button>';
				content += '</div></div>';
				//alert("content------ "+content)
			$('#userSync_data').html(content);
			/*$('#sample_4').dataTable()
				.columnFilter({ sPlaceHolder: "head:after",
				aoColumns: [ null, 
							{ type: "text" },
							{ type: "text" },
							{ type: "text" },
							{ type: "text" },
							{ type: "text" },
							{ type: "text" },
							{ type: "text" },
							{ type: "text" }
							]
			});*/
			 // start code for Bug #122 , Added by Abhimanyu
			 if($.trim(globalSyncUserPreviouspageSize) != '')
		      {  $("#pageId_syncUser").val(globalSyncUserPreviouspageSize);
		         fetchSize_syncUser();
		         $("#pageNum_syncUser").val(globalSyncUserPreviousPageNum);
		      }
			 
			 if(pageCall==false){
					var maxPgaeNumber = count / 10;
					var rem = count % 10;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN_syncUser').html(parseInt(maxPgaeNumber));
					if(count == 0)
						$('#pageNum_syncUser').val(0);
					else 
						$('#pageNum_syncUser').val(1);
		     }
		//end code for Bug #122	
		}
	});
	
}
	
	function syncUsers(){
		
		try{
			var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
		$.confirm({
	        text: "Unmatched users will be Deleted. Do you want to continue?",
	        confirm: function(button) {
	        	

	    		$.ajax({
	    			type: "POST",
	    			url: "admin_syncUsers.action?csrfPreventionSalt="+strutsToken,
	    			dataType: "text",
	    			
	    			success: function(response){
	    				
	    				
	    			//	resVal=response;
	    				if($.trim(response)=="sessionout"){
							alert(response);
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
	    				else if($.trim(response) == "success"){
	    					$('#userSync_data').html('');
	    					alert(response);
	    				 //showSyncUser(false);
	    					//showManageUser(false);
	    				}
	    				else{
	    					alert(response);
	    				}
	    			}
	    		});
	    		
	return false;
	        },
	        cancel: function(button) {
	            return;
	        }
	    });
		}
		catch(e)
		{
			//alert(e);
		}
		
		
	}