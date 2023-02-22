package com.codestates.be.answer.controller;


import com.codestates.be.answer.dto.AnswerDto;
import com.codestates.be.answer.entity.Answer;
import com.codestates.be.answer.mapper.AnswerMapper;
import com.codestates.be.answer.service.AnswerService;
import com.codestates.be.member.entity.Member;
import com.codestates.be.member.service.MemberService;
import com.codestates.be.responseDto.SingleResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/answers")
@Validated
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;
    private final MemberService memberService;

    // mapper DI

    public AnswerController(AnswerService answerService, AnswerMapper mapper, MemberService memberService) {
        this.answerService = answerService;
        this.mapper = mapper;
        this.memberService = memberService;
    }

    // 답변 등록
    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive long questionId,
                                     @Valid @RequestBody AnswerDto.Post answerDto){
        answerDto.setQuestionId(questionId);

        Answer answer = mapper.answerPostDtoToAnswer(answerDto);
        Answer response = answerService.createAnswer(answer);

        AnswerDto.Response result =  mapper.answerToAnswerResponseDto(response);
        Member member = memberService.findVerifiedMember(response.getMember().getMemberId());

        result.setDisplayName(member.getDisplayName());

        return new ResponseEntity<>(new SingleResponseEntity<>(result), HttpStatus.CREATED);
    }

    // 답변 수정
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody AnswerDto.Patch answerDto){
        answerDto.setAnswerId(answerId);

        Answer answer = mapper.answerPatchDtoToAnswer(answerDto);
        
        Answer response = answerService.updateAnswer(answer);

        AnswerDto.Response result = mapper.answerToAnswerResponseDto(response);

        return new ResponseEntity<>(new SingleResponseEntity<>(result), HttpStatus.OK);
    }

    // 답변 전체 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getAnswers(@PathVariable("question-id") @Positive long questionId){
        List<Answer> answers = answerService.findAnswers(questionId);

        List<AnswerDto.Response> response = mapper.answersToAnswerResponseDtos(answers);

        return new ResponseEntity<>(new SingleResponseEntity<>(response), HttpStatus.OK);
    }


    // 답변 삭제
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId){

        answerService.deleteAnswer(answerId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
