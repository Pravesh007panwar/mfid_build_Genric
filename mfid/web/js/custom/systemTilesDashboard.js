var globalPersistSystemTilesReportDomainValue="";
var days;
function systemTilesDashboardReport(domain,dateWise){
//alert(domain)
	days = dateWise;
	//alert(dateWise);
	//alert(days);
var successList=new Array();
var unSuccessList=new Array();

var success;
var unSuccess;
	try{
	$.ajax({
		type: "POST",  
		url: "report_systemTilesDashboard.action?domainName="+domain+'&reportType='+dateWise, 
		data: "{}",
		async: false,
		dataType: "text",
			success: function(data) {
				
				var object = JSON.parse(data);
								
				unSuccessList.push(object.pushUnsuccessCount);
				unSuccessList.push(object.otpUnsuccessCount);
				unSuccessList.push(object.bioUnsuccessCount);
				
				
				
				successList.push(object.pushSuccessCount);
				successList.push(object.otpSuccessCount);
				successList.push(object.bioSuccessCount);
				
				
							
				var success=JSON.stringify(successList).replace (/"/g,'');
				var unSuccess=JSON.stringify(unSuccessList).replace (/"/g,'');
				
				
				var obj2=JSON.parse(object.domainList);
				if($.trim(data)=="sessionout"){
					 return ;
				}
				
				/*if(object==null){
					
					alert("no data");
					var div=document.getElementById("container_token_details");
					div.innerHTML = div.innerHTML + '<font style="font-weight: bold; display: block; color: #B4886B;">No data to display</font>';
					
					}*/
				
				
				var content='';
				content += '<div class="span3" style="float:right;">';
				content += '<label>Domain : </label>';
				content += '<select id="domainSystemTiles" name="domainSystemTiles" onchange="changeDomainReportSystemTiles();">';
				content += '<option value="">Select Domain</option>';
				jQuery.each(obj2, function(i, v) {
				
				var tempDomainList=obj2[i];
				
				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
			});
				
				content += '</select>';
				content += '</div>';
				var div=document.getElementById("container_tiles_domain");
				div.innerHTML=content;
			
				if(globalPersistSystemTilesReportDomainValue != "")
				     $("#domainSystemTiles").val(globalPersistSystemTilesReportDomainValue);

				
				$('#container_tiles_dashboard').highcharts({
			        chart: {
			            type: 'column'
			        },
			        title: {
			            text: 'System Tiles'
			        },
			        xAxis: {
			        	title: {
			                text: 'Tiles Type'
			            },
			            categories: ['Push', 'OTP', 'Bio']
			        },
			        yAxis: {
			        	allowDecimals:false,
			            min: 0,
			            title: {
			                text: 'Total Counts'
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
			            name: 'Success',
			            data: JSON.parse(success)
			        }, {
			            name: 'Unsuccess',
			            data: JSON.parse(unSuccess)
			        }, ]
			    });
				
				
				
				
				}
		});
		
	}
	catch(e)
	{
		
	}
	}


function changeDomainReportSystemTiles()
{
	var domain=document.getElementById("domainSystemTiles").value;
	//alert(domain);
	globalPersistSystemTilesReportDomainValue=domain; // 
	if($.trim(domain) != "")
		systemTilesDashboardReport(domain,days);
}
