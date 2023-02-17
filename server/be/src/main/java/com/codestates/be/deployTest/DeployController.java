package com.codestates.be.deployTest;


import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping
public class DeployController {
    @GetMapping
    public ResponseEntity getAccess(){
        return new ResponseEntity("서버 연결 확인 완료!", HttpStatus.OK);
    }
}
