package com.codestates.be.question.mapper;

import com.codestates.be.question.dto.QuestionDto;
import com.codestates.be.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface QuestionMapper {

    QuestionMapper INSTANCE = Mappers.getMapper(QuestionMapper.class);

    // postDto -> entity
    Question questionPostDtoToQuestion(QuestionDto.Post questionPost);

    // patchDto -> entity
    Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatch);

    // entity -> responseDto
    QuestionDto.Response questionToQuestionResponseDto(Question question);
}

