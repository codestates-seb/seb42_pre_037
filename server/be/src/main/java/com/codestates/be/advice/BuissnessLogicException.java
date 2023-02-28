package com.codestates.be.advice;

import lombok.Getter;

@Getter
public class BuissnessLogicException extends RuntimeException{
    private ExceptionCode exceptionCode;
    public BuissnessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
