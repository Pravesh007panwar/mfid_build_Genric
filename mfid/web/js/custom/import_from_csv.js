

 var client = new XMLHttpRequest();
 var validFilesTypes=["xlsx","xls","csv"];
 var dropDownData;
 function ValidateFile()
 {
   var file = document.getElementById("tab_3_imp_csv");
   var label = document.getElementById("fileLbl");
   var path = file.value;
   var ext=path.substring(path.lastIndexOf(".")+1,path.length).toLowerCase();
  
   var isValidFile = false;
   for (var i=0; i<validFilesTypes.length; i++)
   {
     if (ext==validFilesTypes[i])
     {
         isValidFile=true;
         break;
     }
   }
   if (!isValidFile)
   {
	   //alert("in validFilesTypes");
    // label.style.color="red";
    // label.innerHTML="Invalid File. Please upload a File with" +    " extension:\n\n"+validFilesTypes.join(", ");
   }
   return isValidFile;
  }

 function showValues(){
	 
       try{
       var object = JSON.parse(dropDownData);
       var obj1=JSON.parse(object.tableColumnList);
       var userId = document.getElementById('csv_userId');
       var firstName = document.getElementById('csv_firstName');
       var middleName = document.getElementById('csv_middleName');
       var lastName = document.getElementById('csv_lastName');
       var email = document.getElementById('csv_email');
       var mobile = document.getElementById('csv_mobile');
       var userIdOpt = userId.options;
       		userIdOpt.length=1;
		var fNameOpt = firstName.options;
			fNameOpt.length=1;
		var mNameOpt = middleName.options;
		mNameOpt.length=1;
		var lNameOpt = lastName.options;
		lNameOpt.length=1;
		var emailOpt = email.options;
		emailOpt.length=1;
		var mobileOpt = mobile.options;
		mobileOpt.length=1;
       jQuery.each(obj1, function(i, v) {
    	 //  alert(v);
    		
    		
    		userIdOpt[userIdOpt.length] = new Option(v,v)
    		fNameOpt[fNameOpt.length] = new Option(v,v)
    		mNameOpt[mNameOpt.length] = new Option(v,v)
    		lNameOpt[lNameOpt.length] = new Option(v,v)
    		emailOpt[emailOpt.length] = new Option(v,v)
    		mobileOpt[mobileOpt.length] = new Option(v,v)
    	   });
       }
       catch (e) {
      	// alert(e)
      	// TODO: handle exception
      }
       $("#tab_3_coll_1").hide();
		$("#tab_3_coll_2").show();
       $('#collapse_14').show();
       $("#loading").css("display","none");
       $('body').css("opacity","1");
       
 }
 
function user_import_exl_csv(){
	
	showAjaxLoader();
	//alert("user import");
	 var showdata="";
	var res=ValidateFile();
	if(res==false){
		alert("Invalid File. Please upload a File with extension:\n\n"+validFilesTypes.join(", "));
		$("#tab_3_coll_1").show ();
		$("#tab_3_coll_2").hide();
		hideAjaxLoader();
		return false;
	}
	
	var file = document.getElementById("tab_3_imp_csv");
    
    /* Create a FormData instance */
    var formData = new FormData();
    /* Add the file */ 
    formData.append("fileUpload", file.files[0]);

    client.open("post", "admin_readExcelData.action", true);
   // client.setRequestHeader("Content-Type", "multipart/form-data");
    client.send(formData);  /* Send to server */ 
 
   
 /* Check the response status */  
 client.onreadystatechange = function() 
 {	try{
	// alert("state changed");
	// alert(client.readyState+"    "+client.status);
    if (client.readyState == 4 && client.status == 200) 
    { // alert("client.responseText==="+client.responseText);
      // alert(client.statusText);
    	hideAjaxLoader();
    	var inputFile = $('#tab_3_imp_csv');
		inputFile.wrap('<div />');
		inputFile.parent().html( inputFile.parent().html() );
       dropDownData = client.responseText; 
    //   alert("client.responseText==="+client.responseText);
       showValues();
      
    }
    
 }
 
 catch(e)
 {
	alert(e); 
 }
	
	}
}


function importFileUser(){
	
	 var userId = document.getElementById('csv_userId').value;
     var firstName = document.getElementById('csv_firstName').value;
     var middleName = document.getElementById('csv_middleName').value;
     var lastName = document.getElementById('csv_lastName').value;
     var email = document.getElementById('csv_email').value;
     var mobile = document.getElementById('csv_mobile').value;
     var strutsToken=$('[name=csrfPreventionSalt]').val();// added by puneet vats
	dataString='csv_userId='+userId+'&csv_firstName='+firstName+'&csv_middleName='+middleName+'&csv_lastName='+lastName+'&csv_email='+email+'&csv_mobile='+mobile+'&csrfPreventionSalt='+strutsToken;
	 if(userId=="select")
	  {
	  	alert("Please select UserLogonId");
	  	
	  }
    else if(firstName=="select")
     {
 	   alert("Please select first name");
 	
    }
    else if(lastName=="select")
    {
 	  alert("Please select last name");
 	
    }
    else if(email=="select")
    {
 	alert("Please select email");
 	
 }
 else if(mobile=="select")
 {
 	alert("Please select mobile");
 	
 }
 else{
	try{
		showAjaxLoader();
	$.ajax({
		type: "POST",
		url: "admin_importUserDetailFromExcel.action",
		data: dataString,
		dataType:"text",
		success: function(response){
			//alert(response);
			hideAjaxLoader();
			if($.trim(response)=="sessionout"){
				alert(response);
				testVal= document.getElementById('loginPage').value				
				window.location.replace(testVal);
			}
			else if(response.match(/Imported/))
		      { 
				alert(response);
				//$('#sidebar').load("menu.jsp");
				//location.reload();
			 $('#block_active_cvs').show();
				$("#tab_3_coll_1").show();
					$("#tab_3_coll_2").hide();
		      }
			else
				{
				alert(response);
				// $('#block_active_cvs').hide();
					$("#tab_3_coll_1").show();
					$("#tab_3_coll_2").hide();
				}
		}
	});
	}catch(e){alert(e);}
 }
}
