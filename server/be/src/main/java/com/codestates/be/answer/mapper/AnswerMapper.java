package com.codestates.be.answer.mapper;

import com.codestates.be.answer.dto.AnswerPatchDto;
import com.codestates.be.answer.dto.AnswerPostDto;
import com.codestates.be.answer.dto.AnswerResponseDto;
import com.codestates.be.answer.entity.Answer;
import org.springframework.stereotype.Component;

@Component
public class AnswerMapper {

    // DTO -> Entity
    public Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto){
        return null;
    }

    // DTO -> Entity
    public Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto){
        return null;
    }
    // Entity -> DTO
    public AnswerResponseDto answerToAnswerResponseDto(Answer answer) {
        return null;
    }
}
