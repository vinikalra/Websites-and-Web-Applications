/* Vini Kalra
820873996
jadrn-017 */
var validate = false;
var duplicate =  true;

$(document).ready(function()  {
    
    $.get("/perl/jadrn017/cookie.cgi",checkcookie);
     $.get("/perl/jadrn017/fetch_vendor.cgi",fix_vendor);
    
     $.get("/perl/jadrn017/fetch_category.cgi",fix_category);
    
         
    
        $('#submit_button').bind('click', function() { 
            

            validate_form();           
            if(validate ==true && duplicate ==false)
                {
                    
                send_file();
                        
                }
        });
                                

    
    $("#sku").on('blur',function(e) {  
         if(document.getElementById("sku").value !="" ){
             
             var pattern = /^[A-Z]{3}-[0-9]{3}$/;
             var sku = document.getElementById("sku").value;
             if(pattern.test(sku)==true)
             {
        var url = '/perl/jadrn017/check_dup_sku.cgi?sku=';
        url += $("#sku").val();
       $('#busy_wait').css('visibility','visible');
       $.get(url, handleData);
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
    
     $("#category").on('blur',function(e) {
         $('#status').html("");
            if(document.getElementById("category").value== -1 )
        {
          
      $('#status').css('color','red');
                  $('#status').html("Please select a Category"); }
          });
    
    $("#vendor").on('blur',function(e) {
        $('#status').html("");
      if(document.getElementById("vendor").value== -1 )
        {
            
           $('#status').css('color','red');
           $('#status').html("Please Select a Vendor.");
        }
    });
    
    
    
    $("#identifier").on('blur',function(e) { 
        $('#status').html("");
      if(document.getElementById("identifier").value=="" )
        {
           
           $('#status').css('color','red');
           $('#status').html("Please enter a value in Manufacture's Identifier");
        }
   
    });
    
    
    $("#description").on('blur',function(e) {
        $('#status').html("");
       if(document.getElementById("description").value=="" )
        {
           
           $('#status').css('color','red');
           $('#status').html("Please Enter Description.");
        }
    });
    
    $("#features").on('blur',function(e) { 
        $('#status').html("");
      if(document.getElementById("features").value=="" )
        {
            
           $('#status').css('color','red');
           $('#status').html("Please Enter Features");
        }

    });
    
    
    $("#cost").on('blur',function(e) { 
        $('#status').html("");
        if(document.getElementById("cost").value=="" ||  isNaN(document.getElementById("cost").value))
        {
            
           $('#status').css('color','red');
           $('#status').html("Please enter a valid Cost Price.");
        }
   
    });
    
    
    $("#rprice").on('blur',function(e) { 
        $('#status').html("");
       if(document.getElementById("rprice").value=="" || isNaN(document.getElementById("rprice").value))
        {
            
           $('#status').css('color','red');
           $('#status').html("Please enter a valid Retail Price");
        }
  
    });
    
    
    $("#pic").on('blur',function(e) { 
        $('#status').html("");
         if(document.getElementById("pic").value=="" )
        {
            
        $('#status').css('color','red');
           $('#status').html("Please select an Image");
        }
    });
    
         
});




function handleData(response){
     $('#busy_wait').css('visibility','hidden');
    
    
    if(response.startsWith("duplicate")) 
        {
            duplicate=true;
        $('#status').text("Duplicate SKU");
         }
    else if(response.startsWith("ok")) {
         duplicate=false;
        $('#status').css('color','blue');
        $('#status').text("This record is OK, not a duplicate."); 
      }

}

function validate_form()
{
$('#busy_wait').css('visibility','visible');
       if(document.getElementById("category").value== -1 )
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
      
    
     if(document.getElementById("vendor").value== -1 )
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
         if(document.getElementById("pic").value=="" )
        {
            validate = false;
           $('#status').css('color','red');
           $('#status').html("Please select an Image");
            return;
        }
else
        {
            validate = true;
        }
    
          if(document.getElementById("sku").value =="" ){
             
            validate =false;
           $('#status').css('color','red');
           $('#status').html("Please enter a value for SKU");
            return;
        }   
    else{
           var pattern = /^[A-Z]{3}-[0-9]{3}$/;
             var sku = document.getElementById("sku").value;
             if(pattern.test(sku)==true)
             {
        var url = '/perl/jadrn017/check_dup_sku.cgi?sku=';
        url += $("#sku").val();
       $('#busy_wait').css('visibility','visible');
       $.get(url, handleData);
             }
             else
                 {
                     validate = false;
                      $('#status').css('color','red');
           $('#status').html("Please enter a valid SKU");
                     return;
                 }
    }
    
 
    
  
}

function send_file() {  
  
    
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
              
               insert_into_db();
               },
            error: function(response) {
               $('#status').css('color','red');
               $('#status').html("Sorry, an upload error occurred, Please try again. "+response.statusText+" filename " +fname);
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


function insert_into_db()
{
    
    var form_data_db = new FormData($('form')[0]);
    form_data_db.append("sku", document.getElementById("sku"));
    form_data_db.append("category", document.getElementById("category").value);
    form_data_db.append("vendor", document.getElementById("vendor").value);
    form_data_db.append("identifier", document.getElementById("identifier"));
    form_data_db.append("description", document.getElementById("description"));
    form_data_db.append("features", document.getElementById("features"));
    form_data_db.append("cost", document.getElementById("cost"));
    form_data_db.append("rprice", document.getElementById("rprice"));
    form_data_db.append("pic", document.getElementById("pic"));
    var fname = document.getElementById("pic").value;
    fname = fname.toLowerCase();
    
    $.ajax({
     url: "/perl/jadrn017/insert.cgi",
            type: "post",
            data: form_data_db,
            processData: false,
            contentType: false, 
         success: function(response) {
               $('#status').css('color','blue');
               $('#status').html("The record has been inserted.<br />");
             $('#busy_wait').css('visibility','hidden');
              reset();
               },
            error: function(response) {
               $('#status').css('color','red');
               $('#status').html("Sorry, Record cannot be inserted, "+response.statusText+" filename " +fname);
                $('#busy_wait').css('visibility','hidden');
                 }
    });  
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