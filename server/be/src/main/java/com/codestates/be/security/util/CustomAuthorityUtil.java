package com.codestates.be.security.util;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtil {
    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("USER", "ADMIN");
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("USER");

    private final List<String> ADMIN_ROLES_STRING = Arrays.asList("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = Arrays.asList("USER");

    public List<GrantedAuthority> createAuthorities(List<String> roles){
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    public List<String> createRoles(String email){
        if(email.equals("admin")){
            return ADMIN_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }
}
