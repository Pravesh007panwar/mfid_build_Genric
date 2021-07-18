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
				
						$('#editCountryCode').multiselect({
							includeSelectAllOption: true,
							enableFiltering: true,
							enableCaseInsensitiveFiltering: true
							});
						
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
            $(document).on('click','#sample_1_addNew',function (e) {
				/*if($("#reuseFlag").val()==1)
					$("#expirationTime").removeAttr("disabled");*/
		    //start changes for bug id #277 , added by abhimanyu 
					$('#domainDiv').hide();
					$('#appDiv').hide();
					$('#responseId').hide();
					
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
							$('#countrycode').multiselect({
								includeSelectAllOption: true,
								enableFiltering: true,
								enableCaseInsensitiveFiltering: true
							//allSelectedText: '  Select all'

								});
							
							$("input[value='multiselect-all']").prop('checked', true);
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
						            $('#countrycode').multiselect('select', valArr[i]);
						        }
						        	

							
		     //end changes for bug id #277 , added by abhimanyu	
				$('#policyFormdiv').show(300);
				
			});
			
			$('#saveBtn').on('click',function(){
				//alert("in save")
				 $('#saveBtn').prop('disabled', true);
				  $('.icon-ok').prop('disabled', true);
				var res=save();
				
				if($.trim(res)=="success"){
					alert("success");
				this.form.reset();
				$('#policyFormdiv').hide(300);
				openPolicy();
				}
				 $('#saveBtn').prop('disabled', false);
				  $('.icon-ok').prop('disabled', false);
			});
			
			
           // $('#sample_1 a.delete').live('click', function (e) {
			$(document).on('click','#sample_1 a.delete',function (e) {
              //  e.preventDefault();
                var nRow = $(this).parents('tr')[0];
                var aData = oTable.fnGetData(nRow);
                document.getElementById("pId").value=aData[7];
                $.confirm({
			        text: "Are you sure to delete selected row ?",
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
            
            
            

          //  $('#sample_1 a.cancel').live('click', function (e) {
			$(document).on('click','#sample_1 a.cancel',function (e) {
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

