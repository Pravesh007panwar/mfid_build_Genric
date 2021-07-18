function showProtocolSystemStats()
 {  //alert("showSystemStats");
	 
	setTimeout(showProtocolSystemStats,900000);
	var total_Ram=0;
	var total_cpu_processor=0;
	var total_disk_space=0;
	var used_cpu_processor=0;
	var used_Ram=0;
	var used_disk_space=0;
	 
	
	$.ajax({
		type: "POST",  
		url:'report_systemProtocolStatsReport.action',
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
	//   alert("data ======>"+data);
	   data = data.replace(/&quot;/g,'"');
	 //  alert("replace data ========> "+data);
			var object = JSON.parse(data);
		 
                  total_Ram = object.TotalRAM;
                  used_Ram = object.UsedRAM;
				  total_cpu_processor = object.TotalCPU;
				  used_cpu_processor = object.UsedCPU;
				  total_disk_space = object.TotalDiskSpace;
				   used_disk_space = object.UsedDiskSpace;
  
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
	    $('#used_protocol_system_ram_chart').highcharts(Highcharts.merge(gaugeOptions, {
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
	    $('#used_protocol_system_cpu_chart').highcharts(Highcharts.merge(gaugeOptions, {
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
	    $('#used_protocol_system_disk_space_chart').highcharts(Highcharts.merge(gaugeOptions, {
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