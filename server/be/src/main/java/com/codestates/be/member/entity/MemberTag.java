package com.codestates.be.member.entity;


import com.codestates.be.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class MemberTag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long memberTagId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;
}
