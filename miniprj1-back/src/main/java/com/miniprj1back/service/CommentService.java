package com.miniprj1back.service;

import com.miniprj1back.domain.Comment;
import com.miniprj1back.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class CommentService {
    private final CommentMapper mapper;

    public boolean validate(Comment comment) {
        if (comment == null) {
            return false;
        }
        if (comment.getComment() == null || comment.getComment().isBlank()) {
            return false;
        }
        if (comment.getBoardId() == null) {
            return false;
        }
        return true;
    }

    public void write(Comment comment, Authentication authentication) {
        comment.setMemberId(Integer.valueOf(authentication.getName()));
        mapper.insertComment(comment);
    }

    public List<Comment> get(Integer boardId) {
        return mapper.selectCommentList(boardId);
    }
}
