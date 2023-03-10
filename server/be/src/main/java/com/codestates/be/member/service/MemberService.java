package com.codestates.be.member.service;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.member.entity.Member;
import com.codestates.be.member.repository.MemberRepository;
import com.codestates.be.security.util.CustomAuthorityUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtil authorityUtils;

    public MemberService(PasswordEncoder passwordEncoder, MemberRepository memberRepository, CustomAuthorityUtil authorityUtils) {
        this.passwordEncoder = passwordEncoder;
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    public Member createdMember(Member member){
        verifyMemberExists(member.getEmail());
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        //TODO : 시큐리티 적용 시 권한 부여하는 과정도 추가되어야함.
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member){
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getDisplayName())
                .ifPresent(name -> findMember.setDisplayName(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getModifiedAt())
                .ifPresent(modified -> findMember.setModifiedAt(modified));

        return findMember;
    }

    public Page<Member> getMembers(int page, int size){
        return memberRepository.findAll(PageRequest.of(
            page,size, Sort.by("memberId").descending()
        ));
    }

    public void deleteMember(long memberId){
        findVerifiedMember(memberId);
        memberRepository.deleteById(memberId);
    }

    public void verifyMemberExists(String email){
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if(findMember.isPresent()){
           throw new BuissnessLogicException(ExceptionCode.MEMBER_ALREADY_EXISTS);
        }
    }
    public Member findVerifiedMember(long memberId){
        Optional<Member> findMember= memberRepository.findById(memberId);
        return findMember.orElseThrow(()-> new BuissnessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
