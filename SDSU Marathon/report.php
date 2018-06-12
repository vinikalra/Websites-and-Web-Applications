

<!DOCTYPE html>
<html lang="en">
<!-- Vini Kalra
Class Account- jadrn022-->        
<head>
  <title>Log In </title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="login.css" rel="stylesheet" type="text/css">
   
  <script type="text/javascript">
if(!navigator.cookieEnabled) {
	alert("Cookies are disabled in your browser. " +
	      "You must enable cookies to use this application.");
	}  
</script> 
</head>
<body>

<form class="login-form" method="post" 
      action="process_login.php"
      name="login">

    <h2>Please Enter the password</h2>
    
    
 <input type="password" name="pass" /><br />

 
<input type="reset" value="Clear" />
<input type="submit"  value="login" />

</form>
</body>
</html>
