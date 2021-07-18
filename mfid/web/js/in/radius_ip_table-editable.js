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
               // jqTds[0].innerHTML = '<input type="checkbox" class="checkboxes" value="1" />';
                jqTds[0].innerHTML = '<input type="text" readonly  style="cursor:pointer;" readclass="m-wrap small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="m-wrap small" value="' + getRadiusInfo(aData[2]) + '">';
				jqTds[3].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[3] + '">';
				var selected = '';
				var select='<select id="select_source_type" sourceIP="'+aData[5]+'" sourceD="'+aData[6]+'">';
					if(aData[4]=='LDAP'){
						selected='selected';
					}
					select +='<option  '+selected+' value="LDAP">LDAP</option>';
					selected='';
					if(aData[4]=='Active Directory'){
						selected='selected';
					}
					select +='<option '+selected+' value="Active Directory">Active Directory</option>';
					selected='';
					if(aData[4]=='Authshield'){
						selected='selected';
					}
					select +='<option '+selected+' value="Authshield">Authshield</option>';
					selected='';
					if(aData[4]=='Radius'){
						selected='selected';
					}
					select +='<option '+selected+' value="Radius">Radius</option>';
					selected='';
					if(aData[4]=='ADFS'){
						selected='selected';
					}
					select +='<option '+selected+' value="ADFS">ADFS</option>';
				 select +='</select>';
				jqTds[4].innerHTML = select;
				if(aData[4]=='Authshield'){
					jqTds[5].innerHTML = '<input type="text"  readonly style="cursor:pointer;" id="sourceurl" class="m-wrap small" value="' + aData[5] + '">';
					jqTds[6].innerHTML = '<input type="text" readonly style="cursor:pointer;" id="sourcedomain" class="m-wrap small" value="' + aData[6] + '">';	
					jqTds[7].innerHTML = '<input type="text" readonly style="cursor:pointer;" class="m-wrap small" value="' + aData[7] + '">';
				}
				else{
				jqTds[5].innerHTML = '<input type="text"  id="sourceurl" class="m-wrap small" value="' + aData[5] + '">';
				jqTds[6].innerHTML = '<input type="text" id="sourcedomain" class="m-wrap small" value="' + aData[6] + '">';
				jqTds[7].innerHTML = '<input type="text" readonly style="cursor:pointer;" class="m-wrap small" value="' + aData[7] + '">';
				}
				jqTds[8].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[8] + '">';
				
                var cancelBtn='';
				if(aData[0]!="")
				{
					cancelBtn = ' | <a class="cancel" href="">Cancel</a>';	
				}
				else
				{
					cancelBtn = ' | <a class="cancel" data-mode="new" href="">Cancel</a>';
				}
				
				jqTds[9].innerHTML = '<a class="edit" data="'+aData[1]+'" href="">Save</a>'+cancelBtn;
				}
				catch(e)
				{
					alert(e);
				}
				
            }
			
			
			/*function ajaxFunctionCallForDomain()
			{
				alert("inseide changeSourceType");
				
			}*/
			
			
			//$('#select_source_type').live('change',function () { //Saurabh Changes Source Type
				$(document).on('change','#select_source_type',function (e) { 
				//alert('::: Edit Source Type ::::');
				var sourceType=document.getElementById('select_source_type').value;
				var sourceurl=document.getElementById('sourceurl').value;
				var sourcedomain=document.getElementById('sourcedomain').value;
				var sourceIP=$(this).attr('sourceIP');
				var sourceD=$(this).attr('sourceD');
				
				if(sourceType=='Authshield'){
				jQuery('input[id$="sourceurl"]').val("");
				jQuery('input[id$="sourcedomain"]').val("");
				 $('#sourceurl').attr('readonly', true);
				 $('#sourcedomain').attr('readonly', true);
				}
				else{
					 $('#sourceurl').attr('readonly', false);
					 $('#sourcedomain').attr('readonly', false);
					jQuery('input[id$="sourceurl"]').val(sourceIP);
					jQuery('input[id$="sourcedomain"]').val(sourceD);
				}
			    
			})
			
		
            function saveRow(oTable, nRow) {
			
                var jqInputs = $('input,select', nRow);
				
                
                oTable.fnUpdate('<input type="checkbox" class="checkboxes" value="1" />', nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
                oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
                oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
                oTable.fnUpdate(jqInputs[7].value, nRow, 7, false);
                oTable.fnUpdate(jqInputs[8].value, nRow, 8, false);
                
                oTable.fnUpdate('<a class="edit" href="">Edit</a> | <a class="delete" href="javascript:;">Delete</a>', nRow, 10, false);
               // oTable.fnDraw();
            }

          

            jQuery('#radiud_ip_table_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#radiud_ip_table_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

            var nEditing = null;

			
			/* $(document).on('click','#radiud_ip_table_new',function (e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['','','','','', '', '', '','','',
                        '<a class="edit" href="">Edit</a> | <a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
				//oTable.fnPageChange( 'last' );
            }); */
			
			
				
			$(document).on('click','#radiud_ip_table_new',function (e) {
				$('#redius_ip_form').show(500);
				$('#cancel_id').css('display','');
				$('#redius_ip_form').html('Loading...');
				manageRadiudForm();
			 });
			 
			 /*$(document).on('click','#radiud_ip_table_add',function (e) {
				$('#redius_ip_form').hide(500);
				document.getElementById("redius_form").reset(); 
			 });*/
			 
           // $('#radiud_ip_table a.delete').live('click', function (e) { // Saurabh Changes Delete
			$(document).on('click','#radiud_ip_table a.delete',function (e) { 
				//alert('::: delete :::');
            	 var nRow = $(this).parents('tr')[0];
            	 var aData = oTable.fnGetData(nRow);
            	
            	// e.preventDefault();
            	 
            	 $.confirm({
				        text: "Are you sure to delete selected row ?",
				        confirm: function(button) {
				        	deleteRadiusIP(aData[1],aData[3]);
				        },
				        cancel: function(button) {
				            return;
				        }
				    });

               /* if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }
                else {
                	deleteRadiusIP(aData[1],aData[3]);
                }
            	*/
                /*e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                var aData = oTable.fnGetData(nRow);
                alert("radius Ip="+aData[0]);
				nEditing = null;
                oTable.fnDeleteRow(nRow);
                alert("Deleted! Do not forget to do some ajax to sync with backend :)");*/
            });

           // $('#radiud_ip_table a.cancel').live('click', function (e) { // Saurabh Cancel
			$(document).on('click','#radiud_ip_table a.cancel',function (e) { 
				//alert('::: Cancel :::');
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
			
			//$('#radiud_ip_table_multi_delete').live('click', function(){ // Saurbah Multi Delete
			$(document).on('click','#radiud_ip_table_multi_delete',function (e) { 
				//alert(':: Multi Delete :::');
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

            //$('#radiud_ip_table a.edit').live('click', function (e) { // Saurabh Edit
			$(document).on('click','#radiud_ip_table a.edit',function (e) {     
				//alert('::: Edit :::');
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
                	var data='';
                	data=$(this).attr('data');
                	
                	if(data!='')
                    	{
                		 var jqInputs = $('input,select', nRow);
                		 /*alert("data===="+data);
                		 alert("jqInputs1===="+jqInputs[1].value);
                		 alert("jqInputs2===="+jqInputs[2].value);
                		 alert("jqInputs3===="+jqInputs[3].value);
                		 alert("jqInputs4===="+jqInputs[4].value);
                		 alert("jqInputs5===="+jqInputs[5].value);
                		 alert("jqInputs6===="+jqInputs[6].value);*/
                		 updateRadiusIP(data,jqInputs[1].value,jqInputs[2].value,jqInputs[3].value,jqInputs[4].value,jqInputs[5].value,jqInputs[6].value,jqInputs[8].value)
                    	}
                    /* Editing this row and want to save it */
					//saveRow(oTable, nEditing);
                	nEditing = nRow;
                   // alert("Updated! Do not forget to do some ajax to sync with backend :)");
                } else {
                    /* No edit in progress - let's start one */
					editRow(oTable, nRow);
					nEditing = nRow;
                }
            });
			
			
        }

    };

}();


function getRadiusInfo(data)
{
	   data = data.split('data-hide-pwd="')[1];
	   return  data.substring(0,data.indexOf('"'));
 }
