 

function openPolicy(){
	try{
		
		$('#block_policy_data').html('<span>Loading...</span>');
		$.ajax({
			type: "POST",  
			url: "policy_showAddModifyNTPolicy.action",
			dataType: "text",
			success: function(data) {
				if($.trim(data)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
				
				var object = JSON.parse(data);
				var obj=JSON.parse(object.PolicyList);
				
				var	content = '<table class="table table-striped table-bordered" id="sample_1">';
				
				if(obj!=null && obj!='')
				{
				$.each(obj, function (i, val) {
					var iObj = JSON.parse(i);
					content += "<tr>";
					content += "<td class='policyHeading'>"+iObj.policy_desc+"</td>";
					if(iObj.app=="")
						content += "<td class='policyHeading'>"+iObj.domain+"</td>";
					else
						content += "<td class='policyHeading'>"+iObj.domain+" | "+iObj.app+"</td>";
					content += "<td class='policyHeading'>"+iObj.policy_type+"</td>";
					if(iObj.defaultPolicyFlag==0){
						//content += "<td class='policyHeading'><a href='javascript:void(0);' class='edit'>Edit</a> </td>";
						content += "<td class='policyHeading'> </td>";
					}
					else{
						content += "<td class='policyHeading'><a href='javascript:void(0);' class='edit'>Edit</a> | <a href='javascript:void(0);' class='delete'>Delete</a></td>";
					}
					
					if(iObj.currentUseFlag!=1){
						if(iObj.defaultPolicyFlag==0){
							content += "<td class='policyHeading'><a href='javascript:void(0);' class='assign_td' >Assign</a>"
						}
						else
						content += "<td class='policyHeading'><a href='javascript:void(0);' class='assign_td' >Assign</a>"+" | "+"<a href='javascript:void(0);' data-pid='"+iObj.policy_desc+"' data-policy='"+iObj.policy_type+"' data-rule='rule'class='rule'>Add Rule</a> </td>";
					}
					else {
						if(iObj.defaultPolicyFlag==0){
							content += "<td class='policyHeading'>";
						}
						else
						content += "<td class='policyHeading'><a href='javascript:void(0);' data-pid='"+iObj.policy_desc+"' data-policy='"+iObj.policy_type+"' data-rule='rule' class='rule'>Add Rule</a></td>";
					}
					
					content += "<td style='display: none;' >"+iObj.policyId+"</td>";
					content += "<td class='policyHeading'></td>";
					content += "<td class='policyHeading'></td>";
					content += "<td class='policyHeading'></td>";
					content += "<td class='policyHeading'></td>";
					
					content += "</tr>";
					
					content += '<tr>';
						content += '<th class="policySubHeading">From IP</th>';
						content += '<th class="policySubHeading">To IP</th>';
						content += '<th class="policySubHeading">From Date</th>';
						content += '<th class="policySubHeading">To Date</th>';
						content += '<th class="policySubHeading">From Time</th>';
						content += '<th class="policySubHeading">To Time</th>';
						content += '<th class="policySubHeading">Response</th>';
						content += '<th class="policySubHeading">Type</th>';
						content += '<th class="policySubHeading">Action</th>';
					content += '</tr>';
					
					  $.each(val, function(innerKey, innerValue) {
						
						  	content += "<tr>";
						  	content += "<td >"+innerValue.ipA+"</td>";
						  	content += "<td>"+innerValue.ipB+"</td>";
						  	content += "<td>"+innerValue.date1+"</td>";
						  	content += "<td>"+innerValue.date2+"</td>";
						  	content += "<td>"+innerValue.time1+"</td>";
						  	content += "<td>"+innerValue.time2+"</td>";
						  	content += "<td>"+innerValue.response+"</td>";
							content += "<td>"+innerValue.ruleType+"</td>";
							//alert("innerValue.ruleType==="+innerValue.ruleType)
							if(innerValue.ruleType=="defaultTime"||innerValue.ruleType=="defaultNetworkTime"||innerValue.ruleType=="defaultNetwork"||innerValue.ruleType=="defaultRangeType")
								content += "<td><a href='javascript:void(0);' class='editRule'>Edit</a></td>";
							else
								content += "<td><a href='javascript:void(0);' class='editRule'>Edit</a> | <a href='javascript:void(0);' class='deleteRule'>Delete</a></td>";
								//content += "<td><a href='javascript:void(0);' class='editRule'>Edit</a></td>";	
							content += "<td style='display: none;' >"+innerValue.policyId+"</td>";
							content += "<td style='display: none;' >"+innerValue.policyDesc+"</td>";
							
							content += "</tr>";
							
					  });
					  content += "<tr><th class='policyRowSpace'></th><th class='policyRowSpace'></th><th class='policyRowSpace'></th><th class='policyRowSpace'></th><th class='policyRowSpace'></th><th class='policyRowSpace'></th><th class='policyRowSpace'></th><th class='policyRowSpace'></th><th class='policyRowSpace'></th></tr>";
					});
				}
				
				/*else{
					content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
				}*/
				content += "</table>";
				
				content += '<div class="form-actions form-actions2"><button type="button" id="sample_1_addNew" class="btn green" >Add New <i class="icon-plus"></i></button></div>';
				
				$('#block_policy_data').html(content);
				$("#sample_1").css("width","100%");
				//oTable = $('#sample_1').dataTable({"bPaginate": false,"bFilter": false,"bSort":false});
				

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
	//var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	//var ipformat = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
	var res="";
	var dataString="";
	var ipRange1="";
	var ipRange2="";
	var response="";
	var date1="";
	var date2="";
	var time1="";
	var time2="";
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
			var policyDesc=  document.getElementById("policyDesc").value;
			var addRange=  document.getElementById("addRange").value;
			var addNTRange=  document.getElementById("addNTRange").value;
			var policyType=$('input:radio[name=ntp_radio]:checked').val();
			//document.getElementById("policyType").value=policyType;;
			
			var policyDesc_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 349 , added by abhimanyu
			var iChars = "!`#$%^&*()+=-[]\\\';,/{}|\":<>?~";   
			for (var i = 0; i < policyDesc.length; i++){      
				if (iChars.indexOf(policyDesc.charAt(i)) != -1){    
					alert ("Please enter valid policy name");
					return;
				} 
			}
			
			if(policyDesc==""){
				alert("Please enter policy name.");
				return;
			}
		   else if(!$.trim(policyDesc).match(policyDesc_regex))// add code for bug id 349 , added by abhimanyu
			    {
			 	 alert("Please enter valid policy name");
			 	 return;
			    } 
			
			if(policyDesc.length>50){
				alert("Policy name length should not be more than 50 character");
				return;
			}
	 
			if(addRange==""){
				 if(policyType=="network"){
					alert("Please select ip range");
					return;
				 }
			}
		 
			if(policyType=="time"){
				date1=document.getElementById("dateIP1").value;
				date2=document.getElementById("dateIP2").value;
				time1=document.getElementById("timeIP1").value;
				time2=document.getElementById("timeIP2").value;
				if(date1==""||date1==undefined||date1==null){
					 alert("Please select date time");
					 return;
				 }
				
				 if(date2==""||date2==undefined||date2==null){
					 alert("Please select date time");
					 return;
				 }
				
				 if(time1==""||time1==undefined||time1==null){
					 alert("Please select date time");
					 return;
				 }
				
				 if(time2==""||time2==undefined||time2==null){
					 alert("Please select date time");
					 return;
				 }
				
					 var currentTime = new Date()
					 var month = currentTime.getMonth() + 1
					 var day = currentTime.getDate()
					 var year = currentTime.getFullYear()
					 var currentDate=year + "-" + month + "-" + day;
					 var checkDate1=Date.parse(date1)/1000;
					 var checkDate2=Date.parse(date2)/1000;
					// var checkTime1=Date.parse(currentDate+" "+time1)/1000;
					// var checkTime2=Date.parse(currentDate+" "+time2)/1000;
					 // add code for bug id 520 , added by abhimanyu
					 var checkTime1=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time1)))/1000;
					 var checkTime2=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time2)))/1000;
					 
				 
				  var resultTime = compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2);
					
				 if(resultTime==false)
				 {
				   alert("The date time must come before the end date time.");
				   return;
				 }
			}
				 
			if(addNTRange==""){
				if(policyType=="networkTime"){
					alert("Please select network time range");
					return;
				}
			}
				
	 
	
			 if(addRange=="ip"||addNTRange=="nt"){
				 ipRange1=  document.getElementById("ip").value;
				 if(ipRange1==""){
				 	alert("Please enter ip");
				 	return;
				 }
				 /*if(!ipRange1.match(ipformat)){
					 alert("You have entered an invalid ip address");
					 return;
				 }*/
				 	
				   date1=document.getElementById("dateIP1").value;
				   date2=document.getElementById("dateIP2").value;
				   time1=document.getElementById("timeIP1").value;
				   time2=document.getElementById("timeIP2").value;
				   
				   if(addNTRange=="nt"){
						 if(date1==""||date1==undefined||date1==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(date2==""||date2==undefined||date2==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(time1==""||time1==undefined||time1==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(time2==""||time2==undefined||time2==null){
							 alert("Please select date time");
							 return;
						 }
						
							 var currentTime = new Date()
							 var month = currentTime.getMonth() + 1
							 var day = currentTime.getDate()
							 var year = currentTime.getFullYear()
							 var currentDate=year + "-" + month + "-" + day;
							 var checkDate1=Date.parse(date1)/1000;
							 var checkDate2=Date.parse(date2)/1000;
							// var checkTime1=Date.parse(currentDate+" "+time1)/1000;
							// var checkTime2=Date.parse(currentDate+" "+time2)/1000;
						   // add code for bug id 520 , added by abhimanyu
							 var checkTime1=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time1)))/1000;
							 var checkTime2=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time2)))/1000;
						 
						  var resultTime = compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2);
							
						 if(resultTime==false)
						 {
						   alert("The date time must come before the end date time.");
						   return;
						 }
					 }
			 }
			 
			 if(addRange=="ipRange"||addNTRange=="ntr"){
				 ipRange1=  document.getElementById("ipRange1").value;
				 ipRange2=  document.getElementById("ipRange2").value;
				 if(ipRange1==""){
				 	alert("Please enter first ip");
				 	return;
				 }
				 
				 /*if(!ipRange1.match(ipformat)){
					 alert("You have entered an invalid first ip address");
					 return;
				 }*/
				 
				 if(ipRange2==""){
				 	alert("Please enter second ip");
				 	return;
				 }
				 /*if(!ipRange2.match(ipformat)){
				 alert("You have entered an invalid second ip address");
				 return;
				 }*/
				 
			  /*	 var result = CompareIP(ipRange1,ipRange2);
					
				 if(result==false)
				 {
				   alert("From IP exceeds to IP");
				   return;
				 }*/
				 date1=document.getElementById("dateIP1").value;
				 date2=document.getElementById("dateIP2").value;
				 time1=document.getElementById("timeIP1").value;
				 time2=document.getElementById("timeIP2").value;
				
				 if(addNTRange=="ntr"){
						// alert("ntr===")
					 if(date1==""||date1==undefined||date1==null){
						 alert("Please select date time");
						 return;
					 }
					
					 if(date2==""||date2==undefined||date2==null){
						 alert("Please select date time");
						 return;
					 }
					
					 if(time1==""||time1==undefined||time1==null){
						 alert("Please select date time");
						 return;
					 }
					
					 if(time2==""||time2==undefined||time2==null){
						 alert("Please select date time");
						 return;
					 }
					
						 var currentTime = new Date()
						 var month = currentTime.getMonth() + 1
						 var day = currentTime.getDate()
						 var year = currentTime.getFullYear()
						 var currentDate=year + "-" + month + "-" + day;
						 var checkDate1=Date.parse(date1)/1000;
						 var checkDate2=Date.parse(date2)/1000;
						// var checkTime1=Date.parse(currentDate+" "+time1)/1000;
						// var checkTime2=Date.parse(currentDate+" "+time2)/1000;
					 // add code for bug id 520 , added by abhimanyu
						 var checkTime1=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time1)))/1000;
						 var checkTime2=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time2)))/1000;
					
					 
					  var resultTime = compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2);
						
					 if(resultTime==false)
					 {
					   alert("The date time must come before the end date time.");
					   return;
					 }
				
				 }
				 
				 
			}
			 response=$('input:radio[name=ip_radio]:checked').val();
			 
			 if(policyType=="networkTime"){
				 addRange=addNTRange;
			 }
			 if(policyType=="time"){
				 addRange=policyType;
			 }
	
	
			 var addTo=document.getElementById("addTo").value;
			 if(addTo==""){
				alert("please select to add in domain or application");
				return;
			 }
			 
			 if(addTo=="domain"){
				 domainIds=$("#domain").val();
				 if(domainIds== null||domainIds==""){
					 alert("Select Doamin");
					 return;
				 }
				 else 
					 dataString='policyDesc='+policyDesc+"&policyType="+$.trim(policyType)+"&addRange="+$.trim(addRange)+"&ipRange1="+$.trim(ipRange1)+"&ipRange2="+$.trim(ipRange2)+"&res="+$.trim(response)+"&domainIds="+$.trim(domainIds)+"&date1="+$.trim(date1)+"&date2="+$.trim(date2)+"&time1="+$.trim(time1)+"&time2="+$.trim(time2)+'&csrfPreventionSalt='+strutsToken;
			 }
			 
			 if(addTo=="App"){
				 var appIds=$("#application").val();
				 if(appIds== null||appIds==""){
					 alert("Select Application");
					 return;
				 }
				 else{
					 dataString='policyDesc='+policyDesc+"&policyType="+$.trim(policyType)+"&addRange="+$.trim(addRange)+"&ipRange1="+$.trim(ipRange1)+"&ipRange2="+$.trim(ipRange2)+"&res="+$.trim(response)+"&appIds="+$.trim(appIds)+"&date1="+$.trim(date1)+"&date2="+$.trim(date2)+"&time1="+$.trim(time1)+"&time2="+$.trim(time2)+'&csrfPreventionSalt='+strutsToken;
				 }
			 }
			 dataString +='&addTo='+addTo;
			//alert("dataString==="+dataString)
		/*	handled at server side
		 * 
		 * var resExist=checkExist(policyDesc);
			//alert("resExist==="+resExist)
			if(resExist.match(/exist/)){
				alert("Policy already Exist")
				return;
			}
			else {*/
		try{
			$.ajax({
				type: "POST",
				url: "policy_createNTPolicy.action",
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
		return res;
	//		}
}

function update()
{
	try{
	var res="";
	dataString="";
	policyDesc=  document.getElementById("editPolicyDesc").value;
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	//alert("policyDesc=="+policyDesc)
	//numberOfHours=   document.getElementById("editNumberOfHours").value;

	
	pid=   document.getElementById("pId").value;

//alert(pid)

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
	

	else{

		dataString='policyDesc='+policyDesc+"&pid="+$.trim(pid)+'&csrfPreventionSalt='+strutsToken;

		//var resExist=checkExistEdit(policyDesc);
		//if(resExist.match(/exist/)){
		//	alert("Policy already Exist")
		//	return;
		//}
	//	else {
		
			$.ajax({
				type: "POST",
				url: "policy_updateNTPolicy.action",
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
	var res;
	pid=   document.getElementById("pId").value;
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	//alert("pid==="+pid)
	try{
		$.ajax({
			type: "POST",
			url: "policy_deleteNTPolicy.action?pid="+$.trim(pid)+'&csrfPreventionSalt='+strutsToken,
			dataType: "text",
			success: function(response){
			//alert(response);
			if($.trim(response)=="sessionout"){
				alert("Session Timeout...");
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
				}
				else if($.trim(response)=="success"){
					alert(response);			
					openPolicy();
				}else{
					alert(response);	
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
			url: "policy_assignNTPolicy.action?pid="+$.trim(pid)+"&domainName="+$.trim(domainName)+"&appName="+$.trim(appName)+'&csrfPreventionSalt='+strutsToken,
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
	 
	///alert("add to table");
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
	myUrl+="?policyType=NTPolicy&domainIds="+$.trim(domainIds);
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

	myUrl+="?policyType=NTPolicy&appIds="+$.trim(appIds);
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
							//content += '<th>Number of Hours</th>';
							//content += '<th>Expiration Time</th>';
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
							//content += "<td>"+v.multipleUseFlag+"</td>";
						//	content += "<td>"+v.expire_time+"</td>";
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
// start code for checkbox validation , added by abhimanyu	
	  var checkForSelectedCheckBoxValue = "";
	  var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	   $('input[name="chkAddPolicy"]:checked').each(function() {checkForSelectedCheckBoxValue+=this.value; });
	   if($.trim(checkForSelectedCheckBoxValue) == '')
		  {
		    alert("Please select the policy");
		    return false;
		   }
// end code for checkbox validation , added by abhimanyu
	   
	try{
	var myUrl;
	level=document.getElementById("level").value;
	if(level=="domain"){
		var domainIds=$("#addto_domain_select").val();
		myUrl="policy_mapDomainWithNTPolicy.action?domainIds="+$.trim(domainIds)+'&csrfPreventionSalt='+strutsToken;
		}
		if(level=="application"){
		var appIds=$("#addto_app_select").val();
		myUrl="policy_mapAppWithNTPolicy.action?appIds="+$.trim(appIds)+'&csrfPreventionSalt='+strutsToken;
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


function checkExistingDefaultIPRule(policyDesc) {
	
	var res;
	try{
		$.ajax({
			type: "POST",
			url: "policy_checkExistingDefaultIPRule.action?policyDesc="+policyDesc, /// Not found  
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



function checkExist(policyDesc) {
	
	var res;
	try{
		$.ajax({
			type: "POST",
			url: "policy_checkExistingNTP.action?policyDesc="+policyDesc,
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




function checkExistRule(policyDesc,addRange,ipRange1,ipRange2,response,date1,date2,time1,time2) {
	var dataString='policyDesc='+policyDesc+"&addRange="+$.trim(addRange)+"&ipRange1="+$.trim(ipRange1)+"&ipRange2="+$.trim(ipRange2)+"&res="+$.trim(response)+"&date1="+$.trim(date1)+"&date2="+$.trim(date2)+"&time1="+$.trim(time1)+"&time2="+$.trim(time2);
	//alert(dataString)
	var res;
	try{
		$.ajax({
			type: "POST",
			url: "policy_checkExistingNTPRule.action",
			dataType: "text",
			data: dataString,
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


function checkExistRuleEdit(policyDesc,addRange,ipRange1,ipRange2,response,date1,date2,time1,time2,pmid) {
	var dataString='policyDesc='+policyDesc+"&addRange="+$.trim(addRange)+"&ipRange1="+$.trim(ipRange1)+"&ipRange2="+$.trim(ipRange2)+"&res="+$.trim(response)+"&date1="+$.trim(date1)+"&date2="+$.trim(date2)+"&time1="+$.trim(time1)+"&time2="+$.trim(time2)+"&pmid="+$.trim(pmid);
	//alert(dataString)
	var res;
	try{
		$.ajax({
			type: "POST",
			url: "policy_checkExistingNTPEditRule.action",
			dataType: "text",
			data: dataString,
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
			url: "policy_checkExistingNTPEdit.action?policyDesc="+policyDesc+"&policyDecBeforeEdit="+policyDecBeforeEdit,
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



function updateRule()
{
try{
	//var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
//	var ipformat = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
	var res="";
	var dataString="";
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	var policyIPA="";var policyIPB="";var response="";var date1="";var date2="";var time1="";var time2="";
	 var policyIpType=document.getElementById("policyIPType").value;
	 var policyDesc=document.getElementById("policyDesc").value;
	// alert("policyIpType=="+policyIpType)
	  var policyMappingId=  document.getElementById("policyMappingId").value;
	// alert("policyMappingId=="+policyMappingId)
	 
	 if(policyIpType=="network"||policyIpType=="networkTime"){
		 policyIPA=document.getElementById("editPolicyIPA").value;
		if(policyIPA==""){
			alert("Please enter IP1");
			return;
		}
		/*if(!policyIPA.match(ipformat)){
			 alert("You have entered an invalid IP1 address");
			 return;
		 }*/
	 }
	 if(policyIpType=="networkRange"||policyIpType=="networkTimeRange"){
		 policyIPA=document.getElementById("editPolicyIPA").value;
		  policyIPB=document.getElementById("editPolicyIPB").value;
		  if(policyIPA==""){
				alert("Please enter IP1");
				return;
			}
		 /* if(!policyIPA.match(ipformat)){
				 alert("You have entered an invalid IP1 address");
				 return;
			 }*/
		  if(policyIPB==""){
				alert("Please enter IP2");
				return;
			}
		  /*if(!policyIPB.match(ipformat)){
				 alert("You have entered an invalid IP2 address");
				 return;
			 }*/
		 // alert("policyIpType==="+policyIpType)
		 
		   /* var result = CompareIP(policyIPA,policyIPB);
			
			 if(result==false)
			 {
			   alert("From IP exceeds to IP");
			   return;
			 }*/
	 }
	 if(policyIpType=="time"||policyIpType=="networkTimeRange"||policyIpType=="networkTime"){
		
		 	date1=document.getElementById("editPolicyDate1").value;
		 	time1=document.getElementById("editPolicyTime1").value;
		 	time2=document.getElementById("editPolicyTime2").value;
		 	date2=document.getElementById("editPolicyDate2").value;
		 	
		 	 if(date1==""||date1==undefined||date1==null){
				 alert("Please select date time");
				 return;
			 }
			
			 if(date2==""||date2==undefined||date2==null){
				 alert("Please select date time");
				 return;
			 }
			
			 if(time1==""||time1==undefined||time1==null){
				 alert("Please select date time");
				 return;
			 }
			
			 if(time2==""||time2==undefined||time2==null){
				 alert("Please select date time");
				 return;
			 }
			 
			 var currentTime = new Date()
			 var month = currentTime.getMonth() + 1
			 var day = currentTime.getDate()
			 var year = currentTime.getFullYear()
			 var currentDate=year + "-" + month + "-" + day;
			 var checkDate1=Date.parse(date1)/1000;
			 var checkDate2=Date.parse(date2)/1000;
			// var checkTime1=Date.parse(currentDate+" "+time1)/1000;
			// var checkTime2=Date.parse(currentDate+" "+time2)/1000;		
           // add code for bug id 520 , added by abhimanyu
			 var checkTime1=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time1)))/1000;
			 var checkTime2=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time2)))/1000;
			  
		  var resultTime = compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2);
			
		 if(resultTime==false)
		 {
		   alert("The date time must come before the end date time.");
		   return;
		 }
	
			 
	 }
	 
	 
	 response=document.getElementById("editPolicyResponse").value;
	// alert("response=="+response)
	
		
	 //else{
		//dataString="ipRange1="+$.trim(policyIPA)+"&ipRange2="+$.trim(policyIPB)+"&res="+$.trim(policyResponse)+"&pmid="+$.trim(policyMappingId)+"&addRange="+$.trim(policyIpType);
	  dataString="policyDesc="+policyDesc+"&pmid="+$.trim(policyMappingId)+"&addRange="+$.trim(policyIpType)+"&ipRange1="+$.trim(policyIPA)+"&ipRange2="+$.trim(policyIPB)+"&res="+$.trim(response)+"&date1="+$.trim(date1)+"&date2="+$.trim(date2)+"&time1="+$.trim(time1)+"&time2="+$.trim(time2)+'&csrfPreventionSalt='+strutsToken;
	 // alert("dataString==="+dataString)
	  //var resExist=checkExistRuleEdit(policyDesc,policyIpType,policyIPA,policyIPB,response,date1,date2,time1,time2,policyMappingId);
		//alert("resExist===="+resExist)
		//if(resExist.match(/exist/)){
		//	alert("Policy already Exist")
		//	return;
	//	}
		//else{
		$.ajax({
				type: "POST",
				url: "policy_updateNTPMappingPolicy.action",
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




	//}
	return res;
	}catch(e){alert(e);}

	}


		function saveRule()
		{
					
			//var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
			//var ipformat = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
			var res="";
			var dataString="";
			var ipRange1="";
			var ipRange2="";
			var response="";
			var date1="";
			var date2="";
			var time1="";
			var time2="";
			var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
			  	
					var policyDesc=  document.getElementById("policyDesc").value;
					var addRange=  document.getElementById("addRange").value;
					var addNTRange=  document.getElementById("addNTRange").value;
					var policyType=document.getElementById("policyType").value;
					//document.getElementById("policyType").value=policyType;
					
					var policyDesc_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 349 , added by abhimanyu
					var iChars = "!`#$%^&*()+=-[]\\\';,/{}|\":<>?~";   
					for (var i = 0; i < policyDesc.length; i++){      
						if (iChars.indexOf(policyDesc.charAt(i)) != -1){    
							alert ("Please enter valid description");
							return;
						} 
					}
					
					if(policyDesc==""){
						alert("Please enter description.");
						return;
					}
				  else if(!$.trim(policyDesc).match(policyDesc_regex))// add code for bug id 349 , added by abhimanyu
					    {
					 	 alert("Please enter valid description");
					 	 return;
					    } 
					
					if(policyDesc.length>20){
						alert("Description length should not be more than 20 character");
						return;
					}
			 
					if(addRange==""){
						 if(policyType=="network"){
							alert("Please select ip range");
							return;
						 }
					}
				 
					if(policyType=="time"){
						   date1=document.getElementById("dateIP1").value;
						   date2=document.getElementById("dateIP2").value;
						   time1=document.getElementById("timeIP1").value;
						   time2=document.getElementById("timeIP2").value;

						 
						 if(date1==""||date1==undefined||date1==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(date2==""||date2==undefined||date2==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(time1==""||time1==undefined||time1==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(time2==""||time2==undefined||time2==null){
							 alert("Please select date time");
							 return;
						 }
						
							 var currentTime = new Date()
							 var month = currentTime.getMonth() + 1
							 var day = currentTime.getDate()
							 var year = currentTime.getFullYear()
							 var currentDate=year + "-" + month + "-" + day;
							 var checkDate1=Date.parse(date1)/1000;
							 var checkDate2=Date.parse(date2)/1000;
							// var checkTime1=Date.parse(currentDate+" "+time1)/1000;
							// var checkTime2=Date.parse(currentDate+" "+time2)/1000;
							 // add code for bug id 520 , added by abhimanyu
							 var checkTime1=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time1)))/1000;
							 var checkTime2=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time2)))/1000;
						
						 
						  var resultTime = compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2);
							
						 if(resultTime==false)
						 {
						   alert("The date time must come before the end date time.");
						   return;
						 }
					
					}
						 
					if(addNTRange==""){
						if(policyType=="networkTime"){
							alert("Please select network time range");
							return;
						}
					}
						
			 
			
					 if(addRange=="ip"||addNTRange=="nt"){
						 ipRange1=  document.getElementById("ip").value;
						 if(ipRange1==""){
						 	alert("Please enter ip");
						 	return;
						 }
						 /*if(!ipRange1.match(ipformat)){
							 alert("You have entered an invalid ip address");
							 return;
						 }*/
						   date1=document.getElementById("dateIP1").value;
						   date2=document.getElementById("dateIP2").value;
						   time1=document.getElementById("timeIP1").value;
						   time2=document.getElementById("timeIP2").value;

						   if(addNTRange=="nt"){
						 if(date1==""||date1==undefined||date1==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(date2==""||date2==undefined||date2==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(time1==""||time1==undefined||time1==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(time2==""||time2==undefined||time2==null){
							 alert("Please select date time");
							 return;
						 }
						
							 var currentTime = new Date()
							 var month = currentTime.getMonth() + 1
							 var day = currentTime.getDate()
							 var year = currentTime.getFullYear()
							 var currentDate=year + "-" + month + "-" + day;
							 var checkDate1=Date.parse(date1)/1000;
							 var checkDate2=Date.parse(date2)/1000;
							// var checkTime1=Date.parse(currentDate+" "+time1)/1000;
							 //var checkTime2=Date.parse(currentDate+" "+time2)/1000;
							 // add code for bug id 520 , added by abhimanyu
							 var checkTime1=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time1)))/1000;
							 var checkTime2=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time2)))/1000;
						
						 
						  var resultTime = compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2);
							
						 if(resultTime==false)
						 {
						   alert("The date time must come before the end date time.");
						   return;
						 }
					 }
					 
					 }
					 
					 if(addRange=="ipRange"||addNTRange=="ntr"){
						 try{
						// alert("in it")
						 ipRange1=  document.getElementById("ipRange1").value;
						 ipRange2=  document.getElementById("ipRange2").value;
						 if(ipRange1==""){
						 	alert("Please enter first ip");
						 	return;
						 }
						 
						/* if(!ipRange1.match(ipformat)){
							 alert("You have entered an invalid first ip address");
							 return;
						 }*/
						 
						 if(ipRange2==""){
						 	alert("Please enter second ip");
						 	return;
						 }
						/* if(!ipRange2.match(ipformat)){
						 alert("You have entered an invalid second ip address");
						 return;
						 }*/
						 /* check for ip ranges*/
					/* var result = CompareIP(ipRange1,ipRange2);
							
						 if(result==false)
						 {
						   alert("From IP exceeds to IP");
						   return;
						 }*/

						 /*check date time ranges*/
						 date1=document.getElementById("dateIP1").value;
						 date2=document.getElementById("dateIP2").value;
						 time1=document.getElementById("timeIP1").value;
						 time2=document.getElementById("timeIP2").value;
						 if(addNTRange=="ntr"){
							// alert("ntr===")
						 if(date1==""||date1==undefined||date1==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(date2==""||date2==undefined||date2==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(time1==""||time1==undefined||time1==null){
							 alert("Please select date time");
							 return;
						 }
						
						 if(time2==""||time2==undefined||time2==null){
							 alert("Please select date time");
							 return;
						 }
						
							 var currentTime = new Date()
							 var month = currentTime.getMonth() + 1
							 var day = currentTime.getDate()
							 var year = currentTime.getFullYear()
							 var currentDate=year + "-" + month + "-" + day;
							 var checkDate1=Date.parse(date1)/1000;
							 var checkDate2=Date.parse(date2)/1000;
							// var checkTime1=Date.parse(currentDate+" "+time1)/1000;
							// var checkTime2=Date.parse(currentDate+" "+time2)/1000;
							 // add code for bug id 520 , added by abhimanyu
							 var checkTime1=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time1)))/1000;
							 var checkTime2=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time2)))/1000;
						
						 
						  var resultTime = compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2);
							
						 if(resultTime==false)
						 {
						   alert("The date time must come before the end date time.");
						   return;
						 }
					
					 }
						
						
						 }
						 catch(e)
						 {
							 alert(e);
						 }
						
					}
					 response=$('input:radio[name=ip_radio]:checked').val();
					 
					 if(policyType=="networkTime"){
						 addRange=addNTRange;
					 }
					 if(policyType=="time"){
						 addRange=policyType;
					 }
		
					 
					
					

			//else{

				dataString='policyDesc='+policyDesc+"&addRange="+$.trim(addRange)+"&ipRange1="+$.trim(ipRange1)+"&ipRange2="+$.trim(ipRange2)+"&res="+$.trim(response)+"&date1="+$.trim(date1)+"&date2="+$.trim(date2)+"&time1="+$.trim(time1)+"&time2="+$.trim(time2)+'&csrfPreventionSalt='+strutsToken;

				//alert("dataString==="+dataString)
			/*	var resExist=checkExistRule(policyDesc,addRange,ipRange1,ipRange2,response,date1,date2,time1,time2);
				//alert("resExist===="+resExist)
				if(resExist.match(/exist/)){
					alert("Policy already Exist")
					return;
				}
			
				else {*/
				try{
					$.ajax({
						type: "POST",
						url: "policy_createNTMappingPolicy.action",
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

			//}



			//}
			return res;

		}
		
		
		
		 function compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2)
		 {
			 
		  try{
			if((parseInt(checkDate1) <= parseInt(checkDate2) && parseInt(checkTime1) < parseInt(checkTime2))
					 || (parseInt(checkDate2) > parseInt(checkDate1) && parseInt(checkTime1) == parseInt(checkTime2))
					 || (parseInt(checkDate1) == parseInt(checkDate2) && parseInt(checkTime1) < parseInt(checkTime2)) ){
					/*if(parseInt(checkTime1) < parseInt(checkTime2)){
						
						 return true;	
					}
					else{
						return false;
					}*/
				return true;
			}
			else return false;
			}
			catch(e){
				alert(e)
			}
		}

		 function CompareIP(ipRange1,ipRange2)
		 {
			// alert("in compare method")
			 if(ipRange1==ipRange2)
				 {
				 return false;
				 }
		   var from = ipRange1;
		   var to = ipRange2;
		  if (from.includes(":") && to.includes(":")) {
	
			var fromArr = from.split(":");
			var toArr = to.split(":");
			for (i = 0; i < 8; i++) {
				if (parseInt($.trim(fromArr[i]), 16) > parseInt($.trim(toArr[i]),
						16))
					return false;
			}
	
		} else {
			var fromArr = from.split(".");
			var toArr = to.split(".");
			for (i = 0; i < 4; i++) {
				if (parseInt($.trim(fromArr[i])) > parseInt($.trim(toArr[i])))
					return false;
			}
		}
		return true;
	}
		 

function delete_RuleRow()
{

	var res;
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	
	var policyMappingId=   document.getElementById("policyMappingId").value;
	//alert("policyMappingId==="+policyMappingId)
	try{
		$.ajax({
			type: "POST",
			url: "policy_deleteNTMappingPolicy.action?pmid="+$.trim(policyMappingId)+'&csrfPreventionSalt='+strutsToken,
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


function getUpdateTime(datetimeString) { 
	  var d = new Date(datetimeString); 
      var min = (d.getMinutes()).toString();
      if(min == 'NaN')
      	{    d = new Date(datetimeString.replace(/-/g, '/')); 
             min = (d.getMinutes()).toString();
        }
       if (min.length == 1) 
    	min = min+'0';
     return d.getHours() + ':' + min; 
}