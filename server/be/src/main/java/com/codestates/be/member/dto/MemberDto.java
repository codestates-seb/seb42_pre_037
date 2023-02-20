package com.codestates.be.member.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class MemberDto {
    @Getter
    public static class Post{
        @Email
        private String email;
        @NotNull
        private String displayName;
        @NotNull
        private String password;
        @NotNull
        private String createdAt;
    }
    @Getter
    public static class Patch{
        private String displayName;
        private String password;
        @NotBlank
        private String modifiedAt;
    }
    @Getter
    @AllArgsConstructor
    public static class User{
        private String displayName;
        private String email;
        private long memberId;
    }
}
