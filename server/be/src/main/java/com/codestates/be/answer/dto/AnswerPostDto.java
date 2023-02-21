package com.codestates.be.answer.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Getter
@Setter
public class AnswerPostDto {
    private long questionId;
    //어떤 질문에 달리는지에 대한 단서

    @NotNull
    private long memberId; //작성자의 아이디

    @NotEmpty(message = "본문은 공백이 아니어야 합니다.")
    private String content;
}
