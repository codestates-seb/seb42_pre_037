package com.codestates.be.advice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.yaml.snakeyaml.parser.ParserException;

import javax.validation.ConstraintViolationException;
import java.text.ParseException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {

    @ExceptionHandler
    public ResponseEntity handleBuissnessLogicException(BuissnessLogicException e){
        log.error("Occured BusinessLogicException");

        ErrorResponse response = ErrorResponse.of(e);

        return new ResponseEntity(response, HttpStatus.valueOf(response.getStatus()));
    }

    @ExceptionHandler
    public ResponseEntity handleConstraintViolationException(ConstraintViolationException e){
        log.error("Occured ConstraintViolationException");
         ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());
        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity handleParserException(ParseException e){
        ErrorResponse response = ErrorResponse.of(ExceptionCode.WRONG_FORMAT_OF_DATE);

        return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler
    public ResponseEntity handleAnyException(Exception e) throws Exception{
        log.error("Occured AnyUnhandledException");
        throw e;
    }
}
