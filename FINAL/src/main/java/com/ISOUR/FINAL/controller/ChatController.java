package com.ISOUR.FINAL.controller;

import com.ISOUR.FINAL.Service.ChatService;
import com.ISOUR.FINAL.dto.ChatRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
public class ChatController {
    private final ChatService chatService;
    @PutMapping("/Chatting")
    public ResponseEntity<String> createRoom(@RequestBody String name) {
        ChatRoom room = chatService.createRoom(name);
        log.info(room.getRoomId());
        System.out.println(room.getRoomId());
        return new ResponseEntity<>(room.getRoomId(), HttpStatus.OK);
    }
    @GetMapping
    public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }
}