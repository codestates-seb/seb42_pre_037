package com.codestates.be.security.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ClaimsToUser {
    private String displayName;
    private String email;
    private Object memberId;
}
