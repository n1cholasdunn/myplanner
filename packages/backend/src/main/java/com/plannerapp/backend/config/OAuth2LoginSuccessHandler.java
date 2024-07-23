package com.plannerapp.backend.config;


import com.plannerapp.backend.entity.RegistrationSource;
import com.plannerapp.backend.entity.UserEntity;
import com.plannerapp.backend.entity.UserRole;
import com.plannerapp.backend.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;


import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(OAuth2LoginSuccessHandler.class);
    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        logger.debug("Authentication success handler triggered");
        System.out.println("Authentication success handler triggered");
        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        logger.debug("Client registration ID: {}", oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
        System.out.println("Client registration ID: {}");

        if ("google".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())) {
            DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
            Map<String, Object> attributes = principal.getAttributes();
            String email = attributes.getOrDefault("email", "").toString();
            String name = attributes.getOrDefault("name", "").toString();
            String picture = attributes.getOrDefault("picture", "").toString();
            logger.debug("User attributes: email={}, name={}, picture={}", email, name, picture);
         try{
            userService.findByEmail(email)
                    .ifPresentOrElse(user -> {
                        DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(user.getRole().name())),
                                attributes, "sub");
                        Authentication securityAuth = new OAuth2AuthenticationToken(newUser, List.of(new SimpleGrantedAuthority(user.getRole().name())),
                                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
                        SecurityContextHolder.getContext().setAuthentication(securityAuth);
                        logger.info("Existing user authenticated: {}", email);
                    }, () -> {
                        UserEntity userEntity = new UserEntity();
                        userEntity.setRole(UserRole.ROLE_USER);
                        userEntity.setEmail(email);
                        userEntity.setName(name);
                        userEntity.setPicture(picture);
                        userEntity.setSource(RegistrationSource.GOOGLE);
                        userService.save(userEntity);
                        DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(userEntity.getRole().name())),
                                attributes, "sub");
                        Authentication securityAuth = new OAuth2AuthenticationToken(newUser, List.of(new SimpleGrantedAuthority(userEntity.getRole().name())),
                                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
                        SecurityContextHolder.getContext().setAuthentication(securityAuth);
                        logger.info("New user registered and authenticated: {}", email);
                    });

        }catch (Exception e) {
                e.printStackTrace();
                // Handle exception and set appropriate error response
             System.out.println("Error during OAuth2 authentication");
                response.sendRedirect(frontendUrl + "/login?error");
                return;
            }
        }
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(frontendUrl);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}