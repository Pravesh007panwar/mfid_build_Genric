     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>

<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
	
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>	
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />  
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	<script src="<%= request.getContextPath() %>/web/js/u2f/u2f-api.js" type="text/javascript"></script>

<script>
/*<![CDATA[*/
var requestData = '${data}';
//var requestData='{"authenticateRequests":[{"challenge":"hUi8L-jQ9j-pL0HKp4FGFlqyZ-WP9TV5_OsnCiDyN3U","appId":"https://localhost","keyHandle":"Ig8aaEClafGcC1xqv_-uMY8u3S-dgN3hW-VXq4arD9kDz1nZfH4VSmLufsq-zJztHKG-Qe_SqoH5F2bngPpt9g","version":"U2F_V2"}]}';
alert(requestData);
var request = JSON.parse(requestData);
setTimeout(function() {
    u2f.sign(request.authenticateRequests,
    function(data) {
        if(data.errorCode) {
            alert("U2F failed with error code: " + data.errorCode);
            return;
        }
        document.getElementById('tokenResponse').value = JSON.stringify(data);
        document.getElementById('form').submit();
    });
}, 1000);
/*]]>*/
</script>

</head>
<body>
 <p>Touch your U2F token to authenticate.</p>
        <form method="post" action="admin_authenticate" id="form">
            <input type="text" name="tokenResponse" id="tokenResponse"/>
        </form>
        
        <a href='<spring:url value="/userHome" />'>Home Page</a>

</body>
</html>