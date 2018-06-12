//Vini Kalra
//jadrn022
//Code Ref - jadrn000
/*
$(document).ready(function()
               {
              $('#submit_button').bind('click', function() {
               validateForm();             
              });
               
}  );
*/

$(document).ready(function() {
    
    $('input[name="fname"]').focus();
    
    
    $("#emailId").on('blur',function(e) {  
         if(document.getElementById("emailId").value !="" ){       
        var email = document.getElementById("emailId").value;
        if(!isValidEmail(email))
             {
        var params = "email="+$('#emailId').val();
        var url = 'http://jadran.sdsu.edu/~jadrn022/proj3/js/check_dup.php?'+params;
       // url += $("#sku").val();
      // $('#busy_wait').css('visibility','visible');
       $.get(url, handleData);
             }
             else
                 {
                      $('#message_line').css('color','red');
           $('#message_line').html("Please enter a valid SKU");
                 }
         }
        else{
           $('#message_line').css('color','red');
           $('#message_line').html("Please enter a value for Email Id");
        }
        });
    function handleData(response) {
    alert(response);
    if(response == "dup")
      $('#message_line').text("ERROR, duplicate");
    else if(response == "OK") {
       $('form').serialize();
        $('form').submit();
        }
    else
        alert(response);
    }
    
   /* $(':submit').on('click', function(e) {
        
        //e.preventDefault();
        var params = "email="+$('#emailId').val();
        var url = "check_dup.php?"+params;
        alert(url);
        $.get(url, dup_handler);
        });*/
    
    });
    


function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 




function validateForm()
{
    var validate=false;
    var errorStatusHandle = $('#message_line');
    var elementHandle = new Array(11);
    elementHandle[0] = $('[name="fname"]');
    elementHandle[1] = $('[name="lname"]');
    elementHandle[2] = $('[name="address"]');
    elementHandle[3] = $('[name="city"]');
    elementHandle[4] = $('[name="state"]');
    elementHandle[5] = $('[name="zip"]');
    elementHandle[6] = $('[name="phn"]');
    elementHandle[7] = $('[name="emailId"]');
    elementHandle[8] = $('[name="dob"]');
    elementHandle[9] = $('[name="category"]');
    elementHandle[10] = $('[name="elevel"]');
    
    
    
    if(document.getElementById("runner_image").value == "") {
  errorStatusHandle.text(" ");
        document.getElementById("message_line").style.display = "block";
        errorStatusHandle.text("Please upload a Profile picture");
        }
    
    
   else if(isEmpty(elementHandle[0].val())) {
       errorStatusHandle.text(" ");
            elementHandle[0].addClass("error");
           errorStatusHandle.text("Please enter your first name");
		     elementHandle[0].focus();
         
            }
    
    
   else if(isEmpty(elementHandle[1].val())) {
       errorStatusHandle.text(" ");
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter your last name");
            elementHandle[1].focus();            
            }
     else   if(isEmpty(elementHandle[2].val())) {
         errorStatusHandle.text(" ");
            elementHandle[2].addClass("error");
            errorStatusHandle.text("Please enter your address");
            elementHandle[2].focus();            
            }
      else  if(isEmpty(elementHandle[3].val())) {
          errorStatusHandle.text(" ");
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter your city");
            elementHandle[3].focus();            
            }
       else if(isEmpty(elementHandle[4].val())) {
           errorStatusHandle.text(" ");
            elementHandle[4].addClass("error");
            errorStatusHandle.text("Please enter your state");
            elementHandle[4].focus();            
            }
    
       else if(!isValidState(elementHandle[4].val())) {
           errorStatusHandle.text(" ");
            elementHandle[4].addClass("error");
            errorStatusHandle.text("The state appears to be invalid, "+
            "please use the two letter state abbreviation");
            elementHandle[4].focus();            
            }
    
    else if(isEmpty(elementHandle[5].val())) {
        errorStatusHandle.text(" ");
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter your zip code");
            elementHandle[5].focus();            
            }
    
        else if(!$.isNumeric(elementHandle[5].val())) {
            errorStatusHandle.text(" ");
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Invalid zipcode. Please enter a numeric value");
            elementHandle[5].focus();            
            }
        else if(elementHandle[5].val().length != 5) {
            errorStatusHandle.text(" ");
            elementHandle[5].addClass("error");
            errorStatusHandle.text("The zip code must have exactly five digits")
            elementHandle[5].focus();            
            }
    
     else if(isEmpty(elementHandle[6].val())) {
         errorStatusHandle.text(" ");
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Please enter your phone number");
            elementHandle[6].focus();            
            }            
       else if(!$.isNumeric(elementHandle[6].val())) {
           errorStatusHandle.text(" ");
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Invalid Contact #. Please enter a numeric value");
            elementHandle[6].focus();            
           }
       else if(elementHandle[6].val().length != 10) {
           errorStatusHandle.text(" ");
            elementHandle[6].addClass("error");
            errorStatusHandle.text("The phone number must have exactly 10 digits")
            elementHandle[6].focus();            
            }  
    
       else if(isEmpty(elementHandle[7].val())) {
           errorStatusHandle.text(" ");
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Please enter your email address");
            elementHandle[7].focus();            
            }            
        else if(!isValidEmail(elementHandle[7].val())) {
            errorStatusHandle.text(" ");
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Please enter a valid Email Address");
            elementHandle[7].focus();            
            }   
     else if(isEmpty(elementHandle[8].val())) {
         errorStatusHandle.text(" ");
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter your Date of Birth");
            elementHandle[8].focus();            
            }
       
    else if(!dateFormatValidation(elementHandle[8].val()))
        {
            errorStatusHandle.text(" ");
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter a Date in Format MM/DD/YYYY");
            elementHandle[8].focus();            
        }
    
    else if(!dateValidation(elementHandle[8].val()))
        {
            errorStatusHandle.text(" ");
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter a Valid Date");
            elementHandle[8].focus();            
        }
    
    else if(!ageValidation(elementHandle[8].val()))
        {
            errorStatusHandle.text(" ");
              elementHandle[8].addClass("error");
            errorStatusHandle.text("Your age must be between 14 to 99 to participate in this Marathon");
            elementHandle[8].focus();            
         }
    
   else if(isEmpty(elementHandle[9].val())) {
       errorStatusHandle.text(" ");
            elementHandle[9].addClass("error");
            errorStatusHandle.text("Please select a Category");
            elementHandle[9].focus();            
            }
    
   else if(isEmpty(elementHandle[10].val())) {
       errorStatusHandle.text(" ");
            elementHandle[10].addClass("error");
            errorStatusHandle.text("Please select your Experience Level");
            elementHandle[10].focus();            
           }
    else
        validate= true;
    
        return validate;

}

function isValidState(state) {                                
        var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC",
        "DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA",
        "MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",
        "NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
        "UT","VA","VT","WA","WI","WV","WY");
        for(var i=0; i < stateList.length; i++) 
            if(stateList[i] == $.trim(state))
                return true;
        return false;
        } 

function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
        }  


function dateFormatValidation(dob)
{
  
    var pattern = new RegExp(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/);
    return pattern.test(dob);
}



function dateValidation(dob)

{  
     

   
         
      var inputDob=new Date(dob);
        
      
      var todaysDate=new Date();
      var year = todaysDate.getFullYear() - inputDob.getFullYear();
      var day =Math.abs(todaysDate.getDay() - inputDob.getDay());
      if((year==0 & day<0) ||(year<0 )){
         return false;
      }

     
 
  return true;       
}

function ageValidation(dob)
{
    var inputDob=new Date(dob);
        
      
      var todaysDate=new Date();
      var year = todaysDate.getFullYear() - inputDob.getFullYear();
      var day =Math.abs(todaysDate.getDay() - inputDob.getDay());
    
     if(year>99||year<14){
       
        return false;
      }
    return true;
}

function readImage(input) {
     var errorStatusHandle = $('#message_line');
   
       if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img').attr('src', e.target.result);
            };
           
            if ((input.files[0].size)/1000 > 1024) {
                 errorStatusHandle.text("Max size allowed is 1 MB!");
               
            }
            else {
                
                 errorStatusHandle.text("");
                 reader.readAsDataURL(input.files[0]);
            }
        }
   
    }

