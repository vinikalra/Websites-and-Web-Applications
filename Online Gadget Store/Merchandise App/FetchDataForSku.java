package sdsu;

import java.security.*;
import java.util.*;
import java.io.*;

public class FetchDataForSku {
        
    public static String getData(String sku) {
       Vector<String[]> skuData; 
	   String output="";
       String query = "select c.name, v.name, s.Manuf_id, s.Description, s.Image from SKU s, Category c, Vendor v where s.sku='" + sku + "' and s.Category_id = c.id and s.Vendor = v.id;";
       skuData = DBHelper.runQuery(query);
	   DataBean db = new DataBean();
       try {
		   
		  db.setCategoryName(skuData.elementAt(0)[0]);
		  db.setVendorName(skuData.elementAt(0)[1]);
		  db.setManufid(skuData.elementAt(0)[2]);
		  db.setDescription(skuData.elementAt(0)[3]);
		  db.setImage(skuData.elementAt(0)[4]);
		   	
		  //db.setCategoryName(getCategoryNameFromDb(db.getCategoryid()));
		  //db.setVendorName(getVendorNameFromDb(db.getVendorid()));
			
		    output = db.getCategoryName() + "|" +
		   db.getVendorName()+ "|" +
		   db.getManufid()+ "|" +
		   db.getDescription()+ "|" +
		   db.getImage();		   
		   return output;
		   	}
			catch(Exception e) {
		  return null;
		}
        }  

}            
