import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.Cart;
import sdsu.*;

public class AddToCart extends HttpServlet {
    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException {

  response.setContentType("text/html");
  PrintWriter out = response.getWriter();
  HttpSession session = request.getSession();
  boolean isThere = false;
  ArrayList<Cart> itemList;
  itemList = (ArrayList<Cart>)session.getAttribute("cart_items");
 if(itemList == null){
      itemList = new ArrayList<Cart>();
      session.setAttribute("cart_items",itemList);
  }
  
  String product = request.getParameter("product");
  String image = request.getParameter("image"); 
  String quantity = request.getParameter("quantity");
  String cost = request.getParameter("cost"); 
  String sku = request.getParameter("sku");
	 
	 for(int i=0;i <itemList.size();i++){
	 
	 if(sku.equals((String)itemList.get(i).getSku()))
	 {
		
		itemList.get(i).setQuantity(
		String.valueOf(Integer.parseInt(quantity)+Integer.parseInt(itemList.get(i).getQuantity()))
		);
		itemList.get(i).setCost(
		String.valueOf(Double.parseDouble(cost)*Integer.parseInt(itemList.get(i).getQuantity()))
		);
		isThere = true;
	 }
	 
	}
	System.out.println("isThere:"+isThere);
	  if(isThere == false){
	  Cart myCart = new Cart();
	  myCart.setProduct(request.getParameter("product"));
	  myCart.setSku(request.getParameter("sku"));
	  myCart.setImage(image);
	  myCart.setQuantity(request.getParameter("quantity"));
	  myCart.setCost(
	  String.valueOf(Double.parseDouble(cost)*Integer.parseInt(quantity))
	  );
	  itemList.add(myCart); 
	  }
      session.setAttribute("cart_items",itemList);
	  out.print("Success"); 	
		}


}
