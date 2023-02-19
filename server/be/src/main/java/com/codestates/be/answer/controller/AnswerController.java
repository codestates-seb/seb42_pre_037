package com.codestates.be.answer.controller;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.answer.dto.AnswerPatchDto;
import com.codestates.be.answer.dto.AnswerPostDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/answer")
@Validated
public class AnswerController {
    // 답변 등록
    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive long questionId,
                                     @Valid @RequestBody AnswerPostDto answerPostDto){
        answerPostDto.setQuestionId(questionId);

        return new ResponseEntity<>(answerPostDto, HttpStatus.CREATED);
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    // 답변 수정
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto){
        answerPatchDto.setAnswerId(answerId);

        return new ResponseEntity<>(answerPatchDto, HttpStatus.OK);
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    // 답변 전체 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getAnswers(@PathVariable("question-id") @Positive long questionId){

        return new ResponseEntity<>(HttpStatus.OK);
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    // 답변 삭제
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId){

        return new ResponseEntity(HttpStatus.NO_CONTENT);
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }
}
