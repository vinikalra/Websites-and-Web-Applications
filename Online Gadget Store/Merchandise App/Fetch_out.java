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
import java.util.Enumeration;




public class Fetch_out extends HttpServlet { 
          
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
		HttpSession session = request.getSession(true);
		PrintWriter out = response.getWriter();
		String sku = (String) request.getParameter("sku");		
		String outputFromDB = FetchDataForSku.getData(sku);
		if(outputFromDB==null)
			{	
			out.println("Error");
			}
		else
			{
			out.println("");
			out.println(outputFromDB);
			
		}
	}       
 }      



