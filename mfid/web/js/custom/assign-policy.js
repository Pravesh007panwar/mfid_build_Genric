//var urlId="admin/block_active_associate_deassociate.jsp";
function removeFilter(){
	$('#searchUserId').val("");
	$('#searchCommonPolicyName').val("");
	$('#searchOfflineNames').val("");
	$('#searchLockNames').val("");
	$('#searchNtPolicyNames').val("");
	$('#searchTaPolicyNames').val("");
	$('#searchTRPolicyNames').val("");
	$('#searchAuthSrcPolicyName').val("");
}
var count;
var countHardToken;
var countBioToken;
var countEmergencyToken;
var countMobileToken;
var countPushToken;
var countSmsToken;
var countNoToken;

var searchCount;

var searchAssignPolicyhardTokenWithpageSize=false;
var searchAssignUserDevicePolicyWithpageSize=false;
var searchAssignUserDeviceOSPolicyWithpageSize=false;

var searchAssignPolicyBioTokenWithpageSize=false;
var searchAssignPolicyEmergencyTokenWithpageSize=false;
var searchAssignPolicyMobileTokenWithpageSize=false;
var searchAssignPolicyNoTokenWithpageSize=false;
var searchAssignPolicyPushTokenWithpageSize=false;
var searchAssignPolicySmsTokenWithpageSize=false;
var searchUserId ='';

var searchCommonPolicyName='';
var searchOfflineNames='';
var searchLockNames='';
var searchNtPolicyNames='';
var searchTaPolicyNames='';
var searchAuthSrcPolicyName='';
var searchCountryPolicyNames='';
var searchTRPolicyNames='';
var searchEmergencyNames='';
var searchUserId_1='';
var searchUserId_4='';
var searchBlockAndroidOsPolicy='';
var searchBlockIphoneOsPolicy='';
var searchNotifyAndroidOsPolicy='';
var searchNotifyIphoneOsPolicy='';

var searchMobileAppUptodate='';
var searchFullDiskEncryption='';
var searchScreenLock='';
var searchDeviceNotRooted='';
var searchPassesGoogleSafety='';
var searchFingerPrint='';
var searchTouchOrFace='';


function getPageData_activateResync()
{

	var size=document.getElementById('pageId_activateResync').value;
	var pageNumber=document.getElementById('pageNum_activateResync').value;
	showAssociateRandom(true,false);


}


function fetchSize_activateResync(){
	var size=document.getElementById('pageId_activateResync').value;

	//alert("count:- fetchSize_activateResync->"+size);

	var maxSize=count;

	var maxPgaeNumber=maxSize/size;
	var rem=maxSize%size;
	if(rem>=0){
		maxPgaeNumber=maxPgaeNumber+1;
	}

	document.getElementById('pageNum_activateResync').options.length = 1;
	var page = document.getElementById('pageNum_activateResync');

	var pageOpt = page.options;

	for(var i=1;i<maxPgaeNumber;i++)
	{

		pageOpt[pageOpt.length] = new Option(i,i);
	}
}

function app_policy(){


	domainName=document.getElementById('app_pol_domain_select').value;
	
	$('#block_policy_app_data').html('<span>Loading...</span>');
	$.ajax({
		type: "POST",  
		url: "policy_showApplicationsWithPolicy.action?domainName="+domainName,
		dataType: "text",
		success: function(data) {
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}

			var obj = JSON.parse(data);

			var obj1 = JSON.parse(obj.appPolicyList);
			var obj2 = JSON.parse(obj.appDevicePolicyList);
			var obj3 = JSON.parse(obj.appDeviceOSPolicyList);
			var obj4 = JSON.parse(obj.deviceOSVoList);

			var content = '<h4>Application Policy</h4>';
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th style="width:20px;"><input type="checkbox" id="checkall1" data-set="#sample_1 .checkboxes"></th>';
			content += '<th style="width:71px;">Application</th>';
			content += '<th><select name="" id="noTokenPolicy"><option value="">-Select NoTokenPolicy-</option><option value="1">Yes</option><option value="0">No</option></select></th>';
			content += '<th><select name="" id="pinCheckPolicy"><option value="">-Select PinCheckPolicy</option><option value="1">Yes</option><option value="0">No</option></select></th>';
			content += '<th><select name="" id="userNotExistPolicy"><option value="">-Select UserNotExistPolicy-</option><option value="1">Yes</option><option value="0">No</option></select></th>';

			content += '</tr>';
			content += '</thead>';
			if(obj1!=null && obj1!='')
				{
				content += "<div id='checkbox01'>";	
			jQuery.each(obj1, function(i, v) {
				i = (i+1);
				content += "<tr>";



				content += "<td><input class='checkboxes2' name='checkApp' type='checkbox' value="+v.appId+"></td>";
				content += "<td>"+v.application+"</td>";
				content += "<td>"+v.noTokenPolicy+"</td>";
				content += "<td>"+v.pinPolicy+"</td>";
				content += "<td>"+v.userNotExistPolicy+"</td>";
				content += "</tr>";
			});
			content += "</div>";
				}
			content += "</table>";
			content += '<div class="form-actions form-actions2" ><button type="button"  onClick="assignAppPolicy()"  class="btn btn-primary" >Submit </button></div>';
			
			
			var optionCreaterOSListForAndroid =""; 
			var optionCreaterOSListForIphone ="";	
		 
		jQuery.each(obj4, function(i, v) {
		 
		 
			if(v.deviceOSType == 'android' || v.deviceOSType == 'default')
			    optionCreaterOSListForAndroid +='<option value="'+v.deviceOsId+'">'+v.deviceOSVersion+'</option>';
			 
			 if(v.deviceOSType == 'iphone' || v.deviceOSType == 'default')
				 optionCreaterOSListForIphone +='<option value="'+v.deviceOsId+'">'+v.deviceOSVersion+'</option>';
		 		 
		});

			 
		 
			
			
			content += '<h4>Application Device OS policy</h4>';
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th style="width:20px;"><input type="checkbox" id="checkall12" data-set="#sample_2 .checkboxes"></th>';
			content += '<th>Application</th>';
			
			
			content += '<th><select name="" id="block_android_os_policy"><option value="">-Select Block Android OS Policy-</option>'+optionCreaterOSListForAndroid+'</select></th>';
			content += '<th><select name="" id="notify_android_os_policy"><option value="">-Select Notify Android OS Policy-</option>'+optionCreaterOSListForAndroid+'</select></th>';
			content += '<th><select name="" id="block_iphone_os_policy"><option value="">-Select Block Iphone OS Policy-</option>'+optionCreaterOSListForIphone+'</select></th>';
			content += '<th><select name="" id="notify_iphone_os_policy"><option value="">-Select Notify Iphone OS Policy-</option>'+optionCreaterOSListForIphone+'</select></th>';
			content += '</tr>';
			content += '</thead>';
			if(obj2!=null && obj2!='')
				{
				content += "<div id='checkbox02'>";
			jQuery.each(obj3, function(i, v) {
				i = (i+1);
				content += "<tr>";

                content += "<td><input class='checkboxes3' name='checkApp3' type='checkbox' value="+v.appId+"></td>";
            	content += "<td style='width:80px;'>"+v.application+"</td>";
			    content += "<td>"+v.blockAndroidOsPolicy+"</td>";
			    content += "<td>"+v.notifyAndroidOsPolicy+"</td>";
				content += "<td>"+v.blockIphoneOsPolicy+"</td>";
			    content += "<td>"+v.notifyIphoneOsPolicy+"</td>";
			    content += "</tr>";
			});
			content += "</div>";
				}
			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignAppDeviceOSPolicy()"  class="btn btn-primary">Submit </button></div>';
			
			
			
			
			content += '<h4>Application Device policy</h4>';
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th style="width:20px;"><input type="checkbox" id="checkall" data-set="#sample_2 .checkboxes" class="data-checkbox"></th>';
			content += '<th style="width:71px;">Application</th>';
			content += '<th><select name="" id="mobileAppUptoDatePolicy"><option value="">-Select MobileAppUptoDatePolicy-</option><option value="0">Do nothing</option><option value="1">Notify</option><option value="2">Force upgrade</option></select></th>';
			content += '<th><select name="" id="fullDiskEncryptionPolicy"><option value="">-Select FullDiskEncryptionPolicy-</option><option value="1">Yes</option><option value="0">No</option></select></th>';
			content += '<th><select name="" id="screenLockPolicy"><option value="">-Select ScreenLockPolicy-</option><option value="1">Yes</option><option value="0">No</option></select></th>';
			content += '<th><select name="" id="deviceNotRootedPolicy"><option value="">-Select DeviceNotRootedPolicy-</option><option value="1">Yes</option><option value="0">No</option></select></th>';
			content += '<th><select name="" id="passesGoogleSafetyPolicy"><option value="">-Select PassesGoogleSafetyPolicy-</option><option value="1">Yes</option><option value="0">No</option></select></th>';
			content += '<th><select name="" id="fingerPrintPolicy"><option value="">-Select FingerPrintPolicy-</option><option value="1">Yes</option><option value="0">No</option></select></th>';
			content += '<th><select name="" id="touchOrFaceIdPolicy"><option value="">-Select TouchOrFaceIdPolicy-</option><option value="1">Yes</option><option value="0">No</option></select></th>';
			content += '</tr>';
			content += '</thead>';
			if(obj2!=null && obj2!='')
			     {
				content += "<div id='checkbox03'>";
			jQuery.each(obj2, function(i, v) {
				i = (i+1);
				content += "<tr>";

				content += "<td><input class='checkboxes1' name='checkApp2' type='checkbox' value="+v.appId+"></td>";
				content += "<td>"+v.application+"</td>";
				content += "<td>"+v.mobileAppUpTodatePolicy+"</td>";
				content += "<td>"+v.fullDiskEncryptionPolicy+"</td>";
				content += "<td>"+v.screenLockPolicy+"</td>";
				content += "<td>"+v.deviceNotRootedPolicy+"</td>";
				content += "<td>"+v.passesGoogleSafetyPolicy+"</td>";
				content += "<td>"+v.fingerPrintPolicy+"</td>";
				content += "<td>"+v.touchOrFaceIdPolicy+"</td>";
				content += "</tr>";
			});
			content += "</div>";
				}
			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignAppDevicePolicy()"  class="btn btn-primary">Submit </button></div>';
			$('#block_policy_app_data').html(content);
			$("#sample_1").css("width","100%");
			//oTable = $('#sample_1').dataTable();
			
 
			
			
		}

	});


}


function user_policy(authType){

	$('#block_policy_user_data').html('<span>Loading...</span>');
	/*$.ajax({
			type: "POST",  
			url: "policy.json",
			dataType: "json",
			success: function(data) {
	 */
	if(authType =='Hard'){
		hardTokenTbl(false,false);
	}else if(authType=='Bio'){
		bioTokenTbl(false,false);
	}else if(authType=='Emergency'){
		emergencyTokenTbl(false,false);
	}else if(authType=='Mobile'){
		mobileTokenTbl(false,false);
	}else if(authType=='Push'){
		pushTokenTbl(false,false);
	}else if(authType=='Sms'){
		smsTokenTbl(false,false);
	}
	else if(authType=='No'){
		noTokenTbl(false,false);
	}
	/*else if(authType=='IP'){
		ipTokenTbl();
	}*/

	//}

	//});


}


var globalPreviouspagehardTokenSize="";
var globalPreviousPagehardTokenNum="";
function hardTokenTbl(pageCall ,isSearch){
	  appName=document.getElementById('usr_app_select').value;
	  domainName=document.getElementById('usr_domain_select').value;
	  
	// start code for bug id 324 , added by abhimanyu
	  if($("#pageId").length)
	     {
		  globalPreviouspagehardTokenSize=$("#pageId").val();
		  globalPreviousPagehardTokenNum=$("#pageNum").val();
	    }
	   var myUrl="policy_showAllHardUsers.action?appName="+appName+"&domainName="+domainName;
	   var dataString="";
	   
	   if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			 	        if($.trim(size) == "")
							 size="10";
						if($.trim(pageNumber) == "")
							 pageNumber="1";
			  myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
	   
	   if(searchUserId!="" || searchCommonPolicyName!="" || searchOfflineNames!="" || searchLockNames!="" || searchNtPolicyNames!="" 
		   || searchTaPolicyNames!="" || searchAuthSrcPolicyName!="" ){
			isSearch=true;
		} 
	   
	   
	   if(isSearch){
		   try{
			 searchUserId=document.getElementById('searchUserId').value;
			 	searchUserId = searchUserId.replace(/\s/g, "");
			 searchCommonPolicyName=document.getElementById('searchCommonPolicyName').value;
			 searchOfflineNames=document.getElementById('searchOfflineNames').value;
			 searchLockNames=document.getElementById('searchLockNames').value;
			 searchNtPolicyNames=document.getElementById('searchNtPolicyNames').value;
			 searchTaPolicyNames=document.getElementById('searchTaPolicyNames').value;
			 searchAuthSrcPolicyName=document.getElementById('searchAuthSrcPolicyNames').value;
			
			//alert(searchAuthSrcPolicyName);
			var searchCountryPolicyNames="";
			//document.getElementById('searchCountryPolicyNames').value;
			
		   }catch(err){}
		//	alert("Token:  "+token);
			//myUrl+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
			dataString+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
		  
		   }
	   
	   if(searchAssignPolicyhardTokenWithpageSize) { 
		   if(myUrl.indexOf('fetchSize')==-1){ 
			   if($.trim(globalPreviouspagehardTokenSize)!='') { 
				   if(myUrl.indexOf('?')==-1)
  	    	        myUrl+="?fetchSize="+globalPreviouspagehardTokenSize; 
  	    	     else
  	    	    	 myUrl+="&fetchSize="+globalPreviouspagehardTokenSize; 
  	    	 }
  	       }
  	    }
	   
	
	$.ajax({
		type: "POST",  
		url: myUrl,
		data:dataString,
		dataType: "text",
		success: function(data) {
			
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}

			var object = JSON.parse(data);
			var obj1=  JSON.parse(object.userPolicyList);			
			var obj2 = JSON.parse(object.commonPolicyList);
			var obj3 = JSON.parse(object.offlineList);
			var obj4 = JSON.parse(object.lockPolicyList);
			var obj5 = JSON.parse(object.count);
			var obj6 = JSON.parse(object.ntPolicyList);
			var obj7 = JSON.parse(object.tokenActivationPolicyList);
			var obj8 = JSON.parse(object.countryPolicyList);
			var obj9 = JSON.parse(object.authSourcePolicyList);
			count=obj5;
			
			/*if(searchAssignPolicyhardTokenWithpageSize)
		    	obj5=countHardToken;
			    countHardToken = obj5;*/
			if(searchAssignPolicyhardTokenWithpageSize){
				countHardToken = obj5;
				searchCount = obj5;
			} else {
				countHardToken = obj5;
				searchCount = obj5;
			}
			
			var content = '';
	  
		    content += '<div class="row-fluid new_filter">';
		    content += '<div class="span6">';
			content += '<div class="pull-left" id="switch_app">';
			content += '<label>Size</label>';
			content += '<select id="pageId" onChange="fetchSizeHardToken(),getPageDataHardToken();" style="width:100%;">';
			content += '<option value="">Select Size</option>';
			content += '<option value="10">10</option>';
			content += '<option value="20">20</option>';
			content += '<option value="50">50</option>';
			content += '<option value="100">100</option>';
			content += '<option value="200">200</option>';
			content += '<option value="500">500</option>';
			content += '<option value="1000">1000</option>';
			content += '<option value="2000">2000</option>';
			content += '<option value="5000">5000</option>';
			//content += '<option value="10000">10000</option>';
			content += '</select>';

			content += '</div>';
			content += '</div>';
			
			content += '<div class="span6">';
			content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
			content += '<label>Page Number</label>';
			/*content += '<select onChange="getPageDataHardToken()" id="pageNum"  >';
			content += '<option value="">-select Page-</option>';
			content += '</select>';*/
			content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageDataHardToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
			content += '</div>';
			content += '</div>';
			
			
		// end code for bug id 324 , added by abhimanyu
			
			
			content += '<h4>User Policy</h4>';
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th width="6%"><input type="checkbox" id="checkAll5" data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
			content += '<th>User LogonId</th>';

			content += '<th><select name="" id="commonPolicyName"><option value="">Select Common policy</option>';
			try{
				if(obj2!=null && obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			//<option value="">Mobile Token policy1</option></select></th>';
			content += '<th><select name="" id="offlineNames"><option value="">Select Offline policy</option>';
			try{
				if(obj3!=null && obj3!='')
					{
				jQuery.each(obj3, function(i, v) {
					var temp=obj3[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th><select name="" id="lockNames"><option value="">Select LockoutAttempt policy</option>';
			try{
				if(obj4!=null && obj4!='')
					{
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			content += '<th><select name="" id="ntPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			content += '<th><select name="" id="taPolicyNames"><option value="">Select Token Activation policy</option>';
			try{
				if(obj7!=null && obj7!='')
					{
				jQuery.each(obj7, function(i, v) {
					var temp=obj7[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th ><select name="" id="authSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj9!=null && obj9!='')
					{
				jQuery.each(obj9, function(i, v) {
					var temp=obj9[i];

					content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
		/*	content += '<th><select name="" id="countryPolicyNames"><option value="">Select Country policy</option>';
			try{
				if(obj8!=null && obj8!='')
					{
				jQuery.each(obj8, function(i, v) {
					var temp=obj8[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	*/
			content += '</tr>';
			content += '</thead>';
// start code for bug id 324 , added by abhimanyu	
			
 
			
		    content += '<tr>';
			content += '<th class="policySubHeading" style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignPolicyHardTokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			content += '<th class="policySubHeading" ><input type="text" onkeydown="assignPolicyHardTokenSearch1(event)"  id="searchUserId" value=""/></th>';
			 
			content += '<th class="policySubHeading"><select name="" id="searchCommonPolicyName"><option value="">Select Common policy</option>';
			try{
				if(obj2!=null && obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			//<option value="">Mobile Token policy1</option></select></th>';
			content += '<th class="policySubHeading"><select name="" id="searchOfflineNames"><option value="">Select Offline policy</option>';
			try{
				if(obj3!=null && obj3!='')
					{
				jQuery.each(obj3, function(i, v) {
					var temp=obj3[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th class="policySubHeading"><select name="" id="searchLockNames"><option value="">Select LockoutAttempt policy</option>';
			try{
				if(obj4!=null && obj4!='')
					{
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			content += '<th class="policySubHeading"><select name="" id="searchNtPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			content += '<th class="policySubHeading"><select name="" id="searchTaPolicyNames"><option value="">Select Token Activation policy</option>';
			try{
				if(obj7!=null && obj7!='')
					{
				jQuery.each(obj7, function(i, v) {
					var temp=obj7[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th class="policySubHeading"><select name="" id="searchAuthSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj9!=null && obj9!='')
					{
				jQuery.each(obj9, function(i, v) {
					var temp=obj9[i];
					if(temp.authSourcePolId==searchAuthSrcPolicyName){
						content += '<option value="'+temp.authSourcePolId+'" selected>'+temp.authSourcePolTyp+'</option>';
					} else {
						content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
					}
					
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			
/*			content += '<th class="policySubHeading"><select name="" id="searchCountryPolicyNames"><option value="">Select Country policy</option>';
			try{
				if(obj8!=null && obj8!='')
					{
				jQuery.each(obj8, function(i, v) {
					var temp=obj8[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			
			content += '</select>';	 
			
			content += '</tr>';*/
	 
// end code for bug id 324 , added by abhimanyu			
			
			
			
			
			if(obj1!=null && obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				content += "<tr>";
				content += "<td><input class='checkboxes5' name='checkHardUsers' type='checkbox' value='"+v.username+"'></td>";
				content += "<td>"+v.username+"</td>";				 
				content += "<td>"+v.commonPolicy+"</td>";
				content += "<td>"+v.hardOfflinePolicyName+"</td>";
				content += "<td>"+v.hardLockPolicyName+"</td>";
				content += "<td>"+v.ntPolicyName+"</td>";
				content += "<td>"+v.taPolicyName+"</td>";
				//content += "<td>"+v.countryPolicyName+"</td>";
				//content += "<td>"+v.userPolicy+"</td>";
				content += "<td>"+v.authSourcePolicyType+"</td>";

				content += "</tr>";
			});
				}
			else
				{
				content += "<tr><td style='text-align: center;' colspan='8' > No Record Found!</td></tr>";
				}
			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignHardPolicy()"  class="btn btn-primary">Submit </button></div>';
			$('#block_policy_user_data').html(content);
			$("#sample_1").css("width","100%");
			//oTable = $('#sample_1').dataTable();
			
			
			$('#searchUserId').val(searchUserId);
			$('#searchCommonPolicyName').val(searchCommonPolicyName);
			$('#searchOfflineNames').val(searchOfflineNames);
			$('#searchLockNames').val(searchLockNames);
			$('#searchNtPolicyNames').val(searchNtPolicyNames);
			$('#searchTaPolicyNames').val(searchTaPolicyNames);
			$('#searchAuthSrcPolicyName').val(searchAuthSrcPolicyName);
			
			
			 if($.trim(globalPreviouspagehardTokenSize) != '') {
			        $("#pageId").val(globalPreviouspagehardTokenSize);
			       fetchSizeHardToken();
			       	if(!searchAssignPolicyhardTokenWithpageSize)
			    	   $("#pageNum").val(globalPreviousPagehardTokenNum);
			       	else {
			       		if(globalPreviousPagehardTokenNum==0 && parseInt($('#pageN').text()) > 0)
			       			globalPreviousPagehardTokenNum="1";
			       		$("#pageNum").val(globalPreviousPagehardTokenNum);
			       	}
			   }
			 //searchAssignPolicyhardTokenWithpageSize=false;
				if(pageCall==false){
					var size=10;
					if(globalPreviouspagehardTokenSize!=''){
						size=globalPreviouspagehardTokenSize;
						countHardToken = searchCount;
					}
					if(searchUserId!="" || searchCommonPolicyName!="" || searchOfflineNames!="" || searchLockNames!="" || searchNtPolicyNames!="" 
						   || searchTaPolicyNames!="" || searchAuthSrcPolicyName!="" ){
						countHardToken = searchCount;
					}
					if(countHardToken==0){
						countHardToken = searchCount;
					}
					var maxPgaeNumber = countHardToken / size;
					var rem = countHardToken % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN').html(parseInt(maxPgaeNumber));
					if(countHardToken == 0)
						$('#pageNum').val(0);
					else 
						$('#pageNum').val(1);
				}
				
				if(searchUserId=="" && searchCommonPolicyName=="" && searchOfflineNames=="" && searchLockNames=="" && searchNtPolicyNames=="" 
					   && searchTaPolicyNames=="" && searchAuthSrcPolicyName=="" ){
					searchAssignPolicyhardTokenWithpageSize=false;
				}
			
		}

	});
}






var globalPreviouspageEmergencyTokenSize="";
var globalPreviousPageEmergencyTokenNum="";
function emergencyTokenTbl(pageCall ,isSearch){
	
	appName=document.getElementById('usr_app_select').value;
	domainName=document.getElementById('usr_domain_select').value;
	
// start code for bug id 324 , added by abhimanyu
	  if($("#pageId").length)
	     {
		  globalPreviouspageEmergencyTokenSize=$("#pageId").val();
		  globalPreviousPageEmergencyTokenNum=$("#pageNum").val();
	    }
	   //alert("------ hardTokenTbl -------isSearch = "+isSearch);
	   
	   var myUrl="policy_showAllEmergencyUsers.action?appName="+appName+"&domainName="+domainName;
	   var dataString="";
	   
	   if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			 	        if($.trim(size) == "")
							 size="10";
						if($.trim(pageNumber) == "")
							 pageNumber="1";
			  myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
	   
	   
	   if(searchUserId!=""  ||  searchLockNames!="" || searchNtPolicyNames!="" 
		  || searchEmergencyNames!="" || searchAuthSrcPolicyName!="" ){
		   isSearch=true;
	   }
	   
	   if(isSearch){
		   try{
			searchUserId=document.getElementById('searchUserId').value;
				searchUserId = searchUserId.replace(/\s/g, "");
			 searchEmergencyNames=document.getElementById('searchEmergencyNames').value;
		     searchNtPolicyNames=document.getElementById('searchNtPolicyNames').value;
		     searchLockNames=document.getElementById('searchLockNames').value;
		     searchCountryPolicyNames="";//document.getElementById('searchCountryPolicyNames').value;
		     searchAuthSrcPolicyName=document.getElementById('searchAuthSrcPolicyNames').value;
		   }catch(err){}
		//	alert("Token:  "+token);
			//myUrl+="&userIds="+searchUserId+"&emergencyNames="+searchEmergencyNames+"&ntNames="+searchNtPolicyNames+"&lockNames="+searchLockNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
			dataString+="&userIds="+searchUserId+"&emergencyNames="+searchEmergencyNames+"&ntNames="+searchNtPolicyNames+"&lockNames="+searchLockNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
		  
		   }
	   
	   if(searchAssignPolicyEmergencyTokenWithpageSize) {  
		   if(myUrl.indexOf('fetchSize')==-1) { 
			   if($.trim(globalPreviouspageEmergencyTokenSize)!='') { 
				   if(myUrl.indexOf('?')==-1)
	    	        myUrl+="?fetchSize="+globalPreviouspageEmergencyTokenSize; 
	    	     else
	    	    	 myUrl+="&fetchSize="+globalPreviouspageEmergencyTokenSize; 
	    	 }
	       }
	    }
	   

	 $.ajax({
		type: "POST",  
		url: myUrl,
		data:dataString,
		dataType: "text",
		success: function(data) {
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}

			var object = JSON.parse(data);
			var obj1=JSON.parse(object.userPolicyList);			
			var obj2 = JSON.parse(object.emergencyPolicyList);
			var obj3 = JSON.parse(object.count);
			var obj4 = JSON.parse(object.ntPolicyList);
			var obj5 = JSON.parse(object.lockPolicyList);
			var obj6 = JSON.parse(object.countryPolicyList);
			var obj7 = JSON.parse(object.authSourcePolicyList);

			count=obj3;
			/*if(searchAssignPolicyEmergencyTokenWithpageSize)
		    	obj3=countEmergencyToken;
			    countEmergencyToken = obj3;	*/
			    
			if(searchAssignPolicyEmergencyTokenWithpageSize){
				 searchCount = obj3;
				 countEmergencyToken = obj3;
			}  else {
				searchCount = obj3;
				countEmergencyToken = obj3;
			}
			    
			    
	  var content = '';
			    
  // start code for bug id 324 , added by abhimanyu
	    content += '<div class="row-fluid new_filter">';
	    content += '<div class="span6">';
		content += '<div class="pull-left" id="switch_app">';
		content += '<label>Size</label>';
		content += '<select id="pageId" onChange="fetchSizeEmergencyToken(),getPageDataEmergencyToken();" style="width:100%;">';
		content += '<option value="">Select Size</option>';
		content += '<option value="10">10</option>';
		content += '<option value="20">20</option>';
		content += '<option value="50">50</option>';
		content += '<option value="100">100</option>';
		content += '<option value="200">200</option>';
		content += '<option value="500">500</option>';
		content += '<option value="1000">1000</option>';
		content += '<option value="2000">2000</option>';
		content += '<option value="5000">5000</option>';
		//content += '<option value="10000">10000</option>';
		content += '</select>';

		content += '</div>';
		content += '</div>';
		
		content += '<div class="span6">';
		content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;" >';
		content += '<label>Page Number</label>';
		/*content += '<select onChange="getPageDataEmergencyToken()" id="pageNum"  >';
		content += '<option value="">-select Page-</option>';
		content += '</select>';*/
		content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageDataEmergencyToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
		content += '</div>';
		content += '</div>';
		
		
 // end code for bug id 324 , added by abhimanyu	    
			    
			
	 content += '<h4>User Policy</h4>';
	content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
	content += '<thead>';
	content += '<tr>';
	content += '<th width="6%"><input type="checkbox" id="checkAll5" data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
	content += '<th>User LogonId</th>';
	content += '<th><select name="" id="emergencyNames"><option value="">Select Emergency policy</option>';
	try{
		if(obj2!=null&& obj2!='')
			{
		jQuery.each(obj2, function(i, v) {
			var temp=obj2[i];

			content += '<option value="'+temp+'" >'+temp+'</option>';
		});
			}
	}
	catch(e){
		//alert(e);
	}
	content += '</select>';
	//content += '<th><select name="" id=""><option value="">Pin Check Policy</option><option value="">Pin Check Policy1</option></select></th>';
	content += '<th><select name="" id="ntPolicyNames"><option value="">Select NT policy</option>';
	try{
		if(obj4!=null && obj4!='')
			{
		jQuery.each(obj4, function(i, v) {
			var temp=obj4[i];

			content += '<option value="'+temp+'" >'+temp+'</option>';
		});
			}
	}
	catch(e){
		//alert(e);
	}	
	content += '</select>';
	
	content += '<th><select name="" id="lockNames"><option value="">Select LockoutAttempt policy</option>';
	try{
		if(obj5!=null && obj5!='')
			{
		jQuery.each(obj5, function(i, v) {
			var temp=obj5[i];

			content += '<option value="'+temp+'" >'+temp+'</option>';
		});
			}
	}
	catch(e){
		//alert(e);
	}	
	content += '</select>';
	
	content += '<th ><select name="" id="authSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
	try{
		if(obj7!=null && obj7!='')
			{
		jQuery.each(obj7, function(i, v) {
			var temp=obj7[i];

			content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
		});
			}
	}
	catch(e){
		//alert(e);
	}	
	content += '</select>';
	
/*	content += '<th><select name="" id="countryPolicyNames"><option value="">Select Country policy</option>';
	try{
		if(obj6!=null && obj6!='')
			{
		jQuery.each(obj6, function(i, v) {
			var temp=obj6[i];

			content += '<option value="'+temp+'" >'+temp+'</option>';
		});
			}
	}
	catch(e){
		//alert(e);
	}	
	content += '</select>';*/

	content += '</tr>';
	content += '</thead>';
	
 // start code for bug id 324 , added by abhimanyu	
	
	 content += '<tr>';
	 content += '<th  class="policySubHeading" style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignPolicyEmergencyTokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
	 content += '<th class="policySubHeading" ><input type="text" onkeydown="assignPolicyEmergencyTokenSearch1(event)"  id="searchUserId" value=""/></th>';	
	 content += '<th class="policySubHeading" ><select name="" id="searchEmergencyNames"><option value="">Select Emergency policy</option>';
		try{
			if(obj2!=null&& obj2!='')
				{
			jQuery.each(obj2, function(i, v) {
				var temp=obj2[i];

				content += '<option value="'+temp+'" >'+temp+'</option>';
			});
				}
		}
		catch(e){
			//alert(e);
		}
		content += '</select>';
		//content += '<th><select name="" id=""><option value="">Pin Check Policy</option><option value="">Pin Check Policy1</option></select></th>';
		content += '<th class="policySubHeading" ><select name="" id="searchNtPolicyNames"><option value="">Select NT policy</option>';
		try{
			if(obj4!=null && obj4!='')
				{
			jQuery.each(obj4, function(i, v) {
				var temp=obj4[i];

				content += '<option value="'+temp+'" >'+temp+'</option>';
			});
				}
		}
		catch(e){
			//alert(e);
		}	
		content += '</select>';
		
		content += '<th class="policySubHeading" ><select name="" id="searchLockNames"><option value="">Select LockoutAttempt policy</option>';
		try{
			if(obj5!=null && obj5!='')
				{
			jQuery.each(obj5, function(i, v) {
				var temp=obj5[i];

				content += '<option value="'+temp+'" >'+temp+'</option>';
			});
				}
		}
		catch(e){
			//alert(e);
		}	
		content += '</select>';
		
		content += '<th class="policySubHeading"><select name="" id="searchAuthSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
		try{
			if(obj7!=null && obj7!='')
				{
			jQuery.each(obj7, function(i, v) {
				var temp=obj7[i];
				if(temp.authSourcePolId==searchAuthSrcPolicyName){
					content += '<option value="'+temp.authSourcePolId+'" selected>'+temp.authSourcePolTyp+'</option>';
				} else {
					content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
				}
				
			});
				}
		}
		catch(e){
			//alert(e);
		}	
		content += '</select>';
		
/*		content += '<th class="policySubHeading" ><select name="" id="searchCountryPolicyNames"><option value="">Select Country policy</option>';
		try{
			if(obj6!=null && obj6!='')
				{
			jQuery.each(obj6, function(i, v) {
				var temp=obj6[i];

				content += '<option value="'+temp+'" >'+temp+'</option>';
			});
				}
		}
		catch(e){
			//alert(e);
		}	
		content += '</select>';

		content += '</tr>';*/
// end code for bug id 324 , added by abhimanyu				
		
		
	 
	
	
	
	//emergencyPolicyName
	if(obj1!=null && obj1!='')
		{
	jQuery.each(obj1, function(i, v) {
		content += "<tr>";
		content += "<td><input class='checkboxes5' name='checkHardUsers' type='checkbox' value='"+v.username+"'></td>";
		content += "<td>"+v.username+"</td>";				 
		content += "<td>"+v.emergencyPolicyName+"</td>";
		content += "<td>"+v.ntPolicyName+"</td>";
		content += "<td>"+v.hardLockPolicyName+"</td>";
		content += "<td>"+v.authSourcePolicyType+"</td>";
		//content += "<td>"+v.countryPolicyName+"</td>";
		//content += "<td>"+v.hardOfflinePolicyName+"</td>";
		//content += "<td>"+v.hardLockPolicyName+"</td>";
		//content += "<td>"+v.userPolicy+"</td>";
		content += "</tr>";
	});

		}
	else
		{
		content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
		}
	content += "</table>";
	content += '<div class="form-actions form-actions2"><button type="button" onClick="assignHardPolicy()" class="btn btn-primary">Submit </button></div>';
	$('#block_policy_user_data').html(content);
	$("#sample_1").css("width","100%");
	//oTable = $('#sample_1').dataTable();
	
	$('#searchUserId').val(searchUserId);
	$('#searchLockNames').val(searchLockNames);
	$('#searchNtPolicyNames').val(searchNtPolicyNames);
	$('#searchAuthSrcPolicyName').val(searchAuthSrcPolicyName);
	$('#searchEmergencyNames').val(searchEmergencyNames);
	
	 if($.trim(globalPreviouspageEmergencyTokenSize) != '') {
	        $("#pageId").val(globalPreviouspageEmergencyTokenSize);
	       fetchSizeEmergencyToken();
	       	if(!searchAssignPolicyEmergencyTokenWithpageSize)
	       		$("#pageNum").val(globalPreviousPageEmergencyTokenNum);
	       	else {
	       		if(globalPreviousPageEmergencyTokenNum==0 && parseInt($('#pageN').text()) > 0)
	       			globalPreviousPageEmergencyTokenNum="1";
	       		$("#pageNum").val(globalPreviousPageEmergencyTokenNum);
	       	}
	   }
	 //searchAssignPolicyEmergencyTokenWithpageSize=false;
		if(pageCall==false){
			var size=10;
			if(globalPreviouspageEmergencyTokenSize!=''){
				size=globalPreviouspageEmergencyTokenSize;
				countEmergencyToken = searchCount;
			}
			 if(searchUserId!=""  ||  searchLockNames!="" || searchNtPolicyNames!="" 
				  || searchEmergencyNames!="" || searchAuthSrcPolicyName!="" ){
				 countEmergencyToken = searchCount;
			  }
			 if(countEmergencyToken==0){
				 countEmergencyToken = searchCount;
			 }
			var maxPgaeNumber = countEmergencyToken / size;
			var rem = countEmergencyToken % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			$('#pageN').html(parseInt(maxPgaeNumber));
			if(countEmergencyToken == 0)
				$('#pageNum').val(0);
			else 
				$('#pageNum').val(1);
		}
		 if(searchUserId=="" &&  searchLockNames=="" && searchNtPolicyNames=="" 
			  && searchEmergencyNames=="" && searchAuthSrcPolicyName=="" ){
			 searchAssignPolicyEmergencyTokenWithpageSize=false;
		  }
	
		}

	});
}

var globalPreviouspageBioTokenSize="";
var globalPreviousPageBioTokenNum="";
function bioTokenTbl(pageCall ,isSearch){
	
	appName=document.getElementById('usr_app_select').value;
	domainName=document.getElementById('usr_domain_select').value;
	
	// start code for bug id 324 , added by abhimanyu
	  if($("#pageId").length)
	     {
		  globalPreviouspageBioTokenSize=$("#pageId").val();
		  globalPreviousPageBioTokenNum=$("#pageNum").val();
	    }
 
	   
	   var myUrl="policy_showAllBioUsers.action?appName="+appName+"&domainName="+domainName;
	   var dataString="";
	   
	   
	   if(pageCall==true){
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			 	        if($.trim(size) == "")
							 size="10";
						if($.trim(pageNumber) == "")
							 pageNumber="1";
			  myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
	   
	   if(searchUserId!="" || searchCommonPolicyName!="" || searchOfflineNames!="" || searchLockNames!="" || searchNtPolicyNames!="" 
		   || searchTaPolicyNames!="" || searchTRPolicyNames!="" || searchAuthSrcPolicyName!="" ){
			isSearch=true;
		} 
	   
	   
	   if(isSearch){
		   try{
		 	   
			   searchUserId=document.getElementById('searchUserId').value;
			 	searchUserId = searchUserId.replace(/\s/g, "");
			 	searchCommonPolicyName=document.getElementById('searchCommonPolicyName').value;
			 	searchOfflineNames=document.getElementById('searchOfflineNames').value;
			 	searchLockNames=document.getElementById('searchLockNames').value;
			 	searchNtPolicyNames=document.getElementById('searchNtPolicyNames').value;
			 	searchTaPolicyNames=document.getElementById('searchTaPolicyNames').value;
			 	searchCountryPolicyNames="";//document.getElementById('searchCountryPolicyNames').value;
			 	searchTRPolicyNames=document.getElementById('searchTRPolicyNames').value;
			 	searchAuthSrcPolicyName=document.getElementById('searchAuthSrcPolicyNames').value;
			 	
		   }catch(err){}
			
		/*	myUrl+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+
			"&countryNames="+searchCountryPolicyNames+"&trPolicyNames="+searchTRPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;*/
			
			dataString+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+
			"&countryNames="+searchCountryPolicyNames+"&trPolicyNames="+searchTRPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
		  
			
		}
	   
	   if(searchAssignPolicyBioTokenWithpageSize) {
		   if(myUrl.indexOf('fetchSize')==-1) { 
			   if($.trim(globalPreviouspageBioTokenSize)!='') { 
				   if(myUrl.indexOf('?')==-1)
	    	        myUrl+="?fetchSize="+globalPreviouspageBioTokenSize; 
	    	     else
	    	    	 myUrl+="&fetchSize="+globalPreviouspageBioTokenSize; 
	    	 }
	       }
	    }
	
	
	$.ajax({
		type: "POST",  
		url: myUrl,
		data: dataString,
		dataType: "text",
		success: function(data) {
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			var object = JSON.parse(data);
			var obj1=JSON.parse(object.userPolicyList);			
			var obj2 = JSON.parse(object.commonPolicyList);
			var obj3 = JSON.parse(object.offlineList);
			var obj4 = JSON.parse(object.lockPolicyList);
			var obj5 = JSON.parse(object.count);
			var obj6 = JSON.parse(object.ntPolicyList);
			var obj7 = JSON.parse(object.tokenActivationPolicyList);
			var obj8 = JSON.parse(object.countryPolicyList);
			var obj9 = JSON.parse(object.tokenRevalidationPolicyList);
			var obj10 = JSON.parse(object.authSourcePolicyList);
			
			count=obj5;
			/*if(searchAssignPolicyBioTokenWithpageSize)
		    	   obj5=countBioToken;
			       countBioToken = obj5;*/
			
			if(searchAssignPolicyBioTokenWithpageSize){
					searchCount = obj5;
					countBioToken = obj5;
			} else {
				searchCount = obj5;
				countBioToken = obj5;
			}
			
			       var content = '';
			    
				    content += '<div class="row-fluid new_filter">';
				    content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId" onChange="fetchSizeBioToken(),getPageDataBioToken();" style="width:100%;">';
					content += '<option value="">Select Size</option>';
					content += '<option value="10">10</option>';
					content += '<option value="20">20</option>';
					content += '<option value="50">50</option>';
					content += '<option value="100">100</option>';
					content += '<option value="200">200</option>';
					content += '<option value="500">500</option>';
					content += '<option value="1000">1000</option>';
					content += '<option value="2000">2000</option>';
					content += '<option value="5000">5000</option>';
					//content += '<option value="10000">10000</option>';
					content += '</select>';

					content += '</div>';
					content += '</div>';
					
					content += '<div class="span6">';
					content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
					content += '<label>Page Number</label>';
					/*content += '<select onChange="getPageDataBioToken()" id="pageNum"  >';
					content += '<option value="">-select Page-</option>';
					content += '</select>';*/
					content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageDataBioToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
					content += '</div>';
					content += '</div>';
					
					
				// end code for bug id 324 , added by abhimanyu     
			       
			       
			//var content = '<h4>User Policy</h4>';
			       
			content += '<h4>User Policy</h4>';    
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th width="6%"><input type="checkbox" id="checkAll5" data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
			content += '<th>User LogonId</th>';
			content += '<th><select name="" id="commonPolicyName"><option value="">Select Common policy</option>';
			try{
				if(obj2!=null && obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th><select name="" id="offlineNames"><option value="">Select Offline policy</option>';
			try{
				if(obj3!=null && obj3!='')
					{
				jQuery.each(obj3, function(i, v) {
					var temp=obj3[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th><select name="" id="lockNames"><option value="">Select LockoutAttempt policy</option>';
			try{

				if(obj4!=null && obj4!='')
					{
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			content += '<th><select name="" id="ntPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th><select name="" id="taPolicyNames"><option value="">Select Token Activation policy</option>';
			try{
				if(obj7!=null && obj7!='')
					{
				jQuery.each(obj7, function(i, v) {
					var temp=obj7[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			
/*			content += '<th><select name="" id="countryPolicyNames"><option value="">Select Country policy</option>';
			try{
				if(obj8!=null && obj8!='')
					{
				jQuery.each(obj8, function(i, v) {
					var temp=obj8[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	*/
			
			
			content += '<th><select name="" id="trPolicyNames"><option value="">Select Token Revalidation policy</option>';
			try{
				if(obj9!=null && obj9!='')
					{
				jQuery.each(obj9, function(i, v) {
					var temp=obj9[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th ><select name="" id="authSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj10!=null && obj10!='')
					{
				jQuery.each(obj10, function(i, v) {
					var temp=obj10[i];

					content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			
			//content += '<th><select name="" id=""><option value="">User not exist policy</option><option value="">User not exist policy1</option></select></th>';

			content += '</tr>';
			content += '</thead>';
// start code for bug id 324 , added by abhimanyu	
			
			content += '<tr>';
			
			content += '<th class="policySubHeading" style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignPolicyBioTokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			content += '<th class="policySubHeading" ><input type="text" onkeydown="assignPolicyBioTokenSearch1(event)"  id="searchUserId" value="" /></th>';
			 
			content += '<th class="policySubHeading" ><select name="" id="searchCommonPolicyName"><option value="">Select Common policy</option>';
			try{
				if(obj2!=null && obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			//<option value="">Mobile Token policy1</option></select></th>';
			content += '<th class="policySubHeading" ><select name="" id="searchOfflineNames"><option value="">Select Offline policy</option>';
			try{
				if(obj3!=null && obj3!='')
					{
				jQuery.each(obj3, function(i, v) {
					var temp=obj3[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
		 content += '<th class="policySubHeading" ><select name="" id="searchLockNames"><option value="">Select LockoutAttempt policy</option>';
			try{
				if(obj4!=null && obj4!='')
					{
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			content += '<th class="policySubHeading" ><select name="" id="searchNtPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			content += '<th class="policySubHeading" ><select name="" id="searchTaPolicyNames"><option value="">Select Token Activation policy</option>';
			try{
				if(obj7!=null && obj7!='')
					{
				jQuery.each(obj7, function(i, v) {
					var temp=obj7[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
/*			content += '<th class="policySubHeading" ><select name="" id="searchCountryPolicyNames"><option value="">Select Country policy</option>';
			try{
				if(obj8!=null && obj8!='')
					{
				jQuery.each(obj8, function(i, v) {
					var temp=obj8[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	*/
			
			
			content += '<th class="policySubHeading" ><select name="" id="searchTRPolicyNames"><option value="">Select Token Revalidation policy</option>';
			try{
				if(obj9!=null && obj9!='')
					{
				jQuery.each(obj9, function(i, v) {
					var temp=obj9[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th class="policySubHeading"><select name="" id="searchAuthSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj10!=null && obj10!='')
					{
				jQuery.each(obj10, function(i, v) {
					var temp=obj10[i];
					if(temp.authSourcePolId==searchAuthSrcPolicyName){
						content += '<option value="'+temp.authSourcePolId+'" selected>'+temp.authSourcePolTyp+'</option>';
					} else {
						content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
					}
					
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			
			
			
			content += '</tr>';
			
// end code for bug id 324 , added by abhimanyu						
			
			
			
			if(obj1!=null && obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				content += "<tr>";
				content += "<td><input class='checkboxes5'  name='checkHardUsers' type='checkbox' value='"+v.username+"'></td>";
				content += "<td>"+v.username+"</td>";				 
				content += "<td>"+v.commonPolicy+"</td>";
				content += "<td>"+v.hardOfflinePolicyName+"</td>";
				content += "<td>"+v.hardLockPolicyName+"</td>";
				content += "<td>"+v.ntPolicyName+"</td>";
				content += "<td>"+v.taPolicyName+"</td>";
				//content += "<td>"+v.countryPolicyName+"</td>";
				content += "<td>"+v.tokenRevalidationPolicyName+"</td>";
				content += "<td>"+v.authSourcePolicyType+"</td>";
				content += "</tr>";
			});
				}

			else
			{

			content += "<tr><td style='text-align: center;' colspan='8' > No Record Found!</td></tr>";
			}
			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignHardPolicy()" class="btn btn-primary">Submit </button></div>';
			$('#block_policy_user_data').html(content);
			$("#sample_1").css("width","100%");
			//oTable = $('#sample_1').dataTable();
			
			$('#searchUserId').val(searchUserId);
			$('#searchCommonPolicyName').val(searchCommonPolicyName);
			$('#searchOfflineNames').val(searchOfflineNames);
			$('#searchLockNames').val(searchLockNames);
			$('#searchNtPolicyNames').val(searchNtPolicyNames);
			$('#searchTaPolicyNames').val(searchTaPolicyNames);
			$('#searchTRPolicyNames').val(searchTRPolicyNames);
			$('#searchAuthSrcPolicyName').val(searchAuthSrcPolicyName);
			
			
			 if($.trim(globalPreviouspageBioTokenSize) != '') {
			        $("#pageId").val(globalPreviouspageBioTokenSize);
			       fetchSizeBioToken();
			       if(!searchAssignPolicyBioTokenWithpageSize)
			    	   $("#pageNum").val(globalPreviousPageBioTokenNum);
			       else {
			    	  if(globalPreviousPageBioTokenNum==0 && parseInt($('#pageN').text()) > 0 ) 
			    		  globalPreviousPageBioTokenNum="1";
			    	  $("#pageNum").val(globalPreviousPageBioTokenNum);
			       }
			   }
			// searchAssignPolicyBioTokenWithpageSize=false;
			 
				if(pageCall==false){
					var size=10;
					if(globalPreviouspageBioTokenSize!=''){
						size=globalPreviouspageBioTokenSize;
						countBioToken=searchCount;
					}
					if(searchUserId!="" || searchCommonPolicyName!="" || searchOfflineNames!="" || searchLockNames!="" || searchNtPolicyNames!="" 
						   || searchTaPolicyNames!="" || searchTRPolicyNames!="" || searchAuthSrcPolicyName!="" ){
						countBioToken=searchCount;
					}
					if(countBioToken==0){
						countBioToken=searchCount;
					}
					var maxPgaeNumber = countBioToken / size;
					var rem = countBioToken % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN').html(parseInt(maxPgaeNumber));
					if(countBioToken == 0)
						$('#pageNum').val(0);
					else 
						$('#pageNum').val(1);
				}
				
				if(searchUserId=="" && searchCommonPolicyName=="" && searchOfflineNames=="" && searchLockNames=="" && searchNtPolicyNames=="" 
					   && searchTaPolicyNames=="" && searchTRPolicyNames=="" && searchAuthSrcPolicyName=="" ){
					 searchAssignPolicyBioTokenWithpageSize=false;
				}
			
		}

	});
}


var globalPreviouspageNoTokenSize="";
var globalPreviousPageNoTokenNum="";
function noTokenTbl(pageCall ,isSearch){
	//alert("shyam")
	appName=document.getElementById('usr_app_select').value;
	domainName=document.getElementById('usr_domain_select').value;
	
	// start code for bug id 324 , added by abhimanyu
	  if($("#pageId").length)
	     {
		  globalPreviouspageNoTokenSize=$("#pageId").val();
		  globalPreviousPageNoTokenNum=$("#pageNum").val();
	    }
	    
	   
	   var myUrl="policy_showAllNoTokenUsers.action?appName="+appName+"&domainName="+domainName;
	   var dataString="";
	   
	   if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			 	        if($.trim(size) == "")
							 size="10";
						if($.trim(pageNumber) == "")
							 pageNumber="1";
			  myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
	   
	   if(searchUserId!="" || searchNtPolicyNames!="" || searchAuthSrcPolicyName!="" ){
			isSearch=true;
		}
	   
	   
	   if(isSearch){
		   try{
			searchUserId=document.getElementById('searchUserId').value;
				searchUserId = searchUserId.replace(/\s/g, "");
			
			
			searchNtPolicyNames=document.getElementById('searchNtPolicyNames').value;
			//document.getElementById('searchCountryPolicyNames').value;
			searchAuthSrcPolicyName=document.getElementById('searchAuthSrcPolicyNames').value;
			
		   }catch(err){}
		//	alert("Token:  "+token);
		//	myUrl+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
			dataString+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
		   
		   }
	   
	   if(searchAssignPolicyNoTokenWithpageSize)
   	 {    if(myUrl.indexOf('fetchSize')==-1)
	     {   if($.trim(globalPreviouspageNoTokenSize)!='')
	    	 { if(myUrl.indexOf('?')==-1)
	    	        myUrl+="?fetchSize="+globalPreviouspageNoTokenSize; 
	    	     else
	    	    	 myUrl+="&fetchSize="+globalPreviouspageNoTokenSize; 
	    	 }
	       }
	    }
	   
	   
	  // alert("myUrl =======>"+myUrl)
	// end code for bug id 324 , added by abhimanyu  
	   	
	
	
	
	$.ajax({
		type: "POST",  
		url: myUrl,
		data: dataString,
		dataType: "text",
		success: function(data) {
			if($.trim(data)=="sessionout"){
			
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			
			var object = JSON.parse(data);
			///alert("object==="+object)
			var obj1=JSON.parse(object.userPolicyList);	
			//alert("shyam baboo==="+obj1)
			var obj5 = JSON.parse(object.count);
			var obj6 = JSON.parse(object.ntPolicyList);
			var obj8 = JSON.parse(object.countryPolicyList);
			var obj9 = JSON.parse(object.authSourcePolicyList);
			count=obj5;
			/*if(searchAssignPolicyNoTokenWithpageSize)
		    	obj5=countNoToken;
			    countNoToken = obj5;*/
			if(searchAssignPolicyNoTokenWithpageSize){
				countNoToken = obj5;
				searchCount = obj5;
			} else {
				countNoToken = obj5;
				searchCount = obj5;
			}
			
				var content = '';    
  // start code for bug id 324 , added by abhimanyu
			    content += '<div class="row-fluid new_filter">';
			    content += '<div class="span6">';
				content += '<div class="pull-left" id="switch_app">';
				content += '<label>Size</label>';
				content += '<select id="pageId" onChange="fetchSizeNoToken(),getPageDataNoToken();" style="width:100%;">';
				content += '<option value="">Select Size</option>';
				content += '<option value="10">10</option>';
				content += '<option value="20">20</option>';
				content += '<option value="50">50</option>';
				content += '<option value="100">100</option>';
				content += '<option value="200">200</option>';
				content += '<option value="500">500</option>';
				content += '<option value="1000">1000</option>';
				content += '<option value="2000">2000</option>';
				content += '<option value="5000">5000</option>';
				//content += '<option value="10000">10000</option>';
				content += '</select>';

				content += '</div>';
				content += '</div>';
				
				content += '<div class="span6">';
				content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
				content += '<label>Page Number</label>';
				/*content += '<select onChange="getPageDataNoToken()" id="pageNum"  >';
				content += '<option value="">-select Page-</option>';
				content += '</select>';*/
				content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageDataNoToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
				content += '</div>';
				content += '</div>';
				
				
 // end code for bug id 324 , added by abhimanyu		 
				
				
				
			    
			 content += '<h4>User Policy</h4>';
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th width="6%"><input type="checkbox" id="checkAll5" data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
			content += '<th>User LogonId</th>';

			
			content += '<th><select name="" id="ntPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th><select name="" id="authSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj9!=null && obj9!='')
					{
				jQuery.each(obj9, function(i, v) {
					var temp=obj9[i];

					content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			

/*						content += '<th><select name="" id="countryPolicyNames"><option value="">Select Country policy</option>';
						try{
							if(obj8!=null && obj8!='')
								{
							jQuery.each(obj8, function(i, v) {
								var temp=obj8[i];

								content += '<option value="'+temp+'" >'+temp+'</option>';
							});
								}
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';	*/
			
			
			content += '</tr>';
			content += '</thead>';
			
// start code for bug id 324 , added by abhimanyu	
			
			content += '<tr>';
			
			content += '<th class="policySubHeading" style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignPolicyNoTokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			content += '<th class="policySubHeading" ><input type="text" onkeydown="assignPolicyNoTokenSearch1(event)"  id="searchUserId" value=""/></th>';			
			
						content += '<th class="policySubHeading"><select name="" id="searchNtPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th class="policySubHeading"><select name="" id="searchAuthSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj9!=null && obj9!='')
					{
				jQuery.each(obj9, function(i, v) {
					var temp=obj9[i];
					if(searchAuthSrcPolicyName==temp.authSourcePolId){
						content += '<option value="'+temp.authSourcePolId+'" selected >'+temp.authSourcePolTyp+'</option>';
					} else {
						content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
					}
					
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			

			
						
/*						content += '<th class="policySubHeading" ><select name="" id="searchCountryPolicyNames"><option value="">Select Country policy</option>';
						try{
							if(obj8!=null && obj8!='')
								{
							jQuery.each(obj8, function(i, v) {
								var temp=obj8[i];

								content += '<option value="'+temp+'" >'+temp+'</option>';
							});
								}
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';	
			
			content += '</tr>';*/
			
			
// end code for bug id 324 , added by abhimanyu					
			
	
			
			
			if(obj1!=null && obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				content += "<tr>";
				content += "<td><input class='checkboxes5' name='checkHardUsers' type='checkbox' value='"+v.username+"'></td>";
				content += "<td>"+v.username+"</td>";				 
				content += "<td>"+v.ntPolicyName+"</td>";
				content += "<td>"+v.authSourcePolicyType+"</td>";
				//content += "<td>"+v.countryPolicyName+"</td>";
				content += "</tr>";
			});

				}
			else
				{

				content += "<tr><td style='text-align: center;' colspan='4' > No Record Found!</td></tr>";
				}
			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignHardPolicy()"  class="btn btn-primary">Submit </button></div>';
			$('#block_policy_user_data').html(content);
			$("#sample_1").css("width","100%");
			//oTable = $('#sample_1').dataTable();
			
			
			$('#searchUserId').val(searchUserId);
			$('#searchNtPolicyNames').val(searchNtPolicyNames);
			$('#searchAuthSrcPolicyName').val(searchAuthSrcPolicyName);
			
			 if($.trim(globalPreviouspageNoTokenSize) != '')
			  {
			        $("#pageId").val(globalPreviouspageNoTokenSize);
			       fetchSizeNoToken();
			       	if(!searchAssignPolicyNoTokenWithpageSize)
			    	   $("#pageNum").val(globalPreviousPageNoTokenNum);
			       	else {
			       		if(globalPreviousPageNoTokenNum==0 && parseInt($('#pageN').text()) > 0 )
			       			globalPreviousPageNoTokenNum="1";
			       	    $("#pageNum").val(globalPreviousPageNoTokenNum);
			       	}
			   }
			// searchAssignPolicyNoTokenWithpageSize=false;
			 
				if(pageCall==false){
					var size=10;
					if(globalPreviouspageNoTokenSize){
						size=globalPreviouspageNoTokenSize;
						countNoToken = searchCount;
					}
					if(searchUserId!="" || searchNtPolicyNames!="" || searchAuthSrcPolicyName!="" ){
						countNoToken = searchCount;
					}
					if(countNoToken==0){
						countNoToken = searchCount;
					}
					var maxPgaeNumber = countNoToken / size;
					var rem = countNoToken % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN').html(parseInt(maxPgaeNumber));
					if(countNoToken == 0)
						$('#pageNum').val(0);
					else 
						$('#pageNum').val(1);
				}
				
				if(searchUserId=="" && searchNtPolicyNames=="" && searchAuthSrcPolicyName=="" ){
					searchAssignPolicyNoTokenWithpageSize=false;
				}
			
			
		}

	});
}






var globalPreviouspageMobileTokenSize="";
var globalPreviousPageMobileTokenNum="";
function mobileTokenTbl(pageCall ,isSearch){
	
	appName=document.getElementById('usr_app_select').value;
	domainName=document.getElementById('usr_domain_select').value;
	
	// start code for bug id 324 , added by abhimanyu
	  if($("#pageId").length)
	     {
		  globalPreviouspageMobileTokenSize=$("#pageId").val();
		  globalPreviousPageMobileTokenNum=$("#pageNum").val();
	    }
	    
	   
	   var myUrl="policy_showAllMobileUsers.action?appName="+appName+"&domainName="+domainName;
	   var dataString="";
	   
	   if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			 	        if($.trim(size) == "")
							 size="10";
						if($.trim(pageNumber) == "")
							 pageNumber="1";
			  myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
	   
	   if(searchUserId!="" || searchCommonPolicyName!="" || searchOfflineNames!="" || searchLockNames!="" || searchNtPolicyNames!="" 
		   || searchTaPolicyNames!="" || searchTRPolicyNames!="" || searchAuthSrcPolicyName!="" ){
			isSearch=true;
		} 
	   
	   
	   if(isSearch){
		   try{
			searchUserId=document.getElementById('searchUserId').value;
				searchUserId = searchUserId.replace(/\s/g, "");
			 searchCommonPolicyName=document.getElementById('searchCommonPolicyName').value;
			 searchOfflineNames=document.getElementById('searchOfflineNames').value;
			 searchLockNames=document.getElementById('searchLockNames').value;
			 searchNtPolicyNames=document.getElementById('searchNtPolicyNames').value;
			 searchTaPolicyNames=document.getElementById('searchTaPolicyNames').value;
			 searchCountryPolicyNames="";//document.getElementById('searchCountryPolicyNames').value;
			 searchTRPolicyNames=document.getElementById('searchTRPolicyNames').value;
			 searchAuthSrcPolicyName=document.getElementById('searchAuthSrcPolicyNames').value;
		   }catch(err){}
		//	alert("Token:  "+token);
			myUrl+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&trPolicyNames="+searchTRPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
		  
		}
	   
	   if(searchAssignPolicyMobileTokenWithpageSize) { 
		   if(myUrl.indexOf('fetchSize')==-1) { 
			   if($.trim(globalPreviouspageMobileTokenSize)!='') {
				   if(myUrl.indexOf('?')==-1)
	    	        myUrl+="?fetchSize="+globalPreviouspageMobileTokenSize; 
	    	     else
	    	    	 myUrl+="&fetchSize="+globalPreviouspageMobileTokenSize; 
	    	 }
	       }
	    }
	   
	
	$.ajax({
		type: "POST",  
		url: myUrl,
		data: dataString,
		dataType: "text",
		success: function(data) {
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			
			var object = JSON.parse(data);
			var obj1=JSON.parse(object.userPolicyList);			
			var obj2 = JSON.parse(object.commonPolicyList);
			var obj3 = JSON.parse(object.offlineList);
			var obj4 = JSON.parse(object.lockPolicyList);
			var obj5 = JSON.parse(object.count);
			var obj6 = JSON.parse(object.ntPolicyList);
			var obj7 = JSON.parse(object.tokenActivationPolicyList);
			var obj8 = JSON.parse(object.countryPolicyList);
			var obj9 = JSON.parse(object.tokenRevalidationPolicyList);
			var obj10 = JSON.parse(object.authSourcePolicyList);
			count=obj5;
			
		/*	if(searchAssignPolicyMobileTokenWithpageSize)
		    	obj5=countMobileToken;
			    countMobileToken = obj5;*/
			if(searchAssignPolicyMobileTokenWithpageSize){
				countMobileToken = obj5;
				searchCount =obj5;
			} else {
				countMobileToken = obj5;
				searchCount =obj5;
			}
			
			var content = '';    
  			    content += '<div class="row-fluid new_filter">';
			    content += '<div class="span6">';
				content += '<div class="pull-left" id="switch_app">';
				content += '<label>Size</label>';
				content += '<select id="pageId" onChange="fetchSizeMobileToken(),getPageDataMobileToken();" style="width:100%;">';
				content += '<option value="">Select Size</option>';
				content += '<option value="10">10</option>';
				content += '<option value="20">20</option>';
				content += '<option value="50">50</option>';
				content += '<option value="100">100</option>';
				content += '<option value="200">200</option>';
				content += '<option value="500">500</option>';
				content += '<option value="1000">1000</option>';
				content += '<option value="2000">2000</option>';
				content += '<option value="5000">5000</option>';
				//content += '<option value="10000">10000</option>';
				content += '</select>';

				content += '</div>';
				content += '</div>';
				
				content += '<div class="span6">';
				content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
				content += '<label>Page Number</label>';
				/*content += '<select onChange="getPageDataMobileToken()" id="pageNum"  >';
				content += '<option value="">-select Page-</option>';
				content += '</select>';*/
				content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageDataMobileToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
				content += '</div>';
				content += '</div>';
			    
				content += '<h4>User Policy</h4>';
				content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
				content += '<thead>';
				content += '<tr>';
				content += '<th width="6%"><input type="checkbox" id="checkAll5" data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
				content += '<th>User LogonId</th>';
	
				content += '<th><select name="" id="commonPolicyName"><option value="">Select Common policy</option>';
			try {
				if(obj2!=null && obj2!='') {
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];
					 content += '<option value="'+temp+'" >'+temp+'</option>';
				 });
			   }
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			//<option value="">Mobile Token policy1</option></select></th>';
			content += '<th><select name="" id="offlineNames"><option value="">Select Offline policy</option>';
			try{
				if(obj3!=null && obj3!='')
					{
				jQuery.each(obj3, function(i, v) {
					var temp=obj3[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th><select name="" id="lockNames"><option value="">Select LockoutAttempt policy</option>';
			try {
				if(obj4!=null && obj4!='') {
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
			  }
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			content += '<th><select name="" id="ntPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			

			content += '<th><select name="" id="taPolicyNames"><option value="">Select Token Activation policy</option>';
						try{
							if(obj7!=null && obj7!='')
								{
							jQuery.each(obj7, function(i, v) {
								var temp=obj7[i];

								content += '<option value="'+temp+'" >'+temp+'</option>';
							});
								}
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';	
/*						content += '<th><select name="" id="countryPolicyNames"><option value="">Select Country policy</option>';
						try{
							if(obj8!=null && obj8!='')
								{
							jQuery.each(obj8, function(i, v) {
								var temp=obj8[i];

								content += '<option value="'+temp+'" >'+temp+'</option>';
							});
								}
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';	*/
			
						content += '<th><select name="" id="trPolicyNames"><option value="">Select Token Revalidation policy</option>';
						try{
							if(obj9!=null && obj9!='')
								{
							jQuery.each(obj9, function(i, v) {
								var temp=obj9[i];

								content += '<option value="'+temp+'" >'+temp+'</option>';
							});
								}
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';	
						
						
						content += '<th ><select name="" id="authSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
						try {
							if(obj10!=null && obj10!='') {
							jQuery.each(obj10, function(i, v) {
								var temp=obj10[i];
							      content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
							 							
							});
						  }
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';
			
			content += '</tr>';
			content += '</thead>';
			
// start code for bug id 324 , added by abhimanyu	
			
			content += '<tr>';
			
			content += '<th class="policySubHeading" style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignPolicyMobileTokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			content += '<th class="policySubHeading" ><input type="text" onkeydown="assignPolicyMobileTokenSearch1(event)"  id="searchUserId" value=""/></th>';			
			
			content += '<th class="policySubHeading" ><select name="" id="searchCommonPolicyName"><option value="">Select Common policy</option>';
			try{
				if(obj2!=null && obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			//<option value="">Mobile Token policy1</option></select></th>';
			content += '<th class="policySubHeading" ><select name="" id="searchOfflineNames"><option value="">Select Offline policy</option>';
			try{
				if(obj3!=null && obj3!='')
					{
				jQuery.each(obj3, function(i, v) {
					var temp=obj3[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th class="policySubHeading" ><select name="" id="searchLockNames"><option value="">Select LockoutAttempt policy</option>';
			try{
				if(obj4!=null && obj4!='')
					{
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			content += '<th class="policySubHeading"><select name="" id="searchNtPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			

			content += '<th class="policySubHeading" ><select name="" id="searchTaPolicyNames"><option value="">Select Token Activation policy</option>';
						try{
							if(obj7!=null && obj7!='')
								{
							jQuery.each(obj7, function(i, v) {
								var temp=obj7[i];

								content += '<option value="'+temp+'" >'+temp+'</option>';
							});
								}
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';	
						
						
/*						content += '<th class="policySubHeading" ><select name="" id="searchCountryPolicyNames"><option value="">Select Country policy</option>';
						try{
							if(obj8!=null && obj8!='')
								{
							jQuery.each(obj8, function(i, v) {
								var temp=obj8[i];

								content += '<option value="'+temp+'" >'+temp+'</option>';
							});
								}
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';	*/
						
						
						content += '<th class="policySubHeading" ><select name="" id="searchTRPolicyNames"><option value="">Select Token Revalidation policy</option>';
						try{
							if(obj9!=null && obj9!='')
								{
							jQuery.each(obj9, function(i, v) {
								var temp=obj9[i];

								content += '<option value="'+temp+'" >'+temp+'</option>';
							});
								}
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';	
						
						content += '<th class="policySubHeading"><select name="" id="searchAuthSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
						try{
						  if(obj10!=null && obj10!='') {
							jQuery.each(obj10, function(i, v) {
								var temp=obj10[i];
								if(temp.authSourcePolId==searchAuthSrcPolicyName){
									content += '<option value="'+temp.authSourcePolId+'" selected>'+temp.authSourcePolTyp+'</option>';
								} else {
									content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
								}
								
							});
						  }
						}
						catch(e){
							//alert(e);
						}	
						content += '</select>';
			
			content += '</tr>';
			
		
			if(obj1!=null && obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				content += "<tr>";
				content += "<td><input class='checkboxes5' name='checkHardUsers' type='checkbox' value='"+v.username+"'></td>";
				content += "<td>"+v.username+"</td>";				 
				content += "<td>"+v.commonPolicy+"</td>";
				content += "<td>"+v.hardOfflinePolicyName+"</td>";
				content += "<td>"+v.hardLockPolicyName+"</td>";
				content += "<td>"+v.ntPolicyName+"</td>";
				content += "<td>"+v.taPolicyName+"</td>";
				//content += "<td>"+v.countryPolicyName+"</td>";
				content += "<td>"+v.tokenRevalidationPolicyName+"</td>";
				content += "<td>"+v.authSourcePolicyType+"</td>";
				content += "</tr>";
			});

				}
			else
				{

				content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";
				}
			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignHardPolicy()"  class="btn btn-primary">Submit </button></div>';
			$('#block_policy_user_data').html(content);
			$("#sample_1").css("width","100%");
			//oTable = $('#sample_1').dataTable();
			
			$('#searchUserId').val(searchUserId);
			$('#searchCommonPolicyName').val(searchCommonPolicyName);
			$('#searchOfflineNames').val(searchOfflineNames);
			$('#searchLockNames').val(searchLockNames);
			$('#searchNtPolicyNames').val(searchNtPolicyNames);
			$('#searchTaPolicyNames').val(searchTaPolicyNames);
			$('#searchTRPolicyNames').val(searchTRPolicyNames);
			$('#searchAuthSrcPolicyName').val(searchAuthSrcPolicyName); 
			
			if($.trim(globalPreviouspageMobileTokenSize) != '')  {
			        $("#pageId").val(globalPreviouspageMobileTokenSize);
			       fetchSizeMobileToken();
			       if(!searchAssignPolicyMobileTokenWithpageSize)
			    	   $("#pageNum").val(globalPreviousPageMobileTokenNum);
			       else {
			    	   if(globalPreviousPageMobileTokenNum==0 && parseInt($('#pageN').text()) > 0)
			    		   globalPreviousPageMobileTokenNum="1";
			    	   $("#pageNum").val(globalPreviousPageMobileTokenNum);
			       }
			 }
			// searchAssignPolicyMobileTokenWithpageSize=false;
			 
				if(pageCall==false){
					var size = 10;
					if(globalPreviouspageMobileTokenSize!=''){
						size = globalPreviouspageMobileTokenSize;
						countMobileToken = searchCount;
					}
					if(searchUserId!="" || searchCommonPolicyName!="" || searchOfflineNames!="" || searchLockNames!="" || searchNtPolicyNames!="" 
						   || searchTaPolicyNames!="" || searchTRPolicyNames!="" || searchAuthSrcPolicyName!="" ){
						countMobileToken = searchCount;
					 } 
					if(countMobileToken==0){
						countMobileToken = searchCount;
					}
					var maxPgaeNumber = countMobileToken / size;
					var rem = countMobileToken % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN').html(parseInt(maxPgaeNumber));
					if(countMobileToken == 0)
						$('#pageNum').val(0);
					else 
						$('#pageNum').val(1);
				}
				
				if(searchUserId=="" && searchCommonPolicyName=="" && searchOfflineNames=="" && searchLockNames=="" && searchNtPolicyNames=="" 
					   && searchTaPolicyNames=="" && searchTRPolicyNames=="" && searchAuthSrcPolicyName=="" ){
					searchAssignPolicyMobileTokenWithpageSize=false;
				 }
			
			
		}

	});
}

var globalPreviouspagePushTokenSize="";
var globalPreviousPagePushTokenNum="";

function pushTokenTbl(pageCall ,isSearch){
	
	appName=document.getElementById('usr_app_select').value;
	domainName=document.getElementById('usr_domain_select').value;
	
// start code for bug id 324 , added by abhimanyu
	  if($("#pageId").length)
	     {
		  globalPreviouspagePushTokenSize=$("#pageId").val();
		  globalPreviousPagePushTokenNum=$("#pageNum").val();
	    }
	   
	   
	   var myUrl="policy_showAllPushUsers.action?appName="+appName+"&domainName="+domainName;
	   var dataString="";
	    
	   if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			 	        if($.trim(size) == "")
							 size="10";
						if($.trim(pageNumber) == "")
							 pageNumber="1";
			  myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
	   
	   if(searchUserId!="" || searchCommonPolicyName!="" || searchOfflineNames!="" || searchLockNames!="" || searchNtPolicyNames!="" 
		   || searchTaPolicyNames!="" || searchAuthSrcPolicyName!="" ){
			isSearch=true;
		}
	   
	   
	   if(isSearch){
		   try{
		   	searchUserId=document.getElementById('searchUserId').value;
		   		searchUserId = searchUserId.replace(/\s/g, "");
			searchCommonPolicyName=document.getElementById('searchCommonPolicyName').value;
			 searchLockNames=document.getElementById('searchLockNames').value;
			//var searchLockNames='';
			searchNtPolicyNames=document.getElementById('searchNtPolicyNames').value;
			searchTaPolicyNames=document.getElementById('searchTaPolicyNames').value;
			searchCountryPolicyNames="";//document.getElementById('searchCountryPolicyNames').value;
			searchOfflineNames=document.getElementById('searchOfflineNames').value;
		    searchAuthSrcPolicyName=document.getElementById('searchAuthSrcPolicyNames').value;
		   }catch(err){}
			//alert("Token:  "+searchCountryPolicyNames);
			//myUrl+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
			dataString+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
		   
		   }
	   
	   if(searchAssignPolicyPushTokenWithpageSize)
   	 {    if(myUrl.indexOf('fetchSize')==-1)
	     {   if($.trim(globalPreviouspagePushTokenSize)!='')
	    	 { if(myUrl.indexOf('?')==-1)
	    	        myUrl+="?fetchSize="+globalPreviouspagePushTokenSize; 
	    	     else
	    	    	 myUrl+="&fetchSize="+globalPreviouspagePushTokenSize; 
	    	 }
	       }
	    }
	   
	   
	  // alert("myUrl =======>"+myUrl)
// end code for bug id 324 , added by abhimanyu 
	
	
	
	
	$.ajax({
		type: "POST",  
		url: myUrl,
		data: dataString,
		dataType: "text",
		success: function(data) {
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			var object = JSON.parse(data);
			var obj1=JSON.parse(object.userPolicyList);			
			var obj2 = JSON.parse(object.commonPolicyList);
			var obj3 = JSON.parse(object.ntPolicyList);
			var obj4 = JSON.parse(object.lockPolicyList);
			var obj5 = JSON.parse(object.count);
			var obj7 = JSON.parse(object.tokenActivationPolicyList);
			var obj8 = JSON.parse(object.countryPolicyList);
			var obj9 = JSON.parse(object.offlineList);
			var obj10 = JSON.parse(object.authSourcePolicyList);
			count=obj5;
			
			/*if(searchAssignPolicyPushTokenWithpageSize)
		    	obj5=countPushToken;
			    countPushToken = obj5;*/
			if(searchAssignPolicyPushTokenWithpageSize){
				countPushToken = obj5;
				searchCount = obj5;
			} else {
				countPushToken = obj5;
				searchCount = obj5;
			}
			
		    var content = '';
 // start code for bug id 324 , added by abhimanyu
		    content += '<div class="row-fluid new_filter">';
		    content += '<div class="span6">';
			content += '<div class="pull-left" id="switch_app">';
			content += '<label>Size</label>';
			content += '<select id="pageId" onChange="fetchSizePushToken(),getPageDataPushToken();" style="width:100%;">';
			content += '<option value="">Select Size</option>';
			content += '<option value="10">10</option>';
			content += '<option value="20">20</option>';
			content += '<option value="50">50</option>';
			content += '<option value="100">100</option>';
			content += '<option value="200">200</option>';
			content += '<option value="500">500</option>';
			content += '<option value="1000">1000</option>';
			content += '<option value="2000">2000</option>';
			content += '<option value="5000">5000</option>';
			//content += '<option value="10000">10000</option>';
			content += '</select>';

			content += '</div>';
			content += '</div>';
			
			content += '<div class="span6">';
			content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
			content += '<label>Page Number</label>';
			/*content += '<select onChange="getPageDataPushToken()" id="pageNum"  >';
			content += '<option value="">-select Page-</option>';
			content += '</select>';*/
			content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageDataPushToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
			content += '</div>';
			content += '</div>';
			
			
// end code for bug id 324 , added by abhimanyu			    
			    
			content +='<h4>User Policy</h4>';
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th width="6%"><input type="checkbox" id="checkAll5" data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
			content += '<th>User LogonId</th>';
			content += '<th><select name="" id="commonPolicyName"><option value="">Select Common policy</option>';
			try{

				if(obj2!=null && obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th><select name="" id="offlineNames"><option value="">Select Offline policy</option>';
			try{
				if(obj9!=null && obj9!='')
					{
				jQuery.each(obj9, function(i, v) {
					var temp=obj9[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			content += '<th><select name="" id="lockNames"><option value="">Select LockoutAttempt policy</option>';
			try{
				if(obj4!=null && obj4!='')
					{
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';		
			content += '<th><select name="" id="ntPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj3!=null && obj3!='')
					{
				jQuery.each(obj3, function(i, v) {
					var temp=obj3[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			content += '<th><select name="" id="taPolicyNames"><option value="">Select Token Activation policy</option>';
			try{
				if(obj7!=null && obj7!='')
					{
				jQuery.each(obj7, function(i, v) {
					var temp=obj7[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th ><select name="" id="authSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj10!=null && obj10!='')
					{
				jQuery.each(obj10, function(i, v) {
					var temp=obj10[i];

					content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			
			
		/*	content += '<th><select name="" id="countryPolicyNames"><option value="">Select Country policy</option>';
			try{
				if(obj8!=null && obj8!='')
					{
				jQuery.each(obj8, function(i, v) {
					var temp=obj8[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	*/
			//content += '<th><select name="" id=""><option value="">User not exist policy</option><option value="">User not exist policy1</option></select></th>';

			content += '</tr>';
			content += '</thead>';
			
// start code for bug id 324 , added by abhimanyu	
			
			content += '<tr>';
			
			content += '<th  class="policySubHeading" style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignPolicyPushTokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			content += '<th class="policySubHeading" ><input type="text" onkeydown="assignPolicyPushTokenSearch1(event)"  id="searchUserId" /></th>';
			content += '<th class="policySubHeading" ><select name="" id="searchCommonPolicyName"><option value="">Select Common policy</option>';
			try{

				if(obj2!=null && obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th class="policySubHeading" ><select name="" id="searchOfflineNames"><option value="">Select Offline policy</option>';
			try{
				if(obj9!=null && obj9!='')
					{
				jQuery.each(obj9, function(i, v) {
					var temp=obj9[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th class="policySubHeading" ><select name="" id="searchLockNames"><option value="">Select LockoutAttempt policy</option>';
			try{
				if(obj4!=null && obj4!='')
					{
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';		
			content += '<th class="policySubHeading"><select name="" id="searchNtPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj3!=null && obj3!='')
					{
				jQuery.each(obj3, function(i, v) {
					var temp=obj3[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			content += '<th class="policySubHeading" ><select name="" id="searchTaPolicyNames"><option value="">Select Token Activation policy</option>';
			try{
				if(obj7!=null && obj7!='')
					{
				jQuery.each(obj7, function(i, v) {
					var temp=obj7[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			
			content += '<th class="policySubHeading"><select name="" id="searchAuthSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj10!=null && obj10!='')
					{
				jQuery.each(obj10, function(i, v) {
					var temp=obj10[i];
					if(temp.authSourcePolId==searchAuthSrcPolicyName){
						content += '<option value="'+temp.authSourcePolId+'" selected>'+temp.authSourcePolTyp+'</option>';
					} else {
						content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
					}
					
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
/*			content += '</select>';	
			content += '<th class="policySubHeading" ><select name="" id="searchCountryPolicyNames"><option value="">Select Country policy</option>';
			try{
				if(obj8!=null && obj8!='')
					{
				jQuery.each(obj8, function(i, v) {
					var temp=obj8[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			//content += '<th><select name="" id=""><option value="">User not exist policy</option><option value="">User not exist policy1</option></select></th>';

			content += '</tr>';	*/
			
// end code for bug id 324 , added by abhimanyu					
			
			
			
			
			
			if(obj1!=null && obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				content += "<tr>";
				content += "<td><input class='checkboxes5'  name='checkHardUsers' type='checkbox' value='"+v.username+"'></td>";
				content += "<td>"+v.username+"</td>";				 
				content += "<td>"+v.commonPolicy+"</td>";
				content += "<td>"+v.hardOfflinePolicyName+"</td>";
				content += "<td>"+v.hardLockPolicyName+"</td>";
				content += "<td>"+v.ntPolicyName+"</td>";
				content += "<td>"+v.taPolicyName+"</td>";
				content += "<td>"+v.authSourcePolicyType+"</td>";
				//content += "<td>"+v.countryPolicyName+"</td>";
				content += "</tr>";
			});
				}
			else
				{
				content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";
				}

			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignHardPolicy()" class="btn btn-primary">Submit </button></div>';
			$('#block_policy_user_data').html(content);
			$("#sample_1").css("width","100%");
			//oTable = $('#sample_1').dataTable();
			
			
			$('#searchUserId').val(searchUserId);
			$('#searchCommonPolicyName').val(searchCommonPolicyName);
			$('#searchOfflineNames').val(searchOfflineNames);
			$('#searchLockNames').val(searchLockNames);
			$('#searchNtPolicyNames').val(searchNtPolicyNames);
			$('#searchTaPolicyNames').val(searchTaPolicyNames);
			$('#searchAuthSrcPolicyName').val(searchAuthSrcPolicyName);
			
			
			
			 if($.trim(globalPreviouspagePushTokenSize) != '')
			  {
			        $("#pageId").val(globalPreviouspagePushTokenSize);
			       fetchSizePushToken();
			       	if(!searchAssignPolicyPushTokenWithpageSize)
			       		$("#pageNum").val(globalPreviousPagePushTokenNum);
			       	else {
			       		if(globalPreviousPagePushTokenNum==0 && parseInt($('#pageN').text()) > 0)
			       			globalPreviousPagePushTokenNum="1";
			       		$("#pageNum").val(globalPreviousPagePushTokenNum);
			       	}
			   }
			 //searchAssignPolicyPushTokenWithpageSize=false;
			 
				if(pageCall==false){
					var size=10;
					if(globalPreviouspagePushTokenSize!=''){
						size = globalPreviouspagePushTokenSize;
						countPushToken = searchCount;
					}
					 if(searchUserId!="" || searchCommonPolicyName!="" || searchOfflineNames!="" || searchLockNames!="" || searchNtPolicyNames!="" 
						   || searchTaPolicyNames!="" || searchAuthSrcPolicyName!="" ){
						 countPushToken = searchCount;
					 }
					 if(countPushToken==0){
						 countPushToken = searchCount;
					 }
					
					var maxPgaeNumber = countPushToken / size;
					var rem = countPushToken % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN').html(parseInt(maxPgaeNumber));
					if(countPushToken == 0)
						$('#pageNum').val(0);
					else 
						$('#pageNum').val(1);
				}
				
				 if(searchUserId=="" && searchCommonPolicyName=="" && searchOfflineNames=="" && searchLockNames=="" && searchNtPolicyNames=="" 
					   && searchTaPolicyNames=="" && searchAuthSrcPolicyName=="" ){
					 searchAssignPolicyPushTokenWithpageSize=false;
				 }
			
			
		}

	});
}

var globalPreviouspageSmsTokenSize="";
var globalPreviousPageSmsTokenNum="";
function smsTokenTbl(pageCall ,isSearch){
	
	appName=document.getElementById('usr_app_select').value;
	domainName=document.getElementById('usr_domain_select').value;
	
	
// start code for bug id 324 , added by abhimanyu
	  if($("#pageId").length)
	     {
		  globalPreviouspageSmsTokenSize=$("#pageId").val();
		  globalPreviousPageSmsTokenNum=$("#pageNum").val();
	    }
	    
	   
	   var myUrl="policy_showAllSMSUsers.action?appName="+appName+"&domainName="+domainName;
	   var dataString="";
	   
	   if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			 	        if($.trim(size) == "")
							 size="10";
						if($.trim(pageNumber) == "")
							 pageNumber="1";
			  myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
	   
	   if(searchUserId!="" || searchCommonPolicyName!="" || searchLockNames!="" || searchNtPolicyNames!="" 
		    || searchAuthSrcPolicyName!="" ){
			isSearch=true;
		} 
	   
	   
	   if(isSearch){
		   try{
			searchUserId=document.getElementById('searchUserId').value;
				searchUserId = searchUserId.replace(/\s/g, "");
			 searchCommonPolicyName=document.getElementById('searchCommonPolicyName').value;
			 searchLockNames=document.getElementById('searchLockNames').value;
			 searchNtPolicyNames=document.getElementById('searchNtPolicyNames').value;
			 searchCountryPolicyNames="";//document.getElementById('searchCountryPolicyNames').value;
			 searchAuthSrcPolicyName=document.getElementById('searchAuthSrcPolicyNames').value;
		   }catch(err){}
		//	alert("Token:  "+token);
			//myUrl+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
			dataString+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
		 
		   }
	   
	   if(searchAssignPolicySmsTokenWithpageSize)
   	 {    if(myUrl.indexOf('fetchSize')==-1)
	     {   if($.trim(globalPreviouspageSmsTokenSize)!='')
	    	 { if(myUrl.indexOf('?')==-1)
	    	        myUrl+="?fetchSize="+globalPreviouspageSmsTokenSize; 
	    	     else
	    	    	 myUrl+="&fetchSize="+globalPreviouspageSmsTokenSize; 
	    	 }
	       }
	    }
	   
	   
	//   alert("myUrl =======>"+myUrl)
// end code for bug id 324 , added by abhimanyu	
	
	
	
	
	$.ajax({
		type: "POST",  
		url: myUrl,
		data: dataString,
		dataType: "text",
		success: function(data) {
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}

			var object = JSON.parse(data);
			var obj1=JSON.parse(object.userPolicyList);			
			var obj2 = JSON.parse(object.commonPolicyList);
			//var obj3 = JSON.parse(object.offlineList);
			var obj4 = JSON.parse(object.lockPolicyList);
			var obj5 = JSON.parse(object.count);
			 var obj6 = JSON.parse(object.ntPolicyList);
			 var obj7 = JSON.parse(object.countryPolicyList);
			 var obj8= JSON.parse(object.authSourcePolicyList);

			count=obj5;
			/*if(searchAssignPolicySmsTokenWithpageSize)
		    	obj5=countSmsToken;
			    countSmsToken = obj5;*/
			if(searchAssignPolicySmsTokenWithpageSize){
				countSmsToken = obj5;
				searchCount = obj5;
			} else{
				countSmsToken = obj5;
				searchCount = obj5;
			}
			
			
			 var content = '';
			
 // start code for bug id 324 , added by abhimanyu
			    content += '<div class="row-fluid new_filter">';
			    content += '<div class="span6">';
				content += '<div class="pull-left" id="switch_app">';
				content += '<label>Size</label>';
				content += '<select id="pageId" onChange="fetchSizeSmsToken(),getPageDataSmsToken();" style="width:100%;">';
				content += '<option value="">Select Size</option>';
				content += '<option value="10">10</option>';
				content += '<option value="20">20</option>';
				content += '<option value="50">50</option>';
				content += '<option value="100">100</option>';
				content += '<option value="200">200</option>';
				content += '<option value="500">500</option>';
				content += '<option value="1000">1000</option>';
				content += '<option value="2000">2000</option>';
				content += '<option value="5000">5000</option>';
				//content += '<option value="10000">10000</option>';
				content += '</select>';

				content += '</div>';
				content += '</div>';
				
				content += '<div class="span6">';
				content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
				content += '<label>Page Number</label>';
				/*content += '<select onChange="getPageDataSmsToken()" id="pageNum"  >';
				content += '<option value="">-select Page-</option>';
				content += '</select>';*/
				content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageDataSmsToken()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
				content += '</div>';
				content += '</div>';
				
				
// end code for bug id 324 , added by abhimanyu			 
			 
			 content += '<h4>User Policy</h4>';
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th width="6%"><input type="checkbox" id="checkAll5"  data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
			content += '<th>User LogonId</th>';
			content += '<th><select name="" id="commonPolicyName"><option value="">Select Common policy</option>';
			try{
				if(obj2!=null && obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th><select name="" id="lockNames"><option value="">Select LockoutAttempt policy</option>';
			try{
				if(obj4!=null && obj4!='')
					{
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';					//content += '<th><select name="" id=""><option value="">User not exist policy</option><option value="">User not exist policy1</option></select></th>';
			content += '<th><select name="" id="ntPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th ><select name="" id="authSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj8!=null && obj8!='')
					{
				jQuery.each(obj8, function(i, v) {
					var temp=obj8[i];

					content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			
/*			content += '<th><select name="" id="countryPolicyNames"><option value="">Select Country policy</option>';
			try{
				if(obj7!=null && obj7!='')
					{
				jQuery.each(obj7, function(i, v) {
					var temp=obj7[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	*/
			content += '</tr>';
			content += '</thead>';
			
// start code for bug id 324 , added by abhimanyu	
			
			content += '<tr>';
			content += '<th class="policySubHeading" style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignPolicySmsTokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			content += '<th class="policySubHeading" ><input type="text" id="searchUserId" /></th>';			
			content += '<th class="policySubHeading" ><select name="" id="searchCommonPolicyName"><option value="">Select Common policy</option>';
			try{
				if(obj2!=null && obj2!='')
					{
				jQuery.each(obj2, function(i, v) {
					var temp=obj2[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th class="policySubHeading" ><select name="" id="searchLockNames"><option value="">Select LockoutAttempt policy</option>';
			try{
				if(obj4!=null && obj4!='')
					{
				jQuery.each(obj4, function(i, v) {
					var temp=obj4[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';					//content += '<th><select name="" id=""><option value="">User not exist policy</option><option value="">User not exist policy1</option></select></th>';
			content += '<th class="policySubHeading" ><select name="" id="searchNtPolicyNames"><option value="">Select NT policy</option>';
			try{
				if(obj6!=null && obj6!='')
					{
				jQuery.each(obj6, function(i, v) {
					var temp=obj6[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th class="policySubHeading"><select name="" id="searchAuthSrcPolicyNames"><option value="">Select Auth Source Policy</option>';
			try{
				if(obj8!=null && obj8!='')
					{
				jQuery.each(obj8, function(i, v) {
					var temp=obj8[i];
					if(searchAuthSrcPolicyName==temp.authSourcePolId){
						content += '<option value="'+temp.authSourcePolId+'" selected>'+temp.authSourcePolTyp+'</option>';
					} else {
						content += '<option value="'+temp.authSourcePolId+'" >'+temp.authSourcePolTyp+'</option>';
					}
					
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';

			
			/*content += '<th class="policySubHeading" ><select name="" id="searchCountryPolicyNames"><option value="">Select Country policy</option>';
			try{
				if(obj7!=null && obj7!='')
					{
				jQuery.each(obj7, function(i, v) {
					var temp=obj7[i];

					content += '<option value="'+temp+'" >'+temp+'</option>';
				});
					}
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '</tr>';*/
			
// end code for bug id 324 , added by abhimanyu					
			
			
			
			
			
			if(obj1!=null && obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				content += "<tr>";
				content += "<td><input class='checkboxes5'  name='checkHardUsers' type='checkbox' value='"+v.username+"'></td>";
				content += "<td>"+v.username+"</td>";				 
				content += "<td>"+v.commonPolicy+"</td>";
				//content += "<td>"+v.hardOfflinePolicyName+"</td>";
				content += "<td>"+v.hardLockPolicyName+"</td>";
				content += "<td>"+v.ntPolicyName+"</td>";
				content += "<td>"+v.authSourcePolicyType+"</td>";
				
				content += "</tr>";
			});
				}
			else
				{
				content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
				}
			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignHardPolicy()" class="btn btn-primary">Submit </button></div>';
			$('#block_policy_user_data').html(content);
			$("#sample_1").css("width","100%");
			//oTable = $('#sample_1').dataTable();
			
			
			$('#searchUserId').val(searchUserId);
			$('#searchCommonPolicyName').val(searchCommonPolicyName);
			$('#searchLockNames').val(searchLockNames);
			$('#searchNtPolicyNames').val(searchNtPolicyNames);
			$('#searchAuthSrcPolicyName').val(searchAuthSrcPolicyName);
			
			
			 if($.trim(globalPreviouspageSmsTokenSize) != '')
			  {
			        $("#pageId").val(globalPreviouspageSmsTokenSize);
			       fetchSizeSmsToken();
			       	if(!searchAssignPolicySmsTokenWithpageSize)
			    	   $("#pageNum").val(globalPreviousPageSmsTokenNum);
			       	else {
			       		if(globalPreviousPageSmsTokenNum==0 && parseInt($('#pageN').text()) > 0)
			       			globalPreviousPageSmsTokenNum="1";
			       		$("#pageNum").val(globalPreviousPageSmsTokenNum);
			       	}
			   }
			// searchAssignPolicySmsTokenWithpageSize=false;
			 
				if(pageCall==false){
					var size = 10;
					if(globalPreviouspageSmsTokenSize!=''){
						size = globalPreviouspageSmsTokenSize;
						countSmsToken = searchCount;
					}
					if(searchUserId!="" || searchCommonPolicyName!="" || searchLockNames!="" || searchNtPolicyNames!="" 
					    || searchAuthSrcPolicyName!="" ){
						countSmsToken = searchCount;
					}
					if(countSmsToken==0){
						countSmsToken = searchCount;
					}
					var maxPgaeNumber = countSmsToken / size;
					var rem = countSmsToken % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN').html(parseInt(maxPgaeNumber));
					if(countSmsToken == 0)
						$('#pageNum').val(0);
					else 
						$('#pageNum').val(1);
				}
			
				if(searchUserId=="" && searchCommonPolicyName=="" && searchLockNames=="" && searchNtPolicyNames=="" 
				    && searchAuthSrcPolicyName=="" ){
				     searchAssignPolicySmsTokenWithpageSize=false;
				}
		}

	});
}


function fetchDomain(domain){

	var organisation=document.getElementById('org').value;

	document.getElementById(domain).options.length = 0;
	// var value = document.getElementById("id1").value;
	var listData=new Array();
	var sel = document.getElementById(domain);
	//   var opt = document.createElement('option');
	//    opt.innerHTML = "Select Domain";
	//     sel.options.add(opt);
	var opt = sel.options;
	opt[opt.length] = new Option("Select Domain","")

	$.ajax
	({
		url: 'admin_getDomainByUser.action',  
		cache: false,
		dataType:"text",
		success: function(data)
		{
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			var object = JSON.parse(data);
			var obj1=JSON.parse(object.domainList);

			if(obj1!=null && obj1!='')
				{
			$.each(obj1, function(i,data)
					{
				listData.push([data]);
					});
				}
			var sel = document.getElementById(domain);
			for(var i = 0; i < listData.length; i++) {
				//alert("data to be put"+listData[i]);

				var opt = sel.options;
				opt[opt.length] = new Option(listData[i],listData[i])
			}
		}
	});   
}


function assignAppPolicy(){
	try{
		
		var chks=document.getElementsByName('checkApp');
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats

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

		if(id==""){
			alert("Please select Application");
			return;
		}

		id=id.substring(0,id.length-1);
		
		var noTokenPolicy=document.getElementById('noTokenPolicy').value; 
	
		var pinCheckPolicy=document.getElementById('pinCheckPolicy').value;  
	
		var userNotExistPolicy=document.getElementById('userNotExistPolicy').value;  
		
		if(noTokenPolicy==""&&pinCheckPolicy==""&&userNotExistPolicy=="")
			{
		
			alert("Please select  policy");
			}
		
		dataString='appIds='+id+"&noTokenPolicy="+noTokenPolicy+"&pinCheckPolicy="+pinCheckPolicy+"&userNotExistPolicy="+userNotExistPolicy+'&csrfPreventionSalt='+strutsToken;
		
		try{
			$.ajax({
				type: "POST",
				url: "policy_assignPolicyToApp.action",
				dataType: "text",
				data: dataString,
				success: function(response){

				    alert(response);
					//	resVal=response;
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					else if($.trim(response) == "success"){
						app_policy();
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



function assignAppDevicePolicy(){
	try{
		
		var chks=document.getElementsByName('checkApp2');
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats

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

		if(id==""){
			alert("Please select Application");
			return;
		}

		id=id.substring(0,id.length-1);
		
		var mobileAppUptoDatePolicy=document.getElementById('mobileAppUptoDatePolicy').value; 
	
		var fullDiskEncryptionPolicy=document.getElementById('fullDiskEncryptionPolicy').value;  
	
		var screenLockPolicy=document.getElementById('screenLockPolicy').value;  
		
		var deviceNotRootedPolicy=document.getElementById('deviceNotRootedPolicy').value; 
		
		var passesGoogleSafetyPolicy=document.getElementById('passesGoogleSafetyPolicy').value; 
		
		var fingerPrintPolicy=document.getElementById('fingerPrintPolicy').value;
		
		var touchOrFaceIdPolicy=document.getElementById('touchOrFaceIdPolicy').value;
		
		if(mobileAppUptoDatePolicy=="" && fullDiskEncryptionPolicy=="" && screenLockPolicy=="" && deviceNotRootedPolicy=="" && passesGoogleSafetyPolicy=="" && fingerPrintPolicy=="" && touchOrFaceIdPolicy=="")
			{
		
			alert("Please select  policy");
			return;
			}
		
		dataString="appIds="+id+"&mobileAppUptoDatePolicy="+mobileAppUptoDatePolicy+"&fullDiskEncryptionPolicy="+fullDiskEncryptionPolicy+
				"&screenLockPolicy="+screenLockPolicy+"&csrfPreventionSalt="+strutsToken+"&deviceNotRootedPolicy="+deviceNotRootedPolicy+
				"&passesGoogleSafetyPolicy="+passesGoogleSafetyPolicy+"&fingerPrintPolicy="+fingerPrintPolicy+"&touchOrFaceIdPolicy="+touchOrFaceIdPolicy;
		
		try{
			$.ajax({
				type: "POST",
				url: "policy_assignDevicePolicyToApp.action",
				dataType: "text",
				data: dataString,
				success: function(response){

				    alert(response);
					//	resVal=response;
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					else if($.trim(response) == "success"){
						app_policy();
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

function fetchApp(domain,app){



	document.getElementById(app).options.length = 0;
	// var value = document.getElementById("id1").value;
	var listData=new Array();
	var sel = document.getElementById(app);
	// var opt = document.createElement('option');
	// opt.innerHTML = "Select Application";
	var opt = sel.options;
	opt[opt.length] = new Option("Select Application","")
	// sel.options.add(opt);

	$.ajax
	({
		url: 'admin_getAppByUser.action?domainName='+domain,  
		cache: false,
		dataType:"text",
		success: function(data)
		{	
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			var object = JSON.parse(data);
			var obj1=JSON.parse(object.appList);

			if(obj1!=null && obj1!='')
				{
			$.each(obj1, function(i,data)
					{
				listData.push([data]);
					});
				}
			//var sel = document.getElementById('usr_app_select');
			for(var i = 0; i < listData.length; i++) {
				//alert("data to be put"+listData[i]);

				var opt = sel.options;
				opt[opt.length] = new Option(listData[i],listData[i])
			}
		}
	});   
}


function assignHardPolicy(){
	try{
		
		var dataString;
		var chks=document.getElementsByName('checkHardUsers'); 
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats

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

if(id==""){
	alert("Please Select User");
	return;
}

		id=id.substring(0,id.length-1);
		var domain=$('#usr_domain_select').val();
		var application=$('#usr_app_select').val();
		//alert("domain==="+domain);
		
		var authType = $('#usr_pol_type_select :selected').val();
		//alert("authType=="+authType);
		var ntPolicyNames=document.getElementById('ntPolicyNames').value; 
		//alert("ntPolicyNames==="+ntPolicyNames)
		var countryPolicyNames="";//document.getElementById('countryPolicyNames').value; 
		if(authType =='Hard'){
			var taPolicyNames=document.getElementById('taPolicyNames').value; 
			var commonPolicyName=document.getElementById('commonPolicyName').value; 		
			var offlineNames=document.getElementById('offlineNames').value;  		
			var lockNames=document.getElementById('lockNames').value; 
			
			dataString='userIds='+id+"&commonPolicyName="+commonPolicyName+"&offlineNames="+offlineNames+"&lockNames="+lockNames+"&ntNames="+ntPolicyNames+"&taNames="+taPolicyNames+"&countryNames="+countryPolicyNames;
		}else if(authType=='Push'){
			var taPolicyNames=document.getElementById('taPolicyNames').value; 
			var commonPolicyName=document.getElementById('commonPolicyName').value;
			var offlineNames=document.getElementById('offlineNames').value; 
			var lockNames=document.getElementById('lockNames').value; 
			 dataString='userIds='+id+"&commonPolicyName="+commonPolicyName+"&offlineNames="+offlineNames+"&lockNames="+lockNames+"&ntNames="+ntPolicyNames+"&taNames="+taPolicyNames+"&countryNames="+countryPolicyNames;
			
		}else if(authType=='Bio'||authType=='Mobile'){
			var taPolicyNames=document.getElementById('taPolicyNames').value; 
			var commonPolicyName=document.getElementById('commonPolicyName').value; 
			var offlineNames=document.getElementById('offlineNames').value;  
			var lockNames=document.getElementById('lockNames').value; 
			var trPolicyNames=document.getElementById('trPolicyNames').value; 
			 dataString='userIds='+id+"&commonPolicyName="+commonPolicyName+"&offlineNames="+offlineNames+"&lockNames="+lockNames+"&ntNames="+ntPolicyNames+"&taNames="+taPolicyNames+"&countryNames="+countryPolicyNames+"&trPolicyNames="+trPolicyNames;
			
		}
		else if(authType=='Sms'){
			//alert("shyam")
			var commonPolicyName=document.getElementById('commonPolicyName').value; 			
			var lockNames=document.getElementById('lockNames').value; 
			 dataString='userIds='+id+"&commonPolicyName="+commonPolicyName+"&lockNames="+lockNames+"&ntNames="+ntPolicyNames+"&countryNames="+countryPolicyNames;
			// alert("in sms==="+dataString)
			
		}
		else if(authType=='Emergency'){
			var emergencyNames=document.getElementById('emergencyNames').value;  	
			var lockNames=document.getElementById('lockNames').value;  
			dataString='userIds='+id+"&emergencyNames="+emergencyNames+"&ntNames="+ntPolicyNames+"&lockNames="+lockNames+"&countryNames="+countryPolicyNames;
		}
		else if(authType=='No'){
			  
			dataString='userIds='+id+"&ntNames="+ntPolicyNames+"&countryNames="+countryPolicyNames;
		}
		
		var authSrcPolicyNameId=document.getElementById('authSrcPolicyNames').value; 
		var authSrcPolName=$('#authSrcPolicyNames').find(":selected").text();
		
		dataString+="&domainName="+domain+"&appName="+application+"&csrfPreventionSalt="+strutsToken+"&authSrcNamesId="+authSrcPolicyNameId+"&authSrcPolName="+authSrcPolName+"&authType="+authType;
		//alert(dataString);
		try{
			$.ajax({
				type: "POST",
				url: "policy_assignHardPoilicyToUsers.action",
				dataType: "text",
				data: dataString,
				success: function(response){

					//alert(response);
					//	resVal=response;

					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					else if($.trim(response) == "success"){
						var authType = $('#usr_pol_type_select :selected').val();

						user_policy(authType);
					}
					else{
						alert($.trim(response));
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




			function showAssignRemoteUserPolicy(authType)
			{

				
				appName=document.getElementById('remote_usr_app_select').value;
				domainName=document.getElementById('remote_usr_domain_select').value;
				//alert("appName==="+appName);
				//alert("domainName==="+domainName);
				$.ajax({
					type: "POST",  
					url: "policy_showAssignRemoteUserPolicy.action?appName="+appName+"&domainName="+domainName+"&authType="+authType,
					dataType: "text",
					success: function(data) {
						if($.trim(data)=="sessionout"){
							
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						var obj1=JSON.parse(object.tokenActivationPolicyList);			
						var obj2 = JSON.parse(object.assignDeassignUserDetailList);
						//alert("object.tokenActivationPolicyList===="+object.tokenActivationPolicyList);
						//alert("object.assignDeassignUserDetailList===="+object.assignDeassignUserDetailList);
						//var obj5 = JSON.parse(object.count);

						//count=obj5;
						var content = '<h4>User Policy</h4>';
						content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
						content += '<thead>';
						content += '<tr>';
						content += '<th style="width:20px;"><input type="checkbox"  data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
						content += '<th>User LogonId</th>';

						content += '<th><select name="activationPolicy" id="activationPolicy"><option value="">Select Token Activation policy</option>';
						try{
							if(obj1!=null && obj1!='')
								{
							jQuery.each(obj1, function(i, v) {
								var temp=obj1[i];

								content += '<option value="'+temp+'" >'+temp+'</option>';
							});
								}
						}
						catch(e){
							//alert(e);
						}
						content += '</select>';
						//<option value="">Mobile Token policy1</option></select></th>';
						
						content += '</tr>';
						content += '</thead>';
						try{
							if(obj2!=null && obj2!='')
								{
						jQuery.each(obj2, function(i, v) {
							content += "<tr>";
							content += "<td><input class='checkboxes' name='checkRemoteUsers' type='checkbox' value='"+v.userId+"'></td>";
							content += "<td>"+v.userName+"</td>";				 
							content += "<td>"+v.firstname+"</td>";
							content += "<td>"+v.mobileno+"</td>";
							content += "<td>"+v.emailid+"</td>";
							//content += "<td>"+v.userPolicy+"</td>";
							content += "</tr>";
						});
								}
							else
							{
							content += "<tr><td style='text-align: center;' colspan='3' > No Record Found!</td></tr>";
							}
						content += "</table>";
						}
						catch(e)
						{
							//alert(e);
						}
						content += '<div class="form-actions form-actions2"><button type="button" onClick="assignRemoteUserPolicy()"  class="btn btn-primary">Submit </button></div>';
						$('#block_policy_remote_user_data').html(content);
						$("#sample_1").css("width","100%");
						//oTable = $('#sample_1').dataTable();
					}

				});

			}

			function showDeassignRemoteUserPolicy(authType)
			{

				
				appName=document.getElementById('remote_usr_app_select').value;
				domainName=document.getElementById('remote_usr_domain_select').value;
				//alert("appName==="+appName);
				//alert("domainName==="+domainName);
				$.ajax({
					type: "POST",  
					url: "policy_showDeassignRemoteUserPolicy.action?appName="+appName+"&domainName="+domainName+"&authType="+authType,
					dataType: "text",
					success: function(data) {
						if($.trim(data)=="sessionout"){
							
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
								
						var obj1 = JSON.parse(object.assignDeassignUserDetailList);
						
						//alert("object.assignDeassignUserDetailList===="+object.assignDeassignUserDetailList);
						//var obj5 = JSON.parse(object.count);

						//count=obj5;
						var content = '<h4>User Policy</h4>';
						content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
						content += '<thead>';
						content += '<tr>';
						content += '<th style="width:20px;"><input type="checkbox"  data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
						content += '<th>UserLogonId</th>';
						content += '<th>FirstName</th>';
						content += '<th>Mobile</th>';
						content += '<th>Email</th>';
						content += '</tr>';
						content += '</thead>';
						try{
							if(obj1!=null && obj1!='')
								{
						jQuery.each(obj1, function(i, v) {
							content += "<tr>";
							content += "<td><input class='checkboxes' name='checkDeassignRemoteUsers' type='checkbox' value='"+v.userId+"'></td>";
							content += "<td>"+v.userName+"</td>";				 
							content += "<td>"+v.firstname+"</td>";
							content += "<td>"+v.mobileno+"</td>";
							content += "<td>"+v.emailid+"</td>";
							//content += "<td>"+v.userPolicy+"</td>";
							content += "</tr>";
						});
								}
							else
							{
							content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";
							}
						content += "</table>";
						}
						catch(e){
							//alert(e);
						}
						content += '<div class="form-actions form-actions2"><button type="button" onClick="deassignRemoteUserPolicy()"  class="btn btn-primary">Submit </button></div>';
						$('#block_policy_remote_user_data').html(content);
						$("#sample_1").css("width","100%");
						//oTable = $('#sample_1').dataTable();
					}

				});

			}


			
			
			
			function assignRemoteUserPolicy(){
				try{
					
					var dataString;
					var chks=document.getElementsByName('checkRemoteUsers');             

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

			if(id==""){
				alert("Please Select User");
				return;
			}

					id=id.substring(0,id.length-1);
					
					
					var activationPolicy = $('#activationPolicy :selected').val();
					//alert("id==="+id);
					
					//alert("activationPolicy==="+activationPolicy);
					if(activationPolicy==""){
						alert("Please Select Token Activation Policy");
						return;
					}
					try{
						$.ajax({
							type: "POST",
							url: "policy_assignRemoteUserPolicy.action?userIdForAssignDeassignToken="+id+"&tokenPolicyName="+activationPolicy,
							dataType: "text",
							data: dataString,
							success: function(response){

							//	alert(response);
								//	resVal=response;
								if($.trim(response)=="sessionout"){
									
									testVal= document.getElementById('loginPage').value				
									window.location.replace(testVal);
								}
								else if($.trim(response) == "success"){
									var authType = $('#remote_usr_pol_type_select :selected').val();

									showAssignRemoteUserPolicy(authType);
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

			
			function deassignRemoteUserPolicy(){
				try{
					
					var dataString;
					var chks=document.getElementsByName('checkDeassignRemoteUsers');             

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

			if(id==""){
				alert("Please Select User");
				return;
			}

					id=id.substring(0,id.length-1);
					
					
					
					//alert("id==="+id);
					
					
					try{
						$.ajax({
							type: "POST",
							url: "policy_deassignRemoteUserPolicy.action?userIdForAssignDeassignToken="+id,
							dataType: "text",
							data: dataString,
							success: function(response){

							//	alert(response);
								//	resVal=response;
								if($.trim(response)=="sessionout"){
									
									testVal= document.getElementById('loginPage').value				
									window.location.replace(testVal);
								}
								else if($.trim(response) == "success"){
									var authType = $('#remote_usr_pol_type_select :selected').val();

									showDeassignRemoteUserPolicy(authType);
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

// start code for bug id 324 , added by abhimanyu			
			
	

function  assignPolicyHardTokenSearch() {
	
	if(validateUserPolicy()){
		searchAssignPolicyhardTokenWithpageSize=true;
    	hardTokenTbl(false,true);
	} else{
		validateUserPolicy();
	}
}

function  assignPolicyBioTokenSearch() {
	
	if(validateUserPolicy()){
		searchAssignPolicyBioTokenWithpageSize=true;
	    bioTokenTbl(false,true);
	} else{
		validateUserPolicy();
	}
}	


function  assignPolicyEmergencyTokenSearch() {
	if(validateUserPolicy()){
		searchAssignPolicyEmergencyTokenWithpageSize=true;
		emergencyTokenTbl(false,true);
	} else{
		validateUserPolicy();
	}
}	

function  assignPolicyMobileTokenSearch() {
	if(validateUserPolicy()){
		searchAssignPolicyMobileTokenWithpageSize=true;
		mobileTokenTbl(false,true);
	} else{
		validateUserPolicy();
	}
}	

function  assignPolicyNoTokenSearch() {
	if(validateUserPolicy()){
		searchAssignPolicyNoTokenWithpageSize=true;
		noTokenTbl(false,true);
	} else{
		validateUserPolicy();
	}
}	

function  assignPolicyPushTokenSearch() {
	if(validateUserPolicy()){
		searchAssignPolicyPushTokenWithpageSize=true;
		pushTokenTbl(false,true);
	} else{
		validateUserPolicy();
	}
}	

function  assignPolicySmsTokenSearch() {
	if(validateUserPolicy()){
		searchAssignPolicySmsTokenWithpageSize=true;
		smsTokenTbl(false,true);
	} else{
		validateUserPolicy();
	}
}	

function  assignUserDevicePolicySearch() {
	if(validateUserPolicy()){
		searchAssignUserDevicePolicyWithpageSize=true;
		user_policy_device(false,true);
	} else{
		validateUserPolicy();
	}
}

function  assignUserDeviceOSPolicySearch() {
	if (validateUserPolicy()){
		searchAssignUserDeviceOSPolicyWithpageSize=true;
		user_policy_device_os(false,true);
	} else{
		validateUserPolicy();
	}
}





function fetchSizeHardToken() {
	try {
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
			var maxSize = countHardToken;
			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(countHardToken==0){
				$('#pageNum').val(0);
			} else{
				$('#pageNum').val(1);
				$('#pageNum').attr("disabled",false);
			} 				
			$('#pageN').html(parseInt(maxPgaeNumber));

		} 
	} catch (e) {

	 }
}


function fetchSizeOSPolicyData() {
	try {
		var size = document.getElementById('pageId_11').value;
		if ($.trim(size) != '') {
			var maxSize = countHardToken;
			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(countHardToken==0){
				$('#pageNum_11').val(0);
			} else{
				$('#pageNum_11').val(1);
				$('#pageNum_11').attr("disabled",false);
			} 				
			$('#pageN_11').html(parseInt(maxPgaeNumber));

		} 
	} catch (e) {

	 }
}

function fetchSizeUserDevicePol() {
	try {
		var size = document.getElementById('pageId_1').value;
		if ($.trim(size) != '') {
			var maxSize = countHardToken;
			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(countHardToken==0){
				$('#pageNum_1').val(0);
			} else{
				$('#pageNum_1').val(1);
				$('#pageNum_1').attr("disabled",false);
			} 				
			$('#pageN_1').html(parseInt(maxPgaeNumber));

		} 
	} catch (e) {

	 }
}


function fetchSizeBioToken() {
	try {
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
			
			var maxSize = countBioToken;

			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			
			if(countBioToken==0){
				$('#pageNum').val(0);
			} else{
				$('#pageNum').val(1);
				$('#pageNum').attr("disabled",false);
			} 				
			$('#pageN').html(parseInt(maxPgaeNumber));
	
		}
	} catch (e) {
		//alert(e)
		// TODO: handle exception
	}
}



function fetchSizeEmergencyToken() {
	try {
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
			var maxSize = countEmergencyToken;
			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(countEmergencyToken==0){
				$('#pageNum').val(0);
			} else{
				$('#pageNum').val(1);
				$('#pageNum').attr("disabled",false);
			} 				
			$('#pageN').html(parseInt(maxPgaeNumber));
			
		}
	} catch (e) {
		//alert(e)
		// TODO: handle exception
	}
}



function fetchSizeMobileToken() {
	try {
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
			// alert("size== "+size)
			var maxSize = countMobileToken;

			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(countMobileToken==0){
				$('#pageNum').val(0);
			} else{
				$('#pageNum').val(1);
				$('#pageNum').attr("disabled",false);
			} 				
			$('#pageN').html(parseInt(maxPgaeNumber));
		} 
	} catch (e) {
		//alert(e)
		// TODO: handle exception
	}
}


function fetchSizeNoToken() {
	try {
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
			
			var maxSize = countNoToken;

			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			
			if(countNoToken==0){
				$('#pageNum').val(0);
			} else{
				$('#pageNum').val(1);
				$('#pageNum').attr("disabled",false);
			} 				
			$('#pageN').html(parseInt(maxPgaeNumber));
		
		}
	} catch (e) {
		//alert(e)
		// TODO: handle exception
	}
}


function fetchSizePushToken() {
	try {
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
			
			var maxSize = countPushToken;
			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(countPushToken==0){
				$('#pageNum').val(0);
			} else{
				$('#pageNum').val(1);
				$('#pageNum').attr("disabled",false);
			} 				
			$('#pageN').html(parseInt(maxPgaeNumber));
			
		} 
	} catch (e) {
		//alert(e)
		// TODO: handle exception
	}
}



function fetchSizeSmsToken() {
	try {
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
			// alert("size== "+size)
			var maxSize = countSmsToken;

			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(countSmsToken==0){
				$('#pageNum').val(0);
			} else{
				$('#pageNum').val(1);
				$('#pageNum').attr("disabled",false);
			} 				
			$('#pageN').html(parseInt(maxPgaeNumber));
			
		} 
	} catch (e) {
		//alert(e)
		// TODO: handle exception
	}
}








function getPageDataHardToken(){

	var size=document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var pageNumber=document.getElementById('pageNum').value;
	var totalPages =  $('#pageN').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		hardTokenTbl(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}

function getPageDataDeviceUserPol(){

	var size=document.getElementById('pageId_1').value;
	if ($.trim(size) != '') {
	var pageNumber=document.getElementById('pageNum_1').value;
	var totalPages =  $('#pageN_1').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_1').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		user_policy_device(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}

function getPageDataDeviceUserPol1(){

	var size=document.getElementById('pageId_11').value;
	if ($.trim(size) != '') {
	var pageNumber=document.getElementById('pageNum_11').value;
	var totalPages =  $('#pageN_11').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_11').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		{searchAssignUserDeviceOSPolicyWithpageSize=true;
		 user_policy_device_os(true,false);
	  }
	else
		alert('Page should be less than or equal to page number.');
	}
}


function getPageDevicePolicyUser(){

	var size=document.getElementById('pageId_1').value;
	if ($.trim(size) != '') {
	var pageNumber=document.getElementById('pageNum_1').value;
	var totalPages =  $('#pageN').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		hardTokenTbl(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}



function getPageDataBioToken(){

	var size=document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var pageNumber=document.getElementById('pageNum').value;
	var totalPages =  $('#pageN').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		bioTokenTbl(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}

function getPageDataEmergencyToken(){

	var size=document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var pageNumber=document.getElementById('pageNum').value;
	var totalPages =  $('#pageN').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		emergencyTokenTbl(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}

function getPageDataMobileToken(){

	var size=document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var pageNumber=document.getElementById('pageNum').value;
	var totalPages =  $('#pageN').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		mobileTokenTbl(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}


function getPageDataNoToken(){

	var size=document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var pageNumber=document.getElementById('pageNum').value;
	var totalPages =  $('#pageN').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		noTokenTbl(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}



function getPageDataPushToken(){

	var size=document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN').text();
	var pageNumber=document.getElementById('pageNum').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		pushTokenTbl(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}

function getPageDataSmsToken(){

	var size=document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var pageNumber=document.getElementById('pageNum').value;
	var totalPages =  $('#pageN').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if($.trim(pageNumber) != "")
		smsTokenTbl(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}


//end code for bug id 324 , added by abhimanyu
function assignPolicyHardTokenSearch1(e)
{
	 if (e.keyCode === 13)   
		assignPolicyHardTokenSearch();
}

function assignPolicyBioTokenSearch1(e)
{
	 if (e.keyCode === 13)   
		assignPolicyBioTokenSearch();
}


function assignPolicyEmergencyTokenSearch1(e)
{
	 if (e.keyCode === 13)   
		assignPolicyEmergencyTokenSearch();
}


function assignPolicyMobileTokenSearch1(e)
{
	 if (e.keyCode === 13)   
		assignPolicyMobileTokenSearch();
}

function assignPolicyNoTokenSearch1(e)
{
	 if (e.keyCode === 13)   
		assignPolicyNoTokenSearch();
}


function assignPolicyPushTokenSearch1(e)
{
	 if (e.keyCode === 13)   
		assignPolicyPushTokenSearch();
}

function assignUserDevicePolicySearch1(e)
{
	 if (e.keyCode === 13)   
		 assignUserDevicePolicySearch();
}

function assignUserDevicePolicySearch2(e)
{
	 if (e.keyCode === 13)   
		 assignUserDeviceOSPolicySearch();
}


function validateUserPolicy(){
	var userId = $('#searchUserId').val();
	 if(userId != undefined && userId!= ""){
		 userId = userId.replace(/\s/g, " ");
			var user = userId.split(',');
			var len  = user.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#searchUserId').val("");
				return false;
			}
	 }
	return true;
}







var globalPreviouspageDevicePolSize="";
var globalPreviousPageDevicePolNum="";

function user_policy_device(pageCall ,isSearch){
	  appName=document.getElementById('usr_app_select_dev').value;
	  domainName=document.getElementById('usr_domain_select_dev').value;
	  var authType = $('#usr_pol_type_select_dev :selected').val();
	  
	// start code for bug id 324 , added by abhimanyu
	  if($("#pageId_1").length)
	     {
		  globalPreviouspageDevicePolSize=$("#pageId_1").val();
		  globalPreviousPageDevicePolNum=$("#pageNum_1").val();
	    }
	   var myUrl="policy_showAllUserDevicePolicy.action?appName="+appName+"&domainName="+domainName+"&authType="+authType;
	   var dataString="";
	   
	   if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId_1').value;
			var pageNumber=document.getElementById('pageNum_1').value;
			 	        if($.trim(size) == "")
							 size="10";
						if($.trim(pageNumber) == "")
							 pageNumber="1";
			  myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
	   
	   if(searchUserId_1!="" || searchMobileAppUptodate!="" || searchFullDiskEncryption!="" || searchScreenLock!="" || searchDeviceNotRooted!="" 
		   || searchPassesGoogleSafety!="" || searchFingerPrint!="" || searchTouchOrFace!="" ){
			isSearch=true;
		} 
	   
	   
	   if(isSearch){
		   try{
			   
			 searchUserId_1=document.getElementById('searchUserId_1').value;
			 searchUserId_1 = searchUserId_1.replace(/\s/g, "");
			 searchMobileAppUptodate=document.getElementById('searchMobileAppUptodateId').value;
			 searchFullDiskEncryption=document.getElementById('searchFullDiskEncryptionId').value;
			 searchScreenLock=document.getElementById('searchScreenLockId').value;
			 searchDeviceNotRooted=document.getElementById('searchDeviceNotRootedId').value;
			 searchPassesGoogleSafety=document.getElementById('searchPassesGoogleSafetyId').value;
			 searchFingerPrint=document.getElementById('searchFingerPrintId').value;
			 searchTouchOrFace=document.getElementById('searchTouchOrFaceId').value;
			 
			
			//myUrl+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
			//dataString+="&userIds="+searchUserId_1+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
			dataString+="&userIds="+searchUserId_1+"&mobileAppUptoDatePolicy="+searchMobileAppUptodate+"&fullDiskEncryptionPolicy="+searchFullDiskEncryption+"&screenLockPolicy="+searchScreenLock+
			"&deviceNotRootedPolicy="+searchDeviceNotRooted+"&passesGoogleSafetyPolicy="+searchPassesGoogleSafety+"&fingerPrintPolicy="+searchFingerPrint+"&touchOrFaceIdPolicy="+searchTouchOrFace;

			
		   }catch(err){}
		   }
	   
	   if(searchAssignUserDevicePolicyWithpageSize) { 
		   if(myUrl.indexOf('fetchSize')==-1){ 
			   if($.trim(globalPreviouspageDevicePolSize)!='') { 
				   if(myUrl.indexOf('?')==-1)
	    	        myUrl+="?fetchSize="+globalPreviouspageDevicePolSize; 
	    	     else
	    	    	 myUrl+="&fetchSize="+globalPreviouspageDevicePolSize; 
	    	 }
	       }
	    }
	   
	
	$.ajax({
		type: "POST",  
		url: myUrl,
		data:dataString,
		dataType: "text",
		success: function(data) {
			
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}

			var object = JSON.parse(data);
			var obj1=  JSON.parse(object.userPolicyList);			
			
			var obj5 = JSON.parse(object.count);
			count=obj5;
			
			if(searchAssignUserDevicePolicyWithpageSize){
				countHardToken = obj5;
				searchCount = obj5;
			} else {
				countHardToken = obj5;
				searchCount = obj5;
			}
			
			var content = '';
	  
		    content += '<div class="row-fluid new_filter">';
		    content += '<div class="span6">';
			content += '<div class="pull-left" id="switch_app">';
			content += '<label>Size</label>';
			content += '<select id="pageId_1" onChange="fetchSizeUserDevicePol(),getPageDataDeviceUserPol();" style="width:100%;">';
			content += '<option value="">Select Size</option>';
			content += '<option value="10">10</option>';
			content += '<option value="20">20</option>';
			content += '<option value="50">50</option>';
			content += '<option value="100">100</option>';
			content += '<option value="200">200</option>';
			content += '<option value="500">500</option>';
			content += '<option value="1000">1000</option>';
			content += '<option value="2000">2000</option>';
			content += '<option value="5000">5000</option>';
			//content += '<option value="10000">10000</option>';
			content += '</select>';

			content += '</div>';
			content += '</div>';
			
			content += '<div class="span6">';
			content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
			content += '<label>Page Number</label>';
			content += ' <input type="text" id="pageNum_1" style="width:20%;background-color:white;" onChange="getPageDataDeviceUserPol()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_1"></span>';
			content += '</div>';
			content += '</div>';
			
			
		// end code for bug id 324 , added by abhimanyu
			
			
			content += '<h4>User Device Policy</h4>';
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th width="6%"><input type="checkbox" id="checkall4" data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
			content += '<th>User LogonId</th>';

			//<option value="">Mobile Token policy1</option></select></th>';
			content += '<th><select name="" id="mobileAppUptoDateId"><option value="">Select Mobile App Uptodate policy</option>';
			try{
	      		content += '<option value="0" >Do nothing</option>';
	      		content += '<option value="1" >Notify</option>';
	      		content += '<option value="2" >Force Upgrade</option>';
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th><select name="" id="fullDiskEncryptionPolicyId"><option value="">Select Full Disk Encryption policy</option>';
			try{
				
      		content += '<option value="1" >Yes</option>';
      		content += '<option value="0" >No</option>';
				}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			content += '<th><select name="" id="screenLockPolicyId"><option value="">Select Screen Lock policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
					
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			content += '<th><select name="" id="deviceNotRootedPolicyId"><option value="">Select Device Not Rooted policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th ><select name="" id="passesGoogleSafetyPolicyId"><option value="">Select Passes Google Safety policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			
			content += '<th ><select name="" id="fingerPrintPolicyId"><option value="">Select Finger Print Policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			
			content += '<th ><select name="" id="touchOrFaceIdPolicyId"><option value="">Select Touch or face id policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			
			content += '</tr>';
			content += '</thead>';
//start code for bug id 324 , added by abhimanyu	
			
            content += '<tr>';
			content += '<th class="policySubHeading" style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignUserDevicePolicySearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			content += '<th class="policySubHeading" ><input type="text" onkeydown="assignUserDevicePolicySearch1(event)"  id="searchUserId_1" value=""/></th>';
			 
			content += '<th class="policySubHeading"><select name="" id="searchMobileAppUptodateId"><option value="">Select Mobile App Uptodate policy</option>';
			try{
				content += '<option value="0" >Do nothing</option>';
	      		content += '<option value="1" >Notify</option>';
	      		content += '<option value="2" >Force Upgrade</option>';
			}
			catch(e){
			}
			content += '</select>';
			content += '<th class="policySubHeading"><select name="" id="searchFullDiskEncryptionId"><option value="">Select Full Disk Encryption policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}
			content += '</select>';
			content += '<th class="policySubHeading"><select name="" id="searchScreenLockId"><option value="">Select Screen Lock policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			content += '<th class="policySubHeading"><select name="" id="searchDeviceNotRootedId"><option value="">Select Device Not Rooted policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			content += '<th class="policySubHeading"><select name="" id="searchPassesGoogleSafetyId"><option value="">Select Passes Google Safety policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';	
			
			content += '<th class="policySubHeading"><select name="" id="searchFingerPrintId"><option value="">Select Finger Print Policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
			
			content += '<th class="policySubHeading"><select name="" id="searchTouchOrFaceId"><option value="">Select Touch or face id policy</option>';
			try{
				content += '<option value="1" >Yes</option>';
	      		content += '<option value="0" >No</option>';
			}
			catch(e){
				//alert(e);
			}	
			content += '</select>';
	 
//end code for bug id 324 , added by abhimanyu						
			
			if(obj1!=null && obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				content += "<tr>";
				content += "<td><input class='checkboxes4' name='checkDeviceUsers' type='checkbox' value='"+v.username+"'></td>";
				content += "<td>"+v.username+"</td>";
				content += "<td>"+v.mobileAppUpTodatePolicy+"</td>";
				content += "<td>"+v.fullDiskEncryptionPolicy+"</td>";
				content += "<td>"+v.screenLockPolicy+"</td>";
				content += "<td>"+v.deviceNotRootedPolicy+"</td>";
				content += "<td>"+v.passesGoogleSafetyPolicy+"</td>";
				content += "<td>"+v.fingerPrintPolicy+"</td>";
				content += "<td>"+v.touchOrFaceIdPolicy+"</td>";

				content += "</tr>";
			});
				}
			else
				{
				content += "<tr><td style='text-align: center;' colspan='8' > No Record Found!</td></tr>";
				}
			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignDevicePolicy()"  class="btn btn-primary">Submit </button></div>';
			$('#block_device_policy_user_data').html(content);
			$("#sample_1").css("width","100%");
			//oTable = $('#sample_1').dataTable();
			
			
			$('#searchUserId').val(searchUserId);
			
			 if($.trim(globalPreviouspageDevicePolSize) != '') {
			        $("#pageId_1").val(globalPreviouspageDevicePolSize);
			        fetchSizeUserDevicePol();
			       	if(!globalPreviouspageDevicePolSize)
			    	   $("#pageNum_1").val(globalPreviousPageDevicePolNum);
			       	else {
			       		if(globalPreviousPageDevicePolNum==0 && parseInt($('#pageN_1').text()) > 0)
			       			globalPreviousPageDevicePolNum="1";
			       		$("#pageNum_1").val(globalPreviousPageDevicePolNum);
			       	}
			   }
			 //searchAssignPolicyhardTokenWithpageSize=false;
				if(pageCall==false){
					var size=10;
					if(globalPreviouspageDevicePolSize!=''){
						size=globalPreviouspageDevicePolSize;
						countHardToken = searchCount;
					}
					
					 if(searchUserId_1!="" || searchMobileAppUptodate!="" || searchFullDiskEncryption!="" || searchScreenLock!="" || searchDeviceNotRooted!="" 
						   || searchPassesGoogleSafety!="" || searchFingerPrint!="" || searchTouchOrFace!="" ){
						 countHardToken = searchCount;
						} 
		
					if(countHardToken==0){
						countHardToken = searchCount;
					}
					var maxPgaeNumber = countHardToken / size;
					var rem = countHardToken % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN_1').html(parseInt(maxPgaeNumber));
					if(countHardToken == 0)
						$('#pageNum_1').val(0);
					else 
						$('#pageNum_1').val(1);
				}
				
				 if(searchUserId_1!="" || searchMobileAppUptodate!="" || searchFullDiskEncryption!="" || searchScreenLock!="" || searchDeviceNotRooted!="" 
					   || searchPassesGoogleSafety!="" || searchFingerPrint!="" || searchTouchOrFace!="" ){
					searchAssignUserDevicePolicyWithpageSize=false;
				}
			
		}

	});
}



function assignDevicePolicy(){
	try{
		var dataString;
		var chks=document.getElementsByName('checkDeviceUsers'); 
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
		

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

if(id==""){
	alert("Please Select User");
	return;
}

		id=id.substring(0,id.length-1);
		var domain=$('#usr_domain_select_dev').val();
		var application=$('#usr_app_select_dev').val();
		//alert("domain==="+domain);
		var mobileAppUptoDate=$('#mobileAppUptoDateId').val();
		var fullDiskEncryptionPolicy=$('#fullDiskEncryptionPolicyId').val();
		var screenLockPolicy=$('#screenLockPolicyId').val();
		var deviceNotRootedPolicy=$('#deviceNotRootedPolicyId').val();
		var passesGoogleSafetyPolicy=$('#passesGoogleSafetyPolicyId').val();
		var fingerPrintPolicy=$('#fingerPrintPolicyId').val();
		var touchOrFaceIdPolicy=$('#touchOrFaceIdPolicyId').val();
		
		var authType = $('#usr_pol_type_select_dev :selected').val(); 
		dataString="mobileAppUptoDatePolicy="+mobileAppUptoDate+"&fullDiskEncryptionPolicy="+fullDiskEncryptionPolicy+"&screenLockPolicy="+screenLockPolicy+
		"&deviceNotRootedPolicy="+deviceNotRootedPolicy+"&passesGoogleSafetyPolicy="+passesGoogleSafetyPolicy+"&fingerPrintPolicy="+fingerPrintPolicy+"&touchOrFaceIdPolicy="+touchOrFaceIdPolicy;

		
	
		
				//alert(dataString);
		try{
			$.ajax({
				type: "POST",
				url: "policy_assignDevicePoilicyToUsers.action?userIds="+encodeURIComponent(id)+"&domainName="+domain+"&appName="+application+"&csrfPreventionSalt="+strutsToken,
				dataType: "text",
				data: dataString,
				success: function(response){

					//alert(response);
					//	resVal=response;

					if($.trim(response)=="sessionout"){
						alert($.trim(response));
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					else if($.trim(response) == "success"){
						var authType = $('#usr_pol_type_select_dev :selected').val();

						user_policy_device(false,false);
					}
					else{
						alert($.trim(response));
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


function assignAppDeviceOSPolicy(){
	try{
		
		var chks=document.getElementsByName('checkApp3');
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats

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

		if(id==""){
			alert("Please select Application");
			return;
		}

		id=id.substring(0,id.length-1);
		
		var blockAndroidOsPolicy=document.getElementById('block_android_os_policy').value; 
	
		var blockIphoneOsPolicy=document.getElementById('block_iphone_os_policy').value;  
	
		var notifyAndroidOsPolicy=document.getElementById('notify_android_os_policy').value;  
		
		var notifyIphoneOsPolicy=document.getElementById('notify_iphone_os_policy').value; 
		
	 
	 
		
		
		if(blockAndroidOsPolicy=="" && blockIphoneOsPolicy=="" && notifyAndroidOsPolicy=="" && notifyIphoneOsPolicy=="")
			{
		
			alert("Please select  policy");
			return;
			}
		
		dataString="appIds="+id+"&blockAndroidOsPolicy="+blockAndroidOsPolicy+"&blockIphoneOsPolicy="+blockIphoneOsPolicy+
				"&notifyAndroidOsPolicy="+notifyAndroidOsPolicy+"&csrfPreventionSalt="+strutsToken+"&notifyIphoneOsPolicy="+notifyIphoneOsPolicy;
		
		try{
			$.ajax({
				type: "POST",
				url: "policy_assignDeviceOSPolicyToApp.action",
				dataType: "text",
				data: dataString,
				success: function(response){

				    alert(response);
					//	resVal=response;
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					else if($.trim(response) == "success"){
						app_policy();
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






var globalPreviouspageDeviceOSPolSize="";
var globalPreviousPageDeviceOSPolNum="";

function user_policy_device_os(pageCall ,isSearch){
	 
	  appName=document.getElementById('usr_app_select_dev_os').value;
	  domainName=document.getElementById('usr_domain_select_dev_os').value;
	  var authType = $('#usr_type_select_os :selected').val();
	  
 
	// start code for bug id 324 , added by abhimanyu
	  if($("#pageId_11").length)
	     {
		  globalPreviouspageDeviceOSPolSize=$("#pageId_11").val();
		  globalPreviousPageDeviceOSPolNum=$("#pageNum_11").val();
	    }
	   var myUrl="policy_showAllUserDeviceOSPolicy.action?appName="+appName+"&domainName="+domainName+"&authType="+authType;
	   var dataString="";
	   
	   if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId_11').value;
			var pageNumber=document.getElementById('pageNum_11').value;
			 	        if($.trim(size) == "")
							 size="10";
						if($.trim(pageNumber) == "")
							 pageNumber="1";
			  myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
	   
	   if(searchUserId_4!="" || searchBlockAndroidOsPolicy!="" || searchBlockIphoneOsPolicy!="" || searchNotifyAndroidOsPolicy!="" || searchNotifyIphoneOsPolicy!=""){
			isSearch=true;
		} 
	   
	   
	   if(isSearch){
		   try{
			   
			 searchUserId_4=document.getElementById('searchUserId_4').value;
			 searchUserId_4 = searchUserId_4.replace(/\s/g, "");
			 searchBlockAndroidOsPolicy=document.getElementById('searchblockAndroidOsPolicy').value;
			 searchBlockIphoneOsPolicy=document.getElementById('searchblockIphoneOsPolicy').value;
			 searchNotifyAndroidOsPolicy=document.getElementById('searchnotifyAndroidOsPolicy').value;
			 searchNotifyIphoneOsPolicy=document.getElementById('searchnotifyIphoneOsPolicy').value;
		 
			 
			
			//myUrl+="&userIds="+searchUserId+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
			//dataString+="&userIds="+searchUserId_1+"&commonPolicyName="+searchCommonPolicyName+"&offlineNames="+searchOfflineNames+"&lockNames="+searchLockNames+"&ntNames="+searchNtPolicyNames +"&taNames="+searchTaPolicyNames+"&countryNames="+searchCountryPolicyNames+"&authSrcNamesId="+searchAuthSrcPolicyName;
			dataString+="&userIds="+searchUserId_4+"&blockAndroidOsPolicy="+searchBlockAndroidOsPolicy+"&blockIphoneOsPolicy="+searchBlockIphoneOsPolicy+"&notifyAndroidOsPolicy="+searchNotifyAndroidOsPolicy+
			"&notifyIphoneOsPolicy="+searchNotifyIphoneOsPolicy;

			
		   }catch(err){}
		   }
	   
	   if(searchAssignUserDeviceOSPolicyWithpageSize) { 
		   if(myUrl.indexOf('fetchSize')==-1){ 
			   if($.trim(globalPreviouspageDeviceOSPolSize)!='') { 
				   if(myUrl.indexOf('?')==-1)
	    	        myUrl+="?fetchSize="+globalPreviouspageDeviceOSPolSize; 
	    	     else
	    	    	 myUrl+="&fetchSize="+globalPreviouspageDeviceOSPolSize; 
	    	 }
	       }
	    }
	   
	
	$.ajax({
		type: "POST",  
		url: myUrl,
		data:dataString,
		dataType: "text",
		success: function(data) {
			
			if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}

			var object = JSON.parse(data);
			var obj1=  JSON.parse(object.userOSPolicyList);			
			var obj4=  JSON.parse(object.deviceOSVoList);	
			var obj5 = JSON.parse(object.count);
		 
			count=obj5;
			
			if(searchAssignUserDevicePolicyWithpageSize){
				countHardToken = obj5;
				searchCount = obj5;
			} else {
				countHardToken = obj5;
				searchCount = obj5;
			}
			
			var optionCreaterOSListForAndroid =""; 
			var optionCreaterOSListForIphone ="";	
		 
		jQuery.each(obj4, function(i, v) {
		 
		 
			if(v.deviceOSType == 'android' || v.deviceOSType == 'default')
			    optionCreaterOSListForAndroid +='<option value="'+v.deviceOsId+'">'+v.deviceOSVersion+'</option>';
			 
			 if(v.deviceOSType == 'iphone' || v.deviceOSType == 'default')
				 optionCreaterOSListForIphone +='<option value="'+v.deviceOsId+'">'+v.deviceOSVersion+'</option>';
		 		 
		});
			var content = '';
	  
		    content += '<div class="row-fluid new_filter">';
		    content += '<div class="span6">';
			content += '<div class="pull-left" id="switch_app">';
			content += '<label>Size</label>';
			content += '<select id="pageId_11" onChange="getPageDataDeviceUserPol1()" style="width:100%;">';
			content += '<option value="">Select Size</option>';
			content += '<option value="10">10</option>';
			content += '<option value="20">20</option>';
			content += '<option value="50">50</option>';
			content += '<option value="100">100</option>';
			content += '<option value="200">200</option>';
			content += '<option value="500">500</option>';
			content += '<option value="1000">1000</option>';
			content += '<option value="2000">2000</option>';
			content += '<option value="5000">5000</option>';
			//content += '<option value="10000">10000</option>';
			content += '</select>';

			content += '</div>';
			content += '</div>';
			
			content += '<div class="span6">';
			content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
			content += '<label>Page Number</label>';
			content += ' <input type="text" id="pageNum_11" style="width:20%;background-color:white;" onChange="getPageDataDeviceUserPol1()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_11"></span>';
			content += '</div>';
			content += '</div>';
			
			
		// end code for bug id 324 , added by abhimanyu
			
			
			content += '<h4>User Device OS Policy</h4>';
			content += '<table class="table table-striped table-bordered word-break-css" id="sample_1">';
			content += '<thead>';
			content += '<tr>';
			content += '<th width="6%"><input type="checkbox" id="checkall444"  data-set="#sample_1 .checkboxes" class="group-checkable"></th>';
			content += '<th>User LogonId</th>';

			//<option value="">Mobile Token policy1</option></select></th>';
			content += '<th><select name="" id="blockAndroidOsPolicy"><option value="">-Select Block Android OS Policy-</option>'+optionCreaterOSListForAndroid+'</select></th>';
			content += '<th><select name="" id="notifyAndroidOsPolicy"><option value="">-Select Notify Android OS Policy-</option>'+optionCreaterOSListForAndroid+'</select></th>';
			content += '<th><select name="" id="blockIphoneOsPolicy"><option value="">-Select Block Iphone OS Policy-</option>'+optionCreaterOSListForIphone+'</select></th>';
			content += '<th><select name="" id="notifyIphoneOsPolicy"><option value="">-Select Notify Iphone OS Policy-</option>'+optionCreaterOSListForIphone+'</select></th>';
			
			
			content += '</tr>';
			content += '</thead>';
//start code for bug id 324 , added by abhimanyu	
			
            content += '<tr>';
			content += '<th class="policySubHeading" style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignUserDeviceOSPolicySearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			content += '<th class="policySubHeading" ><input type="text" onkeydown="assignUserDevicePolicySearch2(event)"  id="searchUserId_4" value=""/></th>';
			 
			content += '<th  class="policySubHeading" style="padding-bottom: 15px;" ><select name="" id="searchblockAndroidOsPolicy"><option value="">-Select Block Android OS Policy-</option>'+optionCreaterOSListForAndroid+'</select></th>';
			content += '<th  class="policySubHeading" style="padding-bottom: 15px;"><select name="" id="searchnotifyAndroidOsPolicy"><option value="">-Select Notify Android OS Policy-</option>'+optionCreaterOSListForAndroid+'</select></th>';
			content += '<th  class="policySubHeading" style="padding-bottom: 15px;" ><select name="" id="searchblockIphoneOsPolicy"><option value="">-Select Block Iphone OS Policy-</option>'+optionCreaterOSListForIphone+'</select></th>';
			content += '<th  class="policySubHeading" style="padding-bottom: 15px;" ><select name="" id="searchnotifyIphoneOsPolicy"><option value="">-Select Notify Iphone OS Policy-</option>'+optionCreaterOSListForIphone+'</select></th>';
		
	 
//end code for bug id 324 , added by abhimanyu						
			
			if(obj1!=null && obj1!='')
				{
			jQuery.each(obj1, function(i, v) {
				content += "<tr>";
				content += "<td><input class='checkboxes444' name='checkDeviceUsers' type='checkbox' value='"+v.username+"'></td>";
				content += "<td>"+v.username+"</td>";
				content += "<td>"+v.blockAndroidOsPolicy+"</td>";
				content += "<td>"+v.notifyAndroidOsPolicy+"</td>";
				content += "<td>"+v.blockIphoneOsPolicy+"</td>";
				content += "<td>"+v.notifyIphoneOsPolicy+"</td>";
			 content += "</tr>";
			});
				}
			else
				{
				content += "<tr><td style='text-align: center;' colspan='8' > No Record Found!</td></tr>";
				}
			content += "</table>";
			content += '<div class="form-actions form-actions2"><button type="button" onClick="assignDeviceOSPolicy()"  class="btn btn-primary">Submit </button></div>';
			$('#block_device_policy_os_user_data').html(content);
			$("#sample_1").css("width","100%");
			//oTable = $('#sample_1').dataTable();
			
			
			$('#searchUserId').val(searchUserId);
			
			 if($.trim(globalPreviouspageDeviceOSPolSize) != '') {
			        $("#pageId_11").val(globalPreviouspageDeviceOSPolSize);
			        fetchSizeOSPolicyData();
			       	if(!globalPreviouspageDeviceOSPolSize)
			    	   $("#pageNum_11").val(globalPreviousPageDeviceOSPolNum);
			       	else {
			       		if(globalPreviousPageDeviceOSPolNum==0 && parseInt($('#pageN_11').text()) > 0)
			       			globalPreviousPageDeviceOSPolNum="1";
			       		$("#pageNum_11").val(globalPreviousPageDeviceOSPolNum);
			       	}
			   }
			 //searchAssignPolicyhardTokenWithpageSize=false;
				if(pageCall==false){
					var size=10;
					if(globalPreviouspageDeviceOSPolSize!=''){
						size=globalPreviouspageDeviceOSPolSize;
						countHardToken = searchCount;
					}
					
					 if(searchUserId_1!="" || searchMobileAppUptodate!="" || searchFullDiskEncryption!="" || searchScreenLock!="" || searchDeviceNotRooted!="" 
						   || searchPassesGoogleSafety!="" || searchFingerPrint!="" || searchTouchOrFace!="" ){
						 countHardToken = searchCount;
						} 
		
					if(countHardToken==0){
						countHardToken = searchCount;
					}
					var maxPgaeNumber = countHardToken / size;
					var rem = countHardToken % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN_11').html(parseInt(maxPgaeNumber));
					if(countHardToken == 0)
						$('#pageNum_11').val(0);
					else 
						$('#pageNum_11').val(1);
				}
				
				 if(searchUserId_1!="" || searchMobileAppUptodate!="" || searchFullDiskEncryption!="" || searchScreenLock!="" || searchDeviceNotRooted!="" 
					   || searchPassesGoogleSafety!="" || searchFingerPrint!="" || searchTouchOrFace!="" ){
					searchAssignUserDevicePolicyWithpageSize=false;
				}
			
		}

	});
}



function assignDeviceOSPolicy(){
	try{
		var dataString;
		var chks=document.getElementsByName('checkDeviceUsers'); 
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
		

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

if(id==""){
	alert("Please Select User");
	return;
}

		id=id.substring(0,id.length-1);
		var domain=$('#usr_domain_select_dev_os').val();
		var application=$('#usr_app_select_dev_os').val();
		
		//alert("domain==="+domain);
		var blockAndroidOsPolicy=$('#blockAndroidOsPolicy').val();
		var blockIphoneOsPolicy=$('#blockIphoneOsPolicy').val();
		var notifyAndroidOsPolicy=$('#notifyAndroidOsPolicy').val();
		var notifyIphoneOsPolicy=$('#notifyIphoneOsPolicy').val();
		 
		
		var authType = $('#usr_pol_type_select_dev :selected').val(); 
		dataString="blockAndroidOsPolicy="+blockAndroidOsPolicy+"&blockIphoneOsPolicy="+blockIphoneOsPolicy+"&notifyAndroidOsPolicy="+notifyAndroidOsPolicy+
		"&notifyIphoneOsPolicy="+notifyIphoneOsPolicy;

		
	
		
			 
		try{
			$.ajax({
				type: "POST",
				url: "policy_assignDeviceOSPoilicyToUsers.action?userIds="+encodeURIComponent(id)+"&domainName="+domain+"&appName="+application+"&csrfPreventionSalt="+strutsToken,
				dataType: "text",
				data: dataString,
				success: function(response){

					//alert(response);
					//	resVal=response;

					if($.trim(response)=="sessionout"){
						alert(response);
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					else if($.trim(response) == "success"){
						var authType = $('#usr_pol_type_select_dev :selected').val();

						user_policy_device_os(false,false);
					}
					else{
						alert($.trim(response));
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
