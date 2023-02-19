package com.codestates.be.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class QuestionTagDto {

    @Getter
    public static class Post {
        private long tagId;
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long tagId;
        private String tagName;
//        private String tagInfo;
    }
}
