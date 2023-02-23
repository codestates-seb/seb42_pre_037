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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
@Slf4j
@Validated
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;
    public QuestionController(QuestionService questionService,
                              QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping    // 질문 등록 <U>
    public ResponseEntity postQuestion(@RequestBody @Valid QuestionDto.Post postDto) {

        Question createdQuestion =  questionService.createQuestion(mapper.questionPostDtoToQuestion(postDto));
        QuestionDto.Response response = mapper.questionToQuestionResponseDto(createdQuestion);
        //question member 아이디만 설정된 상태. -> JPA 트랜잭션 -> 불러오기 member. -> 저장 ->  (entitymanager 닫힘(flush) -> 불러올 때)


        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{question-id}")    //질문 수정 <UU>
    public ResponseEntity patchQuestion(@RequestBody QuestionDto.Patch patchDto,
                                        @PathVariable("question-id") Long questionId) {

        patchDto.setQuestionId(questionId);
        Question updatedQuestion = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(patchDto));
        QuestionDto.Response response = mapper.questionToQuestionResponseDto(updatedQuestion);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{question-id}")    //질문 조회 <F>
    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId) {

        Question foundQuestion = questionService.findQuestion(questionId);
        QuestionDto.Response response = mapper.questionToQuestionResponseDto(foundQuestion);

        //질문자 이메일, 이름 조회 -> mapper로 옮김
        //  response.setEmail(foundQuestion.getMember().getEmail());
        //        response.setDisplayName(foundQuestion.getMember().getDisplayName());

        return new ResponseEntity<>(new SingleResponseEntity<>(response), HttpStatus.OK);
    }

    @GetMapping     //질문 전체 조회 <F>
    public ResponseEntity getQuestions (@RequestParam int page,
                                        @RequestParam @Positive int size) {

        Page<Question> pageQuestions = questionService.findQuestions(page, size);
        List<Question> questionList = pageQuestions.getContent();

        PageInfo pageInfo = new PageInfo(pageQuestions.getNumber(), pageQuestions.getSize(),
                pageQuestions.getTotalPages(), pageQuestions.getTotalElements());

        return new ResponseEntity<>(new MultiResponseEntity<>(mapper.questionsToQuestionsResponseDto(questionList),pageInfo),HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")    //질문 삭제 <UU,A>
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId) {

        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
