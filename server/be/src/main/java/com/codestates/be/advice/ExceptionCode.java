package com.codestates.be.advice;


import lombok.Getter;

@Getter
public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_ALREADY_EXISTS(406, "이미 가입한 회원입니다."),
    TAG_NOT_EXISTS(406, "존재하지 않는 태그를 조회했습니다."),
    SERVICE_NOT_READY(404, "아직 구현되지 않았습니다."),
    INCORRECT_DATA_REQUESTED(400, "요청에 존재하지 않는 데이터 값이 참조됐을 수 있습니다."),
    QUESTION_NOT_FOUND(404, "질문을 찾을 수 없습니다."),
    ANSWER_NOT_FOUND(404, "답변을 찾을 수 없습니다."),
    ANSWER_NOT_CHANGE(404, "수정할 내용이 없습니다."),
    WRONG_TOKEN_INPUT(403, "잘못된 토큰이 들어왔습니다."),
    WRONG_FORMAT_OF_DATE(400, "전달한 날짜 형식이 올바르지 않습니다. (ex. YYYY MM DD hh mm)");
    private int httpStatus;
    private String message;

    ExceptionCode(int httpStatus, String message) {
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
