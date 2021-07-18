<%@page import="com.mfid.common.util.DataBaseUtility"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="com.mfid.common.util.StringUtil"%>
<%@page import="com.mfid.common.util.SessionUtil"%>
<%@ page import="java.util.*, java.lang.*,java.util.*,com.mfid.common.*,com.mfid.common.util.PropertyFileUtility ,com.innefu.mfid.dataaccess.om.*,com.opensymphony.xwork2.ActionContext" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>


<script type="text/javascript">
 jQuery(document).ready(function() { 
//	alert("ready");
       var testVal='<%= request.getContextPath() %>'+"/secureLogin_showSecureLogin.action";
   document.getElementById('loginPage').value= testVal;  
     
		 
      });

</script>
<%
 

	%>

<body>
	<ul class="sidebar-menu">
				<li class="has-sub open active" >
				<a data="dashboard" href="<%= request.getContextPath() %>/secureLogin_showDashboard.action?a=dashboard">
					    <span class="icon-box"> <i class="icon-dashboard"></i></span> Dashboard                     
					   
                    </a>
				</li>
				<li class="has-sub open active">
					<a href="javascript:;" data="user" class="">
					    <span class="icon-box"> <i class="icon-user"></i></span> User
					    <span class="arrow open"></span>
					</a>
					<ul class="sub">
					
					
					<% 
					
					/**
					   * @author puneet
					   * Commented by puneet vats for as properties moved to database
					   */

					 //String secureLoginAuth=new PropertyFileUtility().fetchPropertyFileAttribute("secure.login.auth");				
					   String secureLoginAuth=new DataBaseUtility().getPropertiesValues().getLoginAuth();
					
                     
					  if(secureLoginAuth != null && !secureLoginAuth.equalsIgnoreCase("AD") && !secureLoginAuth.equalsIgnoreCase("LDAP"))
					{ %><li><a href="<%= request.getContextPath() %>/admin_showSecureChangePassword.action?a=user">Change Password</a></li> <%}%>
					<%
					UserMapping um = null;
					try{
						Map session1 = (Map) ActionContext.getContext().get("session");
						 um=(UserMapping) session1.get("loginUserMapping");
						
						
						 if( um != null  && um.getLicenseDetail().getId()!=0 && (um.getAuthenticationType().getId()==3 ||  um.getAuthenticationType().getId()==7 ||  um.getAuthenticationType().getId()==6 )){
					    if(!"NIC".equalsIgnoreCase(new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.CLIENT_NAME))){ %>
                        <li><a href="<%= request.getContextPath() %>/admin_showSecureQRCode.action?a=user">Scan&nbsp;QR&nbsp;Code </a></li>
                        <%}
						 }
						 else  if( um != null && um.getLicenseDetail().getId()!=0 && (um.getAuthenticationType().getId()==1)){
							 if(!"NIC".equalsIgnoreCase(new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.CLIENT_NAME))){  %>
		                        <li><a href="<%= request.getContextPath() %>/admin_showSecureQRCode.action?a=user">Token Activation Policy</a></li>
		                        <%}
						      }
						 if( um != null  && um.getLicenseDetail().getId()!=0 && (um.getAuthenticationType().getId()==7 ||  um.getAuthenticationType().getId()==6 ) ){
							    %>
							   
		                       <li><a href="<%= request.getContextPath() %>/admin_showManageActiveDevice.action?a=user">Manage Activated Devices</a></li>
		                          <li><a href="<%= request.getContextPath() %>/admin_showManageWifiDevice.action?a=user">Manage Wifi Devices</a></li>
		                            
		                        <%
								 } 
						 if( um != null  && (um.getAuthenticationType().getId()==7) || um.getAuthenticationType().getId()==5 ||  um.getAuthenticationType().getId()==6){
							    %>
							    <li><a href="<%= request.getContextPath() %>/admin_showUserContryPolicy.action?a=user">User Country Policy</a></li>
		                       <%
								 } 
						 
						 
						 
					}
					catch(Exception e)
					{ e.printStackTrace();
					}
                        %>
                    <li><a href="<%= request.getContextPath() %>/admin_showU2FRegistration.action?a=user">U2F Registration</a></li>
                    				
			</ul>
			</li>
			<li class="has-sub open active">
						 <%  try{ int counterDownloadFile = Integer.parseInt(new PropertyFileUtility().fetchPropertyFileAttribute("installer.file.allowed.count"));
			    if(counterDownloadFile != 0 &&  um.getLicenseDetail().getId()!=0)
			     {
			 
			 %>
					<a href="javascript:;" data="user" class="">
					    <span class="icon-box"> <i class="icon-save"></i></span> Download
					    <span class="arrow open"></span>
					</a>
					<ul class="sub">
					   <%  try{ for(int i = 1 ; i <= counterDownloadFile ; i++){  
		                        String downLoadFile[] = new PropertyFileUtility().fetchPropertyFileAttribute("installer.file"+i).split(","); %> 
                           <li><a href="<%= request.getContextPath() %>/secureLogin_download.action?fileName=<%=downLoadFile[0]%>"><%=downLoadFile[1]%></a></li>
                                  <%  } }catch(Exception e){} %>
		                       
		                       
		                  </ul>     
		                    </li>   
		         <% }}
					catch(Exception e)
					{ e.printStackTrace();
					} %>
					
					
			<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Modal header</h3>
	</div>
	<div id="mBody" class="modal-body">
		wait..
	</div>
	<div class="modal-footer">
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>
<input type="hidden" id="loginPage" /> 

</body>

<script type="text/javascript">
	 $(document).ready(function()
	{	
	 
 	var param = getParameterByName("a");
 	 
 	// alert("param "+param );
 	/* if (/script/i.test(param) || /prompt(/xss/)/i.test(param))
 	    {return ;}
 	else */ if(param!=undefined)
	{
		if(param!='dashboard'&&param!='')
		{	
			
			$('#sidebar > ul.sidebar-menu > li').removeClass("active");
		}
		
		$(".arrow","#sidebar .has-sub > a[data="+param+"]").addClass("open");
		$("#sidebar .has-sub > a[data="+param+"]").parent().addClass("open").addClass("active");
		$("#sidebar .has-sub > a[data="+param+"]").next().slideDown();
		
	} 
	
		
		});
		
function getParameterByName( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
</script>
</html>