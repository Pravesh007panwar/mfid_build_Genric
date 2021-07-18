var globalUserLogonId= '';
var globalAppName= '';
var globalSelectUserSearchId = '';
 


function showSecureUserCountryPolicy(selectUserSearchId)
{globalSelectUserSearchId = selectUserSearchId;
 

       
				 
				 try
				   {
					 var myUrl="secureLogin_getUserCountryPolicy.action";

					   var dataString = "userLogonId="+encodeURIComponent(selectUserSearchId);
					   
					   $('#block_policy_data').html("Loading...");
							$.ajax({
								type:"POST",
								url:myUrl,
								async:true,
								data: dataString,
								dataType:"text",
								success:function(data)
								{
									if($.trim(data)=="sessionout"){
										
										testVal= document.getElementById('loginPage').value				
										window.location.replace(testVal);
									}
									var object = JSON.parse(data);
								
									var obj1=JSON.parse(object.userCountryPolicyList);
									content += '<h4>User Country Policy </h4>';
									var	content = '<table class="table table-striped table-bordered" id="sample_table1">';
									content += '<thead>';
									content += '<tr>';
									content += '<th><input type="checkbox" class="group-checkable" data-set="#sample_editable_1 .checkboxes" style="width:auto;" /></th>';
									content += '<th>Allowed Country</th>';
									content += '<th>From Timestamp</th>';
									content += '<th>To Timestamp</th>';
									
									//content += '<th style="display: none;"></th>';
									content += '<th style="display: none;"></th>';
									//content += '<th style="display: none;"></th>';

									content += '</tr>';
									content += '</thead>';

									if(obj1!=null && obj1!='')
										{
									jQuery.each(obj1, function(i, v) {
										//i = (i+1);
										content += "<tr>";

										
										//content += "<td>"+v.countryNames+"</td>";
										//alert("lenth==="+(v.countryNames).split(",").length)
										
										//content += "<td><a href='javascript:void(0);' onClick='showCountryCode("+v.countryNames+")'>"+(v.countryNames).split(",").length+"</a></td>";
										
										//alert("v.countryNames==="+v.userId)
										//if(v.countryName=='all')
										content += "<td><input type='checkbox' id='activeCountry' class='checkboxes' value='"+v.userId+"' style='width:auto;' /></td>";
											content += "<td>"+v.countryName+"</td>";
										/*else
										content +="<td><a href='javascript:void(0);' onclick=showCountryCode('"+encodeURIComponent(v.countryName)+"');>"+((v.countryName).split(",").length)+"</td>";*/
										content += "<td>"+v.date1+"</td>";
										content += "<td>"+v.date2+"</td>";
										
										//content += "<td style='display:none;'>"+v.userId+"</td>";
										
										content += "<td style='display: none;' >"+v.userId+"</td>";
										content += "</tr>";
									});
										}
									else{
										content += "<tr><td style='text-align: center;' colspan='5' > No Record Found!</td></tr>";


										
									}
									content += "</table>";
									//content += '<div class="form-actions form-actions2"><button type="button" id="sample_1_addNew" class="btn green">Add New <i class="icon-plus"></i></button></div>';
									var contents = '<div class="row-fluid"><div class="span6"><div><label>Search: <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search country names.." ></label></div></div></div>';
									content += '<div class="form-actions form-actions2"><div class="pull-left"><div class="btn-group"><button id="sample_1_addNew" class="btn green">Add New <i class="icon-plus"></i></button></div><div class="btn-group"><button id="sample_editable_1_multi_delete" type="button" onclick="deleteCountryPolicyList()" class="btn green">Delete <i class="icon-remove"></i></button></div></div></div>';
									
									$('#block_policy_data').html(contents+content);
									$("#sample_1").css("width","100%");
									//oTable = $('#sample_1').dataTable({"bSort":false});
									/*oTable=jQuery('#sample_1').dataTable({
										"aaSorting": [[1,'asc']]})
										.columnFilter({ sPlaceHolder: "head:after",
												aoColumns: [ null, 
												{ type: "text" },
												{ type: "text" },
												{ type: "text" },
												{ type: "text" },
												null
												]
										});
*/
								}
							
							});
							
						}
						catch(e)
						{ }
				
		      
	
 

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
	//alert("showCountryList ")
	try{


		var listData=new Array();
		var listId=new Array();

		$.ajax
		({

			url: 'secureLogin_addCountryList',  
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


/*function showCountryList(multi,id)
{
	//alert("showCountryList ")
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
					//alert("obje===="+obj)
					var obj1=JSON.parse(obj.countryList);
					//alert("obj1===="+obj1)
					document.getElementById('allCountryCode').value=obj1;
					if(obj1!=null && obj1!='')
						{
				$.each(obj1, function(i,data)
						{


					//var messageId=data.domainId;	
					//var messageName=data.domainName;		
					//listId.push([messageId]);
					listData.push([data]);

						});
						}

				//document.getElementById(id).options.length = 0;
				var sel = document.getElementById(id);
				//	alert(listData.length);
				var option = '';
				for(var i = 0; i < listData.length; i++) {
					var opt = sel.options;
					if(multi!='true' && i == 0){
						opt[opt.length] = new Option('-select country codes-','');
					}
					opt[opt.length] = new Option(listData[i],listData[i]);
				
					//$('#domain').append('<option value="'+listId[i]+'">'+listData[i]+'</option>').multiselect('rebuild');
					//option +='<option></option>';
				}
			}


		});   

	}
	catch(e){

	}
}*/



function showCountryList(multi,id)
{
	//alert("showCountryList ")
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
			
			var selectUserSearchId=globalSelectUserSearchId;
			//alert("selectUserSearchId===="+selectUserSearchId);
			date1=document.getElementById("from_date").value;
			date2=document.getElementById("to_date").value;
			
			//alert("getCurrentDate()===="+getCurrentDate())
			if(countryCode==""||countryCode==undefined||countryCode==null){
				 alert("Please select country");
				 return;
			 }
			
				if(countryCode.length > maximumCountriesAllowed){
					alert("Maximum "+maximumCountriesAllowed+" countries is allowed");
					 return;
				}
				if(date1==""||date1==undefined||date1==null){
					 alert("Please select the Start Date & Time");
					 return;
				 }
				
				if(date2==""||date2==undefined||date2==null){
					 alert("Please select the End Date & Time");
					 return;
				 }
				
				if(new Date(date1) >= new Date(date2)){
					 alert("End Date & Time cannot be lesser than Start Date & Time. Please review and try again");
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
					 dataString='countryCode='+countryCode+"&date1="+$.trim(date1)+"&date2="+$.trim(date2)+"&token="+globalSecureToken;
			//alert("dataString==="+dataString)
		
					 
							$.confirm({
						        text: "Warning!! Are you sure want to continue ?",
						        confirm: function(button) {
						        	$.ajax({
										type: "POST",
										url: "secureLogin_createUserCountryPolicy.action",
										dataType: "text",
										data: dataString,
										//async: false,
										success: function(response){
											//alert(response);
											
											$('#countrycode').multiselect('refresh');
						  				 	$('#countrycode').multiselect('rebuild');
											
											if($.trim(response)=="sessionout"){
												
												testVal= document.getElementById('loginPage').value				
												window.location.replace(testVal);
											}
											if($.trim(response)=="exist"){
												
												alert("Policy already exist");
												return;
											}
						                   else if( $.trim(response)=="success" || $.trim(response)=="Your request is not processed , duplicate request detected." || $.trim(response)=="Invalid date format." ){
													// alert(response);			
													 location.reload(); 
													 return;
										   } else {
											   alert(response); 
											   return;
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
					 
 
		return res;
			
}

$('#saveBtn1').on('click',function(){
	//alert("in save")
	 $('#saveBtn').prop('disabled', true);
	  $('.icon-ok').prop('disabled', true);
	var res=save();
	
	if($.trim(res)=="success"){
		alert("success");
	this.form.reset();
	$('#policyFormdiv').hide(300);
	showSecureUserCountryPolicy(globalSelectUserSearchId);
	}
	 $('#saveBtn').prop('disabled', false);
	  $('.icon-ok').prop('disabled', false);
});

function delete_row(deleteId)
{
	var res;
	//pid=   document.getElementById("pId").value;
	pid = deleteId;
	//alert("pid==="+pid)
	try{
		$.confirm({
	        text: "Warning! Are you sure that you wish to Delete Country Policy? Please note that If you Delete Country Policy then you will not able to login from that Country. Please be absolutely sure before proceeding. Do you want to continue?",
	        confirm: function(button) {
		$.ajax({
			type: "POST",
			url: "secureLogin_deleteUserCountryPolicy.action?pid="+$.trim(pid)+"&token="+globalSecureToken,
			dataType: "text",
			success: function(response){
			//alert(response);
			if($.trim(response)=="sessionout"){
				alert("Session Timeout...");
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
				}
				else if($.trim(response)=="success" || $.trim(response)=="Your request is not processed , duplicate request detected." ){
					//alert(response);			
					//showSecureUserCountryPolicy(globalSelectUserSearchId);
					 location.reload();
				}
				else
					{
					alert(response);	
				//	location.reload();
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

function myFunction() {
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("myInput");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("sample_table1");
	  tr = table.getElementsByTagName("tr");
	  try{  $("#sub_sample_table1").remove(); }catch(err){} 
	  var check = 1;
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[1];
	    if (td) {
	      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	        check++;
	      }
	    
	    }       
	  }
	   if(check >= tr.length)
	  $("#sample_table1").append('<td id="sub_sample_table1" valign="top" colspan="5" class="dataTables_empty"><center>No Result Found! </center> </td>');
	 }
