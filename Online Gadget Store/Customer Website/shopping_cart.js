  
function shopping_cart(owner) {
    this.owner = $.trim(owner);
    this.imageArray = new Array();
    this.productArray = new Array();
    this.qtyArray = new Array();
    this.costArray = new Array();
//////////////////////////////////////////////////////////////////////////
// Do not use the following two methods;  they are private to this class
    this.getCookieValues = function() {  // PRIVATE METHOD
        var raw_string = document.cookie;        
        var arr = new Array();
        if(raw_string == undefined)
            return;
        var tmp = raw_string.split(";");
        var myValue = null;        
        for(i=0; i < tmp.length; i++)
            if(tmp[i].indexOf(owner) != -1)
                myValue = tmp[i].split("=");
        if(!myValue)
            return;
        arr = myValue[1].split("||");
        for(i=0; i < arr.length; i++) {
            var pair = arr[i].split("|"); 
            if(pair[0] == undefined || pair[1] == undefined) continue;
            this.productArray[i] = pair[0];
            this.qtyArray[i] = pair[1];
            }         
        }
        
    this.writeCookie = function() {  // PRIVATE METHOD
        var toWrite = this.owner+"=";
        for(i=0; i < this.productArray.length; i++) 
toWrite += this.productArray[i] + "|" + this.qtyArray[i] + "|" + this.costArray[i] + "||";
        toWrite = toWrite.substring(0,toWrite.length - 2);
        toWrite += "; path=/";
        document.cookie = toWrite;
        }
//////////////////////////////////////////////////////////////////////////            
        
    this.add = function(image, product, quantity, cost) {
        alert("Inside Cart");
        image = $.trim(image);
        product = $.trim(product);
        quantity = $.trim(quantity);
        cost = $.trim(cost);
        this.getCookieValues(); 
        var found = false;
        for(i=0; i < this.productArray.length; i++)
            {
        if(this.productArray[i] == product) {        
            this.qtyArray[i] = parseInt(quantity) + parseInt(this.qtyArray[i]);
            this.costArray[i] = parseInt(cost) + parseInt(this.costArray[i]);
            found = true;            
            }
            }
        if(!found) {
            this.imageArray.push(image);
            this.productArray.push(product);
            this.qtyArray.push(quantity);
            this.costArray.push(cost);
            }
        this.writeCookie();         
    }
    
    this.setQuantity = function(product, quantity) {  
        product = $.trim(product);
        var found = false;
        if(product == "") return;        
        quantity = $.trim(quantity);            
        this.getCookieValues();
        
        for(i=0; i < this.productArray.length; i++)
            if(this.productArray[i] == product) {        
                this.qtyArray[i] = parseInt(quantity,10);            
                found = true;
                }
        if(found)
            this.writeCookie();
        }    
    
    this.delete = function(product) {
        product = $.trim(product);
        var index = -1;
        this.getCookieValues();       
        for(i=0; i < this.productArray.length; i++)
        if(this.productArray[i] == product)  
            index = i;               
        if(index != -1) {      
            this.productArray.splice(index,1);
            this.qtyArray.splice(index,1);
            }         
        if(this.productArray.length == 0) {
            document.cookie = this.owner + "= ;expires=-1;path=/";
            }
        else
            this.writeCookie();
        }
        
    this.size = function() {
        this.getCookieValues();
        var count = 0;
        for(i=0; i < this.qtyArray.length; i++)
            count += parseInt(this.qtyArray[i],10);
        return count;
        }        
        
    this.getCartArray = function() {
        this.getCookieValues();
        var returnArray = new Array();
        for(i=0; i < this.productArray.length; i++) {
            returnArray[i] = new Array();
            returnArray[i].push(this.imageArray[i]);
            returnArray[i].push(this.productArray[i]);
            returnArray[i].push(this.qtyArray[i]);
            returnArray[i].push(this.costArray[i]);
            }
        return returnArray;
        }                    
}    
        