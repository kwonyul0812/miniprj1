package com.miniprj1back.controller;

import com.miniprj1back.domain.Board;
import com.miniprj1back.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService service;

    @PostMapping("write")
    @PreAuthorize("isAuthenticated()")
    public void write(@RequestBody Board board, Authentication authentication) {
        service.add(board, authentication);
    }

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") Integer page,
                                    @RequestParam(required = false) String type,
                                    @RequestParam(defaultValue = "") String keyword) {
        return service.getList(page, type, keyword);
    }

    @GetMapping("{id}")
    public Board get(@PathVariable Integer id) {
        Board board = service.get(id);

        return board;
    }

    @DeleteMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity delete(@PathVariable Integer id, Authentication authentication) {
        if (service.hasAccess(id, authentication)) {
            service.delete(id, authentication);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PostMapping("edit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity edit(@RequestBody Board board, Authentication authentication) {
        if (service.hasAccess(board.getId(), authentication)) {
            service.edit(board);

            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
