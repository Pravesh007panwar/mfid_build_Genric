// start code for Bug #220 , added by Abhimanyu
var newRow=false;
var nEditing = null;
// start code for Bug #220 , added by Abhimanyu    

var TableEditable_mange_user = function () {
	//var newRow=false;
	var checkRow=false;
    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable_m_u, nRow) {
                var aData = oTable_m_u.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable_m_u.fnUpdate(aData[i], nRow, i, false);
                }

                //oTable_m_u.fnDraw();
            }

            
			
			function editRow(oTable_m_u, nRow) {
                var aData = oTable_m_u.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                
                var content="";
				
				var adDomainList=document.getElementById("adDomainId").value;
				var adDomainArr=adDomainList.split(',');
				
				

           try{
                jqTds[0].innerHTML = '<input type="checkbox" class="checkboxes" value="'+aData[1]+'" disabled />';
                	if(aData[1]=="")
                	jqTds[1].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[1] + '">';
                	else
                	jqTds[1].innerHTML =aData[1];
                if(empAccessFlag!='no'){
                	
                	jqTds[2].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[2] + '">';
                    jqTds[3].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[3] + '">';
     				jqTds[4].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[4] + '">';
     				jqTds[5].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[5] + '">';
     				jqTds[6].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[6] + '">';
					content += '<td><select id="addomain_mu_t"  >';
					content += '<option value="">Select AD Domain</option>';
					
					for(var i = 0; i < adDomainArr.length; i++) {
						if(adDomainArr[i] == aData[7])
						      content += '<option value='+adDomainArr[i]+' selected >'+adDomainArr[i]+'</option> ';
							else
					          content += '<option value='+adDomainArr[i]+'>'+adDomainArr[i]+'</option>';
				    }
					
					content += '</select></td>';
					jqTds[7].innerHTML = content;
     				jqTds[8].innerHTML = aData[8];
     				jqTds[9].innerHTML =  aData[9];
     				jqTds[10].innerHTML = aData[10];
     				jqTds[11].innerHTML = aData[11];
                }
                else{
                	
                	jqTds[2].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[2] + '">';
                    jqTds[3].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[3] + '">';
     				jqTds[4].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[4] + '">';
     				jqTds[5].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[5] + '">';
					content += '<td><select id="addomain_mu_t"  >';
					content += '<option value="">Select AD Domain </option>';
					
					for(var i = 0; i < adDomainArr.length; i++) {
						if(adDomainArr[i] == aData[6])
						      content += '<option value='+adDomainArr[i]+' selected >'+adDomainArr[i]+'</option> ';
							else
					content += '<option value='+adDomainArr[i]+'>'+adDomainArr[i]+'</option>';
				    }
					content += '</select></td>';
					jqTds[6].innerHTML = content;
     				jqTds[7].innerHTML = aData[7];
     				jqTds[8].innerHTML = aData[8];
     				jqTds[9].innerHTML =  aData[9];
     				jqTds[10].innerHTML = aData[10];
     				//jqTds[10].innerHTML = aData[10];
                }
				//jqTds[10].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[10] + '">';
				
           }
           catch(e)
           {
        	   alert(e);
           }
                var cancelBtn='';
				if(aData[1]!="")
				{
					cancelBtn = ' | <a class="cancel" href="">Cancel</a>';	
				}
				else
				{
					cancelBtn = ' | <a class="cancel" data-mode="new" href="">Cancel</a>';
				}
				  if(empAccessFlag!='no'){
					  jqTds[12].innerHTML = '<a class="edit" data="'+aData[1]+'" href="">Save</a>'+cancelBtn;
				  }
				  else{
					  jqTds[11].innerHTML = '<a class="edit" data="'+aData[1]+'" href="">Save</a>'+cancelBtn; 
				  }
				  
				
				
				
            }

            function saveRow(oTable_m_u, nRow) {
            	newRow=false;	
   			 var adDomainVal=document.getElementById("addomain_mu_t").value;
				
			 var jqInputs = $('input', nRow);
				//alert("add user==="+jqInputs[1].value+jqInputs[2].value+jqInputs[3].value+jqInputs[4].value+jqInputs[5].value);
			  	if(empAccessFlag!='no'){
			  		addUser(jqInputs[1].value,jqInputs[2].value,jqInputs[3].value,jqInputs[4].value,jqInputs[5].value,jqInputs[6].value,adDomainVal);
			  	}
			  	else{
			  		addUser(jqInputs[1].value,"",jqInputs[2].value,jqInputs[3].value,jqInputs[4].value,jqInputs[5].value,adDomainVal);
			  	}
				
                /*oTable_m_u.fnUpdate('<input type="checkbox" class="checkboxes" value="'+jqInputs[1].value+'" />', nRow, 0, false);
                oTable_m_u.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable_m_u.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable_m_u.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable_m_u.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable_m_u.fnUpdate(jqInputs[5].value, nRow, 5, false);
                oTable_m_u.fnUpdate(jqInputs[6].value, nRow, 6, false);
                oTable_m_u.fnUpdate(jqInputs[7].value, nRow, 7, false);
                oTable_m_u.fnUpdate(jqInputs[8].value, nRow, 8, false);
                oTable_m_u.fnUpdate(jqInputs[9].value, nRow, 9, false);
               // oTable_m_u.fnUpdate(jqInputs[9].value, nRow, 10, false);
                oTable_m_u.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 10, false);*/
               // oTable_m_u.fnDraw();
            }

          

            jQuery('#sample_editable_1_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#sample_editable_1_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown


			
			$(document).on('click','#sample_editable_1_new',function (e) {
				//alert("new row");
				if(newRow==false){
					
					newRow=true;
					e.preventDefault();
					
				 if(empAccessFlag!='no'){
					 var aiNew = oTable_m_u.fnAddData(['','','','','', '', '', '','','','','',
	                        '<a class="edit" href="">Edit</a> | <a class="cancel" data-mode="new" href="">Cancel</a>'
	                ]);
				 }
				 else{
					 var aiNew = oTable_m_u.fnAddData(['','','','','', '', '', '','','','',
	                        '<a class="edit" href="">Edit</a> | <a class="cancel" data-mode="new" href="">Cancel</a>'
	                ]); 
				 }
				
               
                var nRow = oTable_m_u.fnGetNodes(aiNew[0]);
                editRow(oTable_m_u, nRow);
                nEditing = nRow;
				//oTable_m_u.fnPageChange( 'last' );
				}
				 document.getElementById("sample_editable_1_new").disabled = true;
            });
			
			
		
			
			$(document).on('click','#sample_editable_1 a.delete',function (e) {
            //$('#sample_editable_1 a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
				nEditing = null;
                oTable_m_u.fnDeleteRow(nRow);
                alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });
            
            
            $(document).on('click','#sample_editable_1 a.cancel',function (e) {
            //$('#sample_editable_1 a.cancel').live('click', function (e) { // Saurabh Method Cancel :::: ::: 
            	//alert('::: cancel ::::'); // 
            	newRow=false;
                e.preventDefault();
                document.getElementById("sample_editable_1_new").disabled = false;
                if ($(this).attr("data-mode") == "new") {
				
                    var nRow = $(this).parents('tr')[0];
                    oTable_m_u.fnDeleteRow(nRow);
					nEditing = null;
                } else {
				
                    restoreRow(oTable_m_u, nEditing);
                    nEditing = null;
                }
            });
			
            $(document).on('click','#sample_editable_1_multi_delete',function (e) {
			//$('#sample_editable_1_multi_delete').live('click', function(){ // Saurabh Delete Method :::::: ::: 
				 // start code for Bug #220 , added by Abhimanyu  
				      if(newRow==true)
					     newRow=false;
				 // end code for Bug #220 , added by Abhimanyu
				//alert("111111111111111111111")
				var id="";
				if($('input[type="checkbox"]:checked').length==0){
					alert("Please select user to delete");
				}
				else if($('input[type="checkbox"]:checked').length>0){
					/*if (jConfirm("Are you sure to delete selected row ?") == false) {
						return;*/
					$.confirm({
				        text: "Are you sure to delete selected row? License May be associated to the selected users / super admin user will not be deleted.Do you want to continue ??",
				        confirm: function(button) {
				        	$('.checkboxes').each(function(){
								if($(this).is(':checked')){
								id += ""+ $(this).val() + ",";
									 }
							});
							id=id.substring(0,id.length-1);
							deleteUser(id);
							nEditing = null;
				        },
				        cancel: function(button) {
				            return;
				        }
				    });
					//}
					
					
					
				}
			});
            
            $(document).on('click','#sample_editable_1 a.edit',function (e) {
           // $('#sample_editable_1 a.edit').live('click', function (e) { // Saurabh Update Method :::: ::: 
            	try{
            		//alert("edit clicked");
            		newRow=false;
                e.preventDefault();
                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];
              //  alert(nRow.value);
				console.log(nEditing)
			//	alert(nEditing);
                if (nEditing !== null && nEditing != nRow && newRow!=true) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                	//alert("if");
					//restoreRow(oTable_m_u, nEditing);
					editRow(oTable_m_u, nRow);
					nEditing = nRow;
					newRow=true;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
                    /* Editing this row and want to save it */
                	var data='';
                	data=$(this).attr('data');
                	//alert("in else if data===="+data);
                	if(data!='')
                    	{
                    	 var jqInputs = $('input', nRow);
                    	 var adDomainVal=document.getElementById("addomain_mu_t").value;
                    		if(empAccessFlag!='no'){
                    			var res= updateUser(data,jqInputs[1].value,jqInputs[2].value,jqInputs[3].value,jqInputs[4].value,jqInputs[5].value,adDomainVal);
                    		}
                    		else{
                    			var res= updateUser(data,"",jqInputs[1].value,jqInputs[2].value,jqInputs[3].value,jqInputs[4].value,adDomainVal);
                    		}
                    	 
					}
                	else{
                		saveRow(oTable_m_u, nEditing);
                		//newRow=false;
                		nEditing = nRow;
                	}
                    	
                } 
                	else if (nEditing != nRow && this.innerHTML == "Save") {
                		//alert("in else if");
                		saveRow(oTable_m_u, nEditing);
                		newRow=false;
                		nEditing = null;
                   }else if(newRow==false) {
                	
                    /* No edit in progress - let's start one */
					editRow(oTable_m_u, nRow);
					nEditing = nRow;
					newRow=true;
                }
            	}
            	catch(e)
            	{
            		//alert(e);
            	}
            });
			
			
        }

    };

}();




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

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<a class="edit" href="">Save</a>';
                jqTds[5].innerHTML = '<a class="cancel" href="">Cancel</a>';
            }

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
                oTable.fnUpdate('<a class="delete" href="">Delete</a>', nRow, 5, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
                oTable.fnDraw();
            }

            var oTable = $('#sample_editable_1').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records per page",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumnDefs": [{
                        'bSortable': false,
                        'aTargets': [0]
                    }
                ]
            });

            jQuery('#sample_editable_1_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#sample_editable_1_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

            var nEditing = null;

           // $('#sample_editable_1_new').click(function (e) {
            $(document).on('click','#sample_editable_1_new',function (e) { // Saurabh TableEditable New
             //alert(':::: TableEditable New ::: '); 
            	e.preventDefault();
                var aiNew = oTable.fnAddData(['', '', '', '',
                        '<a class="edit" href="">Edit</a>', '<a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
                //sample_editable_1_new
               
            });

            $(document).on('click','#sample_editable_1 a.delete',function (e) {  // Saurabh TableEditable Delete
            	//alert(':::: TableEditable Delete :::: ');
            // $('#sample_editable_1 a.delete').live('click', function (e) {
            	
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });

            $(document).on('click','#sample_editable_1 a.cancel',function (e) { // Saurabh TableEditable Cancel
            	
           // $('#sample_editable_1 a.cancel').live('click', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });

            $(document).on('click','#sample_editable_1 a.edit',function (e) { // Saurabh TableEditable Edit
           // $('#sample_editable_1 a.edit').live('click', function (e) {
            	//alert(":::: TableEditable Edit :::: :: ");  
            	 e.preventDefault();

                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];

                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    restoreRow(oTable, nEditing);
                    editRow(oTable, nRow);
                    nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
                    /* Editing this row and want to save it */
                    saveRow(oTable, nEditing);
                    nEditing = null;
                    alert("Updated! Do not forget to do some ajax to sync with backend :)");
                } else {
                    /* No edit in progress - let's start one */
                    editRow(oTable, nRow);
                    nEditing = nRow;
                }
            });
        }

    };

}();