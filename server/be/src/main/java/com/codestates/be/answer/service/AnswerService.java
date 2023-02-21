package com.codestates.be.answer.service;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.answer.entity.Answer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    // 답변 등록
    public Answer createAnswer(Answer answer) {

        //Answer createdAnswer = answer;
        //return createdAnswer;

        return null;
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    // 답변 수정
    public Answer updateAnswer(Answer answer) {

        //Answer updatedAnswer = answer;
        //return updatedAnswer;

        return null;
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    // 답변 전체 조회
    public List<Answer> findAnswers() {

        return null;
//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    // 답변 삭제
    public void deleteAnswer(long answerId) {

//        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }
}
