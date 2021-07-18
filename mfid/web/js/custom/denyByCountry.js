var frmDate = getAddDaysToCurrentDate();
var toDate = getCurrentDate();
var global_frmDate = '';
var global_toDate = '';
var domain='';
var globalPersistDenyCountryDomainValue="";
						function getCurrentDate()
						{
							
							var d = new Date();
						
							var month = d.getMonth()+1;
							var day = d.getDate();
							var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
							return output;
						}

						function getAddDaysToCurrentDate()
						{
							var d = new Date();
							d.setDate(d.getDate() - 7);
							var month = d.getMonth()+1;
							var day = d.getDate();
							var output =((''+day).length<2 ? '0' : '') + day+'/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
							return output;
						
						}

						function denyByCountryReportDatewise()
						{  
							var domain=document.getElementById("denyCountryDomain").value;
							if($.trim(domain) == ""){
								alert("Please select domain");
								return;
							}
							else{
							globalPersistDenyCountryDomainValue=domain; 
							frmDate=$("#from_date").val();
							toDate=$("#to_date").val();
							global_frmDate=$("#from_date").val();
							global_toDate=$("#to_date").val();
							denyByCountryReport(domain);
							}
							 
						 }

						function denyByCountryReport(domain1)
						{
							var initial= "0";
							domain=domain1;
							var object;
							$.ajax({
								type: "POST",  
								url:"report_denyByCountryReport.action?fromDate="+frmDate+"&toDate="+toDate+"&initial="+initial+"&domain="+domain,
							    async: false,
								dataType: "text",
								success: function(data) {
									object = JSON.parse(data);
								 }
							});
							var obj2=JSON.parse(object.domainListData);
							var data=JSON.parse(object.denyByCountryReportList);
							 
							if(object.domainListData != null && object.domainListData != 'null')
							   {
									var content='';
									var tempDomainList;
									content += '<div class="span3">';
									content += '<label>Domain : </label>';
									content += '<select id="denyCountryDomain" name="switchDomain" >';
									content += '<option value="">-select domain-</option>';
									jQuery.each(obj2, function(i, v) {
										tempDomainList=obj2[i];
										content += '<option value="'+tempDomainList+'" >'+tempDomainList+'</option>';
									});
									
									content += '</select>';
									content += '</div>';
						
									content += '<div class="row-fluid">';
									content += '<div class="span3 offset0">';
									content += '<label>From : </label>';
									content += '<input type="text" name="from_date" id="from_date" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
									content += '</div>';
						
									content += '<div class="span3 offset0">';
									content += '<label>To : </label>';
									content += '<input type="text" name="to_date" id="to_date" readonly style="cursor:pointer;"/>'; // add for bug id 263 , added by abhimanyu
									content += '</div>';
									
									content += '<div class="span3 offset0">';
									content += '<input type="button" value="Submit" class="btn btn-primary" style="margin-top: 25px;"  id="submit_date" onClick="denyByCountryReportDatewise();" />';
									content += '</div>';
									content += '<div class="clear"></div>';
									content += '</div>';
									
									
									var div=document.getElementById("deny_country_report_date");
									div.innerHTML=content;
									
									
									$("#from_date" ).datepicker({ dateFormat: "dd/mm/yy" }).val();
									$("#to_date").datepicker({ dateFormat: "dd/mm/yy" }).val();
									if(global_frmDate != '' && global_toDate != '')
										{
											$("#from_date" ).val(global_frmDate);
											$("#to_date" ).val(global_toDate);
										}
									else
										{
										$("#from_date" ).val(getAddDaysToCurrentDate());
										$("#to_date" ).val(getCurrentDate());
										}
									
									
									
									if(globalPersistDenyCountryDomainValue != "")
									     $("#denyCountryDomain").val(globalPersistDenyCountryDomainValue);
									
									 }
							
							
							$(function () {
								// Add lower case codes to the data set for inclusion in the tooltip.pointFormat
						        $.each(data, function () {
						            this.flag = this.code.replace('UK', 'GB').toLowerCase();
						        });
						
						        // Initiate the chart
						        $('#country-container').rhighcharts('Map', {
						
						            title: {
						                text: 'Deny By Country'
						            },
						
						            legend: {
						                title: {
						                    text: 'Individuals country deny per no.',
						                    style: {
						                        color: (rhighcharts.theme && rhighcharts.theme.textColor) || 'black'
						                    }
						                }
						            },
						
						            mapNavigation: {
						                enabled: true,
						                buttonOptions: {
						                    verticalAlign: 'bottom'
						                }
						            },
						
						            tooltip: {
						                backgroundColor: 'none',
						                borderWidth: 0,
						                shadow: false,
						                useHTML: true,
						                padding: 0,
						                pointFormat: '<span class="f32"><span class="flag {point.flag}"></span></span>' +
						                    ' {point.name}: <b>{point.value}</b>',
						                positioner: function () {
						                    return { x: 0, y: 250 };
						                }
						            },
						
						            colorAxis: {
						                min: 1,
						                max: 1000,
						                type: 'logarithmic'
						            },
						
						            series : [{
						                data : data,
						                mapData: rhighcharts.maps['custom/world'],
						                joinBy: ['iso-a2', 'code'],
						                name: 'Number of deny',
						                states: {
						                    hover: {
						                        color: '#BADA55'
						                    }
						                }
						            }]
						        });
						    //});
						});
							
							 
							
						
						
						}

