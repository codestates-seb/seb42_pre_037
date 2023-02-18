package com.codestates.be.question.controller;

import com.codestates.be.question.dto.QuestionPatchDto;
import com.codestates.be.question.dto.QuestionPostDto;
import com.codestates.be.question.dto.QuestionResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@Validated
@Slf4j
public class QuestionController {

    @PostMapping    // 질문 등록
    public ResponseEntity postQuestion(@RequestBody QuestionPostDto questionPostDto) {

//        Question question = mapper.questionPostDtoToQuestion(questionPostDto);
//        Question createdQuestion =  questionService.createQuestion(question);
//        QuestionResponseDto response = mapper.questionToQuestionResponseDto(createdQuestion);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}")    //질문 수정
    public ResponseEntity patchQuestion(@RequestBody QuestionPatchDto questionPatchDto,
                                        @PathVariable("question-id") Long questionId) {

        questionPatchDto.setQuestionId(questionId);
//        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);
//        Question updatedQuestion = questionService.updateQuestion(question);
//        QuestionResponseDto response = mapper.questionToQuestionResponseDto(updatedQuestion);


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{question-id}")    //질문 검색
    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId) {

//        Question foundQuestion = questionService.findQuestion(questionId);
//        QuestionResponseDto response = mapper.questionToQuestionResponseDto(foundQuestion);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping     //질문 목록
    public ResponseEntity getList() {

//        questionService.findList();
//        페이지네이션 필요?

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")    //질문 삭제
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId) {

//        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
