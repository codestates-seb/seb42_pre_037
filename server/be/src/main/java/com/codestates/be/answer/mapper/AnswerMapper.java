package com.codestates.be.answer.mapper;

import com.codestates.be.answer.dto.AnswerPatchDto;
import com.codestates.be.answer.dto.AnswerPostDto;
import com.codestates.be.answer.dto.AnswerResponseDto;
import com.codestates.be.answer.entity.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
    // DTO -> Entity
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
    // Entity -> DTO
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);

    List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers);
}
