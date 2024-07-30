package com.miniprj1back.mapper;

import com.miniprj1back.domain.Comment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommentMapper {

    @Insert("""
            INSERT INTO comment (comment, board_id, member_id)
            VALUES (#{comment}, #{boardId}, #{memberId})
            """)
    int insertComment(Comment comment);


    @Select("""
            SELECT c.id,
                   c.member_id memberId,
                   c.comment,
                   c.inserted,
                   m.nick_name nickName
            FROM comment c JOIN member m ON c.member_id = m.id
            WHERE board_id = #{boardId}
            ORDER BY c.id DESC
            """)
    List<Comment> selectCommentList(Integer boardId);
}
