function restartPushServer() {
	$.ajax({
		type : "POST",
		url : "admin_restartXMPPServer.action",
		dataType : "text",
		success : function(response) {
			$('#mBody').html(response);
			setTimeout(function() {
				$('#mBody').html('wait...');
				$('#myModal').modal('hide')
			}, 1000);
			openPushServerDetail(false, false);
		}
	});
}