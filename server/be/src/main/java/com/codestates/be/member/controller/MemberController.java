package com.codestates.be.member.controller;


import com.codestates.be.member.dto.MemberDto;
import com.codestates.be.member.entity.Member;
import com.codestates.be.member.mapper.MemberMapper;
import com.codestates.be.member.service.MemberService;
import com.codestates.be.responseDto.MultiResponseEntity;
import com.codestates.be.responseDto.PageInfo;
import com.codestates.be.responseDto.SingleResponseEntity;
import com.codestates.be.security.dto.ClaimsToUser;
import com.codestates.be.security.jwt.JwtTokenizer;
import com.codestates.be.security.util.JwtToUserInfoUtils;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
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
    private final JwtTokenizer tokenizer;
    private final JwtToUserInfoUtils jwtToResponseUtils;

    public MemberController(MemberMapper mapper, MemberService memberService, JwtTokenizer tokenizer, JwtToUserInfoUtils jwtToResponseUtils) {
        this.mapper = mapper;
        this.memberService = memberService;
        this.tokenizer = tokenizer;
        this.jwtToResponseUtils = jwtToResponseUtils;
    }

    @PostMapping("/signup") //f
    public ResponseEntity postMember(@RequestBody @Valid MemberDto.Post postMember) throws ParseException {
        Member member = mapper.MemberPostDtoToMember(postMember);

        Member result = memberService.createdMember(member);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{member-id}") //uu
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @RequestBody @Valid MemberDto.Patch patchMember,
                                      @RequestHeader HttpHeaders headers) throws Exception {
        String token;
        try{
            token = headers.get("authorization").get(0);
        }catch (NullPointerException exception){
            throw new MalformedJwtException("");
        }
        jwtToResponseUtils.parseClaimsToUserInfo(token, memberId);



        Member member = mapper.MemberPatchDtoToMember(patchMember);
        member.setMemberId(memberId);
        Member result = memberService.updateMember(member);

        return ResponseEntity.accepted().build();
    }

    @PostMapping("/userInfo")// 토큰 없을 경우 에러 핸들링 추가
    public ResponseEntity messageForHeader(@RequestHeader HttpHeaders headers) {

        String token;

        try{
            token = headers.get("authorization").get(0);
        }catch (NullPointerException exception){
            throw new MalformedJwtException("");
        }

        ClaimsToUser userInfo = jwtToResponseUtils.parseClaimsToUserInfo(token);

        return new ResponseEntity<>(new SingleResponseEntity<>(userInfo), HttpStatus.OK);
    }

    @GetMapping("/logout")//u
    public ResponseEntity getLogout(){
        log.info("# 사용자가 로그아웃 했습니다.");

        return ResponseEntity.noContent().build();
    }

    @GetMapping//f
    public ResponseEntity getUsers(@RequestParam @Positive int page,
                                    @RequestParam @Positive int size){
        Page<Member> memberPage = memberService.getMembers(page-1, size);

        List<Member> members = memberPage.getContent();

        List<MemberDto.User> users = mapper.MembersToUsers(members);

        PageInfo pageInfo = new PageInfo(memberPage.getNumber(), memberPage.getNumber(),
                memberPage.getTotalPages(), memberPage.getTotalPages());

        return new ResponseEntity(new MultiResponseEntity<>(users, pageInfo), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}") //a, uu
    public ResponseEntity deleteMember(@PathVariable @Positive long memberId,
                                       @RequestHeader HttpHeaders headers){

        String token;
        try{
            token = headers.get("authorization").get(0);
        }catch (NullPointerException exception){
            throw new MalformedJwtException("");
        }
        jwtToResponseUtils.parseClaimsToUserInfo(token, memberId);

        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }
}
