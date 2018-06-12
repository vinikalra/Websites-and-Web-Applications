
<!DOCTYPE html>
<html lang="en">
    <!-- Vini Kalra
Class Account- jadrn022-->
<head>
  <title>Report</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
 
</head>
<body >
 

<?php

$pass = $_POST['pass'];
$valid = false;

$raw = file_get_contents('password.dat');
$data = explode("\n",$raw);
foreach($data as $item) {
    if( crypt($pass,$item) === $item) 
            $valid = true;            
    }  #end foreach
   
if($valid) {

 include('show_report.php');
}
else
    echo "Login Unsuccessful.";     
?>
</body>
</html>