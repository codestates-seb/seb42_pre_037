package com.codestates.be.advice;

import com.codestates.be.response.SingleResponseEntity;
import org.apache.coyote.Response;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    public ResponseEntity handleBuissnessLogicException(BuissnessLogicException e){
        ErrorResponse response = ErrorResponse.of(e);

        return new ResponseEntity(response, HttpStatus.ACCEPTED);
    }

    @ExceptionHandler
    public ResponseEntity handleConstraintViolationException(ConstraintViolationException e){
        return null; //validation 의존성 필요
    }

    @ExceptionHandler
    public ResponseEntity handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
//        ErrorResponse response = ErrorResponse.of(e.getBindingResult());
//        HttpStatus status = HttpStatus.valueOf(response.getStatus());
//        return new ResponseEntity(response, status);
        return null;
    }



}
