package com.codestates.be.answer.service;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {

    public Answer createAnswer(){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }
}
