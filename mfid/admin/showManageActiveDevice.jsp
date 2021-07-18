     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>

<%@ page import="java.util.*,com.mfid.common.util.PropertyFileUtility,com.innefu.mfid.dataaccess.om.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext" %>
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8" />
	<title> <%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.TITLE_NAME) %></title>
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
    <link href="<%= request.getContextPath() %>/web/css/custom.css" rel="stylesheet" /> 
	<link href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
	
	<link href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />
	
	<script src="<%= request.getContextPath()%>/web/js/custom/manageActivatedDevices.js" type="text/javascript"></script>
	
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="<%= request.getContextPath() %>/web/assets/dropzone/css/dropzone.css" rel="stylesheet"/>
    <!-- END PAGE LEVEL STYLES -->
	
	<!--for DataTable--> 
	<%-- <link href="<%= request.getContextPath() %>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
	<link href="<%=request.getContextPath()%>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" /> 
	<!--End for DataTable--> 
	
	
</head>


 
 
	
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
<s:form name="f1"  validate="true" theme="simple" >
	<!-- BEGIN HEADER -->
<%@ include file="/common/secureHeader.jsp" %>
    <!-- END HEADER -->
    
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
		<%@ include file="/common/secureMenu.jsp" %>
			<!-- END SIDEBAR MENU -->
            
		</div>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
		<div id="main-content">
         <!-- BEGIN PAGE CONTAINER-->
         <div class="container-fluid">
            <!-- BEGIN PAGE HEADER-->   
            <div class="row-fluid">
               <div class="span12">
                  <h3 class="page-title">
                     Manage Activated Devices
                  </h3>
                   <ul class="breadcrumb">
                       <li>
                         <a href="<%= request.getContextPath() %>/secureLogin_showDashboard.action"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
                       </li>
                       <li>
                         <a href="#">User</a> <span class="divider">&nbsp;</span>
                       </li>
                       <li><a href="<%= request.getContextPath() %>/admin_showManageActiveDevice.action?a=user"> Manage Activated Devices </a><span class="divider-last">&nbsp;</span></li>
                   </ul>
               </div>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget" id="showManageActivatedDeviceData_block">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Manage Activated Devices </h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down icon-button-down"></a>
                           <a href="javascript:;" class="icon-remove icon-button2-remove"></a>
                        </span>
                     </div>
                     <div class="widget-body form scroll-div" id="showManageActivatedDeviceData_block2">
                     <div id="showManageActivatedDeviceData" ></div>
            
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
  
   
  	<!-- BEGIN JAVASCRIPTS -->
	<!-- Load javascripts at bottom, this will reduce page load time -->
  <!-- <script src="js/jquery-1.8.3.min.js"></script>-->
   <%-- <script src="<%= request.getContextPath() %>/web/js/jquery-1.7.1.min.js"></script> --%>
   <script src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>   
   <script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
   <!-- ie8 fixes -->
   <!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->   
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/jquery.confirm.min.js"></script>
    <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/jquery.confirm.js"></script>
   
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>
   
   <!-- BEGIN PAGE LEVEL PLUGINS -->
   <script src="<%= request.getContextPath() %>/web/assets/dropzone/dropzone.js"></script>
   <!-- END PAGE LEVEL PLUGINS -->
   
   
<!-- For Datatable (searching)-->   
<script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js" type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js" type="text/javascript"></script>
<!-- End For Datatable (searching)--> 

   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
   
  
   <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/custom.js"></script>


  
  
   
    <script>
  
      showManageActivatedData();
      
  // jQuery('.group-checkable').live('change',function(){
	$(document).on('click', '.group-checkable', function() {
	// alert("group checkable");
	 if(typeof($(this).attr('id')) === 'undefined')
	  $("#sample_editable_1_multi_delete").focus();
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		$(set).each(function(){
			$(this).prop('checked', checked);
		});
		//alert(checked);
		/* if(checked)
		{
			//alert("in if");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked", true);
				} else {
					$(this).attr("checked", false);
				}
			});
		}
		else
		{
			//alert("in else");
			jQuery(set).each(function () {
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
			//showChangeAuth(false,false);
		} */
		jQuery.uniform.update(set);
	});
	
	 function deviceDeleteTest()
	 {
		 
			var id="";
			//alert("======= "+$('input[type="checkbox"]:checked').length);
			if($('input[type="checkbox"]:checked').length==0){
				alert("Please select device Name to delete");
			}
			else if($('input[type="checkbox"]:checked').length>0){
				/*if (jConfirm("Are you sure to delete selected row ?") == false) {
					return;*/
				/* $.confirm({
			        text: "Are you sure to delete selected row? License May be associated to the selected users.Do you want to continue ??",
			        confirm: function(button) { */ 
			        	$('.checkboxes').each(function(){
							if($(this).is(':checked')){
							id += "'"+ $(this).val() + "',";
								 }
						});
						//  alert("id = "+id);
						if(id == '')
						{
						alert("Please select device Name to delete");
						return true;
						}
						id=id.substring(0,id.length-1);
						deRegisterDevice(id);
						nEditing = null;
			     /*   },
			        cancel: function(button) {
			            return;
			        }
			    }); */ 
				//}
				
				
				
			}

	 }
	
	$("#sample_editable_1_multi_delete").click(function(){
	    alert("The paragraph was clicked.");
	});
	
		$('#sample_editable_1_multi_delete1').on('click', function(){
		 
		// alert("ssssss");
		var id="";
		//alert("======= "+$('input[type="checkbox"]:checked').length);
		if($('input[type="checkbox"]:checked').length==0){
			alert("Please select device Name to delete");
		}
		else if($('input[type="checkbox"]:checked').length>0){
			/*if (jConfirm("Are you sure to delete selected row ?") == false) {
				return;*/
			/* $.confirm({
		        text: "Are you sure to delete selected row? License May be associated to the selected users.Do you want to continue ??",
		        confirm: function(button) { */ 
		        	$('.checkboxes').each(function(){
						if($(this).is(':checked')){
						id += "'"+ $(this).val() + "',";
							 }
					});
					//  alert("id = "+id);
					if(id == '')
					{
					alert("Please select device Name to delete");
					return true;
					}
					id=id.substring(0,id.length-1);
					deRegisterDevice(id);
					nEditing = null;
		     /*   },
		        cancel: function(button) {
		            return;
		        }
		    }); */ 
			//}
			
			
			
		}
	});
	
		
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
		     
        
        jQuery('.widget .tools .icon-remove').click(function () {
            jQuery(this).parents(".widget").parent().remove();
        });
		       
        jQuery('.widget .tools .icon-chevron-down, .widget .tools .icon-chevron-up').click(function () {
        	//alert("icon-chevron-down clicked");
            var el = jQuery(this).parents(".widget").children(".widget-body");
            if (jQuery(this).hasClass("icon-chevron-down")) {
                jQuery(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
                el.slideUp(200);
            } else {
                jQuery(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
                el.slideDown(200);
            }
        });
        
        jQuery('#footer .go-top').click(function () {
            App.scrollTo();
        });
        
        
        $(document).ajaxStart(function(){
        	  
            $("#loading").css("display","block");
            $('body').css("opacity","0.8");
             $( ".log" ).text( "Triggered ajaxStart handler." );
             // alert("start");
          });
          
          $(document).ajaxComplete(function(){
          
            $("#loading").css("display","none");
             $('body').css("opacity","1");
             $( ".log" ).text( "Triggerd ajaxComplete handler." );
             // alert("complete");
          });  
          
   
   
  </script>
   
  

</s:form>
</body>




<!-- END BODY -->
</html>