package com.codestates.be.security.authentication.filter;

import com.codestates.be.member.entity.Member;
import com.codestates.be.member.mapper.MemberMapper;
import com.codestates.be.member.repository.MemberRepository;
import com.codestates.be.security.dto.JwtSerilizer;
import com.codestates.be.security.dto.LoginDto;
import com.codestates.be.security.jwt.JwtTokenizer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.SneakyThrows;
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
    private final MemberRepository repository;

    public JwtAuthenticationFilter(JwtTokenizer jwtTokenizer, AuthenticationManager authenticationManager, MemberRepository repository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authenticationManager = authenticationManager;
        this.repository = repository;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        ObjectMapper mapper = new ObjectMapper();

        LoginDto loginDto = mapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        Member authMember = (Member) authResult.getPrincipal();

        Member findMember = repository.findByEmail(authMember.getEmail()).get();
        String accessToken = delegateAccessToken(findMember);

        sendJwtToken(response, accessToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(Member member){
        Map<String , Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("displayName", member.getDisplayName());
        claims.put("memberId", member.getMemberId());
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

    private void sendJwtToken(HttpServletResponse response, String jwt) throws IOException {
        Gson gson = new Gson();
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(new JwtSerilizer(jwt), JwtSerilizer.class));
    }
}
