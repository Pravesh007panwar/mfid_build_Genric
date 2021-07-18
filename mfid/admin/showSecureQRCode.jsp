<!DOCTYPE html>
<%@page import="com.innefu.mfid.dataaccess.om.UserDetail"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="display" uri="http://displaytag.sf.net" %>
<%@ page import="java.util.*,com.mfid.common.util.PropertyFileUtility,com.innefu.mfid.dataaccess.om.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.DataBaseUtility" %>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<!-- BEGIN HEAD -->
<head>

<% 

String qrPath=null;
String qrCodeURL=null;
String activeStatus=null;
String deleteQrCodeCounter="";
String sessionOutCounter="0";
String base64EncodedImage=null;
UserMapping umapping = null;
String serverUrl ="";
String qrCodeClass ="";
try{
	 umapping =SessionUtil.getUserMapping();
Map session1 = (Map) ActionContext.getContext().get("session");		
//base64EncodedImage=(String)session1.get("Base64EncodedImage");
// qrCodeURL=(String)session1.get("QRCodeURL");
 // qrPath=SessionUtil.getUser().getUserLogonId()+"_"+SessionUtil.getApplication().getId()+"."+new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.IMAGE_EXTENTION);
// System.out.println("qrPath==="+qrPath);
 deleteQrCodeCounter = new PropertyFileUtility().fetchPropertyFileAttribute("qr.code.delete.time.interval");

	System.out.println("deleteQrCodeCounter===="+deleteQrCodeCounter);
	
	//UserMapping userMapping=(UserMapping) session1.get("loginUserMapping");
	 /* sessionOutCounter=(String) session1.get("sessionOutCounter");
	  if(sessionOutCounter != null)
	   deleteQrCodeCounter = ""+(Integer.parseInt(deleteQrCodeCounter) - Integer.parseInt(sessionOutCounter));*/
	  
	  
	 // System.out.println("deleteQrCodeCounter===="+sessionOutCounter);
	//System.out.println("usermapping id======"+userMapping.getId());
	//System.out.println("132222222222222222222======"+userMapping.getSeed().getSeedActiveStatus());
	/*if(userMapping.getSeed().getSeedActiveStatus()==1)
	{
		activeStatus="none";
	}
	else
		activeStatus="";*/
	com.innefu.mfid.dataaccess.om.Properties properties=DataBaseUtility.getPropertiesValues();
	serverUrl =properties.getSecureFlag() == 1 ? "https://":"http://";
	serverUrl = serverUrl+properties.getQrHost()+":"+properties.getQrHostPort();
	qrCodeClass = new PropertyFileUtility().fetchPropertyFileAttribute("showNewQRCode").equalsIgnoreCase("true")?"qucode-col":"";
	 System.out.println("qrCodeClass :::::::::::: "+qrCodeClass);
}
catch(Exception e)
{
	e.printStackTrace();
}
%>
	<meta charset="utf-8" />
	<title><%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.TITLE_NAME) %></title>
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>	
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style.css" rel="stylesheet" />
		<link href="<%= request.getContextPath() %>/web/css/flags32.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_responsive.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_default.css" rel="stylesheet" id="style_color" />
    <link href="<%= request.getContextPath() %>/web/css/custom.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
	
	<link href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />
	<%-- <link href="<%=request.getContextPath()%>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
	<link href="<%=request.getContextPath()%>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" /> 
	<style> 
		

.highcharts-tooltip>span {
    padding: 10px;
    white-space: normal !important;
    width: 200px;
}



.f32 .flag {
    vertical-align: middle !important;
}
	.highcharts-input-group{display:none;}
	.pad { background-color: #FFFFFF; padding: 0px; overflow:hidden; border: #ddd /**rgb(47, 126, 216)**/ 1px solid;
    border-radius: 5px; } .fif {  display: inline-block;  margin: 0;   padding: 0;}</style>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
	<!-- BEGIN HEADER -->
<%@ include file="/common/secureHeader.jsp" %>
<!-- END HEADER -->
<!--<s:form name="f1" validate="true" theme="simple" >  -->


	<!-- END HEADER -->
    
	<!-- BEGIN CONTAINER -->
<div id="loading" style="display: none;width:100%;height:550px;position:fixed;top:50%;left:50%;z-index: 25;" >
	<img src='<%=request.getContextPath() %>/web/img/ajax_loader_gray_64.gif' width="64" height="64" /><br>Loading..
</div>
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		 <div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
		<!-- <div class="navbar-inverse">
				<form class="navbar-search visible-phone">
					<input type="text" class="search-query" placeholder="Search" />
				</form>
			</div>    -->	
			
			<!-- BEGIN SIDEBAR MENU -->
		<%@ include file="/common/secureMenu.jsp" %>
			<!-- END SIDEBAR MENU -->
            
		</div>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
<div id="main-content">
         <!-- BEGIN PAGE CONTAINER-->
         <div class="container-fluid">
            <!-- BEGIN PAGE HEADER-->   
            <div class="row-fluid widget-main">
               <div class="span12">
                  <h3 class="page-title">
                    
                     <%
                       if( umapping != null && umapping.getLicenseDetail().getId()!=0 && (umapping.getAuthenticationType().getId()==1 ))
							     %>Token Activation Policy  <%  
                       else
                    	   %>  Scan QR Code <%
                     %>
                  </h3>
                   <ul class="breadcrumb">
                       <li>
                         <a href="<%= request.getContextPath() %>/secureLogin_showDashboard.action"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
                       </li>
                       <li>
                         <a href="#">User</a> <span class="divider">&nbsp;</span>
                       </li>
                       <li><a href="<%= request.getContextPath() %>/admin_showSecureQRCode.action?a=user">
						 <%
                       if( umapping != null && umapping.getLicenseDetail().getId()!=0 && (umapping.getAuthenticationType().getId()==1 ))
							     %>Token Activation Policy  <%  
                       else
                    	   %>  Scan QR Code <%
                     %>
						</a><span class="divider-last">&nbsp;</span></li>
                   </ul>
               </div>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget" id="qr_code_block">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Scan&nbsp;QR&nbsp;Code   </h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down icon-button-down"></a>
                           <a href="javascript:;" class="icon-remove icon-button2-remove"></a>
                        </span>
                     </div>
                     <div class="widget-body form scroll-div" id="qr_code_block2">
                     
						 		<div class="widget-body form activation-col">
                     			  
                     			    <div class="span6">
									  <div id="qr_code" class="qucode-col" ></div>
									  </div>
									  <div class="span6 bak-blue">
									  <img src="<%= request.getContextPath() %>/web/img/QR-code-compress.gif" class="responsive"/>
									  </div>
                                	
									
                               </div>
                               
                             </div>   						   
<style style type="text/css">
							   
	
 .widget-body.form.activation-col {
    overflow: hidden;
    width: 100%;
}







.widget-body.form.activation-col .widget-body .span6.bak-blue {
    padding-right: 20px;
}

label#randomKeyId {
    max-width:350px;
    float: left;
    background: #def4ff;
    padding: 15px 25px;
    font-size: 20px;
    border: 1px #b3b3b3 solid;
    margin: 10px auto;
    float: none;
}

.url-col{
    width: auto;
    background: whitesmoke;
    padding: 15px 25px;
    font-size: 25px;
    margin: 0 auto;
    word-wrap: break-word;
    float: none;
    line-height: 32px;}
	




.span12-col-margin0	{background: white;
    margin-left: 0 !important;
    margin-top: -20px;}
	
	
.span12-col-margin0	 img{margin: 20px auto;
    float: none;
    width: 700px;
display: block;}



.span6.bak-blue {
/* 	height: 480px; */
	padding-top: 25px;
/* 	padding-right: 15px; */
    
}

/* .span6.bak-blue img{width:571px;} */

.act-hed {
    font-size: 20px;
    padding: 10px;
    line-height: 28px;
    maax-width: 398px;
    margin: 0 auto;
    font-weight: bold;
}



.ortext-col{position: relative;
    border-bottom: 1px #039cea solid;
    margin-bottom: 40px;
    padding-bottom: 30px;
    width: 90%;
    margin: 0 auto 10px auto;}
	
	
.ortext-col p{ position: absolute;
    top: 19px;
    text-align: center;
    margin: 0 auto;
    background: white;
    font-size: 25px;
    padding: 0 10px;
    width: 35px;
    left: 45%;
    text-transform: uppercase;
    font-weight: bold;
color: #039cea;}

 .qucode-col {
    position: relative;
    background: transparent;
/*     width: 482px !important; */
    z-index: 0;
    text-align: center;
}

.widget-body.form.activation-col .widget-body .span6 img.imagem_artigo {
        height: 100%;
    width: 100%;
    margin: 0 3%;
}

</style>
							   
                     <!-- END SAMPLE FORM widget-->
                   
                    <div class="ortext-col">
					    <p>or</p>
                     </div>
				  <div class="control-group" style="text-align:  center;">
								   <div class="act-hed">Are you not able to scan QR code?
								Please copy activation code below</div>
								<label id="randomKeyId" class="control-label"></label>
								
								<label  class="control-label url-col">
								<%=serverUrl%>
								</label> 
									<!-- <div class="controls">
								    <input readonly id="randomKeyId" type="text"/>
									<!-- <div class="controls">
								    <input readonly id="randomKeyId" type="text"/>
														 
																		</div> -->
					</div>
					</div>
                     
                    
              
                    
              
                 
            </div>

            <!-- END PAGE CONTENT-->   
            </div>
            
            
               <!-- BEGIN SAMPLE FORM widget-->   
                
                     			  
                          	 <%
					    			 
                          	 		 boolean hideQRCode = false; 
					    		  try{
						       			// Map session1 = (Map) ActionContext.getContext().get("session");
						       			// umapping=(UserMapping) session1.get("loginUserMapping");
						       			 
						       		  if(umapping.getTokenActivationPolicy().getId() != ApplicationConstants.DEAULT_ENTRY && umapping.getAuthenticationType().getId() != ApplicationConstants.PUSHTOKEN)
									 {
					    	%>
					    		 	  <div class="widget"  id="showDeassociatePolicyButton">
                    				  <div class="widget-title">
                     			      <h4><i class="icon-share-alt"></i>Activate&nbsp;Token&nbsp;Activation Policy   </h4>
                          			  <span class="tools">
                          			  <a href="javascript:;" class="icon-chevron-down icon-button2-down"></a>
                          			  <a href="javascript:;" class="icon-remove icon-button-remove"></a>
                       				  </span>
                   				      </div>
                    				  <div class="widget-body form scroll-div" id="showDeassociatePolicyButton_block">
                     
						 			  <div class="widget-body">
                     			      <button type="button" class="btn btn-primary" onclick="deassociateTokenPolicy()">I am Ready </i></button>
						 			  </div>
                    				  </div>
                     
						
							<%
									 }
						       		  
						       		  if(umapping.getAuthenticationType().getId()==1 || umapping.getAuthenticationType().getId()==5)
						       			  hideQRCode = true;
					    		    }
									 catch(Exception e)
									 {
										 e.printStackTrace();
									 }
							%>		
                            
                    <div class="span12 span12-col-margin0">
					<img src="<%= request.getContextPath() %>/web/img/qr-with-pass-activation-9.gif" class="responsive"/>
					</div>	
                    
              
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT--> 
            
            
            
                  
         </div>
         <!-- END PAGE CONTAINER-->
      </div>
		<!-- END PAGE -->
        
        
	</div>
	<!-- END CONTAINER -->
    
	<!-- BEGIN FOOTER -->

	<div id="footer">
		<%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.MFID_FOOTER_MESSAGE) %>
		<div class="span pull-right">
			<span class="go-top"><i class="icon-arrow-up"></i></span>
		</div>
	</div>
	<!-- END FOOTER -->
    
	<!-- BEGIN JAVASCRIPTS -->
	<!-- Load javascripts at bottom, this will reduce page load time -->
  
   <script src="<%= request.getContextPath() %>/web/js/custom/resync_Clock.js" type="text/javascript"></script>
   <script src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>   
   <script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom/showQRCode.js"></script>
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/jquery.confirm.min.js"></script>
    <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/jquery.confirm.js"></script>
 
   <!-- ie8 fixes -->
   <!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->   
   
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>
   
   <script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.js" type="text/javascript"></script>
  
   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
           <script src="<%= request.getContextPath() %>/web/js/highmaps.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/world.js"></script>
   
    <script src="<%= request.getContextPath() %>/web/js/jspdf.min.js"></script>
   
      
 
  
  
  
  <input type="hidden" id="id_image_Path"/>
   
 <script>
 var hideQRCode = '<%=hideQRCode%>';
 
   jQuery(document).ready(function() {       
        if(hideQRCode == false || hideQRCode == 'false')
          showQRCode();
         else
         {
           $("#qr_code_block").hide(); 
         } 
		 
      });
   
  </script>
 
  
   <!--<script src="<%= request.getContextPath() %>/web/js/highcharts.js"></script>
   
   --><!--
   <script src="<%=request.getContextPath() %>/web/js/exporting.js"></script>
   -->
   
   
   
   <script>
   





$('#myModal').on('shown.bs.modal', function (e){





	
});  

 $(".icon-button-remove").click(function(e){  $("#showDeassociatePolicyButton").hide();  });
 $(".icon-button2-remove").click(function(e){  $("#qr_code_block").hide();  });
 $(".icon-button-down").click(function(e){  $("#qr_code_block2").slideToggle("slow");  });
 $(".icon-button2-down").click(function(e){  $("#showDeassociatePolicyButton_block").slideToggle("slow");  });
 $(".icon-arrow-up").click(function() {$("html, body").animate({ scrollTop: 0 }, "slow");return false;});
 

 
 $('.sidebar-toggler').click(function () {
     if ($('#sidebar > ul').is(":visible") === true) {
         $('#main-content').css({
             'margin-left': '25px'
         });
         $('#sidebar').css({
             'margin-left': '-190px'
         });
         $('#sidebar > ul').hide();
         $("#container").addClass("sidebar-closed");
     } else {
        $('#main-content').css({
             'margin-left': '215px'
         });
         $('#sidebar > ul').show();
         $('#sidebar').css({
             'margin-left': '0'
         });
         $("#container").removeClass("sidebar-closed");
     }
 });
	
	
 jQuery('#sidebar .has-sub > a').click(function () {
	
 	/***  Changes By Saurabh **/
 	
     var menuCss = $(this).parent('li');
       if (menuCss.hasClass('open')) {
     	  menuCss.removeClass('open');
         $('.arrow', $(this)).removeClass("open");
         menuCss.find('li').removeClass('open');
         menuCss.find('ul').slideUp(200);
       } else {
     	  menuCss.addClass('open');
         $('.arrow', $(this)).addClass("open");
         menuCss.children('ul').slideDown(200);
         menuCss.siblings('li').children('ul').slideUp(200);
         menuCss.siblings('li').removeClass('open');
         menuCss.siblings('li').find('li').removeClass('open');
         menuCss.siblings('li').find('span').removeClass('open');
         menuCss.siblings('li').find('ul').slideUp(200);
       }
      
       // Opens "active" Menu Item(s)
      // $('#sidebar-menu li.active').addClass('open').children('ul').slideDown();
    
 }); 
 

</script>
 
<!--</s:form>  -->
</body>
<!-- END BODY -->
</html>