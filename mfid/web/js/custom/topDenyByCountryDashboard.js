var globalPersistIPDetailsReportDomainValue="";

function showTopDenyByCountryDashboardReport(domain,reportType)
{  //alert("showTopDenyByCountryDashboardReport");
	reportType = reportType;
	var topDenyByCountryDashboardDataArray = [];
	try{
   $.ajax({
		type: "POST",  
		url:'report_topDenyByCountryDashboardReport.action?domainName='+domain+'&reportType='+reportType,
	    async: false,
		dataType: "text",
		success: function(data) { 
	    if($.trim(data)=="sessionout")
			{
	    	 return ;
			//alert("Session TimeOut...");
			//var testVal=document.getElementById('loginPage').value;
			//window.location.replace(testVal);
			}
			var object = JSON.parse(data);
			var obj1=JSON.parse(object.denyByCountryDashboardData);
			var obj2=JSON.parse(object.domainListData);
			 $.each(obj1 , function(i,data)
			 {   topDenyByCountryDashboardDataArray.push([data.country +' ('+data.failureCount+')',data.failureCount ]);  });
           
		
			   var content='';
				content += '<div class="span3" style="float:left;">';
				content += '<label>Domain : </label>';
				content += '<select id="domain_deny_by_country_details" name="switchDomain" onchange="changeTopDenyByCountryReport();">';
				content += '<option value="">-select domain-</option>';
				jQuery.each(obj2, function(i, v) {
				//	alert(i+"\t"+v);
				var tempDomainList=obj2[i];
				
				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
			  });
				
				content += '</select>';
				content += '</div>';
				var div=document.getElementById("container_top_deny_by_country_domain");
				div.innerHTML=content;
			 
				if(globalPersistIPDetailsReportDomainValue != "")
				     $("#domain_deny_by_country_details").val(globalPersistIPDetailsReportDomainValue);


	
		
		
		
		
		}
		     });
	
			 
	
	
	
	
	
	

	$(function () {
	    $('#container_top_deny_by_country').highcharts({
	        chart: {
	            type: 'pie',
	            options3d: {
	                enabled: true,
	                alpha: 45,
	                beta: 0
	            }
	        },
	        title: {
	            text: 'Top Deny by country Details'
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
	            data: topDenyByCountryDashboardDataArray
	            	  
	                
	        }]
	    });
	});
	}
	   catch(e){}
	}




function changeTopDenyByCountryReport()
{
	var domain=document.getElementById("domain_deny_by_country_details").value;
	   globalPersistIPDetailsReportDomainValue=domain; // add line for Bug id #348 , added by abhimanyu
	if($.trim(domain) != "")
		showTopDenyByCountryDashboardReport(domain,reportType);
		 
}
 

