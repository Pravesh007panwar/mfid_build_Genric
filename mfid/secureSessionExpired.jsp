<!DOCTYPE html>
<%@ page import="java.util.Map,com.mfid.common.ApplicationConstants,com.opensymphony.xwork2.ActionContext" %>
<%
Map<Object,Object> session1 = (Map) ActionContext.getContext().get(ApplicationConstants.SESSION);
session1.clear();
%>
<head>
	<title>Session Expired....</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
 
</head>
<body>
	
  <br/>  <br/>  <br/>   
  
  <center><img src="<%= request.getContextPath() %>/web/img/session-expired.jpg" alt="session has been expired......" height="300" width="300"></center>
   <br/>  
  <center>
  <h4>
  This session has been expired (possibly due to multiple concurrent logins being attempted as the same user).
  .....click here to <a href="<%= request.getContextPath() %>/user">Re-Login</a>.
  </h4>
  
  </center>

</body>
</html>
