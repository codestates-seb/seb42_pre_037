//package com.codestates.be.member.mapper;
//
//
//import com.codestates.be.member.dto.MemberDto;
//import com.codestates.be.member.entity.Member;
//import com.codestates.be.member.entity.MemberTag;
//import com.codestates.be.tag.entity.Tag;
//import com.codestates.be.tag.repository.TagRepository;
//import com.codestates.be.tag.service.TagService;
//import org.springframework.stereotype.Component;
//
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Date;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Component
//public class MemberMapper {
//    private final TagService tagService;
//
//    public MemberMapper(TagService tagService) {
//        this.tagService = tagService;
//    }
//
//    public Member MemberPostDtoToMember(MemberDto.Post postMember) throws ParseException{
//        Member member = new Member();
//        member.setEmail(postMember.getEmail());
//        member.setCreatedAt(getDateFrom(postMember.getCreatedAt()));
//        member.setPassword(postMember.getPassword());
//        member.setDisplayName(postMember.getDisplayName());
//
//        List<MemberTag> memberTags =
//
//        return member;
//    }
//
//    public Member MemberPatchDtoToMember(MemberDto.Patch patchMember){
//
//    }
//
//    public MemberDto.Response MemberToMemberResponseDto(Member member){
//
//    }
//
//    private Date getDateFrom(String createdAt) throws ParseException {
//        SimpleDateFormat format = new SimpleDateFormat("YYYY MM DD hh mm");
//
//        return format.parse(createdAt);
//    }
//}
