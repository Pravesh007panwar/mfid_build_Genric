var auto_refresh = setInterval(function() {
	
}, 20000);

var client = new XMLHttpRequest();
var validFilesTypes;
var dropDownData;
function ValidateFile() {
	var file = document.getElementById("insert_file");

	var authType = jQuery("input[name='inserTokenType']:checked").val()
	var label = document.getElementById("fileLbl");
	var path = file.value;
	var ext = path.substring(path.lastIndexOf(".") + 1, path.length)
			.toLowerCase();

	var isValidFile = true;
	validFilesTypes = "encrypted";
	if (ext != 'encrypted') {
		isValidFile = false;
	}
	return isValidFile;
}

function getTokenNumber() {
	try {
		var label = document.getElementById("tokenLbl");
		$.ajax({
			url : 'token_showInsertTokenNumber',
			dataType : "text",
			success : function(data) {
				document.getElementById("fontId").innerText = data;
			}
		});

	} catch (e) {
		alert("Error : " + e);
	}
}

function showLogs() {
	var response;
	try {
		$.ajax({
			async : false,
			url : 'token_showIsDone',
			dataType : "text",
			success : function(data) {
				response = data;
			}
		});

	} catch (e) {
		alert("Error : " + e);
	}
	return response;
}
function getSuccessLogs() {
	try {
		$.ajax({
			url : 'token_showSuccessLogs',
			dataType : "text",
			async : false,
			success : function(data) {
				if (data.length > 2) {
					$('#upload_loader').hide();
					$('#upload_status').show();
					$('#success_msg').html(data);
				}
			}
		});

	} catch (e) {
		alert("Error : " + e);
	}
}

function getErrorLogs() {

	try {
		$.ajax({
			url : 'token_showErrorLogs',
			dataType : "text",
			async : false,
			success : function(data) {
				if ($.trim(data) == "sessionout") {
					alert(data);
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				}
				else if (data.length > 2) {
					$('#upload_loader').hide();
					$('#upload_status').show();
					$('#fail_msg').html(data);
				}
			}
		});

	} catch (e) {
		alert("Error : " + e);
	}
}

function token_import() {
	var authType = jQuery("input[name='inserTokenType']:checked").val();
	var res = ValidateFile();
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats
	if (res == false) {
		alert("Invalid File. Please upload a File with extension:\n\n"
				+ validFilesTypes);
		return false;
	}

	var file = document.getElementById("insert_file");

	/* Create a FormData instance */
	var formData = new FormData();
	/* Add the file */
	formData.append("fileUpload", file.files[0]);
	formData.append("csrfPreventionSalt", strutsToken);
	client.open("post", "token_insertTokenFile.action?authType=" + authType
			+ '&csrfPreventionSalt=' + strutsToken, true);
	client.send(formData); /* Send to server */
	$('#insert_token_form').hide();
	$('#upload_loader').html('Loading...');
	runProgressBbarAction('start');
	client.onreadystatechange = function() {
	runProgressBbarAction('start');
	if (client.readyState == 4 && client.status == 200) {

			$('#insert_token_form').show();
			$('#upload_loader').hide();
			$('#upload_status').hide();

			var inputFile = $('#insert_file');
			inputFile.wrap('<div />');
			inputFile.parent().html(inputFile.parent().html());
			try {
				var data = client.responseText;
				alert(data);
				runProgressBbarAction('stop');
				$('#upload_loader').show();
				$('#upload_loader').html('');
			} catch (e) {
				alert(e);
			}
		}
	}

}

function getDone() {
	try {
		$.ajax({
			async : false,
			url : 'token_showIsDone',
			dataType : "text",

			success : function(data) {
				document.getElementById("showUpload").value = data;
			}
		});

	} catch (e) {
		alert("Error : " + e);
	}
}
// start code for bug id #318 , added by Abhimanyu
function runProgressBbarAction(status) {
	if (status == 'start') {
		$("#loading").css("display", "block");
		$('body').css("opacity", "0.8");
	} else if (status == 'stop') {
		$("#loading").css("display", "none");
		$('body').css("opacity", "1");
	}
}
//end code for bug id #318 , added by Abhimanyu

