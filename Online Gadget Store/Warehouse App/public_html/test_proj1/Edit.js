/*Vini Kalra
820873996
jadrn017 */
var validate = true;

$(document).ready(function(){
    
    $.get("/perl/jadrn017/cookie.cgi", checkcookie)
     $.get("/perl/jadrn017/fetch_vendor.cgi",fix_vendor);
    
     $.get("/perl/jadrn017/fetch_category.cgi",fix_category);
    
     
    
          $('#fetch_button').bind('click', function() {
       $('#status').html("");     
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
    
     $('#edit_button').bind('click', function() { 
            validate_form();  
            if(validate ==true)
                {
                send_file();
                
               
                }
        }          );   
    
});



function update_db()
{
      
    var form_data_db = new FormData($('form')[0]);
    form_data_db.append("sku", document.getElementById("sku").value);
    form_data_db.append("category", document.getElementById("category").value);
    form_data_db.append("vendor", document.getElementById("vendor").value);
    form_data_db.append("identifier", document.getElementById("identifier").value);
    form_data_db.append("description", document.getElementById("description").value);
    form_data_db.append("features", document.getElementById("features").value);
    form_data_db.append("cost", document.getElementById("cost").value);
    form_data_db.append("rprice", document.getElementById("rprice").value);
    
    $.ajax({
     url: "/perl/jadrn017/update_details.cgi",
            type: "post",
            data: form_data_db,
            processData: false,
            contentType: false, 
         success: function(response) {
               $('#status').css('color','blue');
               $('#status').html("The record has been Updated.<br />");
             $('#busy_wait').css('visibility','hidden'); 
              reset();
               },
            error: function(response) {
               $('#status').css('color','red');
               $('#status').html("Sorry, Record cannot be Updated, "+response.statusText+" filename " +fname);
                $('#busy_wait').css('visibility','hidden'); 
                }
    });  
}

function checkcookie(response)
{
    if(response.startsWith("Fail"))
        {
     window.location = window.location.href="http://jadran.sdsu.edu/~jadrn017/proj1/error.html";                
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

document.getElementById("sku").disabled =false;
document.getElementById("category").disabled =true;
 document.getElementById("vendor").disabled =true;
document.getElementById("identifier").disabled =true;  
document.getElementById("description").disabled =true;
document.getElementById("features").disabled =true;
document.getElementById("cost").disabled =true;
document.getElementById("rprice").disabled =true;
document.getElementById("edit_button").disabled =true;
    $('#image').html("");
$.get("/perl/jadrn017/fetch_vendor.cgi",fix_vendor);   
$.get("/perl/jadrn017/fetch_category.cgi",fix_category);
    
}

function fetchData(response){
    if(response!=""){
    var tmpStr = response.split("=");
   var skug = document.getElementById("sku").value;
        document.getElementById("sku").disabled =true;
    document.getElementById("category").selectedIndex = tmpStr[0];
    document.getElementById("category").disabled =false;    
    document.getElementById("vendor").selectedIndex =tmpStr[1] ;
        document.getElementById("vendor").disabled =false;
    document.getElementById("identifier").value = tmpStr[2];
    document.getElementById("identifier").disabled =false;
    document.getElementById("description").value = tmpStr[3];
     document.getElementById("description").disabled =false;
    document.getElementById("features").value = tmpStr[4];
     document.getElementById("features").disabled =false;
    document.getElementById("cost").value = tmpStr[5];
     document.getElementById("cost").disabled =false; 
    document.getElementById("rprice").value = tmpStr[6];
      document.getElementById("rprice").disabled =false;
   document.getElementById("pic").disabled =false;
document.getElementById("edit_button").disabled =false;
        
   var fname1 = tmpStr[7];
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
function send_file() {  
  
    var form_data = new FormData($('form')[0]);
    if(document.getElementById("pic").value!="")
        {
           
     var form_data = new FormData($('form')[0]); 
    form_data.append("image", document.getElementById("pic").files[0]);
    form_data.append("sku", document.getElementById("sku"));
    var fname = document.getElementById("pic").value;
    fname = fname.toLowerCase();
    var toDisplay = "<img src=\"/~jadrn017/proj1/file_upload/" + fname + "\" />";
    $.ajax({
     url: "/perl/jadrn017/upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false, 
         success: function(response) {
              
               
               },
            error: function(response) {
               $('#status').css('color','red');
               $('#status').html("Sorry, an upload error occurred, Please try again. "+response.statusText+" filename " +fname);
         $('#busy_wait').css('visibility','hidden');       
                }
    });   
        }
    update_db();
}



function validate_form()
{
         $('#busy_wait').css('visibility','visible'); 
       if(document.getElementById("category").value=="" )
        {
            validate = false;
      $('#status').css('color','red');
      $('#status').html("Please Select a Category"); 
        return;
        }
       else
        {
            validate = true;
        }
      
    
     if(document.getElementById("vendor").value=="" )
        {
            validate = false;
           $('#status').css('color','red');
           $('#status').html("Please Select a Vendor.");
            return;
        }
   else
        {
            validate = true;
        }
    
     if(document.getElementById("identifier").value=="" )
        {
            validate = false;
           $('#status').css('color','red');
           $('#status').html("Please enter a value in Manufacture's Identifier");
            return;
        }
else
        {
            validate = true;
        }
    
       if(document.getElementById("description").value=="" )
        {
            validate = false;
           $('#status').css('color','red');
           $('#status').html("Please Enter Description.");
            return;
        }
else
        {
            validate = true;
        }
    
      if(document.getElementById("features").value=="" )
        {
            validate = false;
           $('#status').css('color','red');
           $('#status').html("Please Enter Features");
            return;
        }
else
        {
            validate = true;
        }
    
        if(document.getElementById("cost").value=="" ||  isNaN(document.getElementById("cost").value))
        {
            validate = false;
           $('#status').css('color','red');
           $('#status').html("Please enter a valid Cost Price.");
            return;
        }
  else
        {
            validate = true;
        }
    
       if(document.getElementById("rprice").value=="" || isNaN(document.getElementById("rprice").value))
        {
            validate = false;
           $('#status').css('color','red');
           $('#status').html("Please enter a valid Retail Price");
            return;
        }
    else
        {
            validate = true;
        }
        
  
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
