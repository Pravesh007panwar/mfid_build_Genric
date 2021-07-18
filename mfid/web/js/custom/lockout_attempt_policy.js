

function openPolicy(){
	try{

		$('#block_policy_data').html('<span>Loading...</span>');
		$.ajax({
			type: "POST",  
			url: "policy_showAddModifyDeleteLOAPPolicy.action",
			dataType: "text",
			success: function(data) {
				if($.trim(data)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}

				var object = JSON.parse(data);

				var obj1=JSON.parse(object.PolicyList);

				var	content = '<table class="table table-striped table-bordered" id="sample_1">';
				content += '<thead>';
				content += '<tr>';
				content += '<th>Policy Name</th>';
				content += '<th>Number of Attempts</th>';
				content += '<th>Duration of Lock(in min.)</th>';
				content += '<th>Domain</th>';
				content += '<th>Application</th>';
				content += '<th>Action</th>';
				content += '<th>Assign</th>';
				content += '<th style="display: none;"></th>';
				content += '<th style="display: none;"></th>';

				content += '</tr>';
				content += '</thead>';

				if(obj1!=null && obj1!='')
					{
				jQuery.each(obj1, function(i, v) {
					//i = (i+1);
					content += "<tr>";

					content += "<td>"+v.policy_desc+"</td>";
					content += "<td>"+v.number_of_attempts+"</td>";

					content += "<td>"+v.expire_time+"</td>";
					content += "<td>"+v.domain+"</td>";
					content += "<td>"+v.app+"</td>";

					if(v.defaultPolicyFlag==0){
						//content += "<td><a href='javascript:void(0);' class='edit'>Edit</a> </td>";
						content += "<td></td>";
					}
					else{
						content += "<td><a href='javascript:void(0);' class='edit'>Edit</a> | <a href='javascript:void(0);' class='delete'>Delete</a></td>";
					}
					if(v.currentUseFlag!=1)
						content += "<td><a href='javascript:void(0);' class='assign_td' >Assign</td>";
					else 
						content += "<td></td>";
					content += "<td style='display: none;' >"+v.policyId+"</td>";
					content += "<td style='display: none;' >"+v.currentUseFlag+"</td>";


					content += "</tr>";
				});
					}
				/*else
					{
					content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";
					}*/
				content += "</table>";
				content += '<div class="form-actions form-actions2"><button type="button" id="sample_1_addNew" class="btn green">Add New <i class="icon-plus"></i></button></div>';
				$('#block_policy_data').html(content);
				$("#sample_1").css("width","100%");
				oTable = $('#sample_1').dataTable({"bPaginate": false,"bFilter": false,"bSort":false});

			}

		});
	}catch (e) {
		alert(e);
		// TODO: handle exception
	}
}


function showDomainList(multi,id)
{
	try{


		var listData=new Array();
		var listId=new Array();

		$.ajax
		({

			url: 'policy_addPolicyToDomain?pid=-1&policyType=commonPolicy',  
			cache: false,
			dataType:"text",
			async: false,
			success: function(data)
			{
				if($.trim(data)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				var obj=JSON.parse(data);
				var obj1=JSON.parse(obj.domainDescriptionList);
				if(obj1!=null && obj1!='')
					{
				$.each(obj1, function(i,data)
						{


					var messageId=data.domainId;	
					var messageName=data.domainName;		
					listId.push([messageId]);
					listData.push([messageName]);

						});

					}
				document.getElementById(id).options.length = 0;
				var sel = document.getElementById(id);
				//	alert(listData.length);
				var option = '';
				for(var i = 0; i < listData.length; i++) {
					var opt = sel.options;
					if(multi!='true' && i == 0){
						opt[opt.length] = new Option('-select domain-','');
					}
					opt[opt.length] = new Option(listData[i],listId[i]);
					//$('#domain').append('<option value="'+listId[i]+'">'+listData[i]+'</option>').multiselect('rebuild');
					//option +='<option></option>';
				}
			}


		});   

	}
	catch(e){

	}
}

function getApplicationList(app,domain)
{

	try{
		var selectedhDomainName = document.getElementById(domain).value;

		var listData=new Array();
		var listId=new Array();

		$.ajax
		({

			url: 'policy_addPolicyToApp.action?selectedhDomainName='+selectedhDomainName+"&pid=-1&policyType=commonPolicy",  
			cache: false,
			dataType:"text",
			async: false,
			success: function(data)
			{
				if($.trim(data)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				var obj=JSON.parse(data);
				var obj1=JSON.parse(obj.appDescriptionList);
				if(obj1!=null && obj1!='')
					{
				$.each(obj1, function(i,data)
						{

					var messageId=data.domainId;	
					var messageName=data.domainName;
					listId.push([messageId]);
					listData.push([messageName]);

						});
					}
				document.getElementById(app).options.length = 0;
				var sel = document.getElementById(app);
				for(var i = 0; i < listData.length; i++) {
					//var opt = sel.options;
					//opt[opt.length] = new Option(listData[i],listId[i])
					$('#'+app).append('<option value="'+listId[i]+'">'+listData[i]+'</option>').multiselect('rebuild');
				}
				//$('#application').multiselect('refresh');

				//addCheck("appList");
				//var sel = document.getElementById('appList');
			}


		});   

	}
	catch(e){
		alert(e);
	}
}

function save()
{
	var res="";
	dataString="";
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	policyDesc=  document.getElementById("policyDesc").value;
	numberOfAttempts=  document.getElementById("numberOfAttempts").value;
	durationOfLock=  document.getElementById("durationOfLock").value;

	var addTo=document.getElementById("addTo").value;
	var policyDesc_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 349 , added by abhimanyu
	var iChars = "!`#$%^&*()+=-[]\\\';,/{}|\":<>?~";   
	for (var i = 0; i < policyDesc.length; i++)
	{      
		if (iChars.indexOf(policyDesc.charAt(i)) != -1)
		{    
			alert ("Please enter valid policy name");
			return;
		} 
	}
	if(policyDesc=="")
	{
		alert("Please enter policy name.");
		return;
	}
  else if(!$.trim(policyDesc).match(policyDesc_regex))// add code for bug id 349 , added by abhimanyu
	    {
	 	 alert("Please enter valid policy name");
	 	 return;
	    } 
	else if(policyDesc.length>50)
	{
		alert("Policy name length should not be more than 50 character");
		return;
	}
	else if(numberOfAttempts=="")
	{
		alert("Please enter Number of Attempts");
	}
	else if(numberOfAttempts<0)
	{
		alert("Please enter valid Number of Attempts");
	}
	else if(numberOfAttempts.length>5)
	{
		alert("Number of Attempts can not be more than 5 digits");
	}
	else if(isNaN(numberOfAttempts))
	{
		alert("Number of Attempts should be numeric");
	}
	else if(numberOfAttempts==0)
	{
		alert("Entered no of attempts should not be 0");
	}
	else if(durationOfLock=="")
	{
		alert("Please enter Duration of Lockout");
	}
	else if(durationOfLock<0)
	{
		alert("Please enter valid Duration of Lockout");
	}
	else if(durationOfLock.length>5)
	{
		alert("Duration of Lockout can not be more than 5 digits");
	}
	else if(isNaN(durationOfLock))
	{
		alert("Duration of Lockout should be numeric");
	}
	else if(durationOfLock==0)
	{
		alert("Entered duration of lockout should not be 0");
	}
	else if(addTo==""){
		alert("Select Policy Level");
	}

	else{

		var addTo=document.getElementById("addTo").value;

		if(addTo=="domain"){
			domainIds=$("#domain").val();
			if(domainIds== null||domainIds==""){
				alert("Select Doamin");
				return;
			}
			else dataString='policyDesc='+policyDesc+"&numberOfAttempts="+$.trim(numberOfAttempts)+"&durationOfLock="+$.trim(durationOfLock)+"&domainIds="+$.trim(domainIds)+'&csrfPreventionSalt='+strutsToken;

		}
		if(addTo=="App"){
			var appIds=$("#application").val();

			if(appIds== null||appIds==""){
				alert("Select Application");
				return;
			}
			else {
				dataString='policyDesc='+policyDesc+"&numberOfAttempts="+$.trim(numberOfAttempts)+"&durationOfLock="+$.trim(durationOfLock)+"&appIds="+$.trim(appIds)+'&csrfPreventionSalt='+strutsToken;

			}
		}
		dataString +='&addTo='+addTo;
/*	var resExist=checkExist(policyDesc);
	if(resExist.match(/exist/)){
		alert("Policy already Exist")
		return;
	}
	else{*/

		try{
			$.ajax({
				type: "POST",
				url: "policy_createLOAPPolicy.action",
				dataType: "text",
				data: dataString,
				async: false,
				success: function(response){

					//alert(response);
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					res=response;

				}
			});
		}catch(e){alert(e);}


//	}


	}
	return res;
}

function update()
{
	try{
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
		var res="";
		dataString="";
		policyDesc=  document.getElementById("editPolicyDesc").value;

		numberOfAttempts=   document.getElementById("editNumberOfAttempts").value;
		durationOfLock=   document.getElementById("editDurationOfLock").value;
		

		pid=   document.getElementById("pId").value;



		//var addTo=document.getElementById("addTo").value;
		var policyDesc_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 349 , added by abhimanyu
		var iChars = "!`#$%^&*()+=-[]\\\';,/{}|\":<>?~";   
		for (var i = 0; i < policyDesc.length; i++)
		{      
			if (iChars.indexOf(policyDesc.charAt(i)) != -1)
			{    
				alert ("Please enter valid policy name");
				return;
			} 
		}
		if(policyDesc=="")
		{
			alert("Please enter policy name.");
			return;
		}
	else if(!$.trim(policyDesc).match(policyDesc_regex))// add code for bug id 349 , added by abhimanyu
		  {
		 	 alert("Please enter valid policy name");
		 	 return;
		   } 
		else if(policyDesc.length>50)
		{
			alert("Policy name length should not be more than 50 character");
			return;
		}
		else if(numberOfAttempts=="")
		{
			alert("Please enter Number of Attempts");
		}
		else if(numberOfAttempts<0)
		{
			alert("Please enter valid Number of Attempts");
		}
		else if(numberOfAttempts.length>5)
		{
			alert("Number of Attempts can not be more than 5 digits");
		}
		else if(isNaN(numberOfAttempts))
		{
			alert("Number of Attempts should be numeric");
		}
		else if(numberOfAttempts==0)
		{
			alert("Entered no of attempts should not be 0");
		}
		else if(durationOfLock=="")
		{
			alert("Please enter Duration of Lockout");
		}
		else if(durationOfLock<0)
		{
			alert("Please enter valid Duration of Lockout");
		}
		else if(durationOfLock.length>5)
		{
			alert("Duration of Lockout can not be more than 5 digits");
		}
		else if(isNaN(durationOfLock))
		{
			alert("Duration of Lockout should be numeric");
		}
		else if(durationOfLock==0)
		{
			alert("Entered duration of lockout should not be 0");
		}


		else{
			
		/*	var resExist=checkExistEdit(policyDesc);
			if(resExist.match(/exist/)){
				alert("Policy already Exist")
				return;
			}else{*/

			dataString='policyDesc='+policyDesc+"&numberOfAttempts="+$.trim(numberOfAttempts)+"&durationOfLock="+$.trim(durationOfLock)+"&pid="+$.trim(pid)+'&csrfPreventionSalt='+strutsToken;



			$.ajax({
				type: "POST",
				url: "policy_updateLOAPPolicy.action",
				dataType: "text",
				data: dataString,
				async: false,
				success: function(response){

				 	alert(response);
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					res=response;

				}
			});

		//	}




		}
		return res;
	}catch(e){alert(e);}
}


function callReuseFlag()
{
	reuseFlag=   document.getElementById("reuseFlag").value;
	if(reuseFlag=="0"){
		$("#expirationTime").attr("disabled", "disabled"); 
		//$("#expirationTime").attr("value", ""); 
	}
	else $("#expirationTime").removeAttr("disabled"); 
}

function callEditReuseFlag()
{
	reuseFlag=   document.getElementById("editReuseFlag").value;
	if(reuseFlag=="0"){
		$("#editExpirationTime").attr("disabled", "disabled"); 
		$("#editExpirationTime").attr("value", ""); 
		//$("#editExpirationTime").attr("readOnly", "true"); 

	}
	else {
		$("#editExpirationTime").removeAttr("disabled"); 
		expTime=document.getElementById("expireTimeBeforeEdit").value;
		$("#editExpirationTime").attr("value", expTime); 
		//$("#editExpirationTime").attr("readOnly", "false"); 
	}
}

function delete_row()
{
	//var res;
	pid=   document.getElementById("pId").value;
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats

	try{
		$.ajax({
			type: "POST",
			url: "policy_deleteLOAPPolicy.action?pid="+$.trim(pid)+'&csrfPreventionSalt='+strutsToken,
			dataType: "text",
			success: function(response){

			//	alert(response);
				if($.trim(response)=="sessionout"){
					alert("Session Timeout...");
					testVal= document.getElementById('loginPage').value	;			
					window.location.replace(testVal);
				}
				else if($.trim(response)=="success"){
					alert(response);	
					openPolicy();
					}else{
						alert(response);	
					}
				//res=response;

			}
		});
	}catch(e){alert(e);}
	//return res;
}

function assign(){
	var res;
	pid=   document.getElementById("pId").value;
	
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats

	domainName=document.getElementById("domainName").value;
	appName=document.getElementById("appName").value;

	try{
		$.ajax({
			type: "POST",
			url: "policy_assignLOAPPolicy.action?pid="+$.trim(pid)+"&domainName="+$.trim(domainName)+"&appName="+$.trim(appName)+'&csrfPreventionSalt='+strutsToken,
			dataType: "text",
			
			success: function(response){
				if($.trim(response)=="sessionout"){
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				res=response;
			},
			complete : function(response){
				openPolicy();
			}
		});
	}catch(e){alert(e);}
	return res;

}

function addtoTable(){
	try{
		var myUrl="policy_showDomainUnassociatedPolicy.action";
		level=document.getElementById("level").value;
		var domainIds=$("#addto_domain_select").val();
		if(level=="domain"){
			if(domainIds==""||domainIds==null)
			{
			alert("please select the domain...");
			return;
			}
			
			myUrl+="?policyType=lockOutAttemptPolicy&domainIds="+$.trim(domainIds);
		}
		if(level=="application"){
			var appIds=$("#addto_app_select").val();
			if(domainIds==""||domainIds==null)
			{
			alert("please select the domain...");
			return;
			}

			if(appIds==""||appIds==null)
				{
				alert("please select the application...");
				return;
				}

			myUrl+="?policyType=lockOutAttemptPolicy&appIds="+$.trim(appIds);
		}
		$('#block_policy_addTo_data').html('<span>Loading...</span>');

		$.ajax({
			type: "POST",  
			url: myUrl,
			dataType: "text",
			success: function(data) {
			//	alert("data== "+data)
				if($.trim(data)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				var obj = JSON.parse(data);

				var obj1 = JSON.parse(obj.commonPolicyList);
				var content = '<h4>Add To</h4>';
				content += '<table class="table table-striped table-bordered" id="sample_2">';
				content += '<thead>';
				content += '<tr>';
				content += '<th style="width:20px;"><input type="checkbox" data-set="#sample_2 .checkboxes" class="group-checkable"></th>';
				content += '<th>Policy Name</th>';
				content += '<th>Number of Attempts</th>';
				content += '<th>Duration of Lock</th>';
				//content += '<th>Expiration Time</th>';
				//content += '<th>Policy Type</th>';

				content += '</tr>';
				content += '</thead>';
				if(obj1!=null && obj!='')
					{
				jQuery.each(obj1, function(i, v) {
					i = (i+1);
					content += "<tr>";
					content += "<td><input class='checkboxes' name='chkAddPolicy'  type='checkbox' value='"+v.policyId+"'></td>";
					content += "<td>"+v.policy_desc+"</td>";
					content += "<td>"+v.number_of_attempts+"</td>";
					content += "<td>"+v.expire_time+"</td>";
					//	content += "<td>"+v.policy_type+"</td>";
					content += "</tr>";
				});
					}
				/*else
					{
					content += "<tr><td style='text-align: center;' colspan='4' > No Record Found!</td></tr>";
					}*/
				content += "</table>";
				content += '<div class="form-actions form-actions2"><button type="button" onClick="addPolicyToDomainApp()"  class="btn btn-primary">Submit </button></div>';
				$('#block_policy_addTo_data').html(content);
				$("#sample_2").css("width","100%");
				oTable = $('#sample_2').dataTable({"bSort":false});
			}

		});   
	}
	catch (e) {
		alert(e)
		// TODO: handle exception
	}

}

function addPolicyToDomainApp() {
// start code for checkbox validation , Bug ID : 219 , added by abhimanyu	
	  var checkForSelectedCheckBoxValue = "";
	  var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	   $('input[name="chkAddPolicy"]:checked').each(function() {checkForSelectedCheckBoxValue+=this.value; });
	   if($.trim(checkForSelectedCheckBoxValue) == '')
		  {
		    alert("Please select the policy");
		    return false;
		   }
//end code for checkbox validation , Bug ID : 219 , added by abhimanyu
	
	try{
		var myUrl;
		level=document.getElementById("level").value;
		if(level=="domain"){
			var domainIds=$("#addto_domain_select").val();
			myUrl="policy_mapDomainWithLOAPPolicy.action?domainIds="+$.trim(domainIds)+'&csrfPreventionSalt='+strutsToken;
		}
		if(level=="application"){
			var appIds=$("#addto_app_select").val();
			myUrl="policy_mapAppWithLOAPPolicy.action?appIds="+$.trim(appIds)+'&csrfPreventionSalt='+strutsToken;
		}

		var chks=document.getElementsByName('chkAddPolicy');     
		var isChecked=false;
		var id="";
		if(chks.length!=null){

			for(var i=0;i<chks.length;i++)
			{
				if(chks[i].checked)  {  

					id +=  chks[i].value + ",";
					isChecked=true;

				}
			}
		}
		myUrl+="&pid="+id;
		try{
			$.ajax({
				type: "POST",
				url: myUrl,
				dataType: "text",

				success: function(response){

				//	alert(response);
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}

					else if($.trim(response) == "success"){
						addtoTable();
					}
				}
			});
		}catch(e){alert(e);}
	}
	catch (e) {
		alert(e);
		// TODO: handle exception
	}

}


function checkExist(policyDesc) {
	
	var res;
	try{
		$.ajax({
			type: "POST",
			url: "policy_checkExistingLOAP.action?policyDesc="+policyDesc,
			dataType: "text",
		
			async: false,
			success: function(response){
				if($.trim(response)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}

				res=response;

			}
		});
	}catch(e){alert(e);}
return res;
}
function checkExistEdit(policyDesc) {
	var policyDecBeforeEdit=  document.getElementById("policyDecBeforeEdit").value;
	var res;
	try{
		$.ajax({
			type: "POST",
			url: "policy_checkExistingLOAPEdit.action?policyDesc="+policyDesc+"&policyDecBeforeEdit="+policyDecBeforeEdit,
			dataType: "text",
		
			async: false,
			success: function(response){
				if($.trim(response)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}

				res=response;

			}
		});
	}catch(e){alert(e);}
return res;
}

