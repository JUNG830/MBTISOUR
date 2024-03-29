package com.ISOUR.FINAL.repository;

import com.ISOUR.FINAL.entity.Postbox;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostboxRepository extends JpaRepository<Postbox, Long> {
    List<Postbox> findAll();
    List<Postbox> findByPostReceiverOrderByPostTimeDesc(String postReceiver);
    Postbox findByPostNum(Long postNum);
}
