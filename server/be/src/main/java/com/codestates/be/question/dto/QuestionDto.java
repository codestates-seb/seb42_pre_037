package com.codestates.be.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

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
        @NotBlank
//        @Pattern(regexp = "^([0-9]+[0-9]+[0-9]+[0-9])-([0-9]+[0-9])-([0-9]+[0-9])([T]):([0-9]+[0-9]):([0-9]+[0-9]).([0-9]+[0-9]+[0-9])([A-Z])$",
//                message = "날짜 형식이 잘못됐습니다. ex) '2023-02-22T04:11:17.285Z'")
        private String createdAt;   //     //'2023-02-22T04:11:17.285Z'
    }

    @Getter
    @Setter
    public static class Patch {
        private long questionId;
        private String content;
        @NotBlank
        private String modifiedAt;
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
