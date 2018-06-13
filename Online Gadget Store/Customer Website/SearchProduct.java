import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class SearchProduct extends HttpServlet {

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
			
	String searchValue="";
	searchValue=request.getParameter("searchValue");
	PrintWriter out = response.getWriter();
	String query="SELECT s.sku, s.Manuf_id, s.Retai_price, s.Image ,oh.on_hand_quantity FROM SKU s LEFT JOIN on_hand oh on s.sku=oh.sku where s.Manuf_id LIKE '%"+searchValue+"%' OR s.Description LIKE '%"+searchValue+"%' OR s.Feature LIKE '%"+searchValue+"%'";
	System.out.print(query); 
	
	Vector<String[]> v = DBHelper.runQuery("SELECT s.sku, s.Manuf_id, s.Retai_price, s.Image ,oh.on_hand_quantity FROM SKU s LEFT JOIN on_hand oh on s.sku=oh.sku where s.Manuf_id LIKE '%"+searchValue+"%' OR s.Description LIKE '%"+searchValue+"%' OR s.Feature LIKE '%"+searchValue+"%'");
	
	String answer = "";
	for(int i=0; i < v.size(); i++)  {
		String [] tmp = v.elementAt(i);
		for(int j=0; j < 5; j++)
		      answer += tmp[j]+"|";
		answer += "|";
		} 
		if(answer==null || answer.equals(""))
		{
				out.print("");
		}
		else{
	answer = answer.substring(0,answer.length()-2);
	System.out.print(answer);  
	out.print(answer);	
		}	
    }
}



