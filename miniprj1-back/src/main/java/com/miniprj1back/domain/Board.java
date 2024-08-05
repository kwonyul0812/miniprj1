package com.miniprj1back.domain;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Board {
    private Integer id;
    private String title;
    private String content;
    private Integer memberId;
    private String nickName;
    private LocalDateTime inserted;

    private Integer numberOfImages;
    private Integer numberOfComments;
    private Integer numberOfLikes;
    private List<BoardFile> fileList;
}
