// start code for bug id #286 and #287 , added by Abhimanyu
       function checkStringCharacter(strValue)
					 {    var iChars = "!`$%^&*()=[]\\\';,/{}|\":<>?~";
							 for (var i = 0; i < strValue.length; i++)
				                {      
				                	if (iChars.indexOf(strValue.charAt(i)) != -1)
				                    {    
				                    return false;
				                    } 
				                } 
							 return true;
					 }

//end code for bug id #286 and #287 , added by Abhimanyu



var TableEditable = function () {
	var newRow=false;
	var checkRow=false;
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
                jqTds[0].innerHTML = '<input type="text" class="m-wrap small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = aData[1] ;
				var cancelBtn='';;
               
				if(aData[0]!="")
				{
					cancelBtn = ' | <a class="cancel" href="">Cancel</a>';	
				}
				else
				{
					cancelBtn = ' | <a class="cancel" data-mode="new" href="">Cancel</a>';				
				}
				jqTds[2].innerHTML = '<a class="edit" data="'+aData[0]+'" href="">Save</a>'+cancelBtn;
				
            }
			
		
		

            function saveRow(oTable, nRow) {
            	 var domain_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 332 , added by abhimanyu
            	 var jqInputs = $('input', nRow);
            	  newRow=false;
            	 if(jqInputs[0].value=="" || $.trim(jqInputs[0].value) == "")
            		 {
            		 	alert("Please enter domain.");
            		 } // add code for bug id #286 added by Abhimanyu
            	 else if(!$.trim(jqInputs[0].value).match(domain_regex))// add code for bug id 332 , added by abhimanyu
        		   {
        		 	 alert("Please enter valid domain name.");
        		   } 
            	 else if (!checkStringCharacter(jqInputs[0].value))
            		 {
            		     alert ("Your string has special characters. \nThese are not allowed.");
            		  }
            	 else if(addDomain(jqInputs[0].value)=="success"){
            		 newRow=false;
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate('<a class="edit" href="">Edit</a> | <a class="delete" href="">Delete</a>', nRow, 2, false);
				}
            	 
                 }

          

            jQuery('#sample_editable_1_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#sample_editable_1_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

            var nEditing = null;

			
			$(document).on('click','#domain_tbl_new',function (e) {
				//alert("Shyam");
				//alert("newRow===="+newRow);
				if(newRow==false){
				newRow=true;
				e.preventDefault();
				var org = $('#org').val();
				
                var aiNew = oTable.fnAddData(['',org,
                        '<a class="edit" href="">Edit</a> | <a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                nEditing = nRow;
				//oTable.fnPageChange( 'last' );
				}
            });
			
			
			
			$(document).on('click','#domain_tbl a.delete',function (e) { // Saurabh Adminstration  Delete
           // $('#domain_tbl a.delete').live('click', function (e) {
				//alert('Inside Adminstration Delete ');
                e.preventDefault();
                var nRow = $(this).parents('tr')[0];
                var aData = oTable.fnGetData(nRow);
                $.confirm({
			        text: "Warning!! Are you sure that you wish to delete the selected domain. Please note that deleting a domain is a major operation and would delete all users,applications. token assignments from the domain as well. Please be absolutely sure before proceeding.",
			        confirm: function(button) {
			        	  deleteDomain(aData[0]);
			        },
			        cancel: function(button) {
			            return;
			        }
			    });
                nEditing=null;
                /*if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }
                var nRow = $(this).parents('tr')[0];
                var aData = oTable.fnGetData(nRow);
               deleteDomain(aData[0]);*/
                
                
            });
			
			$(document).on('click','#domain_tbl a.cancel',function (e) { //Saurabh Adminstration  Cancel
            //$('#domain_tbl a.cancel').live('click', function (e) {
				//alert('::::Inside Adminstration Cancel ::::');
				e.preventDefault();
                newRow=false;
                if ($(this).attr("data-mode") == "new") {
				
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
					nEditing = null;
                } else {
				
                    restoreRow(oTable, nEditing);
                    nEditing = null;
                }
            });
			
			$(document).on('click','#domain_tbl_multi_delete',function (e) {  //Saurabh Adminstration  Domain Multi Delete
			//$('#domain_tbl_multi_delete').live('click', function(){
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
			
			
			$(document).on('click','#domain_tbl a.edit',function (e) { //Saurabh Adminstration  Edit
           // $('#domain_tbl a.edit').live('click', function (e) {
				//alert('::::Inside Admin Edit :::: ');
				e.preventDefault();
                /* Get the row as a parent of the link that was clicked on */
                var nRow = $(this).parents('tr')[0];
				console.log(nEditing)
                if (nEditing !== null && nEditing != nRow) {
                    /* Currently editing - but not this row - restore the old before continuing to edit mode */
                	restoreRow(oTable, nEditing);
					editRow(oTable, nRow);
					nEditing = nRow;
                } else if (nEditing == nRow && this.innerHTML == "Save") {
                	 var domain_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 332 , added by abhimanyu
                	 var data='';
                	data=$(this).attr('data');
                	if(data!='')
                    	{
                    	 var jqInputs = $('input', nRow);
                    	 if(jqInputs[0].value=="" || $.trim(jqInputs[0].value) == "")
                    		 {
                    		 	alert("Please enter domain.");
                    		 }  // start code for bug id #287 , added by Abhimanyu
                    	 else if (!checkStringCharacter(jqInputs[0].value))
                		  {
                		     alert ("Your string has special characters. \nThese are not allowed.");
                		  }
                    	 else if(!$.trim(jqInputs[0].value).match(domain_regex))// add code for bug id 332 , added by abhimanyu
              		      {
              		 	      alert("Enter valid domain name.");
              		      } 
                    	 else
                    	 updateDomain(data,jqInputs[0].value);
                    	}
                    else{
					saveRow(oTable, nEditing);
					nEditing = null;
                    }
					
                    
                }
                else if (nEditing != nRow && this.innerHTML == "Save") {
                	
                	saveRow(oTable, nEditing);
					nEditing = null;
                   }
                else {
                    /* No edit in progress - let's start one */
					editRow(oTable, nRow);
					nEditing = nRow;
                }
            });
			
			
        }

    };

}();


var TableEditable_App = function () {
	var newRow=false;
	var checkRow=false;
    return {

        //main function to initiate the module
        init: function () {
            function restoreRow_app(oTable_app, nRow_app) {
                var aData = oTable_app.fnGetData(nRow_app);
                var jqTds = $('>td', nRow_app);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable_app.fnUpdate(aData[i], nRow_app, i, false);
                }

                //oTable_app.fnDraw();
            }

            
			
			function editRow_app(oTable_app, nRow_app) {
				try{
				
                var aData = oTable_app.fnGetData(nRow_app);
             
                var jqTds = $('>td', nRow_app);
                jqTds[0].innerHTML = aData[0];
               // alert("checkRow=="+checkRow)
                if(checkRow==false){
                jqTds[1].innerHTML = '<input type="text" id="editApp" class="m-wrap small" value="' + aData[1] + '">';
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
				try{
				jqTds[2].innerHTML = '<a class="edit" data="'+aData[1]+'" href="#">Save</a>'+cancelBtn;
				}
				catch (e) {
					alert(e);
					// TODO: handle exception
				}
				
				}catch (e) {
					alert(e)
					// TODO: handle exception
				}
				
            }

            function saveRow_app(oTable_app, nRow_app) {
			
                var jqInputs = $('input', nRow_app);
				//alert("jqInputs[0].value=== "+jqInputs[0].value);
                var application_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 334 , added by abhimanyu
                newRow=false;
                if(jqInputs[0].value=="" || $.trim(jqInputs[0].value) == "")
                	{
                		alert("Please enter application.");
                	}
                else if (!checkStringCharacter(jqInputs[0].value))
       		       {
       		         alert ("Your string has special characters. \nThese are not allowed.");
       		       }
                else if(!$.trim(jqInputs[0].value).match(application_regex))// add code for bug id 334 , added by abhimanyu
     		       {
     		 	     alert("Please enter valid application name.");
     		       } 
               else{
				var res=addApp(jqInputs[0].value);
				//alert(res);
				if($.trim(res)=="success"){
					 oTable_app.fnUpdate('<a class="edit" href="">Edit</a> | <a class="delete" href="">Delete</a>', nRow_app, 2, false);
					 
					newRow=false;
					
					showApplicationList();
				}
				else {
					newRow=true;
					checkRow=false;
				}
                }
				//alert("jqInputs[1].value=== "+jqInputs[1].value);
               // oTable_app.fnUpdate(jqInputs[0].value, nRow_app, 0, false);
               // oTable_app.fnUpdate(jqInputs[1].value, nRow_app, 1, false);
              //  oTable_app.fnUpdate('<a class="edit" href="">Edit</a> | <a class="delete" href="">Delete</a>', nRow_app, 2, false);
               
               // oTable_app.fnDraw();
            }
			
            jQuery('#sample_editable_1_wrapper .dataTables_filter input').addClass("m-wrap medium"); // modify table search input
            jQuery('#sample_editable_1_wrapper .dataTables_length select').addClass("m-wrap xsmall"); // modify table per page dropdown

            var nEditing_app = null;

			
			$(document).on('click','#application_tbl_new',function (e) {
				//alert("add new");
			//alert(newRow);
				if(newRow==true){
					newRow=false;
				}
				if(newRow==false){
				//	alert("newRow==="+newRow);
				newRow=true;
                e.preventDefault();
                var aiNew = oTable_app.fnAddData(['Auto Generated','',
                        '<a class="edit" href="">Edit</a> | <a class="cancel" data-mode="new" href="">Cancel</a>'
                ]);
                var nRow_app = oTable_app.fnGetNodes(aiNew[0]);
                editRow_app(oTable_app, nRow_app);
                nEditing_app = nRow_app;
				}
				//oTable_app.fnPageChange( 'last' );
            });
			
			
			
			
           // $('#application_tbl a.delete').live('click', function (e) {
			$(document).on('click','#application_tbl a.delete',function (e) { // Saurabh App Delete 
				//alert(':: App Adminstration Delete ::: ');
            	 var nRow_app = $(this).parents('tr')[0];
            	 var aData = oTable_app.fnGetData(nRow_app);
                // alert("aData[1]== "+aData[0]);
                 e.preventDefault();
                 $.confirm({
				        text: "Are you sure to delete selected row ?",
				        confirm: function(button) {
				        	deleteApp(aData[0]);
				        },
				        cancel: function(button) {
				            return;
				        }
				    });

                /*if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }
                else {
                	deleteApp(aData[0]);
                }*/
               // var nRow_app = $(this).parents('tr')[0];
				//nEditing_app = null;
               // oTable_app.fnDeleteRow(nRow_app);
               // alert("Deleted! Do not forget to do some ajax to sync with backend :)");
            });

           // $('#application_tbl a.cancel').live('click', function (e) {
			$(document).on('click','#application_tbl a.cancel',function (e) { // Saurabh App Cancel
				//alert(' ::::: Inside Application Cancel ::: ');
                e.preventDefault(); 
                if ($(this).attr("data-mode") == "new") {
                	  newRow=false;
                    var nRow_app = $(this).parents('tr')[0];
                    oTable_app.fnDeleteRow(nRow_app);
					nEditing_app = null;
                } else {
				
                    restoreRow_app(oTable_app, nEditing_app);
                    nEditing_app = null;
                }
            });
			
			//$('#application_tbl_multi_delete').live('click', function(){
			$(document).on('click','#application_tbl_multi_delete',function (e) { // Saurabh App Multi Delete
				//alert(' ::::: Inside Application Multi Delete ::: ');
				if($('input[type="checkbox"]:checked').length>0){
					if (confirm("Are you sure to delete selected row ?") == false) {
						return;
					}
					$('.checkboxes').each(function(){
						if($(this).is(':checked')){
							var nRow_app = $(this).parents('tr')[0];
							oTable_app.fnDeleteRow(nRow_app);
						}
					});
					nEditing_app = null;
					//alert("Deleted! Do not forget to do some ajax to sync with backend :)");
				}
			});

           // $('#application_tbl a.edit').live('click', function (e) {
			$(document).on('click','#application_tbl a.edit',function (e) { // Saurabh App Edit
				//alert(' ::::: Inside Application Edit ::: ');
				e.preventDefault();
            	
                /* Get the row as a parent of the link that was clicked on */
                var nRow_app = $(this).parents('tr')[0];
            	
                if (nEditing_app !== null && nEditing_app != nRow_app) {
                	
                    restoreRow_app(oTable_app, nEditing_app);
                	
                    editRow_app(oTable_app, nRow_app);
                
                    nEditing_app = nRow_app;
                	
                } else if (nEditing_app == nRow_app && this.innerHTML == "Save") {
                	
                	var data='';
                	data=$(this).attr('data');
                	if(data!=''){
                	   var application_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 334 , added by abhimanyu
                		var jqInputs = $('input', nRow_app);
                   	 if(jqInputs[0].value=="" || $.trim(jqInputs[0].value) == "")
                   		 {
                   		 	alert("Please enter application.");
                   		 }
                   	 else if (!checkStringCharacter(jqInputs[0].value))
            		     {
            		       alert ("Your string has special characters. \nThese are not allowed.");
            		      }
                   	 else if(!$.trim(jqInputs[0].value).match(application_regex))// add code for bug id 334 , added by abhimanyu
          		          {
          		 	       alert("Please enter valid application name.");
          		          } 
                   	  else
                		updateApp(data);
                		//alert("in rdit xcall")
            		}else{
            			/* Editing this row and want to save it */
            			
            			saveRow_app(oTable_app, nEditing_app);
            			nEditing_app = null;
            			//alert("Updated! Do not forget to do some ajax to sync with backend :)");
            		}
                } 
                else if (nEditing_app != nRow_app && this.innerHTML == "Save") {
                	 var application_regex = /^([a-zA-Z]|([0-9]+[a-zA-Z])|([a-zA-Z]+[0-9]))+([0-9a-zA-Z\S]+)$/;// add line for bug id 334 , added by abhimanyu
                      var v=document.getElementById('editApp').value;
                	  
                	 if(v=="" || $.trim(v) == "")
                 	  {
                 		alert("Please enter application.");
                 	  }
                	  else if (!checkStringCharacter(v))
        		         {
        		           alert ("Your string has special characters. \nThese are not allowed.");
        		          }
               	      else if(!$.trim(v).match(application_regex))// add code for bug id 334 , added by abhimanyu
      		              {
      		 	           alert("Please enter valid application name.");
      		              } 
                	 else{
                		 
                		 addApp(v);
                	/*var res=addApp(v);
                   //	alert(res);
    				if($.trim(res)=="success"){   
    					checkRow=false;
    					newRow=false;    					
    					showApplicationList();
    				}
    				else {
    					newRow=true;
    					checkRow=false;
    				}*/
                	
                	}
               }
                
                else {
                	
                    /* No edit in progress - let's start one */
                	if(this.innerHTML == "Edit"){
					editRow_app(oTable_app, nRow_app);
					nEditing_app = nRow_app;
                	}
                }
            });
			
			
        }

    };

}();