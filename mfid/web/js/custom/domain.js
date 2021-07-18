


function showDomain(){
	//alert("showDomain");
	$('#block_domain_data').html('<span>Loading...</span>');
	$.ajax({
		type: "POST",  
		url:"admin_showDomain.action",
		
		dataType: "text",
			async: false,
		success: function(data) {
			if($.trim(data)=="sessionout")
				{
				alert(data);
				var testVal=$('#loginPage').val();
				window.location.replace(testVal);
				}
			//alert("data        :"+data);
			var object = JSON.parse(data);
			var obj1 = JSON.parse(object.organisationName);
			var obj2 = JSON.parse(object.domainList);
		
		//	alert("obj1    :"+obj1);
		//	alert("obj2    :"+obj2);
		
			
			var content = '<h4>Domain</h4><div class="space15"></div>';
			content += '<table class="table table-striped table-bordered" id="domain_tbl">';
			content += '<thead>';
				content += '<tr>';
				
					content += '<th>Domain</th>';
					content += '<th>Organization Name</th>';
					content += '<th>Action</th>';
					
				content += '</tr>';
			
			
			content += '</thead>';
			content += '<tbody>';
			try{
				
				if(obj2!=null&&obj2!=''){
			//	alert("obj2       :"+obj2);
				jQuery.each(obj2, function(i, v) {
				//	
			  content += "<tr><td>"+v.domain+"</td><td>"+v.organisation +"</td><td><a class='edit'href='javascript:;'>Edit</a> | <a class='delete' href=''>Delete</a></td></tr>";
				
			 
			});
				}
				/*else
					{
					content += "<tr><td style='text-align: center;' colspan='3' > No Record Found!</td></tr>";
					}*/
				$("#org").val(obj1);
				 content += "</tbody></table><div class='form-actions form-actions2'>";
					content += "<button  class='btn green' id='domain_tbl_new'>Add New <i class='icon-plus'></i></button></div>";
			}
			catch(e){
				alert(e);}
			$('#block_domain_data').html(content);
			$("#domain_tbl").css("width","100%");
			
			oTable =$('#domain_tbl').dataTable(
				 {"bPaginate": true,"bFilter": true,"bSort":true}
					);
			
		}
	
	});

	}



function addDomain(domain)
{

	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
    var dataString='newDomain='+domain+'&csrfPreventionSalt='+strutsToken;
    domain = $.trim(domain);
     
    if(domain.length > 20)
     {
    	alert("Domain name should not be greater than 20 characters.");
    	return true;
     }

$.ajax({
		type: "POST",
		url: "admin_addDomain.action",
		data: dataString,
		dataType: "text",
		//async: false,
		success: function(response){
			
			if($.trim(response)=="sessionout"){
				alert(response);
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			var obj=JSON.parse(response);
			var obj1=JSON.parse(obj.domainList);
			var obj2=JSON.parse(obj.result);
		
			if(obj2 == "success"){
				alert(obj2);
			
						
				if(obj1!=null&& obj1!='')
					{
				
					$("#domainId").html('');
					$('<option value="select">Switch Domain</option>').appendTo($("#domainId"));
				
					$.each(obj1,function(i,v){
					
					 $('<option value="'+v+'">'+v+'</option>').appendTo($("#domainId"));
					
				});
					}
			}
			else{
				alert(obj2);
			}
		}, 
		complete : function(){
			showDomain();
		}
	});
	//return response; // Saurabh
	}



		function deleteDomain(domain)
		{
			//alert("deleteDomain=====");
			
			var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
			var dataString='deleteDomain='+domain+'&csrfPreventionSalt='+strutsToken;
			$.ajax({
					type: "POST",
					url: "admin_deleteDomain.action",
					data: dataString,
					dataType: "text",
					//async: false,
					success: function(response){
						
						if($.trim(response)=="sessionout"){
							alert(response);
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
						var obj=JSON.parse(response);
						var obj1=JSON.parse(obj.domainList);
						var obj2=JSON.parse(obj.result);
					
						if(obj2 == "success"){
							alert(obj2);
						
							showDomain();
							
							if(obj1!=null&& obj1!='')
								{
							
								$("#domainId").html('');
								$('<option value="select">Switch Domain</option>').appendTo($("#domainId"));
							
							$.each(obj1,function(i,v){
								
								 $('<option value="'+v+'">'+v+'</option>').appendTo($("#domainId"));
								
							});
								}
						}
						else{
							alert(obj2);
							return;
						}
						
					}
				});
			//return response; // Saurabh 
				
		}

		
		function updateDomain(oldDomain,updatedDomain)
		{
			var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats

			var dataString='oldDomain='+oldDomain+'&updatedDomain='+updatedDomain+'&csrfPreventionSalt='+strutsToken;
			if(oldDomain==updatedDomain){
				alert("Please enter a different name");
				return;
			}
			
			 if(updatedDomain.length > 20)
		     {
		    	alert("Domain name should not be greater than 20 characters.");
		    	return true;
		     }
			 			
			$.ajax({
					type: "POST",
					url: "admin_updateDomain.action",
					data: dataString,
					dataType: "text",
					//async: false,
					success: function(response){
						
						if($.trim(response)=="sessionout"){
							alert(response);
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
						var obj=JSON.parse(response);
						var obj1=JSON.parse(obj.domainList);
						var obj2=JSON.parse(obj.result);
					
						if(obj2 == "success"){
							alert(obj2);
							
							//showDomain();
							
							if(obj1!=null&& obj1!='')
								{
							
								$("#domainId").html('');
								$('<option value="select">Switch Domain</option>').appendTo($("#domainId"));
							
							$.each(obj1,function(i,v){
								
								 $('<option value="'+v+'">'+v+'</option>').appendTo($("#domainId"));
								
							});
								}
						}
						else
							{
							alert(obj2);
							}
					}, 
					complete : function(){
						showDomain();
					}
				});
			//return response; Saurabh
				
		
		}
