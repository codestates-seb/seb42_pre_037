package com.codestates.be.security.authentication.filter;

import com.codestates.be.advice.ErrorResponse;
import com.codestates.be.member.dto.MemberDto;
import com.codestates.be.member.entity.Member;
import com.codestates.be.member.mapper.MemberMapper;
import com.codestates.be.security.dto.LoginDto;
import com.codestates.be.security.jwt.JwtTokenizer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    private final MemberMapper mapper;

    public JwtAuthenticationFilter(JwtTokenizer jwtTokenizer, AuthenticationManager authenticationManager, MemberMapper mapper) {
        this.jwtTokenizer = jwtTokenizer;
        this.authenticationManager = authenticationManager;
        this.mapper = mapper;
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

        sendUserDetail(response, member);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(Member member){
        Map<String , Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("Id", member.getMemberId());
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

    private void sendUserDetail(HttpServletResponse response, Member member) throws IOException{
        Gson gson = new Gson();
        MemberDto.User user = mapper.MemberToUser(member);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(user, MemberDto.User.class));
    }
}
