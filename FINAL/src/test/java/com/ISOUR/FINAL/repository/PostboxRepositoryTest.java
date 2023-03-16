package com.ISOUR.FINAL.repository;


import com.ISOUR.FINAL.entity.Postbox;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
@Slf4j
class PostboxRepositoryTest {
    @Autowired
    PostboxRepository postboxRepository;

    @Test
    @DisplayName("쪽지 보내기 테스트")
    public void sendPostTest() {
        LocalDateTime currentTime = LocalDateTime.now();
        String id = "dnfl10";
        String receiverId = "mbtisour";
        for(int i = 1; i <= 1; i++) {
            Postbox postbox = new Postbox();
            postbox.setPostSender(id);
            postbox.setPostReceiver(receiverId);
            postbox.setContent("안녕하세요 ISFP입니다! 이야기 나눠보고 싶어서 쪽지 드렸어요");
            postbox.setPostTime(currentTime.withNano(0));
            postboxRepository.save(postbox);
        }
    }
}