package com.codestates.be.security.verification.filter;

import com.codestates.be.member.entity.Member;
import com.codestates.be.security.jwt.JwtTokenizer;
import com.codestates.be.security.util.CustomAuthorityUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@Slf4j
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
        try{
            Map<String, Object> claims = verifyJws(request);

//            if(request.getRequestURI().matches("/members/*")) {
//                verifyPath(request, claims); //권한 없는 곳에 접근하는지 확인
//            }

            setSecurityContext(claims);

        }catch (SignatureException se){
            request.setAttribute("exception", se);
        }catch (ExpiredJwtException ee){
            request.setAttribute("exception", ee);
        }catch (Exception e){
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    public Map<String, Object> verifyJws(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));

        return claims;
    }


    public void setSecurityContext(Map<String , Object> claims){
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities =
                authorityUtil.createAuthorities((List) claims.get("roles"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
