function changeDateFormat(dateformat) {
	var d = new Date(dateformat);
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = (('' + day).length < 2 ? '0' : '') + day + '/'
			+ (('' + month).length < 2 ? '0' : '') + month + '/'
			+ d.getFullYear();
	return output;

}
function getCurrentDate() {
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = (('' + day).length < 2 ? '0' : '') + day + '/'
			+ (('' + month).length < 2 ? '0' : '') + month + '/'
			+ d.getFullYear();
	return output;
}

function getAddDaysToCurrentDate() {
	var d = new Date();
	d.setDate(d.getDate() - 7);
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var output = (('' + day).length < 2 ? '0' : '') + day + '/'
			+ (('' + month).length < 2 ? '0' : '') + month + '/'
			+ d.getFullYear();
	return output;

}
function process(date) {
	var parts = date.split("/");
	return new Date(parts[2], parts[1] - 1, parts[0]);
}

function turnAroundTimeReport() {

	try {
		var frmDate = $("#from_date").val();

		var toDate = $("#to_date").val();

		if (frmDate == "" || frmDate == undefined || frmDate == null) {
			alert("Please select start time stamp");
			return;
		}

		if (toDate == "" || toDate == undefined || toDate == null) {
			alert("Please select end time stamp");
			return;
		}

		if (process(frmDate) > process(toDate)) {
			alert("To timestamp can not be same or less than the from timestamp");
			return;
		}

		var test = new Array();
		var test3 = new Array();

		var test2 = new Array();

		var dataArrayFinal = [];
		var dateList = new Array();
		var averageList = new Array();
		var minList = new Array();

		var maxList = new Array();
		$('#block_turn_around_time_chart').html("Loading.........");
		$.ajax({
					type : "POST",
					url : "report_runTurnAroundTimeReport.action?fromDate="
							+ frmDate + "&toDate=" + toDate,
					dataType : "text",

					success : function(data) {
						
						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var obj = JSON.parse(data);
						var obj1 = JSON.parse(obj.reportList);
						if (obj1 != null && obj1 != '') {
							
							var j = 0;
							$.each(obj1, function(i, data) {

								averageList.push(data.avgTurnAroundTime);
								minList.push(data.maxTurnAroundTime);
								maxList.push(data.minTurnAroundTime);
								dateList.push(data.date);

							});
							var test = JSON.stringify(averageList).toString();
							var test2 = JSON.stringify(minList).toString();
							var test3 = JSON.stringify(maxList).toString();

							$('#block_turn_around_time_chart')
									.highcharts(
											{
												chart : {
													type : 'line',
													marginRight : 130,
													marginBottom : 25
												},
												title : {
													text : '	Turn Around Time ',
													x : -20
												// center
												},

												xAxis : {
													categories : dateList
												},
												yAxis : {
													title : {
														text : 'Time (milisec)'
													},
													plotLines : [ {
														value : 0,
														width : 1,
														color : '#808080'
													} ]
												},
												tooltip : {
													headerFormat : '<span style="font-size:10px">{point.key}</span><table>',
													pointFormat : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
															+ '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
													footerFormat : '</table>',
													shared : true,
													useHTML : true
												},
												legend : {
													layout : 'vertical',
													align : 'right',
													verticalAlign : 'top',
													x : -10,
													y : 100,
													borderWidth : 0
												},

												series : [
														{
															name : 'Average',
															data : jQuery
																	.parseJSON(test)
														},
														{
															name : 'Maximum',
															data : jQuery
																	.parseJSON(test2)
														},
														{
															name : 'Minimum',
															data : jQuery
																	.parseJSON(test3)
														} ]
											});

						}

						else {
							$("#block_turn_around_time_chart").html(
									"No Results");
						}
					}
				});
		
	} catch (e) {
		alert(e);
	}
}


function showReportFirstTime() {
	
	content = '<div class="row-fluid">';
	content += '<div class="span3 offset0">';
	content += '<label>From : </label>'; // start code for bug id #202 ,
											// added by abhimanyu
	content += '<input type="text" name"from_date" id="from_date" readonly style="cursor:pointer;"/>';
	content += '</div>';

	content += '<div class="span3 offset0">';
	content += '<label>To : </label>';
	content += '<input type="text" name"to_date" id="to_date" readonly style="cursor:pointer;"/>';
	content += '</div>'; // end code for bug id #202 , added by abhimanyu

	content += '<div class="span3 offset0">';
	content += '<button type="button" onClick="turnAroundTimeReport()"  id="submit_date" class="btn btn-primary" style="margin-top: 25px;">Submit</button>';
	content += '</div>';
	content += '<div class="clear"></div>';
	content += '</div>';

	$('#block_turn_around_time_data').html(content);
	$("#from_date").datepicker({
		dateFormat : "dd/mm/yy"
	}).val();
	$("#to_date").datepicker({
		dateFormat : "dd/mm/yy"
	}).val();

	$("#from_date").val(getAddDaysToCurrentDate());

	$("#to_date").val(getCurrentDate());
	turnAroundTimeReport();
}
