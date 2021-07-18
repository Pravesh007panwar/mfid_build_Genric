

function openPolicy(){
	try{
		
		$('#block_policy_data').html('<span>Loading...</span>');
		$.ajax({
			type: "POST",  
			url: "policy_showAddModifyCountryPolicy.action",
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
				content += '<th>No.of Allowed Country</th>';
				content += '<th style="display:none;">Response</th>';
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
					//content += "<td>"+v.countryNames+"</td>";
					//alert("lenth==="+(v.countryNames).split(",").length)
					
					//content += "<td><a href='javascript:void(0);' onClick='showCountryCode("+v.countryNames+")'>"+(v.countryNames).split(",").length+"</a></td>";
					
					//alert("v.countryNames==="+v.countryNames)
					if(v.countryNames=='all')
						content += "<td>"+v.countryNames+"</td>";
					else
					content +="<td><a href='javascript:void(0);' onclick=showCountryCode('"+encodeURIComponent(v.countryNames)+"');>"+((v.countryNames).split(",").length)+"</td>";
					content += "<td style='display:none;'>"+v.countryResponse+"</td>";
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
				/*else{
					content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";


					
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


function showCountryCode(code)
	{
	try{
		//alert("shyam")
		alert(decodeURIComponent(code));
	}
	catch(e)
	{
		alert(e)
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
			{if($.trim(data)=="sessionout"){
				
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


function showAllCountryList()
{
	//alert("showCountryList ")
	try{


		var listData=new Array();
		var listId=new Array();

		$.ajax
		({

			url: 'policy_addCountryList',  
			cache: false,
			dataType:"text",
			async: false,
			success: function(data)
			{if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}

					var obj=JSON.parse(data);
					var obj1=JSON.parse(obj.countryList);
					document.getElementById('allCountryCode').value=obj1;
					

				
			}


		});   

	}
	catch(e){

	}
}


function showCountryList(multi,id)
{
	//alert("showCountryList ")
	try{


		var listData=new Array();
		var listId=new Array();

		$.ajax
		({

			url: 'policy_addCountryList',  
			cache: false,
			dataType:"text",
			async: false,
			success: function(data)
			{if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}

					var obj=JSON.parse(data);
					//alert("obje===="+obj)
					var obj1=JSON.parse(obj.countryList);
					//alert("obj1===="+obj1)
					document.getElementById('allCountryCode').value=obj1;
					if(obj1!=null && obj1!='')
						{
				$.each(obj1, function(i,data)
						{


					//var messageId=data.domainId;	
					//var messageName=data.domainName;		
					//listId.push([messageId]);
					listData.push([data]);

						});
						}

				//document.getElementById(id).options.length = 0;
				var sel = document.getElementById(id);
				//	alert(listData.length);
				var option = '';
				for(var i = 0; i < listData.length; i++) {
					var opt = sel.options;
					/*if(multi!='true' && i == 0){
						opt[opt.length] = new Option('-select country codes-','');
					}*/
					opt[opt.length] = new Option(listData[i],listData[i]);
				
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
	//alert("in save")
	var res="";
	dataString="";
	
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	
	policyDesc=  document.getElementById("policyDesc").value;
	var countryCode=$("#countrycode").val();
	//alert("countryCode==="+countryCode)
	
		
	var countryResponse=$('input:radio[name=cp_radio]:checked').val();
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
	if(countryCode== null||countryCode==""){
		alert("Select Country Code");
		return;
	}
	else if(addTo==""){
		alert("Select Policy Level");
	}

	else{

		var addTo=document.getElementById("addTo").value;
		var allCountryCode= document.getElementById('allCountryCode').value;
		var valArr = allCountryCode.split(",");
			if((countryCode.length)==(valArr.length)){
				countryCode="all";
			}
		if(addTo=="domain"){
			domainIds=$("#domain").val();
			if(domainIds== null||domainIds==""){
				alert("Select Doamin");
				return;
			}
			else dataString='policyDesc='+policyDesc+"&countryCode="+$.trim(countryCode)+"&cpResponse="+$.trim(countryResponse)+"&domainIds="+$.trim(domainIds)+'&csrfPreventionSalt='+strutsToken;

		}
		if(addTo=="App"){
			var appIds=$("#application").val();
			
			if(appIds== null||appIds==""){
				alert("Select Application");
				return;
			}
			else {
				dataString='policyDesc='+policyDesc+"&countryCode="+$.trim(countryCode)+"&cpResponse="+$.trim(countryResponse)+"&appIds="+$.trim(appIds)+'&csrfPreventionSalt='+strutsToken;

			}
		}

		
		var resExist=checkExist(policyDesc);
		if(resExist.match(/exist/)){
			alert("Policy already Exist")
			return;
		}
		else {
		try{
			$.ajax({
				type: "POST",
				url: "policy_createCountryPolicy.action",
				dataType: "text",
				data: dataString,
				async: false,
				success: function(response){

				//	alert(response);
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}

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
	try{
		
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	var res="";
	dataString="";
	policyDesc=  document.getElementById("editPolicyDesc").value;
	var editCountryCode=$("#editCountryCode").val();
	var editPolicyResponse=$("#editPolicyResponse").val();

	//var editCountryCode= document.getElementById("editCountryCode").value;

	//alert("editCountryCode==="+editPolicyResponse)
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
	else if(editCountryCode== null||editCountryCode==""){
		alert("Select Country Code");
		return;
	}
	else{
		
		//alert("editCountryCode==="+editCountryCode.length)
		var allCountryCode= document.getElementById('allCountryCode').value;
		var valArr = allCountryCode.split(",");
			if((editCountryCode.length)==(valArr.length)){
				editCountryCode="all";
			}
		//alert("editCountryCode==="+editCountryCode)
		dataString='policyDesc='+policyDesc+"&countryCode="+$.trim(editCountryCode)+"&cpResponse="+$.trim(editPolicyResponse)+"&pid="+$.trim(pid)+'&csrfPreventionSalt='+strutsToken;

	var resExist=checkExistEdit(policyDesc);
		if(resExist.match(/exist/)){
			alert("Policy already Exist")
			return;
		}
		else {
		
			$.ajax({
				type: "POST",
				url: "policy_updateCountryPolicy.action",
				dataType: "text",
				data: dataString,
				async: false,
				success: function(response){

					//alert(response);
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					else if($.trim(response)=="success"){
						alert(response);
					}

					res=response;

				}
			});
		
		}




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
	var res;
	
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	pid=   document.getElementById("pId").value;

	try{
		$.ajax({
			type: "POST",
			url: "policy_deleteCountryPolicy.action?pid="+$.trim(pid)+'&csrfPreventionSalt='+strutsToken,
			dataType: "text",
			success: function(response){

			//	alert(response);
				if($.trim(response)=="sessionout"){
					alert("Session Timeout...");
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				else if($.trim(response)=="success"){
					alert(response);			
				openPolicy();
				}	
				res=response;

			}
		});
	}catch(e){alert(e);}
	//alert(res)
return res;
}

function assign(){
var res;
	pid=   document.getElementById("pId").value;

	domainName=document.getElementById("domainName").value;
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	appName=document.getElementById("appName").value;
	
	try{
		$.ajax({
			type: "POST",
			url: "policy_assignCountryPolicy.action?pid="+$.trim(pid)+"&domainName="+$.trim(domainName)+"&appName="+$.trim(appName)+'&csrfPreventionSalt='+strutsToken,
			dataType: "text",

			async: false,
			success: function(response){

			//	alert(response);
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

function addtoTable(){
	//alert("add to table");
	try{
	var myUrl="policy_showDomainUnassociatedPolicy.action";
	level=document.getElementById("level").value;
	var domainIds=$("#addto_domain_select").val();
//	alert(domainIds);
	if(level=="domain"){
		if(domainIds==""||domainIds==null)
		{
		alert("please select the domain...");
		return;
		}
	myUrl+="?policyType=countryPolicy&domainIds="+$.trim(domainIds);
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

	myUrl+="?policyType=countryPolicy&appIds="+$.trim(appIds);
	}
	//alert(myUrl);
	$('#block_policy_addTo_data').html('<span>Loading...</span>');
	
		$.ajax({
			type: "POST",  
			url: myUrl,
			dataType: "text",
			success: function(data) {
				//alert("data== "+data)
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
							content += '<th>No.of Allowed Country</th>';
							//content += '<th>Response</th>';
							//content += '<th>Policy Type</th>';
							
						content += '</tr>';
					content += '</thead>';
					
					if(obj!=null && obj1!='')
						{
					jQuery.each(obj1, function(i, v) {
					i = (i+1);
						content += "<tr>";
							content += "<td><input class='checkboxes' name='chkAddPolicy'  type='checkbox' value='"+v.policyId+"'></td>";
							content += "<td>"+v.policy_desc+"</td>";
							if(v.countryNames=='all')
								content += "<td>"+v.countryNames+"</td>";
							else
							content +="<td><a href='javascript:void(0);' onclick=showCountryCode('"+encodeURIComponent(v.countryNames)+"');>"+((v.countryNames).split(",").length)+"</td>";
							//content += "<td>"+v.countryNames+"</td>";
							//content += "<td>"+v.countryResponse+"</td>";
						//	content += "<td>"+v.policy_type+"</td>";
						content += "</tr>";
					});
						}
					/*else
						{
						content += "<tr><td style='text-align: center;' colspan='3' > No Record Found!</td></tr>";
						}*/
					content += "</table>";
					content += '<div class="form-actions form-actions2"><button type="button" onClick="addPolicyToDomainApp()"  class="btn btn-primary">Submit </button></div>';
					$('#block_policy_addTo_data').html(content);
					$("#sample_2").css("width","100%");
					oTable = $('#sample_2').dataTable({"bPaginate": false,"bFilter": false,"bSort":false});
			}
		
		});   
	}
	catch (e) {
		alert(e)
		// TODO: handle exception
	}
	
	}

function addPolicyToDomainApp() {
	
// start code for checkbox validation , Bug ID = 216  , added by abhimanyu	
	  var checkForSelectedCheckBoxValue = "";
	  var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	   $('input[name="chkAddPolicy"]:checked').each(function() {checkForSelectedCheckBoxValue+=this.value; });
	   if($.trim(checkForSelectedCheckBoxValue) == '')
		  {
		    alert("Please select the policy");
		    return false;
		   }
//end code for checkbox validation , Bug ID = 216 , added by abhimanyu
	try{
	var myUrl;
	level=document.getElementById("level").value;
	if(level=="domain"){
		var domainIds=$("#addto_domain_select").val();
		myUrl="policy_mapDomainWithCountryPolicy.action?domainIds="+$.trim(domainIds)+'&csrfPreventionSalt='+strutsToken;
		}
		if(level=="application"){
		var appIds=$("#addto_app_select").val();
		myUrl="policy_mapAppWithCountryPolicy.action?appIds="+$.trim(appIds)+'&csrfPreventionSalt='+strutsToken;
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
			url: "policy_checkExistingEAP.action?policyDesc="+policyDesc,
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
			url: "policy_checkExistingCountryPolicyEdit.action?policyDesc="+policyDesc+"&policyDecBeforeEdit="+policyDecBeforeEdit,
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
