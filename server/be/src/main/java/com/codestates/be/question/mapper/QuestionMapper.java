package com.codestates.be.question.mapper;

import com.codestates.be.member.entity.Member;
import com.codestates.be.question.dto.QuestionDto;
import com.codestates.be.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper(componentModel = "spring")
public interface QuestionMapper {

    QuestionMapper INSTANCE = Mappers.getMapper(QuestionMapper.class);

    // postDto -> entity
    default Question questionPostDtoToQuestion(QuestionDto.Post questionPost){
        Question question = new Question();

        Member member = new Member();
        member.setMemberId(questionPost.getMemberId());

        question.setTitle(questionPost.getTitle());
        question.setContent(questionPost.getContent());
        question.setCreatedAt(questionPost.getCreatedAt());

        question.setMember(member);

        return question;
    };

    // patchDto -> entity
    Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatch);

    // entity -> responseDto
    default QuestionDto.Response questionToQuestionResponseDto(Question question){
        QuestionDto.Response responseQuestion = new QuestionDto.Response();

        responseQuestion.setQuestionId(question.getQuestionId());
        responseQuestion.setEmail(question.getMember().getEmail());
        responseQuestion.setContent(question.getContent());
        responseQuestion.setTitle(question.getTitle());
        responseQuestion.setCountAnswer(question.getAnswers().size());
        responseQuestion.setCreatedAt(question.getCreatedAt());
        responseQuestion.setModifiedAt(question.getModifiedAt());
        responseQuestion.setDisplayName(question.getMember().getDisplayName());

        return responseQuestion;
    };

    List<QuestionDto.Response> questionsToQuestionsResponseDto(List<Question> response);
}

