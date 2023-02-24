package com.codestates.be.security.util;

import com.codestates.be.security.dto.ClaimsToUser;
import com.codestates.be.security.jwt.JwtTokenizer;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JwtToResponseUtils {
    // JWT를 받았을 때 이쁘게 Response로 반환하는 클래스

    private final JwtTokenizer tokenizer;

    public JwtToResponseUtils(JwtTokenizer tokenizer) {
        this.tokenizer = tokenizer;
    }

    public ClaimsToUser getClaimsToUser(String token){
        token = token.replace("Bearer ", "");
        Map<String, Object> claims =
                tokenizer.getClaims(token, tokenizer.encodeBase64SecretKey(tokenizer.getSecretKey()));

        ClaimsToUser userInfo = ClaimsToUser.builder()
                .email((String) claims.get("email"))
                .memberId( claims.get("memberId"))
                .displayName((String) claims.get("displayName")).build();

        return userInfo;
    }
}
