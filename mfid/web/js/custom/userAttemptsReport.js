/*function pieClickFunctionCall(name){
	if(name=="Success"){

	}
	else{
		window.location = 'reportNew_runFinalUserAttemptsReport';
	}
}
*/
var searchDomainWise=false;
var domainNameUserAttempt = '';
function detailUserAttemptReport(){
	try{
	var frmDate= $("#from_date" ).val();	
	var toDate=   $("#to_date" ).val();

	$('#block_user_attempt_report_data').html("");
	//$('#block_user_attempt_report_chart').html("");
	//$('#block_user_attempt_report_chart').empty();
 
	$.ajax
	({
		url: "report_runUserAttemptReport.action?fromDate="+frmDate+"&toDate="+toDate+"&domainName="+domainNameUserAttempt,   
		dataType:"text",
		success: function(data)
		{
			  if($.trim(data)=="sessionout"){
				  testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}
			 var obj=JSON.parse(data);
			 var obj2=JSON.parse(obj.messages);
			if(obj2==null){
//				var div=document.getElementById("container");
//				div.innerHTML = div.innerHTML + '<font style="font-weight: bold; display: block; color: #B4886B;">No data to display</font>';

			}
			if(obj2!=null)
			{
				var j=0;

//				var ohlc = [];
				var ohlc1 = [];
				var ohlc2 = [];
				var ohlc3 = [];
				var ohlc4 = [];
				var ohlc5 = [];
				var ohlc6 = [];
				$.each(obj2, function(i,data)
						{
					
		
				/*	 ohlc.push([
							Date.parse(data.date), // the date
							data.status_success
						]);*/
					ohlc1.push([
					            Date.parse(data.date), // the date
					            data.not_matched
					            ]);
					ohlc2.push([
					            Date.parse(data.date), // the date
					            data.inactive_token
					            ]);
					ohlc3.push([
					            Date.parse(data.date), // the date
					            data.inactive_user
					            ]);
					ohlc4.push([
					            Date.parse(data.date), // the date
					            data.otp_already_used
					            ]);
					ohlc5.push([
					            Date.parse(data.date), // the date
					            data.attempts_exceeds
					            ]);
					ohlc6.push([
					            Date.parse(data.date), // the date
					            data.time_exceeds
					            ]);

						});

				$('#block_user_attempt_report_chart').highcharts('StockChart', {
					chart: {
						alignTicks: false,
						zoomType: 'x'
					},
					legend: {
						enabled: true,
						align: 'top',
						verticalAlign: 'bottom',
						x: 0,
						y: 0

					},
					rangeSelector: {
						 enabled: false,
					},

					title: {
						text:'User Attempts '
					},

					tooltip: {
						crosshairs: {
							width: 2,
							color: 'gray',
							dashStyle: 'shortdot'
						},
						shared: true,
						valueSuffix: ''
					},
					plotOptions: {
						series: {
							cursor: 'pointer'
						}
					},


					series: [ {
						name: ' Not Matched',
						data: ohlc1
					},{
						name: 'Locked Token',
						data: ohlc2
					},{
						name: 'Inactive User',
						data: ohlc3
					},{
						name: 'OTP already used',
						data: ohlc4
					},{
						name: 'Attempts Exceeds',
						data: ohlc5
					}/*,{
						name: 'Time Exceeds',
						data: ohlc6
					}*/
					]
				});
			
				btn_back = '<input type="button" value="Back"  id="submit_date" onClick="showUserAttemptReportFirstTime()" />';
				$("#block_user_attempt_report_chart").append(btn_back);
			}
			else
			{
				$("#block_user_attempt_report_chart").html("No Results");
			}
			
		}
	});
	
	}catch (e) {
		alert(e);
	}

}
function process(date){
	   var parts = date.split("/");
	   return new Date(parts[2], parts[1] - 1, parts[0]);
}



function userAttemptsReport(){
	try{
	var frmDate= $("#from_date" ).val();
	var initial= "0";
    var toDate=   $("#to_date" ).val();
	var domainName = '';
 
	if(searchDomainWise)
		{
		domainName = $("#userAttemptReportDomain" ).val();
		if(domainName == null || domainName == '' )
			{alert("please select domain");
			return ;
			}
		domainNameUserAttempt = domainName;

		if(frmDate==""||frmDate==undefined||frmDate==null){
			 alert("Please select start time stamp");
			 return;
		 }
		
		if(toDate==""||toDate==undefined||toDate==null){
			 alert("Please select end time stamp");
			 return;
		 }
		
		 if(process(frmDate) > process(toDate)){
			 alert("To timestamp can not be same or less than the from timestamp");
			 return;
	     }
		
	}
	

	$.ajax
	({

		url: "report_runUserAttemptReport.action?fromDate="+frmDate+"&toDate="+toDate+"&initial="+initial+"&domainName="+domainName,   
		dataType:"text",

		success: function(data)
		{  
			if($.trim(data)=="sessionout"){
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			var obj=JSON.parse(data);
			var obj1=JSON.parse(obj.domainList);
			var obj2=JSON.parse(obj.messages);
			var content='<option value="" >-select domain-</option>';
			jQuery.each(obj1, function(i, v) {
				 content += '<option value="'+obj1[i]+'" >'+obj1[i]+'</option>';
			});
		
			if(obj2!=null)
			{
				var j=0;
				var ohlc = [];
				var ohlc1 = [];
				try{
				$.each(obj2, function(i,data){
				
					ohlc.push([
					           isNaN(Date.parse(data.date))?callme(data.date):Date.parse(data.date), // the date
					           data.status_success
					           ]);
					ohlc1.push([
					            isNaN(Date.parse(data.date))?callme(data.date):Date.parse(data.date), // the date
					            data.not_matched
					            ]);
				});
				}
				catch(e)
				{
					alert(e);
				}
				$('#block_user_attempt_report_chart').highcharts('StockChart', {
					chart: {
						alignTicks: false,
						zoomType: 'x'
					},
					legend: {
						enabled: true,
						align: 'top',
						verticalAlign: 'bottom',
						x: 0,
						y: 0

					},
					rangeSelector:{
					    enabled: false,
					},

					title: {
						text:'User Attempts '
					},

					tooltip: {
						crosshairs: {
							width: 2,
							color: 'gray',
							dashStyle: 'shortdot'
						},
						shared: true,
						valueSuffix: ''
					},

					plotOptions: {
						series: {
							cursor: 'pointer',
							events: {
								click: function(event) {
								
									detailUserAttemptReport(this.name);
									
								}
							}
						}
					}, 

					series: [{
						name: 'Success',
						data: ohlc
					}, {
						name: ' Unsuccess',
						data: ohlc1
					}
					]
				});
			
			}
          else
			{
				$("#block_user_attempt_report_chart").html("No Results");
			}
			if(!searchDomainWise)
			 $("#userAttemptReportDomain").html(content);
			 searchDomainWise=false;
		}
	});

	}catch (e) {
		alert(e)
	}
}

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




function showUserAttemptReportFirstTime(){
	try{
	
var	content = '<div class="row-fluid">';
    content += '<div class="span3 offset0">';
	content += '<label>Domain : </label>';
	content += '<select id="userAttemptReportDomain" name="switchDomain"><option value="">-select domain-</option></select>'; 
	content += '</div>';
    content += '<div class="span3 offset0">';
	content += '<label>From : </label>';
	content += '<input type="text" name"from_date" id="from_date" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
	content += '</div>';
	content += '<div class="span3 offset0">';
	content += '<label>To : </label>';
	content += '<input type="text" name"to_date" id="to_date" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
	content += '</div>';
	content += '<div class="span3 offset0">';
	content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="showUserAttemptsReport()" />';
	content += '</div>';
	content += '<div class="clear"></div>';
	content += '</div>';

	$('#block_user_attempt_report_data').html(content);
	$("#from_date" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
	$("#to_date").datepicker({ dateFormat: "dd/mm/yy" }).val();
	$("#from_date" ).val(getAddDaysToCurrentDate());
	$("#to_date" ).val(getCurrentDate());
	userAttemptsReport();
	}
	catch (e) {
		alert(e)
	}
}


function callme(s)
{
	var dt=""+s;
	var ndt=dt.replace(/-/g, "/");
	return new Date(ndt).getTime();
	
}

function showUserAttemptsReport()
{   searchDomainWise=true;
	userAttemptsReport();
}

