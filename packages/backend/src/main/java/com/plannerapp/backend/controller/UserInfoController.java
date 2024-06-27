package com.plannerapp.backend.controller;

import com.plannerapp.backend.exception.UnauthorizedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserInfoController {

    @GetMapping("/api/user")
    public Map<String, Object> user(@AuthenticationPrincipal OidcUser principal) {
        if (principal == null) {
            throw new UnauthorizedException(); // Custom exception to handle 401
        }
        return Map.of(
                "id", principal.getSubject(),
                "name", principal.getFullName(),
                "email", principal.getEmail(),
                "picture", principal.getPicture()
        );
    }
}
