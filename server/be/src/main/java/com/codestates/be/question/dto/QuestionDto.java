package com.codestates.be.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {

    @Getter
    public static class Post {
        private String title;
        private String content;
        private String email;
        private String createdAt;
    }

    @Getter
    @Setter
    public static class Patch {
        private long questionId;
        private String content;
        private String modifiedAt;
        // 태그 수정 가능해야 하나?
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long questionId;
        private String title;
        private String content;
        private String email;
        private long countAnswer;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String displayName;
//        private long viewCounts;    -> viewCount 추가?
    }
}
