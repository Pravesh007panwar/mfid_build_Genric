var min;var hour;var date;var month;var day;
function showLables(){
try{
    $.ajax({
		type: "POST",
		url: "admin_showModifyUserSyncSchedularPage.action",
		async: false,
		dataType:"text",
		success: function(data){
			if($.trim(data)=="sessionout"){
				alert(data);
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
				var object = JSON.parse(data);
			min=JSON.parse(object.minuteScheduler);
			hour=JSON.parse(object.hoursScheduler);
			date=JSON.parse(object.dateScheduler);
			month=JSON.parse(object.monthScheduler);
			day=JSON.parse(object.weekDayScheduler);
			
			
		}
	});
}
catch (e) {
	//alert(e)
	// TODO: handle exception
}
}



	
		function openDayTab(){
			var content='';
			content +='<div class="span4 offset4" style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block;">';
				content +='<div class="row-fluid">';
							content +='<div class="control-group"><label>Current Schedular : </label>';
							
							content +='<div class="schedular_heading"><span style="display:inline; margin-right:10px;"> Minutes = '+min+'</span><span> Hours = '+hour+'</span></div></div>';
							content +='<div class="control-group"><label>Schedular</label><span class="help-inline red_color">*</span>';
							content +='<div>';
								
								content +='<select id="hourId" class="span6 nw_spl"><option value="select"> Hours</option><option value="none"> none</option>';
									for(i=0;i<=23;i++)
									{
									var temp;
									if(i<10)
									 temp="0"+i;
									else 
										 temp=i;
									content += '<option value="'+temp+'" >'+temp+'</option>';
								}
									content +='</select>';
							  
									content +='<select id="minuteId" class="span6 mmwidth nw_spr"><option value="select"> Minutes</option><option value="none"> none</option>';
									for(i=0;i<=59;i++)
										{
										var temp;
										if(i<10)
										 temp="0"+i;
										else 
											 temp=i;
										content += '<option value="'+temp+'" >'+temp+'</option>';
									}
									//	content +='<option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option>';
										content +='	</select>';
									content +='</div>';
									content +='<div class="ag_center">';
									content +='<button class="btn btn-primary" onClick="updateSchedular()" type="button">Submit</button>';
									content +='</div>';
							content +='</div>';
							
				content +='</div>';
			content +='</div>';
			$('#schedular_data').html(content);
		}
		
		function openWeekTab(){
			var content='';
			content +='<div class="span6 offset3" style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block;">';
				content +='<div class="row-fluid">';
							content +='<div class="control-group"><label>Current Schedular : </label>';
							content +='<div class="schedular_heading"><span style="display:inline; margin-right:10px;"> Minutes = '+min+'</span><span> Hours = '+hour+'</span><span > Day of week = '+day+'</span></div></div>';
							content +='<div class="control-group" style="text-align:center;"><label style="text-align:left; display:block;">Schedular</label><span class="help-inline red_color">*</span>';
							content +='<div>';
							content +='<select id="dayId" class="span4 nw_spl"><option value="select"> Week Day</option><option value="none"> none</option><option value="01">Monday</option><option value="02">Tuseday</option><option value="03">Wednesday</option><option value="04">Thursday</option><option value="05">Friday</option><option value="06">Saturday</option><option value="07">Sunday</option></select>';
							content +='<select id="hourId" class="span4 nw_spl" style="margin-left:3px;"><option value="select"> Hours</option><option value="none"> none</option>';
							for(i=0;i<=23;i++)
							{
							var temp;
							if(i<10)
							 temp="0"+i;
							else 
								 temp=i;
							content += '<option value="'+temp+'" >'+temp+'</option>';
						}
							content += '</select>';	
							content +='<select id="minuteId" class="span4"><option value="select"> Minutes</option><option value="none"> none</option>';
								for(i=0;i<=59;i++)
								{
								var temp;
								if(i<10)
								 temp="0"+i;
								else 
									 temp=i;
								content += '<option value="'+temp+'" >'+temp+'</option>';
							}
								content += '</select>';
								
								content +='</div>';
								content +='<div class="clearfix"></div>';
								content +='<button style="display:inline-block; margin:0 auto;" class="btn btn-primary" onClick="updateSchedular()" type="button">Submit</button>';
							content +='</div>';
							
				content +='</div>';
			content +='</div>';
			$('#schedular_data').html(content);
		}	
		
		function openMonthTab(){
			var content='';
			content +='<div class="span8 offset2" style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block;">';
				content +='<div class="row-fluid au_montab">';
							content +='<div class="control-group"><label>Current Schedular : </label>';
							content +='<div class="schedular_heading"><span style="display:inline; margin-right:10px;"> Minutes = '+min+'</span><span> Hours = '+hour+'</span><span> Month = '+month+'</span><span> Day of Month = '+date+'</span></div></div>';
							content +='<div class="control-group"><label>Schedular</label><span class="help-inline red_color">*</span>';
							content +='<div class="row-fluid">';
							content +='<select  class="span3 nw_spl4" id="monthID" onChange="showDates()" ><option value="select"> Month</option><option value="none"> none</option><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select>';
							content +='<select id="dateId" class="span3 nw_spl4"><option value="select"> Select Date</option><option value="none"> none</option></select>';
							content +='<select id="hourId" class="span3 nw_spl4"><option value="select"> Hours</option><option value="none"> none</option>';
							for(i=0;i<=23;i++)
							{
							var temp;
							if(i<10)
							 temp="0"+i;
							else 
								 temp=i;
							content += '<option value="'+temp+'" >'+temp+'</option>';
						}
							content += '</select>';
							content +='<select id="minuteId" class="span3"><option value="select"> Minutes</option><option value="none"> none</option>';
								for(i=0;i<=59;i++)
								{
								var temp;
								if(i<10)
								 temp="0"+i;
								else 
									 temp=i;
								content += '<option value="'+temp+'" >'+temp+'</option>';
							}
								content += '</select>';
								
								
								
								content +='</div>';
								content +='<div class="clearfix"></div>';
								content +='<div class="ag_center">';
								content +='<button class="btn btn-primary" onClick="updateSchedular()"  type="button">Submit</button>';
							content +='</div>';
							content +='</div>';

				content +='</div>'; 
			content +='</div>';
			$('#schedular_data').html(content);
		}
		function showDates(){
			 var listData=new Array();
				var value = document.getElementById("monthID").value;
				 if(value == 'none')
					return true;
				var sel = document.getElementById("dateId");
				
				document.getElementById('dateId').options.length = 1;
				var opt = sel.options;				
				if(value=="1"||value=="3"||value=="5"||value=="7"||value=="8"||value=="10"||value=="12"){
					
					for (i=0;i<=31;i++){
						
						opt[opt.length] = new Option(i,i)
					}
				}		
				if(value=="4"||value=="6"||value=="9"||value=="11"){
					for (i=0;i<=30;i++){
						opt[opt.length] = new Option(i,i)
					}
				}		
				if(value=="2"){
					var d = new Date();
					var n = d.getFullYear();
					var index;
					if(n%4==0){
						index=29;
					}
					else {
						index=28;
					}
					for (i=0;i<=index;i++){
						opt[opt.length] = new Option(i,i)
					}
				}		
			
				}
		
		function updateSchedular() {
			var selectedVal = $(".schedular_radio:checked").val();
			
			var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
			var myUrl;
			if(!selectedVal){
			
				return false;
			}else if(selectedVal == 'Day'){
			
			var minuteSelected = document.getElementById("minuteId").value;			
				var hourSelected = document.getElementById("hourId").value;
			
			if(minuteSelected=="select"){
				alert("Please select value for minutes.")
				return;
			}
			if(hourSelected=="select"){
				alert("Please select value for Hours.")
				return;
			}
			myUrl="admin_modifyUserSyncSchedularPage.action?schedularType="+selectedVal+"&minutes="+minuteSelected+"&hours="+hourSelected+'&csrfPreventionSalt='+strutsToken;
			}else if(selectedVal == 'Weekly'){
				var minuteSelected = document.getElementById("minuteId").value;
				var hourSelected = document.getElementById("hourId").value;
				var daySelected = document.getElementById("dayId").value;
				if(minuteSelected=="select"){
					alert("Please select value for minutes.")
					return;
				}
				if(hourSelected=="select"){
					alert("Please select value for Hours.")
					return;
				}
				if(daySelected=="select"){
					alert("Please select value for day.")
					return;
				}
				//alert("week")
				myUrl="admin_modifyUserSyncSchedularPage.action?schedularType="+selectedVal+"&minutes="+minuteSelected+"&hours="+hourSelected+"&weekDay="+daySelected+'&csrfPreventionSalt='+strutsToken;
			}else if(selectedVal == 'Monthly'){
				var monthSelected = document.getElementById("monthID").value;				
				var dateSelected = document.getElementById("dateId").value;
				var minuteSelected = document.getElementById("minuteId").value;
				var hourSelected = document.getElementById("hourId").value;
				if(minuteSelected=="select"){
					alert("Please select value for minutes.")
					return;
				}
				if(hourSelected=="select"){
					alert("Please select value for Hours.")
					return;
				}
				if(monthSelected=="select"){
					alert("Please select value for Month.")
					return;
				}
				if(dateSelected=="select"){
					alert("Please select value for Date.")
					return;
				}
				//alert("month")
				myUrl="admin_modifyUserSyncSchedularPage.action?schedularType="+selectedVal+"&minutes="+minuteSelected+"&hours="+hourSelected+"&date="+dateSelected+"&months="+monthSelected+'&csrfPreventionSalt='+strutsToken;
			}
			
			//alert("myUrl=== "+myUrl)
			try{
				$.ajax({
					type: "POST",
					url: myUrl,
					dataType: "text",
					success: function(response){
						
						alert(response);
						resVal=response;
						if($.trim(response) == "success"){
							var selectedVal = $(".schedular_radio:checked").val();
							
							if(!selectedVal){
							
								return false;
							}else if(selectedVal == 'Day'){
							showLables();
								openDayTab();
							}else if(selectedVal == 'Weekly'){
							showLables();
								openWeekTab();
							}else if(selectedVal == 'Monthly'){
							showLables();
								openMonthTab();
							}
						}
					}
				});
				}catch(e){alert(e);}
		}
	