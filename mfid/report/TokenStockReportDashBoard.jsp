<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert and Display Record 9lessons.info</title>

<script type="text/javascript" src='<%= request.getContextPath() %>/web/js/table/jquery.min.js'></script>
<script type="text/javascript" src='<%= request.getContextPath() %>/web/js/json2.js'></script>
<script type='text/javascript'>
function pieClickFunctionCall(name){
   
 
 
    categorySelected=name;
// alert("in function"+categorySelected);

  window.open("reportNew_runTokenStockDetailReport.action?category="+categorySelected,"_blank","directories=no, status=no,width=800, height=370,top=0,left=0");

 }
$(document).ready(function()
		{
		//alert("hello1");
	
	var listApp=new Array();
		
	

	$.ajax
	({
	
	url: "TokenStockReportAction.action",  
	dataType:"json",
	
	success: function(data)
	{//alert("hello2");
	//alert(data);
	//alert("app list "+data.assigned);
	
	if(data.Messages==null){
	
	//alert("no data");
	var div=document.getElementById("container");
	div.innerHTML = div.innerHTML + '<font style="font-weight: bold; display: block; color: #B4886B;">No data to display</font>';
	
	}
		if(data.Messages.length)
	{



	$.each(data.Messages, function(i,data)
	{

 
	
	listApp.push(data.hardToken);
	listApp.push(data.mobileToken);
		listApp.push(data.softToken);
	
	listApp.push(data.pushToken);
	
	listApp.push(data.total);
	//alert("token stock list "+listApp);
   
	});
	
	var test = JSON.stringify(listApp).toString();
	
			$(function () {
        $('#container').highcharts({
            chart: {
                type: 'column'
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
                min: 0,
                title: {
                    text: 'Number Of Tokens',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
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
                          click:function(){
                            pieClickFunctionCall(this.category);
                          }
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
	}
	
	else
	{
		$("#content").html("No Results");
	}
	}
	});
	
	
	
		});
		
		
			$(document).ajaxStart(function(){
  
    $("#loading").css("display","block");
    $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
     // alert("start");
  });
  
  $(document).ajaxComplete(function(){
  
    $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
     // alert("complete");
  });  
   
		
</script>
<style>

</style>
</head>
<body>
<div id="loading" style="display: none;width:100%;height:550px;position:fixed;top:50%;left:50%;z-index: 25;" >
	<img src='<%=request.getContextPath() %>/web/img/ajax_loader_gray_64.gif' width="64" height="64" /><br>Loading..
</div>
<script src="<%= request.getContextPath() %>/web/js/highcharts.js"></script>
<script src="<%= request.getContextPath() %>/web/js/modules/exporting.js"></script>


<div id="container" style="min-width: 900px; height: 400px; margin: 0 auto"></div>
</body>
</html>
