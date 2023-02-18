package com.codestates.be.tag.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Valid
public class TagDto {

    @Valid
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Request {
        @Positive
        private long tagId;
        @NotBlank
        private String tagName;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private long tagId;
        private String tagName;
        private String tagInfo;

    }
}
