package com.miniprj1back.mapper;

import com.miniprj1back.domain.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface MemberMapper {
    @Insert("""
            INSERT INTO member(email, password, nick_name)
            VALUES(#{email}, #{password}, #{nickName})
            """)
    int createAccount(Member member);

    @Select("""
            SELECT *
            FROM member
            WHERE email = #{email}
            """)
    Member selectByEmail(String email);

    @Select("""
            SELECT name
            FROM authority
            WHERE member_id = #{memberId}
            """)
    List<String> selectAuthorityByMemberId(Integer memberId);

    @Select("""
            SELECT id,
                   email,
                   nick_name nickName
            FROM member
            WHERE id = #{memberId}
            """)
    Member selectMemberByMemberId(Integer memberId);


    @Update("""
            UPDATE member
            SET password = #{password}
            WHERE id = #{memberId}
            """)
    int updatePassowrd(String password, Integer memberId);


    @Update("""
            UPDATE member
            SET nick_name = #{nickName}
            WHERE id = #{memberId}
            """)
    int updateNickName(String nickName, Integer memberId);
}
