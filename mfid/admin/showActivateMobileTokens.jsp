     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>

<%@ page import="java.util.*,com.mfid.common.util.PropertyFileUtility,com.innefu.mfid.dataaccess.om.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.DataBaseUtility" %>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	
	<link rel="shortcut icon" href="<%= request.getContextPath() %>/web/img/favicon.ico" type="image/ico"/>	
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />  
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_responsive.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/style_default.css" rel="stylesheet" id="style_color" />

	<link href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
	
	<link href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />
	
	
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="<%= request.getContextPath() %>/web/assets/dropzone/css/dropzone.css" rel="stylesheet"/>
    <!-- END PAGE LEVEL STYLES -->
	
	<!--for DataTable--> 
	<%-- <link href="<%= request.getContextPath() %>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
	<link href="<%= request.getContextPath() %>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" /> 
	<!--End for DataTable--> 
</head>
<%
String qrPath=null;
String qrCodeURL=null;
String activeStatus=null;
String serverUrl ="";
String qrCodeClass="";
try{
	
Map session1 = (Map) ActionContext.getContext().get("session");		
 qrCodeURL=(String)session1.get("QRCodeURL");
  qrPath=SessionUtil.getUser().getUserLogonId()+"_"+SessionUtil.getApplication().getId()+"."+new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.IMAGE_EXTENTION);
 System.out.println("qrPath==="+qrPath);
 

	System.out.println("qrCodeURL===="+qrCodeURL);
	UserMapping userMapping=(UserMapping) session1.get("loginUserMapping");
	System.out.println("usermapping id======"+userMapping.getId());
	System.out.println("132222222222222222222======"+userMapping.getSeed().getSeedActiveStatus());
	if(userMapping.getSeed().getSeedActiveStatus()==1)
	{
		activeStatus="none";
	}
	else
		activeStatus="";
	
	
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
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
<!-- BEGIN HEADER -->
	<%@ include file="/common/header.jsp" %>
    <!-- END HEADER -->
<!--<s:form name="f1"  validate="true" theme="simple" >-->
	
	
	<!-- BEGIN CONTAINER -->
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		 <div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
			<div class="navbar-inverse">
				<form class="navbar-search visible-phone">
					
				</form>
			</div>
			
			<!-- BEGIN SIDEBAR MENU -->
		<%@ include file="/common/menu.jsp" %>
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
                     Activate Token
                  </h3>
                   <ul class="breadcrumb">
                       <li>
                         <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
                       </li>
                       <li>
                         <a href="#">User</a> <span class="divider">&nbsp;</span>
                       </li>
                       <li><a href="<%= request.getContextPath() %>/admin_showActivateMobileToken"> Activate Token</a><span class="divider-last">&nbsp;</span></li>
                    </ul>
               </div>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Activate&nbsp;Token</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
					 
					 
					 
					 
					 
                     <div class="widget-body form activation-col">
                         <div class="">
                     			  
                                	
									
									
									
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
 height: 480px;
    padding-right: 30px;
    padding-top: 65px;
    
}

label#randomKeyId {
    width: 350px;
    float: left;
    background: white;
    padding: 15px 25px;
    font-size: 25px;
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
	




 .qucode-col {
    position: relative;
    background: transparent;
    width: 482px !important;
    z-index: 0;
}


.widget-body.form.activation-col .widget-body .span6 img.imagem_artigo {
        height: 100%;
    width: 100%;
    margin: 0 3%;
}



.span12-col-margin0	{background: white;
    margin-left: 0 !important;
    margin-top: -10px;}
	
	
.span12-col-margin0	 img{margin: 20px auto;
    float: none;
    width: 700px;
display: block;}


.act-hed {
    font-size: 20px;
    padding: 31px 0px 15px 0px;
    line-height: 28px;
    width: 398px;
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
														 
																		</div> -->
					</div>
					
					<div class="span12 span12-col-margin0">
					<img src="<%= request.getContextPath() %>/web/img/qr-with-pass-activation-9.gif" class="responsive"/>
					</div>
                  
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>
         <!-- END PAGE CONTAINER-->
      </div>
		<!-- END PAGE -->
        
        
	</div>
	
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
  
   <%-- <script src="<%= request.getContextPath() %>/web/js/jquery-1.7.1.min.js"></script> --%>
 
    --%>
   
   <script src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>   
   <script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
   <!-- ie8 fixes -->
   <!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->   
   
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>
   
   <!-- BEGIN PAGE LEVEL PLUGINS -->
   <script src="<%= request.getContextPath() %>/web/assets/dropzone/dropzone.js"></script>
   <!-- END PAGE LEVEL PLUGINS -->
   
   
<!-- For Datatable (searching)--> 
  
<%-- <script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js" type="text/javascript"></script> --%>

<%-- <script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.1.12.1.min.js" type="text/javascript"></script> --%>
<script src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js" type="text/javascript"></script>
<!-- End For Datatable (searching)--> 

   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
   
  
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>
    <script>
   jQuery(document).ready(function() { 
      
   
         // initiate layout and plugins
         App.init();
		TableEditable.init();
		
		    showQRNormalCode();
		 
      });
       jQuery(document).ready(function() { 
      
   	
		
		 
      });
      
     
  </script>
 
<!-- ---------------- -->





<!-- ---------------- -->

<!--</s:form>-->
</body>




<!-- END BODY -->
</html>