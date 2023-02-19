package com.codestates.be.answer.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;


@Getter
@Setter
public class AnswerPostDto {
    private long questionId;
    //어떤 질문에 달리는지에 대한 단서

    @NotBlank
    @Email
    private String email;

    @NotEmpty(message = "본문은 공백이 아니어야 합니다.")
    private String content;

    //TODO 멤버 아이디로 식별자를 받아올 수 있는지

//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getContent() {
//        return content;
//    }
//
//    public void setContent(String content) {
//        this.content = content;
//    }
//
//    public long getQuestionId() {
//        return questionId;
//    }
//
//    public void setQuestionId(long questionId) {
//        this.questionId = questionId;
//    }
}
