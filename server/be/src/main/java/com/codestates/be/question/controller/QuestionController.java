package com.codestates.be.question.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@Validated
public class QuestionController {

    public ResponseEntity postQuestion () {
        return null;
    }
    public ResponseEntity patchQuestion () {
        return null;
    }
    public ResponseEntity getQuestion () {
        return null;
    }
    public ResponseEntity getList() {
        return null;
    }
    public void deleteQuestion () {}
    public void deleteList() {}
}
