package com.codestates.be.member.mapper;

import com.codestates.be.member.dto.MemberDto;
import com.codestates.be.member.entity.Member;
import com.codestates.be.member.entity.MemberTag;
import com.codestates.be.tag.entity.Tag;
import com.codestates.be.util.StringToDate;
import org.mapstruct.Mapper;

import java.text.ParseException;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    default Member MemberPostDtoToMember(MemberDto.Post postMember) throws ParseException {
        Member member = Member.builder()
                .displayName(postMember.getDisplayName())
                .email(postMember.getEmail())
                .password(postMember.getPassword())
                .createdAt(StringToDate.getDateFrom(postMember.getCreatedAt()))
                .build();

        List<MemberTag> memberTags= postMember.getTags()
                .stream().map(tagPost -> {
                    MemberTag memberTag = new MemberTag();

                    Tag tag = new Tag();
                    tag.setTagId(tagPost.getTagId());

                    memberTag.setTag(tag);
                    memberTag.setMember(member);

                    return memberTag;
                }).collect(Collectors.toList());

        member.setMemberTags(memberTags);

        return member;
    }

    default Member MemberPatchDtoToMember(MemberDto.Patch patchMember) throws ParseException {
        Member member = Member.builder()
                .displayName(patchMember.getDisplayName())
                .password(patchMember.getPassword())
                .modifiedAt(StringToDate.getDateFrom(patchMember.getModifiedAt()))
                .build();

        List<MemberTag> memberTags = patchMember.getTags()
                .stream().map(tagPost -> {
                    MemberTag memberTag = new MemberTag();

                    Tag tag = new Tag();
                    tag.setTagId(tagPost.getTagId());

                    memberTag.setTag(tag);
                    memberTag.setMember(member);

                    return memberTag;
                }).collect(Collectors.toList());

        member.setMemberTags(memberTags);

        return member;
    }

    MemberDto.User MemberToUser(Member member);
}
