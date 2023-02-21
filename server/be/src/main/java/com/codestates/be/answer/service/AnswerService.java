package com.codestates.be.answer.service;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.answer.entity.Answer;
import com.codestates.be.answer.repository.AnswerRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }
    // 답변 등록
    public Answer createAnswer(Answer answer) {

        //Answer createdAnswer = answer;
        //return createdAnswer;

        Answer response = answerRepository.save(answer);
        return response;
    }

    // 답변 수정
    public Answer updateAnswer(Answer answer) {

        //Answer updatedAnswer = answer;
        //return updatedAnswer;

        // 답변 있는지 확인
        Answer existAnswer = findVerifiedExistAnswer(answer.getAnswerId());

        Answer response = answerRepository.save(existAnswer);
        return response;
    }

    // 답변 전체 조회
    public List<Answer> findAnswers(long questionId) {
        //모든 답변을 조회한다.
        List<Answer> answerList  = answerRepository.findAll();

        //스트림 객체의 filter() 메서드를 사용하여 요소를 걸러냄.
        List<Answer> response = answerList.stream()
                .filter(answer -> answer.getQuestion().getQuestionId() == questionId)
                .collect(Collectors.toList());

        return response;
    }

    // 답변 삭제
    public void deleteAnswer(long answerId) {

        Answer existAnswer = findVerifiedExistAnswer(answerId);
        answerRepository.delete(existAnswer);
    }

    // 예외 처리
    private Answer findVerifiedExistAnswer(long questionId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(questionId);
        Answer existAnswer = optionalAnswer.orElseThrow(
                () -> new BuissnessLogicException(ExceptionCode.ANSWER_NOT_FOUND)
        );
        return existAnswer;
    }
}
