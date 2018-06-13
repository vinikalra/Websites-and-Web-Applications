<!DOCTYPE html>
<%@ page import="java.util.*"%> 
<%@ page import="java.lang.*"%>
<%@ page import="javax.servlet.*"%>
<%@ page import="javax.servlet.http.*"%>
<%@ page import="sdsu.*" %>
<% String orderName = request.getParameter("Name");   
 String orderAddr1 = request.getParameter("address1");  
String orderAddr2 = request.getParameter("address2");  
 String orderCity = request.getParameter("city");  
 String orderState = request.getParameter("state");  
 String zipcode = request.getParameter("zipcode"); 
double tCost = (Double)session.getAttribute("totalCost");
double tax = (tCost+5.00)*0.08;
   tax=    Math.floor(tax * 100) / 100;
double finalCost = tCost + tax + 5.00 ;
ArrayList<Cart> myCart = new ArrayList<Cart>();
  myCart = (ArrayList<Cart>)session.getAttribute("cart_items");
 
%> 
    
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
  <a href="#home"><img src="/jadrn017/img/logo.jpg" width="80" height="60"></a>
        
</div>

<form action="/servlet/PlaceOrder" method="post">
    <table class="summary">
<th><h1 align="center">Order Summary</h1></th>
        <tr>
             <td>   Name: </td>
       <td> <%=orderName %>  </td>
               </tr>
         <tr>
             <td>    Address Line 1: </td>
                 <td> <%=orderAddr1 %> </td>
             </tr> <tr>
               <td>  Address Line 2: </td>
                   <td> <%=orderAddr2 %></td>
                  </tr> <tr>
              <td>   City: </td>
                  <td> <%=orderCity %></td>
                      </tr>  <tr>
                <td> State: </td>
                    <td> <%=orderState %></td>
                        </tr>     <tr>
               <td>  Zip Code: </td>
                   <td> <%=zipcode %> </td>
     </tr><tr>
         
  </table>
    <table class="prodSum" border="2px">
        <th>Product</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Cost</th>
        <% for(int i=0;i<myCart.size();i++){%>
        
        <tr>
<td> <img src ='<%=myCart.get(i).getImage() %>' width=100px height=100px>
            </td>
                <td>
            <%=myCart.get(i).getProduct() %>
            </td>
            
                    <td>
            <%=myCart.get(i).getQuantity() %>
            </td>
                        <td>
            <%=myCart.get(i).getCost() %>
            </td>
        </tr>
        
      <%  } %>
          </table>
        <table class="pricing">
        <tr>
            <td></td>
             <td></td>
            <td>SubTotal - </td>
            <td>$<%=tCost%></td>
          </tr>
          <tr>
               <td></td>
               <td></td>
          <td>Shipping Charges - </td>
              <td>$5</td>
          </tr>
          <tr>
               <td></td>
               <td></td>
          <td>Sales Tax(8%) - </td>
        <td>$<%=tax %></td>
          </tr>
            <tr>
                <td></td>
               <td></td>
                <td>
                -----------------
                </td>
                <td>
                    -------------
                </td>
            </tr>
          <tr>
               <td></td>
               <td></td>
            <td>Total Cost </td>
              <td>$<%=finalCost%></td>
          </tr>
          <tr>
             <td></td>
               <td></td>
              <td></td>
              <td></td>
              </tr>
    </table>
<a class="orderPlace button" href="http://jadran.sdsu.edu/jadrn017/servlet/PlaceOrder">Place Order</a>
<a class="cancelOrder button" href="http://jadran.sdsu.edu/jadrn017/proj3.html">Cancel</a>
            </form> 
    </body>
    </html>