var TableEditable = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                //oTable.fnDraw();
            }

            
			
			function editRow(oTable, nRow) {
				try{
				var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                document.getElementById("policyDecBeforeEdit").value=aData[0];
               
               // document.getElementById("countryCode").value=aData[1];
               // document.getElementById("countryResponse").value=aData[2];
                //alert("aData[2]="+aData[2])
                document.getElementById("pId").value=aData[7];
               var allCountryCode= document.getElementById('allCountryCode').value;
               var policyResponse=aData[2];
                var arr=allCountryCode.split(',');
               
                var selected = '';
   				var select='<select  id="editCountryCode" class="input-large m-wrap" >';
   					//select +='<option value="" style="padding:3px 0px 3px 3px;">-select Country Codes-</option>';
   					select +='</select>';
   					jqTds[0].innerHTML = '<input id="editPolicyDesc" type="text" class="m-wrap small"  value="' + aData[0] + '">';	
   					jqTds[1].innerHTML = select;
   					var selectedRes = '';
   	   				var selectRes='<select id="editPolicyResponse" style="display: hidden">';
   	   					if(policyResponse=='deny'){
   	   					selectedRes='selected';
   	   					}
   	   					selectRes +='<option '+selectedRes+' value="deny">deny</option>';
   	   					selectedRes='';
   	   					if(policyResponse=='prompt'){
   	   					selectedRes='selected';
   	   					}
   	   					selectRes +='<option '+selectedRes+' value="prompt">prompt</option>';
   	   					selectedRes='';
   	   					
   	   					selectRes +='</select>';
   	   				jqTds[2].innerHTML = selectRes;
                document.getElementById("editCountryCode").options.length = 0;
				var sel = document.getElementById("editCountryCode");
				var option = '';
				var temp='';
				for(var i = 0; i < arr.length; i++) {
					if(i==0){
					temp=arr[i];
					}
					var opt = sel.options;
					opt[opt.length] = new Option(arr[i],arr[i]);
					
				}
				$('#editCountryCode').attr('multiple',true);
				$('#editCountryCode').multiselect('destroy');
				
				if(clientNameFlagP=="nic"){
				
						$('#editCountryCode').multiselect({
							includeSelectAllOption: false,
							enableFiltering: true,
							enableCaseInsensitiveFiltering: true
							});
				}else{
					$('#editCountryCode').multiselect({
						includeSelectAllOption: true,
						enableFiltering: true,
						enableCaseInsensitiveFiltering: true
						});
				}
						
						 $('#editCountryCode').multiselect('deselect', temp);
						// alert("decode data==="+decodeURIComponent(aData[1]))
						if(decodeURIComponent(aData[1])=='all')
							{
								//alert("aData[1]=="+aData[1])
						var allCountryCode= document.getElementById('allCountryCode').value;
						   var valArr = allCountryCode.split(",");
						 //alert(valArr)
						 var i = 0, size = valArr.length;
						
					        for (i; i < size; i++){
					        	 $('#editCountryCode').multiselect('select', valArr[i]);
					        }
					        
					        $("input[value='multiselect-all']").prop('checked', true);
							$(".multiselect-item").addClass('active');
							}
						else{
						   var valArr = decodeURIComponent(aData[1]).split(",");
						 //alert(valArr)
						 var i = 0, size = valArr.length;
						
					        for (i; i < size; i++){
					        	if(i==0){
					        		valArr[i]=valArr[i].split("'")[1];
					        		//alert("valArr[i]==="+valArr[i])
					        		}
					        	if(i==(size-1)){
					        		valArr[i]=valArr[i].split("'")[0];
					        		//alert("valArr[i]==="+valArr[i])
					        		
					        	}
					        	//$("input[value='"+temp+"']").prop('checked', false);
					        	
					            $('#editCountryCode').multiselect('select', valArr[i]);
					        }
					        
						}
					       
					        
				var cancelBtn='';
                
				if(aData[0]!="")
				{
					cancelBtn = ' | <a class="cancel" href="">Cancel</a>';	
				}
				else
				{
					cancelBtn = ' | <a class="cancel" data-mode="new" href="">Cancel</a>';				
				}
				jqTds[5].innerHTML = '<a class="edit" href="">Save</a>'+cancelBtn;
				
				}catch (e) {
					alert(e)
					// TODO: handle exception
				}
            }

            function saveRow(oTable, nRow) {
            
            	var res=update();
			
              
            	return res;
            }

			
            var nEditing = null;

			
			/* $(document).on('click','#sample_1_new',function (e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['','','','','','',
                        '<a class="edit" href="">Edit</a> | <a class="cancel" data-mode="new" href="">Cancel</a>','<a class="assign_td" href="javascript:void(0);">Assign</a>'
						
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
				//oTable.fnPageChange( 'last' );
            }); */
			
			//$('#sample_1_addNew').live('click',function(){
            $(document).on('click','#sample_1_addNew',function (e) { //
            	//alert('::: user country(User Details) Add New ::::');
            	 /*if($("#reuseFlag").val()==1)
					$("#expirationTime").removeAttr("disabled");*/
		    //start changes for bug id #277 , added by abhimanyu 
					//alert("shyam")
				 
					 
					$('#to_date').datetimepicker({dayOfWeekStart : 1});
				    $('#from_date').datetimepicker({dayOfWeekStart : 1});
					$("#from_date" ).val(getCurrentDate());
				   $("#to_date" ).val(getAddDaysToCurrentDate());
				   showCountryList('true','countrycode');
				 /* $('#countrycode').multiselect(
					          {
					              enableFiltering: true,
					              filterBehavior: 'both',
					              maxHeight: 200,
					              buttonWidth: '400px',
					              enableCaseInsensitiveFiltering: true,
					              nSelectedText: ' - selected values'
					          }
					      );
					*/
					
					$('#countrycode').attr('multiple',true);
					
					 //start changes for bug id #277 , added by abhimanyu 
							//$('#countrycode').multiselect('destroy');
					 //end changes for bug id #277 , added by abhimanyu
					if(clientNameFlagP=="nic"){
							$('#countrycode').multiselect({
								includeSelectAllOption: false,
								enableFiltering: true,
								enableCaseInsensitiveFiltering: true
							//allSelectedText: '  Select all'

								});
					}else{
						$('#countrycode').multiselect({
							includeSelectAllOption: true,
							enableFiltering: true,
							enableCaseInsensitiveFiltering: true
						//allSelectedText: '  Select all'

							});
						
					}
							
							//comment on 09-may-2017 to deselect selectall combobox $("input[value='multiselect-all']").prop('checked', true);
							$(".multiselect-item").addClass('active');
							
							//$('#countrycode').multiselect('select', "multiselect-all");
							///$('input').checked();
							
							//var a = $("#countrycode option:selected").text();
							//alert(a); //check if the value is correct.
							 var allCountryCode= document.getElementById('allCountryCode').value;
							// var allEle='multiselect-all,'+allCountryCode;
							 var valArr = allCountryCode.split(",");
							 var i = 0, size = valArr.length;
						        for (i; i < size; i++){
						        	//alert(valArr[0])
						            $('#countrycode').multiselect('deselect', valArr[i]);
						        }
						        	

							
		     //end changes for bug id #277 , added by abhimanyu	
				$('#policyFormdiv').show(300);
				try{
					var element = document.getElementById("block_show_User_Policy_Data");
					element.scrollIntoView();
				} catch(e) {
					
				}
				
				
			});
			
			//$('#saveBtn').live('click',function(){
            $('#saveBtn').on('click',function(){
				//alert(":::: Save Clicked:::");
				 $('#saveBtn').prop('disabled', true);
				  $('.icon-ok').prop('disabled', true);
				var res=save();
				
				if($.trim(res)=="success"){
					alert("success");
				this.form.reset();
				$('#policyFormdiv').hide(300);
				submitUserDetails();
				}
				 $('#saveBtn').prop('disabled', false);
				  $('.icon-ok').prop('disabled', false);
			});
			
			
            //$('#sample_1 a.delete').live('click', function (e) {
            $(document).on('click','#sample_1 a.delete',function (e) {
            	//alert(':::: sample_1 a.delete :::: ');
              //  e.preventDefault();
                var nRow = $(this).parents('tr')[0];
                var aData = oTable.fnGetData(nRow);
               // alert("aData[7]==="+aData[6])
                document.getElementById("pId").value=aData[4];
                $.confirm({
			        text: "Are you sure you would want to remove the selected country from your allowed list of countries ?",
			        confirm: function(button) {
			        	 delete_row();
			             
			        },
			        cancel: function(button) {
			            return;
			        }
			    });
                /*if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
				//nEditing = null;
                var aData = oTable.fnGetData(nRow);
              //  alert("aData==== "+aData[6])
                 document.getElementById("pId").value=aData[6];
              //  var jqTds = $('>td', nRow);
                var res= delete_row();
             //   alert(" res"+res)	
                if($.trim(res)=="success"){
					alert(res);			
				openPolicy();
				}*/
               // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });
            
            //$('#sample_1 a.assign_td').live('click', function (e) {
            $(document).on('click','#sample_1 a.assign_td',function (e) {
            	//alert('::: sample_1 a.assign_td :::');
                e.preventDefault();
                var nRow = $(this).parents('tr')[0];
				//nEditing = null;
                var aData = oTable.fnGetData(nRow);
             //   alert("aData=inassign=== "+aData[4])
                 document.getElementById("pId").value=aData[7];
                document.getElementById("domainName").value=aData[3];
                document.getElementById("appName").value=aData[4];
               // alert("pid==="+aData[7]+" d=="+aData[3]+" a=="+aData[4])
              //  var jqTds = $('>td', nRow);
                var res=assign();
                if($.trim(res)=="success"){
				//	alert("in res")			
				openPolicy();
				}
               // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });
            
            
            

           // $('#sample_1 a.cancel').live('click', function (e) {
            $(document).on('click','#sample_1 a.cancel',function (e) {
            	//alert('::::: Cancel :::::');
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
				
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
					nEditing = null;
                } else {
				
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });
			
			//$('#sample_1_multi_delete').live('click', function(){
            $(document).on('click','#sample_1_multi_delete',function (e) {
            	//alert(':::: Sample 1 Multi Delete :::');
				if($('input[type="checkbox"]:checked').length>0){
					if (confirm("Are you sure to delete selected row ?") == false) {
						return;
					}
					$('.checkboxes').each(function(){
						if($(this).is(':checked')){
							var nRow = $(this).parents('tr')[0];
							oTable.fnDeleteRow(nRow);
						}
					});
					nEditing = null;
					alert("Deleted! Do not forget to do some ajax to sync with backend :)");
				}
			});

           // $('#sample_1 a.edit').live('click', function (e) {
            $(document).on('click','#sample_1 a.edit',function (e) {
            	//alert(':::: Sample 1 Edit::::');
                e.preventDefault();
                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];
                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    //alert ("First Save or Cancel");
					restoreRow(oTable, nEditing);
					editRow(oTable, nRow);
					nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
                    /* Editing this row and want to save it */
                	
					res=saveRow(oTable, nEditing);
					if($.trim(res)=="success"){
						openPolicy();
						nEditing = null;
					}
					
                    //alert("Updated! Do not forget to do some ajax to sync with backend :)");
                } else {
                    /* No edit in progress - let's start one */
					editRow(oTable, nRow);
					nEditing = nRow;
                }
            });
			
			
        }

    };

}();

var TableEditableUserCountryPolicy = function () {
	var newRow=false;
	var nEditing = null;	
	return {
 
        init: function () {

        	 function restoreRow(oTable_assign_policy, nRow) {
	                var aData = oTable_assign_policy.fnGetData(nRow);
	                var jqTds = $('>td', nRow);

	                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
	                	oTable_assign_policy.fnUpdate(aData[i], nRow, i, false);
	                }
			   }
        	 
        	 function editRow(oTable_assign_policy, nRow) {
				   var aData = oTable_assign_policy.fnGetData(nRow);
				   var jqTds = $('>td', nRow);
				   try{
					   //jqTds[0].innerHTML = '<input type="checkbox"  id="activeCountry" name="activeCountry" class="checkboxes" value="'+aData[1]+'" style="width:auto;" />';
					   jqTds[0].innerHTML = aData[0];
					   jqTds[1].innerHTML =aData[1];
					   jqTds[2].innerHTML =aData[2];
					   jqTds[3].innerHTML =aData[3];
					   //jqTds[3].innerHTML = '<div class="control-group" id="date-time-div"><input type="text"  class="m-wrap small fromDate" readonly style="cursor: pointer;" value="' + aData[3] + '"></div>';
					   jqTds[4].innerHTML = '<div class="control-group" id="date-time-div"><input type="text"  class="m-wrap small toDate"  readonly style="cursor: pointer;" value="' + aData[4] + '"></div>';
				   } catch(e){
					   alert(e);
				   }
				   var cancelBtn = '';
					if (aData[1] != "") {
						cancelBtn = ' | <a class="cancel" href="">Cancel</a>';
					} else {
						cancelBtn = ' | <a class="cancel" data-mode="new" href="">Cancel</a>';
					}
					jqTds[5].innerHTML = '<a class="_country_edit" data="' + aData[1]
								+ '" href="">Save</a>' + cancelBtn;
					
					$('.toDate').datetimepicker({
							dayOfWeekStart : 1
						});
						$('.fromDate').datetimepicker({
							dayOfWeekStart : 1
					 });
				   
			   }
        	 
        	 function saveRow(oTable, nRow) {
	                var jqInputs = $('input', nRow);
	                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
	                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
	                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
	                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
	                oTable.fnUpdate('<a class="_country_edit" href="">Edit</a>', nRow, 4, false);
	                oTable.fnDraw();
	         }
        	 
        	 
        	 $(document).on('click', '#sample_country_1 a._country_edit', function(e) {
				   try{
					   $('#sample_1_addNew').attr("disabled",true);
					   $('#sample_editable_1_multi_delete').attr("disabled",true);
					   newRow=false;
					   e.preventDefault();
					   var nRow = $(this).parents('tr')[0];
					   console.log(nEditing)
					    if (nEditing !== null && nEditing != nRow && newRow!=true) {
					    	editRow(oTable_assign_policy, nRow);
							nEditing = nRow;
							newRow=true;
					    }  else if (nEditing == nRow && this.innerHTML == "Save") {
					    	var data='';
					    	data=$(this).attr('data');
					    	 if(data!=''){
					    		  var aData = oTable_assign_policy.fnGetData(nRow);
					    		 var jqInputs = $('input', nRow);
					    		 //var res= updateUserCountryPolicy(jqInputs[0].value,data,aData[2],jqInputs[1].value,jqInputs[2].value);
					    		 var res= updateUserCountryPolicy(jqInputs[0].value,data,aData[2],aData[3],jqInputs[1].value);
					    	}
					    	else{
		                		saveRow(oTable_assign_policy, nEditing);
		                		nEditing = nRow;
		                	}
					    } else if (nEditing != nRow && this.innerHTML == "Save") {
					    	saveRow(oTable_assign_policy, nEditing);
	                		newRow=false;
	                		nEditing = null;
					    } else if(newRow==false) {
					    	editRow(oTable_assign_policy, nRow);
							nEditing = nRow;
							newRow=true;
					    }
					   
					   
				   } catch(e){
					   alert(e);
				   }
			   });
			   
			   
			   $(document).on('click','#sample_country_1 a.cancel',function (e) {
				   $('#sample_editable_1_multi_delete').attr("disabled",false);
				   $('#sample_1_addNew').attr("disabled",false);
				   	newRow=false;
		                e.preventDefault();
		                if ($(this).attr("data-mode") == "new") {
						    var nRow = $(this).parents('tr')[0];
						    nEditing = null;
		                } else {
						    restoreRow(oTable_assign_policy, nEditing);
		                    nEditing = null;
		                }
		       });
        }
	};
	
}();

