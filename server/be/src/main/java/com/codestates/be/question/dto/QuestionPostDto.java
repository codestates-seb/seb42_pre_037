package com.codestates.be.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class QuestionPostDto {
    private Long memberId;  //멤버 아이디 어떻게?
    private String title;
    private String content;
    private List<String> tags;

    //사진은 어떻게 받지? -> 일단은 부기능으로.. 다 완성 후 advanced 과제로 해보자??

}
