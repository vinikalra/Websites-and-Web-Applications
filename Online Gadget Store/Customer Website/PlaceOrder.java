import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class PlaceOrder extends HttpServlet {

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
	response.setContentType("text/html");
  PrintWriter out = response.getWriter();
  HttpSession session = request.getSession();
  
   ArrayList<Cart> itemList;
   String status="";
    String sku="";
	String qty="";
	int updateValue=0;
	   int insertValue=0;
	DateFormat df = new SimpleDateFormat("MM/dd/yyyy");

// Get the date today using Calendar object.
Date today = Calendar.getInstance().getTime();        
// Using DateFormat format method we can create a string 
// representation of a date with the defined format.
String reportDate = df.format(today);
	
   
  itemList = (ArrayList<Cart>)session.getAttribute("cart_items");
  
  if(itemList == null){
      status="Sorry an Error occured. Please go to Home Page and Try Again";
  }
  else
  {
	  for(int i=0;i <itemList.size();i++){
		  
		sku = itemList.get(i).getSku();
		qty = itemList.get(i).getQuantity();
		
		String insertQuery2 = "insert into merchandise_out values('"+sku+"','"+reportDate+"',"+qty+");";
		System.out.println(insertQuery2);
		insertValue= DBHelper.executeCommand(insertQuery2);
		
		String updateQuery = "update on_hand set on_hand_quantity= on_hand_quantity -"+qty+", last_date_modified_on ='"+reportDate+"' where sku='"+sku+"';";
		System.out.println(updateQuery);
		updateValue = DBHelper.executeCommand(updateQuery);
		
		status ="Thank you. Your Order has been succesfully placed.";
	
	}
  }
 
	session.setAttribute("status", status);
	session.removeAttribute("cart_items");
RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher("/WEB-INF/jsp/OrderConfirmation.jsp"); 
  dispatcher.forward(request, response);	
    }
}



