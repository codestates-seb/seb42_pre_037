package com.codestates.be.member.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class MyPage {
    private String displayName;
    private Date createdAt;
    private String userIntro;
}
