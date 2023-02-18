package com.codestates.be.member.dto;


import com.codestates.be.tag.dto.TagDto;
import lombok.Getter;

import javax.validation.Valid;
import java.util.List;

@Valid
public class MemberDto {
    @Getter
    public static class Post{
        private String email;
        private String displayName;
        private String password;
        private String createdAt;
        private List<String> tags;
    }

    public static class Patch{
        private String displayName;

        private String password;
        private String userIntro;

        private List<TagDto.Request> tags;

    }

    public static class Response{

    }
}
