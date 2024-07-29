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
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Board board);


    @Select("""
            <script>
            SELECT b.id,
                   b.title,
                   m.nick_name nickName,
                   b.inserted,
                   COUNT(DISTINCT f.name) numberOfImages
            FROM board b JOIN member m ON b.member_id = m.id
                         LEFT JOIN board_file f ON b.id = f.board_id
                <trim prefix="WHERE" prefixOverrides="OR">
                    <if test="type != null">
                        <bind name="pattern" value="'%' + keyword + '%'" />
                        <if test="type == 'all' || type == 'title'">
                            OR b.title LIKE #{pattern}
                        </if>
                        <if test="type == 'all' || type = 'nickName'">
                            OR m.nick_name LIKE #{pattern}
                        </if>
                    </if>
                </trim>
            GROUP BY b.id
            ORDER BY b.id DESC
            LIMIT #{offset}, 10
            </script>
            """)
    List<Board> selectBoardList(Integer offset, String type, String keyword);


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


    @Select("""
            <script>
            SELECT COUNT(*)
            FROM board b JOIN member m ON b.member_id = m.id
                <trim prefix="WHERE" prefixOverrides="OR">
                    <if test="type != null">
                        <bind name="pattern" value="'%' + keyword + '%'" />
                        <if test="type == 'all' || type == 'title'">
                            OR b.title LIKE #{pattern}
                        </if>
                        <if test="type == 'all' || type == 'nickName'">
                            OR m.nick_Name LIKE #{pattern}
                        </if>
                    </if>
                </trim>
            </script>
            """)
    Integer countAll(String type, String keyword);


    @Insert("""
            INSERT INTO board_file
            (board_id, name)
            VALUES (#{boardId}, #{name})
            """)
    int insertFileName(Integer boardId, String name);

    @Select("""
            SELECT name FROM board_file
            WHERE board_id = #{boardId}
            """)
    List<String> selectFileNameByBoardId(Integer boardId);


    @Delete("""
            DELETE FROM board_file
            WHERE board_id = #{boardId}
            """)
    int deleteImageByBoardId(Integer id);
}
