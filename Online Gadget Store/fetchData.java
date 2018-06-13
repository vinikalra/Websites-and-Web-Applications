import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import myHelpers.*;

public class fetchData extends HttpServlet {

public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        processRequest(request, response);  
        String sku = (String) request.getParameter("sku1");
        PrintWriter out = response.getWriter();
        String query = "select i.ven_name,j.man_name, k.cat_name, image from product x join vendor i on x.venID=i.id join manufacturerID j on x.manID=j.id join category k on x.catID=k.id where sku='"+sku+"';";
        String DBData = DBHelper.doQuery(query);
        if(DBData.equals("[[]]")){
        	out.println("");  
        }
        else{
        	out.println(DBData);  
        }
		
      
        }
public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  { 
                        processRequest(request, response);  
        String sku = (String) request.getParameter("sku1");
        PrintWriter out = response.getWriter();
        String query = "select i.ven_name,j.man_name, k.cat_name, image from product x join vendor i on x.venID=i.id join manufacturerID j on x.manID=j.id join category k on x.catID=k.id where sku='"+sku+"';";
        String DBData = DBHelper.doQuery(query);
        if(DBData.equals("[[]]")){
        	out.println("no");  
        }
        else{
        	out.println("yes");  
        }
                         
		
                        
//          throw new ServletException("GET protocol is not supported, POST only");
        }
private void processRequest(HttpServletRequest request,
              HttpServletResponse response) 
                        throws IOException, ServletException {
        PrintWriter out = response.getWriter();
        if(request.getMethod().equals("GET")) {
        String data;
        String skus = request.getParameter("skus");
        String sku = (String) request.getParameter("sku1");
//         out.println("sku is" + sku);
        
        }
        
        } 

} 