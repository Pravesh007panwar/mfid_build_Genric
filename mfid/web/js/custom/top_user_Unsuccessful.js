var globalTopUserUnsuccessfulReportDomainValue="";
var reportType = 1;
function showTopUserUnsuccessfulAttempts(domain,reportType)
{
	reportType = reportType;
	var topUnsuccessfulAttemptsDashboardDataArray = [];
   $.ajax({
		type: "POST",  
		url:'report_topUserUnsuccessfulAttemptsReport.action?domainName='+domain+'&reportType='+reportType,
	    async: false,
		dataType: "text",
		success: function(data) { 
	    if($.trim(data)=="sessionout")
			{
	    	return;
			//alert("Session TimeOut...");
			//var testVal=document.getElementById('loginPage').value;
			//window.location.replace(testVal);
			}
			var object = JSON.parse(data);
			var obj1=JSON.parse(object.topUnsuccessfulAttemptsUserDashboardList);
			var obj2=JSON.parse(object.domainListData);
			 $.each(obj1 , function(i,data)
			 {   topUnsuccessfulAttemptsDashboardDataArray.push([data.userLogonId+' ('+data.unsuccessfulAttemptsCount+')' ,data.unsuccessfulAttemptsCount ]);  });
           
		
			   var content='';
				content += '<div class="span3" style="float:right;">';
				content += '<label>Domain : </label>';
				content += '<select id="domain_top_User_Unsuccess_details" name="switchDomain" onchange="changeDomainReportTopUserUnsuccessfulDetails();">';
				content += '<option value="">-select domain-</option>';
				jQuery.each(obj2, function(i, v) {
				//	alert(i+"\t"+v);
				var tempDomainList=obj2[i];
				
				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
			  });
				
				content += '</select>';
				content += '</div>';
				var div=document.getElementById("container_top_usr_Unsuccessful_attempts_attempts_domain");
				div.innerHTML=content;
			 
				if(globalTopUserUnsuccessfulReportDomainValue != "")
				     $("#domain_top_User_Unsuccess_details").val(globalTopUserUnsuccessfulReportDomainValue);


	
		
		
		
		
		}
		     });
	
			 
	
	
	
	
	
	

	$(function () {
	    $('#container_top_usr_Unsuccessful_attempts').highcharts({
	        chart: {
	            type: 'pie',
	            options3d: {
	                enabled: true,
	                alpha: 45,
	                beta: 0
	            }
	        },
	        title: {
	            text: 'Top 5 Unsuccessful User Attempts'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>({point.y})</b>'
	        },
	        plotOptions: {
	            pie: {
	            	 size:'100%',
	                allowPointSelect: true,
	                cursor: 'pointer',
	                depth: 35,
	                center: ["50%", "50%"],
	                dataLabels: {
	                    enabled: true,
	                    format: '{point.name}'
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Failure attempts counts',
	            data: topUnsuccessfulAttemptsDashboardDataArray
	            	  
	                
	        }]
	    });
	});

	}




function changeDomainReportTopUserUnsuccessfulDetails()
{
	var domain=document.getElementById("domain_top_User_Unsuccess_details").value;
	globalTopUserUnsuccessfulReportDomainValue=domain; // add line for Bug id #348 , added by abhimanyu
	if($.trim(domain) != "")
		showTopUserUnsuccessfulAttempts(domain,reportType);
		 
}
 

