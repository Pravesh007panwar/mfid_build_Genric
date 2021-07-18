var globalPersistIPDetailsReportDomainValue="";
var reportType=1;
function showIpDetailsDashboard(domain,reportType)
{
	var ipDetailsDashboardDataArray = [];
	reportType = reportType;
	try{
   $.ajax({
		type: "POST",  
		url:'report_ipDetaisDashboardReport.action?domainName='+domain+'&reportType='+reportType,
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
			var obj1=JSON.parse(object.ipDetailsDashboardData);
			var obj2=JSON.parse(object.domainListData);
			 $.each(obj1 , function(i,data)
			 {   ipDetailsDashboardDataArray.push([data.ip+' ('+data.ipFailureCount+') <br/>('+data.country+')' ,data.ipFailureCount ]);  });
           
		
			   var content='';
				content += '<div class="span3" style="float:right;">';
				content += '<label>Domain : </label>';
				content += '<select id="domain_ip_details" name="switchDomain" onchange="changeDomainReportIpDetails();">';
				content += '<option value="">-select domain-</option>';
				jQuery.each(obj2, function(i, v) {
				//	alert(i+"\t"+v);
				var tempDomainList=obj2[i];
				
				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
			  });
				
				content += '</select>';
				content += '</div>';
				var div=document.getElementById("container_ip_details_domain");
				div.innerHTML=content;
			 
				if(globalPersistIPDetailsReportDomainValue != "")
				     $("#domain_ip_details").val(globalPersistIPDetailsReportDomainValue);


	
		
		
		
		
		}
		     });
	
			 
	
	
	
	
	
	

	$(function () {
	    $('#container_top_unsuccess_ip').highcharts({
	        chart: {
	            type: 'pie',
	            options3d: {
	                enabled: true,
	                alpha: 45,
	                beta: 0
	            }
	        },
	        title: {
	            text: 'Top 5 Deny IP Details'
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
	            data: ipDetailsDashboardDataArray
	            	  
	                
	        }]
	    });
	});
	}
	   catch(e){}
	}




function changeDomainReportIpDetails()
{
	var domain=document.getElementById("domain_ip_details").value;
	   globalPersistIPDetailsReportDomainValue=domain; // add line for Bug id #348 , added by abhimanyu
	if($.trim(domain) != "")
		  showIpDetailsDashboard(domain,reportType);
		 
}
 

