function showSystemStats()
 {  //alert("showSystemStats");
	setTimeout(showSystemStats,900000);
	var total_Ram=0;
	var total_cpu_processor=0;
	var total_disk_space=0;
	var used_cpu_processor=0;
	var used_Ram=0;
	var used_disk_space=0;
	
	
	$.ajax({
		type: "POST",  
		url:'report_systemStatsReport.action',
	    async: false,
		dataType: "text",
		success: function(data) { 
	    if($.trim(data)=="sessionout")
			{
	    	return;
			//alert("Session TimeOut...");
			//var testVal=document.getElementById('loginPage').value;
			//window.location.replace(testVal);
			}
	  //  alert("data ======>"+data);
			var object = JSON.parse(data);
			var obj1=JSON.parse(object.systemStatsReportData);
			
                  total_Ram = obj1.totalRam;
                  used_Ram = obj1.usedRam;
				  total_cpu_processor = obj1.totalCpuProcessor;
				  used_cpu_processor = obj1.usedCpuProcessor;
				  total_disk_space = obj1.totalDiskSpace;
				   used_disk_space = obj1.usedDiskSpace;
  
		 }
	 
	});
 
	$(function () {

	    var gaugeOptions = {

	        chart: {
	            type: 'solidgauge'
	        },

	        title: null,

	        pane: {
	            center: ['50%', '85%'],
	            size: '140%',
	            startAngle: -90,
	            endAngle: 90,
	            background: {
	                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
	                innerRadius: '60%',
	                outerRadius: '100%',
	                shape: 'arc'
	            }
	        },

	        tooltip: {
	            enabled: false
	        },

	        // the value axis
	        yAxis: {
	            stops: [
	                [0.1, '#55BF3B'], // green
	                [0.5, '#DDDF0D'], // yellow
	                [0.9, '#DF5353'] // red
	            ],
	            lineWidth: 0,
	            minorTickInterval: 1000,
	            tickPixelInterval: 30000,
	            tickWidth: 0,
	            title: {
	                y: -70
	            },
	            labels: {
	                y: 16
	            }
	        },

	        plotOptions: {
	            solidgauge: {
	                dataLabels: {
	                    y: 5,
	                    center: ["50%", "50%"],
	                    borderWidth: 0,
	                    useHTML: true
	                }
	            }
	        }
	    };

	    // The RAM gauge
	    $('#used_system_ram_chart').highcharts(Highcharts.merge(gaugeOptions, {
	        yAxis: {
	            min: 0,
	            max:total_Ram,
	            tickInterval:total_Ram,
	            title: {
	                text: 'RAM'
	            }
	        },

	        credits: {
	            enabled: false
	        },

	        series: [{
	            name: 'RAM',
	            data: [used_Ram],
	            dataLabels: {
	                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
	                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
	                       '<span style="font-size:12px;color:silver"> GB</span></div>'
	            },
	            tooltip: {
	                valueSuffix: ' GB'
	            }
	        }]

	    }));
	    
	     // CPU
	    $('#used_system_cpu_chart').highcharts(Highcharts.merge(gaugeOptions, {
	        yAxis: {
	            min: 0,
	            max: total_cpu_processor,
	            tickInterval:total_cpu_processor,
	            title: {
	                text: ' CPU'
	            }
	        },

	        series: [{
	            name: 'CPU',
	            data: [used_cpu_processor],
	            dataLabels: {
	                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
	                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
	                       '<span style="font-size:12px;color:silver"> %</span></div>'
	            },
	            tooltip: {
	                valueSuffix: ' % '
	            }
	        }]

	    }));
	    
	    
	    
	    

	    // The Disk space gauge
	    $('#used_system_disk_space_chart').highcharts(Highcharts.merge(gaugeOptions, {
	        yAxis: {
	            min: 0,
	            max: total_disk_space,
	            tickInterval:total_disk_space,
	            title: {
	                text: 'Disk Space'
	            }
	        },

	        series: [{
	            name: 'Disk Space',
	            data: [used_disk_space],
	            dataLabels: {
	                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
	                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
	                       '<span style="font-size:12px;color:silver">GB</span></div>'
	            },
	            tooltip: {
	                valueSuffix: ' GB'
	            }
	        }]

	    }));

	    


	});

}