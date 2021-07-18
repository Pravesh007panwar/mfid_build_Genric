function removeFilter(){
	$('#tokenSerial').val("");
	$('#assignto').val("");
	$('#locktype').val("");
	$('#creationDate').val("");
	$('#leftdays').val("");
}

var stocklist;
var count;
var searchCount;
var searchTokenStockReportForAll=false;
var searchAllTokenReportForCountValue=false;
var globalPersistTokenStockReportDomainValue="";
var globalShowPopupWindow = true;
var globalArrayUserSummaryColumn = '';
var globalReportType='';
var genTokenStockDetailFilter = '';

function getPageData_tokenStoke()
	{

		var size=document.getElementById('pageId_tokenStoke').value;
		if ($.trim(size) != '') {
		var pageNumber=document.getElementById('pageNum_tokenStoke').value;
		var data=$('#search').attr('data')
		var valarr=data.split('#');
		var val=valarr[0];
		var domain=valarr[1];
		var totalPages =  $('#pageN_tokenStoke').text();
		if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_tokenStoke').val(1);}
		if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
			tokenStockDetailReport(val,domain,true,false);
		else
			alert('Page should be less than or equal to page number.');
		}
		
	}

	
	function fetchSize_tokenStoke() {
	var size = document.getElementById('pageId_tokenStoke').value;

	if ($.trim(size) != '') {
		var maxSize = count;
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		
		if(count==0){
			$('#pageNum_tokenStoke').val(0);
		} else{
			$('#pageNum_tokenStoke').val(1);
			$('#pageNum_tokenStoke').attr("disabled",false);
		} 				
		$('#pageN_tokenStoke').html(parseInt(maxPgaeNumber));
	
	} 
		
}
	
	function showTokenStock(domain){
		var listApp=new Array();

	$.ajax
	({
		type: "POST",  
		url: "report_tokenStockReport.action?domainName="+domain,  
		data: "{}",
		//async: false,
		dataType: "text",
	
	success: function(data)
	{
		 if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
		var object = JSON.parse(data);
		var obj1=JSON.parse(object.tokenStockReportList);
		var obj2=JSON.parse(object.domainList);
		if(object.tokenStockReportList==null){
			var div=document.getElementById("container_grap");
			div.innerHTML = div.innerHTML + '<font style="font-weight: bold; display: block; color: #B4886B;">No data to display</font>';
	
	}
		if(object.tokenStockReportList.length)
	{
			
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
			if(globalPersistTokenStockReportDomainValue != "")
			     $("#domain").val(globalPersistTokenStockReportDomainValue);

	
	$.each(obj1, function(i,data)
	{
		listApp.push(data.hardToken);
	listApp.push(data.mobileToken);
		listApp.push(data.softToken);
	
	listApp.push(data.pushToken);
	
	listApp.push(data.total);
	  
	});
	var test = JSON.stringify(listApp).toString();
	$('#container_grap').html("");
			$(function () {
        $('#container_grap').highcharts({
            chart: {
                type: 'column',
                height: 400,
                
            },
            title: {
                text: 'Token Stock'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['Hard Tokens', 'Mobile Tokens','Bio Tokens', 'Push Tokens','Total'],
                title: {
                    text: null
                }
            },
            yAxis: {
            allowDecimals:false,
                min: 0,
                title: {
                    text: 'Number Of Tokens',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' Tokens'
            },
            plotOptions: {
             series: {
                    dataLabels: {
                        enabled: true,
                        color: 'gray'
                    }
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                     point:{
                      events:{
                          click:function(){
                        	  searchAllTokenReportForCountValue=true;
                        	  tokenStockDetailReport(this.category,domain,false,false);
                          }
                      }
                  }
                }
            },
           
            credits: {
                enabled: false
            },
            series: [{
                name: 'Tokens',
                data:  JSON.parse(test)
            }]
        });
    });
	}
	
	else
	{
		$("#container_grap").html("No Results");
	}
	}
	});
	
	}
	
	function changeDomainReport()
	{
		var domain=document.getElementById("domain").value;
		globalPersistTokenStockReportDomainValue=domain; // add line for Bug id #348 , added by abhimanyu
		if($.trim(domain) != "")
		showTokenStock(domain);
	}
	
	
	$(document).on('click','.close_table',function(){  
		$(this).parent('div').hide(300);
		
	});
	
	

var globalTokenStockReportPreviouspageSize="";
var globalTokenStockReportPreviousPageNum="";	
var tokenSerial="";
var assignTo="";
var lockType="";
var activeDate="";
var leftDays="";
function tokenStockDetailReport(val,domain,pageCall,pageSearch){
	
	   if($("#pageId_tokenStoke").length)
	       {
		   globalTokenStockReportPreviouspageSize=$("#pageId_tokenStoke").val();
		   globalTokenStockReportPreviousPageNum=$("#pageNum_tokenStoke").val();
	        }
	    if(searchAllTokenReportForCountValue)
	        {  
		      globalTokenStockReportPreviouspageSize="";
		      globalTokenStockReportPreviousPageNum="";
		      searchAllTokenReportForCountValue=false;
	       }
	
		
		$('#success_attempt_data').show();
	//	$('#success_attempt_data').html('<span>Loading...</span>');
		
		var myUrl="report_tokenStockDetailReport.action?domainName="+domain+"&category="+val;
		var dataString="";
		if(pageCall)
			{
		
			  var fetchSize = document.getElementById("pageId_tokenStoke").value;
			  var pageNumber = document.getElementById("pageNum_tokenStoke").value;
			
			myUrl+="&fetchSize="+fetchSize+"&pageNumber="+pageNumber;
			}
		
		if(tokenSerial!="" || assignTo!="" || lockType!=""|| activeDate!="" || leftDays!=""){
			pageSearch=true;
		}
		
		if(pageSearch)
			{
			try{
		    tokenSerial = document.getElementById("tokenSerial").value;
		    	tokenSerial = tokenSerial.replace(/\s/g, "");
		 	    
		    assignTo = document.getElementById("assignto").value;
				    
		    lockType = document.getElementById("locktype").value;
			    
		    activeDate = document.getElementById("creationDate").value;
			    
		    leftDays = document.getElementById("leftdays").value;
		  	    
		  //  myUrl+="&tokenSerial="+tokenSerial+"&assignTo="+assignTo+"&lockType="+lockType+"&activeDate="+activeDate+"&leftDays="+leftDays;
		    dataString+="&tokenSerial="+tokenSerial+"&assignTo="+assignTo+"&lockType="+lockType+"&activeDate="+activeDate+"&leftDays="+leftDays;
				}
				catch (e) {
					alert(e)
				}
			}
		 genTokenStockDetailFilter= "&"+myUrl.split("?")[1];
		 if(searchTokenStockReportForAll)
		      {  
	   	     if(myUrl.indexOf('fetchSize')==-1)
	   		   { if($.trim(globalTokenStockReportPreviouspageSize)!='')
	   			myUrl+="&fetchSize="+globalTokenStockReportPreviouspageSize; 
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
				var obj=JSON.parse(object.tokenStockDetailReportList);
				 stocklist=JSON.parse(object.tokenStockDetailReportList);
				var obj1=JSON.parse(object.count);
				if(searchTokenStockReportForAll){
					searchCount = obj1;
					count=obj1;
					// obj1=count;
				} else {
					count=obj1;
					searchCount = obj1;
				} 		
				
				var content = ' <span class="close_icon close_table"><a href="javascript:void(0);"><i class="icon-remove-sign"></i></a></span><h4>Token Stock Detail('+val+')</h4>';
				content += '<div class="row-fluid">';
				content += '<div  class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_tokenStoke" onChange="fetchSize_tokenStoke(),getPageData_tokenStoke();" name="deassociationReasonListName" style="width:100%;">';
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
					/*content += '<select onChange="getPageData_tokenStoke()" id="pageNum_tokenStoke"  >';
					content += '<option value="">-select Page-</option>';
					content += '</select>';*/
					content += ' <input type="text" id="pageNum_tokenStoke" style="width:20%;background-color:white;" onChange="getPageData_tokenStoke()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_tokenStoke"></span>';
					content += '</div>';
					content += '</div>';
					content += '</div>';
					content += '<table class="table table-striped table-bordered" id="sample_2">';
					content += '<thead>';
					content += '<tr>';
					content += '<th>Sr No.</th>';
					content += '<th>Token Serial</th>';
					content += '<th>Assign To</th>';
					content += '<th>Lock / Unlock</th>';
					content += '<th>Active Date</th>';
					content += '<th>Days Left</th>';
					content += '</tr>';
   		        	content += '<th style="padding-bottom: 20px;"><a style="text-decoration:none;" id="search" href="javascript:void(0);" data="'+val+'#'+domain+'"  onClick="search_data()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a> &nbsp; &nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					content += '<th><input type="text"  onkeydown="searchTokenStockReport(event)" id="tokenSerial" name="tokenSerial"/></th>';
					content += '<th>';
					content += '<select class="ass-dss-select span12" name="assignto" id="assignto" >';
					//content += '<option value="all">-select authentication-</option>';
					content += '<option value="all">All</option>';
					content += '<option value="assign">Assigned</option>';
					content += '<option value="deassign">UnAssigned</option>';
					
					content += '</select>';
					content += '</th>';
					content += '<th>';
					content += '<select class="ass-dss-select span12" name="locktype" id="locktype" >';
					content += '<option value="all">All</option>';
					content += '<option value="1">Locked</option>';
					content += '<option value="0">Unlocked</option>';
					
					content += '</select>';
					content += '</th>';
					content += '<th><input type="text"  onkeydown="searchTokenStockReport(event)" name="activeDate" id="creationDate" ></th>';
					content += '<th>';
					content += '<input type="text"  onkeydown="searchTokenStockReport(event)" id="leftdays"  name="leftdays"/>';
					content += '</th>';
					content += '</tr>';

					content += '</thead>';
					try{
						//alert("shyam");
					if(object.tokenStockDetailReportList!=null&& obj != null && obj !=''){
					jQuery.each(obj, function(i, v) {
					i = (i+1);
					v.startTime = 'N/A';
					v.daysLeft = 'N/A';
						content += "<tr>";
							content += "<td>"+i+"</td>";
							content += "<td>"+v.tokenSerial+"</td>";
							content += "<td>"+v.userName+"</td>";
							content += "<td>"+v.tokenStatus+"</td>";
							content += "<td>"+v.startTime+"</td>";
							content += "<td>"+v.daysLeft+"</td>";
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
					
					
					
					if(stocklist!=null&&stocklist!='')
						{
						content+="<div class='expo_option'><div class='row-fluid' id='expo_opt1'><div class='span4'><h4>Export options:</h4></div>";
                    content+="<div class='span8' >";
                    content+="<form method='post' id='reportForm'> ";
                    content+="<input type='hidden' name='tokenSerial' id='token_serial'/>";
                    content+="<input type='hidden' name='assignTo' id='assign_to'/>";
                    content+="<input type='hidden' name='lockType' id='lock_type'/>";
                    content+="<input type='hidden' name='activeDate' id='activate_date'/>";
                    content+="<input type='hidden' name='leftDays' id='left_days'/>";
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
					
					$("#creationDate" ).datepicker({ dateFormat: "yy-mm-dd" }).val();
					
					
					$('#tokenSerial').val(tokenSerial);
					$('#assignto').val(assignTo);
					$('#locktype').val(lockType);
					$('#creationDate').val(activeDate);
					$('#leftdays').val(leftDays);
					
					
		        if($.trim(globalTokenStockReportPreviouspageSize) != '')
				      {  $("#pageId_tokenStoke").val(globalTokenStockReportPreviouspageSize);
				      		fetchSize_tokenStoke();
				         if(!searchTokenStockReportForAll)
				        	 $("#pageNum_tokenStoke").val(globalTokenStockReportPreviousPageNum);
				         else {
				        	 if(globalTokenStockReportPreviousPageNum==0 && parseInt($('#pageN_tokenStoke').text()) > 0)
				        		 globalTokenStockReportPreviousPageNum="1";
				        	 $("#pageNum_tokenStoke").val(globalTokenStockReportPreviousPageNum);
				         }
				        	 
				       }
							  
					  if(pageCall==false){
						  var size = 10;
							if (globalTokenStockReportPreviouspageSize != '') {
								size = parseInt(globalTokenStockReportPreviouspageSize);
								count = searchCount;
							}
							if(tokenSerial!="" || assignTo!="" || lockType!=""|| activeDate!="" || leftDays!=""){
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
							$('#pageN_tokenStoke').html(parseInt(maxPgaeNumber));
							if(count == 0)
								$('#pageNum_tokenStoke').val(0);
							else 
								$('#pageNum_tokenStoke').val(1);
						}
					  
					  if(tokenSerial=="" && assignTo=="" && lockType=="" && activeDate=="" && leftDays==""){
						  searchTokenStockReportForAll=false;
						}

					
			}
		
		});

	}
	

	
	function search_data()
	{
		if(validateTokenStockSearch()){
			var data=$('#search').attr('data')
			
			var valarr=data.split('#');
				
			var val=valarr[0];
			var domain=valarr[1];
			searchTokenStockReportForAll=true;
		    tokenStockDetailReport(val,domain,false,true);
		} 
		else {
			validateTokenStockSearch();
		}
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
		var url="reportgen_tokenStockReport?reportType="+reportType+"&fileName=token_stock_report.pdf&reportColumns="+globalArrayUserSummaryColumn+genTokenStockDetailFilter;
		$('#token_serial').val(tokenSerial);
		$('#assign_to').val(assignTo);
		$('#lock_type').val(lockType);
		$('#activate_date').val(activeDate);
		$('#left_days').val(leftDays);
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
		var url="reportgen_tokenStockReport?reportType="+reportType+"&fileName=token_stock_report.xml&reportColumns="+globalArrayUserSummaryColumn+genTokenStockDetailFilter;
		$('#token_serial').val(tokenSerial);
		$('#assign_to').val(assignTo);
		$('#lock_type').val(lockType);
		$('#activate_date').val(activeDate);
		$('#left_days').val(leftDays);
		$('#reportForm').attr("action",url);
		$('#reportForm').submit();
		globalShowPopupWindow=true;
		 resetAllCheckbox();
		}
	   }  else {
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
		var url="reportgen_tokenStockReport?reportType="+reportType+"&fileName=token_stock_report.xlsx&reportColumns="+globalArrayUserSummaryColumn+genTokenStockDetailFilter;
		$('#token_serial').val(tokenSerial);
		$('#assign_to').val(assignTo);
		$('#lock_type').val(lockType);
		$('#activate_date').val(activeDate);
		$('#left_days').val(leftDays);
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
		var url="reportgen_tokenStockReport?reportType="+reportType+"&fileName=token_stock_report.csv&reportColumns="+globalArrayUserSummaryColumn+genTokenStockDetailFilter;
		$('#token_serial').val(tokenSerial);
		$('#assign_to').val(assignTo);
		$('#lock_type').val(lockType);
		$('#activate_date').val(activeDate);
		$('#left_days').val(leftDays);
		$('#reportForm').attr("action",url);
		$('#reportForm').submit();
		globalShowPopupWindow=true;
		 resetAllCheckbox();
		}
	}
	
	

	function exportTokenStockReport()
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
	
	 function searchTokenStockReport(e)
	 {  
	 	 if (e.keyCode === 13)   
	 		search_data();
	 }	
	 
	function validateTokenStockSearch(){
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