package com.miniprj1back.service;

import com.miniprj1back.domain.Board;
import com.miniprj1back.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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

    public void delete(Integer id, Authentication authentication) {
        mapper.deleteByBoardId(id);
    }

    public boolean hasAccess(Integer id, Authentication authentication) {
        Board board = mapper.selectBoard(id);

        return board.getMemberId().equals(Integer.valueOf(authentication.getName()));
    }
}
