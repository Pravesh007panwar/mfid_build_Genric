function removeFilter(){
	$('#userName').val("");
	$('#authtype').val("");
	$('#tokenSerial').val("");
}
var count;
var searchCount;
var domainn;
var appname;
var authlist;
var searchAuthenticationReportForAll=false;
var globalPersistAuthenticationreportDomainValue="";
var globalShowPopupWindow = true;
var globalArrayUserSummaryColumn = '';
var globalReportType='';
var genAuthenticationReportFilter = '';

function getPageData_assignDeasign() {

	var size = document.getElementById('pageId_assign').value;
	if ($.trim(size) != '') {
	var pageNumber = document.getElementById('pageNum_assign').value;
	var totalPages =  $('#pageN_assign').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_assign').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		authenticationDetailReport(appname, domainn, true, false);
	else
		alert('Page should be less than or equal to page number.');
	}
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
		alert(e)
	}
}


function showAuthenticationReport(domain){

	domainn=domain;
	var test=new Array();
	var test2=new Array();
	var test3=new Array();
	var test4=new Array();
	var test5=new Array();
	var test6=new Array();
	var listApp=new Array();
		var AppList= new Array();
	var ListHardTokenStatus=new Array();
	var ListSoftTokenStatus=new Array();
	var ListDesktopTokenStatus=new Array();
	var ListMobileTokenStatus=new Array();
	var ListEmergencyTokenStatus=new Array();
	var ListPushTokenStatus=new Array();
	var testApp=new Array();
	testApp.push('App1');
	testApp.push('App2');
	testApp.push('App3');
	
	var testApp2="['App1','App2','App3']"; //for testing string value as category
	
	$.ajax
	({
		type: "POST",  
		url: "report_authenticationReport.action?domainName="+domain,  
		data: "{}",
		async: true,
		dataType: "text",
	
	
	success: function(data)
	{
		 if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
		var object = JSON.parse(data);
		var obj1=JSON.parse(object.authenticationReportList);
		var obj2=JSON.parse(object.domainList);
		
	
	if(object.authenticationReportList==null){
	
	
	var div=document.getElementById("container_grap");
	div.innerHTML = div.innerHTML + '<font style="font-weight: bold; display: block; color: #B4886B;">No data to display</font>';
	
	}
		if(object.authenticationReportList.length)
	{
	var j=0;
	var content='';
	content += '<div class="span3">';
	content += '<label>Domain : </label>';
	content += '<select id="domain" name="switchDomain" onchange="changeDomainReport();">';
	content += '<option value="">-select domain-</option>';
	jQuery.each(obj2, function(i, v) {
	var tempDomainList=obj2[i];
	
	content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
});
	
	content += '</select>';
	content += '</div>';
	var div=document.getElementById("container_domain");
	div.innerHTML=content;
	
	if(globalPersistAuthenticationreportDomainValue != "")
	     $("#domain").val(globalPersistAuthenticationreportDomainValue);

	$.each(obj1, function(i,data)
	{
	
	
	
	ListHardTokenStatus.push(data.status_hardToken);
	ListSoftTokenStatus.push(data.status_softToken);
	ListDesktopTokenStatus.push(data.status_desktopToken);
	ListMobileTokenStatus.push(data.status_mobileToken);
	ListPushTokenStatus.push(data.status_pushToken);
	var appId=data.appName;
	var appIs=appId;
	listApp.push(data.appName);

   
	});
	var AppList=JSON.stringify(listApp).toString();
	var test = JSON.stringify(ListHardTokenStatus).toString();
	var test2=JSON.stringify(ListSoftTokenStatus).toString();
	var test4=JSON.stringify(ListDesktopTokenStatus).toString();
	var test5=JSON.stringify(ListMobileTokenStatus).toString();
	var test6=JSON.stringify(ListPushTokenStatus).toString();
	
	
	        $('#container_grap').highcharts({
            chart: {
                type: 'column',
                height:400
            },
            title: {
                text:'Authentication Type Report'
            },
            xAxis: {
                categories: listApp,
                 title: {
                    text: 'Applications'
                },
            },
            yAxis: {
              allowDecimals:false,
               
                title: {
                    text: 'Users'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            
             tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            
            plotOptions: {
            
                column: {
                    stacking: 'normal',
                      point:{
                      events:{
                          click:function(){
                        	  appname=this.category;
                        	//  alert("clicked");
                        	  try{ $("#pageId_assign").val(''); $("#pageNum_assign").val(''); }catch(err){}
                        	  authenticationDetailReport(this.category,domain,false,false);
                          }
                      }
                  }
                }
            },
             series: [{
                name: 'Hard Token',
                data: JSON.parse(test)
            }, {
                name: 'Sms Token',
                data: JSON.parse(test2)
            }
            , {
                name: 'Bio Token',
                data: JSON.parse(test4)
            }
            , {
                name: 'Mobile Token',
                data: JSON.parse(test5)
            }
            , {
                name: 'Push Token',
                data: JSON.parse(test6)
            }
            ]
        });
	}
	
	else
	{
		$("#content").html("No Results");
	}
	}
	});
}




function changeDomainReport()
{
	var domain=document.getElementById("domain").value;
	globalPersistAuthenticationreportDomainValue=domain; // add line for Bug id #347 , added by abhimanyu
	   if($.trim(domain) != "")
	     showAuthenticationReport(domain);
	 
}

$(document).on('click','.close_table',function(){  
	
	$(this).parent('div').hide(300);
	
});

var globalAuthenticationReportPreviouspageSize="";
var globalAuthenticationReportPreviousPageNum="";

var userName="";
var authType="";
var tokenSerial="";
function authenticationDetailReport(val,domain,pageCall,pageSearch){
		
	
	   if($("#pageId_assign").length)
	       {
		   globalAuthenticationReportPreviouspageSize=$("#pageId_assign").val();
		   globalAuthenticationReportPreviousPageNum=$("#pageNum_assign").val();
	        }

	
	
	var myUrl="report_authenticationDetailReport.action?domainName="+domain+"&appName="+val;
	var dataString="";
	$('#success_attempt_data').show();

	if(pageCall)
		{
	
		var size=document.getElementById('pageId_assign').value;
		var pageNumber=document.getElementById('pageNum_assign').value;
		myUrl+= "&fetchSize="+size+"&pageNumber="+pageNumber;
		
		}
	
	 if(userName!="" || authType!="" || tokenSerial!=""){
		 pageSearch=true;
	  } 
	
	if(pageSearch)
		{
		userName=document.getElementById('userName').value;
			userName = userName.replace(/\s/g, "");
		authType=document.getElementById('authtype').value;
			authType = authType.replace(/\s/g, "");
		tokenSerial=document.getElementById('tokenSerial').value;
			tokenSerial = tokenSerial.replace(/\s/g, "");
			
		//myUrl+="&userName="+userName+"&authtype="+authType+"&tokenSerial="+tokenSerial;
		dataString+="&userName="+userName+"&authtype="+authType+"&tokenSerial="+tokenSerial;
	
		}
	
	   if(searchAuthenticationReportForAll)
	      {  
	     if(myUrl.indexOf('fetchSize')==-1)
		   { if($.trim(globalAuthenticationReportPreviouspageSize)!='')
			   myUrl+="&fetchSize="+globalAuthenticationReportPreviouspageSize; 
		   }
     }
	   
	   genAuthenticationReportFilter = "&"+myUrl.split("?")[1];

	$.ajax({
		type: "POST",  
		url:myUrl,
		data: dataString,
		async: true,
		dataType: "text",
		success: function(data) {
			
			 if($.trim(data)=="sessionout"){
					alert(data);
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
			 	if(data!=""){
			 		var object = JSON.parse(data);
				 	var obj=JSON.parse(object.authenticationDetailReportList);
				 		authlist=JSON.parse(object.authenticationDetailReportList);
					var obj1=JSON.parse(object.count);
			 	}
			 	
			
			if(searchAuthenticationReportForAll){
	        	  searchCount=obj1;
	        	  count=obj1;
	        	 // obj1=count;
	          } else {
	        	  count=obj1;
	        	  searchCount=obj1;
	          }
	    	
			var content = ' <span class="close_icon close_table"><a href="javascript:void(0);"><i class="icon-remove-sign"></i></a></span><h4>Token Detail</h4>';
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
			
			content += '<table class="table table-striped table-bordered" id="sample_2">';
				content += '<thead>';
					content += '<tr>';
						content += '<th>Sr No.</th>';
						content += '<th>User Name</th>';
						content += '<th>Authentication Type</th>';
						content += '<th>Token Serial/License key</th>';
						
					content += '</tr>';
				    content += '<tr>';
				    content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" href="javascript:void(0);" data="'+val+'#'+domain+'" id="search" onClick="search_data()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					content += '<th><input type="text"  onkeydown="searchAuthenticationReport(event)" id="userName" /></th>';
					content += '<th>';
					content += '<select class="ass-dss-select span12" name="authtype" id="authtype" >';
					content += '<option value="all">All</option>';
					content += '<option value="hardToken">Hard Token</option>';
					content += '<option value="bioToken">Bio Token</option>';
					content += '<option value="mobileToken">Mobile Token</option>';
					content += '<option value="pushtoken">Push Token</option>';
					content += '<option value="smsToken">SMS Token</option>';
					content += '</select>';
					content += '</th>';
					content += '<th><input type="text"  onkeydown="searchAuthenticationReport(event)" id="tokenSerial" /></th>';
					content += '</tr>';
				content += '</thead>';
				try{
					
				if(object.authenticationDetailReportList!=null&& obj !=null && obj !='' && data!=""){
					jQuery.each(obj, function(i, v) {
					i = (i+1);
						content += "<tr>";
							content += "<td>"+i+"</td>";
							content += "<td>"+v.userLogonId+"</td>";
							content += "<td>"+v.authType+"</td>";
							content += "<td>"+v.tokenSerial+"</td>";
							
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
				
				if(authlist!=null&&authlist!=''){
					content+="<div class='expo_option'><div class='row-fluid' id='expo_opt1'><div class='span4'><h4>Export options:</h4></div>";
	                content+="<div class='span8' >";
	                content+="<form method='post' id='reportForm'> ";
	                content+="<input type='hidden' name='userName' id='user_name'/>";
	                content+="<input type='hidden' name='authtype' id='auth_type'/>";
	                content+="<input type='hidden' name='tokenSerial' id='token_serial'/>";
	                content+="<ul>";
	                content+="<li><a href='#' onClick='callCsvReport()' class='btn btn-primary'>CSV</a></li>";
	                content+="<li><a href='#' onClick='callExcelReport()' class='btn btn-primary'>Excel</a></li>";
	                content+="<li><a href='#' id='xml' data='xml' onClick='callXmlReport()' class='btn btn-primary'>XML</a></li>";
	                content+="<li><a href='#' id='pdf' data='pdf' onClick='callPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
	                content+="</ul>";
	                content+="</form>";
	                content+="</div></div></div>";
         		}
				$('#success_attempt_data').html(content);
				
				$('#userName').val(userName);
				$('#authtype').val(authType);
				$('#tokenSerial').val(tokenSerial);
				
				  if($.trim(globalAuthenticationReportPreviouspageSize) != '') {  
					  $("#pageId_assign").val(globalAuthenticationReportPreviouspageSize);
			            fetchSize_assignDeasign();
			          if(!searchAuthenticationReportForAll)
			        	 $("#pageNum_assign").val(globalAuthenticationReportPreviousPageNum);
			          else{
			        	  if(globalAuthenticationReportPreviousPageNum==0 && parseInt($('#pageN_assign').text()) > 0)
			        		  globalAuthenticationReportPreviousPageNum="1";
			        	  $("#pageNum_assign").val(globalAuthenticationReportPreviousPageNum);
			          }
			          
			       }
				  //searchAuthenticationReportForAll=false;
				  
					if(pageCall==false) {
						var size = 10;
						if (globalAuthenticationReportPreviouspageSize != '') {
							size = parseInt(globalAuthenticationReportPreviouspageSize);
							count = searchCount;
						}
						
						if(userName!="" || authType!="" || tokenSerial !=""){
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
					
					if(userName=="" && authType=="" && tokenSerial ==""){
						searchAuthenticationReportForAll=false;
					} 
				
				
		}
	
	});

}


function  search_data()
{
if(validateAuthenticationSearch()){
	var data=$('#search').attr("data");
	var valarr=data.split('#');
	var val=valarr[0];
	var domain=valarr[1];
	searchAuthenticationReportForAll=true;
	authenticationDetailReport(val,domain,false,true);
} else{
	validateAuthenticationSearch();
}
}

function callPdfReport()
{	
	if(validatePDFCount()) {
	globalReportType = "pdf";
	if(globalShowPopupWindow)
		  $('#myModal1').modal('show')  
		else{
		 $('#myModal1').modal('hide')
	
	var reportType="pdf";
	var url="reportgen_authenticationReport?reportType="+reportType+"&fileName=authentication_report.pdf&reportColumns="+globalArrayUserSummaryColumn+genAuthenticationReportFilter;
	$('#user_name').val(userName);
	$('#auth_type').val(authType);
	$('#token_serial').val(tokenSerial);
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
	var url="reportgen_authenticationReport?reportType="+reportType+"&fileName=authentication_report.xml&reportColumns="+globalArrayUserSummaryColumn+genAuthenticationReportFilter;
	$('#user_name').val(userName);
	$('#auth_type').val(authType);
	$('#token_serial').val(tokenSerial);
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
	var url="reportgen_authenticationReport?reportType="+reportType+"&fileName=authentication_report.xlsx&reportColumns="+globalArrayUserSummaryColumn+genAuthenticationReportFilter;
	$('#user_name').val(userName);
	$('#auth_type').val(authType);
	$('#token_serial').val(tokenSerial);
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
{
	globalReportType = "csv";
	if(globalShowPopupWindow)
		  $('#myModal1').modal('show')  
		else{
		 $('#myModal1').modal('hide')
	var reportType="csv";
	var url="reportgen_authenticationReport?reportType="+reportType+"&fileName=authentication_report.csv&reportColumns="+globalArrayUserSummaryColumn+genAuthenticationReportFilter;
	$('#user_name').val(userName);
	$('#auth_type').val(authType);
	$('#token_serial').val(tokenSerial);
	$('#reportForm').attr("action",url);
	$('#reportForm').submit();
	globalShowPopupWindow=true;
	 resetAllCheckbox();
	}
}


function exportAuthenticationReport()
{
 
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
	

function searchAuthenticationReport(e)
{  
	 if (e.keyCode === 13)   
		search_data();
}

function validateAuthenticationSearch(){
	var userLogonId = $('#userName').val();
	 if(userLogonId != undefined && userLogonId!= ""){
		 userLogonId = userLogonId.replace(/\s/g, " ");
			var user = userLogonId.split(',');
			var len  = user.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#userName').val("");
				return false;
			}
	 }
	 var tokenSerial = $('#tokenSerial').val();
	 if(tokenSerial != undefined && tokenSerial!= ""){
		 tokenSerial = tokenSerial.replace(/\s/g, " ");
			var token = tokenSerial.split(',');
			var len  = token.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#tokenSerial').val("");
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