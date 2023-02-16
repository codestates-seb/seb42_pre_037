package com.codestates.be.advice;


import lombok.Getter;

@Getter
public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_ALREADY_EXISTS(406, "이미 가입한 회원입니다.");
    private int httpStatus;
    private String message;

    ExceptionCode(int httpStatus, String message) {
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
