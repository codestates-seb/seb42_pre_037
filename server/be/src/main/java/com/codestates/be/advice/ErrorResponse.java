package com.codestates.be.advice;


import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {
    private int status;
    private String message;
    private List<FieldErs> fieldErs;

    public ErrorResponse(ExceptionCode exceptionCode){
        this.status = exceptionCode.getHttpStatus();
        this.message = exceptionCode.getMessage();
    }
    public ErrorResponse(List<FieldErs> ers){
        this.fieldErs = ers;
    }

    public ErrorResponse(HttpStatus httpStatus) {
        this.status = httpStatus.value();
        this.message = httpStatus.getReasonPhrase();
    }

    public static ErrorResponse of(BuissnessLogicException e){
        return new ErrorResponse(e.getExceptionCode());
    }
    public static ErrorResponse of(BindingResult bindingResult){
        return new ErrorResponse(FieldErs.of(bindingResult));
    }

    public static ErrorResponse of(HttpStatus httpStatus){
        return new ErrorResponse(httpStatus);
    }

    public static class FieldErs{
        public FieldErs(Object rejectedValue, String field, String message) {
            this.rejectedValue = rejectedValue;
            this.field = field;
            this.message = message;
        }

        private Object rejectedValue;
        private String field;
        private String message;

        public static List<FieldErs> of(BindingResult bindingResult){
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            return fieldErrors.stream()
                    .map( fe->{
                        return new FieldErs(
                                fe.getRejectedValue(),
                                fe.getField(),
                                fe.getDefaultMessage()
                        );
                    }).collect(Collectors.toList());
        }

    }


}
