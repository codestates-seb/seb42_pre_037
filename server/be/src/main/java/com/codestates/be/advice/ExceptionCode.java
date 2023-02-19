package com.codestates.be.advice;


import lombok.Getter;

@Getter
public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_ALREADY_EXISTS(406, "이미 가입한 회원입니다."),
    TAG_NOT_EXISTS(406, "존재하지 않는 태그를 조회했습니다."),
    SERVICE_NOT_READY(404, "아직 구현되지 않았습니다."),
    WRONG_FORMAT_OF_DATE(400, "전달한 날짜 형식이 올바르지 않습니다. (ex. YYYY MM DD hh mm)");
    private int httpStatus;
    private String message;

    ExceptionCode(int httpStatus, String message) {
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
