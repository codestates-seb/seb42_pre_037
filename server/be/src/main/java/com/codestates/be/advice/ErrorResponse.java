package com.codestates.be.advice;


import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class ErrorResponse {
    private int status;
    private String message;

    public ErrorResponse(ExceptionCode exceptionCode){
        this.status = exceptionCode.getHttpStatus();
        this.message = exceptionCode.getMessage();
    }

    public static ErrorResponse of(BuissnessLogicException e){
        return new ErrorResponse(e.getExceptionCode());
    }


}
