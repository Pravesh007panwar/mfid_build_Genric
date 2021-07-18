


function restoreRow(oTable_tiles, nRow) {
	try{
                var aData = oTable_tiles.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable_tiles.fnUpdate(aData[i], nRow, i, false);
                }

            }
catch(e){
	//alert(e)
}
}



function getTilesData(tileId,tilesTid){
	
				try{					
					showTilesList('true',tileId);
					var tileTypeId=$('#'+tilesTid).html();
					
					var tile=$('#'+tileId).val();
					
					$('#'+tileId).attr('multiple',true);
							$('#'+tileId).multiselect({
								includeSelectAllOption: true,
								enableFiltering: true,
								enableCaseInsensitiveFiltering: true
						
});
							
							//$("input[value='multiselect-all']").prop('checked', true);
							//$(".multiselect-item").addClass('active');
							 var allTilesData= document.getElementById('allTiles').value;
							 var valArrT = allTilesData.split(",");
							// var i = 0, size = valArr.length;
							
						      //  for (i; i < size; i++){
									
									
						        	
						   //        $('#'+tileId).multiselect('select', valArr[i]);
						   //     }
								
					//	if(1==1)
					//		{
					//	 var i = 0, size = valArr.length;
						
					//        for (i; i < size; i++){
					 //       	 $('#'+tileId).multiselect('select', valArr[i]);
					  //      }
					        
					  //      $("input[value='multiselect-all']").prop('checked', true);
					//		$(".multiselect-item").addClass('active');
						//	}
					//	else{
						   var valArr = tileTypeId.split(",");
						  // alert(valArr);
    						 var i = 0, size = valArr.length;
					        for (i; i < size; i++){
								
							//	alert(valArr[i]);

					            $('#'+tileId).multiselect('select', valArr[i]);
					        }
					        
				}catch(e){
					alert(e);
				}
							
				
			}
			
 var nEditing = null;
 
 
 function editRow(oTable_tiles, nRow) {
	 
				
				try{
					
					var aData = oTable_tiles.fnGetData(nRow);
					
                var jqTds = $('>td', nRow);
				
                document.getElementById("tilesDescBefEdit").value=aData[1];
                

         
               var allTilesData=document.getElementById('allTiles').value;
               var allTilesId=document.getElementById('allTilesId').value;
			  // alert(11);
			  // alert(aData[0]+"--------------"+jqTds[0].innerHTML.value); 
               
              // document.getElementById("systemId").value=aData[0];
              
                var arr=allTilesData.split(',');
                var arrId=allTilesId.split(',');
				
               
                var selected = '';
   				var select='<select  id="editTilesType" class="input-large m-wrap" >';
   					
   					select +='</select>';
   					if(aData[1]==""){
   	   					jqTds[1].innerHTML = '<input id="editMachineName" type="text" class="m-wrap small"  value="' + aData[1] + '">';
   					}else{
   						jqTds[1].innerHTML = '<input id="editMachineName" readonly type="text" class="m-wrap small"  value="' + aData[1] + '">';
   					}
   					jqTds[2].innerHTML = select;
   					
   	   				
                document.getElementById("editTilesType").options.length = 0;
				var sel = document.getElementById("editTilesType");
				var option = '';
				var temp='';
				for(var i = 0; i < arr.length; i++) {
					if(i==0){
						
					temp=arr[i];
					}
					var opt = sel.options;
					opt[opt.length] = new Option(arr[i],arr[i]);
					
				}
				$('#editTilesType').attr('multiple',true);
				$('#editTilesType').multiselect('destroy');
				
						$('#editTilesType').multiselect({
							includeSelectAllOption: true,
							enableFiltering: true,
							enableCaseInsensitiveFiltering: true
							});
						
						 $('#editTilesType').multiselect('deselect', temp);
						//alert("decode data==="+decodeURIComponent(aData[2]))
						// alert("aData[2]==="+aData[2])
						if(aData[2].split(",").length==4)
							{
								//alert("aData[1]=="+aData[1])
						 var allTilesData= document.getElementById('allTiles').value;
						   var valArr = allTilesData.split(",");
						
						 var i = 0, size = valArr.length;
						
					        for (i; i < size; i++){
					        	 $('#editTilesType').multiselect('select', valArr[i]);
					        }
					        
					        $("input[value='multiselect-all']").prop('checked', true);
							$(".multiselect-item").addClass('active');
							}
						else{
						   var valArr = decodeURIComponent(aData[2]).split(",");
						//alert("valArr==="+valArr)
						 var i = 0, size = valArr.length;
						
					        for (i; i < size; i++){
								
							        	
					        	
					            $('#editTilesType').multiselect('select', valArr[i]);
					        }
					        
						}
						
						var data='';
                	data=$(this).attr('data');
                	
                	if(data!='')
                    	{
                    	 var jqInputs = $('input', nRow);
                    		
                    			 document.getElementById("systemId").value=jqInputs[0].value;
                    		
                    	 
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
				jqTds[3].innerHTML = '<a class="edit" href="">Save</a>'+cancelBtn;
				
				}catch (e) {
					alert(e)
					// TODO: handle exception
				}
                
            }
			
		
// $('#sample_tiles a.cancel').live('click', function (e) {
 $(document).on('click', '#sample_tiles a.cancel', function(e) {
     e.preventDefault();
     newRow=false;
     if ($(this).attr("data-mode") == "new") {
    	 //alert("shyam")
         var nRow = $(this).parents('tr')[0];
    	 oTable_tiles.fnDeleteRow(nRow);
     } else {
         restoreRow(oTable_tiles, nEditing);
         nEditing = null;
     }
 });
			
			function saveRow(oTable, nRow) {
				newRow=false;
			   	var res=update();
		
            	return res;
            }
 
         
			
			
			
			$(document).ready(function(){
			
         
			  
	      
         // });
		 
		//  $('.edit').live('click', function (e) {
				$(document).on('click', '.edit', function(e) {
                e.preventDefault();
                /* Get the row as a parent of the link that was clicked on */
                //alert("debug1111")
                var nRow = $(this).parents('tr')[0];
               // alert("nRow==="+nRow)
                if (nEditing !== null && nEditing != nRow && newRow!=true) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                	// alert("debug 22222")
					//alert(2222+'======'+newRow+'======'+nEditing+'======'+nRow);
					restoreRow(oTable_tiles, nEditing);
                	// alert("debug 333333333333")
					editRow(oTable_tiles, nRow);
                	// alert("debug 444444444444")
					nEditing = nRow;
					newRow=true;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
					//alert(111+'======'+newRow+'======'+nEditing+'======'+nRow);
                    /* Editing this row and want to save it */
					var res=saveRow(oTable_tiles, nEditing);
					if($.trim(res)=="success"){
						//alert(res);
						//showTilesDetails(false,false);
						newRow=false;
						nEditing = null;
					}
					
                    //alert("Updated! Do not forget to do some ajax to sync with backend :)");
                } else if(newRow==false) {
				//alert(2+'======'+newRow+'======'+nEditing+'======'+nRow);
                    /* No edit in progress - let's start one */
					editRow(oTable_tiles, nRow);
					nEditing = nRow;
					newRow=true;
					
                }
            });
		  
		 // $('#sample_tiles_multi_delete').live('click', function(){
		  $(document).on('click', '#sample_tiles_multi_delete', function() {
				 
				      if(newRow==true)
					     newRow=false;
				
				var id="";
				
				if($('input[type="checkbox"]:checked').length==0){
					alert("Please select machine name to delete");
					//newRow=true;
				 }
				else if($('input[type="checkbox"]:checked').length>0){
					
					if(confirm("Are you sure to delete selected row?Do you want to continue?")){
						$('.checkboxes').each(function(){
								if($(this).is(':checked')){
								id += "'"+ $(this).val() + "',";
							}
						});	
							id=id.substring(0,id.length-1);
							
							deleteTiles(id);
							nEditing = null;
				        }
					else {
				            return;
				        }
				 
					//}
					
					
					
				}
			});
		  
		  
		  
		  $(document).on('click','#tiles_id_add_new',function (e) {
			 // try{
				//alert("newRow==="+newRow)
				if(newRow==false){
				newRow=true;
				e.preventDefault();
				//var org = $('#org').val();
				
              var aiNew = oTable_tiles.fnAddData(['','','',
                      '<a class="edit" href="">Edit</a> | <a class="cancel" data-mode="new" href="">Cancel</a>'
              ]);
              var nRow = oTable_tiles.fnGetNodes(aiNew[0]);
              editRow(oTable_tiles, nRow);
              nEditing = nRow;
					}
			 /* }catch(e){
						
					}*/
				
				
          });
		  
		  $(document).on('click','#tiles_submit_btn',function (e) {
			  
			  var checkId='';
			  
			  var selTilesType = $("#seleTilesId").val();
			  
              if($('input[type="checkbox"]:checked').length==0){
					alert("Please select the tile types.");
				}
			else if(selTilesType == null || selTilesType == "") {
			      alert("Select Tiles type");
			     
			
		      }
				else if($('input[type="checkbox"]:checked').length>0){
					
					if(confirm("Are you sure to update selected row?Do you want to continue?")){
						$('.checkboxes').each(function(){
								if($(this).is(':checked')){
								checkId += "'"+ $(this).val() + "',";
							}
						});	
							checkId=checkId.substring(0,checkId.length-1);
							
							multipleTilesUpdate(checkId,selTilesType);
							nEditing = null;
				        }
					else {
				            return;
				        }

					
					
				}
				
			  
			  
			  
			   });
		  
		  

			
			}); 
			
			
			
			

			