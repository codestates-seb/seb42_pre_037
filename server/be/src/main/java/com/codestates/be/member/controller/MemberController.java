package com.codestates.be.member.controller;


import com.codestates.be.advice.BuissnessLogicException;
import com.codestates.be.advice.ExceptionCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
@Validated
public class MemberController {
    @PostMapping("/signup")
    public ResponseEntity postMember(){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    @PatchMapping("/${member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }


    @GetMapping("/${member-id}/mypages")
    public ResponseEntity getMyPages(@PathVariable("member-id") @Positive long memberId){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    @GetMapping
    public ResponseEntity getUsers(@RequestParam @Positive int page,
                                    @RequestParam @Positive int size){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }

    @DeleteMapping("/${member-id}")
    public ResponseEntity deleteMember(@PathVariable @Positive long memberId){
        throw new BuissnessLogicException(ExceptionCode.SERVICE_NOT_READY);
    }
}
