package com.codestates.be.security.util;

import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.security.dto.ClaimsToUser;
import com.codestates.be.security.jwt.JwtTokenizer;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JwtToUserInfoUtils {
    // JWT를 받았을 때 이쁘게 Response로 반환하는 클래스

    private final JwtTokenizer tokenizer;

    public JwtToUserInfoUtils(JwtTokenizer tokenizer) {
        this.tokenizer = tokenizer;
    }

    public ClaimsToUser parseClaimsToUserInfo(String token){
        token = token.replace("Bearer ", "");
        Map<String, Object> claims =
                tokenizer.getClaims(token, tokenizer.encodeBase64SecretKey(tokenizer.getSecretKey()));

        ClaimsToUser userInfo = ClaimsToUser.builder()
                .email((String) claims.get("email"))
                .memberId( claims.get("memberId"))
                .displayName((String) claims.get("displayName")).build();

        return userInfo;
    }

    public ClaimsToUser parseClaimsToUserInfo(String token, long memberId){
        token = token.replace("Bearer ", "");
        Map<String, Object> claims =
                tokenizer.getClaims(token, tokenizer.encodeBase64SecretKey(tokenizer.getSecretKey()));

        ClaimsToUser userInfo = ClaimsToUser.builder()
                .email((String) claims.get("email"))
                .memberId( claims.get("memberId"))
                .displayName((String) claims.get("displayName")).build();

        verifiedApproporiateuser(userInfo.getMemberId(), memberId);

        return userInfo;
    }

    private void verifiedApproporiateuser(Object tryId,long memberId){
        if((Integer)tryId == memberId){
            return;
        }
        throw new BuissnessLogicException(ExceptionCode.WRONG_TOKEN_INPUT);
    }

}
