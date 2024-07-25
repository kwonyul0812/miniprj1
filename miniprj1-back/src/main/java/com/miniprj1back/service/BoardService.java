package com.miniprj1back.service;

import com.miniprj1back.domain.Board;
import com.miniprj1back.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class BoardService {
    private final BoardMapper mapper;

    public void add(Board board, Authentication authentication) {
        board.setMemberId(Integer.valueOf(authentication.getName()));

        mapper.insert(board);

    }

    public Map<String, Object> getList(Integer page, String type, String keyword) {
        Map<String, Object> pageInfo = new HashMap<>();

        Integer numberOfBoard = mapper.countAll(type, keyword);

        Integer lastPageNumber = (numberOfBoard - 1) / 10 + 1;
        Integer offset = (page - 1) * 10;
        Integer beginPageNumber = (page - 1) / 10 * 10 + 1;
        Integer endPageNumber = beginPageNumber + 9;
        endPageNumber = Math.min(endPageNumber, lastPageNumber);
        Integer prevPageNumber = beginPageNumber - 10;
        Integer nextPageNumber = beginPageNumber + 10;

        pageInfo.put("lastPageNumber", lastPageNumber);
        pageInfo.put("beginPageNumber", beginPageNumber);
        pageInfo.put("endPageNumber", endPageNumber);
        pageInfo.put("prevPageNumber", prevPageNumber);
        pageInfo.put("nextPageNumber", nextPageNumber);
        pageInfo.put("currentPageNumber", page);

        return Map.of("pageInfo", pageInfo, "boardList", mapper.selectBoardList(offset, type, keyword));

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

    public void edit(Board board) {
        mapper.updateBoard(board);
    }
}
