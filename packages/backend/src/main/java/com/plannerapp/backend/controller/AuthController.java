package com.plannerapp.backend.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.plannerapp.backend.model.User;
import com.plannerapp.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/oauth2")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepository userRepository;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @PostMapping("/callback")
    public ResponseEntity<?> handleOAuth2Callback(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        logger.info("Received token: {}", token);
        System.out.println("Received token: " + token);
        System.out.println("""
                !!!!
                !!!!
                !!!!!
                !!!!
                !!!!
                !!!!!
                """);
        try {
            // Verify and decode the JWT token
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            DecodedJWT jwt = JWT.require(algorithm).build().verify(token);

            String email = jwt.getClaim("email").asString();
            String username = jwt.getClaim("name").asString();

            logger.info("Decoded JWT - Email: {}, Username: {}", email, username);

            // Check if the user already exists
            Optional<User> optionalUser = userRepository.findByEmail(email);
            User user;
            if (optionalUser.isPresent()) {
                user = optionalUser.get();
                logger.info("User found: {}", user.getUsername());
            } else {
                // Create a new user if they don't exist
                user = new User();
                user.setUsername(username);
                user.setEmail(email);
                userRepository.save(user);
                logger.info("New user created: {}", user.getUsername());
            }

            // Set the user authentication context
            UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(user.getUsername()).password("").authorities("ROLE_USER").build();
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            logger.error("Error processing token", e);
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("Invalid token");
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
    }
}
