<!DOCTYPE html>
<%@page import="com.innefu.mfid.dataaccess.om.UserDetail"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="display" uri="http://displaytag.sf.net" %>
<%@ page import="java.util.*, java.lang.*,java.util.*,com.mfid.common.ApplicationConstants,com.mfid.common.util.PropertyFileUtility,com.mfid.common.util.SessionUtil,com.opensymphony.xwork2.ActionContext" %>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9"> <![endif]-->
<!--[if !IE]><!--> <html lang="en"> <!--<![endif]-->
<!-- BEGIN HEAD -->
<head>

<% 
String domain1=null;

String imagePath = request.getContextPath();
String str=null;

try{
	 str=new PropertyFileUtility().fetchPropertyFileAttribute("protocol.decoding.engine.flag");
	 System.out.println("str======="+str);
	 
 domain1=SessionUtil.getDomain().getDomainName(); 
 
	System.out.println("domain======="+domain1);
}
catch(Exception e)
{
	e.printStackTrace();	
}
%>
	<meta charset="utf-8" />
	
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
    <script src="<%= request.getContextPath() %>/web/js/custom/dashboard_users_details.js" type="text/javascript"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom/switch_app_domain.js"> </script>
	<link href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/css/custom.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
	<link href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css" media="screen" rel="stylesheet" type="text/css" />
	<link href="<%=request.getContextPath()%>/web/css/jquery-ui.1.12.1.min.css" rel="stylesheet" id="style_color" /> 
	<%-- <link href="<%=request.getContextPath()%>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
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
    border-radius: 5px; } .fif {  display: inline-block;  margin: 0;   padding: 0;}
   
    </style>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
	<!-- BEGIN HEADER -->
<%@ include file="/common/header.jsp" %>
<!-- END HEADER -->
<!--<s:form name="f1" validate="true" theme="simple" >  -->


	<!-- END HEADER -->
    
	<!-- BEGIN CONTAINER -->
<div id="loading_common" style="display: none;width:100%;height:550px;position:fixed;top:50%;left:50%;z-index: 25;" >
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
		<%@ include file="/common/menu.jsp" %>
			<!-- END SIDEBAR MENU -->
            
		</div>
		<!-- END SIDEBAR -->
		<!-- BEGIN PAGE -->
		<div id="main-content">
            <!-- BEGIN PAGE CONTAINER-->
            <div class="container-fluid">
                <!-- BEGIN PAGE HEADER-->
                <div class="row-fluid">
                    <div class="span6">                       
                        <h3 class="page-title">
                            Dashboard
                        </h3>
                        <ul class="breadcrumb">
                            <li>
                             <a href="<%= request.getContextPath() %>/login_showDashboardAgain"><i class="icon-home"></i></a><span class="divider">&nbsp;</span>
                            </li>
                            
                             <li><a href="<%= request.getContextPath() %>/login_showDashboardAgain">Dashboard</a><span class="divider-last">&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
             
                        </ul>
                        <!-- END PAGE TITLE & BREADCRUMB-->
                    </div>
                   <div class="clock"> <img src="<%=request.getContextPath() %>/web/img/server_clock.png" class="serverClock" title="Server Clock"/>
									   <div id="Date"></div>
									      <!-- <ul class="clockwise">
									          <li id="hours"></li>
									          <li id="point">:</li>
									          <li id="min"></li>
									          <li id="point">:</li>
									          <li id="sec"></li>
									      </ul> -->
									</div>
                  
                  
						
                   
                </div>
                <!-- END PAGE HEADER-->
                <!-- BEGIN PAGE CONTENT-->
                <div id="page" class="dashboard">                  
                   <% if(SessionUtil.getRole().getId()!=5 && SessionUtil.getRole().getId()!=6 && SessionUtil.getRole().getId()!=7){ %>   
                   <div class="square-state">
                        <div class="row-fluid">
                          <% if(SessionUtil.getRole().getId()!=4) {%>
                         <a class="icon-btn span2" href="<%=request.getContextPath()%>/admin_showImportUser.action">
                               <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/importuser.png" ></i>
                                <div>Import Users</div>
                                <span class="badge badge-info"></span>
                            </a>
                            <% }%>
                        	<a class="icon-btn span2" href="<%=request.getContextPath()%>/admin_showManageUser.action">
                                <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/manageuser.png" ></i>
                                <div>Manage User</div>
                                <span class="badge badge-info"></span>
                            </a>
                            <a class="icon-btn span2" href="<%=request.getContextPath()%>/report_showUserSummaryReport.action">
                                 <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/usersummary.png" ></i>
                                <div>Users Summary</div>
                                <span class="badge badge-important"></span>
                            </a>
                            <a class="icon-btn span2" href="<%=request.getContextPath() %>/report_showLockedUnlockedUsersRreport.action">
                                <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/lockedunlocked.png" ></i>
                                <div>Locked/Unlocked User</div>
                                <span class="badge badge-success"></span>
                            </a>
                            <a class="icon-btn span2" href="<%=request.getContextPath() %>/admin_showManageAdministration.action">
                                 <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/adminsetting.png" ></i>
                                <div>Admin Settings</div>
                            </a>
                            <% if(SessionUtil.getRole().getId()!=4) {%>
                             <a class="icon-btn span2" href="<%=request.getContextPath() %>/admin_showManageRadius.action">
                                 <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/radiusip.png" ></i>
                                <div>Radius IP</div>
                                <span class="badge badge-important"></span>
                            </a>
                           
                            <%} %>
                        </div>
                        <div class="row-fluid">
                           
                          	 <a class="icon-btn span2" href="<%=request.getContextPath() %>/token_showTokenManager.action">
                                <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/managetoken.png" ></i>
                                <div>Manage Tokens</div>
                            </a>
                            <a class="icon-btn span2" href="<%=request.getContextPath()%>/report_showAllDomainTokenDetailReport.action">
                               <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/tokendetail.png" ></i>
                                <div>Token Detail</div>
                                <span class="badge badge-info"></span>
                            </a>
                            <a class="icon-btn span2" href="<%=request.getContextPath()%>/report_showTokenStockReport.action">
                                <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/tokenstock.png" ></i>
                                <div>Token Stock</div>
                            </a>
                            
                            
                            
                            <a class="icon-btn span2" href="<%=request.getContextPath() %>/report_showUsersLogsReport.action">
                                <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/logsreport.png" ></i>
                                <div>Logs Report</div>
                            </a>
                              <a class="icon-btn span2" href="<%=request.getContextPath() %>/policy_showCommonPolicy.action">
                                <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/commonpolocy.png" ></i>
                                <div>Common Policy</div>
                                <span class="badge badge-warning"></span>
                            </a>
                            <a class="icon-btn span2" href="<%=request.getContextPath() %>/policy_showAssignPolicy.action">
                                 <i class="imagerotate"> <img src="<%=request.getContextPath()%>/web/img/assignpolicy.png" ></i>
                                <div>Assign Policy</div>
                            </a>
                        </div>
                    </div>                    
        
        <% } %>
                   
                            <div class="clearfix"></div>
                            
                        </div><!--                    
                        
                   <div class="row-fluid">
                   <div class="span12">
                         BEGIN BORDERED TABLE widget
                 
                <% if(SessionUtil.getRole().getId()!=5 && SessionUtil.getRole().getId()!=6 && SessionUtil.getRole().getId()!=7){ %>     
                    
                   <div class="row-fluid">
                   <div class="span12">
                         BEGIN BORDERED TABLE widget
                        <div class="widget">
                            <div class="widget-title">
                                <h4><i class="icon-reorder"></i> Token Stock Report</h4>
                                 <span class="tools">
                                   <a href="javascript:;" class="icon-chevron-down"></a>
                                   <a href="javascript:;" class="icon-remove"></a>
                                 </span>
                                                    
                            </div>
                            
                            <div class="widget-body">
                                <div id="container_grap"></div>
                            </div>
                            
                            
                           	<div  class="widget-body form">
                     			<div class="widget-body">
                     	      	<div id="container_domain"></div>
                                	<div id="container_grap"></div> 
                                	<div id="success_attempt_data"></div>
                                	<div class="expo_option">
								<div class="row-fluid" id="expo_opt">
								</div>
							</div>
                            	</div>
						</div>
                            
                            
                        </div>
                           END BORDERED TABLE widget
                          
                         
                        
                        
                       
                      
                    </div>
                    </div>
                    
                    <% } %>
                </div>
                 END PAGE CONTENT
            </div>
        <% if(SessionUtil.getRole().getId()!=5 && SessionUtil.getRole().getId()!=6 && SessionUtil.getRole().getId()!=7 ){ %>     
         
       
         
              
            <!-- start for  System stats  -->
                        
                                          <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>System&nbsp;Stats</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                       	<div  class="widget-body form">
                     			<div class="widget-body">
                     			   <div class="pad" style="width: 100%; height: 200px; margin: 0 auto">
                     			    <div id="used_system_ram_chart" style="width: 33%; height: 200px; float: left"></div>
                                	<div id="used_system_cpu_chart" style="width: 33%; height: 200px; float: left"></div>
									<div id="used_system_disk_space_chart" style="width: 33%; height: 200px; float: left"></div>
									</div>
                               </div>
						</div>
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>
 <!-- end for System stats -->
 
 
     <!-- Protocol Decoding Engine Stats -->
     
     
                       
                                         <% if(str.equalsIgnoreCase("1")){ %>  
                                          <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Protocol Decoding Engine Stats</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                       	<div  class="widget-body form">
                     			<div class="widget-body">
                     			   <div class="pad" style="width: 100%; height: 200px; margin: 0 auto">
                     			    <div id="used_protocol_system_ram_chart" style="width: 33%; height: 200px; float: left"></div>
                                	<div id="used_protocol_system_cpu_chart" style="width: 33%; height: 200px; float: left"></div>
									<div id="used_protocol_system_disk_space_chart" style="width: 33%; height: 200px; float: left"></div>
									</div>
                               </div>
						</div>
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>
           <% } %>   
 <!-- end Protocol Decoding Engine Stats -->
 
 
 
 
  <!-- start for Radius and Push server status  -->      
                     
                                          <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Radius and Push Server Status</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                       	<div  class="widget-body form">
                     			<div class="widget-body">
                     			   
                     	  	       <div id="container_radius_status"  style="width:100%; height:auto; float:left; display:block; border-radius:0px; border:#ddd 1px solid;  overflow:hidden; ">
                     	  	       </div>
                     	  	                   <div class="loading" id="container_server_status_loading">
    											  <center><h4>  <i class="icon-spinner icon-spin icon-large"></i>
     											   Loading data ... </h4></center>
    											</div>
                     	   <!--	       <div id="container_push_status"  style="width:48.5%; height:auto; float:right; display:block; border-radius:10px; border:#ddd 1px solid; overflow:hidden; ">
                     	  	       </div>
                     	  	      
                     	  	       <div id="container_redis_status"  style="width:48.5%; margin-top:20px; height:auto; float:left; display:block; border-radius:10px; border:#ddd 1px solid; overflow:hidden; ">
                     	  	       </div>-->
                     			  
                     		    <div class="clear" style="clear:both;"></div>
                               </div>
						</div>
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>


<!-- end for Radius and Push server status  -->    


<!-- start for Day / Weekly / Monthly wise dashboard Report    -->      
                     
                
                                          <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Day / Weekly / Monthly wise dashboard Report </h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                     <div  class="widget-body form">
                        <!-- BEGIN FORM-->
                        
                        <div class="tab-pane active" >
										 
												<div class="row" style="height:20px;"></div>
												<div style="padding:10px; background:#f4f4f4; border:solid 1px #ddd; display:block; margin:10px 0px;">
													<div class="row-fluid">
													<div class="span5">
														<b> Day / Weekly / Monthly wise dashboard Report  </b>	
														</div>
														
														 <div id="auth" class="controls">
															<label id="hardtoken" class="checkbox">
															<div id="uniform-undefined" style="float:left;"><span><div class="radio" id="uniform-assignH"><span class="checked"><input class="ass_deass_radio  authType" id="assignH" checked="checked" type="radio" name="ass" onclick="showDashBoardReportWise(1)" value="1" style="opacity: 0;"></span></div></span></div>  Day 
															</label>
															
															<label class="checkbox">
															<div id="uniform-undefined" style="float:left;"><span><div class="radio" id="uniform-assignM"><span><input class="ass_deass_radio authType" type="radio" id="assignM" name="ass" value="3" onclick="showDashBoardReportWise(7)" style="opacity: 0;"></span></div></span></div>  Weekly
															</label>
															<label class="checkbox">
															<div id="uniform-undefined" style="float:left;"><span><div class="radio" id="uniform-undefined"><span><input class="ass_deass_radio authType" type="radio" name="ass" value="6" onclick="showDashBoardReportWise(30)" style="opacity: 0;"></span></div></span></div>  Monthly 
															</label>
														 
															
															
														</div>
														<div class="clear"></div>

													</div>
												
												</div>
											 
											</div>
                        
                        
                        
                       <!--     <div id="deny_country_report_date"></div> --> 
                            
           
            
            <div class="loading" id="dateWiseReportLoading">
      <center><h4>  <i class="icon-spinner icon-spin icon-large"></i>
        Loading data ... </h4></center>
    </div>
            </div>       
                  </div>
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>
<!-- end for  Day / Weekly / Monthly wise dashboard Report    -->    



             <% } %>
            
            
            <!--Start Show Success and Unsuccess Report  -->
             <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                   <% if(SessionUtil.getRole().getId()!=5 && SessionUtil.getRole().getId()!=6 && SessionUtil.getRole().getId()!=7){ %>       
       
     <!--############ start comment  -->               
           <!--        <div class="row-fluid">
                   <div class="span12">
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-reorder"></i>Authentication&nbsp;Report</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                       	<div  class="widget-body form">
                     			<div class="widget-body">
                     			<div id="container_domain_auth"></div><div style="clear:both;"></div>
                                	<div id="container_grap_auth"></div>
                                	
                            	</div>
						</div>
                  <!-- END SAMPLE FORM widget-->
            <!--   </div>
                </div>
                    </div> -->
                    
                    
             <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>User Attempts & Authentication Type Reports</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                       	<div  class="widget-body form">
                     			<div class="widget-body">
                     			    <div id="container_user_attempts_domain"></div>
                     				<div id="container_domain_auth"></div>
                     			   <div class="pad" style="width: 100%;  height: 450px; margin: 0 auto" contenteditable="true">
                     	  	       <div class="fif"  id="container_user_attempts" style=" width: 49%; height: 450px"></div>
                     			   <div class="fif"  align="center" id="container_grap_auth" style=" width: 49%; height: 450px"></div> 
                     		    </div>
                               </div>
						</div>
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>

                    
                    
                    
                    
     <!--######### end comment  -->                 
                    
                 <% } %>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>
				      
				      

        <% if(SessionUtil.getRole().getId()!=5 && SessionUtil.getRole().getId()!=6 && SessionUtil.getRole().getId()!=7){ %>   
<!-- start for user attempts stats  -->      
                     
                                          <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Top&nbsp;Deny By Country & Top 5 Deny IP Details Reports</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                       	<div  class="widget-body form">
                     			<div class="widget-body">
                     			    <div id="container_top_deny_by_country_domain"></div>
                     				<div id="container_ip_details_domain"></div>
                     			   <div class="pad" style="width: 100%;  height: 350px; margin: 0 auto" contenteditable="true">
                     	  	       <div class="fif"  id="container_top_deny_by_country" style=" width: 49%; height: 350px"></div>
                     			   <div class="fif"  align="center" id="container_top_unsuccess_ip" style=" width: 49%; height: 350px"></div> 
                     		    </div>
                               </div>
						</div>
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>


<!-- end for user attempts stats  -->     
				      
				      
				      <!-- start for user attempts stats  -->      
                     
                                          <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Token&nbsp;Details&nbsp;&&nbsp;Login&nbsp;Time&nbsp;Reports</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                       	<div  class="widget-body form">
                     			<div class="widget-body">
                     			<div id="container_domain_token_details" ></div>
                     			<div id="container_domain_login_time"></div>
                     			
                     			   <div class="pad" style="width: 100%;  height: 450px; margin: 0 auto" contenteditable="true">
                     	  	       <div class="fif"  id="container_token_details" style=" width: 49%; height: 450px"></div>
                     	  	       <div class="fif"  align="center" id="container_login_time" style=" width: 49%; height: 450px"></div> 
                     		    </div>
                               </div>
						</div>
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>


<!-- end for user attempts stats  -->  
				      
				      
				      
				           <!-- start for NeverLoggedIn stats  -->      
                     
                                          <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Never LoggedIn User & Top 5 Unsuccessful User Attempts Reports</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                       	<div  class="widget-body form">
                     			<div class="widget-body">
                     			<div id="container_domain_never_loggedin" ></div>
                     			<div id="container_top_usr_Unsuccessful_attempts_attempts_domain"></div>
                     			
                     			   <div class="pad" style="width: 100%;  height: 400px; margin: 0 auto" contenteditable="true">
                     	  	       <div class="fif"  id="container_never_loggedin" style=" width: 49%; height: 400px"></div>
                     	  	       <div class="fif"  align="center" id="container_top_usr_Unsuccessful_attempts" style=" width: 49%; height: 400px"></div> 
                     		    </div>
                               </div>
						</div>
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>


<!-- end for NeverLoggedIn stats  -->  
				      
	
		 
		 
		 
		 <!--   -->
	  <div class="row-fluid">
               <div class="span12">
                  <!-- BEGIN SAMPLE FORM widget-->   
                  <div class="widget">
                     <div class="widget-title">
                        <h4><i class="icon-share-alt"></i>Primary/Secondary Authentication Reports</h4>
                        <span class="tools">
                           <a href="javascript:;" class="icon-chevron-down"></a>
                           <a href="javascript:;" class="icon-remove"></a>
                        </span>
                     </div>
                       	<div  class="widget-body form">
                     			<div class="widget-body">
                     			    <div id="container_auth_domain"></div>
                     			     <div id="container_tiles_domain"></div>
                     				 <div class="pad" style="width: 100%;  height: 450px; margin: 0 auto" contenteditable="true">
                     	  	       		<div class="fif"  id="container_auth_dashboard" style=" width: 49%; height: 450px"></div>
                     	  	       		<div class="fif"  align="center" id="container_tiles_dashboard" style=" width: 49%; height: 450px"></div> 
                     			    </div>
                                </div>
						</div>
                  <!-- END SAMPLE FORM widget-->
               </div>
            </div>

            <!-- END PAGE CONTENT-->         
         </div>

<!--   -->
		 
		 <% } %>		      
	
	

	
	  <% if(SessionUtil.getRole().getId() != 1  && SessionUtil.getRole().getId() != 2  && SessionUtil.getRole().getId() != 2 && SessionUtil.getRole().getId() != 4  ) { %> 
		<div class="row-fluid">
                            <div class="span12">
                                <!-- BEGIN EXAMPLE TABLE widget-->
                                <div class="widget">
                                    <div class="widget-title">
                                        <h4><i class="icon-file"></i> Data</h4>
                                        <span class="tools">
                                           <a href="javascript:;" class="icon-chevron-down"></a>
                                           <a href="javascript:;" class="icon-remove"></a>
                                         </span>                                       
                                     </div>
                                   
                                    <div class="widget-body scroll-div">
                                         <div class="row-fluid">
                                            <!--<h4>Users Details</h4> -->
                                            <!-- Add div for show users details data , added by abhimanyu -->
                                            <div id="dashboard_users_details_data"></div>
                                          </div>
                                         
<!--                                           <center> <display:table class="table table-striped table-bordered" name="${userDetailVO}" uid="vo"    cellspacing="1px" cellpadding="2px"  export="true" id="sample_1" ></center>				  -->
<!--				  <display:setProperty name="export.pdf" value="true" />-->
<!--	 <display:setProperty name="export.excel.filename" value="user_token_association.xls" />-->
<!--	  <display:setProperty name="export.csv.filename" value="user_token_association.csv" />-->
<!--	  <display:setProperty name="export.xml.filename" value="user_token_association.xml" />-->
<!--					   <display:setProperty name="export.pdf.filename" value="dashboard.pdf" />-->
<!--						  <display:setProperty name="export.pdf.include_header" value="true" />			-->
<!--					<display:column class="colId" title="S.No." ><s:property value="#attr.vo_rowNum" /></display:column>		-->
<!--					-->
<!--					-->
<!--					<display:column class="colId" title="User Name" property="userLoginId" />-->
<!--					<display:column class="colId" title="Authentication type" property="authenticationType" />-->
<!--					<display:column class="colId" title="Token serial/License Key" property="tokenSerial_licenseKey" />-->
<!--					-->
<!--					<display:column class="colId" title="User Status" property="userStatus"  />-->
<!--					<display:column class="colId" title="Last Login" property="lastOTPUsed"  />-->
<!--					-->
<!--						-->
<!--</display:table>	-->

<!--  // start code comment by Abhimanyu
                                        <table class="table table-striped table-bordered" id="sample_1">
                                            <thead>
                                            <tr>
                                                <th style="width:8px;">S.No.</th>                                            
                                                <th class="hidden-phone">User LogonId</th>
                                                <th class="hidden-phone">Authentication type</th>
                                                <th class="hidden-phone">Token serial/License Key</th>
                                                <th class="hidden-phone">Token Expiry</th>
                                                <th class="hidden-phone">User Status</th>
                                                <th class="hidden-phone">Last OTP used time</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <s:iterator value="userDetailVO" status="test">
                                         <tr class="odd gradeX">
                                            <td><s:property value="#test.index"/></td>
                                            <td><s:property value="userLoginId"/></td>
                                            <td class="hidden-phone"><s:property value="authenticationType"/></td>
                                            <td class="hidden-phone"><s:property value="tokenSerial_licenseKey"/></td>
                                            <td class="center hidden-phone"><s:property value="TokenExpiry"/></td>
                                            <td class="hidden-phone"><s:property value="userStatus"/></td>
                                            <td class="hidden-phone"><s:property value="lastOTPUsed"/></td>
                                        </tr>
                                       </s:iterator>
                                                                            
                                        </tbody>
                                        </table>
                                        
                                        
      // End code comment by Abhimanyu    -->
                                        
                                        <div class="expo_option">
                                <div class="row-fluid">
                                    <div class="span4"><h4>Export options:</h4></div>
                                    <div class="span8">
                                        <ul>
                                              
                                             <form method="post" id="reportForm">
                                            <li><a href="#" onclick="callCsvReport()" class="btn btn-primary">CSV</a></li>
                                            <li><a href="#" onclick="callExcelReport()" class="btn btn-primary">Excel</a></li>
                                            <li><a href="#" onclick="callXmlReport()"  class="btn btn-primary">XML</a></li>
                                            <li><a href="#" onclick="callPdfReport()"  class="btn btn-primary">PDF</a></li>    
                                            </form>                          
                                        </ul>
                                    </div>
                                </div>
                            </div>
                                   </div>
                                </div>
                                <!-- END EXAMPLE TABLE widget-->
                            </div>		      
				      
				      
				      
				      
				     
				
				      
				         
				         
            <!-- END PAGE CONTAINER-->
		</div>
		<!-- END PAGE -->
      	
        	<% } %>
        
	</div>
	</div>
	<!-- END CONTAINER -->
    
	<!-- BEGIN FOOTER -->
		    	<div id="myModal1" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
		<h3 id="myModalLabel">Add Report Column</h3>
	</div>
	<div id="mBody" class="modal-body"> 
	 
	 <table  id="sample_editable_2">
	 <tr><td><input type="checkbox" class="group-checkable" id="selectAllId" data-set="#sample_editable_2 .checkboxes" checked/> <b>Select All</b> </td></tr>
	 <tr><td> <input type="checkbox" name="userdetailsreportcolumn" class="checkboxes" value="User LogonId" checked/> User LogonId </td></tr>
	   <tr><td><input type="checkbox" name="userdetailsreportcolumn" class="checkboxes"  value="Authentication type" checked/> Authentication type  </td></tr>
	<tr><td>  <input type='checkbox' name="userdetailsreportcolumn" class='checkboxes'  value='Token serial/License Key' checked/> 	Token serial/License Key  </td></tr>
	<tr><td>  <input type='checkbox' name="userdetailsreportcolumn" class='checkboxes'  value='Token Expiry' checked/>  Token Expiry </td></tr>
	 <tr><td>  <input type='checkbox' name="userdetailsreportcolumn" class='checkboxes'  value='User Status' checked/>  User Status </td></tr>
</table>
 
	   
 </div>
	<div class="modal-footer">
	     <button class="btn btn-primary" onclick="exportUserDetailReport()">Export</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
		
	</div>
</div>

 
<!-- Modal -->
<div id="myModal2a" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">LICENSE REQUIRED</h4>
      </div>
      <div class="modal-body">
        

    
                        <!-- BEGIN FORM-->
                        Although you have been enrolled for 2FA security, No license has been assigned to you yet. Kindly contact your administrator for assigning a license to you. 
                   <!-- END FORM-->           
                    
                  




      </div>
      <div class="modal-footer">
      <!--  <button type="submit" onclick="changePassword()" class="btn btn-primary">Submit</button> -->
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>







	</div>
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
   
   <!-- ie8 fixes -->
   <!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->   
   
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
   <script type="text/javascript" src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>
   
   <%-- <script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.js" type="text/javascript"></script> --%>
   
   <%-- <script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.1.12.1.min.js" type="text/javascript"></script> --%>
  
   <script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>
  
    <script src="<%= request.getContextPath() %>/web/js/custom/tokenstockreportdashboard.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/custom/authenticationReportDashboard.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/custom/tokenDetailsDashboard.js"></script>
     <script src="<%= request.getContextPath() %>/web/js/custom/loginTimeReportDashboard.js"></script>
       <script src="<%=request.getContextPath() %>/web/js/highcharts_dashboard.js"></script>
     <script src="<%= request.getContextPath() %>/web/js/custom/system_stats.js"></script>
        <script src="<%= request.getContextPath() %>/web/js/custom/protocol_system_stats.js"></script>
        <script src="<%= request.getContextPath() %>/web/js/custom/authentication_dashboard.js"></script><!-- Added By Saurabh -->
         <script src="<%= request.getContextPath() %>/web/js/custom/systemTilesDashboard.js"></script> <!-- Added By Saurabh -->
       <script src="<%= request.getContextPath() %>/web/js/custom/user_attempts.js"></script>
          <script src="<%= request.getContextPath() %>/web/js/custom/ip_details_dashboard.js"></script>
           <script src="<%= request.getContextPath() %>/web/js/custom/top_user_Unsuccessful.js"></script>
             <script src="<%= request.getContextPath() %>/web/js/custom/serverStatus.js"></script>
               <script src="<%= request.getContextPath() %>/web/js/custom/denyByCountryDashboard.js"></script>
             <script src="<%= request.getContextPath() %>/web/js/custom/topDenyByCountryDashboard.js"></script>
         
          
          <script src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
    <script src="<%=request.getContextPath() %>/web/js/highcharts-more.js"></script>
     <script src="<%=request.getContextPath() %>/web/js/solid-gauge.js"></script>
         <script src="<%=request.getContextPath() %>/web/js/highcharts-3d.js"></script>
      <script src="<%= request.getContextPath() %>/web/js/custom/neverLoggedInDashboard.js"></script>
      
         <script src="<%= request.getContextPath() %>/web/js/highmaps.js"></script>
    <script src="<%= request.getContextPath() %>/web/js/data.js"></script>
   <script src="<%= request.getContextPath() %>/web/js/world.js"></script>
   
    <script src="<%= request.getContextPath() %>/web/js/jspdf.min.js"></script>
  
  
  
  <input type="hidden" id="id_image_Path"/>
   
   <script>
   var reportType = '1';
   var role;
      jQuery(document).ready(function() {       
         // initiate layout and plugins
         App.init();
      
		 TableEditable.init();
		 var domain="<%=domain1 %>";
		 role=<%=SessionUtil.getUserMapping().getRole().getId()%>
		 var filePath="<%=imagePath%>";
		 var tranFlag="<%=str%>"
		 $("#id_image_Path").val(filePath);
		 if(role!=5 && role!=6 && role!=7)
			{
		        try { showTokenStock(domain); }catch(err) {}
				try { showAuthenticationReport(domain); }catch(err) {}
				try { tokenDetailsDashBord(domain); }catch(err) {}
				try { systemTilesDashboardReport(domain,reportType) } catch(err){}
				try { loginTimeDashBord(domain,reportType); }catch(err) {}
				try { showSystemStats(); }catch(err) {}
				
			    try {if(tranFlag==1) showProtocolSystemStats(); }catch(err) {}
			    try { showAuthenticationReportDashbaord(domain); }catch(err) {}
				try { showUserAttempts(domain,reportType); }catch(err) {}
				try { showIpDetailsDashboard(domain,reportType); }catch(err) {}
				try { neverLoggedInReport(domain,reportType); }catch(err) {}
				try { showTopUserUnsuccessfulAttempts(domain , reportType); }catch(err) {}
				
			    try { getServerStatus(); }catch(err) {}
			    //try { showDenyByCountryDashboardReport(domain); }catch(err) {}
			      try { showTopDenyByCountryDashboardReport(domain,reportType); }catch(err) {alert(err);}
		      try{ $("#dateWiseReportLoading").hide(); }catch(err){}
			}
			
		 
		 if((role!=1) && (role!=2) && (role!=3) && (role!=4)) {
		    	try { showDashBoardUsersDetails(false,false,role); } catch(e) {alert(e);}
		  }
			
      });
 
   $(document).ready(function()
	 {
	   
	   setInterval( function() {
			 $.ajax({url: "/mfid/requestSession_getServerTime.action", success: function(result){
			         $("#Date").html(result);
			      
			    }});
			}, 1000);  
   
	});
	
	
	/* 	$(document).ajaxStart(function(){
  
    $("#loading_common").css("display","block");
     $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
     // alert("start");
  });
  
  $(document).ajaxComplete(function(){
    
    $("#loading_common").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
     // alert("complete");
  });   */
   
	
      
   </script>
  
   <!--<script src="<%= request.getContextPath() %>/web/js/highcharts.js"></script>
   
   --><!--
   <script src="<%=request.getContextPath() %>/web/js/exporting.js"></script>
   -->
   
   
   
   <script>
   





$('#myModal').on('shown.bs.modal', function (e){


resyncClock();


	
});  

 
 
 

//jQuery('.group-checkable').live('change',function(){
	$(document).on('click', '.group-checkable', function() {
	//alert("group checkable");
		var set = jQuery(this).attr("data-set");
		//alert(set);
		var checked = jQuery(this).is(":checked");
		//alert(checked);
		if(checked)
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
		}
		jQuery.uniform.update(set);
	});    
    
      
function resetAllCheckbox(){
          var set = jQuery(".group-checkable").attr("data-set");
	       var checked = jQuery(".group-checkable").is(":checked");
	       if(!checked){
	       $('.group-checkable').attr("checked", true);
	        jQuery('.group-checkable').uniform();
	       checked = jQuery(".group-checkable").is(":checked");
	      
	       }
	       
	     if(checked)
		      {
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
			 
			jQuery(set).each(function () {
			
				if (checked) {
					$(this).attr("checked",true);
				} else {
					$(this).attr("checked",false);
				}
			});
				
		}
		
		jQuery.uniform.update(set);
} 

function showDashBoardReportWise(type)
{
  
  var domain="<%=domain1 %>";
  role=<%=SessionUtil.getUserMapping().getRole().getId()%>
  reportType= type;
     if(role!=5 && role!=6 && role!=7)
			{
			   try{ $("#dateWiseReportLoading").show(); }catch(err){}
		      //  try { showTokenStock(domain); }catch(err) {}
				try { showAuthenticationReport(domain); }catch(err) {}
				try { tokenDetailsDashBord(domain); }catch(err) {}
				try { systemTilesDashboardReport(domain,reportType); } catch(err){}
				try { loginTimeDashBord(domain,reportType); }catch(err) {}
			//	try { showSystemStats(); }catch(err) {}
				
			 //   try {if(tranFlag==1) showProtocolSystemStats(); }catch(err) {}
			
				 try { showAuthenticationReportDashbaord(domain); }catch(err) {}
				try { showUserAttempts(domain,reportType); }catch(err) {}
				try { showIpDetailsDashboard(domain,reportType); }catch(err) {}
				try { neverLoggedInReport(domain,reportType); }catch(err) {}
				try { showTopUserUnsuccessfulAttempts(domain , reportType); }catch(err) {}
				
			//    try { getServerStatus(); }catch(err) {}
			    //try { showDenyByCountryDashboardReport(domain); }catch(err) {}
			      try { showTopDenyByCountryDashboardReport(domain,reportType); }catch(err) {}
			     try{ setTimeout(function(){$("#dateWiseReportLoading").hide(); },5000);   }catch(err){}
			}
}


if(showAlertMessageForNotAssociatedUser=="1"){  
	$('#myModal2a').modal('show');
	}

</script>
 
<!--</s:form>  -->
</body>
<!-- END BODY -->
</html>