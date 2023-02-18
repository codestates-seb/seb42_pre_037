package com.codestates.be.answer.entity;


import com.codestates.be.member.entity.Member;

import javax.persistence.*;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long answerId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
