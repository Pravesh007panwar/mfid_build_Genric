var newRow=false;
var nEditing = null;

$(document).ready(function(){


$(document).on('click','#search_ip_add_new',function (e) {
	
			 // try{
				//alert("newRow==="+newRow)
				if(newRow==false){
				newRow=true;
				e.preventDefault();
				//var org = $('#org').val();
				
              var aiNew = oTable_ipSearch.fnAddData(['','','','',
                      '<a class="edit" href="">Edit</a> | <a class="cancel" data-mode="new" href="">Cancel</a>'
              ]);
              var nRow = oTable_ipSearch.fnGetNodes(aiNew[0]);
              editRow(oTable_ipSearch, nRow);
              nEditing = nRow;
              
					}
			 /* }catch(e){
						
					}*/
				
				
          });

});


$(document).on('click','.cancel',function (e) {
//$('.cancel').live('click', function (e) {
    e.preventDefault();
    newRow=false;
    if ($(this).attr("data-mode") == "new") {
   	 //alert("shyam")
        var nRow = $(this).parents('tr')[0];
       
        oTable_ipSearch.fnDeleteRow(nRow);
    } else {
        restoreRow(oTable_ipSearch, nEditing);
        nEditing = null;
    }
});
	

function restoreRow(oTable_ipSearch, nRow) {
	try{
                var aData = oTable_ipSearch.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                	oTable_ipSearch.fnUpdate(aData[i], nRow, i, false);
                }

            }
catch(e){
	//alert(e)
}
}

function saveRow(oTable, nRow) {
	
	var aData = oTable.fnGetData(nRow);
	
   	return addIpAddress(aData[0]);
	
}


$(document).on('click','.edit',function (e) {
//$('.edit').live('click', function (e) {
    e.preventDefault();
  var res="";
    var nRow = $(this).parents('tr')[0];
    
    if (nEditing !== null && nEditing != nRow && newRow!=true) {
        restoreRow(oTable_ipSearch, nEditing);
		editRow(oTable_ipSearch, nRow);
    	nEditing = nRow;
		newRow=true;
    } else if (nEditing == nRow && this.innerHTML == "Save") {
    	 res=saveRow(oTable_ipSearch, nEditing);
    	 if($.trim(res)=="success"){
		document.getElementById("countryListId").value="";
		newRow=false;
		nEditing = null;
    	 }
       
    } else if(newRow==false) {
		editRow(oTable_ipSearch, nRow);
		nEditing = nRow;
		newRow=true;
		
    }
});


//$('#ip_search_multi_delete').live('click', function(){
$(document).on('click', '#ip_search_multi_delete', function() {
	 
    if(newRow==true)
	     newRow=false;

var id="";

if($('input[type="checkbox"]:checked').length==0){
	alert("Please select blacklist IP range to delete");
	
	
}
else if($('input[type="checkbox"]:checked').length>0){
	
	if(confirm("Are you sure to delete selected row?Do you want to continue?")){
		$('.checkboxes').each(function(){
				if($(this).is(':checked')){
				id += "'"+ $(this).val() + "',";
			}
		});	
			id=id.substring(0,id.length-1);
		 
			deleteIpRange(id);
			nEditing = null;
      }
	else {
          return;
      }

	//}
	
	
	
}
});



function editRow(oTable_m_u, nRow) {
    var aData = oTable_m_u.fnGetData(nRow);
    var jqTds = $('>td', nRow);
    
    var content="";


try{
        jqTds[0].innerHTML = aData[0];
        
    //    content += '<td><select id="country"  >';
	//	content += '<option value="">Select Country</option>';
	//	for(var i = 0; i < countryList.length; i++) {
			
	//	content += '<option>'+countryList[i]+'</option>';
	//    }
		
	//	content += '</select></td>';
		
        
    //	if(aData[1]=="")
    //	jqTds[1].innerHTML = content;
    //	else
    //	jqTds[1].innerHTML =aData[1];
    
        jqTds[1].innerHTML = '<input type="text" id="ipRange1" class="m-wrap small" value="' + aData[1] + '">';
        jqTds[2].innerHTML = '<input type="text" id="ipRange2" class="m-wrap small" value="' + aData[2] + '">';
        
        var data='';
    	data=$(this).attr('data');
    	
    	if(data!='')
        	{
        	 var jqInputs = $('input', nRow);
        		
        			// document.getElementById("countryListId").value=jqInputs[0].value;
        		
        	 
		}
		
		
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
	  
	 
		  jqTds[3].innerHTML = '<a class="edit" data="'+aData[1]+'" href="">Save</a>'+cancelBtn; 
	  
	  
	
	
	
}