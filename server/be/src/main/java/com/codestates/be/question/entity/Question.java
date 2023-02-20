package com.codestates.be.question.entity;

import com.codestates.be.answer.entity.Answer;
import com.codestates.be.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long questionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String createdAt;

    @Column(name = "LAST_MODIFIED_AT")
    private String modifiedAt;

    @Column(nullable = false)
    private long viewCounts;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();

    public void setMember(Member member){
        this.member = member;

        //근데, 등록된 member의 questionList가 "현재 지금 이" question을 담고 있지 않다면,
        //"현재 지금 이"(a.k.a this) question객체를 들어온 member의 questionList에 추가해준다.
        if(!member.getQuestions().contains(this)){
            member.getQuestions().add(this);
        }
    }
}
