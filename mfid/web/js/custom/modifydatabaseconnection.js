function showModifyDatabaseConnection() {
	try {
		$.ajax({
			type : "POST",
			url : "admin_showModifyDatabaseCon.action",
			data : "{}",
			dataType : "text",
			async : true,
			success : function(data) {
		
			var object = JSON.parse(data);
			document.getElementById("vendor").value=JSON.parse(object.databaseVendor);
				if(JSON.parse(object.databaseVendor)=="Mysql"){
					
				$('#ad').hide();
				jQuery('input[id$="databaseVendor"]').val(JSON.parse(object.databaseVendor));
				jQuery('input[id$="databaseURL"]').val(JSON.parse(object.databaseURL));
				jQuery('input[id$="dataBasePassword"]').val("");
				jQuery('input[id$="databaseName"]').val(JSON.parse(object.databaseName));
				jQuery('input[id$="databaseQuery"]').val(JSON.parse(object.databaseQuery));
				jQuery('input[id$="databaseUserName"]').val(JSON.parse(object.databaseUserName));
				}
				else if(JSON.parse(object.databaseVendor)=="AD"){
					$('#mysql').hide();
					jQuery('input[id$="databaseV"]').val(JSON.parse(object.databaseVendor));
					jQuery('input[id$="ip"]').val(JSON.parse(object.databaseURL));
					jQuery('input[id$="databaseQ"]').val(JSON.parse(object.databaseQuery));
					jQuery('input[id$="baseDn"]').val(JSON.parse(object.baseDn));
					jQuery('input[id$="databasePassword"]').val("");
					//jQuery('input[id$="ldapFilter"]').val(JSON.parse(object.ldapFilter));
					jQuery('input[id$="organizationId"]').val(JSON.parse(object.ldapFilter));
					jQuery('input[id$="filterId"]').val(JSON.parse(object.searchFilter));
					jQuery('input[id$="attributesId"]').val(JSON.parse(object.attributes));
					}
				else if(JSON.parse(object.databaseVendor)=="LDAP"){
					$('#mysql').hide();
					//jQuery('input[id$="databaseQ"]').closest('.control-group').hide();
					jQuery('input[id$="databaseV"]').val(JSON.parse(object.databaseVendor));
					jQuery('input[id$="ip"]').val(JSON.parse(object.databaseURL));
					jQuery('input[id$="databaseQ"]').val(JSON.parse(object.databaseQuery));
					jQuery('input[id$="baseDn"]').val(JSON.parse(object.baseDn));
					jQuery('input[id$="databasePassword"]').val("");
					jQuery('input[id$="organizationId"]').val(JSON.parse(object.ldapFilter));
					jQuery('input[id$="filterId"]').val(JSON.parse(object.searchFilter));
					jQuery('input[id$="attributesId"]').val(JSON.parse(object.attributes));

				}
			}
		});
		
	}
 	catch (e) {
		// alert(e);
	}
}


function modifyConnectionDataADLdap() {

	var databaseVendor = document.getElementById("databaseV").value;
	var databaseURL = document.getElementById("ip").value;
	var databaseQuery = document.getElementById("databaseQ").value;
	var baseDn = document.getElementById("baseDn").value;
	var dataBasePassword = document.getElementById("databasePassword").value;

	var organizationId = document.getElementById("organizationId").value;
	var filterId = document.getElementById("filterId").value;
	var attributesId = document.getElementById("attributesId").value;

	//var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	var strutsToken = $('[name=csrfPreventionSalt]').val();
	if (databaseURL == "") {
		alert("Please enter IP address!");
		exit;
	}

	var parts = [];
	var parts = databaseURL.split(":");
	var ip = parts[0];
	var port = parts[1];

//	if (!ip.match(ipformat)) {
//		alert("You have entered an invalid IP address!");
//	} else
		if (port == "" || port == undefined) {
		alert("Please enter Port number!");
	} else if (isNaN(port)) {
		alert("You have entered an invalid Port number!");
	} 
	
	else if (databaseQuery == "") {
		alert("Please enter Principle");
		
	}
	else if (baseDn == "") {
		alert("Please enter Base DN");
	} else if (dataBasePassword == "") {
		alert("Please enter password");
	} else if (dataBasePassword.length > 20) {
		alert("Password length should not be more than 20 character");
	} else if (attributesId == "") {
		alert("Please enter attributes");
	}

	else {
		var dataString = 'databaseVendor=' + encodeURIComponent(databaseVendor)
				+ '&baseDn=' + encodeURIComponent(baseDn) + '&databaseURL='
				+ encodeURIComponent(databaseURL) + '&dataBasePassword='
				+ encodeURIComponent(dataBasePassword) + '&databaseQuery='
				+ encodeURIComponent(databaseQuery) + '&organization='
				+ encodeURIComponent(organizationId) + '&filter='
				+ encodeURIComponent(filterId) + '&attributes='
				+ encodeURIComponent(attributesId) + '&csrfPreventionSalt='
				+ strutsToken;
		$.ajax({
			type : "POST",
			url : "admin_modifyConnectionDataADLdap.action",
			dataType : "text",
			data : dataString,
			success : function(response) {
				alert(response);
				if ($.trim(response) == "success") {
					showModifyDatabaseConnection();
				}
			}
		});
		//return reponse; Saurabh

	}
}



function modifyDatabaseConnection() {
	var databaseVendor = document.getElementById("databaseVendor").value;
	var databaseURL = document.getElementById("databaseURL").value;
	var databaseName = document.getElementById("databaseName").value;
	var databaseUserName = document.getElementById("databaseUserName").value;
	var dataBasePassword = document.getElementById("dataBasePassword").value;
	var databaseQuery = document.getElementById("databaseQuery").value;
	var strutsToken = $('[name=csrfPreventionSalt]').val();

	/*
	 var ipformat =
	 /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	
	  if(databaseURL=="") { alert("Please enter IP address!");
	   }
	 
	  var parts=[]; var parts = databaseURL.split(":"); var ip=parts[0]; var
	  port=parts[1];
	  
	  
	  if(!ip.match(ipformat)) { alert("You have entered an invalid IP
	  address!"); } else if(port==""|| port==undefined) { alert("Please enter
	  Port number!"); } else if(isNaN(port)) { alert("You have entered an
	  invalid Port number!"); } else if(password=="") { alert("Please enter
	  Password"); } else if(dataBasePassword.length>20) { alert("Password
	  length should not be more than 20 character"); } else
	  if(databaseName=="") { alert("Please enter Database Name");
	   } else if(databaseUserName=="") { alert("Please enter Database
	  Username");
	   }
	  
	  else if(databaseQuery=="") { alert("Please enter Query"); }
	  
	  else{
	 */

	var dataString = 'databaseVendor=' + encodeURIComponent(databaseVendor)
			+ '&databaseName=' + encodeURIComponent(databaseName)
			+ '&databaseURL=' + encodeURIComponent(databaseURL)
			+ '&databaseUserName=' + encodeURIComponent(databaseUserName)
			+ '&dataBasePassword=' + encodeURIComponent(dataBasePassword)
			+ '&databaseQuery=' + encodeURIComponent(databaseQuery)
			+ '&csrfPreventionSalt='+ strutsToken;
	$.ajax({
		type : "POST",
		url : "admin_modifyDatabaseConnection.action",
		dataType : "text",
		data : dataString,
		success : function(response) {
			alert(response);
			if ($.trim(response) == "success") {
				showModifyDatabaseConnection();
			}
		}
	});
	// return reponse; // Saurabh

	//		}
}



