package com.ISOUR.FINAL.repository;

import com.ISOUR.FINAL.entity.GChat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GChatRepository extends JpaRepository<GChat, Long> {
    GChat findByChatNum(Long chatNum);
}
