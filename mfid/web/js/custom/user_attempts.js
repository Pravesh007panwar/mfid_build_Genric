var globalPersistUserAttemptsReportDomainValue="";
var reportType;

function showUserAttempts(domain,reportType)
{    var success = 0;
	 var userLocked = 0;
	 var otpIncorrect = 0;
	 var tokenLocked = 0;
	 var otpAlreadyUsed = 0;
	 var other = 0;
	 reportType = reportType;
	 
	 try{

		$.ajax({
			type: "POST",  
			url:'report_userAttemptsReport.action?domainName='+domain+'&reportType='+reportType,
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
				var obj1=JSON.parse(object.userAttemptsReportData);
				var obj2=JSON.parse(object.domainList);
			     userAttemptsReportData = obj1;
			     
			     
			     if(obj2 !=null  && obj2 !='')
			    	 {
			    	 var content='';
						content += '<div class="span3">';
						content += '<label>Domain : </label>';
						content += '<select id="domain_user_attempt" name="switchDomain" onchange="changeDomainReportUserAttempts();">';
						content += '<option value="">-select domain-</option>';
						jQuery.each(obj2, function(i, v) {
						//	alert(i+"\t"+v);
						var tempDomainList=obj2[i];
						
						content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
					});
						
						content += '</select>';
						content += '</div></div>';
						var div=document.getElementById("container_user_attempts_domain");
						div.innerHTML=content;
			    	   
						if(globalPersistUserAttemptsReportDomainValue != "")
						     $("#domain_user_attempt").val(globalPersistUserAttemptsReportDomainValue);
			        }
			     
			     
			     
			     
			     
			     
			     if(obj1 !=null  && obj1 !='')
			     {
			    	 if(obj1.success !=null  && obj1.success !='' && obj1.success != 'undefined')
			    	   success = obj1.success;
			    	 else
			    		 success = 0;
			    	 if(obj1.userLocked !=null  && obj1.userLocked !='' && obj1.userLocked != 'undefined')
			    	   userLocked = obj1.userLocked;
			    	 else
			    		 userLocked = 0;
			    	 
			    	 if(obj1.otpIncorrect !=null  && obj1.otpIncorrect !='' && obj1.otpIncorrect != 'undefined')
			    	   otpIncorrect = obj1.otpIncorrect;
			    	 else
			    		 otpIncorrect = 0;
			    	 
			    	 if(obj1.tokenLocked !=null  && obj1.tokenLocked !='' && obj1.tokenLocked != 'undefined')
			    	   tokenLocked = obj1.tokenLocked;
			    	 else
			    		 tokenLocked = 0;
			    	 
			    	 if(obj1.otpAlreadyUsed !=null  && obj1.otpAlreadyUsed !='' && obj1.otpAlreadyUsed != 'undefined')
			    	   otpAlreadyUsed = obj1.otpAlreadyUsed;
			    	 else
			    		 otpAlreadyUsed = 0;
			    	 
			    	 if(obj1.other !=null  && obj1.other !='' && obj1.other != 'undefined')
			    	   other = obj1.other;
			    	 else
			    		 other = 0;
			    	   
			    	   
			    	   
			   }
			 
			 }
		
			 
		 
		});
 


$(function () {
    $('#container_user_attempts').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'User Attempts'
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
            name: 'User Attempts',
            data: [ 
                   {
                       name: 'Success ('+success+')',
                       y: success ,
                       sliced: true,
                       selected: true
                   },
                     ['Locked User ('+userLocked+')', userLocked ],
                     ['Incorrect OTP ('+otpIncorrect+')', otpIncorrect ],
                     ['Locked Token ('+tokenLocked+')', tokenLocked ]  ,
                   ['Used OTP  ('+otpAlreadyUsed+')', otpAlreadyUsed  ],
                   ['Other ('+other+')', other  ]
                     
                   ]
      
                   
                
        }]
    });
});

	 }
		catch(e){}
}





function changeDomainReportUserAttempts()
{
	var domain=document.getElementById("domain_user_attempt").value;
	globalPersistUserAttemptsReportDomainValue=domain; // add line for Bug id #348 , added by abhimanyu
	if($.trim(domain) != "")
		{showUserAttempts(domain,reportType);
		//showIpDetailsDashboard(domain);
		}
}



