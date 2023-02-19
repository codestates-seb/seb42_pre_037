package com.codestates.be.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponseDto {
    private Long questionId;
    private Long memberId;
    private String title;
    private String content;
    private LocalDateTime askedAt;
    private LocalDateTime modifiedAt;
    private List<String> tags;
    private Long viewCount;
}
