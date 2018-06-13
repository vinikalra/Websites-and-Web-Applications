<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta charset="UTF-8" >
<title>Inventory Sent</title>
<script type="text/javascript" src="/jquery/jquery.js"></script>
    <script src="/jadrn017/fetchData.js"></script>
<link rel="stylesheet" href="/jadrn017/login.css">  
</head>
<body> 
<% if(session.getAttribute("username") == null)
	response.sendRedirect("/jadrn017/logout.html");
%>
    <h1> Welcome To Viral Gadgets</h1>
	<h3>Hello, <%=session.getAttribute("username")%></h3>
<ul>
  <li><a href="/jadrn017/servlet/Merc_in">Inventory Received</a></li>
  <li  class="active"><a href="/jadrn017/servlet/Merc_out">Inventory Sent</a></li>
<li style="float:right"><a href="/jadrn017/servlet/Logout">Logout</a></li>
    </ul>  
   <field>
     <form method = "post" name="myform" id="myform" action="">  
        <table class="ab" align="left">
         <tr>
            <td>
             Date :
             </td>
             <td>
              <input type="date" name="date" id="date" placeholder="mm/dd/yyyy" 
			  <% java.text.DateFormat df = new java.text.SimpleDateFormat("MM/dd/yyyy"); %>
 	      value = <%= df.format(new java.util.Date()) %>
			  autofocus>     
             </td>
            
<td>SKU : </td>
<td><input type="text" name="sku" id="sku">
</td>
<td>Quantity : </td>
<td><input type="number" name="quantity" id="quantity">
</td>
            </tr>
                
				
<tr class = "hidethis">
<td>Category :</td>
<td><input type="text" id="category" disabled="true"></td>
</tr>

<tr class = "hidethis">
<td>Vendor :</td>
<td><input type="text" id="vendor" disabled="true"></select></td>

<td>Manufacture's </br>Identifier : </td>
<td><input type="text" id="identifier" name="identifier" disabled="true" ></td>

<td>
Description :
</td>
<td>
<textarea name="description" rows="3" cols="18" id="description" disabled="true">
</textarea>
</td>
</tr> 
         
 <tr class = "hidethis">
<td>
Image: 
</td>
    <td>
    <div id="image"></div>
    </td>
</tr>                       
       <tr> </tr>  
            <tr> </tr>  
            <tr> </tr>  
            <tr> </tr>  
            <tr> </tr>  
            <tr> </tr>  

<tr class = "hidethis">                
<td>
<input type="reset" value="Reset" width = "60px" onclick="resetAll();">
</td>

<td>
<input type="button" value="Remove from Inventory" width = "60px" id="inve_out" onclick="removeFromInv();">
</td>
</tr>
         </table>        
       </form>
        <h2 id="statusbar"></h2>
    </field>
</body>