package com.miniprj1back.controller;

import com.miniprj1back.domain.Comment;
import com.miniprj1back.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService service;

    @PostMapping("write")
    @PreAuthorize("isAuthenticated()")
    public void writeComment(@RequestBody Comment comment, Authentication authentication) {
        System.out.println("comment = " + comment);
//        if(service.validate(comment)) {
//            System.out.println("comment = " + comment);
//        }
    }
}
