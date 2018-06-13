var shopCart;
var cartSize;
var onhandqty;
var sku;
$(document).ready(function(){
   
$("#ui-dialog").dialog({
            height: 400,
            width: 500,
            modal: true,
            autoOpen: false,
                    });
        
    
 $( "#accordion" ).accordion();

$.get('/jadrn017/servlet/AjaxGetProducts1', fetchProducts);
});

function fetchProducts(response){
    $('#productForm').empty();
if(response=="" || response==null)
    {
       $('#statusBar').html("Sorry, No Results Found");
    }
 
 topx=100;
  leftx=300;
  var rows = response.split("||");
    for(i=0; i<rows.length; i++) {
      tmp = rows[i].split("|");
      if(tmp[0]!=null){
      var path = "/~jadrn017"+ tmp[3].substring(26);
      imageValue = "<img src='"+path+"' width='200px' height='150px'>";
          
      divProducts=$('<div class="polaroid" id="product"></div>');
      $('#productForm').append(divProducts.css({top: topx, left: leftx, position:'absolute'}).html(imageValue));
          
        
      viewButton=$('<input type="button" class="button" id="'+tmp[0]+'"  value="View" >');
          
      divProducts.append(viewButton);
          
      productName=$('<table><tr><td>'+tmp[1]+'</td></tr></table>');
      
      cost=$('<table><tr><td>Buy this for: $'+tmp[2]+'</td></tr></table>');
      if(tmp[4]>0)
        availability=$('<table class="available"><tr><td><b>In Stock</b></td></tr></table>');
      else if(tmp[4]==0)
        availability=$('<table class="unavailable"><tr><td><b>More On The Way</b></td></tr></table>');
      else
        availability=$('<table class="unavailable"><tr><td><b>Coming Soon </b></td></tr></table>');
          
      divProducts.append(productName);
      divProducts.append(cost);
      divProducts.append(availability);
      leftx+=230;
      if(leftx > 1000){
       topx+=430;
       leftx=300;
     }
      
  }
}
$('.button').on('click', function() {
    console.log("Hello "+$(this).attr("id"));
      sku=$(this).attr("id");
      var url="servlet/FetchProductData?sku=";
      url+=sku;
      $.get(url, quickViewData);
  });
}

  function quickViewData(response){
    var result=response.split("|");
      var productC = result[0];
      var costC = result[4];
      onhandqty = result[5];
    $('#viewProduct').empty();
      
    divModalValue=$('<div class="modal" id="modal"></div>');
    modalContent=$('<div class="modal_content"></div>');
    heading=$('<h3 class="headingModal">Product Details</h3>');
      
    productName=$('<table class="productName"><tr><td>Manufacturer ID:'+result[0]+'</td></tr></table>');
    
    var path2 = "http://jadran.sdsu.edu/~jadrn017"+ result[1].substring(26);
    imageView = "<img class='imageModal' src='"+path2+"' width='250px' height='250px'>";
      
    description=$('<table class="descriptionModal"><tr><td>Description:'+result[2]+'</td></tr></table>');
      
    feature=$('<table class="featureModal"><tr><td>Features:'+result[3]+'</td></tr></table>');
      
    cost=$('<table class="costModal" ><tr><td>Cost:$ '+result[4]+'</td></tr></table>');
    
    quantity=$('<table class="qtyModal"><tr><td>Quantity :</td><input type="number" id="qty"><td></td></tr></table>');
      
    cartButton=$('<input type="button" id="cartB" value="Add to Cart" class="cartModal" onclick="addtoCart(\''+productC+'\', \''+path2+'\',\''+costC+'\',\''+sku+'\' );"><br>');
      
    checkoutButton=$('<a href="servlet/DisplayCart?todo=checkOut" class="checkoutModal">Check Out Now</a>');
    spanValue=$('<span class="close">&times;</span>');
    
    cartStatus =$('<div class="cartStatus" id="displayCartStatus"></div>');
      
    modalContent.append(spanValue);
    modalContent.append(heading);
    modalContent.append(imageView);
    modalContent.append(productName);
    modalContent.append(description);
    modalContent.append(feature);
    modalContent.append(cost);
    modalContent.append(quantity); 
    modalContent.append(cartButton);
    modalContent.append(checkoutButton); 
   // modalContent.append(cartStatus);   
  $('#viewProduct').append(divModalValue.css({'display':'block'}).append(modalContent));
    $('.close').on('click', function() {
      $('#viewProduct').append(divModalValue.css({'display':'none'}).append(modalContent));
        });
  }

function openDialog()
{  
    var url = "servlet/DisplayCart?todo=display";        
    $.get(url, DispCartResponse);
     
    
}

function DispCartResponse(response)
{
    $('.ui-dialog-content').empty();
    if(response.startsWith("No Items"))
        {
             
            $('.ui-dialog-content').html("Your Cart is Empty");
             $("#ui-dialog").dialog('open');
        }
    else{
   var cartItems =response.split("||");
    var toWrite = "<table>"; 
    toWrite += "<tr><th>Product\t\t</th><th>Name\t\t</th><th>Quantity\t</th><th>Cost</th></tr>";
    for(i=0; i<cartItems.length; i++) {
      cartDetails = cartItems[i].split("|");
      toWrite += "<tr>";
            toWrite += "<td><img src='"+cartDetails[1]+"' width='60px' height='60px'></td>";
            toWrite += "<td >"+cartDetails[0]+"</td>";
            toWrite += "<td> X "+cartDetails[2]+"</td>";
            toWrite += "<td>"+cartDetails[3]+"</td>";
        toWrite +="<td><input type=\'button\' value=\'Delete\' class=\'delete\' onclick=\'deleteItem("+i+")\'></td>";
            toWrite += "</tr>";
            
    }
    toWrite += "</table class=\"cartTable\">";
       $('.ui-dialog-content').empty();
       $('.ui-dialog-content').append(toWrite);
 checkoutCart=$('<a href="servlet/DisplayCart?todo=checkOut">Check Out Now</a>');
   $('#ui-dialog').append(checkoutCart);     
    $("#ui-dialog").dialog('open');
        }
}

function filterCategory(categoryId)
{
    var url="servlet/FetchCategoryData?categoryId=";
      url+=categoryId;
     $.get(url, fetchProducts);
}
function filterBrand(vendorId)
{
    var url="servlet/FetchBrandData?vendorId=";
      url+=vendorId;
     $.get(url, fetchProducts);

}

function filterPrice()
{
    var minValue = document.getElementById("minPrice").value;
    var maxValue = document.getElementById("maxPrice").value;
    var url="servlet/FilterPrice?minPrice="+minValue+"&maxPrice="+maxValue+"";
     $.get(url, fetchProducts);

}
function searchProduct()
{
    var searchValue = document.getElementById("searchValue").value;
    var url="servlet/SearchProduct?searchValue=";
    url+=searchValue;
     $.get(url, fetchProducts);
}
function cartResponse(response)
{
   
    if(response=="Success"){
    //$.('.cartStatus').empty();
     modalContent.append('<table class="cartStatus"><tr><td>Product Added to the Cart</td></tr></table>');
    }
    else{
       // $.('.cartStatus').empty();
        modalContent.append('<table class="cartStatus"><tr><td>Error</td></tr></table>'); 
    }
}
function addtoCart(productC, imageC, costC, skuC)
{
    
var quantityCart = document.getElementById("qty").value;
if(parseInt(onhandqty,10)<quantityCart || parseInt(onhandqty,10) == 0 || quantityCart<0)
        {
            cartStatus.append('Insufficient Quantity, Please Check Later');
modalContent.append(cartStatus);
        }
    else{
        
    var url = "servlet/AddToCart?product="+productC+"&image="+imageC+"&quantity="+quantityCart+"&cost="+costC+"&sku="+sku; 
    $.get(url, cartResponse);      
    }
   
}
function checkOut()
{
    
$.get('servlet/DisplayCart?todo=checkOut');
}

function deleteItem(itemIndex)
{
    var url= "servlet/DeleteFromCart?itemIndex="+itemIndex;
    $.get(url, DispCartResponse);
}
function populateBilling(checked)
{
    if(checked)
        {
document.getElementById('bName').value = document.getElementById('name').value;
            document.getElementById('baddress1').value = document.getElementById('address1').value; 
document.getElementById('baddress2').value = document.getElementById('address2').value;
document.getElementById('bcity').value = document.getElementById('city').value;
document.getElementById('bstate').value =
    document.getElementById('state').value;
document.getElementById('bzipcode').value =document.getElementById('zipcode').value;
document.getElementById('bphone').value = document.getElementById('phone').value;        }
  
    else{
document.getElementById('bName').value =""; document.getElementById('baddress1').value ="";
document.getElementById('baddress2').value ="";
document.getElementById('bcity').value ="";
document.getElementById('bstate').value ="";
document.getElementById('bzipcode').value="";
document.getElementById('bphone').value ="";

    }
}
