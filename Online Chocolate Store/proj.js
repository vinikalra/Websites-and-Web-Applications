var proj4_data;
var shopCart;
var cart;
var cartSize;
var onhandqty;
var sku;
var setCostCart;


$(document).ready(function(){
    proj4_data = new Array();
    cart = new shopping_cart("jadrn022");
 var cartArray = cart.getCartArray();
    cartSize = cartArray.length ;
    
  $('#myCart').append(cartSize);
 $( "#accordion" ).accordion();

$.get('/perl/jadrn022/get_products.cgi', storeData);

     $('#showCart').on('click', function() {
       displayCart();
        });
});

function addtoCart(productId)
{
var y = productId;
var path = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[y][0] +".jpg";
var cost = proj4_data[y][6];
var quantityCart = document.getElementById("qty").value;
cartStatus.html("");
if(quantityCart<1)
        {

cartStatus.append('Please enter a Quantity');
modalContent.append(cartStatus);
        }
    else{ 
    cart.add(path, proj4_data[y][0], $('#qty').val(), cost);
    cartStatus.append('Item successfully added to the cart');
     modalContent.append(cartStatus);   
    var cartArray = cart.getCartArray();
    cartSize = cartArray.length ;
    cartIcon = "<a href=\"#\" onclick=\'displayCart();\'>";
    cartIcon += "<img src=\"cart.png\" width=40 height=40>";
    cartIcon += "</a>";
     $('#myCart').html("");
    $('#myCart').append(cartIcon);
    $('#myCart').append(cartSize);
    }
   
    
}

function orderConfirmed()
{
    var subtotal=0;
    var shipFee=0;
    var tax=0;
    var total=0;
    
    $('#prod-content').html("");
     var cartArray = cart.getCartArray(); 
    var toWrite = "<table class=\"shipping\">";
    toWrite += "<th><h1 align=\"center\">Order Confirmed! Order Summary</h1></th>";
    
    
       for(i=0; i< cartArray.length; i++) {
        var skuCart = cartArray[i][1];
         setCostCart = cartArray[i][2] * cartArray[i][3];
     var pathImg = "/~jadrn000/PROJ4_IMAGES/"+ cartArray[i][1] +".jpg";
    toWrite += "<tr>";
    toWrite += "<td><img src='"+pathImg+"' width='80px' height='80px'></td>";
    toWrite += "<td >"+cartArray[i][1]+"</td>";
    toWrite += "<td><input type=\'number\' readonly id=\'qty"+i+"\' value=\'"+cartArray[i][2]+"\' ></td>";
    toWrite += "<td><input type=\"text\" readonly id=\'cost"+i+"\'value=\' "+setCostCart+"\'</td>";
    
    toWrite += "</tr>";
          subtotal +=setCostCart;
    }
     shipFee = 2 * cartArray.length;
    tax = subtotal * 0.08 ;
    total = subtotal + shipFee + tax;
    
    
      toWrite += "<tr>    <td>Items Purchased</td>    <td><input type=\"text\" name=\"oItems\" id=\"oItems\" value =\'"+cart.size() + "\' readonly ></td>    </tr>";
    
     toWrite += "<tr>    <td>SubTotal</td>    <td><input type=\"text\" name=\"oSubTotal\" id=\"oSubTotal\"  value =\'"+ subtotal + "\' readonly></td>    </tr>";
    
    for(var x=0; x<cartArray.length; x++)
        {
            
     cart.delete(x);
        }
    
     toWrite += "<tr>    <td>Shipping Fees</td>    <td><input type=\"text\" name=\"oShipping\" id=\"oShipping\" value =\'"+shipFee + "\' readonly></td>    </tr>";
    
     toWrite += "<tr>    <td>Tax</td>    <td><input type=\"text\" name=\"oTax\" id=\"oTax\" value =\'"+tax + "\' readonly></td>    </tr>";
    
     toWrite += "<tr>    <td>Total</td>    <td><input type=\"text\" name=\"oTotal\" id=\"oTotal\" value =\'"+total + "\' readonly></td>    </tr> </table>";
 
    
   $('#prod-content').append(toWrite);
    
    document.cookie = "jadrn022=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function storeData(response){
   
    $('#productForm').empty();

    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;
        }
     topx=150;
   leftx=300;
      for(var j=0; j < proj4_data.length -1; j++){
        
      var path = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[j][0] +".jpg";
      imageValue = "<img src='"+path+"' alt=\""+proj4_data[j][2]+"\"  width='200px' height='150px'>";
          
      divProducts=$('<div class="polaroid" id="product"></div>');
      $('#productForm').append(divProducts.css({top: topx, left: leftx, position:'absolute'}).html(imageValue));
          
        
      viewButton=$('<input type="button" class="button" id="'+j+'"  value="View" >');
          
      divProducts.append(viewButton);
          
      productName=$('<table><tr><td>'+proj4_data[j][2]+'</td></tr></table>');
      
      cost=$('<table><tr><td>Buy this for: $'+proj4_data[j][6]+'</td></tr></table>');
          
      divProducts.append(productName);
      divProducts.append(cost);
      leftx+=230;
      if(leftx > 1000){
       topx+=430;
       leftx=300;
     }
}
$('.button').on('click', function() {
    prod_id=$(this).attr("id");
    quickViewData(prod_id);
  });
}

  function quickViewData(prod_id){
      var k=prod_id;
      var productC = proj4_data[k][4];
      var costC = proj4_data[k][5];
      var sku = proj4_data[k][0];
     
    $('#viewProduct').empty();
      
    divModalValue=$('<div class="modal" id="modal"></div>');
    modalContent=$('<div class="modal_content"></div>');
    heading=$('<h3 class="headingModal">Product Details</h3>');
      
    
    var path2 = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[k][0] +".jpg";
    imageView = "<img class='imageModal' src='"+path2+"' width='200px' height='250px'>";
      
    description=$('<table class="descriptionModal"><tr><td>'+proj4_data[k][4]+'</td></tr></table>');
      
     
    cost=$('<table class="costModal" ><tr><td>Cost:$ '+proj4_data[k][6]+'</td></tr></table>');
    
    quantity=$('<table class="qtyModal"><tr><td>Quantity :</td><input type="number" id="qty"><td></td></tr></table>');
      
    cartButton=$('<input type="button" id="cartB" value="Add to Cart" class="cartModal" onclick="addtoCart(\''+k+'\' );"><br>');
      
    checkoutButton=$('<a href="#" onclick="displayCart()" class="checkoutModal">Check Out Now</a>');
    spanValue=$('<span class="close">&times;</span>');
    
    cartStatus =$('<div class="cartStatus" id="displayCartStatus"></div>');
      
    modalContent.append(spanValue);
    modalContent.append(heading);
    modalContent.append(imageView);
    modalContent.append(description);
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

function displayCart()
{
  var subtotal=0;
    var shipFee=0;
    var tax=0;
    var total=0;
  var cartArray = cart.getCartArray(); 
    
    $('#prod-content').html("");
    $('.main-content').css('background-image', 'none');
    $('.main-content').html("");
    
   
    var toWrite = "<table class=\"cartTable\">"; 
    toWrite += "<tr><th>Product\t\t</th><th>Name\t\t</th><th>Quantity\t</th><th>Cost</th></tr>";
    for(i=0; i< cartArray.length; i++) {
        var skuCart = cartArray[i][1];
         setCostCart = cartArray[i][2] * cartArray[i][3];
     var pathImg = "/~jadrn000/PROJ4_IMAGES/"+ cartArray[i][1] +".jpg";
    toWrite += "<tr>";
    toWrite += "<td><img src='"+pathImg+"' width='80px' height='80px'></td>";
    toWrite += "<td >"+cartArray[i][1]+"</td>";
    toWrite += "<td><input type=\'number\' id=\'qty"+i+"\' value=\'"+cartArray[i][2]+"\' onblur=\'setCost("+i+")\'></td>";
    toWrite += "<td><input type=\"text\" readonly id=\'cost"+i+"\'value=\' "+setCostCart+"\'</td>";
    toWrite +="<td><input type=\'button\' value=\'Delete\' class=\'delete\' onclick=\'deleteItem("+ i +")\'></td>";
    toWrite += "</tr>";
            subtotal +=setCostCart;
    }
    
    shipFee = 2 * cartArray.length;
    tax = subtotal * 0.08 ;
    total = subtotal + shipFee + tax;
    
    toWrite += "<tr> <td></td> <td></td> <td><b>Sub Total </b></td>"
    toWrite += " <td> <input type=\"text\" readonly id=\'SubTotal' value=\' "+subtotal+"\' </td></tr>";
    
     toWrite += "<tr> <td></td> <td></td> <td><b>Shipping Fees </b></td>"
    toWrite += " <td> <input type=\"text\" readonly id=\'shipFee' value=\' "+shipFee+"\' </td></tr>";
    
     toWrite += "<tr> <td></td> <td></td> <td><b>Tax </b></td>"
    toWrite += " <td> <input type=\"text\" readonly id=\'tax' value=\' "+tax+"\' </td></tr>";
    
    toWrite += "<tr> <td></td> <td></td> <td><b>Total </b></td>"
    toWrite += " <td> <input type=\"text\" readonly id=\'total' value=\' "+total+"\' </td></tr>";
 
    
 toWrite +="<tr><td></td><td></td><td></td><td></td><td><a class=\"button\" href=\"checkOut.html\">Check Out Now</a></td></tr></table>";
    
      $('#prod-content').append(toWrite);
  
}
function setCost(index)
{
    var ct = "cost"+index;
    var tot;
    var qt = "qty"+index;
    var subtotalC=0;
    var cartArray = cart.getCartArray(); 
    document.getElementById(ct).value = document.getElementById(qt).value * cartArray[index][3];
    for(i=0; i< cartArray.length; i++) {
        tot = "cost"+i;
        pTot = document.getElementById(tot).value * 1;
        subtotalC += pTot ;
    }
    document.getElementById("SubTotal").value = subtotalC; 
    cart.setQuantity(cartArray[index][1], document.getElementById(qt).value);
    
    document.getElementById("shipFee").value= 2 * cartArray.length;
    document.getElementById("tax").value = subtotalC * 0.08;
    document.getElementById("total").value = subtotalC + (2 * cartArray.length) + (subtotalC * 0.08);
    
    
}
function deleteItem(ind)
{
    var cartArray = cart.getCartArray(); 
   cart.delete(cartArray[ind][1]);
    cartSize = cartArray.length ;
    cartIcon = "<a href=\"#\" onclick=\'displayCart();\'>";
    cartIcon += "<img src=\"cart.png\" width=40 height=40>";
    cartIcon += "</a>";
     $('#myCart').html("");
    $('#myCart').append(cartIcon);
    $('#myCart').append(cartSize);
    
    displayCart();
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

// from http://www.webmasterworld.com/forum91/3262.htm            
function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}

tempArray[Count]=tempString;
return tempArray;
}    



function display_milk_chocolate()
{
      $('#productForm').empty();
     topx=150;
     leftx=300;
    for(var j=0; j < proj4_data.length; j++) {
        if(proj4_data[j][1] == "Milk chocolate") {
          
      var path = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[j][0] +".jpg";
      imageValue = "<img src='"+path+"' alt=\""+proj4_data[j][2]+"\"  width='200px' height='150px'>";
          
      divProducts=$('<div class="polaroid" id="product"></div>');
      $('#productForm').append(divProducts.css({top: topx, left: leftx, position:'absolute'}).html(imageValue));
          
        
      viewButton=$('<input type="button" class="button" id="'+j+'"  value="View" >');
          
      divProducts.append(viewButton);
          
      productName=$('<table><tr><td>'+proj4_data[j][2]+'</td></tr></table>');
      
      cost=$('<table><tr><td>Buy this for: $'+proj4_data[j][6]+'</td></tr></table>');
          
      divProducts.append(productName);
      divProducts.append(cost);
      leftx+=230;
      if(leftx > 1000){
       topx+=430;
       leftx=300;
     }
}
                     
            }
    $('.button').on('click', function() {
    prod_id=$(this).attr("id");
    quickViewData(prod_id);
  }); 
        }
   

function display_dark_chocolate()
{
     $('#productForm').empty();
     topx=150;
     leftx=300;
    for(var j=0; j < proj4_data.length; j++) {
        if(proj4_data[j][1] == "Dark chocolate") {
          
      var path = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[j][0] +".jpg";
      imageValue = "<img src='"+path+"' alt=\""+proj4_data[j][2]+"\"  width='200px' height='150px'>";
          
      divProducts=$('<div class="polaroid" id="product"></div>');
      $('#productForm').append(divProducts.css({top: topx, left: leftx, position:'absolute'}).html(imageValue));
          
        
      viewButton=$('<input type="button" class="button" id="'+j+'"  value="View" >');
          
      divProducts.append(viewButton);
          
      productName=$('<table><tr><td>'+proj4_data[j][2]+'</td></tr></table>');
      
      cost=$('<table><tr><td>Buy this for: $'+proj4_data[j][6]+'</td></tr></table>');
          
      divProducts.append(productName);
      divProducts.append(cost);
      leftx+=230;
      if(leftx > 1000){
       topx+=430;
       leftx=300;
     }
}
                     
            }
    $('.button').on('click', function() {
    prod_id=$(this).attr("id");
    quickViewData(prod_id);
  }); 
}
function display_nuts_chocolate()
{
     $('#productForm').empty();
     topx=150;
     leftx=300;
    for(var j=0; j < proj4_data.length; j++) {
        if(proj4_data[j][1] == "Nuts and chews") {
          
      var path = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[j][0] +".jpg";
      imageValue = "<img src='"+path+"' alt=\""+proj4_data[j][2]+"\"  width='200px' height='150px'>";
          
      divProducts=$('<div class="polaroid" id="product"></div>');
      $('#productForm').append(divProducts.css({top: topx, left: leftx, position:'absolute'}).html(imageValue));
          
        
      viewButton=$('<input type="button" class="button" id="'+j+'"  value="View" >');
          
      divProducts.append(viewButton);
          
      productName=$('<table><tr><td>'+proj4_data[j][2]+'</td></tr></table>');
      
      cost=$('<table><tr><td>Buy this for: $'+proj4_data[j][6]+'</td></tr></table>');
          
      divProducts.append(productName);
      divProducts.append(cost);
      leftx+=230;
      if(leftx > 1000){
       topx+=430;
       leftx=300;
     }
}
                     
            }
    $('.button').on('click', function() {
    prod_id=$(this).attr("id");
    quickViewData(prod_id);
  }); 
}
function display_brits_chocolate()
{
     $('#productForm').empty();
     topx=150;
     leftx=300;
    for(var j=0; j < proj4_data.length; j++) {
        if(proj4_data[j][1] == "Brittles and toffies") {
          
      var path = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[j][0] +".jpg";
      imageValue = "<img src='"+path+"' alt=\""+proj4_data[j][2]+"\"  width='200px' height='150px'>";
          
      divProducts=$('<div class="polaroid" id="product"></div>');
      $('#productForm').append(divProducts.css({top: topx, left: leftx, position:'absolute'}).html(imageValue));
          
        
      viewButton=$('<input type="button" class="button" id="'+j+'"  value="View" >');
          
      divProducts.append(viewButton);
          
      productName=$('<table><tr><td>'+proj4_data[j][2]+'</td></tr></table>');
      
      cost=$('<table><tr><td>Buy this for: $'+proj4_data[j][6]+'</td></tr></table>');
          
      divProducts.append(productName);
      divProducts.append(cost);
      leftx+=230;
      if(leftx > 1000){
       topx+=430;
       leftx=300;
     }
}
                     
            }
    $('.button').on('click', function() {
    prod_id=$(this).attr("id");
    quickViewData(prod_id);
  }); 
}
function display_truffles()
{
     $('#productForm').empty();
     topx=150;
     leftx=300;
    for(var j=0; j < proj4_data.length; j++) {
        if(proj4_data[j][1] == "Truffles") {
          
      var path = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[j][0] +".jpg";
      imageValue = "<img src='"+path+"' alt=\""+proj4_data[j][2]+"\"  width='200px' height='150px'>";
          
      divProducts=$('<div class="polaroid" id="product"></div>');
      $('#productForm').append(divProducts.css({top: topx, left: leftx, position:'absolute'}).html(imageValue));
          
        
      viewButton=$('<input type="button" class="button" id="'+j+'"  value="View" >');
          
      divProducts.append(viewButton);
          
      productName=$('<table><tr><td>'+proj4_data[j][2]+'</td></tr></table>');
      
      cost=$('<table><tr><td>Buy this for: $'+proj4_data[j][6]+'</td></tr></table>');
          
      divProducts.append(productName);
      divProducts.append(cost);
      leftx+=230;
      if(leftx > 1000){
       topx+=430;
       leftx=300;
     }
}
                     
            }
    $('.button').on('click', function() {
    prod_id=$(this).attr("id");
    quickViewData(prod_id);
  }); 
}
function display_gifts()
{
     $('#productForm').empty();
     topx=150;
     leftx=300;
    for(var j=0; j < proj4_data.length; j++) {
        if(proj4_data[j][1] == "Gifts") {
          
      var path = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[j][0] +".jpg";
      imageValue = "<img src='"+path+"' alt=\""+proj4_data[j][2]+"\"  width='200px' height='150px'>";
          
      divProducts=$('<div class="polaroid" id="product"></div>');
      $('#productForm').append(divProducts.css({top: topx, left: leftx, position:'absolute'}).html(imageValue));
          
        
      viewButton=$('<input type="button" class="button" id="'+j+'"  value="View" >');
          
      divProducts.append(viewButton);
          
      productName=$('<table><tr><td>'+proj4_data[j][2]+'</td></tr></table>');
      
      cost=$('<table><tr><td>Buy this for: $'+proj4_data[j][6]+'</td></tr></table>');
          
      divProducts.append(productName);
      divProducts.append(cost);
      leftx+=230;
      if(leftx > 1000){
       topx+=430;
       leftx=300;
     }
}
                     
            }
    $('.button').on('click', function() {
    prod_id=$(this).attr("id");
    quickViewData(prod_id);
  }); 
}
function display_holiday_chocolate()
{
     $('#productForm').empty();
     topx=150;
     leftx=300;
    for(var j=0; j < proj4_data.length; j++) {
        if(proj4_data[j][1] == "Holiday assortments") {
          
      var path = "/~jadrn000/PROJ4_IMAGES/"+ proj4_data[j][0] +".jpg";
      imageValue = "<img src='"+path+"' alt=\""+proj4_data[j][2]+"\"  width='200px' height='150px'>";
          
      divProducts=$('<div class="polaroid" id="product"></div>');
      $('#productForm').append(divProducts.css({top: topx, left: leftx, position:'absolute'}).html(imageValue));
          
        
      viewButton=$('<input type="button" class="button" id="'+j+'"  value="View" >');
          
      divProducts.append(viewButton);
          
      productName=$('<table><tr><td>'+proj4_data[j][2]+'</td></tr></table>');
      
      cost=$('<table><tr><td>Buy this for: $'+proj4_data[j][6]+'</td></tr></table>');
          
      divProducts.append(productName);
      divProducts.append(cost);
      leftx+=230;
      if(leftx > 1000){
       topx+=430;
       leftx=300;
     }
}
                     
            }
    $('.button').on('click', function() {
    prod_id=$(this).attr("id");
    quickViewData(prod_id);
  }); 
}
