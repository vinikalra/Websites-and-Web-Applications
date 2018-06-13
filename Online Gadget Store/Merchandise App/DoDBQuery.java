/*  DB Qiery Example

    Alan Riggins    
    CS645
    Spring 2017
 */

import java.io.*;
import java.util.Vector;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class DoDBQuery extends HttpServlet { 
          
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
        String query = "SELECT SKU, cost, retail FROM product ORDER BY sku";
         
	PrintWriter out = response.getWriter();  
	
	Vector<String[]> v = DBHelper.runQuery(query);
	response.setContentType("text/html");
	out.println("<html><body>");
	for(int i=0; i < v.size(); i++) {
		String [] tmp = v.elementAt(i);
		for(int j=0; j < tmp.length; j++)			
			out.println(tmp[j]);
		out.println("<br />");
		}
	out.print("<hr />");
	out.print(DBHelper.doQuery(query));		
	out.print("</body></html>");
        }      
}



