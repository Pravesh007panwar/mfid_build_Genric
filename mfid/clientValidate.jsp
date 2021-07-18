<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 

<html>
  <head>
    <title>WebForm1</title>
    <meta name="GENERATOR" Content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" Content="C#">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">
  </head>
    
  <body>

 <script src="./web/js/jquery-3.2.1.min.js"></script>

 <center>
 <p>Fingerprint authentication.  </p>
 <br/><br/>
  UserID:  <input type="text" id="userID" name="userID" placeholder="Enter userID" value="">
   <br><br>
    <button onclick="submitForm()">Submit</button>
 
 </center>


 


<script language="javascript">

var myWindow;

function myFunction() {

var x = screen.width/2 - 400/2;
    var y = screen.height/2 - 400/2;
      myWindow = window.open('', 'Reliance Authenticator','height=400,width=400,left='+x+',top='+y);
    myWindow.document.write("<p><img src='smiley.gif' alt='Smiley face' height='100%' width='100%'></p>");

    setTimeout(function(){ 


//alert("Hello");
 myWindow.close();

 }, 1000);
}



	
	function submitForm()
	{
//myFunction();

		

var userID = document.getElementById("userID").value;
		//alert(userID);
		var response;
		  response = window.showModalDialog('<%= request.getContextPath() %>/serverValidate.jsp?Userid='+userID, response, 'center:yes;resizable:no;dialogHeight:400px;dialogWidth:600px;scrollbars=no');
     

//alert(response.UserID + " " + response.Token + " " + response.Errorcode + " " + response.Errormsg);
	
	var token = response.Token;
//alert(token);
//myWindow.close();
alert("Finger authentication Response Msg : "+response.Errormsg+" , Response Code : "+response.Errorcode)

if(response.Token != "")
{
	var url = "<%= request.getContextPath() %>/otp_checkCBSToken.action?UserID="+userID+"&Token="+token;
	 $.get(url, function(data, status){
           // alert("Data: " + data + "\nStatus: " + status);
      // alert("Token authentication Response Code :  " + data);


        });
	
}	
	
	
	}
	
	
function OpenActiveX()
{
    var sadsd;
	sadsd = window.showModalDialog('http://127.0.0.1:8080/a.jsp?Userid=ashish', sadsd, 'center:yes;resizable:no;dialogHeight:400px;dialogWidth:600px;scrollbars=no');
    alert(sadsd.UserID + " " + sadsd.Token + " " + sadsd.Errorcode + " " + sadsd.Errormsg);
	
 }	


</script>

  </body>
</html>
