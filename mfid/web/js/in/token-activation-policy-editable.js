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
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                document.getElementById("policyDecBeforeEdit").value=aData[0];
               
                document.getElementById("numberOfDaysBeforeEdit").value=aData[1];
              
                document.getElementById("pId").value=aData[6];
                
               
                
                
                jqTds[0].innerHTML = '<input id="editPolicyDesc" type="text" class="m-wrap small"  value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input id="editNumberOfDays"  type="text" class="m-wrap small"  value="'+aData[1]+' " >';
              
				var cancelBtn='';;
                
				if(aData[0]!="")
				{
					cancelBtn = ' | <a class="cancel" href="">Cancel</a>';	
				}
				else
				{
					cancelBtn = ' | <a class="cancel" data-mode="new" href="">Cancel</a>';				
				}
				jqTds[4].innerHTML = '<a class="edit" href="">Save</a>'+cancelBtn;
				
				
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
		     //end changes for bug id #277 , added by abhimanyu	
				$('#policyFormdiv').show(300);
			});
			
			//$('#saveBtn').live('click',function(){
				$('#saveBtn').on('click',function(){
				//alert("in save")
				  $('#saveBtn').prop('disabled', true);
				  $('.icon-ok').prop('disabled', true);
				  
				  
				var res=save();
				
				if($.trim(res)=="success"){
				alert($.trim(res));
				this.form.reset();
				$('#policyFormdiv').hide(300);
				openPolicy();
				}else{
					alert($.trim(res));
				}
				 $('#saveBtn').prop('disabled', false);
				  $('.icon-ok').prop('disabled', false);
			});
			
			
          //  $('#sample_1 a.delete').live('click', function (e) {
				$(document).on('click','#sample_1 a.delete',function (e) {
                e.preventDefault();
                var nRow = $(this).parents('tr')[0];
				//nEditing = null;
                var aData = oTable.fnGetData(nRow);
               // alert("aData==== "+aData[6])
                 document.getElementById("pId").value=aData[6];
                $.confirm({
			        text: "Are you sure to delete selected row ?",
			        confirm: function(button) {
			        	delete_row();
			        },
			        cancel: function(button) {
			            return;
			        }
			    });
               /* if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
				//nEditing = null;
                var aData = oTable.fnGetData(nRow);
               // alert("aData==== "+aData[6])
                 document.getElementById("pId").value=aData[6];
              //  var jqTds = $('>td', nRow);
                var res= delete_row();
                if($.trim(res)=="success"){
				//	alert("in res")			
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
              //  alert("aData=inassign=== "+aData[4])
                 document.getElementById("pId").value=aData[6];
                document.getElementById("domainName").value=aData[2];
                document.getElementById("appName").value=aData[3];
              //  var jqTds = $('>td', nRow);
                var res=assign();
                if($.trim(res)=="success"){
				//	alert("in res")			
				openPolicy();
				}
               // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });
            
            
            

            //$('#sample_1 a.cancel').live('click', function (e) {
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

            //$('#sample_1 a.edit').live('click', function (e) {
			$(document).on('click','#sample_1 a.edit',function (e) {
                e.preventDefault();
                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];
                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    alert ("First Save or Cancel");
					restoreRow(oTable, nEditing);
					editRow(oTable, nRow);
					nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
                    /* Editing this row and want to save it */
                	
					res=saveRow(oTable, nEditing);
					if($.trim(res)=="success"){
						alert($.trim(res));
						openPolicy();
						nEditing = null;
					}else{
						alert($.trim(res));
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

