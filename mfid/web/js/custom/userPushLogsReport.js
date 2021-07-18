var count;
var searchUserPushLogsReportWithpageSize=false;
var pushLogList;
var globalShowPopupWindowPush = true;
var globalArrayUserSummaryColumnPush = '';
var globalReportTypePush='';
var globalPersistPushReportDomainValue='';
var domainNamePushLog = '';
var from_date_push = getAddDaysToCurrentDate();
var to_date_push = getCurrentDate();
var global_from_date_push = '';
var global_to_date_push = '';
var genPushReportFilter = '';
function getPageData_pushlogreport()
{
// start code for Bug #122	 ,added by Abhimanyu
	var size=document.getElementById('pageId_logreport_push').value;
	var pageNumber=document.getElementById('pageNum_logreport_push').value;
	var domain=document.getElementById("pushDomain").value;
//	alert("getdata");
	if($.trim(pageNumber) != "")
	openUserPushLogsReport(true,false,domain);


	
}


function fetchSize_pushlogreport(){
	//alert("fetchSize");
	//alert("count    :"+count);
	var size=document.getElementById('pageId_logreport_push').value;
	
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
	document.getElementById('pageNum_logreport_push').options.length = 1;
	 var page = document.getElementById('pageNum_logreport_push');
	//alert(page);
	var pageOpt = page.options;
	//alert(pageOpt);
	//alert("maxPgaeNumber    :"+maxPgaeNumber);
	for(var i=1;i<maxPgaeNumber;i++)
	{
		//alert("iterate:   "+i);
		pageOpt[pageOpt.length] = new Option(i,i);
	}
}else document.getElementById('pageNum_logreport_push').options.length = 1;
}

var globalUserPushLogsReportPreviouspageSize="";
var globalUserPushLogsReportPreviousPageNum="";
function openUserPushLogsReport(pageCall,pageSearch,domain)
{	try{
	
	
// start code for Bug #122 	 , added by Abhimanyu
	
	
	   if($("#pageId_logreport_push").length)
	       {
		      globalUserPushLogsReportPreviouspageSize=$("#pageId_logreport_push").val();
		      globalUserPushLogsReportPreviousPageNum=$("#pageNum_logreport_push").val();
	        }
//end code for Bug #122
	
	  
	   if(from_date_push.indexOf('/')!=-1){
		   from_date_push=from_date_push.split("/")[2]+"-"+from_date_push.split("/")[1]+"-"+from_date_push.split("/")[0]+" 00:00:00";
		   to_date_push=to_date_push.split("/")[2]+"-"+to_date_push.split("/")[1]+"-"+to_date_push.split("/")[0]+" 23:59:59";
		   }

// Start code for Bug #187 ,  added by abhimanyu
	   $("#user_onlinelogs_report_data").empty();
	   $("#user_offlinelogs_report_data").empty();
// End code for Bug #187 ,  added by abhimanyu	 

	
	//alert("openUserOnlineLogsReport");
	var myUrl="report_userLogsReport.action?logs_type=push&fromDate="+from_date_push+"&toDate="+to_date_push+"&domain="+domain;
	domainNamePushLog = domain ;
	if(pageCall)
		{
		 var pageNumber = document.getElementById("pageNum_logreport_push").value;
		// alert(pageNumber);
		 var fetchSize=document.getElementById("pageId_logreport_push").value;	
		// alert(fetchSize);
			myUrl+="&fetchSize="+fetchSize+"&pageNumber="+pageNumber;
		//alert(myUrl);
		}
	
	
	if(pageSearch)
		{
		
		 var userLogonId=$('#userLogonId').val();
		 var appId=$('#applId').val();
		 var response=$('#response').val();
		 var requestTime=$('#requestTime').val();
		 var ip=$('#ip').val();
		 var token=$('#token').val();
		
		 myUrl+="&userName="+userLogonId+"&appName="+appId+"&result="+response+"&requestTime="+requestTime+"&ip="+ip+"&tokenSerial="+token;
		// alert(myUrl);
		}
	
// start code for Bug #122 	 ,added by Abhimanyu
	   if(searchUserPushLogsReportWithpageSize)
	      {  
	     if(myUrl.indexOf('fetchSize')==-1)
		   { if($.trim(globalUserPushLogsReportPreviouspageSize)!='')
			myUrl+="&fetchSize="+globalUserPushLogsReportPreviouspageSize; 
		   }
     }
	   genPushReportFilter = "&"+myUrl.split("?")[1];
//end code for Bug #122	
	
	$.ajax({
		type:"POST",
		url:myUrl,
		dataType:"text",
		success:function(data)
		{
		//alert("onlinelogdata    "+data);
		
			 if($.trim(data)=="sessionout"){
					alert(data);
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
			 var obj=JSON.parse(data);
				var obj1=JSON.parse(obj.logList);
				var obj2=JSON.parse(obj.count);
				var obj3=JSON.parse(obj.domainList);
				pushLogList=JSON.parse(obj.logList);
				//alert("onlineLogList"+onlineLogList);
				//alert("obj.count:    "+obj.count);
//start code for Bug #122 	 , added by Abhimanyu
		          if(searchUserPushLogsReportWithpageSize)
		        	  obj2=count;
 // end code for Bug #122 	
				count=obj2;
				//alert("in count:   "+count);
				var content = '<h4>Push</h4><div class="space15"></div>';
				content += '<div class="row-fluid">';
				content += '<div class="span3">';
				content += '<label>Domain : </label>';
				content += '<select id="pushDomain" name="switchDomain">';
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
				content += '<input type="text" name="from_date_push" id="from_date_push" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
				content += '</div>';

				content += '<div class="span3 offset0">';
				content += '<label>To : </label>';
				content += '<input type="text" name="to_date_push" id="to_date_push" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
				content += '</div>';
				
				content += '<div class="span3 offset0">';
				content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="getUserLogPuhReportDatewise()" />';
				content += '</div>';
				content += '<div class="clear"></div>';
				content += '</div>';
				
			  content+= '<div class="space15"></div>';
			  
			 content += '<div class="row-fluid">';
				content += '<div  class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_logreport_push" onChange="fetchSize_pushlogreport()" name="deassociationReasonListName">';
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
					content += '<select onChange="getPageData_pushlogreport()" id="pageNum_logreport_push"  >';
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
				content += '<th>Response</th>';
				content += '<th>RequestTime</th>';
				
				content += '<th>IP</th>';
				content += '</tr>';
			
				 content += '</thead>';
					content+='<tr>';
					 content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="search_pushData()" ><i style="font-size:20px;" class="icon-search"></i></a></th>';
					 content += '<th><input type="text"  onkeydown="searchPushDataReport(event)"  name="userLogonId" id="userLogonId" ></th>';
					 content += '<th><input type="text"  onkeydown="searchPushDataReport(event)" name="appId" id="applId" ></th>';
					 content += '<th><input type="text"  onkeydown="searchPushDataReport(event)" name="token" id="token" ></th>';
					 content += '<th><input type="text"  onkeydown="searchPushDataReport(event)" name="response" id="response" ></th>';
					 content += '<th><input type="text"  onkeydown="searchPushDataReport(event)" name="requestTime" id="requestTime" ></th>';
					 content += '<th><input type="text"  onkeydown="searchPushDataReport(event)" name="ip" id="ip" ></th>';
					content+='</tr>';
					//alert("obj1==="+obj.logList);
				if (obj1 != null && obj1 != '') {
					//alert();
					jQuery
							.each(
									obj1,
									function(ind, val) {
										i=ind+1;
										content += "<tr>";
										content += "<td>"
												+ i + "</td>";
									
										content += "<td>"+val.userLogonId+"</td>";
										content += "<td>" + val.appId+ "</td>";
										content += "<td>" + val.token+ "</td>";
										content += "<td>" + val.response
												+ "</td>";
										content += "<td>" + val.requestTime
												+ "</td>";
									
										content += "<td>" + val.ip
										+ "</td>";
										content += "</tr>";
									
									});

				} else {
					content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";
				}
				content += "</table>";
				$('#user_pushlogs_report_data').html(content);
				if(pushLogList!=null&&pushLogList!='')
					{
				 content1="<div class='span4'><h4>Export options:</h4></div>";
	             content1+="<div class='span8' >";
	             content1+="<form method='post' id='reportForm'> ";
	             content1+="<input type='hidden' name='jsonText' id='jsonText'/>";
	             content1+="<ul>";
	             content1+="<li><a href='#' onClick='callPushLogCsvReport()' class='btn btn-primary'>CSV</a></li>";
	             content1+="<li><a href='#' onClick='callPushLogExcelReport()' class='btn btn-primary'>Excel</a></li>";
	             content1+="<li><a href='#' id='xml' data='xml' onClick='callPushLogXmlReport()' class='btn btn-primary'>XML</a></li>";
	             content1+="<li><a href='#' id='pdf' data='pdf' onClick='callPushLogPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
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
 // start code for Bug #122  , Added by Abhimanyu
				
				 if($.trim(globalUserPushLogsReportPreviouspageSize) != '')
			      {  $("#pageId_logreport_push").val(globalUserPushLogsReportPreviouspageSize);
			          fetchSize_pushlogreport();
			         if(!searchUserPushLogsReportWithpageSize)
			         $("#pageNum_logreport_push").val(globalUserPushLogsReportPreviousPageNum);
			       }
				 
				
				 
				 if($.trim(globalPersistPushReportDomainValue) != '')
			      { 
					 $("#pushDomain").val(globalPersistPushReportDomainValue);
			         
			       }
				
				  searchUserPushLogsReportWithpageSize=false;
				    $("#from_date_push" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
			     	$("#to_date_push").datepicker({ dateFormat: "dd/mm/yy" }).val();
			     	if(global_from_date_push != '' && global_to_date_push != '')
			     		{
				     		$("#from_date_push" ).val(global_from_date_push);
					     	$("#to_date_push" ).val(global_to_date_push);
			     		}
			     	else
			     		{
				     		$("#from_date_push" ).val(getAddDaysToCurrentDate());
					     	$("#to_date_push" ).val(getCurrentDate());
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

function search_pushData()
{   searchUserPushLogsReportWithpageSize=true;
var domain=document.getElementById("pushDomain").value;
	openUserPushLogsReport(false,true,domain);
}

function callPushLogPdfReport()
{	
	try{
		globalReportTypePush = "pdf";
		 if(globalShowPopupWindowPush)
			  $('#myModalpush').modal('show')  
			else{
			 $('#myModalpush').modal('hide')
	var reportType="pdf";
	//var a=$(this).attr("data");
	//alert("a   :"+a);
	var url="reportgen_onlineLogReport?reportType="+reportType+"&fileName=user_pushLog_report.pdf&reportColumns="+globalArrayUserSummaryColumnPush+"&domainName="+domainNamePushLog+"&logsType=push"+genPushReportFilter;
	//alert(url);
	$('#jsonText').val(JSON.stringify(pushLogList));
	//alert($('#jsonText').val());
	$('#reportForm').attr("action",url);
//	alert($('#reportForm').attr("action"));
	$('#reportForm').submit();
	globalShowPopupWindowPush=true;
	 resetAllCheckboxPush();
		}
	
	}
	catch(e)
	{
		alert(e);
	}


}

function callPushLogXmlReport()
{
	
	globalReportTypePush = "xml";
	 if(globalShowPopupWindowPush)
		  $('#myModalpush').modal('show')  
		else{
		 $('#myModalpush').modal('hide')
	var reportType="xml";
	var url="reportgen_onlineLogReport?reportType="+reportType+"&fileName=user_pushLog_report.xml&reportColumns="+globalArrayUserSummaryColumnPush+"&domainName="+domainNamePushLog+"&logsType=push"+genPushReportFilter;
	//alert(url);
	$('#jsonText').val(JSON.stringify(pushLogList));
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindowPush=true;
	 resetAllCheckboxPush();
		}
}

function callPushLogExcelReport()
{
	globalReportTypePush = "excel";
	 if(globalShowPopupWindowPush)
		  $('#myModalpush').modal('show')  
		else{
		 $('#myModalpush').modal('hide')
	var reportType="excel";
	var url="reportgen_onlineLogReport?reportType="+reportType+"&fileName=user_pushLog_report.xls&reportColumns="+globalArrayUserSummaryColumnPush+"&domainName="+domainNamePushLog+"&logsType=push"+genPushReportFilter;
	//alert(url);
	$('#jsonText').val(JSON.stringify(pushLogList));
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindowPush=true;
	 resetAllCheckboxPush();
		}
}

function callPushLogCsvReport()
{
	globalReportTypePush = "csv";
	 if(globalShowPopupWindowPush)
		  $('#myModalpush').modal('show')  
		else{
		 $('#myModalpush').modal('hide')
	var reportType="csv";
	var url="reportgen_onlineLogReport?reportType="+reportType+"&fileName=user_pushLog_report.csv&reportColumns="+globalArrayUserSummaryColumnPush+"&domainName="+domainNamePushLog+"&logsType=push"+genPushReportFilter;
	//alert(url);
	$('#jsonText').val(JSON.stringify(pushLogList));
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindowPush=true;
	 resetAllCheckboxPush();
		}
}



function exportUserLogReportPush()
{
 //alert("exportNeverUseAuthenticationReport");	
var arrayUserSummaryColumn = $.map($('input[name="pushuserlogreportcolumn"]:checked'), function(c){return c.value; })
if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "")
	{
	alert("please select at least one column for Export. ");
	}
else
	{
	globalArrayUserSummaryColumnPush = arrayUserSummaryColumn; 
	globalShowPopupWindowPush=false;
	
	if(globalReportTypePush ==  "pdf")
		callPushLogPdfReport();
	else if(globalReportTypePush ==  "xml")
		callPushLogXmlReport();
	else if(globalReportTypePush ==  "excel")
		callPushLogExcelReport();
	else if(globalReportTypePush ==  "csv")
		callPushLogCsvReport();
	
	 
	}
	
}
function getUserLogPuhReportDatewise()
{  
	var domain=document.getElementById("pushDomain").value;
	//alert("domain==="+domain)
	
	if($.trim(domain) == ""){
		alert("Please select domain");
		return;
	}
	else{
	globalPersistPushReportDomainValue=domain; 
	from_date_push=$("#from_date_push").val();
    to_date_push=$("#to_date_push").val();
	global_from_date_push=$("#from_date_push").val();
    global_to_date_push=$("#to_date_push").val();
    openUserPushLogsReport(false,false,domain);
	}
	 
 }


function searchPushDataReport(e)
{  
	 if (e.keyCode === 13)   
		search_pushData();
}
