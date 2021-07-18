// JavaScript Document
jQuery(document).ready(function($) {
	$('.table_tab_box a').click(function(){
		$('.table_tab_box a').removeClass('tb_active');
		$(this).addClass('tb_active');
	});
	
	$(document).on('click','.close',function(){
			$('.tab-pane').removeClass('active');
			$('.table_tab_box a').removeClass('tb_active');
		});
	
});



function showQRNormalCode(){
							//alert("shyam")
							var object;
							$.ajax({
								type: "POST",  
								url:"admin_showQRNormalCode.action",
							    async: false,
								dataType: "text",
								success: function(data) {
									
									//alert("data==="+data)
									if($.trim(data)=="sessionout")
									{
									alert("Session TimeOut...");
									var testVal=document.getElementById('loginPage').value;
									window.location.replace(testVal);
									}
									
									object = JSON.parse(data);
									//alert("object==="+object)
									var obj1=JSON.parse(object.Base64EncodedImage);
									var obj2=JSON.parse(object.RandomKeyVal);
									
								//	alert("obj1====="+obj1)
									var content='';
									 content ='<div>';
									content += '<div >';
									content +='';
									content +='<img class="imagem_artigo" src="data:image/png;base64,'+obj1+'" alt="IMG DESC"> ';
									content +='';
									content += '</div>';
									content += '</div>';
									$('#qr_code').html(content);
									$('#randomKeyId').html("Activation Key : "+obj2);
									
									
								 }
							});
							
							 
		}
		

