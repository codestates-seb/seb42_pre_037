package com.codestates.be.member.mapper;

import com.codestates.be.member.dto.MemberDto;
import com.codestates.be.member.entity.Member;
import com.codestates.be.util.StringToDate;
import org.mapstruct.Mapper;

import java.text.ParseException;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member MemberPostDtoToMember(MemberDto.Post postMember);
    Member MemberPatchDtoToMember(MemberDto.Patch patchMember);
    MemberDto.User MemberToUser(Member member);
}
