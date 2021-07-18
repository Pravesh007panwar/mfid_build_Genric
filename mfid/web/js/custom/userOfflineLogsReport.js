var count;
var searchUserOfflineLogsReportWithpageSize=false;
var offlineLogList;
var globalShowPopupWindowOffline = true;
var globalArrayUserSummaryColumnOffline = '';
var globalReportTypeOffline='';
var globalPersistOfflineReportDomainValue='';
var from_date_offline = getAddDaysToCurrentDate();
var to_date_offline = getCurrentDate();
var global_from_date_offline = '';
var global_to_date_offline = '';
var domainNameOfflineLog = '';
var genOfflineReportFilter = '';
function getPageData_offlinelogreport()
{
// start code for Bug #122	 ,added by Abhimanyu
	var size=document.getElementById('pageId_logreportOffline').value;
	var pageNumber=document.getElementById('pageNum_logreportOffline').value;
	var domain=document.getElementById("offlineDomain").value;
	//alert("getPageData_offlinelogreport");
	if($.trim(pageNumber) != "")
	openUserOfflineLogsReport(true,false,domain);


	
}


function fetchSize_offlinelogreport(){
	//alert("fetchSize_offlinelogreport");
	//alert("count    :"+count);
	var size=document.getElementById('pageId_logreportOffline').value;
	
// start code for Bug #122  ,added by Abhimanyu
	if($.trim(size)!='')
	{
	
	var maxSize=count;
	//alert("maxSize:    "+maxSize);
	var maxPgaeNumber=maxSize/size;
	var rem=maxSize%size;
	if(rem>=0){
		maxPgaeNumber=maxPgaeNumber+1;
	}
	//alert(maxPgaeNumber);
	 document.getElementById('pageNum_logreportOffline').options.length = 1;
	 var page = document.getElementById('pageNum_logreportOffline');
	//alert(page);
	var pageOpt = page.options;
	//alert(pageOpt);
	//alert("maxPgaeNumber    :"+maxPgaeNumber);
	for(var i=1;i<maxPgaeNumber;i++)
	{
		//alert("iterate:   "+i);
		pageOpt[pageOpt.length] = new Option(i,i);
	}
}else document.getElementById('pageNum_logreportOffline').options.length = 1;
}

var globalUserOfflineLogsReportPreviouspageSize="";
var globalUserOfflineLogsReportPreviousPageNum="";
function openUserOfflineLogsReport(pageCall,pageSearch,domain)
{
		try{
	//alert("openUserOfflineLogsReport");

// start code for Bug #122 	 , added by Abhimanyu
					   if($("#pageId_logreportOffline").length)
					       {
						   globalUserOfflineLogsReportPreviouspageSize=$("#pageId_logreportOffline").val();
						   globalUserOfflineLogsReportPreviousPageNum=$("#pageNum_logreportOffline").val();
					        }
// end code for Bug #122 
					   
					   if(from_date_offline.indexOf('/')!=-1){
						   from_date_offline=from_date_offline.split("/")[2]+"-"+from_date_offline.split("/")[1]+"-"+from_date_offline.split("/")[0]+" 00:00:00";
						   to_date_offline=to_date_offline.split("/")[2]+"-"+to_date_offline.split("/")[1]+"-"+to_date_offline.split("/")[0]+" 23:59:59";
						   }
					   					   
					   
// start code for Bug #183 , added by Abhimanyu
					   $("#user_onlinelogs_report_data").empty();
					   $("#user_pushlogs_report_data").empty();
// end code for Bug #183 , added by Abhimanyu		
	var myUrl="report_userLogsReport.action?logs_type=offline&fromDate="+from_date_offline+"&toDate="+to_date_offline+"&domain="+domain;
	domainNameOfflineLog = domain ;
	
	if(pageCall)
		{
		 var pageNumber = document.getElementById("pageNum_logreportOffline").value;
		// alert(pageNumber);
		 var fetchSize=document.getElementById("pageId_logreportOffline").value;	
		// alert(fetchSize);
			myUrl+="&fetchSize="+fetchSize+"&pageNumber="+pageNumber;
		//alert(myUrl);
		}
	
	
	if(pageSearch)
		{
		try{
		//alert("pageSearch");
		 var userLogonId=$('#userLogonIdOffline').val();
		// alert(userLogonId);
		 var appId=$('#applIdOffline').val();
		// alert(appId);
		 var requestTime=$('#requestTimeOffline').val();
		 var token=$('#token').val();
		// alert(requestTime);   // change code for Bug #183 , added by Abhimanyu
		 myUrl+="&userName="+userLogonId+"&appName="+appId+"&requestTime="+requestTime+"&tokenSerial="+token;
		}
		catch(e)
		{
			alert(e);
		}
		}
// start code for Bug #122 ,added by Abhimanyu
	   if(searchUserOfflineLogsReportWithpageSize)
	      {  
	     if(myUrl.indexOf('fetchSize')==-1)
		   { if($.trim(globalUserOfflineLogsReportPreviouspageSize)!='')
			myUrl+="&fetchSize="+globalUserOfflineLogsReportPreviouspageSize; 
		   }
     }
	    genOfflineReportFilter = "&"+myUrl.split("?")[1];
//end code for Bug #122 
	
	
	$.ajax({
		type:"POST",
		url:myUrl,
		dataType:"text",
		success:function(data)
		{
			//alert("data    "+data);
		
			 if($.trim(data)=="sessionout"){
					alert(data);
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
			 var obj=JSON.parse(data);
				var obj1=JSON.parse(obj.logList);
				offlineLogList=JSON.parse(obj.logList);
				var obj3=JSON.parse(obj.domainList);
				var obj2=JSON.parse(obj.count);
				//alert("obj.count:    "+obj.count);
//start code for Bug #122  , added by Abhimanyu
		          if(searchUserOfflineLogsReportWithpageSize)
		        	  obj2=count;
 // end code for Bug #122				
				count=obj2;
				//alert("in count:   "+count);
				var content = '<h4>Offline</h4><div class="space15"></div>';
				
				content += '<div class="row-fluid">';
				content += '<div class="span3">';
				content += '<label>Domain : </label>';
				content += '<select id="offlineDomain" name="swiDomain">';
				content += '<option value="">-select domain-</option>';
				jQuery.each(obj3, function(i, v) {
				var tempDomainList=obj3[i];
				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
				});
				content += '</select>';
				content += '</div>';
				
				content += '<div class="row-fluid">';
				content += '<div class="span3 offset0">';
				content += '<label>From : </label>';
				content += '<input type="text" name="from_date_offline" id="from_date_offline" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
				content += '</div>';

				content += '<div class="span3 offset0">';
				content += '<label>To : </label>';
				content += '<input type="text" name="to_date_offline" id="to_date_offline" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
				content += '</div>';
				
				content += '<div class="span3 offset0">';
				content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="getUserLogOfflineReportDatewise()" />';
				content += '</div>';
				content += '<div class="clear"></div>';
				content += '</div>';
				
			  content+= '<div class="space15"></div>';
			  
			 content += '<div class="row-fluid">';
				content += '<div  class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_logreportOffline" onChange="fetchSize_offlinelogreport()" name="deassociationReasonListName">';
					content += '<option value="">-select size-</option>';
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
					
					content += '</select>';

					content += '</div>';
					content += '</div>';
					content += '<div class="span6">';
					content += '<div class="pull-right" id="switch_app" >';
					content += '<label>Page Number</label>';
					content += '<select onChange="getPageData_offlinelogreport()" id="pageNum_logreportOffline"  >';
		content += '<option value="">-select Page-</option>';
				content += '</select>';
				content += '</div>';
				content += '</div>';
			content += '</div>';
				content += '<table class="table table-striped table-bordered" id="sample_4">';
				content += '<thead>';
				content += '<tr>';
				content += '<th>Sr.No.</th>';
				content += '<th>UserLogonId</th>';
				content += '<th>App Id</th>';
				content += '<th>Token Serial</th>';
				content += '<th>RequestTime</th>';
				
				
				content += '</tr>';
			
				 content += '</thead>';
					content+='<tr>';
					 content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="search_offlineData()" ><i style="font-size:20px;" class="icon-search"></i></a></th>';
					 content += '<th><input type="text"  onkeydown="searchOfflineDataReport(event)" name="userLogonId" id="userLogonIdOffline" ></th>';
					 content += '<th><input type="text"  onkeydown="searchOfflineDataReport(event)" name="appId" id="applIdOffline" ></th>';
					 content += '<th><input type="text"  onkeydown="searchOfflineDataReport(event)" name="token" id="token" ></th>';
					
					 content += '<th><input type="text"  onkeydown="searchOfflineDataReport(event)" name="requestTime" id="requestTimeOffline" ></th>';
					
					content+='</tr>';
				if (obj1 != null && obj1 != '') {
				
					jQuery
							.each(
									obj1,
									function(ind, val) {
											i=ind+1;
										content += "<tr>";
										content += "<td>"
												+ i + "</td>";
									
										content += "<td>"+val.userLogonId+"</td>";
										content += "<td>" + val.appId
												+ "</td>";
										content += "<td>" + val.token
										+ "</td>";
									
										content += "<td>" + val.requestTime
												+ "</td>";
									
									
										content += "</tr>";
									
									});

				} else {
					content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
				}
				content += "</table>";
				$('#user_offlinelogs_report_data').html(content);
				if(offlineLogList!=null &&offlineLogList!='')
					{
				 content1="<div class='span4'><h4>Export options:</h4></div>";
	             content1+="<div class='span8' >";
	             content1+="<form method='post' id='reportForm'> ";
	             content1+="<input type='hidden' name='jsonText' id='jsonText'/>";
	             content1+="<ul>";
	             content1+="<li><a href='#' onClick='callOffLineCsvReport()' class='btn btn-primary'>CSV</a></li>";
	             content1+="<li><a href='#' onClick='callOffLineExcelReport()' class='btn btn-primary'>Excel</a></li>";
	             content1+="<li><a href='#' id='xml' data='xml' onClick='callOffLineXmlReport()' class='btn btn-primary'>XML</a></li>";
	             content1+="<li><a href='#' id='pdf' data='pdf' onClick='callOffLinePdfReport()' class='btn btn-primary'>PDF</a></li>";                              
	             content1+="</ul>";
	             content1+="</form>";
	             content1+="</div>";
	        	 $('#expo_opt').html(content1);
					}
				else
					{
					 $('#expo_opt').html('');
					}
				$("#sample_4").css("width", "100%");
 // start code for Bug #122 , Added by Abhimanyu
				 if($.trim(globalUserOfflineLogsReportPreviouspageSize) != '')
			      {  $("#pageId_logreportOffline").val(globalUserOfflineLogsReportPreviouspageSize);
			         fetchSize_offlinelogreport();
			         if(!searchUserOfflineLogsReportWithpageSize)
			         $("#pageNum_logreportOffline").val(globalUserOfflineLogsReportPreviousPageNum);
			       }
				 if($.trim(globalPersistOfflineReportDomainValue) != '')
			      { 
					 $("#offlineDomain").val(globalPersistOfflineReportDomainValue);
			         
			       }
				  searchUserOfflineLogsReportWithpageSize=false;
				    $("#from_date_offline" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
			     	$("#to_date_offline").datepicker({ dateFormat: "dd/mm/yy" }).val();
			     	if(global_from_date_offline != '' && global_to_date_offline != '')
			     		{
			     		$("#from_date_offline" ).val(global_from_date_offline);
				     	$("#to_date_offline" ).val(global_to_date_offline);
			     		}
			     	else
			     		{
			     		$("#from_date_offline" ).val(getAddDaysToCurrentDate());
				     	$("#to_date_offline" ).val(getCurrentDate());
			     		}
			     	
			     	
//end code for Bug #122 			
				
		}
	});
	
}
catch(e)
{
	alert(e);
	}
}

function search_offlineData()
{
		//alert("search_offlineData");
	var domain=document.getElementById("offlineDomain").value;
	searchUserOfflineLogsReportWithpageSize=true;
	openUserOfflineLogsReport(false,true,domain);
}

function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
}

function getUserLogOfflineReportDatewise()
{  
	var domain=document.getElementById("offlineDomain").value;
	//alert("domain==="+domain)
	
	if($.trim(domain) == ""){
		alert("Please select domain");
		return;
	}
	else{
	globalPersistOfflineReportDomainValue=domain; 
	from_date_offline=$("#from_date_offline").val();
    to_date_offline=$("#to_date_offline").val();
    if(from_date_offline==""||from_date_offline==undefined||from_date_offline==null){
		 alert("Please select start time stamp");
		 return;
	 }
	
	if(to_date_offline==""||to_date_offline==undefined||to_date_offline==null){
		 alert("Please select end time stamp");
		 return;
	 }
	
	 if(process(from_date_offline) > process(to_date_offline)){
		 alert("To timestamp can not be same or less than the from timestamp");
		 return;
 }
   

    global_from_date_offline=$("#from_date_offline").val();
    global_to_date_offline=$("#to_date_offline").val();
    openUserOfflineLogsReport(false,false,domain);
	}
	 
 }

function callOffLinePdfReport()
{	 globalReportTypeOffline = "pdf";
	 if(globalShowPopupWindowOffline)
		  $('#myModaloffline').modal('show')  
		else{
		 $('#myModaloffline').modal('hide')
	var reportType="pdf";
	var url="reportgen_offlineLogReport?reportType="+reportType+"&fileName=user_offlineLog_report.pdf&reportColumns="+globalArrayUserSummaryColumnOffline+"&domainName="+domainNameOfflineLog+"&logsType=offline"+genOfflineReportFilter;
	//alert(url);
	$('#jsonText').val(JSON.stringify(offlineLogList));
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindowOffline=true;
	 resetAllCheckboxOffline();
		}
	
	


}

function callOffLineXmlReport()
{
	
	globalReportTypeOffline = "xml";
	 if(globalShowPopupWindowOffline)
		  $('#myModaloffline').modal('show')  
		else{
		 $('#myModaloffline').modal('hide')
	var reportType="xml";
	var url="reportgen_offlineLogReport?reportType="+reportType+"&fileName=user_offlineLog_report.xml&reportColumns="+globalArrayUserSummaryColumnOffline+"&domainName="+domainNameOfflineLog+"&logsType=offline"+genOfflineReportFilter;
	//alert(url);
	$('#jsonText').val(JSON.stringify(offlineLogList));
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindowOffline=true;
	 resetAllCheckboxOffline();
		}
}

function callOffLineExcelReport()
{
	globalReportTypeOffline = "excel";
	 if(globalShowPopupWindowOffline)
		  $('#myModaloffline').modal('show')  
		else{
		 $('#myModaloffline').modal('hide')
	var reportType="excel";
	var url="reportgen_offlineLogReport?reportType="+reportType+"&fileName=user_offlineLog_report.xls&reportColumns="+globalArrayUserSummaryColumnOffline+"&domainName="+domainNameOfflineLog+"&logsType=offline"+genOfflineReportFilter;
	//alert(url);
	$('#jsonText').val(JSON.stringify(offlineLogList));
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindowOffline=true;
	 resetAllCheckboxOffline();
		}
}

function callOffLineCsvReport()
{
	globalReportTypeOffline = "csv";
	 if(globalShowPopupWindowOffline)
		  $('#myModaloffline').modal('show')  
		else{
		 $('#myModaloffline').modal('hide')
	var reportType="csv";
	var url="reportgen_offlineLogReport?reportType="+reportType+"&fileName=user_offlineLog_report.csv&reportColumns="+globalArrayUserSummaryColumnOffline+"&domainName="+domainNameOfflineLog+"&logsType=offline"+genOfflineReportFilter;
	//alert(url);
	$('#jsonText').val(JSON.stringify(offlineLogList));
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindowOffline=true;
	 resetAllCheckboxOffline();
		}
}


function exportUserLogReportOffline()
{
 //alert("exportNeverUseAuthenticationReport");	
var arrayUserSummaryColumn = $.map($('input[name="offlineuserlogreportcolumn"]:checked'), function(c){return c.value; })
if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "")
	{
	alert("please select at least one column for Export. ");
	}
else
	{
	globalArrayUserSummaryColumnOffline = arrayUserSummaryColumn; 
	globalShowPopupWindowOffline=false;
	
	if(globalReportTypeOffline ==  "pdf")
		callOffLinePdfReport();
	else if(globalReportTypeOffline ==  "xml")
		callOffLineXmlReport();
	else if(globalReportTypeOffline ==  "excel")
		callOffLineExcelReport();
	else if(globalReportTypeOffline ==  "csv")
		callOffLineCsvReport();
	
	 
	}
	
}


function searchOfflineDataReport(e)
{  
	 if (e.keyCode === 13)   
		search_offlineData();
}



