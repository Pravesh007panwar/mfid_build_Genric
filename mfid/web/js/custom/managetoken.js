function removeFilter() {
	$('#tokenSerialKey').val("");
	$('#authType').val("");
	$('#tokenStatus').val("");
	$('#appName').val("");
	$('#userLogonId2').val("");
}



var countManageTokenPage;
var searchManageTokenWithpageSize = false;
var searchCount;

function getPageData() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
	var totalPages =  $('#pageN').text();
	var pageNumber = document.getElementById('pageNum').value;
	if(pageNumber=="" || (pageNumber=="0" && parseInt(totalPages) > 0 )){ $('#pageNum').val(1);}
	if ($.trim(pageNumber) != "" && parseInt(pageNumber) <= parseInt(totalPages))
		showManageToken(true, false);
	else
		alert('Page should be less than or equal to page number.');
	}
}

function fetchSize() {

	var size = document.getElementById('pageId').value;
	if ($.trim(size) != '') {
		var maxSize = countManageTokenPage;

		var maxPgaeNumber = maxSize / size;
		var rem = maxSize % size;
		if (rem > 0) {
			maxPgaeNumber = maxPgaeNumber + 1;
		}
		
		if(countManageTokenPage==0){
			$('#pageNum').val(0);
		} else{
			$('#pageNum').val(1);
			$('#pageNum').attr("disabled",false);
		} 				
		$('#pageN').html(parseInt(maxPgaeNumber));
	} 
	
}

var globalManageTokenPreviouspageSize = "";
var globalManageTokenPreviousPageNum = "";

var userLogonId = '';
var tokenSerial = '';
var appName = '';
var authType = '';
var tokenStatus = '';


function showManageToken(pageCall, isSearch) {

	try {

		// start code for Bug #122 and #171 , added by Abhimanyu
		if ($("#pageId").length) {
			globalManageTokenPreviouspageSize = $("#pageId").val();
			globalManageTokenPreviousPageNum = $("#pageNum").val();
		}
		// end code for Bug #122 and #171

		
		var myUrl = "token_showTokenManagerData.action";
		if (pageCall == true) {
			// alert("in true")
			var size = document.getElementById('pageId').value;
			var pageNumber = document.getElementById('pageNum').value;
			myUrl = "token_showTokenManagerData.action?fetchSize=" + size
					+ "&pageNumber=" + pageNumber;
		}
		if(userLogonId!="" || tokenSerial!="" || appName!="" || tokenStatus!="" || authType!=""){
			isSearch=true;
		}

		if (isSearch) {
			 userLogonId = document.getElementById('userLogonId2').value;
			 tokenSerial = document.getElementById('tokenSerialKey').value;
			 appName = document.getElementById('appName').value;
			 authType = document.getElementById('authType').value;
			 tokenStatus = document.getElementById('tokenStatus').value;
			 if(pageCall)
				 myUrl +="&";
			 else
				 myUrl +="?";
					 
			myUrl += "userlogonId=" + encodeURIComponent(userLogonId) + "&appName=" + encodeURIComponent(appName)
					+ "&authType=" + authType + "&tokenStatus=" + tokenStatus
					+ "&tokenSerial=" + encodeURIComponent(tokenSerial);
			
		}
		// start code for Bug #122 and #171 , added by Abhimanyu
		if (searchManageTokenWithpageSize) {
			if (myUrl.indexOf('fetchSize') == -1) {
				if ($.trim(globalManageTokenPreviouspageSize) != '')
					myUrl += "&fetchSize=" + globalManageTokenPreviouspageSize;
			}
		}
		// end code for Bug #122 and #171

		$('#tab_bottom_box').html('<span>Loading...</span>');
			$.ajax({
					type : "POST",
					url : myUrl,
					// url:"192.168.1.157:8081/mfid_REST/mfid/dash/1/10",
					// data: "{}",
					async : true,
					dataType : "text",
					success : function(data) {
						// alert(data)
						if ($.trim(data) == "sessionout") {
							alert("sessionout");
							var testVal = document.getElementById('loginPage').value;
							window.location.replace(testVal);
						}
						var object = JSON.parse(data);
						var obj1 = JSON.parse(object.tokenList);
						var obj2 = JSON.parse(object.manageTokenCount);
						
						if(searchManageTokenWithpageSize){
							countManageTokenPage = obj2;
							searchCount = obj2;
						} else {
							countManageTokenPage = obj2;
							searchCount = obj2;
						}				    	
						var content = '<h4>User</h4><div class="space15"></div>';
						var content = '<div class="row-fluid ">';
						content += '<div class="span6">';
						content += '<div class="pull-left" id="switch_app">';
						content += '<label>Size</label>';
						content += '<select id="pageId" onChange="fetchSize(),getPageData();" name="deassociationReasonListName" style="width:100%;">';
						content += '<option value="">Select Size</option>';
						content += '<option value="10">10</option>';
						content += '<option value="20">20</option>';
						content += '<option value="50">50</option>';
						content += '<option value="100">100</option>';
						content += '<option value="200">200</option>';
						content += '<option value="500">500</option>';
						// start code for bug id no #320 , added by abhimanyu
						content += '<option value="1000">1000</option>';
						content += '<option value="2000">2000</option>';
						// end code for bug id no #320 , added by abhimanyu
						content += '<option value="5000">5000</option>';
						//content += '<option value="10000">10000</option>';

						content += '</select>';

						content += '</div>';
						content += '</div>';
						content += '<div class="span6">';
						content += '<div class="pull-right" id="switch_app" style="margin-right:-100px;" >';
						content += '<label>Page Number</label>';
						/*content += '<select onChange="getPageData()" id="pageNum"  >';
						content += '<option value="">-select Page-</option>';
						content += '</select>';*/
						content += ' <input type="text" id="pageNum" style="width:20%;background-color:white;" onChange="getPageData()" onkeypress="return isNumber(event)" disabled/> of <span id="pageN"></span>   ' ;
						content += '</div>';
						content += '</div>';
						content += '</div>';

						content += '<table class="table table-striped table-bordered" id="sample_1_1">';
						content += '<thead>';
						content += '<tr>';
						
						content += '<th></th>';
						content += '<th>Token Serial / License Key</th>';
						content += '<th> Token Type</th>';
						content += '<th>Application</th>';
						content += '<th>User Name</th>';
						content += '<th>Locked / Unlocked Status</th>';

						content += '</tr>';

						content += '<tr>';

						
						content += '<th style="padding-bottom: 15px;"><a style="text-decoration:none;" href="javascript:void(0);" onClick="manageTokenSearch()" ><i style="font-size:20px;" class="icon-search" title="Search"></i></a>&nbsp;<a href="javascript:void(0);" onClick="removeFilter();"><i class="icon-remove-sign" style="font-size:20px;text-decoration:none;" title="Remove Search Filter"></i></a></th>';
						content += '<th><input type="text" onkeydown="searchManageTokens(event)"  id="tokenSerialKey" /></th>';
						content += '<th><select id="authType"  >';
						content += '<option value="">Token Type</option>';
						content += '<option value="ht">Hard Token</option>';
						content += '<option value="mt">Mobile Token</option>';
						
						content += '<option value="bt">Bio Token</option>';
						content += '<option value="pt">Push Token</option>';

						content += '</select></th>';
						content += '<th><input type="text" onkeydown="searchManageTokens(event)"  id="appName" /></th>';
						content += '<th><input type="text" onkeydown="searchManageTokens(event)"  id="userLogonId2" /></th>';
						content += '<th><select  id="tokenStatus"  >';
						content += '<option value="">Token Status</option>';
						content += '<option value="Locked">Locked</option>';
						content += '<option value="Unlocked">Unlocked</option>';

						content += '</select></th>';

						content += '</tr>';
						content += '</thead>';
						try {
							if (obj1 != null && obj1 != '') {
								jQuery.each(obj1, function(i, v) {

									content += "<tr><td></td><td>" + v.token
											+ "</td><td>" + v.tokenType
											+ "</td><td>" + v.application
											+ "</td><td>" + v.userName
											+ "</td><td>" + v.status
											+ "</td></tr>";
								
								});
							} else
								content += "<tr><td style='text-align: center;' colspan='6' > No Record Found!</td></tr>";

						} catch (e) {
							// alert(e);
						}
						content += "</table>";
						content += '<div class="clearfix"></div>';
						content += '<div class="form-actions form-actions2">';
						content += '<div class="pull-left">';
					
						$('#manage_token_data').html(content);
						
						$('#tokenSerialKey').val(tokenSerial);
						$('#authType').val(authType);
						$('#tokenStatus').val(tokenStatus);
						$('#appName').val(appName);
						$('#userLogonId2').val(userLogonId);
						
						
						if ($.trim(globalManageTokenPreviouspageSize) != '') {
							$("#pageId").val(globalManageTokenPreviouspageSize);
							fetchSize();
							if (!searchManageTokenWithpageSize)
								$("#pageNum").val(
										globalManageTokenPreviousPageNum);
							else {
								if(globalManageTokenPreviousPageNum==0 && parseInt($('#pageN').text()) > 0 )
									globalManageTokenPreviousPageNum="1";
								$("#pageNum").val(
										globalManageTokenPreviousPageNum);
							}
						}
						//searchManageTokenWithpageSize = false;
						
						
						if(pageCall==false){
							var size=10;
							if(globalManageTokenPreviouspageSize!=''){
								size=globalManageTokenPreviouspageSize;
								countManageTokenPage=searchCount;
							}
							
							if(userLogonId!="" || tokenSerial!="" || appName!="" || tokenStatus!="" || authType!=""){
								countManageTokenPage=searchCount;
							}
							var maxPgaeNumber = countManageTokenPage / size;
							var rem = countManageTokenPage % size;
							if (rem > 0) {
								maxPgaeNumber = maxPgaeNumber + 1;
							}
							$('#pageN').html(parseInt(maxPgaeNumber));
							if(countManageTokenPage == 0)
								$('#pageNum').val(0);
							else 
								$('#pageNum').val(1);
						}
						if(userLogonId=="" && tokenSerial=="" && appName=="" && tokenStatus=="" && authType==""){
							searchManageTokenWithpageSize = false;
						}
						

					}
				});
	} catch (e) {
		alert(e);
	}

}

function manageTokenSearch() {
	searchManageTokenWithpageSize = true;
	showManageToken(false, true);
}

function searchManageTokens(e) {
	if (e.keyCode === 13)
		manageTokenSearch();
}
