package com.codestates.be.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class AnswerDto {
    @Getter
    @Setter
    public static class Post {
        private long questionId;
        //어떤 질문에 달리는지에 대한 단서

        @NotNull
        private long memberId; //작성자의 아이디

        @NotEmpty(message = "본문은 공백이 아니어야 합니다.")
        private String content;
    }

    @Getter
    @Setter
    public static class Patch {
        private long answerId;

        @NotEmpty(message = "본문은 공백이 아니어야 합니다.")
        private String content;

        @NotNull
        private String modifiedAt;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private String content;
        private String displayName;
        private long answerId;
        private long questionId;
    }
}
