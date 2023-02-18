package com.codestates.be.advice;


import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {
    private int status;
    private String message;
    private List<FieldErs> fieldErs;
    private List<ConstraintViolationError> constraintViolationErrors;

    public ErrorResponse(ExceptionCode exceptionCode){
        this.status = exceptionCode.getHttpStatus();
        this.message = exceptionCode.getMessage();
    }
    public ErrorResponse(List<FieldErs> fieldErs, List<ConstraintViolationError> constraintViolationErrors) {
        this.fieldErs = fieldErs;
        this.constraintViolationErrors = constraintViolationErrors;
    }
    public ErrorResponse(HttpStatus httpStatus) {
        this.status = httpStatus.value();
        this.message = httpStatus.getReasonPhrase();
    }

    public static ErrorResponse of(BuissnessLogicException e){
        return new ErrorResponse(e.getExceptionCode());
    }
    public static ErrorResponse of(BindingResult bindingResult){
        return new ErrorResponse(FieldErs.of(bindingResult), null);
    }
    public static ErrorResponse of(HttpStatus httpStatus){
        return new ErrorResponse(httpStatus);
    }
    public static ErrorResponse of(Set<ConstraintViolation<?>> exceptions){
        return new ErrorResponse(null, ConstraintViolationError.of(exceptions));
    }

    public static ErrorResponse of(ExceptionCode exceptionCode){
        return new ErrorResponse(exceptionCode);
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
    public static class ConstraintViolationError{
        private String propertyPath;
        private String message;
        private Object invalidValue;

        public ConstraintViolationError(String propertyPath, String message, Object invalidValue) {
            this.propertyPath = propertyPath;
            this.message = message;
            this.invalidValue = invalidValue;
        }
        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> exceptions){
            return exceptions.stream()
                    .map( e -> new ConstraintViolationError(
                            e.getPropertyPath().toString(),
                            e.getMessage(),
                            e.getInvalidValue()
                    ))
                    .collect(Collectors.toList());
        }
    }
}
