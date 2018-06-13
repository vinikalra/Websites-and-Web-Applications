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



public class Login extends HttpServlet { 
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        processRequest(request, response);         
        }

    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  { 
        throw new ServletException("GET protocol is not supported, POST only");
        } 
        
    private void processRequest(HttpServletRequest request,
              HttpServletResponse response) 
                        throws IOException, ServletException {
        String toDo= "";
        if(!request.getMethod().equals("POST")) {
        response.sendRedirect("/jadrn017/login_err.jsp"); 
            return;
            }     
        String username = (String) request.getParameter("username");
        String password = (String) request.getParameter("password");
        if(username == null || password == null) {
            response.sendRedirect("/jadrn017/login_err.jsp"); 
            return;
            }        
        if(PasswordUtilities.isValidLogin(username,password)) {
            toDo = "/WEB-INF/jsp/inve_in.jsp";
	        HttpSession session = request.getSession(true);
            session.setAttribute("username", username); 
	    session.setAttribute("message","Successful result from database");   
	        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
            dispatcher.forward(request, response);  
        }
    }      
}



