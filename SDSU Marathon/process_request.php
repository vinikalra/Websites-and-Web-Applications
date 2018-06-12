<?php
#Vini Kalra
#jadrn022
include('helpers.php');
include('p3.php');

check_post_only();
$params = process_parameters();
$file_status = uploadFile();
validate_data($params, $file_status);
store_data_in_db($params, $file_status);


include('confirmation.php');
?>    
