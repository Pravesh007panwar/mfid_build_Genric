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
alert(11);
/*<![CDATA[*/
var requestData = '${data}';

//alert("==================        trft "+<s:property value="%{#data}" />)
//alert("==================   "+<%=request.getAttribute("data")%>);
var request = JSON.parse(requestData);
alert(request);
setTimeout(function() {
    u2f.register(request.registerRequests, request.authenticateRequests,
    function(data) {
        var form = document.getElementById('form');
        var reg = document.getElementById('tokenResponse');
        if(data.errorCode) {
            alert("U2F failed with error: " + data.errorCode);
            return;
        }
        reg.value=JSON.stringify(data);
        form.submit();
    });
}, 1000);
/*]]>*/
</script>

</head>
<body>
    <p>Touch your U2F token.</p>
        <form method="post" action="admin_register" id="form" onsubmit="return false;">
            <input type="text" name="tokenResponse" id="tokenResponse"/>      
            
        </form>

</body>
</html>