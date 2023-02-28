package com.codestates.be.question.repository;

import com.codestates.be.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
//    Optional<Question> findQuestionsByTitleContaining(String word);
}
