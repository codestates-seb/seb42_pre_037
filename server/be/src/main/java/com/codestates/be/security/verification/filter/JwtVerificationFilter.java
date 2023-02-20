package com.codestates.be.security.verification.filter;

import com.codestates.be.security.jwt.JwtTokenizer;
import com.codestates.be.security.util.CustomAuthorityUtil;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtil authorityUtil;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtil authorityUtil) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtil = authorityUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return super.shouldNotFilter(request);
    }


}
