package com.miniprj1back.controller;

import com.miniprj1back.domain.Board;
import com.miniprj1back.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService service;

    @PostMapping("write")
    @PreAuthorize("isAuthenticated()")
    public void write(Board board,
                      Authentication authentication,
                      @RequestParam(value = "files[]", required = false) MultipartFile[] files) throws IOException {
        service.add(board, authentication, files);
    }

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") Integer page,
                                    @RequestParam(required = false) String type,
                                    @RequestParam(defaultValue = "") String keyword) {
        return service.getList(page, type, keyword);
    }

    @GetMapping("{id}")
    public Map<String, Object> get(@PathVariable Integer id, Authentication authentication) {
        return service.get(id, authentication);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity delete(@PathVariable Integer id, Authentication authentication) {
        if (service.hasAccess(id, authentication)) {
            service.delete(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PutMapping("edit")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity edit(Board board,
                               Authentication authentication,
                               @RequestParam(value = "files[]", required = false) MultipartFile[] files) throws IOException {
        if (service.hasAccess(board.getId(), authentication)) {
            service.edit(board, files);

            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PutMapping("like")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Object> like(@RequestBody Board board, Authentication authentication) {
        return service.like(board, authentication);
    }
}
