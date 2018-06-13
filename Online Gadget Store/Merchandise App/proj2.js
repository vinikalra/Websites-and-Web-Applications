$(document).ready(function() {
    $("[name='username']").focus();
    $("#reset1").on('click', clearFields);
    document.getElementById("defaultOpen").click();
    document.getElementById('date').onload= SetDate();
    $(document).on("click", "#logout",logoutPage);
    $(document).on("click", "#loginfo",loginPage);
    $(document).on("click", "#merch_in",addMerchIn);
    $(document).on("blur","#sku1",function(e){
        //alert("sku blur");
        $('#sku1').val($('#sku1').val().toUpperCase());
        fetchMyData();
    });
    // $(document).on("blur","#q1",function(e){
    //     if($('#quantity1').val()==""){
    //         $("[name='quantity1']").addClass("error2");
    //         $('.message_line').text("Empty Quantity. Enter number for quantity");
    //         $("[name='quantity1']").focus();
    //         setTimeout(function() { $('#quantity1').focus(); }, 50);
    //         return;
    //     }
    //     if(!$.isNumeric($("[name='quantity1']").val())){
    //         $("[name='quantity1']").addClass("error2");
    //         $('.message_line').text("Only numbers allowed for quantity");
    //         $("[name='quantity1']").focus();
    //         setTimeout(function() { $('#quantity1').focus(); }, 50);
    //         return;
    //     }
    // });
    $('#item_info').hide();
    //$("#loginfo").on('click',loadForm);


});
/////////// Kills submit button//////////////////
$(document).on("click","#merch_in",function(e){
    e.preventDefault();

});
function loginPage(){
    alert("inside loginPage");
}
function validData() {
    var date_regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    // var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    alert("inside validData");
    alert("quantity is: "+$("[name='quan1']").val());
    alert("date is: "+$("[name='date']").val());
    if($("[name='quan1']").val()==""){
        $("[name='quan1']").addClass("error2");
        $('.message_line1').text("Empty Quantity. Enter number for quantity");
        $("[name='quan1']").focus();
        setTimeout(function() { $('#quan1').focus(); }, 50);
        return;
    }
    if(!$.isNumeric($("[name='quan1']").val())){
        $("[name='quan1']").addClass("error2");
        $('.message_line1').text("Only numbers allowed for quantity");
        $("[name='quan1']").focus();
        setTimeout(function() { $('#quantity1').focus(); }, 50);
        return;
    }
    if($('#date').val()==""){
        $("[name='date']").addClass("error2");
        $('.message_line1').text("Empty date field. PLease enter date in form YYYY-MM-DD");
        $("[name='sku1']").focus();
        setTimeout(function() { $('#date').focus(); }, 50);
        return;
    }
    if(!(date_regex.test($("[name='date']").val()))){
        alert("inside if valDateFormat")
        $("[name='date']").addClass("error2");
        $('.message_line1').text("Invalid date format. Please enter YYYY-MM-DD format. You entered: "+$("[name='date']").val() );
        $("[name='sku1']").focus();
        setTimeout(function() { $('#date').focus(); }, 50);
        return;
    }
    return true;
}
function addMerchIn() {
    alert("before if inside merch in");
    // validData();
    if(validData()) {
        alert("in if inside merch in");
        $("[name='quan1']").removeClass("error2");
        $("[name='date']").removeClass("error2");
        $('.message_line1').text("");
        var addMerch = $('#form1').serialize();
        $.post("/jadrn029/servlet/addMerchIn", addMerch, function (response) {
            alert(response);

        });
    }//if statement
}
function checkQuantity() {

}
function fetchMyData() {
    // alert("Inside fetch");
    // if($('#date').val()==""){
    //     $("[name='date']").addClass("error2");
    //     $('.message_line').text("Empty date field. PLease enter date in form MM/DD/YYYY");
    //     $("[name='sku1']").focus();
    //     setTimeout(function() { $('#date').focus(); }, 50);
    //     return;
    // }
    if($('#sku1').val()==""){
        // alert("empty sku");
        $("[name='sku1']").addClass("error2");
        $('.message_line').text("Empty SKU. Valid form is (ABC-123)");
        $("[name='sku1']").focus();
        setTimeout(function() { $('#sku1').focus(); }, 50);
        return;
    }
    if(valFormSKU($('#sku1').val())) {
    // alert("valid sku");
        var skuInfo = $('#sku1').serialize();
        $.post("/jadrn029/servlet/fetchData",skuInfo,function(response) {
            // alert(response);
            response.trim();
            // alert("respnse length: "+response.length)
            if(response.length == "1"){
                // alert("not valid sku");
                $('#item_info').hide();
                $("[name='sku1']").addClass("error2");
                $('.message_line').text("SKU not found on database, Enter a valid SKU.");
                $('.status').text("");
                $("[name='sku1']").focus();
            }
            else{
                // alert("valid sku after ajax");
                // document.getElementById("merch_in").disabled = false;
                $("[name='sku1']").removeClass("error2");
                $('.message_line').text("");
                $('.status').text("");
                // alert(response);
                var infoArray = $.parseJSON(response);
                var vendor = infoArray[0][0];
                var manId = infoArray[0][1];
                var cat = infoArray[0][2];
                var pic = infoArray[0][3];
                ven_dor.innerText = "Vendor is: "+vendor;
                manName.innerText = "Manufacturer is: "+manId;
                cat_gory.innerText = "Category is: "+cat;
                var d = new Date();
                $('#item_image').attr("src","/~jadrn029/proj1/f_o_t_o_s/"+pic+ "?" +d.getTime()).show();
                $('#item_info').show();

            }

        });

    }
    else{
        // alert("invalid sku");
        $("[name='sku1']").addClass("error2");
        $('.message_line').text("Invalid SKU. Enter SKU in form (ABC-123)");
        $("[name='sku1']").focus();
        $('.status').text("");
        // focusOnSku2();
        // showError(2,'INVALID SKU (ABC-123)');
        setTimeout(function() { $('#sku1').focus(); }, 50);
        // alert("after adding error class");
        return  false;
    }
    // checkQuantity();
}

//found this here
// http://stackoverflow.com/questions/1001937/auto-insert-date-and-time-in-form-input-field
function SetDate() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;


    document.getElementById('date').value = today;
}
function clearFields() {
    $("[name='username']").focus();
}
function loadForm() {
    alert("inside loadForm");

}
function valFormSKU(sku){
    return (sku.match(/^[A-Z]{3}[-]{1}\d{3}$/));
}
function valDateFormat(date){
    alert("inside ValDateFormat and date is: "+date);
    alert("sku.match: "+date.match(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/));
    return (date.match(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{4}$/));
}
function logoutPage() {
    $('body').html("<h1>You have successfully LOGGED OUT!</h1>" + "<a class='bar_item' href='/jadrn029/login.html'>Login Again</a>");

}
//makes tab open at login//

////////// JS For tabs //////////////
/////got this from https://www.w3schools.com/howto/howto_js_tabs.asp///////////////
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    $("[name='sku1']").focus();
    // document.getElementById("merch_in").disabled = true;
}
// $(document).on("click",":submit",function(e){
//     e.preventDefault();
//
// });
