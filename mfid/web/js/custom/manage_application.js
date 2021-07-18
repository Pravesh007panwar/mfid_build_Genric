
var oTable_app;
var appId,roleId;
function showDomainList(app,role){
	appId=app;
	roleId=role;
	$('#block_application_data').html('<span>Loading...</span>');
	$.ajax({
		type: "POST",  
		url:"admin_showDomainList",
		data: "{}",
		async: true,
		dataType: "text",
		success: function(data) {
			if($.trim(data)=="sessionout")
			{
			alert(data);
			var testVal=$('#loginPage').val();
			window.location.replace(testVal);
			}
			try{
			var object = JSON.parse(data);
			
			}
			catch (e) {
				//alert(e)
				// TODO: handle exception
			}
			var obj1=JSON.parse(object.domainList);
			
			var content = '<h4>Application</h4><div class="space15"></div>';
			content += '<div class="row-fluid new_filter">';
			content += '<div class="span6">';
			content += '<div class="pull-left" id="switch_app">';
			content += '<label>Domain</label>';
			content += '<select id="selectedDomain" onchange="showApplicationList();">';
			
			content += '<option value="">-select domain-</option>';
			if(obj1!=null&&obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				var temp=obj1[i];
				
				content += '<option value="'+temp+'" >'+temp+'</option>';
			});
				}
			content += '</select>';
			content += '</div>';
			content += '</div>';
			content += '</div>';
			content += '<div id="myDiv"><table class="table table-striped table-bordered" id="application_tbl">';
			content += '<thead>';
			content += '<tr>';
			content += '<th>Application Id</th>';
			content += '<th>Application Name</th>';
			content += '<th>Action</th>';

			content += '</tr>';

	
			content += '</thead>';
		
		/*	content += "</table></div><div class='form-actions form-actions2'>";
			content += "<button class='btn green' id='application_tbl_new'>Add New <i class='icon-plus'></i></button></div>";*/
			
			content += "</table></div>";

			$('#block_application_data').html(content);
			$("#application_tbl").css("width","100%");
			
			oTable_app = $('#application_tbl').dataTable();

		}

	});
}

function showApplicationList(){
	
	var domain=document.getElementById('selectedDomain').value;  
	$.ajax({
		type: "POST",  
		url:"admin_showApplicationList?domainName="+domain,
		data: "{}",
		async: true,
		dataType: "text",
		success: function(data) {
			
			if($.trim(data)=="sessionout")
			{
			alert(data);
			var testVal=$('#loginPage').val();
			window.location.replace(testVal);
			}
			
			try{
			var object = JSON.parse(data);
			
			}
			catch (e) {
				//alert(e)
				// TODO: handle exception
			}
			var obj1=JSON.parse(object.appList);
			
			var content = '<table class="table table-striped table-bordered" id="application_tbl">';
			content += '<thead>';
			content += '<tr>';
			content += '<th>Application Id</th>';
			content += '<th>Application Name</th>';
			content += '<th>Action</th>';

			content += '</tr>';

	
			content += '</thead>';
			if(obj1!=null && obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				if(v.appId==appId||v.appName=='defaultApp'||roleId==4){
					content += "<tr><td>"+v.appId+"</td><td>"+v.appName +"</td><td></td></tr>";
				}
				else 
				content += "<tr><td>"+v.appId+"</td><td>"+v.appName +"</td><td><a class='edit' href='javascript:;'>Edit</a> | <a class='delete' href=''>Delete</a></td></tr>";
			});
				}
			if(roleId!=4)
			if(domain.length!=0){
			content += "</table><div class='form-actions form-actions2'>";
			content += "<button class='btn green' type='button' id='application_tbl_new'>Add New <i class='icon-plus'></i></button></div>";
			}
			
			//content += "<button class='btn green' id='application_tbl_new'>Add New <i class='icon-plus'></i></button></div>";

			$('#myDiv').html(content);
			$("#application_tbl").css("width","100%");

			oTable_app = $('#application_tbl').dataTable({"aaSorting": [[1,'asc']]});

		}

	});

}

function addApp(appName){
var res;
var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
var domain=document.getElementById('selectedDomain').value;  
appName = $.trim(appName);
if(appName.length > 20)
{
	alert("Application name should not be greater than 20 characters.");
	return true;
}
dataString='newAppName='+appName+"&domainName="+domain+'&csrfPreventionSalt='+strutsToken;

$.ajax({
	type: "POST",
	//async: false,
	url: "admin_addApplication.action",
	data: dataString,
	dataType: "text",
	success: function(response){
		
		if($.trim(response)=="sessionout"){
			alert(response);
			testVal= document.getElementById('loginPage').value				
			window.location.replace(testVal);
		}
		var obj=JSON.parse(response);
		var obj1=JSON.parse(obj.appList);
		var obj2=JSON.parse(obj.result);
	    res=obj2;
		if (obj2 == "success") {
			alert(obj2);

			// showApplicationList();

			if (obj1 != null && obj1 != '') {

				$("#appId").html('');
				$('<option value="select">-Switch Application-</option>')
						.appendTo($("#appId"));

				$.each(obj1, function(i, v) {

					$('<option value="' + v + '">' + v + '</option>')
							.appendTo($("#appId"));

				});
			}
			checkRow = false;
			newRow = false;

		} else {
			alert(obj2);
			newRow=true;
			checkRow=false;
		}
	}, 
	complete: function() {
		//alert('hi');
		showApplicationList();
	}
});
return res;
}

function updateApp(appToEdit){
	try{
		
   var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	
	var editedApp=document.getElementById('editApp').value; 
	
	if(appToEdit==editedApp){
		alert("Please enter a different name");
		return;
	}
	editedApp = $.trim(editedApp);
	if(editedApp.length > 20)
	{
		alert("Application name should not be greater than 20 characters.");
		return true;
	}
	
	var domain=document.getElementById('selectedDomain').value;  
	dataString='newAppName='+editedApp+"&domainName="+domain+"&appToEdit="+appToEdit+'&csrfPreventionSalt='+strutsToken;
	$.ajax({
		type: "POST",
		url: "admin_updateApplication.action",
		data: dataString,
		dataType: "text",
		//async: false,
		success: function(response){
			
			if($.trim(response)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			if($.trim(response)=="Enter application name"||$.trim(response)=="Please enter a different name"){
				
				alert(response);
				return;
			}
			var obj=JSON.parse(response);
			var obj1=JSON.parse(obj.appList);
			var obj2=JSON.parse(obj.result);
		    res=obj2;
			if(obj2 == "success"){
				alert(obj2);
			
		        showApplicationList();
				
				if(obj1!=null&& obj1!='')
					{
					$("#appId").html('');
					$('<option value="select">-Switch Application-</option>').appendTo($("#appId"));
				
					$.each(obj1,function(i,v){
						$('<option value="'+v+'">'+v+'</option>').appendTo($("#appId"));
					
				});
					}
			}
			else{
				alert(obj2);
			}
		}
	});
	}
	catch (e) {
		//alert(e);
		// TODO: handle exception
	}
	
}

function deleteApp(appToDelete){
	try{
		
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	
		$.trim(appToDelete)
	
	
	dataString='appIdToDelete='+appToDelete+'&csrfPreventionSalt='+strutsToken;
	$.ajax({
		type: "POST",
		
		url: "admin_deleteApplication.action",
		data: dataString,
		dataType: "text",
		//async: false,
		success: function(response){
			
			if($.trim(response)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			var obj=JSON.parse(response);
			var obj1=JSON.parse(obj.appList);
			var obj2=JSON.parse(obj.result);
		    res=obj2;
			if(obj2 == "success"){
				alert(obj2);
			
		        showApplicationList();
				
				if(obj1!=null&& obj1!='')
					{
				
					$("#appId").html('');
					$('<option value="select">Switch Application</option>').appendTo($("#appId"));
				
				$.each(obj1,function(i,v){
					
					 $('<option value="'+v+'">'+v+'</option>').appendTo($("#appId"));
					
				});
					}
			}
			else{
				alert(obj2);
				return;
			}
		}
	});
	}
	catch (e) {
		//alert(e);
		// TODO: handle exception
	}
	
}