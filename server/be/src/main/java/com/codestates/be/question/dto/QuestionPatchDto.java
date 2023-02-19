package com.codestates.be.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionPatchDto {
    private Long questionId;
    private String title;
    private String content;
    private List<String> tags;
}
