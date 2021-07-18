function manageRadiusIp() {
	  $.ajax({
				type : "POST",
				url : "admin_showRadiusIP.action",
				data : "{}",
				dataType : "text",
				async : true,
				success : function(data) {

					if ($.trim(data) == "sessionout") {
						alert(data);
						testVal = document.getElementById('loginPage').value
						window.location.replace(testVal);
					}
					var object = JSON.parse(data);

					var obj1 = JSON.parse(object.appNameIDList);
					var obj2 = JSON.parse(object.radiusIPList);
					var content = '';
					var content = '<h4>Manage Radius IP</h4><div class="space15"></div>';
					content += '<div class="row-fluid new_filter">';
					content += '<div class="span12">';
					content += '<div id="switch_app" class="pull-right">';
					content += '<label></label>';
					content += '<select id="id2" name="switchDomain" onchange="ajaxFunctionCallForDomain();">';
					content += '<option value="">App Name - AppId</option>';
					jQuery.each(obj1, function(i, v) {
						var temp = obj1[i];
							content += '<option value="' + temp + '" >' + temp
								+ '</option>';
					});

					content += '</select>';
					content += '</div>';
					content += '</div>';
					content += '</div>';
					content += '<table class="table table-striped table-bordered" id="radiud_ip_table">';
					content += '<thead>';
					content += '<tr>';
					content += '<th> Radius Id</th> ';
					content += '<th> Radius Ip</th> ';
					content += '<th> Radius Secret Key</th> ';
					content += '<th> App Id </th>';
					content += '<th> Source Type</th>';
					content += '<th> Source Url</th>';
					content += '<th> Source Domain</th>';
					content += '<th> Status</th>';
					content += '<th> ADFS Url</th>';
					content += '<th> Action</th>';
					content += '</tr>';

					content += '<tr>';
					content += '<th> Radius Id</th> ';
					content += '<th> Radius Ip</th> ';
					content += '<th> Radius Secret Key</th> ';
					content += '<th> App Id </th> ';
					content += '<th> Source Type</th>';
					content += '<th> Source Url</th>';
					content += '<th> Source Domain</th>';
					content += '<th> Status</th>';
					content += '<th> ADFS Url</th>';
					content += '<th> Action</th>';
					content += '</tr>';
					content += '</thead>';
					var tempSourceURL;
					var tempSourceDomain;
					jQuery.each(obj2,
									function(i, v) {

										if (v.sourceURL == undefined)
											tempSourceURL = "";
										else
											tempSourceURL = v.sourceURL;
										if (v.sourceDomain == undefined)
											tempSourceDomain = "";
										else
											tempSourceDomain = v.sourceDomain;

										content += "<tr><td>"
												+ v.radiusId
												+ "</td><td>"
												+ v.radiusIP
												+ "</td><td>"
											//	+ v.radiusSecretKey
												 +"******************<img src='/mfid/web/img/password_hide.png' onClick='showHidePassword()' class='showHidePassword' data-hide-pwd='"+v.radiusSecretKey+"' align='right' height='8' width='18' id='EYE'>"
												+ "</td><td>"
												+ v.appId
												+ "</td><td>"
												+ v.sourceType
												+ "</td><td>"
												+ tempSourceURL
												+ "</td><td>"
												+ tempSourceDomain
												+ "</td><td>"
												+ "active"
												+ "</td><td >" 
                                                + v.adfsUrl
												+ "</td><td>"
												+ "<a href='javascript:;' class='edit'>Edit</a> | <a href='javascript:;' class='delete'>Delete</a></td></tr>";
							});
					content += "</table><div class='form-actions form-actions2'>";
					content += "<button type='button' id='radiud_ip_table_new' class='btn green'>Add New <i class='icon-plus'></i></button>";
					content += "</div>";

					$('#manage_radius_data').html(content);
					$("#manage_radius_data").css("width", "100%");

					oTable = jQuery('#radiud_ip_table').dataTable({
						"aaSorting" : [ [ 1, 'asc' ] ]
					}).columnFilter({
						sPlaceHolder : "head:after",
						aoColumns : [ null, {
							type : "text"
						}, {
							type : "text"
						}, {
							type : "text"
						}, {
							type : "text"
						}, {
							type : "text"
						}, {
							type : "text"
						}, {
							type : "text"
						}, {
							type : "text"
						}, {
							type : "text"
						}, null ]
					});
				}

			});

}

$(document).on('change', '#sourceType', function() {
	var val = $(this).val().trim();
	if (val == 'LDAP' || val == 'Active Directory' || val == 'Radius'  || val == 'ADFS') {
		$('#sourceData').show(500);
		$('#sourceDataADFS').show(); 
		
	} else if (val == 'Authshield') {
		$('#sourceData').hide(500);
		$('#sourceDataADFS').hide();
		 
	}

});

$("#startRadius").click(function() {
	var attr = $(this).attr('data-toggle');
	if (attr == '#_start') {
		startRadius(attr);
	}
	if (attr == '#_stop') {
		stopRadius(attr);
	}

});

function checkRadius() {
	var res;
	$.ajax({
		type : "POST",
		url : "admin_checkRadius.action",
		data : "{}",
		async : false,
		dataType : "text",
		success : function(response) {
			if ($.trim(response) == "sessionout") {
				alert(response);
				testVal = document.getElementById('loginPage').value
				window.location.replace(testVal);
			} else {
				res = $.trim(response);
				$("p").hide();
			}
		}
	});

	return res;
}

function startRadius(attr) {

	$.ajax({
		type : "POST",
		url : "admin_startRadius.action",
		data : "{}",
		dataType : "text",
		success : function(response) {
			if ($.trim(response) == "sessionout") {
				alert(response);
				testVal = document.getElementById('loginPage').value
				window.location.replace(testVal);
			}
			else if ($.trim(response) == "start") {
				if (attr == '#_start') {
					$(attr).show();
					$('#_stop').hide();
					$('#startRadius').attr('data-toggle', '#_stop');
					$('#startRadius').html('Stop');
					$('#radiusId').text("Radius server started");
				}

			}
		}
	});
}

function stopRadius(attr) {

	$.ajax({
		type : "POST",
		url : "admin_stopRadius.action",
		data : "{}",
		dataType : "text",
		success : function(response) {
			if ($.trim(response) == "sessionout") {
				alert(response);
				testVal = document.getElementById('loginPage').value
				window.location.replace(testVal);

			} else if ($.trim(response) == "stop") {
				if (attr == '#_stop') {
					$(attr).show();
					$('#_start').hide();
					$('#startRadius').attr('data-toggle', '#_start');
					$('#startRadius').html('Start');
					$('#radiusId').text("Radius server stopped");
				}
			}
		}
	});

}

function manageRadiudForm() {
	var content = '<div class="span6 offset3">';
	content += '<div style="border:1px solid #ddd; padding:20px;">';
	content += '<form action="#" id="redius_form" class="form-horizontal">';
	content += '<div class="control-group">';
	content += '<label class="span6">Radius IP </label>';
	content += '<div class="span6">';
	content += '<input id="radiusIP" type="text" class="span12" />';
	content += '</div>';
	content += '</div>';

	content += '<div class="control-group">';
	content += '<label class="span6">Radius Secret Key </label>';
	content += '<div class="span6">';
	content += '<input id="secretkey" type="text" class="span12" />';
	content += '</div>';
	content += '</div>';

	content += '<div class="control-group">';
	content += '<label class="span6">App ID </label>';
	content += '<div class="span6">';
	content += '<input id="applId" type="text" class="span12" />';
	content += '</div>';
	content += '</div>';

	content += '<div class="control-group">';
	content += '<label class="span6">Source Type </label>';
	content += '<div class="span6">';
	content += '<select id="sourceType"  class="span12" >';
	content += '<option value="">-select source type-</option>';
	content += '<option value="LDAP">LDAP</option>';
	content += '<option value="Active Directory">Active Directory</option>';
	content += '<option value="Authshield">Authshield</option>';
	content += '<option value="Radius">Radius</option>';
	content += '<option value="ADFS">ADFS</option>';
	content += '</select>';
	content += '</div>';
	content += '</div>';
	content += '<div id="sourceData" style="display:none;">';
	content += '<div class="control-group">';
	content += '<label class="span6">Source Url / Source RadiusIP</label>';
	content += '<div class="span6">';
	content += '<input id="sourceURL" type="text" class="span12" />';
	content += '</div>';
	content += '</div>';
	content += '<div class="control-group">';
	content += '<label class="span6">Source Domain / Source Secret Key </label>';
	content += '<div class="span6">';
	content += '<input id="domain" type="text" class="span12" />';
	content += '</div>';
	content += '</div>';
	content += '</div>';
	
	
	content += '<div id="sourceDataADFS" style="display:none;">';
	content += '<div class="control-group">';
	content += '<label class="span6">ADFS Url </label>';
	content += '<div class="span6">';
	content += '<input id="adfsUrl" type="text" class="span12" />';
	content += '</div>';
	content += '</div>';
	content += '</div>';
	content += '<button type="button" onclick="addRadiusIP()" class="btn btn-primary" style="margin-left: 23em;" id="radiud_ip_table_add">Submit</button>';
	content += '<button type="button"  onclick="hideManageRadius()" class="btn btn-primary pull-right" id="cancel_id">Cancel</button>';
	
	content += '<div class="clearfix"></div>';
	content += '</form>';
	content += '</div>';
	content += '</div>';
	$('#redius_ip_form').html(content);

}

function addRadiusIP() {

	var radiusIP = document.getElementById("radiusIP").value;
	var secretkey = document.getElementById("secretkey").value;
	var applId = document.getElementById("applId").value;
	var sourceType = document.getElementById("sourceType").value;
	var sourceURL = document.getElementById("sourceURL").value;
	var domain = document.getElementById("domain").value;
	var adfsUrl = document.getElementById("adfsUrl").value;
	//var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	//var ipformat = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
	if (radiusIP == "") {
		alert("Please enter radius ip");
	}
	/*else if (!radiusIP.match(ipformat)) {
		alert("You have entered an invalid radius IP address");
	}*/
	else if (secretkey == "") {
		alert("Please enter radius SecretKey");
	} else if (secretkey.match(/\s/g)) {

		alert("Invalid radius SecretKey");

	} else if (applId == "") {
		alert("Please enter AppId");
	} else if (isNaN(applId) || applId.indexOf(" ") != -1)
	// else if(isNaN(applId)||Math.floor(applId) != applId)
	{
		alert("AppId should be numeric");
	}
	// start code for bug id 222 , added by abhimanyu
	else if ($.trim(applId).length > 9) {
		alert("AppId should be less than 9 digits");
	}
	// end code for bug id 222 , added by abhimanyu
	else if (sourceType == "" || sourceType == null || sourceType == undefined) {
		alert("Please select source type");
	}

	else if (sourceType != "Authshield" && sourceURL == "")
		alert("Please enter Source Url / Source RadiusIP");

	else if (sourceType != "Authshield" && domain == "")
		alert("Please enter Source Domain / Source Secret Key");
	else if (sourceType == "ADFS" && adfsUrl == "")
		alert("Please enter ADFS Url");
	else {
		callAddRadius(radiusIP, secretkey, applId, domain, sourceType,
				sourceURL,adfsUrl);
	}

}

function callAddRadius(radiusIP, secretkey, applId, domain, sourceType,
		sourceURL, adfsUrl) {

	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats
	var dataString = "radiusIP=" + encodeURIComponent(radiusIP) + "&radiusSecretKey=" + encodeURIComponent(secretkey)
			+ "&appId=" + encodeURIComponent(applId) + "&domain=" + encodeURIComponent(domain) + "&sourceType="
			+ encodeURIComponent(sourceType) + "&sourceURL=" + encodeURIComponent(sourceURL) + '&csrfPreventionSalt='
			+ strutsToken+'&adfsUrl='+encodeURIComponent(adfsUrl);
	try {
		$.ajax({
			type : "POST",
			url : "admin_addRadiusIP.action",
			data : dataString,
			dataType : "text",
			success : function(response) {
				alert(response);
				resVal = response;
				if ($.trim(response) == "sessionout") {
					testVal = document.getElementById('loginPage').value
					window.location.replace(testVal);
				} else if ($.trim(response) == "success") {
					manageRadiusIp();
					$('#redius_ip_form').hide(500);
					document.getElementById("redius_form").reset();
				}
			}
		});
	} catch (e) {
		alert(e);
	}
}

function hideManageRadius(){
	$('#redius_ip_form').hide(500);
	document.getElementById("redius_form").reset();
}

function deleteRadiusIP(radiusIP, applId) {
	var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats

	try {
		  $.ajax({
					type : "POST",
					url : "admin_deleteRadiusIP.action?radiusIP=" + radiusIP
							+ "&appId=" + applId + '&csrfPreventionSalt='
							+ strutsToken,
					data : "{}",
					dataType : "text",
					success : function(response) {
					
						if ($.trim(response) == "sessionout") {
							alert("Session Timeout...");
							testVal = document.getElementById('loginPage').value
							window.location.replace(testVal);
						}
						if ($.trim(response) == "success") {

							alert(response);
							manageRadiusIp();

						}
					}
				});

	} catch (e) {
		alert(e);
	}

}

function updateRadiusIP(oldRadiusIP, radiusIP, radiusSecretKey, applId,
		sourceType, sourceURL, sourceDomain , adfsUrl ) {

 
	try {
		var strutsToken = $('[name=csrfPreventionSalt]').val();// added by puneet vats
		//var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	//	var ipformat = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
		if (radiusIP == "") {
			alert("Please enter radius ip");
		}
/*		 else if(!radiusIP.match(ipformat)) {
			 alert("You have entered an invalid radius IP address");
		}*/

		else if (radiusSecretKey == "") {
			alert("Please enter radius SecretKey");
		} else if (radiusSecretKey.match(/\s/g)) {

			alert("Invalid radius SecretKey");

		} else if (applId == "") {
			alert("Please enter AppId");
		} else if (isNaN(applId) || applId.indexOf(" ") != -1) {
			alert("AppId should be numeric");
		}

		else if (sourceType != "Authshield" && sourceURL == "")
			alert("Please enter Source Url / Source RadiusIP");

		else if (sourceType != "Authshield" && sourceDomain == "")
			alert("Please enter Source Domain / Source Secret Key");
		else if (sourceType == "ADFS" && adfsUrl == "")
			alert("Please enter ADFS Url");
		else {
			var dataString = "oldRadiusIP=" + encodeURIComponent(oldRadiusIP) + "&radiusIP="
					+ radiusIP + "&radiusSecretKey=" + encodeURIComponent(radiusSecretKey)
					+ "&appId=" + encodeURIComponent(applId) + "&domain=" + encodeURIComponent(sourceDomain)
					+ "&sourceType=" + encodeURIComponent(sourceType) + "&sourceURL=" + encodeURIComponent(sourceURL)
					+ '&csrfPreventionSalt=' + strutsToken+'&adfsUrl='+encodeURIComponent(adfsUrl);
		$.ajax({
				type : "POST",
				url : "admin_updateRadiusIP.action",
				data : dataString,
				dataType : "text",
				success : function(response) {

					resVal = response;
					if ($.trim(response) == "sessionout") {
						testVal = document.getElementById('loginPage').value
						window.location.replace(testVal);
					}
					if ($.trim(response) == "success") {
						alert(response);
						manageRadiusIp();
					} else {
						alert(response);
						manageRadiusIp();
					}
				}
			});
		}

	} catch (e) {
		alert(e);
	}

}



function showHidePassword(e) {
    e = e || window.event;
    e = e.target || e.srcElement;
    var imageSrc=$(event.target).attr('src');
    if(imageSrc.indexOf("password_hide.png") != -1) 
	  {  $(event.target).attr('src','/mfid/web/img/password_show.png');
	     $(event.target).parent().html($(event.target).parent().html().replace("******************", $(event.target).attr('data-hide-pwd')));}
	  else
	  {  $(event.target).attr('src','/mfid/web/img/password_hide.png');
	    $(event.target).parent().html($(event.target).parent().html().replace($(event.target).attr('data-hide-pwd'),"******************"));}
 }

