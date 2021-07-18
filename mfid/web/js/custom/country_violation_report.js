
 var allAdminLogData;
 var globalShowPopupWindow = true;
 var globalArrayUserSummaryColumn = '';
 var globalReportType='';
 var domainNameAdminLog='';
 var genAdminLogFilter ='';
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



 

function showDenyByCountryRportFirstTime(){
   // alert("show ........ showDenyByCountryRportFirstTime");
	content = '<div class="row-fluid">';
	

     content += '<div class="span3 offset0">';
	 content += '<label>Domain : </label>';
	 content += '<select id="adminLogReportDomain" name="switchDomain"><option value="">-select domain-</option></select>'; 
	 content += '</div>';


		content += '<div class="span3 offset0">';
			content += '<label>From : </label>'; // start code for bug id #202 , added by abhimanyu
			content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>';
		content += '</div>';
	
		content += '<div class="span3 offset0">';
			content += '<label>To : </label>';
			content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>';
		content += '</div>';					// end code for bug id #202 , added by abhimanyu
		
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
}

var countAdminLogsReportPage;
var searchCount;
var searchDenyByCountryReportWithpageSize=false;


function getPageData(){
	
	var size=document.getElementById('pageId').value;
	var totalPages =  $('#pageN').text();
	var pageNumber=document.getElementById('pageNum').value;
	
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
	showDenyByCountryReport(true,false);
	else
		alert('Page should be less than or equal to page number.');
}


function fetchSize(){
	 
	var size=document.getElementById('pageId').value;
 if($.trim(size)!='')
    { 	
	var maxSize=countAdminLogsReportPage;
	
	var maxPgaeNumber=maxSize/size;
	var rem=maxSize%size;
	if(rem>0){
		maxPgaeNumber=maxPgaeNumber+1;
	}
	if(countAdminLogsReportPage==0){
		$('#pageNum').val(0);
	} else{
		$('#pageNum').val(1);
		$('#pageNum').attr("disabled",false);
	} 				
	$('#pageN').html(parseInt(maxPgaeNumber));
	
 /*   document.getElementById('pageNum').options.length = 1;
	 var page = document.getElementById('pageNum');
	var pageOpt = page.options;
	for(var i=1;i<maxPgaeNumber;i++){
	   pageOpt[pageOpt.length] = new Option(i,i);
	 }*/
   }else $('#pageNum').val(1); //document.getElementById('pageNum').options.length = 1;
	 
}

function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
	}
	
var globalAdminLogsReportPreviouspageSize="";
var globalAdminLogsReportPreviousPageNum="";
var getUserNameId="";
var getStatusId="";
var getCountryNameId="";
var getFailureCountId="";
var getactivityTimeId="";
 function showDenyByCountryReport(pageCall,isSearch)
	{
	 if(typeof(pageCall) == 'undefined' && typeof(isSearch) == 'undefined' )
	  {
       try{ $("#pageId").val(''); $("#pageNum").val(''); }catch(err){}
	  }
	  try{
		   var from_date=$("#from_date").val();
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
		   }
           if($("#pageId").length)
		       {
			   globalAdminLogsReportPreviouspageSize=$("#pageId").val();
			   globalAdminLogsReportPreviousPageNum=$("#pageNum").val();
		        }
           from_date=from_date.split("/")[2]+"-"+from_date.split("/")[1]+"-"+from_date.split("/")[0]+" 00:00:00";
		   to_date=to_date.split("/")[2]+"-"+to_date.split("/")[1]+"-"+to_date.split("/")[0]+" 23:59:59";
		   var domainId='';
		   try{
			    domainId=document.getElementById('adminLogReportDomain').value;
	        }catch(err){}
		   var myUrl="report_showCountryViolationReportData.action?fromDate="+from_date+"&toDate="+to_date;
		   var dataString="";
		   
		if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
		
		if(isSearch){
			getUserNameId=document.getElementById('getUserNameId').value;
			//getUserNameId = getUserNameId.replace(/\s/g, "");
			
			getCountryNameId=document.getElementById('getCountryNameId').value;
			getStatusId=document.getElementById('getStatusId').value;
			//	getCountryNameId = getCountryNameId.replace(/\s/g, "");
			getFailureCountId=document.getElementById('getFailureCountId').value;
				getFailureCountId = getFailureCountId.replace(/\s/g, "");
			getactivityTimeId=document.getElementById('getactivityTimeId').value;
			
			//myUrl+="&countryName="+getCountryNameId+"&count="+getFailureCountId+"&requestTime="+getactivityTimeId;
			dataString+="&countryName="+$.trim(getCountryNameId)+"&ip="+$.trim(getFailureCountId)+"&requestTime="+$.trim(getactivityTimeId)+"&userName="+encodeURIComponent($.trim(getUserNameId))+"&status="+getStatusId;
		}
		genAdminLogFilter = "&"+myUrl.split("?")[1];
        if(searchDenyByCountryReportWithpageSize)
		      {  
	   	     if(myUrl.indexOf('fetchSize')==-1)
	   		   { if($.trim(globalAdminLogsReportPreviouspageSize)!='')
	   			myUrl+="&fetchSize="+globalAdminLogsReportPreviouspageSize; 
	   		   }
	        }
        myUrl += "&domain="+domainId;
        domainNameAdminLog = domainId;
        
  //alert("myUrl = "+myUrl );
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
				alert("Session TimeOut...");
				var testVal=document.getElementById('loginPage').value;
				window.location.replace(testVal);
				}
				var object = JSON.parse(data);
				var obj1=JSON.parse(object.countryViolationReportData);
				var obj2=JSON.parse(object.count);
				var obj3=JSON.parse(object.domainList);
				allAdminLogData = obj1;
                if(searchDenyByCountryReportWithpageSize){
                	searchCount = obj2;
                	 obj2=countAdminLogsReportPage;
                } else {
                	countAdminLogsReportPage=obj2;
                	searchCount = obj2;
                }
		 	  
 				 var domainContent='<option value="" >-select domain-</option>';
 				jQuery.each(obj3, function(i, v) {
 					domainContent += '<option value="'+obj3[i]+'" >'+obj3[i]+'</option>';
 				});
 				
				 var content = '<h4>User</h4><div class="space15"></div>';
				 
				var content = '<div class="row-fluid ">';
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
					content += '<div class="pull-right" id="switch_app"  style="margin-right:-20%;">';
					content += '<label>Page Number</label>';
			/*		content += '<select onChange="getPageData()" id="pageNum"  >';
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
				            	content += '<th>UserLogonId</th>'; 
				    			content += '<th>Country Name</th>'; 
							 	content += '<th>IP</th>'; 
							 	content += '<th>Violation Date</th>';
							 //	content += '<th>Action</th>';
							 	content += '<th>Status</th>';
							 	content += '</tr>';
							 	content += '<tr>';
					    content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="adminCountryViolationDataReportSearch()" ><i style="font-size:20px;" class="icon-search"></i></a></th>';
					    content += '<th><input type="text" onkeydown="searchDenyByCountryReport(event)" id="getUserNameId" /></th>';
					    content += '<th><input type="text" onkeydown="searchDenyByCountryReport(event)" id="getCountryNameId" /></th>';
					    content += '<th><input type="text" onkeydown="searchDenyByCountryReport(event)" id="getFailureCountId" /></th>';
						content += '<th><input type="text" onkeydown="searchDenyByCountryReport(event)" id="getactivityTimeId" /></th>';
					//	content += '<th></th>';
						content += '<th> <select id="getStatusId"><option value="">Select Status</option><option value="Un-Process">Un-Process</option><option value="Process">Process</option></select> </th>';
						 
						content += '</tr>';
					    content += '</thead>';
					    
					    
					try{
						 if(obj1!=null && obj1!=''){
							 var counterSr=0;
						jQuery.each(obj1, function(i, v) {
							counterSr++;
							content += "<tr><td>"+counterSr+"</td><td>"+v.username+"</td><td>"+v.countryName+"</td><td>"+v.ip+"</td><td>"+v.requestTime+"</td>";
							
					//	if(v.status == 'Un-Process')
							{  
							/*    if(v.countryName == 'Unknown Network')
							      content += "<td> <a class='edit' onclick='showModelAddIpRange(\""+v.username+"\",\""+v.logReportId+"\");' href='#'>Add Ip range</td>";
								else
								  content += "<td> <a class='Apply' onclick='showModelAddCountry(\""+v.username+"\",\""+v.logReportId+"\");' href='#'>Apply </a> | <a class='Deny' onclick='denyPolicy(\""+v.username+"\",\""+v.logReportId+"\",\""+v.ip+"\");' href='#'> Deny</a></td>"; 
								*/
							    content += "<td>"+v.status+"</td></tr>";
							
							
							}
		/*					else
								{
								
								    if(v.countryName == 'Unknown Network')
								         content += "<td>  <strike> Add Ip range  |  Deny  </strike> </td>"; 
									else
									     content += "<td>  <strike> Apply Policy  |  Deny </strike></td>"; 
									
								         content += "<td>"+v.status+"</td></tr>";
								
								
								
								}*/
					 });
						}
						else  
							content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";	
					
					
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
		               content1+="<input type='hidden' name='userName' id='user_name'/>";
		               content1+="<input type='hidden' name='countryName' id='country_name'/>";
		               content1+="<input type='hidden' name='status' id='status_id'/>";
		               content1+="<input type='hidden' name='ip' id='failure_count'/>";
		               content1+="<input type='hidden' name='requestTime' id='request_time'/>";
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
				   
			 
	            if($.trim(globalAdminLogsReportPreviouspageSize) != '')
			      {  $("#pageId").val(globalAdminLogsReportPreviouspageSize);
			           fetchSize(); 
			         if(!searchDenyByCountryReportWithpageSize)
			         $("#pageNum").val(globalAdminLogsReportPreviousPageNum);
			      }
	            if(!searchDenyByCountryReportWithpageSize)
	            {$('#adminLogReportDomain').html(domainContent);				   
	             $('#adminLogReportDomain').val(domainId);
	             }  
				 searchDenyByCountryReportWithpageSize=false;
				 $("#getactivityTimeId").datepicker({ dateFormat: "yy-mm-dd" }).val();
				 
				 if(pageCall==false){
						var maxPgaeNumber = countAdminLogsReportPage / 10;
						var rem = countAdminLogsReportPage % 10;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						$('#pageN').html(parseInt(maxPgaeNumber));
						if(countAdminLogsReportPage == 0)
							$('#pageNum').val(0);
						else 
							$('#pageNum').val(1);
					}
				
		  }
		});
	 }
	 catch(e)
	 {
		 alert(e);
	 }
		
	}
 
 
 
function adminCountryViolationDataReportSearch() {
	searchDenyByCountryReportWithpageSize=true;
	showDenyByCountryReport(false,true);
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
	var url="reportgen_getCountryViolationDataReport?reportType="+reportType+"&fileName=country_violation_report.pdf&reportColumns="+globalArrayUserSummaryColumn+"&domainName="+domainNameAdminLog+genAdminLogFilter;
	$('#user_name').val(getUserNameId);
	$('#country_name').val(getCountryNameId);
	$('#status_id').val(getStatusId);
	$('#failure_count').val(getFailureCountId);
	$('#request_time').val(getactivityTimeId);
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
	var url="reportgen_getCountryViolationDataReport?reportType="+reportType+"&fileName=country_violation_report.xml&reportColumns="+globalArrayUserSummaryColumn+"&domainName="+domainNameAdminLog+genAdminLogFilter;
	$('#user_name').val(getUserNameId);
	$('#country_name').val(getCountryNameId);
	$('#status_id').val(getStatusId);
	$('#failure_count').val(getFailureCountId);
	$('#request_time').val(getactivityTimeId);
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
	var url="reportgen_getCountryViolationDataReport?reportType="+reportType+"&fileName=country_violation_report.xlsx&reportColumns="+globalArrayUserSummaryColumn+"&domainName="+domainNameAdminLog+genAdminLogFilter;
	$('#user_name').val(getUserNameId);
	$('#country_name').val(getCountryNameId);
	$('#status_id').val(getStatusId);
	$('#failure_count').val(getFailureCountId);
	$('#request_time').val(getactivityTimeId);
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
	var url="reportgen_getCountryViolationDataReport?reportType="+reportType+"&fileName=country_violation_report.csv&reportColumns="+globalArrayUserSummaryColumn+"&domainName="+domainNameAdminLog+genAdminLogFilter;
	$('#user_name').val(getUserNameId);
	$('#country_name').val(getCountryNameId);
	$('#status_id').val(getStatusId);
	$('#failure_count').val(getFailureCountId);
	$('#request_time').val(getactivityTimeId);
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
		adminCountryViolationDataReportSearch();
}

function showModelAddIpRange(userLogonId,logId)
{
	$('#policyFormdivId1').show();
    $('#policyFormdivId2').hide();
    $('#countrycode_1').val('');
    $("#to_date_1_1").val(getAddDaysToCurrentDateTime());
	$("#from_date_1_1").val(getCurrentDateTime());
    $('#selectLogsId').val(logId);
	$('#selectCountryPolicyUser').val(userLogonId);
	$('#myModalAddIpRange').modal('show');
return false;
}

function showModelAddCountry(userLogonId,logId)
{
	
	$('#selectLogsId').val(logId);
	$('#selectCountryPolicyUser').val(userLogonId);
$('#myModalAddCountry').modal('show');

return false;
}

function denyPolicy(username,logId,ip)
{
 var dataString="logId="+logId+"&userLogonId="+encodeURIComponent(username)+"&ip="+ip;

$.ajax({
	type: "POST",
	url: "policy_denyUserCountryPolicyRequest.action",
	dataType: "text",
	data: dataString,
	async: false,
	success: function(response){
		//alert(response);
		if($.trim(response)=="sessionout"){
			
			testVal= document.getElementById('loginPage').value				
			window.location.replace(testVal);
		}
		if($.trim(response)=="success"){
			
			alert(response);
			adminCountryViolationDataReportSearch();
			return;
		}
		 
	

	}
});



 

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
	// alert("showCountryList ")
	try{
		var allCountryCode= document.getElementById('allCountryCode').value;
		var arr=allCountryCode.split(',');
				document.getElementById(id).options.length = 0;
				var sel = document.getElementById(id);
				//	alert(listData.length);
				var option = '';
				for(var i = 0; i < arr.length; i++) {
					var opt = sel.options;
					if(multi!='true' && i == 0){
						opt[opt.length] = new Option('-select country codes-','');
					}
					opt[opt.length] = new Option(arr[i],arr[i]);
				
					//$('#domain').append('<option value="'+listId[i]+'">'+listData[i]+'</option>').multiselect('rebuild');
					//option +='<option></option>';
				}
			}


	catch(e){

	}
}


function save1()
{
	$("#countrycode").val($("#countrycode_1").val());
	$("#from_date_1").val($("#from_date_1_1").val());
	$("#to_date_1").val($("#to_date_1_1").val());
	save();
}

function save()
{
	 
	var res="";
	var dataString="";
	var response="";
	var date1="";
	var date2="";
	
	try{    var selectLogsId = $("#selectLogsId").val();
			var countryCode=$("#countrycode").val();
			var strutsToken=$('[name=csrfPreventionSalt]').val(); 
			
			var selectUserSearchId=$('#selectCountryPolicyUser').val();
			//alert("selectUserSearchId===="+selectUserSearchId);
			date1=document.getElementById("from_date_1").value;
			date2=document.getElementById("to_date_1").value;
			
			//alert("getCurrentDate()===="+getCurrentDate())
			if(countryCode==""||countryCode==undefined||countryCode==null){
				 alert("Please select country");
				 return;
			 }
			
				if(countryCode.length > maximumCountriesAllowed){
					alert("You can only have a maximum of "+maximumCountriesAllowed+" allowed countries at any given time. Please check your list of allowed countries and try again.");
					 return;
				}
				if(date2==""||date2==undefined||date2==null){
					 alert("Please select the Start Date & Time");
					 return;
				 }
				
				if(date2==""||date2==undefined||date2==null){
					 alert("Please select End Date & Time");
					 return;
				 }
				
				if(new Date(date1) >= new Date(date2)){
					 alert("End Date & Time cannot be lesser than Start Date & Time. Please review and try again.");
					 return;
				 }
				if (new Date(from_date) < new Date(getPreviousDate(1))){
		    		alert("Start date & time should be only 1 day less from current date & time.");
		    		 return false;
		    	}
				
				 
					 dataString='countryCode='+countryCode+"&date1="+$.trim(date1)+"&date2="+$.trim(date2)+"&userLogonId="+encodeURIComponent(selectUserSearchId)+"&csrfPreventionSalt="+strutsToken+"&logId="+selectLogsId;
			 
		
		if (confirm('Are you sure you would like to add the selected countries to your allowed list of countries ?')) {
			$.ajax({
				type: "POST",
				url: "policy_createUserCountryPolicy.action",
				dataType: "text",
				data: dataString,
				async: false,
				success: function(response){
					//alert(response);
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					if($.trim(response)=="exist"){
						
						alert("Policy already exist");
						return;
					}
					else
						{
						alert(response);
						 $("#countrycode").val( '' );
						 $("#countrycode").multiselect( 'clearSelection' );
						$('#myModalAddCountry').modal('hide');
						$('#myModalAddIpRange').modal('hide');
						adminCountryViolationDataReportSearch();
						
						}
					res=response;
				

				}
			});
		}
		}catch(e){alert(e);}
		return res;
			
}






function addIpAddress()
{
var res = "";
var country="";
var countryListId="";
 country=$("#countrycode1").val();
 var selectLogsId = $("#selectLogsId").val();
var ipRange1=  document.getElementById("ipRange1").value;
var ipRange2=  document.getElementById("ipRange2").value;
//var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
var strutsToken=$('[name=csrfPreventionSalt]').val(); 

if(country=="" && countryListId==""){
	alert("Please select country");
	return;
}

if(ipRange1==""){
	alert("Please enter first ip");
	return;
}

//if(!ipRange1.match(ipformat)){
//	 alert("You have entered an invalid first ip address");
//	 return;
//}

if(ipRange2==""){
	alert("Please enter second ip");
	return;
}
//if(!ipRange2.match(ipformat)){
//alert("You have entered an invalid second ip address");
//return;
//}

var result = CompareIP(ipRange1,ipRange2);
	
if(result==false)
{
  alert("From IP exceeds to IP");
  return;
}

try{
	var myUrl="policy_addCountryIPRange.action?countryName="+country+"&startIpRange="+ipRange1+"&endIpRange="+ipRange2+"&csrfPreventionSalt="+strutsToken+"&geoIpListId="+countryListId+"&logId="+selectLogsId;
$.ajax({
	type:"POST",
	url:myUrl,
	async:true,
	dataType:"text",
	success:function(data)
	{ 
		 if($.trim(data)=="sessionout"){
				alert(data);
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
		 if($.trim(data)=="success"){
			// alert(data);
			    res=data;
			 
			 
			 document.getElementById("ipRange1").value="";
			 document.getElementById("ipRange2").value="";
			 document.getElementById("countrycode1").value = "";
			 $('#policyFormdivId1').hide();
			 $('#policyFormdivId2').show();
			
			// $('#myModalAddIpRange').modal('hide');
				//adminCountryViolationDataReportSearch();
			//	$('#myModalAddCountry').modal('show');
			 
				
		 }
		 else{
		   alert(data);
		  
		 }
		
		
	}

});
return res;
}
catch(e)
{
alert(e);
}

}


function CompareIP(ipRange1,ipRange2)
{
	
  var from = ipRange1;
  var to = ipRange2;
  var fromArr = from.split(".");
  var toArr = to.split(".");
  for(i=0;i<4;i++)
  {
    if(parseInt($.trim(fromArr[i])) > parseInt($.trim(toArr[i])))
       return false;
  }
  return true;
}


function getAddDaysToCurrentDateTime()
{
    var d = new Date();
    d.setDate(d.getDate() + 7);
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+' 23:59';
    return output;
    
}


function getCurrentDateTime()
{

    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    //var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+' 00:00';
    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+ ' '+d.getHours() +':00';
    
    return output;
  }

