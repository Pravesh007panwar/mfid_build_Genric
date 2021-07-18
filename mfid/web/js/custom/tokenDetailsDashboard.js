var globalPersistTokenDetailReportDomainValue="";

function tokenDetailsDashBord(domain){
//alert(domain)
var listUsed=new Array();
var listFree=new Array();
var freeList;
var usedList;
	try{
	$.ajax({
		type: "POST",  
		url: "report_tokenDetailsDashboard.action?domainName="+domain,  
		data: "{}",
		async: false,
		dataType: "text",
			success: function(data) {
				
				var object = JSON.parse(data);
				//alert("JSON.parse(object.getXmppServerIp)===="+JSON.parse(object.freeHardToken))
				//alert("JSON.parse(object.getXmppServerIp)===="+JSON.parse(object.freeHardToken))
				
				listFree.push(object.freeHardToken);
				listFree.push(object.freeMobileToken);
				listFree.push(object.freeBioToken);
				listFree.push(object.freePushToken);
				
				
				listUsed.push(object.usedHardToken);
				listUsed.push(object.usedMobileToken);
				listUsed.push(object.usedBioToken);
				listUsed.push(object.usedPushToken);
				
				//alert("listUsed===="+listUsed )
				
				var usedList=JSON.stringify(listUsed).replace (/"/g,'');
				var freeList=JSON.stringify(listFree).replace (/"/g,'');
				//alert("test==="+test)
				
				var obj2=JSON.parse(object.domainList);
				if($.trim(data)=="sessionout"){
					 return ;
					//testVal= document.getElementById('loginPage').value				
					//window.location.replace(testVal);
				}
				
				if(object==null){
					
					alert("no data");
					var div=document.getElementById("container_token_details");
					div.innerHTML = div.innerHTML + '<font style="font-weight: bold; display: block; color: #B4886B;">No data to display</font>';
					
					}
				
				
				var content='';
				content += '<div class="span3">';
				content += '<label>Domain : </label>';
				content += '<select id="domainTokenDetail" name="domainTokenDetail" onchange="changeDomainReportTokenDetail();">';
				content += '<option value="">-select domain-</option>';
				jQuery.each(obj2, function(i, v) {
				//	alert(i+"\t"+v);
				var tempDomainList=obj2[i];
				
				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
			});
				
				content += '</select>';
				content += '</div>';
				var div=document.getElementById("container_domain_token_details");
				div.innerHTML=content;
				// add code for Bug id #348 , added by abhimanyu
				if(globalPersistTokenDetailReportDomainValue != "")
				     $("#domainTokenDetail").val(globalPersistTokenDetailReportDomainValue);

				
				$('#container_token_details').highcharts({
			        chart: {
			            type: 'column'
			        },
			        title: {
			            text: 'Token Details'
			        },
			        xAxis: {
			        	title: {
			                text: 'Authentication Type'
			            },
			            categories: ['Hard Token', 'Mobile Token', 'Bio Token','Push Token']
			        },
			        yAxis: {
			        	allowDecimals:false,
			            min: 0,
			            title: {
			                text: 'Total Tokens'
			            },
			            stackLabels: {
			                enabled: true,
			                style: {
			                    fontWeight: 'bold',
			                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
			                }
			            }
			        },
			        legend: {
			        	reversed: true
			        },
			        tooltip: {
			            headerFormat: '<b>{point.x}</b><br/>',
			  pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
			        },
			        plotOptions: {
			            column: {
			                stacking: 'normal',
			                dataLabels: {
			                    enabled: true,
			                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
			                    style: {
			                        textShadow: '0 0 3px black'
			                    }
			                }
			            }
			        },
			        series: [{
			            name: 'Assigned',
			            data: JSON.parse(usedList)
			        }, {
			            name: 'Free',
			            data: JSON.parse(freeList)
			        }, ]
			    });
				
				
				
				
				}
		});
		
	}
	catch(e)
	{
		//alert(e);
	}
	}








function changeDomainReportTokenDetail()
{
	var domain=document.getElementById("domainTokenDetail").value;
	globalPersistTokenDetailReportDomainValue=domain; // add line for Bug id #348 , added by abhimanyu
	if($.trim(domain) != "")
		tokenDetailsDashBord(domain);
}














