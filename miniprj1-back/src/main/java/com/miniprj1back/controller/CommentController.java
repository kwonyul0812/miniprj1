package com.miniprj1back.controller;

import com.miniprj1back.domain.Comment;
import com.miniprj1back.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService service;

    @PostMapping("write")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity writeComment(@RequestBody Comment comment, Authentication authentication) {
        if (service.validate(comment)) {
            service.write(comment, authentication);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("{boardId}")
    public List<Comment> getComment(@PathVariable Integer boardId) {
        return service.get(boardId);
    }

    @DeleteMapping("delete")
    public ResponseEntity deleteComment(@RequestBody Comment comment, Authentication authentication) {
        if (service.hasAccess(comment, authentication)) {
            service.delete(comment.getId());
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PostMapping("modify")
    public ResponseEntity modifyComment(@RequestBody Comment comment, Authentication authentication) {
        if (service.hasAccess(comment, authentication)) {
            service.update(comment);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
