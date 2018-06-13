import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

/**
 * The simplest possible servlet.
 *
 * @author James Duncan Davidson
 */

public class AjaxGetProducts2 extends HttpServlet {

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
	PrintWriter out = response.getWriter();
	Vector<String[]> v = DBHelper.runQuery("SELECT * FROM product;");
	ProductBean [] beans = new ProductBean[v.size()];
	for(int i=0; i < v.size(); i++)  {
		String [] tmp = v.elementAt(i);
		beans[i] = new ProductBean(tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],
			tmp[5],tmp[8],Float.parseFloat(tmp[6]),Float.parseFloat(tmp[7]));
		}
	request.setAttribute("p_beans",beans);
	String toDo = "/WEB-INF/jsp/AjaxProducts.jsp";
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
        dispatcher.forward(request, response);  						    

    }
}



