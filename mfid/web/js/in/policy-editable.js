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
                if(aData[1]=="No"){
                document.getElementById("expireTimeBeforeEdit").value=0;
                }
                if(aData[1]=="Yes"){
                    document.getElementById("expireTimeBeforeEdit").value=1;
                    }
                //alert("aData[3]==="+aData[3])
                document.getElementById("expireTimeBeforeEdit").value=aData[2];
                document.getElementById("policyTypeBeforeEdit").value=aData[3];
                document.getElementById("pId").value=aData[8];
                
               
                
                
                jqTds[0].innerHTML = '<input id="editPpolicyDesc" type="text" class="m-wrap small" value="' + aData[0] + '">';
                jqTds[2].innerHTML = '<input id="editExpirationTime"  type="text" class="m-wrap small" value="">';
                if(aData[1]=="No"){
                jqTds[1].innerHTML = '<select id="editReuseFlag" onchange="callEditReuseFlag();"><option value="0" selected="selected">No</option><option value="1">Yes</option></select>';
                $("#editExpirationTime").attr("disabled", "disabled");
                $("#editExpirationTime").attr("value", ""); 
                }
                else {
                	jqTds[1].innerHTML = '<select id="editReuseFlag" onchange="callEditReuseFlag();"><option value="0" >No</option><option selected="selected" value="1">Yes</option></select>';
                	$("#editExpirationTime").removeAttr("disabled"); 
                      $("#editExpirationTime").attr("value", aData[2]); 
                	//  jqTds[1].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[1] + '">';
               
                }
                
               /* jqTds[3].innerHTML = '<select id="editPolicyType" ><option value="">Select<option value="0">All<option value="1">HardPolicy</option><option value="2">SMSPolicy</option><option value="3">MobilePolicy</option><option value="6">SoftPolicy</option><option value="7">PushPolicy</option></select>';
             	var dd = document.getElementById('editPolicyType');
             	for (var i = 0; i < dd.options.length; i++) {
             	    if (dd.options[i].text === aData[3]) {
             	        dd.selectedIndex = i;
             	        break;
             	    }
             	}*/
                
                //  jqTds[3].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[3] + '">';
              //  jqTds[4].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[4] + '">';
              //  jqTds[5].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[5] + '">';
				var cancelBtn='';;
                
				if(aData[0]!="")
				{
					cancelBtn = ' | <a class="cancel" href="">Cancel</a>';	
				}
				else
				{
					cancelBtn = ' | <a class="cancel" data-mode="new" href="">Cancel</a>';				
				}
				jqTds[6].innerHTML = '<a class="edit" href="">Save</a>'+cancelBtn;
				
				
            }

            function saveRow(oTable, nRow) {
            	var res=update();
			
               /* var jqInputs = $('input', nRow);
				
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
                oTable.fnUpdate('<a class="edit" href="">Edit</a> | <a class="delete" href="">Delete</a>', nRow, 6, false);*/
               
               // oTable.fnDraw();
            	return res;
            }

			

           // jQuery('#sample_editable_1_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            //jQuery('#sample_editable_1_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

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
            $(document).on('click','#sample_1_addNew',function (e) { // Saurabh 
				//alert('::: Add New :::' + $("#reuseFlag").val());
            	//alert($("#reuseFlag").val());
 			//start changes for bug id #277 , added by abhimanyu 
				$('#domainDiv').hide();
				$('#appDiv').hide();
		     //end changes for bug id #277 , added by abhimanyu	
				if($("#reuseFlag").val()==1)
				$("#expirationTime").removeAttr("disabled");
				$('#policyFormdiv').show(300);
			});
			
			$('#saveBtn').on('click',function(){
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
			 $(document).on('click','#sample_1 a.delete',function (e) { // Saurabh 
             //  alert(':::: sample_1 a.delete ::: ');
				 e.preventDefault();
                var nRow = $(this).parents('tr')[0];
				//nEditing = null;
                var aData = oTable.fnGetData(nRow);
             //   alert("aData==== "+aData[8])
                 document.getElementById("pId").value=aData[8];
                $.confirm({
			        text: "Are you sure to delete selected row ?",
			        confirm: function(button) {
			        	 
			              //  var jqTds = $('>td', nRow);
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
             //   alert("aData==== "+aData[8])
                 document.getElementById("pId").value=aData[8];
              //  var jqTds = $('>td', nRow);
                delete_row();*/
               // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });
            
           // $('#sample_1 a.assign_td').live('click', function (e) {
			 $(document).on('click','#sample_1 a.assign_td',function (e) {
				// alert(':::: sample_1 a.assign_td :::: ');
                e.preventDefault();


                var nRow = $(this).parents('tr')[0];
				//nEditing = null;
                var aData = oTable.fnGetData(nRow);
              //  alert("aData=inassign=== "+aData[8])
                 document.getElementById("pId").value=aData[8];
                document.getElementById("domainName").value=aData[4];
                document.getElementById("appName").value=aData[5];
              //  var jqTds = $('>td', nRow);
                var res=assign();
                if($.trim(res)=="success"){
				//	alert("in res")			
				openPolicy();
				}
               // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });
            
            
            

           // $('#sample_1 a.cancel').live('click', function (e) {
			 $(document).on('click','#sample_1 a.cancel',function (e) { // Saurabh
               // alert('::: Cancel :::');
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
			 $(document).on('click','#sample_1_multi_delete',function (e) { // Saurabh 
				// alert(':::: Multi Delete ::: ');
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
				// alert('::: Edit ::: ');
                e.preventDefault();
                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];
                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                   // alert ("First Save or Cancel");
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

