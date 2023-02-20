package com.codestates.be.member.entity;

import com.codestates.be.answer.entity.Answer;
import com.codestates.be.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false)
    private String displayName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String createdAt;

    @Column(name = "LAST_MODIFIED_AT")
    private String modifiedAt;

    @Column
    private String userIntro;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();
}
