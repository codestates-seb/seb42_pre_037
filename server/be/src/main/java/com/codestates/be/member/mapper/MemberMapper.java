package com.codestates.be.member.mapper;

import com.codestates.be.member.dto.MemberDto;
import com.codestates.be.member.entity.Member;
import com.codestates.be.util.StringToDate;
import org.mapstruct.Mapper;

import java.text.ParseException;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member MemberPostDtoToMember(MemberDto.Post postMember) throws ParseException {
        Member member = new Member();
        member.setDisplayName(postMember.getDisplayName());
        member.setEmail(postMember.getEmail());
        member.setPassword(postMember.getPassword());
        member.setCreatedAt(postMember.getCreatedAt());
        return member;
    }

    default Member MemberPatchDtoToMember(MemberDto.Patch patchMember) throws Exception {
        Member member = Member.builder()
                .displayName(patchMember.getDisplayName())
                .password(patchMember.getPassword())
                .modifiedAt(patchMember.getModifiedAt())
                .build();

        return member;
    }

    MemberDto.User MemberToUser(Member member);

}
