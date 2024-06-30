package com.plannerapp.backend.service;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkException;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwk.UrlJwkProvider;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

import java.net.URL;
import java.security.interfaces.RSAPublicKey;
import java.util.HashMap;
import java.util.Map;

@Service
public class PublicKeyService {

    private Map<String, RSAPublicKey> publicKeys;
    private static final String GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs";

    @PostConstruct
    public void refreshPublicKeys() {
        try {
            JwkProvider provider = new UrlJwkProvider(new URL(GOOGLE_JWKS_URL));
            publicKeys = new HashMap<>();
            for (Jwk jwk : ((UrlJwkProvider) provider).getAll()) {
                RSAPublicKey publicKey = (RSAPublicKey) jwk.getPublicKey();
                publicKeys.put(jwk.getId(), publicKey);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch public keys", e);
        }
    }

    public RSAPublicKey getPublicKey(String kid) {
        return publicKeys.get(kid);
    }
}
