import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

public class DisplayCart extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {

  response.setContentType("text/html");
  PrintWriter out = response.getWriter();
  HttpSession session = request.getSession();
  String action ="";
  String answer=""; 
  String toDo = "/WEB-INF/jsp/checkOut.jsp";
  
  action = request.getParameter("todo");
  
  if(action.startsWith("display"))
  {
  
  ArrayList<Cart> myCart = new ArrayList<Cart>();
  myCart = (ArrayList<Cart>)session.getAttribute("cart_items");
  String product="";
  String image="";
  String quantity="";
  String cost="";
  if(myCart == null){
      answer ="No Items";
  }
  else{
  for(int i=0;i <myCart.size();i++){
  
  product=myCart.get(i).getProduct();
  image=myCart.get(i).getImage();
  quantity=myCart.get(i).getQuantity();
  cost=myCart.get(i).getCost();
  answer+= product+"|"+image+"|"+quantity+"|"+cost+"||";
  
  }
  answer = answer.substring(0,answer.length()-2);
  }
  
  out.print(answer);
	 
}

		
else if(action.startsWith("checkOut"))
{
  ArrayList<Cart> myCart = new ArrayList<Cart>();
  myCart = (ArrayList<Cart>)session.getAttribute("cart_items");

  double total=0;
  if(myCart.size()>0)
  {
  
  for(int i=0;i <myCart.size();i++){ 
  
  total+= Double.parseDouble(myCart.get(i).getCost());
  
  }
  }
  session.setAttribute("totalCost", total); 
  RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
  dispatcher.forward(request, response);
	
}
	
		}
}
