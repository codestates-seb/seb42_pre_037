package com.codestates.be.member.dto;


import com.codestates.be.answer.entity.Answer;
import com.codestates.be.question.entity.Question;
import com.codestates.be.tag.dto.TagDto;
import com.codestates.be.tag.entity.Tag;
import lombok.Getter;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Valid
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
        private List<TagDto.Request> tags;
    }
    @Getter
    public static class Patch{
        private String displayName;
        private String password;
        private String userIntro;
        private String modifiedAt;
        private List<TagDto.Request> tags;
    }
    @Getter
    public static class User{
        private String displayName;
        private String email;
        private long member;
    }
}
