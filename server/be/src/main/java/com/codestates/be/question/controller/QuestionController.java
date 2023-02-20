package com.codestates.be.question.controller;

import com.codestates.be.question.dto.QuestionDto;
import com.codestates.be.question.entity.Question;
import com.codestates.be.question.mapper.QuestionMapper;
import com.codestates.be.question.service.QuestionService;
import com.codestates.be.responseDto.MultiResponseEntity;
import com.codestates.be.responseDto.PageInfo;
import com.codestates.be.responseDto.SingleResponseEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
@Slf4j

// 현재 매퍼 완성 후 return 부분 수정 필요!!!!!!!!!!!!!!!!!!!!
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;
    public QuestionController(QuestionService questionService,
                              QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping    // 질문 등록
    public ResponseEntity postQuestion(@RequestBody QuestionDto.Post postDto) {

        Question createdQuestion =  questionService.createQuestion(mapper.questionPostDtoToQuestion(postDto));
        QuestionDto.Response response = mapper.questionToQuestionResponseDto(createdQuestion);

        return new ResponseEntity<>(new SingleResponseEntity<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}")    //질문 수정
    public ResponseEntity patchQuestion(@RequestBody QuestionDto.Patch patchDto,
                                        @PathVariable("question-id") Long questionId) {

        patchDto.setQuestionId(questionId);
        Question updatedQuestion = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(patchDto));
        QuestionDto.Response response = mapper.questionToQuestionResponseDto(updatedQuestion);

        return new ResponseEntity<>(new SingleResponseEntity<>(response), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")    //질문 조회
    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId) {

        Question foundQuestion = questionService.findQuestion(questionId);
        QuestionDto.Response response = mapper.questionToQuestionResponseDto(foundQuestion);

        //질문자 이메일, 이름 조회
//        response.setEmail(foundQuestion.getMember().getEmail());
//        response.setDisplayName(foundQuestion.getMember().getDisplayName());

        return new ResponseEntity<>(new SingleResponseEntity<>(response), HttpStatus.OK);
    }

    @GetMapping     //질문 전체 조회
    public ResponseEntity getQuestions (@RequestParam int page,
                                        @Positive @RequestParam int size) {

        Page<Question> pageQuestions = questionService.findQuestions(page, size);
        List<Question> questionList = pageQuestions.getContent();

        PageInfo pageInfo = new PageInfo(pageQuestions.getNumber(), pageQuestions.getSize(),
                pageQuestions.getTotalPages(), pageQuestions.getTotalElements());

        return new ResponseEntity<>(new MultiResponseEntity<>(mapper.questionsToQuestionsResponseDto(questionList),pageInfo),HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")    //질문 삭제
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId) {

        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
