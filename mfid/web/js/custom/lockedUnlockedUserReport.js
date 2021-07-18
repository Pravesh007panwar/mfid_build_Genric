function removeFilter(){
	$('#userName').val("");
	$('#locktype').val("");
}

var org;
var count;
var searchCount;
var app;
var domainn;
var lockedUnlockedList;
var searchLockedUnlockedUserReportWithpageSize=false;
var globalPersistLockedUnlockedDomainValue="";
var genLockedUnlockedUserFilter = '';

function getPageData_lockedUnlockedUser() {

	var size = document.getElementById('pageId_lockedUnlockedUser').value;
	if ($.trim(size) != '') {
	var pageNumber = document.getElementById('pageNum_lockedUnlockedUser').value;
	var totalPages =  $('#pageN_lockedUnlockedUser').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_lockedUnlockedUser').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		getLockedUnlockedDetail(app, domainn, false, true);
	else
		alert('Page should be less than or equal to page number.');
	}

}

	
	function fetchSize_lockedUnlockedUser() { 

	var size = document.getElementById('pageId_lockedUnlockedUser').value;

	if ($.trim(size) != '') {
		var maxSize = count;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		
		if(count==0){
			$('#pageNum_lockedUnlockedUser').val(0);
		} else{
			$('#pageNum_lockedUnlockedUser').val(1);
			$('#pageNum_lockedUnlockedUser').attr("disabled",false);
		} 				
		$('#pageN_lockedUnlockedUser').html(parseInt(maxPgaeNumber));
	
	} 
}


function changeDomainReport()
{
	var domain=document.getElementById("domain").value;
	globalPersistLockedUnlockedDomainValue=domain;
	if($.trim(domain) != "")
	 lockedUnlockedReport(domain);
}

function lockedUnlockedReport(domain){

	var test=new Array();
	var test2=new Array();
	var listApp=new Array();
		var AppList= new Array();
	var ListLockedStatus=new Array();
	var ListUnlockedStatus=new Array();
	var testApp=new Array();
	
	$.ajax
	({
	
	url: "report_runLockedUnlockedUsersRreport.action?domain="+domain,  
	dataType:"json",
	type: "POST",  
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
		var obj1=JSON.parse(object.lockedUnlockedUsersReportList);
		var obj2=JSON.parse(object.domainList);
		
		
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
			
			if(globalPersistLockedUnlockedDomainValue != "")
			     $("#domain").val(globalPersistLockedUnlockedDomainValue);
		
		if(object.lockedUnlockedUsersReportList!=null)
	{
			
			
	var j=0;


	$.each(obj1, function(i,data)
	{
	
	
		var lockedStatus=data.status_locked;
		var unlockedStatus=data.status_unlocked;
	
	ListLockedStatus.push(data.status_locked);
	ListUnlockedStatus.push(data.status_unlocked);
	var appId=data.appName;
	var appIs=appId;
	listApp.push(data.appName);

   
	});
	var AppList=JSON.stringify(listApp).toString();
	var test = JSON.stringify(ListLockedStatus).toString();
	var test2=JSON.stringify(ListUnlockedStatus).toString();
	
	AppList = AppList.replace(/"/g,'\'');
	 $('#locked_unlocked_user_chart').highcharts({
		            chart: {
		                type: 'column',
		                height:400
		            },
		            title: {
		                text:'Locked/Unlocked User Report'
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
		                    text: 'Number of Users'
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
		                        	  app=this.category;
		                        	  domainn=domain;
		                        	  try{ $("#pageId_lockedUnlockedUser").val(''); $("#pageNum_lockedUnlockedUser").val(''); }catch(err){}
		                        	  getLockedUnlockedDetail(this.category,domain,false,false);
		                          }
		                      }
		                  }
		                }
		            },
		             series: [{
		                name: 'Locked',
		                data: JSON.parse(test)
		            }, {
		                name: 'Unlocked',
		                data: JSON.parse(test2)
		            }]
		        });
	}
	
	
	else
	{
		$("#locked_unlocked_user_chart").html("No Results");
	}
	}
	});
	

	
	}


		 
		/* function showLockedUnlockedUserFirstTime(organisation){
				try{
				org=organisation;
				content = '<div class="row-fluid">';
				content += '<div class="span3 offset1">';
				content += '<select  onChange="lockedUnlockedReport()" id="report_domain">';
				content += '<option value="">-select Domain-</option>';
													
				content += '</select>';
				content += '</div>';

				content += '</div>';

				$('#locked_unlocked_user_domain').html(content);
				
				showDomainListForManageRole(org);
				lockedUnlockedReport();
				}
				catch (e) {
					alert(e)
					// TODO: handle exception
				}
			}*/
		 
		 /*function showDomainListForManageRole(o){
				

				try{
			                $.ajax
				({
				url: 'GetDomainAction.action?organisationName='+o,  
				cache: false,
				dataType:"json",
				success: function(data)
				{
				     var listData=new Array();
					
				$.each(data.Messages, function(i,data)
				{
					
			    listData.push([data]);
				});
				var sel = document.getElementById('report_domain');
				for(var i = 0; i < listData.length; i++) {
				//alert("data to be put"+listData[i]);

				var opt = sel.options;
				opt[opt.length] = new Option(listData[i],listData[i])
			}
			            }
			             });   
				}catch (e) {
				//alert(e);
					// TODO: handle exception
				}
			                }
*/
		 
		 $(document).on('click','.close_table',function(){  
				$(this).parent('div').hide(300);

				});
		 
	
var globalLockedUnlockedUserReportPreviouspageSize="";
var globalLockedUnlockedUserReportPreviousPageNum="";
var userName="";
var userStatus="";
		 function getLockedUnlockedDetail(app,domain,pageSearch,pageCall)
		 {
			 

			   if($("#pageId_lockedUnlockedUser").length)
			       {
				    globalLockedUnlockedUserReportPreviouspageSize=$("#pageId_lockedUnlockedUser").val();
				    globalLockedUnlockedUserReportPreviousPageNum=$("#pageNum_lockedUnlockedUser").val();
			        }
			
		
		     $('#locked_unlocked_user_data').show();
			
			 try{
			 var myUrl="report_runLockedUnlockedUserDetailReport.action?appName="+app+"&domain="+domain;
			 var dataString="";
			 
			 if(userName!="" || userStatus!=""){
				 pageSearch=true;
				} 
			 
			 if(pageSearch)
				 {
				
				 userName=document.getElementById("userName").value;
				 	userName = userName.replace(/\s/g, "");
				 userStatus=document.getElementById("locktype").value;
				 //myUrl+="&userName="+userName+"&userStatus="+userStatus;
				 dataString+="&userName="+userName+"&userStatus="+userStatus;
				
				 }
			 if(pageCall)
				 {
				
				  var fetchSize = document.getElementById("pageId_lockedUnlockedUser").value;
				  var pageNumber = document.getElementById("pageNum_lockedUnlockedUser").value;
				
				myUrl+="&fetchSize="+fetchSize+"&pageNumber="+pageNumber;

				 }
			 genLockedUnlockedUserFilter  = "&"+myUrl.split("?")[1];
	
			   if(searchLockedUnlockedUserReportWithpageSize)
			      {  
		   	     if(myUrl.indexOf('fetchSize')==-1)
		   		   { if($.trim(globalLockedUnlockedUserReportPreviouspageSize)!='')
		   			myUrl+="&fetchSize="+globalLockedUnlockedUserReportPreviouspageSize; 
		   		   }
		        }
		 
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
			 var obj1=JSON.parse(object.reportList);
			 lockedUnlockedList=JSON.parse(object.reportList);
		     var obj2=JSON.parse(object.count);
		     
	
	          if(searchLockedUnlockedUserReportWithpageSize){
	        	  searchCount = obj2;
	        	  count=obj2;
	        	  //obj2=count;
	          } else {
	        	  searchCount = obj2;
	        	  count=obj2;
	          }
	        	 
  
		    
			 var content = ' <span class="close_icon close_table"><a href="javascript:void(0);"><i class="icon-remove-sign"></i></a></span><h4>Locked Unlocked User Report</h4>';
				content += '<div class="row-fluid">';
				content += '<div  class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_lockedUnlockedUser" onChange="fetchSize_lockedUnlockedUser(),getPageData_lockedUnlockedUser();" name="deassociationReasonListName" style="width:100%;">';
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
					/*content += '<select onChange="getPageData_lockedUnlockedUser()" id="pageNum_lockedUnlockedUser"  >';
					content += '<option value="">-select Page-</option>';
					content += '</select>';*/
					content += ' <input type="text" id="pageNum_lockedUnlockedUser" style="width:20%;background-color:white;" onChange="getPageData_lockedUnlockedUser()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_lockedUnlockedUser"></span>';
				content += '</div>';
				content += '</div>';
			content += '</div>';
			 content += '<table class="table table-striped table-bordered" id="sample_2">';
			 content += '<thead>';
			 content += '<tr>';
			 content += '<th>Sr No.</th>';
			 content += '<th>User Name</th>';
			 content += '<th>Status</th>';
			
			 content += '</tr>';
			 content += '<tr>';
			 content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="search_data()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			 content += '<th><input type="text"  onkeydown="searchLockedUnLockedUserReport(event)" id="userName" name="userName"/></th>';
			 
			 content += '<th>';
			 content += '<select class="ass-dss-select span12" name="locktype" id="locktype" >';
			 content += '<option value="all">All</option>';
			 content += '<option value="Locked">Locked</option>';
			 content += '<option value="Unlocked">Unlocked</option>';

			 content += '</select>';
			 content += '</th>';
			
			 content += '</tr>';
			 content += '</thead>';
			 try{
		
			 if(object.reportList!=null && obj1 !=null  && obj1 !=''){
			 jQuery.each(obj1, function(i, v) {
			 i = (i+1);
			 content += "<tr>";
			 content += "<td>"+i+"</td>";
			 content += "<td>"+v.userLoginId+"</td>";
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
			 //alert;
			 }
			 content += "</table>";
			
			 if(lockedUnlockedList!=null &&lockedUnlockedList!='')
				 {
				 content+="<div class='expo_option'><div class='row-fluid' id='expo_opt1'><div class='span4'><h4>Export options:</h4></div>";
             content+="<div class='span8' >";
             content+="<form method='post' id='reportForm'> ";
             content+="<input type='hidden' name='userName' id='user_name'/>";
             content+="<input type='hidden' name='userStatus' id='user_status'/>";
             content+="<ul>";
             content+="<li><a href='#' onClick='callCsvReport()' class='btn btn-primary'>CSV</a></li>";
             content+="<li><a href='#' onClick='callExcelReport()' class='btn btn-primary'>Excel</a></li>";
             content+="<li><a href='#' id='xml' data='xml' onClick='callXmlReport()' class='btn btn-primary'>XML</a></li>";
             content+="<li><a href='#' id='pdf' data='pdf' onClick='callPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
             content+="</ul>";
             content+="</form>";
             content+="</div></div></div>";
        	
				 }
			 $('#locked_unlocked_user_data').html(content);
			
			 $('#userName').val(userName);
			 $('#locktype').val(userStatus);
	
			   if($.trim(globalLockedUnlockedUserReportPreviouspageSize) != '')
		        {  $("#pageId_lockedUnlockedUser").val(globalLockedUnlockedUserReportPreviouspageSize);
		           fetchSize_lockedUnlockedUser();
		         if(!searchLockedUnlockedUserReportWithpageSize)
		        	 $("#pageNum_lockedUnlockedUser").val(globalLockedUnlockedUserReportPreviousPageNum);
		         else {
		        	 if(globalLockedUnlockedUserReportPreviousPageNum==0 && parseInt($('#pageN_lockedUnlockedUser').text()) > 0)
		        		 globalLockedUnlockedUserReportPreviousPageNum="1";
		        	 $("#pageNum_lockedUnlockedUser").val(globalLockedUnlockedUserReportPreviousPageNum);
		         }
		       }
			 // searchLockedUnlockedUserReportWithpageSize=false;
			  
				if(pageCall==false){
					var size = 10;
					if (globalLockedUnlockedUserReportPreviouspageSize != '') {
						size = parseInt(globalLockedUnlockedUserReportPreviouspageSize);
						count = searchCount;
					}
					
					if(userName!="" || userStatus!=""){
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
					$('#pageN_lockedUnlockedUser').html(parseInt(maxPgaeNumber));
					if(count == 0)
						$('#pageNum_lockedUnlockedUser').val(0);
					else 
						$('#pageNum_lockedUnlockedUser').val(1);
				}
				if(userName=="" && userStatus==""){
					searchLockedUnlockedUserReportWithpageSize=false;
				}
		 
			 }

			 });
		 }
			 catch(e)
			 {
				 alert("Exception :  "+e);
			 }
		 }	 
		 
		 function search_data()
		 {
			 if(validateLockedUnLockedSearch()){
				 searchLockedUnlockedUserReportWithpageSize=true;
				 getLockedUnlockedDetail(app,domainn,true,false);
			 } else {
				 validateLockedUnLockedSearch();
			 }
			 
		 }
		 
		 function callPdfReport()
			{	
			 if(validatePDFCount()){
				var reportType="pdf";
				var url="reportgen_lockUnlockUserReport?reportType="+reportType+"&fileName=lockUnlock_user_report.pdf"+genLockedUnlockedUserFilter;
				$('#user_name').val(userName);
				$('#user_status').val(userStatus);
				$('#reportForm').attr("action",url);
				$('#reportForm').submit();
			 } else {
				 alert('Your data is more than 200000. Please download the report in CSV Format!');
			 }
			
			}
			
			function callXmlReport()
			{	
				if(validateXMLCount()) {
				var reportType="xml";
				var url="reportgen_lockUnlockUserReport?reportType="+reportType+"&fileName=lockUnlock_user_report.xml"+genLockedUnlockedUserFilter;
				$('#user_name').val(userName);
				$('#user_status').val(userStatus);
				$('#reportForm').attr("action",url);
				$('#reportForm').submit();
				} else {
					 alert('Your data is more than 100000. Please download the report in CSV Format!');
				}
			}
			
			function callExcelReport()
			{
				if(validateExcelCount()){
				var reportType="excel";
				var url="reportgen_lockUnlockUserReport?reportType="+reportType+"&fileName=lockUnlock_user_report.xlsx"+genLockedUnlockedUserFilter;
				$('#user_name').val(userName);
				$('#user_status').val(userStatus);
				$('#reportForm').attr("action",url);
				$('#reportForm').submit();
				} else {
					alert('Your data is more than 500000. Please download the report in CSV Format!');
				}
			}
			
			function callCsvReport()
			{				
				var reportType="csv";
				var url="reportgen_lockUnlockUserReport?reportType="+reportType+"&fileName=lockUnlock_user_report.csv"+genLockedUnlockedUserFilter;
				$('#user_name').val(userName);
				$('#user_status').val(userStatus);
				$('#reportForm').attr("action",url);
				$('#reportForm').submit();
			}
			
		
			 function searchLockedUnLockedUserReport(e)
			 {  
			 	 if (e.keyCode === 13)   
			 		search_data();
			 }
		
			function validateLockedUnLockedSearch(){
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