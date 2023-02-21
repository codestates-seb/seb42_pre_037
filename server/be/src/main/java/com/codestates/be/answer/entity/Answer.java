package com.codestates.be.answer.entity;


import com.codestates.be.member.entity.Member;
import com.codestates.be.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.jmx.export.annotation.ManagedNotification;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@Setter
@Getter
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long answerId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String createdAt;

    @Column(name = "LAST_MODIFIED_AT")
    private String modifiedAt;
    
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;





    public void setMember(Member member){
        this.member = member;
        //Member를 Answer에 추가했음.

        //들어온 member의 answerlist에 이 answer 객체가 포함되어있지 않다면!
        if(!member.getAnswers().contains(this)){
            //이 로직을 수행
            member.getAnswers().add(this);
        }
    }

    public void setQuestion(Question question){
        this.question = question;
        if(!question.getAnswers().contains(this)){
            question.getAnswers().add(this);
        }
    }

}
