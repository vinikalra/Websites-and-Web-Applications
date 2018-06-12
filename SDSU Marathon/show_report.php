<!DOCTYPE html>
<html>
    <!-- Vini Kalra
Class Account- jadrn022-->
<head>
    <meta charset="utf-8">
    <title>Runner's Report</title>
    <link rel="stylesheet" href="report.css">
<script type="text/javascript" src="login.js"></script>
</head>
<body>
    <h1>Marathon Report</h1>
<?php
$server = 'opatija.sdsu.edu:3306';
$user = 'jadrn022';
$password = 'removal';
$database = 'jadrn022';
if(!($db = mysqli_connect($server,$user,$password,$database)))
    echo "ERROR in connection ".mysqli_error($db);
else {
    $sql = "select category, Image, lname, fname, dob,elevel from runners order by category, lname;";
    $result = mysqli_query($db, $sql);
    if(!result)
        echo "ERROR in query".mysqli_error($db);
    echo "<table>\n";
    echo
   
"<tr><td></td><td>Last Name</td><td>First Name</td><td>Age</td>
<td>Category</td>
<td>Experience Level</td></tr>";
    while($row=mysqli_fetch_row($result)) {
        $path = "http://jadran.sdsu.edu/~jadrn022/proj3/im_ges/".$row[1];
        $birthDate = $row[4];
        $birthDate = explode("/", $birthDate);
        
        $age = (date("md", date("U", mktime(0, 0, 0, $birthDate[0], $birthDate[1], $birthDate[2]))) > date("md")
    ? ((date("Y") - $birthDate[2]) - 1)
    : (date("Y") - $birthDate[2]));
  
        echo "<tr>";
        
            echo "<td>
         <img src=$path width=150px height=150px/>
            </td>  
            <td>
            $row[2]
            </td>
           
            <td>
             $row[3]
            </td>
            
            <td>
             $age
            </td>
            <td>
             $row[0]
            </td>
            <td>
             $row[5]
            </td>
            
            ";
        echo "</tr>\n";
        
        }
    mysqli_close($db);
    }
?>
</table>
</body>
</html>