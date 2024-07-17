package com.miniprj1back.service;

import com.miniprj1back.domain.Board;
import com.miniprj1back.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class BoardService {
    private final BoardMapper mapper;

    public void add(Board board, Authentication authentication) {
        board.setMemberId(Integer.valueOf(authentication.getName()));

        mapper.insert(board);

    }

    public List<Board> getList() {
        List<Board> list = mapper.selectBoardList();
        return list;
    }

    public Board get(Integer id) {
        return mapper.selectBoard(id);
    }
}
