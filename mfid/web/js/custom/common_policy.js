




function openPolicy(){
	
	try{
		
		$('#block_policy_data').html('<span>Loading...</span>');
		$.ajax({
			type: "POST",  
			url: "policy_showAddModifyDeletePolicy.action",
			dataType: "text",
			success: function(data) {
				if($.trim(data)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				var object = JSON.parse(data);
				//alert("data=== "+data)
				var obj1=JSON.parse(object.commonPolicyList);
				//	var obj2=JSON.parse(object.roleList);
				//	var obj3=JSON.parse(object.count);
				//	var content = '<h4>Policy</h4>';
				var	content = '<table class="table table-striped table-bordered" id="sample_1">';
				content += '<thead>';
				content += '<tr>';
				content += '<th>Policy Name</th>';
				content += '<th>Reuse Flag</th>';
				content += '<th>Expiration Time( in min.)</th>';
				content += '<th>Policy Type</th>';
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
					content += "<td>"+v.reuse_flag+"</td>";
					content += "<td>"+v.expire_time+"</td>";
					content += "<td>"+v.policy_type+"</td>";
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
				else
					{
					content += "<tr><td style='text-align: center;' colspan='8' > No Record Found!</td></tr>";
					}
				content += "</table>";
				content += '<div class="form-actions form-actions2"><button type="button" id="sample_1_addNew" class="btn green">Add New <i class="icon-plus"></i></button></div>';
				$('#block_policy_data').html(content);
				$("#sample_1").css("width","100%");
				if(obj1!=null && obj1!='')
				{
					oTable = $('#sample_1').dataTable({"bPaginate": false,"bFilter": false,"bSort":false});
				}

			}

		});
	}catch (e) {
		alert(e);
		// TODO: handle exception
	}
}


function showDomainList(multi,id)
{
	//alert("show domain list");
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
		//alert("selectedhDomainName==="+selectedhDomainName);
		if(selectedhDomainName==""){
			alert("Please select domain");
			return;
		}
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
				if(obj1!=null&& obj1!='')
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
{//	alert("save");
	var res="";
	dataString="";
	
	policyDesc=  document.getElementById("policyDesc").value;

	reuseFlag=   document.getElementById("reuseFlag").value;
	 
	expirationTime=  document.getElementById("expirationTime").value;
	policyType=   document.getElementById("policyType").value;
	var addTo=document.getElementById("addTo").value;
	var policyDesc_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 349 , added by abhimanyu
 	var iChars = "!`#$%^&*()+=-[]\\\';,/{}|\":<>?~";   
 	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	for (var i = 0; i < policyDesc.length; i++)
	{      
		if (iChars.indexOf(policyDesc.charAt(i)) != -1)
		{    
			alert ("Please enter valid description");
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
	else if(reuseFlag==1&&expirationTime==0){

		alert("Please enter valid Expiration time except 0");
		return;
	}
	else if(expirationTime.length>5)
	{
		alert("Expiration time can not be more than 5 digits");
	}
	else if(isNaN(expirationTime))
	{
		alert("Expiration time should be numeric");
	}
	else if(reuseFlag==1&&expirationTime==0){

		alert("Entered expiration time should not be 0");
	}
	else if(policyType=="")
	{
		alert("Select Policy Type");
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
			else dataString='policyDesc='+policyDesc+"&reuseFlag="+reuseFlag+"&expirationTime="+expirationTime+"&policyType="+policyType+"&domainIds="+$.trim(domainIds)+"&csrfPreventionSalt="+strutsToken;

		}
		if(addTo=="App"){
			var appIds=$("#application").val();
			//alert("appIds===== "+appIds)
			if(appIds== null||appIds==""){
				alert("Select Application");
				return;
			}
			else {
				dataString='policyDesc='+policyDesc+"&reuseFlag="+$.trim(reuseFlag)+"&expirationTime="+$.trim(expirationTime)+"&policyType="+$.trim(policyType)+"&appIds="+$.trim(appIds)+"&csrfPreventionSalt="+strutsToken;

			}
		}
		dataString +='&addTo='+addTo;
		
//		var resExist=checkExist(policyDesc);
//		if(resExist.match(/exist/)){
//			alert("Policy already Exist")
//			return;
//		}
//		else 
		{
		try{
			$.ajax({
				type: "POST",
				url: "policy_createCommonPolicy.action",
				dataType: "text",
				data: dataString,
				async: false,
				success: function(response){
					if($.trim(response)=="sessionout"){
						alert(response);
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}

					alert(response);
					res=response;

				}
			});
		}catch(e){alert(e);}

		}



	}
	return res;
}

function update()
{
	var res="";
	dataString="";
	policyDesc=  document.getElementById("editPpolicyDesc").value;

	reuseFlag=   document.getElementById("editReuseFlag").value;

	expirationTime=  document.getElementById("editExpirationTime").value;
	policyType=   document.getElementById("policyTypeBeforeEdit").value;
	pid=   document.getElementById("pId").value;
	
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	
	//alert("policyDesc=== "+policyDesc)
	//alert("reuseFlag=== "+reuseFlag)
	//alert("expirationTime=== "+expirationTime)
	//alert("policyType=== "+policyType)
	//alert("pid=== "+pid)
	
	
	
	//var addTo=document.getElementById("addTo").value;
	var policyDesc_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 349 , added by abhimanyu
	var iChars = "!`#$%^&*()+=-[]\\\';,/{}|\":<>?~";   
	for (var i = 0; i < policyDesc.length; i++)
	{      
		if (iChars.indexOf(policyDesc.charAt(i)) != -1)
		{    
			alert ("Please enter valid description");
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
	else if(reuseFlag==1&&expirationTime==0){

		alert("Please enter valid Expiration time except 0");
		return;
	}
	else if(expirationTime.length>5)
	{
		alert("Expiration time can not be more than 5 digits");
	}
	else if(isNaN(expirationTime))
	{
		alert("Expiration time should be numeric");
	}
	else if(policyType=="")
	{
		alert("Select Policy Type");
	}
	else if(reuseFlag==1&&expirationTime==0){

		alert("Entered expiration time should not be 0");
	}
	

	else{
		
		 dataString='policyDesc='+policyDesc+"&reuseFlag="+reuseFlag+"&expirationTime="+expirationTime+"&policyType="+policyType+"&pid="+$.trim(pid)+"&csrfPreventionSalt="+strutsToken;

		
//alert("dataString==="+dataString)
	//		var resExist=checkExistEdit(policyDesc);
	//		if(resExist.match(/exist/)){
	//			alert("Policy already Exist")
	//			return;
	//		}
	//		else 
		 {
		try{
			$.ajax({
				type: "POST",
				url: "policy_updateCommonPolicy.action",
				dataType: "text",
				data: dataString,
				async: false,
				success: function(response){
					res=response;
				
					if($.trim(response)=="sessionout"){
						alert(response);
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					if($.trim(response)=="success"){
						alert(response);
						openPolicy();
					}
				 	alert(response);
					

				}
			});
		}catch(e){alert(e);}

			}



	}
	return res;
}


function callReuseFlag()
{
	reuseFlag=   document.getElementById("reuseFlag").value;
	if(reuseFlag=="0"){
		$("#expirationTime").attr("disabled", "disabled"); 
		$("#expirationTime").attr("value", ""); 
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
	
	pid=   document.getElementById("pId").value;
	//alert("pid--- "+pid)
	
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	try{
		$.ajax({
			type: "POST",
			url: "policy_deleteCommonPolicy.action?pid="+$.trim(pid)+"&csrfPreventionSalt="+strutsToken,
			dataType: "text",
			success: function(response){
				//res=response;
				
				if($.trim(response)=="sessionout"){
					alert(response);
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				else if($.trim(response)=="success")
					{
					alert(response);
					openPolicy();
					}
				else
					{
					alert(response);
					}
			
				

			}
		});
	}catch(e){alert(e);}
    
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
			url: "policy_assignCommonPolicy.action?pid="+$.trim(pid)+"&domainName="+$.trim(domainName)+"&appName="+$.trim(appName)+"&csrfPreventionSalt="+strutsToken,
			dataType: "text",
			success: function(response){
				res=response;
				if($.trim(response)=="sessionout"){
					alert(response);
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				else if($.trim(response)=="success"){
					alert(response);
					 
				}
				else
					alert(response);
				
			},
			 complete:function(response){
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
	myUrl+="?policyType=commonPolicy&domainIds="+$.trim(domainIds);
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
	myUrl+="?policyType=commonPolicy&appIds="+$.trim(appIds);
	}
	$('#block_policy_addTo_data').html('<span>Loading...</span>');
	//alert("myUrl=-==== "+myUrl)
		$.ajax({
			type: "POST",  
			url: myUrl,
			dataType: "text",
			success: function(data) {
				if($.trim(data)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				//alert("data== "+data)
				var obj = JSON.parse(data);
			
			var obj1 = JSON.parse(obj.commonPolicyList);
				var content = '<h4>Add To</h4>';
					content += '<table class="table table-striped table-bordered" id="sample_2">';
					content += '<thead>';
						content += '<tr>';
//						<input type="checkbox" data-set="#sample_1 .checkboxes" class="group-checkable">
							content += '<th style="width:20px;"><input type="checkbox" data-set="#sample_2 .checkboxes" class="group-checkable"></th>';
							content += '<th>Policy Name</th>';
							content += '<th>Reuse Flag</th>';
							content += '<th>Expiration Time</th>';
							content += '<th>Policy Type</th>';
							
						content += '</tr>';
					content += '</thead>';
					
					if(obj1!=null && obj1!='')
						{
					jQuery.each(obj1, function(i, v) {
					i = (i+1);
						content += "<tr>";
							content += "<td><input class='checkboxes' name='chkAddPolicy'  type='checkbox' value='"+v.policyId+"'></td>";
							content += "<td>"+v.policy_desc+"</td>";
							content += "<td>"+v.reuse_flag+"</td>";
							content += "<td>"+v.expire_time+"</td>";
							content += "<td>"+v.policy_type+"</td>";
						content += "</tr>";
					});
					
						}
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
	//alert("add policy to domain app");
	try{
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	var myUrl;
	level=document.getElementById("level").value;
	if(level=="domain"){
		var domainIds=$("#addto_domain_select").val();
		myUrl="policy_mapDomainWithPolicy.action?domainIds="+$.trim(domainIds)+"&csrfPreventionSalt="+strutsToken;
		}
		if(level=="application"){
		var appIds=$("#addto_app_select").val();
		myUrl="policy_mapAppWithPolicy.action?appIds="+$.trim(appIds)+"&csrfPreventionSalt="+strutsToken;
		}
		//alert("myUrl--- "+myUrl)
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
	if(isChecked==false)
		{
		alert("Please select the Policy Name");
		return;
		}
	myUrl+="&pid="+id;
	try{
		$.ajax({
			type: "POST",
			url: myUrl,
			dataType: "text",
			
			success: function(response){
				
				//alert(response);
				if($.trim(response)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				else if($.trim(response) == "success"){
					 addtoTable();
				}
			}
		});
		}catch(e){alert("Exception: "+e);}
	}
	catch (e) {
		alert(e);
		// TODO: handle exception
	}
	
}


function checkExist(policyDesc) {
	
	var res;
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	try{
		$.ajax({
			type: "POST",
			url: "policy_checkExistingCommonPolicy.action?policyDesc="+$.trim(policyDesc)+"&csrfPreventionSalt="+strutsToken,
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
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	var res;
	try{
		$.ajax({
			type: "POST",
			url: "policy_checkExistingCommonPolicyEdit.action?policyDesc="+$.trim(policyDesc)+"&policyDecBeforeEdit="+$.trim(policyDecBeforeEdit)+"&csrfPreventionSalt="+strutsToken,
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
