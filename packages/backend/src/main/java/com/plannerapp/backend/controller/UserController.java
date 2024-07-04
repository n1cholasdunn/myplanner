package com.plannerapp.backend.controller;


import com.plannerapp.backend.entity.UserEntity;
import  com.plannerapp.backend.entity.UserRole;
import com.plannerapp.backend.repository.UserEntityRepository;
import  com.plannerapp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @Autowired
    private UserEntityRepository userEntityRepository;
    private static final Logger logger = Logger.getLogger(UserController.class.getName());
    @PostMapping("/user/{email}")
    public void changeToAdmin(@PathVariable String email) {
        userService.findByEmail(email).ifPresent(userEntity -> {
            userEntity.setRole(UserRole.ROLE_ADMIN);
            userService.save(userEntity);
        });
    }

    @GetMapping("/user-info")
    public ResponseEntity<UserEntity> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            logger.warning("Unauthorized access attempt to get current user.");
            return ResponseEntity.status(401).build();
        }

        DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = principal.getAttributes();
        String email = attributes.getOrDefault("email", "").toString();
        Optional<UserEntity> userEntityOptional = userEntityRepository.findByEmail(email);

        if (userEntityOptional.isPresent()) {
            return ResponseEntity.ok(userEntityOptional.get());
        } else {
            logger.warning("User not found for email: " + email);
            return ResponseEntity.status(404).build();
        }
    }
}