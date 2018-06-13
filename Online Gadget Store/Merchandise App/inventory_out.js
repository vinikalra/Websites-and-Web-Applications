/*
	Name: Yojana Patil jadrn040
	CS 645
	Project #2
	inventory_out.js

*/
$(document).ready(function() {

    var errorMsg2 = $('#error_message2');
     
    $("#sku2").focus();

	display_date();
 // TAB-2 :Edit Existing Record
	validate_tab2();
	
});

function display_date(){
	var date1 = new Date();
	var d1 = date1.getDate();
	var m1 = date1.getMonth() + 1;
	var y1 = date1.getFullYear();
	
	$("#m").val(m1);
	$("#d").val(d1);
	$("#y").val(y1);	
}

	
function fill_data(response){
	//DISPLAY
	// response.split("|"); 
	//array[0] ->venodrModel
	 var result = $.trim(response);	 
	 if(result!= null)
	 {
		var res_obj = response.split("|"); 
        $("#mid2").val(res_obj[0]);
        $("#vendor2").val(res_obj[1]);
        $("#category2").val(res_obj[2]);
	 }
	 else
		  errorMsg2.text("Please enter valid SKU!");
        
}

// Validate TAB-2 :Edit Record	
function validate_tab2(){
	 var m = $('#m'),
             d = $('#d'),
             y = $('#y'),
			 qty = $('#qty');
			 
	 var errorMsg2 = $('#error_message2');	 	
	 $("#sku2").on('blur', function() {
        if ($("#sku2").val() != "" && validate_sku($("#sku2").val()) == true) {
            $(this).removeClass("error");
			var url = "http://jadran.sdsu.edu/jadrn040/servlet/DoDBQuery";
			var param = "sku=" + $("#sku2").val();
			
			$.post(url, param, fill_data);
        }else{
			 errorMsg2.text("Please enter valid SKU!");
		}
    });
   
    $('#reset1').on('click', function() {
        errorMsg2.text("");
        $("#upload_img2").text("");
        $("#sku2").focus();
    });
	
    $('#out_btn').on('click', function(e) {
       
		e.preventDefault();
        if ($("#sku2").val() == "") {
            $("#sku2").addClass("error");
            errorMsg2.text("Please enter SKU!");
            $("#sku2").focus();

        } else if (validate_sku($("#sku2").val()) == false) {
            $("#sku2").addClass("error");
            errorMsg2.text("Invalid SKU! It should be of the form CAT-123");
            $("#sku2").focus();

        }else if ($.trim(m.val()).length == 0) {
			
             errorMsg2.text("Please enter Month(mm)");
             $('#m').focus();
             return false;
         } else if ($.trim(d.val()).length == 0) {
             errorMsg2.text("Please enter Day(dd)");
             $('#d').focus();
             return false;
         } else if ($.trim(y.val()).length == 0) {
             errorMsg2.text("Please enter Year(yyyy)");
             $('#y').focus();
             return false;
         }else if (!validateDate()) {
             errorMsg2.text("Please enter valid date");
             $('#d').focus();
             return false;
         } else if ($.trim(qty.val()).length == 0) {
             errorMsg2.text("Please enter quantity");
             $('#qty').focus();
             return false;
         } else if (!$.isNumeric(qty.val())) {
             errorMsg2.text("Please enter numeric quantity");
             $('#qty').focus();
             return false;
         } else if (qty.val()<0) {
             errorMsg2.text("Please enter valid quantity");
             $('#qty').focus();
             return false;
         }   else {
            errorMsg2.text("");
			updateDB();
			return true;
		 }
		 return ;
    }); 
	return;
}
function updateDB(){
	var url = "http://jadran.sdsu.edu/jadrn040/servlet/MerchandiseOut";
	var param = "sku=" + $("#sku2").val();
	param= param + "&date=" + $("#m").val() + $("#d").val() + $("#y").val();
	param=param+ "&qty=" + $("#qty").val() ;
	$.post(url, param, confirmationDB);
}

function confirmationDB(response){
	//handle after trasaction done
	alert("in confirm");
	
	 var result = $.trim(response);
	 alert(result);
	 
		if(result!= null)
		{
			alert("hi11111")
			var res_obj = response.split("|"); 
			
			alert(res_obj[0] + "," + res_obj[1] + "," +res_obj[2]);
			
			if(res_obj[1] == 2 )
				$('#error_message2').text("Please enter lesser quantity");
				
				else if(res_obj[0] == 1 && res_obj[1] == 0  &&  res_obj[2] == 0)
			$('#error_message2').text("Record updated !");
		
			 
		}
		
		 else
		  errorMsg2.text("Error in updation!");
	  
	 
	 
}


function validateDate() {

     var date = $("#d").val();
     var month = $("#m").val();
     var year = $("#y").val();

     //Turn the three values into a Date object and check them
     var checkDate = new Date(year, month - 1, date);
     var checkDay = checkDate.getDate();
     var checkMonth = checkDate.getMonth() + 1;
     var checkYear = checkDate.getFullYear();

     if (!(date == checkDay && month == checkMonth && year == checkYear)) {
         return false;
     }
     return true;
 }

	

function validate_sku(var_sku){
	return (new RegExp('^([A-Z]{3}[-]{1}[0-9]{3})$').test(var_sku));
}


