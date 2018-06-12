<?php
#Vini Kalra
#jadrn022

function uploadFile()
{
    $x = rand(1,50);
    $file_status = 0;
   $UPLOAD_DIR = 'im_ges/';
    $COMPUTER_DIR = '/home/jadrn022/public_html/proj3/im_ges/';
    $fname = $_FILES['file']['name'];
    $nfname = "$x".$fname;
   

    if($_FILES['file']['error'] > 0) {
    	$err = $_FILES['file']['error'];	
        #$file_msg = "Error Code: $err ";
        
	if($err == 1)
		#$file_msg .= "The file was too big to upload, the limit is 2MB<br />";
        $file_status = $err;
        } 
    
    elseif(exif_imagetype($_FILES['file']['tmp_name']) != IMAGETYPE_PNG && exif_imagetype($_FILES['file']['tmp_name']) != IMAGETYPE_JPEG) {
        #echo "ERROR, not a jpg file<br />";   
        $file_status =2;
        }
    
    
## file is valid, copy from /tmp to your directory. 
    
    elseif(file_exists("$UPLOAD_DIR".$fname))  {
       // rename($fname, $nfname);
    
        move_uploaded_file($_FILES['file']['tmp_name'], "$UPLOAD_DIR".$nfname);
        #echo "Success!</br >\n";
        $file_status = $nfname;
        }
    
    else { 
        move_uploaded_file($_FILES['file']['tmp_name'], "$UPLOAD_DIR".$fname);
       # echo "Success!</br >\n";
        $file_status = $fname;
         
    } 
    
    return $file_status;
}

function validate_data($params, $file_status) {
    $msg = "";
    $fname = $_FILES['file']['name'];
    
    if($file_status == 1)
       $msg =   "The file was too big to upload, the limit is 2MB <br />";
    
    elseif($file_status == 2 )
        $msg = "ERROR, not a jpg/png file <br />";
    
    
    elseif(strlen($fname) == 0)
        $msg = "Please upload an image<br />"; 
    
    elseif(strlen($params[1]) == 0)
        $msg = "Please enter First Name<br />"; 
    
    elseif(strlen($params[3]) == 0)
        $msg = "Please enter your Last Name <br />"; 
    elseif(strlen($params[4]) == 0)
        $msg = "Please enter Address<br />"; 
    elseif(strlen($params[5]) == 0)
        $msg = "Please enter the City<br />"; 
    elseif(strlen($params[6]) == 0)
        $msg = "Please enter the State<br />";                
    elseif(!isValidState($params[6]))
         $msg = "The state appears to be invalid, please use the two letter state abbreviation <br />";
        
    elseif(strlen($params[7]) == 0)
        $msg = "Please enter the Zipcode<br />";
    elseif(!is_numeric($params[7])) 
        $msg = "Zip code may contain only numeric digits<br />";
     elseif(strlen($params[7]) != 5) 
        $msg = "Zip code must be exactly 5 digits<br />";
    
    elseif(strlen($params[8]) == 0)
        $msg = "Please enter the Contact Number<br />";
    elseif(!is_numeric($params[8])) 
        $msg = "Contact Number contain only numeric digits<br />";
     elseif(strlen($params[8]) != 10) 
        $msg = "Contact Number must be exactly 10 digits<br />";
    
    
    elseif(strlen($params[9]) == 0)
        $msg = "Please enter email<br />";
    elseif(!filter_var($params[9], FILTER_VALIDATE_EMAIL))
        $msg = "Your email appears to be invalid<br/>";
    
    elseif(strlen($params[10]) == 0)
        $msg = "Please enter your Date Of Birth<br />";
    
     elseif(!dateFormatValidation($params[10]))
        $msg = "Please enter a Date in Format MM/DD/YYYY <br />";
    elseif(!ageValidation($params[10]))
        $msg = "Your age must be between 14 to 99 to participate in this Marathon";
    
    elseif(strlen($params[11]) == 0)
        $msg = "Please select a Category<br />";
    
    elseif(strlen($params[12]) == 0)
        $msg = "Please select your Experience Level<br />";
    
    if($msg) {
        write_form($msg, $file_status);
        exit;
        }
  
    }

function ageValidation($birthDate)
{
     $birthDate = explode("/", $birthDate);
        
        $age = (date("md", date("U", mktime(0, 0, 0, $birthDate[0], $birthDate[1], $birthDate[2]))) > date("md")
    ? ((date("Y") - $birthDate[2]) - 1)
    : (date("Y") - $birthDate[2]));
    
    if($age < 14 || $age > 99)
        return false;
    else
        return true;
}

function dateFormatValidation($dob)
{
    
$test_arr  = explode('/', $dob);
if (checkdate($test_arr[0], $test_arr[1], $test_arr[2])) {
    return true;
}
    return false;
}


function write_form($msg, $file_status) {
    $fname = $_FILES['file']['name'];
    if($file_status!=1 && $file_status !=2)
    $path = "http://jadran.sdsu.edu/~jadrn022/proj3/im_ges/".$file_status;
    
    print <<<ENDBLOCK
	<html>
<!-- Vini Kalra
Class Account- jadrn022-->
    
<head>
<title>SDSU Marathon</title>
    <link href="css/main.css" rel="stylesheet" type="text/css">
     <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="/jquery/jquery.js"></script>  
    <script type="text/javascript" src="js/main.js"></script>
    </head>
<body>
   
    <a href="index.html" class="reg-button"> <<< Back To Home</a>

   <div class="head">MARATHON REGISTRATION FORM</div>
    
    
    <div class ="form-container">
         
        <form name="myform" enctype="multipart/form-data" action="process_request.php" method="post" id="myform" >
 <table >
<tr>
    <td>
    Profile Picture<span class="mandatory-field"> *</span>
    </td>
     <td>
     <img id="img" src="$path" height="50px" width="50px" alt="runner_image">
     </td>
     <td>
       <input type='file' value="$path" id="runner_image" name="file"  accept="image/*"  onchange="readImage(this);" /> 
     </td>
    
</tr>
<tr>
<td>First Name<span class="mandatory-field"> *</span></td>
<td><input type="text" name="fname" id="fname" value="$_POST[fname]"></td>

<td>Middle Name </td>
<td><input type="text" name="mname" id="mname" value="$_POST[mname]"></td>
  
<td>Last Name<span class="mandatory-field"> *</span> </td>
<td><input type="text" name="lname" id="lname" value="$_POST[lname]" ></td>
  

</tr> 
   
    <tr>
  <td>
Address <span class="mandatory-field"> *</span>
</td>
<td>
<textarea name="address" rows="3" cols="16" id="address" >
$_POST[address]
</textarea>
</td>  
<td>
    City<span class="mandatory-field"> *</span>
        </td>
   <td><input type="text" name="city" id="city" value="$_POST[city]"></td>
  <td>
       State<span class="mandatory-field"> *</span>
        </td>
        <td><input type="text" name="state" id="state" value="$_POST[state]"></td>
     
     </tr>
     <tr>
     <td>
       Zipcode<span class="mandatory-field"> *</span>
        </td>
        <td><input type="text" name="zip" id="zip" value="$_POST[zip]"></td>
     </tr>
     
      <tr>
     <td>
       Contact #<span class="mandatory-field"> *</span>
        </td>
        <td><input type="text" name="phn" id="phn" placeholder="###-###-####" value="$_POST[phn]"></td>
          
      <td>
       Email<span class="mandatory-field"> *</span>
        </td>
        <td><input type="email" name="emailId" id="emailId" placeholder="abc@xyz.com" value="$_POST[emailId]"></td>
       
          
     </tr>
     <tr>
     <td>
       Date Of Birth<span class="mandatory-field"> *</span>
        </td>
        <td><input type="text" name="dob" id="dob" placeholder="mm/dd/yyyy" value="$_POST[dob]"></td>
         <td>
         Gender<span class="mandatory-field"> *</span>
         </td> 
     <td>
         <input type="radio" name="gender" id="male" value="Male" checked="checked">
         <label for="male">Male</label>
          <input type="radio" name="gender" id="female" value="female">
         <label for="female">Female</label>
         
         </td>
     </tr>
     <tr>
     <td> Category<span class="mandatory-field"> *</span>
 
         </td>t
         <td>
         <select id="category" name="category">
    <option value="$_POST[category]" selected="selected">$_POST[category]</option>
  <option value="Teen">Teen</option>
  <option value="Adult">Adult</option>
  <option value="Senior">Senior</option>

</select>
             </td>
         
         
<td> Experience Level<span class="mandatory-field"> *</span>
         </td>
         <td>
         <select id="elevel" name="elevel">
<option value="$_POST[elevel]" selected="selected">$_POST[elevel]</option>
  <option value="Expert">Expert</option>
  <option value="Experienced">Experienced</option>
  <option value="Novice">Novice</option>

</select>
             </td>
         
     </tr>
     
     <tr>
     <td>
     Medical Conditions
</td>
<td>
<textarea name="mCondition" rows="4" cols="16" id="mCondition" >
$_POST[mCondition]
</textarea>
</td> 
     </tr>
     <tr>
         <td></td>
         <td>
     <input type="submit" value="Submit" id="submit_button" class="reg-button">
             </td>
         <td></td>
     </tr>
     <tr>
     
     <div id="message_line">$msg</div>
     </tr>
</table>
   </form>  
          
    </div>
   
  
</body>

</html>
ENDBLOCK;
}                        

function process_parameters() {
    global $bad_chars;
    $params = array();
    $params[] = trim(str_replace($bad_chars, "",$_POST['fname']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['fname']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['mname']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['lname']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['address']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['city']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['state']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['zip']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['phn']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['emailId']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['dob']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['category']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['elevel']));
     $params[] = trim(str_replace($bad_chars, "",$_POST['gender']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['mCondition']));
    return $params;
    }

function isValidState($state) {  
   $found = false;
$stateList = array("AK","AL","AR","AZ","CA","CO","CT","DC",
 "DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",        "NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY");
    
    
        
        for($i=0; $i < count($stateList) ; $i++) 
        {
            if($stateList[$i] == trim($state))
                $found = true; 
              
        } 
    return $found;
}
    
function store_data_in_db($params, $file_status) {
    
    # get a database connection
    $db = get_db_handle();  ## method in helpers.php
    ##############################################################
   $sql = "select * from runners where email='$params[9]';";
    
##echo "The SQL statement is ",$sql;    
    $result = mysqli_query($db, $sql);
    if(mysqli_num_rows($result) > 0) {
        write_form_error_page('This record appears to be a duplicate');
        exit;
        }
    
##OK, duplicate check passed, now insert
    $sql = "INSERT INTO runners(email,Image,fname,mname,lname,address, city, state, zipcode, contact, dob, gender, category, elevel, mcondition) ".
    "VALUES('$params[9]', 
 '$file_status',
 '$params[1]',
 '$params[2]',
 '$params[3]',
 '$params[4]',
 '$params[5]',
 '$params[6]', 
 '$params[7]',
 '$params[8]',
 '$params[10]',
 '$params[13]',
 '$params[11]', 
 '$params[12]',
 '$params[14]'
 );";
##echo "The SQL statement is ",$sql;    
    mysqli_query($db,$sql);
    $how_many = mysqli_affected_rows($db);
    echo("There were $how_many rows affected");
    close_connector($db);
    }
        
?>   
