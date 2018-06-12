//Vini Kalra
//jadrn022
//Code Ref - jadrn000

$(document).ready(function() {
    $('input[name="name"]').focus();
    
    $(':submit').on('click', function(e) {
        e.preventDefault();
        var params = "email="+$('#email').val();
        var url = "check_dup.php?"+params;
        $.get(url, dup_handler);
        });
    
    });
    
function dup_handler(response) {
    if(response == "dup")
        $('#status').text("ERROR, duplicate");
    else if(response == "OK") {
        $('form').serialize();
        $('form').submit();
        }
    else
        alert(response);
    }
