package com.ISOUR.FINAL.Service;

import com.ISOUR.FINAL.entity.MemberInfo;
import com.ISOUR.FINAL.entity.Postbox;
import com.ISOUR.FINAL.repository.MemberRepository;
import com.ISOUR.FINAL.repository.PostboxRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminService {
    private final MemberRepository memberRepository;
    private final PostboxRepository postboxRepository;

    /* 전체 회원 조회 */
    public List<MemberInfo> getAllMemberList() {
        log.warn("★★★★★★★★★관리자 - 전체 쪽지함 조회 서비스★★★★★★★★★");
        List<MemberInfo> memberList = memberRepository.findAll();
        return memberList;
    }

    /* 로그인 서비스 */
    public boolean loginAdmin(String id, String pwd) {
        log.warn("★★★★★★★★★관리자 - 로그인 서비스★★★★★★★★★");
        log.warn("입력한 아이디(id) : " + id);
        log.warn("입력한 비밀번호(pwd) : " + pwd);

        List<MemberInfo> memberInfoList = memberRepository.findByIdAndPwd(id, pwd);
        for(MemberInfo e : memberInfoList) {
            return true;
        }
        return false;
    }


    /* 전체 쪽지함 조회 */
    public List<Postbox> getAllPostList() {
        log.warn("★★★★★★★★★관리자 - 전체 쪽지함 조회 서비스★★★★★★★★★");
        List<Postbox> postboxList = postboxRepository.findAll();
        return postboxList;
    }
}
