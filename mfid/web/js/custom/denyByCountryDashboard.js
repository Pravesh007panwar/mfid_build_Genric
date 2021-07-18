
var globalPersistDenyCountryDomainValue="";
 
function showDenyByCountryDashboardReport(domain){
	var object;
 //alert("inside showDenyByCountryDashboardReport  ");
	
	$.ajax({
		type: "POST",  
		url:"report_denyByCountryDashboardReport.action?domainName="+domain,  
	    async: false,
		dataType: "text",
		success: function(data) {
			
			
			 
			 object = JSON.parse(data);
		 
			
			
		}
		     });
	
	var obj2=JSON.parse(object.domainListData);
	var data=JSON.parse(object.denyCountryDashboardData);
	
	 
	
	if(object.domainListData != null && object.domainListData != 'null')
	   {
			// alert("if");
			var content='';
			content += '<div class="span3">';
			content += '<label>Domain : </label>';
			content += '<select id="denyCountryDomain" name="switchDomain" onchange="changeDenyCountryDomainReport();">';
			content += '<option value="">-select domain-</option>';
			jQuery.each(obj2, function(i, v) {
			//	alert(i+"\t"+v);
			var tempDomainList=obj2[i];
			
			content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
		});
			
			content += '</select>';
			content += '</div>';
			 
			var div=document.getElementById("deny_country_report_date");
			div.innerHTML=content;
			 
			// add code for Bug id #348 , added by abhimanyu
			if(globalPersistDenyCountryDomainValue != "")
			     $("#denyCountryDomain").val(globalPersistDenyCountryDomainValue);
			
	   }
	
	
	
	
	
	
	
 
	$(function () {

	  
		
	        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
	        $.each(data, function () {
	            this.flag = this.code.replace('UK', 'GB').toLowerCase();
	        });

	        // Initiate the chart
	        $('#country-container').rhighcharts('Map', {

	            title: {
	                text: 'Deny By Country'
	            },

	            legend: {
	                title: {
	                    text: 'Individuals country deny per no.',
	                    style: {
	                        color: (rhighcharts.theme && rhighcharts.theme.textColor) || 'black'
	                    }
	                }
	            },

	            mapNavigation: {
	                enabled: true,
	                buttonOptions: {
	                    verticalAlign: 'bottom'
	                }
	            },

	            tooltip: {
	                backgroundColor: 'none',
	                borderWidth: 0,
	                shadow: false,
	                useHTML: true,
	                padding: 0,
	                pointFormat: '<span class="f32"><span class="flag {point.flag}"></span></span>' +
	                    ' {point.name}: <b>{point.value}</b>',
	                positioner: function () {
	                    return { x: 0, y: 250 };
	                }
	            },

	            colorAxis: {
	                min: 1,
	                max: 1000,
	                type: 'logarithmic'
	            },

	            series : [{
	                data : data,
	                mapData: rhighcharts.maps['custom/world'],
	                joinBy: ['iso-a2', 'code'],
	                name: 'Number of deny',
	                states: {
	                    hover: {
	                        color: '#BADA55'
	                    }
	                }
	            }]
	        });
	    //});
	});
	
	 
	
}
 


 

function changeDenyCountryDomainReport()
{
	var domain=document.getElementById("denyCountryDomain").value;
	globalPersistDenyCountryDomainValue=domain; 
	if($.trim(domain) != "")
		showDenyByCountryDashboardReport(domain);
}


