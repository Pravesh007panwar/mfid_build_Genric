function showSuperAdmin()
{
	
$('#block_super_admin_data').html('<span>Loading...</span>');
			$.ajax({
				type: "POST",  
				url:"admin_showSuperAdmin.action",
				data: "{}",
				async: true,
				dataType: "text",
				success: function(data) {
					if($.trim(data)=="sessionout"){
						alert(data);
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}

					var obj = JSON.parse(data);
					var obj1 = JSON.parse(obj.superAdminList);
					
					var content = '<h4>Delete Super Admin</h4><div class="space15"></div>';
					content += '<table class="table table-striped table-bordered" id="super_admin_tbl">';
					content += '<thead>';
						content += '<tr>';
							content += '<th style="width:20px;"><input type="checkbox" class="group-checkable" data-set="#super_admin_tbl .checkboxes" /></th>';
						
							content += '<th>User LogonId</th>';
							content += '<th>Role Name</th>';
							content += '<th>First Name</th>';
							content += '<th>Last Name</th>';
							content += '<th>Email</th>';
							content += '<th>Mobile</th>';
							
						content += '</tr>';
					
						content += '<tr>';
							content += '<th></th>';
							content += '<th>User LogonId</th>';
							content += '<th>Role Name</th>';
							content += '<th>First Name</th>';
							content += '<th>Last Name</th>';
							content += '<th>Email</th>';
							content += '<th>Mobile</th>';
						content += '</tr>';
					content += '</thead>';
					try{
						if(obj!=null && obj!='')
							{
							
							
						jQuery.each(obj1, function(i, v) {
							
					
					  content += "<tr><td><input type='checkbox' class='checkboxes' name='superadmin' value='"+v.userLogonId+"' /></td><td>"+v.userLogonId+"</td><td>"+v.role +"</td><td>"+v.firstName +"</td><td>"+v.lastName+"</td><td>"+v.email +"</td><td>"+v.mobile+"</td></tr>";
					});
							}
					/*	else
							{
							content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";
							}*/
					}
					catch(e){
						//"error==="+alert(e);
						}
					content += "</table><div class='form-actions form-actions2'>";
					content += "<button class='btn btn-primary' type='button' onclick='deleteSuperAdmin()'>Submit</button></div>";
					
					$('#block_super_admin_data').html(content);
					$("#super_admin_tbl").css("width","100%");
					 $('#super_admin_tbl').dataTable()
					  .columnFilter({ sPlaceHolder: "head:after",
						aoColumns: [ null, 
									{ type: "text" },
									{ type: "text" },
									{ type: "text" },
									{ type: "text" },
									{ type: "text" },
									{ type: "text" }
									]
					}); 
				}
			
			});
}


function deleteSuperAdmin()
{
	
	var chks=document.getElementsByName('superadmin');   
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	var isChecked=false;
	var id="";
	if(chks.length!=null){

		for(var i=0;i<chks.length;i++)
		{
			if(chks[i].checked)  {  
				id += "'"+ chks[i].value + "',";
				isChecked=true;

			}
		}
	}
	if(isChecked==false)
	{
		alert("Please select Super Admin to delete");
		return;
	}
	else{
		id=id.substring(0,id.length-1);
    	dataString='userIds='+id+'&csrfPreventionSalt='+strutsToken;
		 $.confirm({
		        text: "Warning!! Are you sure that you wish to delete the Super Admin. Please note that deleting a Super Admin is a major operation. Please be absolutely sure before proceeding. Do you want to continue.",
		        confirm: function(button) {
		        	$.ajax({
		        		type: "POST",
		        		url: "admin_deleteSuperAdmin.action",
		        		data: dataString,
		        		dataType: "text",
		        		success: function(response){
		        			
		        			
		        			if($.trim(response)=="sessionout"){
		        				alert(response);
		        				testVal= document.getElementById('loginPage').value				
		        				window.location.replace(testVal);
		        			}
		        			else	if($.trim(response) == "success"){
		        							alert(response);
		        							showSuperAdmin();
		        						}
		        					
		        		}
		        	});
		        },
		        cancel: function(button) {
		            return;
		        }
		    });
	
	}

	}

