<!DOCTYPE html>
<%@ page import="java.util.*"%> 
<%@ page import="java.lang.*"%>
<%@ page import="javax.servlet.*"%>
<%@ page import="javax.servlet.http.*"%>
<%@ page import="sdsu.*" %>
<% 
String status = (String)session.getAttribute("status");  
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
<script src="/jadrn017/js/logout.js"></script>
</head>
<body>
<div class="navbar">
  <a href="http://jadran.sdsu.edu/jadrn017/proj3.html"><img src="/jadrn017/img/logo.jpg" width="80" height="60"></a>
       
</div>
<form >
    <table class="summary">
        <% if(status.startsWith("Thank")){%>
<th><h1 align="center">Thank You, For Placing your Order.</h1></th>
            <%}
          else{ %>
                
             <th><h1 align="center">Sorry!! An Error has occured, Please Return to home Page.</h1></th>   
                
               <%  }  
                %>
    </table>
<a class ="goToHome button" href="http://jadran.sdsu.edu/jadrn017/proj3.html">Return Home</a>
            </form> 
    </body>
    </html>