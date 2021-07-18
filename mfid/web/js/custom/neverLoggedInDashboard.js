var globalPersistDomainValueNeverLoggedIN="";
var reportType = 1;
function changeDomainReportNeverLoggedIn()
{
	var domain=document.getElementById("domain_never_loggedIn").value;
	//alert("domain===="+domain)
	globalPersistDomainValueNeverLoggedIN=domain; // add line for Bug id #347 , added by abhimanyu
	   if($.trim(domain) != "")
		   neverLoggedInReport(domain,reportType);
	 
}


function neverLoggedInReport(domain ,reportType){
//alert(domain)
	//domainn=domain;
	reportType = reportType;
	var test=new Array();
	
	var listApp=new Array();
		var AppList= new Array();
	var listNeverLoggedIn=new Array();
	try{
	
	$.ajax
	({
		type: "POST",  
		url: "report_neverLoggedInDashboard.action?domainName="+domain+'&reportType='+reportType,  
		data: "{}",
		async: false,
		dataType: "text",
	
	
	success: function(data)
	{//alert("hello2");
	//alert(data);
		 if($.trim(data)=="sessionout"){
			    return ;
				//testVal= document.getElementById('loginPage').value				
				//window.location.replace(testVal);
			}
		var object = JSON.parse(data);
		var obj1=JSON.parse(object.neverLoggedInDashboardList);
		var obj2=JSON.parse(object.domainList);
		//alert("obj1==="+obj1);
		//alert("obj2==="+obj2);
	

		if(object.neverLoggedInDashboardList.length)
	{
	var j=0;
	var content='';
	content += '<div class="span3" >';
	content += '<label>Domain : </label>';
	content += '<select id="domain_never_loggedIn" name="domain_never_loggedIn" onchange="changeDomainReportNeverLoggedIn();">';
	content += '<option value="">-select domain-</option>';
	jQuery.each(obj2, function(i, v) {
	var tempDomainList=obj2[i];
	
	content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
});
	
	content += '</select>';
	content += '</div>';
	var div=document.getElementById("container_domain_never_loggedin");
	div.innerHTML=content;
	// add code for Bug id #347 , added by abhimanyu
	if(globalPersistDomainValueNeverLoggedIN != "")
	     $("#domain_never_loggedIn").val(globalPersistDomainValueNeverLoggedIN);

	$.each(obj1, function(i,data){
		listNeverLoggedIn.push(data.neverLoggedinCount);
		listApp.push(data.application);
	});
	
	
	
	var AppList=JSON.stringify(listApp).toString();
	var test = JSON.stringify(listNeverLoggedIn).toString();
	
	
	        $('#container_never_loggedin').highcharts({
            chart: {
                type: 'column',
                height:400
            },
            title: {
                text:'Never LoggedIn User'
            },
            xAxis: {
                categories: listApp,
                 title: {
                    text: 'Applications'
                },
            },
            yAxis: {
              allowDecimals:false,
               
                title: {
                    text: 'Users'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            
             tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            
            plotOptions: {
            
                column: {
                    stacking: 'normal',
                      point:{
                      events:{
                          click:function(){
                        	 // appname=this.category;
                        	//  alert("clicked");
                        	 // authenticationDetailReport(this.category,domain,false,false);
                          }
                      }
                  }
                }
            },
             series: [{
                name: 'Never LoggedIn User',
                data: JSON.parse(test)
            }
            ]
        });
	}
	
	else
	{
		$("#container_grap_auth").html("No Results");
	}
	}
	});
	
	}
catch(e){}
	
}