package com.miniprj1back.service;

import com.miniprj1back.domain.Comment;
import com.miniprj1back.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public Map<String, Object> get(Integer boardId, Integer page) {
        Map<String, Object> result = new HashMap<>();

        Integer numberOfComments = mapper.selectCountAll(boardId);
        Integer lastPageNumber = (numberOfComments - 1) / 10 + 1;
        Integer offset = (page - 1) * 10;
        Integer beginPageNumber = (page - 1) / 10 * 10 + 1;
        Integer endPageNumber = beginPageNumber + 9;
        endPageNumber = Math.min(endPageNumber, lastPageNumber);

        Integer prevPageNumber = beginPageNumber - 10;
        Integer nextPageNumber = beginPageNumber + 10;

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("beginPageNumber", beginPageNumber);
        pageInfo.put("endPageNumber", endPageNumber);
        pageInfo.put("prevPageNumber", prevPageNumber);
        pageInfo.put("nextPageNumber", nextPageNumber);
        pageInfo.put("currentPageNumber", page);

        result.put("pageInfo", pageInfo);
        result.put("commentList", mapper.selectCommentList(boardId, offset));

        return result;
    }

    public boolean hasAccess(Comment comment, Authentication authentication) {
        Comment db = mapper.selectCommentByCommentId(comment.getId());

        if (db == null) {
            return false;
        }

        if (!db.getMemberId().equals(Integer.valueOf(authentication.getName()))) {
            return false;
        }
        return true;
    }

    public void delete(Integer commentId) {
        mapper.deleteComment(commentId);
    }

    public void update(Comment comment) {
        mapper.update(comment);
    }
}
