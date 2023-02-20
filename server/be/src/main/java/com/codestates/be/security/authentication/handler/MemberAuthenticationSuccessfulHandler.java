package com.codestates.be.security.authentication.handler;

import com.codestates.be.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
public class MemberAuthenticationSuccessfulHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        Member member = (Member) request.getUserPrincipal();
        log.info("# 로그인 인증 성공 : {}", member.getEmail());
    }
}
