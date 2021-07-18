var org;

function authenticationTypeReport(){
	//alert("in myfun");
	var test=new Array();
	var test2=new Array();
	var listApp=new Array();
	var AppList= new Array();
	var ListLockedStatus=new Array();
	var ListUnlockedStatus=new Array();
	var testApp=new Array();
	testApp.push('App1');
	testApp.push('App2');
	testApp.push('App3');
	//alert("testApp is "+testApp);
	var testApp2="['App1','App2','App3']"; //for testing string value as category
	//alert("testApp2 is "+testApp2);
	var d2Value=document.getElementById('report_domain').value;
	$.ajax
	({

		url: "report_runLockedUnlockedUsersRreport.action?domain="+d2Value,  
		dataType:"json",

		success: function(data)
		{	if(data.Messages!=null)
		{
			var j=0;


			$.each(data.Messages, function(i,data)
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

			//alert("app list after "+AppList);
			$('#locked_unlocked_user_chart').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: 'Locked/Unlocked User Report'
				},

				xAxis: {
					categories: listApp


				},
				yAxis: {
					allowDecimals:false,
					min: 0,
					title: {
						text: 'Number of Users'
					}
				},
				tooltip: {
					valueSuffix: ' Users'
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
									getLockedUnlockedDetail(this.category);
								}
							}
						}
					}
				},
				series: [{
					name: 'Locked',
					data:  JSON.parse(test)

				}, {
					name: 'Unlocked',
					data:  JSON.parse(test2)


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


/*function pieClickFunctionCall(name){


 var applicationName="";; 
    app=name;
 //alert("in function"+app);

   window.open("report_runLockedUnlockedUserDetailReport.action?appName="+app,"_blank","directories=no, status=no,width=800, height=370,top=0,left=0");

 }

	$(document).ready(function()
		{ 
		//alert("hi");
		var valueDomain='<%=currentDomain %>';
	//alert("valueDomain==="+valueDomain);
	document.getElementById('d2').value=valueDomain;
	var d2Value=document.getElementById('d2').value;
	//alert("d2Value==== "+d2Value);
	myFunction();
		 });	*/

/*	 function ajaxEditFunctionCallForDomain(){
		 	var valueDomain = document.getElementById("id2").value;
		 		if(valueDomain!="select"){
		 	document.getElementById('d2').value=valueDomain;
		 	myFunction();

		 	}
		 }*/


function showLockedUnlockedUserFirstTime(organisation){
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
}

function showDomainListForManageRole(o){


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



function getLockedUnlockedDetail(app){

	try{
		//$('#locked_unlocked_user_data').html("");
		//$('#locked_unlocked_user_data').show();
		//$('#user_detail_athentication_data').html('<span>Loading...</span>');
		var myUrl="report_runLockedUnlockedUserDetailReport.action?appName="+app;

	}
	catch (e) {
		alert(e);
		// TODO: handle exception
	}

	$.ajax({
		type: "POST",  
		url: myUrl,
		dataType: "text",
		success: function(data) {
			alert("data=== "+data)
			var obj = JSON.parse(data);				
			var obj1 = JSON.parse(obj.reportList);
			var content =  '<table class="table table-striped table-bordered" id="sample_5">';
			content += '<thead>';
			content += '<tr>';

			content += '<th>User Name</th>';
			content += '<th>User Status</th>';
			content += '</tr>';
			content += '</thead>';
			jQuery.each(obj1, function(i, v) {
				i = (i+1);
				content += "<tr>";


				content += "<td>"+v.userLoginId+"</td>";
				content += "<td>"+v.status+"</td>";

				content += "</tr>";
			});
			content += "</table>";
			$('#locked_unlocked_user_data').html(content);
		}

	});

}
