import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class FetchCategoryData extends HttpServlet {

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
	PrintWriter out = response.getWriter();
	String categoryId = request.getParameter("categoryId");
	Vector<String[]> v = DBHelper.runQuery("SELECT s.sku, s.Manuf_id, s.Retai_price, s.Image ,oh.on_hand_quantity FROM SKU s LEFT JOIN on_hand oh on s.sku=oh.sku where Category_id="+categoryId+";");
	
	String catData = "";
	for(int i=0; i < v.size(); i++)  {
		String [] tmp = v.elementAt(i);
		for(int j=0; j < 5; j++)
		      catData += tmp[j]+"|";
		catData += "|";
		}  
	catData = catData.substring(0,catData.length()-2);
	System.out.print(catData);  
	out.print(catData);						    
    }
}



