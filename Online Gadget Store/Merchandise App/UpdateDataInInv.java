package sdsu;

import java.security.*;
import java.util.*;
import java.io.*;

public class UpdateDataInInv {
        
    public static String addData(String sku, String date, String qty) {
       Vector<String[]> on_hand;
	   int updateValue=0;
	   int insertValue=0;
	   
	   String output="";
       String checkQuery = "select * from on_hand where sku ='"+sku+"';";
	   
	   String insertQuery = "insert into on_hand values('"+sku+"','"+date+"',"+qty+");";
	   String insertQuery2 = "insert into merchandise_in values('"+sku+"','"+date+"',"+qty+");";
	   String updateQuery = "update on_hand set on_hand_quantity= on_hand_quantity +"+qty+", last_date_modified_on ='"+date+"' where sku='"+sku+"';";
       on_hand = DBHelper.runQuery(checkQuery);
	   try {
		  if(on_hand.size()==0){
			   
			   updateValue = DBHelper.executeCommand(insertQuery);	
			}
		  else {
			   
			   updateValue = DBHelper.executeCommand(updateQuery);	   
			}
		  
		  insertValue = DBHelper.executeCommand(insertQuery2);
			
			int outputvalue = insertValue + updateValue;
			if(outputvalue==2)
				{
				output = "Success";
				}
			else
				{
				output = "Error";
				}  
		   return output;
			}
			
		catch(Exception e) {
			return "Exception"+e;
		}
        }  
		
		//Added by Abhishek to remove inventry
		public static String removeData(String sku, String date, String qty) {
       Vector<String[]> on_hand;
	   int updateValue=0;
	   int insertValue=0;
	   
	   String output="";
       String checkQuery = "select on_hand_quantity from on_hand where sku ='"+sku+"';";
	   
	  // String insertQuery = "insert into on_hand values('"+sku+"','"+date+"',"+qty+");";
	   
	   String insertQuery2 = "insert into merchandise_out values('"+sku+"','"+date+"',"+qty+");";
	   
	   String updateQuery = "update on_hand set on_hand_quantity= on_hand_quantity -"+qty+", last_date_modified_on ='"+date+"' where sku='"+sku+"';";
       on_hand = DBHelper.runQuery(checkQuery);
	   try {
		   //In case there is no entry for on_hand_quantity
		  if(on_hand.size()==0){
			   output = "Unavailable";
			   
			}
			
		  else {
			  //If on_hand_quantity is less than quantity provided
			  int on_hand_quantity = Integer.parseInt(on_hand.elementAt(0)[0]);
			  int qty_sent = Integer.parseInt(qty);
			  if (on_hand_quantity < qty_sent){
				  output="Underflow";
			  }
			  //If value is present, subtract from on_hand_quantity
			  else{
				  updateValue = DBHelper.executeCommand(updateQuery);
				  insertValue = DBHelper.executeCommand(insertQuery2);				  
			  }
			   
			      
			}
		  
		  
			
			int outputvalue = insertValue + updateValue;
			if(outputvalue==2)
				{
				output = "Success";
				}
			else
				{
				output = output+"::Error";
				}  
		   return output;
			}
			
		catch(Exception e) {
			return "Exception"+e;
		}
        }  



}            
