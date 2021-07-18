var newRow=false;
var nEditing = null;

var TableEditableAssignCountryPolicy = function () {
	
	return {
		init : function (){
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
					  // jqTds[3].innerHTML = '<div class="control-group" id="date-time-div"><input type="text"  class="m-wrap small fromDate" readonly style="cursor: pointer;" value="' + aData[3] + '"></div>';
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
			   
			   
			   $(document).on('click', '#sample_1 a._country_edit', function(e) {
				   try{
					   $('#deAssignBtn').attr("disabled",true);
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
					    		 //var res= updateAssignCountryPolicy(jqInputs[0].value,data,jqInputs[1].value,jqInputs[2].value);
					    		 var res= updateAssignCountryPolicy(jqInputs[0].value,data,aData[3],jqInputs[1].value);
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
			   
			   
			   $(document).on('click','#sample_1 a.cancel',function (e) {
				   $('#deAssignBtn').attr("disabled",false);
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









