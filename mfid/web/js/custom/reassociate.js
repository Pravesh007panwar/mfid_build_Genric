

var count;

	function getPageData_reassociate()
	{

		var size=document.getElementById('pageId_reassociate').value;
		var pageNumber=document.getElementById('pageNum_reassociate').value;
		showReassociate(true,false);
		
	}

	
	function fetchSize_reassociate(){
		var size=document.getElementById('pageId_reassociate').value;
		var maxSize=count;
		
		var maxPgaeNumber=maxSize/size;
		var rem=maxSize%size;
		if(rem>0){
			maxPgaeNumber=maxPgaeNumber+1;
		}
		
		document.getElementById('pageNum_reassociate').options.length = 1;
		 var page = document.getElementById('pageNum_reassociate');
		var pageOpt = page.options;
		
		for(var i=1;i<maxPgaeNumber;i++)
		{
		
			pageOpt[pageOpt.length] = new Option(i,i);
		}
	}



function showReassociate(pageCall,isSearch)
{
	
	var value = $('.ass_deass_radio:checked').val();
	
	var myUrl = "admin_showReassociate.action?authType="+value;
	
	if(pageCall)
		{
		var size=document.getElementById('pageId_reassociate').value;
		var pageNumber=document.getElementById('pageNum_reassociate').value;
		
		myUrl+= "&fetchSize="+size+"&pageNumber="+pageNumber+"";
		
		
		
		//alert("myUrl::::::"+myUrl);
		}
	
	if(isSearch){
		var userLogonId=document.getElementById('userLogonId').value;
		myUrl+= "&userLogonId="+userLogonId;
	}
	
	//alert("showReassociate=====");
//	alert("myUrl  : "+myUrl);
$('#block_active_associate_deassociate_data').html('<span>Loading...</span>');
			$.ajax({
				type: "POST",  
				url:myUrl,
				data: "{}",
				async: true,
				dataType: "text",
				success: function(data) {
					if($.trim(data)=="sessionout"){
						//alert("reassociate condition true");
						testVal= document.getElementById('loginPage').value				
						window.location.replace(testVal);
					}

					var obj = JSON.parse(data);
					//alert("obj====="+data);
					
					var obj1 = JSON.parse(obj.count);
					var obj2 = JSON.parse(obj.Messages);
					//alert("obj2-->"+obj1);
					count = obj1;
					
					//alert("count here ==-->>"+count);
					////////////////////////////////////////////////////////////////////
					var content = '<div class="row-fluid new_filter">';
					content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId_reassociate" onChange="fetchSize_reassociate()" name="deassociationReasonListName">';
						content += '<option value="">-select size-</option>';
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
						
						content += '</select>';
			
						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" >';
						content += '<label>Page Number</label>';
						content += '<select onChange="getPageData_reassociate()" id="pageNum_reassociate"  >';
			content += '<option value="">-select Page-</option>';
					content += '</select>';
						content += '</div>';
					content += '</div>';
					content += '</div>';
					///////////////////////////////////////////////////////////////////
					
					 content += '<h4>Reassociate License</h4><div class="space15"></div>';
						content += '<table class="table table-striped table-bordered" id="sample_6">';
					content += '<thead>';
						content += '<tr>';
							content += '<th  style="width:20px;"><input type="checkbox" id="idcheckboxSelectReassociate" class="group-checkable" data-set="#sample_6 .checkboxes" /></th>';
							content += '<th>User LogonId</th> ';
							content += '<th>License Key </th>';
						content += '</tr>';
					
						content += '<tr>';
					//	content += '<th><input type="button" onClick="userReAssociateSearch()" /></th>';
						content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="userReAssociateSearch()" ><i style="font-size:20px;" class="icon-search"></i></a></th>';
						content += '<th><input type="text" id="userLogonId" /></th>';
							content += '<th>License Key </th>';
						content += '</tr>';
						content += '</thead>';
						try{
							if(obj2!=null && obj2 !='')
								{
						jQuery.each(obj2, function(i, v) {
							var temp=v.userLogonId+'='+v.tokenSerial+'='+v.authType+'='+v.firstName+'='+v.lastName;
							//alert("temp detail====="+temp);
						 content += "<tr><td><input type='checkbox' name='chkReassociategnToken' class='checkboxes' value='"+temp+"' /></td><td>"+v.userLogonId+"</td><td>"+v.tokenSerial +"</td></tr>";
						});
								}
							else
								{
								content+="<tr><td style='text-align:center;' colspan='3'>No Record Found</td></tr>";
								}
						}
						catch(e){
							//alert(e);
						}
						content += '</table>';
						content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';
							content += '<button class="btn btn-primary" id="idSubmitButtonReassociate" onclick="reassociateLicense()" type="button">Submit</button>';
						content += '</div>';
						$('#block_active_associate_deassociate_data').html(content);
						$("#sample_6").css("width","100%");
						/*$('#sample_6').dataTable()
						.columnFilter({ sPlaceHolder: "head:after",
						aoColumns: [ null, 
									{ type: "text" },
									{ type: "text" }
									]
					});*/
				}
		
			});
}
		
		function reassociateLicense()
		{
				//alert("reassociateLicense====");
			
			var chks=document.getElementsByName('chkReassociategnToken');             
			var authValue = $('.ass_deass_radio:checked').val();

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
			if(isChecked==false)
				{
				alert("Please select UserLogonId ");
				}
			//alert("id===="+id);
			//var status=document.getElementById('lStatusId').value;  
			id=id.substring(0,id.length-1);
			//alert("id11111===="+id);
			dataString='userIds='+id+"&authType="+authValue;
		
			try{
			$.ajax({
				type: "POST",
				url: "admin_reassociateLicense.action",
				data: dataString,
				dataType: "text" ,
				success: function(response){
					
					//alert(response);
				//	resVal=response;
					if($.trim(response)=="sessionout")
					{	alert(response);
						var testVal=document.getElementById('loginPage').value;
						window.location.replace(testVal);
					}
					else if($.trim(response) == "License key has been sent"){
						alert("success");
						showReassociate(false,false);
					
						showManageUser(false);
					}
					else
						{
						alert(response);
						}
					
				}
			});
			}catch(e){alert(e);}
		
		}
		
		function userReAssociateSearch() {
			showReassociate(false,true);
		}
