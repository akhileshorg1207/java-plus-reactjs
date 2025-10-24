package servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "Home", urlPatterns = { "" })
public class Home extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    // --- 1. Cross-Site Scripting (XSS) vulnerability ---
    String user = request.getParameter("user");
    // Directly echoing unescaped user input to response
    response.getWriter().println("<h1>Welcome " + user + "</h1>");

    // --- 2. SQL Injection vulnerability ---
    String id = request.getParameter("id");
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      Connection conn = DriverManager.getConnection(
          "jdbc:mysql://localhost:3306/testdb", "root", "password");

      Statement stmt = conn.createStatement();
      // Vulnerable: concatenating user input directly into query
      ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE id = '" + id + "'");
      while (rs.next()) {
        response.getWriter().println("<p>User: " + rs.getString("name") + "</p>");
      }
      conn.close();
    } catch (Exception e) {
      e.printStackTrace(response.getWriter());
    }

    // --- 3. Sensitive information exposure ---
    // Hardcoded credentials (CodeQL detects this)
    String apiKey = "sk_live_123456789SECRETKEY";
    response.getWriter().println("<!-- debug: apiKey=" + apiKey + " -->");

    // --- 4. Open redirect vulnerability ---
    String redirect = request.getParameter("next");
    if (redirect != null) {
      // Vulnerable: redirecting without validation
      response.sendRedirect(redirect);
    }
  }
}
