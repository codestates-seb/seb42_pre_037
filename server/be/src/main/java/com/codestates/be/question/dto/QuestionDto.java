package com.codestates.be.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {

    @Getter
    public static class Post {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
        @Min(1)
        private long memberId;
        @NotBlank //정규 표현식 추가
        private String createdAt;
    }

    @Getter
    @Setter
    public static class Patch {
        private long questionId;
        private String content;
        @NotBlank
        private String modifiedAt;
        // 태그 수정 가능해야 하나?
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private long questionId;
        private String title;
        private String content;
        private String email;
        private String displayName;
        private long countAnswer;
        private String createdAt;
        private String modifiedAt;
//        private long viewCounts;    -> viewCount 추가?
    }
}
