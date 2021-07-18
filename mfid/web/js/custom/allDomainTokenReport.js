function removeFilter(){
	$("#authtype").val("");
	$("#tokenSerial").val("");
	$("#appName").val("");
	$('#domain').val("");
	$('#tokenStatus').val("");
}

var selectedDomain;
var count;
var searchCount;
var tokenDetailList;
var searchAllDomainTokenReportForAll=false;
var globalShowPopupWindow = true;
var globalArrayUserSummaryColumn = '';
var globalReportType='';
var genAllDomainTokenFilter="";
function openTokenDetail() {
	
	$('#user_detail_athentication_data').hide(300);
	$('#block_token_detail_data').html('<span>Loading...</span>');
	$.ajax({
				type : "POST",
				url : "report_getAllDomainTokenDetailReport.action",
				dataType : "text",
				success : function(data) {
					 if($.trim(data)=="sessionout"){
							
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
					var obj = JSON.parse(data);
					var obj1 = JSON.parse(obj.reportList);
					var content = '<div class="space15"></div>';
					content += '<table class="table table-striped table-bordered" id="sample_4">';
					content += '<thead>';
					content += '<tr>';
					content += '<th>Domain</th>';
					content += '<th>Heading</th>';
					content += '<th>HT</th>';
					content += '<th>BT</th>';
					content += '<th>MT</th>';
					content += '<th>PT</th>';
					content += '</tr>';
					content += '</thead>';

					if (obj1 != null && obj1 != '') {
						jQuery.each(
										obj1,
										function(ind, val) {

											content += "<tr>";
											content += "<td rowspan='3'>"
													+ val.domainName + "</td>";
											content += "<td><a class='total_td' data="
													+ val.domainName
													+ " href='javascript:void(0);' >Total</a></td>";
											content += "<td>" + val.totalHt
													+ "</td>";
											content += "<td>" + val.totalSt
													+ "</td>";
											content += "<td>" + val.totalMt
													+ "</td>";
											content += "<td>" + val.totalPt
													+ "</td>";
											content += "</tr>";
											content += "<tr>";
											content += "<td>Assigned</td>";
											content += "<td>"
													+ val.usedHardTokens
													+ "</td>";
											content += "<td>"
													+ val.usedSoftTokens
													+ "</td>";
											content += "<td>"
													+ val.usedMobileTokens
													+ "</td>";
											content += "<td>"
													+ val.usedPushTokens
													+ "</td>";
											content += "</tr>";
											content += "<tr>";
											content += "<td>Free</td>";
											content += "<td>"
													+ val.freeHardTokens
													+ "</td>";
											content += "<td>"
													+ val.freeSoftTokens
													+ "</td>";
											content += "<td>"
													+ val.freeMobileTokens
													+ "</td>";
											content += "<td>"
													+ val.freePushTokens
													+ "</td>";
											content += "</tr>";
											
										});

					} else {
						content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
					}
					content += "</table>";
					$('#block_token_detail_data').html(content);
					$("#sample_4").css("width", "100%");

				}

			});
}


var globalAllDomainTokenReportPreviouspageSize="";
var globalAllDomainTokenReportPreviousPageNum="";

var domainName = '';
var tokenStatus = '';
var authtype = '';
var tokenSerial = '';
var appName = '';

function athenticationDetail_tab(val, isFilter, pagecall, pageSearch) {
   	selectedDomain = val;
	try {

		   if($("#pageId_assign").length) {
			   globalAllDomainTokenReportPreviouspageSize=$("#pageId_assign").val();
			   globalAllDomainTokenReportPreviousPageNum=$("#pageNum_assign").val();
		   }

		
		$('#user_detail_athentication_data').show();
		var myUrl = "report_getSelectedDomainTokenDetailReport.action?domain="
				+ val;
		var dataString='';
		if (pagecall) {
			
			var size = document.getElementById('pageId_assign').value;
			var pageNumber = document.getElementById('pageNum_assign').value;
			myUrl += "&fetchSize=" + size + "&pageNumber=" + pageNumber;
		}
		if(domainName!="" || tokenStatus!="" || authtype!="" || tokenSerial!="" || appName!=""){
			pageSearch=true;
		}
		if (pageSearch) {
			domainName = document.getElementById("domain").value;
			tokenStatus = document.getElementById('tokenStatus').value;
			authtype = document.getElementById('authtype').value;
			tokenSerial = document.getElementById('tokenSerial').value;
			appName = document.getElementById('appName').value;
			/*myUrl += "&domainName=" + domainName + "&tokenStatus="
					+ tokenStatus + "&authtype=" + $.trim(authtype)
					+ "&tokenSerial=" + tokenSerial + "&appName=" + appName;*/
			
			dataString += "&domainName=" + domainName + "&tokenStatus="
			+ tokenStatus + "&authtype=" + $.trim(authtype)
			+ "&tokenSerial=" + tokenSerial + "&appName=" + appName;
			
			//genAllDomainTokenFilter = "&"+myUrl.split("?")[1];
		}
		if(searchAllDomainTokenReportForAll)  {  
	   	     if(myUrl.indexOf('fetchSize')==-1)  { 
	   	    	 if($.trim(globalAllDomainTokenReportPreviouspageSize)!='')
	   	    		 myUrl+="&fetchSize="+globalAllDomainTokenReportPreviouspageSize; 
	   		   }
	        }
		   

	} catch (e) {
		alert(e);
		
	}
	
		$.ajax({
				type : "POST",
				url : myUrl,
				data : dataString,
				dataType : "text",
				success : function(data) {
					
					 if($.trim(data)=="sessionout"){
							
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
					try {
						var obj = JSON.parse(data);
						var obj1 = JSON.parse(obj.reportList);
						tokenDetailList=JSON.parse(obj.reportList);
				
						var obj2 = JSON.parse(obj.count);
				  
				          if(searchAllDomainTokenReportForAll) {
				        	  searchCount = obj2;
				        	 // obj2=count;
				        	  count = obj2;
				           } else {
				        	   count = obj2;
				        	   searchCount = obj2;
				          }
				 		
					} catch (e) {
						alert(e);
					}

					
					var content = ' <span class="close_icon close_table" onclick="hideDiv(this)"><a href="javascript:void(0);"><i class="icon-remove-sign"></i></a></span><h4>Authentication Detail Type</h4>';
				
					content += '<div class="row-fluid">';
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
					/*content += '<select onChange="getPageData_assignDeasign()" id="pageNum_assign"  >';
					content += '<option value="">-select Page-</option>';
					content += '</select>';*/
					content += ' <input type="text" id="pageNum_assign" style="width:20%;background-color:white;" onChange="getPageData_assignDeasign()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_assign"></span>';
					content += '</div>';
					content += '</div>';
					content += '</div>';
					content += '<table class="table table-striped table-bordered" id="sample_5">';
					content += '<thead>';
					content += '<tr>';
					content += '<th>Sr No.</th>';
					content += '<th>License Key</th>';
					content += '<th>Token Type</th>';
					content += '<th>Domain</th>';
					content += '<th>Application</th>';
					content += '<th>UserName/Token Status</th>';
					content += '</tr>';
					content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="search_data()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					content += '<th><input type="text"  onkeydown="searchAllDomainTokenReport(event)" id="tokenSerial" /></th>';
					content += '<th>';
					content += '<select class="ass-dss-select span12" name="authtype" id="authtype" >';
					content += '<option value="all">All</option>';
					content += '<option value="hardToken">Hard Token</option>';
					content += '<option value="bioToken">Bio Token</option>';
					content += '<option value="mobileToken">Mobile Token</option>';
					content += '<option value="pushToken">Push Token</option>';

					content += '</select>';
					content += '</th>';
					content += '<th><input type="text"  onkeydown="searchAllDomainTokenReport(event)" id="domain" /></th>';
					content += '<th><input type="text"  onkeydown="searchAllDomainTokenReport(event)" id="appName" /></th>';
					content += '<th>';
					content += '<select class="ass-dss-select span12" name="tokenStatus" id="tokenStatus">';
					content += '<option value="all">All</option>';
					content += '<option value="1">Assigned</option>';
					content += '<option value="0">Unassigned</option>';
					content += '</select>';
					content += '</th>';
					content += '</tr>';
					content += '</thead>';

					if (obj1 != null && obj1 != '') {
						jQuery.each(obj1, function(i, v) {
							i = (i + 1);
							content += "<tr>";

							content += "<td>" + i + "</td>";
							content += "<td>" + v.tokenSerial + "</td>";
							content += "<td>" + v.tokenType + "</td>";
							content += "<td>" + v.domainName + "</td>";
							content += "<td>" + v.appName + "</td>";
							content += "<td>" + v.userName + "</td>";
							content += "</tr>";
						});
					} else {
						content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
					}
					content += "</table>";
					
					if(tokenDetailList!=null&&tokenDetailList!='')	{
						content+="<div class='expo_option'><div class='row-fluid' id='expo_opt1'><div class='span4'><h4>Export options:</h4></div>";
                    content+="<div class='span8' >";
                    content+="<form method='post' id='reportForm'> ";
                    content+="<input type='hidden' name='domain' id='total_domain'/>";
                    content+="<input type='hidden' name='domainName' id='domain_name'/>";
                    content+="<input type='hidden' name='tokenStatus' id='token_status'/>";
                    content+="<input type='hidden' name='authtype' id='auth_type'/>";
                    content+="<input type='hidden' name='tokenSerial' id='token_serial'/>";
                    content+="<input type='hidden' name='appName' id='app_name'/>";
                    content+="<ul>";
                    content+="<li><a href='#' onClick='callCsvReport()' class='btn btn-primary'>CSV</a></li>";
                    content+="<li><a href='#' onClick='callExcelReport()' class='btn btn-primary'>Excel</a></li>";
                    content+="<li><a href='#' id='xml' data='xml' onClick='callXmlReport()' class='btn btn-primary'>XML</a></li>";
                    content+="<li><a href='#' id='pdf' data='pdf' onClick='callPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
                    content+="</ul>";
                    content+="</form>";
                    content+="</div></div></div>";
             		}
					$('#user_detail_athentication_data').html(content);
					
					
					$('#tokenSerial').val(tokenSerial);
					$('#authtype').val(authtype);
					$('#domain').val(domainName);
					$('#appName').val(appName);
					$('#tokenStatus').val(tokenStatus);
					
					 if($.trim(globalAllDomainTokenReportPreviouspageSize) != '')
				      {  $("#pageId_assign").val(globalAllDomainTokenReportPreviouspageSize);
				         fetchSize_assignDeasign();
				         if(!searchAllDomainTokenReportForAll)
				        	 $("#pageNum_assign").val(globalAllDomainTokenReportPreviousPageNum);
				         else{
				        	 if(globalAllDomainTokenReportPreviousPageNum==0 && parseInt($('#pageN_assign').text()) >0 )
				        		 globalAllDomainTokenReportPreviousPageNum="1";
				        	 $("#pageNum_assign").val(globalAllDomainTokenReportPreviousPageNum);
				         }
				      }
				  
					  if(pagecall==false){
						    var size=10;
						    if (globalAllDomainTokenReportPreviouspageSize != '') {
								size = parseInt(globalAllDomainTokenReportPreviouspageSize);
								count = searchCount;
							}
						    if(domainName!="" || tokenStatus!="" || authtype!="" || tokenSerial!="" || appName!=""){
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
					  
					  if(domainName=="" && tokenStatus=="" && authtype=="" && tokenSerial=="" && appName==""){
						  searchAllDomainTokenReportForAll=false;
					   }
	     		}

			});
}


function fetchSize_assignDeasign() {
	try {
		var size = document.getElementById('pageId_assign').value;
		if ($.trim(size) != '') {
			var maxSize = count;

			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
				
			if(count==0){
				$('#pageNum_assign').val(0);
			} else{
				$('#pageNum_assign').val(1);
				$('#pageNum_assign').attr("disabled",false);
			} 				
			$('#pageN_assign').html(parseInt(maxPgaeNumber));
		} 
	} catch (e) {
		//alert(e)
	}
}

function getPageData_assignDeasign() {
	
	var size = document.getElementById('pageId_assign').value;
	if ($.trim(size) != '') {
	var pageNumber = document.getElementById('pageNum_assign').value;
	var totalPages =  $('#pageN_assign').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_assign').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		athenticationDetail_tab(selectedDomain, false, true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

function search_data() {
	 searchAllDomainTokenReportForAll=true;
	 athenticationDetail_tab(selectedDomain, false, false, true);
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
	var url="reportgen_tokenDetailReport?reportType="+reportType+"&fileName=token_detail_report.pdf&reportColumns="+globalArrayUserSummaryColumn;
	
	$('#total_domain').val(selectedDomain);
	$('#domain_name').val(domainName);
	$('#app_name').val(appName);
	$('#token_serial').val(tokenSerial);
	$('#token_status').val(tokenStatus);
	$('#auth_type').val(authtype);
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
	var url="reportgen_tokenDetailReport?reportType="+reportType+"&fileName=token_detail_report.xml&reportColumns="+globalArrayUserSummaryColumn;
	
	$('#total_domain').val(selectedDomain);
	$('#domain_name').val(domainName);
	$('#app_name').val(appName);
	$('#token_serial').val(tokenSerial);
	$('#token_status').val(tokenStatus);
	$('#auth_type').val(authtype);
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
	var url="reportgen_tokenDetailReport?reportType="+reportType+"&fileName=token_detail_report.xlsx&reportColumns="+globalArrayUserSummaryColumn;
	$('#total_domain').val(selectedDomain);
	$('#domain_name').val(domainName);
	$('#app_name').val(appName);
	$('#token_serial').val(tokenSerial);
	$('#token_status').val(tokenStatus);
	$('#auth_type').val(authtype);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	 resetAllCheckbox();
	}
	}  else {
		alert('Your data is more than 500000. Please download the report in CSV Format!');
	}
	
}

function callCsvReport()
{
	 globalReportType = "csv";
		  if(globalShowPopupWindow)
		  $('#myModal1').modal('show')  
		else{
		$('#myModal1').modal('hide')
	var reportType="csv";
	var url="reportgen_tokenDetailReport?reportType="+reportType+"&fileName=token_detail_report.csv&reportColumns="+globalArrayUserSummaryColumn;
	
	$('#total_domain').val(selectedDomain);
	$('#domain_name').val(domainName);
	$('#app_name').val(appName);
	$('#token_serial').val(tokenSerial);
	$('#token_status').val(tokenStatus);
	$('#auth_type').val(authtype);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	 resetAllCheckbox();
	}
}
function hideDiv(target)
{	
	$(target).parent().hide(300);
}



function exportAllDomainToken() {

var arrayUserSummaryColumn = $.map($('input[name="usersummaryreportcolumn"]:checked'), function(c){return c.value; })
if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == ""){
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

function searchAllDomainTokenReport(e)
{  
	 if (e.keyCode === 13)   
		search_data();
}
