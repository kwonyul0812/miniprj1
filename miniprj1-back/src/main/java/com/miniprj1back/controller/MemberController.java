package com.miniprj1back.controller;

import com.miniprj1back.domain.Member;
import com.miniprj1back.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService service;

    @PostMapping("signup")
    public void signup(@RequestBody Member member) {
        service.createAccount(member);
    }

    @PostMapping("token")
    public Map<String, Object> token(@RequestBody Member member) {
        Map<String, Object> result = service.getToken(member);

        return result;
    }

}
