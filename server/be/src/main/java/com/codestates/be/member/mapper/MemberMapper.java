package com.codestates.be.member.mapper;

import com.codestates.be.member.dto.MemberDto;
import com.codestates.be.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member MemberPostDtoToMember(MemberDto.Post postMember);
    Member MemberPatchDtoToMember(MemberDto.Patch patchMember);
    MemberDto.User MemberToUser(Member member);
    List<MemberDto.User> MembersToUsers (List<Member> members);
}
