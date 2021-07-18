//var urlId="admin/block_active_associate_deassociate.jsp";
var userLogonId="";
var firstName="";
var lastName="";
var mobile="";
var mail="";
function removeADFilter(){
	$('#userLogonId').val("");
	$('#firstname').val("");
	$('#lastname').val("");
	$('#mobile').val("");
	$('#mail').val("");
 }

var importAllUserFlag=false;
	var count;
	var record=0;
	var searchADUserWithpageSize=false;

function getPageData_adUser(){

	var size=document.getElementById('pageId_adUser').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_adUser').text();
	var pageNumber=document.getElementById('pageNum_adUser').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_adUser').val(1);}
	record++;
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
	  showUser(true,false);
	else
		alert('Page should be less than or equal to page number.');
	}
}


function fetchSize_adUser() {
	try {
		var size = document.getElementById('pageId_adUser').value;
		if ($.trim(size) != '') {
			var maxSize = count;

			var maxPgaeNumber = maxSize / size;
			var rem = maxSize % size;
			if (rem > 0) {
				maxPgaeNumber = maxPgaeNumber + 1;
			}
			if(count==0){
				$('#pageNum_adUser').val(0);
			} else{
				$('#pageNum_adUser').val(1);
				$('#pageNum_adUser').attr("disabled",false);
			} 				
			$('#pageN_adUser').html(parseInt(maxPgaeNumber));
			
		} 
			
	} catch (e) {
		//alert(e)
	}
}

	function showOU()
	{
		
	//	var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;	
		//var baseDnFormat=/^(cn=[A-Za-z0-9_]*)\,(dc=[A-Za-z0-9_]*)\,(dc=[A-Za-z0-9_]*)$/;
	var isSuccess=true;;
		try{
		
			var src=document.getElementById('importSource').value;
			 var sslid=document.getElementById('ssl_id').checked;
			// alert("sslid = "+sslid);
			 if(sslid == true || sslid == 'true')
				 sslid = '1';
			 else if(sslid == false || sslid == 'false')
				 sslid = '0';
			if(src=="select"){
				alert("Please select import source");
				return false;
			}
			var domain=document.getElementById('domain').value;
			if(domain==""){
				alert("Please enter domain/IP value");
				return false;
			}
			var parts=[];
			  var parts = domain.split(":");
			  var ip=parts[0];

			  var port=parts[1];
			  
			 // alert("ip===="+ip);
			 // alert("port===="+port);
//			  if(!ip.match(ipformat))  
//			  {  
//				  alert("You have entered an invalid IP address!");  
//				  return;
//			  }  
//			  else 
			if(port==""|| port==undefined)
			  {
				 // alert("Please enter Port number!");
				  if(src == '0' && sslid == '0')
				     port = '389';
				  else if(src == '0' && sslid == '1')
						     port = '636';
				  else if(src == '1' && sslid == '0')
					     port = '3268';
				  else if(src == '1' && sslid == '1')
						 port = '3269';
				 //return;
			  }
			  else if(isNaN(port))
			  {
				  alert("You have entered an invalid Port number!");
				  return;
			  }
			  else if(src == '1' && port == '389')
				  {
				  alert("please use this port 3268 instead of 389 port. ");
				  document.getElementById('domain').value = ip+":3268";
				  return;
				  }
			  else if(src == '1' && port == '636')
			  {
			  alert("please use this port 3269 instead of 636 port.");
			  document.getElementById('domain').value = ip+":3269";
			  return;
			  }
			  domain = ip+":"+port;
			  document.getElementById('domain').value = domain;
			/*var principle="";
			if(src=="1")
				{*/
		    var principle=document.getElementById('principle').value;
			//alert("principle===="+principle);
			if(principle==""){
				alert("Please enter principle value");
				return false;
			}
				//}
			var basedn=document.getElementById('basedn').value;
			//alert("basedn==="+basedn);
			if(basedn==""){
				alert("Please enter Base DN value");
				return false;
			}
			/*if(!basedn.match(baseDnFormat))
			{
				alert("BaseDn is not in proper format");
				return false;
			}*/
			var password=document.getElementById('password').value;
			if(password==""){
				alert("Please enter Password");
				return false;
			} 

			// alert("sslid ======== "+sslid);
			var dataString = "domain="+domain+"&baseDn="+basedn+"&password="+encodeURIComponent(password)+"&principle="+principle+"&importSource="+src+"&ssl="+sslid;
			// alert("dataString = "+dataString);
			 
	//	$('#org_unit').html('<span>Loading...</span>');
		
		  $.ajax
	({
	type: "POST",
		data: dataString,
		dataType: "text",
			async: true,
	 
			url: "admin_showOu.action",
		success: function(data) {
			
			var object = JSON.parse(data);
			
			var obj2=JSON.parse(object.ouList);
			
				if(obj2==null){
					alert("Invalid credentials or Server is busy, try again later.");
					isSuccess=false;
					return false;
					
				}
			   var obj3=object.filterList;
			     if(obj3 != null )
				 var preFilter = obj3.split("|");
				var content ='';
				content +='<div id="org_unit_div">';
				content +='<label  ><input type="checkbox"  class="group-checkable" data-set="#org_unit_div .checkboxes"/>Select All</label>';
				content +='<div style="margin-left:20px">';
				jQuery.each(obj2, function(i, v) {
						content +='<label class="checkbox">';
							if(obj3 != null && preFilter.indexOf(obj2[i]) > -1)	
						   content +='<span><input name="chkOu" class="checkboxes" type="checkbox" value="'+obj2[i]+'" checked></span>'+obj2[i];
							else
						   content +='<span><input name="chkOu" class="checkboxes" type="checkbox" value="'+obj2[i]+'" ></span>'+obj2[i];
						content +='</label>';
				});
					content +='</div>';
				content +='</div>';

				content +='<div class="form-actions">';
					content +='<button type="button" onclick="showUser()"  data-set="#block_active_directory"  class="btn btn-primary">Submit</button>';
				content +='</div>';
			
				$('#org_unit_data').html(content);
			}
      });
		
		
		}catch (e) {
			//alert(e);
			// TODO: handle exception
		}
		return isSuccess;
	}
	
	var globalAdUSerPreviouspageSize="";
	var globalAdUserPreviousPageNum="";	
	

	
	function showUser(pageCall,isSearch){
		try{
			if($("#pageId_adUser").length)
			  {
				globalAdUSerPreviouspageSize=$("#pageId_adUser").val();
				globalAdUserPreviousPageNum=$("#pageNum_adUser").val();
			 }
		var src=document.getElementById('importSource').value;
		//alert("src===="+src)
		var domain=document.getElementById('domain').value;			
		
		var principle=document.getElementById('principle').value;
			
		var basedn=document.getElementById('basedn').value;	
			
		var password=document.getElementById('password').value;	
		
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
		
		 var sslid=document.getElementById('ssl_id').checked;
		 if(sslid == true || sslid == 'true')
			 sslid = '1';
		 else if(sslid == false || sslid == 'false')
			 sslid = '0';
		
		 
		 /*validation*/
		// var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; 
		  
		 
		 var domain=document.getElementById('domain').value;
			if(domain==""){
				alert("Please enter domain/IP value");
				return false;
			}
			var parts=[];
			  var parts = domain.split(":");
			  var ip=parts[0];

			  var port=parts[1];
			  
			 // alert("ip===="+ip);
			 // alert("port===="+port);
//			  if(!ip.match(ipformat))  
//			  {  
//				  alert("You have entered an invalid IP address!");  
//				  return;
//			  }  
//			  else 
			if(port==""|| port==undefined)
			  {
				 alert("Please enter Port number!");
				 /* if(src == '0' && sslid == '0')
				     port = '389';
				  else if(src == '0' && sslid == '1')
						     port = '636';
				  else if(src == '1' && sslid == '0')
					     port = '3268';
				  else if(src == '1' && sslid == '1')
						 port = '3269';*/
				 //return;
				 return false;
			  }
			  else if(isNaN(port))
			  {
				  alert("You have entered an invalid Port number!");
				  return false;
			  }
			  /*else if(src == '1' && port == '389')
				  {
				  alert("please use this port 3268 instead of 389 port. ");
				  document.getElementById('domain').value = ip+":3268";
				  return;
				  }
			  else if(src == '1' && port == '636')
			  {
			  alert("please use this port 3269 instead of 636 port.");
			  document.getElementById('domain').value = ip+":3269";
			  return;
			  }*/
			  domain = ip+":"+port;
			  document.getElementById('domain').value = domain;
			/*var principle="";
			if(src=="1")
				{*/
		   // var principle=document.getElementById('principle').value;
			//alert("principle===="+principle);
			if(principle==""){
				alert("Please enter principle value");
				return false;
			}
				//}
			//var basedn=document.getElementById('basedn').value;
			//alert("basedn==="+basedn);
			/*if(basedn==""){
				alert("Please enter Base DN value");
				return false;
			}*/
			/*if(!basedn.match(baseDnFormat))
			{
				alert("BaseDn is not in proper format");
				return false;
			}*/
			///var password=document.getElementById('password').value;
			if(password==""){
				alert("Please enter Password");
				return false;
			} 
		 
		 
		 
		 
		 
		 
		/*var record="";
		var index;
		if(document.getElementById('recordSize')!=null){
			 index = document.getElementById("recordSize").selectedIndex;
			//alert("index== "+index)
			record=document.getElementById('recordSize').value;
		}
		*/
		
	//alert("src===="+src)
		 var id="",filter="",attributes="";
		 var isChecked=false;
		// if(src==0){
			  id=document.getElementById('ou').value;
			  filter=document.getElementById('filter').value;
			  attributes=document.getElementById('attributes').value;
			// alert("id===="+id)
			 //alert("filter==="+filter)
			 //alert("attributes==="+attributes)
		// }
		
	/*	 else{
			 alert("shyam")
		 var chks=document.getElementsByName('chkOu');  
		//var id="";
		if(chks.length!=null){

			for(var i=0;i<chks.length;i++)
			{
				if(chks[i].checked)  {  
				if(src==1)
					id +=  chks[i].value + "|";
				else
					id +=  chks[i].value + ",";
					isChecked=true;

				}
			}
		}
		
		id=id.substring(0,id.length-1);
	
			if(id==""){
				alert("Please select Ou.");
				return;
			}
		 }*/
		$('#org_unit').hide();
	
		$('#active_directory_data_tab').hide();
		
		$('#import_user_tab').show();
		
		open_tab('import_user_tab');
		
		/*commented on 13-May-2016 var domain=document.getElementById('domain').value;			
		
		var principle=document.getElementById('principle').value;
			
		var basedn=document.getElementById('basedn').value;	
			
		var password=document.getElementById('password').value;	*/	
			
		/*var record="";
		var index;
		if(document.getElementById('recordSize')!=null){
			 index = document.getElementById("recordSize").selectedIndex;
			//alert("index== "+index)
			record=document.getElementById('recordSize').value;
		}*/
		
		
	
		/*commented on 13-May-2016 var chks=document.getElementsByName('chkOu');  
		
		var isChecked=false;
		var id="";
		if(chks.length!=null){

			for(var i=0;i<chks.length;i++)
			{
				if(chks[i].checked)  {  
				
					id +=  chks[i].value + ",";
					isChecked=true;

				}
			}
		}
		
		id=id.substring(0,id.length-1);
	
		if(id==""){
			alert("Please select Ou.");
			return;
		}
		$('#org_unit').hide();
	
		$('#active_directory_data_tab').hide();
		
		$('#import_user_tab').show();
		
		open_tab('import_user_tab');*/
		
		//alert("sslid = "+sslid);
		document.getElementById('selectedOu').value=id;
		//if(src==0)
		//15-02-2017	dataString='domain='+domain+'&baseDn='+basedn+'&password='+password+'&principle='+principle+'&oulists='+id+'&pageId='+record+'&importSource='+src+'&ssl='+sslid+'&searchFilter='+filter+'&attributes='+attributes;
		dataString='domain='+domain+'&baseDn='+basedn+'&password='+encodeURIComponent(password)+'&principle='+principle+'&oulists='+encodeURIComponent(id)+'&pageId='+record+'&importSource='+src+'&ssl='+sslid+'&searchFilter='+encodeURIComponent(filter)+'&attributes='+attributes;
		//else
			//dataString='domain='+domain+'&baseDn='+basedn+'&password='+password+'&principle='+principle+'&oulists='+id+'&pageId='+record+'&importSource='+src+'&ssl='+sslid;
		
		var myUrl="admin_showUserDetailFromSelectedOU.action?csrfPreventionSalt="+strutsToken;
		record=0;
		if(pageCall){
			//alert("in true")
			var size=document.getElementById('pageId_adUser').value;
			var pageNumber=document.getElementById('pageNum_adUser').value;
			myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;
		}
		if(userLogonId!="" || firstName!="" || lastName!="" || mobile!="" || mail!=""){
			isSearch=true;
		}
		
		if(isSearch){
			
			 userLogonId=document.getElementById('userLogonId').value;
			    userLogonId=userLogonId.replace(/\s/g, "");
			 firstName=document.getElementById('firstname').value;
			    firstName=firstName.replace(/\s/g, "");
			 lastName=document.getElementById('lastname').value;
			    lastName=lastName.replace(/\s/g, "");
			 mobile=document.getElementById('mobile').value;
			     mobile=mobile.replace(/\s/g, "");
			 mail=document.getElementById('mail').value;
			    mail=mail.replace(/\s/g, "");
			//21-Feb-2017 var group=document.getElementById('group').value;
			var group='';
			dataString+="&userLogonId="+encodeURIComponent(userLogonId)+"&firstName="+encodeURIComponent(firstName)+"&lastName="+encodeURIComponent(lastName)+"&mobile="+encodeURIComponent(mobile)+"&mail="+encodeURIComponent(mail)+"&group="+group;
		}
		
		
		 if(searchADUserWithpageSize)
       	 {    if(myUrl.indexOf('fetchSize')==-1)
    	     {   if($.trim(globalAdUSerPreviouspageSize)!='')
    	    	 { if(myUrl.indexOf('?')==-1)
    	    	        myUrl+="?fetchSize="+globalAdUSerPreviouspageSize; 
    	    	     else
    	    	    	 myUrl+="&fetchSize="+globalAdUSerPreviouspageSize; 
    	    	 }
    	     }
         }
		
		
		
		
		$('#block_import_user_data').html('<span>Loading...</span>');
		showAjaxLoader();
		
		//alert("myUrl=== "+myUrl)
		$.ajax({
			type: "POST",  
			url:myUrl,
			data: dataString,
			dataType: "text",
			success: function(data) {
				
				
				
		try{
				var object = JSON.parse(data);
				//alert(12);
				hideAjaxLoader();
		}
		catch (e) {
			///alert("Please select Ou.");
			return;
			
			// TODO: handle exception
		}
				
		
				var obj1=JSON.parse(object.userList);
				var obj2=JSON.parse(object.count);
				var obj3=JSON.parse(object.flag);
				count=obj2;
				
				if($.trim(obj3) == "false"){
					alert("Invalid credentials or Server is busy, try again later.");
					$('#tab_1').trigger('click');
					return ;
					
				}
			//	alert("data=== "+data)
				
				var content = '<h4>Import User Data</h4><div class="space15"></div>';
				
				 content += '<div class="row-fluid new_filter">';
					content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_adUser" onChange="fetchSize_adUser(),getPageData_adUser();" name="deassociationReasonListName" style="width:100%;">';
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
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData_adUser()" id="pageNum_adUser"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum_adUser" style="width:20%;background-color:white;" onChange="getPageData_adUser()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_adUser"></span>';
						content += '</div>';
						content += '</div>';
						content += '</div>';
					
					
				content += '<table class="table table-striped table-bordered" id="import_user_data_tbl">';
				content += '<thead>';
					content += '<tr>';
					content += '<th  style="width:20px;"><input type="checkbox" class="group-checkable" id="idcheckboxSelectAdUser" data-set="#import_user_data_tbl .checkboxes" /></th>';
						content += '<th>User Name</th>';
						content += '<th>First Name</th>';
						content += '<th>Last Name</th>';
						//21-Feb-2017 content += '<th>Group </th>';
						content += '<th>Mobile </th>';
						content += '<th>Email</th>';
						
					content += '</tr>';
				
					content += '<tr>';
					
					
					//content += '<th><input type="button" onClick="adUserSearch()" /></th>';
					content += '<th style="padding-bottom: 20px;" width="6%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="adUserSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeADFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					content += '<th><input type="text" onkeydown="searchADUser(event)" id="userLogonId" /></th>';
					content += '<th><input type="text" onkeydown="searchADUser(event)" id="firstname" /></th>';	
					content += '<th><input type="text" onkeydown="searchADUser(event)" id="lastname" /></th>';	
					//21-Feb-2017 content += '<th><input type="text" onkeydown="searchADUser(event)" id="group" /></th>';			
					content += '<th><input type="text" onkeydown="searchADUser(event)" id="mobile" /></th>';
					content += '<th><input type="text" onkeydown="searchADUser(event)" id="mail" /></th>';
					
					
				
					content += '</tr>';
				content += '</thead>';
				
				try{
				if(obj1!=null&&obj1!=''){
					jQuery.each(obj1, function(i, v) {
						
						/*as per bug #133 on 01-Nov-2015*/
						if(v.email.indexOf(",")!=-1)
						{
						v.email=v.email.split(",")[0];
						}
					
				var t=v.userLoginId+","+v.firstName+","+v.lastName+","+v.mobile+","+v.email;
				  //21-Feb-2017 content += "<tr><td><input type='checkbox' name='chkAdUser' class='checkboxes' value='"+t+"' /></td><td>"+v.userLoginId+"</td><td>"+v.firstName+"</td><td>"+v.lastName+"</td><td>"+v.ou +"</td><td>"+v.mobile +"</td><td>"+v.email +"</td></tr>";
				  content += "<tr><td><input type='checkbox' name='chkAdUser' class='checkboxes' value='"+t+"' /></td><td>"+v.userLoginId+"</td><td>"+v.firstName+"</td><td>"+v.lastName+"</td><td>"+v.mobile +"</td><td>"+v.email +"</td></tr>";
				});
			}
				else {
					 //21-Feb-2017 content += "<tr><td style='text-align: center;' colspan='7' > No Record Found!</td></tr>";
					content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";
				}
				}
				catch(e)
				{
					alert(e);
				}
				content += "</table><div class='form-actions form-actions2'>";
			
				/*content += '<label>Select Record Size</label>';
				content += '<select id="recordSize" onchange="showUser()" name="record">';
				content += '<option value="">-select size-</option>';*/
				/*try{
				var obj2=JSON.parse(object.userSizeList);
				jQuery.each(obj2, function(i, v) {
				var temp=obj2[i];
				
				content += '<option value="'+temp+'" >'+temp+'</option>';
			});
				}
				catch(e){
					//alert(e);
				}*/
				//content += '</select>';
				
				
					//content +='<button type="button"  id="imp_user_back_btn" class="btn">Back</button>';
				//if(src==1)
					//content +='<button type="button" id="imp_user_back_btn"  class="btn btn-primary">Back</button>';
				
					content +='<button type="button" onClick="importAdUser()" id="idSubmitButtonAdUser"  class="btn btn-primary">Submit</button>';
				content +='</div>';
				//alert("content======== "+content)
				try{
				$('#block_import_user_data').html(content);
				$("#import_user_data_tbl").css("width","100%");
				}
				catch (e) {
					//alert(e);
					// TODO: handle exception
				}
				//oTable = $('#import_user_data_tbl').dataTable();
				 /* .columnFilter({ sPlaceHolder: "head:after",
					aoColumns: [ null, 
								{ type: "text" },
								nul,
								{ type: "text" },
								{ type: "text" },
								{ type: "text" },
								{ type: "text" }
								]
				}); */
				
									
				$('#userLogonId').val(userLogonId);
				$('#firstname').val(firstName);
				$('#lastname').val(lastName);
				$('#mobile').val(mobile);
				$('#mail').val(mail);
				
				 if($.trim(globalAdUSerPreviouspageSize) != '')
				  {
				        $("#pageId_adUser").val(globalAdUSerPreviouspageSize);
				          fetchSize_adUser();
				          if(!searchADUserWithpageSize)
				        	  $("#pageNum_adUser").val(globalAdUserPreviousPageNum);
				          else {
				        	  if(globalAdUserPreviousPageNum==0 && parseInt($('#pageN_adUser').text()) > 0)
				        		  globalAdUserPreviousPageNum="1";
				        	  $("#pageNum_adUser").val(globalAdUserPreviousPageNum);
				          }
				   }
				  
				  
				  if(pageCall==false){
					  var size = 10;
					  if(globalAdUSerPreviouspageSize!=""){
							size = globalAdUSerPreviouspageSize;
						}
						var maxPgaeNumber = count / size;
						var rem = count % size;
						if (rem > 0) {
							maxPgaeNumber = maxPgaeNumber + 1;
						}
						$('#pageN_adUser').html(parseInt(maxPgaeNumber));
						if(count == 0)
							$('#pageNum_adUser').val(0);
						else 
							$('#pageNum_adUser').val(1);
					}
				  
					  if(userLogonId=="" && firstName=="" || lastName=="" || mobile=="" || mail==""){
						  searchADUserWithpageSize=false;
					  }
			}
		
		});
   
		}
		catch (e) {
			alert(e);
			// TODO: handle exception
		}
		
	}
	
function importAdUser(){
		var src=document.getElementById('importSource').value;
		var chks=document.getElementsByName('chkAdUser');  
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
		var domain=document.getElementById('domain').value;				
		var principle=document.getElementById('principle').value;
		var basedn=document.getElementById('basedn').value;		
		var password=document.getElementById('password').value;		
		var ou=document.getElementById('selectedOu').value;
		//var authValue = $('.ass_deass_radio:checked').val();
		 var sslid=document.getElementById('ssl_id').checked;
		 var filter=document.getElementById('filter').value;
		  var attributes=document.getElementById('attributes').value;
		 if(sslid == true || sslid == 'true')
			 sslid = '1';
		 else if(sslid == false || sslid == 'false')
			 sslid = '0';
		var isChecked=false;
		var id="";
		if(chks.length!=null){

			for(var i=0;i<chks.length;i++)
			{
				if(chks[i].checked)  {  
				//alert("chks[i].value===="+chks[i].value)
					id +=  chks[i].value + ",";
					isChecked=true;

				}
			}
		}

		if(!importAllUserFlag){
		if(id==""){
			alert("Please select user.");
			return;
		}
	//	document.getElementById('domain').value='';
    //	document.getElementById('principle').value='';
    //	document.getElementById('basedn').value='';
    //	document.getElementById('password').value='';
	//	open_active_directory();
		//var status=document.getElementById('lStatusId').value;  
		id=id.substring(0,id.length-1);
         }
		//alert("id=== "+id)
		//if(src==0)
	// 15-02-2017	dataString='userIds='+id+'&domain='+domain+'&baseDn='+basedn+'&password='+password+'&principle='+principle+'&oulists='+ou+"&importSource="+src+'&ssl='+sslid+'&searchFilter='+filter+'&attributes='+attributes;
		 
		if(importAllUserFlag)
		dataString='userIds='+id+'&domain='+domain+'&baseDn='+basedn+'&password='+encodeURIComponent(password)+'&principle='+principle+'&oulists='+encodeURIComponent(ou)+"&importSource="+src+'&ssl='+sslid+'&searchFilter='+encodeURIComponent(filter)+'&attributes='+attributes+'&operation=ImportAll'+'&csrfPreventionSalt='+strutsToken;
		else
		dataString='userIds='+id+'&domain='+domain+'&baseDn='+basedn+'&password='+encodeURIComponent(password)+'&principle='+principle+'&oulists='+encodeURIComponent(ou)+"&importSource="+src+'&ssl='+sslid+'&searchFilter='+encodeURIComponent(filter)+'&attributes='+attributes+'&csrfPreventionSalt='+strutsToken;	
		
		
		 
		//else
		//dataString='userIds='+id+'&domain='+domain+'&baseDn='+basedn+'&password='+password+'&principle='+principle+'&oulists='+ou+"&importSource="+src+'&ssl='+sslid;
	
		try{
		showAjaxLoader();	
		$.ajax({
			type: "POST",
			url: "admin_insertSelectedUsersFromADInDB.action",
			data: dataString,
			dataType: "text",
			success: function(response){
				if ($.trim(response) == "sessionout") {
					alert(data);
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				}
				alert(response);
				//preFillImportDataSource("AD");
				if(importAllUserFlag)
				{
					importAllUserFlag = false;
				//location.reload();
				}
				//importAllUserFlag = false;
				$(".checkboxes").prop("checked", false);
				$(".group-checkable").prop("checked", false);
				
				
				if($.trim(response) == "success"){
					searchADUserWithpageSize = true;
					preFillImportDataSource("AD");
					
				}
				 
				hideAjaxLoader();
			},
			complete: function(){
				record++;
				
				open_org_unit();
			}
		});
		}catch(e){alert(e);}
	}
	
	function  adUserSearch() {
		record++;
		searchADUserWithpageSize=true
		showUser(false,true);
	}
	
	
	 function searchADUser(e)
	 {
	 	 if (e.keyCode === 13)   
	 		adUserSearch();
	 }

	 
	 function importAllUserFromADLDAP()
	 {
		 
		 try{
		
		 importAllUserFlag = true;
		 importAllADUsers();
		 				
		 }catch(e){alert(e);}
		 
	 }
	 

function importAllADUsers(){
	var src=document.getElementById('importSource').value;
	var chks=document.getElementsByName('chkAdUser');  
	var strutsToken=$('[name=csrfPreventionSalt]').val();
	var domain=document.getElementById('domain').value;				
	var principle=document.getElementById('principle').value;
	var basedn=document.getElementById('basedn').value;		
	var password=document.getElementById('password').value;		
	var ou=document.getElementById('selectedOu').value;
	var sslid=document.getElementById('ssl_id').checked;
	var filter=document.getElementById('filter').value;
	var attributes=document.getElementById('attributes').value;
	 if(sslid == true || sslid == 'true')
		 sslid = '1';
	 else if(sslid == false || sslid == 'false')
		 sslid = '0';
	var isChecked=false;
	var id="";
	if(chks.length!=null){

		for(var i=0;i<chks.length;i++)
		{
			if(chks[i].checked)  {  
				id +=  chks[i].value + ",";
				isChecked=true;

			}
		}
	}

	if (!importAllUserFlag) {
		if (id == "") {
			alert("Please select user.");
			return;
		}

		id = id.substring(0, id.length - 1);
	}

	 
	if(importAllUserFlag)
		dataString='userIds='+id+'&domain='+domain+'&baseDn='+basedn+'&password='+encodeURIComponent(password)+'&principle='+principle+'&oulists='+encodeURIComponent(ou)+"&importSource="+src+'&ssl='+sslid+'&searchFilter='+encodeURIComponent(filter)+'&attributes='+attributes+'&operation=ImportAll'+'&csrfPreventionSalt='+strutsToken;
	
	try{
	showAjaxLoader();	
	$.ajax({
		type: "POST",
		url: "admin_insertSelectedUsersFromADInDB.action",
		data: dataString,
		dataType: "text",
		success: function(response){
			if ($.trim(response) == "sessionout") {
				alert(data);
				testVal = document.getElementById('loginPage').value
				window.location.replace(testVal);
			}
			alert(response);
			if (importAllUserFlag) {
				importAllUserFlag = false;
			}
			$(".checkboxes").prop("checked", false);
			$(".group-checkable").prop("checked", false);
			hideAjaxLoader();
			showAdDirectoryTab();
		}
	});
	}catch(e){alert(e);}
}

function showAdDirectoryTab() {
	document.getElementById('domain').value = '';
	document.getElementById('principle').value = '';
	document.getElementById('basedn').value = '';
	document.getElementById('password').value = '';
	try {
		preFillImportDataSource("AD")
	} catch (err) {
	}
	$('#block_active_cvs').hide();
	$('#block_active_database').hide();
	$('#block_active_directory').show();
	$('#active_directory_data_tab').show();
	open_tab('collapse_1');
	$('#import_user_tab').hide();
	$('#org_unit').hide();
}