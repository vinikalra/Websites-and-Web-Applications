var ArrResponse;
var validate = false;

$(document).ready(function()
{

 
 $("#sku").on('blur',function(e)
 {
	 
	var sku = $("#sku").val();
	 $.post("/jadrn017/servlet/Fetch_out", {sku:sku} 
	 , function(response) {
            ArrResponse = response.split("|");
			if(response.startsWith("Error"))
			{
		   $('#statusbar').css('color','red');
           $('#statusbar').html("Sorry, SKU Details not found");
		   $( "<style>.hidethis {visibility : hidden}</style>" ).appendTo( "head" )
			}
			else{
			setValues();	
			}
			});
			 
	 
 });
 
});

function setValues()
{	
	$('#statusbar').html("");
	$('.hidethis').css('visibility','visible');	
	document.getElementById("category").value = ArrResponse[0];
	document.getElementById("vendor").value = ArrResponse[1];
	document.getElementById("identifier").value = ArrResponse[2];
	document.getElementById("description").value = ArrResponse[3];
	var path = "/~jadrn017"+ ArrResponse[4].substring(26);  
	var toDisplay = "<img src=\"" + path + "\" width=\"70\" height=\"70\" />";
	$('#image').html(toDisplay);
	
	
}

function addToInv()
{
		
	var sku = $("#sku").val();
	var date = $("#date").val();
	var qty = $("#quantity").val();
	var action = "Add";
	validateForm();
	if(validate == true)
	{
	 $.post("/jadrn017/servlet/UpdateInv", {sku:sku, date:date, qty:qty, action:action},
			function(response) {
				//window.location.reload();
				if(response.startsWith("Success"))
            {
				$('.hidethis').css('visibility','hidden');
				//window.location.reload();
				document.getElementById("sku").value ="";  
				document.getElementById("quantity").value ="";
				$('#statusbar').html("SKU Added to the inventory");
				$('#date').focus();
				}				
				
				else{
				$('#statusbar').html("Sorry an error occured");	
				}
			});
	}	
}

function removeFromInv()
{
	var sku = $("#sku").val();
	var date = $("#date").val();
	var qty = $("#quantity").val();
	var action = "Remove";
	
	validateForm();
	if(validate == true)
	{
	 $.post("/jadrn017/servlet/UpdateInv", {sku:sku, date:date, qty:qty, action:action},
			function(response) {
            	if(response.startsWith("Success"))
				{
				$('.hidethis').css('visibility','hidden');
				//window.location.reload();
				document.getElementById("sku").value ="";  
				document.getElementById("quantity").value ="";
				$('#statusbar').html("SKU Removed to the inventory");		
				$('#date').focus();
				}
				else if(response.startsWith("Underflow"))
			{
				$('#statusbar').html("Not Enough Merchandise in Stock");
			}
			else if(response.startsWith("Unavailable"))
			{
				$('#statusbar').html("Merchandise not in Stock");
			}
				else{
				$('#statusbar').html("Sorry an error occured");	
				}
			});
	}
}
// to reset form values
function resetAll()
{
	window.location.reload();
}

function validateForm()
{
	var pattern = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
	var date = $("#date").val();
	var qty = $("#quantity").val();
	if(pattern.test(date)==false)
	{
		$('#date').focus();
		$('#statusbar').html("Please enter a valid date");
		
	}
	else if(qty=="" || isNaN(qty) || qty== null || qty<1 || qty>66666)
	{
		$('#quantity').focus();
		$('#statusbar').html("Please enter a valid quantity");
	}
	else{
		validate = true;
	}
	
}

