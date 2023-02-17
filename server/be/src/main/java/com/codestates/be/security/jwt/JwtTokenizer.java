package com.codestates.be.security.jwt;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenizer {
    @Value("${jwt.key}")
    private String secretKey;

    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey(String secretKey){
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                 String subject,
                                 Date expiraton,
                                 String base64EncodedKey){
        Key key = getKeyFromBase64EncodedSecretKey(base64EncodedKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiraton)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String subject, Date expiration, String base64EncodedKey) {
        Key key = getKeyFromBase64EncodedSecretKey(base64EncodedKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Map<String, Object> getClaims(String jws, String base64EncodedKey){
        Key key = getKeyFromBase64EncodedSecretKey(base64EncodedKey);

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws)
                .getBody();
    }

    public Date getTokenExpiration(int expirationMinute){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinute);
        Date expiration = calendar.getTime();

        return expiration;
    }

    public Key getKeyFromBase64EncodedSecretKey(String base64EncodedKey){
        byte[] decodedKey = Decoders.BASE64.decode(base64EncodedKey);
        return Keys.hmacShaKeyFor(decodedKey);
    }
}
