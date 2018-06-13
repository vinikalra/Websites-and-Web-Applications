<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta charset="UTF-8">
<title>Login</title>
<link rel="stylesheet" type="text/css" href="login.css">
<script src="/jquery/jquery.js"></script>
</head>
<body>
<h1> Welcome To Viral Gadgets</h1>
<div id="status">
<h2>Error, wrong username or password</h2>
</div>
<field>
<form class="adjust" method="POST" action="/jadrn017/servlet/Login">
<table class="log">
<tr>
<td>
Username: 
</td>
<td>
<input type="text" name="username" autofocus>
</td>
</tr> 
<tr>
<td>
Password:
</td>
<td>
<input type="password" name="password"></td>
</tr> 
<tr>
<td>
<input type="reset" value ="Clear" class="del"> 
</td>
<td>
<input type="submit" value="Login" class="sub" >
</td>
</tr>
</table>
</form>
</field>
</body>
</html>
