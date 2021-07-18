<!DOCTYPE html>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<%@ page import="com.mfid.common.ApplicationConstants,com.mfid.common.util.PropertyFileUtility" %>
  <meta charset="utf-8" />
  <title>Login page</title>
  <link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv='expires' content='0'>
  <meta http-equiv='pragma' content='no-cache'>
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <meta content="" name="description" />
  <meta content="" name="author" />
  <link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.login.css" rel="stylesheet" />
  <link href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
  <link href="<%= request.getContextPath() %>/web/css/style.css" rel="stylesheet" />
  <link href="<%= request.getContextPath() %>/web/css/style_responsive.css" rel="stylesheet" />
  <link href="<%= request.getContextPath() %>/web/css/style_default.css" rel="stylesheet" id="style_color" />
   <%-- <script src="<%= request.getContextPath() %>/web/js/jquery.alerts.js" type="text/javascript"></script> --%>
   <script src="<%= request.getContextPath() %>/web/js/in/sha-512.js" type="text/javascript"></script>
  <link href="<%= request.getContextPath() %>/web/css/jquery.alerts.css" rel="stylesheet" type="text/css" />
  <link href="<%= request.getContextPath() %>/web/css/custom.css" rel="stylesheet" />
 
  <!-- inculding js file for user defined scripting  start-->  
  <script src="<%= request.getContextPath() %>/web/js/custom/fetch_data.js"> </script>
   <!-- inculding js file for custom scripting  end-->  
  <style type="text/css">
  form.hilight{
  background: yellow;
  }
  </style>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body id="login-body">
  <div class="login-header">
      <!-- BEGIN LOGO -->
      <div id="logo" class="center">
          <img src="<%= request.getContextPath() %>/web/img/logo.png" alt="logo" class="center" />
      </div>
      <!-- END LOGO -->
  </div>


<div id="loading" style="display: none;width:100%;height:550px;position:fixed;top:50%;left:50%;z-index: 25;" >
	<img src='<%=request.getContextPath() %>/web/img/ajax_loader_gray_64.gif' width="64" height="64" /><br>Loading..
</div>


  <!-- BEGIN LOGIN -->
  <div id="login">
    <!-- BEGIN LOGIN FORM -->
    <form id="loginform" class="form-vertical no-padding no-margin ">
  <!--     <div class="lock">
          <i class="icon-lock"></i>
      </div> -->
       <div class="lock lock-center">
          <i class="icon-lock"></i>
       </div>
      <div class="control-wrap">
          <h4>User Login</h4>
          <div class="control-group">
              <div class="controls">
                  <div class="input-prepend">
                      <span class="add-on"><i class="icon-sitemap"></i></span>
                      <s:select id="id1" label="Select Organization" headerKey="-1" headerValue="-- Select Organization --" 
						list="organizationList" name="organisationName" cssClass="input-large m-wrap login-form-control" theme="simple" onchange="fetchDomain()"/>
                    
                  </div>
              </div>
          </div>
          <div class="control-group">
              <div class="controls">
                  <div class="input-prepend">
                      <span class="add-on"><i class="icon-globe"></i></span>
                      <s:select id="id2" headerKey="-1" headerValue="-- Select Domain --" 
						list="domainList" name="domain" cssClass="input-large m-wrap login-form-control" theme="simple" onchange="fetchApplication()" />
                  </div>
              </div>
          </div>
          
          
           <div class="control-group">
        <div class="controls">
          <div class="input-prepend">
            <span class="add-on"><i class="icon-cog"></i></span>
          <s:select id="id3" headerKey="-1" headerValue="-- Select Application --" 
						list="appList" name="application" cssClass="input-large m-wrap login-form-control" theme="simple" />
          </div>
        </div>
       
      </div>
      
          <div class="control-group">
              <div class="controls">
                  <div class="input-prepend">
                      <span class="add-on"><i class="icon-user"></i></span><input id="input-username" type="text"  class="login-form-control" placeholder="Username" name="userName"  autocomplete="off"/>
                  </div>
              </div>
          </div>
          <div class="control-group">
              <div class="controls">
                  <div class="input-prepend">
                      <span class="add-on"><i class="icon-key"></i></span><input id="input-password" type="password"  class="login-form-control" placeholder="Password" name="password"  autocomplete="off"/>
                  </div>
                  <div class="mtop10">
                      <div class="block-hint pull-left small">
                       <font color="red" size="3"> <s:property value="result"/></font>
                      </div>
                      <div class="block-hint pull-right">
                          <a href="javascript:;" class="" id="forget-password">Forgot Password?</a>
                      </div>
                  </div>

                  <div class="clearfix space5"></div>
              </div>

          </div>
      </div>

   <input type="button" id="login-btn_remove" onclick="submitLoginForm();" class="btn btn-block btn-primary" value="Login" />
    </form>
    <!-- END LOGIN FORM -->
   

		<!-- BEGIN FORGOT PASSWORD FORM -->
    <form id="forgotform" class="form-vertical no-padding no-margin hide" action="">
      <p class="center">Enter your Username.</p>
      
    
      <center>
      
      <div class="control-group">
        <div class="controls">
          <div class="input-prepend">
            <span class="add-on"><i class="icon-user"></i></span><input id="userName_resPass" class="login-form-control" type="text" placeholder="Username"  autocomplete="off" />
          </div>
        </div>
       
      </div>
      
   <div class="control-group">
              <div class="controls">
                  <div class="input-prepend">
                      <span class="add-on"><i class="icon-sitemap"></i></span>
                      <s:select id="id1a" label="Select Organization" headerKey="-1" headerValue="-- Select Organization --" 
						list="organizationList" name="organisationName" cssClass="input-large m-wrap login-form-control" theme="simple" onchange="fetchDomainForForgotPassword()"/>
                    
                  </div>
              </div>
          </div>
          <div class="control-group">
              <div class="controls">
                  <div class="input-prepend">
                      <span class="add-on"><i class="icon-globe"></i></span>
                      <s:select id="id2a" headerKey="-1" headerValue="-- Select Domain --" 
						list="domainList" name="domain" cssClass="input-large m-wrap login-form-control" theme="simple" />
                  </div>
              </div>
               <div class="space20"></div>
          </div> 
          
          
     </center>         
      
      
      
      <input type="button" id="forget-btn" onclick="resetPassword()" class="btn btn-block btn-primary" value="Submit" />
      <div class="clearfix space10"></div>
      <div class="align_center"><a href="javascript:;" id="login-btn-back">Back to Login</a></div>
    </form>
    
    <form id="reset_otp_form" class="form-vertical no-padding no-margin hide" action="">
    <input type="hidden" name="domainResPass" id="domainResPassId">
			<p class="center">Enter otp for reset password.</p>




				<div class="control-group">
					<div class="controls">
						<div class="input-prepend">
							<span class="add-on"><i class="icon-user"></i></span><input
								id="userOtpId" type="text" class="login-form-control" placeholder="otp"
								name="userOtp" />
						</div>
					</div>

						<span id="show_mobile_no_text"></span>
					
					&nbsp;&nbsp; <a href="#" id="reSendOTPID" onclick="reSendOTPResPass()">Resend
						otp</a> <b id="counterOTP"></b>

				</div>
				<div class="clearfix space20"></div>
				<input type="button" id="forget-btn" onclick="validateOtpResPass()" class="btn btn-block btn-primary" value="Submit" />
      <div class="clearfix space10"></div>
<div class="align_center"><a href="javascript:;" id="login-btn-back2">Back to Login</a></div>
			
		</form>
    
    
    
    <!-- END FORGOT PASSWORD FORM -->
    
    <!-- BEGIN Choose Application FORM -->
    <form id="choose_applicationform" name="f2" class="form-vertical no-padding no-margin hide"  method="post">
    <h4>Select Application</h4>
      <div class="control-group">
        <div class="controls">
          <div class="input-prepend">
            <span class="add-on"><i class="icon-cog"></i></span>
    <s:select id="id3" headerKey="-1" headerValue="-- Select Application --" 
						list="appList" name="application" cssClass="input-large m-wrap login-form-control" theme="simple" />
          </div>
        </div>
        <div class="space20"></div>
      </div>
      <input type="submit" id="login-btn" class="btn btn-block btn-primary" value="Submit"/>
    </form>
    <!-- END Choose Application FORM -->
    <input type="hidden" name="csrfPreventionSalt" value="<%=request.getAttribute("csrfPreventionSalt") %>"/>
  </div>
  <!-- END LOGIN -->
  <!-- BEGIN COPYRIGHT -->
  <div id="login-copyright">
      <%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.MFID_FOOTER_MESSAGE) %>
  </div>
  <!-- END COPYRIGHT -->
  <!-- BEGIN JAVASCRIPTS -->
    
  <script src="<%= request.getContextPath() %>/web/js/jquery-3.3.1.min.js"></script>
  <%-- <script src="<%= request.getContextPath() %>/web/js/jquery.alerts.js" type="text/javascript"></script> --%>
  <script src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
  <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
  <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/custom/login.js"></script>
  <script> var contextPath ='<%= request.getContextPath() %>'; </script>
  <script> 
      jQuery(document).ready(function() {     
   	
      App.initLogin();
      
      handleLoginForm();
     
      
      
   
      if($("#id2").val() == null)
	      { 
	       var testVal='<%= request.getContextPath() %>'+"/logout_logOut.action";
           window.location.replace(testVal);
          }    
     
     
	 
      $("#alert_button").click( function() {
					jAlert('This is a custom jAlert box', 'jAlert Dialog');
				});
    });
    
 
    
    
    	$(document).ajaxStart(function(){
  
    $("#loading").css("display","block");
     $( "#forget-btn").hide();
    $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
     // alert("start");
  });
  
  $(document).ajaxComplete(function(){
  
    $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( "#forget-btn").show();
     // alert("complete");
  });  
   
  $('#input-password').keydown(function (e){
	    if(e.keyCode == 13){
	       submitLoginForm();
	    }
	})
	
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
		  	
	
  </script>
  
  <style>

#modalContainer {
	background-color:rgba(0, 0, 0, 0.3);
	position:fixed;
	width:100%;
	height:100%;
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

var mobileNumAlert='<%=new PropertyFileUtility().fetchPropertyFileAttribute("mobile.alert.text")%>';

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
</script>
  
  
  
  <!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>



 

