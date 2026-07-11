package com.sys.project.online_sales_management_system.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {


    private static final String SECRET_KEY =
            "my-secret-key-my-secret-key-my-secret-key";

    
    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 24;

    public String generateToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(
                        io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                                SECRET_KEY.getBytes()
                        ),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public String extractUsername(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(
                        io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                                SECRET_KEY.getBytes()
                        )
                )
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    public boolean isTokenValid(String token, org.springframework.security.core.userdetails.UserDetails userDetails) {

    final String username = extractUsername(token);

    return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
}

private boolean isTokenExpired(String token) {

    Claims claims = Jwts.parser()
            .verifyWith(
                    io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                            SECRET_KEY.getBytes()
                    )
            )
            .build()
            .parseSignedClaims(token)
            .getPayload();

    return claims.getExpiration().before(new Date());
    }
}