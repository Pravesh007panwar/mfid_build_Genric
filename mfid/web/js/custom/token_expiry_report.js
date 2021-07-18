function removeFilter(){
	$('#getUserLogonId').val("");
	$('#getAppNameId').val("");
	$('#getLeftDays').val("");
	$('#getExpiredOn').val("");
}

var tokenExpiryReportData;
 var globalShowPopupWindow = true;
 var globalArrayTokenExpiryColumn = '';
 var globalPersistTokenExpiryReportDomainValue='';
 var globalReportType='';
 var domainNameTokenExpiryLog='';
 var genTokenExpiryLogFilter ='';
 var searchTokenExpiryReportData = false;
 var from_date = getAddDaysToCurrentDate();
 var to_date = getCurrentDate();
 var global_from_date='';
 var global_to_date='';

var searchCount;
var countTokenExpiryReportPage;
var searchTokenExpiryReportWithpageSize=false;


function getPageData(){
	var domain = document.getElementById('tokenExpiryDomain').value;
	var size=document.getElementById('pageId').value;
	if($.trim(size)!='')  { 
	searchTokenExpiryReportWithpageSize = true;
	var totalPages =  $('#pageN').text();
	var pageNumber = document.getElementById('pageNum').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))	
		showTokenExpiryReport(true,false, domain);	
	else
		alert('Page should be less than or equal to page number.');
	}
}


function fetchSize(){
	 
	var size=document.getElementById('pageId').value;
 if($.trim(size)!='')  { 	
	var maxSize=countTokenExpiryReportPage;
	var maxPgaeNumber=maxSize/size;
	var rem=maxSize%size;
	if(rem > 0){
		maxPgaeNumber=maxPgaeNumber+1;
	}
	if(countTokenExpiryReportPage==0){
		$('#pageNum').val(0);
	} else {
		$('#pageNum').val(1);
		$('#pageNum').attr("disabled",false);
	} 				
	$('#pageN').html(parseInt(maxPgaeNumber));
	  
   } 
	   
	 
}

function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
	}
	
var globalTokenExpiryReportPreviouspageSize="";
var globalTokenExpiryReportPreviousPageNum="";
var getUserLogonId="";
var getAppNameId="";
var getLeftDays="";
var getExpiredOn="";
 function showTokenExpiryReport(pageCall,isSearch,domain) {
	 
	 if(typeof(pageCall) == 'undefined' && typeof(isSearch) == 'undefined' ) {
       try{ $("#pageId").val(''); $("#pageNum").val(''); }catch(err){}
	  }
	  try {
		 
           if($("#pageId").length) {
			   globalTokenExpiryReportPreviouspageSize=$("#pageId").val();
			   globalTokenExpiryReportPreviousPageNum=$("#pageNum").val();
		    }
           
          /* if(from_date.indexOf('/')!=-1){
        	   from_date=from_date.split("/")[2]+"-"+from_date.split("/")[1]+"-"+from_date.split("/")[0]+" 00:00:00";
    		   to_date=to_date.split("/")[2]+"-"+to_date.split("/")[1]+"-"+to_date.split("/")[0]+" 23:59:59";
    		}*/
    
           var domainId='';
		   try{
			    domainId=document.getElementById('tokenExpiryDomain').value;
	        }catch(err){}
		   var myUrl="report_showTokenExpiryReportData.action?fromDate="+from_date+"&toDate="+to_date;
		   var dataString="";
		if(pageCall==true){
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
		
		if(getUserLogonId!= "" ||  getAppNameId!= "" ||  getLeftDays!="" ||  getExpiredOn!=""){
			isSearch=true;
		}
		
		if(isSearch){
			  getUserLogonId=document.getElementById('getUserLogonId').value;
			  getAppNameId=document.getElementById('getAppNameId').value;
			  getLeftDays=document.getElementById('getLeftDays').value;
			  getExpiredOn=document.getElementById('getExpiredOn').value;
			 // myUrl+="&userLogonId="+getUserLogonId+"&appName="+getAppNameId+"&leftDays="+getLeftDays+"&expiredOn="+getExpiredOn;
			  dataString+="&userLogonId="+getUserLogonId+"&appName="+getAppNameId+"&leftDays="+getLeftDays+"&expiredOn="+getExpiredOn;
		}
		genTokenExpiryLogFilter = "&"+myUrl.split("?")[1];
        if(searchTokenExpiryReportWithpageSize) {  
	   	     if(myUrl.indexOf('fetchSize')==-1) { 
	   	    	 if($.trim(globalTokenExpiryReportPreviouspageSize)!='')
	   	    		 myUrl+="&fetchSize="+globalTokenExpiryReportPreviouspageSize; 
	   		   }
	        }
        	myUrl += "&domain="+domainId;
        	domainNameTokenExpiryLog = domainId;
        	
       
   	  $('#tab_bottom_box').html('<span>Loading...</span>');
		$.ajax({
			type: "POST",  
			url:myUrl,
			data : dataString,
		    async: true,
			dataType: "text",
			success: function(data) { 
		    if($.trim(data)=="sessionout")
				{
				alert("sessionout");
				var loginPage=document.getElementById('loginPage').value;
				window.location.replace(loginPage);
				}
				var object = JSON.parse(data);
				var obj1=JSON.parse(object.tokenExpiryReportData);
				var obj2=JSON.parse(object.count);
				var obj3=JSON.parse(object.domainList);
				tokenExpiryReportData = obj1;
                if(searchTokenExpiryReportWithpageSize) {
                	searchCount = obj2;
                	countTokenExpiryReportPage=obj2;
                	//obj2=countTokenExpiryReportPage; 
                } else {
                	countTokenExpiryReportPage=obj2;
                	searchCount = obj2;
                } 
                
                var content = '<h4></h4><div class="space15"></div>';
 				content += '<div class="row-fluid">';
 				content += '<div class="span3">';
 				content += '<label>Domain : </label>';
 				content += '<select id="tokenExpiryDomain" name="tokenExpiryDomain">';
 				content += '<option value="">Select Domain</option>';
 				jQuery.each(obj3, function(i, v) {
 				var tempDomainList=obj3[i];
 				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
 				});
 				content += '</select>';
 				content += '</div>';
 				content += '<div class="row-fluid">';
 				
 			/*	content += '<div class="span3 offset0">';
 				content += '<label>From : </label>';
 				content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>'; 
 				content += '</div>';

 				content += '<div class="span3 offset0">';
 				content += '<label>To : </label>';
 				content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>'; 
 				content += '</div>';*/
 				
 				content += '<div class="span3 offset0">';
 				content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="getTokenExpiryReportDatewise()" />';
 				content += '</div>';
 				content += '<div class="clear"></div>';
 				content += '</div>';
 				content += '<div class="space15"></div>';
 		 				
 				
				 content += '<div class="row-fluid ">';
				 content += '<div class="span6">';
				 content += '<div class="pull-left" id="switch_app">';
				 content += '<label>Size</label>';
				 content += '<select id="pageId" onChange="fetchSize(),getPageData();" name="pageId" style="width:100%;">';
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
				/* content += '<select onChange="getPageData()" id="pageNum"  >';
	             content += '<option value="">-select Page-</option>';
			     content += '</select>';*/
				 content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
				 content += '</div>';
			     content += '</div>';
			     content += '</div>';
			     content += '<table class="table table-striped table-bordered" id="sample_1_1">';
				 content += '<thead>';
				 content += '<tr>';
                 content += '<th>Sr.No.</th>'; 	
    			 content += '<th>UserLogonId</th>'; 
			 	 content += '<th>App Name</th>'; 
			 	 content += '<th>Left Days</th>'; 
			 	 content += '<th>Expired On</th>';
			 	 content += '</tr>';
			 	 content += '<tr>';
	             content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="tokenExpiryDataReportSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
		         content += '<th><input type="text" onkeydown="searchTokenExpiryReport(event)" id="getUserLogonId" /></th>';
	             content += '<th><input type="text" onkeydown="searchTokenExpiryReport(event)" id="getAppNameId" /></th>';
	             content += '<th><input type="text" onkeydown="searchTokenExpiryReport(event)" id="getLeftDays" /></th>';
	             content += '<th><input type="text" onkeydown="searchTokenExpiryReport(event)" id="getExpiredOn" /></th>';
				 content += '</tr>';
				 content += '</thead>';
				 	try{
						 if(obj1!=null && obj1!=''){
							 var counterSr=0;
						jQuery.each(obj1, function(i, v) {
							counterSr++;
							content += "<tr><td>"+counterSr+"</td><td>"+v.userLogonId+"</td><td>"+v.appName+"</td><td>"+v.leftDays+"</td><td>"+v.expiredOn+"</td></tr>";
					     });
					}
					else  
						content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";	
					}
					catch(e){
					}
					content += "</table>";
					content += '<div class="clearfix"></div>';
					content += '<div class="form-actions form-actions2">';
					content += '<div class="pull-left">';
				   $('#block_token_expiry_report_container').html(content);
				   
				   
				   if(tokenExpiryReportData!=null && tokenExpiryReportData!='')	{
					   content1="<div class='span4'><h4>Export options:</h4></div>";
		               content1+="<div class='span8' >";
		               content1+="<form method='post' id='reportForm'> ";
		               content1+="<input type='hidden' name='userLogonId' id='user_logon_id'/>";
		               content1+="<input type='hidden' name='appName' id='app_name'/>";
		               content1+="<input type='hidden' name='leftDays' id='left_days'/>";
		               content1+="<input type='hidden' name='expiredOn' id='expired_on'/>";
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
				else {
					  $('#expo_opt').html('');
				}
				   
				 
				 
		       if($.trim(globalTokenExpiryReportPreviouspageSize) != '') {
		    	   $("#pageId").val(globalTokenExpiryReportPreviouspageSize);
			           fetchSize(); 
			           if(!searchTokenExpiryReportWithpageSize)	
			        	   $("#pageNum").val(globalTokenExpiryReportPreviousPageNum);
			           else {
			        	   if(globalTokenExpiryReportPreviousPageNum==0 && parseInt($('#pageN').text())> 0)
			        		   globalTokenExpiryReportPreviousPageNum="1";
			        	   $("#pageNum").val(globalTokenExpiryReportPreviousPageNum);
			        	   
			           }
			    }
	          
		       	$('#getUserLogonId').val(getUserLogonId);
            	$('#getAppNameId').val(getAppNameId);
            	$('#getLeftDays').val(getLeftDays);
            	$('#getExpiredOn').val(getExpiredOn);
		       
	            /*if(searchTokenExpiryReportWithpageSize)	{
		            $('#getUserLogonId').val(getUserLogonId);
	             	$('#getAppNameId').val(getAppNameId);
	             	$('#getLeftDays').val(getLeftDays);
	             	$('#getExpiredOn').val(getExpiredOn);
	             	
             	try {
             		  if(searchTokenExpiryReportData)
            	      $("#pageNum").val('');
            	      searchTokenExpiryReportData = false;
             	} catch(err){}
            	}*/
	            if($.trim(globalPersistTokenExpiryReportDomainValue) != ''){ 
					 $("#tokenExpiryDomain").val(globalPersistTokenExpiryReportDomainValue);
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
		    		if (globalTokenExpiryReportPreviouspageSize != '') {
						size = parseInt(globalTokenExpiryReportPreviouspageSize);
						countTokenExpiryReportPage = searchCount;
					}
		    		if(getUserLogonId!= "" ||  getAppNameId!= "" ||  getLeftDays!="" ||  getExpiredOn!=""){
		    			countTokenExpiryReportPage = searchCount;
		    		}
		    		if(countTokenExpiryReportPage==0){
		    			countTokenExpiryReportPage = searchCount;
		    		}
					var maxPgaeNumber = countTokenExpiryReportPage / size;
					var rem = countTokenExpiryReportPage % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN').html(parseInt(maxPgaeNumber));
					if(countTokenExpiryReportPage == 0)
						$('#pageNum').val(0);
					else 
						$('#pageNum').val(1);
				}
		    	
		    	if(getUserLogonId== "" &&  getAppNameId== "" &&  getLeftDays=="" &&  getExpiredOn==""){
		    		searchTokenExpiryReportWithpageSize=false;
	    		}
			 
				
		  }
		});
	 }
	 catch(e)
	 {
		 alert(e);
	 }
		
	}
 
function tokenExpiryDataReportSearch() {
	if(validateTokenExpirySearch()){
		searchTokenExpiryReportWithpageSize=true;
		searchTokenExpiryReportData = true;
		var domain = document.getElementById('tokenExpiryDomain').value;
		showTokenExpiryReport(false,true,domain);
	} else{
		validateTokenExpirySearch();
	}
	
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
	var url="reportgen_getTokenExpiryReport?reportType="+reportType+"&fileName=token_expiry_report.pdf&reportColumns="+globalArrayTokenExpiryColumn+"&domain="+domainNameTokenExpiryLog+genTokenExpiryLogFilter;
	$('#user_logon_id').val(getUserLogonId);
	$('#app_name').val(getAppNameId);
	$('#left_days').val(getLeftDays);
	$('#expired_on').val(getExpiredOn);
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
	var url="reportgen_getTokenExpiryReport?reportType="+reportType+"&fileName=token_expiry_report.xml&reportColumns="+globalArrayTokenExpiryColumn+"&domain="+domainNameTokenExpiryLog+genTokenExpiryLogFilter;
	$('#user_logon_id').val(getUserLogonId);
	$('#app_name').val(getAppNameId);
	$('#left_days').val(getLeftDays);
	$('#expired_on').val(getExpiredOn);
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
	var url="reportgen_getTokenExpiryReport?reportType="+reportType+"&fileName=token_expiry_report.xlsx&reportColumns="+globalArrayTokenExpiryColumn+"&domain="+domainNameTokenExpiryLog+genTokenExpiryLogFilter;
	$('#user_logon_id').val(getUserLogonId);
	$('#app_name').val(getAppNameId);
	$('#left_days').val(getLeftDays);
	$('#expired_on').val(getExpiredOn);
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
	var url="reportgen_getTokenExpiryReport?reportType="+reportType+"&fileName=token_expiry_report.csv&reportColumns="+globalArrayTokenExpiryColumn+"&domain="+domainNameTokenExpiryLog+genTokenExpiryLogFilter;
	$('#user_logon_id').val(getUserLogonId);
	$('#app_name').val(getAppNameId);
	$('#left_days').val(getLeftDays);
	$('#expired_on').val(getExpiredOn);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	resetAllCheckbox();
   }
}


function exportTokenExpiryReport(){
 
	var arrayTokenExpiryColumn = $.map($('input[name="tokenExpirtyReportColumn"]:checked'), function(c){return c.value; })
	if(arrayTokenExpiryColumn == "" || $.trim(arrayTokenExpiryColumn) == ""){
		alert("Please Select at least one column for Export. ");
	} else{
		globalArrayTokenExpiryColumn = arrayTokenExpiryColumn; 
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


function searchTokenExpiryReport(e)
{  
	 if (e.keyCode === 13)   
		tokenExpiryDataReportSearch();
}


function getTokenExpiryReportDatewise(){
	var domain = document.getElementById("tokenExpiryDomain").value;
	if($.trim(domain) == ""){
		alert("Please select domain");
		return;
	} else{
		globalPersistTokenExpiryReportDomainValue = domain;
		from_date=$("#from_date").val();
		to_date=$("#to_date").val();
	/*	if(from_date==""||from_date==undefined||from_date==null){
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
		 
		 global_from_date=$("#from_date").val();
		 global_to_date=$("#to_date").val();
		
		 $("#pageId").val('');
		 $("#pageNum").val('');
		 showTokenExpiryReport(false,false,domain);
	}
}

function validateTokenExpirySearch(){
	 var getUserLogonId = $('#getUserLogonId').val();
	 if(getUserLogonId != undefined && getUserLogonId!= ""){
		 getUserLogonId = getUserLogonId.replace(/\s/g, " ");
			var userLogonId = getUserLogonId.split(',');
			var len  = userLogonId.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#getUserLogonId').val("");
				return false;
			}
	 }
	 var getAppNameId = $('#getAppNameId').val();
	 if(getAppNameId != undefined && getAppNameId!= ""){
		 getAppNameId = getAppNameId.replace(/\s/g, " ");
			var appName = getAppNameId.split(',');
			var len  = appName.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#getAppNameId').val("");
				return false;
			}
	 }
	 
	 var getLeftDays = $('#getLeftDays').val();
	 if(getLeftDays != undefined && getLeftDays!= ""){
		 getLeftDays = getLeftDays.replace(/\s/g, " ");
			var leftDays = getLeftDays.split(',');
			var len  = leftDays.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#getLeftDays').val("");
				return false;
			}
	 }
	 
	 var getExpiredOn = $('#getExpiredOn').val();
	 if(getExpiredOn != undefined && getExpiredOn!= ""){
		 getExpiredOn = getExpiredOn.replace(/\s/g, " ");
			var expiredOn = getExpiredOn.split(',');
			var len  = expiredOn.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#getExpiredOn').val("");
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


