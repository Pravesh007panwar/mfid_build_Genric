function resyncClock() {
	$.ajax({
		type : "POST",
		url : "admin_resyncOffset.action",
		dataType : "text",
		success : function(response) {
			$('#mBody').html(response);
			setTimeout(function() {
				$('#mBody').html('wait...');
				$('#myModal').modal('hide')
			}, 1000);
			openResyncDetail(false, false);
		}
	});
}