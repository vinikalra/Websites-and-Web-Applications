import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class DeleteFromCart extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {

  response.setContentType("text/html");
  PrintWriter out = response.getWriter();
  HttpSession session = request.getSession();
  
   ArrayList<Cart> itemList;
   itemList = (ArrayList<Cart>)session.getAttribute("cart_items");
  String itemIndex = request.getParameter("itemIndex");
  String answer="";
  String product="";
  String image="";
  String quantity="";
  String cost="";
  int index = Integer.parseInt(itemIndex);
  
 
itemList.remove(index);

if(itemList.size() == 0){
      answer ="No Items";
  }
else
{	
  for(int i=0;i <itemList.size();i++){
  
  product=itemList.get(i).getProduct();
  image=itemList.get(i).getImage();
  quantity=itemList.get(i).getQuantity();
  cost=itemList.get(i).getCost();
  answer+= product+"|"+image+"|"+quantity+"|"+cost+"||";
  
  }
  answer = answer.substring(0,answer.length()-2);
  }
  session.setAttribute("cart_items",itemList);
  out.print(answer);
  
}

}
