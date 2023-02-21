package com.codestates.be.answer.mapper;

import com.codestates.be.answer.dto.AnswerPatchDto;
import com.codestates.be.answer.dto.AnswerPostDto;
import com.codestates.be.answer.dto.AnswerResponseDto;
import com.codestates.be.answer.entity.Answer;
import com.codestates.be.member.entity.Member;
import com.codestates.be.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    default Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto){
        Answer answer = new Answer();

        Member member = new Member();
        member.setMemberId(answerPostDto.getMemberId());

        Question question = new Question();
        question.setQuestionId(answerPostDto.getQuestionId());

        answer.setContent(answerPostDto.getContent());

        answer.setMember(member);
        answer.setQuestion(question);

        return answer;
    };
    // DTO -> Entity
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
    // Entity -> DTO
    default AnswerResponseDto answerToAnswerResponseDto(Answer answer){
        AnswerResponseDto answerResponseDto = new AnswerResponseDto(
                answer.getContent(),
                answer.getMember().getDisplayName(),//displayName;
                answer.getAnswerId(),
                answer.getQuestion().getQuestionId()//questionId;
        );

        return answerResponseDto;
    };

    List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers);
}
