
var searchCount;
var userSelfEnrollmentLogsCount;
var userSelfEnrollmentLogsList;
var userSelfEnrollmentLogsReport;
var globalShowPopupWindowSelfEnrollment = true;
var globalArrayUserSummaryColumnSelfEnrollment = '';
var globalReportTypeSelfEnrollment='';
var globalPersistUserSystemReportDomainValue='';
var from_date_enrollment = getAddDaysToCurrentDate();
var to_date_enrollment = getCurrentDate();
var global_from_date_enrollment = '';
var global_to_date_enrollment = '';
var generateUserSelfEnrollmentLogsReportFilter = '';

function getPageDataUserSelfEnrollmentLogsReport(){
 	var userSelfEnrollmentLogsSize = document.getElementById('pageIdUserSelfEnrollmentLogsReport').value;
 	if($.trim(userSelfEnrollmentLogsSize) != ''){
 	var pageNumberUserSelfEnrollmentLogs = document.getElementById('pageNumUserSelfEnrollmentLogsReport').value;
 	if(pageNumberUserSelfEnrollmentLogs=="" || (pageNumberUserSelfEnrollmentLogs=="0" && parseInt(totalPages) > 0 )){ $('#pageNumUserSelfEnrollmentLogsReport').val(1);}
 	var systemDomain =document.getElementById("userEnrollmentDomain").value;
	var totalPages = $('#pageNUserSelfEnrollmentLogsReport').text();
	if ($.trim(pageNumberUserSelfEnrollmentLogs) != ""
		&& parseInt(pageNumberUserSelfEnrollmentLogs) <= parseInt(totalPages)){
		openUserSelfEnrollmentLogsReport(true,false,domain);
	} else 
		alert('Page should be less than or equal to page number.');
	}
		
}


function fetchSizeUserSelfEnrollmentLogsReport(){
	var userSelfEnrollmentLogsSize = document.getElementById('pageIdUserSelfEnrollmentLogsReport').value;

	if($.trim(userSelfEnrollmentLogsSize) != ''){
		var userSelfEnrollmentLogsMaxSize = userSelfEnrollmentLogsCount;
		var useSelfEnrollmentLogsMaxPageNumber = userSelfEnrollmentLogsMaxSize/userSelfEnrollmentLogsSize;
		var remainderSize = userSelfEnrollmentLogsMaxSize%userSelfEnrollmentLogsSize;
		if(remainderSize > 0){
			useSelfEnrollmentLogsMaxPageNumber = useSelfEnrollmentLogsMaxPageNumber+1;
		}
		if (userSelfEnrollmentLogsCount == 0) {
			$('#pageNumUserSelfEnrollmentLogsReport').val(0);
		} else {
			$('#pageNumUserSelfEnrollmentLogsReport').attr("disabled", false);
			$('#pageNumUserSelfEnrollmentLogsReport').val(1);
		}
		$('#pageNUserSelfEnrollmentLogsReport').html(parseInt(useSelfEnrollmentLogsMaxPageNumber));
		
	}
}

var globalUserSelfEnrollmentLogsReportPreviouspageSize="";
var globalUserSelfEnrollmentLogsReportPreviousPageNum="";
var searchUserSelfEnrollmentLogsReportWithpageSize=false;

var selfUserLogonId="";
var appName="";
var activity="";
var activityTime="";
var manager = "";
function openUserSelfEnrollmentLogsReport(pageCall,pageSearch,domain) {

	try{
		
	   if($("#pageIdUserSelfEnrollmentLogsReport").length) {
		   globalUserSelfEnrollmentLogsReportPreviouspageSize=$("#pageIdUserSelfEnrollmentLogsReport").val();
		   globalUserSelfEnrollmentLogsReportPreviousPageNum=$("#pageNumUserSelfEnrollmentLogsReport").val();
	    }
	
	  
	   if(from_date_enrollment.indexOf('/')!=-1){
		   from_date_enrollment=from_date_enrollment.split("/")[2]+"-"+from_date_enrollment.split("/")[1]+"-"+from_date_enrollment.split("/")[0]+" 00:00:00";
		   to_date_enrollment=to_date_enrollment.split("/")[2]+"-"+to_date_enrollment.split("/")[1]+"-"+to_date_enrollment.split("/")[0]+" 23:59:59";
		}
	 
	     
	var myEnrollmentUrl="report_userSelfEnrollmentLogsReport.action?fromDate="+from_date_enrollment+"&toDate="+to_date_enrollment+"&domain="+domain;
	var dataString="";
	
	 if(pageCall){
		  var pageUserSystemNumber = document.getElementById("pageNumUserSelfEnrollmentLogsReport").value;
		  var fetchUserSystemSize=document.getElementById("pageIdUserSelfEnrollmentLogsReport").value;
		  myEnrollmentUrl+="&fetchSize="+fetchUserSystemSize+"&pageNumber="+pageUserSystemNumber;
	  }
	
	 if(selfUserLogonId!="" || appName!="" || activity != "" || activityTime!="" || manager!=""){
		 pageSearch=true;
	  }
	 
	if(pageSearch){
		  selfUserLogonId=$('#selfUserLogonId').val();
		  appName=$('#appName').val();
		  activity=$('#activity').val();
		  activityTime=$('#activityTime').val();
		  manager = $('#manager').val();
		 //myEnrollmentUrl+="&userLogonId="+userLogonId+"&appName="+appName+"&activity="+activity+"&activityTime="+activityTime+"&manager="+manager;
		 dataString+="&userLogonId="+selfUserLogonId+"&appName="+appName+"&activity="+activity+"&activityTime="+activityTime+"&manager="+manager;
		
	}

   if(searchUserSelfEnrollmentLogsReportWithpageSize){  
	     if(myEnrollmentUrl.indexOf('fetchSize')==-1){
	    	 if($.trim(globalUserSelfEnrollmentLogsReportPreviouspageSize)!='')
	    		 myEnrollmentUrl+="&fetchSize="+globalUserSelfEnrollmentLogsReportPreviouspageSize; 
		  }
    }
   //alert('Url ' + myEnrollmentUrl);
   generateUserSelfEnrollmentLogsReportFilter = "&"+myEnrollmentUrl.split("?")[1];
	
   $('#user_self_enrollment_logs_report_data').html('<span>Loading...</span>');
	$.ajax({
		type:"POST",
		url:myEnrollmentUrl,
		data:dataString,
		dataType:"text",
		success:function(data){
			
		 if($.trim(data)=="sessionout"){
				alert(data);
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
		 		var obj=JSON.parse(data);
				var obj1=JSON.parse(obj.userSelfEnrollmentLogsReport);
				var obj2=JSON.parse(obj.userSelfEnrollmentLogsCount);
				var obj3=JSON.parse(obj.domainList);
				userSelfEnrollmentLogsList=JSON.parse(obj.userSelfEnrollmentLogsReport);
				if(searchUserSelfEnrollmentLogsReportWithpageSize){
					searchCount = obj2;
					userSelfEnrollmentLogsCount=obj2;
					//obj2=userSelfEnrollmentLogsCount;
				} else {
					userSelfEnrollmentLogsCount=obj2;
					searchCount = obj2;
				}
		   		
				var content = '<h4></h4><div class="space15"></div>';
				content += '<div class="row-fluid">';
				content += '<div class="span3">';
				content += '<label>Domain : </label>';
				content += '<select id="userEnrollmentDomain" name="userEnrollmentDomain">';
				content += '<option value="">Select Domain</option>';
				jQuery.each(obj3, function(i, v) {
				var tempDomainList=obj3[i];
				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
				});
				content += '</select>';
				content += '</div>';
				content += '<div class="row-fluid">';
				content += '<div class="span3 offset0">';
				content += '<label>From : </label>';
				content += '<input type="text" name="from_date_enrollment" id="from_date_enrollment" readonly style="cursor:pointer;"/>'; 
				content += '</div>';

				content += '<div class="span3 offset0">';
				content += '<label>To : </label>';
				content += '<input type="text" name="to_date_enrollment" id="to_date_enrollment" readonly style="cursor:pointer;"/>'; 
				content += '</div>';
				
				content += '<div class="span3 offset0">';
				content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date_enrollment" onClick="getUserSelfEnrollmentLogsReportDatewise()" />';
				content += '</div>';
				content += '<div class="clear"></div>';
				content += '</div>';
				content += '<div class="space15"></div>';
			  
				content += '<div class="row-fluid">';
				content += '<div  class="span6">';
				content += '<div class="pull-left" id="switch_app">';
				content += '<label>Size</label>';
				content += '<select id="pageIdUserSelfEnrollmentLogsReport" onChange="fetchSizeUserSelfEnrollmentLogsReport(),getPageDataUserSelfEnrollmentLogsReport();" style="width:100%;" name="pageIdUserSelfEnrollmentLogsReport">';
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
				/*content += '<select onChange="getPageDataUserSelfEnrollmentLogsReport()" id="pageNumUserSelfEnrollmentLogsReport"  >';
				content += '<option value="">Select Page</option>';
				content += '</select>';*/
				content += ' <input type="text" id="pageNumUserSelfEnrollmentLogsReport" style="width:20%;background-color:white;" onChange="getPageDataUserSelfEnrollmentLogsReport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageNUserSelfEnrollmentLogsReport"></span>';
				content += '</div>';
				content += '</div>';
				content += '</div>';
				content += '<table class="table table-striped table-bordered" id="sample_enrollment_report">';
				content += '<thead>';
				content += '<tr>';
				content += '<th>Sr.No.</th>';
				content += '<th>User LogonId</th>';
				content += '<th>App</th>';
				content += '<th>Activity</th>';
				content += '<th>Activity Time</th>';
				content += '<th>Manager</th>';
				content += '</tr>';
				content += '</thead>';
				content +='<tr>';
				content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="searchUserSelfEnrollmentData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp; &nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
				content += '<th><input type="text" onkeydown="searchUserSelfEnrollmentDataReport(event)"  name="userLogonId" id="selfUserLogonId" ></th>';
				content += '<th><input type="text" onkeydown="searchUserSelfEnrollmentDataReport(event)" name="appName" id="appName" ></th>';
				content += '<th><input type="text" onkeydown="searchUserSelfEnrollmentDataReport(event)" name="activity" id="activity" ></th>';
				content += '<th><input type="text" onkeydown="searchUserSelfEnrollmentDataReport(event)" name="activityTime" id="activityTime" ></th>';
				content += '<th><input type="text" onkeydown="searchUserSelfEnrollmentDataReport(event)" name="manager" id="manager" ></th>';
				content+='</tr>';
				if (obj1 != null && obj1 != '') {
					jQuery.each(obj1,
							function(ind, val) {
								
								i=ind+1;
								content += "<tr>";
								content += "<td>"
										+ i + "</td>";
							
								content += "<td>" + val.userLogonId+"</td>";
								content += "<td>" + val.appName+"</td>";
								content += "<td>" + val.activity+"</td>";
								content += "<td>" + val.activityTime+"</td>";
								var manager = "";
								if(val.managerName==undefined|| val.managerName==null){
									manager="N/A";
								}
								else{
									manager	= val.managerName;
								}
								content += "<td>"+manager+"</td>";
								content += "</tr>";
							
							});

				} else {
					content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";
				}
				content += "</table>";
			//	alert(content);
				$('#user_self_enrollment_logs_report_data').html(content);
				if(userSelfEnrollmentLogsList!=null && userSelfEnrollmentLogsList!='') {
					exportContent="<div class='span4'><h4>Export options:</h4></div>";
					exportContent+="<div class='span8' >";
					exportContent+="<form method='post' id='enrollmentReportForm'> ";
					exportContent+="<input type='hidden' name='userLogonId' id='user_name'/>";
					exportContent+="<input type='hidden' name='appName' id='app_name'/>";
					exportContent+="<input type='hidden' name='activity' id='user_activity'/>";
					exportContent+="<input type='hidden' name='activityTime' id='activity_time'/>";
					exportContent+="<input type='hidden' name='managerName' id='user_role'/>";
					exportContent+="<ul>";
					exportContent+="<li><a href='#' onClick='callUserSelfEnrollmentLogsCsvReport()' class='btn btn-primary'>CSV</a></li>";
					exportContent+="<li><a href='#' onClick='callUserSelfEnrollmentLogsExcelReport()' class='btn btn-primary'>Excel</a></li>";
					exportContent+="<li><a href='#' id='xml' data='xml' onClick='callUserSelfEnrollmentLogsXmlReport()' class='btn btn-primary'>XML</a></li>";
					exportContent+="<li><a href='#' id='pdf' data='pdf' onClick='callUserSelfEnrollmentLogsPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
					exportContent+="</ul>";
					exportContent+="</form>";
					exportContent+="</div>";
	        	 $('#expo_opt').html(exportContent);
				}
				else {
					$('#expo_opt').html('');
				}
				$("#sample_enrollment_report").css("width", "100%");
				
				$('#selfUserLogonId').val(selfUserLogonId);
				$('#appName').val(appName);
				$('#activity').val(activity);
				$('#activityTime').val(activityTime);
				$('#manager').val(manager);
				
				
	  			 if($.trim(globalUserSelfEnrollmentLogsReportPreviouspageSize) != ''){ 
	  				 $("#pageIdUserSelfEnrollmentLogsReport").val(globalUserSelfEnrollmentLogsReportPreviouspageSize);
	  				fetchSizeUserSelfEnrollmentLogsReport();
			         if(!searchUserSelfEnrollmentLogsReportWithpageSize){
			        	 if(globalUserSelfEnrollmentLogsReportPreviousPageNum==0 && parseInt($('#pageNUserSelfEnrollmentLogsReport').text()) > 0)
			        		 globalUserSelfEnrollmentLogsReportPreviousPageNum="1";
			        	 $("#pageNumUserSelfEnrollmentLogsReport").val(globalUserSelfEnrollmentLogsReportPreviousPageNum);
			         }		        	 
			         else {
			        	 if(globalUserSelfEnrollmentLogsReportPreviousPageNum==0 && parseInt($('#pageNUserSelfEnrollmentLogsReport').text()) > 0)
			        		 globalUserSelfEnrollmentLogsReportPreviousPageNum="1";
			        	 $("#pageNumUserSelfEnrollmentLogsReport").val(globalUserSelfEnrollmentLogsReportPreviousPageNum);
			         }
			     }
		  		if($.trim(globalPersistUserSystemReportDomainValue) != ''){ 
					 $("#userEnrollmentDomain").val(globalPersistUserSystemReportDomainValue);
			     }
		  		
				  
			    $("#from_date_enrollment" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
		     	$("#to_date_enrollment").datepicker({ dateFormat: "dd/mm/yy" }).val();
		     	if(global_from_date_enrollment != '' && global_to_date_enrollment != '') {
			     		$("#from_date_enrollment" ).val(global_from_date_enrollment);
				     	$("#to_date_enrollment" ).val(global_to_date_enrollment);
		     	} else {
			     		$("#from_date_enrollment" ).val(getAddDaysToCurrentDate());
				     	$("#to_date_enrollment" ).val(getCurrentDate());
		     	}
		     	 $("#activityTime").datepicker({ dateFormat: "yy-mm-dd" }).val();
		     	 
		     	if(pageCall==false){

		  			var size = 10;
					if (globalUserSelfEnrollmentLogsReportPreviouspageSize != '') {
						size = parseInt(globalUserSelfEnrollmentLogsReportPreviouspageSize);
						userSelfEnrollmentLogsCount = searchCount;
					}
					
					if(selfUserLogonId!="" || appName!="" || activity != "" || activityTime!="" || manager!=""){
						userSelfEnrollmentLogsCount = searchCount;
					}
					if(userSelfEnrollmentLogsCount == 0){
						userSelfEnrollmentLogsCount = searchCount;
					}
					var maxPgaeNumber = userSelfEnrollmentLogsCount / size;
					var rem = userSelfEnrollmentLogsCount % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageNUserSelfEnrollmentLogsReport').html(parseInt(maxPgaeNumber));
					if(userSelfEnrollmentLogsCount == 0)
						$('#pageNumUserSelfEnrollmentLogsReport').val(0);
					else 
						$('#pageNumUserSelfEnrollmentLogsReport').val(1);
				}
		     	
		     	if(selfUserLogonId=="" || appName=="" || activity == "" || activityTime=="" || manager==""){
		     		searchUserSelfEnrollmentLogsReportWithpageSize=false;
				}
		 	}
	});
	
}
	catch(e) {
		alert(e);
	 }
}


function searchUserSelfEnrollmentData(){  
	if(validateSearchUserSelfEnrollmentDataReport()){
		var systemDomain=document.getElementById("userEnrollmentDomain").value;
		searchUserSelfEnrollmentLogsReportWithpageSize=true;
		openUserSelfEnrollmentLogsReport(false,true,systemDomain);
	} else {
		validateSearchUserSelfEnrollmentDataReport();
	}
	
}


function callUserSelfEnrollmentLogsCsvReport(){
	try {
	globalReportTypeSelfEnrollment = "csv";
	if(globalShowPopupWindowSelfEnrollment){
		$('#myModalSelfEnrollment').modal('show');
	} else {
		$('#myModalSelfEnrollment').modal('hide');
		
		var reportType = "csv";
		var url="reportgen_SelfEnrollmentLogsReport?reportType="+reportType+"&fileName=SelfEnrollmentLogsReport.csv&reportColumns="+globalArrayUserSummaryColumnSelfEnrollment+generateUserSelfEnrollmentLogsReportFilter;
		$('#user_name').val(selfUserLogonId);
		$('#app_name').val(appName);
		$('#user_activity').val(activity);
		$('#activity_time').val(activityTime);
		$('#user_role').val(manager);
		$('#enrollmentReportForm').attr("action",url);
		$('#enrollmentReportForm').submit();
		globalShowPopupWindowSelfEnrollment=true;
		
	}
  }
	catch(e){
		alert(e);
	}
}

function callUserSelfEnrollmentLogsExcelReport(){
	
	if(validateExcelCount()){
	try {
		globalReportTypeSelfEnrollment = "excel";
	if(globalShowPopupWindowSelfEnrollment){
		$('#myModalSelfEnrollment').modal('show');
	} else {
		$('#myModalSelfEnrollment').modal('hide');
		
		var reportType = "excel";
		var url="reportgen_SelfEnrollmentLogsReport?reportType="+reportType+"&fileName=SelfEnrollmentLogsReport.xlsx&reportColumns="+globalArrayUserSummaryColumnSelfEnrollment+generateUserSelfEnrollmentLogsReportFilter;
		$('#user_name').val(selfUserLogonId);
		$('#app_name').val(appName);
		$('#user_activity').val(activity);
		$('#activity_time').val(activityTime);
		$('#user_role').val(manager);
		$('#enrollmentReportForm').attr("action",url);
		$('#enrollmentReportForm').submit();
		globalShowPopupWindowSelfEnrollment=true;
	 }
  }
	catch(e){
		alert(e);
	}
	} else {
		alert('Your data is more than 500000. Please download the report in CSV Format!');
	}
}


function callUserSelfEnrollmentLogsXmlReport(){
	
	if(validateXMLCount()) {
	
	try {
		globalReportTypeSelfEnrollment = "xml";
		if(globalShowPopupWindowSelfEnrollment){
			$('#myModalSelfEnrollment').modal('show');
		} else {
			$('#myModalSelfEnrollment').modal('hide');
			
			var reportType = "xml";
			var url="reportgen_SelfEnrollmentLogsReport?reportType="+reportType+"&fileName=SelfEnrollmentLogsReport.xml&reportColumns="+globalArrayUserSummaryColumnSelfEnrollment+generateUserSelfEnrollmentLogsReportFilter;
			$('#user_name').val(selfUserLogonId);
			$('#app_name').val(appName);
			$('#user_activity').val(activity);
			$('#activity_time').val(activityTime);
			$('#user_role').val(manager);
			$('#enrollmentReportForm').attr("action",url);
			$('#enrollmentReportForm').submit();
			globalShowPopupWindowSelfEnrollment=true;
		}
	}
	catch(e){
		alert(e);
	}
	
	} else {
		alert('Your data is more than 100000. Please download the report in CSV Format!');
	}
}

function callUserSelfEnrollmentLogsPdfReport(){
	
	if(validatePDFCount()){
	
	globalReportTypeSelfEnrollment = "pdf";
	
	if(globalShowPopupWindowSelfEnrollment){
		$('#myModalSelfEnrollment').modal('show');
	} else {
		$('#myModalSelfEnrollment').modal('hide');
		
		var reportType = "pdf";
		var url="reportgen_SelfEnrollmentLogsReport?reportType="+reportType+"&fileName=SelfEnrollmentLogsReport.pdf&reportColumns="+globalArrayUserSummaryColumnSelfEnrollment+generateUserSelfEnrollmentLogsReportFilter;
		$('#user_name').val(selfUserLogonId);
		$('#app_name').val(appName);
		$('#user_activity').val(activity);
		$('#activity_time').val(activityTime);
		$('#user_role').val(manager);
		$('#enrollmentReportForm').attr("action",url);
		$('#enrollmentReportForm').submit();
		globalShowPopupWindowSelfEnrollment=true;
		
	}
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
}

function exportUserLogReportSelfEnrollment(){
	var arrayUserSummaryColumn = $.map($('input[name="selfenrollmentreportcolumn"]:checked'), function(c){return c.value; })
	if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "" ) {
		alert("Please Select at least one column for Export. ");
	} else {
		globalArrayUserSummaryColumnSelfEnrollment = arrayUserSummaryColumn;
		globalShowPopupWindowSelfEnrollment = false;
		
		if(globalReportTypeSelfEnrollment == "csv")
			callUserSelfEnrollmentLogsCsvReport();
		else if(globalReportTypeSelfEnrollment == "excel")
			callUserSelfEnrollmentLogsExcelReport();
		else if(globalReportTypeSelfEnrollment == "xml")
			callUserSelfEnrollmentLogsXmlReport();
		else if(globalReportTypeSelfEnrollment == "pdf")
			callUserSelfEnrollmentLogsPdfReport();
	}
}

function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
}

function getUserSelfEnrollmentLogsReportDatewise(){
	var systemDomain = document.getElementById("userEnrollmentDomain").value;
	if($.trim(systemDomain) == ""){
		alert("Please select domain");
		return;
	} else{
		globalPersistUserSystemReportDomainValue = systemDomain;
		from_date_enrollment=$("#from_date_enrollment").val();
		to_date_enrollment=$("#to_date_enrollment").val();
		if(from_date_enrollment==""||from_date_enrollment==undefined||from_date_enrollment==null){
			 alert("Please select start time stamp");
			 return;
		 }
		if(to_date_enrollment==""||to_date_enrollment==undefined||to_date_enrollment==null){
			 alert("Please select end time stamp");
			 return;
		 }
		 if(process(from_date_enrollment) > process(to_date_enrollment)){
			 alert("To timestamp can not be same or less than the from timestamp");
			 return;
		 }
		 
		 global_from_date_enrollment=$("#from_date_enrollment").val();
		 global_to_date_enrollment=$("#to_date_enrollment").val();
		 $("#pageIdUserSelfEnrollmentLogsReport").val('');
		 $("#pageNumUserSelfEnrollmentLogsReport").val('');
		 openUserSelfEnrollmentLogsReport(false,false,systemDomain);
	}
}

function searchUserSelfEnrollmentDataReport(e){  
	 if (e.keyCode === 13)   
		 searchUserSelfEnrollmentData();
}

function validateSearchUserSelfEnrollmentDataReport(){
	 var selfUserLogonId = $('#selfUserLogonId').val();
	 if(selfUserLogonId != undefined && selfUserLogonId!= ""){
		 selfUserLogonId = selfUserLogonId.replace(/\s/g, " ");
			var user = selfUserLogonId.split(',');
			var len  = user.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#selfUserLogonId').val("");
				return false;
			}
	 }
	 
	 var activity = $('#activity').val();
	 if(activity != undefined && activity!= ""){
		 activity = activity.replace(/\s/g, " ");
			var status = activity.split(',');
			var len  = status.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#activity').val("");
				return false;
			}
	 }
	 
	 var manager = $('#manager').val();
	 if(manager != undefined && manager!= ""){
		 manager = manager.replace(/\s/g, " ");
			var user_role = manager.split(',');
			var len  = user_role.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#manager').val("");
				return false;
			}
	 }
	return true;
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
