/* Vini Kalra
820873996
jadrn017*/

$(document).ready(function()  {
    $.get("/perl/jadrn017/cookie.cgi", checkcookie)
    
    $.get("/perl/jadrn017/fetch_vendor.cgi",fix_vendor);
    
     $.get("/perl/jadrn017/fetch_category.cgi",fix_category);
    
       $('#fetch_button').bind('click', function() {
            
           
if(document.getElementById("sku").value !="" ){
    
             var pattern = /^[A-Z]{3}-[0-9]{3}$/;
             var sku = document.getElementById("sku").value;
             if(pattern.test(sku)==true)
             {
                     
    var url = '/perl/jadrn017/fetch_details.cgi?sku=';               url += $("#sku").val();
       $('#busy_wait').css('visibility','visible');
       $.get(url, fetchData);
             }
             else
                 {
                      $('#status').css('color','red');
           $('#status').html("Please enter a valid SKU");
                 }
         }
        else{
           $('#status').css('color','red');
           $('#status').html("Please enter a value for SKU");
        }
            
           
            });
   
         $('#delete').bind('click', function() {
            alert("Inside delete");        
                     
    var url = '/perl/jadrn017/delete.cgi?sku=';               url += $("#sku").val();
       $('#busy_wait').css('visibility','visible');
       $.get(url, deleteData);
                         
           
            });
    
    
});

function deleteData(response)
{
    reset();
    $('#busy_wait').css('visibility','hidden');
    
}

function checkcookie(response)
{
    if(response.startsWith("Fail"))
        {
     window.location = window.location.href="http://jadran.sdsu.edu/~jadrn017/proj1/error.html";                
        }
}

function fetchData(response){
    if(response!=""){
    var tmpStr = response.split("=");
   var skug = document.getElementById("sku").value;
document.getElementById("sku").disabled =true;
document.getElementById("fetch_button").disabled =true;
    document.getElementById("category").selectedIndex = tmpStr[0];
    document.getElementById("vendor").selectedIndex =tmpStr[1] ;
    document.getElementById("identifier").value = tmpStr[2];
    document.getElementById("description").value = tmpStr[3];
    document.getElementById("features").value = tmpStr[4];
    document.getElementById("cost").value = tmpStr[5];
    document.getElementById("rprice").value = tmpStr[6];
   document.getElementById("delete").disabled =false;
   
        var fname1 = tmpStr[7];
        alert(fname1);
    var extension = fname1.split(".");
    var toDisplay = "<img src=\"/~jadrn017/proj1/file_upload/" + skug + "."+ extension[1]+"\" width=\"50\" height=\"50\" />";
    $('#image').html(toDisplay);
    $('#busy_wait').css('visibility','hidden');
         }
    if(response=="")
        {
           $('#status').css('color','red');
           $('#status').html("This SKU doesnot exist in database."); 
            $('#busy_wait').css('visibility','hidden');
        }
    
        }

function reset()
{
document.getElementById("sku").value ="";  
    document.getElementById("category").value ="";
    document.getElementById("vendor").value ="";
document.getElementById("identifier").value ="";
document.getElementById("description").value ="";   
document.getElementById("features").value ="";  
document.getElementById("cost").value ="";  
document.getElementById("rprice").value ="";
document.getElementById("pic").value ="";
$('#image').html("");
$.get("/perl/jadrn017/fetch_vendor.cgi",fix_vendor);   
$.get("/perl/jadrn017/fetch_category.cgi",fix_category);
    
}

 function fix_vendor(response) {
    var key = new Array();
    var description = new Array();
    var toWrite = "<option value=\"-1\">Select Vendor</option>";
    var tmpStr = response.split("||");
    for(i=0; i<tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
    $('#vendor').append(toWrite);
    }        


function fix_category(response) {
    var key = new Array();
    var description = new Array();
    var toWrite = "<option value=\"-1\">Select Category</option>";
    var tmpStr = response.split("||");
    for(i=0; i<tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
    $('#category').append(toWrite);
    }    
