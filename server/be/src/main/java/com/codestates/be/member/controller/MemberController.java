package com.codestates.be.member.controller;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.member.dto.MemberDto;
import com.codestates.be.member.entity.Member;
import com.codestates.be.member.mapper.MemberMapper;
import com.codestates.be.member.service.MemberService;
import com.codestates.be.responseDto.SingleResponseEntity;
import com.sun.xml.bind.v2.runtime.unmarshaller.XsiNilLoader;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.text.ParseException;

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

    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post postMember) throws ParseException {
        Member member = mapper.MemberPostDtoToMember(postMember);
        memberService.createdMember(member);

        Member result = memberService.findVerifiedMember(1);

        return new ResponseEntity(mapper.memberToMyPage(result), HttpStatus.OK);

        //TODO: 에러 원인 찾았습니다.
        //TODO: Member의 Question -> Question의 Answer -> Answer의 Member-> ... 재귀적인 구조 때문에 STACK OVER FLOW 에러 발생.
        //TODO: 따라서 RESPONSE DTO 작업은 필수.
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @RequestBody @Valid MemberDto.Patch patchMember) throws Exception {

        Member member = mapper.MemberPatchDtoToMember(patchMember);
        member.setMemberId(memberId);

        Member result = memberService.updateMember(member);
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
//       return new ResponseEntity(new SingleResponseEntity<>(), HttpStatus.ACCEPTED);
    }


    @GetMapping("/{member-id}/mypages")
    public ResponseEntity getMyPages(@PathVariable("member-id") @Positive long memberId){
        Member member = memberService.findVerifiedMember(memberId);



        return new ResponseEntity(mapper.memberToMyPage(member), HttpStatus.ACCEPTED);
    }

    @GetMapping
    public ResponseEntity getUsers(@RequestParam @Positive int page,
                                    @RequestParam @Positive int size){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable @Positive long memberId){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }
}
