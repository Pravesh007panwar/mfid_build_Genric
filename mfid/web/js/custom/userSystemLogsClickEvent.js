
var tempSystemName = '';
//var userSystemBioLogsCount;
var userSystemBioLogsReport;
var userSystemTilesLogsReport;
var userSystemTilesLogsCount;
var globalReportTypeSystemTiles='';
var globalArrayUserSummaryColumnSystemTiles='';
var globalShowPopupWindowSystemTiles = true;
var searchUserSystemBioWithpageSize=false;
var globalBioClickPreviouspageSize="";
var globalBioClickPreviousPageNum="";
//var generateBioClickReportFilter;
var generateReportFilterSystemTiles;

var searchCount;
function getPageDataUserSystemBioLogsReport(){
	//alert('getPageDataUserSystemBioLogsReport');
 	var userSystemLogsSize = document.getElementById('pageIdUserSystemBioLogsReport').value;
 	if($.trim(userSystemLogsSize) != ''){
 	var pageNumberUserSystemLogs = document.getElementById('pageNumUserSystemBioLogsReport').value;
 	if(pageNumberUserSystemLogs=="" || (pageNumberUserSystemLogs=="0" && parseInt(totalPages) > 0 )){ $('#pageNumUserSystemBioLogsReport').val(1);}
 	var totalPages =  $('#pageNUserSystemBioLogsReport').text();
	if ($.trim(pageNumberUserSystemLogs) != "" && parseInt(pageNumberUserSystemLogs) <= parseInt(totalPages))
		bioClick(tempSystemName,true,false);
	else
		alert('Page should be less than or equal to page number.');
 	}
}


function fetchSizeUserSystemBioLogsReport(){
	var userSystemBioLogsSize = document.getElementById('pageIdUserSystemBioLogsReport').value;

	if($.trim(userSystemBioLogsSize) != ''){
		var userSystemBioLogsMaxSize = userSystemTilesLogsCount;
		var userSystemLogsMaxPageNumber = userSystemBioLogsMaxSize/userSystemBioLogsSize;
		var remainderBioSize = userSystemBioLogsMaxSize%userSystemBioLogsSize;
		if(remainderBioSize > 0){
			userSystemLogsMaxPageNumber = userSystemLogsMaxPageNumber+1;
		}
		if(userSystemTilesLogsCount==0){
			$('#pageNumUserSystemBioLogsReport').val(0);
		} else{
			$('#pageNumUserSystemBioLogsReport').val(1);
			$('#pageNumUserSystemBioLogsReport').attr("disabled",false);
		} 				
		$('#pageNUserSystemBioLogsReport').html(parseInt(userSystemLogsMaxPageNumber));
		
	} 
}


var userLogonId="";
var appName="";
var authType="";
var response="";
function bioClick(systemNameVal,pageCall,pageSearch){
	//alert('System Name : ' + systemNameVal);
	tempSystemName = systemNameVal;
	//alert(tilesType);
	var tiles = tilesType;
	//alert(tiles);
	//alert(pageCall);
	//alert(pageSearch);
	//$('#user_systemlogs_tiles_type').empty();
	try {
		 if($("#pageIdUserSystemBioLogsReport").length) {
			 globalBioClickPreviouspageSize = $("#pageIdUserSystemBioLogsReport").val();
			 globalBioClickPreviousPageNum = $("#pageNumUserSystemBioLogsReport").val();
		 }
		// $("#user_onlinelogs_report_data").empty();
		 
		 var myClickUrl="report_userSystemTilesLogsReport.action?fromDate="+from_date_system+"&toDate="+to_date_system+"&domain="+domain+"&systemName="+systemNameVal+tiles;
		 //alert(myClickUrl);
		 if(pageCall){
			 var pageUserSystemBioNumber = document.getElementById("pageNumUserSystemBioLogsReport").value;
			 //alert(pageUserSystemBioNumber);
			  var fetchUserSystemBioSize=document.getElementById("pageIdUserSystemBioLogsReport").value;
			  myClickUrl+="&fetchSize="+fetchUserSystemBioSize+"&pageNumber="+pageUserSystemBioNumber;
		 }
		 if(userLogonId!="" || appName!="" || authType != "" || response!=""){
			 pageSearch=true;
		  } 
		 if(pageSearch){
			  userLogonId=$('#userLogonId').val();
			  appName=$('#appName').val();
			  authType=$('#authType').val();
			  response=$('#response').val();
			 myClickUrl+="&userLogonId="+userLogonId+"&appName="+appName+"&authtype="+authType+"&responseResult="+response;
		 }
		 
		 if(searchUserSystemBioWithpageSize){  
		     if(myClickUrl.indexOf('fetchSize')==-1){
		    	 if($.trim(globalBioClickPreviouspageSize)!='')
		    		 myClickUrl+="&fetchSize="+globalBioClickPreviouspageSize; 
			  }
	    }
		// generateBioClickReportFilter = "&"+myClickUrl.split("?")[1];
		 generateReportFilterSystemTiles  = "&"+myClickUrl.split("?")[1];
		 $('#user_systemlogs_tiles_type').html('<span>Loading...</span>'); 
		 $.ajax({
			 type: "POST",  
			  url:myClickUrl,
			  dataType:"text",
			  success: function(data) {

				  if($.trim(data)=="sessionout"){
							alert(data);
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
					 		var obj=JSON.parse(data);
							var obj1=JSON.parse(obj.userSystemTilesLogsReport);
							var obj2=JSON.parse(obj.userSystemTilesLogsCount);
							//var obj3=JSON.parse(obj.domainList);
							userSystemBioLogsList=JSON.parse(obj.userSystemTilesLogsReport);
							if(searchUserSystemBioWithpageSize){
								searchCount = obj2;
								userSystemTilesLogsCount=obj2;
								// obj2=userSystemTilesLogsCount;
							} else {
								userSystemTilesLogsCount=obj2;
								searchCount = obj2;
							}
					       
							
						var content = '<h4>User Details(Bio)</h4>';			  
							content += '<div class="row-fluid">';
							content += '<div  class="span6">';
							content += '<div class="pull-left" id="switch_app">';
							content += '<label>Size</label>';
							content += '<select id="pageIdUserSystemBioLogsReport" onChange="fetchSizeUserSystemBioLogsReport(),getPageDataUserSystemBioLogsReport();" style="width:100%;" name="pageIdUserSystemBioLogsReport">';
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
							/*content += '<select onChange="getPageDataUserSystemBioLogsReport()" id="pageNumUserSystemBioLogsReport"  >';
							content += '<option value="">Select Page</option>';
							content += '</select>';*/
							content += ' <input type="text" id="pageNumUserSystemBioLogsReport" style="width:20%;background-color:white;" onChange="getPageDataUserSystemBioLogsReport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageNUserSystemBioLogsReport"></span>';
							content += '</div>';
							content += '</div>';
							content += '</div>';
							content += '<table class="table table-striped table-bordered" id="sample_system_tiles_type">';
							content += '<thead>';
							content += '<tr>';
							content += '<th>Sr.No.</th>';
							content += '<th>User Logon Id</th>';
							content += '<th>App</th>';
							content += '<th>Auth Type</th>';
							content += '<th>Response</th>';
							content += '</tr>';
							content += '</thead>';
							content +='<tr>';
							content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="searchUserSystemBioData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp; &nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemBioDataReport(event)"  name="userLogonId" id="userLogonId" ></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemBioDataReport(event)" name="appName" id="appName" ></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemBioDataReport(event)" name="authType" id="authType" ></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemBioDataReport(event)" name="response" id="response" ></th>';
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
											content += "<td>" + val.authType+"</td>";
											content += "<td>" + val.response+"</td>";
											content += "</tr>";
										
										});

							} else {
								content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";
							}
							content += "</table>";
						//	alert(content);
							
							//alert('Bio List' + userSystemBioLogsList);
							if(userSystemBioLogsList!=null && userSystemBioLogsList!='') {
								content+="<div class='expo_option'><div class='row-fluid' id='export_tiles'><div class='span4'><h4>Export options:</h4></div>";
								content+="<div class='span8' >";
								content+="<form method='post' id='systemReportForm1'> ";
								content+="<ul>";
								content+="<li><a href='#' onClick='callUserSystemTilesLogsCsvReport()' class='btn btn-primary'>CSV</a></li>";
								content+="<li><a href='#' onClick='callUserSystemTilesLogsExcelReport()' class='btn btn-primary'>Excel</a></li>";
								content+="<li><a href='#' id='xml' data='xml' onClick='callUserSystemTilesLogsXmlReport()' class='btn btn-primary'>XML</a></li>";
								content+="<li><a href='#' id='pdf' data='pdf' onClick='callUserSystemTilesLogsPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
								content+="</ul>";
								content+="</form>";
								content+="</div></div></div>";
							}
							$('#user_systemlogs_tiles_type').html(content);
							$("#sample_system_tiles_type").css("width", "100%");
							
							$('#userLogonId').val(userLogonId);
							$('#appName').val(appName);
							$('#authType').val(authType);
							$('#response').val(response);
							
				  			 if($.trim(globalBioClickPreviouspageSize) != ''){ 
				  				 $("#pageIdUserSystemBioLogsReport").val(globalBioClickPreviouspageSize);
				  				fetchSizeUserSystemBioLogsReport();
						         if(!searchUserSystemBioWithpageSize)
						        	 $("#pageNumUserSystemBioLogsReport").val(globalBioClickPreviousPageNum);
						         else {
						        	 if(globalBioClickPreviousPageNum==0 && parseInt($('#pageNUserSystemBioLogsReport').text()) > 0)
						        		 	globalBioClickPreviousPageNum="1";
						        		 $("#pageNumUserSystemBioLogsReport").val(globalBioClickPreviousPageNum);
						         }
						     }
					  		//searchUserSystemBioWithpageSize=false;
					  		
					  		if(pageCall==false){
					  			var size = 10;
								if (globalBioClickPreviouspageSize != '') {
									size = parseInt(globalBioClickPreviouspageSize);
									userSystemTilesLogsCount = searchCount;
								}
								
								 if(userLogonId!="" || appName!="" || authType != "" || response!=""){
									 userSystemTilesLogsCount = searchCount;
								 } 
								if(userSystemTilesLogsCount == 0){
									userSystemTilesLogsCount = searchCount;
								}
								var userSystemLogsMaxPageNumber = userSystemTilesLogsCount / size;
								var rem = userSystemTilesLogsCount % size;
								if (rem > 0) {
									userSystemLogsMaxPageNumber = userSystemLogsMaxPageNumber + 1;
								}
								$('#pageNUserSystemBioLogsReport').html(parseInt(userSystemLogsMaxPageNumber));
								if(userSystemTilesLogsCount == 0)
									$('#pageNumUserSystemBioLogsReport').val(0);
								else 
									$('#pageNumUserSystemBioLogsReport').val(1);
							}
					  		
					  		if(userLogonId=="" && appName=="" && authType == "" && response==""){
					  			searchUserSystemBioWithpageSize=false;
							 } 
									
					  }
		 });
	}
	catch(e){
		alert(e);
	}
}

function searchUserSystemBioData(){  
	searchUserSystemBioWithpageSize=true;
	bioClick(tempSystemName,false,true);
}

function searchUserSystemBioDataReport(e){  
	 if (e.keyCode === 13)   
		 searchUserSystemBioData();
}




//var userSystemPushLogsCount;
//var userSystemPushLogsReport;
var searchUserSystemPushWithpageSize=false;
var globalPushClickPreviouspageSize="";
var globalPushClickPreviousPageNum="";
var generatePushClickReportFilter;


function getPageDataUserSystemPushLogsReport(){
	
 	var userSystemLogsSize = document.getElementById('pageIdUserSystemPushLogsReport').value;
 	if($.trim(userSystemPushLogsSize) != ''){
 	var pageNumberUserSystemLogs = document.getElementById('pageNumUserSystemPushLogsReport').value;
 	if(pageNumberUserSystemLogs=="" || (pageNumberUserSystemLogs=="0" && parseInt(totalPages) > 0 )){ $('#pageNumUserSystemPushLogsReport').val(1);}
 	var totalPages =  $('#pageNUserSystemPushLogsReport').text();
	if ($.trim(pageNumberUserSystemLogs) != "" && parseInt(pageNumberUserSystemLogs) <= parseInt(totalPages))
		pushClick(tempSystemName,true,false);
	else
		alert('Page should be less than or equal to page number.');
 	}
}


function fetchSizeUserSystemPushLogsReport(){
	var userSystemPushLogsSize = document.getElementById('pageIdUserSystemPushLogsReport').value;

	if($.trim(userSystemPushLogsSize) != ''){
		var userSystemPushLogsMaxSize = userSystemTilesLogsCount;
		var userSystemPushLogsMaxPageNumber = userSystemPushLogsMaxSize/userSystemPushLogsSize;
		var remainderPushSize = userSystemPushLogsMaxSize%userSystemPushLogsSize;
		if(remainderPushSize > 0){
			userSystemPushLogsMaxPageNumber = userSystemPushLogsMaxPageNumber+1;
		}
		
		if(userSystemTilesLogsCount==0){
			$('#pageNumUserSystemPushLogsReport').val(0);
		} else{
			$('#pageNumUserSystemPushLogsReport').val(1);
			$('#pageNumUserSystemPushLogsReport').attr("disabled",false);
		} 				
		$('#pageNUserSystemPushLogsReport').html(parseInt(userSystemPushLogsMaxPageNumber));
		
	}
}


function pushClick(systemNameVal,pageCall,pageSearch){

	//alert('Push System Name : ' + systemNameVal);
	tempSystemName = systemNameVal;
	//alert(tilesType);
	var tiles = tilesType;
	//alert(tiles);
	//alert(pageCall);
	//alert(pageSearch);
	try {
		 if($("#pageIdUserSystemPushLogsReport").length) {
			 globalPushClickPreviouspageSize = $("#pageIdUserSystemPushLogsReport").val();
			 globalPushClickPreviousPageNum = $("#pageNumUserSystemPushLogsReport").val();
		 }
		 var myClickUrl="report_userSystemTilesLogsReport.action?fromDate="+from_date_system+"&toDate="+to_date_system+"&domain="+domain+"&systemName="+systemNameVal+tiles;
		 //alert(myClickUrl);
		 if(pageCall){
			 var pageUserSystemPushNumber = document.getElementById("pageNumUserSystemPushLogsReport").value;
			 //alert(pageUserSystemPushNumber);
			  var fetchUserSystemPushSize=document.getElementById("pageIdUserSystemPushLogsReport").value;
			  myClickUrl+="&fetchSize="+fetchUserSystemPushSize+"&pageNumber="+pageUserSystemPushNumber;
		 }
		 
		 if(userLogonId!="" || appName!="" || authType != "" || response!=""){
			 pageSearch=true;
		  }
		 
		 if(pageSearch){
			  userLogonId=$('#userLogonId').val();
			  appName=$('#appName').val();
			  authType=$('#authType').val();
			  response=$('#response').val();
			 myClickUrl+="&userLogonId="+userLogonId+"&appName="+appName+"&authtype="+authType+"&responseResult="+response;
		 }
		 
		 if(searchUserSystemPushWithpageSize){  
		     if(myClickUrl.indexOf('fetchSize')==-1){
		    	 if($.trim(globalPushClickPreviouspageSize)!='')
		    		 myClickUrl+="&fetchSize="+globalPushClickPreviouspageSize; 
			  }
	    }
		 //generatePushClickReportFilter = "&"+myClickUrl.split("?")[1];
		 generateReportFilterSystemTiles  = "&"+myClickUrl.split("?")[1];
		 
		 $('#user_systemlogs_tiles_type').html('<span>Loading...</span>');  
		 $.ajax({
			 type: "POST",  
			  url:myClickUrl,
			  dataType:"text",
			  success: function(data) {

				  if($.trim(data)=="sessionout"){
							alert(data);
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
					 		var obj=JSON.parse(data);
							var obj1=JSON.parse(obj.userSystemTilesLogsReport);
							var obj2=JSON.parse(obj.userSystemTilesLogsCount);
							//var obj3=JSON.parse(obj.domainList);
							userSystemPushLogsList=JSON.parse(obj.userSystemTilesLogsReport);
							if(searchUserSystemPushWithpageSize){
								searchCount = obj2;
								userSystemTilesLogsCount=obj2;
								// obj2=userSystemTilesLogsCount;
							} else {
								userSystemTilesLogsCount=obj2;
								searchCount = obj2;
							}
					   						
							var content = '<h4></h4><div class="space15"></div>';
							content += '<div class="row-fluid">';
							content += '<div class="span3">';
							content += '<label><b>User Details(Push)</b> : </label>';
							content += '</div>';
			
							content += '<div class="clear"></div>';
							content += '</div>';
							content += '<div class="space15"></div>';			  
							content += '<div class="row-fluid">';
							content += '<div  class="span6">';
							content += '<div class="pull-left" id="switch_app">';
							content += '<label>Size</label>';
							content += '<select id="pageIdUserSystemPushLogsReport" onChange="fetchSizeUserSystemPushLogsReport(),getPageDataUserSystemPushLogsReport();" style="width:100%;" name="pageIdUserSystemPushLogsReport">';
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
							content += '</select>';
							content += '</div>';
							content += '</div>';
							content += '<div class="span6">';
							content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;" >';
							content += '<label>Page Number</label>';
							/*content += '<select onChange="getPageDataUserSystemPushLogsReport()" id="pageNumUserSystemPushLogsReport"  >';
							content += '<option value="">Select Page</option>';
							content += '</select>';*/
							content += ' <input type="text" id="pageNumUserSystemPushLogsReport" style="width:20%;background-color:white;" onChange="getPageDataUserSystemPushLogsReport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageNUserSystemPushLogsReport"></span>';
							content += '</div>';
							content += '</div>';
							content += '</div>';
							content += '<table class="table table-striped table-bordered" id="sample_system_push_tiles">';
							content += '<thead>';
							content += '<tr>';
							content += '<th>Sr.No.</th>';
							content += '<th>User Logon Id</th>';
							content += '<th>App</th>';
							content += '<th>Auth Type</th>';
							content += '<th>Response</th>';
							content += '</tr>';
							content += '</thead>';
							content +='<tr>';
							content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="searchUserSystemPushData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp; &nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemPushDataReport(event)"  name="userLogonId" id="userLogonId" ></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemPushDataReport(event)" name="appName" id="appName" ></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemPushDataReport(event)" name="authType" id="authType" ></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemPushDataReport(event)" name="response" id="response" ></th>';
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
											content += "<td>" + val.authType+"</td>";
											content += "<td>" + val.response+"</td>";
											content += "</tr>";
										
										});

							} else {
								content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";
							}
							content += "</table>";
						//	alert(content);
							
							//alert('Push List' + userSystemPushLogsList);
							if(userSystemPushLogsList!=null && userSystemPushLogsList!='') {
								content+="<div class='expo_option'><div class='row-fluid' id='export_tiles'><div class='span4'><h4>Export options:</h4></div>";
								content+="<div class='span8' >";
								content+="<form method='post' id='systemReportForm1'> ";
								content+="<ul>";
								content+="<li><a href='#' onClick='callUserSystemTilesLogsCsvReport()' class='btn btn-primary'>CSV</a></li>";
								content+="<li><a href='#' onClick='callUserSystemTilesLogsExcelReport()' class='btn btn-primary'>Excel</a></li>";
								content+="<li><a href='#' id='xml' data='xml' onClick='callUserSystemTilesLogsXmlReport()' class='btn btn-primary'>XML</a></li>";
								content+="<li><a href='#' id='pdf' data='pdf' onClick='callUserSystemTilesLogsPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
								content+="</ul>";
								content+="</form>";
								content+="</div></div></div>";
				        	 }
							$('#user_systemlogs_tiles_type').html(content);
							$("#sample_system_push_tiles").css("width", "100%");
							
							$('#userLogonId').val(userLogonId);
							$('#appName').val(appName);
							$('#authType').val(authType);
							$('#response').val(response);
				  			 if($.trim(globalPushClickPreviouspageSize) != ''){ 
				  				 $("#pageIdUserSystemPushLogsReport").val(globalPushClickPreviouspageSize);
				  				fetchSizeUserSystemPushLogsReport();
						         if(!searchUserSystemPushWithpageSize)
						        	 $("#pageNumUserSystemPushLogsReport").val(globalPushClickPreviousPageNum);
						         else {
						        	 if(globalPushClickPreviousPageNum==0 && parseInt($('#pageNUserSystemPushLogsReport').text()) > 0)
						        		 	globalPushClickPreviousPageNum ="1";
						        	 $("#pageNumUserSystemPushLogsReport").val(globalPushClickPreviousPageNum);
						         }
						     }
					  		//searchUserSystemPushWithpageSize=false;
							  
					  		if(pageCall==false){
					  			var size = 10;
								if (globalPushClickPreviouspageSize != '') {
									size = parseInt(globalPushClickPreviouspageSize);
									userSystemTilesLogsCount = searchCount;
								}
								
								if(userLogonId!="" || appName!="" || authType != "" || response!=""){
									userSystemTilesLogsCount = searchCount;
								  }
								if(userSystemTilesLogsCount == 0){
									userSystemTilesLogsCount = searchCount;
								}
								var userSystemPushLogsMaxPageNumber = userSystemTilesLogsCount / size;
								var rem = userSystemTilesLogsCount % size;
								if (rem > 0) {
									userSystemPushLogsMaxPageNumber = userSystemPushLogsMaxPageNumber + 1;
								}
								$('#pageNUserSystemPushLogsReport').html(parseInt(userSystemPushLogsMaxPageNumber));
								if(userSystemTilesLogsCount == 0)
									$('#pageNumUserSystemPushLogsReport').val(0);
								else 
									$('#pageNumUserSystemPushLogsReport').val(1);
							}
						
					  		if(userLogonId!="" || appName!="" || authType != "" || response!=""){
					  			searchUserSystemPushWithpageSize=false;
							}
					  }
		 });
	}
	catch(e){
		alert(e);
	}
}


function searchUserSystemPushData(){  
	searchUserSystemPushWithpageSize=true;
	pushClick(tempSystemName,false,true);
}

function searchUserSystemPushDataReport(e){  
	 if (e.keyCode === 13)   
		 searchUserSystemPushData();
}



//var userSystemOtpLogsCount;
//var userSystemOtpLogsReport;
var searchUserSystemOtpWithpageSize=false;

var globalOtpClickPreviouspageSize="";
var globalOtpClickPreviousPageNum="";
var generateOtpClickReportFilter;

function getPageDataUserSystemOtpLogsReport(){
	//alert('getPageDataUserSystemOtpLogsReport');
 	var userSystemLogsSize = document.getElementById('pageIdUserSystemOtpLogsReport').value;
 	if($.trim(userSystemOtpLogsSize) != ''){
 	var pageNumberUserSystemLogs = document.getElementById('pageNumUserSystemOtpLogsReport').value;
 	if(pageNumberUserSystemLogs=="" || (pageNumberUserSystemLogs=="0" && parseInt(totalPages) > 0 )){ $('#pageNumUserSystemOtpLogsReport').val(1);}
 	var totalPages =  $('#pageNUserSystemOtpLogsReport').text();
	if ($.trim(pageNumberUserSystemLogs) != "" && parseInt(pageNumberUserSystemLogs) <= parseInt(totalPages))
		otpClick(tempSystemName,true,false);
	else
		alert('Page should be less than or equal to page number.');
 	}
}


function fetchSizeUserSystemOtpLogsReport(){
	var userSystemOtpLogsSize = document.getElementById('pageIdUserSystemOtpLogsReport').value;

	if($.trim(userSystemOtpLogsSize) != ''){
		var userSystemOtpLogsMaxSize = userSystemTilesLogsCount;
		var userSystemOtpLogsMaxPageNumber = userSystemOtpLogsMaxSize/userSystemOtpLogsSize;
		var remainderOtpSize = userSystemOtpLogsMaxSize%userSystemOtpLogsSize;
		if(remainderOtpSize > 0){
			userSystemOtpLogsMaxPageNumber = userSystemOtpLogsMaxPageNumber+1;
		}
		if(userSystemTilesLogsCount==0){
			$('#pageNumUserSystemOtpLogsReport').val(0);
		} else{
			$('#pageNumUserSystemOtpLogsReport').val(1);
			$('#pageNumUserSystemOtpLogsReport').attr("disabled",false);
		} 				
		$('#pageNUserSystemOtpLogsReport').html(parseInt(userSystemOtpLogsMaxPageNumber));
		
	} else {
		$('#pageNumUserSystemOtpLogsReport').val(1);
		
	}
}

function otpClick(systemNameVal,pageCall,pageSearch){

	//alert('Otp System Name : ' + systemNameVal);
	tempSystemName = systemNameVal;
	//alert(tilesType);
	var tiles = tilesType;
	//alert(tiles);
	//alert(pageCall);
	//alert(pageSearch);
	try {
		 if($("#pageIdUserSystemOtpLogsReport").length) {
			 globalOtpClickPreviouspageSize = $("#pageIdUserSystemOtpLogsReport").val();
			 globalOtpClickPreviousPageNum = $("#pageNumUserSystemOtpLogsReport").val();
		 }
		 var myClickUrl="report_userSystemTilesLogsReport.action?fromDate="+from_date_system+"&toDate="+to_date_system+"&domain="+domain+"&systemName="+systemNameVal+tiles;
		 //alert(myClickUrl);
		 if(pageCall){
			 var pageUserSystemOtpNumber = document.getElementById("pageNumUserSystemOtpLogsReport").value;
			 //alert(pageUserSystemOtpNumber);
			  var fetchUserSystemOtpSize=document.getElementById("pageIdUserSystemOtpLogsReport").value;
			  myClickUrl+="&fetchSize="+fetchUserSystemOtpSize+"&pageNumber="+pageUserSystemOtpNumber;
		 }
		 if(userLogonId!="" || appName!="" || authType != "" || response!=""){
			 pageSearch=true;
		  }
		 if(pageSearch){
			 userLogonId=$('#userLogonId').val();
			  appName=$('#appName').val();
			  authType=$('#authType').val();
			  response=$('#response').val();
			 myClickUrl+="&userLogonId="+userLogonId+"&appName="+appName+"&authtype="+authType+"&responseResult="+response;
		 }
		 
		 if(searchUserSystemOtpWithpageSize){  
		     if(myClickUrl.indexOf('fetchSize')==-1){
		    	 if($.trim(globalOtpClickPreviouspageSize)!='')
		    		 myClickUrl+="&fetchSize="+globalOtpClickPreviouspageSize; 
			  }
	    }
		 //generateOtpClickReportFilter = "&"+myClickUrl.split("?")[1];
		 generateReportFilterSystemTiles  = "&"+myClickUrl.split("?")[1];
		 $('#user_systemlogs_tiles_type').html('<span>Loading...</span>');  
		 $.ajax({
			 type: "POST",  
			  url:myClickUrl,
			  dataType:"text",
			  success: function(data) {

				  if($.trim(data)=="sessionout"){
							alert(data);
							testVal= document.getElementById('loginPage').value				
							window.location.replace(testVal);
						}
					 		var obj=JSON.parse(data);
							var obj1=JSON.parse(obj.userSystemTilesLogsReport);
							var obj2=JSON.parse(obj.userSystemTilesLogsCount);
							//var obj3=JSON.parse(obj.domainList);
							userSystemOtpLogsList=JSON.parse(obj.userSystemTilesLogsReport);
							if(searchUserSystemOtpWithpageSize){
								searchCount = obj2;
								userSystemTilesLogsCount=obj2;
								// obj2=userSystemTilesLogsCount;
							} else {
								userSystemTilesLogsCount=obj2;
								searchCount = obj2;
							}
											
							var content = '<h4></h4><div class="space15"></div>';
							content += '<div class="row-fluid">';
							content += '<div class="span3">';
							content += '<label><b>User Details(Otp)</b> : </label>';
							content += '</div>';
			
							content += '<div class="clear"></div>';
							content += '</div>';
							content += '<div class="space15"></div>';			  
							content += '<div class="row-fluid">';
							content += '<div  class="span6">';
							content += '<div class="pull-left" id="switch_app">';
							content += '<label>Size</label>';
							content += '<select id="pageIdUserSystemOtpLogsReport" onChange="fetchSizeUserSystemOtpLogsReport(),getPageDataUserSystemOtpLogsReport();"  style="width:100%;" name="pageIdUserSystemOtpLogsReport">';
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
							content += '</select>';
							content += '</div>';
							content += '</div>';
							content += '<div class="span6">';
							content += '<div class="pull-right" id="switch_app" style="margin-right:-20%;">';
							content += '<label>Page Number</label>';
							/*content += '<select onChange="getPageDataUserSystemOtpLogsReport()" id="pageNumUserSystemOtpLogsReport"  >';
							content += '<option value="">Select Page</option>';
							content += '</select>';*/
							content += ' <input type="text" id="pageNumUserSystemOtpLogsReport" style="width:20%;background-color:white;" onChange="getPageDataUserSystemOtpLogsReport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageNUserSystemOtpLogsReport"></span>';
							content += '</div>';
							content += '</div>';
							content += '</div>';
							content += '<table class="table table-striped table-bordered" id="sample_system_otp_tiles">';
							content += '<thead>';
							content += '<tr>';
							content += '<th>Sr.No.</th>';
							content += '<th>User Logon Id</th>';
							content += '<th>App</th>';
							content += '<th>Auth Type</th>';
							content += '<th>Response</th>';
							content += '</tr>';
							content += '</thead>';
							content +='<tr>';
							content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="searchUserSystemOtpData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp; &nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemOtpDataReport(event)"  name="userLogonId" id="userLogonId" ></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemOtpDataReport(event)" name="appName" id="appName" ></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemOtpDataReport(event)" name="authType" id="authType" ></th>';
							content += '<th><input type="text" onkeydown="searchUserSystemOtpDataReport(event)" name="response" id="response" ></th>';
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
											content += "<td>" + val.authType+"</td>";
											content += "<td>" + val.response+"</td>";
											content += "</tr>";
										
										});

							} else {
								content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";
							}
							content += "</table>";
							
							//alert('Otp List' + userSystemOtpLogsList);
							if(userSystemOtpLogsList!=null && userSystemOtpLogsList!='') {
								content+="<div class='expo_option'><div class='row-fluid' id='export_tiles'><div class='span4'><h4>Export options:</h4></div>";
								content+="<div class='span8' >";
								content+="<form method='post' id='systemReportForm1'> ";
								content+="<ul>";
								content+="<li><a href='#' onClick='callUserSystemTilesLogsCsvReport()' class='btn btn-primary'>CSV</a></li>";
								content+="<li><a href='#' onClick='callUserSystemTilesLogsExcelReport()' class='btn btn-primary'>Excel</a></li>";
								content+="<li><a href='#' id='xml' data='xml' onClick='callUserSystemTilesLogsXmlReport()' class='btn btn-primary'>XML</a></li>";
								content+="<li><a href='#' id='pdf' data='pdf' onClick='callUserSystemTilesLogsPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
								content+="</ul>";
								content+="</form>";
								content+="</div></div></div>";
				        	}
							$('#user_systemlogs_tiles_type').html(content);
							$("#sample_system_otp_tiles").css("width", "100%");
							
							$('#userLogonId').val(userLogonId);
							$('#appName').val(appName);
							$('#authType').val(authType);
							$('#response').val(response);
							
				  			 if($.trim(globalOtpClickPreviouspageSize) != ''){ 
				  				 $("#pageIdUserSystemOtpLogsReport").val(globalOtpClickPreviouspageSize);
				  				fetchSizeUserSystemOtpLogsReport();
						         if(!searchUserSystemOtpWithpageSize)
						        	 $("#pageNumUserSystemOtpLogsReport").val(globalOtpClickPreviousPageNum);
						         else {
						        	 if(globalOtpClickPreviousPageNum==0 && parseInt($('#pageNUserSystemOtpLogsReport').text()) > 0)
						        		 	globalOtpClickPreviousPageNum="1";
						        	 $("#pageNumUserSystemOtpLogsReport").val(globalOtpClickPreviousPageNum);
						         } 
						        	 
						     }
					  		//searchUserSystemOtpWithpageSize=false;
					  		
					  		if(pageCall==false){
					  			
					  			var size = 10;
								if (globalOtpClickPreviouspageSize != '') {
									size = parseInt(globalOtpClickPreviouspageSize);
									userSystemTilesLogsCount = searchCount;
								}
								
								if(userLogonId!="" || appName!="" || authType != "" || response!=""){
									userSystemTilesLogsCount = searchCount;
								}
								if(userSystemTilesLogsCount == 0){
									userSystemTilesLogsCount = searchCount;
								}
								var userSystemOtpLogsMaxPageNumber = userSystemTilesLogsCount / size;
								var rem = userSystemTilesLogsCount % size;
								if (rem > 0) {
									userSystemOtpLogsMaxPageNumber = userSystemOtpLogsMaxPageNumber + 1;
								}
								$('#pageNUserSystemOtpLogsReport').html(parseInt(userSystemOtpLogsMaxPageNumber));
								if(userSystemTilesLogsCount == 0)
									$('#pageNumUserSystemOtpLogsReport').val(0);
								else 
									$('#pageNumUserSystemOtpLogsReport').val(1);
							}
					  		if(userLogonId=="" && appName=="" && authType == "" && response==""){
					  			searchUserSystemOtpWithpageSize=false;
							 } 
						
					  }
		 });
	}
	catch(e){
		alert(e);
	}
}

function searchUserSystemOtpData(){  
	searchUserSystemOtpWithpageSize=true;
	otpClick(tempSystemName,false,true);
}

function searchUserSystemOtpDataReport(e){  
	 if (e.keyCode === 13)   
		 searchUserSystemOtpData();
}

function callUserSystemTilesLogsCsvReport(){
	try {
	globalReportTypeSystemTiles = "csv";
	if(globalShowPopupWindowSystemTiles){
		$('#myModalSystemTiles').modal('show');
	} else {
		$('#myModalSystemTiles').modal('hide');
		
		var reportType = "csv";
		var url="reportgen_systemTilesLogsReport?reportType="+reportType+"&fileName=SystemLogReportBasedOnTiles.csv&reportColumns="+globalArrayUserSummaryColumnSystemTiles+generateReportFilterSystemTiles;
		$('#systemReportForm1').attr("action",url);
		$('#systemReportForm1').submit();
		globalShowPopupWindowSystemTiles=true;
		//resetAllCheckboxSystem();
	}
  }
	catch(e){
		alert(e);
	}
}

function callUserSystemTilesLogsExcelReport(){
	
	if(validateExcelCount()){
	
	try {
	globalReportTypeSystemTiles = "excel";
	if(globalShowPopupWindowSystemTiles){
		$('#myModalSystemTiles').modal('show');
	} else {
		$('#myModalSystemTiles').modal('hide');
		
		var reportType = "excel";
		var url="reportgen_systemTilesLogsReport?reportType="+reportType+"&fileName=SystemLogReportBasedOnTiles.xlsx&reportColumns="+globalArrayUserSummaryColumnSystemTiles+generateReportFilterSystemTiles;
		$('#systemReportForm1').attr("action",url);
		$('#systemReportForm1').submit();
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


function callUserSystemTilesLogsXmlReport(){
	if(validateXMLCount()) {
	try {
		globalReportTypeSystemTiles = "xml";
		if(globalShowPopupWindowSystemTiles){
			$('#myModalSystemTiles').modal('show');
		} else {
			$('#myModalSystemTiles').modal('hide');
			
			var reportType = "xml";
			var url="reportgen_systemTilesLogsReport?reportType="+reportType+"&fileName=SystemLogReportBasedOnTiles.xml&reportColumns="+globalArrayUserSummaryColumnSystemTiles+generateReportFilterSystemTiles;
			$('#systemReportForm1').attr("action",url);
			$('#systemReportForm1').submit();
			globalShowPopupWindowSystemTiles=true;
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

function callUserSystemTilesLogsPdfReport(){
	if(validatePDFCount()){
	globalReportTypeSystemTiles = "pdf";
	
	if(globalShowPopupWindowSystemTiles){
		$('#myModalSystemTiles').modal('show');
	} else {
		$('#myModalSystemTiles').modal('hide');
		
		var reportType = "pdf";
		//var url = "";
		var url="reportgen_systemTilesLogsReport?reportType="+reportType+"&fileName=SystemLogReportBasedOnTiles.pdf&reportColumns="+globalArrayUserSummaryColumnSystemTiles+generateReportFilterSystemTiles;
		$('#systemReportForm1').attr("action",url);
		$('#systemReportForm1').submit();
		globalShowPopupWindowSystemTiles=true;
		//resetAllCheckboxSystem();
	}
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
}

function exportUserTilesLogReportSystem(){
	var arrayUserSummaryColumn = $.map($('input[name="systemuserlogtilesreportcolumn"]:checked'), function(c){return c.value; })
	if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "" ) {
		alert("Please Select at least one column for Export. ");
	} else {
		globalArrayUserSummaryColumnSystemTiles = arrayUserSummaryColumn;
		globalShowPopupWindowSystemTiles = false;
		
		if(globalReportTypeSystemTiles == "csv")
			callUserSystemTilesLogsCsvReport();
		else if(globalReportTypeSystemTiles == "excel")
			callUserSystemTilesLogsExcelReport();
		else if(globalReportTypeSystemTiles == "xml")
			callUserSystemTilesLogsXmlReport();
		else if(globalReportTypeSystemTiles == "pdf")
			callUserSystemTilesLogsPdfReport();
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


