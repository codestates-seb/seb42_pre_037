package com.codestates.be.security.userdetails;

import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import com.codestates.be.member.entity.Member;
import com.codestates.be.member.repository.MemberRepository;
import com.codestates.be.security.util.CustomAuthorityUtil;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;
@Component
public class MemberDetailServices implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtil authorityUtil;

    public MemberDetailServices(MemberRepository memberRepository, CustomAuthorityUtil authorityUtil) {
        this.memberRepository = memberRepository;
        this.authorityUtil = authorityUtil;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> findMember = memberRepository.findByEmail(username);
        findMember.orElseThrow(() -> new BuissnessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetail(findMember.get());
    }

    public class MemberDetail extends Member implements UserDetails {
        public MemberDetail(Member member) {
            this.setMemberId(member.getMemberId());
            this.setEmail(member.getEmail());
            this.setPassword(member.getPassword());
            this.setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtil.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return this.getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
