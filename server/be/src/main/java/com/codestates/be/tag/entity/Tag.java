package com.codestates.be.tag.entity;

import com.codestates.be.member.entity.MemberTag;
import com.codestates.be.question.entity.QuestionTag;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long tagId;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    List<MemberTag> memberTags = new ArrayList<>();

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    List<QuestionTag> questionTags = new ArrayList<>();
}
