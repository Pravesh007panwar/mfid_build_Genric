function ajaxEditFunctionCall(){
	//alert("ajaxEditFunctionCallForApplication in method");
	// document.getElementById('domainId').options.length = 0;
	
	var value = document.getElementById("appId").value;
	//alert(value);
	if(value!="select"){

		/*document.forms["switchAppFrm"].action ="login_changeApplication.action";
		document.forms["switchAppFrm"].submit();*/
		try{
		
		document.appForm.action="login_changeApplication.action";                       
        document.appForm.submit();
        
		}
		catch(e)
		{
			alert(e);
		}
        
	}

}

function ajaxEditFunctionCallForDomain1(){
	alert("ajaxEditFunctionCallForDomain in method");
	// document.getElementById('domainId').options.length = 0;
	var value = document.getElementById("domainId").value;
	alert("Please select Application");
	//alert("value is"+value);
	if(value!="select"){

		document.forms[0].action ="login_changeDomain";
		document.forms[0].submit();
	}

}


function ajaxEditFunctionCallForDomain(){
    
	 //var organisation=document.getElementById('domainId').value;
	
 //document.getElementById('appId').options.length = 0;
 
				var value = document.getElementById("domainId").value;
				//alert("valueeee "+value);
           
   // alert(value);
    if(value=="Switch Domain"){
 /*   var sel = document.getElementById('appId');

//alert("data to be put"+listData[i]);
   var opt = document.createElement('option');
   opt.innerHTML = "Please select";
   
   sel.options.add(opt);*/
    }
    else{
    //alert("222222222222222222");
    document.getElementById('appId').options.length = 0;
    var listData=new Array();
               $.ajax
	({
	
	url: 'ApplicationMFIDAction.action?switchDomainName='+$('#domainId').val(),  
	cache: false,
	dataType:"text",
	
	success: function(data)
	{
	
	//alert(data);
	if($.trim(data)=="sessionout"){
			
			testVal= document.getElementById('loginPage').value				
			window.location.replace(testVal);
	}

	var object=JSON.parse(data);
	var obj=JSON.parse(object.reportList);
	
	if(obj!=null && obj!='')
		{
		listData[0]="Select Application";
	$.each(obj, function(i,data)
	{
	
	
	
   listData.push([data]);
   //alert(listData);
	});
		}
               
        
          
var sel = document.getElementById('appId');

for(var i = 0; i < listData.length; i++) {
//alert("data to be put"+listData[i]);





var opt = sel.options;
opt[opt.length] = new Option(listData[i],listData[i])

//alert("added");



}
           }
          
               
            }); 

                }
                    
               }
               
               
               
function redirect(){
//alert ("==="+document.getElementById('newSkill').value);
//var link='login_changeApplication.action';
location = "login_changeApplication.action".href;

}
