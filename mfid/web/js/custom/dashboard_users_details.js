var countDashBoardUser;
var searchdashBoardUserWithpageSize=false;
var globalShowPopupWindow = true;
var globalArrayUserSummaryColumn = '';
var globalReportType='';
var genUserDetailReportFilter = '';

function getPageData(){
	 
	var size=document.getElementById('pageId').value;
	var totalPages =  $('#pageN').text();
	var pageNumber=document.getElementById('pageNum').value;
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showDashBoardUsersDetails(true,false,role);
	else 
		alert('Page should be less than or equal to page number.');
}


function fetchSize(){
	try{   
	var size=document.getElementById('pageId').value;
	 if($.trim(size)!='')
	  {	
	
	var maxSize=countDashBoardUser;
	
	var maxPgaeNumber=maxSize/size;
	var rem=maxSize%size;
	if(rem> 0){
		maxPgaeNumber=maxPgaeNumber+1;
	}
	if(countDashBoardUser==0){
		$('#pageNum').val(0);
	} else{
		$('#pageNum').val(1);
		$('#pageNum').attr("disabled",false);
	} 				
	$('#pageN').html(parseInt(maxPgaeNumber));
	
	}else 
		$('#pageNum').val(1);
	}
	catch (e) {
		//alert(e)
		// TODO: handle exception
	}
}

var role;
var globalPreviouspageSize="";
var globalPreviousPageNum="";
 function showDashBoardUsersDetails(pageCall,isSearch,roleId)
	{     
	
   try{
	  if($("#pageId").length)
		  {
		  globalPreviouspageSize=$("#pageId").val();
		  globalPreviousPageNum=$("#pageNum").val();
		 }
	  var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
		 role=roleId;
		//$.datepicker.regional[""].dateFormat = 'dd/mm/yy';
		//$.datepicker.setDefaults($.datepicker.regional['']);
	//	alert("pageCall==== "+pageCall)
		var myUrl="login_showDashBoardUsersDetails.action?csrfPreventionSalt="+strutsToken;
		if(pageCall==true){
			//alert("in true")
			var size=document.getElementById('pageId').value;
			var pageNumber=document.getElementById('pageNum').value;
			myUrl="login_showDashBoardUsersDetails.action?fetchSize="+size+"&pageNumber="+pageNumber+"&csrfPreventionSalt="+strutsToken;
		}
		
		
		if(isSearch){
			var userLoginId=document.getElementById('userLoginId').value;
			var authenticationType=document.getElementById('authenticationType').value;
			var tokenSerial_licenseKey=document.getElementById('tokenSerial_licenseKey').value;
			var TokenExpiry=document.getElementById('TokenExpiry').value;
			var userStatus=document.getElementById('userStatus').value;
			var lastOTPUsed='';
		 //	alert("Token:  "+token);
			myUrl+="&userLoginId="+userLoginId+"&authenticationType="+authenticationType+"&tokenSerial_licenseKey="+tokenSerial_licenseKey+"&TokenExpiry="+TokenExpiry+"&userStatus="+userStatus+"&lastOTPUsed="+lastOTPUsed;
			
		}
		
    // start code for Bug #122 , added by Abhimanyu
          if(searchdashBoardUserWithpageSize)
           	 {    
        	     if(myUrl.indexOf('fetchSize')==-1)
        	     { if($.trim(globalPreviouspageSize)!='')
           	       myUrl+="&fetchSize="+globalPreviouspageSize; 
        	     }
           	 }
   // start code for Bug #122 , added by Abhimanyu
		
          try{ $("#loading_common").css("display","block");
        	     $('body').css("opacity","0.8");   }  catch(err){}
          
		// alert("myUrl== "+myUrl);
          genUserDetailReportFilter = "&"+myUrl.split("?")[1];
	//	$('#user_manage_data').html('<span>Loading...</span>');
		$.ajax({
			type: "POST",  
			url:myUrl,
			//url:"192.168.1.157:8081/mfid_REST/mfid/dash/1/10",
			
			
			async: true,
			dataType: "text",
			success: function(data) { 
			//	alert(data)
				if($.trim(data)=="sessionout")
					{
					alert("sessionout");
					var testVal=document.getElementById('loginPage').value;
					window.location.replace(testVal);
					}
				var object = JSON.parse(data);
				var obj1=JSON.parse(object.dashboardUserList);
				var obj2=JSON.parse(object.dashboardUserCount);
				//alert("obj2=== "+obj2)
	  // start code for Bug #122 , added by Abhimanyu
			     if(searchdashBoardUserWithpageSize)
			    	  obj2=countDashBoardUser;
	 // start code for Bug #122 , added by Abhimanyu
				countDashBoardUser=obj2;
				var content = '<h4>Users Details</h4><div class="space15"></div>';
				    content += '<div class="row-fluid new_filter">';
				    content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId" onChange="fetchSize(),getPageData();" name="deassociationReasonListName"  style="width:100%;">';
					content += '<option value="">Select Size</option>';
					content += '<option value="10">10</option>';
					content += '<option value="20">20</option>';
					content += '<option value="50">50</option>';
					content += '<option value="100">100</option>';
					content += '<option value="200">200</option>';
					content += '<option value="500">500</option>';
					// start code for bug id no #320 , added by abhimanyu
					content += '<option value="1000">1000</option>';
					content += '<option value="2000">2000</option>';
					content += '<option value="5000">5000</option>';
					// end code for bug id no #320 , added by abhimanyu
					content += '</select>';
		            content += '</div>';
					content += '</div>';
					content += '<div class="span6">';
					content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;"  >';
					content += '<label>Page Number</label>';
					/*content += '<select onChange="getPageData()" id="pageNum"  >';
		            content += '<option value="">-select Page-</option>';
				    content += '</select>';*/
					content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>';
					content += '</div>';
				    content += '</div>';
				    content += '</div>';
				    content += '<table class="table table-striped table-bordered" id="sample_editable_1">';
					content += '<thead>';
						content += '<tr>';
							content += '<th style="width:2%;">S.No</th> ';
							content += '<th style="width:10%;">User LogonId</th>'; 
							content += '<th style="width:8%;">Authentication type</th>'; 
							content += '<th style="width:8%;">Token serial/License Key</th>'; 
							content += '<th style="width:12%;">Token Expiry</th>';
							content += '<th style="width:6%;">User Status</th>';
							//content += '<th style="width:8%;">Last OTP used time</th>';
						content += '</tr>';
					
						content += '<tr>';
							content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="dashBoardUserSearch()" ><i style="font-size:20px;" class="icon-search"></i></a></th>';
							content += '<th><input type="text"  onkeydown="searchUserDetail(event)" id="userLoginId" /></th>';
							content += '<th><input type="text"  onkeydown="searchUserDetail(event)" id="authenticationType" /></th>';
							content += '<th><input type="text"  onkeydown="searchUserDetail(event)" id="tokenSerial_licenseKey" /></th>';
							content += '<th><input type="text"  onkeydown="searchUserDetail(event)" id="TokenExpiry" /></th>';
							
							content += '<th><select id="userStatus"  >';
							content += '<option value="">select user status</option>';
							content += '<option value="Locked">Locked</option>';
							content += '<option value="Unlocked">Un Locked</option>';
							content += '</select></th>';
							
							 
						//	content += '<th><input type="text"  onkeydown="searchUserDetail(event)"  id="lastOTPUsed" /></th>';
							//content += '<th></th>';
						content += '</tr>';
					content += '</thead>';
					try{
						if(obj1!=null&&obj1!='')
							{
							   var listcounter=1;
						      jQuery.each(obj1, function(i, v) {
							 content += "<tr><td>"+listcounter+"</td><td>"+v.userLoginId+"</td><td>"+v.authenticationType +"</td><td>"+v.tokenSerial_licenseKey+"</td><td>"+v.TokenExpiry +"</td><td>"+v.userStatus +"</td></tr>";
							listcounter++;
					      });
							}
					 
					}
					catch(e){
						alert(e);
					}
					content += "</table>";
					content += '<div class="clearfix"></div>';
					content += '<div class="form-actions form-actions2">';
					content += '<div class="pull-left">';
					content += '</div>';
					content += '</div>';
				$('#dashboard_users_details_data').html(content);
				$("#sample_editable_1").css("width","100%");
				oTable_m_u =$('#sample_editable_1').dataTable({"bPaginate": false,"bFilter": false,"bSort":false});
				/*oTable_m_u =$('#sample_editable_1').dataTable({
						//"iDisplayLength": 5,
						"aaSorting": [[1,'asc']]})
						.columnFilter({ sPlaceHolder: "head:after",
							aoColumns: [ null, 
								{ type: "text" },
								{ type: "text" },
								{ type: "text" },
								{ type: "text" },
								{ type: "text" },
								{ type: "text"},
								{ type: "select", values: [ 'Mobile Token','Push Token','No Token']  },
								{ type: "select", values: [ 'Yes','No']  },
								//{ type: "date-range"},
								{ type: "text"}
								]
						});*/
				 // start code for Bug #122 , added by Abhimanyu
				 if($.trim(globalPreviouspageSize) != '')
				  {
				        $("#pageId").val(globalPreviouspageSize);
				       fetchSize();
				       if(!searchdashBoardUserWithpageSize)
				        $("#pageNum").val(globalPreviousPageNum);
				   }
				 searchdashBoardUserWithpageSize=false;
				 
				 if(pageCall==false){
						var maxPgaeNumber = countDashBoardUser / 10;
						var rem = countDashBoardUser % 10;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						$('#pageN').html(parseInt(maxPgaeNumber));
						if(countDashBoardUser == 0)
							$('#pageNum').val(0);
						else 
							$('#pageNum').val(1);
					}
				 
				 
			  // start code for Bug #122 , added by Abhimanyu
				 try{ $("#loading_common").css("display","none");
				 $('body').css("opacity","1");  }  catch(err){}
				
			}
		});
		
	
		
	/*	$("#loading").bind("ajaxStart", function(){
		    $(this).show();
		}).bind("ajaxStop", function(){
		    $(this).hide();
		}); */
		


	 }
	 catch(e)
	 {
		//alert(e);
	 }
		
	}
 
 
 function addUser(userLogonId,firstName,lastName,mail,mobile)
 {
	//alert("add user function");
	/* alert("userLogonId"+userLogonId);
	 alert("firstName"+firstName);
	
	 alert("lastName"+lastName);
	 alert("mail"+mail);
	 alert("mobile"+mobile);*/
	 var namePattern = /^[A-Za-z]{2,25}$/;
	 var iChars = "!`#$%^&*()+=[]\\\';,/{}|\":<>?~";   
               /* for (var i = 0; i < userLogonId.length; i++)
                {      
                	if (iChars.indexOf(userLogonId.charAt(i)) != -1)
                    {    
                    alert ("Your string has special characters. \nThese are not allowed.");
                    return;
                    } 
                }*/
	 	if(userLogonId=="")
	 		{
	 			alert("Please enter UserLogonId");
	 			 return ;
	 		}
	 	else if(userLogonId.length==1)
		{
			alert("UserLogonId shoud have at leat 2 characters");
			 return;
		}
	 	else if(userLogonId.length>60)
		{
			alert("UserLogonId length should not be more than 60 character");
			 return;
			}
	 	/*else if(!isNaN(userLogonId))
			{
				alert("UserLogonId should not be numeric");
				 return;
			}
		else if(userLogonId.charAt(0).match(/[0-9]/))
        {
        	alert("UserLogonId should not be start from numeric character");
        	return;
        }*/
	 	else if(firstName=="")
 		{
 			alert("Please enter first name");
 			 return;
 		}
	 	else if(!namePattern.test(firstName))
		{
	 		alert("Enter valid first name");
	 		 return;
		}
		
	 	else if(lastName=="")
 		{
 			alert("Please enter last name");
 			 return;
 		}
	 	else if(!namePattern.test(lastName))
		{
	 		alert("Enter valid last name");
	 		 return;
		}
	 	else if(mail=="")
 		{
 			alert("Please enter mail id");
 			 return;
 		}
	 	/*else if(mobile=="")
 		{
 			alert("Please enter mobile number");
 			 return;
 		}*/
	 	else if(isNaN(mobile)|| mobile.indexOf(" ")!=-1)
		{
          			alert("Mobile number should be numeric");
				 return;
		}
	 	else{
	 		
		 var dataString='userLogonId='+userLogonId+'&firstName='+firstName+'&lastName='+lastName+'&mail='+mail+'&mobile='+mobile;
		 $.ajax({
		 		type: "POST",
		 		url: "admin_addUser.action",
		 		data: dataString,
		 		 dataType: "text",
		 		success: function(response){
		 			//alert("response");
		 			//alert(response);
		 			//resVal=response;
		 			if($.trim(response)=="sessionout")
	 				{
	 				alert("Session Timeout...");
	 				var testVal=document.getElementById("loginPage").value;
	 				window.location.replace(testVal);
	 				}
		 			
		 			else if($.trim(response) == "success"){
		 				alert("success");
		 				showDashBoardUsersDetails(false,false,role);
		 			}
		 			else 
		 				alert(response);
		 				//showDashBoardUsersDetails(false,false);
		 			
		 		}
		 	});
		 return response;
	 	}
 }
 
 
 
 function updateUser(userLogonId,firstName,lastName,mail,mobile)
	{
	// alert("update user");
	 var namePattern = /^[A-Za-z]{2,25}$/;
	 if(firstName=="")
		{
			alert("Please enter first name");
			 return;
		}
	 	else if(!namePattern.test(firstName))
		{
	 		alert("Enter valid first name");
	 		 return;
		}
		
	 	else if(lastName=="")
		{
			alert("Please enter last name");
			 return;
		}
	 	else if(!namePattern.test(lastName))
		{
	 		alert("Enter valid last name");
	 		 return;
		}
	 	else if(mail=="")
		{
			alert("Please enter mail id");
			 return;
		}
	 	/*else if(mobile=="")
		{
			alert("Please enter mobile number");
			 return;
		}*/
	 	else if(isNaN(mobile)|| mobile.indexOf(" ")!=-1)
		{
       			alert("Mobile number should be numeric");
				 return;
		}
	 	else{
		var dataString='userLogonIdToBeModify='+userLogonId+'&firstName='+firstName+'&lastName='+lastName+'&mail='+mail+'&mobile='+mobile;
		 $.ajax({
		 		type: "POST",
		 		url: "admin_updateUser.action",
		 		data: dataString,
		 		 dataType: "text",
		 		success: function(response){
		 		//	alert(response);
		 			//resVal=response;
		 			if($.trim(response)=="sessionout")
		 				{
		 				alert("Session Timeout...");
		 				var testVal=document.getElementById("loginPage").value;
		 				window.location.replace(testVal);
		 				}
		 			else if($.trim(response) == "success"){
		 				alert("success");
		 				showDashBoardUsersDetails(false,false,role);
		 			}
		 			else 
		 				alert(response);
		 		}
		 	});
		 return response;
	 
	 	}
	
	}
 
	function deleteUser(userLogonIds)
	{
		//alert("deleteDomain=====");
		var dataString='userIds='+userLogonIds;
		$.ajax({
				type: "POST",
				url: "admin_deleteUser.action",
				data: dataString,
				 dataType: "text",
				success: function(response){
					//alert(response);
					if($.trim(response)=="sessionout")
	 				{
	 				alert("Session Timeout...");
	 				var testVal=document.getElementById("loginPage").value;
	 				window.location.replace(testVal);
	 				}
					else if($.trim(response) == "success"){
						
						alert("success");
						showDashBoardUsersDetails(false,false,role);
					}
					else
					{
						alert(response);
					}
				},
			error:function (xhr, ajaxOptions, thrownError){
		    alert(xhr.status);
		    alert(xhr.statusText);
		    alert(thrownError);
		 }
			});
	//	return response;
			
	}
 
 function  dashBoardUserSearch() {
	 searchdashBoardUserWithpageSize=true;
	 showDashBoardUsersDetails(false,true,role);
	 
}
 
 
 
 function callPdfReport()
	{	
		globalReportType = "pdf";
		//alert("callPdfReport");
	if(globalShowPopupWindow)
		  $('#myModal1').modal('show')  
		else{
		 $('#myModal1').modal('hide')	
		var reportType="pdf";
		var url="reportgen_userDetailReport.action?reportType="+reportType+"&fileName=userDetail_report.pdf&reportColumns="+globalArrayUserSummaryColumn+genUserDetailReportFilter;
	//	alert(url);
		$('#reportForm').attr("action",url);
		$('#reportForm').submit();
		globalShowPopupWindow=true;
		 resetAllCheckbox();
		}
		
		

	
	}
	
	function callXmlReport()
	{
		
		globalReportType = "xml";
		//alert("callXmlReport");
		if(globalShowPopupWindow)
			  $('#myModal1').modal('show')  
			else{
			 $('#myModal1').modal('hide')
		//alert("callXmlReport");
		var reportType="xml";
		var url="reportgen_userDetailReport.action?reportType="+reportType+"&fileName=userDetail_report.xml&reportColumns="+globalArrayUserSummaryColumn+genUserDetailReportFilter;
	//	alert(url);
		$('#reportForm').attr("action",url);
		$('#reportForm').submit();
		globalShowPopupWindow=true;
		 resetAllCheckbox();
		}
	}
	
	function callExcelReport()
	{
		 globalReportType = "excel";
			//alert("callExcelReport");
			if(globalShowPopupWindow)
			  $('#myModal1').modal('show')  
			else{
			 $('#myModal1').modal('hide')
		var reportType="excel";
		var url="reportgen_userDetailReport.action?reportType="+reportType+"&fileName=userDetail_report.xlsx&reportColumns="+globalArrayUserSummaryColumn+genUserDetailReportFilter;
	//	alert(url);
	    $('#reportForm').attr("action",url);
		$('#reportForm').submit();
		globalShowPopupWindow=true;
		 resetAllCheckbox();
		}
	}
	
	function callCsvReport()
	{
		  globalReportType = "csv";
			//alert("callCsvReport");
		    if(globalShowPopupWindow)
			  $('#myModal1').modal('show')  
			else{
				//alert("csv");
			 $('#myModal1').modal('hide')
		var reportType="csv";
		var url="reportgen_userDetailReport.action?reportType="+reportType+"&fileName=userDetail_report.csv&reportColumns="+globalArrayUserSummaryColumn+genUserDetailReportFilter;
	//	alert(url);
        $('#reportForm').attr("action",url);
		$('#reportForm').submit();
		globalShowPopupWindow=true;
		 resetAllCheckbox();
		}
	}
	
 
 
 
 
	
 function exportUserDetailReport()
	{
	 //alert("exportNeverUseAuthenticationReport");	
	var arrayUserSummaryColumn = $.map($('input[name="userdetailsreportcolumn"]:checked'), function(c){return c.value; })
	if(arrayUserSummaryColumn == "" || $.trim(arrayUserSummaryColumn) == "")
		{
		alert("please select at least one column for Export. ");
		}
	else
		{
		globalArrayUserSummaryColumn = arrayUserSummaryColumn; 
		globalShowPopupWindow=false;
		
		if(globalReportType ==  "pdf")
			 callPdfReport();
		else if(globalReportType ==  "xml")
			callXmlReport();
		else if(globalReportType ==  "excel")
			 callExcelReport();
		else if(globalReportType ==  "csv")
			 callCsvReport();
		
		 
		}
		
	}
 
 
function searchUserDetail(e)
{
	 if (e.keyCode === 13)   
	  dashBoardUserSearch()	
}
 