package com.codestates.be.answer.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;


@Getter
@Setter
public class AnswerPatchDto {
    private long answerId;

    @NotEmpty(message = "본문은 공백이 아니어야 합니다.")
    private String content;

    @NotNull
    private String modifiedAt;
}
