
function onUpdateGetCurrentDate(){
	 var d = new Date();
	    var month = d.getMonth()+1;
	    var day = d.getDate();
	    var minutes = d.getMinutes();
	    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+ ' '+d.getHours() +':'+((''+minutes).length<2 ? '0' : '')+minutes;
	    return output;
}



 

function showCountryCode(code)
{
try{
	//alert("shyam")
	alert(decodeURIComponent(code));
}
catch(e)
{
	alert(e)
}
}

function showAllCountryList()
{
	 //alert("showCountryList ...............")
	try{


		var listData=new Array();
		var listId=new Array();

		$.ajax
		({

			url: 'policy_addCountryList',  
			cache: false,
			dataType:"text",
			async: false,
			success: function(data)
			{if($.trim(data)=="sessionout"){
				
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}

					var obj=JSON.parse(data);
					var obj1=JSON.parse(obj.countryList);
					document.getElementById('allCountryCode').value=obj1;
					

				
			}


		});   

	}
	catch(e){

	}
}

 



function showCountryList(multi,id)
{
	// alert("showCountryList ")
	try{
		var allCountryCode= document.getElementById('allCountryCode').value;
		var arr=allCountryCode.split(',');
				document.getElementById(id).options.length = 0;
				var sel = document.getElementById(id);
				//	alert(listData.length);
				var option = '';
				for(var i = 0; i < arr.length; i++) {
					var opt = sel.options;
					if(multi!='true' && i == 0){
						opt[opt.length] = new Option('-select country codes-','');
					}
					opt[opt.length] = new Option(arr[i],arr[i]);
				
					//$('#domain').append('<option value="'+listId[i]+'">'+listData[i]+'</option>').multiselect('rebuild');
					//option +='<option></option>';
				}
			}


	catch(e){

	}
}



function save()
{
	var res="";
	var dataString="";
	var response="";
	var date1="";
	var date2="";
	
	try{
			var countryCode=$("#countrycode").val();
			var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
			
			var selectUserSearchId=$('input:radio[name=selectUserSearchId]:checked').val();
			//alert("selectUserSearchId===="+selectUserSearchId);
			date1=document.getElementById("from_date").value;
			date2=document.getElementById("to_date").value;
			
			//alert("getCurrentDate()===="+getCurrentDate())
			if(countryCode==""||countryCode==undefined||countryCode==null){
				 alert("Please select country");
				 return;
			 }
			
				if(countryCode.length > maximumCountriesAllowed){
					alert("You can only have a maximum of "+maximumCountriesAllowed+" allowed countries at any given time. Please check your list of allowed countries and try again.");
					 return;
				}
				if(date2==""||date2==undefined||date2==null){
					 alert("Please select the Start Date & Time");
					 return;
				 }
				
				if(date2==""||date2==undefined||date2==null){
					 alert("Please select End Date & Time");
					 return;
				 }
				
				if(new Date(date1) >= new Date(date2)){
					 alert("End Date & Time cannot be lesser than Start Date & Time. Please review and try again.");
					 return;
				 }
				if (new Date(date1) < new Date(getPreviousDate(1))){
					alert("Start date & time should be only 1 day less from current date & time.");
					 return;
				}
				
				/*	 var currentTime = new Date()
					 var month = currentTime.getMonth() + 1
					 var day = currentTime.getDate()
					 var year = currentTime.getFullYear()
					 var currentDate=year + "-" + month + "-" + day;
					 var checkDate1=Date.parse(date1)/1000;
					 var checkDate2=Date.parse(date2)/1000;
					
					 var checkTime1=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time1)))/1000;
					 var checkTime2=Date.parse((currentDate+" "+getUpdateTime(currentDate+" "+time2)))/1000;
				
				 
				  var resultTime = compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2);
					
				 if(resultTime==false)
				 {
				   alert("The date time must come before the end date time.");
				   return;
				 }*/
			
				 /*var allCountryCode= document.getElementById('allCountryCode').value;
					var valArr = allCountryCode.split(",");
						if((countryCode.length)==(valArr.length)){
							countryCode="all";
						}*/
					 dataString='countryCode='+countryCode+"&date1="+$.trim(date1)+"&date2="+$.trim(date2)+"&userLogonId="+selectUserSearchId+"&csrfPreventionSalt="+strutsToken;
			//alert("dataString==="+dataString)
		
		if (confirm('Are you sure you would like to add the selected countries to your allowed list of countries ?')) {
			$.ajax({
				type: "POST",
				url: "admin_createUserCountryPolicy.action",
				dataType: "text",
				data: dataString,
				async: false,
				success: function(response){
					//alert(response);
					$('#countrycode').multiselect('refresh');
  				 	$('#countrycode').multiselect('rebuild');
					
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}
					if($.trim(response)=="exist"){
						
						alert("Country Policy Already Exist");
						return;
					}
					res=response;

				}
			});
		}
		}catch(e){alert(e);}
		return res;
			
}

function updateUserCountryPolicy(userCountryMappingId,userLogonId,country,from_date,to_date){
			
	if(from_date==""||from_date==undefined||from_date==null){
		 alert("Please select the Start Date & Time");
		 return false;
	 }
	if(to_date==""||to_date==undefined||to_date==null){
		 alert("Please select the End Date & Time");
		 return false;
	 }
	
	if(new Date(from_date) >= new Date(to_date)){
		 alert("End Date & Time cannot be lesser than Start Date & Time. Please review and try again.");
		 return false;
	 }
	if (new Date(to_date) <= new Date(onUpdateGetCurrentDate())){
		alert("End Date & Time cannot be in the past.");
		 return false;
	}
		
	var strutsToken=$('[name=csrfPreventionSalt]').val();
	
	var assignUrl = "admin_updateUserCountryPolicy.action";
	var dataString = "";
	dataString ='userIds='+$.trim(userCountryMappingId)+'&userLogonId='+encodeURIComponent(userLogonId)+'&countryCode='+$.trim(country)+'&date1='+from_date+'&date2='+to_date+'&csrfPreventionSalt='+strutsToken;
		
	 $.ajax({
   	 	type:"POST",
   		url: assignUrl,
			dataType: "text",
			data: dataString,
			success: function(response){
				if($.trim(response)=="sessionout"){
					testVal= document.getElementById('loginPage').value				
					window.location.replace(testVal);
				}				
				if($.trim(response)=="exist"){
					alert("Country Policy Already Exist");
					return;
				} else {
					alert(response);
				}
				},
			complete : function(response){
				$('#sample_1_addNew').attr("disabled",false);
				$('#sample_editable_1_multi_delete').attr("disabled",false);
				submitUserDetails();
			}
    });
	
	
}


function delete_row(deleteId)
{
	var res;
	//pid=   document.getElementById("pId").value;
	pid = deleteId;
	//alert("pid==="+pid)
	var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	try{
		$.confirm({
	        text: "Warning! Are you sure that you wish to Delete Country Policy? Please note that If you Delete Country Policy then users will not able to login for that Country. Please be absolutely sure before proceeding. Do you want to continue?",
	        confirm: function(button) {
		$.ajax({
			type: "POST",
			url: "admin_deleteUserCountryPolicy.action?pid="+$.trim(pid)+"&userLogonId="+encodeURIComponent(globalUserLogonId)+"&csrfPreventionSalt="+strutsToken,
			dataType: "text",
			success: function(response){
			//alert(response);
			if($.trim(response)=="sessionout"){
				alert("Session Timeout...");
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
				}
				else if($.trim(response)=="success"){
					alert(response);			
					submitUserDetails();
				}
				else{
					alert(response);
				}
				res=response;
			}
		});
	        },
	        cancel: function(button) {
	            return;
	        }
	    });
		}catch(e){alert(e);}
		//alert(res)
		return res;
}





function compareDateTime(checkDate1,checkDate2,checkTime1,checkTime2)
{
	 
 try{
	if(parseInt(checkDate1) <= parseInt(checkDate2)){
			if(parseInt(checkTime1) < parseInt(checkTime2)){
				 return true;	
			}
			else{
				return false;
			}
	}
	else return false;
	}
	catch(e){
		alert(e)
	}
}


function getUpdateTime(datetimeString) { 
	  var d = new Date(datetimeString); 
    var min = (d.getMinutes()).toString();
    if(min == 'NaN')
    	{    d = new Date(datetimeString.replace(/-/g, '/')); 
           min = (d.getMinutes()).toString();
      }
     if (min.length == 1) 
  	min = min+'0';
   return d.getHours() + ':' + min; 
}
