<%@page import="com.mfid.common.util.SessionUtil"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags"%> --%>
<%@page import="com.mfid.common.util.StringUtil"%>
<%@page import="com.mfid.common.util.DataBaseUtility"%>
<%@ page
	import="java.util.*, java.lang.*,com.mfid.common.*,com.opensymphony.xwork2.ActionContext,com.mfid.common.util.PropertyFileUtility"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8" />

<link rel="shortcut icon"
	href="<%= request.getContextPath() %>/web/img/favicon.ico"
	type="image/ico" />
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="" name="description" />
<meta content="" name="author" />
<base />

<% 
String empAccessFlag = null;

/**
 * @author puneet
 * Commented by puneet vats for as properties moved to database
 */
//empAccessFlag = new PropertyFileUtility().fetchPropertyFileAttribute("update.employeeid.schedular");
 com.innefu.mfid.dataaccess.om.Properties properties=DataBaseUtility.getPropertiesValues();
	
 empAccessFlag = properties.getUpdateEmployeeidSchedular();
		 
%>

<%
	System.out.println("domain in verify ######## user===== ");
	//Map session1 = (Map) ActionContext.getContext().get("session");
	
	
	try{
		//roleMap=new HashMap<String, ArrayList<String>>();
		Map session1 = (Map) ActionContext.getContext().get("session");
		
			
	}
	catch(Exception e)
	{
		
	e.printStackTrace();
	//response.sendRedirect("../admin/login.jsp"); 
	}
	%>
<script
	src="<%= request.getContextPath() %>/web/js/custom/emergency_auth.js"
	type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/manageuser.js"
	type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/resync_Clock.js"
	type="text/javascript"></script>
<script src="<%= request.getContextPath() %>/web/js/custom/shadow.js"
	type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/reassociate.js"
	type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/change-auth.js"
	type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/associate_manually.js"
	type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/associate_random.js"
	type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/deassociate_token.js"
	type="text/javascript"></script>
<script
	src="<%= request.getContextPath() %>/web/js/custom/assign-deassign.js"
	type="text/javascript"></script>
	
<script
	src="<%= request.getContextPath() %>/web/js/custom/assign_shadow_user.js"
	type="text/javascript"></script>
	
<%-- <script src="= request.getContextPath()/web/js/custom/assign_deassign_app.js" type="text/javascript"></script> --%>
<link
	href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap.min.css"
	rel="stylesheet" />
<link
	href="<%= request.getContextPath() %>/web/assets/bootstrap/css/bootstrap-responsive.min.css"
	rel="stylesheet" />
<link
	href="<%= request.getContextPath() %>/web/assets/font-awesome/css/font-awesome.css"
	rel="stylesheet" />
<link href="<%= request.getContextPath() %>/web/css/style.css"
	rel="stylesheet" />
<link
	href="<%= request.getContextPath() %>/web/css/style_responsive.css"
	rel="stylesheet" />
<link href="<%= request.getContextPath() %>/web/css/style_default.css"
	rel="stylesheet" id="style_color" />
<link
	href="<%= request.getContextPath() %>/web/assets/fancybox/source/jquery.fancybox.css"
	rel="stylesheet" />

<link
	href="<%= request.getContextPath() %>/web/assets/fullcalendar/fullcalendar/bootstrap-fullcalendar.css"
	rel="stylesheet" />
<link
	href="<%= request.getContextPath() %>/web/assets/jqvmap/jqvmap/jqvmap.css"
	media="screen" rel="stylesheet" type="text/css" />
<!-- BEGIN PAGE LEVEL STYLES -->
<link
	href="<%= request.getContextPath() %>/web/assets/dropzone/css/dropzone.css"
	rel="stylesheet" />
<!-- END PAGE LEVEL STYLES -->

<!--for DataTable-->
<%-- <link href="<%= request.getContextPath() %>/web/css/jquery-ui-1.7.2.custom.css" rel="stylesheet" id="style_color" /> --%>
<link
	href="<%=request.getContextPath()%>/web/css/jquery-ui.1.12.1.min.css"
	rel="stylesheet" id="style_color" />
<!--End for DataTable-->
</head>


<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="fixed-top">
	<!-- BEGIN HEADER -->
	<%@ include file="/common/header.jsp"%>
	<!-- END HEADER -->
	<div id="loading"
		style="display: none; width: 100%; height: 550px; position: fixed; top: 50%; left: 50%; z-index: 25;">
		<img
			src='<%=request.getContextPath() %>/web/img/ajax_loader_gray_64.gif'
			width="64" height="64" /><br>Loading.. 
	</div>
	<!--<s:form name="f1" validate="true" theme="simple" >-->

<input type="hidden" id="adDomainId" />
	<!-- BEGIN CONTAINER -->
	<div id="container" class="row-fluid">
		<!-- BEGIN SIDEBAR -->
		<div id="sidebar" class="nav-collapse collapse">
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
			<div class="sidebar-toggler hidden-phone"></div>
			<!-- BEGIN SIDEBAR TOGGLER BUTTON -->

			<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->


			<!-- BEGIN SIDEBAR MENU -->
			<%@ include file="/common/menu.jsp"%>
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
						<h3 class="page-title">Users</h3>
						<ul class="breadcrumb">
							<li><a
								href="<%= request.getContextPath() %>/login_showDashboardAgain"><i
									class="icon-home"></i></a><span class="divider">&nbsp;</span></li>
							<li><a href="#">User</a> <span class="divider">&nbsp;</span>
							</li>
							<li><a
								href="<%= request.getContextPath() %>/admin_showManageUser">Manage
									User</a><span class="divider-last">&nbsp;</span></li>
						</ul>
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<!-- BEGIN PAGE CONTENT-->
				<div id="page" class="dashboard">

					<div class="square-state">
						<div class="row-fluid ">
							<div class="span12">
								<!-- BEGIN TAB PORTLET-->
								<div class="widget widget-tabs">
									<div class="widget-title">
										<h4>
											<i class="icon-retweet"></i>User&nbsp;Operation
										</h4>
										<span class="tools"> <a href="javascript:;"
											class="icon-chevron-down"></a> <a href="javascript:;"
											class="icon-remove"></a>
										</span>
									</div>

									<div class="widget-body">
										<div class="tabbable table_tab_box tabbable-custom">
											<div class="row-fluid">

												<a id="tab_1" class="icon-btn span2 active"
													href="#block_active_assign_deassign" data-toggle="tab">
													<span> <i class="icon-group"></i>
														<div>Assign / Deassign Application</div>
												</span>
												</a> <a id="tab_2" class="icon-btn span2"
													href="#block_active_authentication" data-toggle="tab">
													<span> <i class="icon-key"></i>
														<div>Change Authentication</div>
												</span>
												</a> <a class="icon-btn span2" href="#block_active_shadow"
													data-toggle="tab"> <span> <i class="icon-user"></i>
														<div>Shadow</div>
												</span>
												</a> <a class="icon-btn span2"
													href="#block_active_associate_deassociate"
													data-toggle="tab"> <span> <i class="icon-group"></i>
														<div>Associate</div>
												</span>
												</a> <a id="tab_4" class="icon-btn span2"
													href="#block_active_deassociate" data-toggle="tab"> <span>
														<i class="icon-group"></i>
														<div>Deassociate</div>
												</span>
												</a> <a class="icon-btn span2" href="#block_emergency_auth"
													data-toggle="tab"> <span> <i class="icon-group"></i>
														<div>Emergency Authentication</div>
												</span>
												</a>




											</div>
											
																						
											<div class="row-fluid" style="margin-top: 2em;">
											<a class="icon-btn span2" href="#block_assign_shadow"
													data-toggle="tab"> <span> <i class="icon-group"></i>
														<div>Assign Shadow to Multiple Users</div>
												</span>
												</a>
											</div>
											

											<div class="tab-content">
												<div class="tab-pane " id="block_active_assign_deassign">
													<span class="close"><a href="#"><i
															class="icon-remove-sign"></i></a></span>
													<div class="row" style="height: 20px;"></div>
													<div
														style="padding: 10px; background: #f4f4f4; border: solid 1px #ddd; display: block; margin: 10px 0px;">
														<h4>Assign / Deassign</h4>

														<div class="row-fluid">
															<div class="span4">
																<select onchange="selectDefaultApp()" name="application"
																	id="assign_deassign">
																	<option value=''>--Assign/Deassign--</option>
																	<option value='assign'>Assign</option>
																	<option value='deassign'>Deassign</option>
																</select>
															</div>
															<div class="span4 offset4">
																<s:select cssClass="ass-dss-select span12"
																	theme="simple" id="application" name="application"
																	headerKey="" headerValue="--Select Application--"
																	list="#session.applicationList" />

															</div>



														</div>


													</div>
													<div class="clear"></div>

													<div id="block_active_assign_deassign_data"></div>
												</div>





												<div class="tab-pane" id="block_active_authentication">
													<div id="block_active_authentication_data"></div>

												</div>

												<div class="tab-pane" id="block_active_shadow">
													<span class="close"><a href="#"><i
															class="icon-remove-sign"></i></a></span>
													<div class="row" style="height: 20px;"></div>
													<div
														style="padding: 10px; background: #f4f4f4; border: solid 1px #ddd; display: block; margin: 10px 0px;">
														<div class="row-fluid">
															<div class="controls">

																<label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input name="shadow_token"
																			class="shadow_radio" checked='' type="radio"
																			value="ht"></span>
																	</div> Hard Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="shadow_radio" type="radio"
																			name="shadow_token" value="mt"></span>
																	</div> Mobile Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="shadow_radio" type="radio"
																			name="shadow_token" value="bt"></span>
																	</div> Bio Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="shadow_radio" type="radio"
																			name="shadow_token" value="pt"></span>
																	</div> Push Token
																</label> <input type="button" id="shadow_btn" value="Submit"
																	class="btn btn-primary">
															</div>

															<div class="clear"></div>

														</div>

													</div>
													<form name="tab_3_frm" id="tab_3_frm" method="post"
														action="">
														<input type="hidden" id="tab_3_input" name="tab" />
														<div id="block_active_shadow_data"></div>
													</form>
												</div>

												<div class="tab-pane " id="block_active_associate_manually">
													<span class="close"><a href="#"><i
															class="icon-remove-sign"></i></a></span>
													<div class="row" style="height: 20px;"></div>
													<div
														style="padding: 10px; background: #f4f4f4; border: solid 1px #ddd; display: block; margin: 10px 0px;">
														<div class="row-fluid">
															<div class="controls">
																<label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="assm_m_radio"
																			name="ass_manually" checked='' type="radio"
																			value="ht"></span>
																	</div> Hard Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="assm_m_radio" type="radio"
																			name="ass_manually" value="mt"></span>
																	</div> Mobile Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="assm_m_radio" type="radio"
																			name="ass_manually" value="bt"></span>
																	</div> Bio Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="assm_m_radio" type="radio"
																			name="ass_manually" value="pt"></span>
																	</div> Push Token
																</label> <input type="button" id="assm_m_btn" value="Submit"
																	class="btn btn-primary">
															</div>

															<div class="clear"></div>

														</div>

													</div>
													<form name="tab_4_frm" id="tab_4_frm" method="post"
														action="">
														<input type="hidden" id="tab_4_input" name="tab" />
														<div id="block_active_associate_manually_data"></div>
													</form>
												</div>
												<div class="tab-pane"
													id="block_active_associate_deassociate">
													<span class="close"><a href="#"><i
															class="icon-remove-sign"></i></a></span>
													<div class="row" style="height: 20px;"></div>
													<div
														style="padding: 10px; background: #f4f4f4; border: solid 1px #ddd; display: block; margin: 10px 0px;">
														<div class="row-fluid">
															<div class="span4">
																<select name="associate_deassociate"
																	onchange="showAuth()" id="associate_deassociate">
																	<option value=''>-Select Associate-</option>
																	<option value='associate'>Associate</option>
																	<option value='associatemanually'>Associate
																		Manually</option>
																	<!--  <option value='deassociate'>Deassociate</option>-->
																	<!-- <option value='reassociate'>Reassociate</option> -->
																</select>
															</div>

															<div id="auth" class="controls">
																<label id="hardtoken" class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="ass_deass_radio  authType"
																			id="assignH" checked='checked' type="radio"
																			name="ass" value="1"></span>
																	</div> Hard Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="ass_deass_radio authType"
																			type="radio" id="assignM" name="ass" value="3" /></span>
																	</div> Mobile Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="ass_deass_radio authType"
																			type="radio" name="ass" value="6"></span>
																	</div> Bio Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="ass_deass_radio authType"
																			type="radio" name="ass" value="7"></span>
																	</div> Push Token
																</label> <input type="button" id="associate_deassociate_btn"
																	value="Submit" class="btn btn-primary" />
															</div>
															<div class="clear"></div>

														</div>

													</div>
													<form name="tab_5_frm" id="tab_5_frm" method="post"
														action="">
														<input type="hidden" id="tab_5_input" name="tab" />
														<div id="block_active_associate_deassociate_data"></div>
													</form>
												</div>


												<div class="tab-pane" id="block_active_deassociate">
													<span class="close"><a href="#"><i
															class="icon-remove-sign"></i></a></span>
													<div class="row" style="height: 20px;"></div>
													<div
														style="padding: 10px; background: #f4f4f4; border: solid 1px #ddd; display: block; margin: 10px 0px;">
														<div class="row-fluid">
															<div class="controls">
																<label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="deass_radio" type="radio"
																			checked='' name="deass" value="1"></span>
																	</div> Hard Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="deass_radio" type="radio"
																			name="deass" value="3"></span>
																	</div> Mobile Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="deass_radio" type="radio"
																			name="deass" value="6"></span>
																	</div> Bio Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="deass_radio" type="radio"
																			name="deass" value="7"></span>
																	</div> Push Token
																</label> <input type="button" id="deassociate_btn"
																	value="Submit" class="btn btn-primary" />
															</div>
															<div class="clear"></div>

														</div>

													</div>
													<form name="tab_6_frm" id="tab_6_frm" method="post"
														action="">
														<input type="hidden" id="tab_6_input" name="tab" />
														<div id="block_active_deassociate_data"></div>
													</form>
												</div>
												<div class="tab-pane" id="block_emergency_auth">
													<span class="close"><a href="#"><i
															class="icon-remove-sign"></i></a></span>
													<div class="row" style="height: 20px;"></div>
													<div
														style="padding: 10px; background: #f4f4f4; border: solid 1px #ddd; display: block; margin: 10px 0px;">
														<div class="row-fluid">
															<!--<div class="span4">
															<select   name="emergency_auth_ass"  id="emergency_auth_ass">
																<option value=''>-Select Assign/Deassign-</option>
																<option value='not assigned'>Assign</option>
																<option value='assigned'>DeAssign</option>
															
															</select>
														</div>
														-->
															<div class="controls">
																<label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input name="emergency_radio"
																			class="deass_radio" type="radio" checked=''
																			name="deass" value="1"></span>
																	</div> Hard Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input name="emergency_radio"
																			class="deass_radio" type="radio" name="deass"
																			value="3"></span>
																	</div> Mobile Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input name="emergency_radio"
																			class="deass_radio" type="radio" name="deass"
																			value="6"></span>
																	</div> Bio Token
																</label>
																 <label class="checkbox">
															<div class="radio" id="uniform-undefined"><span><input name="emergency_radio"  class="deass_radio" type="radio" name ="deass" value="7"></span></div> Push Token
															</label>
															
															
												 
																<input type="button" id="emergency_btn" value="Submit"
																	class="btn btn-primary" />
															</div>
															<div class="clear"></div>

														</div>

													</div>
													<form name="tab_6_frm" id="tab_6_frm" method="post"
														action="">
														<input type="hidden" id="tab_6_input" name="tab" />
														<div id="emergency_btn_data"></div>
													</form>
												</div>
												
												
																								
												
												<div class="tab-pane " id="block_assign_shadow">
													<span class="close"><a href="#"><i
															class="icon-remove-sign"></i></a></span>
													<div class="row" style="height: 20px;"></div>
													<div
														style="padding: 10px; background: #f4f4f4; border: solid 1px #ddd; display: block; margin: 10px 0px;">
														<div class="row-fluid">
															<div class="span4">
																<s:select cssClass="ass-dss-select span12" onchange="showShadowApp(this)"
																	theme="simple" id="application-id" name="application"
																	headerKey="" headerValue="--Select Token Assigned App--"
																	list="#session.applicationList" />
															</div>
															
														<!-- 	<div class="span4 offset4">
																<s:select cssClass="ass-dss-select span12"
																	theme="simple" id="shadow_application" name="shadowApplication"
																	headerKey="" headerValue="--Select Shadow Application--"
																	list="#session.applicationList" />

															</div>  -->

															<div class="controls">
																<label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="asshadow_radio" type="radio"
																			checked='' name="asshadow" value="1"></span>
																	</div> Hard Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="asshadow_radio" type="radio"
																			name="asshadow" value="3"></span>
																	</div> Mobile Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="asshadow_radio" type="radio"
																			name="asshadow" value="6"></span>
																	</div> Bio Token
																</label> <label class="checkbox">
																	<div class="radio" id="uniform-undefined">
																		<span><input class="asshadow_radio" type="radio"
																			name="asshadow" value="7"></span>
																	</div> Push Token
																</label> <input type="button" id="assign_shadow_usr_btn"
																	value="Submit" class="btn btn-primary" />
															</div>
															<div class="clear"></div>

														


														</div>


													</div>
													<div class="clear"></div>

													<div id="block_assign_to_app_data"></div>
												</div>
												

											</div>
										</div>





										<!--	 <div class="tab_bottom_box">
									<div class="row-fluid">
										<h4>Users</h4>
										<table class="table table-striped table-bordered" id="sample_6">
											<thead>
												<tr>
													<th style="width:8px;"><input type="checkbox" class="group-checkable" data-set="#sample_6 .checkboxes" /></th>
													
													<th>User Id</th> 
													<th> First Name</th> 
													<th>Last Name</th> 
													<th>Mail</th>
													<th>Mobile</th>
													<th>Token Type</th>
													<th>Locked / Unlocked Status</th>
													<th>Token Expiry</th>
													<th>Token Serial</th>
												
												</tr>
												<tr>
													<th></th>
													<th>User Id</th> 
													<th> First Name</th> 
													<th>Last Name</th> 
													<th>Mail</th>
													<th>Mobile</th>
													<th>Token Type</th>
													<th>Locked / Unlocked Status</th>
													<th>Token Expiry</th>
													<th>Token Serial</th>
													
												
												</tr>
											</thead>
										
										
									  <s:iterator value="manageuserDetailVO" >
                                         <tr >
                                            <td><s:checkbox name="chk" cssClass="checkboxes" theme="simple" fieldValue="%{userLoginId}" /></td>
                                            <td><s:property value="userLoginId"/></td>
                                            <td><s:property value="firstName"/></td>
                                            <td><s:property value="lastName"/></td>
                                            <td><s:property value="email"/></td>
                                            <td><s:property value="mobile"/></td>
                                            <td ><s:property value="authenticationType"/></td>
                                             <td ><s:property value="userStatus"/></td>                                            
                                            <td><s:property value="TokenExpiry"/></td>
                                           <td ><s:property value="tokenSerial_licenseKey"/></td>
                                           
                                        </tr>
                                       </s:iterator>        
										</table>
										<div class="form-actions form-actions2">
										  <button id='user_submit_btn'class="btn btn-primary" type="button" onclick="submitAction()">Submit</button>
										  <button class="btn" type="button">Reset</button>
										</div>
									</div>oka
                                    </div>
								</div>-->
									</div>
									<!-- END TAB PORTLET-->
								</div>
							</div>
						</div>
					</div>



					<!-- END PAGE CONTENT-->
					<!-- START MANAGE USER CONTENT -->

					<div class="row-fluid ">
						<div class="span12">
							<!-- BEGIN TAB PORTLET-->
							<div class="widget widget-tabs">
								<div class="widget-title">
									<h4>
										<i class="icon-retweet"></i>Manage&nbsp;User
									</h4>
									<span class="tools"> <a href="javascript:;"
										class="icon-chevron-down"></a> <a href="javascript:;"
										class="icon-remove"></a>
									</span>
								</div>

								<div class="widget-body">
									<div class="tab_bottom_box">
										<div class="row-fluid">

											<div class="tableManageUser" id="user_manage_data"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END MANAGE USER CONTENT -->
				</div>
				<!-- END PAGE CONTAINER-->
			</div>
			<!-- END PAGE -->


		</div>
		<!-- END CONTAINER -->

		<!-- BEGIN FOOTER -->
	</div>
	<div id="footer">
		<%=new PropertyFileUtility().fetchPropertyFileAttribute(ApplicationConstants.MFID_FOOTER_MESSAGE) %>
		<div class="span pull-right">
			<span class="go-top"><i class="icon-arrow-up"></i></span>
		</div>
	</div>
	<!-- END FOOTER -->


	<div id="showShadowUserList" class="modal fade" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">

				<div class="modal-body">


					<div class="widget-body form">

						<p>
							<b>Shadow user List </b>
						</p>
						<!-- BEGIN FORM-->
						<div id="showShadowUserListModalData"></div>
						<!-- END FORM-->
					</div>





				</div>
			</div>
		</div>
	</div>





	<!-- BEGIN JAVASCRIPTS -->
	<!-- Load javascripts at bottom, this will reduce page load time -->
	
	<script
		src="<%= request.getContextPath() %>/web/assets/bootstrap/js/bootstrap.min.js"></script>
	<script src="<%= request.getContextPath() %>/web/js/jquery.blockui.js"></script>
	<!-- ie8 fixes -->
	<!--[if lt IE 9]>
   <script src="js/excanvas.js"></script>
   <script src="js/respond.js"></script>
   <![endif]-->
	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/jquery.confirm.min.js"></script>
	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/jquery.confirm.js"></script>
	
	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.js"></script>
	<script type="text/javascript"
		src="<%= request.getContextPath() %>/web/js/in/DT_bootstrap.js"></script>

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script
		src="<%= request.getContextPath() %>/web/assets/dropzone/dropzone.js"></script>
	<!-- END PAGE LEVEL PLUGINS -->


	<!-- For Datatable (searching)-->


	<%-- <script src="<%= request.getContextPath() %>/web/js/in/jquery-ui.js" type="text/javascript"></script> --%>

	<%-- <script src="<%=request.getContextPath()%>/web/js/in/jquery-ui.1.12.1.min.js" type="text/javascript"></script> --%>

	<script
		src="<%= request.getContextPath() %>/web/js/in/jquery.dataTables.columnFilter.js"
		type="text/javascript"></script>
	<!-- End For Datatable (searching)-->

	<script src="<%= request.getContextPath() %>/web/js/scripts.js"></script>


	<script
		src="<%= request.getContextPath() %>/web/js/in/table-editable.js"></script>
	<script src="<%= request.getContextPath() %>/web/js/custom.js"></script>



	<script>
   
      jQuery(document).ready(function() { 
      try{
           
      //	alert("in ready");
     	
         // initiate layout and plugins
         App.init();
		// TableEditable.init();
		 TableEditable_mange_user.init(); 
		
		 }
		 catch(e)
		 {
		 	alert(e);
		 }
      });
   </script>
	<script src="<%= request.getContextPath() %>/web/js/highcharts.js"></script>
	<script src="<%= request.getContextPath() %>/web/js/exporting.js"></script>
	<script>
   
   
var empAccessFlag ='<%=empAccessFlag%>';
  var oTable_m_u ='';
   var role=<%=SessionUtil.getUserMapping().getRole().getId()%>
   $(document).ready(function()
	{
	   //alert("manageuser");
	 	showManageUser(false,false,role);
	 	removeManageUserFilter();
	 	
	});
   
 	$(document).ajaxStart(function(){
  
    $("#loading").css("display","block");
   //  $( "#submitbtn").hide();
    $('body').css("opacity","0.8");
     $( ".log" ).text( "Triggered ajaxStart handler." );
     // alert("start");
  });
  
  $(document).ajaxComplete(function(){
	//$('select option:contains("Select Size")').attr('disabled', true);
    $("#loading").css("display","none");
     $('body').css("opacity","1");
     $( ".log" ).text( "Triggerd ajaxComplete handler." );
     // alert("complete");
  });  
   
  
	// change event for Associate/Deassociate
	
   //$('.ass-dss-select').live('change',function(){
	$('.ass-dss-select').change(function(){   
  	//alert("show assign deassign");
  	removeAssignDeassignSearch();
   	showAssignDeassign(false,false,role);
   	});
   
    	//$('#associate_deassociate_btn').live('click',function(e){
    		$('#associate_deassociate_btn').on('click',function(e){
    		e.preventDefault();
    	
  			var temp=document.getElementById('associate_deassociate').value;
  			var authType=$('input:radio[name=ass]:checked').val();
  					
  		
  				 
		if (temp == "") {
				alert("Please Select associate ");
				return;
			}
			if (authType == undefined) {
				alert("Please select the AuthType");
				return;
			}

			
		if (temp == "associate") {
			$("#pageId_assRandom").val("");	
			showAssociateRandom(false, false);
		} else if (temp == "reassociate") {

				if (authType == 1) {
					alert("Please select the authtype");
					return;
				}

				showReassociate(false, false);

			} else if (temp == "associatemanually") {
				$("#loading").show();
			//	$('body').css("opacity", "0.8");
				showAssociateManually(false, false);

			} else {
				$("#pageId_deassociate").val("");
				showDeassociateToken(false, false);
			}
			
		});

		
		function showAuth() {
			try {
				$('.ass_deass_radio').parent().removeClass('checked');
				var temp = document.getElementById('associate_deassociate').value;

				var auth = $('input:radio[name=ass]:checked').val();

				if (temp == "reassociate") {

					$('#hardtoken').css({
						"display" : "none"
					});
					$('#assignM').parent().addClass('checked');
					$('#assignM').prop('checked', true);

				} else {
					$('#assignH').parent().addClass('checked');
					$('#assignH').prop('checked', true);
					$('#hardtoken').css({
						"display" : ""
					});

				}
			} catch (e) {
				alert(e);
			}
		}
		
		
		
		$('#assign_shadow_usr_btn').on('click', function() {
			
			showUserByAppAndToken(false, false);

		});

		$('#deassociate_btn').on('click', function() {
			$("#pageId_deassociate").val("");
			showDeassociateToken(false, false);

		});

		$('#assm_m_btn').on('click', function() {
			showAssociateManually();

		});

		
		$('#shadow_btn').on('click', function() {
			showShadow(false, false);
		});

		$(document).on('click', '#tab_2', function() {
			removeSearch();
			showChangeAuth(false, false);
		});

		$('#emergency_btn').on('click', function() {
			$("#pageId_emergencyauth").val("");
			showEmergencyAuth(false, false);
		});

		$('#tab_1').on('click',
			function() {
				//   alert("assign deassign");
				document.getElementById('assign_deassign').options[0].selected = 'selected';
				document.getElementById('application').options[0].selected = 'selected';
				$('#block_active_assign_deassign_data').html(
						'<span></span>');
		});

		$(document).on(
				'click',
				'.icon-btn',
				function() {
					//alert("icon btn");
					var href = $(this).attr('href');
					//alert("href   :"+href);
					var id = href.substr(1);

					// start code for bug id #338 , added by Abhimanyu

					try {
						if (id == 'block_active_assign_deassign')
							resetglobalAssignDeassignVariable();
						else if (id == 'block_active_authentication')
							resetglobalChangeAuthVariable();
						else if (id == 'block_active_shadow')
							resetglobalShadowVariable();
						else if (id == 'block_active_associate_deassociate') {
							resetglobalAssociateManuallyVariable();
							resetglobalAssociateRandomVariable();
						} else if (id == 'block_active_deassociate')
							resetglobalDeassociateTokenVariable();
						else if (id == 'block_emergency_auth')
							resetglobalEmergencyAuthVariable();
					} catch (err) {
					}
					// end code for bug id #338 , added by Abhimanyu   

					//	alert("id== "+id);
					if (id == 'block_active_associate_deassociate'
							|| id == 'block_active_associate'
							|| id == 'block_active_deassociate'
							|| id == 'block_active_shadow'
							|| id == 'block_active_associate_manually') {
						$('#' + id + '_data').html('');
						return true;
					}

					if (id == 'block_active_associate') {
						return true;
					}
					if (id == 'block_active_associate_deassociate') {
						return true;
					}
					if (id == "block_active_authentication") {
						//showChangeAuth();
					}

				});
		$(document).ready(function() {

			// $("#sample_1").css("width","100%");
			// $("#sample_2").css("width","100%");
			//For Datatable

			$.datepicker.regional[""].dateFormat = 'dd/mm/yy';
			$.datepicker.setDefaults($.datepicker.regional['']);

			$('#sample_6').dataTable().columnFilter({
				sPlaceHolder : "head:after",
				aoColumns : [ null, {
					type : "text"
				}, {
					type : "text"
				}, {
					type : "text"
				}, {
					type : "text"
				}, {
					type : "text"
				}, {
					type : "select",
					values : [ 'Mobile Token', 'Push Token', 'No Token' ]
				}, {
					type : "select",
					values : [ 'Yes', 'No' ]
				}, {
					type : "date-range"
				}, {
					type : "text"
				} ]
			});
			// End For Datatable

		});

		/*for select all checkbox*/

		//jQuery('.group-checkable').live('change',function(){
		$(document).on('click', '.group-checkable', function() {
			//jQuery('.group-checkable').live('change',function(){
			if (typeof ($(this).attr('id')) === 'undefined')
				$("#sample_editable_1_multi_delete").focus();
			var set = jQuery(this).attr("data-set");
			//alert(set);
			var checked = jQuery(this).is(":checked");
			//alert(checked);
			$(set).each(function() {
				$(this).prop('checked', checked);
			});

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

		$(document).on(
				'click',
				'.radio-group-checkable',
				function() {
					//jQuery('.radio-group-checkable').live('click',function(){

					var set = jQuery(this).attr("data-set");

					var checked = jQuery(this).is(":checked");
					jQuery('.group-checkable').attr("checked", true);
					var i = 0;
					jQuery(set).each(
							function() {
								//	alert(++i);
								if (checked) {
									$(this).prop("checked", true);

									// start of checkBox check

									try {

										//var elTableCells = $(this).parent().parent().get(0).tagName;
										var elTableCells = $(this).parent()
												.parent().get(0);

										//var inputtag=$($(elTableCells).children().get(0)).children().get(0).tagName;
										var inputtag = $(
												$(elTableCells).children().get(
														0)).children().get(0);

										var temp = $(inputtag).val();
										//alert("temp====="+temp);

										var parts = temp.split(",");
										var t = parts[1];
										//alert(t);
										/*	if(t==type){
										
												elTableCells[0].firstChild.checked = false;
											}
											else {  */

										$(inputtag).attr("checked", true);
										//	}  
									} catch (e) {
										alert(e);
									}

									//end of checkBox check

								} else {
									$(this).attr("checked", false);
								}
							});
					jQuery.uniform.update(set);
				});

		// start code for bug id #322 , added by abhimanyu
		$(function() {
			$(document).on('click', '#idcheckboxSelectAssignDeassign',
					function() {
						if ($(this).prop('checked'))
							$("#submitbtn").focus();
					});
			$(document).on('click', '.radio-group-checkable', function() {
				if ($(this).prop('checked'))
					$("#idSubmitButtonChangeAuth").focus();
			});
			$(document).on('click', '#idcheckboxSelectAssociateRandom',
					function() {
						if ($(this).prop('checked'))
							$("#idSubmitButtonAssociateRandom").focus();
					});
			$(document).on('click', '#idcheckboxSelectReassociate', function() {
				if ($(this).prop('checked'))
					$("#idSubmitButtonReassociate").focus();
			});
			$(document).on('click', '#idcheckboxSelectDeassociateToken',
					function() {
						if ($(this).prop('checked'))
							$("#idSubmitButtonDeassociateToken").focus();
					});
			$(document).on('click', '#idcheckboxSelectEmergencyAuth',
					function() {
						if ($(this).prop('checked'))
							$("#idSubmitButtonEmergencyAuth").focus();
					});
			$(document).on('click', '#idcheckboxSelectChangeAuth', function() {
				if ($(this).prop('checked'))
					$("#idSubmitButtonChangeAuth").focus();
			});
			$(document).on('click', '#idcheckboxSelectAssignShadow', function() {
				if ($(this).prop('checked'))
					$("#idSubmitButtonAssignShadow").focus();
			});
		});
		// end code for bug id #322 , added by abhimanyu
	</script>
	<!--</s:form>-->

	<input type="hidden" name="csrfPreventionSalt"
		id="csrfPreventionSaltId"
		value="<%=request.getAttribute("csrfPreventionSalt") %>" />
</body>
<!-- END BODY -->
</html>
