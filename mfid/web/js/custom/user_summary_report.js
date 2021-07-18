
function removeFilter(){
	$("#userLogonId").val("");
	$("#authtype").val("");
	$("#tokenSerial").val("");
	$("#appName").val("");
	$("#creationDate").val("");
	$("#loginTime").val("");
	
	$("#successAttemptsuserName").val("");
	$("#successAttemptsapplication").val("");
	$("#successAttemptsrequestTime").val("");
	$("#successAttemptsuserStatus").val("");
	
	$("#failureAttemptsuserName").val("");
	$("#failureAttemptsapplication").val("");
	$("#failureAttemptsrequestTime").val("");
	$("#failureAttemptsuserStatus").val("");

	$("#emergencyAttemptsuserName").val("");
	$("#emergencyAttemptsapplication").val("");
	$("#emergencyAttemptsrequestTime").val("");
	$("#emergencyAttemptsuserStatus").val("");
	
}

var count;
var associateCount;
var searchCount;
var userlist;
var user;
var associateUserList;
var searchUserSummaryReportDataWithpageSize=false;
var searchSuccessAttemptsWithpageSize=false;
var searchFailureAttemptsWithpageSize=false;
var searchEmergencyAttemptsWithpageSize=false;
var globalsUserIDForUserSummaryReport='';
var globalShowPopupWindow = true;
var globalArrayUserSummaryColumn = '';
var globalReportType='';
var genUserSummaryReportFilter = '';
var genUserSummaryReportAssFilter = '';
var attemptType='';
var from_date = getAddDaysToCurrentDate();
var to_date = getCurrentDate();
var global_from_date = '';
var global_to_date = '';
var global_app_Name = '';
var firstTimeFlag = "1";

function ajaxFunctionCallForDomain() {
	var value = document.getElementById("userSummaryDomain").value;
	if(value=="select"){
    	document.getElementById('userSummaryApp').options.length = 1;
    } else{
    	document.getElementById('userSummaryApp').options.length = 0;
    	var listData=new Array();
    	$.ajax({
    		url : 'ApplicationMFIDAction.action?switchDomainName='
				+ $('#userSummaryDomain').val(),
			cache : false,
		    dataType : "text",
		    success: function(data){
		    	if($.trim(data)=="sessionout"){
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
		    	var obj = JSON.parse(data);
		    	var obj1 = JSON.parse(obj.reportList);
		    	 if(obj1!=null) {
		 			$.each(obj1, function(i,data) {
		 				listData.push([data]);
		 			});
		 		 }
		    	 var sel = document.getElementById('userSummaryApp');
		    	 var opt1 = sel.options;
		    	 opt1[opt1.length] = new Option("All","All");
		    	 for(var i = 0; i < listData.length; i++) {
	    			var opt = sel.options;
	    			opt[opt.length] = new Option(listData[i],listData[i])
		    	}
		    }
    	});
    }
	
}

	
function getPageData_assignDeasign() {
	
	var size=document.getElementById('pageId_assign').value;
	if($.trim(size)!='') {
	var pageNumber=document.getElementById('pageNum_assign').value;
	var totalPages =  $('#pageN_assign').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_assign').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		openUserSummary(true,false);
		//changeApplication(true,true);
	else 
		alert('Page should be less than or equal to page number.');
	}
	
}


function fetchSize_assignDeasign(){
	try{
	var size=document.getElementById('pageId_assign').value;

	if($.trim(size)!='')
	{
		
	var maxSize=count;
	
	var maxPgaeNumber=maxSize/size;
	var rem=maxSize%size;
	if(rem>0){
		maxPgaeNumber=maxPgaeNumber+1;
	}
	
	if(count==0){
		$('#pageNum_assign').val(0);
	} else{
		$('#pageNum_assign').val(1);
		$('#pageNum_assign').attr("disabled",false);
	} 				
	$('#pageN_assign').html(parseInt(maxPgaeNumber));
	
	}
			
	}
	catch (e) {
		alert(e)
	}
}

var searchUserLogonId='';
var authtype='';
var appSearch='';
var creationDate= '';
var loginTime=   '';

var globalOpenSummaryPreviouspageSize="";
var globalOpenSummaryPreviousPageNum="";

function openUserSummary(pagecall,pageSearch){
		var domainName = $("#userSummaryDomain").val();
	    var applicationName = $("#userSummaryApp").val();
	    if (domainName === undefined || domainName === null) 
	    	domainName = "";
	    if (applicationName === undefined || applicationName === null)   
	    	applicationName = "";
	    
	  
	    if($("#pageId_assign").length) {
	    	globalOpenSummaryPreviouspageSize=$("#pageId_assign").val();
	    	globalOpenSummaryPreviousPageNum=$("#pageNum_assign").val();
	     }
	     
	//var globalfetchSize=$('#pageId_assign').val();
	    
	if(from_date.indexOf('/')!=-1){
		from_date=from_date.split("/")[2]+"-"+from_date.split("/")[1]+"-"+from_date.split("/")[0]+" 00:00:00";
		to_date=to_date.split("/")[2]+"-"+to_date.split("/")[1]+"-"+to_date.split("/")[0]+" 23:59:59";
	 }
	var myUrl = "report_userSummaryReport.action?fromDate="+from_date+"&toDate="+to_date+"&domainName="+domainName+"&appName="+applicationName+"&firstTimeFlag="+firstTimeFlag+"&";
	
	var dataString=""; 
	
	genUserSummaryReportFilter = "&"+myUrl.split("?")[1];
	if(pagecall){
		var size=document.getElementById('pageId_assign').value;
		var pageNumber=document.getElementById('pageNum_assign').value;
		myUrl+= "fetchSize="+size+"&pageNumber="+pageNumber;
		myUrl+="&";
	}
	else 
		myUrl+="";
	
	if(searchUserLogonId!="" || authtype!="" || appSearch!="" || creationDate!="" || loginTime!=""){
		pageSearch=true;
	}
	if(pageSearch){
		searchUserLogonId=document.getElementById('userLogonId').value;
			searchUserLogonId = searchUserLogonId.replace(/\s/g, "");
		authtype=document.getElementById('authtype').value;
		var tokenSerial="";
		appSearch=document.getElementById('appName').value;
			appSearch = appSearch.replace(/\s/g, "");
		
		creationDate= $("#creationDate" ).val();
			creationDate = creationDate.replace(/\s/g, "");
		loginTime=   $("#loginTime" ).val();
			loginTime = loginTime.replace(/\s/g, "");
			
		//myUrl+= "userName="+user+"&authtype="+authtype+"&tokenSerial="+tokenSerial+"&appSearch="+appSearch+"&creationDate="+creationDate+"&loginTime="+loginTime;
		
		dataString+= "userName="+searchUserLogonId+"&authtype="+authtype+"&tokenSerial="+tokenSerial+"&appSearch="+appSearch+"&creationDate="+creationDate+"&loginTime="+loginTime;
		
		//genUserSummaryReportFilter = "&"+myUrl.split("?")[1];
	}
	
	if(searchUserSummaryReportDataWithpageSize) {  
	     if(myUrl.indexOf('fetchSize')==-1){ 
	    	 if($.trim(globalOpenSummaryPreviouspageSize)!='')
	    		 myUrl+="&fetchSize="+globalOpenSummaryPreviouspageSize; 
		 }
    }
	
	
	$('#user_summary_report_data').html('<span>Loading...</span>');
			$.ajax({
				type: "POST",  
				url: myUrl,
				data: dataString,
				async: true,
				dataType: "text",
				success: function(data) { 
					 if($.trim(data)=="sessionout"){
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
					var object = JSON.parse(data);
					var obj4 = JSON.parse(object.count);
					var obj1=JSON.parse(object.applicationList);
					var obj2=JSON.parse(object.domainList);
					var obj3=JSON.parse(object.userSummaryList);
					userlist=JSON.parse(object.userSummaryList);
					
				 
					if(searchUserSummaryReportDataWithpageSize) { 
						searchCount = obj4;
						count=obj4;
					} else {
						count=obj4;
						searchCount = obj4;
					}
					
					var content = '';
						content += '<div class="row-fluid">';
							content += '<div class="span3">';
							content += '<label>Domain : </label>';
							content += '<select id="userSummaryDomain" name="switchDomain" onchange="ajaxFunctionCallForDomain();">';
							content += '<option value="select">Domain</option>';
							jQuery.each(obj2, function(i, v) {
								var tempDomainList=obj2[i];
									content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
							});
							
							content += '</select>';
							content += '</div>';
							content += '<div class="span3 ">';
							content += '<label>Application : </label>';
							content += '<select id="userSummaryApp" name="switchApp" onchange="openUserSummary(false,false);">';
							content += '<option value="All">Application</option>';
							jQuery.each(obj1, function(i, v) {
								var tempApplicationList=obj1[i];
									content += '<option value="'+tempApplicationList+'" >'+tempApplicationList+'</option>';
							});
							content += '</select>';
							content += '</div>';
							content += '<div class="clear"></div>';
							content += '</div>';
						content += '<div class="row-fluid">';
						content += '<div class="span3 offset0">';
						content += '<label>From : </label>';
						content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
						content += '</div>';

						content += '<div class="span3 offset0">';
						content += '<label>To : </label>';
						content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
						content += '</div>';
						
						content += '<div class="span3 offset0">';
						content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="getUserSummaryDatewise()" />';
						content += '</div>';
						content += '<div class="clear"></div>';
						content += '</div>';
						
						
						/*content += '<div class="row-fluid">';
							content += '<div  class="span3">';
							content += '<label>Search by Authentication Type : </label>';
								content += '<select class="ass-dss-select span12" name="authtype" id="authtype" onchange="search(true);">';
									content += '<option value="all">-select authentication-</option>';
									content += '<option value="all">All</option>';
									content += '<option value="noToken">No Token</option>';
									content += '<option value="hardToken">Hard Token</option>';
									content += '<option value="desktopToken">Soft Token</option>';
									content += '<option value="mobileToken">Mobile Token</option>';
									content += '<option value="pushToken">Push Token</option>';
									content += '<option value="softToken">SMS Token</option>';
									content += '<option value="emergencyToken">Emergency Token</option>';
								content += '</select>';
							content += '</div>';
							content += '<div class="span3 offset5">';
								content += '<label>Search by Name : </label>';
								content+='<input type="text"  class="ass-dss-select span12" name="userName" id="userName"/>';
								
							content += '</div>';
							content += '<div class="span1 ">';
							content += '<button type="button" class="btn btn-primary" onclick="search(true)" style="margin-top: 25px;">Submit</button>';
							content += '</div>';
							content += '<div class="clear"></div>';
						content += '</div>';*/
						
						
						content += '<div class="row-fluid" >';
						content += '<div  class="span6">';
							content += '<div class="pull-left" id="switch_app">';
							content += '<label>Size</label>';
							content += '<select id="pageId_assign" onChange="fetchSize_assignDeasign(),getPageData_assignDeasign();" name="deassociationReasonListName" style="width:100%;">';
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
							content += '<div class="pull-right" id="switch_app"  style="margin-right:-20%;">';
							content += '<label>Page Number</label>';
							/*content += '<select onChange="getPageData_assignDeasign()" id="pageNum_assign"  >';
							content += '<option value="">-select Page-</option>';
							content += '</select>';*/
							content += ' <input type="text" id="pageNum_assign" style="width:20%;background-color:white;" onChange="getPageData_assignDeasign()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_assign"></span>';
							content += '</div>';
							content += '</div>';
							content += '</div>';
						
						
						
						content += '<table class="table table-striped table-bordered" id="sample_1">';
						content += '<thead>';
							content += '<tr>';
								content += '<th>Sr No.</th>';
								content += '<th>User Name</th>';
								content += '<th>Creation Date</th>';
								content += '<th>Application</th>';
								content += '<th>Token Type</th>';
								// 21-sep-2017 content += '<th>Token Serial / License Key</th>';
								content += '<th>Last Login</th>';
								content += '<th>Success Attempts</th>';
								content += '<th>Failure Attempts</th>';
								content += '<th>Emergency Attempts</th>';
							content += '</tr>';
							
							content += '<tr>';
							
							//content += '<th><input type="button" onClick="search()" /></th>';
							content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="search_data();" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummaryReport(event)" id="userLogonId" /></th>';
							
							content += '<th><input type="text"  onkeydown="searchUsersummaryReport(event)" name="creationDate" id="creationDate"/></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummaryReport(event)" id="appName" /></th>';
							content += '<th>';
							content += '<select class="ass-dss-select span12" name="authtype" id="authtype" >';
							//content += '<option value="all">-select authentication-</option>';
							content += '<option value="all">All</option>';
							content += '<option value="noToken">No Token</option>';
							content += '<option value="hardToken">Hard Token</option>';
							content += '<option value="bioToken">Bio Token</option>';
							content += '<option value="mobileToken">Mobile Token</option>';
							content += '<option value="pushToken">Push Token</option>';
							content += '<option value="smsToken">SMS Token</option>';
							content += '<option value="emergencyToken">Emergency Token</option>';
							content += '</select>';
							content += '</th>';
							// 21-sep-2017 content += '<th><input type="text"  onkeydown="searchUsersummaryReport(event)" id="tokenSerial" /></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummaryReport(event)" name="loginTime" id="loginTime"/></th>';
							content += '<th></th>';
							content += '<th></th>';
							content += '<th></th>';
							content += '</tr>';
							
							
						content += '</thead>';
						
						try{
							if(obj3!=null && obj3 !='')
								{
						jQuery.each(obj3, function(i, v) {
						i = (i+1);
						
							content += "<tr>";
								content += "<td>"+i+"</td>";
								content += "<td>"+v.userLogonId+"</td>";
								content += "<td>"+v.creationDate+"</td>";
								content += "<td>"+v.appName+"</td>";
								content += "<td>"+v.authType+"</td>";
								// 21-sep-2017 content += "<td>"+v.tokenSerial+"</td>";
								content += "<td>"+v.lastLogin+"</td>";
								content += "<td><a href='javascript:void(0);' data='"+v.userMappingId+","+v.userLogonId+","+v.appName+"' class='success_attempt' >"+v.suuccessAttempts+"</td>";
								content += "<td><a href='javascript:void(0);' data='"+v.userMappingId+","+v.userLogonId+","+v.appName+"' class='failure_attempt'>"+v.failureAttempts+"</td>";
								content += "<td><a href='javascript:void(0);' data='"+v.userMappingId+","+v.userLogonId+","+v.appName+"' class='emergency_attempt' >"+v.emergencyUsed+"</td>";
							content += "</tr>";
						});
								}
							else
								{
								content += "<tr><td style='text-align: center;' colspan='9' > No Record Found!</td></tr>";	
								}
						}
						catch(e)
						{
							//alert(e);
						}
						content += "</table>";
						$('#user_summary_report_data').html(content);
						if(userlist!=null&&userlist!='')
							{
						content1="<div class='span4'><h4>Export options:</h4></div>";
	                    content1+="<div class='span8' >";
	                    content1+="<form method='post' id='reportForm'> ";
	                    content1+="<input type='hidden' name='userName' id='user_name'/>";
	                    content1+="<input type='hidden' name='authtype' id='auth_type'/>";
	                    content1+="<input type='hidden' name='appSearch' id='app_search'/>";
	                    content1+="<input type='hidden' name='creationDate' id='creation_date'/>";
	                    content1+="<input type='hidden' name='loginTime' id='login_time'/>";
	                    content1+="<ul>";
	                    content1+="<li><a href='#' onClick='callCsvReport()' class='btn btn-primary'>CSV</a></li>";
	                    content1+="<li><a href='#' onClick='callExcelReport()' class='btn btn-primary'>Excel</a></li>";
	                    content1+="<li><a href='#' id='xml' data='xml' onClick='callXmlReport()' class='btn btn-primary'>XML</a></li>";
	                    content1+="<li><a href='#' id='pdf' data='pdf' onClick='callPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
	                    content1+="</ul>";
	                    content1+="</form>";
	                    content1+="</div>";
						
						 $('#expo_opt').html(content1);
							}
						else
							{
							$('#expo_opt').html('');
							}
						$("#sample_1").css("width","100%");
						//$("#creationDate" ).datepicker({ dateFormat: "yy-mm-dd" }).val();
						//$("#loginTime" ).datepicker({ dateFormat: "yy-mm-dd" }).val();
						$("#creationDate").datepicker({dateFormat: 'yy-mm-dd',  maxDate:'0' }).val();
						$("#loginTime").datepicker({dateFormat: 'yy-mm-dd',  maxDate:'0' }).val();
						
						/* if(searchUserSummaryReportDataWithpageSize) {
							 $("#pageId_assign").val(globalfetchSize);
							 fetchSize_assignDeasign();
						}*/
					 
					 
					 	$("#userLogonId").val(searchUserLogonId);
						$("#authtype").val(authtype);
						$("#tokenSerial").val(tokenSerial);
						$("#appName").val(appSearch);
						$("#creationDate").val(creationDate);
						$("#loginTime").val(loginTime);
							
						
					       if($.trim(globalOpenSummaryPreviouspageSize) != '') {  
					    	   $("#pageId_assign").val(globalOpenSummaryPreviouspageSize);
						      fetchSize_assignDeasign();
						         if(!searchUserSummaryReportDataWithpageSize)
						        	 $("#pageNum_assign").val(globalOpenSummaryPreviousPageNum);
						         else {
						        	 if(globalOpenSummaryPreviousPageNum==0 && parseInt($('#pageN_assign').text()) > 0)
						        		 globalOpenSummaryPreviousPageNum="1";
						        	 $("#pageNum_assign").val(globalOpenSummaryPreviousPageNum);
						         }
						    }
							
					         //searchUserSummaryReportDataWithpageSize=false;
					        // $("#from_date" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
					     	//$("#to_date").datepicker({ dateFormat: "dd/mm/yy" }).val();
					         $("#from_date").datepicker({dateFormat: 'dd/mm/yy',  maxDate:'0' }).val();
					         $("#to_date").datepicker({dateFormat: 'dd/mm/yy',  maxDate:'0' }).val();
					     	if(global_from_date != '' && global_to_date != '')
						    	 {
					     		  $("#from_date" ).val(global_from_date);
						     	  $("#to_date" ).val(global_to_date);
						    	 }
					     	else
					     		{
					     		$("#from_date" ).val(getAddDaysToCurrentDate());
						     	$("#to_date" ).val(getCurrentDate());
					     		}
					     	
					    	if(pagecall==false){
					    		var size=10;
					    		if (globalOpenSummaryPreviouspageSize != '') {
									size = parseInt(globalOpenSummaryPreviouspageSize);
									count = searchCount;
								}
					    		if(searchUserLogonId!="" || authtype!="" || appSearch!="" || creationDate!="" || loginTime!=""){
					    			count = searchCount;
					    		}
															
								if(count == 0){
									count = searchCount;
								}
					    	
								var maxPgaeNumber = count / size;
								var rem = count % size;
								if (rem > 0) {
									maxPgaeNumber = maxPgaeNumber + 1;
								}
								$('#pageN_assign').html(parseInt(maxPgaeNumber));
								if(count == 0)
									$('#pageNum_assign').val(0);
								else 
									$('#pageNum_assign').val(1);
							}
					    	
					    	if(searchUserLogonId=="" && authtype=="" && appSearch=="" && creationDate=="" && loginTime==""){
					    		searchUserSummaryReportDataWithpageSize=false;
				    		}
					    	
					    	if(domainName !="")
					    		 $("#userSummaryDomain").val(domainName);
					    	if(applicationName !="")
					    		 $("#userSummaryApp").val(applicationName);
					    		 
					    		 
					
				}
			
			});
			 
			firstTimeFlag = "0";
		}


function search_data()
{
	searchUserSummaryReportDataWithpageSize=true;
	openUserSummary(false,true,"");
}

function changeDateFormat(dateformat)
{
	var d = new Date(dateformat);
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
	return output;

}
function getCurrentDate()
{	
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();
	var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
	return output;
}

function getAddDaysToCurrentDate()
{
	var d = new Date();
	d.setDate(d.getDate() - 7);
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
	return output;

}

		function changeApplication(pagecall,pageSearch)
		{
			
			 from_date=$("#from_date").val();
			 to_date=$("#to_date").val();
		
		    if(from_date.indexOf('/')!=-1){
			   from_date=from_date.split("/")[2]+"-"+from_date.split("/")[1]+"-"+from_date.split("/")[0]+" 00:00:00";
			   to_date=to_date.split("/")[2]+"-"+to_date.split("/")[1]+"-"+to_date.split("/")[0]+" 23:59:59";
			}
		    
			var myUrl = "report_userSummaryReport.action?fromDate="+from_date+"&toDate="+to_date;
			
			if(pagecall)
			{
				
			var size=document.getElementById('pageId_assign').value;
			var pageNumber=document.getElementById('pageNum_assign').value;
   		    myUrl+= "&fetchSize="+size+"&pageNumber="+pageNumber;
			myUrl+="&";
			}
			else 
				myUrl+="&";
			if(pageSearch){
				var domainName = document.getElementById("userSummaryDomain").value;
				var user=document.getElementById('userLogonId').value;
				var authtype=document.getElementById('authtype').value;
			 	var tokenSerial="";
				var appName=document.getElementById('userSummaryApp').value;
				var creationDate= $("#creationDate" ).val();
				var loginTime=   $("#loginTime" ).val();
			
				myUrl+= "domainName="+domainName+"&userName="+user+"&authtype="+authtype+"&tokenSerial="+tokenSerial+"&appName="+appName+"&creationDate="+creationDate+"&loginTime="+loginTime;
			}
			
			$.ajax({
				type: "POST",  
				url:myUrl,
				data: "{}",
				async: true,
				dataType: "text",
				success: function(data) { 
				 if($.trim(data)=="sessionout"){
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
				  }
					var object = JSON.parse(data);
					var obj1=JSON.parse(object.count);
					var obj=JSON.parse(object.userSummaryList);
					userlist=JSON.parse(object.userSummaryList);
					count=obj1;
					var content = '';
						content += '<div class="row-fluid">';
						content += '<table class="table table-striped table-bordered" id="sample_1">';
						content += '<thead>';
							content += '<tr>';
								content += '<th>Sr No.</th>';
								content += '<th>User Name</th>';
								content += '<th>Creation Date</th>';
								content += '<th>Application</th>';
								content += '<th>Token Type</th>';
								//content += '<th>Token Serial / Lisence Key</th>';
								content += '<th>Last Login</th>';
								content += '<th>Success Attempts</th>';
								content += '<th>Failure Attempts</th>';
								content += '<th>Emergency Attempts</th>';
							content += '</tr>';
						//	content += '<th><input type="button" onClick="search()" /></th>';
						    content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="search_data()" ><i style="font-size:20px;" class="icon-search"></i></a></th>';
							content += '<th><input type="text" onkeydown="searchUsersummaryReport(event)" id="userLogonId" /></th>';
							
							content += '<th><input type="text" onkeydown="searchUsersummaryReport(event)" name="creationDate" id="creationDate"/></th>';
							content += '<th><input type="text" onkeydown="searchUsersummaryReport(event)" id="appName" /></th>';
							content += '<th>';
							content += '<select class="ass-dss-select span12" name="authtype" id="authtype" >';
							//content += '<option value="all">-select authentication-</option>';
							content += '<option value="all">All</option>';
							content += '<option value="noToken">No Token</option>';
							content += '<option value="hardToken">Hard Token</option>';
							content += '<option value="bioToken">Bio Token</option>';
							content += '<option value="mobileToken">Mobile Token</option>';
							content += '<option value="pushToken">Push Token</option>';
							content += '<option value="smsToken">SMS Token</option>';
							content += '<option value="emergencyToken">Emergency Token</option>';
							content += '</select>';
							content += '</th>';
							//content += '<th><input type="text" onkeydown="searchUsersummaryReport(event)" id="tokenSerial" /></th>';
							content += '<th><input type="text" onkeydown="searchUsersummaryReport(event)" name="loginTime" id="loginTime"/></th>';
							content += '<th></th>';
							content += '<th></th>';
							content += '<th></th>';
							content += '</tr>';
						content += '</thead>';
						try{
							if(obj!=null && obj != '')	{
						jQuery.each(obj, function(i, v) {
						i = (i+1);
								content += "<tr>";
								content += "<td>"+i+"</td>";
								content += "<td>"+v.userLogonId+"</td>";
								content += "<td>"+v.creationDate+"</td>";
								content += "<td>"+v.appName+"</td>";
								content += "<td>"+v.authType+"</td>";
								//content += "<td>"+v.tokenSerial+"</td>";
								content += "<td>"+v.lastLogin+"</td>";
								content += "<td><a href='javascript:void(0);' data='"+v.userMappingId+","+v.userLogonId+","+v.appName+"' class='success_attempt' >"+v.suuccessAttempts+"</td>";
								content += "<td><a href='javascript:void(0);' data='"+v.userMappingId+","+v.userLogonId+","+v.appName+"' class='failure_attempt'>"+v.failureAttempts+"</td>";
								content += "<td><a href='javascript:void(0);' data='"+v.userMappingId+","+v.userLogonId+","+v.appName+"' class='emergency_attempt' >"+v.emergencyUsed+"</td>";
							content += "</tr>";
							
						});
						} else 	{
							 content += "<tr><td style='text-align: center;' colspan='9' > No Record Found!</td></tr>";	
						}
						}
						catch(e)
						{
							//alert(e);
						}
						content += "</table>";
						content += "</div>";
						$('#sample_1').html(content);
						if(userlist!=null&&userlist!='')
						{
					content1="<div class='span4'><h4>Export options:</h4></div>";
                    content1+="<div class='span8' >";
                    content1+="<form method='post' id='reportForm'> ";
                    content1+="<input type='hidden' name='userName' id='user_name'/>";
                    content1+="<input type='hidden' name='authtype' id='auth_type'/>";
                    content1+="<input type='hidden' name='appSearch' id='app_search'/>";
                    content1+="<input type='hidden' name='creationDate' id='creation_date'/>";
                    content1+="<input type='hidden' name='loginTime' id='login_time'/>";
                    content1+="<ul>";
                    content1+="<li><a href='#' onClick='callCsvReport()' class='btn btn-primary'>CSV</a></li>";
                    content1+="<li><a href='#' onClick='callExcelReport()' class='btn btn-primary'>Excel</a></li>";
                    content1+="<li><a href='#' id='xml' data='xml' onClick='callXmlReport()' class='btn btn-primary'>XML</a></li>";
                    content1+="<li><a href='#' id='pdf' data='pdf' onClick='callPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
                    content1+="</ul>";
                    content1+="</form>";
                    content1+="</div>";
					
					 $('#expo_opt').html(content1);
						}
					else
						{
						$('#expo_opt').html('');
						}
						//$('#sample_1').dataTable();
						$("#sample_1").css("width","100%");
						
						
				}
			
			});
	
	}
		
		
		
		$(document).on('click','.success_attempt',function(){  
			var data='';
			attemptType = '&attemptType=success';
			data=$(this).attr('data');
			  if(data.indexOf(',') !== -1)
        		 {
        	       var arraySuccessAttempt = data.split(",");
        	       data = arraySuccessAttempt[0];
        	       globalsUserIDForUserSummaryReport = arraySuccessAttempt[1];
        	       global_app_Name   = arraySuccessAttempt[2];
        	    }
        	 try{ $("#pageId_success").val(''); $("#pageNum_success").val(''); }catch(err){}
             successAttempts_tab(data,false,false);
            
		});
		$(document).on('click','.failure_attempt',function(){  
			var data='';
			attemptType = '&attemptType=failure';
			data=$(this).attr('data');
        	 if(data.indexOf(',') !== -1)
    		 {
    	       var arraySuccessAttempt = data.split(",");
    	         data = arraySuccessAttempt[0];
    	         globalsUserIDForUserSummaryReport = arraySuccessAttempt[1];
    	         global_app_Name   = arraySuccessAttempt[2];
    		}
        	 try{ $("#pageId_failure").val(''); $("#pageNum_failure").val(''); }catch(err){}
			failureAttempts_tab(data,false,false);
			 
		});
		
		$(document).on('click','.emergency_attempt',function(){  
			var data='';
			attemptType = '&attemptType=emergency';
			data=$(this).attr('data');
        	 if(data.indexOf(',') !== -1)
    		 {
    	       var arraySuccessAttempt = data.split(",");
    	       data = arraySuccessAttempt[0];
    	       globalsUserIDForUserSummaryReport = arraySuccessAttempt[1];
    	       global_app_Name   = arraySuccessAttempt[2];
    		}
        	//alert("data:   "+data);
        	 try{ $("#pageId_emergency").val(''); $("#pageNum_emergency").val(''); }catch(err){}
        	emergencyAttempts_tab(data,false,false);
        	 
		});
		
		$(document).on('click','.close_table',function(){  
			$(this).parent('div').hide(300);
			
		});
		
var globalUserSummaryReportSuccessPreviouspageSize="";
var globalUserSummaryReportSuccessPreviousPageNum="";	
var successAttemptsuserName='';
var successAttemptsapplication='';
var successAttemptsrequestTime='';
var successAttemptsuserStatus='';

	function successAttempts_tab(val,pagecall,isSearch){

			if($("#pageId_success").length)
			       {
				   globalUserSummaryReportSuccessPreviouspageSize=$("#pageId_success").val();
				   globalUserSummaryReportSuccessPreviousPageNum=$("#pageNum_success").val();
			        }

			user=val;
			
			var appName = document.getElementById("userSummaryApp").value;
			var domainName = document.getElementById("userSummaryDomain").value;
			
			 
			
			var myUrl="report_successAttempts.action?domainName="+domainName+"&userId="+val+"&appName="+global_app_Name+"&userLogonId="+encodeURIComponent(globalsUserIDForUserSummaryReport)+"&fromDate="+from_date+"&toDate="+to_date;
			var dataString="";
			if(pagecall)
			{
			var size=document.getElementById('pageId_success').value;
			var pageNumber=document.getElementById('pageNum_success').value;
			myUrl+= "&fetchSize="+size+"&pageNumber="+pageNumber;
			
			}
			$('#success_attempt_data').show();
			
			if(successAttemptsuserName!="" || successAttemptsapplication!="" || successAttemptsrequestTime!="" || successAttemptsuserStatus!="" ){
				isSearch=true;
			}
			
			if(isSearch){
				 successAttemptsuserName=document.getElementById('successAttemptsuserName').value;
					successAttemptsuserName = successAttemptsuserName.replace(/\s/g, "");
				 successAttemptsapplication=document.getElementById('successAttemptsapplication').value;
					successAttemptsapplication = successAttemptsapplication.replace(/\s/g, "");
				 successAttemptsrequestTime=document.getElementById('successAttemptsrequestTime').value;
				 	successAttemptsrequestTime = successAttemptsrequestTime.replace(/\s/g, "");
			    successAttemptsuserStatus=document.getElementById('successAttemptsuserStatus').value;
					successAttemptsuserStatus = successAttemptsuserStatus.replace(/\s/g, "");
				//myUrl+="&userName="+successAttemptsuserName+"&application="+successAttemptsapplication+"&requestTime="+successAttemptsrequestTime+"&userStatus="+successAttemptsuserStatus;
				dataString+="&userName="+successAttemptsuserName+"&application="+successAttemptsapplication+"&requestTime="+successAttemptsrequestTime+"&userStatus="+successAttemptsuserStatus;
				
				if(myUrl.indexOf('fetchSize')==-1) { 
					  if($.trim(globalUserSummaryReportSuccessPreviouspageSize)!='')
	           	       myUrl+="&fetchSize="+globalUserSummaryReportSuccessPreviouspageSize; 
	        	  }
			}
			 genUserSummaryReportAssFilter = "&"+myUrl.split("?")[1];
			 
			
			
			
			$('#success_attempt_data').html('<span>Loading...</span>');
			$.ajax({
				type: "POST",  
				url:myUrl,
				data: dataString,
				async: true,
				dataType: "text",
				success: function(data) {
				
					 if($.trim(data)=="sessionout"){
							
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
					var object = JSON.parse(data);
					var obj=JSON.parse(object.userSuccessAttemptsList);
					var obj1=JSON.parse(object.count);
					if(searchSuccessAttemptsWithpageSize) { 
						//obj1=associateCount;
						associateCount=obj1;
						searchCount = obj1;
					} else {
						associateCount=obj1;
						searchCount = obj1;
					}
					associateUserList=JSON.parse(object.userSuccessAttemptsList);
					var content = ' <span class="close_icon close_table"><a href="javascript:void(0);"><i class="icon-remove-sign"></i></a></span><h4>Associate User Report(Success Attempts)</h4>';
					content += '<div class="row-fluid">';
					content += '<div  class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_success" class="pageid_userAttempt" name="deassociationReasonListName" style="width:100%;">';
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
						/*content += '<select  id="pageNum_success"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_success" style="width:20%;background-color:white;"  onkeypress="return isNumber(event)" disabled/> of <span id="pageN_success"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
					content += '<table class="table table-striped table-bordered" id="sample_2">';
						content += '<thead>';
							content += '<tr>';
								content += '<th>Sr No.</th>';
								content += '<th>User Name</th>';
								content += '<th>Application</th>';
								content += '<th>Transaction Time</th>';
								content += '<th>status</th>';
							content += '</tr>';
	                        content += '<tr>';
							content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="successAttempts_tabSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummarySuccessReport(event)" id="successAttemptsuserName" /></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummarySuccessReport(event)" id="successAttemptsapplication" /></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummarySuccessReport(event)" id="successAttemptsrequestTime" /></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummarySuccessReport(event)" id="successAttemptsuserStatus" /></th>';
						    content += '</tr>';
							
						content += '</thead>';
						try{
							if(object.userSuccessAttemptsList!=null&&obj!=null&&obj!=''){
						jQuery.each(obj, function(i, v) {
						i = (i+1);
							content += "<tr>";
								content += "<td>"+i+"</td>";
								content += "<td>"+v.userLogonId+"</td>";
								content += "<td>"+v.appName+"</td>";
								content += "<td>"+v.transactionTime+"</td>";
								content += "<td>"+v.status+"</td>";
							content += "</tr>";
						});
						}
							else
								{
								content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";	
								}
						}
						catch(e)
						{
							//alert(e);
						}
						content += "</table>";
						
						if(associateUserList!=null&&associateUserList!='')
						{
							
						content+="<div class='expo_option'><div class='row-fluid' id='expo_opt1'><div class='span4'><h4>Export options:</h4></div>";
	                    content+="<div class='span8' >";
	                    content+="<form method='post' id='reportForm_associate'> ";
	                    content+="<ul>";
	                    content+="<li><a href='#' onClick='callCsvReport_Ass()' class='btn btn-primary'>CSV</a></li>";
	                    content+="<li><a href='#' onClick='callExcelReport_Ass()' class='btn btn-primary'>Excel</a></li>";
	                    content+="<li><a href='#' id='xml' data='xml' onClick='callXmlReport_Ass()' class='btn btn-primary'>XML</a></li>";
	                    content+="<li><a href='#' id='pdf' data='pdf' onClick='callPdfReport_Ass()' class='btn btn-primary'>PDF</a></li>";                              
	                    content+="</ul>";
	                    content+="</form>";
	                    content+="</div></div></div>";
					
						}
						 $('#success_attempt_data').html(content);
						// $("#successAttemptsrequestTime" ).datepicker({ dateFormat: "yy-mm-dd" }).val();
						 $("#successAttemptsrequestTime").datepicker({dateFormat: 'yy-mm-dd',  maxDate:'0' }).val();
				
						  if($.trim(globalUserSummaryReportSuccessPreviouspageSize) != '')
					      {  $("#pageId_success").val(globalUserSummaryReportSuccessPreviouspageSize);
					          fetchSize_userAttempts(searchUserSummaryReportForAll);
					          if(!searchSuccessAttemptsWithpageSize) { 
					        	  if($.trim(globalUserSummaryReportSuccessPreviousPageNum) != '')
					        		  $("#pageNum_success").val(globalUserSummaryReportSuccessPreviousPageNum);
					        	  else {
					        		  if(globalUserSummaryReportSuccessPreviousPageNum==0 && parseInt($('#pageN_success').text()) > 0)
					        			  globalUserSummaryReportSuccessPreviousPageNum="1";
					        		  $("#pageNum_success").val(globalUserSummaryReportSuccessPreviousPageNum);
					        	  }
					    	   }
					       }
					  	 $("#successAttemptsuserName").val(successAttemptsuserName);
						 $("#successAttemptsapplication").val(successAttemptsapplication);
						 $("#successAttemptsrequestTime").val(successAttemptsrequestTime);
						 $("#successAttemptsuserStatus").val(successAttemptsuserStatus);
						  
					  
						  if(pagecall==false){
							   var size=10;
							   if(globalUserSummaryReportSuccessPreviouspageSize!=''){
								   size=globalUserSummaryReportSuccessPreviouspageSize;
								   associateCount=searchCount;
							   }
							   if(successAttemptsuserName!="" || successAttemptsapplication!="" || successAttemptsrequestTime!="" || successAttemptsuserStatus!="" ){
								   associateCount=searchCount;
								}
							   if(associateCount==0){
								   associateCount=searchCount;
							   }
								var maxPgaeNumber = associateCount / size;
								var rem = associateCount % size;
								if (rem > 0) {
									maxPgaeNumber = maxPgaeNumber + 1;
								}
								$('#pageN_success').html(parseInt(maxPgaeNumber));
								if(associateCount == 0)
									$('#pageNum_success').val(0);
								else 
									$('#pageNum_success').val(1);
							}
						  
						  if(successAttemptsuserName=="" && successAttemptsapplication=="" && successAttemptsrequestTime=="" && successAttemptsuserStatus=="" ){
							  searchSuccessAttemptsWithpageSize=false;
						  }
						 
				}
			
			});
	
		}
		
		
var globalUserSummaryReportFailurePreviouspageSize="";
var globalUserSummaryReportFailurePreviousPageNum="";	

var failureAttemptsuserName="";
var failureAttemptsapplication="";
var failureAttemptsuserStatus="";
var failureAttemptsrequestTime="";
function failureAttempts_tab(val,pagecall,isSearch){

	
	   if($("#pageId_failure").length)
	       {
		       globalUserSummaryReportFailurePreviouspageSize=$("#pageId_failure").val();
		       globalUserSummaryReportFailurePreviousPageNum=$("#pageNum_failure").val();
	        }
		
	   		//var myUrl="admin_showLogsData.action?logsType=pushRestart"; // Saurabh
			user=val;
			var appName = document.getElementById("userSummaryApp").value;
			var domainName = document.getElementById("userSummaryDomain").value;
			 
			var myUrl="report_failureAttempts.action?domainName="+domainName+"&userId="+val+"&appName="+global_app_Name+"&userLogonId="+encodeURIComponent(globalsUserIDForUserSummaryReport)+"&fromDate="+from_date+"&toDate="+to_date;
			if(pagecall)
			{
			var size=document.getElementById('pageId_failure').value;
			var pageNumber=document.getElementById('pageNum_failure').value;
			myUrl+= "&fetchSize="+size+"&pageNumber="+pageNumber;
			
			}
			if(failureAttemptsuserName!="" || failureAttemptsapplication!="" || failureAttemptsrequestTime!="" || failureAttemptsuserStatus!=""){
				isSearch=true;
			}

		 	if(isSearch){
		 		 failureAttemptsuserName=document.getElementById('failureAttemptsuserName').value;
				 failureAttemptsapplication=document.getElementById('failureAttemptsapplication').value;
				 failureAttemptsrequestTime=document.getElementById('failureAttemptsrequestTime').value;
				 failureAttemptsuserStatus=document.getElementById('failureAttemptsuserStatus').value;
				myUrl+="&userName="+failureAttemptsuserName+"&application="+failureAttemptsapplication+"&requestTime="+failureAttemptsrequestTime+"&userStatus="+failureAttemptsuserStatus;
				  if(myUrl.indexOf('fetchSize')==-1) 
		        	     { if($.trim(globalUserSummaryReportFailurePreviouspageSize)!='')
		           	       myUrl+="&fetchSize="+globalUserSummaryReportFailurePreviouspageSize; 
		        	     }
               }
		 	
		 	genUserSummaryReportAssFilter = "&"+myUrl.split("?")[1];			
								  
			$('#success_attempt_data').show();
			$('#success_attempt_data').html('<span>Loading...</span>');
			$.ajax({
				type: "POST",  
				url:myUrl,
				data: "{}",
				//async: true,
				dataType: "text",
				success: function(data) {
					 if($.trim(data)=="sessionout"){
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
					  }
					var object = JSON.parse(data);
					var obj=JSON.parse(object.userFailureAttemptsList);
					var obj1=JSON.parse(object.count);
					if(searchFailureAttemptsWithpageSize) { 
						//obj1=associateCount;
						associateCount=obj1;
						searchCount = obj1;
					} else {
						associateCount=obj1;
						searchCount = obj1;
					}
					
					associateUserList=JSON.parse(object.userFailureAttemptsList);
					
					var content = ' <span class="close_icon close_table"><a href="javascript:void(0);"><i class="icon-remove-sign"></i></a></span><h4>Associate User Report(Failure Attempts)</h4>';
					content += '<div class="row-fluid">';
					content += '<div  class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_failure" class="pageid_userAttempt"  name="deassociationReasonListName" style="width:100%;">';
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
						content += '<option value="5000">5000</option>';
						//content += '<option value="10000">10000</option>';
						// end code for bug id no #320 , added by abhimanyu
						
						content += '</select>';
			
						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;" >';
						content += '<label>Page Number</label>';
						/*content += '<select id="pageNum_failure"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_failure" style="width:20%;background-color:white;"     onkeypress="return isNumber(event)" disabled/> of <span id="pageN_failure"></span>';
					content += '</div>';
					content += '</div>';
				content += '</div>';	
					content += '<table class="table table-striped table-bordered" id="sample_2">';
						content += '<thead>';
							content += '<tr>';
								content += '<th>Sr No.</th>';
								content += '<th>User Name</th>';
								content += '<th>Application</th>';
								content += '<th>Transaction Time</th>';
								content += '<th>status</th>';
							content += '</tr>';
 	                        content += '<tr>';
							content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="failureAttempts_tabSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummaryFailureReport(event)" id="failureAttemptsuserName" /></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummaryFailureReport(event)" id="failureAttemptsapplication" /></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummaryFailureReport(event)" id="failureAttemptsrequestTime" /></th>';
							content += '<th><input type="text"  onkeydown="searchUsersummaryFailureReport(event)" id="failureAttemptsuserStatus" /></th>';
						    content += '</tr>';
						    content += '</thead>';
						try{
							//alert("shyam");
							if(object.userFailureAttemptsList!=null&&obj!=null&&obj!=''){
						jQuery.each(obj, function(i, v) {
						i = (i+1);
							content += "<tr>";
								content += "<td>"+i+"</td>";
								content += "<td>"+v.userLogonId+"</td>";
								content += "<td>"+v.appName+"</td>";
								content += "<td>"+v.transactionTime+"</td>";
								content += "<td>"+v.status+"</td>";
							content += "</tr>";
						});
						}
							else
								{
								content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";	
								}
						}
						catch(e)
						{
							//alert(e);
						}
						content += "</table>";
						
						if(associateUserList!=null&&associateUserList!='')
						{
						content+="<div class='expo_option'><div class='row-fluid' id='expo_opt1'><div class='span4'><h4>Export options:</h4></div>";
	                    content+="<div class='span8' >";
	                    content+="<form method='post' id='reportForm_associate'> ";
	                    content+="<ul>";
	                    content+="<li><a href='#' onClick='callCsvReport_Ass()' class='btn btn-primary'>CSV</a></li>";
	                    content+="<li><a href='#' onClick='callExcelReport_Ass()' class='btn btn-primary'>Excel</a></li>";
	                    content+="<li><a href='#' id='xml' data='xml' onClick='callXmlReport_Ass()' class='btn btn-primary'>XML</a></li>";
	                    content+="<li><a href='#' id='pdf' data='pdf' onClick='callPdfReport_Ass()' class='btn btn-primary'>PDF</a></li>";                              
	                    content+="</ul>";
	                    content+="</form>";
	                    content+="</div></div></div>";
						
						// $('#expo_opt1').html(content1);
						}
						$('#success_attempt_data').html(content);
						//$("#failureAttemptsrequestTime" ).datepicker({ dateFormat: "yy-mm-dd" }).val();
						$("#failureAttemptsrequestTime").datepicker({dateFormat: 'dd/mm/yy',  maxDate:'0' }).val();
						/*else
							{
							 $('#expo_opt1').html('');
							}*/
		 
						  if($.trim(globalUserSummaryReportFailurePreviouspageSize) != '')
					      {  $("#pageId_failure").val(globalUserSummaryReportFailurePreviouspageSize);
					          fetchSize_userAttempts(searchUserSummaryReportForAll);
					          if(!searchFailureAttemptsWithpageSize) {   
					        	  if($.trim(globalUserSummaryReportFailurePreviousPageNum) != '')
					        		  $("#pageNum_failure").val(globalUserSummaryReportFailurePreviousPageNum);
					        	  else{
					        		  if(globalUserSummaryReportFailurePreviousPageNum==0 && parseInt($("#pageN_failure").text())>0)
					        			  globalUserSummaryReportFailurePreviousPageNum="1";
					        		  $("#pageNum_failure").val(globalUserSummaryReportFailurePreviousPageNum);
					        	  }
					          }
					       }
						  
					     $("#failureAttemptsuserName").val(failureAttemptsuserName);
						 $("#failureAttemptsapplication").val(failureAttemptsapplication);
						 $("#failureAttemptsrequestTime").val(failureAttemptsrequestTime);
						 $("#failureAttemptsuserStatus").val(failureAttemptsuserStatus);
					  
					 
						 if(pagecall==false){
							 var size=10;
							  if(globalUserSummaryReportFailurePreviouspageSize!=''){
								   size=globalUserSummaryReportFailurePreviouspageSize;
								   associateCount=searchCount;
							   }
							  if(failureAttemptsuserName!="" || failureAttemptsapplication!="" || failureAttemptsrequestTime!="" || failureAttemptsuserStatus!=""){
								  associateCount=searchCount;
							   }
							  
							   if(associateCount==0){
								   associateCount=searchCount;
							   }
							 
								var maxPgaeNumber = associateCount / size;
								var rem = associateCount % size;
								if (rem > 0) {
									maxPgaeNumber = maxPgaeNumber + 1;
								}
								$('#pageN_failure').html(parseInt(maxPgaeNumber));
								if(associateCount == 0)
									$('#pageNum_failure').val(0);
								else 
									$('#pageNum_failure').val(1);
						  }
						 
						 if(failureAttemptsuserName!="" || failureAttemptsapplication!="" || failureAttemptsrequestTime!="" || failureAttemptsuserStatus!=""){
							 searchFailureAttemptsWithpageSize=false;
						  }
					
				}
			
			});
	
		}
		
var globalUserSummaryReportEmergencyAttemptsPreviouspageSize="";
var globalUserSummaryReportEmergencyAttemptsPreviousPageNum="";

var emergencyAttemptsuserName="";
var emergencyAttemptsapplication="";
var emergencyAttemptsrequestTime="";
var emergencyAttemptsuserStatus="";

function emergencyAttempts_tab(val,pagecall,isSearch){
	
	
// start code for Bug #122 	 , added by Abhimanyu
	   if($("#pageId_emergency").length)
	       {
		    globalUserSummaryReportEmergencyAttemptsPreviouspageSize=$("#pageId_emergency").val();
		    globalUserSummaryReportEmergencyAttemptsPreviousPageNum=$("#pageNum_emergency").val();
	        }
//end code for Bug #122 	
	// alert("val=="+val);
	user=val;
	var appName = document.getElementById("userSummaryApp").value;
	var domainName = document.getElementById("userSummaryDomain").value;
	 
	var myUrl="report_emergencyAttempts.action?domainName="+domainName+"&userId="+val+"&appName="+global_app_Name+"&userLogonId="+encodeURIComponent(globalsUserIDForUserSummaryReport)+"&fromDate="+from_date+"&toDate="+to_date;
	//alert("domainName=="+domainName)
	if(pagecall)
	{
		//alert("in page call===");
	var size=document.getElementById('pageId_emergency').value;
	var pageNumber=document.getElementById('pageNum_emergency').value;
	myUrl+= "&fetchSize="+size+"&pageNumber="+pageNumber;
	
	}
	
	if(emergencyAttemptsuserName!="" || emergencyAttemptsapplication!="" || emergencyAttemptsrequestTime!="" || emergencyAttemptsuserStatus!=""){
		isSearch=true;
	}
	
 		if(isSearch){
				 emergencyAttemptsuserName=document.getElementById('emergencyAttemptsuserName').value;
				 emergencyAttemptsapplication=document.getElementById('emergencyAttemptsapplication').value;
				 emergencyAttemptsrequestTime=document.getElementById('emergencyAttemptsrequestTime').value;
				 emergencyAttemptsuserStatus=document.getElementById('emergencyAttemptsuserStatus').value;
				myUrl+="&userName="+emergencyAttemptsuserName+"&application="+emergencyAttemptsapplication+"&requestTime="+emergencyAttemptsrequestTime+"&userStatus="+emergencyAttemptsuserStatus;
				  if(myUrl.indexOf('fetchSize')==-1)
			    	     { if($.trim(globalUserSummaryReportEmergencyAttemptsPreviouspageSize)!='')
			       	       myUrl+="&fetchSize="+globalUserSummaryReportEmergencyAttemptsPreviouspageSize; 
			    	     }
 
 		}
 		 genUserSummaryReportAssFilter = "&"+myUrl.split("?")[1];
	
	   
	$('#success_attempt_data').show();
	$('#success_attempt_data').html('<span>Loading...</span>');
	$.ajax({
		type: "POST",  
		url:myUrl,
		data: "{}",
		async: true,
		dataType: "text",
		success: function(data) {
			 if($.trim(data)=="sessionout"){
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
			var object = JSON.parse(data);
			var obj=JSON.parse(object.userEmergencyAttemptsList);
			var obj1=JSON.parse(object.count);
 				
			if(searchEmergencyAttemptsWithpageSize) { 
				//obj1=associateCount;
				associateCount=obj1;
				searchCount = obj1;
			} else {
				associateCount=obj1;
				searchCount = obj1;
			}
			
			associateUserList=JSON.parse(object.userEmergencyAttemptsList);
		//	alert(associateUserList);
			///alert("object.userFailureAttemptsList====="+object.userEmergencyAttemptsList)
			var content = ' <span class="close_icon close_table"><a href="javascript:void(0);"><i class="icon-remove-sign"></i></a></span><h4>Associate User Report(Emergency Attempts)</h4>';
			content += '<div class="row-fluid">';
			content += '<div  class="span6">';
				content += '<div class="pull-left" id="switch_app">';
				content += '<label>Size</label>';
				content += '<select id="pageId_emergency" class="pageid_userAttempt"  name="deassociationReasonListName" style="width:100%;">';
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
				content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
				content += '<label>Page Number</label>';
				/*content += '<select  id="pageNum_emergency"  >';
				content += '<option value="">-select Page-</option>';
				content += '</select>';*/
				content += ' <input type="text" id="pageNum_emergency" style="width:20%;background-color:white;" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_emergency"></span>';
				content += '</div>';
				content += '</div>';
		content += '</div>';	
			content += '<table class="table table-striped table-bordered" id="sample_2">';
				content += '<thead>';
					content += '<tr>';
						content += '<th>Sr No.</th>';
						content += '<th>User Name</th>';
						content += '<th>Application</th>';
						content += '<th>Transaction Time</th>';
						content += '<th>status</th>';
					    content += '</tr>';
						content += '<tr>';
						content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="emergencyAttempts_tabSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text"  onkeydown="searchUsersummaryEmergencyReport(event)" id="emergencyAttemptsuserName" /></th>';
						content += '<th><input type="text"  onkeydown="searchUsersummaryEmergencyReport(event)" id="emergencyAttemptsapplication" /></th>';
						content += '<th><input type="text"  onkeydown="searchUsersummaryEmergencyReport(event)" id="emergencyAttemptsrequestTime" /></th>';
						content += '<th><input type="text"  onkeydown="searchUsersummaryEmergencyReport(event)" id="emergencyAttemptsuserStatus" /></th>';
						content += '</tr>';
						content += '</thead>';
				try{
					//alert("shyam");
					if(object.userEmergencyAttemptsList!=null&&obj!=null&&obj!=''){
				jQuery.each(obj, function(i, v) {
				i = (i+1);
					content += "<tr>";
						content += "<td>"+i+"</td>";
						content += "<td>"+v.userLogonId+"</td>";
						content += "<td>"+v.appName+"</td>";
						content += "<td>"+v.transactionTime+"</td>";
						content += "<td>"+v.status+"</td>";
					content += "</tr>";
				});
				}
					else
						{
						content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";	
						}
				}
				catch(e)
				{
					//alert(e);
				}
				content += "</table>";
				
				if(associateUserList!=null&&associateUserList!='')
					{
				content+="<div class='expo_option'><div class='row-fluid' id='expo_opt1'><div class='span4'><h4>Export options:</h4></div>";
                content+="<div class='span8' >";
                content+="<form method='post' id='reportForm_associate'> ";
                content+="<ul>";
                content+="<li><a href='#' onClick='callCsvReport_Ass()' class='btn btn-primary'>CSV</a></li>";
                content+="<li><a href='#' onClick='callExcelReport_Ass()' class='btn btn-primary'>Excel</a></li>";
                content+="<li><a href='#' id='xml' data='xml' onClick='callXmlReport_Ass()' class='btn btn-primary'>XML</a></li>";
                content+="<li><a href='#' id='pdf' data='pdf' onClick='callPdfReport_Ass()' class='btn btn-primary'>PDF</a></li>";                              
                content+="</ul>";
                content+="</form>";
                content+="</div>";
				
				// $('#expo_opt1').html(content1);
					}
				$('#success_attempt_data').html(content);
				//$("#emergencyAttemptsrequestTime" ).datepicker({ dateFormat: "yy-mm-dd" }).val();
				$("#emergencyAttemptsrequestTime").datepicker({dateFormat: 'yy-mm-dd',  maxDate:'0' }).val();
				/*else
					{
					$('#expo_opt1').html('');
					}*/
 // start code for Bug #122 	 , Added by Abhimanyu
				  if($.trim(globalUserSummaryReportEmergencyAttemptsPreviouspageSize) != '') {  
					  	$("#pageId_emergency").val(globalUserSummaryReportEmergencyAttemptsPreviouspageSize);
			          fetchSize_userAttempts(searchUserSummaryReportForAll);
			          if(!searchEmergencyAttemptsWithpageSize) {    
			        	  if($.trim(globalUserSummaryReportEmergencyAttemptsPreviousPageNum) != '')
			        		  $("#pageNum_emergency").val(globalUserSummaryReportEmergencyAttemptsPreviousPageNum);
			          } else {
			        	  if(globalUserSummaryReportEmergencyAttemptsPreviousPageNum==0 && parseInt($('#pageN_emergency').text())> 0)
			        		  globalUserSummaryReportEmergencyAttemptsPreviousPageNum="1";
			        	  $("#pageNum_emergency").val(globalUserSummaryReportEmergencyAttemptsPreviousPageNum);
			          }
			       }
				  
			     $("#emergencyAttemptsuserName").val(emergencyAttemptsuserName);
				 $("#emergencyAttemptsapplication").val(emergencyAttemptsapplication);
				 $("#emergencyAttemptsrequestTime").val(emergencyAttemptsrequestTime);
				 $("#emergencyAttemptsuserStatus").val(emergencyAttemptsuserStatus);
							
				  if(pagecall==false){
					  	var size=10;
					  	if(globalUserSummaryReportEmergencyAttemptsPreviouspageSize!=''){
							   size=globalUserSummaryReportEmergencyAttemptsPreviouspageSize;
							   associateCount=searchCount;
						 }
					  	
					  	if(emergencyAttemptsuserName!="" || emergencyAttemptsapplication!="" || emergencyAttemptsrequestTime!="" || emergencyAttemptsuserStatus!=""){
					  		associateCount=searchCount;
						 }
						 if(associateCount==0){
							   associateCount=searchCount;
						  }
						var maxPgaeNumber = associateCount / size;
						var rem = associateCount % size;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						$('#pageN_emergency').html(parseInt(maxPgaeNumber));
						if(associateCount == 0)
							$('#pageNum_emergency').val(0);
						else 
							$('#pageNum_emergency').val(1);
					}
				  
					if(emergencyAttemptsuserName=="" && emergencyAttemptsapplication=="" && emergencyAttemptsrequestTime=="" && emergencyAttemptsuserStatus==""){
						searchEmergencyAttemptsWithpageSize=false;
					 }
				  
//end code for Bug #122	
				
		}
	
	});

}

function callPdfReport_Ass()
{	
	if(validatePDFCount()){
	globalReportType = "pdf";
	if(globalShowPopupWindow)
		  $('#myModal12').modal('show')  
		else{
		 $('#myModal12').modal('hide')
	var reportType="pdf";
	var url="reportgen_associateUserReport?reportType="+reportType+"&fileName=associate_user_report.pdf&reportColumns="+globalArrayUserSummaryColumn+genUserSummaryReportAssFilter+attemptType;
	$('#reportForm_associate').attr("action",url);
	$('#reportForm_associate').submit();
	globalShowPopupWindow=true;
	resetAllCheckboxAssociate();
		}
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
	


}

function callXmlReport_Ass()
{
	if(validateXMLCount()) {
	globalReportType = "xml";
	if(globalShowPopupWindow)
		  $('#myModal12').modal('show')  
		else{
		 $('#myModal12').modal('hide')
	var reportType="xml";
	var url="reportgen_associateUserReport?reportType="+reportType+"&fileName=associate_user_report.xml&reportColumns="+globalArrayUserSummaryColumn+genUserSummaryReportAssFilter+attemptType;
	$('#reportForm_associate').attr("action",url);
	$('#reportForm_associate').submit();
	globalShowPopupWindow=true;
	resetAllCheckboxAssociate();
		}
	} else {
		 alert('Your data is more than 100000. Please download the report in CSV Format!');
	}
}

function callExcelReport_Ass()
{
	if(validateExcelCount()){
	globalReportType = "excel";
	
	if(globalShowPopupWindow)
		  $('#myModal12').modal('show')  
		else{
		 $('#myModal12').modal('hide')
	var reportType="excel";
	var url="reportgen_associateUserReport?reportType="+reportType+"&fileName=associate_user_report.xlsx&reportColumns="+globalArrayUserSummaryColumn+genUserSummaryReportAssFilter+attemptType;
	$('#reportForm_associate').attr("action",url);
	$('#reportForm_associate').submit();
	globalShowPopupWindow=true;
	resetAllCheckboxAssociate();
		}
	} else {
		alert('Your data is more than 500000. Please download the report in CSV Format!');
	}
}

function callCsvReport_Ass()
{
	globalReportType = "csv";
	
	if(globalShowPopupWindow)
		  $('#myModal12').modal('show')  
		else{
		 $('#myModal12').modal('hide')
	var reportType="csv";
	var url="reportgen_associateUserReport?reportType="+reportType+"&fileName=associate_user_report.csv&reportColumns="+globalArrayUserSummaryColumn+genUserSummaryReportAssFilter+attemptType;
	$('#reportForm_associate').attr("action",url);
	$('#reportForm_associate').submit();
	globalShowPopupWindow=true;
	resetAllCheckboxAssociate();
		}
}



function callPdfReport()
{    
	if(validatePDFCount()){
	globalReportType = "pdf";
	
	if(globalShowPopupWindow)
		  $('#myModal1').modal('show')  
		else{
		 $('#myModal1').modal('hide')
	var reportType="pdf";
	var url="reportgen_summeryReport?reportType="+reportType+"&fileName=user_summary_report.pdf&reportColumns="+globalArrayUserSummaryColumn;
	$('#user_name').val(searchUserLogonId);
    $('#auth_type').val(authtype);
    $('#app_search').val(appSearch);
    $('#creation_date').val(creationDate);
    $('#login_time').val(loginTime);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	 resetAllCheckbox();
		}
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
}


function callXmlReport()
{
	if(validateXMLCount()) {
	globalReportType = "xml";
	if(globalShowPopupWindow)
		  $('#myModal1').modal('show')  
		else{
		 $('#myModal1').modal('hide')
	var reportType="xml";
	var url="reportgen_summeryReport?reportType="+reportType+"&fileName=user_summary_report.xml&reportColumns="+globalArrayUserSummaryColumn;
	$('#user_name').val(searchUserLogonId);
    $('#auth_type').val(authtype);
    $('#app_search').val(appSearch);
    $('#creation_date').val(creationDate);
    $('#login_time').val(loginTime);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	 resetAllCheckbox();
		}
	} else {
		  alert('Your data is more than 100000. Please download the report in CSV Format!');
	  }
}

function callExcelReport()
{   
	if(validateExcelCount()){
	globalReportType = "excel";
	
if(globalShowPopupWindow)
	  $('#myModal1').modal('show')  
	else{
	 $('#myModal1').modal('hide')
	var reportType="excel";
	var url="reportgen_summeryReport?reportType="+reportType+"&fileName=user_summary_report.xlsx&reportColumns="+globalArrayUserSummaryColumn;
	$('#user_name').val(searchUserLogonId);
    $('#auth_type').val(authtype);
    $('#app_search').val(appSearch);
    $('#creation_date').val(creationDate);
    $('#login_time').val(loginTime);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	 resetAllCheckbox();
	}
  } else {
		alert('Your data is more than 500000. Please download the report in CSV Format!');
	}
}

function callCsvReport()
{      globalReportType = "csv";
	
  if(globalShowPopupWindow)
	  $('#myModal1').modal('show')  
	else{
	 $('#myModal1').modal('hide')
	var reportType="csv";
	var url="reportgen_summeryReport?reportType="+reportType+"&fileName=user_summary_report.csv&reportColumns="+globalArrayUserSummaryColumn;
	$('#user_name').val(searchUserLogonId);
    $('#auth_type').val(authtype);
    $('#app_search').val(appSearch);
    $('#creation_date').val(creationDate);
    $('#login_time').val(loginTime);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	 resetAllCheckbox();
	}
}


function validateExcelCount(){
	if(searchCount > 500000){
		return false;
	}
	return true;
}
function validatePDFCount(){
	if(searchCount > 200000){
		return false;
	}
	return true;
}
function validateXMLCount(){
	if(searchCount > 100000){
		return false;
	}
	return true;
}


function getPageData_userAttempts(e) {
	var myid = $(e.target).attr("id");
	
	var pageNumber = document.getElementById(myid).value;
	if ($.trim(pageNumber) != "") {
		if (myid == "pageNum_success" || myid == "pageId_success") {
			var totalPages =  $('#pageN_success').text();
			var pageNo = document.getElementById('pageNum_success').value;
				if ($.trim(pageNo) != "" && parseInt(pageNo) <= parseInt(totalPages))
					successAttempts_tab(user, true, false);
				else
					alert('Page should be less than or equal to page number.');
		} else if (myid == "pageNum_failure" || myid == "pageId_failure") {
				var totalPages =  $('#pageN_failure').text();
				var pageNo = document.getElementById('pageNum_failure').value;
				if ($.trim(pageNo) != "" && parseInt(pageNo) <= parseInt(totalPages))
					failureAttempts_tab(user, true, false);
				else 
					alert('Page should be less than or equal to page number.');
					
		} else if (myid == "pageNum_emergency" || myid == "pageId_emergency" ) {
			var totalPages =  $('#pageN_emergency').text();
			var pageNo = document.getElementById('pageNum_emergency').value;
			if ($.trim(pageNo) != "" && parseInt(pageNo) <= parseInt(totalPages))
				emergencyAttempts_tab(user, true, false);
			else 
				alert('Page should be less than or equal to page number.');
		}
	}
}

$(document).on('change','#pageNum_success',function(e){
	getPageData_userAttempts(e);
});

$(document).on('change','#pageNum_failure',function(e){
	getPageData_userAttempts(e);
});

$(document).on('change','#pageNum_emergency',function(e){
	getPageData_userAttempts(e);
});


$(document).on('change','#pageId_success',function(e){
	fetchSize_userAttempts(e);
	getPageData_userAttempts(e);
});

$(document).on('change','#pageId_failure',function(e){
	fetchSize_userAttempts(e);
	getPageData_userAttempts(e);
});

$(document).on('change','#pageId_emergency',function(e){
	fetchSize_userAttempts(e);
	getPageData_userAttempts(e);
});

var searchUserSummaryReportForAll="";

function fetchSize_userAttempts(e) {
	try {
		// alert(e);
		searchUserSummaryReportForAll = e;
		var myid = $(e.target).attr("id");
		// start code for Bug #122 ,added by Abhimanyu
		var strSelectID = "";
		if (myid == "pageId_success")
			strSelectID = "pageNum_success";
		else if (myid == "pageId_failure")
			strSelectID = "pageNum_failure";
		else if (myid == "pageId_emergency")
			strSelectID = "pageNum_emergency";

		var size = $(e.target).val();

		if ($.trim(size) != '') {
			// alert(size);

			var maxSize = associateCount;

			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			var page;
			if (myid == "pageId_success") {
				
				
				if(associateCount==0){
					$('#pageNum_success').val(0);
				} else{
					$('#pageNum_success').val(1);
					$('#pageNum_success').attr("disabled",false);
				}
				$('#pageN_success').html(parseInt(maxPgaeNumber));
				
				//document.getElementById('pageNum_success').options.length = 1;
				//page = document.getElementById('pageNum_success');
				
			} else if (myid == "pageId_failure") {
				//document.getElementById('pageNum_failure').options.length = 1;
				//page = document.getElementById('pageNum_failure');
				
				if(associateCount==0){
					$('#pageNum_failure').val(0);
				} else{
					$('#pageNum_failure').val(1);
					$('#pageNum_failure').attr("disabled",false);
				} 
				$('#pageN_failure').html(parseInt(maxPgaeNumber));

			} else if (myid == "pageId_emergency") {
				//document.getElementById('pageNum_emergency').options.length = 1;
				//page = document.getElementById('pageNum_emergency');
				if(associateCount==0){
					$('#pageNum_emergency').val(0);
				} else{
					$('#pageNum_emergency').val(1);
					$('#pageNum_emergency').attr("disabled",false);
				} 
				$('#pageN_emergency').html(parseInt(maxPgaeNumber));
				
			}

			/*var pageOpt = page.options;

			for (var i = 1; i <= maxPgaeNumber; i++) {

				pageOpt[pageOpt.length] = new Option(i, i);
			}*/
		} else {
			if ($.trim(strSelectID) != '')
				/*document.getElementById(strSelectID).options.length = 1;*/
				document.getElementById(strSelectID).value = 1;
		}

		// end code for Bug #122 ,added by Abhimanyu

	} catch (e) {
		alert(e)
		// TODO: handle exception
	}

}


function successAttempts_tabSearch()
	{
	 searchSuccessAttemptsWithpageSize=true;
	successAttempts_tab(user,false,true);
	}
 
function failureAttempts_tabSearch()
{
	 searchFailureAttemptsWithpageSize=true;
	failureAttempts_tab(user,false,true);
}

function emergencyAttempts_tabSearch()
{
	 searchEmergencyAttemptsWithpageSize=true;
	emergencyAttempts_tab(user,false,true);
}

function exportUserSummaryReport()
{
//alert("exportUserSummaryReport");	
var arrayUserSummaryColumn = $.map($('input[name="usersummaryreportcolumn"]:checked'), function(c){return c.value; })
if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "")
	{
	alert("please select at least one column for Export. ");
	}
else
	{
	globalArrayUserSummaryColumn = arrayUserSummaryColumn; 
	globalShowPopupWindow=false;
	
	if(globalReportType ==  "pdf")
		 callPdfReport();
	else if(globalReportType ==  "xml")
		callXmlReport();
	else if(globalReportType ==  "excel")
		 callExcelReport();
	else if(globalReportType ==  "csv")
		 callCsvReport();
	
	 
	}
	
//alert("arrayUserSummaryColumn = "+arrayUserSummaryColumn);


}



function exportUserSummaryReport_Ass()
{
//alert("exportUserSummaryReport");	
var arrayUserSummaryColumn = $.map($('input[name="usersummaryreportcolumn_Ass"]:checked'), function(c){return c.value; })
if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "")
	{
	alert("please select at least one column for Export. ");
	}
else
	{
	globalArrayUserSummaryColumn = arrayUserSummaryColumn; 
	globalShowPopupWindow=false;
	
	if(globalReportType ==  "pdf")
		 callPdfReport_Ass();
	else if(globalReportType ==  "xml")
		callXmlReport_Ass();
	else if(globalReportType ==  "excel")
		 callExcelReport_Ass();
	else if(globalReportType ==  "csv")
		 callCsvReport_Ass();
	
	 
	}
	
//alert("arrayUserSummaryColumn = "+arrayUserSummaryColumn);


}


function getAddDaysToCurrentDate()
{
	var d = new Date();
	d.setDate(d.getDate() - 7);
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
	return output;

}


function getCurrentDate()
{
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();
	var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
	return output;
}

function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
	}

function getUserSummaryDatewise()
{  
	$('#success_attempt_data').html('');
	from_date=$("#from_date").val();
    to_date=$("#to_date").val();
    var domain = $('#userSummaryDomain').val();
    if($.trim(domain) == "select" ){
		alert("Please select domain");
		return;
	}
    
    if(from_date==""||from_date==undefined||from_date==null){
		 alert("Please select start time stamp");
		 return;
	 }
	
	if(to_date==""||to_date==undefined||to_date==null){
		 alert("Please select end time stamp");
		 return;
	 }
	
	 if(process(from_date) > process(to_date)){
		 alert("To timestamp can not be same or less than the from timestamp");
		 return;
  }
    
    global_from_date = from_date;
    global_to_date = to_date;
    openUserSummary(false,false);
	 
 }


function searchUsersummaryReport(e)
{  
	 if (e.keyCode === 13)   
		search_data();
}

function searchUsersummarySuccessReport(e)
{  
	 if (e.keyCode === 13)   
		successAttempts_tabSearch();
}

function searchUsersummaryFailureReport(e)
{  
	 if (e.keyCode === 13)   
		failureAttempts_tabSearch();
}

function searchUsersummaryEmergencyReport(e)
{  
	 if (e.keyCode === 13)   
		emergencyAttempts_tabSearch();
}

function validateUserSummarySearch(){
	var userLogonId = $('#userLogonId').val();
	 if(userLogonId != undefined && userLogonId!= ""){
		 userLogonId = userLogonId.replace(/\s/g, " ");
			var user = userLogonId.split(',');
			var len  = user.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#userLogonId').val("");
				return false;
			}
	 }
	 var appName = $('#appName').val();
	 if(appName != undefined && appName!= ""){
		 appName = appName.replace(/\s/g, " ");
			var app = appName.split(',');
			var len  = app.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#appName').val("");
				return false;
			}
	 }
	return true;
}