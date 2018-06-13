import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class FetchProductData extends HttpServlet {

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
	PrintWriter out = response.getWriter();
	String sku = request.getParameter("sku");
	
	Vector<String[]> v = DBHelper.runQuery("SELECT s.Manuf_id, s.Image, s.Description, s.Feature, s.Retai_price, oh.on_hand_quantity FROM SKU s LEFT JOIN on_hand oh on s.sku=oh.sku where s.sku='"+sku+"';");
	
	String answer = "";
	for(int i=0; i < v.size(); i++)  {
		String [] tmp = v.elementAt(i);
		for(int j=0; j < 6; j++)
		      answer += tmp[j]+"|";
		answer += "|";
		}  
	answer = answer.substring(0,answer.length()-2);
	System.out.print(answer);  
	out.print(answer);						    
    }
}



