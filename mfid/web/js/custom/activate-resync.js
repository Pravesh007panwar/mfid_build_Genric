function removeFilter(){
	$('#token').val("");
	$('#timeRemaining').val("");
	$('#status').val("");
	$('#userlogonId').val("");
	
}
var searchCount;	
var countActivateResync;
var searchActivateResyncWithpageSize=false;

function getPageData_activateResync()
	{

		var size=document.getElementById('pageId_activateResync').value;
		if ($.trim(size) != '') {
		var totalPages =  $('#pageN_activateResync').text();
		var pageNumber=document.getElementById('pageNum_activateResync').value;
		if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_activateResync').val(1);}
		if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
			showActivateResyncToken(true,false);
		else 
			alert('Page should be less than or equal to page number.');
		}
	}

	
	function fetchSize_activateResync() {
	var size = document.getElementById('pageId_activateResync').value;
	if ($.trim(size) != '') {

		var maxSize = countActivateResync;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(countActivateResync==0){
			$('#pageNum_activateResync').val(0);
		} else{
			$('#pageNum_activateResync').val(1);
			$('#pageNum_activateResync').attr("disabled",false);
		} 				
		$('#pageN_activateResync').html(parseInt(maxPgaeNumber));
	  }
	}

	var globalActivateResyncPreviouspageSize="";
	var globalActivateResyncPreviousPageNum="";
	
	var tokenSerial="";
	var userLogonId="";
	var firstName="";
	var lastName="";
	var mobile="";
	var mail="";
	
	function showActivateResyncToken(pageCall,isSearch) {
		
		   if($("#pageId_activateResync").length)
		       {
			   globalActivateResyncPreviouspageSize=$("#pageId_activateResync").val();
			   globalActivateResyncPreviousPageNum=$("#pageNum_activateResync").val();
		        }
	
			var operation=document.getElementById('activate_resync').value;
			var myUrl="token_showActivateResyncToken.action?operation="+operation;
			
			if($.trim(operation) == '' ){
				alert("Please select value from Activate/Resync.");
				return;
			}
			if(pageCall)
			{
			
			var size=document.getElementById('pageId_activateResync').value;
			var pageNumber=document.getElementById('pageNum_activateResync').value;		
						
			myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber+"";	
			
			}
			if(tokenSerial!="" || userLogonId!="" || firstName!="" || lastName!="" || mobile!="" || mail!=""){
				isSearch=true;
			}
		if(isSearch){
			
			try{
			tokenSerial=document.getElementById('tokenSerial').value;
			 userLogonId=document.getElementById('userLogonId').value;
			 firstName=document.getElementById('firstName').value;
			 lastName=document.getElementById('lastName').value;
			 mobile=document.getElementById('mobile').value;
			 mail=document.getElementById('mail').value;
			myUrl+="&userlogonId="+encodeURIComponent(userLogonId)+"&firstname="+encodeURIComponent(firstName)+"&lastname="+encodeURIComponent(lastName)+"&mobile="+mobile+"&email="+encodeURIComponent(mail)+"&tokenSerial="+encodeURIComponent(tokenSerial);
			}
			catch (e) {
				alert(e)
				// TODO: handle exception
			}
			}
		
// start code for Bug #122, added by Abhimanyu
	    if(searchActivateResyncWithpageSize)
		      {  
	   	     if(myUrl.indexOf('fetchSize')==-1)
	   		   { if($.trim(globalActivateResyncPreviouspageSize)!='')
	   			myUrl+="&fetchSize="+globalActivateResyncPreviouspageSize; 
	   		   }
	        }
// end code for Bug #122			
		
		//alert(myUrl);
		if($.trim(operation) != '' )
		{
		$('#active_resync_hard_token_data').html('<span>Loading...</span>');
		
		  $.ajax
	({
	type: "POST",
		data: "{}",
		dataType: "text",
			async: false,
	 
		url: myUrl,
	
		success: function(data) {
			
			try{
				if($.trim(data)=="sessionout"){
					
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
			var object = JSON.parse(data);
			
			var obj2=JSON.parse(object.tokenList);
			var obj1=JSON.parse(object.count);

			/*if(searchActivateResyncWithpageSize)
	        	  obj1=countActivateResync;
			
			
	          countActivateResync=obj1;*/
			
			if(searchActivateResyncWithpageSize){
				countActivateResync=obj1;
				searchCount = obj1;
			} else {
				countActivateResync=obj1;
				searchCount = obj1;
			}
					
			}
			catch (e) {
				
				// TODO: handle exception
			}
				
			//	alert("data=== "+data);    
			////////////////////////////////////////////////////////////////////
			 content = '<div class="row-fluid new_filter">';
			content += '<div class="span6">';
				content += '<div class="pull-left" id="switch_app">';
				content += '<label>Size</label>';
				content += '<select id="pageId_activateResync" onChange="fetchSize_activateResync(),getPageData_activateResync();" name="deassociationReasonListName" style="width:100%;">';
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
				//content += '<option value="10000">10000</option>';
				
				content += '</select>';
	
				content += '</div>';
				content += '</div>';
				content += '<div class="span6">';
				content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
				content += '<label>Page Number</label>';
				/*content += '<select onChange="getPageData_activateResync()" id="pageNum_activateResync"  >';
				content += '<option value="">-select Page-</option>';
				content += '</select>';*/
				content += ' <input type="text" id="pageNum_activateResync" style="width:20%;background-color:white;" onChange="getPageData_activateResync()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_activateResync"></span>';
				content += '</div>';
			content += '</div>';
			content += '</div>';
			///////////////////////////////////////////////////////////////////
					 content += '<table class="table table-striped table-bordered" id="sample_1">';
					content += '<thead>';
						content += '<tr>';
							content += '<th  style="width:20px;"></th>';
							content += '<th>Token</th>';
							content += '<th>User LogonId</th>';
							content += '<th>First Name</th>';
							content += '<th>Last Name</th>';
							content += '<th>Email</th>';
							content += '<th>Mobile</th>';
						content += '</tr>';
					
						content += '<tr>';
							/*content += '<th></th>';
							content += '<th>Token</th>';
							content += '<th>User LoginId</th>';
							content += '<th>First Name</th>';
							content += '<th>Last Name</th>';
							content += '<th>Email</th>';
							content += '<th>Mobile</th>';*/
						//content += '<th><input type="button" onClick="activateResyncSearch()" /></th>';
						content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="activateResyncSearch()" ><i style="font-size:20px;" class="icon-search"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchResyncTokens(event)"  id="tokenSerial" /></th>';
						content += '<th><input type="text" onkeydown="searchResyncTokens(event)"  id="userLogonId" /></th>';
						content += '<th><input type="text" onkeydown="searchResyncTokens(event)"  id="firstName" /></th>';
						content += '<th><input type="text" onkeydown="searchResyncTokens(event)"  id="lastName" /></th>';
						content += '<th><input type="text" onkeydown="searchResyncTokens(event)"  id="mail" /></th>';
						content += '<th><input type="text" onkeydown="searchResyncTokens(event)"  id="mobile" /></th>';
						content += '</tr>';
					content += '</thead>';
					try{
						if(obj2!=null && obj2!=''){
							jQuery.each(obj2, function(i, v) {
				
					  content += "<tr><td><input type='radio' name='activate_token_radio' class='checkboxes'   value='"+v.tokenId+"' /></td><td>"+v.token+"</td><td>"+v.userName +"</td><td>"+v.firstName +"</td><td>"+v.lastName +"</td><td>"+v.email +"</td><td>"+v.mobile +"</td></tr>";
					}); 
						}
						else
							content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";
					
					content += "</table>";
					content +='<div class="form-actions form-actions2">  <button class="btn btn-primary" type="button"  onclick="showEnterOtpPage()" >Submit</button>  </div>';
					}
					catch(e){"error==="+alert(e);}
					
					
					$('#active_resync_hard_token_data').html(content);
					
					$("#sample_1").css("width","100%");
					
					/*$('#sample_1').dataTable()
					  .columnFilter({  sPlaceHolder: "head:after",
						aoColumns: [ null, 
									 { type: "text" },
									 { type: "text" },
									 { type: "text" },
									 { type: "text" },
									  { type: "text" },
									   { type: "text" }
									]
					});*/
		 // start code for Bug #122  , added by Abhimanyu
					
					$('#tokenSerial').val(tokenSerial);
					$('#userLogonId').val(userLogonId);
					$('#firstName').val(firstName);
					$('#lastName').val(lastName);
					$('#mail').val(mail);
					$('#mobile').val(mobile);
							
					if($.trim(globalActivateResyncPreviouspageSize) != ''){  
						$("#pageId_activateResync").val(globalActivateResyncPreviouspageSize);
				      fetchSize_activateResync();
				         if(!searchActivateResyncWithpageSize)
				         $("#pageNum_activateResync").val(globalActivateResyncPreviousPageNum);
				         else {
				        	 if(globalActivateResyncPreviousPageNum==0 && parseInt($('#pageN_activateResync').text()) > 0){
				        		 globalActivateResyncPreviousPageNum="1";
				        	  $("#pageNum_activateResync").val(globalActivateResyncPreviousPageNum);
				        	 }
				         }
				     }
					 
		 // end code for Bug #122 		
					
						if(pageCall==false){
							var size=10;
							if(globalActivateResyncPreviouspageSize!=''){
								size= globalActivateResyncPreviouspageSize;
								countActivateResync = searchCount;
							}
							
							if(tokenSerial!="" || userLogonId!="" || firstName!="" || lastName!="" || mobile!="" || mail!=""){
								countActivateResync = searchCount;
							}
							if(countActivateResync==0){
								countActivateResync = searchCount;
							}
							var maxPgaeNumber = countActivateResync / size;
							var rem = countActivateResync % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN_activateResync').html(parseInt(maxPgaeNumber));
							if(countActivateResync == 0)
								$('#pageNum_activateResync').val(0);
							else 
								$('#pageNum_activateResync').val(1);
						}
						if(tokenSerial=="" || userLogonId=="" || firstName=="" || lastName=="" || mobile=="" || mail==""){
							searchActivateResyncWithpageSize=false;
						}
					
				}
	
      });
		
		
		}
	}
	
	function showEnterOtpPage()
	{
		var tokenSerial = jQuery("input[name='activate_token_radio']:checked").val()
	//alert("tokenSerial===="+tokenSerial)
		if(tokenSerial==undefined){
			alert("Please select a Token.");
			return;}
		var operation=document.getElementById('activate_resync').value;
		if(operation=="activate"){
			activateHardToken();
		}
		else{
		var content = '<table class="table table-striped table-bordered" id="tableId">';
		 content += "<tr><td ><label class='span4 offset4'>Enter OTP </label><input  type='hidden' value='"+tokenSerial+"' id='tValue' /></td>";
		  content += "<td><input class='span4 offset3' type='text' name='tokenId' id='tokenId' /></td></tr>";
		  content += "<tr><td colspan='2'><input type='button' class='btn btn-primary span2 offset5' name='submitbutton3' id='submitbutton3' value='Activate' onclick='check()' ></td></tr>";
		content += "</table>";
		$('#active_resync_hard_token_data').html(content);
	}
		
	}
	
	
	function activateHardToken()
	{
		var seedId = jQuery("input[name='activate_token_radio']:checked").val()
		//alert("seedId==="+seedId)
		try{
		$.ajax({
			type: "POST",
			dataType:"text",
			url: "token_activateHardToken.action?tokenId="+seedId,
			data: "{}",
			success: function(response){
				
			//	alert(response);
				resVal=response;
				if($.trim(response)=="sessionout")
					{
					alert(response);
					var testVal=document.getElementById('loginPage').value;
					window.location.replace(testVal);
					}
				else if($.trim(response) == "success"){
					alert(response);
					showActivateResyncToken(false,false);
					showManageToken(false,false);
				}
				else {
					alert(response);
					showActivateResyncToken(false,false);
					showManageToken(false,false);
				}
			}
		});
		}catch(e){alert(e);}
	
		
		
	}
	
	
	
	function addRow(tableID) {
		//alert("shyam")
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount - 1);
		var colCount = table.rows[0].cells.length;
		for ( var i = 0; i < colCount; i++) {
			var newcell = row.insertCell(i);
			newcell.innerHTML = table.rows[0].cells[i].innerHTML;
			switch (newcell.childNodes[0].type) {
			case "text":
				newcell.childNodes[0].value = "";
				newcell.childNodes[0].style = "";
				newcell.childNodes[0].name = "tokenId" + (rowCount - 1);
				newcell.childNodes[0].id = "tokenId" + (rowCount - 1);
				break;
			default:
				newcell.childNodes[0].innerHTML = " Enter OTP " + (rowCount);
				
			}
		}
	}

	function check() {
		try {
			var tokenSerial = document.getElementById('tValue').value;	
			xmlHttp = GetXmlHttpObject()
			var table = document.getElementById('tableId');
			var rowCount = table.rows.length;
			rowCount = rowCount -1;	
			var url = "token_activateTokenAjax.action";
			//alert("rowCount==="+rowCount)
			if (rowCount == 1) {
				var firstOtp = document.getElementById('tokenId').value;
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ firstOtp;
			}
			if (rowCount == 2) {
				var firstOtp = document.getElementById('tokenId').value;
				if (firstOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var secondOtp = document.getElementById('tokenId1').value;
				if (secondOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				//alert("secondOtp== "+secondOtp)
				var otpSet;
				otpSet = firstOtp + "," + secondOtp;
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ otpSet;
			}
			if (rowCount == 3) {
				var firstOtp = document.getElementById('tokenId').value;
				if (firstOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var secondOtp = document.getElementById('tokenId1').value;
				if (secondOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var thirdOtp = document.getElementById('tokenId2').value;
				if (thirdOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var otpSet = firstOtp + "," + secondOtp + "," + thirdOtp;
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ otpSet;
			}
			if (rowCount == 4) {
				var firstOtp = document.getElementById('tokenId').value;
				if (firstOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var secondOtp = document.getElementById('tokenId1').value;
				if (secondOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var thirdOtp = document.getElementById('tokenId2').value;
				if (thirdOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fourthOtp = document.getElementById('tokenId3').value;
				if (fourthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var otpSet = firstOtp + "," + secondOtp + "," + thirdOtp + ","
						+ fourthOtp;
				//alert("otpSet===" + otpSet);
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ otpSet;
			}

			if (rowCount == 5) {
				var firstOtp = document.getElementById('tokenId').value;
				if (firstOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var secondOtp = document.getElementById('tokenId1').value;
				if (secondOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var thirdOtp = document.getElementById('tokenId2').value;
				if (thirdOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fourthOtp = document.getElementById('tokenId3').value;
				if (fourthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fifthOtp = document.getElementById('tokenId4').value;
				if (fifthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var otpSet = firstOtp + "," + secondOtp + "," + thirdOtp + ","
						+ fourthOtp + "," + fifthOtp;
				//alert("otpSet===" + otpSet);
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ otpSet;
			}

			if (rowCount == 6) {
				var firstOtp = document.getElementById('tokenId').value;
				if (firstOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var secondOtp = document.getElementById('tokenId1').value;
				if (secondOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var thirdOtp = document.getElementById('tokenId2').value;
				if (thirdOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fourthOtp = document.getElementById('tokenId3').value;
				if (fourthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fifthOtp = document.getElementById('tokenId4').value;
				if (fifthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var sixthOtp = document.getElementById('tokenId5').value;
				if (sixthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var otpSet = firstOtp + "," + secondOtp + "," + thirdOtp + ","
						+ fourthOtp + "," + fifthOtp + "," + sixthOtp;
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ otpSet;

			}
			if (rowCount == 7) {
				var firstOtp = document.getElementById('tokenId').value;
				if (firstOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var secondOtp = document.getElementById('tokenId1').value;
				if (secondOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var thirdOtp = document.getElementById('tokenId2').value;
				if (thirdOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fourthOtp = document.getElementById('tokenId3').value;
				if (fourthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fifthOtp = document.getElementById('tokenId4').value;
				if (fifthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var sixthOtp = document.getElementById('tokenId5').value;
				if (sixthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var seventhOtp = document.getElementById('tokenId6').value;
				if (seventhOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var otpSet = firstOtp + "," + secondOtp + "," + thirdOtp + ","
						+ fourthOtp + "," + fifthOtp + "," + sixthOtp + ","
						+ seventhOtp;
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ otpSet;

			}

			if (rowCount == 8) {
				var firstOtp = document.getElementById('tokenId').value;
				if (firstOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var secondOtp = document.getElementById('tokenId1').value;
				if (secondOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var thirdOtp = document.getElementById('tokenId2').value;
				if (thirdOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fourthOtp = document.getElementById('tokenId3').value;
				if (fourthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fifthOtp = document.getElementById('tokenId4').value;
				if (fifthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var sixthOtp = document.getElementById('tokenId5').value;
				if (sixthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var seventhOtp = document.getElementById('tokenId6').value;
				if (seventhOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var eightOtp = document.getElementById('tokenId7').value;
				if (eightOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}

				var otpSet = firstOtp + "," + secondOtp + "," + thirdOtp + ","
						+ fourthOtp + "," + fifthOtp + "," + sixthOtp + ","
						+ seventhOtp + "," + eightOtp;
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ otpSet;

			}

			if (rowCount == 9) {
				var firstOtp = document.getElementById('tokenId').value;
				if (firstOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var secondOtp = document.getElementById('tokenId1').value;
				if (secondOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var thirdOtp = document.getElementById('tokenId2').value;
				if (thirdOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fourthOtp = document.getElementById('tokenId3').value;
				if (fourthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fifthOtp = document.getElementById('tokenId4').value;
				if (fifthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var sixthOtp = document.getElementById('tokenId5').value;
				if (sixthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var seventhOtp = document.getElementById('tokenId6').value;
				if (seventhOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var eightOtp = document.getElementById('tokenId7').value;
				if (eightOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var ninthOtp = document.getElementById('tokenId8').value;
				if (ninthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var otpSet = firstOtp + "," + secondOtp + "," + thirdOtp + ","
						+ fourthOtp + "," + fifthOtp + "," + sixthOtp + ","
						+ seventhOtp + "," + eightOtp + "," + ninthOtp;
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ otpSet;
			}

			if (rowCount == 10) {
				var firstOtp = document.getElementById('tokenId').value;
				if (firstOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var secondOtp = document.getElementById('tokenId1').value;
				if (secondOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var thirdOtp = document.getElementById('tokenId2').value;
				if (thirdOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fourthOtp = document.getElementById('tokenId3').value;
				if (fourthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var fifthOtp = document.getElementById('tokenId4').value;
				if (fifthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var sixthOtp = document.getElementById('tokenId5').value;
				if (sixthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var seventhOtp = document.getElementById('tokenId6').value;
				if (seventhOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var eightOtp = document.getElementById('tokenId7').value;
				if (eightOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var ninthOtp = document.getElementById('tokenId8').value;
				if (ninthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var tenthOtp = document.getElementById('tokenId8').value;
				if (tenthOtp == '') {					
					alert("Please enter otp.");
					 return false;
				}
				var otpSet = firstOtp + "," + secondOtp + "," + thirdOtp + ","
						+ fourthOtp + "," + fifthOtp + "," + sixthOtp + ","
						+ seventhOtp + "," + eightOtp + "," + ninthOtp + ","
						+ tenthOtp;
				url = url + "?tokenId=" + tokenSerial + "&otpList="
						+ otpSet;

			}

			//alert("url=== "+url)
			xmlHttp.onreadystatechange = function() {

				stateChanged();
			};
			xmlHttp.open("GET", url, true)
			xmlHttp.send(null)
			} catch (e) {
			//alert(e);
		}
	}
	function stateChanged() {
		try {  
		       
		       $('#submitbutton3').prop('disabled', true);
		       $("#loading").css("display","block");
		       $('body').css("opacity","0.8");
			if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
				var showdata = xmlHttp.responseText;
				if (showdata.match(/false/)) {
					//alert("Please enter next otp to resync");
					addRow('tableId');
				//	showEnterOtpPage();
				}
				else if (showdata.match(/true/)) {
					alert(showdata);
				//	document.getElementById('messageBoard').innerHTML = "Token is Activated now.";
				}
				else {
					alert(showdata);
					showActivateResyncToken(false,false);
				}
				   $('#submitbutton3').prop('disabled', false);
				    $("#loading").css("display","none");
				     $('body').css("opacity","1");

			}
		} catch (e) {
			//alert(e);
		}
	}
	function GetXmlHttpObject() {
		var xmlHttp = null;
		try {
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		return xmlHttp;
	}
	
	function activateResyncSearch() {
		//alert("im")
		searchActivateResyncWithpageSize=true;
		showActivateResyncToken(false,true)
	}
	
	

	 function searchResyncTokens(e)
	 {
	 	 if (e.keyCode === 13)   
	 		activateResyncSearch();
	 }