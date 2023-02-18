package com.codestates.be.member.mapper;


import com.codestates.be.member.dto.MemberDto;
import com.codestates.be.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper{
    Member MemberPostToMember(MemberDto.Post post);
    Member MemberPatchToMember(MemberDto.Patch patch);
    MemberDto.Response MemberToMemberResponseDto(Member member);
}
