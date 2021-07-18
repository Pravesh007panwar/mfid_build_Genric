var globalPersistAuthenticationreportDomainValueAuth="";
function changeDomainReportAuth()
{
	var domain=document.getElementById("domain_auth").value;
	//alert("domain===="+domain)
	globalPersistAuthenticationreportDomainValueAuth=domain; // add line for Bug id #347 , added by abhimanyu
	   if($.trim(domain) != "")
	     showAuthenticationReport(domain);
	 
}


function showAuthenticationReport(domain){
//alert("in fun");
	//alert("======>"+domain);
	//domainn=domain;
	var test=new Array();
	var test2=new Array();
	var test3=new Array();
	var test4=new Array();
	var test5=new Array();
	var test6=new Array();
	var listApp=new Array();
		var AppList= new Array();
	var ListHardTokenStatus=new Array();
	var ListSoftTokenStatus=new Array();
	var ListDesktopTokenStatus=new Array();
	var ListMobileTokenStatus=new Array();
	var ListEmergencyTokenStatus=new Array();
	var ListPushTokenStatus=new Array();
	var testApp=new Array();
	testApp.push('App1');
	testApp.push('App2');
	testApp.push('App3');
	//alert("testApp is "+testApp);
	var testApp2="['App1','App2','App3']"; //for testing string value as category
	//alert("testApp2 is "+testApp2);
	//var d2Value=document.getElementById('d2').value;
	try{
	$.ajax
	({
		type: "POST",  
		url: "report_authenticationReportDashBoard.action?domainName="+domain,  
		data: "{}",
		async: false,
		dataType: "text",
	
	
	success: function(data)
	{//alert("hello2");
	//alert(data);
		 if($.trim(data)=="sessionout"){
				return;
				//testVal= document.getElementById('loginPage').value				
				//window.location.replace(testVal);
			}
		var object = JSON.parse(data);
		var obj1=JSON.parse(object.authenticationDashboardData);
		var obj2=JSON.parse(object.domainListData);
		//alert("obj1==="+object.authenticationReportList);
		//alert("obj2==="+object.domainList);
	
	if(object.authenticationDashboardData==null){
	
	alert("no data");
	var div=document.getElementById("container_grap_auth");
	div.innerHTML = div.innerHTML + '<font style="font-weight: bold; display: block; color: #B4886B;">No data to display</font>';
	
	}
		if(object.authenticationDashboardData.length)
	{
	var j=0;
	var content='';
	content += '<div class="span3" style="float:right;">';
	content += '<label>Domain : </label>';
	content += '<select id="domain_auth" name="switchDomainAuth" onchange="changeDomainReportAuth();">';
	content += '<option value="">-select domain-</option>';
	jQuery.each(obj2, function(i, v) {
	var tempDomainList=obj2[i];
	
	content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
});
	
	content += '</select>';
	content += '</div>';
	var div=document.getElementById("container_domain_auth");
	div.innerHTML=content;
	// add code for Bug id #347 , added by abhimanyu
	if(globalPersistAuthenticationreportDomainValueAuth != "")
	     $("#domain_auth").val(globalPersistAuthenticationreportDomainValueAuth);

	$.each(obj1, function(i,data)
	{
	
		 
	
	ListHardTokenStatus.push(data.totalHardTokens);
	ListSoftTokenStatus.push(data.totalSmsTokens);
	ListDesktopTokenStatus.push(data.totalBioTokens);
	ListMobileTokenStatus.push(data.totalMobileTokens);
	ListPushTokenStatus.push(data.totalPushTokens);
	listApp.push(data.application);

   
	});
	var AppList=JSON.stringify(listApp).toString();
	var test = JSON.stringify(ListHardTokenStatus).toString();
	var test2=JSON.stringify(ListSoftTokenStatus).toString();
	var test4=JSON.stringify(ListDesktopTokenStatus).toString();
	var test5=JSON.stringify(ListMobileTokenStatus).toString();
	var test6=JSON.stringify(ListPushTokenStatus).toString();
	//alert("test "+test);
	//alert("test2 "+test2);
	
	        $('#container_grap_auth').highcharts({
            chart: {
                type: 'column',
                height:400
            },
            title: {
                text:'Authentication Type'
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
                        	  appname=this.category;
                        	//  alert("clicked");
                        	  authenticationDetailReport(this.category,domain,false,false);
                          }
                      }
                  }
                }
            },
             series: [{
                name: 'Hard Token',
                data: JSON.parse(test)
            }, {
                name: 'Sms Token',
                data: JSON.parse(test2)
            }
            , {
                name: 'Bio Token',
                data: JSON.parse(test4)
            }
            , {
                name: 'Mobile Token',
                data: JSON.parse(test5)
            }
            , {
                name: 'Push Token',
                data: JSON.parse(test6)
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
	
	}catch(e){}
}