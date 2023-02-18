package com.codestates.be.tag.entity;

import com.codestates.be.member.entity.MemberTag;
import com.codestates.be.question.entity.QuestionTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tagId;

    @Column(nullable = false, unique = true)
    private String tagName;

    @Column(nullable = false)
    private String tagInfo;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    List<MemberTag> memberTags = new ArrayList<>();

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    List<QuestionTag> questionTags = new ArrayList<>();
}
