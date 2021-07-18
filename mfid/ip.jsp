<%@ page import="java.util.Random"%>
<%String ip=request.getHeader("X-Real-IP"); %>
<%if( ip != null ) {
     //  out.print(ip);
String query = "{'query':'"+ip+"'}";
       out.println(query.replace("'", "\"")); 

   }
else { %>
       
  <%
String query = "{'query':'"+request.getRemoteAddr()+"'}";
       out.println(query.replace("'", "\"")); 
 %>
 

<%
   }
%>
