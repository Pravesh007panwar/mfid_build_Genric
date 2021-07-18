
var userSystemLogsCount;
var searchCount;
var userSystemLogsList;
var searchUserSystemLogsReportWithpageSize=false;
var globalShowPopupWindowSystem = true;
var globalArrayUserSummaryColumnSystem = '';
var globalReportTypeSystem='';
var globalPersistUserSystemReportDomainValue='';
var from_date_system = getAddDaysToCurrentDate();
var to_date_system = getCurrentDate();
var global_from_date_system = '';
var global_to_date_system = '';
var generateUserSystemLogsReportFilter = '';
var tilesType='';

function getPageDataUserSystemLogsReport(){
 	var userSystemLogsSize = document.getElementById('pageIdUserSystemLogsReport').value;
 	if ($.trim(userSystemLogsSize) != '') {
	var pageNumberUserSystemLogs = document.getElementById('pageNumUserSystemLogsReport').value;
	if(pageNumberUserSystemLogs=="" || (pageNumberUserSystemLogs=="0" && parseInt(totalPages) > 0 )){ $('#pageNumUserSystemLogsReport').val(1);}
	var systemDomain =document.getElementById("userSystemDomain").value;
	var totalPages =  $('#pageNUserSystemLogsReport').text();
	if ($.trim(pageNumberUserSystemLogs) != "" && parseInt(pageNumberUserSystemLogs) <= parseInt(totalPages)){
		$('#user_systemlogs_tiles_type').empty();
		openUserSystemLogsReport(true,false,domain);
	} else
		alert('Page should be less than or equal to page number.');
	}
		
}


function fetchSizeUserSystemLogsReport(){
	var userSystemLogsSize = document.getElementById('pageIdUserSystemLogsReport').value;

	if($.trim(userSystemLogsSize) != ''){
		var userSystemLogsMaxSize = userSystemLogsCount;
		var useSystemLogsMaxPageNumber = userSystemLogsMaxSize/userSystemLogsSize;
		var remainderSize = userSystemLogsMaxSize%userSystemLogsSize;
		if(remainderSize > 0){
			useSystemLogsMaxPageNumber = useSystemLogsMaxPageNumber+1;
		}
		if(userSystemLogsCount==0){
			$('#pageNumUserSystemLogsReport').val(0);
		} else{
			$('#pageNumUserSystemLogsReport').val(1);
			$('#pageNumUserSystemLogsReport').attr("disabled",false);
		} 				
		$('#pageNUserSystemLogsReport').html(parseInt(useSystemLogsMaxPageNumber));
				
	} 
}

var globalUserSystemLogsReportPreviouspageSize="";
var globalUserSystemLogsReportPreviousPageNum="";
var systemName="";
var bioCount="";
var pushCount="";
var otpCount="";
function openUserSystemLogsReport(pageCall,pageSearch,domain) {
	
	try{
		
	   if($("#pageIdUserSystemLogsReport").length) {
		   globalUserSystemLogsReportPreviouspageSize=$("#pageIdUserSystemLogsReport").val();
		   globalUserSystemLogsReportPreviousPageNum=$("#pageNumUserSystemLogsReport").val();
	    }
	
	  
	   if(from_date_system.indexOf('/')!=-1){
		   from_date_system=from_date_system.split("/")[2]+"-"+from_date_system.split("/")[1]+"-"+from_date_system.split("/")[0]+" 00:00:00";
		   to_date_system=to_date_system.split("/")[2]+"-"+to_date_system.split("/")[1]+"-"+to_date_system.split("/")[0]+" 23:59:59";
		}
	 
	   $("#user_onlinelogs_report_data").empty();
	  
	var mySystemUrl="report_userSystemLogsReport.action?fromDate="+from_date_system+"&toDate="+to_date_system+"&domain="+domain;
	var dataString="";
	
	 if(pageCall){
		  var pageUserSystemNumber = document.getElementById("pageNumUserSystemLogsReport").value;
		  var fetchUserSystemSize=document.getElementById("pageIdUserSystemLogsReport").value;
		  mySystemUrl+="&fetchSize="+fetchUserSystemSize+"&pageNumber="+pageUserSystemNumber;
	  }
	
	 if(systemName!="" || bioCount!="" || pushCount != "" || otpCount!=""){
		 pageSearch=true;
	  } 
	
	if(pageSearch){
		$("#user_systemlogs_tiles_type").empty();
		  systemName=$('#systemName').val();
		  	systemName = systemName.replace(/\s/g, "");
		  bioCount=$('#bioCount').val();
		  pushCount=$('#pushCount').val();
		  otpCount=$('#otpCount').val();
		
		 dataString+="&systemName="+systemName+"&bioCount="+bioCount+"&pushCount="+pushCount+"&otpCount="+otpCount;
		
	}
   if(searchUserSystemLogsReportWithpageSize){  
	     if(mySystemUrl.indexOf('fetchSize')==-1){
	    	 if($.trim(globalUserSystemLogsReportPreviouspageSize)!='')
	    		 mySystemUrl+="&fetchSize="+globalUserSystemLogsReportPreviouspageSize; 
		  }
    }
  
   generateUserSystemLogsReportFilter = "&"+mySystemUrl.split("?")[1];
	
   $('#user_systemlogs_report_data').html('<span>Loading...</span>');
	$.ajax({
		type:"POST",
		url:mySystemUrl,
		data:dataString,
		dataType:"text",
		success:function(data){
			
		 if($.trim(data)=="sessionout"){
				alert(data);
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
		 		var obj=JSON.parse(data);
				var obj1=JSON.parse(obj.userSystemLogsReport);
				var obj2=JSON.parse(obj.userSystemLogsCount);
				var obj3=JSON.parse(obj.domainList);
				userSystemLogsList=JSON.parse(obj.userSystemLogsReport);
				if(searchUserSystemLogsReportWithpageSize){
					searchCount = obj2;
					userSystemLogsCount=obj2;
					//obj2=userSystemLogsCount;
				} else {
					userSystemLogsCount=obj2;
					searchCount = obj2;
				}
				
				var content = '<h4></h4><div class="space15"></div>';
				content += '<div class="row-fluid">';
				content += '<div class="span3">';
				content += '<label>Domain : </label>';
				content += '<select id="userSystemDomain" name="userSystemDomain">';
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
				content += '<input type="text" name="from_date_system" id="from_date_system" readonly style="cursor:pointer;"/>'; 
				content += '</div>';

				content += '<div class="span3 offset0">';
				content += '<label>To : </label>';
				content += '<input type="text" name="to_date_system" id="to_date_system" readonly style="cursor:pointer;"/>'; 
				content += '</div>';
				
				content += '<div class="span3 offset0">';
				content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date_system" onClick="getUserSystemLogsReportDatewise()" />';
				content += '</div>';
				content += '<div class="clear"></div>';
				content += '</div>';
				content += '<div class="space15"></div>';
			  
				content += '<div class="row-fluid">';
				content += '<div  class="span6">';
				content += '<div class="pull-left" id="switch_app">';
				content += '<label>Size</label>';
				content += '<select id="pageIdUserSystemLogsReport" onChange="fetchSizeUserSystemLogsReport(),getPageDataUserSystemLogsReport();" style="width:100%;" name="pageIdUserSystemLogsReport">';
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
				/*content += '<select onChange="getPageDataUserSystemLogsReport()" id="pageNumUserSystemLogsReport"  >';
				content += '<option value="">Select Page</option>';
				content += '</select>';*/
				content += ' <input type="text" id="pageNumUserSystemLogsReport" style="width:20%;background-color:white;" onChange="getPageDataUserSystemLogsReport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageNUserSystemLogsReport"></span>';
				content += '</div>';
				content += '</div>';
				content += '</div>';
				content += '<table class="table table-striped table-bordered" id="sample_system_report">';
				content += '<thead>';
				content += '<tr>';
				content += '<th>Sr.No.</th>';
				content += '<th>System Id</th>';
				content += '<th>Bio</th>';
				content += '<th>Push</th>';
				content += '<th>OTP</th>';
				content += '</tr>';
				content += '</thead>';
				content +='<tr>';
				content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="searchUserSystemData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
				content += '<th><input type="text" onkeydown="searchUserSystemDataReport(event)"  name="systemName" id="systemName" ></th>';
				content += '<th><input type="text" onkeydown="searchUserSystemDataReport(event)" name="bioCount" id="bioCount" ></th>';
				content += '<th><input type="text" onkeydown="searchUserSystemDataReport(event)" name="pushCount" id="pushCount" ></th>';
				content += '<th><input type="text" onkeydown="searchUserSystemDataReport(event)" name="otpCount" id="otpCount" ></th>';
				content+='</tr>';
				if (obj1 != null && obj1 != '') {
					jQuery.each(obj1,
							function(ind, val) {
								
								i=ind+1;
								content += "<tr>";
								content += "<td>"
										+ i + "</td>";
							
								content += "<td>" + val.systemName+"</td>";
								content += "<td><a href='javascript:void(0);' data='"+val.systemName+"' class='bio_Click' >"+val.bioCount+"</a></td>";
								content += "<td><a href='javascript:void(0);' data='"+val.systemName+"' class='push_Click' >"+val.pushCount+"</a></td>";
								content += "<td><a href='javascript:void(0);' data='"+val.systemName+"' class='otp_Click' >"+val.otpCount+"</a></td>";
								content += "</tr>";
							
							});

				} else {
					content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";
				}
				content += "</table>";
			//	alert(content);
				$('#user_systemlogs_report_data').html(content);
				if(userSystemLogsList!=null && userSystemLogsList!='') {
					exportContent="<div class='span4'><h4>Export options:</h4></div>";
					exportContent+="<div class='span8' >";
					exportContent+="<form method='post' id='systemReportForm'>";
					exportContent+="<input type='hidden' name='systemName' id='system_name'/>";
					exportContent+="<input type='hidden' name='bioCount' id='bio_count'/>";
					exportContent+="<input type='hidden' name='pushCount' id='push_count'/>";
					exportContent+="<input type='hidden' name='otpCount' id='otp_count'/>";
					exportContent+="<ul>";
					exportContent+="<li><a href='#' onClick='callUserSystemLogsCsvReport()' class='btn btn-primary'>CSV</a></li>";
					exportContent+="<li><a href='#' onClick='callUserSystemLogsExcelReport()' class='btn btn-primary'>Excel</a></li>";
					exportContent+="<li><a href='#' id='xml' data='xml' onClick='callUserSystemLogsXmlReport()' class='btn btn-primary'>XML</a></li>";
					exportContent+="<li><a href='#' id='pdf' data='pdf' onClick='callUserSystemLogsPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
					exportContent+="</ul>";
					exportContent+="</form>";
					exportContent+="</div>";
	        	 $('#expo_opt').html(exportContent);
				}
				else {
					$('#expo_opt').html('');
				}
				$("#sample_system_report").css("width", "100%");
				
				$('#systemName').val(systemName);
				$('#bioCount').val(bioCount);
				$('#pushCount').val(pushCount);
				$('#otpCount').val(otpCount);
				
	  			 if($.trim(globalUserSystemLogsReportPreviouspageSize) != ''){ 
	  				 $("#pageIdUserSystemLogsReport").val(globalUserSystemLogsReportPreviouspageSize);
	  				fetchSizeUserSystemLogsReport();
			         if(!searchUserSystemLogsReportWithpageSize)
			        	 $("#pageNumUserSystemLogsReport").val(globalUserSystemLogsReportPreviousPageNum);
			         else{
			        	 if(globalUserSystemLogsReportPreviousPageNum==0 && parseInt($('#pageNUserSystemLogsReport').text()) > 0)
			        		 	globalUserSystemLogsReportPreviousPageNum="1";
			        		 $("#pageNumUserSystemLogsReport").val(globalUserSystemLogsReportPreviousPageNum);
			         }
			     }
		  		if($.trim(globalPersistUserSystemReportDomainValue) != ''){ 
					 $("#userSystemDomain").val(globalPersistUserSystemReportDomainValue);
			     }
		  		//searchUserSystemLogsReportWithpageSize=false;
				  
			    $("#from_date_system" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
		     	$("#to_date_system").datepicker({ dateFormat: "dd/mm/yy" }).val();
		     	if(global_from_date_system != '' && global_to_date_system != '') {
			     		$("#from_date_system" ).val(global_from_date_system);
				     	$("#to_date_system" ).val(global_to_date_system);
		     	} else {
			     		$("#from_date_system" ).val(getAddDaysToCurrentDate());
				     	$("#to_date_system" ).val(getCurrentDate());
		     	}
		     	
		     	if(pageCall==false){
		     		
		     		var size = 10;
					if (globalUserSystemLogsReportPreviouspageSize != '') {
						size = parseInt(globalUserSystemLogsReportPreviouspageSize);
						userSystemLogsCount = searchCount;
					}
					
					 if(systemName!="" || bioCount!="" || pushCount != "" || otpCount!=""){
						userSystemLogsCount = searchCount;
					 } 
					if(userSystemLogsCount == 0){
						userSystemLogsCount = searchCount;
					}
		     		
					var useSystemLogsMaxPageNumber = userSystemLogsCount / size;
					var rem = userSystemLogsCount % size;
					if (rem > 0) {
						useSystemLogsMaxPageNumber = useSystemLogsMaxPageNumber + 1;
					}
					$('#pageNUserSystemLogsReport').html(parseInt(useSystemLogsMaxPageNumber));
					if(userSystemLogsCount == 0)
						$('#pageNumUserSystemLogsReport').val(0);
					else 
						$('#pageNumUserSystemLogsReport').val(1);
				}
		     	 if(systemName=="" && bioCount=="" && pushCount == "" && otpCount==""){
		     		 searchUserSystemLogsReportWithpageSize=false;
				  } 
		 	}
	});
	
}
	catch(e) {
		alert(e);
	 }
}


function searchUserSystemData(){  
	if(validateSearchUserSystemDataReport()){
		var systemDomain=document.getElementById("userSystemDomain").value;
		searchUserSystemLogsReportWithpageSize=true;
		openUserSystemLogsReport(false,true,systemDomain);
	} else {
		validateSearchUserSystemDataReport();
	}
	
}


function callUserSystemLogsCsvReport(){
	try {
	globalReportTypeSystem = "csv";
	if(globalShowPopupWindowSystem){
		$('#myModalSystem').modal('show');
	} else {
		$('#myModalSystem').modal('hide');
		
		var reportType = "csv";
		var url="reportgen_systemLogsReport?reportType="+reportType+"&fileName=SystemLogReport.csv&reportColumns="+globalArrayUserSummaryColumnSystem+generateUserSystemLogsReportFilter;
		$('#system_name').val(systemName);
		$('#bio_count').val(bioCount);
		$('#push_count').val(pushCount);
		$('#otp_count').val(otpCount);
		$('#systemReportForm').attr("action",url);
		$('#systemReportForm').submit();
		globalShowPopupWindowSystem=true;
		//resetAllCheckboxSystem();
	}
  }
	catch(e){
		alert(e);
	}
}

function callUserSystemLogsExcelReport(){
	
	if(validateExcelCount()){
	
	try {
	globalReportTypeSystem = "excel";
	if(globalShowPopupWindowSystem){
		$('#myModalSystem').modal('show');
	} else {
		$('#myModalSystem').modal('hide');
		
		var reportType = "excel";
		var url="reportgen_systemLogsReport?reportType="+reportType+"&fileName=SystemLogReport.xlsx&reportColumns="+globalArrayUserSummaryColumnSystem+generateUserSystemLogsReportFilter;
		$('#system_name').val(systemName);
		$('#bio_count').val(bioCount);
		$('#push_count').val(pushCount);
		$('#otp_count').val(otpCount);
		$('#systemReportForm').attr("action",url);
		$('#systemReportForm').submit();
		globalShowPopupWindowSystem=true;
		//resetAllCheckboxSystem();
	 }
  }
	catch(e){
		alert(e);
	}
	} else {
		alert('Your data is more than 500000. Please download the report in CSV Format!');
	}
}


function callUserSystemLogsXmlReport(){
	
	if(validateXMLCount()) {	
	try {
		globalReportTypeSystem = "xml";
		if(globalShowPopupWindowSystem){
			$('#myModalSystem').modal('show');
		} else {
			$('#myModalSystem').modal('hide');
			
			var reportType = "xml";
			var url="reportgen_systemLogsReport?reportType="+reportType+"&fileName=SystemLogReport.xml&reportColumns="+globalArrayUserSummaryColumnSystem+generateUserSystemLogsReportFilter;
			$('#system_name').val(systemName);
			$('#bio_count').val(bioCount);
			$('#push_count').val(pushCount);
			$('#otp_count').val(otpCount);
			$('#systemReportForm').attr("action",url);
			$('#systemReportForm').submit();
			globalShowPopupWindowSystem=true;
			//resetAllCheckboxSystem();
		}
	}
	catch(e){
		alert(e);
	}
	} else {
		alert('Your data is more than 100000. Please download the report in CSV Format!');
	}
}

function callUserSystemLogsPdfReport(){
	if(validatePDFCount()){
	globalReportTypeSystem = "pdf";
	
	if(globalShowPopupWindowSystem){
		$('#myModalSystem').modal('show');
	} else {
		$('#myModalSystem').modal('hide');
		
		var reportType = "pdf";
		//var url = "";
		var url="reportgen_systemLogsReport?reportType="+reportType+"&fileName=SystemLogReport.pdf&reportColumns="+globalArrayUserSummaryColumnSystem+generateUserSystemLogsReportFilter;
		$('#systemReportForm').attr("action",url);
		$('#system_name').val(systemName);
		$('#bio_count').val(bioCount);
		$('#push_count').val(pushCount);
		$('#otp_count').val(otpCount);
		$('#systemReportForm').submit();
		globalShowPopupWindowSystem=true;
		//resetAllCheckboxSystem();
	}
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
}

function exportUserLogReportSystem(){
	var arrayUserSummaryColumn = $.map($('input[name="systemuserlogreportcolumn"]:checked'), function(c){return c.value; })
	if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "" ) {
		alert("Please Select at least one column for Export. ");
	} else {
		globalArrayUserSummaryColumnSystem = arrayUserSummaryColumn;
		globalShowPopupWindowSystem = false;
		
		if(globalReportTypeSystem == "csv")
			callUserSystemLogsCsvReport();
		else if(globalReportTypeSystem == "excel")
			callUserSystemLogsExcelReport();
		else if(globalReportTypeSystem == "xml")
			callUserSystemLogsXmlReport();
		else if(globalReportTypeSystem == "pdf")
			callUserSystemLogsPdfReport();
	}
}

function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
	}

function getUserSystemLogsReportDatewise(){
	var systemDomain = document.getElementById("userSystemDomain").value;
	if($.trim(systemDomain) == ""){
		alert("Please select domain");
		return;
	} else{
		globalPersistUserSystemReportDomainValue = systemDomain;
		from_date_system=$("#from_date_system").val();
		to_date_system=$("#to_date_system").val();
		if(from_date_system==""||from_date_system==undefined||from_date_system==null){
			 alert("Please select start time stamp");
			 return;
		 }
		if(to_date_system==""||to_date_system==undefined||to_date_system==null){
			 alert("Please select end time stamp");
			 return;
		 }
		 if(process(from_date_system) > process(to_date_system)){
			 alert("To timestamp can not be same or less than the from timestamp");
			 return;
		 }
		 
		 global_from_date_system=$("#from_date_system").val();
		 global_to_date_system=$("#to_date_system").val();
		 $("#pageIdUserSystemLogsReport").val('');
		 $("#pageNumUserSystemLogsReport").val('');
		 $('#user_systemlogs_tiles_type').empty(); // For Empty Sub Tiles Report
		 openUserSystemLogsReport(false,false,systemDomain);
	}
}

function searchUserSystemDataReport(e){  
	 if (e.keyCode === 13)   
		 searchUserSystemData();
}

function validateSearchUserSystemDataReport(){
 var systemName = $('#systemName').val();
	 if(systemName != undefined && systemName!= ""){
		 systemName = systemName.replace(/\s/g, " ");
			var system = systemName.split(',');
			var len  = system.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#systemName').val("");
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

