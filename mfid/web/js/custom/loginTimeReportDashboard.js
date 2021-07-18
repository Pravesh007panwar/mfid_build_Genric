var globalPersistdomainLoginDetailReportDomainValue="";
var reportType=1;
function loginTimeDashBord(domain,reportType){
//alert(domain)
	reportType = reportType;
var listSuccess=new Array();
var listUnsuccess=new Array();
var cateListArray=new Array();
 var textValue='';
var freeList;
var usedList;
	try{
	$.ajax({
		type: "POST",  
		url: "report_loginTimeDashboard.action?domainName="+domain+'&reportType='+reportType,  
		data: "{}",
		async: false,
		dataType: "text",
			success: function(data) {
				//alert("data = "+data);
				var object = JSON.parse(data);
				//alert("JSON.parse(object.getXmppServerIp)===="+JSON.parse(object.freeHardToken))
				//alert("JSON.parse(object.getXmppServerIp)===="+JSON.parse(object.freeHardToken))
				var obj11=JSON.parse(object.loginTimeDashboard);
				//alert("obj1 ===== "+obj11);
				  
					
				  
				  	
					  
		  if(reportType != 1)
			  {
			  textValue='Day Line';
			  if(obj11 != null && obj11 != 'null')
				{
				  
				  jQuery.each(obj11, function(i, obj1) {
					  listUnsuccess.push(obj1.zeroHourUnsuccess);
					  cateListArray.push(obj1.domain);
				  
				  });
				 
				}
			  }
		  else {
			  textValue= 'Time Line';
				if(obj11 != null && obj11 != 'null')
					{
				  for(var i=0 ; i<24 ; i++)
						 {  cateListArray.push(i); }
				 jQuery.each(obj11, function(i, obj1) {
			    listSuccess.push(obj1.twentithreeHourSuccess);
				listSuccess.push(obj1.twentitwoHourSuccess);
				listSuccess.push(obj1.twentioneHourSuccess);
				listSuccess.push(obj1.twentyHourSuccess);
				listSuccess.push(obj1.nineteenHourSuccess);
				listSuccess.push(obj1.eightteenHourSuccess);
				listSuccess.push(obj1.seventeenHourSuccess);
				listSuccess.push(obj1.sixteenHourSuccess);
				listSuccess.push(obj1.fifthteenHourSuccess);
				listSuccess.push(obj1.fourteenHourSuccess);
				listSuccess.push(obj1.thirteenHourSuccess);
				listSuccess.push(obj1.twelveHourSuccess);
				listSuccess.push(obj1.elevenHourSuccess);
				listSuccess.push(obj1.tenHourSuccess);
				listSuccess.push(obj1.nineHourSuccess);
				listSuccess.push(obj1.eightHourSuccess);
				listSuccess.push(obj1.sevenHourSuccess);
				listSuccess.push(obj1.sixHourSuccess);
				listSuccess.push(obj1.fiveHourSuccess);
				listSuccess.push(obj1.fourHourSuccess);
				listSuccess.push(obj1.threeHourSuccess);
				listSuccess.push(obj1.twoHourSuccess);
				listSuccess.push(obj1.oneHourSuccess);
				listSuccess.push(obj1.zeroHourSuccess);
				listSuccess.reverse();
				
				//alert("listSuccess==="+obj1.zeroHourUnSuccess)
				//alert("test value = "+obj1.thirteenHourUnsuccess);
		        listUnsuccess.push(obj1.twentithreeHourUnsuccess);
				listUnsuccess.push(obj1.twentitwoHourUnsuccess);
				listUnsuccess.push(obj1.twentioneHourUnsuccess);
				listUnsuccess.push(obj1.twentyHourUnsuccess);
				listUnsuccess.push(obj1.nineteenHourUnsuccess);
				listUnsuccess.push(obj1.eightteenHourUnsuccess);
				listUnsuccess.push(obj1.seventeenHourUnsuccess);
				listUnsuccess.push(obj1.sixteenHourUnsuccess);
				listUnsuccess.push(obj1.fifthteenHourUnsuccess);
				listUnsuccess.push(obj1.fourteenHourUnsuccess);
				listUnsuccess.push(obj1.thirteenHourUnsuccess);
				listUnsuccess.push(obj1.twelveHourUnsuccess);
				listUnsuccess.push(obj1.elevenHourUnsuccess);
				listUnsuccess.push(obj1.tenHourUnsuccess);
				listUnsuccess.push(obj1.nineHourUnsuccess);
				listUnsuccess.push(obj1.eightHourUnsuccess);
				listUnsuccess.push(obj1.sevenHourUnsuccess);
				listUnsuccess.push(obj1.sixHourUnsuccess);
				listUnsuccess.push(obj1.fiveHourUnsuccess);
				listUnsuccess.push(obj1.fourHourUnsuccess);
				listUnsuccess.push(obj1.threeHourUnsuccess);
				listUnsuccess.push(obj1.twoHourUnsuccess);
				listUnsuccess.push(obj1.oneHourUnsuccess);
				listUnsuccess.push(obj1.zeroHourUnsuccess);
				listUnsuccess.reverse();
				
					});
					}
				}

				
				// alert("listUnsuccess==="+listUnsuccess)
				 var unSuccessList=JSON.stringify(listUnsuccess);
				var successList=JSON.stringify(listSuccess);
				//alert("successList==="+successList)
				
				//alert("unSuccessList==="+unSuccessList)
				
				
				
				var obj2=JSON.parse(object.domainList);
				if($.trim(data)=="sessionout"){
					 return ;
					//testVal= document.getElementById('loginPage').value				
					//window.location.replace(testVal);
				}
				
				if(object==null){
					
					alert("no data");
					var div=document.getElementById("container_login_time");
					div.innerHTML = div.innerHTML + '<font style="font-weight: bold; display: block; color: #B4886B;">No data to display</font>';
					
					}
				
				
				var content='';
				content += '<div class="span3" style="float:right;">';
				content += '<label>Domain : </label>';
				content += '<select id="domainLoginDetail" name="domainLoginDetail" onchange="changeDomainReportLoginTime();">';
				content += '<option value="">-select domain-</option>';
				jQuery.each(obj2, function(i, v) {
				//	alert(i+"\t"+v);
				var tempDomainList=obj2[i];
				
				content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
			});
				
				content += '</select>';
				content += '</div>';
				var div=document.getElementById("container_domain_login_time");
				div.innerHTML=content;
				// add code for Bug id #348 , added by abhimanyu
				if(globalPersistdomainLoginDetailReportDomainValue != "")
				     $("#domainLoginDetail").val(globalPersistdomainLoginDetailReportDomainValue);

				
				$('#container_login_time').highcharts({
			        chart: {
			            type: 'column'
			        },
			        title: {
			            text: 'User Login Time'
			        },
			        xAxis: {
			        	title: {
			                text: textValue
			            },
			            categories : cateListArray
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: 'Total Unsuccess Attempts'
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
			        plotOptions: {
			            series: {
			                stacking: 'normal'
			            }
			        },
			        series: [/*{
			            name: 'Success',
			            data: JSON.parse(successList)
			        },*/  {
			            name: 'Unsuccess',
			            data: JSON.parse(unSuccessList)
			        }]
			    });
				
				
				
				
				}
		});
		
	}
	catch(e)
	{
		//alert(e);
	}
	}








function changeDomainReportLoginTime()
{
	var domain=document.getElementById("domainLoginDetail").value;
	globalPersistdomainLoginDetailReportDomainValue=domain; // add line for Bug id #348 , added by abhimanyu
	if($.trim(domain) != "")
		loginTimeDashBord(domain,reportType);
}
































