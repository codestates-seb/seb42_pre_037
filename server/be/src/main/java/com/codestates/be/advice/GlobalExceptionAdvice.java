package com.codestates.be.advice;

import com.codestates.be.response.SingleResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    public ResponseEntity handleBuissnessLogicException(BuissnessLogicException e){
        ErrorResponse response = ErrorResponse.of(e);

        return new ResponseEntity(response, HttpStatus.ACCEPTED);
    }

}
