 
function getServerStatus()
{ 
	var filePath = $("#id_image_Path").val();
	//alert("filePath "+filePath);
//alert("get radius server status");	
	setTimeout(getServerStatus,900000);

	//var div1=document.getElementById("container_radius_status");
  //  div1.innerHTML='<img src="'+filePath+'/web/img/server_loading.gif"  height="42" width="42">'; 
	$("#container_server_status_loading").show();
 /*   var div2=document.getElementById("container_push_status");
    div2.innerHTML='<img src="'+filePath+'/web/img/server_loading.gif"  height="42" width="42">'; 
    var div3=document.getElementById("container_redis_status");
    div3.innerHTML='<img src="'+filePath+'/web/img/server_loading.gif"  height="42" width="42">'; */
	
	
$.ajax
({
	type: "POST",  
	url: "admin_getServerStatus.action",  
	data: "{}",
	async: true,
	dataType: "text",


success: function(data)
{//alert("hello2");
 //alert(data);
	 if($.trim(data)=="sessionout"){
			
		 return;
			//testVal= document.getElementById('loginPage').value				
			//window.location.replace(testVal);
		}
	var object = JSON.parse(data);
  if(object != null && object != '' && object != 'null')
		{
		var radiusStatus,pushStatus,redisStatus ;
		
		if(object.radiusStatus == 'up' ) 
			radiusStatus=filePath+'/web/img/thumbsup.png';
		 else
			radiusStatus=filePath+'/web/img/thumbsdown.png';
		
		if(object.pushStatus == 'up' ) 
			pushStatus=filePath+'/web/img/thumbsup.png';
		 else
			 pushStatus=filePath+'/web/img/thumbsdown.png';
		
		if(object.redisStatus == 'up' ) 
			redisStatus=filePath+'/web/img/thumbsup.png';
		 else
			 redisStatus=filePath+'/web/img/thumbsdown.png';
		
		var content='<table style="width:100%; float:left; " border="0" cellpadding="0" cellspacing="0" class="table table-bordered">';
		    content+='<tbody>';
		    content+='<tr style="background:#039cea;"> ';
		    content+='<td colspan="3"  align="center" height="20" valign="middle" style="color:#fff; text-align:center; font-size:18px; position:relative; font-weight:bold;">Server Status </td>';
		    content+='</tr>';
		    content+='<tr style="background:#f1f1f1; border-bottom:#b7b5b5 1px solid;" >';
		    content+='<td   valign="middle" style="padding:5px 5px 5px 20px;  border-bottom:#b7b5b5 1px solid; text-align:center; font-weight:bold;" width="33%" >Server Name</td>';
		    content+='<td  valign="middle" style="padding:5px 5px 5px 20px;  border-bottom:#b7b5b5 1px solid; text-align:center; font-weight:bold;" width="33%">Last Started Time</td>';
		    content+='<td   valign="middle" style="padding:5px 5px 5px 20px;  border-bottom:#b7b5b5 1px solid; text-align:center; font-weight:bold;" width="33%"> <center>Status </center></td>';
		    content+='</tr>';
		    content+='<tr style="background:#fefdfd;" >';
		    content+='<td  valign="middle" style="padding:5px 5px 5px 20px; text-align:center;" >Radius Server</td>';
		    content+='<td   valign="middle" style="padding:5px 5px 5px 20px; text-align:center;">'+object.radiusUpTime+'</td>';
		    content+='<td  valign="middle" style="padding:5px 5px 5px 20px; text-align:center;" align="" >	<img src="'+radiusStatus+'" / style="margin:auto; !important;" ></td>';
		    content+='</tr>';
		    
		    content+='<tr style="background:#fefdfd;" >';
		    content+='<td  valign="middle" style="padding:5px 5px 5px 20px; text-align:center;" >Push Server</td>';
		    content+='<td   valign="middle" style="padding:5px 5px 5px 20px; text-align:center;">'+object.pushUpTime+'</td>';
		    content+='<td  valign="middle" style="padding:5px 5px 5px 20px; text-align:center;" align="" >	<img src="'+pushStatus+'" / style="margin:auto !important;; " ></td>';
		    content+='</tr>';
		    
		    content+='<tr style="background:#fefdfd;" >';
		    content+='<td  valign="middle" style="padding:5px 5px 5px 20px; text-align:center;" >Redis Server</td>';
		    content+='<td   valign="middle" style="padding:5px 5px 5px 20px; text-align:center;">'+object.redisUpTime+'</td>';
		    content+='<td  valign="middle" style="padding:5px 5px 5px 20px; text-align:center;" align="" >	<img src="'+redisStatus+'" / style="margin:auto; !important;" ></td>';
		    content+='</tr>';
		    
		    
		    content+='</tbody>';
		    content+='</table>';
		    
		   
		    
		 
		  	var div1=document.getElementById("container_radius_status");
		    div1.innerHTML=content; 
		    $("#container_server_status_loading").hide();
		    /*var div2=document.getElementById("container_push_status");
		    div2.innerHTML=content1;
		    var div3=document.getElementById("container_redis_status");
		    div3.innerHTML=content2;*/
		}
		
	
}	
 
}); 
 
}