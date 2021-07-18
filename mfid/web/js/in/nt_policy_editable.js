var TableEditable = function () {

    return {

        //main function to initiate the module
        init: function () {
            function restoreRow(oTable, nRow) {
            	openPolicy();
            	/*alert("restoreRow===")
              //  var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
            	alert("policy==="+nRow.cells[0].innerHTML)
            	//var policyDesc=nRow.cells[0].innerHTML;
            	jqTds[0].innerHTML = nRow.cells[0].innerHTML;
            	$("#editPolicyDesc").attr("disabled", true) ;*/
                /*for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }*/

                //oTable.fnDraw();
            }

            
           //var editFlag="false";
			function editRowRule(oTable, nRow,editFlag) {
				try{
				//alert("in edit row")
				//alert("editFlag===="+editFlag)
				//if(editFlag=="true"){
					//editFlag="false";
					//alert("editFlag===="+editFlag)
					//alert("oTable==="+oTable);
					//alert("nRow===="+nRow)
					var policyIPA=nRow.cells[0].innerHTML;
					var policyIPB=nRow.cells[1].innerHTML;
					var date1=nRow.cells[2].innerHTML;
					var date2=nRow.cells[3].innerHTML;
					var time1=nRow.cells[4].innerHTML;
					var time2=nRow.cells[5].innerHTML;
					
					var policyResponse=nRow.cells[6].innerHTML;
					var policyIpType=nRow.cells[7].innerHTML;
					var policyMappingId=nRow.cells[9].innerHTML;
					var policyDesc=nRow.cells[10].innerHTML;
					
					/*alert("policyIPA===="+policyIPA);
					alert("policyIPB===="+policyIPB);
					alert("date1===="+date1);
					alert("time1===="+time1);
					alert("time2===="+time2);
					alert("date2===="+date2);

					alert("policyResponse===="+policyResponse);
					alert("policyIpType===="+policyIpType);
					alert("policyMappingId===="+policyMappingId);*/
				
					//alert("policyIpType===="+policyIpType)
				//alert(nRow.cells[0].innerHTML);
					//alert(nRow.cells[4].innerHTML);
                //var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
               // alert("jqTds====="+jqTds)
                document.getElementById("policyIPA_BeforeEdit").value=policyIPA;
                document.getElementById("policyIPB_BeforeEdit").value=policyIPB;
                document.getElementById("policyResponse_BeforeEdit").value=policyResponse;
                document.getElementById("policyMappingId").value=policyMappingId;
                document.getElementById("policyIPType").value=policyIpType;
                document.getElementById("policyDesc").value=policyDesc;
                var selected = '';
   				var select='<select id="editPolicyResponse">';
   					if(policyResponse=='accept'){
   						selected='selected';
   					}
   					select +='<option  '+selected+' value="accept">accept</option>';
   					selected='';
   					if(policyResponse=='deny'){
   						selected='selected';
   					}
   					select +='<option '+selected+' value="deny">deny</option>';
   					selected='';
   					if(policyResponse=='prompt'){
   						selected='selected';
   					}
   					select +='<option '+selected+' value="prompt">prompt</option>';
   					selected='';
   					
   				 select +='</select>';
   				jqTds[6].innerHTML = select;
               if(policyIpType=="networkTime"||policyIpType=="network"){
            	   jqTds[0].innerHTML = '<input id="editPolicyIPA" type="text" class="m-wrap small"  value="'+policyIPA+'">';
            	 
            	   //jqTds[2].innerHTML = '<input id="editPolicyResponse" type="text" class="m-wrap small"  value="'+policyResponse+'">';
               }
              
               if(policyIpType=="networkTimeRange"||policyIpType=="networkRange"){
                jqTds[0].innerHTML = '<input id="editPolicyIPA" type="text" class="m-wrap small"  value="'+policyIPA+'">';
                jqTds[1].innerHTML = '<input id="editPolicyIPB" type="text" class="m-wrap small"  value="'+policyIPB+'">';
               
               }
              
            	 
            	 	if(policyIpType=="time"||policyIpType=="networkTimeRange"||policyIpType=="networkTime"){
            	 		
            	 	  jqTds[2].innerHTML='<input id="editPolicyDate1" type="text" class="date start"  value="'+date1+'">';
            		  jqTds[3].innerHTML='<input id="editPolicyDate2"   type="text" class="date start" value="'+date2+'">';
            		  jqTds[4].innerHTML='<input id="editPolicyTime1"  type="text" class="time start" value="'+time1+'">';
            		  jqTds[5].innerHTML='<input id="editPolicyTime2"  type="text" class="time end" value="'+time2+'">';
            		  
            		  bindDateTimePicker();
            		 
            	 	}
             
             // alert(jqTds[2].innerHTML)
               // jqTds[1].innerHTML = '<input id="editNumberOfHours"  type="text" class="m-wrap small"  value="" >';
              
				var cancelBtn='';
			//alert("policy de=="+policyDesc)
				if(policyIPA!="")
				{
					//alert("in if")
					cancelBtn = ' | <a class="cancel" href="">Cancel</a>';	
				}
				else
				{
					//alert("in else")
					cancelBtn = ' | <a class="cancel" data-mode="newRule" href="">Cancel</a>';				
				}
				jqTds[8].innerHTML = '<a class="editRule" href="">Save</a>'+cancelBtn;
				//}
				
				}catch (e) {
					alert(e)
					// TODO: handle exception
				}
            }
			
			
			
			function editRow(oTable, nRow) {
				try{
					//alert("in edit row")
					//alert("oTable==="+oTable);
					//alert("nRow===="+nRow)
					var policyDesc=nRow.cells[0].innerHTML;
				//alert(nRow.cells[0].innerHTML);
					//alert(nRow.cells[4].innerHTML);
                //var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
               // alert("jqTds====="+jqTds)
                document.getElementById("policyDecBeforeEdit").value=policyDesc;
               
                //document.getElementById("numberOfHoursBeforeEdit").value="";
              
                document.getElementById("pId").value=nRow.cells[5].innerHTML;
                
               
                
                
                jqTds[0].innerHTML = '<input id="editPolicyDesc" type="text" class="m-wrap small"  value="'+policyDesc+'">';
               // jqTds[1].innerHTML = '<input id="editNumberOfHours"  type="text" class="m-wrap small"  value="" >';
              
				var cancelBtn='';
			//alert("policy de=="+policyDesc)
				if(policyDesc!="")
				{
					//alert("in if")
					cancelBtn = ' | <a class="cancel" href="">Cancel</a>';	
				}
				else
				{
					//alert("in else")
					cancelBtn = ' | <a class="cancel" data-mode="new" href="">Cancel</a>';				
				}
				jqTds[3].innerHTML = '<a class="edit" href="">Save</a>'+cancelBtn;
				
				}catch (e) {
					alert(e)
					// TODO: handle exception
				}
            }
			
			
			

            function saveRow(oTable, nRow) {
            	var res=update();
            	return res;
            }
            function saveRowRule(oTable, nRow) {
            	var res=updateRule();
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
				 $(window).scrollTop(0);
				try{
		 //start changes for bug id #277 , added by abhimanyu 
					$('#domainDiv').hide();
					$('#appDiv').hide();
		 //end changes for bug id #277 , added by abhimanyu	
				/*if($("#reuseFlag").val()==1)
					$("#ntpDiv").removeAttr("disabled");*/
				document.getElementById("rule").value='';
				 jQuery('input[id$="policyDesc"]').val("");
				 jQuery('input[id$="policyDesc"]').prop('readonly', false);
				$('#policyFormdiv').show(300);
				 $('#innerRule').show();
				 document.getElementById('addRange').selectedIndex = 0;
			//	 alert("addNew===");
				 
				 $('#lblNtw span div span').addClass('checked');
				 $('#lblTime span div span').removeClass('checked');
				 $('#lblNttime span div span').removeClass('checked');
				/*$("span").removeClass();
				$( "span" ).addClass("");*/
				//var value = "network";
				// $("input[name=ntp_radio][value=" + value + "]").attr('checked', 'checked');
				// $(selector).removeAttr('checked');
				//$('input:radio[name="ntp_radio"][value="network"]').attr('checked',true);
				/* $('input[name=ntp_radio][value="' + value + '"]')
			       .prop('checked', true)
			       .trigger('change');*/
				// $('input:radio[name=ntp_radio]')[0].checked = true;
				  
		        	$('#ip-range').show();
		        	$('#ntpDiv').show();
		        	$('#ntp-range').hide();
		        	$('#main-div').hide();
					$('#ip-div').hide();
					$('#ip-range-div').hide();
					$('#date-time-div').hide();
				}
				catch(e)
				{
					alert(e);
				}
			});
			
			
			
			
			// $('#sample_1 a.rule').live('click', function (e) {
            $(document).on('click','#sample_1 a.rule',function (e) {
				 $(window).scrollTop(0);
				// alert("shyam rul")
				 /* $('#domainDiv').hide();
				 $('#appDiv').hide();*/
				// alert("add rule")
				 
				var pType=$(this).attr("data-policy");
				 //alert("pType=="+pType)
				var pid=$(this).attr("data-pid");
				// alert("pid=="+pid);
				 var rule=$(this).attr("data-rule");
					//alert("rule==="+rule)
					document.getElementById("rule").value=rule;
					document.getElementById("policyType").value=pType;
				 jQuery('input[id$="policyDesc"]').val(pid).prop('readonly', true);
				 $('#innerRule').hide();
				 $('#ntpDiv').hide();
				$('#policyFormdiv').show(300);
				
				if(pType=="network"){
					 $('#ip-range-div').hide();
					 $('#ip-div').hide();
					 $('#ntp-range').hide();
					 $('#ip-range').show();
					 $('#date-time-div').hide();
				}
				
				if(pType=="networkTime"){
					 $('#ip-range-div').hide();
					 $('#ip-div').hide();
					 $('#ip-range').hide();
					 $('#date-time-div').hide();
					 $('#ntp-range').show();
				}
				
				if(pType=="time"){
					//alert("shyam")
					 $('#ip-range').hide();
					 $('#ntp-range').hide();
					 $('#main-div').show();
					 $('#ip-range-div').hide();
					 $('#ip-div').hide();
					 $('#date-time-div').show();
					 
				}
				
				
	            });
			
			
			
			
			$('#saveBtn').on('click',function(){
				//alert("in save")
				  $('#saveBtn').prop('disabled', true);
				  $('.icon-ok').prop('disabled', true);
				var rule=document.getElementById("rule").value;
				//alert("rule==="+rule)
				var res;
				if(rule=="rule"){
					 res=saveRule();
					
				}
				else res=save();
				//alert("res==="+res)
				if($.trim(res)=="success"){
					alert("success");
				this.form.reset();
				$('#policyFormdiv').hide(300);
				$('#domainDiv').hide();
				$('#appDiv').hide();
				
				openPolicy();
				}else{
					alert($.trim(res));
				}
				  $('#saveBtn').prop('disabled', false);
				  $('.icon-ok').prop('disabled', false);
			});
			
			
		   // $('#sample_1 a.deleteRule').live('click', function (e) {
			$(document).on('click','#sample_1 a.deleteRule',function (e) {
	               e.preventDefault();
	                var nRow = $(this).parents('tr')[0];
	             //  alert("pid= mapping==="+nRow.cells[9].innerHTML);
	                
	               // var aData = oTable.fnGetData(nRow);
	                document.getElementById("policyMappingId").value=nRow.cells[9].innerHTML;
	                $.confirm({
				        text: "Are you sure to delete selected row ?",
				        confirm: function(button) {
				        	delete_RuleRow();
				             
				        },
				        cancel: function(button) {
				            return;
				        }
				    });
		    });
	                
	           
			
			
			
			
			
            //$('#sample_1 a.delete').live('click', function (e) {
			$(document).on('click','#sample_1 a.delete',function (e) {
               e.preventDefault();
                var nRow = $(this).parents('tr')[0];
             //  alert("pid===="+nRow.cells[5].innerHTML);
                
               // var aData = oTable.fnGetData(nRow);
                document.getElementById("pId").value=nRow.cells[5].innerHTML;
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
            
           // $('#sample_1 a.assign_td').live('click', function (e) {
			$(document).on('click','#sample_1 a.assign_td',function (e) {
            	//alert("shyam")
                e.preventDefault();
                var domain="";
            	var application="";

                var nRow = $(this).parents('tr')[0];
                var policyId=nRow.cells[5].innerHTML;
                //alert(policyId)
                //alert("nRow.cells[4].innerHTML==="+nRow.cells[4].innerHTML);
               // alert("nRow.cells[1].innerHTML==="+nRow.cells[1].innerHTML);
                var dataValue=nRow.cells[1].innerHTML;
               // alert("datedataValue===="+dataValue)
                	if(dataValue.indexOf('|') == -1)
						{
                		domain=dataValue;
						}
                	else{
                	 var arr=dataValue.split("|");
                	 domain=arr[0];
                	 application=arr[1];
                	}
                	//alert("domian==="+domain)
                	//alert("application==="+application)
                //alert("nRow.cells[4].innerHTML==="+nRow.cells[4].innerHTML);
				//nEditing = null;
               // var aData = oTable.fnGetData(nRow);
             //   alert("aData=inassign=== "+aData[4])
                 document.getElementById("pId").value=policyId;
                document.getElementById("domainName").value=domain;
                document.getElementById("appName").value=application;
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
            	//alert("cancelllllll");
                e.preventDefault();
               // alert("$(this).attr==="+$(this).attr("data-mode"));
                if ($(this).attr("data-mode") == "new") {
				//alert("inside new")
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
					nEditing = null;
                } else {
                	//alert("cancel else")
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
			
			
			// $('#sample_1 a.editRule').live('click', function (e) {
			$(document).on('click','#sample_1 a.editRule',function (e) {
	            	//alert("editRule===");
	                e.preventDefault();
	                /* Get the row as a parent of the link that was clicked on */
	                var nRow = $(this).parents('tr')[0];
	                if (nEditing !== null && nEditing != nRow) {
	                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
	                   alert ("First Save or Cancel");
	                   return;
						//restoreRow(oTable, nEditing);
						editRowRule(oTable, nRow);
						nEditing = nRow;
	                } else if (nEditing == nRow && this.innerHTML == "Save") {
	                    /* Editing this row and want to save it */
	                	//alert("shyam")
						res=saveRowRule(oTable, nEditing);
						if($.trim(res)=="success"){
							alert($.trim(res));
							openPolicy();
							nEditing = null;
						}else{
							alert($.trim(res));
						}
						
	                    //alert("Updated! Do not forget to do some ajax to sync with backend :)");
	                } else {
	               //alert("111111")
	                    /* No edit in progress - let's start one */
						editRowRule(oTable, nRow);
						nEditing = nRow;
	                }
	            });
			
			
			
			
			
			
            //$('#sample_1 a.edit').live('click', function (e) {
			$(document).on('click','#sample_1 a.edit',function (e) {
            	//alert("shyam11");
                e.preventDefault();
                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];
                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                    alert ("First Save or Cancel");
                    return;
					//restoreRow(oTable, nEditing);
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
                	//alert("111111")
                    /* No edit in progress - let's start one */
					editRow(oTable, nRow);
					nEditing = nRow;
                }
            });
			
			
        }

    };

}();

