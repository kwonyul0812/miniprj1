package com.miniprj1back.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Board {
    private Integer id;
    private String title;
    private String content;
    private Integer memberId;
    private String nickName;
    private LocalDateTime inserted;
}
