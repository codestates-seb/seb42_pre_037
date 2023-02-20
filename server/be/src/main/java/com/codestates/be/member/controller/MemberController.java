package com.codestates.be.member.controller;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.member.dto.MemberDto;
import com.codestates.be.member.entity.Member;
import com.codestates.be.member.mapper.MemberMapper;
import com.codestates.be.member.service.MemberService;
import com.codestates.be.responseDto.MultiResponseEntity;
import com.codestates.be.responseDto.PageInfo;
import com.codestates.be.responseDto.SingleResponseEntity;
import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {
    private final MemberMapper mapper;
    private final MemberService memberService;

    public MemberController(MemberMapper mapper, MemberService memberService) {
        this.mapper = mapper;
        this.memberService = memberService;
    }

    @PostMapping("/signup") //all
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post postMember) throws ParseException {
        Member member = mapper.MemberPostDtoToMember(postMember);

        Member result = memberService.createdMember(member);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{member-id}") //user(본인)
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @RequestBody @Valid MemberDto.Patch patchMember) throws Exception {
        Member member = mapper.MemberPatchDtoToMember(patchMember);
        member.setMemberId(memberId);

        Member result = memberService.updateMember(member);

        return ResponseEntity.accepted().build();
    }
    @GetMapping("/{member-id}")//TODO: 자신만의 정보를 열람할 수 있도록 수정
    public ResponseEntity getUser(@PathVariable("member-id") @Positive int memberId){
        Member member = memberService.findVerifiedMember(memberId);

        MemberDto.User user = mapper.MemberToUser(member);

        return new ResponseEntity(new SingleResponseEntity<>(user), HttpStatus.OK);
    }

    @GetMapping//admin
    public ResponseEntity getUsers(@RequestParam @Positive int page,
                                    @RequestParam @Positive int size){
        Page<Member> memberPage = memberService.getMembers(page-1, size);

        List<Member> members = memberPage.getContent();

        List<MemberDto.User> users = mapper.MembersToUsers(members);

        PageInfo pageInfo = new PageInfo(memberPage.getNumber(), memberPage.getNumber(),
                memberPage.getTotalPages(), memberPage.getTotalPages());

        return new ResponseEntity(new MultiResponseEntity<>(users, pageInfo), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}") //admin, user(본인)
    public ResponseEntity deleteMember(@PathVariable @Positive long memberId){
        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }
}
