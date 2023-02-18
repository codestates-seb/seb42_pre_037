package com.codestates.be.answer.controller;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/answer")
@Validated
public class AnswerController {
    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive long questionId){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getAnswers(@PathVariable("question-id") @Positive long questionId){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }
}
