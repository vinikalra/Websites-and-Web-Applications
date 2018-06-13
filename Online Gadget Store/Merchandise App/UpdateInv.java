/*  Login.java
    Sample login servlet
    Alan Riggins    
    CS645
    Spring 2017
 */

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class UpdateInv extends HttpServlet { 
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        processRequest(request, response);         
        }

    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  { 
        processRequest(request, response); 
        } 
        
    private void processRequest(HttpServletRequest request,
              HttpServletResponse response) 
                        throws IOException, ServletException {
							String outputFromDB = "";
        HttpSession session = request.getSession(true);
		PrintWriter out = response.getWriter();
		String sku = (String) request.getParameter("sku");
		String date = (String) request.getParameter("date");
		String quantity = (String) request.getParameter("qty");
		String action = (String) request.getParameter("action");
		if(action.equals("Add"))
		{
			 outputFromDB = UpdateDataInInv.addData(sku, date, quantity);
		}
		else if(action.equals("Remove"))
		{
			 outputFromDB = UpdateDataInInv.removeData(sku, date, quantity);
		}
		
		out.println(outputFromDB);
			
		
        
    }      
}



