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

    // 우리 dnfl ㅡ 나라 skfk ㅡ 미리 alfl
    @Test
    @DisplayName("회원가입 테스트")
    public void signUpTest() {
        String[] ball = new String[] {"", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구", "십", "십일", "십이", "십삼", "십사", "십오", "십육"};
        String[] MBTI = new String[] {"", "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"};
        for(int i = 1; i <= 16; i++) {
            MemberInfo memberInfo = new MemberInfo();
            memberInfo.setName("미리2" + ball[i]);
            memberInfo.setId("alfl2" + i);
            memberInfo.setPwd("dkfldkfl");
            memberInfo.setEmail("alfl2" + i + "@alfl" + i +".com");
            memberInfo.setNickname("닉미리2" + ball[i]);
            memberInfo.setGender("남자");
            memberInfo.setBirth("1999-09-09");
            memberInfo.setIntroduce("미리2" + ball[i] + "의 자기소개");
            memberInfo.setMbti(MBTI[i]);
            memberInfo.setRegistrationDate(LocalDateTime.now().withNano(0));
            memberRepository.save(memberInfo);
        }
    }

//    16 +
//    32 +
//    48 +
//    @Test
//    @DisplayName("회원가입 테스트")
//    public void signUpTest() {
//        String[] MBTI = new String[] { "", "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP" };
//        for(int i = 1; i <= 16; i++) {
//            MemberInfo memberInfo = new MemberInfo();
//            memberInfo.setName("test" + (i));
//            memberInfo.setNickname("testNic" + (i));
//            memberInfo.setId("test" + (i));
//            memberInfo.setPwd("test" + (i));
//            memberInfo.setMbti(MBTI[i]);
//            memberInfo.setIntroduce("Im test" + (i) + "입니다.");
//            memberInfo.setRegistrationDate(LocalDateTime.now().withNano(0));
//            memberRepository.save(memberInfo);
//        }
//    }

}