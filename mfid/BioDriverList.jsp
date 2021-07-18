<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Bio Driver List</title>
<link rel="stylesheet" href="bioDriver/css/bootstrap.min.css">
<link rel="stylesheet" href="bioDriver/css/custom.css">

<script src="./web/js/jquery-3.2.1.min.js"></script>
<script>
 

$(document).ready(function(){
 $.ajax({
  url: './bioDriver/driverList.csv',
  dataType: 'text',
}).done(successFunction);
});

function successFunction(data) {
  var allRows = data.split(/\r?\n|\r/);
  var rowListData = '';
  var counterRows = 0;
  for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
 
    var rowCells = allRows[singleRow].split(',');
    try{
    if (singleRow !== 0 && $.trim(rowCells) !== ''){
     rowListData += '<div class="col-md-3 item_display"> <div class="item_box"><img src="'+rowCells[3]+'" class="sensor_icon" />';
     rowListData += '<span class="item_name">'+rowCells[0]+'</span>';
     rowListData += '<span class="item_name1">'+rowCells[1]+'</span>';
     rowListData += '<span class="item_name2">'+rowCells[2]+'</span>';
     rowListData += '<span class="click_download"><a href="'+rowCells[4]+'">Click to Download</a></span>';
     rowListData += '</div></div>';
     rowListData += '';
     }
     }
     catch(err){}
 
  
  } 
  rowListData += '';
  $('#container_item_data').html(rowListData);
}






</script>
</head>
<body>

<div class="container">
<img src="bioDriver/image/logo.png" class="logo"/>
</div>
<div class="heading_bg">
<div class="container">
<h2>
LIST OF  BIOMETRIC DRIVERS COMPATIBLE WITH AUTHSHIELD<br />
 
BIOMETRIC AUTHENTICATION</h2></div>
</div>
<div class="container container_item" id="container_item_data">


 

</div>
</body>
</html>
