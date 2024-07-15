package com.miniprj1back.mapper;

import com.miniprj1back.domain.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    @Insert("""
            INSERT INTO member(email, password, nick_name)
            VALUES(#{email}, #{password}, #{nickName})
            """)
    int createAccount(Member member);
}
