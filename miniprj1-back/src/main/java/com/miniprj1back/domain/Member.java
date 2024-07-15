package com.miniprj1back.domain;

import lombok.Data;

@Data
public class Member {
    private int id;
    private String email;
    private String password;
    private String nickName;
}
