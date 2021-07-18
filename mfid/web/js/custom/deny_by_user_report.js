function removeFilter(){
   $('#getUserLogonId').val("");
   $('#getCountryNameId').val("");
   $('#getFailureCountId').val("");
   $('#getactivityTimeId').val("");
   $('#failureAttemptsuserName').val("");
	$('#failureAttemptsapplication').val("");
	$('#failureAttemptsrequestTime').val("");
	$('#failureAttemptsIpAddress').val("");
	$('#failureAttemptsuserStatus').val("");
} 

var searchCount;
 var allAdminLogData;
 var associateUserList;
 var globalShowPopupWindow = true;
 var globalArrayUserSummaryColumn = '';
 var globalPersistDenyByUserReportDomainValue ='';
 var globalReportType='';
 var domainNameAdminLog='';
 var genDenyByUserReportFilter = '';
 var genDenyByUserReportAssFilter = '';
 var genAdminLogFilter ='';
 var global_from_date = '';
 var global_to_date = '';
 var from_date = getAddDaysToCurrentDate();
 var to_date = getCurrentDate();
 var global_app_Name = '';
 var searchFailureAttemptsWithpageSize = false;
 var userData='';
 var countDenyByUserFailureReportPage;
 
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

/*function showDenyByCountryRportFirstTime(){
   
	content = '<div class="row-fluid">';
	

     content += '<div class="span3 offset0">';
	 content += '<label>Domain : </label>';
	 content += '<select id="adminLogReportDomain" name="switchDomain"><option value="">-select domain-</option></select>'; 
	 content += '</div>';


		content += '<div class="span3 offset0">';
			content += '<label>From : </label>'; 
			content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>';
		content += '</div>';
	
		content += '<div class="span3 offset0">';
			content += '<label>To : </label>';
			content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>';
		content += '</div>';					
		
		content += '<div class="span3 offset0">';
			content += '<button type="button" onClick="showDenyByCountryReport(false,false)"  id="submit_date" class="btn btn-primary" style="margin-top: 25px;">Submit</button>';
		content += '</div>';
		content += '<div class="clear"></div>';
	content += '</div>';
	
	$('#deny_country_report_container').html(content);
	$("#from_date" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
	$("#to_date").datepicker({ dateFormat: "dd/mm/yy" }).val();

	$("#from_date" ).val(getAddDaysToCurrentDate());

	$("#to_date" ).val(getCurrentDate());
	showDenyByCountryReport(false,false);
}*/

function getDenyByUserRportDatewise(){
	var domain = document.getElementById("adminLogReportDomain").value;
	if($.trim(domain) == ""){
		alert("Please select domain");
		return;
	} else{
		globalPersistDenyByUserReportDomainValue = domain;
		from_date=$("#from_date").val();
		to_date=$("#to_date").val();
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
		 
		 global_from_date=$("#from_date").val();
		 global_to_date=$("#to_date").val();
		 $("#pageId").val('');
		 $("#pageNum").val('');
		 showDenyByCountryReport(false,false);
	}
}


var countAdminLogsReportPage;
var searchDenyByCountryReportWithpageSize=false;


function getPageData(){
	
	var size=document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN').text();
	var pageNumber = document.getElementById('pageNum').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))	
		showDenyByCountryReport(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}


function getPageFailureData() {

	var size = document.getElementById('pageId_failure').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_failure').text();
	var pageNumber = document.getElementById('pageNum_failure').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_failure').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))	
		showDenyByCountryExpendReport(userData, true, false);
	else
		alert('Page should be less than or equal to page number.');
	}
}


function fetchSize() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
		var maxSize = countAdminLogsReportPage;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if(countAdminLogsReportPage==0){
			$('#pageNum').val(0);
		} else{
			$('#pageNum').val(1);
			$('#pageNum').attr("disabled",false);
		} 				
		$('#pageN').html(parseInt(maxPgaeNumber));
				
	} 
	
}


function fetchFailureSize() {

	var size = document.getElementById('pageId_failure').value;
	if ($.trim(size) != '') {

		var maxSize = parseInt(countDenyByUserFailureReportPage);
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		
		if(countDenyByUserFailureReportPage==0){
			$('#pageNum_failure').val(0);
		} else{
			$('#pageNum_failure').val(1);
			$('#pageNum_failure').attr("disabled",false);
		} 				
		$('#pageN_failure').html(parseInt(maxPgaeNumber));
	} 
	
}
function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
}

var globalAdminLogsReportPreviouspageSize="";
var globalAdminLogsReportPreviousPageNum="";
var getUserLogonId="";
var getCountryNameId="";
var getFailureCountId="";
var getactivityTimeId="";

 function showDenyByCountryReport(pageCall,isSearch)
	{
	  $('#block_deny_country_report_expend_container').html('');	 
	 if(typeof(pageCall) == 'undefined' && typeof(isSearch) == 'undefined' )
	  {
       try{ $("#pageId").val(''); $("#pageNum").val(''); }catch(err){}
	  }
	  try{
		  /*var from_date=$("#from_date").val();
		   var to_date=$("#to_date").val();
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
		    }*/
           if($("#pageId").length) {
			   globalAdminLogsReportPreviouspageSize=$("#pageId").val();
			   globalAdminLogsReportPreviousPageNum=$("#pageNum").val();
		    }
           if(from_date.indexOf('/')!=-1){
        	   from_date=from_date.split("/")[2]+"-"+from_date.split("/")[1]+"-"+from_date.split("/")[0]+" 00:00:00";
    		   to_date=to_date.split("/")[2]+"-"+to_date.split("/")[1]+"-"+to_date.split("/")[0]+" 23:59:59";
           }
           
		   var domainId='';
		   try{
			    domainId=document.getElementById('adminLogReportDomain').value;
	        }catch(err){}
		   var myUrl="report_showDenyByUserReportData.action?fromDate="+from_date+"&toDate="+to_date;
		   var dataString="";
		   
		if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
		if(getUserLogonId!="" || getCountryNameId!="" || getFailureCountId!="" || getactivityTimeId!=""){
			isSearch=true;
		}
		if(isSearch){
			 getUserLogonId=document.getElementById('getUserLogonId').value;
			 	getUserLogonId = getUserLogonId.replace(/\s/g, "");
			 getCountryNameId=document.getElementById('getCountryNameId').value;
			 	getCountryNameId = getCountryNameId.replace(/\s/g, "");
			 getFailureCountId=document.getElementById('getFailureCountId').value;
			 getactivityTimeId=document.getElementById('getactivityTimeId').value;
			 //myUrl+="&countryName="+getCountryNameId+"&count="+getFailureCountId+"&requestTime="+getactivityTimeId+'&userLogonId='+getUserLogonId;
			dataString+="&countryName="+getCountryNameId+"&count="+getFailureCountId+"&requestTime="+getactivityTimeId+'&userLogonId='+getUserLogonId;
		}
		genAdminLogFilter = "&"+myUrl.split("?")[1];
        if(searchDenyByCountryReportWithpageSize) {  
	   	     if(myUrl.indexOf('fetchSize')==-1)
	   		   { if($.trim(globalAdminLogsReportPreviouspageSize)!='')
	   			myUrl+="&fetchSize="+globalAdminLogsReportPreviouspageSize; 
	   		   }
	      }
        myUrl += "&domain="+domainId;
        domainNameAdminLog = domainId;
  	   $('#tab_bottom_box').html('<span>Loading...</span>');
		$.ajax({
			type: "POST",  
			url:myUrl,
			data: dataString,
		    async: true,
			dataType: "text",
			success: function(data) { 
		    if($.trim(data)=="sessionout")
				{
				alert("sessionout");
				var testVal=document.getElementById('loginPage').value;
				window.location.replace(testVal);
				}
				var object = JSON.parse(data);
				var obj1=JSON.parse(object.denyByUserReportData);
				var obj2=JSON.parse(object.count);
				var obj3=JSON.parse(object.domainList);
				allAdminLogData = obj1;
                if(searchDenyByCountryReportWithpageSize){
                	 searchCount = obj2;
                	 countAdminLogsReportPage=obj2;
                	 //obj2=countAdminLogsReportPage;
                } else {
                	 countAdminLogsReportPage=obj2;
                	 searchCount = obj2;
                }
		  	  
 				/* var domainContent='<option value="" >-select domain-</option>';
 				jQuery.each(obj3, function(i, v) {
 					domainContent += '<option value="'+obj3[i]+'" >'+obj3[i]+'</option>';
 				});*/
 				
 				var content = '<h4></h4><div class="space15"></div>';
 				content += '<div class="row-fluid">';
 				content += '<div class="span3">';
 				content += '<label>Domain : </label>';
 				content += '<select id="adminLogReportDomain" name="adminLogReportDomain">';
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
 				content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>'; 
 				content += '</div>';

 				content += '<div class="span3 offset0">';
 				content += '<label>To : </label>';
 				content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>'; 
 				content += '</div>';
 				
 				content += '<div class="span3 offset0">';
 				content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="getDenyByUserRportDatewise()" />';
 				content += '</div>';
 				content += '<div class="clear"></div>';
 				content += '</div>';
 				content += '<div class="space15"></div>';
 				
			   // var content = '<h4>User</h4><div class="space15"></div>';
			 	content += '<div class="row-fluid ">';
				content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId" onChange="fetchSize(),getPageData();" name="deassociationReasonListName" style="width:100%;">';
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
					/*content += '<select onChange="getPageData()" id="pageNum"  >';
		            content += '<option value="">-select Page-</option>';
				    content += '</select>';*/
					content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
					content += '</div>';
				    content += '</div>';
				    content += '</div>';
				    content += '<table class="table table-striped table-bordered" id="sample_1_1">';
					content += '<thead>';
					content += '<tr>';
				    content += '<th></th>'; 	
				    			content += '<th>User LogonId</th>';
				    			content += '<th>Country Name</th>'; 
							 	content += '<th>Failure Count</th>'; 
							 	content += '<th>Date</th>';
							 	content += '</tr>';
							 	content += '<tr>';
					    content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="adminDenyByCountryDataReportSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchDenyByCountryReport(event)" id="getUserLogonId" /></th>';
					    content += '<th><input type="text" onkeydown="searchDenyByCountryReport(event)" id="getCountryNameId" /></th>';
					    content += '<th><input type="text" onkeydown="searchDenyByCountryReport(event)" id="getFailureCountId" /></th>';
						content += '<th><input type="text" onkeydown="searchDenyByCountryReport(event)" id="getactivityTimeId" /></th>';
						 
						content += '</tr>';
					    content += '</thead>';
					    
					    
					try{
						 if(obj1!=null && obj1!=''){
							 var counterSr=0;
						jQuery.each(obj1, function(i, v) {
							counterSr++;
							content += "<tr><td>"+counterSr+"</td><td>"+v.userLogonId+"</td><td>"+v.countryName+"</td><td><a href='javascript:void(0);' data='"+v.userLogonId+","+v.countryName+","+v.requestTime+"' class='failure_attempt'>"+v.failureCount+"</a></td><td>"+v.requestTime+"</td></tr>";
					     });
					}
						else  
							content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";	
					
					
					}
					catch(e){
						//alert(e);
					}
					content += "</table>";
					content += '<div class="clearfix"></div>';
					content += '<div class="form-actions form-actions2">';
					content += '<div class="pull-left">';
				   $('#block_deny_country_report_container').html(content);
				   
				   
				   if(allAdminLogData!=null && allAdminLogData!='')
					{
						content1="<div class='span4'><h4>Export options:</h4></div>";
		               content1+="<div class='span8' >";
		               content1+="<form method='post' id='reportForm'> ";
		               content1+="<input type='hidden' name='countryName' id='country_name'/>";
		               content1+="<input type='hidden' name='count' id='user_count'/>";
		               content1+="<input type='hidden' name='requestTime' id='request_time'/>";
		               content1+="<input type='hidden' name='userLogonId' id='user_logon_id'/>";
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
				   
				   $('#getUserLogonId').val(getUserLogonId);
				   $('#getCountryNameId').val(getCountryNameId);
				   $('#getFailureCountId').val(getFailureCountId);
				   $('#getactivityTimeId').val(getactivityTimeId);
				   
				   
			 
	            if($.trim(globalAdminLogsReportPreviouspageSize) != '') {  
	            	$("#pageId").val(globalAdminLogsReportPreviouspageSize);
			           fetchSize(); 
			         if(!searchDenyByCountryReportWithpageSize)
			            $("#pageNum").val(globalAdminLogsReportPreviousPageNum);
			         else {
			        	 if(globalAdminLogsReportPreviousPageNum==0 && parseInt($('#pageN_failure').text())>0)
			        		 globalAdminLogsReportPreviousPageNum="1";
			        	 $("#pageNum").val(globalAdminLogsReportPreviousPageNum);
			         }
			      }
	           /* if(!searchDenyByCountryReportWithpageSize) {
	            	$('#adminLogReportDomain').html(domainContent);				   
	                $('#adminLogReportDomain').val(domainId);
	             }*/  
				 
				 $("#getactivityTimeId").datepicker({ dateFormat: "yy-mm-dd" }).val();
				 
				  if($.trim(globalPersistDenyByUserReportDomainValue) != ''){ 
						 $("#adminLogReportDomain").val(globalPersistDenyByUserReportDomainValue);
				     }
				 
				 $("#from_date" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
			     	$("#to_date").datepicker({ dateFormat: "dd/mm/yy" }).val();
			     	if(global_from_date != '' && global_to_date != '') {
				     		$("#from_date" ).val(global_from_date);
					     	$("#to_date" ).val(global_to_date);
			     	} else {
				     		$("#from_date" ).val(getAddDaysToCurrentDate());
					     	$("#to_date" ).val(getCurrentDate());
			     	}
				 
				 if(pageCall==false){
					 var size = 10;
						if (globalAdminLogsReportPreviouspageSize != '') {
							size = parseInt(globalAdminLogsReportPreviouspageSize);
							countAdminLogsReportPage = searchCount;
						}
						if(getUserLogonId!="" || getCountryNameId!="" || getFailureCountId!="" || getactivityTimeId!=""){
							countAdminLogsReportPage = searchCount;
						}						
						if(countAdminLogsReportPage == 0){
							countAdminLogsReportPage = searchCount;
						}
						var maxPgaeNumber = countAdminLogsReportPage / size;
						var rem = countAdminLogsReportPage % size;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						$('#pageN').html(parseInt(maxPgaeNumber));
						if(countAdminLogsReportPage == 0)
							$('#pageNum').val(0);
						else 
							$('#pageNum').val(1);
					}
				 
				 if(getUserLogonId=="" || getCountryNameId=="" || getFailureCountId=="" || getactivityTimeId==""){
					 searchDenyByCountryReportWithpageSize=false;
				  }
				
		  }
		});
	 }
	 catch(e)
	 {
		 alert(e);
	 }
		
	}
 
 
 
function adminDenyByCountryDataReportSearch() {
	if(validateAdminDenyByCountryDataReportSearch()){
		searchDenyByCountryReportWithpageSize=true;
		showDenyByCountryReport(false,true);
	} else {
		validateAdminDenyByCountryDataReportSearch();
	}
	
}

function callPdfReport()
{	
	if(validatePDFCount()){
	globalReportType = "pdf";
    var domainName = ""; 
     if(globalShowPopupWindow)
	  $('#myModal1').modal('show')  
	else{
	 $('#myModal1').modal('hide')	
	var reportType="pdf";
	var url="reportgen_getDenyByUserReport?reportType="+reportType+"&fileName=deny_by_user_report.pdf&reportColumns="+globalArrayUserSummaryColumn+"&domainName="+domainNameAdminLog+genAdminLogFilter;
	
	$('#country_name').val(getCountryNameId);
	$('#user_count').val(getFailureCountId);
	$('#request_time').val(getactivityTimeId);
	$('#user_logon_id').val(getUserLogonId);
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
	var url="reportgen_getDenyByUserReport?reportType="+reportType+"&fileName=deny_by_user_report.xml&reportColumns="+globalArrayUserSummaryColumn+"&domainName="+domainNameAdminLog+genAdminLogFilter;
	
	$('#country_name').val(getCountryNameId);
	$('#user_count').val(getFailureCountId);
	$('#request_time').val(getactivityTimeId);
	$('#user_logon_id').val(getUserLogonId);
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
	var url="reportgen_getDenyByUserReport?reportType="+reportType+"&fileName=deny_by_user_report.xlsx&reportColumns="+globalArrayUserSummaryColumn+"&domainName="+domainNameAdminLog+genAdminLogFilter;
	
	$('#country_name').val(getCountryNameId);
	$('#user_count').val(getFailureCountId);
	$('#request_time').val(getactivityTimeId);
	$('#user_logon_id').val(getUserLogonId);
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
{	 globalReportType = "csv";
	if(globalShowPopupWindow)
	$('#myModal1').modal('show')  
	else{
	$('#myModal1').modal('hide')
	var reportType="csv";
	var url="reportgen_getDenyByUserReport?reportType="+reportType+"&fileName=deny_by_user_report.csv&reportColumns="+globalArrayUserSummaryColumn+"&domainName="+domainNameAdminLog+genAdminLogFilter;
	
	$('#country_name').val(getCountryNameId);
	$('#user_count').val(getFailureCountId);
	$('#request_time').val(getactivityTimeId);
	$('#user_logon_id').val(getUserLogonId);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	 resetAllCheckbox();
		}
}







function exportAdminLogsReport()
{
 //alert("exportNeverUseAuthenticationReport");	
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
	
}


function searchDenyByCountryReport(e)
{  
	 if (e.keyCode === 13)   
		adminDenyByCountryDataReportSearch();
}




var globalAdminLogsReportExpendPreviouspageSize="";
var globalAdminLogsReportExpendPreviousPageNum="";
var failureAttemptsuserName="";
var failureAttemptsapplication="";
var failureAttemptsrequestTime="";
var failureAttemptsuserStatus="";
var failureAttemptsIpAddress = "";
 function showDenyByCountryExpendReport(val ,pageCall,isSearch)
	{
		 
		    if($("#pageId_failure").length)
		       {
			   globalAdminLogsReportExpendPreviouspageSize=$("#pageId_failure").val();
			   globalAdminLogsReportExpendPreviousPageNum=$("#pageNum_failure").val();
		        }
	 
	 
		        userData = val;
		        
		         var arrayUserFailure = val.split(",");
				 var userLogonId = arrayUserFailure[0];
				 var countryName = arrayUserFailure[1];
				 var fromDate = arrayUserFailure[2];
				 
				var domainName = document.getElementById("adminLogReportDomain").value;
				 
				   var from_date=$("#from_date").val();
				   var to_date=$("#to_date").val();
				   var myUrl="report_showDenyByUserfailureReportData.action?domainName="+domainName+"&userLogonId="+encodeURIComponent(userLogonId)+"&fromDate="+fromDate+"&countryName="+countryName;
				   var dataString="";
				
				if(pageCall)
				{
					//alert("in page call===");
				var size=document.getElementById('pageId_failure').value;
				var pageNumber=document.getElementById('pageNum_failure').value;
				myUrl+= "&fetchSize="+size+"&pageNumber="+pageNumber;
				
				}
				if(failureAttemptsuserName!="" || failureAttemptsapplication!="" || failureAttemptsrequestTime!="" || failureAttemptsIpAddress!="" || failureAttemptsuserStatus!="" ){
					isSearch=true;
				}
				
				 if(isSearch){
					 		failureAttemptsuserName=document.getElementById('failureAttemptsuserName').value;
							failureAttemptsapplication=document.getElementById('failureAttemptsapplication').value;
								failureAttemptsapplication = failureAttemptsapplication.replace(/\s/g, "");
							failureAttemptsrequestTime=document.getElementById('failureAttemptsrequestTime').value;
							failureAttemptsuserStatus=document.getElementById('failureAttemptsuserStatus').value;
								failureAttemptsuserStatus = failureAttemptsuserStatus.replace(/\s/g, "");
							failureAttemptsIpAddress = document.getElementById('failureAttemptsIpAddress').value;
								failureAttemptsIpAddress = failureAttemptsIpAddress.replace(/\s/g, "");
							//myUrl+="&userName="+failureAttemptsuserName+"&application="+failureAttemptsapplication+"&requestTime="+failureAttemptsrequestTime+"&userStatus="+failureAttemptsuserStatus+"&ip="+failureAttemptsIpAddress;
							dataString+="&userName="+failureAttemptsuserName+"&application="+failureAttemptsapplication+"&requestTime="+failureAttemptsrequestTime+"&userStatus="+failureAttemptsuserStatus+"&ip="+failureAttemptsIpAddress;
							if(myUrl.indexOf('fetchSize')==-1) 
					        	     { if($.trim(globalAdminLogsReportExpendPreviouspageSize)!='')
					           	       myUrl+="&fetchSize="+globalAdminLogsReportExpendPreviouspageSize; 
					        	     }
	 
	                       }
			 	 genDenyByUserReportAssFilter = "&"+myUrl.split("?")[1];			
			 							  
				$('#block_deny_country_report_expend_container').show();
				$('#block_deny_country_report_expend_container').html('<span>Loading...</span>');
				 
				//alert("myUrl==="+myUrl);
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
						var obj=JSON.parse(object.userFailureAttemptsList);
						var obj1=JSON.parse(object.count);
						 
						 
		                 if(searchFailureAttemptsWithpageSize){
		                	 searchCount = obj1;
		                	 countDenyByUserFailureReportPage=obj1;
		                	// obj1=countDenyByUserFailureReportPage;
		                 } else {
		                	 countDenyByUserFailureReportPage=obj1;
		                	 searchCount = obj1;
		                 }
					   		              
						associateUserList=JSON.parse(object.userFailureAttemptsList);
						 
						var content = ' <span class="close_icon close_table"><a href="javascript:void(0);"><i class="icon-remove-sign"></i></a></span><h4> Failure Attempts </h4>';
						content += '<div class="row-fluid">';
						content += '<div  class="span6">';
							content += '<div class="pull-left" id="switch_app">';
							content += '<label>Size</label>';
							content += '<select id="pageId_failure" onChange="fetchFailureSize(),getPageFailureData();"  name="deassociationReasonListName" style="width:100%;">';
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
							content += '</select>';
				
							content += '</div>';
							content += '</div>';
							content += '<div class="span6">';
							content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
							content += '<label>Page Number</label>';
							/*content += '<select id="pageNum_failure" onChange="getPageFailureData()" >';
							content += '<option value="">-select Page-</option>';
							content += '</select>';*/
							content += ' <input type="text" id="pageNum_failure" style="width:20%;background-color:white;" onChange="getPageFailureData()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_failure"></span>';
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
									content += '<th>IP Address</th>';
									content += '<th>status</th>';
								content += '</tr>';
	 	                        content += '<tr>';
								content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="failureAttempts_tabSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
								content += '<th><input type="text"  onkeydown="searchUsersummaryFailureReport(event)" id="failureAttemptsuserName" /></th>';
								content += '<th><input type="text"  onkeydown="searchUsersummaryFailureReport(event)" id="failureAttemptsapplication" /></th>';
								content += '<th><input type="text"  onkeydown="searchUsersummaryFailureReport(event)" id="failureAttemptsrequestTime" /></th>';
								content += '<th><input type="text"  onkeydown="searchUsersummaryFailureReport(event)" id="failureAttemptsIpAddress" /></th>';
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
									content += "<td>"+v.ipAddress+"</td>";
									content += "<td>"+v.status+"</td>";
								content += "</tr>";
							});
							}
								else
									{
									content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";	
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
		                    content+="<input type='hidden' name='userName' id='userName_associate'/>";
		                    content+="<input type='hidden' name='application' id='application_associate'/>";
		                    content+="<input type='hidden' name='requestTime' id='requestTime_associate'/>";
		                    content+="<input type='hidden' name='userStatus' id='userStatus_associate'/>";
		                    content+="<input type='hidden' name='ip' id='ip_associate'/>";
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
							 
							$('#block_deny_country_report_expend_container').html(content);
							
							$('#failureAttemptsuserName').val(failureAttemptsuserName);
							$('#failureAttemptsapplication').val(failureAttemptsapplication);
							$('#failureAttemptsrequestTime').val(failureAttemptsrequestTime);
							$('#failureAttemptsIpAddress').val(failureAttemptsIpAddress);
							$('#failureAttemptsuserStatus').val(failureAttemptsuserStatus)
							
							$("#failureAttemptsrequestTime" ).datepicker({ dateFormat: "yy-mm-dd" }).val();
					 
							  if($.trim(globalAdminLogsReportExpendPreviouspageSize) != '')
						      {  $("#pageId_failure").val(globalAdminLogsReportExpendPreviouspageSize);
						           fetchFailureSize();
						          if(!searchFailureAttemptsWithpageSize)
						        	  $("#pageNum_failure").val(globalAdminLogsReportExpendPreviousPageNum);
						          else {
						        	  if(globalAdminLogsReportExpendPreviousPageNum==0 && parseInt($('#pageN_failure').text()) > 0)
						        		  globalAdminLogsReportExpendPreviousPageNum="1";
						        	  $("#pageNum_failure").val(globalAdminLogsReportExpendPreviousPageNum);
						          }
						       }
							  
							  
							  if(pageCall==false){
								  var size = 10;
									if (globalAdminLogsReportExpendPreviouspageSize != '') {
										size = parseInt(globalAdminLogsReportExpendPreviouspageSize);
										countDenyByUserFailureReportPage = searchCount;
									}
									
									if(failureAttemptsuserName!="" || failureAttemptsapplication!="" || failureAttemptsrequestTime!="" || failureAttemptsIpAddress!="" || failureAttemptsuserStatus!="" ){
										countDenyByUserFailureReportPage = searchCount;
									}
									if(countDenyByUserFailureReportPage == 0){
										countDenyByUserFailureReportPage = searchCount;
									}
									var maxPgaeNumber = countDenyByUserFailureReportPage / size;
									var rem = countDenyByUserFailureReportPage % size;
									if (rem > 0) {
										maxPgaeNumber = maxPgaeNumber + 1;
									}
									$('#pageN_failure').html(parseInt(maxPgaeNumber));
									if(countDenyByUserFailureReportPage == 0)
										$('#pageNum_failure').val(0);
									else 
										$('#pageNum_failure').val(1);
								}
							  if(failureAttemptsuserName=="" && failureAttemptsapplication=="" && failureAttemptsrequestTime=="" && failureAttemptsIpAddress=="" && failureAttemptsuserStatus=="" ){
								  searchFailureAttemptsWithpageSize=false;
							   }
			 	
							
							
					}
				
				});
		
			}
 
 function validateAdminDenyByCountryDataReportSearch(){
	 var userLogonId = $('#getUserLogonId').val();
	 if(userLogonId != undefined && userLogonId!= ""){
		 userLogonId = userLogonId.replace(/\s/g, " ");
			var user = userLogonId.split(',');
			var len  = user.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#getUserLogonId').val("");
				return false;
			}
	 }
	 return true;
 }

 function searchUsersummaryFailureReport(e)
 {  
 	 if (e.keyCode === 13)   
 		failureAttempts_tabSearch();
 }


 function failureAttempts_tabSearch()
 {
 	 searchFailureAttemptsWithpageSize=true;
 	showDenyByCountryExpendReport(userData,false,true);
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

 

 function callPdfReport_Ass()
 {	
  if(validatePDFCount()){
 	globalReportType = "pdf";
 	
 	if(globalShowPopupWindow)
 		  $('#myModal12').modal('show')  
 		else{
 		$('#myModal12').modal('hide')
 	var reportType="pdf";
 	var url="reportgen_denyByUserFailureReport?reportType="+reportType+"&fileName=deny_by_user_user_report.pdf&reportColumns="+globalArrayUserSummaryColumn+genDenyByUserReportAssFilter;
 	$('#userName_associate').val(failureAttemptsuserName);
 	$('#application_associate').val(failureAttemptsapplication);
 	$('#requestTime_associate').val(failureAttemptsrequestTime);
 	$('#userStatus_associate').val(failureAttemptsuserStatus);
	$('#ip_associate').val(failureAttemptsIpAddress);
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
 	var url="reportgen_denyByUserFailureReport?reportType="+reportType+"&fileName=deny_by_user_user_report.xml&reportColumns="+globalArrayUserSummaryColumn+genDenyByUserReportAssFilter;
 	$('#userName_associate').val(failureAttemptsuserName);
 	$('#application_associate').val(failureAttemptsapplication);
 	$('#requestTime_associate').val(failureAttemptsrequestTime);
 	$('#userStatus_associate').val(failureAttemptsuserStatus);
	$('#ip_associate').val(failureAttemptsIpAddress);
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
 	var url="reportgen_denyByUserFailureReport?reportType="+reportType+"&fileName=deny_by_user_user_report.xlsx&reportColumns="+globalArrayUserSummaryColumn+genDenyByUserReportAssFilter;
 	
 	$('#userName_associate').val(failureAttemptsuserName);
 	$('#application_associate').val(failureAttemptsapplication);
 	$('#requestTime_associate').val(failureAttemptsrequestTime);
 	$('#userStatus_associate').val(failureAttemptsuserStatus);
	$('#ip_associate').val(failureAttemptsIpAddress);
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
 	var url="reportgen_denyByUserFailureReport?reportType="+reportType+"&fileName=deny_by_user_user_report.csv&reportColumns="+globalArrayUserSummaryColumn+genDenyByUserReportAssFilter;
 	$('#userName_associate').val(failureAttemptsuserName);
 	$('#application_associate').val(failureAttemptsapplication);
 	$('#requestTime_associate').val(failureAttemptsrequestTime);
 	$('#userStatus_associate').val(failureAttemptsuserStatus);
	$('#ip_associate').val(failureAttemptsIpAddress);
 	$('#reportForm_associate').attr("action",url);
 	$('#reportForm_associate').submit();
 	globalShowPopupWindow=true;
 	resetAllCheckboxAssociate();
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
