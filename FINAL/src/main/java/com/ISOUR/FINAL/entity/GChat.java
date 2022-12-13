package com.ISOUR.FINAL.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Chat")
public class GChat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chatNum;
    private String content;
    private String face;
    private String nickname;
    private LocalDateTime chatTime;
}
