
var stocklist;
var count;
var searchTokenStockReportForAll=false;
var searchAllTokenReportForCountValue=false;
var globalPersistTokenStockReportDomainValue="";
 
	
	function showTokenStock(domain){
	 
	var listApp=new Array();
	var test="";
	try{
	$.ajax
	({
		type: "POST",  
		url: "report_tokenStockReportDasdboard.action?domainName="+domain,  
		data: "{}",
		async: false,
		dataType: "text",
	
	success: function(data)
	{//alert("hello2");
	//alert(data);
	//alert("app list "+data.assigned);
		 if($.trim(data)=="sessionout"){
				 return ;
				//testVal= document.getElementById('loginPage').value				
				//window.location.replace(testVal);
			}
		 
		var object = JSON.parse(data);
		var obj1=JSON.parse(object.tokenstockDashboardData);
		var obj2=JSON.parse(object.domainListData);
		// alert("obj1==="+object.tokenstockDashboardData);
		// alert("obj2==="+object.domainListData);
	 if(object.tokenstockDashboardData==null){
	
	//alert("no data");
	var div=document.getElementById("container_grap");
	div.innerHTML = div.innerHTML + '<font style="font-weight: bold; display: block; color: #B4886B;">No data to display</font>';
	
	} 
		if(object.domainListData != null && object.domainListData != 'null')
	   {
			//alert("if");
			var content='';
			content += '<div class="span3">';
			content += '<label>Domain : </label>';
			content += '<select id="domain" name="switchDomain" onchange="changeDomainReport();">';
			content += '<option value="">-select domain-</option>';
			jQuery.each(obj2, function(i, v) {
			//	alert(i+"\t"+v);
			var tempDomainList=obj2[i];
			
			content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
		});
			
			content += '</select>';
			content += '</div>';
			//var div=document.getElementById("container_domain"); 
		//	div.innerHTML=content; // Saurabh Comment by Me. 61 62..
			// add code for Bug id #348 , added by abhimanyu
			if(globalPersistTokenStockReportDomainValue != "")
			     $("#domain").val(globalPersistTokenStockReportDomainValue);
			
	   }
		if(object.tokenstockDashboardData != null && object.tokenstockDashboardData != 'null')
		   {
			
                listApp.push(obj1.totalHardTokens);
			    listApp.push(obj1.totalMobileTokens);
				listApp.push(obj1.totalSoftTokens);
			    listApp.push(obj1.totalPushToken);
			    listApp.push(parseInt(obj1.totalHardTokens)+ parseInt(obj1.totalMobileTokens)+ parseInt(obj1.totalSoftTokens)+ parseInt(obj1.totalPushToken));
	 
			    
	 
	 
	  test = JSON.stringify(listApp).toString();
	  }
	
	//alert(test);
	$('#container_grap').html("");
			$(function () {
        $('#container_grap').highcharts({
            chart: {
                type: 'column',
                height: 400,
                
            },
            title: {
                text: 'Token Stock'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['Hard Tokens', 'Mobile Tokens','Soft Tokens', 'Push Tokens','Total'],
                title: {
                    text: null
                }
            },
            yAxis: {
              allowDecimals:false,
               
                title: {
                    text: 'Number Of Tokens'
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
                valueSuffix: ' Tokens'
            },
            plotOptions: {
             series: {
                    dataLabels: {
                        enabled: true,
                        color: 'gray'
                    }
                },
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                     point:{
                      events:{
                        /*  click:function(){
                        	 // alert("coulmn clicked");
                        	  searchAllTokenReportForCountValue=true;
                        	  tokenStockDetailReport(this.category,domain,false,false);
                          } */
                      }
                  }
                }
            },
           
            credits: {
                enabled: false
            },
            series: [{
                name: 'Tokens',
                data:  JSON.parse(test)
            }]
        });
    });
	/*}
	 else
	{  // alert("inside else");
		$("#container_grap").html("No Results");
	}*/
	}
	});
	}
	   catch(e){}
	
	}
	
	function changeDomainReport()
	{
		var domain=document.getElementById("domain").value;
		globalPersistTokenStockReportDomainValue=domain; // add line for Bug id #348 , added by abhimanyu
		if($.trim(domain) != "")
		showTokenStock(domain);
	}
	
	
	$(document).on('click','.close_table',function(){  
		$(this).parent('div').hide(300);
		
	});
	
	
 