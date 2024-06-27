package com.plannerapp.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class LoginController {

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        response.sendRedirect("http://localhost:5173/");  // Redirect to the React login page
    }
}
