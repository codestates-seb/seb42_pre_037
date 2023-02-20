package com.codestates.be.security.authentication.filter;

import com.codestates.be.member.entity.Member;
import com.codestates.be.security.dto.LoginDto;
import com.codestates.be.security.jwt.JwtTokenizer;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtTokenizer jwtTokenizer;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(JwtTokenizer jwtTokenizer, AuthenticationManager authenticationManager) {
        this.jwtTokenizer = jwtTokenizer;
        this.authenticationManager = authenticationManager;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        ObjectMapper mapper = new ObjectMapper();

        LoginDto loginDto = mapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh" , refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(Member member){
        Map<String , Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
//        claims.put("Id", member.getMemberId());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration,jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
    }

    private String delegateRefreshToken(Member member){
        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        return jwtTokenizer.generateRefreshToken(subject, expiration, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
    }
}
