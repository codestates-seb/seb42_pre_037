package com.codestates.be.question.service;

import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.question.entity.Question;
import com.codestates.be.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question) {
        Question response = questionRepository.save(question);
        return response;
    }

    public Question updateQuestion(Question question) {
        // 질문 존재하는지 확인
        Question existQuestion = findVerifiedExistQuestion(question.getQuestionId());
        // 제목수정
        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> existQuestion.setTitle(title));
        // 내용수정
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> existQuestion.setContent(content));
        // 수정 시간 등록
        Optional.ofNullable(question.getModifiedAt())
                .ifPresent(modifiedAt -> existQuestion.setModifiedAt(modifiedAt));

        Question response = questionRepository.save(existQuestion);

        return response;
    }

    public Question findQuestion(long questionId) {
        Question response = findVerifiedExistQuestion(questionId);
        return response;
    }

    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").ascending()));
    }

    public void deleteQuestion(long questionId) {
        Question existQuestion = findVerifiedExistQuestion(questionId);
        questionRepository.delete(existQuestion);
    }

    public Question findVerifiedExistQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question existQuestion = optionalQuestion.orElseThrow(
                () -> new BuissnessLogicException(ExceptionCode.QUESTION_NOT_FOUND)
        );
        return existQuestion;
    }
}
