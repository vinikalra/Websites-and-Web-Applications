<!DOCTYPE html>
<head>
<title>Menu</title>
<meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta charset="utf-8">
    <link rel="stylesheet" href="/jadrn029/proj2.css">
     <script src="/jquery/jquery.js"></script>
     <script src="/jadrn029/proj2.js"></script>
</head>
<html id="main2">
<body>
	<div id="logoutbutton">
         <input type="button" id="logout" value="LOGOUT" class="button">

    </div>
    <div id="banner">
        <h1>JAJAJA CELLULAR</h1>
    </div>
 <div class="tab">
  <button class="tablinks" onclick="openCity(event, 'invReceived')" id="defaultOpen">Inventory Received</button>
  <button class="tablinks" onclick="openCity(event, 'invSentOut')">Inventory Sent Out</button>
</div>

<div id="invReceived" class="tabcontent">
 <!--<form id="form1" method="post" action="/jadrn029/servlet/addMerchIn">**/-->
<form id="form1" method="post"  >
<div><h1>MERCHANDISE IN</h1></div>
<fieldset>
<legend>Inventory Received Form</legend>
  <label for="dateLabel" >Date:</label>
  <input type="date" id="date" name="date" size="8">
  <label for="SKU1" class="SKU1">SKU:</label>
  <input id="sku1" class="SKU" type="text" name="sku1" size="7" maxlength="7">
  <label for="q1" class="quant" id="q1" name="q1">Quantity:</label>
   <input class="quant_text" type="text" name="quan1" size="10" maxlength="10">
   <br><br>
   <div id="item_info">
   		<h3 id="ven_dor"></h3>
   		<h3 id="manName"></h3>
   		<h3 id="cat_gory"></h3>
   		<img id="item_image" src="" alt="Item Image" width="200px">
   		
   </div>
   		<div class="message_line">&nbsp;</div>
        <div class="message_line1">&nbsp;</div>
        <div class="message_line2">&nbsp;</div>
        <div class="status">&nbsp;</div>
    <div class="button_panel">
    	<input id="merch_in" type="submit" value="SubmitData"  class="button" />
    	<br><br>
    </div>
   
</div>
</form>

<div id="invSentOut" class="tabcontent">
  <h3>Paris</h3>
  <p>Paris is the capital of France.</p>
</div>
</body>
</html>