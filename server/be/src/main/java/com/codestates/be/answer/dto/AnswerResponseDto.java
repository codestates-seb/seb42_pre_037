package com.codestates.be.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AnswerResponseDto {
    private String content;
    private String displayName;
    private long answerId;
    private long questionId;
}
