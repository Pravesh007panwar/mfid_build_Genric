function removeFilter(){
	$('#token').val("");
	$('#timeRemaining').val("");
	$('#status').val("");
	$('#userlogonId').val("");
	
}

	var count;
	var searchCount;
	var searchAssignTokenDomainWithpageSize=false;
	var searchDeassignTokenDomainWithpageSize=false;
	
	function getPageData_assTokenDoamin() {
		var size=document.getElementById('pageId_assTokenDoamin').value;
		if($.trim(size)!='') { 
		var totalPages =  $('#pageN_assTokenDoamin').text();
		var pageNumber=document.getElementById('pageNum_assTokenDoamin').value;
		if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_assTokenDoamin').val(1);}
		if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
			showAssign(true,false);
		else 
			alert('Page should be less than or equal to page number.');
		}
	}
	
	
	function fetchSize_assTokenDoamin(){
			var size=document.getElementById('pageId_assTokenDoamin').value;
	if($.trim(size)!='') { 		
	var maxSize=count;
	var maxPgaeNumber=maxSize/size;
	var rem=maxSize%size;
	if(rem>0){
		maxPgaeNumber=maxPgaeNumber+1;
	}
	if(count==0){
		$('#pageNum_assTokenDoamin').val(0);
	} else{
		$('#pageNum_assTokenDoamin').val(1);
		$('#pageNum_assTokenDoamin').attr("disabled",false);
	} 
	$('#pageN_assTokenDoamin').html(parseInt(maxPgaeNumber));
	}
	
	}
	
	function getPageData_deassTokenDoamin(){
		
		var size=document.getElementById('pageId_deassTokenDoamin').value;
		var totalPages =  $('#pageN_deassTokenDoamin').text();
		var pageNumber=document.getElementById('pageNum_deassTokenDoamin').value;
		if($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
			showDeassign(true,false);
		else
			alert('Page should be less than or equal to page number.');
			
	}
	
	
 function fetchSize_deassTokenDoamin(){
		
	var size=document.getElementById('pageId_deassTokenDoamin').value;
	
	if($.trim(size)!='') { 		
		var maxSize=count;
		var maxPgaeNumber=maxSize/size;
		var rem=maxSize%size;
		if(rem>0){
			maxPgaeNumber=maxPgaeNumber+1;
	     }
		if(count==0){
			$('#pageNum_deassTokenDoamin').val(0);
		} else{
			$('#pageNum_deassTokenDoamin').val(1);
			$('#pageNum_deassTokenDoamin').attr("disabled",false);
		} 
		$('#pageN_deassTokenDoamin').html(parseInt(maxPgaeNumber));
		
	}else 
		$('#pageNum_deassTokenDoamin').val(1);
	}
	
	var globalAssignTokenDomainPreviouspageSize="";
	var globalAssignTokenDomainPreviousPageNum="";
	var token='';
	var leftTime='';
	
	function showAssign(isPageCall,isSearch){
		
	// start code for Bug #122 and #171 , added by Abhimanyu
	   if($("#pageId_assTokenDoamin").length)
	   {
	   globalAssignTokenDomainPreviouspageSize=$("#pageId_assTokenDoamin").val();
	   globalAssignTokenDomainPreviousPageNum=$("#pageNum_assTokenDoamin").val();
	}
	// end code for Bug #122 and #171
	
	var associate="assign";
	var value = $('.shadow_radio:checked').val();
	var domain=document.getElementById('domain_id').value;
	var len=document.getElementById('domain_id').options.length;
	if(len==1)
		{
		alert("Domain is not available to assign token");
		return;
		}
	var myUrl=" token_showAssignDeassignTokenToDomain.action?operation="+associate+"&authType="+value ;
	if(domain==""){
	alert("Please select Domain.").
		return;
	}
	if(isPageCall){
		var size=document.getElementById('pageId_assTokenDoamin').value;
	 var pageNumber=document.getElementById('pageNum_assTokenDoamin').value;
		myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
	}
	
	if(token!="" || leftTime!=""){
		isSearch=true;
	}
	if(isSearch){
		 token=document.getElementById('token').value;
		 leftTime=document.getElementById('timeRemaining').value;
		
		myUrl+=" &tokenSerial="+token+"&leftTime="+leftTime;
	}
	// start code for Bug #122 and #171 , added by Abhimanyu
	if(searchAssignTokenDomainWithpageSize)  {  
	     if(myUrl.indexOf('fetchSize')==-1) { 
	    	 if($.trim(globalAssignTokenDomainPreviouspageSize)!='')
	    		 myUrl+="&fetchSize="+globalAssignTokenDomainPreviouspageSize; 
	     }
	}
	// end code for Bug #122 and #171
	$('#block_assign_token_data').html('<span>Loading...</span>');      
	$.ajax({
		type: "POST",  
	url: myUrl,
	data: "{}",
	async: true,
	dataType: "text",
	success: function(data) {
		if($.trim(data)=="sessionout"){
			testVal= document.getElementById('loginPage').value				
			window.location.replace(testVal);
		}
	var object = JSON.parse(data);
	var obj2=JSON.parse(object.tokenList);
	var obj1=JSON.parse(object.count);
	
	  if(searchAssignTokenDomainWithpageSize){
		  count=obj1;
		  searchCount = obj1;
	  } else {
		  count=obj1;
		  searchCount = obj1;
	  }
		//  obj1=count;
	
	var content = '<h4>Assign Token</h4><div class="space15"></div>';
	content += '<div class="row-fluid new_filter">';
	content += '<div class="span6">';
	content += '<div class="pull-left" id="switch_app">';
	content += '<label>Size</label>';
	content += '<select id="pageId_assTokenDoamin" onChange="fetchSize_assTokenDoamin(),getPageData_assTokenDoamin();" name="deassociationReasonListName" style="width:100%;">';
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
	// end code for bug id no #320 , added by abhimanyu
	content += '<option value="5000">5000</option>';
	// content += '<option value="10000">10000</option>';
	
	content += '</select>';
	content += '</div>';
	content += '</div>';
	content += '<div class="span6">';
	content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
	content += '<label>Page Number</label>';
	/*content += '<select onChange="getPageData_assTokenDoamin()" id="pageNum_assTokenDoamin"  >';
	content += '<option value="">-select Page-</option>';
	content += '</select>';*/
	content += ' <input type="text" id="pageNum_assTokenDoamin" style="width:20%;background-color:white;" onChange="getPageData_assTokenDoamin()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_assTokenDoamin"></span>';
	content += '</div>';
	content += '</div>';
	content += '</div>';
	content += '<table class="table table-striped table-bordered" id="sample_1">';
	content += '<thead>';
	content += '<tr>';
	content += '<th  style="width:20px;"><input type="checkbox" class="group-checkable" id="checkBoxAssignAndDeassignToken" data-set="#sample_1 .checkboxes" /></th>';
	content += '<th>Token Serial</th>';
	content += '<th>Left Days</th>';
	content += '</tr>';
	
	content += '<tr>';
	content += '<th style="padding-bottom: 20px;" width="8%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="searchAssignToken()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
	content += '<th><input type="text" onkeydown="searchAssignTokens(event)" id="token" /></th>';
	content += '<th><input type="text" onkeydown="searchAssignTokens(event)" id="timeRemaining" /></th>';
	
	content += '</tr>';
	content += '</thead>';
	try{
	if(obj2!=null&&obj2!=''){
			jQuery.each(obj2, function(i, v) {
				v.timeRemaining = 'N/A';
				content += "<tr><td><input type='checkbox' name='chkAssignTokenDomain' class='checkboxes'  value='"+v.tokenSerial+"' /></td><td>"+v.tokenSerial +"</td><td>"+v.timeRemaining +"</td></tr>";
	 });
	}
	else{
		content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";	
	}
	}
	catch(e){alert(e);}
	content += '</table>';
	content += '<div class="form-actions form-actions2">';
	content += '<button class="btn btn-primary" id="submitForAssignToken" onclick="assign()" type="button">Submit</button>';
	content += '</div>';
	$('#block_assign_token_data').html(content);
	$("#sample_1").css("width","100%");
	
	$('#token').val(token);
	$('#timeRemaining').val(leftTime);
	
	if($.trim(globalAssignTokenDomainPreviouspageSize) != '') {  
		$("#pageId_assTokenDoamin").val(globalAssignTokenDomainPreviouspageSize);
	  fetchSize_assTokenDoamin();
	  	if(!searchAssignTokenDomainWithpageSize)
	  		$("#pageNum_assTokenDoamin").val($.trim(globalAssignTokenDomainPreviousPageNum));
	  	else {
	  		if(globalAssignTokenDomainPreviousPageNum==0 && parseInt($('#pageN_assTokenDoamin').text()) > 0)
	  			globalAssignTokenDomainPreviousPageNum="1";
	  		$("#pageNum_assTokenDoamin").val($.trim(globalAssignTokenDomainPreviousPageNum));
	  	}
	}
	 
	 if(isPageCall==false){
		 	var size = 10;
		 	if(globalAssignTokenDomainPreviouspageSize!=''){
		 		size = globalAssignTokenDomainPreviouspageSize;
		 		count = searchCount;
		 	}
		 	if(token!="" || leftTime!=""){
		 		count = searchCount;
			}
		 	if(count==0){
		 		count = searchCount;
		 	}
			var maxPgaeNumber = count / size;
			var rem = count % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			$('#pageN_assTokenDoamin').html(parseInt(maxPgaeNumber));
			if(count == 0)
				$('#pageNum_assTokenDoamin').val(0);
			else 
				$('#pageNum_assTokenDoamin').val(1);
		}
	 
		 if(token=="" && leftTime==""){
			 searchAssignTokenDomainWithpageSize=false;
		 }
	}
			
	});
	}
	
	var globalDeassignTokenDomainPreviouspageSize="";
	var globalDeassignTokenDomainPreviousPageNum="";
	
	var userlogonId='';
	var token='';
	var status='';
	function showDeassign(isPageCall,isSearch){
	// start code for Bug #122 and #171 , added by Abhimanyu
	   if($("#pageId_deassTokenDoamin").length)
	   {
	   globalDeassignTokenDomainPreviouspageSize=$("#pageId_deassTokenDoamin").val();
	   globalDeassignTokenDomainPreviousPageNum=$("#pageNum_deassTokenDoamin").val();
	}
	// end code for Bug #122 and #171
	var associate="deassign";
	var value = $('.shadow_radio:checked').val();
	var domain=document.getElementById('domain_id').value;
	var myUrl= "token_showAssignDeassignTokenToDomain.action?operation="+associate+"&authType="+value+"&domainName="+domain;
	if(domain==""){
	alert("Please select Domain..").
		return;
	}
	if(isPageCall){
	  var pageNumber=document.getElementById('pageNum_deassTokenDoamin').value;
	  var size=document.getElementById('pageId_deassTokenDoamin').value;		
		myUrl += "&fetchSize="+size+"&pageNumber="+pageNumber;	
	}
	if(userlogonId!="" || token!="" || status!=""){
		isSearch=true;
	}
	
	if(isSearch){
	 userlogonId=document.getElementById('userlogonId').value;
	 token=document.getElementById('token').value;
	 status=document.getElementById('status').value;
		myUrl += "&tokenSerial="+token+"&userlogonId="+userlogonId+"&status="+status;	
    }
		
	   if(searchDeassignTokenDomainWithpageSize)    {  
	   	     if(myUrl.indexOf('fetchSize')==-1) { 
	   	    	 if($.trim(globalDeassignTokenDomainPreviouspageSize)!='')
	   	    		 myUrl+="&fetchSize="+globalDeassignTokenDomainPreviouspageSize; 
	   		   }
	   }
	   // end code for Bug #122 and #171
	// $('#block_assign_token_data').html('<span>Loading...</span>');
    $.ajax({
		type: "POST",  
		url: myUrl,
		data: "{}",
		async: true,
		dataType: "text",
		success: function(data) {
			if($.trim(data)=="sessionout"){
		
		testVal= document.getElementById('loginPage').value				
			window.location.replace(testVal);
		}
	var object = JSON.parse(data);
	
	var obj2=JSON.parse(object.tokenList);
	var obj1=JSON.parse(object.count);
	// start code for Bug #122 and #171 , added by Abhimanyu
	  if(searchDeassignTokenDomainWithpageSize){
		  count=obj1;
		  searchCount = obj1;
	  }
	  else {
		  count=obj1;
		  searchCount = obj1;
	  }
		//  obj1=count;
		
var content = '<h4>Remove Token</h4><div class="space15"></div>';
	content += '<div class="row-fluid new_filter">';
	content += '<div class="span6">';
	content += '<div class="pull-left" id="switch_app">';
	content += '<label>Size</label>';
	content += '<select id="pageId_deassTokenDoamin" onChange="fetchSize_deassTokenDoamin()" name="deassociationReasonListName" style="width:100%;">';
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
	// end code for bug id no #320 , added by abhimanyu
	content += '<option value="5000">5000</option>';
	// content += '<option value="10000">10000</option>';
	content += '</select>';
	content += '</div>';
	content += '</div>';
	content += '<div class="span6">';
	content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
	content += '<label>Page Number</label>';
	/*content += '<select onChange="getPageData_deassTokenDoamin()" id="pageNum_deassTokenDoamin"  >';
	content += '<option value="">-select Page-</option>';
	content += '</select>';*/
	content += ' <input type="text" id="pageNum_deassTokenDoamin" style="width:20%;background-color:white;" onChange="getPageData_deassTokenDoamin()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_deassTokenDoamin"></span>';
	content += '</div>';
	content += '</div>';
	content += '</div>';
	content += '<table class="table table-striped table-bordered" id="sample_2">';
	content += '<thead>';
	content += '<tr>';
	content += '<th  style="width:20px;"><input type="checkbox" class="group-checkable" id="checkBoxAssignAndDeassignToken2" data-set="#sample_2 .checkboxes" /></th>';
	content += '<th>Token / licenseKey</th>';
	content += '<th>Status</th>';
	content += '<th>User Name</th>';
	content += '</tr>';
	
	content += '<tr>';
	
	content += '<th style="padding-bottom: 20px;" width="8%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="searchDeassignToken()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
	
	content += '<th><input onkeydown="searchDeassignTokens(event)"  type="text" id="token" /></th>';				
				
	content += '<th><select name="status" id="status" >';
	content+='<option value="">--Status--</option>'; 
	content+='<option value="associated">Associated</option>';	
	content+='<option value="unassociated">Unassociated</option>';	
	content+='</select></th>';	
		
	content += '<th><input onkeydown="searchDeassignTokens(event)"  type="text" id="userlogonId" /></th>';
		
	content += '</tr>';
	content += '</thead>';
	if(obj2!=null&&obj2!=''){
	jQuery.each(obj2, function(i, v) {
		
	  content += "<tr><td><input type='checkbox' class='checkboxes' name='chkDeassignTokenDomain' value='"+v.token+"' /></td>" +
	  		"<td>"+v.token+"</td>" +
	  		"<td>"+v.status +"</td>" +
	  		"<td>"+ (v.userName!=null?v.userName:"") +"</td>" +
	  		"</tr>";
		});
	}
			else{
				content += "<tr><td style='text-align: center;' colspan='4' > No Record Found!</td></tr>";	
		}
	content += '</table>';
	content += '<div class="form-actions form-actions2">';
	content += '<button class="btn btn-primary" id="submitForDeassignToken" onclick="deassign()" >Submit</button>';
	content += '</div>';
	$('#block_assign_token_data').html(content);
	$("#sample_2").css("width","100%");
				
	$('#token').val(token);
	$('#status').val(status);
	$('#userlogonId').val(userlogonId);
		
	 if($.trim(globalDeassignTokenDomainPreviouspageSize) != '') {  
		 $("#pageId_deassTokenDoamin").val(globalDeassignTokenDomainPreviouspageSize);
		   fetchSize_deassTokenDoamin();
		   if(!searchDeassignTokenDomainWithpageSize)
			   $("#pageNum_deassTokenDoamin").val(globalDeassignTokenDomainPreviousPageNum);
		   else {
			   if(globalDeassignTokenDomainPreviousPageNum==0 && parseInt($('#pageN_deassTokenDoamin').text()) > 0)
				   globalDeassignTokenDomainPreviousPageNum="1";
			   $("#pageNum_deassTokenDoamin").val(globalDeassignTokenDomainPreviousPageNum);
		   }
	  }
	 
	
	 if(isPageCall==false){
		 	var size=10;
		 	if(globalDeassignTokenDomainPreviouspageSize!=''){
		 		size= globalDeassignTokenDomainPreviouspageSize;
		 		count = searchCount;
		 	}
		 	
		 	if(userlogonId!="" || token!="" || status!=""){
		 		count = searchCount;
			}
		 	if(count==0){
		 		count = searchCount;
		 	}
			var maxPgaeNumber = count / size;
			var rem = count % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			$('#pageN_deassTokenDoamin').html(parseInt(maxPgaeNumber));
			if(count == 0)
				$('#pageNum_deassTokenDoamin').val(0);
			else 
				$('#pageNum_deassTokenDoamin').val(1);
		   }	
	 
			 if(userlogonId=="" && token=="" && status==""){
				 searchDeassignTokenDomainWithpageSize=false;
			 }
		}
			
	});
}
		
	
	function showAssignDeassignDomainToken(){
		
		var associate=document.getElementById('assign_deassign').value;
		if(associate=="assign"){
		 try{document.getElementById('pageId_assTokenDoamin').value = '10';
		 document.getElementById('pageNum_assTokenDoamin').value = '1';}
		 catch(ex){
		 }
		showAssign(false,false);
		}
		if(associate=="deassign"){
		 try{document.getElementById('pageId_deassTokenDoamin').value = '10';
		 document.getElementById('pageNum_deassTokenDoamin').value = '1';}catch(ex){}
			showDeassign(false,false);
		}
		if(associate==""){
			alert("Please select Value from Assign/Deassign.")
		}
	
	}
	
	
	
	function assign(){
	
		var chks=document.getElementsByName('chkAssignTokenDomain');             
		var domain=document.getElementById('domain_id').value;
		var value = $('.shadow_radio:checked').val();
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added
																// by
			// puneet vats
		if($('input[type="checkbox"]:checked').length==0){
		alert("Please select license to assign");
			return;
		}
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
	
	
	id=id.substring(0,id.length-1);
	dataString='tokenSerial='+id+"&domainName="+domain+"&authType="+value+"&csrfPreventionSalt="+strutsToken;
	
	$.ajax({
		type: "POST",
	url: "token_associateTokenToDomain.action",
	data: dataString,
	dataType: "text",
	success: function(response){
		if($.trim(response)=="sessionout"){
	
	testVal= document.getElementById('loginPage').value				
		window.location.replace(testVal);
	}
	else if($.trim(response) == "success"){
					alert(response);
					searchAssignTokenDomainWithpageSize=true;
					showAssign(false,false);
					showManageToken(false,false);
				}
			}
		});
	}
	
	function deassign(){
	
			var chks=document.getElementsByName('chkDeassignTokenDomain');             
			var domain=document.getElementById('domain_id').value;
			var value = $('.shadow_radio:checked').val();
			var strutsToken=$('[name=csrfPreventionSalt]').val();// added
																	// by
			// puneet vats
			
			if($('input[type="checkbox"]:checked').length==0){
			alert("Please select license to deassign");
				return;
			}
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
			
			
			id=id.substring(0,id.length-1);
			dataString='tokenSerial='+id+"&domainName="+domain+"&authType="+value+"&csrfPreventionSalt="+strutsToken;
			$.ajax({
				type: "POST",
			url: "token_deassociateTokenToDomain.action",
			data: dataString,
			dataType: "text",
			success: function(response){
				if($.trim(response)=="sessionout"){
			testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			else	if($.trim(response) == "success"){
							alert(response);
							showDeassign(false,false);
							showManageToken(false,false);
						}
					}
				
				
				});
	}
	
	function searchAssignToken(){
		searchAssignTokenDomainWithpageSize=true;
		showAssign(false,true);
	}
	
	function searchDeassignToken() {
		searchDeassignTokenDomainWithpageSize=true;
		showDeassign(false,true);
	}
	
	 function searchAssignTokens(e)
	 {
	 	 if (e.keyCode === 13)   
	 		searchAssignToken();
	 }
	
	 function searchDeassignTokens(e)
	 {  
	 	 if (e.keyCode === 13)   
	 		 searchDeassignToken();
	 }