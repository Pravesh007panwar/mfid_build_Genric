function removeShadowSearch(){
	$('#userLogonIdL').val("");
	$('#firstNameL').val("");
	$('#lastNameL').val("");
	$('#userLogonIdR').val("");
	$('#firstNameR').val("");
	$('#lastNameR').val("");
}

var count1;
var count2;
var searchshadowFirstWithpageSize=false;
var searchshadowSecondWithpageSize=false;


function getPageData_shadow1() {

	var size = document.getElementById('pageId_shadow1').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_shadow1').text();
	var pageNumber = document.getElementById('pageNum_shadow1').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_shadow1').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showShadowPageCall(true,false);
	else 
		alert('Page should be less than or equal to page number.');
	}
}


function fetchSize_shadow1() {
	
	var size = document.getElementById('pageId_shadow1').value;
	if ($.trim(size) != '') {

		var maxSize = count1;
		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (count1 == 0) {
			$('#pageNum_shadow1').val(0);
		} else {
			$('#pageNum_shadow1').attr("disabled", false);
			$('#pageNum_shadow1').val(1);
		}
		$('#pageN_shadow1').html(parseInt(maxPgaeNumber));
	}
}

function getPageData_shadow2() {

	var size = document.getElementById('pageId_shadow2').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN_shadow2').text();
	var pageNumber = document.getElementById('pageNum_shadow2').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum_shadow2').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		ajaxFunctionCallForApplication(true, false);
	else 
		alert('Page should be less than or equal to page number.');
	}
 }


function fetchSize_shadow2() {
	
	var size = document.getElementById('pageId_shadow2').value;
	if ($.trim(size) != '') {
		var maxSize = count2;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		if (count2 == 0) {
			$('#pageNum_shadow2').val(0);
		} else {
			$('#pageNum_shadow2').attr("disabled", false);
			$('#pageNum_shadow2').val(1);
		}
		$('#pageN_shadow2').html(parseInt(maxPgaeNumber));

	} 
}





function ajaxFunctionCallForDomain(){
//alert("in ajax functioncall");
	
	var value = $('#id2').val();
	//alert("value=   "+value);
	if(value=="select"){
		//alert("shyam")
	}
	else{
		
		document.getElementById('id1').options.length = 0;
		var listData=new Array();
		$.ajax
		({

			url: 'ApplicationMFIDAction.action?switchDomainName='+$('#id2').val(),  
			cache: false,
			dataType:"text",
			
			success: function(data)
			{	//alert(data);
				if($.trim(data)=="sessionout")
				{
				var testVal=document.getElementById('loginPage').value;
				window.location.replace(testVal);
				}
				var object=JSON.parse(data);
				var obj=JSON.parse(object.reportList);
				if(obj!=null && obj!='')
					{
				$.each(obj, function(i,data)
						{

					listData[0]="Select Application";

					listData.push([data]);

						});

					}

				var sel = document.getElementById('id1');

				for(var i = 0; i < listData.length; i++) {


					var opt = sel.options;
					opt[opt.length] = new Option(listData[i],listData[i])


				}
			}


		}); 

	}


}

function showShadowOnSubmit(pageCall,isSearchL,isSearchR)
{
	try{
		var domain=document.getElementById("id2").value;
		var app=document.getElementById("id1").value;
		var value = $('.shadow_radio:checked').val();

		var myUrl2 = "admin_showShadowOnSubmit.action?authType="+value+"&switchDomain="+domain+"&switchApp="+app;
		var dataString = "";

		if(pageCall)
		{

			var size=document.getElementById('pageId_shadow2').value;
			var pageNumber=document.getElementById('pageNum_shadow2').value;


			myUrl2+="&fetchSize2="+size+"&pageNumber2="+pageNumber;
		}
		if(isSearchL){
			var userLogonIdL=document.getElementById('userLogonIdL').value;
				userLogonIdL = userLogonIdL.replace(/\s/g, "");
			var firstNameL=document.getElementById('firstNameL').value;
				firstNameL = firstNameL.replace(/\s/g, "");
			var lastNameL=document.getElementById('lastNameL').value;
				lastNameL = lastNameL.replace(/\s/g, "");
			/*if(userLogonIdL.length!=0){
				myUrl2+="&userLogonIdL="+userLogonIdL;
			}
			if(firstNameL.length!=0){
				myUrl2+="&firstNameL="+firstNameL;
			}
			if(lastNameL.length!=0){
				myUrl2+="&lastNameL="+lastNameL;
			}*/
			//myUrl2+="&userLogonIdL="+userLogonIdL+"&firstNameL="+firstNameL+"&lastNameL="+lastNameL;
			dataString+="&userLogonIdL="+userLogonIdL+"&firstNameL="+firstNameL+"&lastNameL="+lastNameL;
		}
		if(isSearchR){
			
			var userLogonIdR=document.getElementById('userLogonIdR').value;
				userLogonIdR = userLogonIdR.replace(/\s/g, "");
			var firstNameR=document.getElementById('firstNameR').value;
				firstNameR = firstNameR.replace(/\s/g, "");
			var lastNameR=document.getElementById('lastNameR').value;	
				lastNameR = lastNameR.replace(/\s/g, "");
			/*if(userLogonIdR.length!=0){
				myUrl2+="&userLogonIdR="+userLogonIdR;
			}
			if(firstNameR.length!=0){
				myUrl2+="&firstNameR="+firstNameR;
			}
			if(lastNameR.length!=0){
				myUrl2+="&lastNameR="+lastNameR;
			}*/
			//myUrl2+="&userLogonIdR="+userLogonIdR+"&firstNameR="+firstNameR+"&lastNameR="+lastNameR;
			dataString+="&userLogonIdR="+userLogonIdR+"&firstNameR="+firstNameR+"&lastNameR="+lastNameR;
		}
		//alert("myURL:::::"+myUrl2);
	}catch (e) {
		alert(e)
		// TODO: handle exception
	}

	$.ajax({
		type: "POST",  
		url:myUrl2,
		data: dataString,
		dataType: "text",
		async: true,
		success: function(data) {

			//alert("data::::"+data);
			if($.trim(data)=="sessionout")
			{
			var testVal=document.getElementById('loginPage').value;
			window.location.replace(testVal);
			}
			var object = JSON.parse(data);

			var obj1=JSON.parse(object.unassociatedShadowUsersList);
			//alert("data-obj1::::"+obj1);

			var obj2=JSON.parse(object.associatedShadowUsersList);
			//alert("data-obj2::::"+obj2);

			var obj3=JSON.parse(object.count2); 
			//alert("data-obj3::::"+obj3);

			count2 = obj3;
			
			var obj4 = JSON.parse(object.count); 
				count = obj4;
			
			
			var it=0;
			//jQuery.each(data, function(index, value) { // Saurabh Changes
			jQuery.each(object, function(index, value) {
				var tid='';
				if(it==0){


					content = '<div id="mydiv1" class="span6">';										
					//////////////////////////////////////////////////////////////////////														
					content += '<div class="row-fluid new_filter">';
					content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_shadow1" onChange="fetchSize_shadow1(),getPageData_shadow1();" name="deassociationReasonListName" style="width:100%;">';
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
					// end code for bug id no #320 , added by abhimanyu
					content += '<option value="5000">5000</option>';
					//content += '<option value="10000">10000</option>';
					content += '</select>';
					content += '</div>';
					content += '</div>';
					content += '<div class="span6">';
					content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
					content += '<label>Page Number</label>';
					/*content += '<select onChange="getPageData_shadow1()" id="pageNum_shadow1"  >';
					content += '<option value="">-select Page-</option>';
					content += '</select>';*/
					content += ' <input type="text" id="pageNum_shadow1" style="width:20%;background-color:white;" onChange="getPageData_shadow1()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_shadow1"></span>';
					content += '</div>';
					content += '</div>';
					content += '</div>';

					/////////////////////////////////////////////////////////////////////

					content += '<table id="sample_7" class="table table-striped table-bordered">';
					content += '<thead>';
					content += '<tr>';
					content += '<th width="12%"></th>';
					content += '<th>User LogonId</th>';
					content += '<th>First Name</th>';
					content += '<th>Last Name</th>';
					content += '</tr>';

					content += '<tr>';


					content += '<th style="padding-bottom: 15px;" width="12%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="showShadowPageCallSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeShadowSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
				//	content += '<th><input type="button" onClick="showShadowPageCallSearch()" /></th>';
					content += '<th><input type="text" onkeydown="searchShadowL(event)" id="userLogonIdL" /></th>';
					content += '<th><input type="text" onkeydown="searchShadowL(event)" id="firstNameL" /></th>';
					content += '<th><input type="text" onkeydown="searchShadowL(event)" id="lastNameL" /></th>';


					content += '</tr>';
					content += '</thead>';
					content += '<tbody>';

					jQuery.each(obj1, function(i, v) {

						content += "<tr><td><input type='radio' name='unassociatedShadowUser' class='shadow_radio' value='"+v.userLogonId +"' /></td><td>"+v.userLogonId +"</td><td>"+v.firstName +"</td><td>"+v.lastName +"</td></tr>";
					});
					content += '</tbody>';
					content += '</table>';
					content += '</div>';
				}
				if(it==1){
					//tid='sample_8';
					content += '<div  id="mydiv" class="span6">';
					//////////////////////////////////////////////////////////////////
					content += '<div class="row-fluid new_filter">';
					content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_shadow2" onChange="fetchSize_shadow2(),getPageData_shadow2();" name="deassociationReasonListName" style="width:100%;">';
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
					// end code for bug id no #320 , added by abhimanyu
					content += '<option value="5000">5000</option>';
					//content += '<option value="10000">10000</option>';
					
					content += '</select>';
					content += '</div>';
					content += '</div>';
					content += '<div class="span6">';
					content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
					content += '<label>Page Number</label>';
					/*content += '<select onChange="getPageData_shadow2()" id="pageNum_shadow2"  >';
					content += '<option value="">-select Page-</option>';
					content += '</select>';*/
					content += ' <input type="text" id="pageNum_shadow2" style="width:20%;background-color:white;" onChange="getPageData_shadow2()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_shadow2"></span>';
					content += '</div>';
					content += '</div>';
					content += '</div>';

					/////////////////////////////////////////////////////////////////////


					content += '<table id="sample_8" class="table table-striped table-bordered">';
					content += '<thead>';
					content += '<tr>';
					content += '<th style="width:20px;"></th>';
					content += '<th>User LogonId</th>';
					content += '<th>First Name</th>';
					content += '<th>Last Name</th>';
					content += '</tr>';

					content += '<tr>';

					//content += '<th><input type="button" onClick="ajaxFunctionCallForApplicationSearch()" /></th>';
					content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="ajaxFunctionCallForApplicationSearch()" ><i style="font-size:20px;" class="icon-search"></i></a></th>';
					content += '<th><input type="text" onkeydown="searchShadowR(event)" id="userLogonIdR" /></th>';
					content += '<th><input type="text" onkeydown="searchShadowR(event)" id="firstNameR" /></th>';
					content += '<th><input type="text" onkeydown="searchShadowR(event)" id="lastNameR" /></th>';
					content += '</tr>';
					content += '</thead>';
					content += '<tbody>';

					if (obj2 != null && obj2 != '') {
						jQuery.each(obj2, function(i, v) {
							content += "<tr><td><input type='radio' name='associatedShadowUser' class='shadow_radio' value='"+v.userLogonId +"' /></td><td>"+v.userLogonId +"</td><td>"+v.firstName +"</td><td>"+v.lastName +"</td></tr>";
					});
					} else{
						content += "<tr><td style='text-align:center;' colspan='3'>No Record Found</td></tr>";
					}
					content += '</tbody>';
					content += '</table>';
					content += '</div>';

				}

				it++;
			});



			$('#mydiv3').html(content);



			/*$('#sample_7').dataTable()
					  .columnFilter({  sPlaceHolder: "head:after",
						aoColumns: [ null, 
									 { type: "text" },
									 { type: "text" },
									 { type: "text" }
									]
					});

					$('#sample_8').dataTable()
					  .columnFilter({  sPlaceHolder: "head:after",
						aoColumns: [ null, 
									 { type: "text" },
									 { type: "text" },
									 { type: "text" }
									]
					});*/
			
			 	if(pageCall==false){
					var maxPgaeNumber = count2 / 10;
					var rem = count2 % 10;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN_shadow2').html(parseInt(maxPgaeNumber));
					$('#pageNum_shadow2').val(1);
					
					var maxPage = count/10;
					var remPage = count % 10;
					if(remPage > 0){
						maxPage = maxPage + 1;
					}
					$('#pageN_shadow1').html(parseInt(maxPage));
					$('#pageNum_shadow1').val(1);
			 	}
			 	
		}
	});

}

var userLogonIdR="";
var firstNameR="";
var lastNameR="";

var globalshadowSecondPreviouspageSize="";
var globalshadowSecondPreviousPageNum="";
function ajaxFunctionCallForApplication(pageCall,isSearch)   /// This is for right hand side shadow
{

	 // start code for Bug #122 , Added by Abhimanyu
	   if($("#pageId_shadow2").length)
	       {
		   globalshadowSecondPreviouspageSize=$("#pageId_shadow2").val();
		   globalshadowSecondPreviousPageNum=$("#pageNum_shadow2").val();
	        }
	// end code for Bug #122  
	
	//alert("in ajaxFunctionCallForApplication  "+pageCall)

	var value = $('.shadow_radio:checked').val();
	var domain=document.getElementById("id2").value;
	var app=document.getElementById("id1").value;
	var unassociatedShadowUser=$('input:radio[name=unassociatedShadowUser]:checked').val();
	//alert("unassociatedShadowUser===="+unassociatedShadowUser)
	
	
	
	var myUrl2 = "admin_showShadowDataOnChangeApplication.action?authType="+value+"&switchDomain="+domain+"&switchApp="+app;
	var dataString = "";

	try{
		
		

		if(pageCall==true)
		{
			//alert("in if")
			var size=document.getElementById('pageId_shadow2').value;
			var pageNumber=document.getElementById('pageNum_shadow2').value;


			myUrl2+="&fetchSize2="+size+"&pageNumber2="+pageNumber;

			//myUrl2+="&userLogonIdL=user851&firstNameL=user875&lastNameL=user856";
		}
		
		if(userLogonIdR!="" || firstNameR!="" || lastNameR!=""){
			isSearch=true;
		}
		if(isSearch){
			
			 userLogonIdR=document.getElementById('userLogonIdR').value;
				userLogonIdR = userLogonIdR.replace(/\s/g, "");
			 firstNameR=document.getElementById('firstNameR').value;
				firstNameR = firstNameR.replace(/\s/g, "");
			 lastNameR=document.getElementById('lastNameR').value;
				lastNameR = lastNameR.replace(/\s/g, "");
			/*if(userLogonIdR.length!=0){
				myUrl2+="&userLogonIdR="+userLogonIdR;
			}
			if(firstNameR.length!=0){
				myUrl2+="&firstNameR="+firstNameR;
			}
			if(lastNameR.length!=0){
				myUrl2+="&lastNameR="+lastNameR;
			}*/
			//myUrl2+="&userLogonIdR="+userLogonIdR+"&firstNameR="+firstNameR+"&lastNameR="+lastNameR;
			
			dataString+="&userLogonIdR="+userLogonIdR+"&firstNameR="+firstNameR+"&lastNameR="+lastNameR;
		}
		//alert("myURL:::::"+myUrl2);
		}
	catch (e) {
		//alert(e);
		// TODO: handle exception
	}
// start code for Bug #122 , Added by Abhimanyu
    if(searchshadowSecondWithpageSize)
	      {  
   	     if(myUrl2.indexOf('fetchSize2')==-1)
   		   { 
   	    	 if($.trim(globalshadowSecondPreviouspageSize)!=''){
	   			   if(myUrl2.indexOf('?')==-1)
	   				myUrl2+="?fetchSize2="+globalshadowSecondPreviouspageSize; 
	  	            else
	  	            	myUrl2+="&fetchSize2="+globalshadowSecondPreviouspageSize; 
   		   }
   			 
   		   }
        }
// end code for Bug #122 
	

	$.ajax
	({
		type: "POST",
		data: dataString,
		async: true,
		url:myUrl2,
		dataType:"text",
		success: function(data){ 
		//	alert("data--- "+data)
			if($.trim(data)=="sessionout")
			{
			var testVal=document.getElementById('loginPage').value;
			window.location.replace(testVal);
			}
			var object = JSON.parse(data);

			var obj2=JSON.parse(object.associatedShadowUsersList);
			var obj3=JSON.parse(object.count2); 
 
	         /* if(searchshadowSecondWithpageSize)
	        	  obj3=count2;*/
  
			 count2=obj3;
			try{
				var content;
				var tid='';

				content = '<div class="row-fluid">';
				//////////////////////////////////////////////////////////////////
				content = '<div >';
				content += '<div class="span6">';
				content += '<div class="pull-left" id="switch_app">';
				content += '<label>Size</label>';
				content += '<select id="pageId_shadow2" onChange="fetchSize_shadow2(),getPageData_shadow2();" name="deassociationReasonListName" style="width:100%;">';
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
				//content += '<option value="10000">10000</option>';
				// end code for bug id no #320 , added by abhimanyu
				content += '</select>';
				content += '</div>';
				content += '</div>';
				content += '<div class="span6">';
				content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
				content += '<label>Page Number</label>';
				/*content += '<select onChange="getPageData_shadow2()" id="pageNum_shadow2"  >';
				content += '<option value="">-select Page-</option>';
				content += '</select>';*/
				content += ' <input type="text" id="pageNum_shadow2" style="width:20%;background-color:white;" onChange="getPageData_shadow2()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_shadow2"></span>   ' ;
				content += '</div>';
				content += '</div>';
				content += '</div>';

				/////////////////////////////////////////////////////////////////////
				content += '<table id="sample_8" class="table table-striped table-bordered">';
				content += '<thead>';
				content += '<tr>';
				content += '<th width="12%"></th>';
				content += '<th>User LogonId</th>';
				content += '<th>First Name</th>';
				content += '<th>Last Name</th>';
				content += '</tr>';

				content += '<tr>';
				content += '<th style="padding-bottom: 15px;" width="12%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="ajaxFunctionCallForApplicationSearch()"><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeShadowSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
			//	content += '<th><input type="button" onClick="ajaxFunctionCallForApplicationSearch()" /></th>';
				content += '<th><input type="text" onkeydown="searchShadowR(event)" id="userLogonIdR" /></th>';
				content += '<th><input type="text" onkeydown="searchShadowR(event)" id="firstNameR" /></th>';
				content += '<th><input type="text" onkeydown="searchShadowR(event)" id="lastNameR" /></th>';
				content += '</tr>';
				content += '</thead>';
				content += '<tbody>';
				if(obj2!=null&&obj2!=''&&obj2!=0)
					{
				jQuery.each(obj2, function(i, v) {

				//	alert("i::::::"+i);
					content += "<tr><td><input type='radio' name='associatedShadowUser' class='shadow_radio' value='"+v.userLogonId +"' /></td><td>"+v.userLogonId +"</td><td>"+v.firstName +"</td><td>"+v.lastName +"</td></tr>";
				});
					}
				else
					{
					content+="<tr><td style='text-align:center;' colspan='4'>No Record Found</td></tr>";
					}
			}catch(e){alert(e);}
			content += '</tbody>';
			content += '</table>';
			content += '</div>';
			$('#mydiv').html(content);
			/*$('#sample_8').dataTable()

					  .columnFilter({  sPlaceHolder: "head:after",
						aoColumns: [ null, 
									 { type: "text" },
									 { type: "text" },
									 { type: "text" }
									]
					});*/

			// start code for Bug #122 , Added by Abhimanyu
			
			
			$('#userLogonIdR').val(userLogonIdR);
			$('#firstNameR').val(firstNameR);
			$('#lastNameR').val(lastNameR);
			
			if($.trim(globalshadowSecondPreviouspageSize) != '')
		      {  $("#pageId_shadow2").val(globalshadowSecondPreviouspageSize);
		          fetchSize_shadow2();
		         if(!searchshadowSecondWithpageSize)
		        	 $("#pageNum_shadow2").val(globalshadowSecondPreviousPageNum);
		         else{
		        	 if(globalshadowSecondPreviousPageNum==0 && parseInt() > 0)
		        		 globalshadowSecondPreviousPageNum="1";
		        	 $("#pageNum_shadow2").val(globalshadowSecondPreviousPageNum);
		        		 
		         }
		        }
			  
			   
			   if(pageCall==false){
				   var size = 10;
				   if(globalshadowSecondPreviouspageSize!=''){
					   size = globalshadowSecondPreviouspageSize;
				   }
					var maxPgaeNumber = count2 / size;
					var rem = count2 % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN_shadow2').html(parseInt(maxPgaeNumber));
					if (count2 == 0) {
						$('#pageNum_shadow2').val(0);
					} else {
						$('#pageNum_shadow2').val(1);
					}
				}
		    	   if(userLogonIdR=="" && firstNameR=="" && lastNameR==""){
		    		   searchshadowSecondWithpageSize=false;
			        }
			   
		// end code for Bug #122 	
		}

	});


}



function shadowToken()
{
	//alert("assigning")
	try{

		var value = $('.shadow_radio:checked').val();
		var unassociatedShadowUser=$('input:radio[name=unassociatedShadowUser]:checked').val();
		var associatedShadowUser=$('input:radio[name=associatedShadowUser]:checked').val();
		var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats


		var domain=document.getElementById("id2").value;
		var app=document.getElementById("id1").value;
		var abc=$('input[name=unassociatedShadowUser]:checked').val();

		if(domain==""||domain=="select")
		{
			alert("Please select domain");
		}
		else if(app==""||app=="Select Application")
		{
			alert("Please select application");
		}
		else if (!$('input[name=unassociatedShadowUser]:checked').val() ) {  
			alert("Please select unassociated shadow user");
		}
		else if (!$('input[name=associatedShadowUser]:checked').val() ) {  
			alert("Please select associated shadow user");
		}

		else{
			$.ajax({
				type: "POST",
				dataType:"text",
				url: "admin_shadowToken.action?authType="+value+"&unassociatedShadowUser="+encodeURIComponent(unassociatedShadowUser)+"&associatedShadowUser="+encodeURIComponent(associatedShadowUser)+"&switchDomain="+domain+"&switchApp="+app+'&csrfPreventionSalt='+strutsToken,
				data: "{}",
				success: function(response){
					//alert(response);
					resVal=response;
					if($.trim(response)=="sessionout"){
						
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}

					
					else if($.trim(response) == "success"){
						alert("success");
						showShadowOnSubmit(false,false,false);
						showManageUser(false,false);
					}
					else
						{
						alert(response);
						}
				}
			});
		}
	}catch(e){alert(e);}
}

function showShadow(pageCall,isSearchL,isSearchR){ // this is for left side shadow
	try{
		var value = $('.shadow_radio:checked').val();

		var myUrl2 = "admin_showShadow.action?authType="+value;
		var dataString2 = "";

		if(pageCall)
		{

			var size=document.getElementById('pageId_shadow1').value;
			var pageNumber=document.getElementById('pageNum_shadow1').value;
			myUrl2+="&fetchSize="+size+"&pageNumber="+pageNumber+""
		}
		if(isSearchL){
			var userLogonIdL=document.getElementById('userLogonIdL').value;
				userLogonIdL = userLogonIdL.replace(/\s/g, "");
			var firstNameL=document.getElementById('firstNameL').value;
				firstNameL = firstNameL.replace(/\s/g, "");
			var lastNameL=document.getElementById('lastNameL').value;	
				lastNameL = lastNameL.replace(/\s/g, "");
			/*if(userLogonIdL.length!=0){
				myUrl2+="&userLogonIdL="+userLogonIdL;
			}
			if(firstNameL.length!=0){
				myUrl2+="&firstNameL="+firstNameL;
			}
			if(lastNameL.length!=0){
				myUrl2+="&lastNameL="+lastNameL;
			}*/
			//myUrl2+="&userLogonIdL="+userLogonIdL+"&firstNameL="+firstNameL+"&lastNameL="+lastNameL;
			
			dataString2+="&userLogonIdL="+userLogonIdL+"&firstNameL="+firstNameL+"&lastNameL="+lastNameL;
		}
		if(isSearchR){
			var userLogonIdR=document.getElementById('userLogonIdR').value;
				userLogonIdR = userLogonIdR.replace(/\s/g, "");
			var firstNameR=document.getElementById('firstNameR').value;
				firstNameR = firstNameR.replace(/\s/g, "");
			var lastNameR=document.getElementById('lastNameR').value;
				lastNameR = lastNameR.replace(/\s/g, "");
			/*if(userLogonIdR.length!=0){
				myUrl2+="&userLogonIdR="+userLogonIdR;
			}
			if(firstNameR.length!=0){
				myUrl2+="&firstNameR="+firstNameR;
			}
			if(lastNameR.length!=0){
				myUrl2+="&lastNameR="+lastNameR;
			}*/
			//myUrl2+="&userLogonIdR="+userLogonIdR+"&firstNameR="+firstNameR+"&lastNameR="+lastNameR;
			dataString2+="&userLogonIdR="+userLogonIdR+"&firstNameR="+firstNameR+"&lastNameR="+lastNameR;
		}
		//alert("myUrl2=== "+myUrl2)
	}catch (e) {
		// TODO: handle exception
		alert(e);
	}	
	$('#block_active_shadow_data').html('<span>Loading...</span>');
	$.ajax({
		type: "POST",  
		url:myUrl2,
		data: dataString2,
		dataType: "text",
		//async: true,
		success: function(data) {
			if($.trim(data)=="sessionout")
				{
				var testVal=document.getElementById('loginPage').value;
				window.location.replace(testVal);
				}
			var object = JSON.parse(data);

			var obj1=JSON.parse(object.unassociatedShadowUsersList);
			var obj2=JSON.parse(object.associatedShadowUsersList);
			var obj3=JSON.parse(object.domainList);					
			var obj4=JSON.parse(object.count1);
			//	alert("count::::::;"+obj4);
			count1=obj4;
			var content = '<div class=" new_filter" style="float: right; width: 50%;">';
			content += '<div class="span4">';
			content += '<div class="pull-right" id="switch_app">';
			content += '<label>Domain</label>';
			content += '<select id="id2" name="switchDomain" onchange="ajaxFunctionCallForDomain();">';
			content += '<option value="select">-select domain-</option>';
			if(obj3!=null && obj3 !='')
				{
			jQuery.each(obj3, function(i, v) {
				var temp=obj3[i];
				
				content += '<option value="'+temp+'" >'+temp+'</option>';
			});
				}
			else
				{
				
				}
			content += '</select>';

			content += '</div>';
			content += '</div>';
			content += '<div class="span8">';
			content += '<div class="pull-right" id="switch_app" onchange="ajaxFunctionCallForApplication(false,false);">';
			content += '<label>Application</label>';
			content += '<select id="id1" name="switchApp" >';
			content += '<option value="">-select Application-</option>';
			content += '</select>';
			content += '</div>';
			content += '</div>';
			content += '</div>';

			content += '<div id="mydiv3" class="row-fluid">';
			var it=0;
			//jQuery.each(data, function(index, value) { // Saurabh Changes
			jQuery.each(object, function(index, value) {
				var tid='';
				if(it==0){


					content += '<div id="mydiv1" class="span6">';

					//////////////////////////////////////////////////////////////////////



					//	var obj1 = JSON.parse(obj.count);
					//	var obj2 = JSON.parse(obj.Messages);
					//	alert("obj2-->"+obj1);
					//	count = obj1;

					//	alert("count here ==-->>"+count);


					content += '<div class=" new_filter" >';
					//content += '<label>Source User</label>';
					content += '<div class="span6">';
					content += '<div class="pull-left" id="switch_app">';
					content += '<label>Size</label>';
					content += '<select id="pageId_shadow1" onChange="fetchSize_shadow1(),getPageData_shadow1();" name="deassociationReasonListName" style="width:100%;">';
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
					// end code for bug id no #320 , added by abhimanyu
					content += '<option value="5000">5000</option>';
					//content += '<option value="10000">10000</option>';
					content += '</select>';

					content += '</div>';
					content += '</div>';
					content += '<div class="span6">';
					content += '<div class="pull-right" id="switch_app"  style="margin-right:-100px;">';
					content += '<label>Page Number</label>';
					/*content += '<select onChange="getPageData_shadow1()" id="pageNum_shadow1"  >';
					content += '<option value="">-select Page-</option>';
					content += '</select>';*/
					content += ' <input type="text" id="pageNum_shadow1" style="width:20%;background-color:white;" onChange="getPageData_shadow1()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_shadow1"></span>';
					content += '</div>';
					content += '</div>';
					content += '</div>';




					/////////////////////////////////////////////////////////////////////


					content +='	<table id="sample_7" class="table table-striped table-bordered">';

					content += '<thead>';
					content += '<tr>';
					content += '<th width="12%"></th>';
					content += '<th>User LogonId</th>';
					content += '<th>First Name</th>';
					content += '<th>Last Name</th>';
					content += '</tr>';

					content += '<tr>';
					//content += '<th><input type="button" onClick="showShadowPageCallSearch()" /></th>';
					content += '<th style="padding-bottom: 15px;" width="12%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="showShadowPageCallSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeShadowSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					content += '<th><input type="text" onkeydown="searchShadowL(event)" id="userLogonIdL" /></th>';
					content += '<th><input type="text" onkeydown="searchShadowL(event)" id="firstNameL" /></th>';
					content += '<th><input type="text" onkeydown="searchShadowL(event)" id="lastNameL" /></th>';
					content += '</tr>';
					content += '</thead>';
					content += '<tbody>';
					if(obj1!=null && obj1!='')
						{
					jQuery.each(obj1, function(i, v) {
						
						content += "<tr><td><input type='radio' name='unassociatedShadowUser' class='shadow_radio' value='"+v.userLogonId +"' /></td><td>"+v.userLogonId +"</td><td>"+v.firstName +"</td><td>"+v.lastName +"</td></tr>";
					});
						}
					else
						{
						content+="<tr><td colspan='4' style='text-align:center;'>No Record Found</td></tr>";
						}
						
					content += '</tbody>';
					content += '</table>';
					content += '</div>';
				}
				if(it==1){
					content += '<div  id="mydiv" class="span6"><table id="sample_8" class="table table-striped table-bordered">';
					content += '<thead>';
					content += '<tr>';
					content += '<th width="12%"></th>';
					content += '<th>User LogonId</th>';
					content += '<th>First Name</th>';
					content += '<th>Last Name</th>';
					content += '</tr>';

					content += '<tr>';
				//	content += '<th><input type="button" onClick="showShadowSearchR()" /></th>';
					content += '<th style="padding-bottom: 15px;" width="12%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="showShadowSearchR()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeShadowSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
					content += '<th><input type="text" id="userLogonIdR" /></th>';
					content += '<th><input type="text" id="firstNameR" /></th>';
					content += '<th><input type="text" id="lastNameR" /></th>';
					content += '</tr>';
					content += '</thead>';
					content += '<tbody >';
					if(obj2!=null && obj2!='')
						{
					jQuery.each(obj2, function(i, v) {
						content += "<tr><td><input type='radio' name='associatedShadowUser' class='shadow_radio' value='"+v.userLogonId +"' /></td><td>"+v.userLogonId +"</td><td>"+v.firstName +"</td><td>"+v.lastName +"</td></tr>";
					});
						}
					else
						{
						content+="<tr><td colspan='4' style='text-align:center;'>No Record Found</td></tr>";
						}
					content += '</tbody>';
					content += '</table>';
					content += '</div>';

				}

				it++;
			});


			content += '</div>';
			content += '<div class="form-actions form-actions2">';
			content += '<button class="btn btn-primary" type="button" onclick="shadowToken()">Submit</button>';
			content += '</div>';
			$('#block_active_shadow_data').html(content);
			/*$('#sample_7').dataTable()
					  .columnFilter({  sPlaceHolder: "head:after",
						aoColumns: [ null, 
									 { type: "text" },
									 { type: "text" },
									 { type: "text" }
									]
					});
					$('#sample_8').dataTable()
					  .columnFilter({  sPlaceHolder: "head:after",
						aoColumns: [ null, 
									 { type: "text" },
									 { type: "text" },
									 { type: "text" }
									]
					});*/
			
			if(pageCall==false){
				var maxPgaeNumber = count1 / 10;
				var rem = count1 % 10;
				if (rem > 0) {
					maxPgaeNumber = maxPgaeNumber + 1;
				}
				if (count1 == 0) {
					$('#pageNum_shadow1').val(0);
				} else {
					$('#pageNum_shadow1').val(1);
				}
				$('#pageN_shadow1').html(parseInt(maxPgaeNumber));
			}
			
		}
	});
}

var globalshadowFirstPreviouspageSize="";
var globalshadowFirstPreviousPageNum="";

var userLogonIdL="";
var firstNameL="";
var lastNameL="";

function showShadowPageCall(pageCall,isSearch){
	
// start code for Bug #122 , Added by Abhimanyu
    if($("#pageId_shadow1").length)
       {
  	  globalshadowFirstPreviouspageSize=$("#pageId_shadow1").val();
  	  globalshadowFirstPreviousPageNum=$("#pageNum_shadow1").val();
        }
// end code for Bug #122  

	var value = $('.shadow_radio:checked').val();

	var myUrl = "admin_showShadow.action?authType="+value;
	var dataString = "";

	if(pageCall)
	{

		var size=document.getElementById('pageId_shadow1').value;
		var pageNumber=document.getElementById('pageNum_shadow1').value;


		myUrl+="&fetchSize="+size+"&pageNumber="+pageNumber;

		//myUrl+="&userLogonIdL=user873&firstNameL=test&lastNameL=user886";

	}
	if(userLogonIdL!="" || firstNameL!="" || lastNameL!=""){
		isSearch = true;
	}
	
	if(isSearch){
		 userLogonIdL=document.getElementById('userLogonIdL').value;
			userLogonIdL = userLogonIdL.replace(/\s/g, "");
		 firstNameL=document.getElementById('firstNameL').value;
			firstNameL = firstNameL.replace(/\s/g, "");
		 lastNameL=document.getElementById('lastNameL').value;
			lastNameL = lastNameL.replace(/\s/g, "");
		/*if(userLogonIdL.length!=0){
			myUrl2+="&userLogonIdL="+userLogonIdL;
		}
		if(firstNameL.length!=0){
			myUrl2+="&firstNameL="+firstNameL;
		}
		if(lastNameL.length!=0){
			myUrl2+="&lastNameL="+lastNameL;
		}*/
		//myUrl+="&userLogonIdL="+userLogonIdL+"&firstNameL="+firstNameL+"&lastNameL="+lastNameL;
		dataString+="&userLogonIdL="+userLogonIdL+"&firstNameL="+firstNameL+"&lastNameL="+lastNameL;
		
	}
	//alert("myURL:::::"+myUrl);

	// TODO: handle exception

// start code for Bug #122 , Added by Abhimanyu
    if(searchshadowFirstWithpageSize)
	      {  
   	     if(myUrl.indexOf('fetchSize')==-1)
   		   { if($.trim(globalshadowFirstPreviouspageSize)!='')
 		    	 myUrl+="&fetchSize="+globalshadowFirstPreviouspageSize; 
   		   }
        }

// end code for Bug #122	
	
	
	//$('#block_active_shadow_data').html('<span>Loading...</span>');
	$.ajax({
		type: "POST",  
		url:myUrl,
		data: dataString,
		dataType: "text",
		//async: false,
		success: function(data) {
			//alert("data::::::;"+data);
			if($.trim(data)=="sessionout")
				{
				var testVal=document.getElementById('loginPage').value;
				window.location.replace(testVal);
				}
			var object = JSON.parse(data);

			var obj1=JSON.parse(object.unassociatedShadowUsersList);
			var obj2=JSON.parse(object.associatedShadowUsersList);
			var obj3=JSON.parse(object.domainList);					
			var obj4=JSON.parse(object.count1);
			//alert("count::::::;"+obj4);
	    //start code for Bug #122 , Added by Abhimanyu
	         // if(searchshadowFirstWithpageSize)
	        //	  obj4=count1;
	    // end code for Bug #122 
			count1=obj4;
			try{
				var content;
				var tid='';
				////
				content = '<div class="row-fluid">';
				//////////////////////////////////////////////////////////////////
				content += '<div class="row-fluid new_filter">';
				content += '<div class="span6">';
				content += '<div class="pull-left" id="switch_app">';
				content += '<label>Size</label>';
				content += '<select id="pageId_shadow1" onChange="fetchSize_shadow1(),getPageData_shadow1();" style="width:100%;">';
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
				//content += '<option value="10000">10000</option>';
				
				// end code for bug id no #320 , added by abhimanyu

				content += '</select>';

				content += '</div>';
				content += '</div>';
				content += '<div class="span6">';
				content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;">';
				content += '<label>Page Number</label>';
				/*content += '<select onChange="getPageData_shadow1()" id="pageNum_shadow1"  >';
				content += '<option value="">-select Page-</option>';
				content += '</select>';*/
				content += ' <input type="text" id="pageNum_shadow1" style="width:20%;background-color:white;" onChange="getPageData_shadow1()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN_shadow1"></span>';
				content += '</div>';
				content += '</div>';
				content += '</div>';

				/////////////////////////////////////////////////////////////////////
				content +='	<table id="sample_7" class="table table-striped table-bordered">';

				content += '<thead>';
				content += '<tr>';
				content += '<th width="12%"></th>';
				content += '<th>User LogonId</th>';
				content += '<th>First Name</th>';
				content += '<th>Last Name</th>';
				content += '</tr>';

				content += '<tr>';
			//	content += '<th><input type="button" onClick="showShadowPageCallSearch()" /></th>';
				content += '<th style="padding-bottom: 15px;" width="12%"><a style="text-decoration:none;" href="javascript:void(0);" onClick="showShadowPageCallSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeShadowSearch();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
				content += '<th><input type="text" onkeydown="searchShadowL(event)" id="userLogonIdL" /></th>';
				content += '<th><input type="text" onkeydown="searchShadowL(event)" id="firstNameL" /></th>';
				content += '<th><input type="text" onkeydown="searchShadowL(event)" id="lastNameL" /></th>';
				content += '</tr>';
				content += '</thead>';
				content += '<tbody>';
				if(obj1!=null && obj1!='')
					{
				jQuery.each(obj1, function(i, v) {
					content += "<tr><td><input type='radio' name='unassociatedShadowUser' class='shadow_radio' value='"+v.userLogonId +"' /></td><td>"+v.userLogonId +"</td><td>"+v.firstName +"</td><td>"+v.lastName +"</td></tr>";
				});
					}
				else
					{
					content+="<tr><td colspan='4' style='text-align:center;'>No Record Found</td></tr>";
					}
				content += '</tbody>';
				content += '</table>';

			}catch(e){alert(e);}
			//content += '</tbody>';
			//content += '</table>';
			content += '</div>';
			$('#mydiv1').html(content);
			//$('#sample_7').dataTable()

			/* .columnFilter({  sPlaceHolder: "head:after",
							aoColumns: [ null, 
										 { type: "text" },
										 { type: "text" },
										 { type: "text" }
										]
						});*/
			
			
			$('#userLogonIdL').val(userLogonIdL);
			$('#firstNameL').val(firstNameL);
			$('#lastNameL').val(lastNameL);
				
			if ($.trim(globalshadowFirstPreviouspageSize) != '') {
				$("#pageId_shadow1").val(globalshadowFirstPreviouspageSize);
				fetchSize_shadow1();
				if (!searchshadowFirstWithpageSize)
					$("#pageNum_shadow1").val(globalshadowFirstPreviousPageNum);
				else {
					if(globalshadowFirstPreviousPageNum==0 && parseInt($('#pageN_shadow1').text()) > 0)
						globalshadowFirstPreviousPageNum="1";
					$("#pageNum_shadow1").val(globalshadowFirstPreviousPageNum);
				}
				
			}
			
			 if(pageCall==false){
				 	var size = 10;
				 	if(globalshadowFirstPreviouspageSize!=''){
				 		size = globalshadowFirstPreviouspageSize;
				 	}
				 	var maxPgaeNumber = count1 / size;
					var rem = count1 % size;
					if (rem > 0) {
						maxPgaeNumber = maxPgaeNumber + 1;
					}
					$('#pageN_shadow1').html(parseInt(maxPgaeNumber));
					if(count1==0)
						$('#pageNum_shadow1').val(0);
					else
						$('#pageNum_shadow1').val(1);
			 }
			 
			 if(userLogonIdL=="" && firstNameL=="" && lastNameL==""){
				 searchshadowFirstWithpageSize = false;
			 }
		}

	});

}

function shadowSubmitSearchL() {
	showShadowOnSubmit(false,true,false)
}
function shadowSubmitSearchR() {
	showShadowOnSubmit(false,false,true)
}

function ajaxFunctionCallForApplicationSearch() {
	if(validateSearchShadowR()){
		searchshadowSecondWithpageSize=true;
		ajaxFunctionCallForApplication(false,true);
	} else {
		validateSearchShadowR();
	}
	
}
function showShadowSearchL() {
	showShadow(false,true,false);
}
function showShadowSearchR() {
	showShadow(false,false,true);
}

function showShadowPageCallSearch() {
	if(validateSearchShadowL()){
		searchshadowFirstWithpageSize=true;
		showShadowPageCall(false,true);
	} else{
		validateSearchShadowL();
	}
	
}




//start code for bug id #338 , added by Abhimanyu
function resetglobalShadowVariable()
 {    globalshadowSecondPreviouspageSize="";
 	  globalshadowSecondPreviousPageNum="";
      globalshadowFirstPreviouspageSize="";
      globalshadowFirstPreviousPageNum="";
 }
//end code for bug id #338 , added by Abhimanyu


function searchShadowL(e)
{
	 if (e.keyCode === 13)   
		 showShadowPageCallSearch();
}

function searchShadowR(e)
{
	 if (e.keyCode === 13)   
		 ajaxFunctionCallForApplicationSearch();
}


function validateSearchShadowR(){
	
	 var users = $('#userLogonIdR').val();
	
	 if(users != undefined && users!= ""){
		 users = users.replace(/\s/g, " ");
			var user = users.split(',');
			var len  = user.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#userLogonIdR').val("");
				return false;
			}
	 }
 
	 var firstName = $('#firstNameR').val();
		
	 if(firstName != undefined && firstName!= ""){
		 firstName = firstName.replace(/\s/g, " ");
			var fName = firstName.split(',');
			var len  = fName.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#firstNameR').val("");
				return false;
			}
	 }
	 var lastName = $('#lastNameR').val();
	 if(lastName != undefined && lastName!= ""){
		 lastName = lastName.replace(/\s/g, " ");
			var lName = lastName.split(',');
			var len  = lName.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#lastNameR').val("");
				return false;
			}
	 }
	
	 return true;
}

function validateSearchShadowL(){
	
	 var users = $('#userLogonIdL').val();
	
	 if(users != undefined && users!= ""){
		 users = users.replace(/\s/g, " ");
			var user = users.split(',');
			var len  = user.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#userLogonIdL').val("");
				return false;
			}
	 }

	 var firstName = $('#firstNameL').val();
		
	 if(firstName != undefined && firstName!= ""){
		 firstName = firstName.replace(/\s/g, " ");
			var fName = firstName.split(',');
			var len  = fName.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#firstNameL').val("");
				return false;
			}
	 }
	 var lastName = $('#lastNameL').val();
	 if(lastName != undefined && lastName!= ""){
		 lastName = lastName.replace(/\s/g, " ");
			var lName = lastName.split(',');
			var len  = lName.length;
			if(len > 5000){
				alert('Maximum limit for search is 5000. Please reduce limit & try again.');
				$('#lastNameL').val("");
				return false;
			}
	 }
	
	 return true;
}

