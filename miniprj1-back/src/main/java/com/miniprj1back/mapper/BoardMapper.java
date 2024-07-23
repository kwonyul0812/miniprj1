package com.miniprj1back.mapper;

import com.miniprj1back.domain.Board;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BoardMapper {

    @Insert("""
            INSERT INTO board(title, content, member_id)
            VALUES (#{title}, #{content}, #{memberId})
            """)
    int insert(Board board);


    @Select("""
            SELECT b.id,
                   b.title,
                   m.nick_name nickName,
                   b.inserted
            FROM board b JOIN member m ON b.member_id = m.id
            """)
    List<Board> selectBoardList();


    @Select("""
            SELECT b.id,
                   b.title,
                   b.content,
                   b.member_id memberId,
                   m.nick_name nickName,
                   b.inserted
            FROM board b JOIN member m ON b.member_id = m.id
            WHERE b.id = #{boardId}
            """)
    Board selectBoard(Integer boardId);


    @Delete("""
            DELETE FROM board
            WHERE id = #{boardId}
            """)
    int deleteByBoardId(Integer boardId);


    @Update("""
            UPDATE board
            SET title = #{title},
                content = #{content}
            WHERE id = #{id}
            """)
    int updateBoard(Board board);
}
