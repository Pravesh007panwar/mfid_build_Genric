function removeFilter(){
	$('#userLogonId').val("");
	$('#firstName').val("");
	$('#lastName').val("");
	$('#email').val("");
	$('#mobile').val("");
}

var count;
var searchWithpageSize = false;
var searchCount;

function fetchCountrySize() {
	
	try {
		var size = document.getElementById('pageId').value;
		if ($.trim(size) != '') {
			var maxSize = count;

			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(count==0){
				$('#pageNum').val(0);
			} else{
				$('#pageNum').val(1);
				$('#pageNum').attr("disabled",false);
			} 				
			$('#pageN').html(parseInt(maxPgaeNumber));
		
		}
			
	} catch (e) {
		 alert(e)
	}
}

function getPageData() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var pageNumber = document.getElementById('pageNum').value;
	var totalPages =  $('#pageN').text();
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showCountryPolicyData(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}

var role;
var globalPreviouspageSize = "";
var globalPreviousPageNum = "";
var userLogonId="";
var firstName="";
var lastName="";
var email="";
var mobile="";
function showCountryPolicyData(pageCall, pageSearch) {
	var obj1 = "";
	try {

		if ($("#pageId").length) {
			globalPreviouspageSize = $("#pageId").val();
			globalPreviousPageNum = $("#pageNum").val();
		}
		var myUrl = "policy_showUserCountryPolicies.action";
		var dataString="";

		if (pageCall) {
			var pageNumber = document.getElementById("pageNum").value;
			var fetchSize = document.getElementById("pageId").value;
			myUrl += "?fetchSize=" + fetchSize + "&pageNumber=" + pageNumber;

		}
		if(userLogonId!="" || firstName!="" || lastName!="" || email!="" || mobile!=""){
			pageSearch=true;
		}
		if (pageSearch) {
			userLogonId = $('#userLogonId').val();
				userLogonId = userLogonId.replace(/\s/g, "");
			firstName = $('#firstName').val();
				firstName = firstName.replace(/\s/g, "");
			lastName = $('#lastName').val();
				lastName = lastName.replace(/\s/g, "");
			email = $('#email').val();
				email = email.replace(/\s/g, "");
			mobile = $('#mobile').val();
				mobile = mobile.replace(/\s/g, "");
							
			dataString += "&userLogonId="+userLogonId + "&firstName="
				+ firstName + "&lastName=" + lastName + "&mobile="
				+ mobile + "&mail=" + email;
		}
	
		if (searchWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalPreviouspageSize) != '')
					if (myUrl.indexOf('?') == -1)
						myUrl += "?fetchSize=" + globalPreviouspageSize + "&pageNumber=" +globalPreviousPageNum;
					else
						myUrl += "&fetchSize=" + globalPreviouspageSize + "&pageNumber=" +globalPreviousPageNum; 

			}
		}
		
		$('#block_assign_country_policy').html("<center>Loading...</center>");
		  $.ajax({
					type : "POST",
					url : myUrl,
					data : dataString,
					//async : true,
					dataType : "text",
					success : function(data) {
						if ($.trim(data) == "sessionout") {
							alert(data);
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						var obj = JSON.parse(data);
						obj1 = JSON.parse(obj.userList);
						var obj2 = JSON.parse(obj.count);
						if(searchWithpageSize){
							count = obj2;
							searchCount=obj2; 
						} else {
							searchCount=obj2; 
							count = obj2;
						}
					var content = '<div class="space15"></div>';
						content += '<div class="row-fluid">';
						content += '<div  class="span6">';
						content += '<div class="pull-left" id="switch_app" style="margin-left:-10px;">';
						content += '<label>Size</label>';
						content += '<select id="pageId" onChange="fetchCountrySize(),getPageData();" name="fetchSizePageId" style="width:100%;">';
						content += '<option value="">Select Size</option>';
						content += '<option value="10">10</option>';
						content += '<option value="20">20</option>';
						content += '<option value="50">50</option>';
						content += '<option value="100">100</option>';
						content += '<option value="200">200</option>';
						content += '<option value="500">500</option>';
						content += '<option value="1000">1000</option>';
						content += '<option value="2000">2000</option>';
						content += '<option value="5000">5000</option>';
						//content += '<option value="10000">10000</option>';
						content += '</select>';
						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData()" id="pageNum"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
						content += '<table class="table table-striped table-bordered" id="sample_AssignCountryTable">';
						content += '<thead>';
						content += '<tr style="background:#fff;">';
						content += '<th><input type="checkbox" class="group-checkable" data-set="#sample_AssignCountryTable .checkboxes" /></td> ';
						content += '<th style="width:25% !important;">User Logon Id</td>';
						content += '<th style="width:15%;">First Name</td>';
						content += '<th style="width:15%;">Last Name</td>';
						content += '<th style="width:25% !important;;">Email</td>';
						content += '<th style="width:16%;">Mobile</td>';
						content += '<th style="width:4%;">No of Country(s)</td>';
						content += '</tr>';
						content += '<tr>';
						content += '<td style="padding-bottom: 15px;" style="width:6%;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="assignCountrySearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></td>';
						content += '<td><input type="text" onkeydown="searchAssignCountry(event)"  id="userLogonId" /></td>';
						content += '<td><input type="text" onkeydown="searchAssignCountry(event)"  id="firstName" /></td>';
						content += '<td><input type="text" onkeydown="searchAssignCountry(event)"  id="lastName" /></td>';
						content += '<td><input type="text" onkeydown="searchAssignCountry(event)"  id="email" /></td>';
						content += '<td><input type="text" onkeydown="searchAssignCountry(event)"  id="mobile"/></td>';
						content += '<td></td>';

						content += '</tr>';
						content += '</thead>';
						var t = 1;
						if (obj1 != null && obj1 != '') {
							jQuery.each(
									obj1,
									function(i, v) {
																		
										content += "<tr>";
										content += "<td><input type='checkbox' name='user_name' class='checkboxes' value='" + v.userId + "," + v.userLoginId + "'/></td>";
										content += "<td>" + v.userLoginId + "</td>";
										content += "<td>" + v.firstName + "</td>";
										content += "<td>" + v.lastName  + "</td>";
										content += "<td>" +v.email+ "</td>";
										content += "<td>" +v.mobile+ " </td>";
										if(v.countryCount==0 || v.countryCount==undefined){
											content += "<td style='text-align:center;'>"+v.countryCount+"</td>";
										} else {
											content += "<td style='text-align:center;'><a href='javascript:void(0);' data='"+v.userId+","+v.userLoginId+"' class='countryClick' >"+v.countryCount+"</a></td>";
										}
							    		content += "</tr>";

							});
						} else {
							content += "<tr>";
							content += "<td colspan='7' style='text-align:center'>No Record Found</td>";
							content += "</tr>";
						}

						content += "</table>";

						content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="pull-right">';
						//if (role != 4) {
							content += '<div class="btn-group">';
							content += '<button class="btn green" style="margin-right:10px;" onClick="saveAssignCountryPolicy();">Save</button>';
							content += '</div>';
						//}
						content += '</div>';

						$('#block_assign_country_policy').html(content);
						//$('#_assign_country_policy').html(content);
						$("#sample_AssignCountryTable").css("width", "100%");

						$('#userLogonId').val(userLogonId);
						$('#firstName').val(firstName);
						$('#lastName').val(lastName);
						$('#email').val(email);
						$('#mobile').val(mobile);
						
						
						if ($.trim(globalPreviouspageSize) != '') {
							$("#pageId").val(globalPreviouspageSize);
								fetchCountrySize();
							if (!searchWithpageSize)
								$("#pageNum").val(globalPreviousPageNum);
							else{
								if(globalPreviousPageNum==0 && parseInt($('#pageN').text())>0)
									globalPreviousPageNum="1";
								$("#pageNum").val(globalPreviousPageNum);
							}
						}
											
						if(pageCall==false){
							var size=10;
							if(globalPreviouspageSize!=''){
								size=globalPreviouspageSize;
								count = searchCount;
							}
							if(userLogonId!="" || firstName!="" || lastName!="" || email!="" || mobile!=""){
								count = searchCount;
							}
							if(count==0){
								count = searchCount;
							}
							var maxPgaeNumber = count / size;
							var rem = count % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN').html(parseInt(maxPgaeNumber));
							if(count == 0){
								$('#pageNum').val(0);
							} else {
								$('#pageNum').val(1);
							} 
							if(globalPreviousPageNum!="" && globalPreviousPageNum!=0 && parseInt($('#pageN').text()) > 0) {
								$('#pageNum').val(globalPreviousPageNum);
							} 
						}
						
						if(userLogonId=="" && firstName=="" && lastName=="" && email=="" && mobile==""){
							searchWithpageSize = false;
						}
				
					}

				});

	} catch (e) {
		alert(e);
	}

}

function getCurrentDate()
{

    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var minutes = d.getMinutes();
    var hours=d.getHours();
    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+ ' '+((''+hours).length<2 ? '0' : '') +hours+':00';
    return output;
}

function getAddDaysToCurrentDate()
{
    var d = new Date();
    d.setDate(d.getDate() + 7);
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+' 23:59';
    return output;
    
}


function onUpdateGetCurrentDate(){
	 var d = new Date();
	    var month = d.getMonth()+1;
	    var day = d.getDate();
	    var minutes = d.getMinutes();
	    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+ ' '+d.getHours() +':'+((''+minutes).length<2 ? '0' : '')+minutes;
	    return output;
}


function saveAssignCountryPolicy(){
    	
    try {
  
    	var from_date = $('#from_date').val();
    	var to_date = $('#to_date').val();
    	var countryCode=$("#countrycode").val();
    	if(countryCode==""||countryCode==undefined||countryCode==null){
    		 alert("Please select country");
    		 $("html, body").animate({ scrollTop: 0}, "fast");
    		 return false;
    	 }
    	if(from_date==""||from_date==undefined||from_date==null){
    		 alert("Please select the Start Date & Time");
    		 return false;
    	 }
    	if(to_date==""||to_date==undefined||to_date==null){
    		 alert("Please select the End Date & Time");
    		 return false;
    	 }
    	
    	if(new Date(from_date) >= new Date(to_date)){
    		 alert("End Date & Time cannot be lesser than Start Date & Time. Please review and try again");
    		 return false;
    	 }
    	if (new Date(from_date) < new Date(getPreviousDate(1))){
    		alert("Start date & time should be only 1 day less from current date & time.");
    		 return false;
    	}
    	if(countryCode.length > maximumCountriesAllowed){
			alert("You can only have a maximum of "+maximumCountriesAllowed+" allowed countries at any given time. Please check your list of allowed countries and try again.");
			 return false;
		}
    	
    	
    	var checked = jQuery("input[name='user_name']").is(":checked");
    	if(checked==""||checked==false||checked==undefined){
    		alert("Please Select User");
    		$("html, body").animate({ scrollTop: 0}, "fast");
    		return false;
    	}
    	var strutsToken=$('[name=csrfPreventionSalt]').val();
    	var countries = [];
         $.each($("#countrycode option:selected"), function(){            
             countries.push($(this).val());
         });
         
         var users = [];
         var user_names = [];
		 $.each($("input[name='user_name']:checked"), function() {
			var data = $(this).val();
			data = data.split(',');
			users.push(data[0]);
			user_names.push(data[1]);
			// users.push($(this).val());
		});
        // alert(user_names);
         $('#saveBtn').prop('disabled', true);
     	var assignUrl = "policy_saveAssignCountryPolicy.action";
        var dataString = "";
        	dataString ='userIds='+$.trim(users)+'&userLogonId='+encodeURIComponent(user_names)+'&countryNames='+$.trim(countries)+'&date1='+from_date+'&date2='+to_date+'&csrfPreventionSalt='+strutsToken;
    	
    	if (confirm('Are you sure you would like to add the selected countries to your allowed list of countries ?')) {
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
  					$('#assignPolicyAddForm').trigger("reset");
  					alert(response);
  				},
  			complete : function(response){
  				 $('#saveBtn').prop('disabled', false);
  				 	$('#pageId').val("");
  				 	$('#pageNum').val("");
  				 	$('#countrycode').multiselect('refresh');
  				 	$('#countrycode').multiselect('rebuild');
  				 	$("#from_date").val(getCurrentDate());
  					$("#to_date").val(getAddDaysToCurrentDate());
  					$("#_second_widget").css("display", "none");
  					showCountryPolicyData(false, false);
  			}
       });
     }
   } catch(e) {
    	alert(e);
   }
}

function updateAssignCountryPolicy(data,userLogonId,from_date,to_date){
	
	data = data.split(',');
		
  	if(from_date==""||from_date==undefined||from_date==null){
		 alert("Please select the Start Date & Time");
		 return false;
	 }
	if(to_date==""||to_date==undefined||to_date==null){
		 alert("Please select the End Date & Time");
		 return false;
	 }
	
	if(new Date(from_date) >= new Date(to_date)){
		 alert("End Date & Time cannot be lesser than Start Date & Time. Please review and try again");
		 return false;
	 }
	if (new Date(to_date) <= new Date(onUpdateGetCurrentDate())){
		alert("End Date & Time cannot be in the past.");
		 return false;
	}
		
	var strutsToken=$('[name=csrfPreventionSalt]').val();
	var assignUrl = "policy_updateAssignCountryPolicy.action";
	var dataString = "";
	dataString ='pid='+$.trim(data[0])+'&userLogonId='+encodeURIComponent(userLogonId)+'&countryNames='+$.trim(data[1])+'&date1='+from_date+'&date2='+to_date+'&csrfPreventionSalt='+strutsToken;
		
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
					$('#assignPolicyAddForm').trigger("reset");
					alert(response);
					
				},
			complete : function(response){
					$('#deAssignBtn').attr("disabled",false);
					$("html, body").animate({ scrollTop: $(document).height()}, "slow");
					$("#from_date").val(getCurrentDate());
					$("#to_date").val(getAddDaysToCurrentDate());
				  	 showAllowedCountries(globalUserId,userLogonId);
			}
    });
}


function assignCountrySearch() {
	searchWithpageSize = true;
	showCountryPolicyData(false,true);
}


function searchAssignCountry(e) {
	if (e.keyCode === 13)
		assignCountrySearch();
}
var globalUserLogonId="";
function showAllowedCountries(userId,userLogondId){
	
	globalUserId = userId;
	globalUserLogonId = encodeURIComponent(userLogondId);
	
	try {
	     var myUrl = "policy_getAllowedUserCountryPolicy.action";
		 var dataString = "userId="+encodeURIComponent(userId);
		 $.ajax({
				type:"POST",
				url:myUrl,
				async:true,
				data: dataString,
				dataType:"text",
				success:function(data){
				 if($.trim(data)=="sessionout") {
						alert(data);
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
				  } else {
					  
					  var object = JSON.parse(data);
					  var obj1=JSON.parse(object.userCountryPolicyList);
					  var content = ' <table class="table table-striped table-bordered" id="sample_1">';
					  content += '<thead>';
						content += '<tr>';
						content += '<th><input type="checkbox" class="group-checkable"  data-set="#sample_1 .checkboxes"  style="width:auto;" /></th>';
						content += '<th>User LogonId</th>';
						content += '<th>Allowed Country(s)</th>';
						content += '<th>From Timestamp</th>';
						content += '<th>To Timestamp</th>';
						content += '<th>Action</th>';
						content += '</tr>';
						content += '</thead>';
						if(obj1!=null && obj1!='')	{
							jQuery.each(obj1, function(i, v) {
								
								content += "<tr>";
								content += "<td><input type='checkbox' id='activeCountry' name='activeCountry' class='checkboxes' value='"+v.userId+","+v.countryName+","+v.date1+","+v.date2+"' style='width:auto;' /></td>";
								content += "<td style='width:25%'>"+userLogondId+"</td>";
								content += "<td style='width:18%'>"+v.countryName+"</td>";
								content += "<td>"+v.date1+"</td>";
								content += "<td>"+v.date2+"</td>";
								content += "<td><a class='_country_edit' href='javascript:;'>Edit</a></td>";
								content += "</tr>";
							});
						}
						 else   {
							 	content +='<tr><td valign="top" colspan="4" class="dataTables_empty"><center>No Record Found!</center> </td></tr>';
						  }
				    content += "</table>";
				    var contents = '<div class="row-fluid"><div class="span6"><div><label>Search: <input type="text" id="filter_country" onkeyup="searchFilterCountry()" placeholder="Search Country Names...." ></label></div></div></div>';
					  content += '<div class="form-actions form-actions2"><div class="pull-right"><div class="btn-group"><button type="button" id="deAssignBtn" class="btn green" style="margin-right:10px;">Delete <i class="icon-remove"></i></button></div></div></div>';
					  content = contents+content;
					$('#_assign_country_policy').html(content);
					$("#sample_1").css("width","100%");
					oTable_assign_policy = $('#sample_1').dataTable({
						"bPaginate" : false,
						"bFilter" : false,
						"bSort" : false
					});
				  }
				}
		  });
		 
	} catch(e){
		alert(e);
	}
}


function deAssignUserCountryMapping(ids, countryNames, startTime, endTime) {

	var res;
	var pid = ids;
	var strutsToken = $('[name=csrfPreventionSalt]').val();
	var dataString="pid="+$.trim(pid)+"&userLogonId="+$.trim(globalUserLogonId)+ "&countryNames="+ countryNames+ "&date1="+startTime+"&date2="+endTime
		+"&csrfPreventionSalt="+ strutsToken;
	try {
		$.confirm({
					text : "Warning! Are you sure that you wish to Delete Country Policy? Please note that If you Delete Country Policy then users will not able to login for that Country. Please be absolutely sure before proceeding. Do you want to continue?",
					confirm : function(button) {
							$.ajax({
									type : "POST",
									url : "policy_deleteUserCountryPolicy.action",
									dataType : "text",
									data: dataString,
									success : function(response) {
										if ($.trim(response) == "sessionout") {
											alert("sessionout");
											testVal = document
													.getElementById('loginPage').value
											window.location.replace(testVal);
										} else if ($.trim(response) == "success") {
											alert(response);
											$("#_second_widget").css("display",
													"none");
											$('#pageId').val("");
						  				 	$('#pageNum').val("");
											showCountryPolicyData(false, false);
										}
										else
											alert(response);
										res = response;
									}
								});
					},
					cancel : function(button) {
						return;
					}
				});
	} catch (e) {
		alert(e);
	}

	return res;
}


function searchFilterCountry() {
	var input, filter, table, tr, td, i;
	input = document.getElementById("filter_country");
	filter = input.value.toUpperCase();
	table = document.getElementById("sample_1");
	tr = table.getElementsByTagName("tr");
	try {
		$("#sub_sample_table1").remove();
	} catch (err) {
	}
	var check = 1;
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[2];
		if (td) {
			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
				check++;
			}

		}
	}
	if (check >= tr.length)
		$("#sample_1")
				.append('<td valign="top" colspan="6" id="sub_sample_table1"  class="dataTables_empty"><center>No Record Found!</center> </td>');
}