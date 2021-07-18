<%@page import="com.innefu.mfid.dataaccess.om.UserMapping,com.mfid.common.util.PropertyFileUtility"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib prefix="s" uri="/struts-tags" %>
    <%@ page import="java.util.*, java.lang.*,com.mfid.common.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv='expires' content='0'>
<meta http-equiv='pragma' content='no-cache'>


<% 

String titleVal=new PropertyFileUtility().fetchPropertyFileAttribute("title.value");
 %>

<title><%=titleVal%></title>
<link href="<%= request.getContextPath() %>/web/assets/uniform/css/default.css" rel="stylesheet" />
<script src="<%= request.getContextPath() %>/web/js/jquery-3.3.1.min.js"></script>
<script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.1.12.1.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/web/assets/uniform/jquery.uniform.standalone.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/web/js/custom/switch_app_domain.js"> </script>
<script src="<%= request.getContextPath() %>/web/js/jquery.browser.js"></script>
<script src="<%= request.getContextPath() %>/web/js/jquery.browser.min.js"></script>
<script> var contextPath ='<%= request.getContextPath() %>'; </script>
	
 <style>
	 .test_t{float:left; width: 100%;  font-size:12.5px; background:rgba(3, 156, 234, 0.88); color:#fff; border:none;  margin:12px 1px; border-radius: 4px !important;}
 
 .ui-datepicker-prev span {
    background-image: url(<%= request.getContextPath() %>/web/img/icon_arrow_left_black.png) !important;
        background-position: 0px 0px !important;
}

.ui-datepicker-next span {
    background-image: url(<%= request.getContextPath() %>/web/img/icon_arrow_right_black.png) !important;
        background-position: 0px 0px !important;
}



/* If you want you can use font-face */
@font-face {
    font-family: 'BebasNeueRegular';
    src: url('BebasNeue-webfont.eot');
    src: url('BebasNeue-webfont.eot?#iefix') format('embedded-opentype'),
       // url('BebasNeue-webfont.woff') format('woff'),
        // url('BebasNeue-webfont.ttf') format('truetype'),
         url('BebasNeue-webfont.svg#BebasNeueRegular') format('svg');
    font-weight: normal;
    font-style: normal;
}

.container {width: 960px; margin: 0 auto; overflow: hidden;}


 </style>
 
 
  <script>
  
/*   $(document).ready(function() {
      window.history.pushState(null, "", window.location.href);        
      window.onpopstate = function() {
          window.history.pushState(null, "", window.location.href);
      };
  }); 
  
  function preventBack(){window.history.forward();}
  setTimeout("preventBack()", 0);
  window.onunload=function(){null}; */
  
/*   $(document).ready(function() {
      function disableBack() { window.history.forward() }

      window.onload = disableBack();
      window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
  }); */
    
  if(!!window.performance && window.performance.navigation.type == 2){
		 window.location=contextPath+"/login_showLogin.action";
	}

	if(window.top !== window.self) {
	window.top.location.replace(window.self.location.href);
		//  alert('For security reasons, frames are not allowed.');
	setInterval(function(){document.body.innerHTML='';},1);
	}

if (!navigator.onLine) {
	document.body.innerHTML = 'Loading...';
	window.location = 'ErrorPage.html';
	}
	  
	  
	  
(function (global) { 

    if(typeof (global) === "undefined") {
        throw new Error("window is undefined");
    }

    var _hash = "!";
    var noBackPlease = function () {
        global.location.href += "#";

        // making sure we have the fruit available for juice (^__^)
        global.setTimeout(function () {
            global.location.href += "!";
        }, 50);
    };

    global.onhashchange = function () {
        if (global.location.hash !== _hash) {
            global.location.hash = _hash;
        }
    };

    global.onload = function () {            
        noBackPlease();

        // disables backspace on page except on input fields and textarea..
        document.body.onkeydown = function (e) {
            var elm = e.target.nodeName.toLowerCase();
            if (e.which === 8 && (elm !== 'input' && elm  !== 'textarea')) {
                e.preventDefault();
            }
            // stopping event bubbling up the DOM tree..
            e.stopPropagation();
        };          
    }

})(window);  


function getPreviousDate(days)
{

    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate()-parseInt(days);
    var minutes = d.getMinutes();
    var output =d.getFullYear()+'-'+((''+month).length<2 ? '0' : '') + month+'-'+((''+day).length<2 ? '0' : '') + day+ ' '+d.getHours() +':00';
    return output;
}


</script>

</head>
<body>

<%

UserMapping userMapping=null;
int showAlertMessageForNotAssociatedUser=0;
String radiusStatus=null;
String helpPath=null;
String originalUserName="";
try{
	 Map application1 = (Map) ActionContext.getContext().get("application");
    Map session1 = (Map) ActionContext.getContext().get("session");
 userMapping=(UserMapping) session1.get("loginUserMapping");
 radiusStatus=(String) application1.get(ApplicationConstants.RADIUS_STATUS);

  helpPath=new PropertyFileUtility().fetchPropertyFileAttribute("help.path");
  if(helpPath == null)
	  helpPath="#";
  if(userMapping.getLicenseDetail().getId() == 0 && userMapping.getRole().getId() == 5)
	  showAlertMessageForNotAssociatedUser=1;
  originalUserName = (String)session1.get(ApplicationConstants.ORIGINAL_USER_NAME);
}
catch(Exception e){
	e.printStackTrace();
}
%>
	<!-- BEGIN HEADER -->
	
	<div id="header" class="navbar navbar-inverse navbar-fixed-top">
		<!-- BEGIN TOP NAVIGATION BAR -->
		<div class="navbar-inner">
			<div class="container-fluid">			
				<!-- BEGIN LOGO -->
				<a class="brand" href="<%=request.getContextPath()%>/login_showDashboardAgain">
				   <!--  <img src="img/logo.png" alt="Admin Lab" />--> 
				  <img src="<%=request.getContextPath() %>/web/img/logo.png" alt="Admin Lab">
				</a>
				<!-- END LOGO -->
			<!-- BEGIN RESPONSIVE MENU TOGGLER -->
				<a class="btn btn-navbar collapsed" id="main_menu_trigger" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="arrow"> Menu</span>
				</a>
                <div class="pull-left">
                	<ul class="top_link_bar">                	
                		<li><i class="icon-globe" title="Domain"></i><span style="color:#fff"><%=SessionUtil.getDomain().getDomainName()%></span></li>
                        <li><i class="icon-dashboard" title="Application"></i> <span style="color:#fff"><%=SessionUtil.getApplication().getApplicationName()%></span></li>                       
                        <li><i class="icon-signin" title="Role"></i><span style="color:#fff"> <%=SessionUtil.getRole().getRoleDescription()%></span></li>
                        <li><i class="icon-time" title="Last Login Time"></i><span style="color:#fff"><%=SessionUtil.getLastLoginTime()%></span></li>
                        <!--  <li><i class="icon-time"></i></li> -->
                       	<!--  <li><span  id="radiusId"></span></li> -->
                    </ul>
                </div>
                
                <!-- END RESPONSIVE MENU TOGGLER -->
               
                <div class="right_bblock"> 
                <div class="right_bblock_in">             
                <div class="pull-left select_box_box">
				 <s:form name="appForm">
				 	<%
				 	try{
				 		if(userMapping.getRole().getId()==1 || userMapping.getRole().getId()==2){%>
				 		<s:select  cssClass="test_t"  id="domainId" name="switchDomainName" headerKey="select"  headerValue="--Switch Domain--"  list="#session.domainList"/>
				 	
				 	<%}}
				 	catch(Exception e)
				 	{
				 		e.printStackTrace();
				 	}
				 	%>
				 	<%
	                try{
				 	 %>
	                		 <s:select  cssClass="test_t" id="appId" name="switchAppName" headerKey="select" headerValue="--Switch Application--"    list="#session.applicationList"/> 
	              	<%
				 	}

		catch(Exception e)
				 	{
				 		e.printStackTrace();
				 	}
				 	%> 
				 	 </s:form>                 
                 </div>
                 
				<div class="top-nav pull-left">
                    <ul class="nav top-menu">
                        <!-- END SUPPORT -->
						<!-- BEGIN USER LOGIN DROPDOWN -->
                       
						<li class="dropdown">
							<a href="" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="web/img/user.jpg" alt="">
                                <span class="username"  style="color:#fff" ><%=originalUserName%></span>
                                
									
							<b class="caret"></b>
							</a>
							<ul class="dropdown-menu">
								<!--  <li><a href="index.html"><i class="icon-user"></i> My Account</a></li>-->
								<li><a href="<%= request.getContextPath() %>/admin_showMyAccount.action?a=admin"><i class="icon-user"></i> My Account</a></li>
								<li class="divider"></li>
								<li><a href="<%= request.getContextPath() %>/admin_showChangePassword.action"><i class="icon-user"></i> Change Password</a></li>
								<li class="divider"></li>
								<li><a href="<%= request.getContextPath() %>/logout_logOut.action"><i class="icon-key"></i> Log Out</a></li>
							</ul>
						</li>
						<%if(userMapping.getRole().getId()!=5 && userMapping.getRole().getId()!=6 && userMapping.getRole().getId()!=7  ){ %>
						<a href="<%=helpPath%>"  target="_blank"><img src="web/img/help-icon.png" height="45" width="35"  style="float: left;margin-top: 4px;" title="Help" alt=""></a>
						<%} %>
						<!-- END USER LOGIN DROPDOWN -->
					</ul>
					<!-- END TOP NAVIGATION MENU -->
                </div>
               
				</div>
				</div>
				
				
               
                <!-- END  NOTIFICATION -->
			</div>
		</div>
		<!-- END TOP NAVIGATION BAR -->
	</div>
	<!-- END HEADER -->
	<script>
	try{
	window.onunload = function(){}; // add line for Bug id 393 , added by abhimanyu
      jQuery(document).ready(function() {
		
		$('#domainId').change(function(){
			ajaxEditFunctionCallForDomain();
		});
		
		$('#appId').change(function(){
			ajaxEditFunctionCall();
		});
		
         // initiate layout and plugins
         var status='<%=radiusStatus%>';
      document.getElementById("radius_status").value=status;
     // alert("radius value==="+document.getElementById("radius_status").value);
         $('#radiusId').text(status);
      });
      }
      catch(e)
      {
      	alert(e);
      	}
      	
   
      function isNumber(evt) {
    	    evt = (evt) ? evt : window.event;
    	    var charCode = (evt.which) ? evt.which : evt.keyCode;
    	    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    	        return false;
    	    }
    	    return true;
    	}
      
     </script>
     
     <script type="text/javascript">
$(document).ready(function() {
	 
	
	 
// Create two variable with the names of the months and days in an array
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

// Create a newDate() object
var newDate = new Date();
// Extract the current date from Date object
newDate.setDate(newDate.getDate());
// Output the day, date, month and year  
  
//$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

/* setInterval( function() {
	// Create a newDate() object and extract the seconds of the current time on the visitor's
	var seconds = new Date().getSeconds();
	// Add a leading zero to seconds value
	$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
	},1000);
	 */
/* setInterval( function() {
	// Create a newDate() object and extract the minutes of the current time on the visitor's
	var minutes = new Date().getMinutes();
	// Add a leading zero to the minutes value
	$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000); */
	
//setInterval( function() {
	// Create a newDate() object and extract the hours of the current time on the visitor's
	//var hours = new Date().getHours();
	// Add a leading zero to the hours value
	//$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    //}, 1000);	
});  

var showAlertMessageForNotAssociatedUser = <%=showAlertMessageForNotAssociatedUser%>;

function showAjaxLoader(){
	$("#loading").css("display","block");
    $('body').css("opacity","0.8");
}

function hideAjaxLoader(){
	$("#loading").css("display","none");
    $('body').css("opacity","1");
}

</script>
	
	<style>

#modalContainer {
	background-color:rgba(0, 0, 0, 0.3);
	position:fixed;
	width:100%;
	height:100% !important;
	top:0px;
	left:0px;
	z-index:10000;
	
}


div#alertBox {
    width: 350px;
    background: #fff;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50% !important;
    transform: translate(-50%, -50%);
}
    
#alertBox h1 {
    font-size: 20px;
    padding: 0 20px;
    margin: 0;
    background: #039cea;
    color: #fff;
}

#alertBox p {
    font-size: 16px;
    padding: 15px;
}


#alertBox a#closeBtn {
    background: #039cea;
    padding: 5px;
    font-size: 13px;
    width: 50px;
    display: block;
    color: #fff;
    text-align: center;
    float: right;
    margin: 10px;
}
</style>

<script>
var ALERT_TITLE = "Alert !";
var ALERT_BUTTON_TEXT = "Ok";

if(document.getElementById) {
	window.alert = function(txt) {
		createCustomAlert(txt);
	}
}

function createCustomAlert(txt) {
	d = document;

	if(d.getElementById("modalContainer")) return;

	mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
	mObj.id = "modalContainer";
	mObj.style.height = d.documentElement.scrollHeight + "px";
	
	alertObj = mObj.appendChild(d.createElement("div"));
	alertObj.id = "alertBox";
	if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
	alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
	alertObj.style.visiblity="visible";

	h1 = alertObj.appendChild(d.createElement("h1"));
	h1.appendChild(d.createTextNode(ALERT_TITLE));

	msg = alertObj.appendChild(d.createElement("p"));
	//msg.appendChild(d.createTextNode(txt));
	msg.innerHTML = txt;

	btn = alertObj.appendChild(d.createElement("a"));
	btn.id = "closeBtn";
	btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
	btn.href = "#";
	btn.focus();
	btn.onclick = function() { removeCustomAlert();return false; }

	alertObj.style.display = "block";
	
}

function removeCustomAlert() {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
function ful(){
alert('Alert this pages');
}



/* if(!!window.performance && window.performance.navigation.type == 2){
	 window.location=contextPath+"/login_showLogin.action";
}

if(window.top !== window.self) {
window.top.location.replace(window.self.location.href);
	//  alert('For security reasons, frames are not allowed.');
setInterval(function(){document.body.innerHTML='';},1);
} */
</script>
	
	
</body>

  <input type="hidden" id="radius_status"/>
</html>