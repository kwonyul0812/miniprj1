package com.miniprj1back.service;

import com.miniprj1back.domain.Board;
import com.miniprj1back.domain.BoardFile;
import com.miniprj1back.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class BoardService {
    private final BoardMapper mapper;

    public void add(Board board, Authentication authentication, MultipartFile[] files) throws IOException {
        board.setMemberId(Integer.valueOf(authentication.getName()));
        mapper.insert(board);

        if (files != null) {
            for (MultipartFile file : files) {
                // db에 해당 게시물의 파일 목록 저장
                mapper.insertFileName(board.getId(), file.getOriginalFilename());
                // 실제 파일 저장
                // 부모 디렉토리 만들기
                String str = STR."C:/Temp/miniprj1/\{board.getId()}";
                File dirFile = new File(str);
                if (!dirFile.exists()) {
                    dirFile.mkdirs();
                }

                // 파일 경로
                String path = STR."C:/Temp/miniprj1/\{board.getId()}/\{file.getOriginalFilename()}";
                File destination = new File(path);
                file.transferTo(destination);
            }

        }


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
        Board board = mapper.selectBoard(id);
        List<String> fileNames = mapper.selectFileNameByBoardId(id);

        List<BoardFile> files = fileNames.stream()
                .map(name -> new BoardFile(name, STR."http://172.30.1.89:8888/\{board.getId()}/\{name}"))
                .toList();

        board.setFileList(files);

        return board;
    }

    public void delete(Integer id) {
        List<String> fileNames = mapper.selectFileNameByBoardId(id);

        for (String fileName : fileNames) {
            String path = STR."C:/Temp/miniprj1/\{id}/\{fileName}";
            File file = new File(path);
            file.delete();
        }
        String path = STR."C:/Temp/miniprj1/\{id}";
        File dir = new File(path);
        if (dir.exists()) {
            dir.delete();
        }

        mapper.deleteImageByBoardId(id);
        mapper.deleteByBoardId(id);
    }

    public boolean hasAccess(Integer id, Authentication authentication) {
        Board board = mapper.selectBoard(id);

        return board.getMemberId().equals(Integer.valueOf(authentication.getName()));
    }

    public void edit(Board board, MultipartFile[] files) throws IOException {
        if (files != null) {
            // 기존에 있던 이미지 지우기
            List<String> fileNames = mapper.selectFileNameByBoardId(board.getId());

            for(String fileName : fileNames) {
                String path = STR."C:/Temp/miniprj1/\{board.getId()}/\{fileName}";
                File file = new File(path);
                file.delete();
            }

            mapper.deleteImageByBoardId(board.getId());

            for (MultipartFile file : files) {
                // 파일 명 db에 저장
                mapper.insertFileName(board.getId(), file.getOriginalFilename());

                // 부모 디렉터리 생성
                String path = STR."C:/Temp/miniprj1/\{board.getId()}";
                File dirFile = new File(path);
                if (!dirFile.exists()) {
                    dirFile.mkdirs();
                }

                // 부모 경로에 파일 저장
                path = STR."C:/Temp/miniprj1/\{board.getId()}/\{file.getOriginalFilename()}";
                File destination = new File(path);
                file.transferTo(destination);
            }
        }

        mapper.updateBoard(board);
    }
}
