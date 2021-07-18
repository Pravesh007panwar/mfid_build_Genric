var countDashBoardUser;
var searchdashBoardUserWithpageSize=false;
var globalShowPopupWindow = true;
var globalArrayUserSummaryColumn = '';
var globalReportType='';
var genUserDetailReportFilter = '';

function getPageData(){
	 
	var size=document.getElementById('pageId').value;
	var pageNumber=document.getElementById('pageNum').value;
	//alert("size== "+size)
	//alert("pageNumber== "+pageNumber)
	if($.trim(pageNumber) != "")
	showDashBoardUsersDetails(true,false,role);
}


function fetchSize(){
	try{   
	var size=document.getElementById('pageId').value;
	 if($.trim(size)!='')
	  {	
	//alert("size== "+size)
	var maxSize=countDashBoardUser;
	
	var maxPgaeNumber=maxSize/size;
	var rem=maxSize%size;
	if(rem>=0){
		maxPgaeNumber=maxPgaeNumber+1;
	}
	
	document.getElementById('pageNum').options.length = 1;
	 var page = document.getElementById('pageNum');
	var pageOpt = page.options;
	
	for(var i=1;i<maxPgaeNumber;i++)
	{
	
		pageOpt[pageOpt.length] = new Option(i,i);
	}
	}else document.getElementById('pageNum').options.length = 1;
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
	 
		 role=roleId;
		//$.datepicker.regional[""].dateFormat = 'dd/mm/yy';
		//$.datepicker.setDefaults($.datepicker.regional['']);
	//	alert("pageCall==== "+pageCall)
		var myUrl="login_showSecureDashBoardUsersDetails.action";
	 
		
		
	 
		
    // start code for Bug #122 , added by Abhimanyu
          if(searchdashBoardUserWithpageSize)
           	 {    
        	     if(myUrl.indexOf('fetchSize')==-1)
        	     { if($.trim(globalPreviouspageSize)!='')
           	       myUrl+="&fetchSize="+globalPreviouspageSize; 
        	     }
           	 }
   // start code for Bug #122 , added by Abhimanyu
		
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
					//alert("Session TimeOut...");
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
				var content = '<div class="space15"></div>';
				    
				    content += '<table class="table table-striped table-bordered" id="sample_editable_1">';
					content += '<thead>';
						content += '<tr>';
							content += '<th style="width:5%;">S.No</th> ';
							content += '<th style="width:8%;">User LogonId</th>'; 
							content += '<th style="width:8%;">Authentication type</th>'; 
							content += '<th style="width:12%;">Token serial/License Key</th>'; 
							content += '<th style="width:10%;">Token Expiry</th>';
							content += '<th style="width:5%;">User Status</th>';
							//content += '<th style="width:8%;">Last OTP used time</th>';
						content += '</tr>';
					
			 
							
							 
						//	content += '<th><input type="text"  onkeydown="searchUserDetail(event)"  id="lastOTPUsed" /></th>';
							//content += '<th></th>';
						content += '</tr>';
					content += '</thead>';
					try{
						if(obj1!=null&&obj1!='')
							{
							   var listcounter=1;
						      jQuery.each(obj1, function(i, v) {
							 content += "<tr><td>"+listcounter+"</td><td>"+secureOriginalUserName+"</td><td>"+v.authenticationType +"</td><td>"+v.tokenSerial_licenseKey+"</td><td>"+v.TokenExpiry +"</td><td>"+v.userStatus +"</td></tr>";
							listcounter++;
					      });
							}
					 
					}
					catch(e){
						alert(e);
					}
					content += "</table>";
					content += '<div class="clearfix"></div>';
				//	content += '<div class="form-actions form-actions2">';
				//	content += '<div class="pull-left">';
				//	content += '</div>';
					content += '</div>';
				$('#dashboard_users_details_data').html(content);
				//$("#sample_editable_1").css("width","100%");
			//	oTable_m_u =$('#sample_editable_1').dataTable({"bPaginate": false,"bFilter": false,"bSort":false});
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
			  // start code for Bug #122 , added by Abhimanyu
				
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
		 				//alert("Session Timeout...");
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
 