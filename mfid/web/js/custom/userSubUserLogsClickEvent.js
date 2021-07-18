
var tempData = '';
//var userBioLogsCount;
//var userBioLogsReport;
var userTilesLogsReport;
var userTilesLogsCount;
var globalReportTypeUserTiles='';
var globalArrayUserSummaryColumnUserTiles='';
var globalShowPopupWindowUserTiles = true;
var searchUserTilesBioWithpageSize=false;
var globalTilesBioClickPreviouspageSize="";
var globalTilesBioClickPreviousPageNum="";
//var generateBioClickReportFilter;
var generateReportFilterUserTiles;
var searchCount;
function getPageDataUserTilesBioLogsReport(){
	
 	var userSystemLogsSize = document.getElementById('pageIdUserTilesBioLogsReport').value;
 	if($.trim(userSystemBioLogsSize) != ''){
 	var pageNumberUserSystemLogs = document.getElementById('pageNumUserTilesBioLogsReport').value;
 	if(pageNumberUserSystemLogs=="" || (pageNumberUserSystemLogs=="0" && parseInt(totalPages) > 0 )){ $('#pageNumUserTilesBioLogsReport').val(1);}
 	var totalPages =  $('#pageNUserTilesBioLogsReport').text();
	if ($.trim(pageNumberUserSystemLogs) != "" && parseInt(pageNumberUserSystemLogs) <= parseInt(totalPages))
		userBioClick(tempData,true,false);
	else
		alert('Page should be less than or equal to page number.');
 	}
}


function fetchSizeUserTilesBioLogsReport(){
	var userSystemBioLogsSize = document.getElementById('pageIdUserTilesBioLogsReport').value;

	if($.trim(userSystemBioLogsSize) != ''){
		var userSystemBioLogsMaxSize = userTilesLogsCount;
		var userSystemLogsMaxPageNumber = userSystemBioLogsMaxSize/userSystemBioLogsSize;
		var remainderBioSize = userSystemBioLogsMaxSize%userSystemBioLogsSize;
		if(remainderBioSize > 0){
			userSystemLogsMaxPageNumber = userSystemLogsMaxPageNumber+1;
		}
		if(userTilesLogsCount==0){
			$('#pageNumUserTilesBioLogsReport').val(0);
		} else{
			$('#pageNumUserTilesBioLogsReport').val(1);
			$('#pageNumUserTilesBioLogsReport').attr("disabled",false);
		} 				
		$('#pageNUserTilesBioLogsReport').html(parseInt(userSystemLogsMaxPageNumber));
	} 
}

var searchUserLogonId="";
var appName="";
var authType="";
var response="";

function userBioClick(data,pageCall,pageSearch){
	
	var arrayData = data.split(',');
	var systemNameVal = arrayData[0];
	var userLogonId = arrayData[1];
	//alert('systemNameVal:: ' + systemNameVal);
	//alert('User LogonId:: ' + userLogonId);
	tempData = data;
	//alert(tilesType);
	var tiles = tilesType;
	//alert(tiles);
	//alert(pageCall);
	//alert(pageSearch);
	try {
		 if($("#pageIdUserTilesBioLogsReport").length) {
			 globalTilesBioClickPreviouspageSize = $("#pageIdUserTilesBioLogsReport").val();
			 globalTilesBioClickPreviousPageNum = $("#pageNumUserTilesBioLogsReport").val();
		 }
		
		 
		 var myClickUrl="report_userSubUserTilesLogsReport.action?fromDate="+from_date_user+"&toDate="+to_date_user+"&domain="+domain+"&systemName="+systemNameVal+tiles+"&userLogonId="+encodeURIComponent(userLogonId);
		 //"+from_date_system+"&toDate="+to_date_system+"&domain="+domain+"&systemName="+systemNameVal+tiles;
		 //alert(myClickUrl);
		 if(pageCall){
			 var pageUserSystemBioNumber = document.getElementById("pageNumUserTilesBioLogsReport").value;
			 //alert(pageUserSystemBioNumber);
			  var fetchUserSystemBioSize=document.getElementById("pageIdUserTilesBioLogsReport").value;
			  myClickUrl+="&fetchSize="+fetchUserSystemBioSize+"&pageNumber="+pageUserSystemBioNumber;
		 }
		 if(searchUserLogonId !="" || appName!="" || authType!="" || response!="" ){
			 pageSearch=true;
		 }
		 if(pageSearch){
			  searchUserLogonId=$('#searchUserLogonId').val();
			  appName=$('#appName').val();
			  authType=$('#authType').val();
			  response=$('#response').val();
			 myClickUrl+="&searchUserLogonId="+searchUserLogonId+"&appName="+appName+"&authtype="+authType+"&responseResult="+response;
		 }
		 
		 if(searchUserTilesBioWithpageSize){  
		     if(myClickUrl.indexOf('fetchSize')==-1){
		    	 if($.trim(globalTilesBioClickPreviouspageSize)!='')
		    		 myClickUrl+="&fetchSize="+globalTilesBioClickPreviouspageSize; 
			  }
	    }
		 generateReportFilterUserTiles  = "&"+myClickUrl.split("?")[1];
		
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
							var obj1=JSON.parse(obj.userTilesLogsReport);
							var obj2=JSON.parse(obj.userTilesLogsCount);
							//var obj3=JSON.parse(obj.domainList);
							userTilesBioLogsList=JSON.parse(obj.userTilesLogsReport);
							if(searchUserTilesBioWithpageSize){
								searchCount = obj2; 
								userTilesLogsCount=obj2;
								//obj2=userTilesLogsCount;
							} else {
								userTilesLogsCount=obj2;
								searchCount = obj2; 
							}
					        
							
						var content = '<h4>User Details(Bio)</h4>';			  
							content += '<div class="row-fluid">';
							content += '<div  class="span6">';
							content += '<div class="pull-left" id="switch_app">';
							content += '<label>Size</label>';
							content += '<select id="pageIdUserTilesBioLogsReport" onChange="fetchSizeUserTilesBioLogsReport(),getPageDataUserTilesBioLogsReport();" style="width:100%;" name="pageIdUserTilesBioLogsReport">';
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
							/*content += '<select onChange="getPageDataUserTilesBioLogsReport()" id="pageNumUserTilesBioLogsReport"  >';
							content += '<option value="">Select Page</option>';
							content += '</select>';*/
							content += ' <input type="text" id="pageNumUserTilesBioLogsReport" style="width:20%;background-color:white;" onChange="getPageDataUserTilesBioLogsReport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageNUserTilesBioLogsReport"></span>';
							content += '</div>';
							content += '</div>';
							content += '</div>';
							content += '<table class="table table-striped table-bordered" id="sample_user_tiles_type">';
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
							content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="searchUserTilesBioData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesBioDataReport(event)"  name="searchUserLogonId" id="searchUserLogonId" ></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesBioDataReport(event)" name="appName" id="appName" ></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesBioDataReport(event)" name="authType" id="authType" ></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesBioDataReport(event)" name="response" id="response" ></th>';
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
							
							//alert('Bio List' + userTilesBioLogsList);
							if(userTilesBioLogsList!=null && userTilesBioLogsList!='') {
								content+="<div class='expo_option'><div class='row-fluid' id='export_tiles'><div class='span4'><h4>Export options:</h4></div>";
								content+="<div class='span8' >";
								content+="<form method='post' id='userTilesReportForm'> ";
								content+="<ul>";
								content+="<li><a href='#' onClick='callUserTilesLogsCsvReport()' class='btn btn-primary'>CSV</a></li>";
								content+="<li><a href='#' onClick='callUserTilesLogsExcelReport()' class='btn btn-primary'>Excel</a></li>";
								content+="<li><a href='#' id='xml' data='xml' onClick='callUserTilesLogsXmlReport()' class='btn btn-primary'>XML</a></li>";
								content+="<li><a href='#' id='pdf' data='pdf' onClick='callUserTilesLogsPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
								content+="</ul>";
								content+="</form>";
								content+="</div></div></div>";
							}
							$('#user_sub_logs_tiles_type').html(content);
							$("#sample_user_tiles_type").css("width", "100%");
							
							$('#searchUserLogonId').val(searchUserLogonId);
							$('#appName').val(appName);
							$('#authType').val(authType);
							$('#response').val(response);
							
				  			 if($.trim(globalTilesBioClickPreviouspageSize) != ''){ 
				  				 $("#pageIdUserTilesBioLogsReport").val(globalTilesBioClickPreviouspageSize);
				  				fetchSizeUserTilesBioLogsReport();
						         if(!searchUserTilesBioWithpageSize){
						        	 if(globalTilesBioClickPreviousPageNum==0 && parseInt($('#pageNUserTilesBioLogsReport').text()) > 0)
						        		 globalTilesBioClickPreviousPageNum="1";
						        	 $("#pageNumUserTilesBioLogsReport").val(globalTilesBioClickPreviousPageNum);
						         } else {
						        	 if(globalTilesBioClickPreviousPageNum==0 && parseInt($('#pageNUserTilesBioLogsReport').text()) > 0)
						        		 globalTilesBioClickPreviousPageNum="1";
						        	 $("#pageNumUserTilesBioLogsReport").val(globalTilesBioClickPreviousPageNum);
						         }
						     }
					  		
							  
					  		if(pageCall==false){
					  			var size = 10;
					  			 if(globalTilesBioClickPreviouspageSize != ''){ 
					  				 size = globalTilesBioClickPreviouspageSize;
					  				userTilesLogsCount = searchCount;
					  			 }
					  			if(searchUserLogonId !="" || appName!="" || authType!="" || response!="" ){
					  				userTilesLogsCount = searchCount;
					  			 }
					  			if(userTilesLogsCount == 0){
					  				userTilesLogsCount = searchCount;
								}
								var maxPgaeNumber = userTilesLogsCount / size;
								var rem = userTilesLogsCount % size;
								if (rem > 0) {
									maxPgaeNumber = maxPgaeNumber + 1;
								}
								$('#pageNUserTilesBioLogsReport').html(parseInt(maxPgaeNumber));
								if(userTilesLogsCount == 0)
									$('#pageNumUserTilesBioLogsReport').val(0);
								else 
									$('#pageNumUserTilesBioLogsReport').val(1);
							}
					  		
					  		if(searchUserLogonId =="" || appName=="" || authType=="" || response=="" ){
					  			searchUserTilesBioWithpageSize=false;
				  			 }
						
					  }
		 });
	}
	catch(e){
		alert(e);
	}
}

function searchUserTilesBioData(){  
	searchUserTilesBioWithpageSize=true;
	userBioClick(tempData,false,true);
}

function searchUserTilesBioDataReport(e){  
	 if (e.keyCode === 13)   
		 searchUserTilesBioData();
}




//var userPushLogsCount;
//var userPushLogsReport;
var searchUserTilesPushWithpageSize=false;
var globalTilesPushClickPreviouspageSize="";
var globalTilesPushClickPreviousPageNum="";
var generatePushClickReportFilterTiles;


function getPageDataUserTilesPushLogsReport(){
	//alert('getPageDataUserTilesPushLogsReport');
 	var userSystemLogsSize = document.getElementById('pageIdUserTilesPushLogsReport').value;
 	if($.trim(userSystemPushLogsSize) != ''){
 	var pageNumberUserSystemLogs = document.getElementById('pageNumUserTilesPushLogsReport').value;
 	if(pageNumberUserSystemLogs=="" || (pageNumberUserSystemLogs=="0" && parseInt(totalPages) > 0 )){ $('#pageNumUserTilesPushLogsReport').val(1);}
 	var totalPages =  $('#pageNUserTilesPushLogsReport').text();
	if ($.trim(pageNumberUserSystemLogs) != "" && parseInt(pageNumberUserSystemLogs) <= parseInt(totalPages))
		userPushClick(tempData,true,false);
	else
		alert('Page should be less than or equal to page number.');
 	}
}


function fetchSizeUserTilesPushLogsReport(){
	var userSystemPushLogsSize = document.getElementById('pageIdUserTilesPushLogsReport').value;

	if($.trim(userSystemPushLogsSize) != ''){
		var userSystemPushLogsMaxSize = userTilesLogsCount;
		var userSystemPushLogsMaxPageNumber = userSystemPushLogsMaxSize/userSystemPushLogsSize;
		var remainderPushSize = userSystemPushLogsMaxSize%userSystemPushLogsSize;
		if(remainderPushSize >= 0){
			userSystemPushLogsMaxPageNumber = userSystemPushLogsMaxPageNumber+1;
		}
		if(userTilesLogsCount==0){
			$('#pageNumUserTilesPushLogsReport').val(0);
		} else{
			$('#pageNumUserTilesPushLogsReport').val(1);
			$('#pageNumUserTilesPushLogsReport').attr("disabled",false);
		} 				
		$('#pageNUserTilesPushLogsReport').html(parseInt(userSystemPushLogsMaxPageNumber));
		
	} 
}


function userPushClick(data,pageCall,pageSearch){

	//alert('Data : ' + data);
	var arrayData = data.split(',');
	var systemNameVal = arrayData[0];
	var userLogonId = arrayData[1];
	tempData = data;
	//alert(tilesType);
	var tiles = tilesType;
	//alert(tiles);
	//alert(pageCall);
	//alert(pageSearch);
	try {
		 if($("#pageIdUserTilesPushLogsReport").length) {
			 globalTilesPushClickPreviouspageSize = $("#pageIdUserTilesPushLogsReport").val();
			 globalTilesPushClickPreviousPageNum = $("#pageNumUserTilesPushLogsReport").val();
		 }
		 var myClickUrl="report_userSubUserTilesLogsReport.action?fromDate="+from_date_user+"&toDate="+to_date_user+"&domain="+domain+"&systemName="+systemNameVal+"&userLogonId="+userLogonId+tiles;
		 //alert(myClickUrl);
		 if(pageCall){
			 var pageUserSystemPushNumber = document.getElementById("pageNumUserTilesPushLogsReport").value;
			 //alert(pageUserSystemPushNumber);
			  var fetchUserSystemPushSize=document.getElementById("pageIdUserTilesPushLogsReport").value;
			  myClickUrl+="&fetchSize="+fetchUserSystemPushSize+"&pageNumber="+pageUserSystemPushNumber;
		 }
		 if(searchUserLogonId !="" || appName!="" || authType!="" || response!="" ){
			 pageSearch=true;
		 }
		 if(pageSearch){
			  searchUserLogonId=$('#searchUserLogonId').val();
			  appName=$('#appName').val();
			  authType=$('#authType').val();
			  response=$('#response').val();
			 myClickUrl+="&searchUserLogonId="+searchUserLogonId+"&appName="+appName+"&authtype="+authType+"&responseResult="+response;
		 }
		 
		 if(searchUserTilesPushWithpageSize){  
		     if(myClickUrl.indexOf('fetchSize')==-1){
		    	 if($.trim(globalTilesPushClickPreviouspageSize)!='')
		    		 myClickUrl+="&fetchSize="+globalTilesPushClickPreviouspageSize; 
			  }
	    }
		 //generatePushClickReportFilter = "&"+myClickUrl.split("?")[1];
		 generateReportFilterUserTiles  = "&"+myClickUrl.split("?")[1];
		 
		 
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
							var obj1=JSON.parse(obj.userTilesLogsReport);
							var obj2=JSON.parse(obj.userTilesLogsCount);
							//var obj3=JSON.parse(obj.domainList);
							userPushLogsReportList=JSON.parse(obj.userTilesLogsReport);
							if(searchUserTilesPushWithpageSize){
								searchCount = obj2; 
								userTilesLogsCount=obj2;
								 //obj2=userTilesLogsCount;
							} else {
								userTilesLogsCount=obj2;
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
							content += '<select id="pageIdUserTilesPushLogsReport" onChange="fetchSizeUserTilesPushLogsReport(),getPageDataUserTilesPushLogsReport();" style="width:100%;" name="pageIdUserTilesPushLogsReport">';
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
							/*content += '<select onChange="getPageDataUserTilesPushLogsReport()" id="pageNumUserTilesPushLogsReport"  >';
							content += '<option value="">Select Page</option>';
							content += '</select>';*/
							content += ' <input type="text" id="pageNumUserTilesPushLogsReport" style="width:20%;background-color:white;" onChange="getPageDataUserTilesPushLogsReport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageNUserTilesPushLogsReport"></span>';
							content += '</div>';
							content += '</div>';
							content += '</div>';
							content += '<table class="table table-striped table-bordered" id="sample_user_push_tiles">';
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
							content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="searchUserTilesPushData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesPushDataReport(event)"  name="searchUserLogonId" id="searchUserLogonId" ></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesPushDataReport(event)" name="appName" id="appName" ></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesPushDataReport(event)" name="authType" id="authType" ></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesPushDataReport(event)" name="response" id="response" ></th>';
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
							
							//alert('Push List' + userPushLogsReportList);
							if(userPushLogsReportList!=null && userPushLogsReportList!='') {
								content+="<div class='expo_option'><div class='row-fluid' id='export_tiles'><div class='span4'><h4>Export options:</h4></div>";
								content+="<div class='span8' >";
								content+="<form method='post' id='userTilesReportForm'> ";
								content+="<ul>";
								content+="<li><a href='#' onClick='callUserTilesLogsCsvReport()' class='btn btn-primary'>CSV</a></li>";
								content+="<li><a href='#' onClick='callUserTilesLogsExcelReport()' class='btn btn-primary'>Excel</a></li>";
								content+="<li><a href='#' id='xml' data='xml' onClick='callUserTilesLogsXmlReport()' class='btn btn-primary'>XML</a></li>";
								content+="<li><a href='#' id='pdf' data='pdf' onClick='callUserTilesLogsPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
								content+="</ul>";
								content+="</form>";
								content+="</div></div></div>";
				        	 }
							$('#user_sub_logs_tiles_type').html(content);
							$("#sample_user_push_tiles").css("width", "100%");
							
							$('#searchUserLogonId').val(searchUserLogonId);
							$('#appName').val(appName);
							$('#authType').val(authType);
							$('#response').val(response);
							
				  			 if($.trim(globalTilesPushClickPreviouspageSize) != ''){ 
				  				 $("#pageIdUserTilesPushLogsReport").val(globalTilesPushClickPreviouspageSize);
				  				fetchSizeUserTilesPushLogsReport();
						         if(!searchUserTilesPushWithpageSize){
						        	 if(globalTilesPushClickPreviousPageNum==0 && parseInt($('#pageNUserTilesPushLogsReport').text()) > 0)
						        		 globalTilesPushClickPreviousPageNum="1";
						        	 $("#pageNumUserTilesPushLogsReport").val(globalTilesPushClickPreviousPageNum);
						         }
						        	
						         else {
						        	 if(globalTilesPushClickPreviousPageNum==0 && parseInt($('#pageNUserTilesPushLogsReport').text()) > 0)
						        		 globalTilesPushClickPreviousPageNum="1";
						        	 $("#pageNumUserTilesPushLogsReport").val(globalTilesPushClickPreviousPageNum);
						         }
						     }
					  		
					  		
					  		if(pageCall==false){
					  			var size = 10;
					  			if (globalTilesPushClickPreviouspageSize != '') {
									size = parseInt(globalTilesPushClickPreviouspageSize);
									userTilesLogsCount = searchCount;
								}
								
					  			if(searchUserLogonId !="" || appName!="" || authType!="" || response!="" ){
					  				userTilesLogsCount = searchCount;
					  			 } 
								if(userTilesLogsCount == 0){
									userTilesLogsCount = searchCount;
								}
								var maxPgaeNumber = userTilesLogsCount / size;
								var rem = userTilesLogsCount % size;
								if (rem > 0) {
									maxPgaeNumber = maxPgaeNumber + 1;
								}
								$('#pageNUserTilesPushLogsReport').html(parseInt(maxPgaeNumber));
								if(userTilesLogsCount == 0)
									$('#pageNumUserTilesPushLogsReport').val(0);
								else 
									$('#pageNumUserTilesPushLogsReport').val(1);
							}
					  		if(searchUserLogonId =="" && appName=="" && authType=="" && response=="" ){
					  			searchUserTilesPushWithpageSize=false;
				  			 } 
						
					  }
		 });
	}
	catch(e){
		alert(e);
	}
}


function searchUserTilesPushData(){  
	searchUserTilesPushWithpageSize=true;
	userPushClick(tempData,false,true);
}

function searchUserTilesPushDataReport(e){  
	 if (e.keyCode === 13)   
		 searchUserTilesPushData();
}



//var userOtpLogsCount;
//var userTilesLogsReport;
var searchUserTilesOtpWithpageSize=false;

var globalTilesOtpClickPreviouspageSize="";
var globalTilesOtpClickPreviousPageNum="";
//var generateOtpClickReportFilter;

function getPageDataUserTilesOtpLogsReport(){
	
 	var userSystemLogsSize = document.getElementById('pageIdUserTilesOtpLogsReport').value;
 	if($.trim(userSystemOtpLogsSize) != ''){
 	var pageNumberUserSystemLogs = document.getElementById('pageNumUserTilesOtpLogsReport').value;
 	if(pageNumberUserSystemLogs=="" || (pageNumberUserSystemLogs=="0" && parseInt(totalPages) > 0 )){ $('#pageNumUserTilesOtpLogsReport').val(1);}
 	var totalPages =  $('#pageNUserTilesOtpLogsReport').text();
	if ($.trim(pageNumberUserSystemLogs) != "" && parseInt(pageNumberUserSystemLogs) <= parseInt(totalPages))
		userOtpClick(tempData,true,false);
	else
		alert('Page should be less than or equal to page number.');
 	}
}



function fetchSizeUserTilesOtpLogsReport(){
	
	var userSystemOtpLogsSize = document.getElementById('pageIdUserTilesOtpLogsReport').value;

	if($.trim(userSystemOtpLogsSize) != ''){
		
		var userSystemOtpLogsMaxSize = userTilesLogsCount;
		var userSystemOtpLogsMaxPageNumber = userSystemOtpLogsMaxSize/userSystemOtpLogsSize;
		var remainderOtpSize = userSystemOtpLogsMaxSize%userSystemOtpLogsSize;
		if(remainderOtpSize > 0){
			userSystemOtpLogsMaxPageNumber = userSystemOtpLogsMaxPageNumber+1;
		}
		if(userTilesLogsCount==0){
			$('#pageNumUserTilesOtpLogsReport').val(0);
		} else{
			$('#pageNumUserTilesOtpLogsReport').val(1);
			$('#pageNumUserTilesOtpLogsReport').attr("disabled",false);
		} 				
		$('#pageNUserTilesOtpLogsReport').html(parseInt(userSystemOtpLogsMaxPageNumber));
		
	} 
}


function userOtpClick(data,pageCall,pageSearch){
	//alert('Data : ' + data);
	var arrayData = data.split(',');
	var systemNameVal = arrayData[0];
	var userLogonId = arrayData[1];
	tempData = data;
	//alert(tilesType);
	var tiles = tilesType;
	//alert(tiles);
	//alert(pageCall);
	//alert(pageSearch);
	try {
		 if($("#pageIdUserTilesOtpLogsReport").length) {
			 globalTilesOtpClickPreviouspageSize = $("#pageIdUserTilesOtpLogsReport").val();
			 globalTilesOtpClickPreviousPageNum = $("#pageNumUserTilesOtpLogsReport").val();
		 }
		 var myClickUrl="report_userSubUserTilesLogsReport.action?fromDate="+from_date_user+"&toDate="+to_date_user+"&domain="+domain+"&systemName="+systemNameVal+"&userLogonId="+userLogonId+tiles;
		 //alert(myClickUrl);
		 if(pageCall){
			 //alert('PageCall')
			 var pageUserSystemOtpNumber = document.getElementById("pageNumUserTilesOtpLogsReport").value;
			 //alert(pageUserSystemOtpNumber);
			  var fetchUserSystemOtpSize=document.getElementById("pageIdUserTilesOtpLogsReport").value;
			  myClickUrl+="&fetchSize="+fetchUserSystemOtpSize+"&pageNumber="+pageUserSystemOtpNumber;
			 // alert(myClickUrl);
		 }
		 if(searchUserLogonId !="" || appName!="" || authType!="" || response!="" ){
			 pageSearch=true;
		 }
		 if(pageSearch){
			 searchUserLogonId=$('#searchUserLogonId').val();
			 appName=$('#appName').val();
			 authType=$('#authType').val();
			 response=$('#response').val();
			 myClickUrl+="&searchUserLogonId="+searchUserLogonId+"&appName="+appName+"&authtype="+authType+"&responseResult="+response;
		 }
		 
		 if(searchUserTilesOtpWithpageSize){  
		     if(myClickUrl.indexOf('fetchSize')==-1){
		    	 if($.trim(globalTilesOtpClickPreviouspageSize)!='')
		    		 myClickUrl+="&fetchSize="+globalTilesOtpClickPreviouspageSize; 
			  }
	    }
		 //generateOtpClickReportFilter = "&"+myClickUrl.split("?")[1];
		 generateReportFilterUserTiles  = "&"+myClickUrl.split("?")[1];
		 
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
							var obj1=JSON.parse(obj.userTilesLogsReport);
							var obj2=JSON.parse(obj.userTilesLogsCount);
							//var obj3=JSON.parse(obj.domainList);
							userOtpLogsList=JSON.parse(obj.userTilesLogsReport);
							if(searchUserTilesOtpWithpageSize){
								searchCount = obj2;
								userTilesLogsCount=obj2;
								//obj2=userTilesLogsCount;
							} else {
								userTilesLogsCount=obj2;
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
							content += '<select id="pageIdUserTilesOtpLogsReport" onChange="fetchSizeUserTilesOtpLogsReport(),getPageDataUserTilesOtpLogsReport();" style="width:100%;" name="pageIdUserTilesOtpLogsReport">';
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
							/*content += '<select onChange="getPageDataUserTilesOtpLogsReport()" id="pageNumUserTilesOtpLogsReport"  >';
							content += '<option value="">Select Page</option>';
							content += '</select>';*/
							content += ' <input type="text" id="pageNumUserTilesOtpLogsReport" style="width:20%;background-color:white;" onChange="getPageDataUserTilesOtpLogsReport()" onkeypress="return isNumber(event)" disabled/> of <span id="pageNUserTilesOtpLogsReport"></span>';
							content += '</div>';
							content += '</div>';
							content += '</div>';
							content += '<table class="table table-striped table-bordered" id="sample_user_otp_tiles">';
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
							content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);"   onClick="searchUserTilesOtpData()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesOtpDataReport(event)"  name="searchUserLogonId" id="searchUserLogonId" ></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesOtpDataReport(event)" name="appName" id="appName" ></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesOtpDataReport(event)" name="authType" id="authType" ></th>';
							content += '<th><input type="text" onkeydown="searchUserTilesOtpDataReport(event)" name="response" id="response" ></th>';
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
							if(userOtpLogsList!=null && userOtpLogsList!='') {
								content+="<div class='expo_option'><div class='row-fluid' id='export_tiles'><div class='span4'><h4>Export options:</h4></div>";
								content+="<div class='span8' >";
								content+="<form method='post' id='userTilesReportForm'> ";
								content+="<ul>";
								content+="<li><a href='#' onClick='callUserTilesLogsCsvReport()' class='btn btn-primary'>CSV</a></li>";
								content+="<li><a href='#' onClick='callUserTilesLogsExcelReport()' class='btn btn-primary'>Excel</a></li>";
								content+="<li><a href='#' id='xml' data='xml' onClick='callUserSystemTilesLogsXmlReport()' class='btn btn-primary'>XML</a></li>";
								content+="<li><a href='#' id='pdf' data='pdf' onClick='callUserTilesLogsPdfReport()' class='btn btn-primary'>PDF</a></li>";                              
								content+="</ul>";
								content+="</form>";
								content+="</div></div></div>";
				        	}
							$('#user_sub_logs_tiles_type').html(content);
							$("#sample_user_otp_tiles").css("width", "100%");
							
							
							$('#searchUserLogonId').val(searchUserLogonId);
							$('#appName').val(appName);
							$('#authType').val(authType);
							$('#response').val(response);
							
				  			 if($.trim(globalTilesOtpClickPreviouspageSize) != ''){ 
				  				 $("#pageIdUserTilesOtpLogsReport").val(globalTilesOtpClickPreviouspageSize);
				  				fetchSizeUserTilesOtpLogsReport();
						         if(!searchUserTilesOtpWithpageSize){
						        	 if(globalTilesOtpClickPreviousPageNum==0 && parseInt($('#pageNUserTilesOtpLogsReport').text())>0)
						        		 globalTilesOtpClickPreviousPageNum="1";
						        	 $("#pageNumUserTilesOtpLogsReport").val(globalTilesOtpClickPreviousPageNum);
						         }
						        	 
						         else {
						        	 if(globalTilesOtpClickPreviousPageNum==0 && parseInt($('#pageNUserTilesOtpLogsReport').text())>0)
						        		 globalTilesOtpClickPreviousPageNum="1";
						        	 $("#pageNumUserTilesOtpLogsReport").val(globalTilesOtpClickPreviousPageNum);
						         }
						     }
					  		
					  		
					  		if(pageCall==false){
					  			var size = 10;
					  			if (globalTilesOtpClickPreviouspageSize != '') {
									size = parseInt(globalTilesOtpClickPreviouspageSize);
									userTilesLogsCount = searchCount;
								}
								
					  			if(searchUserLogonId !="" || appName!="" || authType!="" || response!="" ){
					  				userTilesLogsCount = searchCount;
					  			 } 
								if(userTilesLogsCount == 0){
									userTilesLogsCount = searchCount;
								}
					  			
								var maxPgaeNumber = userTilesLogsCount / size;
								var rem = userTilesLogsCount % size;
								if (rem > 0) {
									maxPgaeNumber = maxPgaeNumber + 1;
								}
								$('#pageNUserTilesOtpLogsReport').html(parseInt(maxPgaeNumber));
								if(userTilesLogsCount == 0)
									$('#pageNumUserTilesOtpLogsReport').val(0);
								else 
									$('#pageNumUserTilesOtpLogsReport').val(1);
							}
							  
					  		if(searchUserLogonId =="" && appName=="" && authType=="" && response=="" ){
					  			searchUserTilesOtpWithpageSize=false;
				  			}
					  }
		 });
	}
	catch(e){
		alert(e);
	}
}

function searchUserTilesOtpData(){  
	searchUserTilesOtpWithpageSize=true;
	userOtpClick(tempData,false,true);
}

function searchUserTilesOtpDataReport(e){  
	 if (e.keyCode === 13)   
		 searchUserTilesOtpData();
}

function callUserTilesLogsCsvReport(){
	try {
	globalReportTypeUserTiles = "csv";
	if(globalShowPopupWindowUserTiles){
		$('#myModalUserTiles').modal('show');
	} else {
		$('#myModalUserTiles').modal('hide');
		
		var reportType = "csv";
		var url="reportgen_userSubUserTilesLogsReport?reportType="+reportType+"&fileName=UserLogReportBasedOnTiles.csv&reportColumns="+globalArrayUserSummaryColumnUserTiles+generateReportFilterUserTiles;
		$('#userTilesReportForm').attr("action",url);
		$('#userTilesReportForm').submit();
		globalShowPopupWindowUserTiles=true;
		//resetAllCheckboxSystem();
	}
  }
	catch(e){
		alert(e);
	}
}

function callUserTilesLogsExcelReport(){
	if(validateExcelCount()){
	try {
	globalReportTypeUserTiles = "excel";
	if(globalShowPopupWindowUserTiles){
		$('#myModalUserTiles').modal('show');
	} else {
		$('#myModalUserTiles').modal('hide');
		
		var reportType = "excel";
		var url="reportgen_userSubUserTilesLogsReport?reportType="+reportType+"&fileName=UserLogReportBasedOnTiles.xlsx&reportColumns="+globalArrayUserSummaryColumnUserTiles+generateReportFilterUserTiles;
		$('#userTilesReportForm').attr("action",url);
		$('#userTilesReportForm').submit();
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


function callUserTilesLogsXmlReport(){
	if(validateXMLCount()) {
	try {
		globalReportTypeUserTiles = "xml";
		if(globalShowPopupWindowUserTiles){
			$('#myModalUserTiles').modal('show');
		} else {
			$('#myModalUserTiles').modal('hide');
			
			var reportType = "xml";
			var url="reportgen_userSubUserTilesLogsReport?reportType="+reportType+"&fileName=UserLogReportBasedOnTiles.xml&reportColumns="+globalArrayUserSummaryColumnUserTiles+generateReportFilterUserTiles;
			$('#userTilesReportForm').attr("action",url);
			$('#userTilesReportForm').submit();
			globalShowPopupWindowUserTiles=true;
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

function callUserTilesLogsPdfReport(){
	if(validatePDFCount()){
	globalReportTypeUserTiles = "pdf";
	
	if(globalShowPopupWindowUserTiles){
		$('#myModalUserTiles').modal('show');
	} else {
		$('#myModalUserTiles').modal('hide');
		
		var reportType = "pdf";
		//var url = "";
		var url="reportgen_userSubUserTilesLogsReport?reportType="+reportType+"&fileName=UserLogReportBasedOnTiles.pdf&reportColumns="+globalArrayUserSummaryColumnUserTiles+generateReportFilterUserTiles;
		$('#userTilesReportForm').attr("action",url);
		$('#userTilesReportForm').submit();
		globalShowPopupWindowUserTiles=true;
		//resetAllCheckboxSystem();
	}
	} else {
		alert('Your data is more than 200000. Please download the report in CSV Format!');
	}
}

function exportUserTilesLogReport(){
	var arrayUserSummaryColumn = $.map($('input[name="userlogtilesreportcolumn"]:checked'), function(c){return c.value; })
	if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "" ) {
		alert("Please Select at least one column for Export. ");
	} else {
		globalArrayUserSummaryColumnUserTiles = arrayUserSummaryColumn;
		globalShowPopupWindowUserTiles = false;
		
		if(globalReportTypeUserTiles == "csv")
			callUserTilesLogsCsvReport();
		else if(globalReportTypeUserTiles == "excel")
			callUserTilesLogsExcelReport();
		else if(globalReportTypeUserTiles == "xml")
			callUserTilesLogsXmlReport();
		else if(globalReportTypeUserTiles == "pdf")
			callUserTilesLogsPdfReport();
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

