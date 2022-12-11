package com.ISOUR.FINAL.repository;

import com.ISOUR.FINAL.entity.MemberInfo;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
class MemberRepositoryTest {
    @Autowired
    MemberRepository memberRepository;

//    16 +
//    32 +
//    48 +
    @Test
    @DisplayName("회원가입 테스트")
    public void signUpTest() {
        String[] MBTI = new String[] { "", "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP" };
        for(int i = 1; i <= 16; i++) {
            MemberInfo memberInfo = new MemberInfo();
            memberInfo.setName("test" + (i));
            memberInfo.setNickname("testNic" + (i));
            memberInfo.setId("test" + (i));
            memberInfo.setPwd("test" + (i));
            memberInfo.setMbti(MBTI[i]);
            memberInfo.setIntroduce("Im test" + (i) + "입니다.");
            memberInfo.setRegistrationDate(LocalDateTime.now().withNano(0));
            memberRepository.save(memberInfo);
        }
    }

}