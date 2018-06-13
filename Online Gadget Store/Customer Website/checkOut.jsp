<!DOCTYPE html>
<%@ page import="java.util.*"%>
<%@ page import="javax.servlet.*"%>
<%@ page import="javax.servlet.http.*"%>
<%@ page import="sdsu.*" %>
    


<html>
<title>
    Viral Gadgets!
</title>
<head>
<link rel="stylesheet" href="/jadrn017/css/jquery-ui.css">
<link rel="stylesheet" href="/jadrn017/css/proj3.css">
<script src="/jadrn017/js/jquery.js"></script>
<script src="/jadrn017/css/jquery-ui.js"></script>
<script src="/jadrn017/js/proj.js"></script>
</head>
<body>
<div class="navbar">
  <a href="http://jadran.sdsu.edu/jadrn017/proj3.html"><img src="/jadrn017/img/logo.jpg" width="80" height="60"></a>
    

</div>
<form action="/jadrn017/jsp/orderSummary.jsp" method="post" id="billingForm">
    <table class="shipping">
<th><h1 align="center">Shipping Information</h1></th>
        <tr>
             <td>   Name: </td>
       <td>  <input type="text" name="Name" id="name" required> </td>
               </tr>
         <tr>
             <td>    Address Line 1: </td>
                 <td> <input type="text" name="address1" id="address1" required></td>
             </tr> <tr>
               <td>  Address Line 2: </td>
                   <td> <input type="text" name="address2" id="address2" required></td>
                  </tr> <tr>
              <td>   City: </td>
                  <td> <input type="text" name="city" id="city" required></td>
                      </tr>  <tr>
                <td> State: </td>
                    <td> <input type="text" name="state" id="state" required></td>
                        </tr>     <tr>
               <td>  Zip Code: </td>
                   <td> <input type="number" name="zipcode" id="zipcode" required> </td>
     </tr><tr>
         <td> Contact Phone #: </td>
             <td> <input type="number" name="phone" id="phone" required></td></tr>
  </table>
     <table class="billing">
  <th>  <h1 align="center">Billing Information</h1> </th>
         <tr> <td><input type="checkbox" id="billship" name="billship" value="billship" onclick="populateBilling(this.checked);">
    <label for="billship">Same as Shipping Adress</label></td> </tr>
            <tr>
             <td>   Name: </td>
       <td>  <input type="text" id="bName" required> </td>
               </tr>
         <tr>
             <td>    Address Line 1: </td>
                 <td> <input type="text" id="baddress1" required></td>
             </tr> <tr>
               <td>  Address Line 2: </td>
                   <td> <input type="text" id="baddress2" required></td>
                  </tr> <tr>
              <td>   City: </td>
                  <td> <input type="text" id="bcity" required></td>
                      </tr>  <tr>
                <td> State: </td>
                    <td> <input type="text" id="bstate" required></td>
                        </tr>     <tr>
               <td>  Zip Code: </td>
                   <td> <input type="number" id="bzipcode" required> </td>
     </tr><tr>
         <td> Contact Phone #: </td>
             <td> <input type="number" id="bphone" required></td></tr>
<tr>
 <td>   Credit Card Type:</td>
  <td>       <select>
  <option value="visa">Visa</option>
  <option value="master">Master</option>
    </select></td></tr>
      <tr>    <td>      Credit Card: </td>
              <td><input type="number" name="creditcardnum" required></td></tr><tr>
            <td>Expiration Date: </td>
         <td><input type="text" name="expiration" required></td>
    </tr><tr>
              <td>  CVV: </td>
                  <td><input type="number" name="cvv" required></td>
    </tr><tr>
                <td>
                    <input type="submit" class="button" value="Continue"></td> </tr>
                      </table>
            </form> 
    </body>
    </html>