var globalPersistAuthenticationReportDomainValue="";

function showAuthenticationReportDashbaord(domain,byDateWise) // Added By Saurabh 
{ 
	 var pAuthCount=0;
	 var sAuthCount=0;
	 try{

		$.ajax({
			type: "POST",  
			url:'report_userAuthenticationDashboardReport.action?domain='+domain,
		    async: false,
			dataType: "text",
			success: function(data) { 
		    if($.trim(data)=="sessionout")	{
		    	 return ;
			}
				var object = JSON.parse(data);
				var obj1=JSON.parse(object.userEnrollmentReportData);
				var obj2=JSON.parse(object.domainList);
				userEnrollmentReportData = obj1;
			     
			     
			     if(obj2 !=null  && obj2 !='')
			    	 {
			    	 var content='';
						content += '<div class="span3">';
						content += '<label>Domain : </label>';
						content += '<select id="domain_auth_dashboard" name="switchDomain" onchange="changeDomainReportAuthDashboard();">';
						content += '<option value="">Select Domain</option>';
						jQuery.each(obj2, function(i, v) {
						var tempDomainList=obj2[i];
						content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
					});
						
						content += '</select>';
						content += '</div></div>';
						var div=document.getElementById("container_auth_domain");
						div.innerHTML=content;
			    	   
						if(globalPersistAuthenticationReportDomainValue != "")
						     $("#domain_auth_dashboard").val(globalPersistAuthenticationReportDomainValue);
			        }
			     
			 
			     if(obj1 !=null  && obj1 !='')
			     {
			    	 jQuery.each(obj1, function(i, v) {
			    		 pAuthCount = v.pAuthCount;
			    		 sAuthCount = v.sAuthCount;
			    	 });
			    	 
			  		    			    	   
			   }
			 
			 }
		
			 
		 
		});
/****** For More Visibility of Numbers (Separated By Comma) ******/ // Added By Saurabh 
		
$(function () {
    Highcharts.setOptions({
		lang: {
			thousandsSep: ','
		}
});
});

/****** For More Visibility of Numbers (Separated By Comma) ******/
		
$(function () {
    $('#container_auth_dashboard').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Primary Secondary Auth'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>({point.y})</b>'
        },
        plotOptions: {
            pie: {
            	  size:'70%',
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Primary Secondary Auth',
            data: [ 
                   {
                       name: 'Primary ('+pAuthCount+')',
                       y: pAuthCount ,
                       sliced: true,
                       selected: true
                   },
                     ['Secondary ('+sAuthCount+')', sAuthCount ]
                                       
                   ]
      
                   
                
        }]
    });
});

	 }
		catch(e){}
}





function changeDomainReportAuthDashboard(){
	var domain=document.getElementById("domain_auth_dashboard").value;
	//alert(domain);
	globalPersistAuthenticationReportDomainValue=domain; // add line for Bug id #348 , added by abhimanyu
	if($.trim(domain) != ""){
		showAuthenticationReportDashbaord(domain);
	}
}



