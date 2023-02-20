package com.codestates.be.answer.controller;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.answer.dto.AnswerPatchDto;
import com.codestates.be.answer.dto.AnswerPostDto;
import com.codestates.be.answer.dto.AnswerResponseDto;
import com.codestates.be.answer.entity.Answer;
import com.codestates.be.answer.mapper.AnswerMapper;
import com.codestates.be.answer.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/answer")
@Validated
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    // mapper DI
    public AnswerController(AnswerService answerService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }

    // 답변 등록
    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive long questionId,
                                     @Valid @RequestBody AnswerPostDto answerDto){
        answerDto.setQuestionId(questionId);

        Answer answer = mapper.answerPostDtoToAnswer(answerDto);
        Answer response = answerService.createAnswer(answer);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(response), HttpStatus.CREATED);
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    // 답변 수정
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerDto){
        answerDto.setAnswerId(answerId);

        Answer answer = mapper.answerPatchDtoToAnswer(answerDto);
        Answer response = answerService.updateAnswer(answer);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(response), HttpStatus.OK);
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    // 답변 전체 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getAnswers(@PathVariable("question-id") @Positive long questionId){
        List<Answer> answers = answerService.findAnswers();

        List<AnswerResponseDto> response =
                answers.stream()
                        .map(answer -> mapper.answerToAnswerResponseDto(answer))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    // 답변 삭제
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId){

        answerService.deleteAnswer(answerId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }
}
