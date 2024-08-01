package com.miniprj1back.controller;

import com.miniprj1back.domain.Member;
import com.miniprj1back.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public Member getMember(@PathVariable Integer id) {
        Member member = service.getMember(id);

        return member;
    }

    @PutMapping("edit/password")
    @PreAuthorize("isAuthenticated()")
    public void editPassword(@RequestBody Member member, Authentication authentication) {
        service.editPassword(member.getPassword(), authentication);
    }

    @PutMapping("edit/nickName")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Object> editNickName(@RequestBody Member member, Authentication authentication) {
        Map<String, Object> result = service.editNickName(member.getNickName(), authentication);
        return result;
    }

    @GetMapping("check")
    public ResponseEntity check(@RequestParam String nickName) {
        Member member = service.checkNickName(nickName);

        if(member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

}
